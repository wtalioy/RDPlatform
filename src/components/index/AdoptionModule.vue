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
                        <text class="iconfont icon-protect"></text>
                        <text>保护貉的栖息地和生存环境</text>
                    </view>
                    <view class="benefit-item">
                        <text class="iconfont icon-research"></text>
                        <text>支持城市野生动物科学研究</text>
                    </view>
                    <view class="benefit-item">
                        <text class="iconfont icon-education"></text>
                        <text>推动生物多样性教育与保护</text>
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
                            <text class="raccoon-location">{{ raccoon.location }}</text>
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
    export default {
        name: 'AdoptionModule',
        data() {
            return {
                raccoonDogs: [
                    {
                        id: 1,
                        name: '团团',
                        avatar: '/static/images/raccoon-dog1.jpg',
                        location: '世纪公园',
                        tags: ['活泼', '好奇'],
                        isAdopted: false,
                        description: '团团是一只非常活泼的小貉，喜欢在黄昏时分出来活动，经常可以看到它在草丛中探头探脑。',
                        health: '良好',
                        activities: ['觅食', '玩耍', '休息'],
                        photos: ['/static/images/raccoon-dog1-1.jpg', '/static/images/raccoon-dog1-2.jpg']
                    },
                    {
                        id: 2,
                        name: '圆圆',
                        avatar: '/static/images/raccoon-dog2.jpg',
                        location: '共青森林公园',
                        tags: ['安静', '稳重'],
                        isAdopted: true,
                        description: '圆圆性格稳重，常在树林边缘活动，非常警觉但也相对容易被观察到。',
                        health: '良好',
                        activities: ['挖洞', '睡觉', '巡逻'],
                        photos: ['/static/images/raccoon-dog2-1.jpg', '/static/images/raccoon-dog2-2.jpg']
                    },
                    {
                        id: 3,
                        name: '点点',
                        avatar: '/static/images/raccoon-dog3.jpg',
                        location: '上海植物园',
                        tags: ['机灵', '独立'],
                        isAdopted: false,
                        description: '点点很机灵，有自己的一套生存法则，喜欢独自一人探索，偶尔会和其他貉一起活动。',
                        health: '良好',
                        activities: ['探索', '觅食', '游荡'],
                        photos: ['/static/images/raccoon-dog3-1.jpg', '/static/images/raccoon-dog3-2.jpg']
                    },
                    {
                        id: 4,
                        name: '毛毛',
                        avatar: '/static/images/raccoon-dog4.jpg',
                        location: '滨江森林公园',
                        tags: ['友善', '胆小'],
                        isAdopted: false,
                        description: '毛毛性格有点胆小，但是对熟悉的环境非常友善，会定期出现在固定地点。',
                        health: '良好',
                        activities: ['休息', '徘徊', '啃食'],
                        photos: ['/static/images/raccoon-dog4-1.jpg', '/static/images/raccoon-dog4-2.jpg']
                    }
                ]
            }
        },
        methods: {
            showRaccoonDetail(raccoon) {
                // 存储选中的貉数据
                uni.setStorageSync('selectedRaccoon', raccoon);
                uni.navigateTo({
                    url: '/pages/adoption/RaccoonDetail'
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