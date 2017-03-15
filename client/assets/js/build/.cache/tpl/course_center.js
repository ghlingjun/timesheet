/*TMODJS:{"version":1,"md5":"c50eb8ddc0e04481f2718fc70918a118"}*/
template('tpl/course_center',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$out+='<tr class="detailContent"> <td colspan=6> <div class="innerContent"> ';
$each(data,function(item,i){
$out+=' <p>课程讲师：<span>';
$out+=$escape(item.courseLecturer);
$out+='</span></p> <p>课程介绍：<span>';
$out+=$escape(item.courseDistribution);
$out+='</span></p> <p>课程时长：<span>';
$out+=$escape(item.courseDuration);
$out+='</span></p> ';
});
$out+=' </div> </td> </tr>';
return new String($out);
});