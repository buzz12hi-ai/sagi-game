/* =========================================================
   preview.js
   開発用「全問題プレビュー・ビジュアルチェッカー」
   全64問の画像サムネイル・問題文・3原則タグ選択肢を一括目視確認
   （DEBUG_MODE = true 時のみ有効）
   ========================================================= */

function initQuestionPreview() {
  if (typeof DEBUG_MODE === "undefined" || !DEBUG_MODE) return;

  // 1. タイトル画面に開発用プレビューを開くボタンを注入
  injectPreviewLauncherButton();

  // 2. プレビュー用モーダルUIの作成
  createPreviewModalDOM();
}

function injectPreviewLauncherButton() {
  const titleCard = document.querySelector(".title-card-full");
  if (!titleCard) return;

  const launchBtn = document.createElement("button");
  launchBtn.id = "btn-open-preview";
  launchBtn.type = "button";
  launchBtn.className = "btn-dev-preview-launcher";
  launchBtn.innerHTML = "🛠️ 開発用：全問題・画像プレビューを開く";
  launchBtn.onclick = () => openPreviewModal();
  titleCard.appendChild(launchBtn);
}

function createPreviewModalDOM() {
  if (document.getElementById("preview-modal-container")) return;

  const container = document.createElement("div");
  container.id = "preview-modal-container";
  container.className = "preview-modal-overlay is-hidden";
  container.innerHTML = `
    <div class="preview-modal-window">
      <header class="preview-modal-header">
        <div class="preview-header-title">
          <h2>🛠️ 全問題・画像プレビュー（全64問チェッカー）</h2>
          <span id="preview-total-count" class="preview-badge-count">64問</span>
        </div>
        <button id="btn-close-preview" type="button" class="preview-btn-close">✕ 閉じる</button>
      </header>

      <!-- 絞り込みコントロールバー -->
      <div class="preview-controls-bar">
        <div class="preview-control-group">
          <label>モード:</label>
          <select id="preview-filter-mode">
            <option value="all">すべてのモード</option>
            <option value="elementary">小学生モード</option>
            <option value="teen">中高生モード</option>
            <option value="adult">一般（大人）モード</option>
            <option value="senior">高齢者モード</option>
          </select>
        </div>

        <div class="preview-control-group">
          <label>区分:</label>
          <select id="preview-filter-category">
            <option value="all">すべての区分</option>
            <option value="scam">🚨 詐欺</option>
            <option value="real">⭕ 本物</option>
            <option value="help">🤝 助ける</option>
          </select>
        </div>

        <div class="preview-control-group">
          <label>ID・タイトル検索:</label>
          <input type="text" id="preview-search-keyword" placeholder="キーワード入力...">
        </div>

        <div class="preview-control-group checkbox-group">
          <label>
            <input type="checkbox" id="preview-filter-error-only">
            <span style="color: #E85C4A; font-weight: bold;">⚠️ 画像エラーのみ表示</span>
          </label>
        </div>
      </div>

      <!-- 問題カード一覧コンテナ -->
      <div id="preview-cards-grid" class="preview-cards-grid"></div>
    </div>
  `;

  document.body.appendChild(container);

  // イベント登録
  document.getElementById("btn-close-preview").onclick = closePreviewModal;
  document.getElementById("preview-filter-mode").onchange = renderPreviewCards;
  document.getElementById("preview-filter-category").onchange = renderPreviewCards;
  document.getElementById("preview-search-keyword").oninput = renderPreviewCards;
  document.getElementById("preview-filter-error-only").onchange = renderPreviewCards;
}

function openPreviewModal() {
  const container = document.getElementById("preview-modal-container");
  if (container) {
    container.classList.remove("is-hidden");
    renderPreviewCards();
  }
}

function closePreviewModal() {
  const container = document.getElementById("preview-modal-container");
  if (container) {
    container.classList.add("is-hidden");
  }
}

function getAllQuestionsFlat() {
  const list = [];

  if (typeof QUESTIONS_ELEMENTARY !== "undefined") {
    QUESTIONS_ELEMENTARY.forEach((q, i) => list.push({ ...q, modeKey: "elementary", modeLabel: "小学生", qIndex: i + 1 }));
  }
  if (typeof QUESTIONS_TEEN !== "undefined") {
    QUESTIONS_TEEN.forEach((q, i) => list.push({ ...q, modeKey: "teen", modeLabel: "中高生", qIndex: i + 1 }));
  }
  if (typeof QUESTIONS_ADULT !== "undefined") {
    QUESTIONS_ADULT.forEach((q, i) => list.push({ ...q, modeKey: "adult", modeLabel: "一般（大人）", qIndex: i + 1 }));
  }
  if (typeof QUESTIONS_SENIOR !== "undefined") {
    QUESTIONS_SENIOR.forEach((q, i) => list.push({ ...q, modeKey: "senior", modeLabel: "高齢者", qIndex: i + 1 }));
  }

  return list;
}

