import { service } from './index.ts'

export const httpApi = {
	post(url : string, data : object) {
		return service.post(url, data);
	},
	get(url : string, param :string) {
		return service.get(url, { params: param})
	}
}