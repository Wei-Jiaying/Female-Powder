export const baseURL = "/api"
//真实环境
export const request = (options) => {
	return new Promise((resolve, reject) => {
		console.log('调用了requestNoToken')
		uni.request({
			url: baseURL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: {
				'Content-Type': 'application/json'
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

