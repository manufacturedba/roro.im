import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import config from "roro-im/config/environment";

export default Route.extend({
  fastboot: service(),

  titleToken: "Sky Cam",

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
  }
});
