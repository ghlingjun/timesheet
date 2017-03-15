/*TMODJS:{"version":1,"md5":"05c5b99e49b9e43ef00b40806c93a718"}*/
template('tpl/train_management_detail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$out+=' <tr class="detailContent"> <td colspan=4> <table class="innerTable"> <thead> <tr> <th><input type="checkbox" /></th> <th>培训时间</th> <th>培训地点</th> <th>培训人数限制</th> </tr> </thead> <tbody> ';
$each(data,function(item,i){
$out+=' <tr data-id="';
$out+=$escape(item.id);
$out+='"> <td><input type="checkbox" /></td> <td>';
$out+=$escape(item.trainTime);
$out+='</td> <td>';
$out+=$escape(item.trainPlace);
$out+='</td> <td>';
$out+=$escape(item.numberLimit);
$out+='</td> </tr> ';
});
$out+=' </tbody> </table> </td> </tr>';
return new String($out);
});