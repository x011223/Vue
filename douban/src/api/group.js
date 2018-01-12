

        import jsonp from '../assets/js/jsonp'

        export function getGroups () {
            const url = 'https://m.douban.com/rexxar/api/v2/group/rec_groups_for_newbies'
            const data = {

            }
            return jsonp(url, data)
        }