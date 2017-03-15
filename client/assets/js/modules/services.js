/**
 * @return {[type]} 接口 tms.services.oper
 */
var tms = tms || {};

(function($) {
	//接口命名空间
	var me = this;
	me.services = me.services || {};
	var ajax_host = "/";

    //登陆并取项目列表
    this.services.origUserLogin = function(params) {
        var path = ajax_host + me.urls.identity.origUserLogin;
        ajaxSend.post(params, path);
    };

    //刷新TOKEN
    this.services.origUserAuth = function(params) {
        var path = ajax_host + me.urls.identity.origUserAuth;
        ajaxSend.post(params, path);
    };

    //任务类型添加行
    this.services.taskConfigAdd = function(params) {
        var path = ajax_host + me.urls.workhour.taskConfigAdd;
        ajaxSend.post(params, path);
    };

    //任务类型删除行
    this.services.taskConfigDel = function(params) {
        var path = ajax_host + me.urls.workhour.taskConfigDel;
        ajaxSend.post(params, path);
    };

    //任务类型行清单
    this.services.taskConfigList = function(params) {
        var path = ajax_host + me.urls.workhour.taskConfigList;
        ajaxSend.post(params, path);
    };

    //任务类型更新行
    this.services.taskConfigUpd = function(params) {
        var path = ajax_host + me.urls.workhour.taskConfigUpd;
        ajaxSend.post(params, path);
    };

    //功能组删除行
    this.services.functionTeamDel = function(params) {
        var path = ajax_host + me.urls.workhour.functionTeamDel;
        ajaxSend.post(params, path);
    };

    //功能组行清单
    this.services.functionTeamList = function(params) {
        var path = ajax_host + me.urls.workhour.functionTeamList;
        ajaxSend.post(params, path);
    };

    //功能组行人员保存
    this.services.functionTeamPersonalSave = function(params) {
        var path = ajax_host + me.urls.workhour.functionTeamPersonalSave;
        ajaxSend.post(params, path);
    };

    //功能组移动行
    this.services.functionTeamSort = function(params) {
        var path = ajax_host + me.urls.workhour.functionTeamSort;
        ajaxSend.post(params, path);
    };

    //功能组更新行
    this.services.functionTeamUpd = function(params) {
        var path = ajax_host + me.urls.workhour.functionTeamUpd;
        ajaxSend.post(params, path);
    };

    //功能组添加行
    this.services.functionTeamAdd = function(params) {
        var path = ajax_host + me.urls.workhour.functionTeamAdd;
        ajaxSend.post(params, path);
    };

    //功能组复制行
    this.services.functionTeamCopy = function(params) {
        var path = ajax_host + me.urls.workhour.functionTeamCopy;
        ajaxSend.post(params, path);
    };

    //版本名称添加行
    this.services.versionNameAdd = function(params) {
        var path = ajax_host + me.urls.workhour.versionNameAdd;
        ajaxSend.post(params, path);
    };

    //版本名称行清单
    this.services.versionNameList = function(params) {
        var path = ajax_host + me.urls.workhour.versionNameList;
        ajaxSend.post(params, path);
    };

    //版本名称移动行
    this.services.versionNameSort = function(params) {
        var path = ajax_host + me.urls.workhour.versionNameSort;
        ajaxSend.post(params, path);
    };

    //版本名称更新行
    this.services.versionNameUpd = function(params) {
        var path = ajax_host + me.urls.workhour.versionNameUpd;
        ajaxSend.post(params, path);
    };

    //规则设置获取
    this.services.periodRuleDetail = function(params){
        var path = ajax_host + me.urls.workhour.periodRuleDetail;
        ajaxSend.post(params, path);
    };

    //规则设置保存
    this.services.periodRuleSave = function(params){
        var path = ajax_host + me.urls.workhour.periodRuleSave;
        ajaxSend.post(params, path);
    };

    //规则设置能否修改周期
    this.services.periodRuleCanChangeCycleType = function(params){
        var path = ajax_host + me.urls.workhour.periodRuleCanChangeCycleType;
        ajaxSend.post(params, path);
    };

    //项目清单
    this.services.projectQuery = function(params){
        var path = ajax_host + me.urls.workhour.projectQuery;
        ajaxSend.post(params, path);
    };

    //计划概要信息
    this.services.planBriefQuery = function(params){
        var path = ajax_host + me.urls.workhour.planBriefQuery;
        ajaxSend.post(params, path);
    };

    //计划版本创建行
    this.services.planVersionCreate = function(params){
        var path = ajax_host + me.urls.workhour.planVersionCreate;
        ajaxSend.post(params, path);
    };

    //计划版本行明细
    this.services.planVersionDetail = function(params){
        var path = ajax_host + me.urls.workhour.planVersionDetail;
        ajaxSend.post(params, path);
    };

    //计划版本行查询
    this.services.planVersionQuery = function(params){
        var path = ajax_host + me.urls.workhour.planVersionQuery;
        ajaxSend.post(params, path);
    };

    //计划版本更新行
    this.services.planVersionUpdate = function(params){
        var path = ajax_host + me.urls.workhour.planVersionUpdate;
        ajaxSend.post(params, path);
    };

    //计划任务添加行
    this.services.planTaskAdd = function(params){
        var path = ajax_host + me.urls.workhour.planTaskAdd;
        ajaxSend.post(params, path);
    };

    //计划任务行清单
    this.services.planTaskList = function(params){
        var path = ajax_host + me.urls.workhour.planTaskList;
        ajaxSend.post(params, path);
    };

    //计划任务删除行
    this.services.planTaskDel = function(params){
        var path = ajax_host + me.urls.workhour.planTaskDel;
        ajaxSend.post(params, path);
    };

    //计划任务更新行
    this.services.planTaskUpd = function(params){
        var path = ajax_host + me.urls.workhour.planTaskUpd;
        ajaxSend.post(params, path);
    };

    //工时填报清单
    this.services.workPeriodSheetList = function(params){
        var path = ajax_host + me.urls.workhour.workPeriodSheetList;
        ajaxSend.post(params, path);
    };

    //工时明细数据获取
    this.services.workPeriodSheetItemList = function(params){
        var path = ajax_host + me.urls.workhour.workPeriodSheetItemList;
        ajaxSend.post(params, path);
    };

    //工时明细数据保存
    this.services.workPeriodSheetItemSave = function(params){
        var path = ajax_host + me.urls.workhour.workPeriodSheetItemSave;
        ajaxSend.post(params, path);
    };

    //处理审批
    this.services.approvalProcess = function(params){
        var path = ajax_host + me.urls.workhour.approvalProcess;
        ajaxSend.post(params, path);
    };

    //提交审批
    this.services.approvalSubmit = function(params){
        var path = ajax_host + me.urls.workhour.approvalSubmit;
        ajaxSend.post(params, path);
    };

    //计划审核清单
    this.services.planBriefApprovalList = function(params){
        var path = ajax_host + me.urls.workhour.planBriefApprovalList;
        ajaxSend.post(params, path);
    };

    //工时审核清单
    this.services.workPeriodApprovalList = function(params){
        var path = ajax_host + me.urls.workhour.workPeriodApprovalList;
        ajaxSend.post(params, path);
    };

    this.services.planConfigList = function(params){
        var path = ajax_host + me.urls.workhour.planConfigList;
        ajaxSend.post(params, path);
    };


	//第一种方式：方法名对应接口传参中的head.oper值，head.oper可以不传
	//如果传递了优先取传参中的head.oper
	/*this.services.periodRuleDetail = function(params) {
		var path = me.urls.periodRuleDetail;
		ajaxSend.post(params, path);
	}

	this.services.planVersionQuery = function(params) {
		var path = me.urls.planVersionQuery;
		aja xSend.post(params, path);
	}

    this.services.versionNameList = function(params) {
        var path = me.urls.versionNameList;
        ajaxSend.post(params, path);
    }

    //第二种方式统一方法调后端接口，必须在传参中指定 head.oper 的值
    this.services.oper = function(params) {
        ajaxSend.post(params);
    }*/
}).call(tms, jQuery);