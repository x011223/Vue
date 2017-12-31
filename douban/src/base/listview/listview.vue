<template>
    <div id="listView">
        <ul :class="this.isMore ? 'listItemMore' : 'listItemLess'">
            <li v-for="(listItem, index ) in List">
                <a :href="listItem.alt" class="listItem-img">
                    <img v-lazy="isMovie ? listItem.images.small : listItem.cover.url" :alt="listItem.alt">
                </a>
                <span class="listItem-name" v-html="listItem.original_title"></span>
                <span class="listItem-score" v-html="listItem.rating.average > 0 ? listItem.rating.average : '暂无评分'"></span>
            </li>
        </ul>
    </div>
</template>

<script> 
    export default {
        props: {
            List: {
                type: Array,
                default: []
            },
            isMovie: {
                type: Boolean,
                default: ''
            },
            isMore: {
                type: Boolean,
                default: false
            }
        }, 
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/_mixins.scss';
    $height-img: 145px;
    $width-img: 100px;
    #listView {
        // display: flex;
        margin-top: 1rem;
        margin-left: 1rem;
        .listItemLess {
            flex: 1;
            overflow: hidden;
            display: flex;           
            li {
                list-style: none;
                padding: 0 .53rem;
                text-align: center;
                .listItem-img {
                    img {
                        width: $width-img;
                        height: $height-img;
                    }
                }
                .listItem-name {
                    display: block;
                    @include TextFlow;
                    max-width: $width-img;
                }
                .listItem-score {
                    text-align: center;
                    @include TextFlow;
                    max-width: $width-img;
                }
            }
        }
        .listItemMore {
            li {
                display: inline-block;
                text-align: center;
                padding: 0 .37rem;
                list-style: none;
                margin-bottom: 1rem;
                .listItem-img {
                    display: flex;
                    img {
                        width: $width-img;
                        height: $height-img;
                    }
                }
                .listItem-name {
                    @include TextFlow;
                    text-align: center;
                    max-width: $width-img;
                    display: block;
                }
                .listItem-score {
                    @include TextFlow;
                    text-align: center;
                    max-width: $width-img;
                }
            }
        }
    }
</style>
