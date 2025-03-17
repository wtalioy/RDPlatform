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
        <view v-else-if="currentTab === 1" class="data-collection-tab">
            <view class="module-card" @tap="goToDataCollection">
                <text class="module-title">分享您的观察</text>
                <text class="module-desc">让我们一起记录城市中的野生动物</text>
            </view>
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

    export default {
        components: {
            RaccoonDogMap
        },
        data() {
            return {
                currentTab: 0,
                tabs: ['貉情地图', '数据收集', '貉口认养']
            }
        },
        methods: {
            switchTab(index) {
                this.currentTab = index
            },
            goToDataCollection() {
                uni.navigateTo({
                    url: '/pages/data-collection/index',
                    fail: (err) => {
                        console.error('导航失败：', err)
                        uni.showToast({
                            title: '页面跳转失败',
                            icon: 'none'
                        })
                    }
                })
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
</style>
