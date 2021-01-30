import Route from "@ember/routing/route";

export default Route.extend({
  title: function(tokens) {
    return (
      "Roberto Rodriguez" + (tokens.length ? " | " + tokens.join(" | ") : "")
    );
  }
});
