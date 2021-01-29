import Component from "@ember/component";

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);
    const player = videojs('my-video');
    player.fill(true);
    player.responsive(true);
    player.play();
  }
});
