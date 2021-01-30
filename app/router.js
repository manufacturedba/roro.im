import EmberRouter from "@ember/routing/router";
import config from "./config/environment";
import { inject as service } from "@ember/service";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  headData: service(),

  setTitle(title) {
    this.get("headData").set("title", title);
  }
});

Router.map(function() {
  this.route("home", { path: "/" });
  this.route("camera");
  this.route("temperature");
  this.route("pasta");
});

export default Router;
