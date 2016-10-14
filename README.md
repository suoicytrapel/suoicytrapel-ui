# le-partycious-ui
LePartycious FrontEnd Code Repository

PreRequisites to get started :-

1) Download and install Git tool with version 2.7.0
2) Download and install Git client i.e Tortoise Git with version 1.8.16.0
3) Download node with version 4.2.4
4) Pull the project 'leparticious-ui' from the Git repository URL 'https://github.com/leparticious/le-partycious-ui'
5) Open a command prompt window and go to the project root directory
6) Execute the below commands in the mentioned order :-

	npm install npm -g
	npm install
	npm install grunt
	npm install -g bower grunt-cli
	bower install angular-bootstrap --save

7) Once executed, you will be able to see two more directories inside your folder directory with name 'bower_components' and 'node_modules'
8) Execute the grunt command to run/deploy the 'leparticious-ui' app on the grunt server.

	grunt server

9) Your application will be running on the default port '9000'. Check it out on your browser window.


Steps to run  the application on Production (VPS) :-

1) Make changes in the constants.js file to set the 'API_HOST' point to production URL
2) Run the 'grunt build' command to generate the dist folder.
3) Copy the contents of dist folder to '/var/www/html' folder on VPS server.
4) Make changes in application.properties file to set the production db params.
4)i) Login to Putty and shut down tomcat server using command 'sudo service tomcat7 stop'
5) Run the gradle tasks in the following order :- 'clean' & then 'build'.
5)i) first navigate to 'cd /var/lib/tomcat7/webapps' folder and run command 'ls -ltr' for listing the content of folder/drive.
5)ii) Remove lepartycious.war and lepartycious folder (rm lepartycious.war && rm -rf lepartycious(folder)
6) Copied the 'lepartycious.war' file from build folder to 'cd /var/lib/tomcat7/webapps' folder on VPS server.

7) Restart the tomcat server by executing below command on VPS server :-
	'sudo service tomcat7 start'
8) Restart the apache server by executing the below command on VPS server :-
	'sudo service apache2 restart'
9) Run the application by typing 'lepartycious' in the browser window.

Note :- Apache logs can be monitored @ '/home/logs/apache_error.log' file
Tomcat logs can be monitored @ '/var/lib/tomcat7/logs/catalina.out' file

Basic Unix Commands :-

1) To see previously executed commands
	history
2) To change the directory
	cd <path-to-destination-folder>
3) To go back to the previous directory
	cd -
4) To open the file in read only mode
	less <file-name>
5) To close the open file
	q
6) To open the file in edit mode
	vi <file-name>
7) To close the open file by saving
	Press Esc --> : --> wq --> Enter
8) To close the open file wihtout saving
	Press Esc --> : --> q! --> Enter
