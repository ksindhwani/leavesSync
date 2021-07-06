# LeavesSync
This project helps to create a google calender event as soon as the leave of the employee gets approved from the system. This projects uses Google Apps Script to scan the email and create calender event. The project is currently focus to sync leaves which are created through **Oracle HRIS** system only.

## Setup

This script is created through Google Apps script. Currently the project is script based, so user has to move script from repo to google suite. Following are steps needed to setup this project.
#### The script is scanning Leave approval mails received in the Gmail inbox after the present day 12 AM, therefore it won't create any calender event if there is no approval mails after the current day 12 AM.


* Open Google Drive and sign in that with your gmail account. The gmail account used should be same as the one where user gets their leave approve emails.
* Click on New -> More -> Google Apps Script. 


**Please make sure the gmail account in your Apps Suite Project should be same as what you used to sign in your drive. Sometimes google uses the default email id for Google Apps Project.**


<img width="400" alt="Screenshot 2021-07-04 at 5 53 26 AM" src="https://user-images.githubusercontent.com/45733301/124367735-892ea600-dc8c-11eb-9f38-9322530e4372.png">

* Gives a cool name for your project. ( as you know naming is important :wink:)   
<img width="250" alt="Screenshot 2021-07-04 at 6 00 59 AM" src="https://user-images.githubusercontent.com/45733301/124367894-f2fb7f80-dc8d-11eb-833d-d4bab9a78436.png">  <img width="250" alt="Screenshot 2021-07-04 at 6 01 05 AM" src="https://user-images.githubusercontent.com/45733301/124367895-f5f67000-dc8d-11eb-8421-cd0563bd3e1a.png">

* Copy the **script.gs** from repo and paste it in the editor of the Google Apps Project.
* Save the project.
* Make sure the calling function at the dropdown should be **syncEmployeeLeavesInCalender**. If not , please change it from dropdown.

<img width="1000" alt="Screenshot 2021-07-04 at 6 13 18 AM" src="https://user-images.githubusercontent.com/45733301/124367994-2e4a7e00-dc8f-11eb-8f0d-b9f68b0d0fa7.png">

* On the first 2 lines of the script, please enter your **Display Name** (will be displayed on calender leave event) and **Calender Name** (case-insensitive) where user wants to create the leave event.
<img width="731" alt="Screenshot 2021-07-04 at 6 23 59 AM" src="https://user-images.githubusercontent.com/45733301/124368124-8df55900-dc90-11eb-98c5-a771d0b37a03.png">

* Add the **Gmail** and **Calender** Services in your script scope by creating the :heavy_plus_sign: icon on the left sidebar along with **Services** section. This is to call the required APIs from the script.
<img width="400" alt="Screenshot 2021-07-04 at 6 29 03 AM" src="https://user-images.githubusercontent.com/45733301/124368322-be3df700-dc92-11eb-8252-a557a10834e2.png">
<img width="350" alt="Screenshot 2021-07-04 at 6 41 12 AM" src="https://user-images.githubusercontent.com/45733301/124368356-065d1980-dc93-11eb-92fa-3a88c7a84689.png">
<img width="350" alt="Screenshot 2021-07-04 at 6 41 48 AM" src="https://user-images.githubusercontent.com/45733301/124368359-09f0a080-dc93-11eb-8628-a42aa5951c60.png">
<img width="250" alt="Screenshot 2021-07-04 at 6 42 07 AM" src="https://user-images.githubusercontent.com/45733301/124368360-0b21cd80-dc93-11eb-8241-26f6075bdd9a.png">

* Time to authorize the services for the script. (Can't do anything without permissions. Almighty Google's rule, not mine :cop:). 
* Click on **Run** from top.
<img width="600" alt="Screenshot 2021-07-04 at 6 45 13 AM" src="https://user-images.githubusercontent.com/45733301/124368504-3ce76400-dc94-11eb-9cee-fcf554bdecd3.png">

* Wait for sometime until the permission pop appears. This will happen for first time execution.
* After Pop-up appears, click on **Review Permissions**.
<img width="300" alt="Screenshot 2021-07-04 at 6 47 00 AM" src="https://user-images.githubusercontent.com/45733301/124368536-7f10a580-dc94-11eb-95d9-8762f301a896.png">

