<template>
	<view id="followUp">
		<view class="content_item">
			<view class="content_item_left">请上传附件图片(非必填)</view>
			<view class="content_item_right">
				<!-- <text>请选择本次跟进结果</text> -->
			</view>
		</view>
		<view class="addImg">
			<view class="addImgChild" @tap="uploadImg()">
				<image mode="aspectFit" :lazy-load="true" :src="imgPath"></image>
			</view>
		</view>
		<view class="content">
			<view class="content_item" @tap="openPickerView(0)">
				<view class="content_item_left">跟进结果</view>
				<view class="content_item_right">
					<text>{{ followUpText }}</text>
				</view>
			</view>
			<view class="content_item">
				<view class="content_item_left">
					<view>跟进说明</view>
				</view>
				<view class="content_item_right">
					<textarea placeholder="请输入备注信息(请限制字数在50字以内)" class="msg" placeholder-class="msgPs" maxlength="50" v-model="info" />
					</view>
			</view>
		</view>
		<view :class="[pickerViewIndex != '=='?'openPicker':'','pickerViewBg']" @tap="openPickerView('==')"></view>
		<!-- 跟进结果选择器 -->
		<view :class="[pickerViewIndex == 0?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>跟进结果</test>
				<text @tap="sureFollowUp()">确认</text>
			</view>
			<picker-view @change="bindChangeFollowUp">
				<picker-view-column>
					<view class="item" v-for="(item,index) in followUp" :key="index">{{item}}</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	import { customerCustomerTracking } from '@/api/customer.js'
	export default {
		data() {
			return {
				imgPath: '../../../static/carAdmin/addImg.png',
				followUpText:'请选择本次跟进结果',
				followUp:['未跟进','已跟进','成交','无效'],
				followUpIndex:0,
				state: null,
				pickerViewIndex: '==',
				cuType:'',
				customerId: '',
				info: ''
			}
		},
		onNavigationBarButtonTap() {
			this.customerCustomerTrackings()
		},
		onLoad(params) {
			if(params.cuType == 1){
				this.cuType = 2
			}else{
				this.cuType = 1
			}
			this.customerId = params.id
		},
		methods: {
			// 添加跟进接口
			async customerCustomerTrackings(){
				try{
					if(this.state == null){
						this.$toast('请填写跟进结果')
					}else if(this.info == ''){
						this.$toast('请填写个跟进说明')
					}else{
						this.$loading()
						let params = {
							customerId: String(this.customerId),
							cuType: String(this.cuType),
							state: String(this.state),
							customerTracking:{
								info: this.info,
								imgPath: this.imgPath
							}
						}
						let resData = await customerCustomerTracking(params)
						if(resData.code === 200){
							this.$toast('添加成功')
							setTimeout(() => {
								var pages = getCurrentPages();
								var prevPage = pages[pages.length - 2]; //上一个页面
								//h5的写法
								prevPage.ifLoadState = 1;
								//小程序的写法 具体要怎么写可以打印一下prevPage看一下
								prevPage.$vm.ifLoadState = 1;
								uni.navigateBack()
							},500)
						}else{
							this.$toast(resData.message)
						}
					}
				}catch(e){
					this.$toast('网络错误')
				}
			},
			// 上传图片接口
			uploadImg(){
				let _this = this;
				uni.chooseImage({
					count:1,
					success: (chooseImageRes) => {
						if(chooseImageRes.tempFiles[0].size/1024>15000){
							this.$toast('您上传的图片太大了哦~');
						}else{
							const tempFilePaths = chooseImageRes.tempFilePaths;
							uni.getImageInfo({
								src: tempFilePaths[0],
								success: (imageData) => {
									uni.uploadFile({
										url: this.$uploadImageUrl,
										filePath: tempFilePaths[0],
										name: 'file',
										fileType:'image',
										formData: {},
										async success(resData) {
											if (JSON.parse(resData.data).code == 200) {
												_this.imgPath = JSON.parse(resData.data).message
												uni.hideLoading();
											}else{
												_this.$toast(JSON.parse(resData.data).message)
											}
										},
										async fail(err) {
											this.$toast('上传失败');
										}
									});
								}
							});
						}
					}
				});
			},
			sureFollowUp(){
				this.followUpText = this.followUp[this.followUpIndex]
				this.state = this.followUpIndex
				this.openPickerView('==')
			},
			bindChangeFollowUp(e){
				this.followUpIndex = e.detail.value[0]
			},
			// 打开省份弹窗
			openPickerView(index){
				this.pickerViewIndex = index
			}
		}
	}
</script>

<style scoped>
	@import url("../../../common/css/addCar.css");
	#followUp {
		width: 750upx;
	}
</style>
