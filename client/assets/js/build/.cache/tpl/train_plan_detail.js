/*TMODJS:{"version":1,"md5":"fb88547eb2646bc8e100df36f9199457"}*/
template('tpl/train_plan_detail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,i=$data.i,$escape=$utils.$escape,itemC=$data.itemC,$out='';$each(data,function(item,i){
$out+=' <tr data-id="';
$out+=$escape(item.id);
$out+='"> <td>';
$out+=$escape(item.classCode);
$out+='</td> <td>';
$out+=$escape(item.classNames);
$out+='</td> <td>';
$out+=$escape(item.totalTrainNumber);
$out+='</td> <td> ';
$each(item.departmentPerson,function(itemC,i){
$out+=' <p>';
$out+=$escape(itemC.department);
$out+='<span>';
$out+=$escape(itemC.number);
$out+='</span></p> ';
});
$out+=' </td> <td>';
$out+=$escape(item.lecturer);
$out+='</td> <td>';
$out+=$escape(item.trainCycle);
$out+='</td> <td> ';
$each(item.trainTimeRange,function(itemC,i){
$out+=' <p>';
$out+=$escape(itemC.startTime);
$out+='-';
$out+=$escape(itemC.endTime);
$out+='</p> ';
});
$out+=' </td> <td> ';
$each(item.trainTimes,function(itemC,i){
$out+=' <p>';
$out+=$escape(itemC.times);
$out+='</p> ';
});
$out+=' </td> <td> <a class="buttonClick viewData"><span class="listOperateBtn listOperateBtn1"></span> <div class="view_info">查看<span></span></div></a> <a class="buttonClick editData"><span class="listOperateBtn listOperateBtn2"></span> <div class="view_info">编辑<span></span></div></a> <a class="buttonClick deleteData"><span class="listOperateBtn listOperateBtn3"></span> <div class="view_info">删除<span></span></div></a> </td> </tr>; ';
});
$out+=' ';
return new String($out);
});