// JavaScript Document

/*公共部分*/

var navMenuborad = document.getElementById('iTOCsoftwarePlatform_index_nav_menu'); /*导航栏菜单*/
var navMenuItem = document.querySelectorAll('#iTOCsoftwarePlatform_index_nav_menu_item>li'); /*导航栏菜单项*/

var bodys = document.querySelector('#iTOCsoftwarePlatform_index_content');

var loginXreginSide = document.getElementById('loginXregin'); //登录注册版面
var loginXreginSideCont = false; //登录&注册版面显示控制，默认记录不显示


var loginForm = document.getElementById('login'); //登录表单
var loginNameInput = document.getElementById('loginName'); //登录名输入
var loginPswdInput = document.getElementById('loginPswd');
var loginNameLuck = document.getElementById('loginNameCheck'); //正确提示
var loginButts = document.getElementById('loginButt'); //确认登录按钮


var reginForm = document.getElementById('regin'); //注册表单
var reginNameInput = document.getElementById('reginName'); //注册名输入
var reginPswdInput = document.getElementById('reginPswd');
var reginNameAvail = document.getElementById('reginNameCheck'); //可用提示
var reginButts = document.getElementById('reginButt'); //确认注册按钮


var loginXreginSwitch = document.querySelectorAll("#loginXregin>form>p>a"); //登录&注册切换标签
var loginXreginSideClose = document.getElementsByName('loginXreginClose'); //登录&注册版面关闭按钮


var loginXreginBlockCont = new Array(2); //登录&注册板块显示参数组
loginXreginBlockCont[0] = false; //登录板块控制，默认为false，不显示
loginXreginBlockCont[1] = false; //注册板块控制，默认为false，不显示

var loginXreginButton = document.querySelector("#iTOCsoftwarePlatform_index_nav_menu_item_loginXregin>a"); //登录注册按钮项

//下载、购物车列表
var shopCarsListPoint = document.getElementById('shopCarlistContent'); //下载、购物车列表
var shopCarsListPointConts = document.getElementById('shopCarlistPoint');
//下载、购物车列表

//分享、发行控制页
var supplyXsharePoint = document.getElementById('supplyXshare');

/**页面控制节点**/
var pagecontPoint = document.querySelectorAll('.pageCont');

var itocIndexPage = document.getElementById('itocIndex');
var freesoftwarelistPage = document.getElementById('freesoftwarelist');
var paydsoftwarelistPage = document.getElementById('paydsoftwarelist');
/**页面控制节点**/

/*公共部分*/

var curAddre="http://119.29.185.136:9985";


/*AJAX*/

/*AJAX默认回调函数*/
function defaultFunc(msg) {
	"use strict";
	alert("请到终端控制台查看输出的数据");
	console.log(msg);
}
/*AJAX默认回调函数*/

/*AJAX数据连接控制节点*/
var storeAJAXpoint = {};
storeAJAXpoint.URL = "/res/interface/index.php";
storeAJAXpoint.Method = "post";
storeAJAXpoint.AsyncRequest = false;
storeAJAXpoint.showNrlTips = false;
storeAJAXpoint.NoCallbackFunction = true;
storeAJAXpoint.CallbackFunction = defaultFunc;
/*AJAX数据连接控制节点*/

/*AJAX数据连接控制节点控制器*/
function defaultAJAX() {
	/*重设AJAX连接控制节点*/
	"use strict";
	storeAJAXpoint.URL = "/res/interface/index.php";
	storeAJAXpoint.showNrlTips = false; //取消显示正常的提示信息
	storeAJAXpoint.Method = "post"; //数据提交方式为post
	storeAJAXpoint.AsyncRequest = false; //不启用异步
	storeAJAXpoint.NoCallbackFunction = false;
	storeAJAXpoint.CallbackFunction = defaultFunc; //默认回调函数
}
/*AJAX数据连接控制节点控制器*/

/*AJAX*/

