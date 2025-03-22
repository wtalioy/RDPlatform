<template>
    <view class="raccoon-detail">
        <view class="header">
            <button class="back-btn" @tap="goBack">
                <text class="iconfont icon-back"></text>
                <text>返回</text>
            </button>
        </view>

        <view class="raccoon-profile">
            <image :src="raccoon.avatar" mode="aspectFill" class="profile-avatar"></image>
            <view class="profile-info">
                <text class="profile-name">{{ raccoon.name }}</text>
                <text class="profile-location">{{ raccoon.location }}</text>
                <view class="profile-tags">
                    <text v-for="(tag, index) in raccoon.tags" :key="index" class="profile-tag">{{ tag }}</text>
                </view>
                <view class="adoption-badge" :class="{ 'adopted': raccoon.isAdopted }">
                    <text>{{ raccoon.isAdopted ? '已被认养' : '可认养' }}</text>
                </view>
            </view>
        </view>

        <view class="detail-section">
            <text class="section-title">貉的故事</text>
            <text class="raccoon-story">{{ raccoon.description }}</text>
        </view>

        <view class="detail-section">
            <text class="section-title">健康状况</text>
            <view class="health-info">
                <text class="health-status">{{ raccoon.health }}</text>
                <text class="health-description">研究人员定期对{{ raccoon.name }}进行健康检查，目前状态良好。</text>
            </view>
        </view>

        <view class="detail-section">
            <text class="section-title">日常活动</text>
            <view class="activities-list">
                <view v-for="(activity, index) in raccoon.activities" :key="index" class="activity-item">
                    <text class="activity-dot"></text>
                    <text class="activity-text">{{ activity }}</text>
                </view>
            </view>
        </view>

        <view class="detail-section">
            <text class="section-title">貉的自拍照</text>
            <scroll-view class="photos-scroll" scroll-x="true" show-scrollbar="false">
                <view class="photos-container">
                    <view v-for="(photo, index) in raccoon.photos" :key="index" class="photo-item"
                        @tap="previewPhotos(index)">
                        <image :src="photo" mode="aspectFill" class="raccoon-photo"></image>
                    </view>
                </view>
            </scroll-view>
        </view>

        <view v-if="!raccoon.isAdopted" class="adoption-action">
            <button class="adopt-button" @tap="startAdoption">认养{{ raccoon.name }}</button>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                raccoon: {
                    id: 0,
                    name: '',
                    avatar: '',
                    location: '',
                    tags: [],
                    isAdopted: false,
                    description: '',
                    health: '',
                    activities: [],
                    photos: []
                }
            }
        },
        onLoad() {
            // 从缓存获取选中的貉数据
            const selectedRaccoon = uni.getStorageSync('selectedRaccoon');
            if (selectedRaccoon) {
                this.raccoon = selectedRaccoon;
            }
        },
        methods: {
            goBack() {
                uni.navigateBack();
            },
            previewPhotos(index) {
                uni.previewImage({
                    current: this.raccoon.photos[index],
                    urls: this.raccoon.photos
                });
            },
            startAdoption() {
                // 跳转到认养流程页面
                uni.navigateTo({
                    url: `/pages/adoption/AdoptionProcess?id=${this.raccoon.id}`
                });
            }
        }
    }
</script>

<style>
    /* 引入样式表 */
    @import url('@/static/css/adoption/raccoon-detail.css');
</style>
