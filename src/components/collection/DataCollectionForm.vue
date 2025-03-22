<template>
    <view class="data-collection">
        <view class="header">
            <button class="back-btn" @tap="goBack">
                <text class="iconfont icon-back"></text>
                <text>返回</text>
            </button>
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
                        {{ formData.location ? '更新' : '获取' }}
                    </button>
                </view>
            </view>

            <button class="submit-btn" @tap="submitData" :disabled="!canSubmit">
                提交啦!
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
                return this.formData.story.trim() &&
                    this.formData.images.length > 0 &&
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
        padding: 40rpx 30rpx;
        box-sizing: border-box;
        background: linear-gradient(160deg, #f8fcf7 0%, #eaf5f5 100%);
        font-family: 'PingFang SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    .header {
        margin-bottom: 30rpx;
        position: relative;
        display: flex;
        justify-content: flex-start;
    }

    .back-btn {
        height: 76rpx;
        width: 140rpx;
        padding: 12rpx 22rpx 12rpx 0rpx;
        background: linear-gradient(135deg, #4A7B5A 0%, #3d6a4c 100%);
        color: #fff;
        border-radius: 38rpx;
        font-size: 28rpx;
        display: flex;
        align-items: center;
        margin-left: 0;
        box-shadow: 0 4rpx 12rpx rgba(74, 123, 90, 0.3),
            0 2rpx 6rpx rgba(74, 123, 90, 0.2),
            0 8rpx 16rpx rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
    }

    .back-btn:active {
        transform: translateY(2rpx);
        box-shadow: 0 2rpx 6rpx rgba(74, 123, 90, 0.2),
            0 1rpx 3rpx rgba(74, 123, 90, 0.1);
    }

    .back-btn text {
        text-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.2);
    }

    .title {
        font-size: 38rpx;
        font-weight: bold;
        color: #333;
        display: block;
        text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.08);
    }

    .subtitle {
        font-size: 28rpx;
        color: #666;
        margin-top: 10rpx;
        display: block;
    }

    .form-container {
        padding: 10rpx;
    }

    .form-section {
        margin-bottom: 40rpx;
        background: rgba(255, 255, 255, 0.85);
        padding: 30rpx;
        border-radius: 24rpx;
        box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
        border: 1rpx solid rgba(255, 255, 255, 0.7);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .form-section:hover {
        transform: translateY(-2rpx);
        box-shadow: 0 6rpx 22rpx rgba(0, 0, 0, 0.1);
    }

    .section-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #3d6a4c;
        margin: 10rpx 0 25rpx;
        display: block;
        position: relative;
        padding-left: 24rpx;
    }

    .section-title::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 8rpx;
        height: 30rpx;
        background: #4A7B5A;
        border-radius: 4rpx;
    }

    .story-input {
        width: 100%;
        height: 300rpx;
        margin-top: 35rpx;
        padding: 25rpx;
        box-sizing: border-box;
        border: 1rpx solid #ddd;
        border-radius: 16rpx;
        font-size: 28rpx;
        background: rgba(255, 255, 255, 0.7);
        transition: border 0.3s ease, box-shadow 0.3s ease;
    }

    .story-input:focus {
        border: 1rpx solid #4A7B5A;
        box-shadow: 0 0 0 3rpx rgba(74, 123, 90, 0.1);
    }

    .word-count {
        font-size: 24rpx;
        color: #888;
        text-align: right;
        margin-top: 12rpx;
        display: block;
    }

    .image-upload {
        margin: 35rpx 0 20rpx;
    }

    .image-list {
        display: flex;
        flex-wrap: wrap;
        gap: 25rpx;
    }

    .image-item {
        width: 200rpx;
        height: 200rpx;
        position: relative;
        border-radius: 16rpx;
        overflow: hidden;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
        transition: transform 0.2s ease;
    }

    .image-item:active {
        transform: scale(0.97);
    }

    .image-item image {
        width: 100%;
        height: 100%;
        border-radius: 16rpx;
    }

    .delete-btn {
        position: absolute;
        top: -15rpx;
        right: -15rpx;
        width: 44rpx;
        height: 44rpx;
        background: rgba(220, 53, 69, 0.9);
        color: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28rpx;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
        z-index: 2;
    }

    .upload-btn {
        width: 200rpx;
        height: 200rpx;
        border: 2rpx dashed #aaa;
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.5);
        transition: all 0.3s ease;
    }

    .upload-btn:active {
        background: rgba(74, 123, 90, 0.1);
        border-color: #4A7B5A;
    }

    .plus {
        font-size: 70rpx;
        color: #4A7B5A;
        line-height: 1;
    }

    .location-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10rpx;
        padding: 15rpx 10rpx;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 12rpx;
    }

    .location-text {
        font-size: 28rpx;
        color: #555;
        flex: 1;
        margin-right: 20rpx;
    }

    .location-btn {
        padding: 12rpx 32rpx;
        background: linear-gradient(135deg, #A67C52 0%, #8a6343 100%);
        color: #fff;
        border-radius: 35rpx;
        font-size: 26rpx;
        line-height: 1.6;
        box-shadow: 0 4rpx 12rpx rgba(166, 124, 82, 0.3),
            0 2rpx 6rpx rgba(166, 124, 82, 0.2),
            0 8rpx 16rpx rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
    }

    .location-btn:active {
        transform: translateY(2rpx);
        box-shadow: 0 2rpx 6rpx rgba(166, 124, 82, 0.2),
            0 1rpx 3rpx rgba(166, 124, 82, 0.1);
    }

    .submit-btn {
        width: 80%;
        height: 90rpx;
        background: linear-gradient(135deg, #F39C12 0%, #e67e22 100%);
        color: #fff;
        border-radius: 45rpx;
        font-size: 34rpx;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 70rpx auto 40rpx;
        box-shadow: 0 6rpx 16rpx rgba(243, 156, 18, 0.4),
            0 3rpx 8rpx rgba(243, 156, 18, 0.2),
            0 10rpx 20rpx rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        letter-spacing: 4rpx;
    }

    .submit-btn:active {
        transform: translateY(4rpx);
        box-shadow: 0 3rpx 8rpx rgba(243, 156, 18, 0.25),
            0 1rpx 4rpx rgba(243, 156, 18, 0.15);
    }

    .submit-btn[disabled] {
        background: linear-gradient(135deg, #cccccc 0%, #bbbbbb 100%);
        border: 1rpx solid #ddd;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
        opacity: 0.8;
    }

    /* 添加动画效果 */
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10rpx);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .form-section {
        animation: fadeIn 0.5s ease forwards;
    }

    .form-section:nth-child(1) {
        animation-delay: 0.2s;
    }

    .form-section:nth-child(2) {
        animation-delay: 0.4s;
    }

    .form-section:nth-child(3) {
        animation-delay: 0.6s;
    }

    .submit-btn {
        animation: fadeIn 0.5s ease forwards;
        animation-delay: 0.8s;
    }
</style>