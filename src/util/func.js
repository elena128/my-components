/*
 * =====================================
 * func.js    elena  QQ：329655021
 * 常用js效果函数
 * Version 0.5.0
 * =====================================
 */
// 百度地图接口
//http://api.map.baidu.com/geocoder?address=''&output=html
// 阻止事件冒泡
function stopEvent () {
  if(event.target==this){}
  // event.stopPropagation();
}
// 阻止默认事件
function popupDeal () {
  document.querySelector(ele).scrollTop = 0
  window.addEventListener('touchmove', function (e) {
    e.preventDefault();
  })
  // window.removeEventListener('touchmove')
}
// 判断设备
function getVersions () {
  var u = navigator.userAgent;
  var mobile = !!u.match(/AppleWebKit.*Mobile.*/);
  if (mobile) {
    var ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var weixin = u.indexOf('MicroMessenger') > -1;
    var qq = u.match(/\sQQ/i) == " qq";
    if (ios) {
      return 1;
    }
    if (android) {
      return 2;
    }
    if (weixin) {
      return 3;
    }
    if (qq) {
      return 4;
    }
  } else {
    return 0;
  }
}
// 兼容各个浏览器的原生事件监听
function addHandler (ele, eType, handler) {
  if (ele.addEventListener) {
    ele.addEventListener(eType, handler);
  } else {
    ele.attachEvent('on' + eType, handler);
  }
}
// 判断IE10以下
function isIE () {
  if ((!!window.ActiveXObject || "ActiveXObject" in window) && (document.documentMode < 10)) {
    return true;
  } else {
    return false;
  }
}
// 浏览器是否支持html5
function supportHtml5 () {
  return !!document.createElement('canvas').getContext
}
// window对象
function windowObject () {
  // window.location.href 整个URl字符串(在浏览器中就是完整的地址栏)
    // 返回值：http://www.home.com:8080/windows/location/page.html?ver=1.0&id=timlq#love
  // window.location.protocol URL的协议部分
    // 返回值：http:
  // window.location.host URL的主机部分，
    // 返回值：www.home.com
  // window.location.port URL的端口部分。如果采用默认的80端口(update:即使添加了:80)，那么返回值是空字符。
    // 返回值:8080
  // window.location.pathname URL的路径部分(就是文件地址)
    // 返回值：/windows/location/page.html
  // window.location.search 查询(参数)部分。除了给动态语言赋值以外，我们同样可以给静态页面,并使用javascript来获得相信应的参数值
    // 返回值：?ver=1.0&id=timlq
  // window.location.hash 锚点
    // 返回值：#love
}
// 点击的链接,可用于返回上一页
function linkObj () {
  return document.referrer;
}


// file或blob对象转换为dataURL
function readBlobAsDataURL(obj, callback) {
  var a = new FileReader();
  a.onload = function (e) {
    callback(e.target.result);
  };
  a.readAsDataURL(obj);
}
// dataURL转化为blob对象
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
// file、blob的图片文件数据绘制到canvas
function drawPic () {
  readBlobAsDataURL(file, function (dataurl){
    var img = new Image();
    img.onload = function(){
      canvas.drawImage(img);
    };
    img.src = dataurl;
  });
}
// 对象URL
function urlObj () {
  window.URL.createObjectURL() //创建一个指向该参数对象(File或Blob对象)的URL对象
  window.URL.revokeObjectURL(objectURL); //释放URL对象
}


// 屏幕旋转的事件和样式
function onorientationEvent () {
  switch(window.orientation){
    case -90:
    case 90:
    alert("横屏:" + window.orientation);
    case 0:
    case 180:
    alert("竖屏:" + window.orientation);
    break;
  }
}
// jquery
function jqueryFun () {
  // 基本筛选器
  // :first,:not(selector),:even,:odd,:eq(index),:gt(index),:lang,:last,:lt(index),:header:animated,:focus,:root1.9+,:target
  // 表单
  // :input,:text,:password,:radio,:checkbox,:submit,:image,:reset,:button,:file
  // jquery函数
  // serialize()-序列表表格内容为字符串 serializeArray()-序列表表格内容为json数据
  // end() merge()--合并两个数组（同contact） param()--将表单元素数组或对象序列化
  // empty()--删除匹配的元素集合中的所有子节点 remove()-（jquery对象保留） detach()-（jquery对象保留，保留事件）
  // offset() position() wrap() unwrap() wrapAll() wrapInner()
}


