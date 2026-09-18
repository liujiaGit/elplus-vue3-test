import { httpApi } from '@/service/request';

export const SysUserApi = {
	getUserPageList: (param : string) => {
		return httpApi.get('/api/sysUser/pageList', param)
	},
	loginCheck: (param : {}) => {
		return httpApi.post('/api/sysUser/login', param)
	}
}