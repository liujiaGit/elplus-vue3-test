export interface UserInfo {
	token: string,
	userNo: string,
	userName: string,
	role: string,
	roleName: string,
}
export interface TabItem {
	name : string
	path : string
	fullPath : string
	title : string
	affix ?: boolean  // 新增固定标记
	query ?: Record<string, any>
}

export interface ApiResponse<T = any> {
	code: string,
	data: T,
	msg: string,
}

export interface RouteItem<T = any> {
	path: string,
	name?: string,
	redirect?: string,
	meta: {
		title?: string,
		isLink?: boolean, //是否链接
		affix?: boolean, // 🔒 固定标记
		icon?: string,
		role?: string[],
	},
	children ?: RouteItem,
	k?: T,
}