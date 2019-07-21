<style scoped>
	#carBrand {
		width: 750upx;
	}

	.carBrand_Item {
		width: 100%;
		position: fixed;
		top: 0upx;
		bottom: 0upx;
		left: 0upx;
		right: 0upx;
	}

	.carBrand_Item_Bg {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
	}

	.choose_Index {
		position: fixed;
		right: 0upx;
		width: 50upx;
		background-color: rgba(0, 0, 0, 0.3);
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		top: 0upx;
		z-index: 999;
		bottom: 0upx;
	}

	.choose_Index_Move {
		background-color: rgba(0, 0, 0, 0.5);
	}

	.choose_Index_Item {
		width: 100%;
		/* height: 40upx; */
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
	}

	.choose_Index_Item_Move {
		color: #108EE9;
	}

	.chooseId {
		position: fixed;
		top: 0upx;
		left: 0upx;
		right: 0upx;
		bottom: 0upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.chooseId_Show {
		width: 100upx;
		height: 100upx;
		border-radius: 50upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.3);
		/* color: #108EE9; */
	}

	.scroll_view {
		position: fixed;
		top: 0upx;
		bottom: 0upx;
		left: 0upx;
		right: 0upx;
	}

	.scroll_view_item {
		width: 700upx;
		display: flex;
		flex-flow: column;
	}

	.scroll_view_item_title {
		width: 100%;
		background-color: #E8E8E8;
		padding: 15upx 20upx;
		box-sizing: border-box;
		font-size: 28upx;
		display: flex;
		justify-content: flex-start;
	}

	.scroll_view_item_content {
		width: 700upx;
		padding: 15upx 20upx;
		box-sizing: border-box;
		font-size: 28upx;
		background-color: #FFFFFF;
		border-bottom: 1upx solid #E8E8E8;
	}

	.carType,
	.carSystem {
		position: fixed;
		top: 0upx;
		bottom: 0upx;
		right: 0upx;
		width: 0%;
		transition: 0.3s all ease;
		background-color: #FFFFFF;
	}

	.carType_show {
		width: 85%;
	}

	.carSystem_show {
		width: 65%;
	}

	.border_left {
		border-left: 5upx solid #108EE9;
		box-sizing: border-box;
	}
