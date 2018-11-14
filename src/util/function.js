import CryptoJS from 'crypto-js'

let api = {}
const key = CryptoJS.enc.Utf8.parse('r3FzZAU59c1NRdl0XIHnGs8qSCi2ekbt')
const iv = CryptoJS.enc.Utf8.parse('ta3XKrO08DyPgsvU')

api.f = (num) => {
  num = num < 10 ? '0' + num : num
  return num
}
api.date = (d, t) => {
  var year = d.getFullYear()
  var month = api.f(d.getMonth() + 1)
  var day = api.f(d.getDate())
  var hour = api.f(d.getHours())
  var minutes = api.f(d.getMinutes())
  var seconds = api.f(d.getSeconds())
  switch (t) {
    case 'date':
      return year + '-' + month + '-' + day
    case 'time':
      return hour + ':' + minutes + ':' + seconds
    case 'sTime':
      return hour + ':' + minutes
    default:
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
  }
}
api.serialize = data => {
  let result = ''
  for (let [key, value] of Object.entries(data)) {
    result += `${key}=${value}&`
  }
  result = result.substring(0, result.length - 1)
  return result
}
api.decimal = (f, n) => {
  n = n || 2
  return (+f).toFixed(n)
}
api.readable = (num) => {
  var result = ''
  num = (num || 0).toString()
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return result
}
api.telReadable = (tel) => {
  if (tel) {
    return tel.replace(/(\w{3})\w{4,}(\w{4})/, '$1****$2')
  }
}
api.cardReadable = (tel) => {
  if (tel) {
    return tel.replace(/(\d{4})\d{8,13}(\d{4})/, '$1****$2')
  }
}
api.emailReadable = (email) => {
  if (email) {
    return email.replace(/(.{2}).+(.{2}@.+)/g, '$1****$2')
  }
}
api.currency = (num, n, i) => {
  if (i) {
    var sign = (num + '').includes('-')
    num = sign ? num.slice(1) : num
  }
  var result = ''
  num = api.decimal(num, n)
  result = api.readable(num.slice(0, num.length - 3)) + num.slice(-3)
  if (i) {
    result = sign ? '-' + result : '+' + result
  }
  return result
}
api.createCode = (mycanvas) => {
  var str = api.rand()
  var cxt = mycanvas.getContext('2d')
  cxt.fillStyle = '#eee'
  cxt.fillRect(0, 0, 90, 40)
  for (var j = 0; j < 20; j++) {
    cxt.strokeStyle = '#609cff'
    cxt.beginPath()
    cxt.moveTo(api.line().x, api.line().y)
    cxt.lineTo(api.line().x, api.line().y)
    cxt.lineWidth = 0.5
    cxt.closePath()
    cxt.stroke()
  }
  cxt.fillStyle = '#387c91'
  cxt.font = 'bold 24px Arial'
  cxt.fillText(str, 20, 30)
  return str
}
api.rand = () => {
  var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var arr = str.split('')
  var validate = ''
  var ranNum
  for (var i = 0; i < 4; i++) {
    ranNum = Math.floor(Math.random() * 62)
    validate += arr[ranNum]
  }
  return validate
}
api.line = () => {
  var line = {x: 0, y: 0}
  line.x = Math.floor(Math.random() * 90)
  line.y = Math.floor(Math.random() * 40)
  return line
}
api.countDown = (e) => {
  var t = 60
  var ele = document.querySelector('.count_btn') || document.getElementsByClassName('count_btn')[0]
  window.tt = setInterval(() => {
    if (t === 0) {
      ele.innerHTML = ''
      clearInterval(window.tt)
      ele.setAttribute('disabled', false)
    } else {
      ele.innerHTML = t + 's'
      t--
    }
  }, 1000)
}
api.validityForm = (form) => {
  let data = {}
  let error = ''
  let radioEle = {exit: false, value: '', str: ''}
  for (let i = 0; i <= form.length - 1; i++) {
    const ele = form[i]
    if (ele.name !== 'btn') {
      if (ele.value && ele.type === 'radio') {
        data[ele.name] = ele.checked ? ele.value : (data[ele.name] || '')
        radioEle = {exit: true, value: data[ele.name], str: ele.placeholder}
      } else if (ele.value && api.check(ele.getAttribute('pattern'), ele.value)) {
        data[ele.name] = ele.getAttribute('isChange') ? encodeURIComponent(ele.value) : ele.value
      } else {
        error = ele.value ? ele.getAttribute('error') : ele.placeholder
        ele.focus()
        break
      }
    }
  }
  if (radioEle.exit && !radioEle.value) {
    return radioEle.str
  } else if (!error) {
    return data
  } else {
    return error
  }
}
api.clearForm = (form) => {
  for (var i = 0; i <= form.length - 2; i++) {
    if (!form.disabled) {
      form[i].value = ''
    }
  }
}
api.check = (pattern, value) => {
  var re = new RegExp(pattern)
  if (pattern && !re.test(value)) {
    return false
  } else {
    return true
  }
}
api.checkOne = (ele) => {
  if (!ele.value) {
    return ele.placeholder
  } else if (!(api.check(ele.getAttribute('pattern'), ele.value))) {
    return ele.getAttribute('error')
  }
}
api.checkAjax = (obj, res, callback, btn, failback) => {
  if (res === 'repeatLogin') {
    api.tips('您的账号在别处登录', () => {
      obj.$router.push({name: 'auth-login'})
      obj.$store.commit('LOGOUT')
    })
    return false
  }
  if (res === 'overtime') {
    api.tips('账户登录超时，请重新登录', () => {
      obj.$router.push({name: 'auth-login'})
      obj.$store.commit('LOGOUT')
    })
    return false
  }
  if (res && res.code) {
    api.tips(res.msg, () => {
      if (btn) {
        btn.removeAttribute('disabled')
      }
      if (failback) {
        failback()
      }
    })
  } else {
    callback()
  }
}
api.btoa = (input) => {
  var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  var output = ''
  var chr1 = ''
  var chr2 = ''
  var chr3 = ''
  var enc1 = ''
  var enc2 = ''
  var enc3 = ''
  var enc4 = ''
  var i = 0
  while (i < input.length) {
    chr1 = input.charCodeAt(i++)
    chr2 = input.charCodeAt(i++)
    chr3 = input.charCodeAt(i++)
    enc1 = chr1 >> 2
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
    enc4 = chr3 & 63
    if (isNaN(chr2)) {
      enc3 = enc4 = 64
    } else if (isNaN(chr3)) {
      enc4 = 64
    }
    output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
  }
  return output
}
api.checkEquipment = () => {
  var sUserAgent = navigator.userAgent.toLowerCase()

  // IE: window.ActiveXObject
  // Firefox: document.getBoxObjectFor
  // Chrome: window.MessageEvent && !document.getBoxObjectFor
  // Opera: window.opera
  // Safari: window.openDatabase
  // var Sys = {}, s
  // (s = sUserAgent.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
  // (s = sUserAgent.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
  // (s = sUserAgent.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
  // (s = sUserAgent.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
  // (s = sUserAgent.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
  // if(Sys.ie) document.write('IE: '+Sys.ie)
  // if(Sys.firefox) document.write('Firefox: '+Sys.firefox)
  // if(Sys.chrome) document.write('Chrome: '+Sys.chrome)
  // if(Sys.opera) document.write('Opera: '+Sys.opera)
  // if(Sys.safari) document.write('Safari: '+Sys.safari)

  var bIsIpad = sUserAgent.match(/ipad/i)
  var bIsIphoneOs = sUserAgent.match(/iphone os/i)
  var bIsMidp = sUserAgent.match(/midp/i)
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i)
  var bIsUc = sUserAgent.match(/ucweb/i)
  var bIsAndroid = sUserAgent.match(/android/i)
  var bIsCE = sUserAgent.match(/windows ce/i)
  var bIsWM = sUserAgent.match(/windows mobile/i)
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return true
  }
  return false
}
api.checkWechat = () => {
  var sUserAgent = navigator.userAgent.toLowerCase()
  return sUserAgent.match(/MicroMessenger/i)
}
api.randomData = () => {
  var now = +new Date(2010, 9, 3)
  var oneDay = 24 * 3600 * 1000
  var value = Math.random() * 1000
  now = new Date(+now + oneDay)
  value = value + Math.random() * 21 - 10
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(value)
    ]
  }
}
api.getData = () => {
  var data = []
  for (var i = 0; i < 1000; i++) {
    data.push(api.randomData())
  }
  return data
}
api.setStorge = (name, value) => {
  let data = JSON.parse(localStorage.getItem(name) || '{}')
  localStorage.setItem(name, JSON.stringify({...data, ...value}))
}
api.getStorge = (name) => {
  return JSON.parse(localStorage.getItem(name) || '{}')
}
api.goPage = (id, type, obj) => {
  api.setStorge('suanli', {proId: id, proType: type})
  obj.$router.push({path: '/minerShop/detail/'})
}
api.encryptAes = (data) => {
  let encrypted = CryptoJS.AES.encrypt(data, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7})
  return encrypted.toString()
}
api.decryptedAes = (data) => {
  let decrypted = CryptoJS.AES.decrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  // 转换为 utf8 字符串
  return CryptoJS.enc.Utf8.stringify(decrypted)
}
export default api
