<template>
    <view class="map-container">
        <map id="map" :latitude="centerLatitude" :longitude="centerLongitude" :markers="markers" :show-location="true"
            :scale="mapScale" @markertap="onMarkerTap" class="map">
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
                mapScale: 12,
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
                        width: 65,
                        height: 65,
                        // callout: {
                        //     content: raccoon.name,
                        //     color: '#ffffff',
                        //     fontSize: 14,
                        //     borderRadius: 20,
                        //     bgColor: 'rgba(74, 123, 90, 0.95)',
                        //     padding: 10,
                        //     display: 'ALWAYS',
                        //     borderWidth: 2,
                        //     borderColor: '#3d6a4c',
                        //     textAlign: 'center',
                        //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        // }
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
                        this.mapScale = 12
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
            // this.loadStats()
        }
    }
</script>

<style>
    @import url('@/static/css/map/raccoon-map.css');
</style>