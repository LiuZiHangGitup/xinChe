<template>
	<view id="addStaff">
		<view class="content">
			<view class="content_item">
				<view class="content_item_left">用户名</view>
				<view class="content_item_right">
					<input type="text" placeholder="请输入用户名" placeholder-class="pclass" v-model="username" placeholder-style="text-align:right; !important" />
				</view>
			</view>
			<view class="content_item">
				<view class="content_item_left">登陆账号</view>
				<view class="content_item_right">
					<input type="number" placeholder="请输入手机号码" placeholder-class="pclass" v-model="mobile" placeholder-style="text-align:right; !important" />
				</view>
			</view>
			<view class="content_item">
				<view class="content_item_left">密码</view>
				<view class="content_item_right">
					<input type="text" placeholder="请输入密码" placeholder-class="pclass" v-model="password" placeholder-style="text-align:right; !important" />
				</view>
			</view>
		</view>
		<view class="content_item" @tap="openPickerView(0)">
			<view class="content_item_left">角色名称</view>
			<view class="content_item_right">
				<text>{{ staffText }}</text>
			</view>
		</view>
		<view :class="[pickerViewIndex != '=='?'openPicker':'','pickerViewBg']" @tap="openPickerView('==')"></view>
		<!-- 省份选择器 -->
		<view :class="[pickerViewIndex == 0?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>角色名称</test>
				<text @tap="sureStaff()">确认</text>
			</view>
			<picker-view @change="bindChangeStaff">
				<picker-view-column>
					<view class="item" v-for="(item,index) in staff" :key="index">{{item.roleName}}</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	import { selectMarket } from '@/api/addCar.js'
	import { sysRoleGetAppMerchantStaff, sysUserSave } from '@/api/staff.js'
	export default {
		data() {
			return {
				pickerViewIndex: '==',
				staff: [],
				roleId:'',
				staffText: '请选择角色名称',
				staffIndex: 0,
				username:'',
				mobile:'',
				password:'',
				marketId: uni.getStorageSync('marketId')
			}
		},
		onLoad() {
			this.sysRoleGetAppMerchantStaff()
			this.getAllMarket()
		},
		onNavigationBarButtonTap() {
			this.sysUserSave()
		},
		methods: {
			// 新增员工
			async sysUserSave(){
				try{
					if(this.username == ''){
						this.$toast('请填写用户名')
					}else if(!this.$isPhone(this.mobile)){
						this.$toast('请填写正确手机号')
					}else if(this.password == ''){
						this.$toast('请填写用户密码')
					}else if(this.roleId == ''){
						this.$toast('请填选择角色')
					}else{
						this.$loading()
						let params = {
							username: this.username,
							mobile: this.mobile,
							password: this.password,
							roleId: this.roleId,
							marketId: this.marketId,
							merchantId: uni.getStorageSync('merchantId') || ''
						}
						let resData = await sysUserSave(params)
						if(resData.code === 200){
							this.$toast('添加成功')
							uni.navigateBack()
							uni.hideLoading()
						}else{
							this.$toast(resData.message)
						}
					}
				}catch(e){
					this.$toast('网络错误')
				}
			},
			// 获取角色列表
			async sysRoleGetAppMerchantStaff(){
				try{
					let resData = await sysRoleGetAppMerchantStaff()
					if(resData.code === 200){
						this.staff = resData.result;
					}else{
						this.$toast(resData.message)
					}
				}catch(e){
					this.$toast('网络错误')
				}
			},
			sureStaff() {
				this.staffText = this.staff[this.staffIndex].roleName
				this.roleId = this.staff[this.staffIndex].roleId
				this.openPickerView('==')
			},
			// 打开选择器
			openPickerView(index) {
				this.pickerViewIndex = index
			},
			// 打开角色选择器
			bindChangeStaff(e) {
				this.staffIndex = e.detail.value[0]
			}
		}
	}
</script>

<style scoped>
	@import url("../../../common/css/addCar.css");

	#addStaff {
		width: 750upx;
	}
</style>
