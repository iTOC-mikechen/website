// JavaScript Document

/**★★★网页前端通用JS★★★**/
/**★Mike Chen Builder★**/


/**基本工具函数**/

/*查找字符串*/
function findString(SourceString, findKeyword, onlyStrict) {
	"use strict";
	if (onlyStrict !== true && onlyStrict !== false) {
		onlyStrict = false;
	}

	var finalString = "";

	var tolower1 = SourceString.toLowerCase(); //源字符串转小写
	var tolower2 = findKeyword.toLowerCase(); //查找关键字转小写
	if (onlyStrict === true) {
		var extccc = "";
		for (var icc = 0; icc < SourceString.length; icc++) {
			extccc = tolower1.substr(icc, findKeyword.length);
			if (extccc === findKeyword) {
				finalString = SourceString.substr(icc, findKeyword.length);
				break;
			}
		}
	} else {
		var extccx = "";
		for (var occ = 0; occ < tolower1.length; occ++) {
			extccx = tolower1.substr(occ, tolower2.length);
			if (extccx === tolower2) {
				finalString = SourceString.substr(occ, findKeyword.length);
				break;
			}
		}
	}
	return finalString;
}

/*查找字符串*/

/*网络地址域名替换*/
function networkAddressReplace(SourceAddress) {
	"use strict";
	var getProtocolHeader = ""; //获得网络地址协议
	var getFromDomain = ""; //获得原有域名
	var getPortNumber = ""; //获得原有端口号
	var getResourceAddr = ""; //获得原有资源地址

	var finalNetworkAddress = ""; //最终处理后的网络地址

	var temp1 = ""; //临时提取存储器
	var temp2 = ""; //临时提取存储器

	if (findString(SourceAddress, "http://") === "http://") {
		getProtocolHeader = findString(SourceAddress, "http://");
		temp1 = SourceAddress.substr(getProtocolHeader.length); //提取去掉协议头部后的数据
		getFromDomain = temp1.substr(0, temp1.indexOf('/')); //提取原有域名
		getPortNumber = getFromDomain.substr((getFromDomain.indexOf(':') + 1)); //提取端口号
		getResourceAddr = temp1.substr((temp1.indexOf('/') + 1));
	}

	if (findString(SourceAddress, "https://") === "https://") {
		getProtocolHeader = findString(SourceAddress, "https://");
		temp2 = SourceAddress.substr(getProtocolHeader.length); //提取去掉协议头部后的数据
		getFromDomain = temp2.substr(0, temp2.indexOf('/')); //提取原有域名
		getPortNumber = getFromDomain.substr((getFromDomain.indexOf(':') + 1)); //提取端口号
		getResourceAddr = temp2.substr((temp2.indexOf('/') + 1));
	}

	finalNetworkAddress = getProtocolHeader + window.location.host + "/" + getResourceAddr;
	return finalNetworkAddress;
}

/*网络地址域名替换*/

/*随机字符串生成工具*/
function randomStringMaker(AssignMakeLength) {
	"use strict"; //启用严格模式
	var StringLibrary = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()-=[]{}\\|:;'\"/?,.<>`+_"; //数字、英文字母大小写字符库
	var SaveFinalMakeString = ""; //保存最终生成字符串
	var RandomCharacterSelectIndex = 0; //随机字符选择索引
	var DefaultLength = 7; //默认生成长度、当AssignMakeLength未指定或为0或undefined时，启用
	if (AssignMakeLength <= 0 || AssignMakeLength === "" || AssignMakeLength === undefined) {
		AssignMakeLength = DefaultLength; //赋值形参默认生成长度
	}
	//开始使用for循环生成随机字符
	for (var i = 0; i < AssignMakeLength; i++) {
		RandomCharacterSelectIndex = parseInt(93 * Math.random()); //随机生成整数型字符索引号
		SaveFinalMakeString = SaveFinalMakeString + StringLibrary.charAt(RandomCharacterSelectIndex); //从字符库选取字符并累加到最终生成字符串
	}
	return SaveFinalMakeString; //返回最终结果
}

/*随机字符串生成工具*/

/*随机字符串生成工具Ex*/
function randomStringMakerEx(ParameterObject) {
	"use strict";
	//字符库定义
	var lowerCaselibrary = "abcdefghijklmnopqrstuvwxyz"; //小写字母
	var upperCaselibrary = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //大写字母
	var engSymbol = "~!@#$%^&*()-=[]{}\\|:;'\"/?,.<>`+_"; //英文标点符号
	var numberSymbolText = "0123456789"; //数字字符
	var genericLibrary = lowerCaselibrary + upperCaselibrary + engSymbol + numberSymbolText;
	//字符库定义

	//参数对象属性
	var makeLength = 0; //初始生成长度
	var enableLowerEngText = false; //启用小写字母
	var enableUpperEngText = false; //启用大写字母
	var enableEngSymbol = false; //启用英文标点符号
	var enableNumberText = false; //启用数字字符
	//参数对象属性

	//函数的运行状态
	var execAttrcheck = true; //启用属性检查循环
	var parameterError = false; //记录参数对象是否有错
	var finalmake = ""; //最终生成
	//函数的运行状态

	if (ParameterObject === undefined) {
		//判断形参对象是否为空
		execAttrcheck = false; //阻止下面的for循环的执行
		makeLength = 7; //赋予默认生成长度
	}

	for (var attrName in ParameterObject) {
		if (execAttrcheck === false) {
			break;
		}
		//此循环开始遍历ParameterObject对象里的所有属性，并赋值到变量
		switch (attrName) {
			case "BuilderLength":
				makeLength = ParameterObject[attrName];
				break;
			case "EnableUpperEng":
				enableUpperEngText = ParameterObject[attrName];
				break;
			case "EnableLowerEng":
				enableLowerEngText = ParameterObject[attrName];
				break;
			case "EnableEngSymbol":
				enableEngSymbol = ParameterObject[attrName];
				break;
			case "EnableNumberText":
				enableNumberText = ParameterObject[attrName];
				break;
			default:
				//如果出现未知的属性名
				parameterError = true;
				break;
		}
		if (parameterError === true) {
			break;
		} //如果parameterError为true，终止循环
	}

	if (makeLength <= 0 || parameterError === true) {
		//判断是否符合条件，如不符合，直接结束本次函数运行
		return null;
	}

	//开始循环随机生成

	while (true) {
		if (enableLowerEngText === true) {
			finalmake = finalmake + lowerCaselibrary.charAt(parseInt(Math.random() * 26));
		}
		if (enableUpperEngText === true) {
			finalmake = finalmake + upperCaselibrary.charAt(parseInt(Math.random() * 26));
		}
		if (enableEngSymbol === true) {
			finalmake = finalmake + engSymbol.charAt(parseInt(Math.random() * 32));
		}
		if (enableNumberText === true) {
			finalmake = finalmake + numberSymbolText.charAt(parseInt(Math.random() * 10));
		}
		if (!enableEngSymbol && !enableLowerEngText && !enableUpperEngText && !enableNumberText) {
			finalmake = finalmake + genericLibrary.charAt(parseInt(Math.random() * 94));
		}
		if (finalmake.length >= makeLength) {
			finalmake = finalmake.substr(1, makeLength);
			break;
		}
	}
	return finalmake; //返回最终得到的结果
}