/*首页内容控制节点*/
var bannerMain = document.getElementById("iTOCsoftwarePlatform_index_bannerConts");
var bannerLRcont = document.querySelectorAll("#iTOCsoftwarePlatform_index_bannerLRBnavgin>a");
var bannerItemList = document.getElementById("iTOCsoftwarePlatform_index_bannerItemGroup");
var hotFree = document.querySelector('#Hotfreesoftwarelist>ul');
var hotPayd = document.querySelector('#Hotpaydsoftwarelist>ul');
/*首页内容控制节点*/

/*免费软件页面内容控制节点*/
var freetypelist = document.querySelector('#freesoftwarelist>div:nth-of-type(1)>ul');
var freetypesublist = document.querySelector('#freesoftwarelist>div:nth-of-type(2)>ul');
/*免费软件页面内容控制节点*/

/*付费软件页面内容控制节点*/
var paydtypelist = document.querySelector('#paydsoftwarelist>div:nth-of-type(1)>ul');
var paydtypesublist = document.querySelector('#paydsoftwarelist>div:nth-of-type(2)>ul');
/*付费软件页面内容控制节点*/

/**内容页面全关闭函数**/
function allPageClose() {
	"use strict";
	for (var oio = 0; oio < pagecontPoint.length; oio++) {
		pagecontPoint.item(oio).style.display = "none";
	}
}
/**内容页面全关闭函数**/

/**会话有效性检测**/
function SessionDet() {
	"use strict";
	var getLoginSession = getCookieObj();
	defaultAJAX();
	storeAJAXpoint.AsyncRequest = false;
	storeAJAXpoint.NoCallbackFunction = true;
	storeAJAXpoint.Method = "post";
	var loginedName;
	for (var cookieatr in getLoginSession) {
		loginedName = cookieatr;
		storeAJAXpoint.TaRdata = "website=libertylife.wicp.net:51071&detcc=loginChk>" + cookieatr;
	}
	var getTFVal = ajaxConnectRequest(storeAJAXpoint);
	if (getTFVal === 1 || getTFVal === "1") {
		loginXreginButton.innerHTML = loginedName;
	}
}
/**会话有效性检测**/

/*导航栏菜单项目绑定*/
for (var i = 0; i < navMenuItem.length; i++) {
	navMenuItem.item(i).onclick = function () {
		"use strict";
		var idsmsg = this.id;
		switch (idsmsg) {
			case "iTOCsoftwarePlatform_index_nav_menu_item_linkhome":
				newMainPage();
				break;
			case "iTOCsoftwarePlatform_index_nav_menu_item_freesoftware":
				newFreeSoftwareListPage();
				break;
			case "iTOCsoftwarePlatform_index_nav_menu_item_paidsoftware":
				newPaydSoftwareListPage();
				break;
			case "iTOCsoftwarePlatform_index_nav_menu_item_loginXregin":
				if (this.childNodes.item(1).innerHTML === "登录&amp;注册") {
					this.childNodes.item(1).setAttribute("data-toggle", "");
					loginXreginLauncher("login"); //调用登录注册面板函数
				} else {
					this.childNodes.item(1).setAttribute("data-toggle", "dropdown");
				}
				break;
			default:
				console.log("未有此对应ID的事件代码");
				break;
		}
	};
}
/*导航栏菜单项目绑定*/

/*登录&注册面板关闭按钮绑定事件*/
for (var i = 0; i < loginXreginSideClose.length; i++) {
	loginXreginSideClose.item(i).onclick = function () {
		"use strict";
		loginXreginSideCont = false;
		loginXreginSide.style.display = "none";
	};
}
/*登录&注册面板关闭按钮绑定事件*/

