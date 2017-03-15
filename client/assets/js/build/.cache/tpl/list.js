/*TMODJS:{"version":2,"md5":"b8162b74e309664db475ad8f9bd7339f"}*/
template('tpl/list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<ul> ';
$each(list,function($value,$index){
$out+=' <li>编号：';
$out+=$escape($value.projectNum);
$out+=' &nbsp;&nbsp;姓名：';
$out+=$escape($value.projectName);
$out+='</a></li> ';
});
$out+=' </ul>';
return new String($out);
});