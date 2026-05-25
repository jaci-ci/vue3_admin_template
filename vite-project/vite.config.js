import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vue from '@vitejs/plugin-vue';
export default defineConfig(({ command, mode }) => {
    //获取各种环境下的对应变量
    let env = loadEnv(mode, process.cwd());
    return {
        plugins: [
            vue(),
            // SVG 插件
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                symbolId: 'icon-[dir]-[name]'
            }),
            // Mock 插件（已禁用，使用真实接口）
            viteMockServe({
                localEnabled: false,
            }),
        ],
        // 路径别名
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src")
            }
        },
        // SCSS 全局变量
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/styles/variable.scss" as *;`,
                },
            }
        },
        //代理跨域
        server: {
            proxy: {
                '/api': {
                    //获取数据的服务器地址位置
                    target: 'http://117.72.157.194:10086/',
                    //需要代理跨域
                    changeOrigin: true,
                    //路径重写：移除 /api 前缀
                    rewrite: (path) => path.replace(/^\/api/, ''),
                    // 允许重定向
                    followRedirects: true
                }
            }
        }
    };
});
