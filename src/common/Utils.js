import Vue from 'vue'
import { JSEncrypt } from 'jsencrypt/bin/jsencrypt'
import CryptoJS from 'crypto-js/crypto-js'

// 正则匹配
let Pattern = {
  isEmpty: /(^\s*)|(\s*$)/g,
  isMobile: /^(13|14|15|17|18)[0-9]{9}$/,
  isCnAndEn: /^[\u4E00-\u9FA5]+$/,
  isCnAndEnAndNum: /^[\u4e00-\u9fa5-a-zA-Z0-9]+$/,
  isUserName: /^[(\u4e00-\u9fa5)a-zA-Z]+$/,
  isPassword: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
  isAuthCode: /^[0-9]{6}$/,
  isTelAndMobile: /^(1[3|4|5|7|8][\d]{9}|0[\d]{2,3}-[\d]{7,8}|400[-]?[\d]{3}[-]?[\d]{4})$/,
}

// 校验规则
const validator = {
  /**
   * 执行正则表达式
   * @param pattern 校验的正则表达式
   * @param strValue 校验的值
   * @returns {boolean}
   */
  executeExp: function (pattern, strValue) {
    return pattern.test(strValue);
  },
  /**
   * 判断字符串是否为空
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isEmpty: function (strValue) {
    strValue = (strValue||"").replace(Pattern.isEmpty, '');
    return strValue.length == 0;
  },
  /**
   * 判断字符串是否非空
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isNotEmpty: function (strValue) {
    return !this.isEmpty(strValue)
  },
  /**
   * 判断是否为中文
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isCnAndEn: function (strValue) {
    if (this.isEmpty(strValue))
      return false;

    return this.executeExp(Pattern.isCnAndEn, strValue);
  },
  /**
   * 判断是否为中英文、数字及'-'
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isCnAndEnAndNum: function (strValue) {
    if (this.isEmpty(strValue))
      return false;

    return this.executeExp(Pattern.isCnAndEnAndNum, strValue);
  },
  /**
   * 判断是否为用户名
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isUserName: function (strValue) {
    if (this.isEmpty(strValue))
      return false;

    return this.executeExp(Pattern.isUserName, strValue);
  },
  /**
   * 判断验证码格式
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isAuthCode: function (strValue) {
    if (this.isEmpty(strValue))
      return false;
    return this.executeExp(Pattern.isAuthCode, strValue);
  },
  /**
   * 判断是否为手机号码
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isMobile: function (strValue) {
    if (this.isEmpty(strValue))
      return false;
    return this.executeExp(Pattern.isMobile, strValue);
  },
  /**
   * 判断是否为手机或电话号码
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isTelAndMobile: function (strValue) {
    if (this.isEmpty(strValue))
      return false;
    return this.executeExp(Pattern.isTelAndMobile, strValue);
  },
  /**
   * 判断是否符合密码规则
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isPassword: function (strValue) {
    if (this.isEmpty(strValue))
      return false;
    return this.executeExp(Pattern.isPassword, strValue);
  },
  /**
   * 对象是否为空
   * @param obj 检验对象
   * @returns {boolean}
   */
  isEmptyObj: (obj) => {
    return Object.keys(obj).length === 0
  },
  /**
   * 是否在范围长度内
   * @param 范围数组 [1, 10] 长度在1-10内
   * @returns {boolean}
   */
  isLenRange: (strValue, lenArr) => {
    return strValue.length >= lenArr[0] && strValue.length <= lenArr[1]
  },
  /**
   * 是否在数值范围内
   * @param 范围数组 [1, 10] 数值在1-10内
   * @returns {boolean}
   */
  isNumRange: (numValue, numArr) => {
    return numValue >= numArr[0] && numValue <= numArr[1]
  }
}

