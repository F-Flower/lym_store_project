// #ifdef H5
var baseURL = "/api"
// #endif
// #ifndef H5
var baseURL = "http://81.68.254.47/api"
// #endif
var request = function(options) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + options.url,//请求的网址
			data: options.data || '{}',//请求的参数
			method: options.method || 'GET',//请求的方法
			header: options.header || {},//请求头
			dataType: options.dataType || 'json',//请求数据类型
			success: (res) => {
				return resolve(res.data)
			},
			fail: (error) => {
				return reject(error)
			}
		})
	})
}
export default request
