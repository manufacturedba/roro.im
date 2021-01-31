import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import config from "roro-im/config/environment";

export default Route.extend({
  fastboot: service(),

  titleToken: "Pasta Weekend",

  beforeModel() {
    if (
      this.get("fastboot.isFastBoot") &&
      config.environment === "production"
    ) {
      const headers = this.get("fastboot.request.headers");
      const protocol = headers.get("X-Forwarded-Proto");

      if (protocol === "http") {
        const host = this.get("fastboot.request.host");

        // Force upgrade through redirect
        this.get("fastboot.response.headers").set(
          "location",
          `https://${host}`
        );
        this.set("fastboot.response.statusCode", 301);
      }
    }
  },

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
      live: config.showIsLive,
      all,
      chosen: all[Math.floor(Math.random() * all.length)]
    };
  }
});
