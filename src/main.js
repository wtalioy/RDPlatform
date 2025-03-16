import { createSSRApp } from 'vue'
import App from './App.vue'

// 初始化云开发环境
wx.cloud.init({
    env: 'cloud1-2gu7oy6zffbb5efc',
    traceUser: true
})

export function createApp() {
    const app = createSSRApp(App)
    return {
        app
    }
}
