/*TMODJS:{"version":1,"md5":"f43b0a98440b068bc25fb93cc4bc115e"}*/
template('tpl/train_plan_list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$each(data,function(item,i){
$out+=' <tr data-id="';
$out+=$escape(item.id);
$out+='"> <td><div class="checkboxSec"><input type="checkbox"/></div></td> <td>';
$out+=$escape(item.name);
$out+='</td> <td>';
$out+=$escape(item.startTime);
$out+='</td> <td>';
$out+=$escape(item.endTime);
$out+='</td> <td> ';
if(item.status == 0){
$out+=' 未发布 ';
}else{
$out+=' 已发布 ';
}
$out+=' </td> <td> <a class="buttonClick editData"><span class="listOperateBtn listOperateBtn2"></span> <div class="view_info">编辑<span></span></div></a> <a class="buttonClick deleteData"><span class="listOperateBtn listOperateBtn3"></span> <div class="view_info">删除<span></span></div></a> </td> </tr> ';
});
$out+=' ';
return new String($out);
});