</style>
<template>
	<view id="carBrand">
		<view class="carBrand_Item">
			<scroll-view class="scroll_view" scroll-y :scroll-into-view="scorllViewId">
				<view class="scroll_view_item_content border_left" v-if="allState == 1" @tap="getAllCar()">全部品牌</view>
				<view class="scroll_view_item" v-for="(item,index) in lists" :key="index" :id="item">
					<view class="scroll_view_item_title" :id="item.letter">{{ item.letter }}</view>
					<view class="scroll_view_item_content" v-for="(items,indexs) in item.data" :key="indexs" @tap="getCarTypes({carName:items,carId:item.carId[indexs]})">
						{{ items }}
					</view>
				</view>
			</scroll-view>
			<view :class="[touchMoveState?'choose_Index_Move':'','choose_Index']" @touchend="touchEnd">
				<view :class="[touchMoveIndex == index?'choose_Index_Item_Move':'','choose_Index_Item']" :style="{height:itemHeight + 'px'}"
				 v-for="(item,index) in lists" :key="index" @touchmove="touchMove" @touchstart="touchStart">{{ item.letter }}</view>
			</view>
			<view class="chooseId" v-if="touchMoveState">
				<view class="chooseId_Show">{{ scorllViewId }}</view>
			</view>
		</view>
		<view class="carBrand_Item" :style="{'z-index': carTypeState?'2':'-1'}">
			<view class="carBrand_Item_Bg" v-if="carTypeState" @tap="updateCarTypeState()"></view>
			<scroll-view :class="[carTypeState?'carType_show':'','carType']" scroll-y>
				<view class="scroll_view_item_content border_left">{{ nowCarType }}</view>
				<view class="scroll_view_item_content border_left" v-if="allState == 1" @tap="getAllCar()">全部车型</view>
				<view v-for="(item,index) in carTypeList" :key="index">
					<view class="scroll_view_item_title" v-if="item.state">{{ item.name }}</view>
					<view class="scroll_view_item_content" @tap="getCarSystems(item)">
						{{ item.sname }}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="carBrand_Item" :style="{'z-index': carSystemState?'4':'-1'}">
			<view class="carBrand_Item_Bg" v-if="carSystemState" @tap="updateCarSystemState()"></view>
			<scroll-view :class="[carSystemState?'carSystem_show':'','carSystem']" scroll-y>
				<view class="scroll_view_item_content border_left">{{ nowCarSystem }}</view>
				<view class="scroll_view_item_content border_left" v-if="allState == 1" @tap="getAllCar()">全部车系</view>
				<view v-for="(item,index) in carSystemList" :key="index">
					<view class="scroll_view_item_title" v-if="item.state" style="font-size: 20upx;">{{ item.yname }}</view>
					<view class="scroll_view_item_content" style="font-size: 20upx;" @tap="getAllCar(item)">
						{{ item.name }}
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		getBrand,
		getXinCheXings,
		getSelectByAudiId
	} from '@/api/goodCar.js'
	export default {
		data() {
			return {
				touchMoveState: false,
				touchMoveIndex: '=',
				scorllViewId: 'A',
				itemHeight: 0,
				titleHeight: 0,
				carBrandList: [],
				lists: [],
				carTypeState: false,
				carTypeList: [],
				carTypeName: '',
				carSystemState: false,
				carSystemList: [],
				carSystemName: '',
				nowCarType: '',
				allState: '',
				nowCarSystem: '',
				carInfo: {
					brandName: '',
					brandId: '',
					seriesName: '',
					seriesId: '',
					styleName: '',
					styleId: ''
				},
				ifGoodCar: false
			}
		},
		onLoad(params) {
			if (params.state) {
				this.allState = params.state
			}
			if (params.ifGoodCar) {
				this.ifGoodCar = params.ifGoodCar
			}
			this.getCarBrand()
		},
		methods: {
			// 全部车系事件
			getAllCar(data) {
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				if (data) {
					if (this.ifGoodCar) {
						this.carInfo.styleName = data.sname
						this.carInfo.seriesId = data.sid
					} else {
						this.carInfo.styleName = data.name
						this.carInfo.styleId = data.id
					}
				}
				if (prevPage.carInformation) {
					prevPage.carInformation = this.carInfo
					prevPage.carSystem = this.carInfo.styleName
				}
				if (prevPage.$vm.carInformation) {
					prevPage.$vm.carInformation = this.carInfo
					prevPage.$vm.carSystem = this.carInfo.styleName
				}
				if (prevPage.getCarData) {
					prevPage.getCarData.brandName = this.carInfo.brandName
					prevPage.getCarData.seriesName = this.carInfo.seriesName
					prevPage.getCarData.styleName = this.carInfo.styleName
					prevPage.getCarData.pageNum = 1
					prevPage.ifHaveCar = '上划加载'
				}
				if (prevPage.$vm.getCarData) {
					prevPage.$vm.getCarData.brandName = this.carInfo.brandName
					prevPage.$vm.getCarData.seriesName = this.carInfo.seriesName
					prevPage.$vm.getCarData.styleName = this.carInfo.styleName
					prevPage.$vm.getCarData.pageNum = 1
					prevPage.$vm.ifHaveCar = '上划加载'
				}
				if (prevPage.getGoodCarData) {
					prevPage.getGoodCarData.brandName = this.carInfo.brandName
					prevPage.getGoodCarData.pageNum = 1
					prevPage.if_have_car = '正在加载...'
				}
				if (prevPage.$vm.getGoodCarData) {
					prevPage.$vm.getGoodCarData.brandName = this.carInfo.brandName
					prevPage.$vm.getGoodCarData.audiId = this.carInfo.seriesId
					prevPage.$vm.getGoodCarData.pageNum = 1
					prevPage.$vm.if_have_car = '正在加载...'
				}

				uni.navigateBack()
			},
			updateCarSystemState() {
				this.carSystemState = !this.carSystemState
			},
			updateCarTypeState() {
				this.carTypeState = !this.carTypeState
			},
			// 获取当前车型下车系
			async getCarSystems(item) {
				if(this.ifGoodCar){
					this.getAllCar(item)
				}else{
					this.$loading()
					this.carSystemName = ''
					this.nowCarSystem = item.sname
					this.carInfo.seriesName = item.sname
					this.carInfo.seriesId = item.sid
					try {
						let resData = await getSelectByAudiId({
							audiId: item.sid
						})
						// 获取品牌数据成功
						if (resData.code === 200) {
							var carSystemData = resData.result;
							if (carSystemData.length > 0) {
								for (let i in carSystemData) {
									if (carSystemData[i].yname == this.carSystemName) {
										carSystemData[i].state = false;
									} else {
										carSystemData[i].state = true;
										this.carSystemName = carSystemData[i].yname;
									}
									if (i == carSystemData.length - 1) {
										this.carSystemList = carSystemData;
										this.updateCarSystemState()
									}
								}
							} else {
								this.$toast('暂无下级车型');
							}
						} else {
							this.$toast(resData.data.msg, false);
						}
						uni.hideLoading();
					} catch (e) {
						this.$toast('网络错误');
					}
				}
			},
			// 获取当前品牌下车型
			async getCarTypes(data) {
				this.$loading();
				this.carTypeName = ''
				this.nowCarType = data.carName
				this.carInfo.brandName = data.carName
				this.carInfo.brandId = data.carId
				try {
					let resData = await getXinCheXings({
						brandId: data.carName
					})
					if (resData.code === 200) {
						let carTypeList = resData.result;
						for (let i in carTypeList) {
							if (carTypeList[i].name === this.carTypeName) {
								carTypeList[i].state = false;
							} else {
								carTypeList[i].state = true;
								this.carTypeName = carTypeList[i].name;
							}
							if (i == carTypeList.length - 1) {
								this.carTypeList = carTypeList;
								this.updateCarTypeState();
							}
						}
					} else {
						this.$toast(resData.message)
					}
					uni.hideLoading();
				} catch (e) {
					// this.$toast('请求失败');
				}
			},
			// 获取所有品牌
			async getCarBrand() {
				this.$loading();
				try {
					let resData = await getBrand({});
					if (resData.code === 200) {
						var carTypeList = resData.result;
						let jsonOne = {
							letter: 'A',
							data: [],
							carId: []
						};
						let cheXingList = new Array();
						let i = 0;
						let index = 0;
						let xunHuan = () => {
							new Promise((reslove, reject) => {
								if (jsonOne.letter != carTypeList[i].letters) {
									jsonOne = JSON.stringify(jsonOne)
									cheXingList[index] = JSON.parse(jsonOne);
									jsonOne = JSON.parse(jsonOne)
									jsonOne.letter = carTypeList[i].letters;
									jsonOne.data = [];
									index++;
								}
								jsonOne.data.push(carTypeList[i].name);
								jsonOne.carId.push(carTypeList[i].id);
								if (i == carTypeList.length - 1) {
									cheXingList.push(jsonOne);
									this.lists = cheXingList;
									this.itemHeight = uni.getSystemInfoSync().windowHeight / this.lists.length;
									uni.hideLoading();
									return;
								}
								i++;
								reslove()
							}).then(() => {
								xunHuan();
							})
						}
						xunHuan();
					} else {
						this.$toast(resData.message);
					}
				} catch (e) {
					this.$toast('网络错误');
				}
			},
			// 修改下拉选颜色
			touchEnd() {
				this.touchMoveState = false
				this.touchMoveIndexState = '='
			},
			touchStart(e) {
				this.touchmove = true;
				let pageY = e.touches[0].pageY;
				let index = Math.floor((pageY - this.titleHeight) / this.itemHeight);
				let item = this.lists[index];
				if (item) {
					this.scorllViewId = item.letter
					this.touchmoveIndex = index;
				}
				this.touchMoveState = true
			},
			touchMove(e) {
				let pageY = e.touches[0].pageY;
				let index = Math.floor((pageY - this.titleHeight) / this.itemHeight);
				let item = this.lists[index];
				if (item) {
					this.scorllViewId = item.letter
					this.touchmoveIndex = index;
				}
			}
		}
	}
</script>
