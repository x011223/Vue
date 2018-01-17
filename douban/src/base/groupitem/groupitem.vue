<template>
    <div id="groups">
        <span class="group-name" v-html="Groups.name"></span>
        <ul class="group-groupItem">
            <li class="item" v-for="item in Groups.groups" @click.stop="_toGroup(item.id)">
                <div class="item-top">
                    <img :src="item.avatar" alt="" width="32" height="32" class="item-img">
                    <span v-html="item.name" class="item-name"></span>
                    <span v-html="item.member_count + '人'" class="item-members"></span>
                </div>
                <div class="item-down">
                    <span v-html="item.desc_abstract" class="down-desc"></span>
                </div>     
            </li>
            <span v-html="'更多相关小组'" class="group-more" @click.stop="_getMore(Groups.name)"></span>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    import { getGroups, getTagGroups, getGroupItem } from '../../api/group'
    import { GroupMixin } from '../../assets/js/mixins'
    import { mapMutations, mapGetters } from 'vuex'

    export default {
        mixins: [ GroupMixin ],
        props: {
            Groups: {
                type: Object,
                default: ''
            },
            ItemMore: {
                type: Boolean,
                default: false
            }
        },
        methods:{
            _toGroup (id) {
                getGroupItem(id).then((res) => {
                    this.groupItem = res
                    this.setGroupItem(this.groupItem)
                    this.$router.push(
                        { path: `/groups/${this.GroupItem.id}` }
                    )   
                })             
            },
            _getMore (tag) {
                getTagGroups(tag, 25).then((res) => {
                    console.log(tag)
                    this.listGroupMore = res
                    this.setGroupMore(this.listGroupMore)
                    this.$router.push(
                        { path:  '/moreGroup' }
                    )
                })
            },
        },
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
                @include FontStore;
                .item-top {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1rem;
                    // .item-img {
                        
                    // }
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
                    margin-bottom: .5rem;
                    border-bottom: $border-browsing;
                    @include TextFlow;
                    .down-desc {
                        display: block;
                        margin-bottom: .5rem;
                    }
                }
            }
            .group-more {
                display: block;
                text-align: center;
                font: {
                    size: $font-size-f;
                    weight: $font-weight-b;
                }
                color: $color-theme;
                padding-bottom: .5rem;
                border-bottom: $border-browsing;
            }
        }
    }
</style>
