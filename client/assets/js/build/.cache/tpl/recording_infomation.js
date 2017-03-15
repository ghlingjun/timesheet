/*TMODJS:{"version":1,"md5":"05f6bf0842a1eb98f0ad493bb2f456f0"}*/
template('tpl/recording_infomation',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$each(data,function(item,i){
$out+=' <tr data-id="';
$out+=$escape(item.id);
$out+='"> <td>';
$out+=$escape(item.trainStatus);
$out+='</td> <td>';
$out+=$escape(item.classCode);
$out+='</td> <td>';
$out+=$escape(item.classNames);
$out+='</td> <td>';
$out+=$escape(item.stopDate);
$out+='</td> </tr> ';
});
return new String($out);
});