<template>
	<view id="carList">
		<view class="carListTop">
			<view class="carListTop-Item" @tap="showChoose(1)">
				<text>品牌</text>
				<image :class="showChooseIndex == 1?'choose-image':''" src="../../static/jianTou.png"></image>
			</view>
			<view class="carListTop-Item" @tap="showChoose(2)">
				<text>车型</text>
				<image :class="showChooseIndex == 2?'choose-image':''" src="../../static/jianTou.png"></image>
			</view>
			<view class="carListTop-Item" @tap="showChoose(3)">
				<text>车系</text>
				<image :class="showChooseIndex == 3?'choose-image':''" src="../../static/jianTou.png"></image>
			</view>
			<view class="carListTop-Item" @tap="showChoose(4)">
				<text>价格</text>
				<image :class="showChooseIndex == 4?'choose-image':''" src="../../static/jianTou.png"></image>
			</view>
		</view>
		<!-- 筛选器 -->
		<view class="choose" @touchmove="touchmove">
			<!-- 品牌筛选器 -->
			<view :class="[showChooseIndex == 1?'choose-show':'','priceChoose']">
				<scroll-view class="scrollList" scroll-y :scroll-into-view="scrollViewId" :style="{height:winHeight/26 + 'px'}">
					<view class="uni-list">
						<block v-for="(list, key) in list" :key="list">
							<block v-if="list.data.length">
								<view class="uni-list-cell-divider" :id="list.letter">
									{{ list.letter }}
								</view>
								<view class="one">
									<view :class="[pinPaiIndex == 0?'oneChildActive':'','oneChild']" @tap="getXinCheXing('')">
										全部品牌
									</view>
								</view>
								<view class="one" 
									v-for="(carname,index) in list.data" 
									:key="carname" 
									:class="list.data.length -1 == index ? 'uni-list-cell-last' : ''"
									@tap="getXinCheXing(carname)">
									<view class="oneChild" >
										{{carname}}
									</view>
								</view>
							</block>
						</block>
					</view>
				</scroll-view>
				<view 
					class="uni-indexed-list-bar" 
					:class="touchmove ? 'active' : ''" 
					@touchstart="touchStart" 
					@touchmove="touchMove" 
					@touchend="touchEnd" 
					@touchcancel="touchCancel" 
					:style="{height:winHeight/26 + 'px'}">
					<text 
						v-for="(list,key) in list" 
						:key="key" 
						class="uni-indexed-list-text" 
						:class="touchmoveIndex == key ? 'active' : ''" 
						:style="{height:itemHeight + 'px', lineHeight:itemHeight + 'px'}">{{ list.letter }}</text>
				</view>
				<view 
					class="uni-indexed-list-alert" 
					v-if="touchmove">
					<!-- {{list[touchmoveIndex].letter}} -->
				</view>
			</view>
			<!-- 车型选择器 -->
			<view :class="[showChooseIndex == 2?'choose-show':'','priceChoose']">
				<scroll-view class="scrollList" scroll-y :scroll-into-view="scrollViewId" :style="{height:winHeight/26 + 'px'}">
					<view class="one">
						<view class="weiXuanZe" v-if="cheXingList.length == 0">请先选择品牌</view>
						<view class="oneChild" style="font-weight: bold;" v-if="cheXingList.length != 0">{{ nowCheXingName }}</view>
						<view 
							class="oneChild" 
							v-for="(item,index) in cheXingList" 
							:key="index" 
							v-if="cheXingList.length != 0"
							@tap="getCheXi(item.sid,item.sname)">
							{{ item.sname }}
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 车系选择器 -->
			<view :class="[showChooseIndex == 3?'choose-show':'','priceChoose']">
				<scroll-view class="scrollList" scroll-y :scroll-into-view="scrollViewId" :style="{height:winHeight/26 + 'px'}">
					<view class="weiXuanZe" v-if="cheXiList.length == 0">请先选择车型</view>
					<view class="one">
						<view class="oneChild" style="font-weight: bold;" v-if="cheXiList.length != 0">{{ nowCheXiName }}</view>
						<view 
							class="oneChild" 
							v-for="(item,index) in cheXiList" 
							:key="index" 
							v-if="cheXiList.length != 0"
							@tap="getCheXiLists(item.name)">
							{{ item.name }}
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 价格筛选器 -->
			<view :class="[showChooseIndex == 4?'choose-show':'','choose-price-bg']" :style="{height:winHeight}" @tap="showChoose(4)"></view>
			<view :class="[showChooseIndex == 4?'choose-show':'','priceChoose']">
				<view :class="[priceIndex == 0?'priceChoose-Item-Active':'','priceChoose-Item']" @tap="chooseItem(0,4)">默认排序</view>
				<view :class="[priceIndex == 1?'priceChoose-Item-Active':'','priceChoose-Item']" @tap="chooseItem(1,4)">价格最低</view>
				<view :class="[priceIndex == 2?'priceChoose-Item-Active':'','priceChoose-Item']" @tap="chooseItem(2,4)">价格最高</view>
			</view>
		</view>
		<view class="cheLiangList">
			<view class="cheLiangList-Item" v-for="(item,index) in carList" :key="index" @tap="$goWindow('../carInfo/carBasicInFo/carBasicInFo?id='+item.id)">
				<view class="cheLiangList-Item-Left">
					<image :lazy-load="true" :src="item.coverUrl[0]" mode="aspectFill"></image>
				</view>
				<view class="cheLiangList-Item-Right">
					<view class="carTitle">{{ item.brandName }}</view>
					<view>{{ item.styleName }}</view>
					<view>车辆所属者:{{ item.respoName }}</view>
					<view>所属者电话:{{ item.respoPhone }}</view>
				</view>
			</view>
		</view>
		<view class="end">
			{{ ifHaveData }}
		</view>
	</view>