* For the first time users, the following error will be shown after the execution.
* Click on **Advance** -> **Proceed with Unsafety** . You can safely click this option as this is your laptop and your email only.
<img width="400" alt="Screenshot 2021-07-04 at 6 48 44 AM" src="https://user-images.githubusercontent.com/45733301/124368636-7e2c4380-dc95-11eb-9337-4e64204c9010.png">
<img width="400" alt="Screenshot 2021-07-04 at 6 48 52 AM" src="https://user-images.githubusercontent.com/45733301/124368638-82586100-dc95-11eb-920d-1d3599a6104d.png">

* Login to your Gmail account if asked and click **Allow** for the permissions.

<img width="400" alt="Screenshot 2021-07-04 at 7 02 25 AM" src="https://user-images.githubusercontent.com/45733301/124378835-2f5aca00-dce6-11eb-812e-dd331ccc76c1.png">

* Veriy the successful execution through execution Log.
* The successful execution of the script can be verified either by 
  *  Verifying the Calender Event by name **Your Name on Leave** under the specified calender.
  *  Through the genration of **Event Id in Execution Log**.
* To Run the script manually, you can click on **Run** button on the top of script Navbar.
<img width="708" alt="Screenshot 2021-07-04 at 6 31 42 PM" src="https://user-images.githubusercontent.com/45733301/124381780-dd6e7000-dcf6-11eb-8507-e08169f12498.png">

## POINTS TO REMEMBER

* This script only handles the Annual Leave and Compensatory Leave as of now.
* The script takes every Leave request as a seperate event. It won't merge them. This is to make the implementation relatively simple.
* If No Calender Name is defined, the leave Event will be created in Default Calendar.
* Mentioning **Your Display Name** is mandatory.

## Setting Triggers

The above mentioned steps allows you to run the script manually, but you can also configure the script as a schedule job so that it will run automatically. It is recommended to set the execution once in a day during the end hours in order to allow script to scan all the Approval mails recieved during that day.

Please follow the the steps to setup automatic triggers. The above successful execution already created an event for you. Make sure either to clean that event from Calendar to avoid duplicate events from automatic trigger or set the trigger for next day execution.
* Click on **Triggers** from left Sidebar
<img width="200" alt="Screenshot 2021-07-05 at 9 42 26 AM" src="https://user-images.githubusercontent.com/45733301/124407170-ce7ad280-dd75-11eb-9242-6e58760ff690.png">


* Click on **Add Trigger** at bottom right edge.
<img width="1000" alt="Screenshot 2021-07-05 at 9 48 00 AM" src="https://user-images.githubusercontent.com/45733301/124407301-21548a00-dd76-11eb-9280-65a480414e35.png">

* Fill up the information asked in the form dislayed.
  * Function To Run -> syncEmployeeLeavesInCalender
  * Which deplpyment -> Head
  * Event Source -> Time Driven
  * Time Based Trigger -> Day Timer
  * Select Time Of day -> Choose any hour from dropdown when you want to run the script. 
* Click on **Save**
<img width="1000" alt="Screenshot 2021-07-05 at 10 09 39 AM" src="https://user-images.githubusercontent.com/45733301/124408615-27983580-dd79-11eb-9313-ca4db084e767.png">




## TroubleShooting

* You can also the check the logs of the script execution
  * ##### Manual
    * Click on **Execution Log in script editor**
    <img width="700" alt="Screenshot 2021-07-05 at 10 00 46 AM" src="https://user-images.githubusercontent.com/45733301/124408039-f0755480-dd77-11eb-841c-95a6365804ba.png">
    
  * ##### Trigger Based
    * Go to triggers from left Side bar as mentioned in Setting Trigger section.
    * In the Triggers dashboard, hover on your trigger and click on the **three vertical dotss** icon ---> Click on **Failed Executions**.
    * Click on the execution to see the execution Logs.
    * To See the Executions Timeline, Click on **Executions** from left Side Bar. You can also see the logs from this screen too by clicking on the particular  execution.
   <img width="1000" alt="Screenshot 2021-07-05 at 10 12 22 AM" src="https://user-images.githubusercontent.com/45733301/124408773-88c00900-dd79-11eb-92df-5fa01897ecb8.png">

## Future Action Items
* Handle some edge cases like 
  * Handle duplicated Events in Calandar
  * Merging the continuous leaves events into one event.
  * Bugs fixing.

* Turn this into a web app or a chrome extension so that all the setup steps mentioned above can be reduced to merly simple configurations.









