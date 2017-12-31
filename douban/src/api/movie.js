

        import jsonp from '../assets/js/jsonp.js'

        // this.getquanxian()
        // 获取 影院热映 列表
        export  function getHoteMovies (Count) {
            const url = 'https://api.douban.com/v2/movie/in_theaters'
            const data =  {
                count: Count
            }
            return jsonp(url, data)
        }

        export function getComingSoon (Count) {
            const url = 'https://api.douban.com/v2/movie/coming_soon'
            const data = {
                count: Count
            }
            return jsonp(url, data)
        }

        export function getTop250 (Count) {
            const url = 'https://api.douban.com/v2/movie/top250'
            const data = {
                count: Count
            }
            return jsonp(url, data)
        }