// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        const { id } = event

        if (!id) {
            return {
                success: false,
                error: '缺少必要参数：id'
            }
        }

        // 根据ID查询貉详情
        const { data } = await db.collection('adoptionRaccoons')
            .where({
                id: Number(id) // 确保id是数字类型
            })
            .get()

        if (data.length === 0) {
            return {
                success: false,
                error: '未找到该貉的信息'
            }
        }

        return {
            success: true,
            data: data[0]
        }
    } catch (err) {
        console.error('获取认养貉详情失败：', err)
        return {
            success: false,
            error: err
        }
    }
}