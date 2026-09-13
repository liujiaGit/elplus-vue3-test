import type { ApiResponse } from '@/types/index';
import axios from 'axios';

// 创建axios实例
export const service = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL, //从环境变量读取URL
	timeout: 5000, // 请求超时时间（ms）
	withCredentials: true, // 在跨域请求时携带 Cookie（包括认证信息如 SessionID、JWT Token 等）
	headers: {
		'Content-Type': 'application/json',//默认请求头
		'Access-Control-Allow-Origin': 'http://localhost:8080'
	}
})

// 请求拦截器
service.interceptors.request.use(
	config => {
		// 添加token
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config;
	},
	error => {
		// 请求错误统一处理（如网络中断、配置错误）
		console.error('请求配置错误:', error);
		return Promise.reject(error);
	}
)
// 响应拦截器
service.interceptors.response.use(
	(response:ApiResponse) => {
		//  处理后端返回的业务数据（根据实际后端响应结构调整）
		if (response.status === 200) {
			return response.data; // 返回业务数据
		} else {
			return Promise.reject(new Error(response.data.data.msg));
		}
	},
	error => {
		// 统一错误提示（根据HTTP状态码分类处理）
		let errorMsg = '网络异常，请重试';
		if (error.response) {
			const status = error.response.status;
			switch (status) {
				case 401:
					errorMsg = '未授权，请重新登录';
					break;
				case 403:
					errorMsg = '无权限访问';
					break;
				case 404:
					errorMsg = '请求的资源不存在';
					break;
				case 500:
					errorMsg = '服务器内部错误';
					break;
				default:
					errorMsg = `请求失败（状态码：${status}）`;
			}
		} else if (error.message.includes('timeout')) {
			errorMsg = '请求超时，请检查网络';
		}

		return Promise.reject(error);
	}
)