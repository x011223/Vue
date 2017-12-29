

        import jsonp from '../assets/js/jsonp.js'

        // 虚构类
        export function getFiction () {
            // const url = 'https://api.douban.com/v2/book/subject_collection/book_nonfiction/items'
            const url = 'https://m.douban.com/rexxar/api/v2/subject_collection/book_fiction/items'
            const data = {

            }
            return jsonp(url, data)
        }

        // 非虚构类 
        export function getUnFiction () {
            // const url = 'https://api.douban.com/v2/book/subject_collection/book_nonfiction/items'
            const url = 'https://m.douban.com/rexxar/api/v2/subject_collection/book_nonfiction/items'
            const data = {

            }
            return jsonp(url, data)
        }