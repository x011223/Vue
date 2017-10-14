<template>
	<div id="translateOutPut">
		<h2>{{translatedText}}</h2>
	</div>
</template>

<script>
	export default {
		name:'translateOutPut',
		props:[
			"translatedText"
		]
	}
</script>

<style>
	#translateOutPut {
		text-align: center;
	}
</style>