// 获取url参数
function getQuery (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r) return r[2];
  return null;
}
// 字符串和对象的转化
function obj2Str (obj) {
  if (typeof obj !== 'object') return false
  let arr = []
  for (const key in obj) {
    arr.push(key + '=' + obj[key])
  }
  return arr.join('&')
}
function str2Obj (str) {
  if (typeof str !== 'string') return false
  let obj = {}
  str.split('&').forEach(function (p) {
    p = p.split('=');
    obj[p[0]] = p[1]
  })
  return obj
}
// 替换url中某个参数值
function updateParam(param, key, value) {
  if (!key || value === undefined) return false
  let obj = str2Obj(param)
  obj[key] = value
  const newparam = obj2Str(obj)
  return newparam
}


// 读取/存入本地存储
function getStorge(name) {
  return JSON.parse(localStorage.getItem(name) || '{}')
}
function setStorge(name, data) {
  const storgeData = { ...getStorge(name), ...data }
  localStorage.setItem(name, JSON.stringify(storgeData))
}


// cookie操作
function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}
function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + '=');
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(';', c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
  }
  return ''
}


// 从一个数组里返回n个随机元素
function getArrayItems(arr, num) {
  var tempArr = JSON.parse(JSON.stringify(arr))
  var returnArr = []
  for (var i = 0; i < num; i++) {
    if (!tempArr.length) return false
    var arrIndex = getRandom(tempArr.length)
    returnArr.push(tempArr[arrIndex])
    tempArr.splice(arrIndex, 1);
  }
  return returnArr;
}
// 随机数
function random(max, min = 0) {
  if (!max) return false
  const gap = max - min + 1
  return getRandom(gap) + min;
}
function getRandom (n) {
  return Math.floor(Math.random() * n)
}
// [2,32] => 数组
function getArr(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') alert("参数格式错误")
  var data = []
  for (var i = min; i <= max; i++) {
    data.push(i)
  }
  return data
}


// 识别银行卡  cardList <= card.js
function getBankName (value) {
  const findCard = cardList.find(item => value.substr(0, 6) === item.id || value.substr(0, 5) === item.id)
  return findCard && findCard.name
}
// 产生唯一ID的函数
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function guid() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


// 倒计时函数
var i = true;
function settime(obj, t) {
  i = false;
  var tt = setInterval(function () {
    if (t == 0) {
      obj.innerHTML = obj.value = "重新获取验证码";
      clearInterval(tt);
      t = 60;
      i = true;
    } else {
      obj.innerHTML = t;
      obj.value = t;
      t--;
    }
  }, 1000)
}
// 完整倒计时
function countdown(obj, d) {
  var i_day = false, i_hour = false, i_minute = false;
  var tt = setInterval(function () {
    d.s--;
    if (!d.s && !d.m && !d.h && !d.d) {
      clearInterval(tt); console.log("finish")
    }
    if (!d.s) {
      i_minute = true;
    } else if (d.s < 0) {
      d.s = 59;
      d.m--;
    }
    if (i_minute && !d.m) {
      i_hour = true;
      i_minute = false;
    } else if (d.m < 0) {
      d.m = 59;
      d.h--;
    }
    if (i_hour && !d.h) {
      i_day = true;
      i_hour = false;
    } else if (d.h < 0) {
      d.h = 23;
      d.d--;
    }
    $(".days").html(d.d)
    $(".hours").html(f(d.h))
    $(".minutes").html(f(d.m))
    $(".seconds").html(f(d.s))
  }, 1000)
}
// countdown(ele,getTimeDiff("2017-4-10 12:00:00","2017-4-12 23:01:00"))


