import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";

export default Component.extend({
  clock: service(),

  timeTill: computed("clock.time", function() {
    const showTime = 1612643747269 + 5000000;
    // 1612642905322 + 3620000;
    const timeTill = showTime - this.get("clock.time");

    return (timeTill / 1000).toFixed();
  }),

  isLive: computed("clock.time", function() {
    // Now + 1:30
    const showTime = 1612643747269 + 5000000;
    console.log('Sanity check: ' + new Date(showTime).toString());
    return this.get("clock.time") >= showTime;
  })
});
