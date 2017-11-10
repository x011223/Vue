<template>
    <div class="music-list">
        <div class="back">
            <img class="icon-back" src="./back.svg">
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle">
            <div class="filter">

            </div>
        </div>
        <scroll class="songs" :data="songs" ref="songList">
            <div class="songList-wrapper">
                <song-list :songs="songs"></song-list>
            </div>
        </scroll>
    </div>
</template>

<script>
    import Scroll from '../../base/scroll/scroll.vue'
    import SongList from '../../base/song-list/song-list.vue'

    export default {
        components: {
            Scroll,
            SongList,
        },
        props: {
            bgImage: {
                type: String,
                default: ''
            },
            songs: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ''
            }
        },
        computed: {
            bgStyle () {
                // console.log(this.bgImage)
                return `background-image: url(${this.bgImage})`
            }
        },
    }
</script>

<style scoped>
    .music-list {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgb(65, 65, 65);
    }
    .back {
        position: absolute;
        top: 0;
        left: 3px;
        z-index: 50;
    }
    .icon-back {
        display: block;
        padding: 10px;
        font-size: 16px;
        color: red;
    }
    .title {
        position: absolute;
        top: 0;
        left: 10%;
        z-index: 40;
        width: 80%;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }
    .bg-image {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        transform-origin: top;
        background-size: cover;
        background-image: no-repeat;
    }
    .songs {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: rgba(7, 17, 27, 0.1);
    }
    .songList-wrapper {
        padding: 20px 30px;
    }
</style>