// 获取当月多少天
function getdays(year, month) {
  if ((year % 100 !== 100 && year % 4 === 0) || (year % 400 === 100)) {
    var days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[month];
  } else {
    var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[month];
  }
}
// 是否是闰年
function isLeap(y) {
  return (y % 100 !== 0 && y % 4 === 0) || (y % 400 === 0);
}
// 某月天数
function getDaysNum(y, m) {
  var num = 31;
  switch (m) {
    case 2:
      num = this.isLeap(y) ? 29 : 28;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      num = 30;
      break;
  }
  return num;
}
// 上一月
function getSiblingsMonth(y, m, n) {
  var d = new Date(y, m - 1);
  d.setMonth(m - 1 + n);
  return {
    y: d.getFullYear(),
    m: d.getMonth() + 1
  };
}
function getPrevMonth(y, m, n) {
  return this.getSiblingsMonth(y, m, 0 - (n || 1));
}
// 下一月
function getNextMonth(y, m, n) {
  return this.getSiblingsMonth(y, m, n || 1);
}
// 计算时间间隔
function getDayDiff(startDate, endDate) {
  var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
  var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
  var dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
  return dates;
}
function getTimeDiff(startDate, endDate) {
  var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
  var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
  var day = 1000 * 60 * 60 * 24, hour = 1000 * 60 * 60, minute = 1000 * 60;
  var days = Math.floor((endTime - startTime) / day);
  var hours = Math.floor((endTime - startTime - days * day) / hour);
  var minutes = Math.floor((endTime - startTime - days * day - hours * hour) / minute);
  var seconds = Math.floor((endTime - startTime - days * day - hours * hour - minutes * minute) / 1000);
  return { d: days, h: hours, m: minutes, s: seconds };
}
// 日期格式化
function f_t(t) {
  t = new Date(parseInt(t) * 1000);
  return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + f(t.getHours()) + ":" + f(t.getMinutes()) + ":" + f(t.getSeconds())
}
function f(t) {
  t = t + "";
  return (t.length == 1) && "0" + t || t;
}
// 日期是否相等
function isSame(y, m, d) {
  if (isDate(y)) {
    var dt = y;
    y = dt.getFullYear();
    m = dt.getMonth() + 1;
    d = dt.getDate();
  }
  return this.getFullYear() === y && this.getMonth() + 1 === m && this.getDate() === d;
}


// 图片转化为base64
function tobase64(file, callback) {
  var type = file.type;
  var reader = new FileReader();
  reader.onload = function (e) {
    var $tempImg = $("<img>");
    $tempImg.load(function () {
      var w = this.naturalWidth;
      if (w > 480) {
        var imgsrc = compressImg(this, type)
      } else {
        var imgsrc = this.src;
      }
      callback(imgsrc)
    });
    $tempImg.attr("src", e.target.result);
  };
  reader.readAsDataURL(file);
}
// 压缩图片
function compressImg(sourceImgObj, type) {
  var drawWidth = sourceImgObj.naturalWidth,
    drawHeight = sourceImgObj.naturalHeight;
  var newWidth = 480;
  var newHeight = 480 * drawHeight / drawWidth;
  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext("2d");
  cvs.width = newWidth;
  cvs.height = newHeight;
  ctx.drawImage(sourceImgObj, 0, 0, newWidth, newHeight);
  var newImageData = cvs.toDataURL(type, 0.5);
  return newImageData;
}
// 本地上传预览图片函数
function preview(files, ele_preview) {
  $.each(files, function (k, v) {
    if (!v.type.match(/.jpg|.gif|.png|.bmp/i)) {
      alert('您上传的图片格式不正确，请重新选择！');
      return false;
    }
    if (URL) {
      var URL = window.URL || window.webkitURL;
      var blobURL = URL.createObjectURL(v);
      $("<img>").attr("src", blobURL).appendTo($(ele_preview))
    }
  });
}
// pc端拖动图片选择文件
function init_drag(element) {
  var target = document.querySelector(element);
  target.addEventListener("dragover", function (e) {
    e.preventDefault();
    $(this).addClass("active");
  }, true);
  target.addEventListener("drop", function (e) {
    e.preventDefault();
    $(this).removeClass("active");
    console.log(e.dataTransfer.files[0]);
    loadImage(e.dataTransfer.files[0]);
  }, true);
}
// 加载图片:在页面图片很多，且网速很慢的情况下给予用户一个百分比提示。
function preLoadImg(sources, callback, perEl) {
  var count = 0, images = {}, imgNum = sources.length;
  for (src in sources) {
    images[src] = new Image();
    images[src].onload = function () {
      if (++count >= imgNum) {
        setTimeout(function () {
          callback(images);
        }, 500);
      }
      if (perEl) {
        $(perEl).html(~~((count + 1) * 100 / sources.length) + '%');
      }
    }
    images[src].src = sources[src];
  }
}
function uploadCheck (format, size) {
  const tipFormat = ['jpg','jpeg','png']
  const tipSize = 1024 * 1024
  if (tipFormat.indexOf(format.slice(6)) < 0) return '文件格式应是' + tipFormat.join(',')
  if (size > tipSize) return '文件大小不能超过' + tipSize/(1024*1024) + 'MB'
  return true
}