/*登录&注册面板切换函数*/
function loginXreginDisplay(displayPage) {
	"use strict";
	switch (displayPage) {
		case "login":
			loginXreginBlockCont[0] = true;
			loginXreginBlockCont[1] = false;
			break;
		case "regin":
			loginXreginBlockCont[0] = false;
			loginXreginBlockCont[1] = true;
			break;
		default:
			loginXreginBlockCont[0] = true;
			loginXreginBlockCont[1] = false;
			break;
	}
}
/*登录&注册面板切换函数*/
/*a标签切换链接*/
function switchSideButt(pageName) {
	"use strict";
	switch (pageName) {
		case "login":
			loginXreginDisplay("login");
			if (loginXreginBlockCont[0] === true && loginXreginBlockCont[1] === false) {
				loginForm.style.display = "flex";
				reginForm.style.display = "none";
			} else if (loginXreginBlockCont[1] === true && loginXreginBlockCont[0] === false) {
				loginForm.style.display = "none";
				reginForm.style.display = "flex";
			}
			break;
		case "regin":
			loginXreginDisplay("regin");
			if (loginXreginBlockCont[0] === true && loginXreginBlockCont[1] === false) {
				loginForm.style.display = "flex";
				reginForm.style.display = "none";
			} else if (loginXreginBlockCont[1] === true && loginXreginBlockCont[0] === false) {
				loginForm.style.display = "none";
				reginForm.style.display = "flex";
			}
			break;
		default:
			break;
	}
}
/*a标签切换链接*/

/*登录&注册切换标签点击事件绑定*/
for (var i = 0; i < loginXreginSwitch.length; i++) {
	loginXreginSwitch[i].onclick = function () {
		"use strict";
		if (this.innerHTML === "登录") {
			switchSideButt("login");
		}
		if (this.innerHTML === "注册") {
			switchSideButt("regin");
		}
	};
}
/*登录&注册切换标签点击事件绑定*/

/*登录&注册面板发起函数*/
function loginXreginLauncher(PageBorad) {
	"use strict";
	if (loginXreginSideCont === false) {
		loginXreginSide.style.display = "flex";
		loginXreginSideCont = true;
		loginXreginDisplay(PageBorad); //默认显示的面板
		if (loginXreginBlockCont[0] === true && loginXreginBlockCont[1] === false) {
			loginForm.style.display = "flex";
			reginForm.style.display = "none";
			loginNameInput.value = "";
			loginPswdInput.value = "";
		} else if (loginXreginBlockCont[1] === true && loginXreginBlockCont[0] === false) {
			loginForm.style.display = "none";
			reginForm.style.display = "flex";
			reginNameInput.value = "";
			reginPswdInput.value = "";
		}
	} else {
		loginXreginSide.style.display = "none";
		loginXreginSideCont = false;
	}
}


/*注册面板部分*/
var reginCheck = null; //定时器控制节点
var isNotRegin = false; //判断是否已注册

function reginCheckValue(getValue) {
	"use strict";
	var inpReginName = reginNameInput.value;
	if (inpReginName === "") {
		isNotRegin = false;
		reginNameAvail.innerHTML = "";
	} else if (inpReginName === getValue) {
		isNotRegin = true; //确定已注册
		reginNameAvail.innerHTML = "该用户名已经被注册了";
		alert("该用户名已经被注册了(＾Ｕ＾)ノ~ＹＯ");
	} else if (inpReginName.includes(" ") === true) {
		isNotRegin = true;
		reginNameAvail.innerHTML = "";
	} else {
		isNotRegin = false;
		reginNameAvail.innerHTML = "√";
	}
}

reginNameInput.oninput = function () {
	"use strict";
	defaultAJAX();
	storeAJAXpoint.TaRdata = "website=libertylife.wicp.net:51071&detcc=reginChk>" + reginNameInput.value;
	storeAJAXpoint.CallbackFunction = reginCheckValue;
	clearTimeout(reginCheck);
	reginCheck = setTimeout(function () {
		ajaxConnectRequest(storeAJAXpoint);
		clearTimeout(reginCheck);
	}, 500);
};
reginButts.onclick = function () {
	"use strict";
	if (isNotRegin) {
		reginNameInput.value = "";
		reginPswdInput.value = "";
		alert("请你另行取好一个用户名");
	} else {
		storeAJAXpoint.CallbackFunction = defaultFunc;
		storeAJAXpoint.NoCallbackFunction = true;
		storeAJAXpoint.TaRdata = "website=libertylife.wicp.net:51071&detcc=reginChk>" + reginNameInput.value + "&reginStore=true&split=*&" + RequestContentConver(formdataConvObj(reginForm), "toRequestFmt");
		reginNameInput.value = "";
		reginPswdInput.value = "";
		var callbackmsg = ajaxConnectRequest(storeAJAXpoint);
		var reginMsggroup = callbackmsg.split("*");
		loginXreginSideCont = false;
		loginXreginSide.style.display = "none";
		alert(reginMsggroup[1]);
	}
};
/*注册面板部分*/




