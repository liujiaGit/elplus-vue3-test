import Qs from 'qs';
import { request } from '@/service/request';

export function SysUser() {
	return {
		getUserPageList: (param) => {
			request.httpPost('/sysUser/pageList', Qs.stringify(param))
		}
	}
}