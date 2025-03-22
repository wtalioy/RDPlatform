<template>
    <view class="tabs">
        <view class="tab" v-for="(item, index) in tabs" :key="index" :class="{ active: currentTab === index }"
            @tap="switchTab(index)">
            {{ item }}
        </view>
        <view class="tab-indicator" :style="{ left: indicatorPosition }"></view>
    </view>
</template>

<script>
    export default {
        name: 'TabNavigation',
        props: {
            tabs: {
                type: Array,
                required: true
            },
            currentTab: {
                type: Number,
                required: true
            }
        },
        computed: {
            indicatorPosition() {
                // 计算指示器的位置
                return `calc(${this.currentTab * (100 / this.tabs.length)}% + ${50 / this.tabs.length}%)`
            }
        },
        methods: {
            switchTab(index) {
                this.$emit('tab-change', index)
            }
        }
    }
</script>

<style>
    /* 引入样式表 */
    @import url('@/static/css/index/tabs.css');
</style>