

        import jsonp from '../assets/js/jsonp.js'


        export  function getRecommend (Count) {
            const url = 'https://m.douban.com/rexxar/api/v2/recommend_feed'
            const data =  {
                count: Count
            }
            return jsonp(url, data)
        }