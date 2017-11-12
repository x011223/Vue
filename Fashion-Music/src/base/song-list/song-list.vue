<template>
    <div class="song-list">
        <ul>
            <li @click="selectSong(song, index)" v-for="(song, index) in songs" class="song">
                <div class="song-content">
                    <div class="song-image">
                        <img v-lazy="song.image" width="36" height="36">
                    </div>
                    <div class="song_content">
                        <h2 class="song-name">{{song.name}}</h2>
                        <p class="song-desc">{{getSongDesc(song)}}</p>
                    </div>                  
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            songs: {
                type: Array,
                default: []
            },
        },
        methods: {
            getSongDesc (song) {
                console.log(song)
                return `${song.album}`
            },
            selectSong(song, index) {
                // 点击时 分发事件
                this.$emit('select', song, index)
            },
        },
    }
</script>

<style scoped>
    li {
        list-style: none;
    }
    .song {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 64px;
        /* border-bottom: 2px solid #007bf7; */
        /* border-radius: 6px; */
        top: 8px;
        overflow: hidden;
    }
    .song-content {
        flex: 1;
        /* line-height: 24px; */
    }
    .song-image {        
        display: inline-block;
        vertical-align: top;
    }
    .song_content {
        position: absolute;
        display: inline-block;
        margin-left: 8px;
        text-overflow: ellipsis;
    }
    .song-name {
        position: relative;
        color: rgb(7, 17, 27);
        font-size: 14px;
    }    
    .song-desc {
        position: relative;
        margin-top: 6px;
        font-size: 8px;     
    }
</style>
