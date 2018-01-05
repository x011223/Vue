

        import jsonp from '../assets/js/jsonp.js'


        export  function getRecommend () {
            const url = 'https://m.douban.com/rexxar/api/v2/recommend_feed'
            const data =  {
                // count: Count
            }
            return jsonp(url, data)
        }

        export  function getRecommendBefore (Date) {
            const url = 'https://m.douban.com/rexxar/api/v2/recommend_feed'
            const data =  {
                next_date: Date
            }
            return jsonp(url, data)
        }