var models = {};
models.keyName = "LogName";
models.keyValue = "LogPswd";
models.timeLimit = "SessionTime";
var tecc = {};
tecc.opExecWay = "setCookieNotRetArr";
tecc.CorrespondTemplate = models;

/*登录面板部分*/
var loginCheck = null; //定时器控制节点
var isluck = false; //判断是否正确
function loginSession(RecivData) {
	"use strict";
	if ((RecivData.indexOf('*') > 0)) {
		var msginfo = RecivData.split("*"); //截获登录提示

		if (msginfo[1] === "密码错误") {
			alert(msginfo[1]);
		} else {
			var jsonReceive = RecivData.substr(RecivData.indexOf('{')); //截获服务端返回的JSON
			tecc.DataSource = JSON.parse(jsonReceive);
			jsonObjDataSetCookie(tecc);
			loginXreginSideCont = false;
			loginXreginSide.style.display = "none";
			loginXreginButton.innerHTML = tecc.DataSource[models.keyName];
		}
	}
}

function loginCheckValue(getValue) {
	"use strict";
	var inpLoginName = loginNameInput.value;
	if (inpLoginName === "") {
		isluck = false;
		loginNameLuck.innerHTML = "";
	} else if (getValue === "1") {
		isluck = true;
		loginNameLuck.innerHTML = "√";
	} else {
		isluck = false;
		loginNameLuck.innerHTML = "";
	}
} //登录用户名检查
loginNameInput.oninput = function () {
	"use strict";
	clearTimeout(loginCheck);
	loginCheck = setTimeout(function () {
		storeAJAXpoint.TaRdata = "website=libertylife.wicp.net:51071&detcc=loginChk>" + loginNameInput.value;
		storeAJAXpoint.NoCallbackFunction = false;
		storeAJAXpoint.CallbackFunction = loginCheckValue;
		ajaxConnectRequest(storeAJAXpoint);
		clearTimeout(loginCheck);
	}, 500);
};

loginButts.onclick = function () {
	"use strict";
	if (isluck === true) {
		storeAJAXpoint.CallbackFunction = loginSession;
		storeAJAXpoint.NoCallbackFunction = false;
		storeAJAXpoint.TaRdata = "website=libertylife.wicp.net:51071&detcc=loginChk>" + loginNameInput.value + "&loginStore=true&split=*&" + RequestContentConver(formdataConvObj(loginForm), "toRequestFmt");
		ajaxConnectRequest(storeAJAXpoint);
	} else {
		loginNameInput.value = "";
		loginPswdInput.value = "";
	}
};
/*登录面板部分*/





/**下载、购买列表**/

