<template>
    <transition name="discDetail">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
    import MusicList from '../music-list/music-list.vue'

    import {mapGetters} from 'vuex'
    import {getDiscSong, getCdinfo} from '../../api/recommend'
    import {ERR_OK} from '../../api/config'
    import {creatSongs} from '../../js/song'

    export default {
        components: {
            MusicList
        },
        created () {
            this._getDiscSong ()
            // this._getSongList()
        },
        data () {
            return {
                songs: []
            }
        },
        methods: {
            _getDiscSong () {
                if (!this.disc.dissid) {
                    this.$router.push('/recommend')
                    return
                }
                getDiscSong ().then((res) => {
                    if (res.code === ERR_OK) {
                        this.songs = this._creatSongs(res.cdlist[0].songlist)
                    }
                })
            },
            // _getSongList () {
            //      getCdinfo().then((res) => {
            //         // if (res.code === ERR_OK) {
            //             // this.songs = res.cdlist[0].songlist
            //             console.log(res)
            //         // }
            //     })
            // },
            _creatSongs (list) {
                let ret = []
                list.forEach((musicData) => {
                    // 存在歌曲ID和专辑ID时创建歌曲
                    if (musicData.songid && musicData.albumid) {
                        // 将创建的歌曲推入列表
                        ret.push(creatSongs (musicData))
                    }
                });
                return ret
            }
        },
        computed: {
            title () {
                return this.disc.dissname
            },
            bgImage () {
                return this.disc.imgurl
            },
            ...mapGetters([
                'disc'
            ])
        }
    }
</script>

<style scoped>
    .discDetail-enter-active, .discDetail-leave-active {
        transition: all 0.3s
    }
    .discDetail-enter, .discDetail-leave-to {
        transform: translate3d(100%, 0, 0)
    }
</style>


