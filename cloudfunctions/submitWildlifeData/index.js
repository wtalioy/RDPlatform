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

    return {
        success: true,
        data: wildlifeData
    };
}