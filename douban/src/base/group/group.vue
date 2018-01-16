<template>
    <div id="group">
        <div class="group-content" :style="{ background: this.backGroundColor }">
            <div class="content-top">
                <img :src="this.GroupItem.avatar" alt="" width="32" height="32" class="top-img">
                <span v-html="this.GroupItem.name" class="top-name"></span>
            </div>
            <span v-html="this.GroupItem.member_count + '个' + this.GroupItem.member_name" class="content-middle"></span>
            <div class="content-bottom">
                <span class="bottom-add">申请加入这个小组</span>
                <span class="bottom-operator" @click.stop="showOperator"><span>...</span></span>
                <div class="operator-left" v-show="operatorFlag">
                    <div class="desc" @click.stop="showDescCart">小组介绍</div>
                    <div class="share" @click.stop="showShareCart">分享这个小组</div>
                </div>
                <div class="operator-right" @click.stop="hideShareCart" v-show="shareCartFlag">
                    <div>分享到QQ</div>
                    <div>分享到微信</div>
                    <div>分享到微博</div>
                    <div>推荐到豆瓣</div>
                    <div>分享到朋友圈</div>
                    <div>分享到Qzone</div>
                    <div>复制链接</div>
                </div>
            </div>
        </div>  
        <div class="group-desc" v-show="descCartFlag">
            {{this.GroupItem.desc}}
        </div>
    </div>
</template>

<script>
    import { GroupMixin } from '../../assets/js/mixins'

    export default {
        mixins: [ GroupMixin ],
        data () {
            return {
                operatorFlag: false,
                shareCartFlag: false,
                descCartFlag: false,
            }
        },
        methods: {
            showOperator () {
                this.operatorFlag = !this.operatorFlag
                // return !this.operatorFlag
            },
            showShareCart () {
                this.shareCartFlag = true
                this.operatorFlag = false
            },
            hideShareCart () {
                this.shareCartFlag = false
            },
            showDescCart () {
                this.descCartFlag = true
                this.operatorFlag = false
            } 
        },
        computed: {
            backGroundColor () {
                return this.GroupItem.background_mask_color
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    @import '../../assets/sass/mixins';
    #group  {
        @include MovieAndBookItemPosition;
        $color-content-text: #fafafa;
        .group-content {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            height: 12rem;
            color: $color-content-text;
            .content-top {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: -1rem 0 1rem;
                .top-img {

                }
                .top-name {
                    font: {
                        size: $font-size-X;
                        weight: $font-weight-s;
                    }
                    margin-left: 1rem;                
                }
            }
            .content-middle {
                display: block;
                font: {
                    size: $font-size-f;
                    weight: $font-weight-m;
                }
                margin-bottom: 1rem;
            }
            .content-bottom {
                .bottom-add {
                    display: inline-block;
                    padding: .5rem 1rem;
                    border: 1px solid $color-content-text;
                    border-radius: 2px;
                }
                .bottom-operator {
                    display: inline-block;
                    margin-top: -.5rem;
                    padding: .5rem 1rem;
                    border: 1px solid $color-content-text;
                    border-radius: 2px;
                    span {
                        margin-top: -1rem;
                    }
                }
                .operator-left {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    left: 2rem;
                    right: 2rem;
                    height: 7rem;
                    margin-top: .5rem;
                    text-align: center;
                    color: $color-theme;
                    background-color: #fafafa;
                    border: 1px solid $color-content-text;
                    border-radius: 9px;
                    z-index: 20;
                    .desc {
                        height: 3.5rem;
                        line-height: 3.5rem;
                        border-bottom: 1px solid #e5e5e5;
                    }
                    .share {
                        line-height: 3.5rem;
                    }
                }
                .operator-right {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    left: 7rem;
                    right: 7rem;
                    height: 21rem;
                    margin-top: .5rem;
                    text-align: center;
                    color: $color-theme;
                    background-color: #fafafa;
                    border: 1px solid $color-content-text;
                    border-radius: 9px;
                    z-index: 20;
                    div {
                        height: 3rem;
                        line-height: 3rem;
                        color: #686868;
                    }
                }
            }
        }
        .group-desc {
            font: {
                size: $font-size-b;
                weight: $font-weight-s;
            }
            color: #aaa;
            background-color: #f0f0f0;
        }
    }
</style>
