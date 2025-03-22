<template>
    <view class="content">
        <!-- 标签导航 -->
        <TabNavigation :tabs="tabs" :currentTab="currentTab" @tab-change="switchTab" />

        <!-- 貉情地图模块 -->
        <view v-if="currentTab === 0" class="map-container">
            <RaccoonDogMap />
        </view>

        <!-- 数据收集模块 -->
        <CollectionModule v-else-if="currentTab === 1" />

        <!-- 貉口认养模块 -->
        <AdoptionModule v-else-if="currentTab === 2" />
    </view>
</template>

<script>
    import RaccoonDogMap from '@/components/map/RaccoonDogMap.vue'
    import TabNavigation from '@/components/index/TabNavigation.vue'
    import CollectionModule from '@/components/index/CollectionModule.vue'
    import AdoptionModule from '@/components/index/AdoptionModule.vue'

    export default {
        components: {
            RaccoonDogMap,
            TabNavigation,
            CollectionModule,
            AdoptionModule
        },
        data() {
            return {
                currentTab: 0,
                tabs: ['貉情地图', '数据收集', '貉口认养']
            }
        },
        methods: {
            switchTab(index) {
                this.currentTab = index
            }
        }
    }
</script>

<style>
    /* 引入主样式表 */
    @import url('@/static/css/index/index.css');
</style>
