// 目前没有针对uni的Fly版本，使用wx版本没有问题
// #ifdef H5
import Fly from 'flyio/dist/npm/fly'
// #endif

// #ifndef H5
import Fly from 'flyio/dist/npm/wx'
// #endif


const request = new Fly()

//定义公共headers
request.config.headers={xx:5,bb:6,dd:7}
//设置超时
request.config.timeout=1000*30
//跨域时是否发送cookie
request.config.withCredentials=false
//设置请求基地址
request.config.baseURL="http://122.114.159.28:8002/api/"

const errorPrompt = (err) => {
	// #ifdef MP-WEIXIN
	wx.showToast({
		title: err.message || 'fetch data error.',
		icon: 'none'
	})
	// #endif
	// #ifdef APP-PLUS
	uni.showToast({
		title: err.message || 'fetch data error.',
		icon: 'none'
	})
	// #endif
}

request.interceptors.request.use((request) => {
	// // wx.showNavigationBarLoading()
	uni.showLoading({
		title: ''
	});
	return request
})

request.interceptors.response.use((response, promise) => {
	// wx.hideNavigationBarLoading()
	uni.hideLoading();
	// if (!(response && response.data && response.data.res === 0)) {
	//   errorPrompt(response)
	// }
	return promise.resolve(response.data)
}, (err, promise) => {
	// wx.hideNavigationBarLoading()
	uni.hideLoading();

	errorPrompt(err)
	return promise.reject(err)
})

export default request