// h5-native
// const cashbox = {
//   /**
//    * 调用钱盒Native方法
//    * @param methodName - 方法名
//    * @param paramMap - 参数
//    * @param cb - 响应回调
//    * @param flag - 该参数用来标识是否删除页面多余的iframe
//    *
//    */
//   callNative(methodName, paramMap, cb, flag) {
//     var isAndroid = -1 !== navigator.userAgent.toLowerCase().indexOf("android");
//     //android js bridge
//     !function (undefined) {
//       var NAMESPACE = 'iBoxpay';
//       var API_NAMESPACE = "__JSBridge__"
//       var context = window[NAMESPACE] = {};
//       var api = window[API_NAMESPACE] || null;
//       if (!api) {
//         return;
//         //return alert('发生错误, 未找到 api 对象!');
//       }
//       context.require = function (cmd, params, callback) {
//         params = params || '{}';
//         var result = api.require(cmd, JSON.stringify(params));
//         if (callback && result) {
//           result = JSON.parse(result);
//           callback(result);
//         }
//       }
//     }();
//     var callbackName = 'cb' + (new Date().getTime());
//     paramMap == null ? paramMap = {} : paramMap = paramMap;
//     paramMap["callbackName"] = callbackName;
//     //paramMap["myCallback"]=cb;
//     var strJsonParam = JSON.stringify(paramMap);
//     var jsonResp = {};
//     window[callbackName] = function (strResp) {
//       //alert("回调:"+JSON.stringify(strResp));
//       try {
//         jsonResp = typeof strResp == "string" ? eval(strResp) : strResp;
//       } catch (err) {
//       }
//       cb && cb(jsonResp);
//       //执行回调后，删除跟回调方法相关的资源
//       if (isAndroid) {
//         if (flag) {
//         } else {
//           delete window[callbackName];
//         }
//       } else {
//         document.getElementById('iframe_' + callbackName).remove();
//         // $('#iframe_' + callbackName).remove();
//       }
//     };
//     if (isAndroid) {
//       try {
//         iBoxpay.require(methodName, paramMap, window[callbackName]);
//       } catch (err) {
//         console.log(err);
//       }
//     } else {
//       var src = 'callfunction://' + methodName + '?callback=' + callbackName + '&params=' + strJsonParam;
//       var ifreame = document.createElement("iframe");
//       ifreame.id = "iframe_" + callbackName;
//       ifreame.src = src;
//       ifreame.style.display = "none";
//       document.body.appendChild(ifreame);
//     }
//   },
//   go(url) {
//       this.callNative('WebView.create', {url:url}, function(res) {});
//   },
//   // 退出钱盒
//   exit() {
//       this.callNative('WebView.close', {}, function(res) {});
//   }
// }

// 安全加密
const security = {

  /**
   * 通过RSA加密
   * @param val
   * @returns {string}
   */
  encryptByRSA(val) {
    var encrypt = new JSEncrypt();

    // 设置密钥
    encrypt.setPublicKey(
      "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEF64RKjCjwkX9gBwJxEphID8IoaCdViAr" +
      "154jWCgqSFXN7/j9ItoyP6lLYR7Q0+r/rExleh2T20Jm2xplX32QQ1GmLJSiin3BPluuJK5k" +
      "Gsh5BmGIN6a+xXwDYFLg50++00uG6/V4gxM7QZVL5yuAm3pL6jrhBk3w4D3MTeQmOwIDAQAB"
    );

    return encrypt.encrypt(val);
  },

  /**
   * 使用DES对称加密
   * @param rsa
   * @param key
   * @returns {string}
   */
  encryptByDES(rsa, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.AES.encrypt(rsa, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  },

  /**
   * 使用DES对称解密
   * @param ciphertext
   * @param key
   * @returns {string}
   */
  decryptByDES(ciphertext, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);

    // direct decrypt ciphertext
    var decrypted = CryptoJS.AES.decrypt({
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}

// 实用工具类
const helper = {
  /**
   * 将元为单位且保留两位小数的浮点数子或字符串转换为分
   * 例如："0.3, 1.03, 1.3" => 30, 103, 130
   * @returns {String}
   * @constructor
   */
  Yfen(num) {
    var numStr = Number(num).toFixed(2) + "";
    return parseInt(numStr.replace(/^(\d+)\.?(\d)?(\d)?$/g, "$1$2$3")) + "";
  },
  
	/**
	 * 设置本地缓存
	 * @param key
	 * @param val
	 * @return {string} 如果终端设备不支持sessionStorage则用URL传递参数
	 */
	setStorage(key, val) {
		if (key === QP_DB) {
			if (val === false) {
				localStorage.removeItem(QP_DB);
			} else {
				localStorage.setItem(key, JSON.stringify(val));
			}
			return;
		}

		var DB = JSON.parse(localStorage.getItem(QP_DB) || "{}");
		val = $.isPlainObject(val) ? JSON.stringify(val) : val;
		val = util.encryptByDES(val, key);
		DB[key] = val;

		this.setStorage(QP_DB, DB);

		/*if(window.sessionStorage) {
		 sessionStorage.setItem(key, val);
		 } else {
		 url += key+"?"+ (key=='userId'?'userId':'params') +"="+val;
		 }
		 return url;*/
		//return { status:1, data:{} }
	},

	/**
	 * 获取session
	 * @param key
	 */
	getStorage(key) {
		var DB = JSON.parse(localStorage.getItem(QP_DB) || "{}"),
			val = DB[key]; //window.sessionStorage? sessionStorage.getItem(key):util.getURLParam("params");

		val && (val = util.decryptByDES(val, key));
		val = /^\{.*\}$/g.test(val) ? JSON.parse(val) : val;

		return val;
	},

	/**
	 * 解析URL参数
	 * @param {string} name URL的参数名
	 * @returns {string}
	 * @example
	 *  util.getURLParam("param1") //decodeURIComponent
	 */
	getURLParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null) return decodeURI(r[2]);
		return ""; //返回参数值
	}

}

export default {
  validator,
  security,
  helper
}
