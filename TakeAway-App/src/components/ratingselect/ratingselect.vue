<template>
    <div class="ratingselect">
        <div class="ratings-type">
            <span class="block positive" :class="{'blo-active pos-active':selectType===0}" @click="select(0, $event)">{{desc.all}}
                <span>{{ratings.length}}</span>
            </span>
            <span class="block positive" :class="{'blo-active pos-active':selectType===1}" @click="select(1, $event)">{{desc.positive}}</span>
            <span class="block negative" :class="{'blo-active neg-active':selectType===2}" @click="select(2, $event)">{{desc.negative}}</span>
        </div>
        <div @click="toggleContent" class="switch">
            <img v-show="onlyContent" class="switch-img" src="./switch_img_off.png">
            <img v-show="!onlyContent" class="switch-img" src="./switch_img_on.png">
            <span class="switch-text">只看有内容的评价</span>
        </div>
    </div>                
</template>

<script>
    const All = 0;
    const Positive = 1;
    const Negative = 2; 
    export default {
        props: {
            desc: Object,
            ratings: {
                type: Array,
                default () {
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: All
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
        },
        // data () {
        //     return {
        //         selectType: {
        //             type: String,
        //             default: All
        //         },
        //         onlyContent: {
        //             type: Boolean,
        //             default: false
        //         },
        //     }
        // },
        computed: {
            descr: function () {
                return {
                    all: '全部',
                    positive: '推荐',
                    negative: '失望'
                };
            },
        },
        methods: {
            select (type, event) {
                this.selectType = type; 
                this.$emit('ratingType.select', type);
            },
            toggleContent (event) {
                this.onlyContent = !this.onlyContent;
                this.$emit('content.toggle', this.onlyContent);
            }
        }
    }
</script>

<style scoped>
    .ratings-type {
        padding: 18px 0;
        margin: 0 6px;
        font-size: 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    }
    .block {
        display: inline-block;
        padding: 8px 12px;
        line-height: 16px;
        margin-right: 8px;
        border-radius: 10px;
        font-size: 12px;
        color: rgb(77, 85, 93);
    }
    .blo-active {
        color: #fff;
    }
    .positive {
        background: rgba(0, 160, 220, 0.2);
    }
    .pos-active {
        background: rgb(0, 160, 220);
    }
    .negative {
        background: rgba(77, 85, 93, 0.2);
    }
    .neg-active {
        background: rgb(77, 85, 93);
    }
    .switch {
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        color: rgb(147, 153, 159);
    }
    .switch-img {
        /* 图片文字水平对齐显示 */
        vertical-align: middle;
        /* display: inline-block;
          图片文字水平对齐显示
        vertical-align: top; */
    }
    /* .switch-img-on {
        background-image: url('./switch_img_off.png') no-repeat;
    } */
    .switch-text {
        font-size: 16px;
        height: 24px;
        line-height: 24px;
        /* display: inline-block;
        vertical-align: top; */
    }
</style>


