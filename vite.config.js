import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { copy } from 'fs-extra'
import * as fs from 'fs-extra'
import path from 'path'

// 复制云函数到目标目录
async function copyCloudFunctions() {
    const src = path.resolve(__dirname, 'cloudfunctions')
    const dest = path.resolve(__dirname, 'dist/dev/mp-weixin/cloudfunctions')
    try {
        await copy(src, dest, {
            filter: (src, dest) => {
                // 排除 node_modules
                return !src.includes('node_modules')
            }
        })
        console.log('云函数文件已复制到构建目录')
    } catch (err) {
        console.error('复制云函数文件失败:', err)
    }
}

async function updateProjectConfig() {
    const configPath = path.resolve(__dirname, 'dist/dev/mp-weixin/project.config.json')
    try {
        const configContent = await fs.readFile(configPath, 'utf-8')
        const config = JSON.parse(configContent)

        // 添加云函数根目录配置
        config.cloudfunctionRoot = 'cloudfunctions/'

        await fs.writeFile(configPath, JSON.stringify(config, null, 2))
        console.log('已更新 project.config.json')
    } catch (err) {
        console.error('更新 project.config.json 失败:', err)
    }
}

// 构建后处理
const afterBuild = () => {
    return {
        name: 'vite-plugin-after-build',
        closeBundle: async () => {
            await copyCloudFunctions()
            await updateProjectConfig()
        }
    }
}

export default defineConfig({
    plugins: [
        uni(),
        afterBuild()
    ]
})
