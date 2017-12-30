<template>
    <div id="listmore">
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

</style>
