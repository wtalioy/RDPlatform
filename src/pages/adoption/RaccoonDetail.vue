<template>
    <view class="raccoon-detail">

        <view class="raccoon-profile">
            <!-- <image :src="raccoon.avatar" mode="aspectFill" class="profile-avatar"></image> -->
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
            <text class="section-title">ta的自拍照</text>
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
            <button class="adoption-button" @tap="startAdoption">认养{{ raccoon.name }}</button>
        </view>
    </view>
</template>

<script>
    import { getAdoptionRaccoonDetail, updateAdoptionStatus } from '@/api/raccoonApi'

    export default {
        data() {
            return {
                raccoonId: 0,
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
                },
                loading: false
            }
        },
        onLoad(options) {
            if (options.id) {
                this.raccoonId = Number(options.id)
                this.fetchRaccoonDetail()
            }
        },
        methods: {
            async fetchRaccoonDetail() {
                if (!this.raccoonId) return

                try {
                    this.loading = true
                    const data = await getAdoptionRaccoonDetail(this.raccoonId)

                    if (data) {
                        this.raccoon = data
                    }
                } catch (error) {
                    console.error('获取貉详情失败：', error)
                    uni.showToast({
                        title: '获取详情失败',
                        icon: 'none'
                    })
                } finally {
                    this.loading = false
                }
            },
            goBack() {
                uni.navigateBack()
            },
            previewPhotos(index) {
                uni.previewImage({
                    current: this.raccoon.photos[index],
                    urls: this.raccoon.photos
                })
            },
            async startAdoption() {
                // 跳转到认养流程页面
                uni.navigateTo({
                    url: `/pages/adoption/AdoptionProcess?id=${this.raccoon.id}`
                })
            },
            // 新增方法：完成认养
            async completeAdoption(adoptionInfo) {
                try {
                    const result = await updateAdoptionStatus(this.raccoon.id, true, adoptionInfo)

                    if (result && result.success) {
                        // 更新本地数据
                        this.raccoon.isAdopted = true
                        this.raccoon.adoptionInfo = adoptionInfo
                        return true
                    }
                    return false
                } catch (error) {
                    console.error('完成认养失败：', error)
                    return false
                }
            }
        }
    }
</script>

<style>
    /* 引入样式表 */
    @import url('@/static/css/adoption/raccoon-detail.css');
</style>
