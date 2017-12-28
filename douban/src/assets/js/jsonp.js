        
        
        import OriginJsonp from 'jsonp'

        export default function jsonp (url, data) {
            url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
            return new Promise((resolve, reject) => {
                OriginJsonp(url, (err, data) => {
                    if (!err) {
                        resolve(data) 
                    } else {
                        reject(err)
                    }
                })
            })
        }

        function param(data) {
            let url = ''
            for (var k in data) {
                let value = data[k] !== undefined ? data[k] : ''
                // url += `&${k}=${encodeURIComponent(value)}`
                url += '&' + k + '=' + encodeURIComponent(value)
            }
            return url ? url.substring(1) : ''
        }
