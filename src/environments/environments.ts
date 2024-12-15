export const environment = {
  production: false,
  firebase: {
    apiKey: process.env['myfirebase.ak'],
    authDomain: process.env['myfirebase.ad'],
    projectId: process.env['myfirebase.pi'],
    storageBucket: process.env['myfirebase.sb'],
    messagingSenderId: process.env['myfirebase.msi'],
    appId: process.env['myfirebase.ai'],
    measurementId: process.env['myfirebase.mid'],
  },
};
