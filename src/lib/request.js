import mockData from './mock'
let mockFlag = true

export default function(path, params) {
  let myHeaders = new Headers({
    'pragma': 'no-cache',
    'cache-control': 'no-cache'
  })

  function status(response) {
    if (response.status >= 200 && response.status < 300) {  
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }

  function wrap(response) {
    return response.text().then(function(text) {
      var firstChar = text.charAt(0);
      if (firstChar == '{' ||　firstChar == '[') {
        return Promise.resolve(JSON.parse(text))
      } else {
        return Promise.reject(new Error('response error'))
      }
    })
  }

  let args = {
    headers: myHeaders,
    mode: 'cors',
    method: 'GET'
  }
  if (mockFlag) {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve(mockData[path])
      }, 1000)
    })
  }
  return fetch(path, Object.assign(args, params))
    .then(status)
    .then(wrap)
    .then(function(response) {
      if (response.status == 0) {
        return Promise.resolve(response.data)
      } else {
        return Promise.reject(response)
      }
    })
}