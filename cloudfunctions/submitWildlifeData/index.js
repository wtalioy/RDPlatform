const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
    try {
        const wxContext = cloud.getWXContext()
        const { story, images, location, timestamp } = event

        // 保存数据到数据库
        const result = await db.collection('wildlife_data').add({
            data: {
                openid: wxContext.OPENID,
                story,
                images,
                location,
                timestamp,
                createdAt: db.serverDate()
            }
        })

        // 更新用户贡献计数
        const userContrib = await db.collection('user_contributions').where({
            openid: wxContext.OPENID
        }).get()

        if (userContrib.data.length === 0) {
            // 创建新用户贡献记录
            await db.collection('user_contributions').add({
                data: {
                    openid: wxContext.OPENID,
                    count: 1,
                    hasUnlockedReward: false,
                    createdAt: db.serverDate(),
                    updatedAt: db.serverDate()
                }
            })
        } else {
            // 更新现有记录
            const newCount = userContrib.data[0].count + 1
            await db.collection('user_contributions').where({
                openid: wxContext.OPENID
            }).update({
                data: {
                    count: newCount,
                    hasUnlockedReward: newCount >= 10,
                    updatedAt: db.serverDate()
                }
            })
        }

        return {
            success: true,
            data: result
        }
    } catch (err) {
        console.error('提交数据失败：', err)
        return {
            success: false,
            error: err
        }
    }
}