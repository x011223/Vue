<template>
    <transition name="topList-trans">
        <music-list :rankStyle="rankStyle" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>   
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getToplistSongs} from '../../api/rank'
    import {ERR_OK} from '../../api/config'
    import {creatSongs} from '../../js/song'

    import MusicList from '../music-list/music-list'
    export default {
        components: {
            MusicList,
        },
        computed: {
            title () {
                return this.toplist.topTitle
            },
            bgImage () {
                if (this.songs.length) {
                    return this.songs[0].image
                }
            },
            ...mapGetters ([
                'toplist'
            ])
        },
        created () {
            this._getToplistSongs()   
        },
        data () {
            return {
                songs: [],
                rankStyle: true,
            }
        },
        methods: {
            _getToplistSongs () {
                if (!this.toplist.id) {
                    this.$router.push('/rank')
                    return
                }
                getToplistSongs(this.toplist.id).then((res) => {
                    if (res.code === ERR_OK) {
                        this.songs = this._creatsongs(res.songlist)
                    }
                })
            },
            _creatsongs (list) {
                let ret = [] 
                list.forEach((rankItem) => {             
                    const musicData = rankItem.data
                    if (musicData.songid && musicData.albumid) {
                        ret.push(creatSongs(musicData))
                    }
                });             
                return ret
            }
        },
    }
</script>

<style scoped>
    .topList-trans-enter-active, .topList-trans-leave-active {
        transition: all 0.1s ease-in-out
    }
    .topList-trans-enter, .topList-trans-leave-to {
        transform: translate3d(100%, 0, 0)
    }
</style>


