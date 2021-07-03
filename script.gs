var yourDisplayName = "<your Display Name>"; // "John Smith"
var calenderName = "<calender name in which leaves need to be created"; // "Dev Leaves"
function syncEmployeeLeavesInCalender() {
  employeeLeaves = getLeaveApprovalEmails();
  addLeavesInCalender(employeeLeaves);
} 

function addLeavesInCalender(employeeLeaves) {
  var minMaxDates = getMinMaxDates(employeeLeaves);
  var fromDate = minMaxDates[0];
  var toDate = minMaxDates[1];
  if (fromDate == undefined || toDate == undefined) {
    Logger.log("Can't create Leave in calender, undefined from and to date");
    return;
  }
  var engineeringCalender=CalendarApp.getCalendarsByName(calenderName);
  Logger.log("Calender Name " + engineeringCalender[0].getName());
  Logger.log("From " + fromDate);
  Logger.log("To " + toDate);
  var leaveEvent = engineeringCalender[0].createAllDayEvent(yourDisplayName + " On Leave",fromDate,toDate);
  Logger.log("Event Id " + leaveEvent.getId());

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
  var todayDate = getTodayStartEpochTime();
Logger.log(todayDate);
const annualLeaveEmailFilter = `subject:"Approved: Approval of Annual Leave" After: ${todayDate} from:hcch.fa.sender@workflow.mail.em2.cloud.oracle.com`;
const compOffEmailFilter = `subject:"Approved: Approval of Compensatory Off" After: ${todayDate} from:hcch.fa.sender@workflow.mail.em2.cloud.oracle.com`;
  var annualLeaveApprovalEmails = GmailApp.search(annualLeaveEmailFilter);
  var compOffLeaveApprovalEmails = GmailApp.search(compOffEmailFilter);
  Logger.log("Total Annual Leaves " + annualLeaveApprovalEmails.length);
  Logger.log("Total Comp Off Leaves " + compOffLeaveApprovalEmails.length);
  var employeeLeaves = annualLeaveApprovalEmails.concat(compOffLeaveApprovalEmails);
  return employeeLeaves;
}

function getTodayStartEpochTime() {
  const secondsSinceEpoch = (date) => Math.floor(date.getTime() / 1000);
  var today = new Date();
  today.setHours(0,0,0,0);
  return secondsSinceEpoch(today);
}
