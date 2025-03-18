<template>
    <view class="data-collection">
        <view class="header">
            <view class="back-btn" @tap="goBack">
                <text class="back-icon">←</text>
                <text class="back-text">返回</text>
            </view>
            <text class="title">分享您的观察</text>
            <text class="subtitle">记录您与城市野生动物的故事</text>
        </view>

        <view class="form-container">
            <!-- 故事分享 -->
            <view class="form-section">
                <text class="section-title">分享故事</text>
                <textarea v-model="formData.story" placeholder="分享您与城市野生动物的故事..." class="story-input"
                    maxlength="1000" />
                <text class="word-count">{{ formData.story.length }}/1000</text>
            </view>

            <!-- 影像上传 -->
            <view class="form-section">
                <text class="section-title">上传影像</text>
                <view class="image-upload">
                    <view class="image-list">
                        <view v-for="(image, index) in formData.images" :key="index" class="image-item">
                            <image :src="image" mode="aspectFill" @tap="previewImage(image)" />
                            <text class="delete-btn" @tap="deleteImage(index)">×</text>
                        </view>
                        <view v-if="formData.images.length < 9" class="upload-btn" @tap="chooseImage">
                            <text class="plus">+</text>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 足迹数据 -->
            <view class="form-section">
                <text class="section-title">记录足迹</text>
                <view class="location-section">
                    <text class="location-text">{{ locationText }}</text>
                    <button class="location-btn" @tap="getLocation">
                        {{ formData.location ? '更新位置' : '获取位置' }}
                    </button>
                </view>
            </view>

            <button class="submit-btn" @tap="submitData" :disabled="!canSubmit">
                提交记录
            </button>
        </view>
    </view>
</template>

<script>
    import { uploadWildlifeImage, submitWildlifeData } from '@/api/raccoonApi'

    export default {
        name: 'DataCollectionForm',
        emits: ['back'],
        data() {
            return {
                formData: {
                    story: '',
                    images: [],
                    location: null,
                    timestamp: null
                },
                locationText: '尚未获取位置'
            }
        },
        computed: {
            canSubmit() {
                return this.formData.story.trim() ||
                    this.formData.images.length > 0 ||
                    this.formData.location
            }
        },
        methods: {
            goBack() {
                this.$emit('back')
            },
            async chooseImage() {
                try {
                    const res = await uni.chooseImage({
                        count: 9 - this.formData.images.length,
                        sizeType: ['compressed'],
                        sourceType: ['album', 'camera']
                    })
                    this.formData.images = [...this.formData.images, ...res.tempFilePaths]
                } catch (error) {
                    uni.showToast({
                        title: '选择图片失败',
                        icon: 'none'
                    })
                }
            },
            deleteImage(index) {
                this.formData.images.splice(index, 1)
            },
            previewImage(current) {
                uni.previewImage({
                    urls: this.formData.images,
                    current
                })
            },
            async getLocation() {
                try {
                    const res = await uni.getLocation({
                        type: 'gcj02'
                    })
                    this.formData.location = {
                        latitude: res.latitude,
                        longitude: res.longitude
                    }
                    this.locationText = `位置已获取 (${res.latitude.toFixed(4)}, ${res.longitude.toFixed(4)})`
                } catch (error) {
                    uni.showToast({
                        title: '获取位置失败',
                        icon: 'none'
                    })
                }
            },
            async submitData() {
                if (!this.canSubmit) return

                uni.showLoading({
                    title: '正在提交...'
                })

                try {
                    const uploadPromises = this.formData.images.map(image => uploadWildlifeImage(image))
                    const uploadResults = await Promise.all(uploadPromises)
                    const uploadedImages = uploadResults
                        .filter(result => result.success)
                        .map(result => result.fileID)

                    const result = await submitWildlifeData({
                        story: this.formData.story,
                        images: uploadedImages,
                        location: this.formData.location,
                        timestamp: new Date().toISOString()
                    })

                    if (result.success) {
                        uni.showToast({
                            title: '提交成功',
                            icon: 'success'
                        })
                        this.formData = {
                            story: '',
                            images: [],
                            location: null,
                            timestamp: null
                        }
                        this.locationText = '尚未获取位置'
                        setTimeout(() => {
                            this.goBack()
                        }, 1500)
                    }
                } catch (error) {
                    uni.showToast({
                        title: '提交失败',
                        icon: 'none'
                    })
                } finally {
                    uni.hideLoading()
                }
            }
        }
    }
</script>

<style>
    .data-collection {
        height: 100%;
        overflow-y: auto;
        padding: 30rpx;
        box-sizing: border-box;
        background: #f8f8f8;
    }

    .header {
        margin-bottom: 40rpx;
        position: relative;
    }

    .back-btn {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
    }

    .back-icon {
        font-size: 36rpx;
        margin-right: 8rpx;
    }

    .back-text {
        font-size: 28rpx;
        color: #4C74AF;
    }

    .title {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
        display: block;
    }

    .subtitle {
        font-size: 28rpx;
        color: #666;
        margin-top: 10rpx;
        display: block;
    }

    .form-section {
        margin-bottom: 40rpx;
        background: #fff;
        padding: 20rpx;
        border-radius: 12rpx;
        box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    }

    .section-title {
        font-size: 30rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 20rpx;
        display: block;
    }

    .story-input {
        width: 100%;
        height: 200rpx;
        padding: 20rpx;
        box-sizing: border-box;
        border: 1rpx solid #eee;
        border-radius: 8rpx;
        font-size: 28rpx;
    }

    .word-count {
        font-size: 24rpx;
        color: #999;
        text-align: right;
        margin-top: 10rpx;
        display: block;
    }

    .image-list {
        display: flex;
        flex-wrap: wrap;
        gap: 20rpx;
    }

    .image-item {
        width: 200rpx;
        height: 200rpx;
        position: relative;
    }

    .image-item image {
        width: 100%;
        height: 100%;
        border-radius: 8rpx;
    }

    .delete-btn {
        position: absolute;
        top: -20rpx;
        right: -20rpx;
        width: 40rpx;
        height: 40rpx;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24rpx;
    }

    .upload-btn {
        width: 200rpx;
        height: 200rpx;
        border: 2rpx dashed #ddd;
        border-radius: 8rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .plus {
        font-size: 60rpx;
        color: #999;
    }

    .location-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .location-text {
        font-size: 28rpx;
        color: #666;
        flex: 1;
        margin-right: 20rpx;
    }

    .location-btn {
        padding: 10rpx 30rpx;
        background: #4C74AF;
        color: #fff;
        border-radius: 30rpx;
        font-size: 26rpx;
    }

    .submit-btn {
        width: 100%;
        height: 80rpx;
        background: #4C74AF;
        color: #fff;
        border-radius: 40rpx;
        font-size: 32rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 40rpx 0;
    }

    .submit-btn[disabled] {
        background: #ccc;
    }
</style>