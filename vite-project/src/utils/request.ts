import axios from "axios";
import { ElMessage } from "element-plus";
//引入用户相关仓库
import useUserStore from "@/store/modules/user";
//创建axios实例
let request = axios.create({
    baseURL: 'http://117.72.157.194:10086/',
    timeout: 5000,
    // 允许重定向
    maxRedirects: 5
})
//请求拦截器
request.interceptors.request.use(config => {
    //获取用户相关小仓库：获取仓库内部token，登录成功后携带给服务器
    let userStore =useUserStore()
    if (userStore.token) {
        // 后端要求使用 Token header 进行认证
        config.headers.Token = userStore.token
        console.log('请求携带的 Token:', userStore.token);
    } else {
        console.log('警告：没有 Token');
    }
    console.log('请求 URL:', config.url);
    console.log('请求完整地址:', config.baseURL + (config.url || ''));
    //config配置对象，headers属性请求头，经常给服务器携带公共参数
    //返回配置对象
    return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
    console.log('=== 响应调试信息 ===');
    console.log('响应状态:', response.status);
    console.log('响应类型:', response.headers['content-type']);
    console.log('响应数据类型:', typeof response.data);
    console.log('响应数据前200字符:', typeof response.data === 'string' ? response.data.substring(0, 200) : '不是字符串');
    
    // 处理业务错误码
    let data = response.data;
    
    // 如果响应是字符串，尝试解析为 JSON
    if (typeof data === 'string') {
        try {
            // 处理可能的 BOM 字符
            if (data.charCodeAt(0) === 0xFEFF) {
                data = data.slice(1);
            }
            // 尝试解析 JSON
            data = JSON.parse(data);
            console.log('解析后的 JSON 数据:', data);
            console.log('code:', data.code);
            console.log('message:', data.message);
        } catch (e) {
            console.error('JSON 解析失败:', e);
            // 如果不是 JSON，检查是否是 HTML
            if (data.includes('<!doctype html>')) {
                console.error('错误：后端返回了 HTML 页面而不是 JSON 数据');
                console.error('可能原因：1. Token 无效 2. 后端服务未运行 3. 请求地址错误');
                
                ElMessage({
                    type: 'error',
                    message: '请求失败，请检查登录状态或后端服务'
                });
                
                const error = new Error('后端返回了 HTML 页面，请求可能被重定向');
                // @ts-ignore
                error.response = response;
                return Promise.reject(error);
            } else {
                console.error('响应不是 JSON 也不是 HTML');
            }
        }
    }
    
    console.log('=== 检查 data.code ===');
    console.log('data:', data);
    console.log('data.code:', data?.code);
    console.log('data.code !== 200:', data && data.code !== 200);
    
    if (data && data.code !== 200) {
        console.log('=== 检测到业务错误 ===');
        console.log('data.code:', data.code);
        console.log('data.message:', data.message);
        
        // 调试：打印完整的响应数据
        console.log('后端返回的完整数据:', data);
        console.log('data 的所有字段:', Object.keys(data));
        
        // 业务错误：未登录或Token无效
        if (data.code === 206 || data.code === 207) {
            console.log('=== Token 无效，准备跳转到登录页 ===');
            ElMessage({
                type: 'error',
                message: '登录状态过期，请重新登录'
            });
            // 清除无效token并跳转到登录页
            const userStore = useUserStore();
            userStore.token = '';
            localStorage.removeItem('TOKEN');
            window.location.href = '/#/login';
        } else {
            console.log('=== 其他业务错误 ===');
            ElMessage({
                type: 'error',
                message: data.message || '请求失败'
            });
        }
        // 保留原始响应数据，让组件可以获取详细错误信息
        // 兼容后端可能返回的多种错误信息字段：msg、message、error
        const errorMessage = data.msg || data.message || data.error || '业务错误';
        const error = new Error(errorMessage);
        // @ts-ignore
        error.response = response;
        // @ts-ignore
        error.data = data;
        return Promise.reject(error);
    }
    return data;
}, (error) => {
    //处理网络错误
    let msg = '';
    let status = error.response?.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = error.message || "网络请求失败";

    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});
export default request;