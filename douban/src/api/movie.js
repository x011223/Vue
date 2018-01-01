

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

        // export function getComingSoon (Count) {
        //     const url = 'https://api.douban.com/v2/movie/coming_soon'
        //     const data = {
        //         count: Count
        //     }
        //     return jsonp(url, data)
        // }

        // export function getTop250 (Count) {
        //     const url = 'https://api.douban.com/v2/movie/top250'
        //     const data = {
        //         count: Count
        //     }
        //     return jsonp(url, data)
        // }

        export function getFreeMovies (Count) {
            const url = 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items'
            const data = {
                count: Count
            }
            return jsonp(url, data)
        }

        export function getNewMovies (Count) {
            const url = 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items'
            const data = {
                count: Count
            }
            return jsonp(url, data)
        }