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
    const isLive = this.get("isLive");
    const timeTill = this.get("timeTill");

    if (isLive && timeTill) {
      return this.get("clock.time") >= timeTill;
    } else {
      return false;
    }
  }),

  notThisWeekend: computed("clock.time", "cancelledUntil", function() {
    return this.get("cancelledUntil") >= this.get("clock.time");
  }),

  poll() {
    run.later(() => {
      // In some cases, the connection establishes before the listener, so we need extra security
      // to start the showrun
      window.socket.emit("pasta", "ping");
      this.poll();
    }, 5000);
  },

  didInsertElement() {
    this._super(...arguments);
    this.poll();

    window.socket.on("pasta", packet => {
      run(() => {
        if (packet) {
          const { timeTill, isLive, cancelledUntil } = packet;
          console.debug("Receiving a show update");
          this.setProperties({
            timeTill,
            isLive,
            cancelledUntil
          });
        }
      });
    });
  },

  willDestroyElement() {
    window.socket.off("pasta");
  }
});
