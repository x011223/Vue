<template>
    <div id="listView">
        <ul class="listItem">
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/_mixins.scss';
    $height-img: 145px;
    $width-img: 100px;
    #listView {
        // position: absolute;
        display: flex;
        margin-top: 1rem;
        .listItem {
            flex-direction: columns;
            overflow: hidden;
            display: flex;
            li {
                list-style: none;
                flex-direction: columns;
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
    }
</style>
