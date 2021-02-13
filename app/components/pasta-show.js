import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { run } from "@ember/runloop";

export default Component.extend({
  clock: service(),

  isLive: false,

  showTime: computed("clock.time", "timeTill", function() {
    const timeTill = this.get("timeTill");

    if (timeTill) {
      const showTime = this.get("timeTill") - this.get("clock.time");

      return (showTime / 1000).toFixed();
    } else {
      return false;
    }
  }),

  showIsLive: computed("clock.time", "isLive", "timeTill", function() {
    return true;
  }),

  didInsertElement() {
    this._super(...arguments);

    window.socket.on("pasta", packet => {
      run(() => {
        if (packet) {
          const { timeTill, isLive } = packet;
          console.debug("Receiving a show update");
          this.setProperties({
            timeTill,
            isLive
          });
        }
      });
    });
  },

  willDestroyElement() {
    window.socket.off("pasta");
  }
});
