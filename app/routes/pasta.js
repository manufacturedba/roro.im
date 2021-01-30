import Route from "@ember/routing/route";

import { getOwner } from "@ember/application";

export default Route.extend({
  model() {
    const all = [
      "IMG_20181228_191514-served.jpg",
      "IMG_20181231_221843_360-served.jpg",
      "IMG_20190421_170855-served.jpg",
      "IMG_20190614_132618-served.jpg",
      "IMG_20200526_182219-served.jpg",
      "VID_20181022_213648-served.gif"
    ];

    return {
      live: getOwner(this).resolveRegistration("config:environment").showIsLive,
      all,
      chosen: all[Math.floor(Math.random() * all.length)]
    };
  }
});