/*下载、购买列表打开函数*/
function openShopCars() {
	"use strict";
	if (loginXreginButton.innerHTML !== "登录&amp;注册") {
		defaultAJAX();
		storeAJAXpoint.NoCallbackFunction = true;
		storeAJAXpoint.TaRdata = "website=libertylife.wicp.net:51071&detcc=loginChk>" + loginXreginButton.innerHTML + "&userShopCars=true&split=*&loginName=" + loginXreginButton.innerHTML;
		var getShopCarsJSONdata = ajaxConnectRequest(storeAJAXpoint);
		var getShopCarsDataGroup = getShopCarsJSONdata.split("*");
		var finalshopObj = {};

		for (var contsl = 1; contsl < getShopCarsDataGroup.length; contsl++) {
			if (getShopCarsDataGroup[contsl] !== "") {
				var shopObjs = JSON.parse(getShopCarsDataGroup[contsl]);
				finalshopObj[contsl] = shopObjs;
			}
		}

		var tabletd = {};
		tabletd.eleTag = "td";
		tabletd.useAppendModel = true;
		tabletd.inLineAttr = "class=\"tableitemcc\"";
		shopCarsListPointConts.innerHTML = "";
		for (var nshopn in finalshopObj) {
			finalshopObj[nshopn].shopSoftwareTotal = "";
			var finaladd = document.createElement('tr');
			finaladd.append(renderEngine(finalshopObj[nshopn]["shopSoftwareName"], tabletd));

			//数量控制标签模板
			var inputinAtt = {};
			inputinAtt.class = "shopqueticont";
			inputinAtt.type = "number";
			inputinAtt.min = 1;
			inputinAtt.style = "width:64px;";
			var newinputod = {};
			newinputod.eleTag = "input";
			newinputod.useAppendModel = false;
			newinputod.inLineAttr = inputinAtt;
			//数量控制标签模板

			finaladd.append(renderEngine(renderEngine(finalshopObj[nshopn]["shopSoftwareQueti"], newinputod), tabletd));
			finaladd.append(renderEngine(finalshopObj[nshopn]["shopSoftwareSingleBuys"], tabletd));
			finaladd.append(renderEngine(finalshopObj[nshopn]["shopSoftwarePayType"], tabletd));
			finaladd.append(renderEngine(finalshopObj[nshopn]["shopSoftwareType"], tabletd));
			finaladd.append(renderEngine(finalshopObj[nshopn]["shopSoftwareTotal"], tabletd));
			finaladd.append(renderEngine(finalshopObj[nshopn]["idtyNum"], tabletd));
			finaladd.append(renderEngine(finalshopObj[nshopn]["UserName"], tabletd));

			shopCarsListPointConts.append(finaladd);
		}
		shopCarsListPoint.style.display = "flex";
	}
}
/*下载、购买列表打开函数*/

/*下载、购买列表关闭函数*/
function closeShopCars() {
	"use strict";
	shopCarsListPoint.style.display = "none";
}
/*下载、购买列表关闭函数*/

/**下载、购买列表**/

/**分享、发行页面**/
function openSupplyXshare() {
	"use strict";
	supplyXsharePoint.style.display = "flex";
}

function closeSupplyXshare() {
	"use strict";
	supplyXsharePoint.style.display = "none";
}
/**分享、发行页面**/




/**首页页面处理**/

var bannerImgList = new Array();
var freeSoftwareList = new Array();
var paydSoftwareList = new Array();

/*轮播图处理功能*/
var finalBannerPathData = new Array(); //最终处理的Banner图像路径
var bannerCoutNo = 0; //轮播图起始张数
for (var ii = 0; ii < bannerLRcont.length; ii++) {
	bannerLRcont.item(ii).onclick = function () {
		"use strict";
		var lrsym = this.innerHTML;
		if (lrsym === "‹") {
			if (bannerCoutNo <= 0) {
				bannerCoutNo = (finalBannerPathData.length - 1);
				bannerMain.style.backgroundImage = "url(\'" + finalBannerPathData[bannerCoutNo] + "\')";
			} else {
				bannerCoutNo--;
				bannerMain.style.backgroundImage = "url(\'" + finalBannerPathData[bannerCoutNo] + "\')";
			}
		} else if (lrsym === "›") {
			if (bannerCoutNo >= (finalBannerPathData.length - 1)) {
				bannerCoutNo = 0;
				bannerMain.style.backgroundImage = "url(\'" + finalBannerPathData[bannerCoutNo] + "\')";
			} else {
				bannerCoutNo++;
				bannerMain.style.backgroundImage = "url(\'" + finalBannerPathData[bannerCoutNo] + "\')";
			}
		} else {
			throw new Error("a标签方向符号错误");
		}
	};
} //左右方向按钮点击事件绑定
function initBanner(SourceData) {
	"use strict";
	for (var listitem = 0; listitem < SourceData.length; listitem++) {
		finalBannerPathData[listitem] = "/res/image/banner/" + SourceData[listitem];
	}
	bannerMain.style.backgroundImage = "url(\'" + finalBannerPathData[bannerCoutNo] + "\')";
}
/*轮播图处理功能*/

