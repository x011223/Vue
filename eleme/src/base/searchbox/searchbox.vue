<template>
    <div id="searchbox">
        <span class="search-icon"></span>
        <input class="search-box" v-model="searchText" :placeholder="placeholder" @click="showSearch">
    </div>
</template>

<script>
    export default {
        data () {
            return {
                searchText: '',
            }
        },
        props: {
            placeholder: {
                type: String,
                default: "搜索商家、商品"
            }
        },
        methods: {
            showSearch () {
                this.$emit('showSearch')
            }
        },
        created () {
            this.$watch('searchText', () => {
                this.$enit('Search', searchText)
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/color';
    @import '../../assets/scss/style';
    @import '../../assets/scss/font';
    #searchbox {
        height: 36px;
        position: relative;
        background: $background-color-theme;
        .search-icon {
            display: inline-block;
            width: 8px;
            height: 8px;
            position: absolute;
            top: 25%;
            left: 6rem;
            border: 1px solid $color-text-theme;
            border-radius: 50%;
        }
        .search-box {
            width: 92%;
            height: 100%;
            margin-left: 4%;
            text-indent: 30%;
            border: none;
            font: {
                family: simsun;
                weight: $font-weight-b;
            }
        }
    }
</style>
