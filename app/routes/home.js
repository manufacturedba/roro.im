import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import config from "roro-im/config/environment";

export default Route.extend({
  fastboot: service(),

  beforeModel() {
    if (
      this.get("fastboot.isFastBoot") &&
      this.get("fastboot.request.protocol") === "http:" &&
      config.environment === "production"
    ) {
      const host = this.get("fastboot.request.host");

      // Force upgrade through redirect
      this.get("fastboot.response.headers").set("location", `https://${host}`);
      this.set("fastboot.response.statusCode", 301);
    }
  }
});
