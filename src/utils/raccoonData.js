/**
 * 貉情数据管理
 * 集中存储和管理貉相关的数据，便于统一更新和维护
 */

// 上海市各区貉口数量
export const districtRaccoonCount = {
    '黄浦区': 5,
    '徐汇区': 8,
    '长宁区': 12,
    '静安区': 6,
    '普陀区': 9,
    '虹口区': 7,
    '杨浦区': 11,
    '浦东新区': 15,
    '闵行区': 10,
    '宝山区': 8,
    '嘉定区': 6,
    '金山区': 4,
    '松江区': 9,
    '青浦区': 12,
    '奉贤区': 5,
    '崇明区': 7
}

// 地图上标记的代表性貉
export const representativeRaccoons = [
    {
        id: 1,
        name: '大毛',
        latitude: 31.235416,
        longitude: 121.483701,
        avatar: '/static/images/raccoons/damao.png',
        district: '黄浦区'
    },
    {
        id: 2,
        name: '二毛',
        latitude: 31.219416,
        longitude: 121.463701,
        avatar: '/static/images/raccoons/ermao.png',
        district: '徐汇区'
    },
    {
        id: 3,
        name: '小黑',
        latitude: 31.225326,
        longitude: 121.445191,
        avatar: '/static/images/raccoons/xiaohei.png',
        district: '长宁区'
    },
    {
        id: 4,
        name: '豆豆',
        latitude: 31.241703,
        longitude: 121.459627,
        avatar: '/static/images/raccoons/doudou.png',
        district: '静安区'
    },
    {
        id: 5,
        name: '花花',
        latitude: 31.259501,
        longitude: 121.418088,
        avatar: '/static/images/raccoons/huahua.png',
        district: '普陀区'
    },
    {
        id: 6,
        name: '小灰',
        latitude: 31.375504,
        longitude: 121.498125,
        avatar: '/static/images/raccoons/xiaohui.png',
        district: '宝山区'
    },
    {
        id: 7,
        name: '圆圆',
        latitude: 31.187869,
        longitude: 121.523913,
        avatar: '/static/images/raccoons/yuanyuan.png',
        district: '浦东新区'
    },
    {
        id: 8,
        name: '贝贝',
        latitude: 31.169812,
        longitude: 121.384560,
        avatar: '/static/images/raccoons/beibei.png',
        district: '闵行区'
    }
]

