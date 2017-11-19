<template>
    <transition name="singer-slide">
        <music-list :title="title" :songs="songs" :bg-image="bgImage"></music-list>
    </transition>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getSingerDetail} from '../../api/singer'
    import {ERR_OK} from '../../api/config'
    import {creatSongs} from '../../js/song'

    import MusicList from '../music-list/music-list.vue'

    export default {
        data () {
            return {
                songs: []
            }
        },
        components: {
            MusicList,
        },
        computed: {
            title () {
                return this.singer.name
            },
            bgImage () {
                return this.singer.avatar
            },
            ...mapGetters (
                ['singer']
            )
        },
        created () {
            this._getSingerDetail()
        },
        methods: {
            _getSingerDetail () {
                if (!this.singer.id) {
                    this.$router.push('/singer')
                    return
                }
                getSingerDetail(this.singer.id).then((res) => {
                    if (res.code === ERR_OK) {
                        this.songs = this.dealSongs(res.data.list)
                    }
                })
            },
            dealSongs (list) {
                let ret = []
                list.forEach((item) => {
                    let {musicData} = item
                    if (musicData.songid && musicData.albummid) {
                        ret.push(creatSongs(musicData))
                    }
                }); 
                return ret
            }
        }
    }
</script>

<style scoped>
    .singer-slide-enter-active, .singer-slide-leave-active {
        transition: all 0.3s;
    }
    .singer-slide-enter, .singer-slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>