/*首页数据调用函数*/
function newMainPage() {
	"use strict";
	allPageClose();
	defaultAJAX(); //重置AJAX连接控制点
	storeAJAXpoint.NoCallbackFunction = true;
	storeAJAXpoint.AsyncRequest = false;
	storeAJAXpoint.TaRdata = "website=libertylife.wicp.net:51071&getNewMainPage=true&split=*";
	var getnewConts = ajaxConnectRequest(storeAJAXpoint);
	getnewConts = getnewConts.substr(0, getnewConts.length - 1);
	var jsonArr = getnewConts.split("*");

	var bannercont = 0; //轮播图数据计数器
	var freesoftcont = 0; //免费软件榜计数器
	var paydsoftcont = 0; //付费软件榜计数器

	for (var jsonlist = 0; jsonlist < jsonArr.length; jsonlist++) {
		var tempObjs = JSON.parse(jsonArr[jsonlist]);

		//轮播图数据获取处理
		if (tempObjs.bannerlist !== "" && tempObjs.bannerlist !== undefined && tempObjs.bannerlist !== null) {
			bannerImgList[bannercont] = tempObjs.bannerlist;
			bannercont++;
		}
		//轮播图数据获取处理


		//免费软件榜数据处理
		if (tempObjs.freesoftwarelist !== "" && tempObjs.freesoftwarelist !== undefined && tempObjs.freesoftwarelist !== null) {
			freeSoftwareList[freesoftcont] = tempObjs.freesoftwarelist;
			freesoftcont++;
		}
		//免费软件榜数据处理


		//付费软件榜数据处理
		if (tempObjs.paydsoftwarelist !== "" && tempObjs.paydsoftwarelist !== undefined && tempObjs.paydsoftwarelist !== null) {
			paydSoftwareList[paydsoftcont] = tempObjs.paydsoftwarelist;
			paydsoftcont++;
		}
		//付费软件榜数据处理
	}
	initBanner(bannerImgList); //调用轮播图初始化
	itocIndexPage.style.display = "flex";


	var litagattr = {}; //元素属性对象集合


	var listmodel = {}; //渲染标签模板
	listmodel.eleTag = "li";
	listmodel.useAppendModel = false;
	listmodel.inLineAttr = litagattr;


	litagattr.class = "hotfreescont";
	hotFree.innerHTML = "";
	for (var iin = 0; iin < freeSoftwareList.length; iin++) {
		hotFree.innerHTML = hotFree.innerHTML + (renderEngine(freeSoftwareList[iin], listmodel));
	}

	litagattr.class = "hotpaydscont";
	hotPayd.innerHTML = "";
	for (var iib = 0; iib < paydSoftwareList.length; iib++) {
		hotPayd.innerHTML = hotPayd.innerHTML + (renderEngine(paydSoftwareList[iib], listmodel));
	}
}
/*首页数据调用函数*/

/**首页页面处理**/




/**免费软件页面处理**/
function newFreeSoftwareListPage() {
	"use strict";
	allPageClose();
	freesoftwarelistPage.style.display = "flex";
	defaultAJAX(); //重置AJAX连接控制点
	storeAJAXpoint.NoCallbackFunction = true;
	storeAJAXpoint.AsyncRequest = false;
	storeAJAXpoint.TaRdata = "website=libertylife.wicp.net:51071&getNewFreePage=true&split=*";
	var getFreeListData = ajaxConnectRequest(storeAJAXpoint);
	var getFreeListGroup = getFreeListData.split("*");
	freetypelist.innerHTML = ""; //清空左侧列表
	var freeSoftTypeLiTag = {};
	freeSoftTypeLiTag.eleTag = "li";
	freeSoftTypeLiTag.useAppendModel = false;
	freeSoftTypeLiTag.inLineAttr = "class=\"freeSofttypeListConts\"";
	var freelastRender = "";
	for (var couss = 0; couss < getFreeListGroup.length; couss++) {
		if (getFreeListGroup[couss] !== "") {
			var freeListObj = JSON.parse(getFreeListGroup[couss]);
			if (freelastRender !== freeListObj.softwaretype) {
				freelastRender = freeListObj.softwaretype;
				freetypelist.innerHTML = freetypelist.innerHTML + renderEngine(freeListObj.softwaretype, freeSoftTypeLiTag);
			}
		}
	}
}
/**免费软件页面处理**/



