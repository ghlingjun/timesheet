/*TMODJS:{"version":1,"md5":"507d64170a02cbbe3686987567b1bbf8"}*/
template('tpl/course_distribution',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$each(data,function(item,i){
$out+=' <tr data-id="';
$out+=$escape(item.id);
$out+='"> <td><input type="checkbox"/></td> <td>';
$out+=$escape(item.classCode);
$out+='</td> <td>';
$out+=$escape(item.classNames);
$out+='</td> <td>';
$out+=$escape(item.classType);
$out+='</td> <td>';
$out+=$escape(item.stopDate);
$out+='</td> <td><a class="courseDistributionClick">分配</a></td> </tr> ';
});
return new String($out);
});