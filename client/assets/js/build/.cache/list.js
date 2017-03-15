/*TMODJS:{"version":1,"md5":"0a9de53bd94c1f2b622e738d9d5d5fdd"}*/
template('list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<ul> ';
$each(list,function($value,$index){
$out+=' <li>编号：';
$out+=$escape($value.id);
$out+=' &nbsp;&nbsp;姓名：';
$out+=$escape($value.name);
$out+='</a></li> ';
});
$out+=' </ul>';
return new String($out);
});