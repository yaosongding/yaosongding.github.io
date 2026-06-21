(function () {
  var container = document.getElementById("giscus-container");
  if (!container) return;

  function loadGiscus() {
    var script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "yaosongding/yaosongding.github.io");
    script.setAttribute("data-repo-id", "MDEwOlJlcG9zaXRvcnkzMjk5NDIzNDM=");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDOE6qFR84C_lAJ");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "dark");
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    container.appendChild(script);
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            loadGiscus();
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );
    observer.observe(container);
  } else {
    setTimeout(loadGiscus, 500);
  }
})();
