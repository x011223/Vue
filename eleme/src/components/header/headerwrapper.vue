<template>
    <div id="headerwrapper">
        <div class="header-address">
            <div class="header-address-dizhi"></div>
            <div class="header-address-tianqi"></div>
        </div>
        <div class="header-search">
            <input class="header-search-sousuo" type="search" placeholder="搜索">
        </div>
        <div class="header-list"></div>
    </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
    @import './../../assets/scss/color';
    #headerwrapper {
        width: 100%;
        background: $background-color-theme;
        .header-address {
            height: 30px;
            .header-address-dizhi {
                
            }
        }
        .header-search {
            height: 30px;
            .header-search-sousuo {
                width: 100%;
                height: 26px;
                text-indent: 30%;
            }
        }
        .header-list {
            height: 20px;
        }
    }
</style>
