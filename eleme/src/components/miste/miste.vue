<template>
    <div id="miste">
        <div class="header-wrapper">
            <div class="header-address iconfont">
                <i class="icon-address"></i>
                <span class="header-address-dizhi" ref="dizhi"></span>
                <span class="header-address-tianqi" ref="tianqi"></span>
            </div>
            <div class="header-search">
                <router-link to="search" class="search-a">
                    <search-box class="search-box"></search-box>
                </router-link>
            </div>
            <div class="header-list">
                <div class="lists">
                    <span v-for="(item, index) in headerList" class="listItem">{{headerList[index]}}</span>
                </div>   
            </div>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import SearchBox from '../../base/searchbox/searchbox'
    export default {
        data () {
            return {
                headerList: ['肯德基','奶茶','烧烤','麦当劳','炸鸡','蛋糕','一点点','粥','火锅','麻辣烫'],
            }
        },
        components: {
            SearchBox,
        },
        methods: {
            // searchShow () {
            //     this.$router.push('search')
            // }
            getAddress () {
                let addel = this.$refs.dizhi
                navigator.geolocation.getCurrentPosition((pos) => {
                    let pro = ['longitude','latitude']
                    let long = pos.coords[pro[0]]
                    let la = pos.coords[pro[1]]
                    addel.innerHtml = '经度' + long + '维度:' + la
                    console.log('经度' + long + '维度:' + la)
                })
            },
        },
        created () {
            this.getAddress()
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/color';
    @import '../../assets/scss/style';
    @import '../../assets/scss/font';
    @import '../../assets/scss/_mixin.scss';
    #miste {
        width: 100%;
        background: $background-color-theme;
        .header-wrapper {
            width: 100%;
            height: 5rem;            
            .header-address {
                height: 3rem;
                line-height: 3rem;
                background: $background-color-theme;
                @include I;
                .icon-address {
                    margin-left: 1rem;
                    color: $color-text-title;
                    background: $background-color-theme;
                }
                .header-address-dizhi {

                }
                .header-address-tianqi {

                }
            }
            .header-search {
                background: $background-color-theme;
                .search-a {
                    .search-box {
                        margin: 0 auto;
                        width: 92%;
                    }
                }
            }
            .header-list {
                height: 3rem;
                line-height: 3rem;
                width: 100%;
                color: #fff;
                background: $background-color-theme;
                .lists {
                    white-space: nowrap;
                    overflow-x: auto;
                    background: $background-color-theme;
                    &::-webkit-scrollbar {display:none}
                    .listItem {
                        margin: 0 auto;
                        font: {
                            size: .75rem;
                            weight: $font-weight-s;
                        }  
                        padding: 0 0.7rem;
                        background: $background-color-theme;
                    }
                }             
            }
        }
    }
</style>