/*随机字符串生成工具Ex*/

/*随机数字生成工具*/
function randomNumberMaker(AssignMakeRange) {
	"use strict";
	var FinalMakeNumber = 0;
	if (AssignMakeRange === undefined || AssignMakeRange === "" || AssignMakeRange === 0) {
		AssignMakeRange = 1001; //默认的随机数字生成范围
		FinalMakeNumber = Math.random() * AssignMakeRange; //生成随机数字
	} else {
		FinalMakeNumber = Math.random() * AssignMakeRange; //生成随机数字
	}
	return FinalMakeNumber; //返回结果
}

/*随机数字生成工具*/

/*随机颜色生成工具集*/

/*随机颜色生成工具*/
function randomColorMaker(EnableAlphaColor, ColorType) {
	"use strict";
	//Alpha值
	var AlphaNum = 1;
	AlphaNum = AlphaNum.toFixed(2);
	//Alpha值

	//RGB颜色数据组
	var redNum = 0; //红色数
	var greNum = 0; //绿色数
	var bluNum = 0; //蓝色数
	//RGB颜色数据组

	//HS(L、V)颜色数据组
	var hueNum = 0; //色相数
	var satNum = 0; //饱和数
	var lneNum = 0; //明度数
	var bneNum = 0; //亮度数
	//HS(L、V)颜色数据组

	//最终生成的颜色数组字符串
	var rgbtype = "";
	var hsltype = "";
	var hsvtype = "";
	//最终生成的颜色数组字符串

	//最终要返回的颜色数据
	var finalColorData = "";
	//最终要返回的颜色数据

	//处理两个形参的无接收到数值、为空的问题
	if (ColorType === "" || ColorType === undefined) {
		ColorType = 'rgb';
	}
	if (EnableAlphaColor === "" || EnableAlphaColor === undefined) {
		EnableAlphaColor = false;
	}
	//处理两个形参的无接收到数值、为空的问题

	//根据EnableAlphaColor是否为true or false
	if (EnableAlphaColor === true) {
		AlphaNum = Math.random().toFixed(2); //随机生成Alpha的数值，保留两位小数
	}
	//根据EnableAlphaColor是否为true or false

	//根据ColorType选择生成分支
	ColorType = ColorType.toLowerCase(); //转换全小写，以便判断

	switch (ColorType) {
		case "rgb":
			redNum = parseInt(Math.random() * 255 + 1);
			greNum = parseInt(Math.random() * 255 + 1);
			bluNum = parseInt(Math.random() * 255 + 1);
			if (EnableAlphaColor === true) {
				rgbtype = "rgba(" + redNum + "," + greNum + "," + bluNum + "," + AlphaNum + ")";
			} else {
				rgbtype = "rgb(" + redNum + "," + greNum + "," + bluNum + ")";
			}
			break;
		case "hsl":
			hueNum = parseInt(Math.random() * 360 + 1);
			satNum = (parseInt(Math.random().toFixed(2) * 100) + "%");
			lneNum = (parseInt(Math.random().toFixed(2) * 100) + "%");
			if (EnableAlphaColor === true) {
				hsltype = "hsla(" + hueNum + "," + satNum + "," + lneNum + "," + AlphaNum + ")";
			} else {
				hsltype = "hsl(" + hueNum + "," + satNum + "," + lneNum + ")";
			}
			break;
		case "hsv":
			hueNum = parseInt(Math.random() * 360 + 1);
			satNum = (parseInt(Math.random().toFixed(2) * 100) + "%");
			bneNum = (parseInt(Math.random().toFixed(2) * 100) + "%");
			if (EnableAlphaColor === true) {
				hsvtype = "hsva(" + hueNum + "," + satNum + "," + bneNum + "," + AlphaNum + ")";
			} else {
				hsvtype = "hsv(" + hueNum + "," + satNum + "," + bneNum + ")";
			}
			break;
		default:
			finalColorData = null;
			break;
	}
	switch (ColorType) {
		case "rgb":
			finalColorData = rgbtype;
			break;
		case "hsl":
			finalColorData = hsltype;
			break;
		case "hsv":
			finalColorData = hsvtype;
			break;
		default:
			finalColorData = null;
			break;
	}
	return finalColorData;
}

/*随机颜色生成工具*/

/*随机颜色生成工具集*/

/**计算任意参数之和**/
function sum() {
	"use strict";
	var sum = 0;
	for (var i = 0; i < arguments.length; i++) {
		sum += arguments[i];
	}
	// 把结果返回出去
	return sum;
}

