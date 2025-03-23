const cloud = require("@cloudbase/node-sdk");

const app = cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

const models = app.models;

exports.main = async (event, context) => {
    const { data } = await models.raccoons.list({
        filter: {
            where: {}
        },
        pageSize: 10,
        pagenumber: 1,
    });
    return {
        success: true,
        data: data.records.map((item) => ({
            ...item,
            latitude: Number(item.latitude),
            longitude: Number(item.longitude),
            id: Number(item.id),
        })),
    };
}