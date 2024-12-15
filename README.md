# StatusPageApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

# Status Page App

## Description
The **Status Page App** is an Angular-based web application that uses Firebase as its backend. This app allows users to manage and view incidents and services. Authentication is enabled via Google Login.

## Getting Started

### Prerequisites
1. Node.js: Ensure Node.js is installed on your system. You can download it from [Node.js official site](https://nodejs.org/).
2. Angular CLI: Install Angular CLI globally using the following command:
   npm install -g @angular/cli
3. Firebase Account: Create a Google Firebase account if you don’t already have one.

### Installation
Follow these steps to set up the project locally:

1. Clone the repository:
   git clone https://github.com/your-username/status-page-app.git
2. Navigate to the project directory:
   cd status-page-app
3. Install the dependencies:
   npm install
4. Set up Firebase:
   - Log in to your Firebase account.
   - Create a new project in the Firebase console.
   - Copy the Firebase configuration object from Project Settings > General > Your Apps > Firebase SDK snippet.
   - Paste the configuration object into the `environment.ts` file located in the `src/environments/` folder. Example:
     export const environment = {
       production: false,
       firebase: {
         apiKey: "your-api-key",
         authDomain: "your-auth-domain",
         projectId: "your-project-id",
         storageBucket: "your-storage-bucket",
         messagingSenderId: "your-messaging-sender-id",
         appId: "your-app-id",
       },
     };

5. Run the application:
   ng serve
   The app will be available at http://localhost:4200/.

### Features
- Authentication: Login using your Google account.
- Navigation:
  - Incidents: View and manage incidents.
  - Services: View and manage services.
  - Logout: Log out of the application.

### Firebase Configuration
Ensure you have enabled the following in your Firebase console:
- Firestore Database: Add a Firestore database to manage the app's data.
- Authentication: Enable Google sign-in under the Authentication section.

### Deployment
You can deploy the app using Firebase Hosting:
1. Install the Firebase CLI globally:
   npm install -g firebase-tools
2. Log in to Firebase:
   firebase login
3. Initialize Firebase in the project:
   firebase init
4. Deploy the app:
   firebase deploy

## License
This project is licensed under the MIT License.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
