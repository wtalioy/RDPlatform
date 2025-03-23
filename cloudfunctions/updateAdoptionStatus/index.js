const cloud = require("@cloudbase/node-sdk");

const app = cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

const models = app.models;

exports.main = async (event, context) => {
    const { id, isAdopted, adoptionInfo } = event;

    try {
        await models.adoptionRaccoons.update({
            filter: {
                where: {
                    id: {
                        $eq: Number(id)
                    }
                }
            },
            data: {
                isAdopted,
                ...(adoptionInfo && { adoptionInfo })
            }
        });

        return {
            success: true,
            message: isAdopted ? '认养成功' : '取消认养成功'
        };
    } catch (error) {
        return {
            success: false,
            message: '操作失败',
            error: error.message
        };
    }
}