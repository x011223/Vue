
        import jsonp from '../assets/js/jsonp.js'

        export function getShortComment (id, commentCount) {
            const url = 'https://m.douban.com/rexxar/api/v2/movie/${id}/interests?count=Count&order_by=hot&start=0'
            const data = {
                count: commentCount,
            }
            return jsonp(url, data)
        }

        export function getTopicSelection () {
            const url = 'https://m.douban.com/rexxar/api/v2/gallery/topic_selections'
            const data = {

            }
            return jsonp(url, data)
        }