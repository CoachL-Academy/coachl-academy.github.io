// Coach L Academy — Auto Ads, Footer & Privacy FAB Injector
// Add this one line before </body> on any page:
// <script src="site.js"></script>

(function () {

  /* ── AD SLOTS (rotate so each placement is different) ── */
  var slots = [
    "8511414017",
    "1649350550",
    "7367521601",
    "6054439937",
    "2529608371",
    "8903445038"
  ];
  var slotIndex = 0;

  function nextSlot() {
    return slots[slotIndex++ % slots.length];
  }

  function makeAd() {
    var wrapper = document.createElement("div");
    wrapper.style.cssText = "padding:10px 16px;";
    wrapper.innerHTML =
      '<ins class="adsbygoogle" style="display:block" ' +
      'data-ad-client="ca-pub-1566975054213856" ' +
      'data-ad-slot="' + nextSlot() + '" ' +
      'data-ad-format="auto" ' +
      'data-full-width-responsive="true"></ins>';
    return wrapper;
  }

  function pushAd(insEl) {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  }

  /* ── INSERT ADS BEFORE KEY SECTIONS ── */
  function insertAds() {
    // Strategy 1: look for HTML comment markers
    var iterator = document.createTreeWalker(
      document.body, NodeFilter.SHOW_COMMENT, null, false
    );
    var commentNodes = [];
    var node;
    while ((node = iterator.nextNode())) {
      var txt = node.nodeValue.trim();
      if (txt === "Resources Tab" || txt === "Assessment Tab") {
        commentNodes.push(node);
      }
    }
    commentNodes.forEach(function (c) {
      var ad = makeAd();
      c.parentNode.insertBefore(ad, c);
      pushAd(ad.querySelector("ins"));
    });

    // Strategy 2: fallback — insert before #resources and #assessment if no comments found
    if (commentNodes.length === 0) {
      ["resources", "assessment"].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
          var ad = makeAd();
          el.parentNode.insertBefore(ad, el);
          pushAd(ad.querySelector("ins"));
        }
      });
    }
  }

  /* ── INJECT FOOTER ── */
  function insertFooter() {
    if (document.getElementById("cl-footer")) return;
    var footer = document.createElement("div");
    footer.id = "cl-footer";
    footer.style.cssText =
      "text-align:center;padding:24px 20px;color:#555;font-size:0.8rem;" +
      "border-top:1px solid #1a1a2e;margin-top:20px;";
    footer.innerHTML =
      '<p style="margin-bottom:8px;">© 2025 Coach L Academy</p>' +
      '<a href="https://coachl-academy.github.io/privacy-policy.html" ' +
      'style="color:#a78bfa;text-decoration:none;margin:0 10px;">Privacy Policy</a>' +
      '<a href="https://coachl-academy.github.io/index2.html" ' +
      'style="color:#a78bfa;text-decoration:none;margin:0 10px;">All Courses</a>';
    document.body.appendChild(footer);
  }

  /* ── RUN AFTER DOM IS READY ── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      insertAds();
      insertFooter();
    });
  } else {
    insertAds();
    insertFooter();
  }

})();
