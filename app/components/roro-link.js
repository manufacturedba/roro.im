import Component from "@ember/component";
import { computed } from "@ember/object";
export default Component.extend({
  tagName: "span",

  link: computed("href", "local", function() {
    if (this.get("local")) {
      return this.get("local");
    } else if (this.get("href")) {
      return `https://${this.get("href")}`;
    }
  })
});