// 貉的详细信息
export const raccoonDetails = {
    1: {
        id: 1,
        name: '大毛',
        avatar: '/static/images/raccoons/damao.png',
        district: '黄浦区',
        character: '大毛性格活泼好动，喜欢在夜间探索城市公园。它是一个好奇心旺盛的貉，对新事物总是充满兴趣。',
        socialRelations: '作为黄浦区貉群的首领，大毛负责带领其他貉觅食和建造巢穴。它与"小白"和"丁丁"是亲密伙伴，经常一起活动。',
        story: '大毛是最早被观察到的上海市区貉之一，它已经在黄浦公园生活了5年多。有一次，它帮助一只受伤的小貉找到了食物，展现了貉类动物的互助精神。为了保护自己的领地，大毛曾经与另一个貉群进行了一场"谈判"，最终和平解决了领地争端。',
        photos: [
            '/static/images/raccoons/damao_1.png',
            '/static/images/raccoons/damao_2.png',
            '/static/images/raccoons/damao_3.png'
        ]
    },
    2: {
        id: 2,
        name: '二毛',
        avatar: '/static/images/raccoons/ermao.png',
        district: '徐汇区',
        character: '二毛性格温顺，是一只非常谨慎的貉。它善于隐藏，很少在白天出现。',
        socialRelations: '二毛是徐汇区貉群的侦察员，负责为貉群寻找安全的觅食区域。它与"圆圆"有着特殊的友谊，两只貉经常共享食物。',
        story: '二毛在徐汇区的一个小公园中被第一次发现。研究人员注意到它有一个独特的习惯：在每次觅食前，它会先绕着目标区域转三圈，似乎是在确认安全。去年冬天，二毛在一场大雪后帮助研究人员找到了被埋在雪下的监测设备，展现了貉类非凡的嗅觉能力。',
        photos: [
            '/static/images/raccoons/ermao_1.png',
            '/static/images/raccoons/ermao_2.png',
            '/static/images/raccoons/ermao_3.png'
        ]
    },
    3: {
        id: 3,
        name: '小黑',
        avatar: '/static/images/raccoons/xiaohei.png',
        district: '长宁区',
        character: '小黑是一只聪明伶俐的貉，它的毛色略深，因此得名。它喜欢收集亮闪闪的小物品，堪称貉中的"收藏家"。',
        socialRelations: '小黑在长宁区的貉群中是信息传递者，与许多其他区域的貉都有联系。它尤其喜欢与"大毛"交流，两只貉之间有着跨区域的友谊。',
        story: '小黑曾经帮助研究人员找到了一个丢失的监测设备，研究人员惊讶地发现小黑不仅找到了设备，还试图修复它。这次经历让研究人员对貉的智力有了新的认识。',
        photos: [
            '/static/images/raccoons/xiaohei_1.png',
            '/static/images/raccoons/xiaohei_2.png'
        ]
    },
    4: {
        id: 4,
        name: '豆豆',
        avatar: '/static/images/raccoons/doudou.png',
        district: '静安区',
        character: '豆豆是一只体型较小但非常灵活的貉，作为静安区最年轻的貉群成员，它充满活力且善于适应城市生活。',
        socialRelations: '虽然年龄小，但豆豆在静安区貉群中很受尊重，它负责带领年轻的貉学习城市生存技能。它与"花花"是好朋友，经常一起探索城市。',
        story: '豆豆是在一年前的春天被首次发现的，当时它正在帮助一对老年人捡起散落的购物袋。这种亲人的行为让研究人员对貉与人类共存的可能性更加乐观。',
        photos: [
            '/static/images/raccoons/doudou_1.png',
            '/static/images/raccoons/doudou_2.png'
        ]
    },
    5: {
        id: 5,
        name: '花花',
        avatar: '/static/images/raccoons/huahua.png',
        district: '普陀区',
        character: '花花因其毛色斑驳而得名。它是一只非常有主见的貉，善于解决争端，在貉群中扮演着"和事佬"的角色。',
        socialRelations: '花花是普陀区貉群的协调员，负责与其他区域的貉群建立联系。它尤其尊敬宝山区的"小灰"，经常向它请教问题。',
        story: '花花曾经在一次暴雨中救助了一群被困的小动物，带领它们到安全的地方。这次事件被附近的监控摄像头记录下来，成为了研究貉类社会行为的重要资料。',
        photos: [
            '/static/images/raccoons/huahua_1.png',
            '/static/images/raccoons/huahua_2.png'
        ]
    },
    6: {
        id: 6,
        name: '小灰',
        avatar: '/static/images/raccoons/xiaohui.png',
        district: '宝山区',
        character: '小灰是一只年长而睿智的貉，它安静沉稳，喜欢在清晨或黄昏时分活动，很少与人类直接接触。',
        socialRelations: '作为宝山区貉群的长者，小灰受到所有貉的尊敬。它经常给年轻的貉讲述城市发展的变化，被称为"貉族的记忆守护者"。',
        story: '小灰是研究人员追踪时间最长的貉之一，已有超过7年的观察记录。它见证了上海宝山区的城市化进程，也适应了不断变化的环境。研究人员从小灰身上学到了很多关于野生动物适应城市环境的知识。',
        photos: [
            '/static/images/raccoons/xiaohui_1.png',
            '/static/images/raccoons/xiaohui_2.png'
        ]
    },
    7: {
        id: 7,
        name: '圆圆',
        avatar: '/static/images/raccoons/yuanyuan.png',
        district: '浦东新区',
        character: '圆圆体型圆润，动作轻盈，是浦东新区最喜欢探索的貉。它有着极强的好奇心，喜欢观察人类的各种活动。',
        socialRelations: '圆圆是浦东新区貉群的探险家，负责寻找新的栖息地和食物来源。它与"二毛"有着特殊的友谊，两只貉虽然居住在不同区域，但经常沿着河道见面交流。',
        story: '圆圆因为一次意外闯入了一个正在举行户外婚礼的公园，成为了婚礼上意外的"嘉宾"。这次有趣的相遇不仅没有引起恐慌，反而让新人认为这是一个吉祥的征兆，并因此支持了貉保护项目。',
        photos: [
            '/static/images/raccoons/yuanyuan_1.png',
            '/static/images/raccoons/yuanyuan_2.png'
        ]
    },
    8: {
        id: 8,
        name: '贝贝',
        avatar: '/static/images/raccoons/beibei.png',
        district: '闵行区',
        character: '贝贝是一只特别注重自我保护的貉，总是谨慎行事，善于在城市环境中寻找安全的路线和栖息地。',
        socialRelations: '贝贝是闵行区貉群的安全专家，负责为群体选择安全的活动路线。它与其他区域的貉联系较少，但与同区域的貉感情深厚，特别照顾年幼的貉。',
        story: '贝贝曾经在一次建筑工地的危险情况中，成功带领整个貉群转移到安全区域，展示了杰出的领导能力。研究人员注意到贝贝会使用特殊的叫声来警告其他貉注意危险，这成为了研究貉类沟通方式的重要案例。',
        photos: [
            '/static/images/raccoons/beibei_1.png',
            '/static/images/raccoons/beibei_2.png'
        ]
    }
}

// 获取总貉口数量
export const getTotalRaccoonCount = () => {
    return Object.values(districtRaccoonCount).reduce((acc, count) => acc + count, 0)
}

// 获取特定貉的详细信息
export const getRaccoonById = (id) => {
    return raccoonDetails[id] || null
}

// 获取地图标记数据
export const getMapMarkers = () => {
    return representativeRaccoons.map(raccoon => ({
        id: raccoon.id,
        latitude: raccoon.latitude,
        longitude: raccoon.longitude,
        iconPath: raccoon.avatar,
        width: 40,
        height: 40,
        callout: {
            content: raccoon.name,
            color: '#000000',
            fontSize: 14,
            borderRadius: 4,
            bgColor: '#ffffff',
            padding: 5,
            display: 'ALWAYS'
        }
    }))
}