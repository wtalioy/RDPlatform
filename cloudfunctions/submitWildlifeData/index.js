const cloud = require("@cloudbase/node-sdk");
const server = require("wx-server-sdk");

const app = cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

const models = app.models;

exports.main = async (event, context) => {
    const { story, images, location } = event;
    const wxContext = server.getWXContext();

    // 保存野生动物数据
    const { data: wildlifeData } = await models.wildlife_data.create({
        data: {
            openid: wxContext.OPENID,
            story: story,
            images: images,
            location: location,
        }
    });

    // 获取用户贡献记录
    const { data: userContrib } = await models.user_contributions.get({
        filter: {
            where: {
                openid: {
                    $eq: wxContext.OPENID
                }
            }
        }
    });

    if (!userContrib || !userContrib.count) {
        // 创建新用户贡献记录
        await models.user_contributions.create({
            data: {
                openid: wxContext.OPENID,
                count: 1,
                hasUnlockedReward: false,
            }
        });
    } else {
        // 更新现有记录
        const newCount = Number(userContrib.count) + 1;
        await models.user_contributions.update({
            filter: {
                where: {
                    openid: {
                        $eq: wxContext.OPENID
                    }
                }
            },
            data: {
                count: newCount,
                hasUnlockedReward: newCount >= 10,
            }
        });
    }

    return {
        success: true,
        data: wildlifeData
    };
}