
        import jsonp from '../assets/js/jsonp'
        import { Key, Secerect } from '../assets/js/config'

        export function getquanxian () {
            const url = 'https://www.douban.com/service/auth2/auth'
            const data = {
                // client_id: '05b2e24806124f0f1118a6d81236ed2d',
                // Secerect,
                response_type: 'code',
                redirect_uri: 'http://192.168.31:3402/#/main'
            }
            console.log("1")
            // console.log(client_id)
            return jsonp(url, data)
        }