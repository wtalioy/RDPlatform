<template>
    <view class="collection-container">
        <!-- 自然元素装饰 -->
        <view class="nature-elements">
            <view class="leaf leaf-1"></view>
            <view class="leaf leaf-2"></view>
            <view class="leaf leaf-3"></view>
            <view class="trail trail-1"></view>
            <view class="light-spot light-spot-1"></view>
            <view class="light-spot light-spot-2"></view>
        </view>

        <!-- 未展开表单时显示大按钮和数据收集进度 -->
        <view v-if="!showForm" class="collection-intro">
            <view class="share-button" @tap="handleShowForm">
                <view class="geo-circle"></view>
                <view class="geo-triangle"></view>
                <view class="share-icon">
                    <text class="iconfont icon-footprint">👣</text>
                </view>
                <text class="share-title">留下您的足迹</text>
                <text class="share-subtitle">让我们一起记录城市中的野生动物</text>
                <view class="flowing-line"></view>
            </view>

            <!-- 数据收集进度 -->
            <view class="progress-section">
                <text class="progress-title">足迹进度</text>
                <view class="progress-bar">
                    <view class="progress" :style="{ width: progressWidth }">
                        <view class="progress-glow"></view>
                    </view>
                </view>
                <view class="progress-stats">
                    <text class="progress-text">已集齐 {{ userContributions }} 条足迹</text>
                    <text class="progress-goal">目标: {{ requiredContributions }} 条</text>
                </view>
                <view class="reward-container" v-if="hasUnlockedReward && userContributions >= requiredContributions">
                    <view class="reward-badge">
                        <text class="reward-emoji">🎉</text>
                    </view>
                    <text class="reward-text">恭喜解锁限定小貉公仔！</text>
                </view>
            </view>

            <!-- 添加动物足迹主题的装饰元素 -->
            <view class="footprints-decoration">
                <view class="footprint fp-1"></view>
                <view class="footprint fp-2"></view>
                <view class="footprint fp-3"></view>
                <view class="footprint fp-4"></view>
            </view>
        </view>

        <!-- 点击按钮后展示表单 -->
        <DataCollectionForm v-else @back="handleHideForm" />
    </view>
</template>

<script>
    import DataCollectionForm from '@/components/collection/DataCollectionForm.vue'
    import { getUserContributions } from '@/api/raccoonApi'

    export default {
        name: 'CollectionModule',
        components: {
            DataCollectionForm
        },
        data() {
            return {
                showForm: false,
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
        mounted() {
            // 初始化时加载用户贡献数据
            this.loadUserContributions()
        },
        methods: {
            handleShowForm() {
                this.showForm = true
            },
            handleHideForm() {
                this.showForm = false
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
    /* 引入样式表 */
    @import url('@/static/css/index/collection.css');
</style>