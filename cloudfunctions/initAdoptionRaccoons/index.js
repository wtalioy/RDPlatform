// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 初始化貉数据
const raccoonDogs = [
    {
        id: 1,
        name: '团团',
        avatar: '/static/images/raccoon-dog1.jpg',
        location: '世纪公园',
        tags: ['活泼', '好奇'],
        isAdopted: false,
        description: '团团是一只非常活泼的小貉，喜欢在黄昏时分出来活动，经常可以看到它在草丛中探头探脑。',
        health: '良好',
        activities: ['觅食', '玩耍', '休息'],
        photos: ['/static/images/raccoon-dog1-1.jpg', '/static/images/raccoon-dog1-2.jpg'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        name: '圆圆',
        avatar: '/static/images/raccoon-dog2.jpg',
        location: '共青森林公园',
        tags: ['安静', '稳重'],
        isAdopted: true,
        description: '圆圆性格稳重，常在树林边缘活动，非常警觉但也相对容易被观察到。',
        health: '良好',
        activities: ['挖洞', '睡觉', '巡逻'],
        photos: ['/static/images/raccoon-dog2-1.jpg', '/static/images/raccoon-dog2-2.jpg'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 3,
        name: '点点',
        avatar: '/static/images/raccoon-dog3.jpg',
        location: '上海植物园',
        tags: ['机灵', '独立'],
        isAdopted: false,
        description: '点点很机灵，有自己的一套生存法则，喜欢独自一人探索，偶尔会和其他貉一起活动。',
        health: '良好',
        activities: ['探索', '觅食', '游荡'],
        photos: ['/static/images/raccoon-dog3-1.jpg', '/static/images/raccoon-dog3-2.jpg'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 4,
        name: '毛毛',
        avatar: '/static/images/raccoon-dog4.jpg',
        location: '滨江森林公园',
        tags: ['友善', '胆小'],
        isAdopted: false,
        description: '毛毛性格有点胆小，但是对熟悉的环境非常友善，会定期出现在固定地点。',
        health: '良好',
        activities: ['休息', '徘徊', '啃食'],
        photos: ['/static/images/raccoon-dog4-1.jpg', '/static/images/raccoon-dog4-2.jpg'],
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        // 清空现有数据（可选）
        if (event.clear) {
            await db.collection('adoptionRaccoons').where({
                id: db.command.exists(true)
            }).remove()
        }

        // 批量添加数据
        const tasks = raccoonDogs.map(raccoon => {
            return db.collection('adoptionRaccoons').add({
                data: raccoon
            })
        })

        const results = await Promise.all(tasks)

        return {
            success: true,
            message: '初始化认养貉数据成功',
            data: results
        }
    } catch (err) {
        console.error('初始化认养貉数据失败：', err)
        return {
            success: false,
            error: err
        }
    }
}