<template>
	<view class="s-page-wrapper is-100vh">
		<view class="is-33vh has-mgt-10">
			<view class="is-flex is-column is-justify-center is-align-center is-height-100">
				<image src="../../static/img/common/logo.jpg" mode="aspectFit" class="logoimg"></image>
			</view>
		</view>
		<view class="content">
			<view class="has-mglr-10">
				<view class="has-mgtb-10">
					<input type="text" v-model="login.tenant" placeholder="请输入租户" class="is-input1" data-val="tenant" />
				</view>
				<view class="has-mgtb-10">
					<input type="number" maxlength="11" v-model="login.phone" placeholder="请输入手机号" class="is-input1" @input="bindInput" data-val="phone" />
				</view>
				<view class="has-radius has-mgtb-10">
					<input password="true" v-model="login.password" placeholder="请输入登录密码" class="is-input1" @input="bindInput" data-val="password" />
				</view>
				
				<view class="loginbtn has-radius has-mgtb-20">
					<button :loading="login.loading" @tap="defaultHandlerLogin">{{ login.loading ? "登录中..." : "登录" }}</button>
				</view>
			</view>
		</view>
		<view class="is-20vh has-mgt-80 content">
			<navigator url="#" class="has-radius is-right is-grey has-mgr-20" hover-class="">
				<text>忘记密码？ </text><text>点击找回</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	import account from '../../services/account.js';
	import tokenAuth from '../../services/tokenAuth.js';
	
	export default{
		data () {
			return {
				login:{
					loading:false,
					tenant:'',
					phone:'',
					password:''
				},
			};
		},
		methods:{
			defaultHandlerLogin: async function () {
				
				const input = {
					tenancyName: this.login.tenant,
					};
					this.login.loading = true;
				const tenantVailableResponse = await account.isTenantAvailable(input);

				if (tenantVailableResponse.success) {
					const authenticateInput = {
						userNameOrEmailAddress:this.login.phone,
						password:this.login.password
					};
					const authenticateResponse = await tokenAuth.authenticate(authenticateInput);
		
					if(authenticateResponse.success){
						const token=authenticateResponse.result.accessToken;
						const userId = authenticateResponse.result.userId;
						uni.reLaunch({
						    url: '/pages/ucenter/index',
						});
					}else{
						const errorMessage = authenticateResponse.error.details;
						uni.showToast({
							icon: 'none',
							title: errorMessage
						});
					}
				}
				this.login.loading = false;
				// this.login.loading = true;
				// setTimeout((e => {
				// 	this.login.loading = false;
				// }),1500);
				console.log(JSON.stringify(this.login));
			},
			bindInput: function (e) {
				var dataVal = e.currentTarget.dataset.val;
				this.login[dataVal] = e.detail.value;
			}
		}
	}
</script>

<style>
	page{
		min-height: 100%;
		background-color: #FFFFFF;
	}
	
	.content{
		width: 85%;
		margin: 0 auto;
	}
	
	.loginbtn button{
		margin-top: 20rpx;
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		color: #ffffff;
		font-size: 32rpx;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		margin: 0;
		font-family: inherit;
		background: #f35;
		opacity: 0.8;
	}
	
	button:after {
		border: 2rpx solid #f2f2f2;
	}

	.logoimg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	.is-input1 {
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		padding: 12rpx;
		color: #353535;
		font-size: 32rpx;
		box-sizing: border-box;
		appearance: none;
		border: 2rpx solid #e5e5e5;
		box-shadow: none;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		padding-left: 30rpx;
		margin: 0;
		font-family: inherit;
		background: #fff;
		resize: none;
	}
</style>
