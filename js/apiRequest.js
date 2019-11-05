var apiServerUrl = "http://xxx.xxxx.com/api";
var oncePageNum = 10, maxPageNum = 1000;

//不带分页
function ApiRequestMethod(isPost, isLoading, reqUrl, paramData, successFun, failureFun) {
    ApiRequestMethod(isPost, isLoading, reqUrl, paramData, 0, successFun, failureFun)
}

//带分页
function ApiRequestMethod(isPost, isLoading, reqUrl, paramData, curPageNum, successFun, failureFun) {
    if (!isPost) { // get
        if (curPageNum >= 1) {
            reqUrl += ('&offset=' + ((curPageNum - 1) * oncePageNum) + '&limit=' + oncePageNum);
          } else {
            reqUrl += ('&offset=0&limit=' + maxPageNum);
          }
    } // end of if
    var ajaxObj = {
        url : apiServerUrl + reqUrl,
        beforeSend: function() {
            if (isLoading) $.showLoading();
        },
        success : function(result) {
            if (isLoading) $.hideLoading();
            if (result) {
                if (0 === result.errorCode) {
                    if (successFun) successFun(result);
                } else {
                    var errMsg = result.errMsg || '操作异常,请重试!';
                    $.toast(errMsg, 'text');
                    if (failureFun) failureFun(errMsg);
                }
            } else {
                var errMsg = '操作失败,请重试!';
                $.toast(errMsg, 'text');
                if (failureFun) failureFun(errMsg);
            }
        },
        error : function(e){
            if (isLoading) $.hideLoading();
            var errMsg = (e && e.responseJSON && e.responseJSON.errMsg) ? e.responseJSON.errMsg : '请求失败,请重试!';
            $.toast(errMsg, 'text');
            if (failureFun) failureFun(errMsg);
        }
    };
    ajaxObj.type = isPost ? "POST" : "GET";
    if (isPost) {
        ajaxObj.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        if (curPageNum >= 1) {
            paramData.offset = ((curPageNum - 1) * oncePageNum);
            paramData.limit = oncePageNum;
          } else {
            paramData.offset = 0;
            paramData.limit = maxPageNum;
          }
        ajaxObj.data = paramData;
    } // end of if
    $.ajax(ajaxObj);
}