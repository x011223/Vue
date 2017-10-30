<template>
	<div class="goods">
		<div class="menus-wrapper" ref="menuswrapper">
			<ul>
				<li v-for="(good,index) in goods" class="menus-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
					<span class="good-text">
						<span class="good-icon" v-show="good.type>0" :class="classMap[good.type]"></span>
						{{good.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="goods-wrapper" ref="goodswrapper">
			<ul>
				<li class="food-list food-list-hook" v-for="foodItem in goods">
					<h1 class="food-title">{{foodItem.name}}</h1>
					<ul>
						<li class="food-item" v-for="food in foodItem.foods" @click="selectFood(food,$event)">
							<div class="food-icon">
								<img :src="food.icon">
							</div>
							<div class="food-content">
								<h2 class="food-name">{{food.name}}</h2>
								<p class="food-description">{{food.description}}</p>
								<div class="food-extra">
									<span class="food-count">月售{{food.sellCount}}份</span>
									<span>好评率:{{food.rating}}%</span>
								</div>
								<div class="food-price">
									<span class="now-price">¥{{food.price}}</span>
									<span  class="old-price" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartControl :food="food"></cartControl>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopCart  :selectFoods="selectFoods" :delivery-price="sellers.deliveryPrice" :min-price="sellers.minPrice"></shopCart>
		<food :selectedFood="selectedFood" ref="food"></food>		
	</div>		
</template>

<script>
	import BetterScroll from 'better-scroll';
	import shopCart from '../shopcart/shopcart.vue';
	import cartControl from '../cartcontrol/cartcontrol.vue';
	import food from '../food/food.vue'

	const err_ok = 0;
	export default { 
		components: {
			'shopCart': shopCart,
			'cartControl': cartControl,
			'food': food
		},
		data () {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood: {}
			}
		},
		props: {
			sellers: {
				type: Object
			}
		},
		created () {
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
			this.$http.get('/api/goods').then((response) => {
				response = response.body;
				if (response.errno === err_ok) {
					this.goods = response.data;
					this.$nextTick( () => {
						this.initScroll();
						this.calHeight()
					})			
				}
			})
		},
		computed: {
			currentIndex () {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if (!height2 || (this.scrollY > height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0; 
			},			
			selectFoods () {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							foods.push(food);			
						}			
					});
				});				
				return foods;				
			}				
		},
		methods: {
			initScroll () {
				this.menusScroll = new BetterScroll(this.$refs.menuswrapper,{
					click: true
				});
				this.goodsScroll = new BetterScroll(this.$refs.goodswrapper,{
					click: true,
					probeType: 3
				});
				this.goodsScroll.on('scroll',(pos) => {
					// console.log(this.scrollY)
					this.scrollY = Math.abs(Math.round(pos.y));
				})
				
			},
			calHeight () {
				let foodList = this.$refs.goodswrapper.getElementsByClassName('food-list-hook');
				let Lheight = 0;
				this.listHeight.push(Lheight);
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					Lheight += item.clientHeight;
					this.listHeight.push(Lheight);					
				}
			},
			selectMenu (index,event) {
				// if (!event._constructed) {
				// 	return;
				// }
				let foodList = this.$refs.goodswrapper.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.goodsScroll.scrollToElement(el, 300)
			},
			selectFood (food,event) {
				this.selectedFood = food;
				this.$refs.food.show();
			},
		},
		events: {
			'cart.add' (target) {
				this.drops(target);
			}
		}
	};
</script>

<style type="text/css" scoped>
	li {
		list-style: none;
	}
	.goods {
		display: flex;
		position: absolute;
		top: 178px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
		font-size: 12px;
	}
	.menus-wrapper {
		width: 80px;
		flex: 0 0 80px;
		background: #f3f5f7;
	}
	.menus-item {
		display: table;
		height: 56px;
		width: 54px;
		line-height: 14px;
		padding: 0 12px;
	}
	.menus-wrapper .current {
		background-color: #40b882;
		position: relative;
		z-index: 10;
		margin-top: -1px;
		font-size: 700; 
	}
	.good-text {
		display: table-cell;
		width: 56px;
		vertical-align: middle;
		font-size: 12px;
		border: 1px rgb(7, 17, 27, 0.1)
	}
	.good-icon {
		display: inline-block;
		width: 12px;
		height: 12px;
		margin-right: 2px;
		vertical-align: top;
		background-size: 12px 12px;
		background-repeat: no-repeat;
	}
	.good-text>.decrease {
		background-image: url('decrease_3@2x.png');
	}
	.good-text>.discount {
		background-image: url('discount_3@2x.png');
	}
	.good-text>.invoice {
		background-image: url('invoice_3@2x.png');
	}
	.good-text>.special {
		background-image: url('special_3@2x.png');
	}
	.good-text>.guarantee {
		background-image: url('guarantee_3@2x.png');
	}
	.goods-wrapper {
		flex: 1;
		/* z-index: 10; */
	}
	.food-title {
		padding-left: 14px;
		height: 26px;
		line-height: 26px;
		border-left: 2px solid #d9dde1;
		font-size: 12px;
		color: rgb(147, 153, 149);
		background: #f3f5f7;
	}
	.food-item {
		display: flex;
		margin: 18px;
		/* padding-bottom: 18px; */
		border: 1px rgba(7, 17n, 28, 0.1)
	}
	.food-item::after{
		display: block;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 1px solid rgba(7, 17n, 28, 0.1);
		content: '';
	}
	.food-item:last-child {
		display: none;
	}
	.food-name {
		font-size: 14px;
		margin: 2px 0 8px 0;
		height: 14px;
		line-height: 14px;
		color: rgb(7, 17, 27);
	}
	.food-icon {
		flex: 0 0 57px;
		margin-right: 10px;
	}
	.food-icon>img {
		width: 64px;
		height: 64px;
	}
	.food-content {
		flex: 1;
	}
	.food-description, .food-extra {	
		height: 10px;	
		line-height: 10px;
		font-size: 2px;
		color: rgb(147, 153, 159);
	}
	.food-description {
		margin-bottom: 8px;		
	}
	.food-price {
		font-weight: 700;
		line-height: 24px;
	}
	.now-price {
		margin-right: 8px;
		font-size: 14px;
		color: rgb(240, 20, 20);
	}
	.old-price {
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.cartcontrol-wrapper {
		position: relative;
		right: 12px;
		margin-top: -32px;
	} 
</style>