/*TMODJS:{"version":1,"md5":"a4b9b863d18d3a1a023ee47915b19d29"}*/
template('tpl/train_mag_signature',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,Data=$data.Data,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$out+='<thead> <tr> <th>学员</th> <th>培训日期</th> <th>培训状态</th> <th>结课方式</th> <th>成绩</th> </tr> </thead> <tbody> ';
$each(Data,function(item,i){
$out+=' <tr data-id="';
$out+=$escape(item.id);
$out+='"> <td>';
$out+=$escape(item.name);
$out+='</td> <td>';
$out+=$escape(item.trainDate);
$out+='</td> <td>';
$out+=$escape(item.trainStatus);
$out+='</td> <td>在线签名</td> <td>已签名</td> </tr> ';
});
$out+=' </tbody>';
return new String($out);
});