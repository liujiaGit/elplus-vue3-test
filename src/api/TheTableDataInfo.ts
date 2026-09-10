import Qs from 'qs';
import { httpApi } from '@/service/request.ts';

export const DataInfoApi = {
	getDataInfoPageList(param:{}) {
		return httpApi.post('/api/theTableInfoData/list', param)
	},
}
