

        import {mapGetters} from 'vuex'
        export const playMixin = {
            computed: {
                ...mapGetters([
                    'playlist'
                ])
            },
            mounted () {
                this.handlePlaylist(this.playlist)
            },
            activated () {
                this.handlePlaylist(this.playlist)
            },
            watch: {
                playlist (newVal) {
                    this.handlePlaylist(newVal)
                },
            },
            methods: {
                // 由具体组件实现这个函数
                handlePlaylist () {
                    // 否则抛出异常
                    throw new Error('component must implement handlePlaylist method')
                }
            }
        }