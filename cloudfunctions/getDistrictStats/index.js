// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        const { data } = await db.collection('district_stats')
            .orderBy('district', 'asc')
            .get()

        return {
            success: true,
            data: {
                list: data
            }
        }
    } catch (err) {
        return {
            success: false,
            error: err
        }
    }
}