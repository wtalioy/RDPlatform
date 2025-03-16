// 获取貉列表数据
export const getRaccoonList = async (params = {}) => {
    try {
        const { result } = await wx.cloud.callFunction({
            name: 'getRaccoons',
            data: params
        })
        return result.success ? result.data : { list: [], total: 0 }
    } catch (error) {
        console.error('获取貉列表失败：', error)
        return { list: [], total: 0 }
    }
}

// 上传貉的图片到云存储
export const uploadRaccoonImage = async (filePath) => {
    try {
        // 生成云存储路径
        const cloudPath = `raccoon-images/${Date.now()}-${Math.random().toString(36).substring(2)}.${filePath.match(/\.([^.]+)$/)[1]}`

        // 上传文件到云存储
        const { fileID } = await wx.cloud.uploadFile({
            cloudPath,
            filePath
        })

        return {
            success: true,
            fileID
        }
    } catch (error) {
        console.error('上传图片失败：', error)
        return {
            success: false,
            error: error.message
        }
    }
}

// 添加新的貉信息
export const addRaccoonInfo = async (raccoonData) => {
    try {
        // 上传图片
        const uploadedPhotos = await Promise.all(
            raccoonData.photos.map(photo => uploadRaccoonImage(photo))
        )

        // 获取上传成功的图片 fileID
        const photoFileIds = uploadedPhotos
            .filter(result => result.success)
            .map(result => result.fileID)

        // 调用云函数添加貉信息
        const { result } = await wx.cloud.callFunction({
            name: 'addRaccoon',
            data: {
                ...raccoonData,
                photos: photoFileIds
            }
        })
        return result
    } catch (error) {
        console.error('添加貉信息失败：', error)
        return { success: false, error: error.message }
    }
}

// 获取貉的详细信息
export const getRaccoonDetail = async (id) => {
    try {
        const { result } = await wx.cloud.callFunction({
            name: 'getRaccoons',
            data: { id }
        })
        return result.success ? result.data : null
    } catch (error) {
        console.error('获取貉详情失败：', error)
        return null
    }
}
