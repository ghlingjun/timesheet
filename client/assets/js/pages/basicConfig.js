// Created by cde.chen on 17-3-10.

$(function () {
    /*var softwareCode=userInfo.softwareCode;
    var accrssToken=userInfo.accessToken;
    var tokenType=userInfo.tokenType;*/
    tms.services.periodRuleDetail({
        requestBody:{
            "tenantId": "72012ed3-0a4f-45f8-ac16-f051a207895b",
            "startDate": "20160212",
            "cycleType": "month",
            "daysFromEndDateToSubmitDeadline": 4,
            "allowSubmitBeforeEndDate": false,
            "daysAllowSubmitAfterDeadline": 4,
            "daysFromSubmitDeadlineToSubmitDeadline": 4
        },
        callback:function (data) {
            console.log(data)
            projectTable.bootstrapTable({
                data:data
            })
        }
    })
})
