

        import ListView from '../../base/listview/listview'
        import { mapGetters, mapMutations } from 'vuex'
        import { getHotMovies, getFreeMovies, getNewMovies } from '../../api/movie'
        import { getFiction, getUnFiction } from '../../api/books'
        import { getRecommend } from '../../api/main'
        export const ListMixin = {
            components: {
                ListView
            },
            data () {
                 return {
                    listHot: [],
                    listFree: [],
                    listNew: [],
                    listRecommend: [],
                    listFiction: [],
                    listUnFiction: [],
                 }   
            },
            methods: {
                //  获得 影院热映 列表
                _getHotMovies () {
                    getHotMovies(this.Count).then((res) => {  
                        // this.HotMovies = res.subject_collection_items 
                        this.listHot = res.subject_collection_items  
                        this.getHotMovies(this.listHot)
                    })
                    this.setIsMore(false)
                },
                // 免费 在线 观看
                _getFreeMovies () {
                    getFreeMovies(this.Count).then((res) => {
                        // this.FreeMovies = res.subject_collection_items
                        this.listFree = res.subject_collection_items
                        this.getFreeMovies(this.listFree)
                    })
                    this.setIsMore(false)
                },
                // 新片速递
                _getNewMovies () {
                    getNewMovies(this.Count).then((res) => {
                        // this.NewMovies = res.subject_collection_items
                        this.listNew = res.subject_collection_items
                        this.getNewMovies(this.listNew)
                    })
                    this.setIsMore(false)
                },
                // 主页 热门文章
                _getRecommend () {
                    getRecommend(this.Count).then((res) => {
                        this.listRecommend = res.recommend_feeds
                        this.getRecommend(this.listRecommend)
                    })
                    this.setIsMore(false)
                },
                // 虚幻类图书
                _getFiction () {
                    getFiction(this.Count).then((res) => {
                        this.listFiction = res.subject_collection_items
                        this.getFiction(this.listFiction)
                    })
                    this.setIsMore(false)
                },
                // 非虚幻类图书
                _getUnFiction () {
                    getUnFiction(this.Count).then((res) => {
                        this.listUnFiction = res.subject_collection_items
                        this.getUnFiction(this.listUnFiction)
                    })
                    this.setIsMore(false)
                },
                ...mapMutations({
                    getHotMovies: 'get_HotMovies',
                    getFreeMovies: 'get_FreeMovies',
                    getNewMovies: 'get_NewMovies',
                    getRecommend: 'get_RecommendFeed',
                    getFiction: 'get_FictionBooks',
                    getUnFiction: 'get_UnFictionBooks',
                    setIsMore: 'set_IsMore'
                })
            },
            // created () {
            //     this._getHotMovies()
            //     this._getFreeMovies()
            //     this._getNewMovies()
            //     this._getRecommend()
            //     this._getFiction()
            //     this._getUnFiction()
            // },
            computed: {
                Count () {
                    return this.isMore ? 69 : 9
                },
                ...mapGetters ([
                    'HotMovies',
                    'FreeMovies',
                    'NewMovies',
                    'UnFictionBooks',
                    'FictionBooks',
                    'RecommendFeed',
                    'isMore',
                ]),           
            }
        }