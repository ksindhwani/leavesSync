const yourDisplayName = "<your name>"; // "John Smith"
const calenderName = "<calendar name>"; // "Dev Leaves"
function syncEmployeeLeavesInCalender() {
  employeeLeaves = getLeaveApprovalEmails();
  addLeavesInCalender(employeeLeaves);
} 

function addLeavesInCalender(employeeLeaves) {
  for(var index = 0; index<employeeLeaves.length;index++){
    var fromToDates = getFromToDates(employeeLeaves[index]);
    var fromDate = fromToDates[0];
    var toDate = fromToDates[1];
    if (fromDate == undefined || toDate == undefined) {
      Logger.log("Can't create Leave in calender, undefined from and to date");
      continue;
    }
    var calenderArray=CalendarApp.getCalendarsByName(calenderName);
    var targetCalendar;
    if (calenderArray.length == 0) {
      targetCalendar = CalendarApp.getDefaultCalendar();
    } else{
      targetCalendar = calenderArray[0];
    }
    Logger.log("Calender Name " + targetCalendar.getName());
    Logger.log("From " + fromDate);
    Logger.log("To " + toDate);
    if (isSingleDayEvent(fromDate,toDate)) {
      toDate = null;
    }
    var leaveEvent = targetCalendar.createAllDayEvent(yourDisplayName + " On Leave",fromDate,toDate);
    Logger.log("Event Id " + leaveEvent.getId());
    }
}
/**
 * @param {Date} fromDate 
 * @param {Date} toDate
 */
function isSingleDayEvent(fromDate,toDate){
  return  fromDate.getFullYear() == toDate.getFullYear()
      &&  fromDate.getMonth() == toDate.getMonth()
      &&  fromDate.getDate() == toDate.getDate()   
}
function getFromToDates(employeeLeave){
  leaveMailSubject = getMailSubject(employeeLeave);
  var dateString = leaveMailSubject.substring(leaveMailSubject.indexOf('from'));
  var dateStringSplit = dateString.split(" ");
  var fromDate = new Date(dateStringSplit[1]);
  var toDate = new Date(dateStringSplit[3]);
  toDate.setDate(toDate.getDate() + 1); //. Google Calender event creates event from StartDate -> EndDate-1
  return [fromDate,toDate];
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
