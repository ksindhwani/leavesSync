var displayName = "Kunal Sindhwani";

function syncEmployeeLeavesInCalender() {
  //var leaveApprovalEmailFilter = 'subject:"Approved: Approval of Leave" After: 2021-06-14 from:hcch.fa.sender@workflow.mail.em2.cloud.oracle.com'
  employeeLeaves = getLeaveApprovalEmails();
  Logger.log(employeeLeaves.length);
  addLeavesInCalender(employeeLeaves);
} 

function addLeavesInCalender(employeeLeaves) {
  var minMaxDates = getMinMaxDates(employeeLeaves);
  var fromDate = minMaxDates[0];
  var toDate = minMaxDates[1];
  var leaveEvent = CalendarApp.getDefaultCalendar().createAllDayEvent(displayName + " On Leave",fromDate,toDate)
  Logger.log("Event Id " + leaveEvent.getId());
  /*Logger.log(fromDate.toDateString());
  Logger.log(toDate.toDateString());*/

}

function getMinMaxDates(employeeLeaves){
  var minFromDate,maxToDate;
  for(var index = 0; index<employeeLeaves.length;index++){
    leaveMailSubject = getMailSubject(employeeLeaves[index]);
    var dateString = leaveMailSubject.substring(leaveMailSubject.indexOf('from'));
    var dateStringSplit = dateString.split(" ");
    var fromDate = new Date(dateStringSplit[1]);
    var toDate = new Date(dateStringSplit[3]);
    if (minFromDate == undefined && maxToDate == undefined) {
      minFromDate = fromDate;
      maxToDate = toDate;
      } else{
        if (minFromDate > fromDate) {
          minFromDate = fromDate;
        }
        if(maxToDate < toDate) {
          maxToDate = toDate;
        }
    }
  }
  return [minFromDate,maxToDate];
}

function getMailSubject(mail){
   var leaveMailSubject = mail.getMessages()[0].getSubject();
   return leaveMailSubject;
}

function getLeaveApprovalEmails() {
  var annualLeaveEmailFilter = 'subject:"Approved: Approval of Annual Leave" After: 2021-06-15';
  var compOffEmailFilter = 'subject:"Approved: Approval of Compensatory Off" After: 2021-06-15';
  var annualLeaveApprovalEmails = GmailApp.search(annualLeaveEmailFilter);
  var compOffLeaveApprovalEmails = GmailApp.search(compOffEmailFilter);
  Logger.log("Annual Leaves " + annualLeaveApprovalEmails.length);
  Logger.log("Comp Off Leaves " + compOffLeaveApprovalEmails.length);
  var employeeLeaves = annualLeaveApprovalEmails.concat(compOffLeaveApprovalEmails);
  return employeeLeaves;
}
