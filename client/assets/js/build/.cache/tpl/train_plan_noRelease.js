/*TMODJS:{"version":1,"md5":"88f70d5c91ac04f432a19835e411f759"}*/
template('tpl/train_plan_noRelease',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$out+='<thead> <tr> <td class="col1_width1"> <div class="checkboxSec"> <input type="checkbox" /> </div> </td> <th class="col1_width2">名称</th> <th class="col1_width3">规划开始日期</th> <th class="col1_width4">规划结束日期</th> <th class="col1_width5 releaseStatus">未发布 <span class="glyphicon glyphicon-chevron-down"></span> <ul class="noShow"> <li data-vals="0" class="active">未发布</li> <li data-vals="1">已发布</li> <li data-vals="2">已失效</li> </ul> </th> <th>操作</th> </tr> <tr class="searchInputSec noShow" id="addSec"> <td class="col1_width"> <div class="checkboxSec"> <input type="checkbox" /> </div> </td> <td> <input type="text" class="form-control searchInput" placeholder="请输入名称"/> </td> <td> </td> <td> </td> <td> <span>未发布</span> </td> <td> <a class="operateYes" id="operateYes"> <span class="glyphicon glyphicon-ok"></span> </a> <a class="operateNo" id="operateNo"> <span class="glyphicon glyphicon-remove"></span> </a> </td> </tr> </thead> <tbody> ';
$each(data,function(item,i){
$out+=' <tr data-id="';
$out+=$escape(item.id);
$out+='"> <td> <div class="checkboxSec"> <input type="checkbox" /> </div> </td> <td class="trainPlanName"> <span class="normalTrainPlanName">';
$out+=$escape(item.name);
$out+='</span> <input type="text" class="form-control editTrainPlanName noShow" /> </td> <td>';
$out+=$escape(item.startTime);
$out+='</td> <td>';
$out+=$escape(item.endTime);
$out+='</td> <td> ';
if(item.status == 0){
$out+=' 未发布 ';
}else{
$out+=' 已发布 ';
}
$out+=' </td> <td> <div class="normalOperate"> <a class="buttonClick editData"><span class="listOperateBtn listOperateBtn2"></span> <div class="view_info">编辑<span></span></div> </a> <a class="buttonClick deleteData"><span class="listOperateBtn listOperateBtn3"></span> <div class="view_info">删除<span></span></div> </a> </div> <div class="editOperate noShow"> <a class="editOperateYes"> <span class="glyphicon glyphicon-ok"></span> </a> <a class="editOperateNo"> <span class="glyphicon glyphicon-remove"></span> </a> </div> </td> </tr> ';
});
$out+=' </tbody>';
return new String($out);
});