</template>

<script>
	import { getCarList, getBrand, getXinCheXings, getSelectByAudiId } from '@/api/share.js'
	export default {
		data() {
			return {
				isMarket:0,
				// scorllView 所需参数
				scrollViewId: "A",
				touchmoveIndex: -1,
				itemHeight: 0,
				// 车辆列表数组
				carList:[],
				// 获取车辆列表参数
				goodCarData:{
					pageNum: 1,
					pageSize: 6
				},
				ifHaveData:'上划加载',
				winHeight:uni.getSystemInfoSync().windowHeight + 'px',
				// 展开的筛选器索引
				showChooseIndex:7,
				// 当前已经打开的筛选器索引
				oldChooseIndex:7,
				// 入库选中索引
				ruKuIndex:0,
				// 价格选中索引
				priceIndex:0,
				// 状态选中索引
				stateIndex:0,
				// 品牌数组
				list:[],
				// 当前所选品牌名称
				nowCheXingName:'',
				// 车型数组
				cheXingList:[],
				// 当前所选车型名称
				nowCheXiName:'',
				// 当前所选车系名称
				nowEndName:'',
				// 车系列表
				cheXiList:[],
				// 是否还有数据
				ifHaveData:'上划加载',
				pageNum:1,
				pageSize:15,
				// 当前所选品牌
				pinPaiIndex:0
			}
		},
		onNavigationBarButtonTap(){
			this.fenXiang();
		},
		onLoad(){
			this.userId = uni.getStorageSync('userId');
			this.isMarket = 1;
			this.getCarBrand();
			this.getCarLists();
			this.itemHeight = this.winHeight / 26;
		},
		methods: {
			fenXiang(){
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: 'http://wshop.xczlbox.com/#/?userId='+uni.getStorageSync('userId'),
					title: "信车智联",
					summary: "快来看，好多好车啊！！！",
					imageUrl: "http://wshop.xczlbox.com/static/logo.jpg"
				});
			},
			// scorllView 所需方法
			touchStart(e) {
				this.touchmove = true;
				let pageY = e.touches[0].pageY;
				let index = Math.floor((pageY - this.titleHeight) / this.itemHeight);
				let item = this.lists[index];
				if (item) {
					this.scrollViewId = item.letter;
					this.touchmoveIndex = index;
				}
			},
			touchMove(e) {
				let pageY = e.touches[0].pageY;
				let index = Math.floor((pageY - this.titleHeight) / this.itemHeight);
				let item = this.lists[index];
				if (item) {
					this.scrollViewId = item.letter;
					this.touchmoveIndex = index;
				}
			},
			touchEnd() {
				this.touchmove = false;
				this.touchmoveIndex = -1;
			},
			touchCancel() {
				this.touchmove = false;
				this.touchmoveIndex = -1;
			},
			getCheXiLists(name){
				this.nowEndName = name;
				this.showChoose(3)
				this.getCarLists();
			},
			// 获取车辆列表
			async getCarLists(){
				try{
					if(this.ifHaveData == '已加载全部数据' && this.pageNum != 1){
						return;
					}else{
						this.$loading();
						let orderStr = '';
						let	descStr = '';
						if(this.priceIndex == 1){
							orderStr = 'online_price_cents',
							descStr = 'ASC'
						}else if(this.priceIndex == 2){
							orderStr = 'online_price_cents',
							descStr = 'DESC'
						}
						let params = {
							userId:this.userId,
							isMarket:0,
							pageNum:this.pageNum,
							pageSize:this.pageSize,
							brandName:this.nowCheXingName,
							seriesName:this.nowCheXiName,
							styleName:this.nowEndName,
							orderStr:orderStr,
							descStr:descStr,
							isMarket:this.isMarket
						}
						this.ifHaveData = '正在加载...'
						let resData = await getCarList(params);
						if(resData.result.hasNextPage == false){
							this.ifHaveData = '已加载全部数据'
						}
						// 遍历数组
						let bianLi = (val) => {
							val.coverUrl = val.coverUrl.split(',')
						}
						resData.result.list.forEach(bianLi)
						if(this.pageNum == 1){
							this.carList = resData.result.list;
						}else{
							this.carList = this.carList.concat(resData.result.list);
						}
						uni.hideLoading();
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			// 获取所有车系
			async getCheXi(id,name){
				try{
					this.$loading()
					let resData = await getSelectByAudiId({audiId:id});
					this.nowCheXiName = name;
					this.cheXiList = resData.result;
					this.showChoose(2);
					this.pageNum = 1;
					this.getCarLists();
					uni.hideLoading();
				}catch(e){
					this.$toast('请求失败')
				}
			},
			// 获取品牌下的车型
			async getXinCheXing(carName){
				this.$loading()
				try{
					let resData = await getXinCheXings({brandId:carName})
					this.nowCheXingName = carName;
					this.cheXingList = resData.result;
					this.showChoose(1);
					this.pageNum = 1;
					this.getCarLists();
					uni.hideLoading();
				}catch(e){
					this.$toast('请求失败')
				}
			},
			// 获取所有品牌
			async getCarBrand(){
				try{
					let resData = await getBrand();
					let i = 0;
					let index = 0;
					let carBrandData = resData.result;
					let jsonOne = {letter:'A',data:[]};
					let cheXingList = [];
					let xunHuan = () => {
						new Promise((reslove,reject) =>{
							if(jsonOne.letter != carBrandData[i].letters){
								jsonOne = JSON.stringify(jsonOne)
								cheXingList[index] = JSON.parse(jsonOne);
								jsonOne = JSON.parse(jsonOne)
								jsonOne.letter = carBrandData[i].letters;
								jsonOne.data = [];
								index++;
							}
							jsonOne.data.push(carBrandData[i].name);
							if(i == carBrandData.length - 1){
								cheXingList.push(jsonOne);
								this.list = cheXingList;
								uni.hideLoading();
								return;
							}
							i++;
							reslove()
						}).then( () => {
							xunHuan();
						})
					}
					xunHuan();
				}catch(e){
					this.$toast('请求失败');
				}
			},
			// 子集筛选条件
			chooseItem(index,Index){
				this.priceIndex = index;
				this.showChoose(Index)
				this.getCarLists();
			},
			// 展示筛选条件
			showChoose(index){
				if(index == this.oldChooseIndex && this.showChooseIndex != 7){
					this.showChooseIndex = 7;
				}else{
					this.showChooseIndex = this.oldChooseIndex = index;
				}
			},
			// 筛选器滑动无效
			touchmove(){}
		},
		// 上滑加载车辆列表
		onReachBottom(){
			this.pageNum++;
			this.getCarLists();
		}
	}
</script>

<style>
@import '../../../../common/uni.css';
.image{
	z-index: -1;
}
#carList{
	width: 750upx;
}
.weiXuanZe{
	width: 750upx;
	text-align: center;
	background: #E8E8E8;
}
.carListTop{
	position: fixed;
	display: flex;
	height: 60upx;
	left: 0upx;
	right: 0upx;
	justify-content: space-around;
	align-items: center;
	border-bottom: 1upx solid #E8E8E8;
	box-sizing: border-box;
	background-color: #FFFFFF;
	z-index: 2;
}
.choose-image{
	transform: rotate(180deg);
}
.carListTop-Item>text{
	font-size: 30upx;
	margin-right: 10upx;
}
.carListTop-Item>image{
	width: 15upx;
	height: 12upx;
	vertical-align: middle;
	transition: 0.3s all ease;
}
.choose{
	width: 750upx;
	position: fixed;
	z-index: 2;
}
.choose-price-bg{
	width: 750upx;
	height: 600upx;
	background-color: rgba(0,0,0,0.8);
	transition: 0.3s all ease;
	transform: scaleY(0);
	position: absolute;
	top: 60upx;
}
.priceChoose{
	width: 750upx;
	background-color: #FFFFFF;
	position: absolute;
	top: 60upx;
	transition: 0.3s all ease;
	transform: scaleY(0);
}
.choose-show{
	transform: scaleY(1) !important;
}
.priceChoose-Item{
	width: 100%;
	height: 70upx;
	line-height: 70upx;
	text-align: center;
	font-size: 26upx;
	border-bottom: 1upx solid #E8E8E8;
	
}
.priceChoose-Item-Active{
	color: #108ee9;
}
/* 品牌筛选器 */
.scrollList {
	flex: 1;
	height: 100vh;
}
.oneChild{
	height: 90upx;
	line-height: 90upx;
	padding-left: 20upx;
}
.one{
	height: 90upx;
	line-height: 90upx;
	border-bottom: 1upx solid #E8E8E8;
}
.cheLiangList{
	width: 100%;
	padding-top: 60upx;
}
.cheLiangList-Item{
	width: 100%;
	padding: 20upx;
	border-bottom: 1upx solid #E8E8E8;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	height: 270upx;
}
.cheLiangList-Item-Left{
	flex: 0.45;
	border-radius: 20upx;
	height: 100%;
}
.cheLiangList-Item-Left>image{
	width: 100%;
	height: 100%;
	border-radius: 20upx;
}
.cheLiangList-Item-Right{
	flex: 0.55;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-left: 20upx;
}
.carTitle{
	width: 100%;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:1;
	color: #007AFF;
}
.end{
	width: 750upx;
	height: 70upx;
	line-height: 70upx;
	text-align: center;
	color: #939393;
}
</style>