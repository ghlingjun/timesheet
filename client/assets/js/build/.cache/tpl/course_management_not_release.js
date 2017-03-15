/*TMODJS:{"version":1,"md5":"9ac0a7bfd1072bee34f1a30eeae1494e"}*/
template('tpl/course_management_not_release',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,Data=$data.Data,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$out+='<thead> <tr> <td class="col1_width"> <div class="checkboxSec"> <input id="theadCheckBox" type="checkbox" /> </div> </td> <th class="col2_width">课程代号</th> <th class="col3_width">课程名称</th> <th class="col4_width">状态</th> <th class="col5_width">课程分类</th> <th>操作</th> </tr> </thead> <tbody> ';
$each(Data,function(item,i){
$out+=' <tr data-id="';
$out+=$escape(item.Id);
$out+='"> <td><input type="checkbox"/></td> <td>';
$out+=$escape(item.Code);
$out+='</td> <td>';
$out+=$escape(item.Name);
$out+='</td> <td>未发布</td> <td>';
$out+=$escape(item.CourseCategoryName);
$out+='</td> <td> <a class="buttonClick editData"> <span class="listOperateBtn listOperateBtn2"></span> <div class="view_info">编辑<span></span></div> </a> <a class="buttonClick deleteData"> <span class="listOperateBtn listOperateBtn3"></span> <div class="view_info">删除<span></span></div> </a> </td> </tr> ';
});
$out+=' </tbody> ';
return new String($out);
});