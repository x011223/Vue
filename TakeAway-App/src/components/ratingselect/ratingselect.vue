<template>
    <div class="ratingselect">
        <div class="ratings-type">
            <span>{{desc.all}}</span>
            <span>{{desc.positive}}</span>
            <span>{{desc.negative}}</span>
        </div>
        <div class="switch">
            <!-- <img src=""> -->
            <span class="switch-text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
    const positive = 0;
    const negative = 1;
    const all = 2;
    export default {
        porps: {
            ratings: {
                type: Array,
                default () {
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: all,
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default () {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    }
                }
            }
        },

    }
</script>

<style scoped>

</style>


