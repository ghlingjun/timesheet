/*TMODJS:{"version":17,"md5":"d28566dd41cd5abd0d9743d0a616b279"}*/
template('tpl/list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$out+='<ul> ';
$each(list,function(item,i){
$out+=' <li>编号：';
$out+=$escape(item.projectNum);
$out+=' &nbsp;&nbsp;姓名：';
$out+=$escape(item.projectName);
$out+='</a></li> ';
});
$out+=' </ul>';
return new String($out);
});