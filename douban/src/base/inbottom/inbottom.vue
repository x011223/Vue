<template>
    <div id="inBottom">
        <div class="instersts">
            <span class="instersts-title" v-html="title"></span>
            <div class="instersts-btn">
                <a v-for="(item, index) in ListI">
                    <span v-html="ListI[index]"></span>
                </a>
            </div>
        </div>
        <div class="browsing">
            <p class="browsing-title">分类浏览</p>
            <div class="browsing-btn">
                <div class="btn-left">             
                    <a href="" v-for="(item, index) in ListL">
                        <span v-html="ListL[index]"></span>
                        <span>&gt;</span>
                    </a>    
                </div>
                <div class="btn-right">
                    <a href="" v-for="(item, index) in ListR">
                        <span v-html="ListR[index]"></span>
                        <span>&gt;</span>
                    </a>    
                </div>                 
            </div>
        </div>
        <div class="in-bottom">
            <div class="above">
                <img src="" alt="" class="above-img">
                <span class="above-title">豆瓣</span>
                <span class="above-desc">我们的精神角落</span>
            </div>         
            <span class="down">去APP&nbsp;&nbsp;Store免费下载iOS客户端</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            ListL: {
                type: Array,
                default: []
            },
            ListR: {
                type: Array,
                default: []
            },
            ListI: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ''
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    @import '../../assets/sass/mixins';
    #inBottom {
        .instersts {
            margin-left: 1rem;
            overflow: hidden;
            height: 100%;
            .instersts-title {
                display: block;
                height: 1.33rem;
                margin-bottom: 1rem;
            }
            .instersts-btn {
                width: 200%;
                height: 300%;                
                a {
                    border-radius: 7px;
                    margin: 0 0.673rem 0; 
                }
                @include MovA;
            }
        }
        .browsing {
            @include Browsing;
        }
        .in-bottom {
            text-align: center;
            margin-top: 3rem;
            .above {
                margin-bottom: 1.53rem;
                .top-img {
                    width: 2.33rem;
                    height: 2.33rem;
                    background-color: red;
                }
                span {
                    display: block;
                }
                .above-title {
                    margin-left: -3.77rem;
                    font: {
                        size: $font-size-X;
                        weight: $font-weight-s;
                    }
                }
                .above-desc {
                    font: {
                        size: $font-size-f;
                        weight: $font-weight-m;
                    }
                }
            }
            .down {
                display: block;
                margin-bottom: 2.33rem;
                color: $color-theme;
                font: {
                    size: $font-size-f;
                    weight: $font-weight-s;
                }
            }  
        }
    }
</style>

