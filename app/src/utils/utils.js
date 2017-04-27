/**
 * Created by xiongze on 2017/4/21.
 */
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds() //millisecond
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
    }
  }
  return format
}

if (!Array.prototype.every)
{
  Array.prototype.every = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this &&
        !fun.call(thisp, this[i], i, this))
        return false;
    }

    return true;
  };
}

if (typeof Array.prototype.reduce != "function") {
  Array.prototype.reduce = function (callback, initialValue ) {
    var previous = initialValue, k = 0, length = this.length;
    if (typeof initialValue === "undefined") {
      previous = this[0];
      k = 1;
    }

    if (typeof callback === "function") {
      for (k; k < length; k++) {
        this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
      }
    }
    return previous;
  };
}

exports.extends = function (des, src, override) {
  if (src instanceof Array) {
    for (var i = 0, len = src.length; i < len; i++)
      extend(des, src[i], override)
  }
  for (var j in src) {
    des[j] = src[j]
  }
  return des
}
