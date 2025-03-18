<template>
    <view class="content">
        <view class="tabs">
            <view class="tab" v-for="(item, index) in tabs" :key="index" :class="{ active: currentTab === index }"
                @tap="switchTab(index)">
                {{ item }}
            </view>
        </view>

        <!-- 貉情地图模块 -->
        <view v-if="currentTab === 0" class="map-container">
            <RaccoonDogMap />
        </view>

        <!-- 数据收集模块 -->
        <view v-else-if="currentTab === 1" class="collection-container">
            <!-- 未展开表单时显示大按钮和数据收集进度 -->
            <view v-if="!showCollectionForm" class="collection-intro">
                <view class="share-button" @tap="showForm">
                    <text class="share-title">留下您的足迹</text>
                    <text class="share-subtitle">让我们一起记录城市中的野生动物</text>
                </view>

                <!-- 数据收集进度 -->
                <view class="progress-section">
                    <text class="progress-title">足迹进度</text>
                    <view class="progress-bar">
                        <view class="progress" :style="{ width: progressWidth }"></view>
                    </view>
                    <text class="progress-text">已集齐 {{ userContributions }} 条足迹</text>
                    <text class="reward-text" v-if="!hasUnlockedReward && userContributions >= requiredContributions">
                        🎉 恭喜解锁限定小貉公仔！
                    </text>
                </view>
            </view>

            <!-- 点击按钮后展示表单 -->
            <DataCollectionForm v-else @back="hideForm" />
        </view>

        <!-- 貉口认养模块（待开发）-->
        <view v-else-if="currentTab === 2" class="coming-soon">
            <image src="/static/images/coming-soon.png" mode="aspectFit" class="coming-soon-img"></image>
            <text class="coming-soon-text">貉口认养功能即将上线</text>
            <text class="coming-soon-desc">敬请期待，认养一只貉，守护一片城市绿地</text>
        </view>

    </view>
</template>

<script>
    import RaccoonDogMap from '@/components/map/RaccoonDogMap.vue'
    import DataCollectionForm from '@/components/collection/DataCollectionForm.vue'
    import { getUserContributions } from '@/api/raccoonApi'

    export default {
        components: {
            RaccoonDogMap,
            DataCollectionForm
        },
        data() {
            return {
                currentTab: 0,
                tabs: ['貉情地图', '数据收集', '貉口认养'],
                showCollectionForm: false,
                userContributions: 0,
                requiredContributions: 10,
                hasUnlockedReward: false
            }
        },
        computed: {
            progressWidth() {
                const progress = Math.min(this.userContributions / this.requiredContributions * 100, 100)
                return progress + '%'
            }
        },
        methods: {
            switchTab(index) {
                this.currentTab = index
                if (index === 1) {
                    // 切换到数据收集标签页时加载用户贡献数据
                    this.loadUserContributions()
                }
            },
            showForm() {
                this.showCollectionForm = true
            },
            hideForm() {
                this.showCollectionForm = false
                // 隐藏表单后重新加载用户贡献数据
                this.loadUserContributions()
            },
            async loadUserContributions() {
                const result = await getUserContributions()
                this.userContributions = result.count
                this.hasUnlockedReward = result.hasUnlockedReward
            }
        }
    }
</script>

<style>
    .content {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .tabs {
        display: flex;
        justify-content: space-around;
        padding: 20rpx 0;
        background-color: #ffffff;
        box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
        z-index: 10;
    }

    .tab {
        font-size: 30rpx;
        color: #333;
        padding: 15rpx 30rpx;
        position: relative;
    }

    .tab.active {
        color: #4C74AF;
        font-weight: bold;
    }

    .tab.active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60rpx;
        height: 6rpx;
        background-color: #4C74AF;
        border-radius: 3rpx;
    }

    .map-container {
        flex: 1;
        position: relative;
        width: 100%;
        height: calc(100vh - 100rpx);
    }

    .stats-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 40rpx;
    }

    .stats-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;
    }

    .stats-title {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
    }

    .stats-total {
        font-size: 28rpx;
        color: #666;
    }

    .district-list {
        flex: 1;
    }

    .district-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx 0;
        border-bottom: 1rpx solid #eee;
    }

    .district-name {
        font-size: 30rpx;
        color: #333;
    }

    .district-count {
        font-size: 28rpx;
        color: #666;
    }

    .progress-bar {
        flex: 1;
        height: 20rpx;
        background-color: #f0f0f0;
        border-radius: 10rpx;
        margin-left: 20rpx;
    }

    .progress {
        height: 100%;
        background-color: #4C74AF;
        border-radius: 10rpx;
    }

    .coming-soon {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 40rpx;
    }

    .coming-soon-img {
        width: 200rpx;
        height: 200rpx;
        margin-bottom: 40rpx;
    }

    .coming-soon-text {
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
        color: #333;
    }

    .coming-soon-desc {
        font-size: 28rpx;
        color: #666;
        text-align: center;
        line-height: 1.6;
    }

    .test-btn {
        margin-top: 20px;
        padding: 10px 20px;
    }

    .module-card {
        background: #ffffff;
        border-radius: 12rpx;
        padding: 30rpx;
        margin: 30rpx;
        box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
    }

    .module-title {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 20rpx;
        display: block;
    }

    .module-desc {
        font-size: 28rpx;
        color: #666;
        line-height: 1.5;
    }

    .collection-container {
        flex: 1;
        position: relative;
        width: 100%;
        height: calc(100vh - 100rpx);
        background-color: #f8f8f8;
    }

    .collection-intro {
        display: flex;
        flex-direction: column;
        padding: 40rpx;
        height: 100%;
    }

    .share-button {
        background: #ffffff;
        border-radius: 20rpx;
        padding: 60rpx 40rpx;
        margin-bottom: 40rpx;
        text-align: center;
        box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.10);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .share-title {
        font-size: 40rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 20rpx;
    }

    .share-subtitle {
        font-size: 30rpx;
        color: #666;
        line-height: 1.5;
    }

    .progress-section {
        background: #ffffff;
        padding: 30rpx;
        border-radius: 16rpx;
        box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    }

    .progress-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
        display: block;
    }

    .progress-bar {
        width: 100%;
        height: 24rpx;
        margin: 30rpx auto;
        background: #f0f0f0;
        border-radius: 12rpx;
        overflow: hidden;
    }

    .progress {
        height: 100%;
        background: #4C74AF;
        transition: width 0.3s ease;
    }

    .progress-text {
        font-size: 28rpx;
        color: #666;
        margin-top: 20rpx;
        display: block;
    }

    .reward-text {
        font-size: 30rpx;
        color: #ff6b6b;
        margin-top: 15rpx;
        display: block;
        font-weight: bold;
    }
</style>
