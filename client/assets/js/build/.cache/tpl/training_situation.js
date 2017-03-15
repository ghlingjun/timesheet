/*TMODJS:{"version":1,"md5":"ae7ddc16eb881f860ef1def32d91f2d3"}*/
template('tpl/training_situation',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$each(data,function(item,i){
$out+=' <tr data-id="';
$out+=$escape(item.id);
$out+='"> <td><input type="checkbox"/></td> <td>';
$out+=$escape(item.name);
$out+='</td> <td>';
$out+=$escape(item.trainCount);
$out+='</td> <td>';
$out+=$escape(item.finished);
$out+='</td> <td>';
$out+=$escape(item.ongoing);
$out+='</td> <td>';
$out+=$escape(item.noBegan);
$out+='</td> <td>';
$out+=$escape(item.overdue);
$out+='</td> <td>';
$out+=$escape(item.complianceRate);
$out+='</td> </tr> ';
});
return new String($out);
});