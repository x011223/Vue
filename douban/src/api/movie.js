

        import jsonp from '../assets/js/jsonp.js'

        // this.getquanxian()
        // 获取 影院热映 列表
        export  function getHotMovies (Count) {
            const url = 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items'
            const data =  {
                count: Count
            }
            return jsonp(url, data)
        }

        // 获取 免费在线 列表
        export function getFreeMovies (Count) {
            const url = 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items'
            const data = {
                count: Count
            }
            return jsonp(url, data)
        }

        // 获取 新片速递 列表
        export function getNewMovies (Count) {
            const url = 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items'
            const data = {
                count: Count
            }
            return jsonp(url, data)
        }

        export function getMovieItem (id) {
            const url = `https://api.douban.com/v2/movie/subject/${id}`
            const data = {
                
            }
            return jsonp(url, data)
        }