/**计算任意参数之和**/

/**计算任意参数之和Ex版**/
function sumEx() {
	"use strict";
	var finalvalues = 0; /**最终结果存储器**/
	switch (arguments[0]) {
		case '+':
			for (var addcout = 1; addcout < arguments.length; addcout++) {
				finalvalues += arguments[addcout];
			}
			break;
		case '-':
			finalvalues = arguments[1];
			for (var deccout = 1; deccout < arguments.length; deccout++) {
				finalvalues -= arguments[deccout];
			}
			break;
		case '*':
			finalvalues = arguments[1];
			for (var xscout = 1; xscout < arguments.length; xscout++) {
				finalvalues *= arguments[xscout];
			}
			break;
		case '/':
			finalvalues = arguments[1];
			for (var qscout = 1; qscout < arguments.length; qscout++) {
				finalvalues /= arguments[qscout];
			}
			break;
		default:
			for (var i = 0; i < arguments.length; i++) {
				finalvalues += arguments[i];
			}
			break;
	}
	return finalvalues;
}

/**计算任意参数之和Ex版**/

/**查找最大值**/
function maxNum() {
	"use strict";
	var max = arguments[0];
	for (var i = 0; i < arguments.length; i++) {
		if (arguments[i] > max) {
			max = arguments[i];
		}
	}
	return max;
}

/**查找最大值**/

/**查找最小值**/
function minNum() {
	"use strict";
	var min = arguments[0];
	for (var i = 0; i < arguments.length; i++) {
		if (arguments[i] < min) {
			min = arguments[i];
		}
	}
	return min;
}

/**查找最小值**/

/**以特定时间日期格式返回当前时间日期**/
function getCusFmtTimeDate(dateFmt, timeFmt, weekFmt) {
	"use strict";
	var datetime = new Date();
	var EngWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var ChsWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

	/**最终拼合**/
	var finaldateFmt = "";
	var finaltimeFmt = "";
	var finalweekFmt = "";
	/**最终拼合**/

	/**参数表示符**/
	var paret1 = "";
	var paret2 = "";
	var paret3 = "";
	/**参数表示符**/

	/**临时数据存储块**/
	var tempsave1 = "";
	var tempsave2 = "";
	var tempsave3 = "";
	/**临时数据存储块**/

	/**锁定器**/
	var genicfmtd1 = false;
	var genicfmtd2 = false;
	var genicfmtd3 = false;
	/**锁定器**/

	/*日期处理*/
	if (dateFmt === "" || dateFmt === undefined) {
		dateFmt = "yyyy/mm/dd"; //设置默认值
	}
	for (var ione = 0; ione <= dateFmt.length; ione++) {
		/**年份标识符处理**/
		if (dateFmt.charAt(ione) === 'y' || dateFmt.charAt(ione) === "Y") {
			//符合条件的
			paret1 = paret1 + dateFmt.charAt(ione); //拼接字符，获得标识符串，用以获取长度
			genicfmtd1 = true; //锁定器解锁
		} else {
			if (genicfmtd1 === true) {
				tempsave1 = tempsave1 + datetime.getFullYear(); //读取系统中的年份数据
				tempsave1 = tempsave1.substr(tempsave1.length - paret1.length); //根据paret1的长度数来裁剪需要的数据
				if (dateFmt.charAt(ione) !== "" && dateFmt.charAt(ione) !== undefined) {
					//判断是否还有字符，有就拼接进去
					tempsave1 = tempsave1 + dateFmt.charAt(ione);
				}
				finaldateFmt = finaldateFmt + tempsave1; //把已经裁剪好的数据拼接赋值到finaldateFmt
				paret1 = ""; //清空参数表示块
				tempsave1 = ""; //清空临时存储块
				genicfmtd1 = false; //锁定器锁定
			}
		}
		/**年份标识符处理**/

		/**月份标识符处理**/
		if (dateFmt.charAt(ione) === 'm' || dateFmt.charAt(ione) === "M") {
			paret2 = paret2 + dateFmt.charAt(ione);
			genicfmtd2 = true;
		} else {
			if (genicfmtd2 === true) {
				tempsave2 = tempsave2 + (datetime.getMonth() + 1);
				tempsave2 = tempsave2.substr(2 - paret2.length);
				if (dateFmt.charAt(ione) !== "" && dateFmt.charAt(ione) !== undefined) {
					tempsave2 = tempsave2 + dateFmt.charAt(ione);
				}
				finaldateFmt = finaldateFmt + tempsave2;
				paret2 = "";
				tempsave2 = "";
				genicfmtd2 = false;
			}
		}
		/**月份标识符处理**/

		/**日期标识符处理**/
		if (dateFmt.charAt(ione) === 'd' || dateFmt.charAt(ione) === 'D') {
			paret3 = paret3 + dateFmt.charAt(ione);
			genicfmtd3 = true;
		} else {
			if (genicfmtd3 === true) {
				tempsave3 = tempsave3 + datetime.getDate();
				tempsave3 = tempsave3.substr(tempsave3.length - paret3.length);
				if (dateFmt.charAt(ione) !== "" && dateFmt.charAt(ione) !== undefined) {
					tempsave3 = tempsave3 + dateFmt.charAt(ione);
				}
				finaldateFmt = finaldateFmt + tempsave3;
				paret3 = "";
				tempsave3 = "";
				genicfmtd3 = false;
			}
		}
		/**日期标识符处理**/
	}
	/*日期处理*/

	/*时间处理*/
	if (timeFmt === "" || timeFmt === undefined) {
		timeFmt = "HH:MM";
	}
	for (var itwo = 0; itwo <= timeFmt.length; itwo++) {

		if (timeFmt.charAt(itwo) === "h" || timeFmt.charAt(itwo) === "H") {
			paret1 = paret1 + timeFmt.charAt(itwo);
			genicfmtd1 = true;
		} else {
			if (genicfmtd1 === true) {
				tempsave1 = tempsave1 + datetime.getHours();
				tempsave1 = tempsave1.substr(tempsave1.length - paret1.length);
				if (timeFmt.charAt(itwo) !== "" && timeFmt.charAt(itwo) !== undefined) {
					tempsave1 = tempsave1 + timeFmt.charAt(itwo);
				}
				finaltimeFmt = finaltimeFmt + tempsave1;
				paret1 = "";
				tempsave1 = "";
				genicfmtd1 = false;
			}
		}

		if (timeFmt.charAt(itwo) === "m" || timeFmt.charAt(itwo) === "M") {
			paret2 = paret2 + timeFmt.charAt(itwo);
			genicfmtd2 = true;
		} else {
			if (genicfmtd2 === true) {
				tempsave2 = tempsave2 + datetime.getMinutes();
				tempsave2 = tempsave2.substr(tempsave2.length - paret2.length);
				if (timeFmt.charAt(itwo) !== "" && timeFmt.charAt(itwo) !== undefined) {
					tempsave2 = tempsave2 + timeFmt.charAt(itwo);
				}
				finaltimeFmt = finaltimeFmt + tempsave2;
				paret2 = "";
				tempsave2 = "";
				genicfmtd2 = false;
			}
		}

		if (timeFmt.charAt(itwo) === "s" || timeFmt.charAt(itwo) === "S") {
			paret3 = paret3 + timeFmt.charAt(itwo);
			genicfmtd3 = true;
		} else {
			if (genicfmtd3 === true) {
				tempsave3 = tempsave3 + datetime.getSeconds();
				tempsave3 = tempsave3.substr(tempsave3.length - paret3.length);
				if (timeFmt.charAt(itwo) !== undefined && timeFmt.charAt(itwo) !== "") {
					tempsave3 = tempsave3 + timeFmt.charAt(itwo);
				}
				finaltimeFmt = finaltimeFmt + tempsave3;
				paret3 = "";
				tempsave3 = "";
				genicfmtd3 = false;
			}
		}
	}
	/*时间处理*/

	/**星期的处理**/
	if (weekFmt === "" || weekFmt === undefined || weekFmt === "Eng") {
		finalweekFmt = EngWeek[datetime.getDay()];
	} else if (weekFmt === "Chs") {
		finalweekFmt = ChsWeek[datetime.getDay()];
	}
	/**星期的处理**/

	return finaldateFmt + " " + finaltimeFmt + " " + finalweekFmt;
}

