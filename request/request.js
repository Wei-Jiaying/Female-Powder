export const baseURL = "/api"
//真实环境
export const request = (options) => {
	return new Promise((resolve, reject) => {
		const token=uni.getStorageSync('userToken')
		console.log('使用了token',token)
		uni.request({
			url: baseURL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: {
			    'Authorization': `${token}`,
			    'accept': 'application/json'
			},
			success: (res) => {
				if (res == '') {
					return uni.showToast({
						icon: 'loading',
						title: '获取数据失败'
					})
				}
				
				resolve(res)
			},
			fail: (err) => {
				return uni.showToast({
					icon: 'loading',
					title: '请求失败'
				})
				reject(err)
			}
		})
	})
}

