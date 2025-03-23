const cloud = require("@cloudbase/node-sdk");

const app = cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

const models = app.models;

exports.main = async (event, context) => {
    const { id } = event;

    if (!id) {
        return {
            success: false,
            error: '缺少必要参数：id'
        };
    }

    try {
        const { data } = await models.adoptionRaccoons.get({
            filter: {
                where: {
                    id: {
                        $eq: Number(id)
                    }
                }
            }
        });

        if (!data) {
            return {
                success: false,
                error: '未找到该貉的信息'
            };
        }

        return {
            success: true,
            data
        };
    } catch (err) {
        console.error('获取认养貉详情失败：', err);
        return {
            success: false,
            error: err.message
        };
    }
}