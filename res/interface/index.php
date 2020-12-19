<?php
error_reporting( E_ALL || ~E_NOTICE ); #显示除去 E_NOTICE 之外的所有错误信息

#最终结果值反馈器
function MSGfeedback( $fbString, $opMode = "printMode" ) {
	if ( $opMode === "echoMode" ) {
		echo $fbString;
	} else {
		print_r( $fbString );
	}
}

#最终结果值反馈器

$getdoWebSiteAddress = $_REQUEST[ 'website' ]; //传入的服务器域名
$websiteMainPageRequest = $_REQUEST[ 'getNewMainPage' ]; //主页内容请求响应
$loginRequest = $_REQUEST[ 'loginStore' ]; //用户登录商店请求
$reginRequest = $_REQUEST[ 'reginStore' ]; //用户加入注册请求
$websiteFreePageRequest = $_REQUEST[ 'getNewFreePage' ]; //获取免费软件页面内容
$websitePaydPageRequest = $_REQUEST[ 'getNewPaydPage' ]; //获取付费软件页面内容
$userShopCareRequest = $_REQUEST[ 'userShopCars' ]; //用户购物车数据请求
$chkExists = $_REQUEST[ 'detcc' ]; //检测指令

$getdoLoginUser = $_REQUEST[ 'loginName' ]; //获得需要登录的账户
$getdoLoginPswd = $_REQUEST[ 'loginPswd' ]; //获得需要登录的密码

$getdoReginUser = $_REQUEST[ 'reginName' ]; //获得需要注册的账户
$getdoReginPswd = $_REQUEST[ 'reginPswd' ]; //获得需要注册的密码

$splitSym = $_REQUEST[ 'split' ]; //检测函数专用的分隔符存储

$detccPass = false; //注册检查通过
# 功能代码


#数据库连接函数
function SQLconnect( $opWay, $host = "" ) {
	if ( $opWay == "on" ) {
		if ( $host != "" ) {
			$GLOBALS[ 'SQLcontrolPoint' ] = mysqli_connect( $host, "itoc", "itocitoc", "store" ); # 开始建立MySQL数据库连接控制节点
			if ( !$GLOBALS[ 'SQLcontrolPoint' ] ) {
				MSGfeedback( "服务器无法连接" );
			}
		} else {
			MSGfeedback( "请传递数据库地址！" );
		}
	} elseif ( $opWay == "off" ) {
			if ( $GLOBALS[ 'SQLcontrolPoint' ] != "" ) {
				mysqli_close( $GLOBALS[ 'SQLcontrolPoint' ] );
			}
		} else {
			MSGfeedback( "指令错误", "echoMode" );
		}
		//    if ($GLOBALS['splitSym'] != "") {
		//        MSGfeedback($GLOBALS['splitSym'], "echoMode"); //打印分隔符数据
		//    } //检查是否有传入分隔符
}

#数据库连接函数

#用户账户检测
function reginUserChk( $chkValue ) {
	if ( $GLOBALS[ 'getdoWebSiteAddress' ] != "" ) {
		SQLconnect( "on", $GLOBALS[ 'getdoWebSiteAddress' ] );
		$isCheckValue = strtolower( $chkValue ); #转小写
		$ReginNameCheckCodes = "select * from storeuser where shopUserName='$isCheckValue'"; # 拼装SQL代码
		$ReginNameCheckData = mysqli_query( $GLOBALS[ 'SQLcontrolPoint' ], $ReginNameCheckCodes ); # 执行查询并返回数据
		if ( $ReginNameCheckData ) {
			$ReginNameDataArr = mysqli_fetch_array( $ReginNameCheckData ); #格式化查询的数据
			MSGfeedback( $ReginNameDataArr[ 'shopUserName' ] ); #反馈查询到的信息
			if ( $chkValue == $ReginNameDataArr[ 'shopUserName' ] ) {
				$GLOBALS[ 'detccPass' ] = false; //相同，未通过
			} else {
				$GLOBALS[ 'detccPass' ] = true; //不相等，通过
			}
			MSGfeedback( $GLOBALS[ 'detccPass' ] ); //反馈最终判断值
		} else {
			MSGfeedback( "" ); #反馈一个空值
		}
		if ( $GLOBALS[ 'splitSym' ] != "" ) {
			MSGfeedback( $GLOBALS[ 'splitSym' ], "echoMode" ); //打印分隔符数据
		} //检查是否有传入分隔符
	} else {
		MSGfeedback( "请传递当前浏览器的域名信息，如localhost:8890等！", "echoMode" );
	}
}

