const cloud = require("@cloudbase/node-sdk");

const app = cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

const models = app.models;

exports.main = async (event, context) => {
    const { onlyAvailable, page = 1, pageSize = 10 } = event;

    const filter = {
        where: onlyAvailable ? {
            isAdopted: {
                $eq: false
            }
        } : {}
    };

    const { data } = await models.adoptionRaccoons.list({
        filter,
        pageSize,
        pageNumber: page
    });

    return {
        success: true,
        data: {
            list: data.records.map(item => ({
                ...item,
                id: Number(item.id),
                isAdopted: Boolean(item.isAdopted)
            })),
            total: data.total
        }
    };
}