function renderPreviewCards() {
  const grid = document.getElementById("preview-cards-grid");
  if (!grid) return;

  const modeFilter = document.getElementById("preview-filter-mode").value;
  const categoryFilter = document.getElementById("preview-filter-category").value;
  const keyword = document.getElementById("preview-search-keyword").value.trim().toLowerCase();
  const errorOnly = document.getElementById("preview-filter-error-only").checked;

  const allQuestions = getAllQuestionsFlat();
  grid.innerHTML = "";

  let visibleCount = 0;

  allQuestions.forEach((q) => {
    // フィルター判定
    if (modeFilter !== "all" && q.modeKey !== modeFilter) return;
    if (categoryFilter !== "all" && q.category !== categoryFilter) return;

    if (keyword !== "") {
      const matchId = q.id && q.id.toLowerCase().includes(keyword);
      const matchTitle = q.title && q.title.toLowerCase().includes(keyword);
      const matchDesc = q.desc && q.desc.toLowerCase().includes(keyword);
      if (!matchId && !matchTitle && !matchDesc) return;
    }

    // 画像状態の検査
    let hasImageError = false;
    let imageSourceText = "なし（立ち絵＋背景演出）";
    let imageTagHTML = "";

    if (q.screenshot) {
      imageSourceText = q.screenshot;
      imageTagHTML = `
        <div class="preview-img-box">
          <img src="${q.screenshot}" alt="スクリーンショット" onerror="this.parentElement.innerHTML='<div class=\\'preview-img-notfound\\'>⚠️ 画像が見つかりません<br><small>${q.screenshot}</small></div>';">
        </div>
      `;
    } else if (q.character || q.bg) {
      imageSourceText = `立ち絵: ${q.character || "なし"} / 背景: ${q.bg || "なし"}`;
      imageTagHTML = `
        <div class="preview-img-box preview-bg-box">
          <span class="preview-noimg-label">🎭 立ち絵＋背景演出</span>
        </div>
      `;
    } else {
      hasImageError = true;
      imageTagHTML = `<div class="preview-img-notfound">⚠️ 画像指定なし (null)</div>`;
    }

    if (errorOnly && !hasImageError) return;

    visibleCount++;

    // カテゴリバッジ
    let catBadgeClass = "badge-cat-scam";
    let catBadgeLabel = "🚨 詐欺";
    if (q.category === "real") {
      catBadgeClass = "badge-cat-real";
      catBadgeLabel = "⭕ 本物";
    } else if (q.category === "help") {
      catBadgeClass = "badge-cat-help";
      catBadgeLabel = "🤝 助ける";
    }

    // 選択肢と3原則タグのHTML構築
    let choicesHTML = "";
    if (q.correctChoices && q.correctChoices.length > 0) {
      const c = q.correctChoices[0];
      choicesHTML += `<li class="preview-choice-item is-safe"><span class="tag-badge tag-safe">⭕ 騙されない</span> ${c.text} <b>(±0円)</b></li>`;
    }
    if (q.wrongChoices && q.wrongChoices.length > 0) {
      q.wrongChoices.forEach(w => {
        let tagBadge = `<span class="tag-badge tag-fooled">❌ 騙された</span>`;
        if (w.principleTag === "speak") tagBadge = `<span class="tag-badge tag-speak">❌ 喋った</span>`;
        if (w.principleTag === "pay") tagBadge = `<span class="tag-badge tag-pay">❌ 払った</span>`;
        choicesHTML += `<li class="preview-choice-item is-wrong">${tagBadge} ${w.text} <b>(${w.money.toLocaleString()}円)</b></li>`;
      });
    }

    const card = document.createElement("div");
    card.className = `preview-card ${hasImageError ? "is-card-error" : ""}`;
    card.innerHTML = `
      <div class="preview-card-header">
        <span class="preview-mode-tag mode-${q.modeKey}">${q.modeLabel} Q${q.qIndex}</span>
        <span class="preview-cat-tag ${catBadgeClass}">${catBadgeLabel}</span>
      </div>

      <div class="preview-card-body">
        ${imageTagHTML}

        <div class="preview-info-box">
          <p class="preview-item-id">ID: <code>${q.id}</code></p>
          <h4 class="preview-item-title">${q.title}</h4>
          
          <div class="preview-section">
            <span class="preview-sec-label">📁 指定画像パス:</span>
            <span class="preview-sec-value"><code>${imageSourceText}</code></span>
          </div>

          <div class="preview-section">
            <span class="preview-sec-label">📖 問題前（状況）:</span>
            <p class="preview-sec-text">${(q.narration || "なし").replace(/\n/g, "<br>")}</p>
          </div>

          <div class="preview-section">
            <span class="preview-sec-label">❓ 問題（選択時）:</span>
            <p class="preview-sec-text">${q.desc || "なし"}</p>
          </div>

          <div class="preview-section">
            <span class="preview-sec-label">🎯 3原則4択選択肢:</span>
            <ul class="preview-choices-list">
              ${choicesHTML}
            </ul>
          </div>

          <div class="preview-section preview-point-box">
            <span class="preview-sec-label">🛡️ 防犯ポイント:</span>
            <p class="preview-sec-text">${q.point || "未設定"}</p>
          </div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  const countBadge = document.getElementById("preview-total-count");
  if (countBadge) countBadge.textContent = `表示中: ${visibleCount} / 64問`;
}

// 読み込み時にプレビュー機能を初期化
window.addEventListener("DOMContentLoaded", () => {
  initQuestionPreview();
});