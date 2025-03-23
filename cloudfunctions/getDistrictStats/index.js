const cloud = require("@cloudbase/node-sdk");

const app = cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

const models = app.models;

exports.main = async (event, context) => {
    const { data } = await models.district_stats.list({
        filter: {
            where: {}
        }
    });

    return {
        success: true,
        data: {
            list: data.records.map(item => ({
                ...item,
                count: Number(item.count),
                id: Number(item.id)
            }))
        }
    };
}