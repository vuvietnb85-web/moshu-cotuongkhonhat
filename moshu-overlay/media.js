/* MOSHU overlay — Media nổi + Bonus. Tách root, không đụng logic cờ/học. */
(function () {
  "use strict";
  if (window.__MOSHU_OVERLAY__) return;
  window.__MOSHU_OVERLAY__ = true;

  const TV_CHANNELS = [
    { name: "QPVN", owner: "Truyền hình Quốc phòng Việt Nam", url: "https://qpvn.vn/live/qpvn/master.m3u8", page: "https://qpvn.vn/truyen-hinh-truc-tuyen" },
    { name: "DRT1", owner: "Đài PT-TH Đà Nẵng", page: "https://dnrt.vn/" },
    { name: "DRT2", owner: "Đài PT-TH Đà Nẵng", page: "https://dnrt.vn/" },
    { name: "THTP Cần Thơ", owner: "Đài PT-TH TP Cần Thơ", url: "https://live.canthotv.vn/live/tv/playlist.m3u8", page: "https://canthotv.vn/tv-online/" },
    { name: "THP Hải Phòng", owner: "Đài PT-TH Hải Phòng", url: "https://cdn.thhp.vn/live/285a4c99665fdf84e94956c66bc7dc7eb5d/playlist.m3u8", page: "https://thhp.vn/" },
    { name: "THP3 Hải Phòng", owner: "Đài PT-TH Hải Phòng", url: "https://cdn.thhp.vn/live/28548ca35823d41426d8b3da7ed82bdab13/playlist.m3u8", page: "https://thhp.vn/" },
    { name: "NTV Nghệ An", owner: "Đài PT-TH Nghệ An", page: "https://truyenhinhnghean.vn/" },
    { name: "Truyền hình Đắk Lắk", owner: "Đài PT-TH Đắk Lắk", url: "https://cdn.drt.vn/live/285a27750861b964c27af22091662a74f2f/playlist.m3u8", page: "https://drt.vn/" },
    { name: "KTV Khánh Hòa", owner: "Báo & PT-TH Khánh Hòa", url: "https://cdnbaokhanhhoa.com/live/1332e3a79e27_std.m3u8", page: "https://baokhanhhoa.vn/" },
    { name: "VTV1–VTV9", owner: "Đài Truyền hình Việt Nam", page: "https://vtv.vn/truyen-hinh-truc-tuyen.htm" },
    { name: "HTV7 / HTV9", owner: "Đài Truyền hình TP.HCM", page: "https://htv.vn/truc-tuyen.htm" },
    { name: "THVL1–THVL5", owner: "Đài PT-TH Vĩnh Long", page: "https://www.thvli.vn/live/thvl1-hd" },
    { name: "Hà Nội 1 / Hà Nội 2", owner: "Đài PT-TH Hà Nội", page: "https://hanoionline.vn/" },
    { name: "Huế TV", owner: "Đài PT-TH Huế", page: "https://huetv.com.vn/" },
  ];

  const RADIO_VN = [
    { name: "VOV1 Thời sự", owner: "Đài Tiếng nói Việt Nam", url: "https://audio-lss.vov.vn/live/vov1.m3u8", page: "https://vov.vn/" },
    { name: "VOV2 Văn hóa – Đời sống", owner: "Đài Tiếng nói Việt Nam", url: "https://audio-lss.vov.vn/live/vov2.m3u8", page: "https://vov.vn/" },
    { name: "VOV3 Âm nhạc", owner: "Đài Tiếng nói Việt Nam", url: "https://audio-lss.vov.vn/live/vov3.m3u8", page: "https://vov.vn/" },
    { name: "VOV4 Dân tộc", owner: "Đài Tiếng nói Việt Nam", url: "https://audio-lss.vov.vn/live/vov4.m3u8", page: "https://vov.vn/" },
    { name: "VOV5 Đối ngoại", owner: "Đài Tiếng nói Việt Nam", url: "https://audio-lss.vov.vn/live/vov5.m3u8", page: "https://vov.vn/" },
    { name: "VOV Giao thông Hà Nội", owner: "VOV Giao thông", url: "https://audio-lss.vov.vn/live/giao_thong_ha_noi.m3u8", page: "https://vovgiaothong.vn/" },
    { name: "VOV Giao thông TP.HCM", owner: "VOV Giao thông", url: "https://play.vovgiaothong.vn/live/gthcm/playlist.m3u8", page: "https://vovgiaothong.vn/" },
    { name: "VOV Mekong FM", owner: "VOV Giao thông", url: "https://play.vovgiaothong.vn/live/mekong/playlist.m3u8", page: "https://vovgiaothong.vn/" },
  ];

  /* Stream đã curl kiểm 2026-11-05: domain chính thức / CDN của đài. Nguồn ghi trong note. */
  const RADIO_GLOBAL = [
    {
      name: "BBC World Service",
      owner: "BBC",
      url: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
      page: "https://www.bbc.co.uk/sounds/play/live:bbc_world_service",
      note: "CDN chính thức BBC Media (audio/mpeg, HTTP 200)",
    },
    {
      name: "NPR",
      owner: "National Public Radio",
      url: "https://npr-ice.streamguys1.com/live.mp3",
      page: "https://www.npr.org/",
      note: "NPR Icecast StreamGuys (audio/mpeg, HTTP 200)",
    },
    {
      name: "Deutsche Welle",
      owner: "Deutsche Welle",
      url: "https://dw.audiostream.io/dw/1027/mp3/64/dw08",
      page: "https://www.dw.com/",
      note: "dw.audiostream.io (homepage dw.com; audio/mpeg, HTTP 200)",
    },
    {
      name: "France Inter",
      owner: "Radio France",
      url: "https://icecast.radiofrance.fr/franceinter-midfi.mp3",
      page: "https://www.franceinter.fr/",
      note: "Icecast Radio France chính thức (audio/mpeg, HTTP 200)",
    },
    {
      name: "RFI Tiếng Việt",
      owner: "Radio France Internationale",
      url: "https://rfienvietnamien64k.ice.infomaniak.ch/rfienvietnamien-64.mp3",
      page: "https://www.rfi.fr/vi/",
      note: "Luồng Infomaniak của RFI VI (audio/mpeg, HTTP 200). RFI Monde live02.rfi.fr không trả được từ máy kiểm.",
    },
    {
      name: "NHK World Radio Japan",
      owner: "NHK",
      url: "https://nhkworld-radio.nhkworld.jp/hls/live/nhkworld-radio-media2/index.m3u8",
      page: "https://www3.nhk.or.jp/nhkworld/",
      note: "HLS nhkworld.jp (m3u8, HTTP 206)",
    },
  ];

  const PAYPAL_BASE =
    "https://www.paypal.com/donate/?business=vuvietnb85%40gmail.com&currency_code=USD&item_name=MOSHU&no_recurring=0";
  const KOFI = "https://ko-fi.com/quocvietvu";
  const AMOUNTS = [2, 5, 10, 20];

  const DB_NAME = "moshu-media", STORE = "tracks";
  function openDb() {
    return new Promise((res, rej) => {
      const r = indexedDB.open(DB_NAME, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  }
  function tx(mode, fn) {
    return openDb().then(
      (db) =>
        new Promise((res, rej) => {
          const req = fn(db.transaction(STORE, mode).objectStore(STORE));
          req.onsuccess = () => res(req.result);
          req.onerror = () => rej(req.error);
        })
    );
  }
  const addTrack = (f) =>
    tx("readwrite", (s) => s.add({ name: f.name, type: f.type || "", size: f.size, added: Date.now(), blob: f }));
  const getBlob = (id) => tx("readonly", (s) => s.get(id)).then((r) => r?.blob);
  const deleteTrack = (id) => tx("readwrite", (s) => s.delete(id));
  const clearTracks = () => tx("readwrite", (s) => s.clear());
  function listTracks() {
    return openDb().then(
      (db) =>
        new Promise((res, rej) => {
          const out = [];
          const req = db.transaction(STORE).objectStore(STORE).openCursor();
          req.onsuccess = () => {
            const c = req.result;
            if (!c) return res(out);
            const { id, name, type, size, added } = c.value;
            out.push({ id, name, type, size, added });
            c.continue();
          };
          req.onerror = () => rej(req.error);
        })
    );
  }

  let hlsInst = null;
  async function loadHls(el, url) {
    if (hlsInst) {
      try { hlsInst.destroy(); } catch (_) {}
      hlsInst = null;
    }
    el.removeAttribute("src");
    el.load?.();
    if (/\.m3u8(\?|$)/i.test(url) || url.includes("mpegurl")) {
      if (el.canPlayType("application/vnd.apple.mpegurl")) {
        el.src = url;
      } else {
        const { default: Hls } = await import("https://cdn.jsdelivr.net/npm/hls.js@1.5.17/+esm");
        if (!Hls.isSupported()) throw new Error("Trình duyệt không hỗ trợ HLS");
        const hls = new Hls({ lowLatencyMode: false, enableWorker: true });
        hls.loadSource(url);
        hls.attachMedia(el);
        hlsInst = hls;
      }
    } else {
      el.src = url;
    }
    await el.play().catch(() => undefined);
  }

  const root = document.createElement("div");
  root.id = "vxo-media-root";

  const fab = document.createElement("button");
  fab.type = "button";
  fab.className = "vxm-fab";
  fab.setAttribute("aria-label", "Mở trình phát media");
  fab.textContent = "▶︎ Media";
  root.appendChild(fab);

  const bonusFab = document.createElement("button");
  bonusFab.type = "button";
  bonusFab.className = "vxm-bonus-fab";
  bonusFab.setAttribute("aria-label", "Ủng hộ");
  bonusFab.textContent = "♥ Ủng hộ";
  root.appendChild(bonusFab);

  const sheet = document.createElement("div");
  sheet.className = "vxm-sheet";
  sheet.setAttribute("role", "dialog");
  sheet.setAttribute("aria-modal", "true");
  sheet.setAttribute("aria-label", "Trình phát media");
  sheet.setAttribute("aria-hidden", "true");
  sheet.innerHTML = `
    <header class="vxm-head">
      <strong>MOSHU Media</strong>
      <button type="button" class="vxm-close" aria-label="Đóng">✕</button>
    </header>
    <nav class="vxm-tabs" role="tablist"></nav>
    <div class="vxm-body"></div>
  `;
  root.appendChild(sheet);

  function attachRoot() {
    if (!document.body) return;
    if (root.parentNode !== document.body) document.body.appendChild(root);
  }
  // React hydration của MOSHU có thể xóa node anh em — gắn lại sau hydrate + theo dõi.
  attachRoot();
  const reattach = () => attachRoot();
  setTimeout(reattach, 0);
  setTimeout(reattach, 250);
  setTimeout(reattach, 1000);
  setTimeout(reattach, 2500);
  const mo = new MutationObserver(() => {
    if (!document.getElementById("vxo-media-root")) attachRoot();
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });

  const tabs = [
    ["tv", "📺 TV VN"],
    ["radio", "📻 Radio VN"],
    ["global", "🌍 Radio thế giới"],
    ["music", "🎵 Nhạc"],
    ["read", "📚 EPUB + OCR"],
    ["bonus", "♥ Ủng hộ"],
  ];
  const tabNav = sheet.querySelector(".vxm-tabs");
  const body = sheet.querySelector(".vxm-body");
  const panels = {};
  let currentTab = "tv";
  const seen = { tv: true };

  tabs.forEach(([id, label]) => {
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.tab = id;
    b.textContent = label;
    if (id === "tv") b.classList.add("on");
    b.addEventListener("click", () => go(id));
    tabNav.appendChild(b);
    const sec = document.createElement("section");
    sec.hidden = id !== "tv";
    sec.dataset.panel = id;
    body.appendChild(sec);
    panels[id] = sec;
  });

  function go(id) {
    currentTab = id;
    if (!seen[id]) {
      seen[id] = true;
      buildPanel(id);
    }
    tabNav.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.tab === id));
    Object.entries(panels).forEach(([k, el]) => {
      el.hidden = k !== id;
    });
  }

  function openSheet(tab) {
    sheet.classList.add("open");
    sheet.setAttribute("aria-hidden", "false");
    if (tab) go(tab);
  }
  function closeSheet() {
    sheet.classList.remove("open");
    sheet.setAttribute("aria-hidden", "true");
  }
  fab.addEventListener("click", () => openSheet(currentTab === "bonus" ? "tv" : currentTab));
  bonusFab.addEventListener("click", () => openSheet("bonus"));
  sheet.querySelector(".vxm-close").addEventListener("click", closeSheet);

  function livePanel(list, video) {
    const wrap = document.createElement("div");
    wrap.className = "vxm-live";
    const media = document.createElement("video");
    media.className = video ? "vxm-video" : "vxm-audio";
    media.controls = true;
    media.playsInline = true;
    media.setAttribute("playsinline", "");
    const now = document.createElement("p");
    now.className = "vxm-now";
    now.hidden = true;
    const ul = document.createElement("ul");
    ul.className = "vxm-list";
    const note = document.createElement("p");
    note.className = "vxm-note";
    note.textContent = "Chỉ dùng luồng công khai do chính các đài cung cấp. Đài không cho nhúng sẽ mở trang chính thức.";
    wrap.append(media, now, ul, note);

    list.forEach((c) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.innerHTML = `<strong>${esc(c.name)}</strong><small>${esc(c.owner)}${c.note ? " · " + esc(c.note) : ""}</small><em>${c.url ? "▶ Phát" : "↗ Mở trang đài"}</em>`;
      btn.addEventListener("click", async () => {
        ul.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
        btn.classList.add("on");
        if (!c.url) {
          window.open(c.page, "_blank", "noopener");
          return;
        }
        now.hidden = false;
        now.innerHTML = `${esc(c.name)} · Đang kết nối… · <a href="${esc(c.page)}" target="_blank" rel="noopener">trang chính thức</a>`;
        try {
          await loadHls(media, c.url);
          now.innerHTML = `${esc(c.name)} · Đang phát · <a href="${esc(c.page)}" target="_blank" rel="noopener">trang chính thức</a>`;
        } catch (e) {
          now.textContent = String(e.message || e);
        }
      });
      li.appendChild(btn);
      ul.appendChild(li);
    });
    media.addEventListener("error", () => {
      if (now && !now.hidden) now.innerHTML = (now.textContent || "") + " — Không phát được, thử mở trang chính thức.";
    });
    return wrap;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function musicPanel() {
    const wrap = document.createElement("div");
    wrap.className = "vxm-music";
    const media = document.createElement("video");
    media.className = "vxm-audio";
    media.controls = true;
    media.playsInline = true;
    const row = document.createElement("div");
    row.className = "vxm-row";
    const quota = document.createElement("p");
    quota.className = "vxm-quota";
    const note = document.createElement("p");
    note.className = "vxm-note";
    note.textContent = "Tệp chỉ lưu trên máy này (IndexedDB), không tải lên mạng. Định dạng: mp3/m4a/flac/wav/ogg (theo canPlayType).";
    const ul = document.createElement("ul");
    ul.className = "vxm-list";
    let tracks = [];
    let idx = -1;
    let shuffle = false;
    let repeat = "all";
    let urlRef = null;

    const refreshQuota = async () => {
      try {
        await navigator.storage?.persist?.();
      } catch (_) {}
      if (!navigator.storage?.estimate) {
        quota.textContent = "Trình duyệt không báo dung lượng.";
        return;
      }
      const e = await navigator.storage.estimate();
      const used = ((e.usage || 0) / 1048576).toFixed(1);
      const q = ((e.quota || 0) / 1048576).toFixed(0);
      quota.textContent = `Đã dùng ${used} MB / khoảng ${q} MB còn trong hạn mức trình duyệt.`;
    };
    const refresh = async () => {
      tracks = await listTracks();
      renderList();
      await refreshQuota();
    };
    const playAt = async (i) => {
      const t = tracks[i];
      if (!t) return;
      const probe = document.createElement("audio");
      const mime = t.type || guessMime(t.name);
      if (mime && probe.canPlayType && !probe.canPlayType(mime) && !probe.canPlayType(mime.split(";")[0])) {
        note.innerHTML = `<span class="vxm-unsupported">Định dạng có thể không được hỗ trợ: ${esc(mime || t.name)}</span>`;
      }
      const blob = await getBlob(t.id);
      if (!blob) return;
      if (urlRef) URL.revokeObjectURL(urlRef);
      urlRef = URL.createObjectURL(blob);
      media.src = urlRef;
      idx = i;
      media.className = (t.type || "").startsWith("video") ? "vxm-video" : "vxm-audio";
      await media.play().catch(() => undefined);
      renderList();
    };
    function guessMime(name) {
      const n = name.toLowerCase();
      if (n.endsWith(".mp3")) return "audio/mpeg";
      if (n.endsWith(".m4a")) return "audio/mp4";
      if (n.endsWith(".flac")) return "audio/flac";
      if (n.endsWith(".wav")) return "audio/wav";
      if (n.endsWith(".ogg") || n.endsWith(".opus")) return "audio/ogg";
      return "";
    }
    function nextIndex(dir) {
      if (!tracks.length) return -1;
      if (shuffle) return Math.floor(Math.random() * tracks.length);
      const n = idx + dir;
      if (n >= tracks.length) return repeat === "all" ? 0 : -1;
      if (n < 0) return tracks.length - 1;
      return n;
    }
    media.addEventListener("ended", () => {
      if (repeat === "one") playAt(idx);
      else {
        const n = nextIndex(1);
        if (n >= 0) playAt(n);
      }
    });

    function renderList() {
      ul.innerHTML = "";
      if (!tracks.length) {
        ul.innerHTML = `<li class="vxm-empty">Chưa có bài nào. Bấm “Chọn tệp”.</li>`;
        return;
      }
      tracks.forEach((t, i) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        if (i === idx) btn.classList.add("on");
        btn.innerHTML = `<strong>${esc(t.name)}</strong><small>${(t.size / 1048576).toFixed(1)} MB</small>`;
        btn.addEventListener("click", () => playAt(i));
        const x = document.createElement("button");
        x.type = "button";
        x.className = "vxm-x";
        x.setAttribute("aria-label", "Xóa");
        x.textContent = "✕";
        x.addEventListener("click", async () => {
          await deleteTrack(t.id);
          await refresh();
        });
        li.append(btn, x);
        ul.appendChild(li);
      });
    }

    const fileLbl = document.createElement("label");
    fileLbl.className = "vxm-btn";
    fileLbl.innerHTML = `+ Chọn tệp<input type="file" multiple accept="audio/*,video/*,.mp3,.m4a,.flac,.wav,.ogg,.opus" hidden />`;
    fileLbl.querySelector("input").addEventListener("change", async (e) => {
      const files = e.target.files;
      if (!files) return;
      let n = 0;
      for (const f of Array.from(files)) {
        if (!/^(audio|video)\//.test(f.type) && !/\.(mp3|m4a|aac|flac|wav|ogg|opus|mp4|webm)$/i.test(f.name)) continue;
        try {
          await addTrack(f);
          n++;
        } catch {
          note.textContent = "Hết dung lượng lưu trữ của trình duyệt";
          break;
        }
      }
      await refresh();
      note.textContent = `Đã thêm ${n} tệp. ` + note.textContent;
      e.target.value = "";
    });

    const mkBtn = (label, fn) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "vxm-btn";
      b.textContent = label;
      b.addEventListener("click", fn);
      return b;
    };
    const shuf = mkBtn("🔀 Trộn", () => {
      shuffle = !shuffle;
      shuf.classList.toggle("on", shuffle);
    });
    const rep = mkBtn("🔁 Lặp tất cả", () => {
      repeat = repeat === "off" ? "all" : repeat === "all" ? "one" : "off";
      rep.textContent = repeat === "off" ? "🔁 Không lặp" : repeat === "all" ? "🔁 Lặp tất cả" : "🔁 Lặp 1 bài";
    });
    row.append(
      fileLbl,
      mkBtn("⏮", () => {
        const n = nextIndex(-1);
        if (n >= 0) playAt(n);
      }),
      mkBtn("⏭", () => {
        const n = nextIndex(1);
        if (n >= 0) playAt(n);
      }),
      shuf,
      rep,
      mkBtn("Xóa hết", async () => {
        if (confirm("Xóa toàn bộ danh sách?")) {
          await clearTracks();
          idx = -1;
          await refresh();
        }
      })
    );
    wrap.append(media, row, quota, note, ul);
    refresh();
    return wrap;
  }

  function readPanel() {
    const wrap = document.createElement("div");
    wrap.className = "vxm-read";
    wrap.innerHTML = `
      <h3>Đọc EPUB</h3>
      <div class="vxm-row">
        <label class="vxm-btn">📖 Mở tệp .epub<input type="file" accept=".epub,application/epub+zip" hidden /></label>
        <button type="button" class="vxm-btn" data-a="prev">◀ Trang trước</button>
        <button type="button" class="vxm-btn" data-a="next">Trang sau ▶</button>
        <button type="button" class="vxm-btn" data-a="dec">A−</button>
        <button type="button" class="vxm-btn" data-a="inc">A+</button>
        <button type="button" class="vxm-btn" data-a="theme">🌙 Nền tối</button>
      </div>
      <select class="vxm-select" hidden></select>
      <p class="vxm-empty epub-hint">Chọn một tệp .epub trên máy. Thư viện epub.js tải lười khi mở.</p>
      <div class="vxm-book dark" style="display:none"></div>
      <h3>OCR ảnh (tiếng Việt + Anh)</h3>
      <div class="vxm-row">
        <label class="vxm-btn">🖼 Chọn ảnh<input type="file" multiple accept="image/*" hidden data-ocr /></label>
        <button type="button" class="vxm-btn" data-a="copy" hidden>📋 Sao chép</button>
        <button type="button" class="vxm-btn" data-a="dl" hidden>⬇ Tải .txt</button>
      </div>
      <p class="vxm-note ocr-status"></p>
      <textarea class="vxm-ocr" placeholder="Văn bản nhận dạng sẽ hiện ở đây. Xử lý ngay trên máy; lần đầu cần tải dữ liệu ngôn ngữ (tesseract.js)."></textarea>
    `;
    const bookEl = wrap.querySelector(".vxm-book");
    const sel = wrap.querySelector(".vxm-select");
    const hint = wrap.querySelector(".epub-hint");
    const ocrTa = wrap.querySelector(".vxm-ocr");
    const ocrStatus = wrap.querySelector(".ocr-status");
    let rend = null;
    let size = 100;
    let dark = true;

    wrap.querySelector('input[accept*="epub"]').addEventListener("change", async (e) => {
      const f = e.target.files?.[0];
      if (!f) return;
      ocrStatus.textContent = "Đang tải epub.js…";
      const { default: ePub } = await import("https://cdn.jsdelivr.net/npm/epubjs@0.3.93/+esm");
      rend?.destroy?.();
      bookEl.innerHTML = "";
      bookEl.style.display = "";
      hint.hidden = true;
      const key = `moshu-epub:${f.name}:${f.size}`;
      const book = ePub(await f.arrayBuffer());
      rend = book.renderTo(bookEl, { width: "100%", height: "100%", flow: "paginated" });
      rend.themes.register("dark", { body: { background: "#111 !important", color: "#eee !important" } });
      rend.themes.register("light", { body: { background: "#fff !important", color: "#111 !important" } });
      rend.themes.select(dark ? "dark" : "light");
      rend.themes.fontSize(`${size}%`);
      await rend.display(localStorage.getItem(key) || undefined);
      rend.on("relocated", (loc) => localStorage.setItem(key, loc.start.cfi));
      const nav = await book.loaded.navigation;
      sel.innerHTML = `<option value="" disabled selected>Mục lục — ${esc(f.name)}</option>`;
      nav.toc.forEach((t) => {
        const o = document.createElement("option");
        o.value = t.href;
        o.textContent = (t.label || "").trim();
        sel.appendChild(o);
      });
      sel.hidden = false;
      ocrStatus.textContent = "";
    });
    sel.addEventListener("change", () => rend?.display(sel.value));
    wrap.querySelector('[data-a="prev"]').onclick = () => rend?.prev();
    wrap.querySelector('[data-a="next"]').onclick = () => rend?.next();
    wrap.querySelector('[data-a="dec"]').onclick = () => {
      size = Math.max(60, size - 10);
      rend?.themes.fontSize(`${size}%`);
    };
    wrap.querySelector('[data-a="inc"]').onclick = () => {
      size = Math.min(220, size + 10);
      rend?.themes.fontSize(`${size}%`);
    };
    wrap.querySelector('[data-a="theme"]').onclick = (ev) => {
      dark = !dark;
      bookEl.classList.toggle("dark", dark);
      rend?.themes.select(dark ? "dark" : "light");
      ev.target.textContent = dark ? "🌙 Nền tối" : "☀ Nền sáng";
    };

    const copyBtn = wrap.querySelector('[data-a="copy"]');
    const dlBtn = wrap.querySelector('[data-a="dl"]');
    wrap.querySelector("[data-ocr]").addEventListener("change", async (e) => {
      const files = e.target.files;
      if (!files?.length) return;
      ocrStatus.textContent = "Đang tải tesseract.js (vie+eng)…";
      const { createWorker } = await import("https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/+esm");
      const worker = await createWorker(["vie", "eng"]);
      let out = "";
      for (const f of Array.from(files)) {
        ocrStatus.textContent = `Đang nhận dạng ${f.name}…`;
        const { data } = await worker.recognize(f);
        out += `\n--- ${f.name} ---\n${data.text}`;
        ocrTa.value = out;
      }
      await worker.terminate();
      ocrStatus.textContent = "Xong";
      copyBtn.hidden = !out;
      dlBtn.hidden = !out;
    });
    copyBtn.onclick = () => navigator.clipboard.writeText(ocrTa.value);
    dlBtn.onclick = () => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([ocrTa.value], { type: "text/plain;charset=utf-8" }));
      a.download = "ocr.txt";
      a.click();
    };
    return wrap;
  }

  function bonusPanel() {
    const wrap = document.createElement("div");
    wrap.className = "vxm-bonus";
    wrap.innerHTML = `
      <p class="vxm-note">Ủng hộ là tự nguyện và <strong>không mở khóa</strong> tính năng nào. Mọi phần cờ / học vẫn miễn phí.</p>
      <h3>PayPal</h3>
      <p class="vxm-note">Ủng hộ qua PayPal (mở trang chính thức). Không cần điền email trên app.</p>
      <div class="vxm-amt"></div>
      <h3>Ko-fi</h3>
      <p><a class="vxm-kofi" href="${KOFI}" target="_blank" rel="noopener">Ủng hộ trên Ko-fi</a></p>
    `;
    const amt = wrap.querySelector(".vxm-amt");
    AMOUNTS.forEach((n) => {
      const a = document.createElement("a");
      a.href = `${PAYPAL_BASE}&amount=${n}`;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = `${n} USD`;
      a.dataset.amount = String(n);
      amt.appendChild(a);
    });
    return wrap;
  }

  function buildPanel(id) {
    const el = panels[id];
    el.innerHTML = "";
    if (id === "tv") el.appendChild(livePanel(TV_CHANNELS, true));
    else if (id === "radio") el.appendChild(livePanel(RADIO_VN, false));
    else if (id === "global") el.appendChild(livePanel(RADIO_GLOBAL, false));
    else if (id === "music") el.appendChild(musicPanel());
    else if (id === "read") el.appendChild(readPanel());
    else if (id === "bonus") el.appendChild(bonusPanel());
  }
  buildPanel("tv");

  // Expose for tests
  window.__MOSHU_MEDIA__ = {
    open: openSheet,
    close: closeSheet,
    go,
    amounts: AMOUNTS,
    radiosVn: RADIO_VN,
    radiosGlobal: RADIO_GLOBAL,
  };
})();
