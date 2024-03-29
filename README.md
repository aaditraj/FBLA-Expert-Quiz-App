## Coding and Programming Quiz Application ##

Aaditya Raj, Homestead High School (9th)


### Installation Instructions: ###

This application, ‘FBLA Expert’, can be installed and run on Mac or Windows. On Mac, if you receive warnings of malicious software preventing the launch, right click the application and click ‘Open’. If you receive warnings of malicious software on Windows, disregard those warnings and proceed with launching the app. Internet connection is needed, since the application interfaces with a Cloud database.  


### Login Instructions: ###

After launching the application, you will be directed to a login page. Create a new account to log in.

### Description: ###

This app generates a random five-question quiz about FBLA. Question types include dropdown, fill-in-the-blank, multiple choice, and true-or-false. New users must first create an account with their first name, last name, email, and a strong password. Existing users must login, upon which they will be taken to the quiz page. After submitting the quiz, users are taken to a results page. This page also contains the option to take another quiz, download the current quiz results, and view quiz statistics associated with the user's account.

### Features: ###
- Login system that uses Firebase Authentication
- Five-question quiz generated from a Firebase Cloud Firestore database
- Download quiz results as a PDF
- View quiz statistics for a user
  - average score
  - highest score
  - lowest score

### Future Enhancements: ###

The app can be enhanced in the future based on intended use. For example, viewing and downloading past quiz reports could be a useful feature. The performance of the app can also be improved by minimizing calls to the database.

### Source Code Information: ###

The source code for the application is located in the CAP_src folder in the submission. Some of the main files are:  
- src/App.js: main application file which gets loaded into the HTML
- public/electron.js: creates the electron window where the application is displayed
- src/components: contains the files for the login system, fetching question data from the database, displaying question components, and the functionalities for downloading a printable PDF report and viewing statistics.
