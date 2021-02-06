import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";

export default Component.extend({
  clock: service(),

  timeTill: computed("clock.time", function() {
    // const showTime = 1612643747269 + 5000000;
    // // 1612642905322 + 3620000;
    // const timeTill = showTime - this.get("clock.time");

    // return (timeTill / 1000).toFixed();
    return false;
  }),

  isLive: computed("clock.time", function() {
    // Now + 1:30
    return false;
  })
});
