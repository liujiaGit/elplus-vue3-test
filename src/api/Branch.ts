import Qs from 'qs';
import { httpApi } from '@/service/request.ts';

export const BranchApi = {
	getBranchPageList(param:{}) {
		return httpApi.post('/api/branch/pageList', param)
	},
	updateBranchInfo(param:{}) {
		return httpApi.post('/api/branch/update', param)
	},
	deleteBranchById(param:string) {
		return httpApi.get('/api/branch/delete', param)
	}
}
