import WelcomePage from '../pages/welcome.vue';
import confirmationPage from '../pages/confirmation.vue';
import RegisterPage from '../pages/register.vue';
import RegisterPictPage from '../pages/register-pict.vue';
import otpPage from '../pages/otp.vue';
import signPage from '../pages/signature.vue';
import videoOtpPage from '../pages/video-otp.vue';
import registeredPage from '../pages/registered.vue';
import cgvPage from '../pages/cgv.vue';
import codePenalPage from '../pages/codepenal.vue';
import photoPage from '../pages/photo.vue';

import v from "./app.js"


import NotFoundPage from '../pages/404.vue';
function isLog(){
  var user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  return(user ? user.register : false);
}

var routes = [
  {
    name:'otp',
    path: '/otp/',
    component: otpPage,
    options: {
      transition: 'f7-push',
    }
  },
  {
    name:'welcome',
    path: '/',
    //component: WelcomePage,
    async(routeTo, routeFrom, resolve, reject) {
      if (isLog()) {
        resolve({
          component:WelcomePage 
      });
      } else {
        resolve({
          component:cgvPage
        });
      }
    },
    options: {
      transition: 'f7-push',
    },
  },
  {
    name:'signature',
    path: '/sign/',
    component: signPage,
    options: {
      transition: 'f7-push',
    },
  },
  {
    name:'photo',
    path: '/photo/',
    component: photoPage,
    options: {
      transition: 'f7-push',
    },
  },
  {
    name:'videootp',
    path: '/videootp/',
    component: videoOtpPage,
    options: {
      transition: 'f7-push',
    },
  },
  {
    name:'registered',
    path: '/registered/',
    component: registeredPage,
    options: {
      transition: 'f7-push',
    },
  },
  {
    name:'register',
    path: '/register/',
    component: RegisterPage,
    options: {
      transition: 'f7-push',
    },
  },
  {
    name:'register-pict',
    path: '/register-pict/',
    component: RegisterPictPage,
    options: {
      transition: 'f7-push',
    },
  },
  {
    name:'confirmation',
    path: '/confirmation/',
    component: confirmationPage,
    options: {
      transition: 'f7-push',
    },
  

  },
  {
    name:'codepenal',
    path: '/codepenal/',
    component: codePenalPage,
    options: {
      transition: 'f7-push',
    },
  },
  {
    path: '(.*)',
    beforeEnter:(to, from, next) => {
      var url = to.url.substring(1);
      cordova.InAppBrowser.open(url, '_system');
      next({name:"welcome"});
    },
    component: WelcomePage,
  },
];


export default routes;
