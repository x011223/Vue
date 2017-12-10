<template>
    <div id="miste">
        <div class="header-wrapper">
            <div class="header-address iconfont">
                <i class="icon-address"></i>
                <div class="header-address-tianqi"></div>
            </div>
            <div class="header-search">
                <router-link to="search">
                    <search-box ref="searchBox"></search-box>
                </router-link>
            </div>
            <div class="header-list"></div>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import SearchBox from '../../base/searchbox/searchbox'
    export default {
        components: {
            SearchBox,
        },
        methods: {
            // searchShow () {
            //     this.$router.push('search')
            // }
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
        .header-wrapper {
            width: 100%;
            height: 5rem;
            .header-address {
                height: 50px;
                background: $background-color-theme;
                @include I;
                .icon-address {
                    color: $color-text-title;
                    background: $background-color-theme;
                }
            }
            .header-list {
                height: 3rem;
                background: $background-color-theme;
            }
        }

    }
</style>
