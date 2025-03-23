const cloud = require("@cloudbase/node-sdk");
const wxContext = require("wx-server-sdk").getWXContext();

const app = cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

const models = app.models;

exports.main = async (event, context) => {
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