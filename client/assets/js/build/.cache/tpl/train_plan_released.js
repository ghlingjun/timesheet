/*TMODJS:{"version":1,"md5":"26c4eaf66f25bb4558f91980c065bef0"}*/
template('tpl/train_plan_released',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$out+='<thead> <tr> <th class="col1_width2">名称</th> <th class="col1_width3">规划开始日期</th> <th class="col1_width4">规划结束日期</th> <th class="col1_width5 releaseStatus">未发布 <span class="glyphicon glyphicon-chevron-down"></span> <ul class="noShow"> <li data-vals="0" class="active">未发布</li> <li data-vals="1">已发布</li> <li data-vals="2">已失效</li> </ul> </th> <th>操作</th> </tr> </thead> <tbody> ';
$each(data,function(item,i){
$out+=' <tr data-id="';
$out+=$escape(item.id);
$out+='"> <td class="trainPlanName"> <span>';
$out+=$escape(item.name);
$out+='</span> </td> <td>';
$out+=$escape(item.startTime);
$out+='</td> <td>';
$out+=$escape(item.endTime);
$out+='</td> <td> 已发布 </td> <td> <a class="buttonClick withdraw"><span class="listOperateBtn listOperateBtn4"></span> </a> </td> </tr> ';
});
$out+=' </tbody>';
return new String($out);
});