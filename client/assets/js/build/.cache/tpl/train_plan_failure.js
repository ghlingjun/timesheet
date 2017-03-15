/*TMODJS:{"version":1,"md5":"38da5139f678d9f3b67c2a4a2fdb8dd5"}*/
template('tpl/train_plan_failure',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$out+='<thead> <tr> <th class="col1_width2">名称</th> <th class="col1_width3">规划开始日期</th> <th class="col1_width4">规划结束日期</th> <th class="col1_width5 releaseStatus">未发布 <span class="glyphicon glyphicon-chevron-down"></span> <ul class="noShow"> <li data-vals="0" class="active">未发布</li> <li data-vals="1">已发布</li> <li data-vals="2">已失效</li> </ul> </th> </tr> </thead> <tbody> ';
$each(data,function(item,i){
$out+=' <tr data-id="';
$out+=$escape(item.id);
$out+='"> <td class="trainPlanName"> <span>';
$out+=$escape(item.name);
$out+='</span> </td> <td>';
$out+=$escape(item.startTime);
$out+='</td> <td>';
$out+=$escape(item.endTime);
$out+='</td> <td> 已失效 </td> </tr> ';
});
$out+=' </tbody>';
return new String($out);
});