package cn.mobilemd.business.platform.workhour.domain.common.constant;

public interface IWorkhourConstants {

  String split = "-";
  String EmptyStr = "";

  String defaultBeginDate = "1900-01-01";
  String defaultEndDate = "2199-12-31";

  interface VersionNameSort {
    String up = "up";
    String down = "down";
    int firstLine = 0;
  }

  interface FunctionTeamSort {
    String up = "up";
    String down = "down";
    int firstLine = 0;
  }

  interface TaskConfig {
    String parentTrue = "true";
    String parentFalse = "false";
  }

  interface VersionNameRspCode {
    String versionNameAdd_11 = "111|versionname_add_repeat";
    String versionNameUpd_12 = "112|versionname_upd_nullid";
    String versionNameSort_13 = "113|versionname_sort_thefirst";
    String versionNameSort_14 = "114|versionname_sort_thelast";
  }

  interface FunctionTeamRspCode {
    String functionTeamAdd_21 = "121|functionteamname_add_repeat";
    String functionTeamUpd_22 = "122|functionteam_upd_nullid";
    String functionTeamDel_23 = "123|functionteam_del_nullid";
    String functionTeamSort_24 = "124|functionteam_sort_thefirst";
    String functionTeamSort_25 = "125|functionteam_sort_thelast";
    String functionTeamSort_26 = "126|functionteam_sort_nullprojectidorid";
    String functionTeamCopy_27 = "127|functionteam_copy_nullprojectid";
    String functionTeamPersonalSave_28 = "128|functionteampersonal_save_error";
    String functionTeamDel_29 = "129|functionteam_del_nulldata";
  }

  interface ProjectRspCode {

  }

  interface PlanVersionRspCode {
    String VERSION_IN_EDIT = "132|versionname_upd_nullid";
    String VERSION_IN_APPROVAL = "133|versionname_sort_thefirst";
  }

  interface WorkPeriodSheetRspCode {
    String ID_ISNULL = "141|cant modify periodrule cycletype";
  }

  interface WorkPeriodSheetItemRspCode {
    String SHEET_NOT_FOUND = "151|cant modify periodrule cycletype";
    String SHEET_MISMATCH = "152|cant modify periodrule cycletype";
    String SHEETITEM_NOT_FOUND = "153|cant modify periodrule cycletype";
    String DATE_RANGE_NOT_MATCH = "154|cant modify periodrule cycletype";
  }

  interface PeriodRuleRspCode {
    String CANT_MODIFY_PERIODRULE_CYCLETYPE = "161|cant modify periodrule cycletype";
  }

  interface TaskConfigRspCode {
    String TaskConfigAdd_41 = "171|taskconfig_add_piduseridcodenamenull";
    String TaskConfigAdd_42 = "172|taskconfig_add_coderepeat";
    String TaskConfigUpd_43 = "173|taskconfig_upd_idtenantidnull";
    String TaskConfigUpd_44 = "174|taskconfig_upd_coderepeat";
    String TaskConfigDel_45 = "175|taskconfig_del_idlisttenantidnull";
    String TaskConfigList_46 = "176|taskconfig_list_tenantidnull";

  }

  interface PlanTaskRspCode {
    String NOT_FOUND = "181|taskconfig_add_piduseridcodenamenull";
    String NOT_MATCH = "182|taskconfig_add_piduseridcodenamenull";
    String ID_IS_NULL = "183|taskconfig_upd_idtenantidnull";
    String PLAN_VERSION_NOT_MATCH = "184|taskconfig_upd_coderepeat";
    String PLAN_VERSION_ID_ISNULL = "186|taskconfig_list_tenantidnull";

  }

  interface ApprovalSubmit {
    String RefrencedType_workperiodsheet = "workperiodsheet";
    String RefrencedType_planversion = "planversion";
    String ApprovalSubmitType_all = "1";
    String ApprovalSubmitType_anyone = "2";
    //
    String ApprovalSubmitStatus_editing = "0"; // 没进入ApprovalSubmit时的状态
    String ApprovalSubmitStatus_pass = "1";
    String ApprovalSubmitStatus_approvaling = "2";
    String ApprovalSubmitStatus_denied = "3";

    String ErgencyFalse = "false";
    String ErgencyTrue = "true";
  }

  interface ApprovalProcess {
    String ProcessStatus_process = "1";
    String ProcessStatus_unprocess = "2";
    String ProcessMode_main = "1";
    String ProcessMode_notice = "2";
    String approvalProcessOper_init = "0";
    String approvalProcessOper_pass = "1";
    String approvalProcessOper_submitagain = "2";
    String approvalProcessOper_denied = "3";
  }

  interface ApprovalSubmitRspCode {
    String verifyISNULL = "190|isnull";
    String verifyTenantId_51 = "191|tenantidnull";
    String verifyUserId_52 = "192|useridnull";
    String verifySubmitUser_53 = "193|submitusernull";
    String verifySubmitType_54 = "194|submittypenull";
    String verifyReferencedId_55 = "195|referencedidnull";
    String verifyReferencedType_56 = "196|referencedtypenull";
    String verifyApprovalUserList_57 = "197|approvaluserlistnull";
  }

  interface ApprovalProcessRspCode {
    String verifyApprovalProcessMode_61 = "201|processmodenull";
    String verifyApprovalProcessUser_62 = "202|processusernull";
    String verifyApprovalSubmitUser_63 = "203|submitusernull";
    String verifyApprovalProcessRole_64 = "204|processrolenull";
    String operApprovalProcessPwd_65 = "205|errorpassword";
    String operApprovalProcess_66 = "206|errprocessoper";
    String verifyApprovalProcessId_67 = "207|processidnull";
    String verifyApprovalSubmitId_68 = "208|submitidnull";
    String verifyApprovalPwdError_69 = "209|pwd or txt or token type or refreshtoken null";
  }

}