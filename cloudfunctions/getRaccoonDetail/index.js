const cloud = require("@cloudbase/node-sdk");

const app = cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

const models = app.models;

exports.main = async (event, context) => {
    const { id } = event;

    const { data } = await models.raccoons.get({
        filter: {
            where: {
                id: {
                    $eq: Number(id)
                }
            }
        }
    });

    return {
        success: true,
        data: data ? {
            ...data,
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
            id: Number(data.id)
        } : null
    };
}
