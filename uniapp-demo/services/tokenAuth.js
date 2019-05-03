import request from 'common/request.js'
import util from 'common/util.js'
import to from 'await-to-js';


const authenticate = async function(input) {
	
	console.log("authenticate input:"+JSON.stringify(input));

	//let url = `${util.apiurl}TokenAuth/Authenticate`;
	let url = `TokenAuth/Authenticate`;
	console.log(url);

	//const data = await request.post(url,input);
	let [err, data] = await to(request.post(url,input));
		
	if (err&&err.response&&err.response.data){
		data = err.response.data;
	}

	console.log('authenticate output:' + JSON.stringify(data));
	
	return data;	
}

export default {
	authenticate,
}