// audio元素和video元素自动播放(触屏即播)
// $('html').one('touchstart',function(){
//    audio.play()
// })
// 连续滚动
function left() {
  var info = "欢迎你来学习 JavaScript是一门脚本语言";
  document.title = info.substring(0, info.length);
  info = info + info.substring(0, 1);
  info = info.substring(1, info.length);
}
// setInterval(left, 300);
// 拖拽效果
function drag () {
  var mouseDownX, mouseDownY, initX, initY, flag = false;
  obj.onmousedown = function(e) {
    mouseDownX = e.pageX;
    mouseDownY = e.pageY;
    initX = obj.offsetLeft;
    initY = obj.offsetTop;
    flag = true;
  }
  obj.onmousemove = function(e) {
    if(flag) {
      var mouseMoveX = e.pageX,mouseMoveY = e.pageY;
      this.style.left = parseInt(mouseMoveX) - parseInt(mouseDownX) + parseInt(initX) + "px";
      this.style.top = parseInt(mouseMoveY) - parseInt(mouseDownY) + parseInt(initY) + "px";
    }
  }
  obj.onmouseup = function() {
    flag = false;
  }
}


// 级联操作
var data1 = {
  "idA": { name: "一级A", data: { "idA1": "二级A1", "idA2": "二级A2", "idA3": "二级A3", "idA4": "二级A4" } },
  "idB": { name: "一级B", data: { "idB1": "二级B1", "idB2": "二级B2", "idB3": "二级B3", "idB4": "二级B4" } },
  "idC": { name: "一级C", data: { "idC1": "二级C1", "idC2": "二级C2", "idC3": "二级C3", "idC4": "二级C4" } },
  "idD": { name: "一级D", data: { "idD1": "二级D1", "idD2": "二级D2", "idD3": "二级D3", "idD4": "二级D4" } }
};
var data2 = {
  "idA1": { name: "二级A1", data: { "idA11": "三级A11", "idA12": "三级A12", "idA13": "三级A13", "idA14": "三级A14" } },
  "idA2": { name: "二级A2", data: { "idA21": "三级A21", "idA22": "二级A22", "idA23": "二级A23", "idA24": "二级A24" } },
  "idA3": { name: "二级A3", data: { "idA31": "三级A31", "idA32": "三级A32", "idA33": "三级A33", "idA34": "三级A34" } },
  "idA4": { name: "二级A4", data: { "idA41": "三级A41", "idA42": "三级A42", "idA43": "三级A42", "idA44": "三级A42" } },
  "idB1": { name: "二级B1", data: { "idB11": "三级B11", "idB12": "三级B12", "idB13": "三级B13", "idB14": "三级B14" } },
  "idB2": { name: "二级B2", data: { "idB21": "三级B21", "idB22": "二级B22", "idB23": "二级B23", "idB24": "二级B24" } },
  "idB3": { name: "二级B3", data: { "idB31": "三级B31", "idB32": "三级B32", "idB33": "三级B33", "idB34": "三级B34" } },
  "idB4": { name: "二级B4", data: { "idB41": "三级B41", "idB42": "三级B42", "idB43": "三级B43", "idB44": "三级B44" } },
  "idC1": { name: "二级C1", data: { "idC11": "三级C11", "idC12": "三级C12", "idC13": "三级C13", "idC14": "三级C14" } },
  "idC2": { name: "二级C2", data: { "idC21": "三级C21", "idC22": "二级C22", "idC23": "二级C23", "idC24": "二级C24" } },
  "idC3": { name: "二级C3", data: { "idC31": "三级C31", "idC32": "三级C32", "idC33": "三级C33", "idC34": "三级C34" } },
  "idC4": { name: "二级C4", data: { "idC41": "三级C41", "idC42": "三级C42", "idC43": "三级C43", "idC44": "三级C44" } },
  "idD1": { name: "二级D1", data: { "idD11": "三级D11", "idD12": "三级D12", "idD13": "三级D13", "idD14": "三级D14" } },
  "idD2": { name: "二级D2", data: { "idD21": "三级D21", "idD22": "二级D22", "idD23": "二级D23", "idD24": "二级D24" } },
  "idD3": { name: "二级D3", data: { "idD31": "三级D31", "idD32": "三级D32", "idD33": "三级D33", "idD34": "三级D34" } },
  "idD4": { name: "二级D4", data: { "idD41": "三级D41", "idD42": "三级D42", "idD43": "三级D43", "idD44": "三级D44" } }
};
function level(ops) {
  var data0 = {};
  for (var i in ops.data1) {
    data0[i] = ops.data1[i].name
  }
  var list1 = { val: ops.level1, data: data0 };
  var list2 = { val: ops.level2, data: ops.data1[ops.level1 || Object.keys(list1.data)[0]].data };
  $(ops.ele + "1").html(ops.func(list1));
  $(ops.ele + "2").html(ops.func(list2));
  $(ops.ele + "1").change(function () {
    list2.data = ops.data1[$(this).val()].data;
    $(ops.ele + "2").html(ops.func(list2));
    if (ops.data2) {
      list3.data = ops.data2[Object.keys(list2.data)[0]].data;
      $(ops.ele + "3").html(ops.func(list3));
    }
  })
  if (ops.data2) {
    var list3 = { val: ops.level3, data: ops.data2[ops.level2 || Object.keys(list2.data)[0]].data };
    $(ops.ele + "3").html(ops.func(list3));
    $(ops.ele + "2").change(function () {
      list3.data = ops.data2[$(this).val()].data;
      $(ops.ele + "3").html(ops.func(list3));
    })
  }
}
// var evalList = doT.template($("#list_template").text());
// level({ele:".level",data1:data1,level1:"idB",level2:"idB2",func:evalList})


