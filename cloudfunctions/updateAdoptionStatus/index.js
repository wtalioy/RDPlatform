// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        const { id, isAdopted, adoptionInfo } = event

        if (!id) {
            return {
                success: false,
                error: '缺少必要参数：id'
            }
        }

        const updateData = {
            isAdopted: !!isAdopted,
            updatedAt: db.serverDate()
        }

        // 如果提供了认养信息，则一并更新
        if (adoptionInfo) {
            updateData.adoptionInfo = adoptionInfo
        }

        // 更新认养状态
        const result = await db.collection('adoptionRaccoons')
            .where({
                id: Number(id)
            })
            .update({
                data: updateData
            })

        if (result.stats.updated === 0) {
            return {
                success: false,
                error: '未找到该貉或更新失败'
            }
        }

        return {
            success: true,
            message: isAdopted ? '认养成功' : '取消认养成功',
            data: result
        }
    } catch (err) {
        console.error('更新认养状态失败：', err)
        return {
            success: false,
            error: err
        }
    }
}