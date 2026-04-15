document.addEventListener("DOMContentLoaded", function () {
  var hash = window.location.hash;
  if (hash) {
    setTimeout(function () {
      var target = document.querySelector(hash);
      if (target) {
        var offset = target.getBoundingClientRect().top + window.pageYOffset - 55;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }, 100); // Small delay to ensure the DOM is fully loaded
  }
});