// js获取tranform的数字值
// var t = $(ele).css("transform");
//  t = parseInt(t.match (/[-+]*[0-9]+/g));


// 增加一组同类input
function add(ele, obj, no) {
  if (!check(ele, no)) {
    alert("请填入必要信息再添加");
    return false;
  }
  $(obj).before($(ele).eq(0).clone());
  var len = $(ele).length;
  $(ele).eq(len - 1).find("input").val("");
}
function remove(ele, obj) {
  var len = $(ele).length;
  if (len > 2) {
    $(obj).closest(ele).remove();
  }
}
function check(ele, no) {
  var i = true;
  $(ele).each(function (k, v) {
    if (!$(v).find("input").eq(no).val()) {
      i = false;
      return false;
    }
  })
  return i;
}


// 校验函数
function checkone(name) {
  var pattern = $(name).data("pattern");
  var tips = $(name).data("tips");
  var re = new RegExp(pattern);
  if (!name.value) {
    alert("请输入" + name.title);
    name.focus();
    return false;
  } else if (pattern && !re.test(name.value)) {
    alert("请输入" + tips);
    name.focus();
    return false;
  }
  return true;
}
function valiadForm () {
  var i = true;
  $.each(this,function(k,v){
    if($(v).attr("request")==""){
      if(!checkone(v)){
        i = false;
        return false;
      }
    }
  })
  if(i){
    //submit...
  }
}

