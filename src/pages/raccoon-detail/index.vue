<template>
    <view class="raccoon-detail">
        <view v-if="loading" class="loading">
            <text>加载中...</text>
        </view>
        <view v-else-if="raccoonInfo">
            <view class="raccoon-header">
                <image class="raccoon-avatar" :src="raccoonInfo.avatar" mode="aspectFill" />
                <view class="raccoon-info">
                    <text class="raccoon-name">{{ raccoonInfo.name }}</text>
                    <text class="raccoon-location">所在区域：{{ raccoonInfo.district }}</text>
                </view>
            </view>

            <view class="section character">
                <view class="section-title">性格特征</view>
                <text class="section-content">{{ raccoonInfo.character }}</text>
            </view>

            <view class="section social">
                <view class="section-title">社会关系</view>
                <text class="section-content">{{ raccoonInfo.socialRelations }}</text>
            </view>

            <view class="section story">
                <view class="section-title">貉的故事</view>
                <text class="section-content">{{ raccoonInfo.story }}</text>
            </view>

            <view class="gallery">
                <view class="section-title">活动照片</view>
                <scroll-view class="gallery-scroll" scroll-x>
                    <view class="gallery-item" v-for="(photo, index) in raccoonInfo.photos" :key="index">
                        <image :src="photo" mode="aspectFill" @tap="previewImage(photo)" />
                    </view>
                </scroll-view>
            </view>

            <button class="back-button" @tap="goBack">返回地图</button>
        </view>
        <view v-else class="error">
            <text>未找到该貉的信息</text>
        </view>
    </view>
</template>

<script>
    import { getRaccoonDetail } from '@/api/raccoonApi.js'

    export default {
        data() {
            return {
                raccoonId: null,
                raccoonInfo: null,
                loading: true
            }
        },
        async onLoad(options) {
            if (options.id) {
                this.raccoonId = parseInt(options.id)
                await this.loadRaccoonInfo()
            }
        },
        methods: {
            async loadRaccoonInfo() {
                try {
                    this.loading = true
                    const result = await getRaccoonDetail(this.raccoonId)
                    if (result && result.list && result.list[0]) {
                        this.raccoonInfo = result.list[0]
                        // 获取云存储图片的临时访问链接
                        if (this.raccoonInfo.photos && this.raccoonInfo.photos.length > 0) {
                            const { fileList } = await wx.cloud.getTempFileURL({
                                fileList: this.raccoonInfo.photos
                            })
                            this.raccoonInfo.photos = fileList.map(file => file.tempFileURL)
                        }
                    }
                } catch (error) {
                    console.error('获取貉详情失败：', error)
                    uni.showToast({
                        title: '获取貉信息失败',
                        icon: 'none'
                    })
                } finally {
                    this.loading = false
                }
            },
            goBack() {
                uni.navigateBack()
            },
            previewImage(current) {
                uni.previewImage({
                    current,
                    urls: this.raccoonInfo.photos
                })
            }
        }
    }
</script>

<style>
    .raccoon-detail {
        padding: 30rpx;
    }

    .raccoon-header {
        display: flex;
        align-items: center;
        margin-bottom: 40rpx;
    }

    .raccoon-avatar {
        width: 150rpx;
        height: 150rpx;
        border-radius: 75rpx;
        margin-right: 30rpx;
    }

    .raccoon-info {
        flex: 1;
    }

    .raccoon-name {
        font-size: 40rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
        display: block;
    }

    .raccoon-location {
        font-size: 28rpx;
        color: #666;
        display: block;
    }

    .section {
        margin-bottom: 30rpx;
        background-color: #f9f9f9;
        padding: 20rpx;
        border-radius: 10rpx;
    }

    .section-title {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 15rpx;
        color: #333;
        border-bottom: 1px solid #eee;
        padding-bottom: 10rpx;
    }

    .section-content {
        font-size: 28rpx;
        line-height: 1.6;
        color: #555;
    }

    .gallery {
        margin-bottom: 40rpx;
    }

    .gallery-scroll {
        white-space: nowrap;
        margin-top: 15rpx;
    }

    .gallery-item {
        display: inline-block;
        margin-right: 15rpx;
    }

    .gallery-item image {
        width: 200rpx;
        height: 200rpx;
        border-radius: 8rpx;
    }

    .back-button {
        background-color: #4CAF50;
        color: white;
        border-radius: 40rpx;
        font-size: 32rpx;
        padding: 15rpx 0;
    }

    .loading,
    .error {
        padding: 40rpx;
        text-align: center;
        color: #666;
    }
</style>