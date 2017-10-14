<template>
  <div id="app">
    <h1>Online Translate</h1>
    <h5>简单 / 易用 / 便捷</h5>
    <TranslateForm v-on:formSubmit="TranslateText"></TranslateForm>
    <TranslateOutPut v-text="TranslatedText" class="TextArea"></TranslateOutPut>
  </div>
</template>

<script>

import TranslateForm from './components/translatForm'
import TranslateOutPut from './components/translateOutPut'

export default {
  name: 'app',
  data:function(){
  	return{
  		TranslatedText:""
  	}
  },
  components:{
    TranslateForm,
    TranslateOutPut
  },
  methods:{
  	TranslateText:function (text,Language) {
  		// alert(text);
  		this.$http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20171014T050948Z.ac12059e75e63456.843a5f29d14870bda2fc702f05409093567259a3&lang='+Language + '&text=' + text).then(response=>{
  			this.TranslatedText = response.body.text[0];
  		})
  	}
  }
}
</script>

<style>
	h1,h5 {
		text-align: center;
	}
  .TextArea {
    margin-top: 20px;
    color: #F01D1D;
    font-size: 20px;
  }
</style>
