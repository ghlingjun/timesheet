/*TMODJS:{"version":1,"md5":"38585909a29b71345d79fcd354aaad2a"}*/
template('tpl/train_management_finished_detail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$out+=' <tr class="detailContent"> <td colspan=4> <table class="innerTable"> <thead> <tr> <th>培训时间</th> <th>培训地点</th> <th>培训人数限制</th> <th>培训参与人数</th> <th>操作</th> </tr> </thead> <tbody> ';
$each(data,function(item,i){
$out+=' <tr data-id="';
$out+=$escape(item.id);
$out+='"> <td>';
$out+=$escape(item.trainTime);
$out+='</td> <td>';
$out+=$escape(item.trainPlace);
$out+='</td> <td>';
$out+=$escape(item.numberLimit);
$out+='</td> <td>';
$out+=$escape(item.numberLimit);
$out+='</td> <td><a class="markEnter">成绩录入</a></td> </tr> ';
});
$out+=' </tbody> </table> </td> </tr>';
return new String($out);
});