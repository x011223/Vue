<template>
    <div class="song-list">
        <ul>
            <li v-for="song in songs" class="song">
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
                return `专辑： ${song.album}`
            }
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
        border-bottom: 2px solid #007bf7;
        border-radius: 6px;
        top: 8px;
    }
    .song-content {
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        font-size: 10px;
    }
    .song-image {
        /* position: fixed; */
        display: inline-block;
    }
    .song_content {
        display: inline-block;
        margin-left: 12px;
    }
    .song-name {
        color: rgb(7, 17, 27);
        font-size: 16px;
    }    
    .song-desc {
        margin-top: 4px;
    }
</style>
