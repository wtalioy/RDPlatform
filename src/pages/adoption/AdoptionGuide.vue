<template>
    <view class="adoption-guide">

        <view class="guide-content">
            <view class="guide-section">
                <text class="section-title">什么是貉口认养计划？</text>
                <text class="section-content">
                    貉口认养计划是一项公益科研项目，旨在通过公民参与的方式，保护城市中的貉及其栖息地，同时推动城市野生动物研究。您的认养将直接资助貉的保护工作和相关科学研究。
                </text>
            </view>

            <view class="guide-section">
                <text class="section-title">认养一只貉能带来什么？</text>
                <view class="benefit-list">
                    <view class="benefit-item">
                        <text class="benefit-icon">🌿</text>
                        <text class="benefit-text">直接参与城市野生动物保护工作</text>
                    </view>
                    <view class="benefit-item">
                        <text class="benefit-icon">📝</text>
                        <text class="benefit-text">获得专属电子认养证书</text>
                    </view>
                    <view class="benefit-item">
                        <text class="benefit-icon">📸</text>
                        <text class="benefit-text">定期收到您认养的貉的近况更新</text>
                    </view>
                    <view class="benefit-item">
                        <text class="benefit-icon">🎁</text>
                        <text class="benefit-text">获得貉主题限量文创周边</text>
                    </view>
                    <view class="benefit-item">
                        <text class="benefit-icon">🔍</text>
                        <text class="benefit-text">有机会参与线下貉观察活动</text>
                    </view>
                </view>
            </view>

            <view class="guide-section">
                <text class="section-title">认养流程</text>
                <view class="process-steps">
                    <view class="process-step">
                        <view class="step-number">1</view>
                        <view class="step-content">
                            <text class="step-title">选择心仪的貉</text>
                            <text class="step-desc">在认养列表中选择一只您喜欢的貉</text>
                        </view>
                    </view>
                    <view class="process-step">
                        <view class="step-number">2</view>
                        <view class="step-content">
                            <text class="step-title">完成公益捐赠</text>
                            <text class="step-desc">单次认养周期为一年，捐赠金额为200元</text>
                        </view>
                    </view>
                    <view class="process-step">
                        <view class="step-number">3</view>
                        <view class="step-content">
                            <text class="step-title">获取认养证书</text>
                            <text class="step-desc">系统将自动生成电子认养证书</text>
                        </view>
                    </view>
                    <view class="process-step">
                        <view class="step-number">4</view>
                        <view class="step-content">
                            <text class="step-title">接收定期更新</text>
                            <text class="step-desc">每月接收一次您认养的貉的最新动态</text>
                        </view>
                    </view>
                </view>
            </view>

            <view class="guide-section">
                <text class="section-title">我的捐赠用于哪里？</text>
                <view class="donation-usage">
                    <view class="usage-item">
                        <view class="usage-percent">40%</view>
                        <view class="usage-bar">
                            <view class="usage-fill" style="width: 40%;"></view>
                        </view>
                        <text class="usage-desc">栖息地保护与监测</text>
                    </view>
                    <view class="usage-item">
                        <view class="usage-percent">30%</view>
                        <view class="usage-bar">
                            <view class="usage-fill" style="width: 30%;"></view>
                        </view>
                        <text class="usage-desc">貉行为习性研究</text>
                    </view>
                    <view class="usage-item">
                        <view class="usage-percent">20%</view>
                        <view class="usage-bar">
                            <view class="usage-fill" style="width: 20%;"></view>
                        </view>
                        <text class="usage-desc">公众科普教育</text>
                    </view>
                    <view class="usage-item">
                        <view class="usage-percent">10%</view>
                        <view class="usage-bar">
                            <view class="usage-fill" style="width: 10%;"></view>
                        </view>
                        <text class="usage-desc">平台运营维护</text>
                    </view>
                </view>
            </view>

            <view class="guide-section">
                <text class="section-title">常见问题</text>
                <view class="faq-list">
                    <view class="faq-item">
                        <text class="faq-question">认养周期有多长？</text>
                        <text class="faq-answer">一次认养的有效期为12个月，到期后您可以选择续养或停止认养。</text>
                    </view>
                    <view class="faq-item">
                        <text class="faq-question">我能否实地看望我认养的貉？</text>
                        <text class="faq-answer">为了不干扰貉的正常生活，我们不建议近距离接触野生貉。但我们会定期组织观察活动，认养者将优先获得参与机会。</text>
                    </view>
                    <view class="faq-item">
                        <text class="faq-question">如果我认养的貉生病或迁移了怎么办？</text>
                        <text class="faq-answer">如果您认养的貉健康状况有变化或迁移，我们会及时通知您，并可以为您安排更换认养对象。</text>
                    </view>
                </view>
            </view>
        </view>

        <view class="action-buttons">
            <button class="action-btn contact-btn">联系我们</button>
            <button class="action-btn start-btn" @tap="startAdoption">开始认养</button>
        </view>
    </view>
</template>

<script>
    export default {
        methods: {
            goBack() {
                uni.navigateBack();
            },
            startAdoption() {
                // 返回到认养列表
                uni.navigateBack();
            }
        }
    }
</script>

<style>
    @import url('@/static/css/adoption/adoption-guide.css');
</style>
