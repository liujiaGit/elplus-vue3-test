import { httpApi } from '@/service/request.ts';

export const DataInfoApi = {
	getDataInfoPageList(param:string) {
		return httpApi.get('/api/theTableInfoData/list', param)
	},
}
