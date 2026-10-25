/* ============================================================
   IT4IT 入门 · 共享交互脚本
   ============================================================ */
(function () {
  "use strict";

  var LESSONS = [
    { id: "silos", file: "1-silos.html", n: 1, label: "问题", title: "IT 自己的“部门墙”" },
    { id: "chain", file: "2-value-chain.html", n: 2, label: "价值链", title: "一条属于 IT 的价值链" },
    { id: "streams", file: "3-value-streams.html", n: 3, label: "价值流", title: "四条价值流" },
    { id: "data", file: "4-data-model.html", n: 4, label: "数据", title: "让数据成为主角" },
    { id: "relations", file: "5-relations.html", n: 5, label: "定位", title: "它和 ITIL / DevOps 是什么关系" },
    { id: "quiz", file: "6-quiz.html", n: 6, label: "自测", title: "检查一下：你真的懂了吗" },
    { id: "summary", file: "7-summary.html", n: 7, label: "速查", title: "一页纸记住 IT4IT" }
  ];

  var STORE = {
    visited: "it4it.visited.v1",
    quiz: "it4it.quiz.v1",
    checks: "it4it.checks.v1"
  };

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* 忽略隐私模式报错 */ }
  }

  function currentStepId() {
    var body = document.body;
    var id = body.getAttribute("data-step") || "";
    if (id === "" || id === "start") return "start";
    return id;
  }

  /* ---------------- 顶部步骤条 ---------------- */
  function renderStepper() {
    var el = document.getElementById("stepper");
    if (!el) return;
    var visited = read(STORE.visited, []);
    var cur = currentStepId();

    var html = "";
    LESSONS.forEach(function (s) {
      var cls = "step-dot";
      if (visited.indexOf(s.id) !== -1) cls += " is-done";
      if (s.id === cur) cls += " is-current";
      html += '<a class="' + cls + '" href="' + s.file + '" title="' + s.n + ". " + s.title + '">' +
        '<span class="n">' + (visited.indexOf(s.id) !== -1 && s.id !== cur ? "✓" : s.n) + "</span>" +
        '<span class="label">' + s.label + "</span></a>";
    });
    el.innerHTML = html;
  }

  /* ---------------- 进度记录 ---------------- */
  function markVisited() {
    var cur = currentStepId();
    if (cur === "start") return;
    var visited = read(STORE.visited, []);
    if (visited.indexOf(cur) === -1) {
      visited.push(cur);
      write(STORE.visited, visited);
    }
  }

  function renderProgress() {
    var visited = read(STORE.visited, []);
    var n = visited.length;
    var pct = Math.round((n / LESSONS.length) * 100);
    document.querySelectorAll("[data-progress-bar]").forEach(function (i) {
      i.style.width = pct + "%";
    });
    document.querySelectorAll("[data-progress-text]").forEach(function (el) {
      el.textContent = n + " / " + LESSONS.length + " 站";
    });
    document.querySelectorAll("[data-progress-pct]").forEach(function (el) {
      el.textContent = pct + "%";
    });
  }

  /* ---------------- 页脚上一站 / 下一站 ---------------- */
  function renderFooterNav() {
    var el = document.getElementById("footer-nav");
    if (!el) return;
    var cur = currentStepId();
    var seq = [{ id: "start", file: "index.html", label: "起点" }].concat(LESSONS);
    var idx = -1;
    for (var i = 0; i < seq.length; i++) { if (seq[i].id === cur) { idx = i; break; } }
    var prev = idx > 0 ? seq[idx - 1] : null;
    var next = idx >= 0 && idx < seq.length - 1 ? seq[idx + 1] : null;

    var html = "";
    if (prev) {
      html += '<a class="btn btn-ghost" href="' + prev.file + '">← ' + (prev.label || prev.title) + "</a>";
    } else {
      html += '<span></span>';
    }
    if (next) {
      html += '<a class="btn btn-primary" href="' + next.file + '" data-next>' +
        (next.label ? "下一站：" + next.label : "开始") + " →</a>";
    } else {
      html += '<a class="btn btn-primary" href="index.html">回到学习地图 ↺</a>';
    }
    el.innerHTML = html;
  }

  /* ---------------- 进场动画 ---------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (i) { i.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (i) { io.observe(i); });
    /* 兜底：任何情况下都不允许内容一直隐藏 */
    setTimeout(function () {
      items.forEach(function (i) { i.classList.add("is-in"); });
    }, 1600);
  }

  /* ---------------- 可折叠层（第 2 页） ---------------- */
  function initLayers() {
    document.querySelectorAll(".layer[data-layer]").forEach(function (layer) {
      layer.addEventListener("click", function () {
        layer.classList.toggle("is-open");
      });
    });
  }

  /* ---------------- 价值流标签页（第 3 页） ---------------- */
  function initVsTabs() {
    var tabs = document.querySelectorAll(".vs-tab");
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var key = tab.getAttribute("data-vs");
        document.querySelectorAll(".vs-tab").forEach(function (t) { t.classList.toggle("is-active", t === tab); });
        document.querySelectorAll(".vs-panel").forEach(function (p) {
          p.classList.toggle("is-active", p.getAttribute("data-vs") === key);
        });
        initStageDetail();
        var first = document.querySelector('.vs-panel.is-active .stage');
        if (first) first.click();
      });
    });
  }

  /* 阶段点击 → 展开说明 */
  function initStageDetail() {
    document.querySelectorAll(".vs-panel").forEach(function (panel) {
      var detail = panel.querySelector(".stage-detail");
      var stages = panel.querySelectorAll(".stage");
      if (!detail || !stages.length) return;
      stages.forEach(function (st) {
        st.addEventListener("click", function () {
          stages.forEach(function (s) { s.classList.toggle("is-on", s === st); });
          detail.innerHTML = st.getAttribute("data-detail") || "";
        });
      });
      if (!panel.querySelector(".stage.is-on")) {
        var on = panel.querySelector(".stage.is-on") || stages[0];
        on.click();
      }
    });
  }

  /* ---------------- 数据对象卡（第 4 页） ---------------- */
  function initObjCards() {
    var cards = document.querySelectorAll(".obj[data-obj]");
    var out = document.getElementById("obj-detail");
    if (!cards.length || !out) return;
    cards.forEach(function (c) {
      c.addEventListener("click", function () {
        cards.forEach(function (x) { x.classList.toggle("is-on", x === c); });
        out.innerHTML =
          '<h4 style="margin:0 0 6px">' + c.getAttribute("data-title") + "</h4>" +
          '<p style="margin:0;font-size:14px">' + c.getAttribute("data-desc") + "</p>";
      });
    });
  }

  /* ---------------- 关系表：行高亮（第 5 页） ---------------- */
  function initTableRows() {
    document.querySelectorAll("tr[data-fw]").forEach(function (tr) {
      tr.addEventListener("click", function () {
        tr.classList.toggle("is-open");
        var d = tr.nextElementSibling;
        if (d && d.classList.contains("row-detail")) d.hidden = !d.hidden;
      });
    });
  }

  /* ---------------- 测验 ---------------- */
  function initQuiz() {
    var root = document.getElementById("quiz");
    if (!root) return;
    var questions = Array.prototype.slice.call(root.querySelectorAll(".q[data-answer]"));
    var total = questions.length;
    var answered = 0;
    var correct = 0;
    var bar = document.getElementById("quiz-bar");
    var countEl = document.getElementById("quiz-count");
    var result = document.getElementById("quiz-result");

    function updateBar() {
      if (bar) bar.style.width = Math.round((answered / total) * 100) + "%";
      if (countEl) countEl.textContent = answered + " / " + total;
    }

    questions.forEach(function (q, qi) {
      var opts = Array.prototype.slice.call(q.querySelectorAll(".opt"));
      var answer = q.getAttribute("data-answer").split(",").map(function (s) { return s.trim(); });
      var multi = answer.length > 1;
      var picked = [];
      var done = false;
      var fb = q.querySelector(".feedback");
      var chosen = [];

      function grade() {
        done = true;
        opts.forEach(function (o) { o.disabled = true; });
        var ok = answer.every(function (a) { return chosen.indexOf(a) !== -1; }) && chosen.length === answer.length;
        opts.forEach(function (o) {
          var k = o.getAttribute("data-key");
          if (answer.indexOf(k) !== -1) o.classList.add("is-right");
          else if (chosen.indexOf(k) !== -1) o.classList.add("is-wrong");
          else o.classList.add("is-dim");
        });
        answered++;
        if (ok) correct++;
        if (fb) {
          fb.className = "feedback show " + (ok ? "ok" : "no");
          fb.innerHTML = (ok ? "✅ " : "💡 ") + (ok
            ? q.getAttribute("data-explain-ok")
            : q.getAttribute("data-explain-no"));
        }
        updateBar();
        if (answered === total && result) finish();
      }

      opts.forEach(function (o) {
        o.addEventListener("click", function () {
          if (done) return;
          var k = o.getAttribute("data-key");
          if (multi) {
            if (chosen.indexOf(k) === -1) chosen.push(k); else chosen.splice(chosen.indexOf(k), 1);
            o.classList.toggle("is-picked", chosen.indexOf(k) !== -1);
            o.style.borderColor = chosen.indexOf(k) !== -1 ? "#6d5efc" : "";
            o.style.background = chosen.indexOf(k) !== -1 ? "#f6f5ff" : "";
            var btn = q.querySelector(".js-submit");
            if (btn) btn.disabled = chosen.length === 0;
          } else {
            chosen = [k];
            grade();
          }
        });
      });

      var submit = q.querySelector(".js-submit");
      if (submit) submit.addEventListener("click", function () { if (!done && chosen.length) grade(); });
    });

    function finish() {
      var pct = Math.round((correct / total) * 100);
      var best = read(STORE.quiz, { best: 0, bestPct: 0 });
      var isNew = pct > (best.bestPct || 0);
      if (isNew) write(STORE.quiz, { best: correct, bestPct: pct, total: total });
      else if (!best.total) write(STORE.quiz, { best: correct, bestPct: pct, total: total });

      var msg, sub;
      if (pct >= 90) { msg = "架构师视角已上线 🏆"; sub = "你不只是记住了名词，而是理解了 IT4IT 想解决的问题和它的组织方式。"; }
      else if (pct >= 70) { msg = "入门完成 🎯"; sub = "主线已经掌握。回看错题所在的那一站，把细节补齐就稳了。"; }
      else if (pct >= 40) { msg = "方向对了，值得再走一遍 🧭"; sub = "建议重看第 2、3 站：三层结构和四条价值流是全部内容的地基。"; }
      else { msg = "别急，这很正常 🌱"; sub = "IT4IT 的名词密度确实高。先记住一句话：它就是“IT 自己这条价值链的参考架构”。"; }

      var html = '<div class="card score-card">' +
        '<div class="score-ring">' +
        '<svg width="132" height="132" viewBox="0 0 132 132">' +
        '<circle cx="66" cy="66" r="56" fill="none" stroke="#e8eaf3" stroke-width="11"></circle>' +
        '<circle cx="66" cy="66" r="56" fill="none" stroke="url(#g1)" stroke-width="11" stroke-linecap="round" ' +
        'stroke-dasharray="' + (2 * Math.PI * 56).toFixed(1) + '" stroke-dashoffset="' + (2 * Math.PI * 56 * (1 - pct / 100)).toFixed(1) + '"></circle>' +
        '<defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6d5efc"/><stop offset="1" stop-color="#4338ca"/></linearGradient></defs>' +
        "</svg>" +
        '<div class="val">' + pct + "<small>%</small></div></div>" +
        "<h2 style=\"margin-bottom:6px\">" + msg + "</h2>" +
        '<p class="muted" style="max-width:460px;margin:0 auto 6px">' + sub + "</p>" +
        '<p class="small muted" style="margin-top:14px">答对 <b>' + correct + " / " + total + "</b> 题" +
        (isNew ? " · 新纪录！" : "") + "</p>" +
        '<div class="btn-row" style="justify-content:center;margin-top:18px">' +
        '<button class="btn btn-ghost" onclick="location.reload()">再测一次</button>' +
        '<a class="btn btn-primary" href="7-summary.html">看一页纸速查 →</a></div>' +
        "</div>";
      result.innerHTML = html;
      result.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    updateBar();
  }

  /* ---------------- 速查页检查清单 ---------------- */
  function initChecks() {
    var checks = document.querySelectorAll(".check input[type=checkbox]");
    if (!checks.length) return;
    var saved = read(STORE.checks, {});
    checks.forEach(function (c) {
      var k = c.getAttribute("data-check-id");
      if (saved[k]) { c.checked = true; c.closest(".check").classList.add("is-checked"); }
      c.addEventListener("change", function () {
        saved[k] = c.checked;
        c.closest(".check").classList.toggle("is-checked", c.checked);
        write(STORE.checks, saved);
        updateFinishBtn();
      });
    });
    function updateFinishBtn() {
      var all = document.querySelectorAll(".check input[type=checkbox]");
      var on = document.querySelectorAll(".check input[type=checkbox]:checked");
      var btn = document.getElementById("finish-btn");
      if (btn) btn.disabled = on.length < all.length;
      var t = document.getElementById("finish-hint");
      if (t) t.textContent = on.length + " / " + all.length + " 项已确认";
    }
    updateFinishBtn();
  }

  /* ---------------- 首页地图完成态 ---------------- */
  function initMap() {
    var visited = read(STORE.visited, []);
    document.querySelectorAll("[data-map-step]").forEach(function (el) {
      var id = el.getAttribute("data-map-step");
      if (visited.indexOf(id) === -1) return;
      el.classList.add("is-done");
      var go = el.querySelector(".go");
      if (go) go.textContent = "✓";
    });
  }

  /* ---------------- 初始化 ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    markVisited();
    renderStepper();
    renderProgress();
    renderFooterNav();
    initReveal();
    initLayers();
    initVsTabs();
    initStageDetail();
    initObjCards();
    initTableRows();
    initQuiz();
    initChecks();
    initMap();
    renderProgress();
  });
})();
