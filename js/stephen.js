document.write("<script type='text/javascript' src='../js/apiRequest.js'></script>");
document.write("<script type='text/javascript' src='https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js'></script>");

function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

//init
$(function () {
    var vConsole = new VConsole();//是否开启移动端调试窗
});