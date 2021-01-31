import Component from "@ember/component";
import { computed } from "@ember/object";

// Thanks https://stackoverflow.com/users/830134/nix
function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutes}${ampm.toUpperCase()}`;
}

export default Component.extend({
  timestamp: computed("data", function() {
    const data = this.get("data");
    if (data) {
      const date = new Date(data.date);
      return formatAMPM(date);
    }
  }),

  temperature: computed("data", function() {
    const data = this.get("data");
    if (data) {
      return (data.temp * 9) / 5 + 32;
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    const socket = io();

    socket.on("temperature", packet => {
      console.debug("Receiving a new packet");
      this.set("data", packet);
    });
  }
});