function loginUserChk( $chkValue ) {
	if ( $GLOBALS[ 'getdoWebSiteAddress' ] != "" ) {
		SQLconnect( "on", $GLOBALS[ 'getdoWebSiteAddress' ] );
		$isloginChk = strtolower( $chkValue );
		$loginchk = "select * from storeuser where shopUserName='$isloginChk'"; # 拼装SQL代码
		$loginNameCheckData = mysqli_query( $GLOBALS[ 'SQLcontrolPoint' ], $loginchk ); # 执行查询并返回数据
		if ( $loginNameCheckData != "" ) {
			$loginNameDataArr = mysqli_fetch_array( $loginNameCheckData ); #格式化查询的数据
			if ( $chkValue != "" && $chkValue == $loginNameDataArr[ 'shopUserName' ] ) {
				$GLOBALS[ 'detccPass' ] = true; //相同，通过
				MSGfeedback( "1", "echoMode" ); //反馈最终判断值
			} else {
				$GLOBALS[ 'detccPass' ] = false; //不相同，不通过
				MSGfeedback( "0", "echoMode" ); //反馈最终判断值
			}
		} else {
			MSGfeedback( "0", "echoMode" ); //反馈最终判断值
		}
		if ( $GLOBALS[ 'splitSym' ] != "" ) {
			MSGfeedback( $GLOBALS[ 'splitSym' ], "echoMode" ); //打印分隔符数据
		} //检查是否有传入分隔符
	} else {
		MSGfeedback( "请传递当前浏览器的域名信息，如localhost:8890等！", "echoMode" );
	}
}

#用户账户检测

#检测指令部分
function detFunc( $chkExistss ) {
	$RequestCommandGroup = explode( "*", $chkExistss );
	for ( $fe = 0; $fe < count( $RequestCommandGroup ); $fe++ ) {
		$CCblocks = explode( ">", $RequestCommandGroup[ $fe ] );
		switch ( $CCblocks[ 0 ] ) {
			case "reginChk":
				reginUserChk( $CCblocks[ 1 ] );
				break;
			case "loginChk":
				loginUserChk( $CCblocks[ 1 ] );
				break;
			default:
				MSGfeedback( "不存在的检测指令！" );
				break;
		}
	}
}

if ( $chkExists != "" ) {
	detFunc( $GLOBALS[ 'chkExists' ] );
}
#检测指令部分


#注册用户部分
if ( $reginRequest ) {
	if ( $GLOBALS[ 'detccPass' ] == true ) {
		if ( $GLOBALS[ 'getdoWebSiteAddress' ] != "" ) {
			SQLconnect( "on", $GLOBALS[ 'getdoWebSiteAddress' ] );
			$idty = strtolower( $GLOBALS[ 'getdoReginUser' ] );
			$idps = $GLOBALS[ 'getdoReginPswd' ];
			$reginExecCode = "INSERT INTO storeuser (`shopUserName`, `shopUserPswd`,`shopUserType`) VALUES ('$idty', '$idps','nrl')"; # 拼装SQL代码语句
			$reginStatus = mysqli_query( $GLOBALS[ 'SQLcontrolPoint' ], $reginExecCode );
			if ( $reginStatus == "1" || $reginStatus == 1 ) {
				MSGfeedback( "恭喜你，注册成功！" );
			} else {
				MSGfeedback( "注册失败，OMG!" );
			}
		} else {
			MSGfeedback( "请传递数据库地址！" );
		}
	} else {
		MSGfeedback( "注册前未调用注册检查接口，请先调用注册检查接口，注册检查通过后方可调用此接口！" );
	}
	if ( $GLOBALS[ 'splitSym' ] != "" ) {
		MSGfeedback( $GLOBALS[ 'splitSym' ], "echoMode" ); //打印分隔符数据
	} //检查是否有传入分隔符
}
#注册用户部分

#登录用户部分
if ( $loginRequest ) {
	if ( $GLOBALS[ 'detccPass' ] == true ) {
		if ( $GLOBALS[ 'getdoWebSiteAddress' ] != "" ) {
			SQLconnect( "on", $GLOBALS[ 'getdoWebSiteAddress' ] );
			$loginX = strtolower( $GLOBALS[ 'getdoLoginUser' ] );
			$loginChecks = "select * from storeuser where shopUserName='$loginX'"; # 拼装SQL代码
			$getuser = mysqli_query( $GLOBALS[ 'SQLcontrolPoint' ], $loginChecks );
			if ( $getuser ) {
				$loginDataArr = mysqli_fetch_array( $getuser ); #格式化查询的数据
				if ( $GLOBALS[ 'getdoLoginPswd' ] == $loginDataArr[ 'shopUserPswd' ] ) {
					MSGfeedback( "登录成功" );
				} else {
					MSGfeedback( "密码错误" );
				}
				if ( $GLOBALS[ 'splitSym' ] != "" ) {
					MSGfeedback( $GLOBALS[ 'splitSym' ], "echoMode" ); //打印分隔符数据
				} //检查是否有传入分隔符
				$loginSuccess->LogName = $loginX;
				$loginSuccess->LogPswd = $GLOBALS[ 'getdoLoginPswd' ];
				$loginSuccess->SessionTime = 60;
				MSGfeedback( json_encode( $loginSuccess, JSON_UNESCAPED_UNICODE ) );
			}
		} else {
			MSGfeedback( "请传递当前浏览器的域名信息，如localhost:8890等！", "echoMode" );
		}
	} else {
		MSGfeedback( "注册前未调用登录检查接口，请先调用登录检查接口，登录检查通过后方可调用此接口！" );
	}
}
#登录用户部分

