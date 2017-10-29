<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avator">
				<img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<img class="brand" src="./brand@2x.png"></img>
					<span class="name">{{sellers.name}}</span>
				</div>
				<div class="description">
					{{sellers.description}}/{{sellers.deliveryTime}} 分钟送达
				</div>
				<div class="supports" v-if = "sellers.supports">
					<img class="icon" src="./decrease_1@2x.png" alt="">
					<span class="text">{{sellers.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if="sellers.supports" @click="showDetail">
				<span class="count">{{sellers.supports.length}}个&nbsp;&gt;</span>
				<i class="icpn-r"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title">公告:</span><span class="bulletin-text">{{sellers.bulletin}}</span>
			<i class="icpn-r">&nbsp;&gt;</i>
		</div>
		<div class="background">
			<img :src="sellers.avator" width="100%" height="100%">
			<i></i>
		</div>
		<transition name="detail-fade">
			<div class="detail" v-if="detailShow">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="detail-name">{{sellers.name}}</h1>
						<div class="star-wrapper">
							<Star :size="48" :score="sellers.score"></Star>
							<div class="detail-title">
								<div class="detail-line"></div>
								<div class="detail-text">
									优惠信息
								</div>
								<div class="detail-line"></div>
							</div>
							<ul class="detail-supports">							
								<li class="description-text"><img src="./decrease_1@2x.png">在线支付满28减5</li>
								<li class="description-text"><img src="./discount_1@2x.png">VC无限橙果汁全场8折</li>
								<li class="description-text"><img src="./guarantee_1@2x.png">单人精彩套餐</li>
								<li class="description-text"><img src="./invoice_1@2x.png">该商家支持发票,请下单写好发票抬头</li>
								<li class="description-text"><img src="./special_1@2x.png">已加入“外卖保”计划,食品安全保障</li>
							</ul>
							<div class="detail-title">
								<div class="detail-line"></div>
								<div class="detail-text">
									商家信息
								</div>
								<div class="detail-line"></div>
							</div>
							<div class="detail-bulletin">
								<p class="bulletin-content">{{sellers.bulletin}}</p>
							</div>
						</div>				
					</div>				
				</div>
				<div class="detail-close" @click="hideDetail">
					<img src="../../common/img/关闭.png" width="32" height="32">
				</div>
			</div>			
		</transition>
		
	</div>	
</template>

<script>
	import Star from '../star/star.vue';
	export default {
		props: {
			sellers: {
				type: Object
			},			
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		components: {
			Star
		},
		data () {
			return {
				detailShow: false,
			}
		},
		methods: {
			showDetail () {
				this.detailShow = true;
			},
			hideDetail () {
				this.detailShow = false;
			}
		},
		created () {
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
		}
	}
</script>

<style type="text/css">
	  * {
		margin: 0;
		padding: 0;
	}
	.header {
		color: #fff;
		background: #61AECB;
		overflow: hidden;
	}
	.content-wrapper {
		position: relative;
		padding: 24px 12px 18px 24px;
		font-size: 0;
	}
	.avator{
		display: inline-block;
	}
	.content {
		display: inline-block;
		font-size: 14px;
		margin-left: 16px;
	}
	.title {
		margin: 2px 0 8px 0;
	}
	.brand {
		width: 30px;
		height: 18px;
		display: inline-block;
		vertical-align: top;
		/*background-image: url("brand");*/
		background-size: 30px 18px;
		background-repeat: no-repeat;
	}
	.name {
		margin-left: 6px;
		font-size: 16px;
		line-height: 18px;
		font-weight: bold;
	}
	.description {
		margin-bottom: 10px;
		line-height: 12px;
		font-size: 12px;
	}
	.icon {
		display: inline-block;
		width: 12px;
		height: 12px;
		margin-right: 4px;
	}
	.text {
		line-height: 12px;
		font-size: 12px;
	}
	.support-count {
		position: absolute;
		right: 12px;
		bottom: 18px;
		padding: 0 18px;
		height: 24px;
		line-height: 24px;
		border-radius: 14px;
		background: rgba(0,0,0,0.2);
		text-align: center;
	}
	.count {
		font-size: 10px;
	}
	.icpn-r {
		line-height: 24px;
		margin-right: 2px;
		font-size: 10px;
	}
	.bulletin-wrapper {
		height: 28px;
		line-height: 28px;
		font-size: 10px;
		padding: 0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.bulletin-title {
		display: inline-block;
		/*background-color: #FFFAFA;*/
		width: 32px;
		height: 22px;
		margin-left: 10px;
	}
	.bulletin-text {
		font-size: 10px;
	}
	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%；
	}
	.detail {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 100;
		width: 100%;
		height: 100%;
		overflow: auto;
		background: rgba(7,17,27,0.8);
	}
	.clearfix {
		display: inline-block;
	}
	.clearfix:after {
		display: block;
		content: ".";
		height: 0;
		line-height: 0;
		clear: both;
		visibility: hidden;
	}
	.detail-wrapper {
		width: 100%;
		min-height: 100%;
		/*overflow: hidden;*/
	}
	.detail-name {
		text-align: center;
	}
	.detail-main {
		margin-top: 64px;
		padding-bottom: 64px;
	}
	.detail-close {
		position: relative;
		width: 32px;
		height: 32px;
		margin: -64px auto 0 auto;
		clear: both;
		font-size: 32px;
	}
	.detail-name {
		font-size: 16px;
	}
	.star-wrapper {
		margin-top: 12px;
		padding: 10px 0;
	}
	.detail-title {
		display: flex;
		width: 80%;
		margin: 30px auto 24px auto;		
	}
	.detail-line {
		flex: 1;
		position: relative;
		top: -6px;
		border-bottom: 1px solid rgba(225,225,225,0.2);
	}
	.detail-text {
		padding: 0 12px;
		font-size: 14px;
		font-weight: 700;

	}
    .detail-supports {
		width: 80%;
		list-style: none;
	}
	.supports-item {
		padding: 0 12px;
		margin-bottom: 12px;
		font-size: 0;
	}
	.description-text {
		color: #00ffff;
		line-height: 16px;
		font-size: 12px;
		padding: 6px 5px;
		margin-left: 24px;
	}
	.description-text img {
		float: left;
		width: 16px;
		height: 16px;
		vertical-align: top;
		padding-left: 18px;
		margin-right: 16px;
	}
	.detail-bulletin {
		width: 80%;
		margin: 0 auto;
	}
	.bulletin-content {
		padding: 0 12xp;
		line-height: 24px;
		font-size: 12px;
	}
	.detail-fade-enter-active {
		transition: all 0.4s ease-in-out;
	}
	.detail-fade-leave-active {
		transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
	}
	.detail-fade-enter, .detail-fade-leave-to {
	/* .slide-fade-leave-active for below version 2.1.8 */ 
	transform: translateX(10px);
	opacity: 0;
	}
</style>