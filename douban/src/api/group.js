

        import jsonp from '../assets/js/jsonp'

        // 小组页面 分类 推荐小组
        export function getGroups () {
            const url = 'https://m.douban.com/rexxar/api/v2/group/rec_groups_for_newbies'
            const data = {

            }
            return jsonp(url, data)
        }

        // 分类  按数量  获取小组
        export function getTagGroups (Tag, Count) {
            const url = 'https://m.douban.com/rexxar/api/v2/group/rec_groups_by_tag'
            const data = {
                tag: Tag,
                count: Count,
            }
            return jsonp(url, data)
        }

        export function getGroupItem (id) {
            const url = `https://m.douban.com/rexxar/api/v2/group/${id}?ck=&for_mobile=1`
            const data = {

            }
            return jsonp(url, data)
        }