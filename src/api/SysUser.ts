import { httpApi } from '@/service/request';

export const SysUserApi = {
	getUserPageList: (param : {}) => {
		return httpApi.post('/api/sysUser/pageList', param)
	},
	loginCheck: (param : {}) => {
		return httpApi.post('/api/sysUser/login', param)
	}
}