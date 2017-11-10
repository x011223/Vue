<template>
    <div class="song-list">
        <ul>
            <li v-for="song in songs" class="song">
                <div class="song-content">
                    <h2 class="song-name">{{song.name}}</h2>
                    <p class="song-desc">{{getSongDesc(song)}}</p>
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
                return `${song.singer} 。${song.album}`
            }
        },
    }
</script>

<style scoped>
    li {
        list-style: none;
    }
    .song-list {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 64px;
        font-size: 12px;
    }
    .song-content {
        flex: 1;
        line-height: 20px;
        overflow: hidden;
    }
    .song-name {
        color: rgba(7, 17, 27, 0.3);
    }
</style>