/**以特定时间日期格式返回当前时间日期**/

/**Cookie相关的工具集**/
/*设置Cookie*/
function setCookieMsg(keyName, keyValue, timeLimit) {
	"use strict";
	if (keyName === null || keyName === "" || keyName === undefined || keyValue === null || keyValue === undefined || keyValue === "") {
		return null;
	}
	if (timeLimit === null || timeLimit === undefined || timeLimit === "") {
		document.cookie = keyName + "=" + keyValue;
	} else {
		var clientx = new Date();
		var getss = clientx.getTime();
		getss = getss - (8 * 60 * 60 * 1000);
		getss = getss + (timeLimit * 60 * 1000);
		clientx.setTime(getss);
		document.cookie = (keyName + "=" + keyValue + ";" + "expires=" + clientx);
	}
}
/*设置Cookie*/

/*获取Cookie*/
/*获取Cookie信息为字符串或数组*/
function getCookieNrL(splits) {
	"use strict";
	var cookieSource = "";
	if (splits === null || splits === undefined || splits === "") {
		cookieSource = document.cookie;
	} else {
		cookieSource = document.cookie;
		cookieSource = cookieSource.split(splits);
	}
	return cookieSource;
}
/*获取Cookie信息为字符串或数组*/

/*获取Cookie信息为对象*/
function getCookieObj() {
	"use strict";
	var finalObj = {};
	var cookieGroup = getCookieNrL("; ");
	for (var i = 0; i < cookieGroup.length; i++) {
		var icc = cookieGroup[i].split("=");
		finalObj[icc[0]] = icc[1];
	}
	return finalObj;
}
/*获取Cookie信息为对象*/
/*获取Cookie*/
/**Cookie相关的工具集**/

/**JSON工具集**/

/*JSON、对象数据相互转换*/
function jsonOrXobject(ParameterDataObj) {
	"use strict";
	var JSONstring = ""; //最终转换的JSON字符串
	var ObjectData = {}; //最终转换的对象数据链

	if (Object.prototype.toString.call(ParameterDataObj) === '[object Object]') {
		if (ParameterDataObj.toConversion === "json") {
			if (Object.prototype.toString.call(ParameterDataObj.DataSource) === '[object Object]') {
				for (var atrName in ParameterDataObj.DataSource) {}
			} else {
				throw new Error("形参参数的数据源属性(DataSource)带来的数据源,不是对象！");
			}
		} else if (ParameterDataObj.toConversion === "object") {
			if (Object.prototype.toString.call(ParameterDataObj.DataSource) === '[object String]') {
				if ((ParameterDataObj.DataSource.charAt(0) === "{") && (ParameterDataObj.DataSource.charAt(ParameterDataObj.DataSource.length - 1) === "}") && (ParameterDataObj.DataSource.charAt(0) === ",") && (ParameterDataObj.DataSource.charAt(0) === "\"")) {

				} else {
					throw new Error("形参参数的数据源属性(DataSource)带来的数据源,不是JSON格式的！");
				}
			} else {
				throw new Error("形参参数的数据源属性(DataSource)带来的数据源,不是字符串！");
			}
		} else {
			throw new Error("形参参数的转换属性(toConversion),只能为“json”、“object”。不能为其他的值！");
		}
	} else {
		throw new Error("形参参数必须为对象！");
	}
}
/*JSON、对象数据相互转换*/

