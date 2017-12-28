<template>
    <div id="listView">
        <ul class="listItem">
            <li v-for="(listItem, index ) in List">
                <a :href="listItem.alt" class="listItem-img">
                    <img :src="listItem.images.small" :alt="listItem.alt">
                </a>
                <span class="listItem-name" v-html="listItem.original_title"></span>
                <span class="listItem-score" v-html="listItem.rating.average"></span>
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
            }
        },
        data () {
            return {
                List: [],
            }
            
        },
    }
</script>

<style lang="scss" scoped>
    $height-img: 145px;
    $width-img: 100px;
    #listView {
        position: absolute;
        display: flex;
        top: 2rem;
        left: 0;
        right: 0;
        .listItem {
            flex-direction: columns;
            overflow: hidden;
            display: flex;
            li {
                list-style: none;
                flex-direction: columns;
                padding: 0 .75rem;
                .listItem-img {
                    img {
                        width: $width-img;
                        height: $height-img;
                    }
                }
                .listItem-name {
                    display: block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow:ellipsis; 
                    width: $width-img;
                }
                .listItem-score {
                    text-align: center;
                    width: $width-img;
                    margin: 0 auto;
                }
            }
        }
    }
</style>
