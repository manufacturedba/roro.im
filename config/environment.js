"use strict";

module.exports = function(environment) {
  let ENV = {
    modulePrefix: "roro-im",
    environment,
    rootURL: "/",
    locationType: "auto",
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    fastboot: {
      hostWhitelist: ["roberto-rodriguez.com", /^localhost:\d+$/]
    }
  };

  if (environment === "development") {
    ENV.firebase = {
      apiKey: "gofuckyourself",
      authDomain: "i-love-poop.firebaseapp.com",
      databaseURL: "https://smart-init?.firebaseio.com",
      storageBucket: "cheaky.appspot.com"
    };
    ENV.showIsLive = true;
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.locationType = "none";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;
  }

  if (environment === "production") {
    ENV.firebase = {
      apiKey: process.env.fireApiKey,
      authDomain: process.env.fireAuthDomain,
      databaseURL: process.env.fireDatabaseURL,
      storageBucket: process.env.fireStorageBucket
    };
    ENV.showIsLive = process.env.SHOW_IS_LIVE === "true";
  }

  return ENV;
};