/*JSON对象数据设置Cookie*/
function jsonObjDataSetCookie(ParameterDataObj) {
	"use strict";
	var CookieName = ""; //存储获得的Cookies名称
	var CookieValue = ""; //存储获得的Cookies键值
	var timeMsg = ""; //存储获得的Cookies时限

	var FinalArr = new Array(); //最终的数组

	var keyName = ""; //模板项目1
	var keyValue = ""; //模板项目2
	var timeLimit = ""; //模板项目3

	if (Object.prototype.toString.call(ParameterDataObj) === '[object Object]') {
		if (Object.prototype.toString.call(ParameterDataObj.DataSource) === '[object Object]' && Object.prototype.toString.call(ParameterDataObj.CorrespondTemplate) === '[object Object]') {
			//预先读取模板的资料
			keyName = ParameterDataObj.CorrespondTemplate.keyName;
			keyValue = ParameterDataObj.CorrespondTemplate.keyValue;
			timeLimit = ParameterDataObj.CorrespondTemplate.timeLimit;
			//预先读取模板的资料

			CookieName = ParameterDataObj.DataSource[keyName];
			CookieValue = ParameterDataObj.DataSource[keyValue];
			timeMsg = ParameterDataObj.DataSource[timeLimit];

			switch (ParameterDataObj.opExecWay) {
				case "retArrWithoutSetCookie":
					FinalArr[0] = CookieName;
					FinalArr[1] = CookieValue;
					FinalArr[2] = timeMsg;
					break;
				case "setCookieNotRetArr":
					setCookieMsg(CookieName, CookieValue, timeMsg);
					break;
				default:
					throw new Error("参数错误，没有此选项！");
			}
		} else {
			throw new Error("参数数据对象错误");
		}
	} else {
		throw new Error("参数必须是对象！");
	}
	if (ParameterDataObj.opExecWay === "retArrWithoutSetCookie") {
		return FinalArr;
	}
}
/*JSON转对象数据设置Cookie*/

//var models = {};
//models.keyName = "loginName";
//models.keyValue = "loginPswd";
//models.timeLimit = "SessionTime";
//
//var tecc = {};
//tecc.DataSource = {
//	loginName: "mikechen",
//	loginPswd: "itoc",
//	SessionTime: 1
//};
//tecc.opExecWay = "setCookieNotRetArr";
//tecc.CorrespondTemplate = models;
//
//console.log(jsonObjDataSetCookie(tecc));
/**JSON工具集**/


/**AJAX相关工具集**/
function ajaxConnectRequest(ConnectConfData) {
	"use strict";
	var tipsmsg = false; //正常提示信息，默认为false不显示
	var detErr = false; //错误检测，默认为false
	var finalAsync = false; //最终确认是否异步请求
	var noUseCallback = false; //不使用回调函数，默认为false使用回调函数
	var connectPoint = null; //AJAX控制节点
	var finalGetData = "";
	//检测部分
	for (var attrName in ConnectConfData) {
		if (detErr) {
			break;
		}
		if (ConnectConfData['showNrlTips'] === undefined || ConnectConfData['showNrlTips'] === "" || ConnectConfData['showNrlTips'] === null) {
			ConnectConfData.showNrlTips = false; //默认不显示正常的提示信息
			tipsmsg = ConnectConfData['showNrlTips'];
		} else if (ConnectConfData['showNrlTips'] !== true || ConnectConfData['showNrlTips'] !== false) {
			tipsmsg = ConnectConfData['showNrlTips'];
		} else {
			ConnectConfData.showNrlTips = false; //默认不显示正常的提示信息
		}
		switch (attrName) {
			case "showNrlTips":
				tipsmsg = ConnectConfData[attrName];
				break;
			case "URL":
				if (!ConnectConfData[attrName]) {
					detErr = true;
					throw new Error("网络资源地址(URL)不能为空，必须要填写完整！");
				} else {
					if (tipsmsg) {
						console.log("URL没有问题");
					}
				}
				break;
			case "Method":
				if (ConnectConfData[attrName] === "post" || ConnectConfData[attrName] === "get") {
					if (tipsmsg) {
						console.log("Method没有问题");
					}
				} else {
					detErr = true;
					throw new Error("请求的方法(Method)不能为其他的，必须要为POST或GET这两种！");
				}
				break;
			case "AsyncRequest":
				if (ConnectConfData[attrName] === true || ConnectConfData[attrName] === false) {
					finalAsync = ConnectConfData[attrName];
					if (tipsmsg) {
						console.log("AsyncRequest没有问题");
					}
				} else {
					detErr = true;
					throw new Error("异步请求(AsyncRequest)属性的值只能为True或False，不能为其他的值！");
				}
				break;
			case "NoCallbackFunction":
				if (ConnectConfData[attrName] === true || ConnectConfData[attrName] === false) {
					noUseCallback = ConnectConfData[attrName];
					if (tipsmsg) {
						console.log("NoCallbackFunction没有问题");
					}
				} else {
					detErr = true;
					throw new Error("无回调函数(NoCallbackFunction)属性的值只能为True或False，不能为其他的值！");
				}
				break;
			case "CallbackFunction":
				if (!noUseCallback) {
					if (!ConnectConfData[attrName] || Object.prototype.toString.call(ConnectConfData[attrName]) !== '[object Function]') {
						detErr = true;
						throw new Error("回调函数属性(CallbackFunction)的值的函数名不存在实体或回调函数属性(CallbackFunction)的值不是函数！");
					} else {
						if (tipsmsg) {
							console.log("CallbackFunction没有问题");
						}
					}
				}
				break;
			case "TaRdata":
				if (Object.prototype.toString.call(ConnectConfData[attrName]) === '[object String]' || Object.prototype.toString.call(ConnectConfData[attrName]) === '[object Object]') {
					if (Object.prototype.toString.call(ConnectConfData[attrName]) === '[object Object]') {
						var finalProc = ""; //最终处理
						for (var keys in ConnectConfData[attrName]) {
							finalProc = finalProc + keys + "=" + ConnectConfData[attrName][keys] + "&";
						}
						ConnectConfData[attrName] = finalProc.substr(0, finalProc.length - 1);
						if (tipsmsg) {
							console.log("TaRdata没有问题");
						}
					} else if (Object.prototype.toString.call(ConnectConfData[attrName]) === '[object String]' && (ConnectConfData[attrName].indexOf('=') >= 0) === false) {
						detErr = true;
						throw new Error("传递数据属性(TaRdata)的内容格式只能为属性名=属性值(Key=value)！");
					}
				} else {
					detErr = true;
					throw new Error("传递数据属性(TaRdata)的内容只能为key=value&key=value 或者 {key:value}");
				}
				break;
			default:
				detErr = true;
				throw new Error("属性存在错误或未知属性，程序无法识别！");
		}
	}
	if (detErr) {
		return null; //如果检测到函数错误为真，直接停止
	}
	//检测部分

	try {
		//适用Internet Explorer内核
		connectPoint = new ActiveXObject('Microsoft.XMLHTTP');
		finalAsync = false; //取消异步
	} catch (e) {
		//适用chrome内核
		connectPoint = new XMLHttpRequest();
	}

	if (ConnectConfData.Method.toLowerCase() === "get") {
		connectPoint.open(ConnectConfData.Method.toLowerCase(), ConnectConfData.URL + (ConnectConfData.TaRdata ? '?' + ConnectConfData.TaRdata : ''), finalAsync);
		connectPoint.send();
	} else if (ConnectConfData.Method.toLowerCase() === "post") {
		connectPoint.open((ConnectConfData.Method.toLowerCase()), ConnectConfData.URL, finalAsync);
		connectPoint.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		connectPoint.send(ConnectConfData.TaRdata);
	}

	if (finalAsync) {
		connectPoint.onload = function () {
			if (!noUseCallback) {
				finalGetData = connectPoint.responseText;
			} else {
				ConnectConfData.CallbackFunction(connectPoint.responseText);
			}
		};
	} else {
		if (noUseCallback === true) {
			finalGetData = connectPoint.responseText;
		} else {
			ConnectConfData.CallbackFunction(connectPoint.responseText);
		}
	}
	if (noUseCallback === true) {
		return finalGetData;
	}
}
/**AJAX相关工具集**/

