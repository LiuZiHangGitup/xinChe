<template>
	<view id="addBuyCar">
		<view class="addImg">
			<view class="addImgChild" @tap="uploadImg()">
				<image mode="aspectFit" :lazy-load="true" :src="imgPath"></image>
			</view>
		</view>
		<view class="content">
			<view class="content_item">
				<view class="content_item_left">客户名称</view>
				<view class="content_item_right">
					<input type="text" placeholder="请输入客户名称" placeholder-class="pclass" v-model="cuName" />
				</view>
			</view>
			<view class="content_item">
				<view class="content_item_left">性别</view>
				<view class="content_item_right">
					<view>
						<radio-group @change="radioChange">
							<label class="radio" v-for="(item, index) in sexList" :key="index">
								<radio :value="item.value" :checked="item.value == cuSex" />{{ item.name }}
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			<view class="content_item">
				<view class="content_item_left">联系电话</view>
				<view class="content_item_right">
					<input type="number" placeholder="请输入客户电话" placeholder-class="pclass" v-model="cuPhone" maxlength="11" />
				</view>
			</view>
			<view class="content_item" @tap="openPickerView(3)">
				<view class="content_item_left">客户来源</view>
				<view class="content_item_right">
					<text>{{ froms }}</text>
				</view>
			</view>
			<view class="content_item">
				<view class="content_item_left">
					<view>备注</view>
				</view>
				<view class="content_item_right">
					<textarea placeholder="请输入备注信息(请限制字数在50字以内)" class="msg" placeholder-class="msgPs" maxlength="50" v-model="remark" />
					</view>
			</view>
			<view class="content_item" @tap="openPickerView(0)">
				<view class="content_item_left">地址</view>
				<view class="content_item_right">
					<text>{{ province }}{{ city }}</text>
				</view>
			</view>
			<view class="content_item">
				<view class="content_item_left">最低期望价格</view>
				<view class="content_item_right">
					<input type="number" placeholder="请输入最低期望价格" placeholder-class="pclass" v-model="minPrice" />
					<text>万元</text>
				</view>
			</view>
			<view class="content_item">
				<view class="content_item_left">最高期望价格</view>
				<view class="content_item_right">
					<input type="number" placeholder="请输入最高期望价格" placeholder-class="pclass" v-model="maxPrice" />
					<text>万元</text>
				</view>
			</view>
			<view style="width: 100%; border-bottom: 1upx solid #E8E8E8;" v-for="(item,index) in carList" :key="index">
				<view class="content_item" @tap="openPickerView(1,index)">
					<view class="content_item_left">品牌</view>
					<view class="content_item_right">
						<text>{{ item.brandName }}</text>
					</view>
				</view>
				<view class="content_item" @tap="openPickerView(2,index)">
					<view class="content_item_left">车系</view>
					<view class="content_item_right">
						<text>{{ item.carsName }}</text>
					</view>
				</view>
				<view class="box">
					<view class="addHopeCar deleteHopeCar" @tap="deleteHopeCar(index)">删除此意向车型</view>
				</view>
			</view>
			<view class="box">
				<view class="addHopeCar" @tap="addHopeCar()">继续添加意向车型</view>
			</view>
		</view>
		<view :class="[pickerViewIndex != '=='?'openPicker':'','pickerViewBg']" @tap="openPickerView('==')"></view>
		<!-- 省份选择器 -->
		<view :class="[pickerViewIndex == 0?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>省份</test>
				<text @tap="sureProvince()">确认</text>
			</view>
			<picker-view @change="bindChangeProvinceCity">
				<picker-view-column>
					<view class="item" v-for="(item,index) in provinceCity" :key="index">{{item.name}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in provinceCity[provinceIndex].provinces" :key="index">{{item.name}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- 品牌选择器 -->
		<view :class="[pickerViewIndex == 1?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>品牌</test>
				<text @tap="sureBrand()">确认</text>
			</view>
			<picker-view @change="bindChangeBrand">
				<picker-view-column>
					<view class="item" v-for="(item,index) in carBrand" :key="index">{{item.name}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- 车系选择器 -->
		<view :class="[pickerViewIndex == 2?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>车系</test>
				<text @tap="surecars()">确认</text>
			</view>
			<picker-view @change="bindChangecars">
				<picker-view-column>
					<view class="item" v-for="(item,index) in carcars" :key="index">{{item.sname}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- 客户来源选择器 -->
		<view :class="[pickerViewIndex == 3?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>客户来源</test>
				<text @tap="sureFrom()">确认</text>
			</view>
			<picker-view @change="bindChangeFrom">
				<picker-view-column>
					<view class="item" v-for="(item,index) in renFrom" :key="index">{{item.name}}</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	let provinceCity = require('@/common/json/provinceCity.json')
	let oldBarand = '==',brand = '请选择品牌',cars = '请选择车系',oldBarandIndex = '==';
	import { getBrand, getXinCheXings } from '@/api/share.js'
	import { customerCustomerBuyAdd, customerCustomerBuyModify } from '@/api/customer.js'
	export default {
		data() {
			const years = [];
			const months = [];
			for (let i = new Date().getFullYear(); i >= 1990; i--) {
				years.push(i);
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i);
			}
			return {
				id:'',
				sexList: [{
						name: '男',
						value: 1
					},
					{	
						name: '女',
						value: 2
					}],
				Color: [{
						type: 'black',
						name: '黑色'
					},
					{
						type: 'white',
						name: '白色'
					},
					{
						type: 'red',
						name: '红色'
					},
					{
						type: 'purple',
						name: '紫色'
					},
					{
						type: 'silver_grey',
						name: '银灰色'
					},
					{
						type: 'green',
						name: '绿色'
					},
					{
						type: 'yellow',
						name: '黄色'
					},
					{
						type: 'dark_grey',
						name: '深灰色'
					},
					{
						type: 'brown',
						name: '棕色'
					},
					{
						type: 'champagne',
						name: '香槟色'
					},
					{
						type: 'orange',
						name: '橙色'
					},
					{
						type: 'blue',
						name: '蓝色'
					},
					{
						type: 'rgb(59, 250, 250)',
						name: '其他'
					}
				],
				imgPath: '../../../static/carAdmin/addImg.png',
				province:'请选择省份',
				city:'城市',
				brand:brand,
				cars:cars,
				color:'请选择外观颜色',
				shangPaiShiJian:'请选择上牌时间',
				pickerViewIndex:'==',
				provinceCity,
				provinceIndex:0,
				cityIndex:0,
				carBrand:[],
				carBrandIndex:0,
				carcars:[],
				carcarsIndex:0,
				colorIndex: 0,
				years,
				months,
				yearsIndex:0,
				monthIndex:0,
				carType:[],
				carId:'',
				carName:'亲选择车型',
				carNameIndex:0,
				carList:[
					{brand:'',brandName:'请选择品牌',cars:'',carsName:'请选择车系',carBrandIndex:0,carcarsIndex:0}
				],
				carListIndex:'==',
				renFrom:[{id:1,name:'网络集客'},{id:2,name:'同行批发'},{id:3,name:'朋友介绍'},{id:4,name:'门店'}],
				renFromIndex:0,
				froms:'请选择客户来源',
				fromsId:'',
				cuName:'',
				cuSex:'',
				cuPhone:'',
				minPrice:'',
				maxPrice:'',
				remark:''
			}
		},
		onLoad(params) {
			this.getBrands()
			let newParams = JSON.parse(params.userData)
			this.cuName = newParams.customerSell.cuName
			this.cuSex = newParams.customerSell.cuSex
			this.cuPhone = newParams.customerSell.cuPhone
			this.remark = newParams.customerSell.remark
			this.mileage = newParams.customerSell.mileage
			this.maxPrice = newParams.customerSell.maxPrice
			this.minPrice = newParams.customerSell.minPrice
			this.carList = newParams.customerCar
			this.province = newParams.customerSell.cuProvince
			this.city = newParams.customerSell.cuCity
			this.imgPath = newParams.customerSell.imgPath
			this.fromsId = newParams.customerSell.cuSource
			this.id = newParams.customerSell.id
			let xunHuan = (index) => {
				for(let i in this.renFrom){
					if(index == this.renFrom[i].id){
						return this.renFrom[i].name
						break
					}
				}
			}
			this.froms = xunHuan(newParams.customerSell.cuSource)
		},
		onNavigationBarButtonTap() {
			this.customerCustomerBuyAdds()
		},
		methods: {
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
			// 添加买车客户
			async customerCustomerBuyAdds(){
				try{
					if(this.cuName == ''){
						this.$toast('请输入客户名称')
					}else if(this.cuSex == ''){
						this.$toast('请选择客户性别')
					}else if(!this.$isPhone(this.cuPhone)){
						this.$toast('请填正确写客户电话')
					}else if(this.imgPath == '../../../static/carAdmin/addImg.png'){
						this.$toast('请上传客户图片')
					}else if(this.province == '请选择省份' || this.city == '城市'){
						this.$toast('请选择省份城市')
					}else if(this.minPrice == ''){
						this.$toast('请填写期望最低价')
					}else if(this.maxPrice == ''){
						this.$toast('请填写期望最高价')
					}else{
						this.$loading()
						let customerCars = []
						debugger
						if(this.carList.length != 0){
							for(let i in this.carList){
								let jsonOne = {
									brand:this.carList[i].brand,
									brandName:this.carList[i].brandName,
									cars:this.carList[i].cars,
									carsName:this.carList[i].carsName
								}
								customerCars.push(jsonOne)
							}
						}
						let params = {
							customerBuy:{
								cuName: this.cuName,
								cuSex: this.cuSex,
								cuPhone: this.cuPhone,
								cuProvince: this.province,
								cuCity: this.city,
								cuSource: this.fromsId,
								minPrice: this.minPrice,
								maxPrice: this.maxPrice,
								remark: this.remark,
								state:"0",
								marketId: uni.getStorageSync('marketId') || '',
								merchantId: uni.getStorageSync('merchantId') || '',
								imgPath: this.imgPath
							},
							customerCars:customerCars
						}
						let resData;
						let state = '添加'
						if(this.id != ''){
							params.customerBuy.id = this.id
							state = '修改'
							resData = await customerCustomerBuyModify(params)
						}else{
							resData = await customerCustomerBuyAdd(params)
						}
						if(resData.code === 200){
							this.$toast(`${state}成功`)
							if(state == '修改'){
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
								uni.navigateBack()
							}
						}else{
							this.$toast(resData.message)
						}
					}
				}catch(e){
					this.$toast('网络错误')
				}
			},
			// 确定客户来源事件
			sureFrom(){
				this.froms = this.renFrom[this.renFromIndex].name
				this.fromsId = this.renFrom[this.renFromIndex].id
				this.openPickerView('==')
			},
			// 修改客户来源事件
			bindChangeFrom(e){
				this.renFromIndex = e.detail.value[0]
			},
			// 删除单个意向车型
			deleteHopeCar(index){
				this.carList.splice(index,1)
			},
			// 添加意向车型
			addHopeCar(){
				this.carList.push({brand:'',brandName:'请选择品牌',cars:'',carsName:'请选择车系',carBrandIndex:0,carcarsIndex:0})
			},
			// 确定上牌时间事件
			sureTime(){
				let month = this.months[this.monthIndex];
				month<10?month = month = `0${month}`:month = month
				this.shangPaiShiJian = this.years[this.yearsIndex]+'年'+month+'月'
				this.openPickerView('==')
			},
			// 修改上牌时间事件
			bindChangeTime(e){
				this.yearsIndex = e.detail.value[0]
				if(e.detail.value[1]){
					this.monthIndex = e.detail.value[1]
				}else{
					this.monthIndex = 0
				}
			},
			// 确定外观颜色事件
			sureColor(){
				this.color = this.Color[this.colorIndex].name
				this.openPickerView('==')
			},
			// 修改外观颜色事件
			bindChangeColor(e){
				this.colorIndex = e.detail.value[0]
			},
			// 确定车系事件
			surecars(){
				this.carList[this.carListIndex].cars = this.carcars[this.carList[this.carListIndex].carcarsIndex].brandId
				this.carList[this.carListIndex].carsName = this.carcars[this.carList[this.carListIndex].carcarsIndex].sname
				this.openPickerView('==')
			},
			// 修改车系事件
			bindChangecars(e){
				this.carList[this.carListIndex].carcarsIndex = e.detail.value[0]
			},
			// 获取车系事件
			async getXinCheXing(){
				try{
					let params = {brandId: this.carList[this.carListIndex].brandName};
					let resData = await getXinCheXings(params)
					if(resData.code === 200){
						this.carcars = resData.result
					}else{
						this.$toast(resData.message)
					}
				}catch(e){
					this.$toast('网络错误')
				}
			},
			// 确定品牌事件
			sureBrand(){
				if(oldBarand != this.carList[this.carListIndex].carBrandIndex || oldBarandIndex != this.carListIndex){
					oldBarand = this.carList[this.carListIndex].carBrandIndex
					oldBarandIndex = this.carListIndex
					this.carList[this.carListIndex].brand = this.carBrand[this.carList[this.carListIndex].carBrandIndex].id;
					this.carList[this.carListIndex].brandName = this.carBrand[this.carList[this.carListIndex].carBrandIndex].name;
					this.getXinCheXing()
					this.carList[this.carListIndex].carsName = '请选择车系'
				}
				this.openPickerView('==')
			},
			// 选择品牌事件
			bindChangeBrand(e){
				this.carList[this.carListIndex].carBrandIndex = e.detail.value[0]
			},
			// 获取品牌
			async getBrands(){
				try{
					let resData = await getBrand()
					if(resData.code === 200){
						this.carBrand = resData.result
					}else{
						this.$toast(resData.message)
					}
				}catch(e){
					this.$toast('网络错误')
				}
			},
			// 确定省份事件
			sureProvince(){
				this.province = this.provinceCity[this.provinceIndex].name
				this.city = this.provinceCity[this.provinceIndex].provinces[this.cityIndex].name
				this.openPickerView('==')
			},
			// 修改省份
			bindChangeProvinceCity(e){
				this.provinceIndex = e.detail.value[0];
				if(e.detail.value[1]){
					this.cityIndex = e.detail.value[1];
				}else{
					this.cityIndex = 0;
				}
			},
			// 打开省份弹窗
			openPickerView(index,carListIndex){
				if(index == 2 && this.carList[carListIndex].brand == brand){
					this.$toast('请先选择品牌')
				}else{
					if(index != '=='){
						this.carListIndex = carListIndex
						if(index == 2){
							this.getXinCheXing()
						}
					}
					this.pickerViewIndex = index	
				}
			},
			radioChange(e) {
				this.cuSex = e.detail.value
			}
		}
	}
</script>

<style scoped>
	@import url("../../../common/css/addCar.css");
	#addBuyCar {
		width: 750upx;
	}
	input{text-align: right;}
</style>
