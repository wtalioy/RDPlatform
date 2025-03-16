// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        const { name, district, latitude, longitude, character, story, photos } = event

        const result = await db.collection('raccoons').add({
            data: {
                name,
                district,
                latitude,
                longitude,
                character,
                story,
                photos,
                createdAt: db.serverDate(),
                updatedAt: db.serverDate()
            }
        })

        return {
            success: true,
            data: result
        }
    } catch (err) {
        return {
            success: false,
            error: err
        }
    }
}