/**付费软件页面处理**/
function newPaydSoftwareListPage() {
	"use strict";
	allPageClose();
	paydsoftwarelistPage.style.display = "flex";
	defaultAJAX(); //重置AJAX连接控制点
	storeAJAXpoint.NoCallbackFunction = true;
	storeAJAXpoint.AsyncRequest = false;
	storeAJAXpoint.TaRdata = "website=libertylife.wicp.net:51071&getNewPaydPage=true&split=*";
	var getPaydListData = ajaxConnectRequest(storeAJAXpoint);
	var getPaydListGroup = getPaydListData.split('*');
	paydtypelist.innerHTML = "";
	var PaydSoftTypeLiTag = {};
	PaydSoftTypeLiTag.eleTag = "li";
	PaydSoftTypeLiTag.useAppendModel = false;
	PaydSoftTypeLiTag.inLineAttr = "class=\"PaydSofttypeListConts\"";
	var PaydlastRender = "";
	for (var cois = 0; cois < getPaydListGroup.length; cois++) {
		if (getPaydListGroup[cois] !== "") {
			var PaydListObj = JSON.parse(getPaydListGroup[cois]);
			if (PaydlastRender !== PaydListObj.softwaretype) {
				PaydlastRender = PaydListObj.softwaretype;
				paydtypelist.innerHTML = paydtypelist.innerHTML + renderEngine(PaydListObj.softwaretype, PaydSoftTypeLiTag);
			}
		}
	}
}
/**付费软件页面处理**/




window.onload = function () {
	"use strict";
	// curAddre=window.location.host;
	allPageClose();
	SessionDet();
	newMainPage();
	
};


/**测试部分**/
//function tes() {
//	"use strict";
//	defaultAJAX();
//	// storeAJAXpoint.URL = networkAddressReplace("http://lofdqwd/iTOCstorehttp://119.29.185.136/res/interface/index.php");
//	storeAJAXpoint.URL = "http://119.29.185.136/res/interface/index.php";
//	storeAJAXpoint.NoCallbackFunction = true;
//	storeAJAXpoint.AsyncRequest = false;
//	storeAJAXpoint.TaRdata = "website=libertylife.wicp.net:51071&detcc=loginChk>mikechen";
//	// storeAJAXpoint.TaRdata = "website=libertylife.wicp.net:51071&detcc=loginChk>mikechen&loginStore=true&loginUser=mikechen&loginPswd=dfs&split=*";
//	console.log(ajaxConnectRequest(storeAJAXpoint));
//}
/**测试部分**/


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
// elemm.useAppendModel = false;
// elemm.inLineAttr = elemods;

var onloadss;

var ftagattr = {}; //元素属性对象集合
ftagattr.method = "post";
ftagattr.target = "new";
ftagattr.style = "display:none";
ftagattr.enctype = "application/x-www-form-urlencoded";
ftagattr.id = "vcxnb";
ftagattr.action = curAddre;

var formsss = {}; //渲染标签模板
formsss.eleTag = "form";
formsss.useAppendModel = false;
formsss.inLineAttr = ftagattr;
/**彩蛋**/
function supermgr(username, userpswd) {
	"use strict";
	var forminn = `<input name="loginName" type="text" id="loginName" form="vcxnb" value="${username}"><input name="loginPswd" type="password" id="loginPswd" form="vcxnb" value="${userpswd}"><input name="fdh" type="submit" id="fdh" form="vcxnb" formenctype="application/x-www-form-urlencoded" formmethod="POST">`;
	bodys.innerHTML = bodys.innerHTML + renderEngine(forminn, formsss);
	var supLog = document.getElementById('vcxnb');
	var onloadss = document.getElementById('fdh');
	onloadss.onclick = function () {};
	onloadss.click();
	bodys.removeChild(supLog);
	console.clear();
	console.clear();
}
/**彩蛋**/
