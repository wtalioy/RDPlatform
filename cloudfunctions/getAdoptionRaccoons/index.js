// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        const { onlyAvailable = false, page = 1, pageSize = 10 } = event
        const skip = (page - 1) * pageSize

        // 构建查询条件
        let query = {}
        if (onlyAvailable) {
            query.isAdopted = false
        }

        // 获取总数
        const countResult = await db.collection('adoptionRaccoons')
            .where(query)
            .count()

        // 获取列表数据
        const { data } = await db.collection('adoptionRaccoons')
            .where(query)
            .skip(skip)
            .limit(pageSize)
            .get()

        return {
            success: true,
            data: {
                list: data,
                total: countResult.total,
                page,
                pageSize
            }
        }
    } catch (err) {
        console.error('获取认养貉列表失败：', err)
        return {
            success: false,
            error: err
        }
    }
}