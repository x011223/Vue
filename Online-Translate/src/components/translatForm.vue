<template>
	<div class="body" v-on:submit="forSubmit">
		<form v-on:submit="forSubmit" role="role">
			<input type="text" placeholder="输入需要翻译的内容" v-model="textToTranslate" class="form-control inp1">		
			<select v-model="Language" class="form-control">
				<option value="">---请选择---</option>
				<option value="en">English</option>
				<option value="ru">Russian</option>
				<option value="de">German</option>
			</select>
			<button type="submit" value="翻译" class="btn btn-info form-control btn1">翻译</button>
		</form>
	</div>
</template>

<script>
	export default {
		name:'translateForm',
		data() {
			return {
				textToTranslate:'',
				Language:''
			}
		},
		methods:{
			forSubmit:function(e){
				this.$emit("formSubmit",this.textToTranslate,this.Language);
				e.preventDefault();
			}
		}
	}
</script>

<style>
	.body {
		text-align: center;
	}
	.inp1 {
		margin-bottom: 10px;
	}
	.btn1 {
		margin-top: 10px;
	}
</style>