const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
    try {
        const wxContext = cloud.getWXContext()

        const result = await db.collection('user_contributions')
            .where({
                openid: wxContext.OPENID
            })
            .get()

        if (result.data.length === 0) {
            return {
                success: true,
                data: {
                    count: 0,
                    hasUnlockedReward: false
                }
            }
        }

        return {
            success: true,
            data: {
                count: result.data[0].count,
                hasUnlockedReward: result.data[0].hasUnlockedReward
            }
        }
    } catch (err) {
        console.error('获取用户贡献数据失败：', err)
        return {
            success: false,
            error: err
        }
    }
}