const current = 'dev' //区分开发环境和生产环境，
const profiles = {
  'dev': {
    'online': false,
    'baseURL': 'https://api-hmugo-web.itheima.net/api/public/v1' //开发环境地址
  },
  'prod': {
    'online': true,
    'baseURL': 'https://api-hmugo-web.itheima.net/api/public/v1'//生产环境地址
  }
}
const ENV = profiles[current]
module.exports = ENV
