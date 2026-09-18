import { service } from './index.ts'

/** get用于查询
 ** post用于新增
 ** put用于全量修改 
 ** patch用于部分修改 
 ** delete用于删除 
**/
export const httpApi = {
	get(url : string, param :string) {
		return service.get(url, { params: param})
	},
	post(url : string, data : object) {
		return service.post(url, data);
	},
	put(url: string,data:object){
		return service.put(url,data)
	},
	patch(url: string,data:object){
		return service.patch(url,data)
	},
	delete(url : string, param :string) {
		return service.delete(url, { params: param})
	},
}