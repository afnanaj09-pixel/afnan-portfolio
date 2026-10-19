/* =========================================================
   Afnan Mollah — AI Creator, Writer & English Educator
   ========================================================= */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- AI gallery data ---------- */
  var CAT_LABEL = {
    scifi: "Sci-Fi", military: "Military", wildlife: "Wildlife",
    prehistoric: "Prehistoric", fantasy: "Fantasy", space: "Space", tech: "Tech"
  };

  var ART = [
    { f: "ai-01-antimatter-facility.jpg", t: "Antimatter Production Facility", cat: "scifi" },
    { f: "ai-02-energy-dome.jpg", t: "Energy Dome on the Plain", cat: "scifi" },
    { f: "ai-03-f35-launch.jpg", t: "F-35 Launching a Missile", cat: "military" },
    { f: "ai-04-f35-launch-2.jpg", t: "F-35 Launch — Alternate Angle", cat: "military" },
    { f: "ai-05-f35-launch-3.jpg", t: "F-35 Launch — Close Up", cat: "military" },
    { f: "ai-06-jet-firing.jpg", t: "Jet Firing a Missile", cat: "military" },
    { f: "ai-07-missile-silo.jpg", t: "Missile Launch from a Snowy Silo", cat: "military" },
    { f: "ai-08-orca-shark-ocean.jpg", t: "Orca and Great White in the Ocean", cat: "wildlife" },
    { f: "ai-09-orca-shark-ocean-2.jpg", t: "Orca and Great White — Open Water", cat: "wildlife" },
    { f: "ai-10-orca-shark-ocean-3.jpg", t: "Orca and Great White — The Chase", cat: "wildlife" },
    { f: "ai-11-orca-shark-ocean-4.jpg", t: "Orca and Great White — Surface", cat: "wildlife" },
    { f: "ai-12-orca-circling.jpg", t: "Orca Circling a Great White", cat: "wildlife" },
    { f: "ai-13-orca-hunting.jpg", t: "Orca Hunting a Great White", cat: "wildlife" },
    { f: "ai-14-orca-hunts.jpg", t: "Orca Hunts the Great White", cat: "wildlife" },
    { f: "ai-15-orcas-hunting.jpg", t: "Orcas Hunting a Great White", cat: "wildlife" },
    { f: "ai-16-electric-car.jpg", t: "Person Driving an Electric Car", cat: "tech" },
    { f: "ai-17-coding.jpg", t: "Writing Website Code", cat: "tech" },
    { f: "ai-18-rocket-launch.jpg", t: "Rocket Launching at Night", cat: "space" },
    { f: "ai-19-sorcerer-tome.jpg", t: "Sorcerer Reading a Glowing Tome", cat: "fantasy" },
    { f: "ai-20-titanoboa-crocodile.jpg", t: "Titanoboa Attacking a Crocodile", cat: "prehistoric" },
    { f: "ai-21-titanoboa-river.jpg", t: "Titanoboa Hunting in the River", cat: "prehistoric" },
    { f: "ai-22-titanoboa-swamp.jpg", t: "Titanoboa Hunting in the Swamp", cat: "prehistoric" },
    { f: "ai-23-titanoboa-prehistoric.jpg", t: "Titanoboa in a Prehistoric Jungle", cat: "prehistoric" }
  ];

  var BASE = "assets/gallery/";
  var CAT_ORDER = ["scifi", "military", "wildlife", "prehistoric", "fantasy", "space", "tech"];

  /* ---------- Build gallery (grouped by category) ---------- */
  function buildGallery() {
    var grid = document.getElementById("galleryGrid");
    if (!grid) return;

    CAT_ORDER.forEach(function (cat) {
      var items = [];
      ART.forEach(function (item, i) { if (item.cat === cat) items.push({ item: item, i: i }); });
      if (!items.length) return;

      var group = document.createElement("div");
      group.className = "gallery-group";
      group.setAttribute("data-group", cat);

      var head = document.createElement("div");
      head.className = "gallery-group__head reveal";
      var h3 = document.createElement("h3");
      h3.innerHTML = (CAT_LABEL[cat] || cat) + " <em>" + items.length + "</em>";
      head.appendChild(h3);
      group.appendChild(head);

      var wrap = document.createElement("div");
      wrap.className = "gallery";
      items.forEach(function (x) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "tile reveal";
        btn.setAttribute("data-cat", cat);
        btn.setAttribute("data-index", String(x.i));
        btn.setAttribute("aria-label", "Open " + x.item.t);
        var img = document.createElement("img");
        img.src = BASE + x.item.f;
        img.alt = x.item.t + " — AI-generated artwork by Afnan Mollah";
        img.loading = "lazy";
        var label = document.createElement("span");
        label.className = "tile__label";
        label.textContent = x.item.t;
        btn.appendChild(img);
        btn.appendChild(label);
        wrap.appendChild(btn);
      });
      group.appendChild(wrap);
      grid.appendChild(group);
    });
  }

  /* ---------- Year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Preloader ---------- */
  var preloader = document.getElementById("preloader");
  var loadBar = document.getElementById("loadBar");
  var pct = 0;
  var loadTimer = setInterval(function () {
    pct = Math.min(pct + Math.random() * 22 + 8, 100);
    if (loadBar) loadBar.style.width = pct + "%";
    if (pct >= 100) clearInterval(loadTimer);
  }, 130);
  function hidePreloader() {
    if (loadBar) loadBar.style.width = "100%";
    setTimeout(function () {
      if (preloader) preloader.classList.add("is-done");
      document.body.classList.remove("is-locked");
    }, 320);
  }
  document.body.classList.add("is-locked");

  /* ---------- Custom cursor ---------- */
  var cursor = document.getElementById("cursor");
  var dot = document.getElementById("cursorDot");
  if (cursor && dot && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var cx = 0, cy = 0, tx = 0, ty = 0;
    document.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = "translate(" + tx + "px," + ty + "px) translate(-50%,-50%)";
    });
    (function loop() {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      cursor.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest("a, button, .tile, summary, input, select, textarea")) cursor.classList.add("is-hover");
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest("a, button, .tile, summary, input, select, textarea")) cursor.classList.remove("is-hover");
    });
  } else if (cursor && dot) {
    cursor.style.display = "none"; dot.style.display = "none";
  }

  /* ---------- Nav: scroll state + burger + progress ---------- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("progress");
  var burger = document.getElementById("burger");
  var links = document.getElementById("navLinks");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle("is-scrolled", y > 12);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  if (burger && links) {
    var toggle = function (open) {
      var willOpen = open === undefined ? !links.classList.contains("is-open") : open;
      links.classList.toggle("is-open", willOpen);
      burger.classList.toggle("is-open", willOpen);
      burger.setAttribute("aria-expanded", String(willOpen));
    };
    burger.addEventListener("click", function () { toggle(); });
    links.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { toggle(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });
  }

  /* ---------- Reveal on scroll ---------- */
  function setupReveal() {
    var els = document.querySelectorAll(".reveal");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -42px 0px" });
    els.forEach(function (el, i) { el.style.transitionDelay = (i % 6) * 55 + "ms"; io.observe(el); });
  }

  /* ---------- Active nav link ---------- */
  function setupSpy() {
    var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
    var navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav__links a"));
    if (!sections.length || !navAnchors.length || !("IntersectionObserver" in window)) return;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navAnchors.forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Counters ---------- */
  function setupCounters() {
    var DURATION = 1400;
    function run(el) {
      var target = parseFloat(el.dataset.count);
      var suffix = el.dataset.suffix || "";
      if (prefersReduced || isNaN(target)) { el.textContent = target + suffix; return; }
      var start = performance.now();
      function frame(now) {
        var p = Math.min((now - start) / DURATION, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-count]").forEach(function (el) { el.textContent = (el.dataset.count || "") + (el.dataset.suffix || ""); });
      return;
    }
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.6 });
    document.querySelectorAll("[data-count]").forEach(function (el) { co.observe(el); });
  }

  /* ---------- Magnetic buttons ---------- */
  function setupMagnetic() {
    if (prefersReduced) return;
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - r.left - r.width / 2;
        var my = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + mx * 0.22 + "px," + (my * 0.28 - 3) + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- Tilt card ---------- */
  function setupTilt() {
    if (prefersReduced) return;
    document.querySelectorAll("[data-tilt]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = e.clientY - r.top;
        el.style.transform = "perspective(900px) rotateY(" + (px * 7).toFixed(2) + "deg) rotateX(" + (-(py / r.height - 0.5) * 7).toFixed(2) + "deg)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- Gallery filter + lightbox ---------- */
  function setupGallery() {
    var grid = document.getElementById("galleryGrid");
    var filterBar = document.querySelector(".filters");
    var lightbox = document.getElementById("lightbox");
    var lbImg = document.getElementById("lbImg");
    var lbCap = document.getElementById("lbCap");
    var lbClose = document.getElementById("lbClose");
    var lbPrev = document.getElementById("lbPrev");
    var lbNext = document.getElementById("lbNext");
    if (!grid || !lightbox) return;

    var visible = ART.map(function (_, i) { return i; });
    var current = 0;

    function updateVisible() {
      visible = [];
      grid.querySelectorAll(".gallery-group").forEach(function (group) {
        if (group.classList.contains("is-hidden")) return;
        group.querySelectorAll(".tile").forEach(function (tile) {
          visible.push(parseInt(tile.getAttribute("data-index"), 10));
        });
      });
    }

    if (filterBar) {
      filterBar.addEventListener("click", function (e) {
        var btn = e.target.closest(".filters button[data-filter]");
        if (!btn) return;
        var filter = btn.getAttribute("data-filter");
        filterBar.querySelectorAll("button[data-filter]").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        grid.querySelectorAll(".gallery-group").forEach(function (group) {
          group.classList.toggle("is-hidden", filter !== "all" && group.getAttribute("data-group") !== filter);
        });
        updateVisible();
      });
    }

    function open(index) {
      current = index;
      var item = ART[current];
      lbImg.src = BASE + item.f;
      lbImg.alt = item.t + " — AI-generated artwork by Afnan Mollah";
      lbCap.textContent = item.t + " · " + (CAT_LABEL[item.cat] || "");
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-locked");
    }
    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-locked");
    }
    function step(dir) {
      if (!visible.length) return;
      var pos = visible.indexOf(current);
      if (pos === -1) pos = 0;
      var next = (pos + dir + visible.length) % visible.length;
      open(visible[next]);
    }

    grid.addEventListener("click", function (e) {
      var tile = e.target.closest(".tile");
      if (!tile) return;
      open(parseInt(tile.getAttribute("data-index"), 10));
    });
    if (lbClose) lbClose.addEventListener("click", close);
    if (lbPrev) lbPrev.addEventListener("click", function () { step(-1); });
    if (lbNext) lbNext.addEventListener("click", function () { step(1); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });

    // initial visible set
    updateVisible();
  }

  /* ---------- Contact form ---------- */
  function setupForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;
    var success = document.getElementById("formSuccess");

    function validate(el) {
      var value = (el.value || "").trim();
      var ok = value.length > 0;
      if (el.id === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (el.id === "message") ok = value.length >= 10;
      el.classList.toggle("is-invalid", !ok);
      var msg = form.querySelector('.field__error[data-for="' + el.id + '"]');
      if (msg) msg.classList.toggle("is-shown", !ok);
      return ok;
    }

    document.querySelectorAll("#contactForm input, #contactForm select, #contactForm textarea").forEach(function (el) {
      el.addEventListener("blur", function () { validate(el); });
      el.addEventListener("input", function () { if (el.classList.contains("is-invalid")) validate(el); });
      el.addEventListener("change", function () { if (el.classList.contains("is-invalid")) validate(el); });
    });

    var form2 = document.getElementById("contactForm");
    form2.addEventListener("submit", function (e) {
      e.preventDefault();
      var required = ["name", "email", "service", "message"].map(function (id) { return document.getElementById(id); }).filter(Boolean);
      var allOk = required.map(validate).every(Boolean);
      if (!allOk) { var inv = form2.querySelector(".is-invalid"); if (inv) inv.focus(); return; }
      var success2 = document.getElementById("formSuccess");
      if (success2) {
        success2.classList.add("is-shown");
        success2.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
        setTimeout(function () { success2.classList.remove("is-shown"); }, 6000);
      }
      form2.reset();
    });
  }

  /* ---------- Init ---------- */
  function init() {
    buildGallery();
    onScroll();
    setupReveal();
    setupSpy();
    setupCounters();
    setupMagnetic();
    setupTilt();
    setupGallery();
    setupForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  window.addEventListener("load", hidePreloader);
  setTimeout(hidePreloader, 2600);
})();
