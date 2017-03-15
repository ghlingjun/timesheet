/*TMODJS:{"version":1,"md5":"70fc17260fdf4ec6cb709333959f4f99"}*/
template('tpl/train_mag_offline',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,Data=$data.Data,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$out+='<thead> <tr> <th>学员</th> <th>培训日期</th> <th>培训状态</th> <th>结课方式</th> <th>及格分数</th> <th>成绩</th> </tr> </thead> <tbody> ';
$each(Data,function(item,i){
$out+=' <tr data-id="';
$out+=$escape(item.id);
$out+='"> <td>';
$out+=$escape(item.name);
$out+='</td> <td>';
$out+=$escape(item.trainDate);
$out+='</td> <td>';
$out+=$escape(item.trainStatus);
$out+='</td> <td>线下考试</td> <td>';
$out+=$escape(item.passingGrade);
$out+='</td> <td><a class="enterGrades">成绩录入</a></td> </tr> ';
});
$out+=' </tbody>';
return new String($out);
});