#购物车数据获取部分
if ( $userShopCareRequest ) {
	if ( $GLOBALS[ 'detccPass' ] == true ) {
		if ( $GLOBALS[ 'getdoWebSiteAddress' ] != "" ) {
			if ( $GLOBALS[ 'getdoLoginUser' ] != "" ) {
				SQLconnect( "on", $GLOBALS[ 'getdoWebSiteAddress' ] );
				$userCode = $GLOBALS[ 'getdoLoginUser' ];
				$shopCarListCode = "SELECT * FROM `shopcarslist` where UserName='$userCode'";
				$getShopCarsData = mysqli_query( $GLOBALS[ 'SQLcontrolPoint' ], $shopCarListCode );
				do {
					$fmtShopCarsGroup = mysqli_fetch_object( $getShopCarsData );
					if ( $fmtShopCarsGroup == "" ) {
						break;
					}
					if ( $fmtShopCarsGroup->UserName == $GLOBALS[ 'getdoLoginUser' ] ) {
						MSGfeedback( json_encode( $fmtShopCarsGroup ) );
						if ( $GLOBALS[ 'splitSym' ] != "" ) {
							MSGfeedback( $GLOBALS[ 'splitSym' ], "echoMode" ); //打印分隔符数据
						} //检查是否有传入分隔符

					} else {
						MSGfeedback( "没有查到您的下载、购物车列表！" );
					}
				} while ( $fmtShopCarsGroup != "" );

			} else {
				MSGfeedback( "没有有效的登录会话的用户，无法查询！" );
			}
		} else {
			MSGfeedback( "请传入数据库的地址！" );
		}
	} else {
		MSGfeedback( "非法调用此接口，必须先调用检测接口，检测通过后方可调用！" );
	}
}
#购物车数据获取部分

#最新的首页数据获取
if ( $websiteMainPageRequest ) {
	SQLconnect( "on", $GLOBALS[ 'getdoWebSiteAddress' ] );
	$getNewMainPage = "select * from mainpage";
	$getNewMainPageData = mysqli_query( $GLOBALS[ 'SQLcontrolPoint' ], $getNewMainPage );
	while ( $getDataLine = mysqli_fetch_assoc( $getNewMainPageData ) ) {
		MSGfeedback( json_encode( $getDataLine ) );
		if ( $GLOBALS[ 'splitSym' ] != "" ) {
			MSGfeedback( $GLOBALS[ 'splitSym' ], "echoMode" ); //打印分隔符数据
		} //检查是否有传入分隔符
	}
}
#最新的首页数据获取

#免费软件页面内容获取
if ( $websiteFreePageRequest ) {
	SQLconnect( "on", $GLOBALS[ 'getdoWebSiteAddress' ] );
	$getFreeSoftContPage = "SELECT * FROM `softwarelistlibrary` where softwarepaytype='free'";
	$getFreeSoftContData = mysqli_query( $GLOBALS[ 'SQLcontrolPoint' ], $getFreeSoftContPage );
	do {
		$fmtFreeSoftContList = mysqli_fetch_object( $getFreeSoftContData );
		if ( $fmtFreeSoftContList == null ) {
			break;
		} else {
			MSGfeedback( json_encode( $fmtFreeSoftContList ) );
			if ( $GLOBALS[ 'splitSym' ] != "" ) {
				MSGfeedback( $GLOBALS[ 'splitSym' ], "echoMode" ); //打印分隔符数据
			} //检查是否有传入分隔符
		}
	} while ( $fmtFreeSoftContList != "" );
}
#免费软件页面内容获取

#付费软件页面内容获取
if ( $websitePaydPageRequest ) {
	SQLconnect( "on", $GLOBALS[ 'getdoWebSiteAddress' ] );
	$getPaydSoftContPage = "SELECT * FROM `softwarelistlibrary` where softwarepaytype='payd'";
	$getPaydSoftContData = mysqli_query( $GLOBALS[ 'SQLcontrolPoint' ], $getPaydSoftContPage );
	do {
		$fmtPaydSoftContList = mysqli_fetch_object( $getPaydSoftContData );
		if ( $fmtPaydSoftContList == null ) {
			break;
		} else {
			MSGfeedback( json_encode( $fmtPaydSoftContList ) );
			if ( $GLOBALS[ 'splitSym' ] != "" ) {
				MSGfeedback( $GLOBALS[ 'splitSym' ], "echoMode" ); //打印分隔符数据
			} //检查是否有传入分隔符
		}
	} while ( $fmtPaydSoftContList != "" );
}
#付费软件页面内容获取

SQLconnect( "off" ); //关闭连接

?>