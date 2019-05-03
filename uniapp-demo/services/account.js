import request from 'common/request.js'
import util from 'common/util.js'
import to from 'await-to-js';
import keyConsts from 'common/storageKeyConsts.js'

const isTenantAvailable = async function(input) {
	
	console.log("isTenantAvailable input:"+JSON.stringify(input));

	//let url = `${util.apiurl}services/app/Account/IsTenantAvailable`;
	let url = `services/app/Account/IsTenantAvailable`;
	console.log(url);
	
	//const data = await request.post(url,input);
	let [err, data] = await to(request.post(url,input));

	if (err&&err.response&&err.response.data){
		data = err.response.data;
	}else{
		console.log( keyConsts.tenantId );
		uni.setStorageSync(keyConsts.tenantId,data.result.tenantId);
	}
	
	console.log('isTenantAvailable output:' + JSON.stringify(data));
	
	return data;	
}

export default {
	isTenantAvailable,
}
