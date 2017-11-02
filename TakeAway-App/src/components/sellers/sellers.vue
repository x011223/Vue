<template>
	<div class="sellers" ref="sellers">
		<div class="sellers-content">
			<div class="overview">				
				<div class="overview-desc">
					<h1 class="overview-title">{{sellers.name}}</h1>
					<star class="desc-star" :size="36" :score="sellers.score"></star>
					<span class="desc-text">({{sellers.ratingCount}})</span>
					<span class="desc-text">月售{{sellers.sellCount}}单</span>
				</div>
				<div class="overview-remark">
					<li class="remark-block">
						<h2>起送价</h2>
						<div class="remark-content">
							<span>{{sellers.minPrice}}</span>
							<span class="stress">元</span>
						</div>
					</li>
					<li class="remark-block">
						<h2>商家配送</h2>
						<div class="remark-content">
							<span>{{sellers.deliveryPrice}}</span>
							<span class="stress">元</span>
						</div>
					</li>
					<li class="remark-block">
						<h2>平均配送时间</h2>
						<div class="remark-content">
							<span>{{sellers.deliveryTime}}</span>
							<span class="stress">分钟</span>
						</div>
					</li>
				</div>
				<split></split>
				<div class="annouce">
					<h1 class="annouce-title">公告与活动</h1>
					<span class="annouce-content">{{sellers.bulletin}}</span>
				</div>
				<split></split>
				<ul class="detail-supports">							
					<li class="description-text"><img src="./decrease_1@3x.png">在线支付满28减5</li>
					<li class="description-text"><img src="./discount_1@3x.png">VC无限橙果汁全场8折</li>
					<li class="description-text"><img src="./guarantee_1@3x.png">单人精彩套餐</li>
					<li class="description-text"><img src="./invoice_1@3x.png">该商家支持发票,请下单写好发票抬头</li>
					<li class="description-text"><img src="./special_1@3x.png">已加入“外卖保”计划,食品安全保障</li>
				</ul>
				<split></split>
				<div class="pics">
					<span class="pics-title">商家实景</span>
					<div class="pics-wrapper" ref="pics-wrapper">
						<ul class="pic-list" ref="pic-list">
							<li class="pic-item" v-for="pic in sellers.pics">
								<img :src="pic" width="120" height="90">
							</li>
						</ul>
					</div>
				</div>
				<split></split>
				<div class="sellers-info">
					<h1 class="info-title">商家信息</h1>
					<ul class="info-items" v-for="info in sellers.infos">
						<li class="info-item">{{info}}</li>
					</ul>
				</div>
				<!-- <div class="favorite">
					<img class="fav-icon" src="./favorite_off.svg">
					<span class="fav-text">{{favoriteText}}</span>
				</div> -->
			</div>
		</div>
	</div>	
</template>

<script>
	import betterScroll from 'better-scroll';
	import star from '../star/star.vue';
	import split from '../split/split.vue';

	export default {
		props: {
			sellers: {
				type: Object
			}
		},
		components: {
			'star': star,
			'split': split,
		},
		methods: {
			Bscroll () {
				if (!this.scroll) {
					this.scroll = new betterScroll(this.$refs.sellers, {
						//滚动,当页面内容超过页面高度
						click: true,
					});
				}	else	{
					this.scroll.refresh();
				}						
			}			
		},
		watch: {
			'sellers' () {
				this.Bscroll();
			}			
		},
		mounted: function () {
 			this.$nextTick(function () {
				this.Bscroll();
				// console.log(this.sellers.infos);
  			});
		}
	}
</script>

<style type="text/css">
	.sellers {
		position: absolute;
		top: 174px;
		left: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}
	.overview {
		padding: 18px;
	}
	.overview li {
		list-style: none;
	}
	.overview-title {
		padding-top: 12px;
		padding-left: 12px;
		line-height: 14px;
		font-size: 10px;
	}
	.overview-desc {
		line-height: 18px;
		font-size: 12px;
		border: 1px solid rgba(7, 17, 27, 0.1);
	} 
	.desc-star{
		display: inline-block;
		padding-left: 12px;
		font-size: 30px;
	}
	.desc-text {
		margin-right: 4px;
	}
	.overview-remark {
		display: flex;
		list-style: none;
		font-size: 12px;
		margin-top: 24px;
		margin-bottom: 24px;
	} 
	.remark-block {
		flex: 1;
		text-align: center;
	}
	.overview-remark li ~ li {
		border-left: 2px solid rgba(240, 20, 20, 0.6)
	}
	.overview-remark h2 {
		font-size: 14px;
		color: rgb(147, 153, 159);
		line-height: 20px;
		padding-top: 24px;
		padding-bottom: 8px;
	}
	.remark-content {
		line-height: 24px;
		font-size: 24px;
		color: rgb(7, 17, 27);
	}
	.stress {
		font-size: 10px;
	}
	.annouce {
		margin-bottom: 36px;
	}
	.annouce-title {
		font-size: 24px;
		padding: 12px 0 0 12px;
		font-family: 'Zurich Bold', sans-serif;
	}
	.annouce-content {
		display: block;
		font-size: 12px;
		color: #ff2b2b;
		padding-left: 24px;
		padding-top: 8px;
	}
	.detail-supports {
		margin-top: 12px;
		margin-bottom: 12px;
		width: 100%;
	}
	.detail-supports li {
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		bottom: 4px;
	}
	.pics-wrapper {
		margin-top: 12px;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}
	.pic-item {
		display: inline-block;
		margin-right: 6px;
		width: 120px;
		height: 90px;
	}
	.sellers-info  {
		font-size: 16px;
		/* margin-left: px; */
		margin-top: 9px;
		padding-bottom: 12px;
	}
	.info-items {
		margin-left: 12px;
		margin-top: 8px;
		font-size: 16px;
		color: rgba(7, 17, 27, 0.5);
	}
	/* .favorite {
		position: fixed;
		margin-top: 12px; 
	} */
</style>