// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        const { district, page = 1, pageSize = 10 } = event
        const skip = (page - 1) * pageSize

        let query = {}
        if (district) {
            query.district = district
        }

        // 获取总数
        const countResult = await db.collection('raccoons')
            .where(query)
            .count()

        // 获取列表数据
        const { data } = await db.collection('raccoons')
            .where(query)
            .skip(skip)
            .limit(pageSize)
            .orderBy('createdAt', 'desc')
            .get()

        // 确保数值类型正确
        const formattedData = data.map(raccoon => ({
            ...raccoon,
            latitude: Number(raccoon.latitude),
            longitude: Number(raccoon.longitude),
            id: Number(raccoon.id)
        }))

        return {
            success: true,
            data: {
                list: formattedData,
                total: countResult.total,
                page,
                pageSize
            }
        }
    } catch (err) {
        console.error('获取貉数据失败：', err)
        return {
            success: false,
            error: err
        }
    }
}