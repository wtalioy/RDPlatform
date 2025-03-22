<template>
    <view class="adoption-container">
        <!-- 自然元素装饰 -->
        <view class="nature-elements">
            <view class="leaf leaf-1"></view>
            <view class="leaf leaf-2"></view>
            <view class="leaf leaf-3"></view>
            <view class="light-spot light-spot-1"></view>
            <view class="light-spot light-spot-2"></view>
        </view>

        <!-- 介绍区域 -->
        <view class="adoption-intro">
            <view class="intro-card">
                <view class="intro-header">
                    <text class="intro-title">认养一只貉，守护一片城市绿地</text>
                    <text class="intro-subtitle">通过公益助力科研，共建城市生态</text>
                </view>
                <view class="intro-body">
                    <text class="intro-text">您的每一次认养，都将帮助我们:</text>
                    <view class="benefit-item">
                        <text><text class="benefit-highlight">🌿</text> 保护貉的栖息地和生存环境</text>
                    </view>
                    <view class="benefit-item">
                        <text><text class="benefit-highlight">🔍</text> 支持城市野生动物科学研究</text>
                    </view>
                    <view class="benefit-item">
                        <text><text class="benefit-highlight">📚</text> 推动生物多样性教育与保护</text>
                    </view>
                </view>
            </view>
        </view>

        <!-- 貉列表 -->
        <view class="raccoon-dog-list">
            <text class="section-title">选择您想认养的貉</text>
            <scroll-view class="raccoon-scroll" scroll-x="true" show-scrollbar="false">
                <view class="raccoon-cards">
                    <view v-for="(raccoon, index) in raccoonDogs" :key="index" class="raccoon-card"
                        @tap="showRaccoonDetail(raccoon)">
                        <image :src="raccoon.avatar" mode="aspectFill" class="raccoon-avatar"></image>
                        <view class="raccoon-info">
                            <text class="raccoon-name">{{ raccoon.name }}</text>
                            <view class="tag-container">
                                <text v-for="(tag, idx) in raccoon.tags" :key="idx" class="raccoon-tag">{{ tag }}</text>
                            </view>
                        </view>
                        <view class="adoption-status" :class="{ 'adopted': raccoon.isAdopted }">
                            <text>{{ raccoon.isAdopted ? '已被认养' : '可认养' }}</text>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>

        <!-- 公益捐赠说明 -->
        <view class="donation-info">
            <text class="section-title">认养方式</text>
            <view class="donation-steps">
                <view class="step">
                    <view class="step-number">1</view>
                    <text class="step-text">选择心仪的貉</text>
                </view>
                <view class="step-arrow">→</view>
                <view class="step">
                    <view class="step-number">2</view>
                    <text class="step-text">完成公益捐赠</text>
                </view>
                <view class="step-arrow">→</view>
                <view class="step">
                    <view class="step-number">3</view>
                    <text class="step-text">获取认养证书</text>
                </view>
            </view>
            <button class="adoption-button" @tap="showAdoptionGuide">了解认养详情</button>
        </view>
    </view>
</template>

<script>
    import { getAdoptionRaccoons, initAdoptionRaccoons } from '@/api/raccoonApi'

    export default {
        name: 'AdoptionModule',
        data() {
            return {
                raccoonDogs: [],
                loading: false,
                initialized: false
            }
        },
        created() {
            this.fetchRaccoonDogs()
        },
        methods: {
            async fetchRaccoonDogs() {
                try {
                    this.loading = true
                    // 获取所有貉列表（不论是否已被认养）
                    const result = await getAdoptionRaccoons(false, 1, 20)

                    if (result && result.list && result.list.length > 0) {
                        this.raccoonDogs = result.list
                    } else if (!this.initialized) {
                        // 首次加载且未找到数据，尝试初始化数据
                        await this.initializeRaccoonDogs()
                    }
                } catch (error) {
                    console.error('加载认养貉列表失败：', error)
                    uni.showToast({
                        title: '加载数据失败',
                        icon: 'none'
                    })
                } finally {
                    this.loading = false
                }
            },
            async initializeRaccoonDogs() {
                try {
                    const result = await initAdoptionRaccoons(false)

                    if (result && result.success) {
                        this.initialized = true
                        // 重新获取数据
                        await this.fetchRaccoonDogs()
                    }
                } catch (error) {
                    console.error('初始化认养貉数据失败：', error)
                }
            },
            showRaccoonDetail(raccoon) {
                // 存储选中的貉数据
                uni.setStorageSync('selectedRaccoon', raccoon);
                uni.navigateTo({
                    url: '/pages/adoption/RaccoonDetail?id=' + raccoon.id
                });
            },
            showAdoptionGuide() {
                uni.navigateTo({
                    url: '/pages/adoption/AdoptionGuide'
                });
            }
        }
    }
</script>

<style>
    /* 引入样式表 */
    @import url('@/static/css/index/adoption.css');
</style>