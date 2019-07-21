<style scoped>
	*{
		margin: 0;
		padding: 0;
	}
	#addCar{
		width: 750upx;
		background: #E8E8E8;
	}
	.addImg{
		width: 750upx;
		background: #FFFFFF;
		height: 340upx;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.addImgChild{
		width: 750upx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		overflow-y: hidden;
	}
	.addImgChild>swiper{
		height: 100%;
		width: 750upx;
		overflow-y: hidden;
	}
	swiper-item{
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow-y: hidden;
	}
	.swiper-item{
		overflow-y: hidden;
	}
	/* 上传车辆参数 */
	switch{
		transform: scale(0.6);
	}
	/* 更多信息 */
	.addDataMore{
		width: 750upx;
		background-color: #FFFFFF;
	}
	.addDataMoreTitle{
		width: 100%;
		height: 80upx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26upx;
		border-bottom: 1upx solid #E8E8E8;
	}
	.addDataMoreTitle image{
		width: 20upx;
		height: 15upx;
		vertical-align: middle;
		margin-left: 15upx;
		transition: 0.3s all ease;
	}
	/* 重构开始 */
	.add_data{
		width: 750upx;
		margin-top: 10upx;
	}
	.add_data_item{
		width: 750upx;
		border-bottom: 1upx solid #E8E8E8;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		font-size: 30upx;
		padding: 0upx 30upx;
		height: 80upx;
		box-sizing: border-box;
	}
	.add_data_item_left{
		flex: 0.25;
		white-space: nowrap;
	}
	.add_data_item_right{
		flex: 0.75;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 26upx;
		color: #939393;
	}
	.add_data_item_right>view{
		padding: 10upx 30upx;
		color: #939393;
		font-size: 26upx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1upx solid #E8E8E8;
		border-radius: 10upx;
		margin-left: 15upx;
	}
	.add_data_item_right>input{
		max-width: 200upx;
	}
	.add_data_item_right>image{
		margin-left: 60upx;
		width: 30upx;
		height: 30upx;
		vertical-align: middle;
	}
	.green{
		color: #339999;
	}
	.picker-view{
		transition: 0.3s all ease;
		transform: scaleY(0);
	}
	.pickerViewBg{
		transform: scaleY(0);
	}
	.openPicker{
		transform: scaleY(1);
	}
</style>

<template>
	<view id="addCar">
		<view class="addImg">
			<view class="addImgChild" v-if="carImg.length == 1" @tap="goAddCarImg()">
				<image mode="widthFix" :lazy-load="true" :src="carImg[0]"></image>
			</view>
			<view class="addImgChild" v-else>
				<swiper :indicator-dots="false" :autoplay="true" :interval="5000" :duration="500" :circular="true">
					<swiper-item v-for="(item,index) in carImg" :key="index" @tap="goAddCarImg()" :indicator-dots="true"
					 indicator-color="#0066ff">
						<view class="swiper-item">
							<image mode="aspectFill" :lazy-load="true" :src="item"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="add_data">
			<view class="add_data_item" @tap="openPickerView(5)">
				<view class="add_data_item_left">
					<text>所属市场</text>
				</view>
				<view class="add_data_item_right">
					<text class="green">{{ guoLv(suoShuShiChang) }}</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item" @tap="openPickerView(6)">
				<view class="add_data_item_left">
					<text>车商列表</text>
				</view>
				<view class="add_data_item_right">
					<text>{{ guoLv(cheShang) }}</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item" @tap="openPickerView(7)">
				<view class="add_data_item_left">
					<text>市场区域</text>
				</view>
				<view class="add_data_item_right">
					<text>{{ guoLv(cheChang) }}</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item">
				<view class="add_data_item_left">
					<text>vin码</text>
				</view>
				<view class="add_data_item_right">
					<text>{{ vinNumber }}</text>
					<view @tap="get_assecs_token()">识别</view>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item">
				<view class="add_data_item_left">
					<text>是否上牌</text>
				</view>
				<view class="add_data_item_right">
					<switch @change="shangPaiChange" :checked="guoLv(shangPaiState) == 'licensed'" />
					<text>{{ shangPaiText }}</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item" v-if="guoLv(shangPaiState) == 'licensed'">
				<view class="add_data_item_left">
					<text>车牌号码</text>
				</view>
				<view class="add_data_item_right">
					<input type="text" v-model="chePaiRule" placeholder="必填" placeholder-style="text-align:right;" :adjust-position="false" />
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item" @tap="openPickerView(10)" v-if="guoLv(shangPaiState) == 'licensed'">
				<view class="add_data_item_left">
					<text>首次上牌时间</text>
				</view>
				<view class="add_data_item_right">
					<text>{{ guoLv(shouCiShangPai) }}</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item">
				<view class="add_data_item_left">
					<text>商业险是否到期</text>
				</view>
				<view class="add_data_item_right">
					<switch @change="shangYeChange" :checked="guoLv(isBusinessInsurance) == 0" />
					<text>{{ isBusinessInsurance == 0?'否':'是' }}</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item" @tap="openPickerView(11)" v-if="guoLv(isBusinessInsurance) == 0">
				<view class="add_data_item_left">
					<text>商业险到期日期</text>
				</view>
				<view class="add_data_item_right">
					<text>{{ guoLv(businessInsuranceDate) }}</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
		</view>
		<view class="add_data">
			<view class="add_data_item" @tap="$goWindow('../../common/carBrand/carBrand')">
				<view class="add_data_item_left">
					<text>品牌型号</text>
				</view>
				<view class="add_data_item_right">
					<text>{{ guoLv(carSystem) }}</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item" @tap="openPickerView(1)">
				<view class="add_data_item_left">
					<text>外观颜色</text>
				</view>
				<view class="add_data_item_right">
					<text>{{ guoLv(waiGuanYanSe) }}</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item">
				<view class="add_data_item_left">
					<text>行驶里程</text>
				</view>
				<view class="add_data_item_right">
					<input v-model="xingShiLiCheng" type="number" placeholder-style="text-align:right;" placeholder="请填写行驶里程"
					 maxlength="17" :adjust-position="false" />
					<text>万公里</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item" @tap="openPickerView(9)">
				<view class="add_data_item_left">
					<text>交强险日期</text>
				</view>
				<view class="add_data_item_right">
					<text>{{ guoLv(jiaoQiangXian) }}</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item" @tap="openPickerView(8)">
				<view class="add_data_item_left">
					<text>年审日期</text>
				</view>
				<view class="add_data_item_right">
					<text>{{ nianShenRiQi==''?'必填':nianShenRiQi }}</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
		</view>
		<view class="addDataMore">
			<view class="addDataMoreTitle" @tap="openMore">
				<text>更多信息</text>
				<image mode="aspectFill" :lazy-load="true" src="../../../static/common/jianTou.png" :style="addDataMoreImage"></image>
			</view>
			<view class="addDataMoreCenter" :style="addDataMoreStyle" v-if="addDataMoreState">
				<view class="add_data_item">
					<view class="add_data_item_left">
						<text>钥匙数量</text>
					</view>
					<view class="add_data_item_right">
						<input v-model="yaoShiShuLiang" placeholder-style="text-align:right;" placeholder="请填写钥匙数量" :adjust-position="false" />
						<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
					</view>
				</view>
				<view class="add_data_item">
					<view class="add_data_item_left">
						<text>过户次数</text>
					</view>
					<view class="add_data_item_right">
						<input v-model="guoHuCiShu" placeholder-style="text-align:right;" placeholder="请填写过户次数" :adjust-position="false" />
						<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
					</view>
				</view>
				<view class="add_data_item" @tap="openPickerView(3)">
					<view class="add_data_item_left">
						<text>内饰颜色</text>
					</view>
					<view class="add_data_item_right">
						<text>{{ guoLv(neiShiYanSe) }}</text>
						<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
					</view>
				</view>
				<view class="add_data_item" @tap="openPickerView(2)">
					<view class="add_data_item_left">
						<text>车身类型</text>
					</view>
					<view class="add_data_item_right">
						<text>{{ guoLv(cheShenLeiXing) }}</text>
						<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
					</view>
				</view>
				<view class="add_data_item" @tap="openPickerView(0)">
					<view class="add_data_item_left">
						<text>环保标准</text>
					</view>
					<view class="add_data_item_right">
						<text>{{ guoLv(huanBaoBiaoZhun) }}</text>
						<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
					</view>
				</view>
				<view class="add_data_item" @tap="openPickerView(4)">
					<view class="add_data_item_left">
						<text>燃油类型</text>
					</view>
					<view class="add_data_item_right">
						<text>{{ guoLv(ranYouLeiXing) }}</text>
						<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="add_data">
			<view class="add_data_item">
				<view class="add_data_item_left">
					<text>使用性质</text>
				</view>
				<view class="add_data_item_right">
					<switch @change="shiYongXingZhiChange" :checked="guoLv(shiYongXingZhiType) == 0" />
					<text>{{ guoLv(shiYongXingZhi) }}</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item">
				<view class="add_data_item_left">
					<text>排量</text>
				</view>
				<view class="add_data_item_right">
					<switch @change="paiLiangChange" :checked="guoLv(paiLiangLeiXing) == 'T'" />
					<input type="number" v-model="paiLiang" placeholder-style="text-align:right;" placeholder="请输入排量" :adjust-position="false"
					 style="width: 130upx;" />
					<text>{{ guoLv(paiLiangLeiXing) }}</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item">
				<view class="add_data_item_left">
					<text>变速箱</text>
				</view>
				<view class="add_data_item_right">
					<switch @change="bianSuXiangChange" :checked="guoLv(bianSuXiang) == '自动'" />
					<text>{{ guoLv(bianSuXiang) }}</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item">
				<view class="add_data_item_left">
					<text>价格面议</text>
				</view>
				<view class="add_data_item_right">
					<switch @change="jiaGeChange" :checked="lingShouJiaState == 1" />
					<text>{{ guoLv(jiaGeMianYi) }}</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item" v-if="lingShouJiaState == 1">
				<view class="add_data_item_left">
					<text>零售价</text>
				</view>
				<view class="add_data_item_right">
					<input type="number" v-model="lingShouJia" placeholder="必填" placeholder-style="text-align:right;" :adjust-position="false" />
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
			<view class="add_data_item">
				<view class="add_data_item_left">
					<text>4S店保养</text>
				</view>
				<view class="add_data_item_right">
					<switch @change="siAiSiDianBaoYangChange" :checked="siAiSiDianBaoYang == '是'" />
					<text>{{ siAiSiDianBaoYang }}</text>
					<image mode="aspectFill" :lazy-load="true" src="../../../static/carAdmin/addCar/go.png"></image>
				</view>
			</view>
		</view>

		<!-- 环保标准选择器 -->
		<view :class="[pickerViewIndex == 0?'openPicker':'','pickerViewBg']"></view>
		<view :class="[pickerViewIndex == 0?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>环保标准</test>
				<text @tap="sureHuanBao()">确认</text>
			</view>
			<picker-view @change="bindChangeHuanBao">
				<picker-view-column>
					<view class="item" v-for="(item,index) in huanBao" :key="index">{{item.name}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- 外观颜色选择器 -->
		<view :class="[pickerViewIndex == 1?'openPicker':'','pickerViewBg']"></view>
		<view :class="[pickerViewIndex == 1?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>外观颜色</test>
				<text @tap="sureColor()">确认</text>
			</view>
			<picker-view @change="bindChangeColor">
				<picker-view-column>
					<view class="item" v-for="(item,index) in Color" :key="index">{{item.name}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- 车身类型选择器 -->
		<view :class="[pickerViewIndex == 2?'openPicker':'','pickerViewBg']"></view>
		<view :class="[pickerViewIndex == 2?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>车身类型</test>
				<text @tap="sureCheShenLeiXing()">确认</text>
			</view>
			<picker-view @change="bindChangeCheShenLeiXing">
				<picker-view-column>
					<view class="item" v-for="(item,index) in cheShen" :key="index">{{item.name}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- 内饰颜色选择器 -->
		<view :class="[pickerViewIndex == 3?'openPicker':'','pickerViewBg']"></view>
		<view :class="[pickerViewIndex == 3?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>内饰颜色</test>
				<text @tap="sureCheShiColor()">确认</text>
			</view>
			<picker-view @change="bindChangeCheShiColor">
				<picker-view-column>
					<view class="item" v-for="(item,index) in neiShiColor" :key="index">{{item.name}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- 燃油类型选择器 -->
		<view :class="[pickerViewIndex == 4?'openPicker':'','pickerViewBg']"></view>
		<view :class="[pickerViewIndex == 4?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>燃油类型</test>
				<text @tap="sureRanYou()">确认</text>
			</view>
			<picker-view @change="bindChangeRanYou">
				<picker-view-column>
					<view class="item" v-for="(item,index) in ranYou" :key="index">{{item.name}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- 所属市场选择器 -->
		<view :class="[pickerViewIndex == 5?'openPicker':'','pickerViewBg']"></view>
		<view :class="[pickerViewIndex == 5?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>所属市场</test>
				<text @tap="sureShiChang()">确认</text>
			</view>
			<picker-view @change="bindChangeShiChang">
				<picker-view-column>
					<view class="item" v-for="(item,index) in suoShuShiChangList" :key="index">{{item.marketName}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- 车商列表选择器 -->
		<view :class="[pickerViewIndex == 6?'openPicker':'','pickerViewBg']"></view>
		<view :class="[pickerViewIndex == 6?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>车商列表</test>
				<text @tap="sureCheShang()">确认</text>
			</view>
			<picker-view @change="bindChangeCheShang">
				<picker-view-column>
					<view class="item" v-for="(item,index) in cheShangList" :key="index">{{item.merchantName}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- 车场区域选择器 -->
		<view :class="[pickerViewIndex == 7?'openPicker':'','pickerViewBg']"></view>
		<view :class="[pickerViewIndex == 7?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>车场区域</test>
				<text @tap="sureCheChang()">确认</text>
			</view>
			<picker-view @change="bindChangeCheChang">
				<picker-view-column>
					<view class="item" v-for="(item,index) in cheChangList" :key="index">{{item.areaName}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- 年审日期选择器 -->
		<view :class="[pickerViewIndex == 8?'openPicker':'','pickerViewBg']"></view>
		<view :class="[pickerViewIndex == 8?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>年审日期</test>
				<text @tap="sureNianShen()">确认</text>
			</view>
			<picker-view @change="bindChangeNianShen" :value="pickerValue">
				<picker-view-column>
					<view class="item" v-for="(item,index) in years" :key="index">{{ item }}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in months" :key="index">{{ item }}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- 交强险日期选择器 -->
		<view :class="[pickerViewIndex == 9?'openPicker':'','pickerViewBg']"></view>
		<view :class="[pickerViewIndex == 9?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>交强险日期</test>
				<text @tap="sureJiaoQiangXian()">确认</text>
			</view>
			<picker-view @change="bindChangeJiaoQiangXian" :value="pickerValue">
				<picker-view-column>
					<view class="item" v-for="(item,index) in years" :key="index">{{ item }}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in months" :key="index">{{ item }}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- 上牌日期选择器 -->
		<view :class="[pickerViewIndex == 10?'openPicker':'','pickerViewBg']"></view>
		<view :class="[pickerViewIndex == 10?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>上牌时间</test>
				<text @tap="sureShangPai()">确认</text>
			</view>
			<picker-view @change="bindChangeShangPai" :value="shangPaiValue">
				<picker-view-column>
					<view class="item" v-for="(item,index) in shangPaiYears" :key="index">{{ item }}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in months" :key="index">{{ item }}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- 商业险日期选择器 -->
		<view :class="[pickerViewIndex == 11?'openPicker':'','pickerViewBg']"></view>
		<view :class="[pickerViewIndex == 11?'openPicker':'','picker-view']">
			<view class="chooseSure">
				<text @tap="openPickerView('==')">取消</text>
				<test>商业险到期日期</test>
				<text @tap="sureShangYe()">确认</text>
			</view>
			<picker-view @change="bindChangeShangYe" :value="pickerValue">
				<picker-view-column>
					<view class="item" v-for="(item,index) in years" :key="index">{{ item }}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in months" :key="index">{{ item }}</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	import {
		addCar,
		updateCar,
		selectMarket,
		selectMerchantById,
		getUnSigningAreaByMerchantId
	} from '@/api/addCar.js'
	// 车市区域索引  内饰颜色索引  外观颜色索引  汽车类型索引  燃油类型索引  环保标准索引  年份索引 月份索引  所属市场索引  车商列表索引  车场区域索引
	let cheShiIndex = 0,
		neiShiYanSeIndex = 0,
		waiGuanYanSeIndex = 0,
		carTypeIndex = 0,
		ranYouLeiXingIndex = 0,
		huanBaoBiaoZhunIndex = 0,
		yearIndex = 0,
		monthIndex = 0,
		shiChangIndex = 0,
		cheShangIndex = 0,
		cheChangIndex = 0,
		nianShenYearsIndex = 0,
		nianShenMonthsIndex = 0,
		jiaoQiangXianYearsIndex = 0,
		jiaoQiangXianMonthIndex = 0,
		shangPaiYearsIndex = 0,
		shangPaiMonthIndex = 0,
		shangYeYearsIndex = 0,
		shangYeMonthsIndex = 0
	export default {
		data() {
			const date = new Date();
			const years = [];
			const months = [];
			const shangPaiYears = []
			// 行驶里程数
			const liCheng = [];
			const licheng = '1万公里以内';
			// 车身类型
			const ranyou = '汽油';
			for (let i = date.getFullYear(); i >= 1990; i--) {
				shangPaiYears.push(i);
			}
			for (let i = date.getFullYear() - 20; i <= date.getFullYear() + 80; i++) {
				years.push(i);
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i);
			}
			for (let i = 1; i <= 20; i++) {
				var licheng3;
				if (i == 1) {
					licheng3 = '1万公里以内'
				} else {
					var licheng1 = i;
					var licheng2 = i - 1;
					licheng3 = licheng2 + '万公里--' + licheng1 + '万公里';
				}
				liCheng.push(licheng3)
			}
			return {
				shangPaiValue: [],
				pickerValue: [],
				shangPaiYears,
				ifGetMarket: false,
				carId: '',
				ifUpdate: false,
				pickerViewIndex: '==',
				cheChang: '请选择车场区域',
				cheChangId: '',
				cheChangList: [],
				cheShangId: '',
				cheShang: '请选择车商',
				cheShangList: [],
				suoShuShiChangList: [],
				suoShuShiChangId: '',
				suoShuShiChang: '请选择所属市场',
				shiJianPickerTitle: '',
				years,
				months,
				liCheng,
				licheng,
				xingZhi: ['非营运', '营运'],
				xingzhi: '非营运',
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
				color: '黑色',
				cheShen: [{
						type: 'micro_car',
						name: '微型车'
					},
					{
						type: 'small_car',
						name: '小型车'
					},
					{
						type: 'compact_car',
						name: '紧凑型'
					},
					{
						type: 'mid_size_car',
						name: '中型车'
					},
					{
						type: 'mid_full_size_car',
						name: '中大型'
					},
					{
						type: 'full_size_car',
						name: '大型车'
					},
					{
						type: 'mpv',
						name: 'MPV'
					},
					{
						type: 'suv',
						name: 'SUV'
					},
					{
						type: 'sports_car',
						name: '跑车'
					},
					{
						type: 'pickup_trucks',
						name: '皮卡'
					},
					{
						type: 'small_van',
						name: '微面'
					},
					{
						type: 'electrocar',
						name: '电动车'
					},
					{
						type: 'ohter',
						name: '其他'
					}
				],
				huanBao: [{
						type: 'guo_1',
						name: '国I'
					},
					{
						type: 'guo_2',
						name: '国II'
					},
					{
						type: 'guo_3',
						name: '国III'
					},
					{
						type: 'guo_4',
						name: '国IV'
					},
					{
						type: 'guo_5',
						name: '国V'
					},
					{
						type: 'eu_1',
						name: '欧I'
					},
					{
						type: 'eu_2',
						name: '欧II'
					},
					{
						type: 'eu_3',
						name: '欧III'
					},
					{
						type: 'eu_4',
						name: '欧IV'
					},
					{
						type: 'eu_5',
						name: '欧V'
					}
				],
				huanbao: '国I',
				ranYou: [{
						type: 'gasoline',
						name: '汽油'
					},
					{
						type: 'diesel',
						name: '柴油'
					},
					{
						type: 'electric',
						name: '电动'
					},
					{
						type: 'hybrid',
						name: '混合'
					},
					{
						type: 'other',
						name: '其他'
					}
				],
				ranyou: '汽油',
				cheshenleixing: '其他',
				neiShiColor: [{
						type: 'double',
						name: '双色'
					},
					{
						type: 'cream',
						name: '米黄'
					},
					{
						type: 'oyster_grey',
						name: '米灰'
					},
					{
						type: 'red',
						name: '红色'
					},
					{
						type: 'black',
						name: '黑色'
					},
					{
						type: 'brown',
						name: '棕色'
					},
					{
						type: 'rgb(59, 250, 250)',
						name: '其他'
					}
				],
				neishicolor: '双色',
				visible: true,
				// indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				addDataMoreStyle: 'transform: scaleY(0);',
				addDataMoreImage: 'transform:rotate(0deg);',
				addDataMoreState: false,
				shouCiShangPai: '必填',
				xuanZeLeiXing: '',
				nianShenRiQi: '',
				jiaoQiangXian: '必填',
				xingShiLiCheng: '',
				// 车辆类型
				cheLiangLeiXingRadioItems: [{
						value: 'erShowChe',
						name: '二手车'
					},
					{
						value: 'xinChe',
						name: '新车',
						checked: 'true'
					}
				],
				current: 0,
				// 4S店保养
				siAiSiDianBaoYang: '否',
				// 车辆类型
				cheLiangLeiXing: '二手车',
				// 价格面议
				jiaGeMianYi: '否',
				// 车市区域
				cheShiQuYu: '',
				// 车牌号码
				chePaiHaoMa: '',
				// VIN号
				vinNumber: '请拍照识别',
				// 零售价
				lingShouJia: '',
				// 零售价状态
				lingShouJiaState: 1,
				// 使用性质
				shiYongXingZhi: '非营运',
				// 使用性质
				shiYongXingZhiType: 1,
				// 变速箱
				bianSuXiang: '手动',
				bianSuXingEnglish: 'manual',
				// 排量
				paiLiang: '',
				// 排量类型
				paiLiangLeiXing: 'L',
				// 外观颜色
				waiGuanYanSe: '必填',
				waiGuanYanseEnghlish: '',
				// 车商列表
				// cheShang: '必填',
				// 品牌型号
				carSystem: '必填',
				carInformation: {
					brandName: '',
					seriesName: '',
					styleName: '',
					styleId: '',
					seriesId: ''
				},
				// 车辆图片
				carImg: ['../../../static/carAdmin/addImg.png'],
				// 钥匙数量
				yaoShiShuLiang: '',
				// 内饰颜色
				neiShiYanSe: '请选择内饰颜色',
				neiShiYanSeEnglish: '',
				// 车身类型
				cheShenLeiXing: '其他',
				cheShenLeiXingEnglish: '',
				// 过户次数
				guoHuCiShu: '',
				// 车市列表
				marketList: [],
				// 环保标准
				huanBaoBiaoZhun: '请选择环保标准',
				huanBaoBiaoZhunEnglish: '',
				// 燃油类型
				ranYouLeiXing: '请选择燃油类型',
				ranYouLeiXingEnglish: '',
				// 车辆配置
				cheLiangPeiZhi: '点击编辑车辆配置',
				// 车市Id列表
				marketIdList: [],
				// 上牌
				shangPaiText: '是',
				// 上牌状态
				shangPaiState: 'licensed',
				// 所选车市id
				marketId: '',
				// 是否展示轮播图
				ifShowImg: false,
				// 商业险是否到期   0是  1否
				isBusinessInsurance: 1,
				// 商业险日期
				businessInsuranceDate: '必填'

			}
		},
		onLoad(params) {
			this.pickerValue[0] = this.getYearIndex(this.years)
			this.pickerValue[1] = new Date().getMonth() - 1
			this.shangPaiValue[0] = this.getYearIndex(this.shangPaiYears)
			this.shangPaiValue[1] = new Date().getMonth() - 1
			if (params.carData) {
				this.ifUpdate = true;
				let carDatas = JSON.parse(params.carData);
				this.carId = carDatas.id;
				// 轮播图
				this.carImg = carDatas.coverUrl;
				// 所属市场
				this.suoShuShiChang = carDatas.marketName;
				this.suoShuShiChangId = carDatas.marketId;
				this.cheShang = carDatas.merchantName;
				this.cheShangId = carDatas.relationId;
				this.cheChang = carDatas.areaName;
				this.cheChangId = carDatas.areaId;
				// vin码
				// this.vinNumber = carDatas.vin;
				// 车牌
				this.chePaiHaoMa = carDatas.currentPlateNumber;
				this.shouCiShangPai = carDatas.licensedAt;
				this.shangPaiState = carDatas.licenseInfo;
				carDatas.licenseInfo == 'licensed' ? this.shangPaiText = '是' : this.shangPaiText = '否';
				// 品牌型号
				this.carSystem = carDatas.styleName;
				this.carInformation.seriesId = carDatas.seriesId;
				this.carInformation.seriesName = carDatas.seriesName;
				this.carInformation.styleName = carDatas.styleName;
				this.carInformation.styleId = carDatas.styleId;
				this.carInformation.brandName = carDatas.brandName;
				// 颜色
				this.waiGuanYanSe = carDatas.exteriorColorName;
				this.waiGuanYanseEnghlish = carDatas.exteriorColor;
				this.neiShiYanSeEnglish = carDatas.interiorColor;
				this.neiShiYanSe = carDatas.interiorColorName;
				// 行驶里程
				this.xingShiLiCheng = carDatas.mileage;
				// 日期
				this.nianShenRiQi = carDatas.validateDate;
				this.jiaoQiangXian = carDatas.forceInsuranceDate;
				// 数量
				this.yaoShiShuLiang = carDatas.keyNum;
				this.guoHuCiShu = carDatas.transferNum;
				// 环保
				this.huanBaoBiaoZhun = carDatas.emissionStandard;
				// 排量
				this.paiLiangLeiXing = carDatas.isTurboCharger;
				this.paiLiang = carDatas.displacement;
				// 使用性质
				this.shiYongXingZhi = carDatas.nature;
				if (carDatas.nature == '非营运') {
					this.shiYongXingZhiType = 1;
				} else {
					this.shiYongXingZhiType = 0;
				}
				let xunHuan = (arrays, name) => {
					for (let i in arrays) {
						if (arrays[i].name == name) {
							return arrays[i].type;
							break;
						}
					}
				}
				// this.huanBaoBiaoZhunEnglish = xunHuan(this.huanBao, this.huanBaoBiaoZhun)
				this.ranYouLeiXing = carDatas.fuelType;
				// this.ranYouLeiXingEnglish = xunHuan(this.ranYou, this.ranYouLeiXing)
				// 变速箱
				this.bianSuXiang = carDatas.transmission;
				// if (carDatas.transmission == '手动') {
				// 	this.bianSuXingEnglish = 'manual'
				// } else {
				// 	this.bianSuXingEnglish = 'auto'
				// }
				// 零售价
				carDatas.onlinePriceCents == 0 ? this.lingShouJia = '' : this.lingShouJia = carDatas.onlinePriceCents;
				this.lingShouJiaState = carDatas.isFaceToFace;
				carDatas.isFaceToFace == 0 ? this.jiaGeMianYi = '是' : this.jiaGeMianYi = '否';
				// 4s店保养
				this.siAiSiDianBaoYang = carDatas.isRegularMaintenance;
				// 商业险
				this.isBusinessInsurance = carDatas.isBusinessInsurance;
				this.businessInsuranceDate = carDatas.businessInsuranceDate;
			} else {
				if (this.carImg[0] == '../../../static/carAdmin/addImg.png') {
					this.ifShowImg = true;
				} else {
					this.ifShowImg = false;
				}
				this.ifGetMarket = true;
			}
			this.getAllMarket();
		},
		computed: {
			// 车牌号码
			chePaiRule: {
				get: function() {
					return this.chePaiHaoMa
				},
				set: function(val) {
					this.chePaiHaoMa = val.toUpperCase()
				}
			},
			// 车架号vin码
			// vinRule: {
			// 	get: function() {
			// 		return this.vinNumber
			// 	},
			// 	set: function(val) {
			// 		this.vinNumber = val.toUpperCase()
			// 	}
			// }
		},
		onShow() {
			if (this.carImg[0] == '../../../static/carAdmin/addImg.png') {
				this.ifShowImg = true;
			} else {
				this.ifShowImg = false;
			}
		},
		onNavigationBarButtonTap() {
			this.addCars();
		},
		methods: {
			// vin码识别
			get_assecs_token() {
				let _this = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['camera'],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						let img = tempFilePaths[0];
						this.$loading()
						uni.uploadFile({
							url: 'http://netocr.com/api/recog.do',
							filePath: tempFilePaths[0],
							name: 'file',
							fileType:'image',
							formData: {
								key:'4Chk5oJ872pKKvUe2P4zQ1',
								secret:'2b4668b811054783aaa30952097b442a',
								typeId:2007,
								format:'json'
							},
							async success(resData) {
								if(JSON.parse(resData.data).message.status == 0){
									_this.vinNumber = JSON.parse(resData.data).cardsinfo[0].items[0].content
								}else{
									_this.$toast('请上传清晰的vin码照片')
								}
								uni.hideLoading()
							},
							async fail(err) {
								_this.$toast('上传失败');
							}
						});
					},
					fail: (errData) => {
						_this.$toast(errData)
					}
				});
			},
			getYearIndex(array) {
				for (let i in array) {
					if (array[i] == new Date().getFullYear()) {
						return i;
						break;
					}
				}
			},
			// 商业险是否到期状态修改
			shangYeChange(e) {
				if (e.target.value == true) {
					this.isBusinessInsurance = 0;
				} else {
					this.isBusinessInsurance = 1;
				}
			},
			guoLv(data) {
				if (data == undefined || data == null || data == NaN) {
					return ''
				} else {
					return data
				}
			},
			// 打开picker-view选择器
			openPickerView(index) {
				if (index == 5) {
					if (uni.getStorageSync('qx') == 'admine') {
						if (this.suoShuShiChangList.length > 0) {
							this.pickerViewIndex = index;
						} else {
							this.$toast('暂无所属市场')
						}
					}
				} else if (index == 6) {
					if (uni.getStorageSync('qx') == 'admine' || uni.getStorageSync('qx') == 'market') {
						if (this.cheShangList.length > 0) {
							this.pickerViewIndex = index;
						} else {
							this.$toast('暂无车商列表')
						}
					}
				} else if (index == 7) {
					if (this.cheChangList.length > 1) {
						this.pickerViewIndex = index;
					} else {
						this.$toast('暂无其他车场区域');
					}
				} else {
					this.pickerViewIndex = index;
				}
			},
			async getAllCheChang() {
				try {
					let resData = await getUnSigningAreaByMerchantId(this.cheShangList[0].merchantId)
					if (resData.code === 200) {
						if (resData.result.length > 0) {
							this.cheChang = '请选择车场区域';
							if (this.ifGetMarket && resData.result.length == 1) {
								this.cheChang = resData.result[0].areaName;
								this.cheChangId = resData.result[0].areaId;
							} else {
								this.ifGetMarket = true;
								this.cheChangList = resData.result;
							}
						} else {
							this.cheChangList = [];
							this.cheChang = '暂无';
							this.cheChangId = '';
						}
					}
				} catch (e) {
					this.$toast('网络错误');
				}
			},
			async getAllCheShang() {
				try {
					let resData = await selectMerchantById(this.suoShuShiChangId)
					if (resData.code === 200) {
						if (resData.result.length > 0) {
							if (this.ifGetMarket && resData.result.length == 1) {
								this.cheShang = resData.result[0].merchantName;
								this.cheShangId = resData.result[0].merchantId;
							}
							this.cheShangList = resData.result;
							this.cheShang = '请选择车商';
							this.cheShangId = '';
							this.cheChang = '请选择市场区域'
							this.cheChangList = [];
							this.cheChangId = ''
						} else {
							this.cheShangList = [];
							this.cheShang = '暂无';
							this.cheShangId = '';
							this.cheChang = '暂无'
							this.cheChangList = [];
							this.cheChangId = ''
						}
					} else {
						this.$toast(resData.message);
					}
				} catch (e) {
					this.$toast('网络错误');
				}
			},
			// 获取所属市场
			async getAllMarket() {
				this.$loading();
				try {
					let resData = await selectMarket()
					if (resData.code === 200) {
						if (resData.result.length > 0) {
							if (this.ifGetMarket && resData.result.length == 1) {
								this.suoShuShiChang = resData.result[0].marketName;
								this.suoShuShiChangId = resData.result[0].marketId;
							}
							this.suoShuShiChangList = resData.result;
						} else {
							this.suoShuShiChangList = [];
							this.suoShuShiChang = '暂无';
							this.suoShuShiChangId = '';
						}
					} else {
						this.$toast(resData.message);
					}
					uni.hideLoading();
				} catch (e) {
					this.$toast('网络错误')
				}
			},
			// 新增或修改车辆
			async addCars() {
				let chePaiHaoZhengZe = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
				let vinZhengZe = /^[A-H-J-N-R-Z0-9]{17}$/;
				if (this.suoShuShiChang == '' || this.suoShuShiChang == '暂无') {
					this.$toast('请选择所属市场');
				} else if (this.cheShang == '' || this.cheShang == '暂无') {
					this.$toast('请选择车商');
				} else if (this.cheChang == '' || this.cheChang == '暂无') {
					this.$toast('请选择车场区域');
				} else if (vinZhengZe.test(this.vinNumber)) {
					this.$toast('请填写VIN码');
				} else if (this.isBusinessInsurance == 0 && this.businessInsuranceDate == '必填') {
					this.$toast('请选择商业险到期日期');
				} else if (this.jiaoQiangXian == '必填') {
					this.$toast('请选择交强险日期');
				} else if (this.shangPaiState == 'licensed' && !chePaiHaoZhengZe.test(this.chePaiHaoMa)) {
					this.$toast('请填正确填写车牌号');
				} else if (this.shangPaiState == 'licensed' && this.shouCiShangPai == '必填') {
					this.$toast('请选择上牌时间');
				} else if (this.xingShiLiCheng == '') {
					this.$toast('请填写行驶里程');
				} else if (this.waiGuanYanseEnghlish == '') {
					this.$toast('请选择外观颜色');
				} else if (this.carInformation.brandName == '' || this.carInformation.seriesName == '' || this.carInformation
					.styleName == '') {
					this.$toast('请选择品牌车型');
				} else if (this.lingShouJiaState == 1 && this.lingShouJia == '') {
					this.$toast('请填写零售价');
				} else if (this.carImg[0] == '../../../static/carAdmin/addImg.png') {
					this.$toast('请上传车辆照片');
				} else {
					var paiLiangType = 1;
					if (this.paiLiangLeiXing == 'T') {
						paiLiangType = 0;
					}
					var jiaGeMianYiType = 0;
					if (this.jiaGeMianYi == '否') {
						jiaGeMianYiType = 1;
					}
					var siAiSiDianBaoYangType = 0;
					if (this.siAiSiDianBaoYang == '否') {
						siAiSiDianBaoYangType = 1;
					}
					var chePaiShiJian = this.shouCiShangPai;
					if (chePaiShiJian == '必填') {
						chePaiShiJian = '';
					}
					if (this.shangPaiState == 'unlicensed') {
						this.chePaiHaoMa = '';
						this.shouCiShangPai = '';
						chePaiShiJian = '';
					}
					try {
						this.$loading()
						let addCarData = {
							marketId: this.suoShuShiChangId,
							relationId: this.cheShangId,
							areaId: this.cheChangId,
							areaName: this.cheChang,
							brandName: this.carInformation.brandName,
							seriesName: this.carInformation.seriesName,
							seriesId: this.carInformation.seriesId,
							styleName: this.carInformation.styleName,
							styleId: this.carInformation.styleId,
							exteriorColor: this.waiGuanYanseEnghlish,
							exteriorColorName: this.waiGuanYanSe,
							interiorColor: this.neiShiYanSeEnglish,
							interiorColorName: this.neiShiYanSe,
							licenseInfo: this.shangPaiState,
							licensedAt: chePaiShiJian,
							validateDate: this.nianShenRiQi,
							forceInsuranceDate: this.jiaoQiangXian,
							nature: this.shiYongXingZhiType,
							isTurboCharger: paiLiangType,
							emissionStandard: this.huanBaoBiaoZhun,
							// emissionStandardName: this.huanBaoBiaoZhunEnglish,
							transmission: this.bianSuXiang,
							isFaceToFace: jiaGeMianYiType,
							isRegularMaintenance: siAiSiDianBaoYangType,
							keyNum: this.yaoShiShuLiang,
							carType: this.cheShenLeiXing,
							transferNum: this.guoHuCiShu,
							fuelType: this.ranYouLeiXing,
							vin: this.vinNumber,
							currentPlateNumber: this.chePaiHaoMa,
							mileage: this.xingShiLiCheng,
							coverUrl: this.carImg.join(','),
							onlinePriceCents: parseFloat(this.lingShouJia),
							displacement: this.paiLiang,
							isBusinessInsurance: this.isBusinessInsurance,
							businessInsuranceDate: this.businessInsuranceDate
						}
						let resData;
						if (this.ifUpdate) {
							addCarData.id = this.carId;
							resData = await updateCar(addCarData)
						} else {
							resData = await addCar(addCarData)
						}
						if (resData.code === 200) {
							let msg = '发车';
							if (this.ifUpdate) {
								msg = '修改车辆'
							}
							uni.showToast({
								title: `${msg}` + '成功,即将为您跳转车辆列表页面。',
								icon: "none",
								position: 'bottom',
								mask: true
							})
							setTimeout(() => {
								uni.redirectTo({
									url: '../vehicleSource/vehicleSource?paiXu=最近入库'
								});
							}, 1000)
						} else {
							this.$toast(resData.message);
						}
						uni.hideLoading();
					} catch (e) {
						this.$toast('网络错误');
					}
				}
			},
			// 暂未开放
			zwkf() {
				uni.showToast({
					title: '暂未开放',
					icon: 'none',
					mask: false,
					duration: 1500
				});
			},
			// 打开更多信息
			openMore() {
				if (this.addDataMoreState == false) {
					this.addDataMoreState = true;
					this.addDataMoreStyle = 'transform: scaleY(1);';
					this.addDataMoreImage = 'transform:rotate(180deg);';
				} else {
					this.addDataMoreState = false;
					this.addDataMoreStyle = 'transform: scaleY(0);';
					this.addDataMoreImage = 'transform:rotate(0deg);';
				}
			},
			// 去上传图片页面
			goAddCarImg() {
				this.$goWindow('../addCarImg/addCarImg?imgArray=' + this.carImg)
			},
			// 是否上牌
			shangPaiChange(e) {
				if (e.target.value != true) {
					this.shangPaiText = '否';
					this.shangPaiState = 'unlicensed';
				} else {
					this.shangPaiText = '是';
					this.shangPaiState = 'licensed';
				}
			},
			// 修改4S店保养
			siAiSiDianBaoYangChange(e) {
				if (e.target.value != true) {
					this.siAiSiDianBaoYang = '否';
				} else {
					this.siAiSiDianBaoYang = '是';
				}
			},
			// 修改使用性质
			shiYongXingZhiChange(e) {
				if (e.target.value != true) {
					this.shiYongXingZhi = '非营运';
					this.shiYongXingZhiType = 1;
				} else {
					this.shiYongXingZhi = '营运';
					this.shiYongXingZhiType = 0;
				}
			},
			// 价格面议状态修改
			jiaGeChange(e) {
				if (e.target.value == true) {
					this.jiaGeMianYi = '否';
					this.lingShouJiaState = 1;
				} else {
					this.jiaGeMianYi = '是';
					this.lingShouJiaState = 0;
				}
			},
			// 修改变速箱
			bianSuXiangChange(e) {
				if (e.target.value == true) {
					this.bianSuXiang = '自动';
					this.bianSuXingEnglish = 'auto';
				} else {
					this.bianSuXiang = '手动';
					this.bianSuXingEnglish = 'manual';
				}
			},
			// 修改排量
			paiLiangChange(e) {
				if (e.target.value == true) {
					this.paiLiangLeiXing = 'T';
				} else {
					this.paiLiangLeiXing = 'L';
				}
			},
			// 选择二手车新车事件
			ifXincheChange(evt) {
				for (let i = 0; i < this.cheLiangLeiXingRadioItems.length; i++) {
					if (this.cheLiangLeiXingRadioItems[i].value === evt.target.value) {
						this.current = i;
						this.cheLiangLeiXing = this.cheLiangLeiXingRadioItems[this.current].name;
						break;
					}
				}
			},
			// 确定燃油类型
			sureRanYou() {
				this.openPickerView('==')
				this.ranYouLeiXing = this.ranYou[ranYouLeiXingIndex].name;
				this.ranYouLeiXingEnglish = this.ranYou[ranYouLeiXingIndex].type;
			},
			// 确定环保类型
			sureHuanBao() {
				this.openPickerView('==')
				this.huanBaoBiaoZhun = this.huanBao[huanBaoBiaoZhunIndex].name;
				this.huanBaoBiaoZhunEnglish = this.huanBao[huanBaoBiaoZhunIndex].type;
			},
			// 确定车身类型
			sureCheShenLeiXing() {
				this.openPickerView('==')
				this.cheShenLeiXing = this.cheShen[carTypeIndex].name;
				this.cheShenLeiXingEnglish = this.cheShen[carTypeIndex].type;

			},
			// 确认车商列表选择器
			sureCheShang() {
				this.openPickerView('==');
				this.cheShang = this.cheShangList[cheShangIndex].merchantName;
				this.cheShangId = this.cheShangList[cheShangIndex].merchantId;
				this.getAllCheChang();
			},
			// 确定所属市场选择器
			sureShiChang() {
				this.openPickerView('==')
				this.suoShuShiChang = this.suoShuShiChangList[shiChangIndex].marketName;
				this.suoShuShiChangId = this.suoShuShiChangList[shiChangIndex].marketId;
				this.getAllCheShang();
			},
			// 确定车场区域选择器
			sureCheChang() {
				this.openPickerView('==')
				this.cheChang = this.cheChangList[cheChangIndex].areaName;
				this.cheChangId = this.cheChangList[cheChangIndex].areaId;
			},
			// 确定内饰颜色
			sureCheShiColor() {
				this.openPickerView('==')
				this.neiShiYanSe = this.neiShiColor[neiShiYanSeIndex].name;
				this.neiShiYanSeEnglish = this.neiShiColor[neiShiYanSeIndex].type;
			},
			// 确定外观颜色选择器
			sureColor() {
				this.openPickerView('==')
				this.waiGuanYanSe = this.Color[waiGuanYanSeIndex].name;
				this.waiGuanYanseEnghlish = this.Color[waiGuanYanSeIndex].type;
			},
			// 确定年审日期
			sureNianShen() {
				this.openPickerView('==')
				let month = this.months[nianShenMonthsIndex]
				month = (month < 10 ? '0' + month : month)
				this.nianShenRiQi = this.years[nianShenYearsIndex] + '-' + month
			},
			// 确认交强险日期
			sureJiaoQiangXian() {
				this.openPickerView('==')
				let month = this.months[jiaoQiangXianMonthIndex]
				month = (month < 10 ? '0' + month : month)
				this.jiaoQiangXian = this.years[jiaoQiangXianYearsIndex] + '-' + month
			},
			sureShangPai() {
				this.openPickerView('==')
				let month = this.months[shangPaiMonthIndex]
				month = (month < 10 ? '0' + month : month)
				this.shouCiShangPai = this.shangPaiYears[shangPaiYearsIndex] + '-' + month
			},
			sureShangYe() {
				this.openPickerView('==')
				let month = this.months[shangYeMonthsIndex]
				month = (month < 10 ? '0' + month : month)
				this.businessInsuranceDate = this.years[shangYeYearsIndex] + '-' + month
			},
			// 燃油类型选择器
			bindChangeRanYou(e) {
				const val = e.detail.value;
				ranYouLeiXingIndex = val[0];
			},
			// 商业险到期日期选择器
			bindChangeShangYe(e) {
				const val = e.detail.value;
				if (!val[0]) {
					val[0] = 0;
				} else if (!val[1]) {
					val[1] = 0;
				}
				shangYeYearsIndex = val[0];
				shangYeMonthsIndex = val[1];
			},
			// 上牌时间选择器
			bindChangeShangPai(e) {
				const val = e.detail.value;
				if (!val[0]) {
					val[0] = 0;
				} else if (!val[1]) {
					val[1] = 0;
				}
				shangPaiYearsIndex = val[0];
				shangPaiMonthIndex = val[1];
			},
			// 交强险日期选择器
			bindChangeJiaoQiangXian(e) {
				const val = e.detail.value;
				if (!val[0]) {
					val[0] = 0;
				} else if (!val[1]) {
					val[1] = 0;
				}
				jiaoQiangXianYearsIndex = val[0];
				jiaoQiangXianMonthIndex = val[1];
			},
			//年审日期选择器
			bindChangeNianShen(e) {
				const val = e.detail.value;
				if (!val[0]) {
					val[0] = 0;
				} else if (!val[1]) {
					val[1] = 0;
				}
				nianShenYearsIndex = val[0];
				nianShenMonthsIndex = val[1];
			},
			// 环保标准选择器
			bindChangeHuanBao(e) {
				const val = e.detail.value;
				huanBaoBiaoZhunIndex = val[0];
			},
			// 车身类型选择器
			bindChangeCheShenLeiXing(e) {
				const val = e.detail.value;
				carTypeIndex = val[0];
			},
			// 内饰颜色选择器
			bindChangeCheShiColor(e) {
				const val = e.detail.value;
				neiShiYanSeIndex = val[0];
			},
			// 车商选择器
			bindChangeCheShi(e) {
				const val = e.detail.value;
				cheShiIndex = val[0];
			},
			// 所属市场选择器
			bindChangeShiChang(e) {
				const val = e.detail.value;
				shiChangIndex = val[0]
			},
			// 车商列表选择器
			bindChangeCheShang(e) {
				const val = e.detail.value;
				cheShangIndex = val[0]
			},
			// 车场区域选择器
			bindChangeCheChang(e) {
				const val = e.detail.value;
				cheChangIndex = val[0]
			},
			// 外观颜色选择器
			bindChangeColor(e) {
				const val = e.detail.value;
				waiGuanYanSeIndex = val[0];
			},
			// 上牌时间选择器
			bindChange(e) {
				const val = e.detail.value;
				if (val[0] == undefined) {
					val[0] = 0;
				} else if (val[1] == undefined) {
					val[1] = 0;
				}
				yearIndex = val[0];
				monthIndex = val[1];
			}
		}
	}
</script>
