/*TMODJS:{"version":1,"md5":"0aa1d4e92dafac330496473535201b55"}*/
template('tpl/course_management_released',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,Data=$data.Data,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$out+='<thead> <tr> <th class="col2_width">课程代号</th> <th class="col3_width">课程名称</th> <th class="col4_width">状态</th> <th class="col5_width">课程分类</th> </tr> </thead> <tbody> ';
$each(Data,function(item,i){
$out+=' <tr data-id="';
$out+=$escape(item.Id);
$out+='"> <td>';
$out+=$escape(item.Code);
$out+='</td> <td>';
$out+=$escape(item.Name);
$out+='</td> <td>已发布</td> <td>';
$out+=$escape(item.CourseCategoryName);
$out+='</td> </tr> ';
});
$out+=' </tbody>';
return new String($out);
});