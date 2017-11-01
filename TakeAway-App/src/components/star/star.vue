<template>
	<div class="star" :class="starType">
		<span v-for="starItem in starItems" :class="starItem" class="star-item"></span>
	</div>
</template>

<style type="text/css">
	.star {
		font-size: 0;
		margin-top: 12px;
		text-align: center;
	}
	.star-item {
		display: inline-block;
		background-repeat: no-repeat;
	}
	.star-48>.star-item{
		width: 20px;
		height: 20px;
		margin-right: 22px;
		background-size: 20px 20px;
	}
	.star-48>.on {
		background-image: url(star48_on@2x.png);
	}
	.star-48>.off {
		background-image: url(star48_off@2x.png);
	}
	.star-48>.half {
		background-image: url(star48_half@2x.png);
	}
	.star-36>.star-item{
		width: 16px;
		height: 16px;
		margin-right: 4px;
		background-size: 16px 16px;
	}
	.star-36>.on {
		background-image: url(star36_on@2x.png);
	}
	.star-36>.off {
		background-image: url(star36_off@2x.png);
	}
	.star-36>.half {
		background-image: url(star36_half@2x.png);
	}
	.star-24>.star-item{
		width: 20px;
		height: 20px;
		margin-right: 22px;
		background-size: 20px 20px;
	}
	.star-24>.on {
		background-image: url(star24_on@2x.png);
	}
	.star-24>.off {
		background-image: url(star24_off@2x.png);
	}
	.star-24>.half {
		background-image: url(star24_half@2x.png);
	}
</style>

<script type="text/javascript">
	const Length = 5;
	const star_on = 'on';
	const star_half = 'half';
	const star_off = 'off';
	export default {
		// data () {
		// 	starItem: false;
		// },
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			starType () {
				return "star-"+this.size;
			},
			starItems () {
				const starResult = [];
				const score = Math.floor(this.score*2)/2;
				const hasDecimal = score%1!== 0;
				const intScore = Math.floor(score);
				for (var i=0;i<intScore;i++)
				{
					starResult.push(star_on)
				}
				if (hasDecimal)
				{
					starResult.push(star_half)
				}
				while (starResult.length<Length)
				{
					starResult.push(star_off)
				}
				return starResult;
			}
		}
	}
</script>