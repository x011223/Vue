

        import jsonp from '../assets/js/jsonp.js'

        export  function getHoteMovies () {
            const url = 'https://api.douban.com/v2/movie/in_theaters'
                const data =  {
                    
                }
                return jsonp(url, data)
        }