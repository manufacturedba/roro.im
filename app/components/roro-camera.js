import Component from "@ember/component";

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    const video = this.$("video").get(0);

    const videoSrc = "./proxy/index.m3u8";
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        this.set("error", false);
        console.debug("Camera is ready for playback");
      });

      hls.on(Hls.Events.ERROR, () => {
        if (this.get("error") !== false) {
          this.set("error", true);
        }
        console.error("Camera is offline");
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.addEventListener("loadedmetadata", function() {
        this.set("error", false);
        console.debug("Camera is ready for playback natively");
      });
    }
  }
});
