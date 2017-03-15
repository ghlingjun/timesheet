/*TMODJS:{"version":1,"md5":"7b5875fece5e6548b8a3007885fcb22f"}*/
template('tpl/test_questions_mag',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,Data=$data.Data,item=$data.item,i=$data.i,$escape=$utils.$escape,$out='';$each(Data,function(item,i){
$out+=' <tr data-id="';
$out+=$escape(item.Id);
$out+='" data-choosesumcount="';
$out+=$escape(item.ChooseSumCount);
$out+='" data-singlechoosecount="';
$out+=$escape(item.SingleChooseCount);
$out+='" data-doublechoosecount="';
$out+=$escape(item.DoubleChooseCount);
$out+='" data-sortchoosecount="';
$out+=$escape(item.SortChooseCount);
$out+='" data-name="';
$out+=$escape(item.Name);
$out+='" > <td> <span class="normalTestQuestionName">';
$out+=$escape(item.Name);
$out+='</span> <input type="text" class="form-control editTestQuestionName noShow" /> </td> <td>';
$out+=$escape(item.ChooseSumCount);
$out+='</td> <td>';
$out+=$escape(item.SingleChooseCount);
$out+='</td> <td>';
$out+=$escape(item.DoubleChooseCount);
$out+='</td> <td>';
$out+=$escape(item.SortChooseCount);
$out+='</td> <td> <div class="normalOperate"> <a class="buttonClick editData"> <span class="listOperateBtn listOperateBtn2"></span> <div class="view_info">编辑<span></span></div> </a> <a class="buttonClick deleteData"> <span class="listOperateBtn listOperateBtn3"></span> <div class="view_info">删除<span></span></div> </a> </div> <div class="editOperate noShow"> <a class="editOperateYes"> <span class="glyphicon glyphicon-ok"></span> </a> <a class="editOperateNo"> <span class="glyphicon glyphicon-remove"></span> </a> </div> </td> </tr> ';
});
return new String($out);
});