// 将表单元素转化为对象
$.fn.serializeObject = function () {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function () {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};


// 购物车相关计算
// 改变数量函数
function change_cart(i, n, data) {
  var num = data.data[i].num;
  num += n;
  num = num < 1 ? 1 : num;
  data.data[i].num = num;
  return data;
}
// 计算总数和总价
function cal(data) {
  var num = 0;
  var total = 0.00;
  for (var i = 0; i < data.data.length; i++) {
    if (data.data[i].selected) {
      var number = data.data[i].num;
      var price = data.data[i].price;
      num = num + number;
      total = total + price * number;
    }
  }
  data.num = num;
  data.total = total.toFixed(2);
  return data;
}


// 正则匹配
// 手机号 ^(0|86|17951)?(13\d|15[0-35-9]|17[678]|18\d|14[57])\d{8}$
// 数字      ^\d*$
// 办公电话    ^\d{3}-\d{8}|\d{4}-\d{7}$
// 链接 /((http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig或/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
// 身份证号    ^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$
// 邮箱 ^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+或^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$或^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$
// 英文字母    ^[a-zA-Z]+$
// 非负小数或整数 ^\d*\.?\d*$
// 首尾为特定字符     ^a.*g$  /abc="[^"]*/
// 特殊字符    ^[\u4e00-\u9fa5_a-zA-Z0-9]+$
// 1~365之间的数字 \b[1-9]\b|\b[1-9]\d\b|\b[1-2]\d\d\b|\b[1-3][0-5]\d\b|\b360\b|\b361\b|\b362\b|\b363 \b|\b364\b|\b365\b
// 百分比    ^-?\d+%$
// 密码：包含大小写字母和数字的组合，长度在8-10之间 ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$
// 中文        ^[\u4e00-\u9fa5]+$
// 金额：2位小数 ^[0-9]+(.[0-9]{1,2})?$


// 模版加载数据
// <script id="pro" type="text/template"></script>
String.prototype.tmp = function (obj) {
  return this.replace(/\$\w+\$/g, function (matchs) {
    var returns = obj[matchs.replace(/\$/g, "")];
    return (returns + "") == "undefined" ? "" : returns;
  });
};
function gethtml(data, template) {
  var htmlList = '',
    htmlTemp = $(template).html();
  data.forEach(function (object) {
    htmlList += htmlTemp.tmp(object);
  });
  return htmlList;
}
// doT模版
function dotHtml () {
  // <script type="text/template" charset="utf-8" id='city_template'>
  //   {{for(var i in it){ }}
  //   <div class="item">{{=it[i].name}}</div>
  //   {{ } }}
  // </script>
  // var evalArea = doT.template($("").text());
  // var list={};
  // $("").html(evalArea(list));
  // 载入模版数据
  function loaddata(ele, func, data) {
    $(ele).html(func(data));
  }
  // 载入模版
  function loadtemplate(ele, template_url, callback) {
    $(ele).load(template_url, callback);
  }
}

// 上拉刷新/下拉加载更多
(function (window) {
  'use strict';
  var mobileRefresh = function (params, callback) {
    $.extend(this.params, params);
    this._init(callback);
  }
  var touchYDelta,
    translateVal,
    firstTouchY,
    initialScroll,
    isLoading = false,
    isMoved = false;
  mobileRefresh.prototype = {
    params: {
      container: '',
      triggerDistance: 100,
      callback: false,
      type: "down"
    },
    _init: function (callback) {
      var self = this, ele = this.params.container;
      ele.addEventListener('touchstart', function (ev) {
        self.touchStart(ev)
      });
      ele.addEventListener('touchmove', function (ev) {
        self.touchMove(ev)
      });
      ele.addEventListener('touchend', function (ev) {
        self.touchEnd(ev, callback);
      });
    },
    touchStart: function (ev) {
      if (isLoading) return;
      isMoved = false, touchYDelta = '';
      var touchobj = ev.changedTouches[0];
      firstTouchY = parseInt(touchobj.clientY);
      initialScroll = this.scrollY();
    },
    touchMove: function (ev) {
      if (isLoading) {
        ev.preventDefault();
        return;
      }
      var self = this,
        ele = self.params.container;
      var moving = function () {
        var touchobj = ev.changedTouches[0],
          touchY = parseInt(touchobj.clientY);
        touchYDelta = touchY - firstTouchY;
        if (self.scrollY() === 0 && touchYDelta > 0) {
          ev.preventDefault();
        }
        if (self.params.type == "up") {
          if (initialScroll < 0 || self.scrollY() >= 0 && touchYDelta > 0) {
            firstTouchY = touchY;
            return;
          }
          $(".refresh_load").show()
          translateVal = Math.pow(-touchYDelta, 0.85);
          $(ele).css({ "transform": 'translate3d(0, -' + translateVal + 'px, 0)', "transition-duration": "0ms" })
          isMoved = true;
          if (touchYDelta < self.params.triggerDistance) {
            $(ele).addClass("refresh_pull_up").removeClass("refresh_pull_down");
          } else {
            $(ele).addClass("refresh_pull_down").removeClass("refresh_pull_up");
          }
        }
        if (self.params.type == "down") {
          console.log(touchYDelta < 0)
          if (initialScroll > 0 || self.scrollY() >= 0 && touchYDelta < 0) {
            firstTouchY = touchY;
            return;
          }
          translateVal = Math.pow(touchYDelta, 0.85);
          $(ele).css({ "transform": 'translate3d(0, ' + translateVal + 'px, 0)', "transition-duration": "0ms" })
          isMoved = true;
          if (touchYDelta > self.params.triggerDistance) {
            $(ele).addClass("refresh_pull_up").removeClass("refresh_pull_down");
          } else {
            $(ele).addClass("refresh_pull_down").removeClass("refresh_pull_up");
          }
        }

      };
      this.throttle(moving(), 20);
    },
    touchEnd: function (ev, callback) {
      var ele = this.params.container;
      if (isLoading || !isMoved) {
        isMoved = false;
        return;
      }
      if (touchYDelta <= this.params.triggerDistance && this.params.type == "up") {
        isLoading = true;
        ev.preventDefault();
        $(ele).css({ "transform": 'translate3d(0,-60px,0)', "transition-duration": "300ms" }).addClass("refreshing");
        $(".refresh_load").fadeOut(2000)
        callback();
      }
      if (touchYDelta >= this.params.triggerDistance && this.params.type == "down") {
        isLoading = true;
        ev.preventDefault();
        $(ele).css({ "transform": 'translate3d(0,60px,0)', "transition-duration": "300ms" }).addClass("refreshing");
        callback();
      }
      isMoved = false;
    },
    cancelLoading: function () {
      var ele = this.params.container;
      isLoading = false;
      $(ele).css("transform", 'translate3d(0,0,0)').removeClass("refreshing refresh_pull_up");
    },
    scrollY: function () {
      return window.pageYOffset || window.document.documentElement.scrollTop;
    },
    throttle: function (fn, delay) {
      var allowSample = true;
      return function (e) {
        if (allowSample) {
          allowSample = false;
          setTimeout(function () { allowSample = true; }, delay);
          fn(e);
        }
      };
    }
  }
  window.mobileRefresh = mobileRefresh;
})(window);
// 加载更多
function getmore(wrap, block, block_one, url, callback) {
  $(wrap).scroll(function () {
    var scroll_height = $(block).height() - $(this).height();
    if ($(this).scrollTop() >= scroll_height) {
      if (!$(".loading").length) {
        $(block).append("<div class='loading'>&darr; 正在加载更多...</div>");
        var len = $(block_one).length;
        var pagenum = Math.ceil(len / 10);
        // 模拟加载更多效果
        //setTimeout(function(){
        //  $(".loading").remove();
        //  callback();
        //},2000)
        $.post(url, { total: len, pagenum: pagenum }, function (res) {
          $(".loading").remove();
          callback(res);
        }, "json");
      }
    }
  });
}
