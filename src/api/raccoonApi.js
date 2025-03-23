// 地图相关API
export const getRaccoons = async () => {
    try {
        const { result } = await wx.cloud.callFunction({
            name: 'getRaccoons'
        })
        return result.success ? result.data : { list: [], total: 0 }
    } catch (error) {
        console.error('获取貉失败：', error)
        return { list: [], total: 0 }
    }
}

export const getRaccoonDetail = async (id) => {
    try {
        const { result } = await wx.cloud.callFunction({
            name: 'getRaccoonDetail',
            data: { id }
        })
        return result.success ? result.data : null
    } catch (error) {
        console.error('获取貉详情失败：', error)
        return null
    }
}

export const getDistrictStats = async () => {
    try {
        const { result } = await wx.cloud.callFunction({
            name: 'getDistrictStats'
        })
        return result.success ? result.data : { list: [] }
    } catch (error) {
        console.error('获取区域统计失败：', error)
        return { list: [] }
    }
}

// 数据收集相关API
export const uploadWildlifeImage = async (filePath) => {
    try {
        const cloudPath = `wildlife-data/${Date.now()}-${Math.random().toString(36).substr(2)}.${filePath.match(/\.([^.]+)$/)[1]}`
        const { fileID } = await wx.cloud.uploadFile({
            cloudPath,
            filePath
        })
        return { success: true, fileID }
    } catch (error) {
        console.error('上传图片失败：', error)
        return { success: false, error: error.message }
    }
}

export const submitWildlifeData = async (data) => {
    try {
        const { result } = await wx.cloud.callFunction({
            name: 'submitWildlifeData',
            data
        })
        return result
    } catch (error) {
        console.error('提交数据失败：', error)
        return { success: false, error: error.message }
    }
}

export const getUserContributions = async () => {
    try {
        const { result } = await wx.cloud.callFunction({
            name: 'getUserContributions'
        })
        return result.success ? result.data : { count: 0, hasUnlockedReward: false }
    } catch (error) {
        console.error('获取用户贡献失败：', error)
        return { count: 0, hasUnlockedReward: false }
    }
}

// 认养相关API
export const getAdoptionRaccoons = async (onlyAvailable = false, page = 1, pageSize = 10) => {
    try {
        const { result } = await wx.cloud.callFunction({
            name: 'getAdoptionRaccoons',
            data: { onlyAvailable, page, pageSize }
        })
        return result.success ? result.data : { list: [], total: 0 }
    } catch (error) {
        console.error('获取认养貉列表失败：', error)
        handleError(error)
        return { list: [], total: 0 }
    }
}

export const getAdoptionRaccoonDetail = async (id) => {
    try {
        const { result } = await wx.cloud.callFunction({
            name: 'getAdoptionRaccoonDetail',
            data: { id }
        })
        return result.success ? result.data : null
    } catch (error) {
        console.error('获取认养貉详情失败：', error)
        handleError(error)
        return null
    }
}

export const updateAdoptionStatus = async (id, isAdopted, adoptionInfo = null) => {
    try {
        const { result } = await wx.cloud.callFunction({
            name: 'updateAdoptionStatus',
            data: { id, isAdopted, adoptionInfo }
        })
        if (result.success) {
            uni.showToast({
                title: result.message || '操作成功',
                icon: 'success'
            })
        }
        return result
    } catch (error) {
        console.error('更新认养状态失败：', error)
        handleError(error)
        return { success: false, error: error.message }
    }
}

// 统一错误处理
const handleError = (error) => {
    console.error(error)
    uni.showToast({
        title: '操作失败',
        icon: 'none'
    })
}
