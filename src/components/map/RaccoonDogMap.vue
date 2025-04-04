<template>
    <view class="map-container">
        <map id="map" :latitude="centerLatitude" :longitude="centerLongitude" :markers="markers" :show-location="true"
            max-scale=12 @markertap="onMarkerTap" class="map">
        </map>

        <!-- 可折叠统计面板 -->
        <!-- <view class="stats-panel">
            <view class="stats-header" @click="toggleStats">
                <text class="stats-title">貉口数量</text>
                <i class="iconfont icon-angle-right togglebtn" :class="{ rotate: isStatsExpanded }"></i>
            </view>
            <view v-show="isStatsExpanded" class="stats-content">
                <scroll-view scroll-y class="district-list">
                    <view v-for="(count, district) in districtStats" :key="district" class="district-item">
                        <view class="district-info">
                            <text class="district-name">{{ district }}</text>
                            <text class="district-count">{{ count }}</text>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view> -->

        <!-- 地图控制按钮 -->
        <view class="map-controls">
            <button class="control-btn" @click="zoomIn">+</button>
            <button class="control-btn" @click="zoomOut">-</button>
            <button class="control-btn location" @click="moveToLocation">
                <text class="location-icon">📍</text>
            </button>
        </view>
    </view>
</template>

<script>
    import { getRaccoons, getDistrictStats } from '@/api/raccoonApi.js'

    export default {
        name: 'RaccoonDogMap',
        data() {
            return {
                markers: [],
                centerLatitude: 31.230416,
                centerLongitude: 121.473701,
                isStatsExpanded: false,
                districtStats: {},
            }
        },
        methods: {
            toggleStats() {
                this.isStatsExpanded = !this.isStatsExpanded;
            },
            async loadStats() {
                const result = await getDistrictStats()
                if (result.list) {
                    const sortedData = result.list.sort((a, b) => b.count - a.count)
                    const stats = {}
                    sortedData.forEach(item => {
                        stats[item.district] = item.count
                    })
                    this.districtStats = stats
                }
            },
            async loadData() {
                const result = await getRaccoons()
                if (result) {
                    this.markers = result.map(raccoon => ({
                        id: raccoon.id,
                        latitude: raccoon.latitude,
                        longitude: raccoon.longitude,
                        iconPath: raccoon.avatar,
                        width: 70,
                        height: 70,
                        callout: {
                            content: raccoon.name,
                            color: '#ffffff',
                            fontSize: 14,
                            borderRadius: 20,
                            bgColor: 'rgba(74, 123, 90, 0.95)',
                            padding: 10,
                            display: 'ALWAYS',
                            borderWidth: 2,
                            borderColor: '#3d6a4c',
                            textAlign: 'center',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        }
                    }))
                }
            },
            zoomIn() {
                this.mapScale = Math.min(this.mapScale + 1, 20)
            },
            zoomOut() {
                this.mapScale = Math.max(this.mapScale - 1, 3)
            },
            moveToLocation() {
                uni.getLocation({
                    type: 'gcj02',
                    success: (res) => {
                        this.centerLatitude = res.latitude
                        this.centerLongitude = res.longitude
                        this.mapScale = 15
                    },
                    fail: () => {
                        uni.showToast({
                            title: '获取位置失败',
                            icon: 'none'
                        })
                    }
                })
            },
            onMarkerTap(e) {
                const markerId = e.markerId
                uni.navigateTo({
                    url: `/pages/raccoon-detail/index?id=${markerId}`
                })
            }
        },
        mounted() {
            this.loadData()
            this.loadStats()
        }
    }
</script>

<style>
    .map-container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .map {
        width: 100%;
        height: 100%;
    }

    .map-controls {
        position: absolute;
        bottom: 40rpx;
        right: 30rpx;
        display: flex;
        flex-direction: column;
        z-index: 100;
        gap: 15rpx;
    }

    .control-btn {
        width: 80rpx;
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.2);
        font-size: 36rpx;
        font-weight: bold;
        padding: 0;
        line-height: 1;
        margin: 0;
    }

    .location-icon {
        font-size: 32rpx;
    }

    .stats-panel {
        position: absolute;
        top: 20rpx;
        right: 20rpx;
        width: 190rpx;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 28rpx;
        box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 100;
        backdrop-filter: blur(10px);
    }

    .stats-header {
        padding: 20rpx 24rpx;
        margin: -4rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.2s ease;
        border-radius: 28rpx 28rpx 0 0;
        position: relative;
    }

    .stats-title {
        font-size: 30rpx;
        color: #333;
        font-weight: bold;
    }

    .stats-content {
        padding: 0 25rpx 10rpx;
        border-radius: 0 0 24rpx 24rpx;
    }

    .total-count {
        font-size: 28rpx;
        color: #4CAF50;
        margin-bottom: 15rpx;
        padding-bottom: 10rpx;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .district-list {
        max-height: 600rpx;
        overflow-y: auto;
        transition: max-height 1.4s ease;
    }

    .district-item {
        margin-bottom: 2rpx;
    }

    .district-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        /* 确保占满整个容器宽度 */
    }

    .district-name {
        font-size: 26rpx;
        color: #333;
        flex-shrink: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .district-count {
        font-size: 26rpx;
        color: #666;
        min-width: 50rpx;
        text-align: right;
        flex-shrink: 0;
        margin-left: 5rpx;
    }

    .rotate {
        transform: rotate(90deg);
    }

    .togglebtn {
        transition: transform 0.3s ease;
        transform: rotate(0deg);
    }

    .togglebtn.rotate {
        transform: rotate(90deg);
    }

</style>