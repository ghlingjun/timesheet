/*TMODJS:{"version":1,"md5":"ad7c1203ef1d19a83d0c9d76e77fde01"}*/
template('tpl/examination_questions',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,Data=$data.Data,item=$data.item,i=$data.i,$escape=$utils.$escape,itemC=$data.itemC,ci=$data.ci,$out='';$each(Data,function(item,i){
$out+=' <tr data-id="';
$out+=$escape(item.Id);
$out+='"> <td>';
$out+=$escape(i+1);
$out+='</td> <td> <dl data-questionType="';
$out+=$escape(item.QuestionType);
$out+='"> ';
if(item.QuestionType == 1){
$out+=' <dt>';
$out+=$escape(item.Content);
$out+=' ()</dt> ';
$each(item.ListQuestionAnswerList,function(itemC,i){
$out+=' ';
if(itemC.IsAnswer == 1){
$out+=' <dd><input type="radio" name="radioOptions';
$out+=$escape(itemC.Id);
$out+='" checked /><span class="contents">';
$out+=$escape(itemC.AnswerChoice);
$out+='</span></dd> ';
}else{
$out+=' <dd><input type="radio" name="radioOptions';
$out+=$escape(itemC.Id);
$out+='" /><span class="contents">';
$out+=$escape(itemC.AnswerChoice);
$out+='</span></dd> ';
}
$out+=' ';
});
$out+=' ';
}else if(item.QuestionType == 2){
$out+=' <dt>';
$out+=$escape(item.Content);
$out+=' ()</dt> ';
$each(item.ListQuestionAnswerList,function(itemC,i){
$out+=' ';
if(itemC.IsAnswer == 1){
$out+=' <dd><input type="checkBox" checked /><span class="contents">';
$out+=$escape(itemC.AnswerChoice);
$out+='</span></dd> ';
}else{
$out+=' <dd><input type="checkBox"/><span class="contents">';
$out+=$escape(itemC.AnswerChoice);
$out+='</span></dd> ';
}
$out+=' ';
});
$out+=' ';
}else if(item.QuestionType == 3){
$out+=' <dt>';
$out+=$escape(item.Content);
$out+=' (';
$out+=$escape(item.SortAnswer);
$out+=')</dt> ';
$each(item.ListQuestionAnswerList,function(itemC,ci){
$out+=' <dd><span class="contents">';
$out+=$escape(itemC.AnswerChoice);
$out+='</span></dd> ';
});
$out+=' ';
}
$out+=' </dl> </td> <td> <a class="buttonClick editData"> <span class="listOperateBtn listOperateBtn2"></span> <div class="view_info">编辑<span></span></div> </a> <a class="buttonClick deleteData"> <span class="listOperateBtn listOperateBtn3"></span> <div class="view_info">删除<span></span></div> </a> </td> </tr> ';
});
$out+=' ';
return new String($out);
});