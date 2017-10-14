<template>
	<div class="music">
		<!-- <router-view></router-view> -->
		这是一个路由(vue-router)----Music
		<!-- <router-view></router-view> -->
		<router-link :to="{name:'music_oumei'}">欧美音乐</router-link>
		<router-link :to="{name:'music_huayu'}">华语音乐</router-link>
		<!-- 留坑，非常重要。。。。。 -->
		<router-view></router-view>

	</div>
</template>

<style>
	.music {
		background-color: #18E218;
	}
</style>

<script>
// 	export default {

// }
</script>