/**Form表单数据转对象**/
function formdataConvObj(formDataSourceObj) {
	"use strict";
	if (formDataSourceObj === null || formDataSourceObj === undefined || Element.prototype.toString.call(formDataSourceObj) !== "[object HTMLFormElement]") {
		alert("你传递的对象不是Form表单");
		return;
	}
	var finalObj = {};
	for (var i = 0; i < formDataSourceObj.elements.length; i++) {
		finalObj[formDataSourceObj.elements.item(i).name] = formDataSourceObj.elements.item(i).value;
	}
	return finalObj;
}
/**Form表单数据转对象**/


/**资料内容转换工具集**/

/*get、post提交数据与对象数据的转换*/
function RequestContentConver(SourceData, ConverType) {
	"use strict";
	var toRequest = false; //转换类型1
	var toObjects = false; //转换类型2

	var FinalObj = {};
	var FinalString = "";

	if (ConverType === null || ConverType === undefined || ConverType === "") {
		ConverType = "toRequestFmt"; //形参无参数值时，默认转网页GET、POST适用的格式数据
	} else {
		switch (ConverType) {
			case "toRequestFmt":
				toRequest = true;
				break;
			case "toObjectsFmt":
				toObjects = true;
				break;
			default:
				throw new Error("你输入的转换类型参数不合法！");
		}
	}
	if (SourceData === null && SourceData === undefined && SourceData === "" && Element.prototype.toString.call(SourceData) !== "[object Object]") {
		throw new Error("数据源形参Source接收到未知的数据，无法运行，请传递字符串或对象");
	} else {
		if (toRequest === true) {
			if (Element.prototype.toString.call(SourceData) === "[object Object]") {
				for (var attrName in SourceData) {
					var str1 = attrName;
					var str2 = SourceData[attrName];
					FinalString = FinalString + str1 + "=" + str2 + "&";
				}
				if (FinalString.charAt(FinalString.length - 1) === "&") {
					FinalString = FinalString.substr(0, (FinalString.length - 1));
				}
				return FinalString;
			} else {
				throw new Error("传递的数据源不是对象");
			}
		}
		if (toObjects === true) {
			if (Element.prototype.toString.call(SourceData) === "[object String]") {
				if ((SourceData.indexOf('=') >= 0) === true && (SourceData.indexOf('?') >= 0) === true && (SourceData.indexOf('&') >= 0) === true) {
					var stdon = 1;
					var betleg = 1; //记录要开始的长度
					var endleng = 0; //记录要结束的长度
					var getAttName = "";
					var getAttValue = "";
					for (; stdon < SourceData.length; stdon++) {
						var Atrs = "";
						var Vals = "";
						if (SourceData.charAt(stdon) === '=') {
							if (betleg <= 1) {
								endleng = stdon;
								Atrs = SourceData.substr(betleg, endleng - 1);
							} else {
								endleng = stdon - betleg;
								Atrs = SourceData.substr(betleg, endleng);
							}
							betleg = stdon + 1;
						}
						if (SourceData.charAt(stdon) === '&') {
							if (betleg <= 1) {
								endleng = stdon;
							} else {
								endleng = stdon - betleg;
							}
							Vals = SourceData.substr(betleg, endleng);
							betleg = stdon + 1;
						}
						if (stdon >= (SourceData.length - 1)) {
							endleng = stdon;
							Vals = SourceData.substr(betleg, endleng);
						}
						if (Atrs !== null && Atrs !== "" && Atrs !== undefined) {
							getAttName = Atrs;
						}
						if (Vals !== null && Vals !== "" && Vals !== undefined) {
							getAttValue = Vals;
						}
						if ((getAttName !== null && getAttName !== undefined && getAttName !== "") && (getAttValue !== null && getAttValue !== undefined && getAttValue !== "")) {
							FinalObj[getAttName] = getAttValue;
						}
					}
					return FinalObj; //返回最终得到的对象数据
				} else {
					throw new Error("字符串格式不正确，必须以 ?key1=value&key2=value 的格式的字符串。");
				}
			} else {
				throw new Error("传递的数据源不是字符串");
			}
		}
	}
}
/*get、post提交数据与对象数据的转换*/

