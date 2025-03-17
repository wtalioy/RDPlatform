// 地图相关API
export const getRaccoonList = async () => {
    try {
        const { result } = await wx.cloud.callFunction({
            name: 'getRaccoons'
        })
        return result.success ? result.data : { list: [], total: 0 }
    } catch (error) {
        console.error('获取貉列表失败：', error)
        return { list: [], total: 0 }
    }
}

// 区域统计API
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
export const uploadImage = async (filePath) => {
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

// 统一处理错误
const handleError = (error) => {
    console.error(error)
    uni.showToast({
        title: '操作失败',
        icon: 'none'
    })
}
