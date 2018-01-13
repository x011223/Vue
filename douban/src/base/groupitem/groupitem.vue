<template>
    <div id="groups">
        <span class="group-name" v-html="Groups.name"></span>
        <ul class="group-groupItem">
            <li class="item" v-for="item in Groups.groups">
                <div class="item-top">
                    <!-- <div class="flex-left"> -->
                        <img :src="item.avatar" alt="" class="item-img">
                        <span v-html="item.name" class="item-name"></span>
                    <!-- </div> -->
                    <!-- <div class="flex-right"> -->
                        <span v-html="item.member_count + '人'" class="item-members"></span>
                    <!-- </div> -->
                </div>
                <div class="item-down">
                    <span v-html="item.desc_abstract" class="down-desc"></span>
                </div>
            </li>
            <span v-html="'更多相关小组'" class="group-more"></span>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            Groups: {
                type: Object,
                default: ''
            },
            ItemMore: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/style';
    @import '../../assets/sass/mixins';
    #groups {
        position: relative;
        .group-name {
            margin-left: 1rem;
            font: {
                size: $font-size-b;
                weight: $font-weight-s;
            }
        }
        .group-groupItem {
            margin: 1rem;
            .item {
                list-style: none;
                margin-bottom: 1rem;
                padding-bottom: 1rem;
                border-bottom: $border-browsing;
                @include FontStore;
                .item-top {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1rem;
                    .item-img {
                        
                    }
                    .item-name {
                        width: 60%;
                        margin-left: 1rem;
                        @include TextFlow;
                        font: {
                            size: $font-size-b;
                            weight: $font-weight-s;
                        }
                        color: #111;
                    }
                    .item-members {
                        display: block;
                        position: absolute;
                        left: 18.67rem;
                    }
                }
                .item-down {
                    @include TextFlow;
                }
            }
            .group-more {
                display: block;
                text-align: center;
                font: {
                    size: $font-size-b;
                    weight: $font-weight-b;
                }
                color: $color-theme;
                padding-bottom: 1rem;
                border-bottom: $border-browsing;
            }
        }
    }
</style>