/**资料内容转换工具集**/

/*渲染引擎*/
function renderEngine(SourceData, ParameterObj) {
	"use strict";
	var finalMakeBuider_normalType = ""; //普通模式生成
	var finalMakeBuider_appendType; //追加模式生成

	/**单标签数据**/
	var onlySingleTagData = {};
	onlySingleTagData.img = true;
	onlySingleTagData.input = true;
	/**单标签数据**/

	/*模板数据*/
	var tagType = ""; //渲染的标签类型
	var tagAttr = ""; //行内属性字符串
	var tagInnC = ""; //标签内部数据集
	/*模板数据*/

	//初始检测部分
	/**检测数据源(SourceData)**/
	var SourceDataType = false;
	if (SourceData === null || SourceData === undefined) {
		throw new Error("渲染源数据(SourceData)不能为空，必须是字符串或字符串数组或数据组对象！");
	} else if (Object.prototype.toString.call(SourceData) === '[object Array]' || Object.prototype.toString.call(SourceData) === '[object Object]') {
		SourceDataType = true;
		throw new Error("暂时未支持数组或对象类的数据源，请使用字符串的数据源。");
	} else {
		tagInnC = SourceData;
		SourceDataType = false;
	}
	/**检测数据源(SourceData)**/

	/**检测参数对象(ParameterObj)**/

	if (ParameterObj === null || ParameterObj === undefined) {
		throw new Error("参数数据对象(ParameterDataObj)必须为对象，不能为空！");
	} else if (Object.prototype.toString.call(ParameterObj) !== '[object Object]') {
		throw new Error("参数数据对象(ParameterDataObj)的类型必须为对象，不能为其他的类型！");
	}
	/**检测参数对象(ParameterObj)**/
	//初始检测部分

	var renderMakeBuiderAppendWay = false; //追加渲染生成方式，默认为false，启用普通形式
	var inLineAttrData; //元素行内样式数据

	//遍历模板属性
	for (var AttrName in ParameterObj) {
		switch (AttrName) {
			case "eleTag":
				tagType = ParameterObj[AttrName];
				break;
			case "inLineAttr":
				inLineAttrData = ParameterObj[AttrName];
				if (Object.prototype.toString.call(ParameterObj[AttrName]) === '[object String]' && (ParameterObj[AttrName].indexOf('=') >= 0) === true) {
					tagAttr = inLineAttrData;
				}
				break;
			case "useAppendModel":
				renderMakeBuiderAppendWay = ParameterObj[AttrName];
				break;
			default:
				throw new Error("模板存在未知属性，引擎无法解析！");
		}
	}
	//遍历模板属性

	var isTagSingle = false; //标记当前的标签是否为单标签，默认为false，双标签

	//判断渲染方式选择渲染方式
	if (renderMakeBuiderAppendWay === true) {
		finalMakeBuider_appendType = document.createElement(tagType);
		if (tagAttr !== "") {
			var inlineAttGro = tagAttr.split(" ");
			var pxx = 0;
			do {
				if (inlineAttGro[pxx] !== "" && inlineAttGro[pxx] !== undefined) {
					var poxx = inlineAttGro[pxx];
					var NxV = poxx.split('=');
					var newVa = NxV[1].substr(1, (NxV[1].length - 2));
					finalMakeBuider_appendType.setAttribute(NxV[0], newVa);
				} else {
					break;
				}
				pxx++;
			} while (pxx <= inlineAttGro.length);
		} else {
			for (var atrss in ParameterObj.inLineAttr) {
				if (atrss === "style") {
					if (Object.prototype.toString.call(ParameterObj.inLineAttr[atrss]) === '[object Object]') {
						var makestyval = "";
						for (var styn in ParameterObj.inLineAttr[atrss]) {
							makestyval = makestyval + styn + ":" + (ParameterObj.inLineAttr[atrss][styn]) + ";";
						}
						finalMakeBuider_appendType.setAttribute(atrss, makestyval);
					} else {
						finalMakeBuider_appendType.setAttribute(atrss, ParameterObj.inLineAttr[atrss]);	
					}
				} else {
					finalMakeBuider_appendType.setAttribute(atrss, ParameterObj.inLineAttr[atrss]);
				}
			}
		}

		finalMakeBuider_appendType.innerHTML = SourceData;
	} else {
		//检查渲染的标签是否为单标签
		for (var tagchk in onlySingleTagData) {
			if (tagType === tagchk) {
				isTagSingle = true;
			}
		}
		//检查渲染的标签是否为单标签

		var styleObjectData = ""; //样式定义数据

		//解析属性数据
		if (Object.prototype.toString.call(inLineAttrData) === '[object Object]') {
			var tempgro = "";
			for (var getAttr in inLineAttrData) {
				if (getAttr === "style") {
					if (Object.prototype.toString.call(inLineAttrData[getAttr]) === '[object Object]') {
						styleObjectData = " style=\"";
						for (var stylist in inLineAttrData[getAttr]) {
							styleObjectData = styleObjectData + stylist + "=" + "\"" + inLineAttrData[getAttr] + "\";";
						}
						styleObjectData = styleObjectData + "\"";
						tempgro = tempgro + " " + styleObjectData;
					} else {
						styleObjectData = " style=\"" + inLineAttrData[getAttr] + "\"";
						tagAttr = tagAttr + styleObjectData;
					} //判断styled的数据是否为对象或字符串
				} else {
					tempgro = " " + getAttr + "=" + "\"" + inLineAttrData[getAttr] + "\"";
					tagAttr = tagAttr + tempgro;
					tempgro = "";
				}
			}
		} else if (tagAttr === "") {
			throw new Error("元素内联属性(inLineAttr)应为一个对象或“attrName1=attrValue1 attrName2=attrValue2...”格式的字符串");
		}

		if (onlySingleTagData[tagType] === true) {
			finalMakeBuider_normalType = "<";
			finalMakeBuider_normalType = finalMakeBuider_normalType + tagType;
			if (tagAttr.charAt(0) === " ") {
				finalMakeBuider_normalType = finalMakeBuider_normalType + tagAttr;
			} else {
				finalMakeBuider_normalType = finalMakeBuider_normalType + " " + tagAttr;
			}
			switch (tagType) {
				case "img":
					if (SourceDataType) {
						var tmp1 = finalMakeBuider_normalType + " src=\"";
						finalMakeBuider_normalType = "";
						for (var ixx = 0; ixx < SourceData.length; ixx++) {
							tagInnC = SourceData[ixx];
							finalMakeBuider_normalType = finalMakeBuider_normalType + (tmp1 + tagInnC + "\"" + ">");
						}
					} else {
						finalMakeBuider_normalType = finalMakeBuider_normalType + " src=\"" + tagInnC + "\"" + ">";
					}
					break;
				case "input":
					if (SourceDataType) {
						var tmp2 = finalMakeBuider_normalType + " value=\"";
						finalMakeBuider_normalType = "";
						for (var icc = 0; icc < SourceData.length; icc++) {
							tagInnC = SourceData[icc];
							finalMakeBuider_normalType = finalMakeBuider_normalType + (tmp2 + tagInnC + "\"" + ">");
						}
					} else {
						finalMakeBuider_normalType = finalMakeBuider_normalType + " value=\"" + tagInnC + "\"" + ">";
					}
					break;
			}
		} else {
			if (Object.prototype.toString.call(SourceData) === '[object Array]' || Object.prototype.toString.call(SourceData) === '[object Object]') {

				if (Object.prototype.toString.call(SourceData) === '[object Array]') {
					for (var ioo = 0; ioo < SourceData.length; ioo++) {
						var loopHeader = "<" + tagType;
						var loopFooter = "</" + tagType + ">";
						if (tagAttr.charAt(0) === " ") {
							loopHeader = loopHeader + tagAttr;
						} else {
							loopHeader = loopHeader + " " + tagAttr;
						}
						tagInnC = SourceData[ioo];
						switch (tagType) {
							case "a":
								loopHeader = loopHeader + " " + "href=\"" + tagInnC + "\"";
								break;
						}
						loopHeader = loopHeader + ">";
						finalMakeBuider_normalType = finalMakeBuider_normalType + (loopHeader + tagInnC + loopFooter);
					}
				}

				if (Object.prototype.toString.call(SourceData) === '[object Object]') {
					for (var dataList in SourceData) {
						var loopHeaders = "<" + tagType;
						var loopFooters = "</" + tagType + ">";
						if (tagAttr.charAt(0) === " ") {
							loopHeaders = loopHeaders + tagAttr;
						} else {
							loopHeaders = loopHeaders + " " + tagAttr;
						}
						var ObjValue = SourceData[dataList];
						switch (tagType) {
							case "a":
								loopHeaders = loopHeaders + " " + "href=\"" + ObjValue + "\"";
								break;
						}
						loopHeaders = loopHeaders + ">";
						finalMakeBuider_normalType = finalMakeBuider_normalType + (loopHeaders + dataList + loopFooters);
					}
				}
			} else {
				finalMakeBuider_normalType = "<" + tagType;
				if (tagAttr.charAt(0) === " ") {
					finalMakeBuider_normalType = finalMakeBuider_normalType + tagAttr;
				} else {
					finalMakeBuider_normalType = finalMakeBuider_normalType + " " + tagAttr;
				}
				switch (tagType) {
					case "a":
						var fengefuLocation = 0;
						fengefuLocation = SourceData.indexOf(';');
						tagInnC = SourceData.substr(0, fengefuLocation);
						finalMakeBuider_normalType = finalMakeBuider_normalType + " " + "href=\"" + SourceData.substr(fengefuLocation + 1) + "\"";
						break;
				}
				finalMakeBuider_normalType = finalMakeBuider_normalType + ">";
				var eleTagHeader = finalMakeBuider_normalType;
				var eleTagFooter = "</" + tagType + ">";
				finalMakeBuider_normalType = "";
				finalMakeBuider_normalType = eleTagHeader + tagInnC + eleTagFooter;
			}
		}
	}
	//判断渲染方式选择渲染方式

	//判断渲染方式选择返回
	if (renderMakeBuiderAppendWay) {
		return finalMakeBuider_appendType;
	} else {
		return finalMakeBuider_normalType;
	}
	//判断渲染方式选择返回
}
/*渲染引擎*/

/*渲染引擎模板*/
// var elesty = {};
// elesty.display = "block";
// elesty.color = "deepskyblue";
//
// var elemods = {};
// elemods.align = "center";
// elemods.id = "dsg";
// elemods.name = "dfd";
// elemods.class = "gds";
// elemods.style = elesty;
//
// var elemm = {};
// elemm.eleTag = "a";
// elemm.useAppendModel = true;
// elemm.inLineAttr = elemods;
//
// var olk = new Array();
// olk[0] = "sfds";
// olk[1] = "sgvx";
// olk[2] = "itoc";
/*渲染引擎模板*/

/*<a href="fdsaf" tabindex="10" title="dsaf" accesskey="c" target="new">faa</a>*/
