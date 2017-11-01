<template>
    <div class="rating">
        <h1 class="rating-title">商品评价</h1>
        <div class="ratingselect">
            <div class="ratings-type">
                <!-- <span>{{desc.all}}}</span>
                <span>{{desc.positive}}}</span>
                <span>{{desc.negative}}</span> -->
            </div>
            <div class="switch">
                <!-- <img src=""> -->
                <span class="switch-text">只看有内容的评价</span>
            </div>
        </div>
    </div>                
</template>

<script>
    export default {
        props: {
            desc: Array
        },
        computed: {
            deacr: function () {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                }
            }
        }
    }
</script>

<style scoped>

</style>


