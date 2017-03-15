/**
 * @return {[type]} 接口url:tms.activeUrl.oper
 */
var tms = tms || {};
(function(factory) {
    if (typeof module !== 'undefined') {
        module.exports = factory();
    } else {
        tms.urls = factory();
        //window.urls = factory();
    }
}(function() {
    var urls = {
        identity:{
            origUserAuth:"identity/origUserAuth.do",                           //刷新TOKEN
            origUserLogin:"identity/origUserLogin.do"                          //登陆并取项目列表
        },
        workhour:{
            functionTeamAdd:"workhour/functionTeamAdd.do",                     //功能组添加行
            functionTeamCopy:"workhour/functionTeamCopy.do",                   //功能组复制行
            functionTeamDel:"workhour/functionTeamDel.do",                     //功能组删除行
            functionTeamList:"workhour/functionTeamList.do",                   //功能组行清单
            functionTeamPersonalSave:"workhour/functionTeamPersonalSave.do",   //功能组行人员保存
            functionTeamSort:"workhour/functionTeamSort.do",                   //功能组移动行
            functionTeamUpd:"workhour/functionTeamUpd.do",                     //功能组更新行

            periodRuleDetail:"workhour/periodRuleDetail.do",                   //规则设置获取
            periodRuleSave:"workhour/periodRuleSave.do",                       //规则设置保存

            planBriefQuery:"workhour/planBriefQuery.do",                       //计划概要信息
            planVersionCreate:"workhour/planVersionCreate.do",                 //计划版本创建行
            planVersionDetail:"workhour/planVersionDetail.do",                 //计划版本行明细
            planVersionQuery:"workhour/planVersionQuery.do",                   //计划版本行查询
            planVersionUpdate:"workhour/planVersionUpdate.do",                 //计划版本更新行

            projectQuery:"workhour/projectQuery.do",                           //项目清单

            versionNameAdd:"workhour/versionNameAdd.do",                       //版本名称添加行
            versionNameList:"workhour/versionNameList.do",                     //版本名称行清单
            versionNameSort:"workhour/versionNameSort.do",                     //版本名称移动行
            versionNameUpd:"workhour/versionNameUpd.do",                       //版本名称更新行
            periodRuleDetail:"workhour/periodRuleDetail.do",                   //规则设置获取
            periodRuleSave:"workhour/periodRuleSave.do",                       //规则设置保存
            periodRuleCanChangeCycleType:"periodRuleCanChangeCycleType.do",    //规则设置能否修改周期
            projectQuery:"workhour/projectQuery.do",                           //项目清单
            planBriefQuery:"workhour/planBriefQuery.do",                       //计划概要信息
            planVersionCreate:"workhour/planVersionCreate.do",                 //计划版本创建行
            planVersionDetail:"workhour/planVersionDetail.do",                 //计划版本行明细
            planVersionQuery:"workhour/planVersionQuery.do",                   //计划版本行查询
            planVersionUpdate:"workhour/planVersionUpdate.do",                 //计划版本更新行
            planTaskAdd:"workhour/planTaskAdd.do",                             //计划任务添加行
            planTaskList:"workhour/planTaskList.do",                           //计划任务行清单
            planTaskDel:"workhour/planTaskDel.do",                             //计划任务删除行
            planTaskUpd:"workhour/planTaskUpd.do",                             //计划任务更新行
            workPeriodSheetList:"workhour/workPeriodSheetList.do",             //工时填报清单
            workPeriodSheetItemList:"workhour/workPeriodSheetItemList.do",     //工时明细数据获取
            workPeriodSheetItemSave:"workhour/workPeriodSheetItemSave.do",     //工时明细数据保存
            approvalProcess:"workhour/approvalProcess.do",                     //处理审批
            approvalSubmit:"workhour/approvalSubmit.do",                       //提交审批
            planBriefApprovalList:"workhour/planBriefApprovalList.do",         //计划审核清单
            workPeriodApprovalList:"workhour/workPeriodApprovalList.do",        //工时审核清单
            taskConfigList:"workhour/taskConfigList.do",                        //任务清单
            planConfigList:"workhour/planConfigList.do"
        }
       /* periodRuleDetail:"periodRuleDetail",
        planVersionQuery:"planVersionQuery",
        versionNameList:"versionNameList"*/
    };
	return urls;
}));
