const cloud = require("@cloudbase/node-sdk");
const server = require("wx-server-sdk");

const app = cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

const models = app.models;

exports.main = async (event, context) => {
    const wxContext = server.getWXContext();
    const { data } = await models.user_contributions.get({
        filter: {
            where: {
                openid: {
                    $eq: wxContext.OPENID
                }
            }
        }
    });

    if (!data) {
        return {
            success: true,
            data: {
                count: 0,
                hasUnlockedReward: false
            }
        };
    }

    return {
        success: true,
        data: {
            count: Number(data.count),
            hasUnlockedReward: Boolean(data.hasUnlockedReward)
        }
    };
}