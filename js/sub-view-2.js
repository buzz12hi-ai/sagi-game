/* =========================================================
   sub-view-2.js
   Joe-kun Invader Arcade Style Sheet (50 enemies, clean action, no popups)
   ========================================================= */

(function () {
  "use strict";

  let sv2Running = false;
  let sv2RafId = null;
  let sv2LastTime = 0;

  let sv2PlayerX = 50; // % (6〜94)
  let sv2MoveDir = 0;  // -1: 左, 0: 停止, 1: 右
  let sv2LastShotTime = 0;

  let sv2Enemies = [];
  let sv2Bullets = [];       // プレイヤーの弾
  let sv2EnemyBullets = [];  // 敵からの弾

  // ウェーブ進行管理 (全50体)
  // 1: 雑魚 16体
  // 2: 雑魚 17体
  // 3: 雑魚 17体
  // 4: ボス戦 (銅4体 ＆ 銀5体)
  // 5: 最終決戦 (金ボス 6体)
  let sv2Wave = 1;
  let sv2WaveSpawnCount = 0;
  const SV2_WAVE_TOTALS = [0, 16, 17, 17]; 
  let sv2SpawnCooldown = 0;
  let sv2EnemyShootTimer = 0; 

  const SV2_SCAM_WORDS = [
    "🚨 架空請求", "👮 ニセ警察", "💼 闇バイト", "💰 還付金詐欺", 
    "📉 投資詐欺", "💻 サポート詐欺", "📦 不在通知", "🌐 迷惑国際電話", 
    "🏷️ オレオレ", "🎫 チケット詐欺", "🖨️ 屋根点検", "🪙 電子マネー"
  ];

  function getPlayerSpriteSrc() {
    return (typeof IMAGE_ASSETS !== "undefined" && IMAGE_ASSETS.characters && IMAGE_ASSETS.characters.joeCheer)
      ? IMAGE_ASSETS.characters.joeCheer
      : "resource/images/ジョー君応援.png";
  }

  function getEnemySilhouetteSrc() {
    return (typeof IMAGE_ASSETS !== "undefined" && IMAGE_ASSETS.characters && IMAGE_ASSETS.characters.silhouette)
      ? IMAGE_ASSETS.characters.silhouette
      : "resource/images/シルエット.png";
  }

  function getBossSpriteSrc(type) {
    const chars = (typeof IMAGE_ASSETS !== "undefined" && IMAGE_ASSETS.characters) ? IMAGE_ASSETS.characters : {};
    if (type === "gold") return chars.joeGold || "resource/images/金ジョー君.png";
    if (type === "silver") return chars.joeSilver || "resource/images/銀ジョー君.png";
    return chars.joeBronze || "resource/images/銅ジョー君.png";
  }

  function createInvaderDOM() {
    if (document.getElementById("sv2-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "sv2-overlay";
    overlay.className = "sv2-overlay is-hidden";
    overlay.innerHTML = `
      <div class="sv2-window">
        <header class="sv2-header">
          <h2 class="sv2-title">👾 ジョーくんインベーダー (50体モード)</h2>
          <span id="sv2-status-chip" class="sv2-status-chip">Wave 1: 残り16体</span>
        </header>

        <p class="sv2-guide">
          【操作方法】「◀ 左へ」「▶ 右へ」で移動、「🚀 発射！」で撃退！敵からの反撃をかわしつつ突破せよ！
        </p>

        <div class="sv2-field" id="sv2-field">
          <div class="sv2-defense-line"></div>
          <div id="sv2-enemies-layer"></div>
          <div id="sv2-bullets-layer"></div>
          <div id="sv2-enemy-bullets-layer"></div>
          <div id="sv2-effects-layer"></div>
          <div class="sv2-player" id="sv2-player">
            <img src="${getPlayerSpriteSrc()}" alt="ジョーくん">
          </div>

          <!-- Final Result Panel (Clean & Simple) -->
          <div class="sv2-result-panel is-hidden" id="sv2-result-panel">
            <h3 class="sv2-result-title" id="sv2-result-title">🎉 完全防衛クリア！</h3>
            <p class="sv2-result-sub" id="sv2-result-sub">全50体の敵とボスをすべて撃退しました！</p>
            <div class="sv2-result-safety">
              詐欺には気を付けよう！怪しい話はすぐに信じず、必ず確認しよう！
            </div>
            <div class="sv2-result-btns">
              <button type="button" id="sv2-res-replay" class="sv2-res-btn is-replay">🔄 もう一度あそぶ</button>
              <button type="button" id="sv2-res-menu" class="sv2-res-btn">📋 ゲーム選択へ戻る</button>
              <button type="button" id="sv2-res-exit" class="sv2-res-btn">◀ タイトルへ戻る</button>
            </div>
          </div>
        </div>

        <div class="sv2-controls">
          <button type="button" id="sv2-btn-left" class="sv2-ctrl-btn">◀ 左へ</button>
          <button type="button" id="sv2-btn-fire" class="sv2-ctrl-btn is-fire">🚀 発射！</button>
          <button type="button" id="sv2-btn-right" class="sv2-ctrl-btn">▶ 右へ</button>
        </div>

        <div class="sv2-notice-box">
          🛡️ 詐欺には気を付けよう！ 怪しい話には「話さない・払わない・騙されない」
        </div>

        <div class="sv2-footer-btns">
          <button type="button" id="sv2-btn-back-menu" class="sv2-btn-sub">📋 ゲーム選択へ戻る</button>
          <button type="button" id="sv2-btn-exit" class="sv2-btn-sub sv2-btn-exit">🏳️ 途中リタイア</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    bindInvaderEvents();
  }

  function spawnSingleWaveEnemy() {
    const layer = document.getElementById("sv2-enemies-layer");
    if (!layer || sv2Wave > 3) return;

    const maxThisWave = SV2_WAVE_TOTALS[sv2Wave];
    if (sv2WaveSpawnCount >= maxThisWave) return;

    sv2WaveSpawnCount++;

    const word = SV2_SCAM_WORDS[Math.floor(Math.random() * SV2_SCAM_WORDS.length)];
    const silhouetteSrc = getEnemySilhouetteSrc();
    const startX = 10 + Math.random() * 80;
    const startY = -8;

    const el = document.createElement("div");
    el.className = "sv2-enemy";
    el.style.left = `${startX}%`;
    el.style.top = `${startY}%`;

    const randKind = Math.random();
    if (randKind < 0.4) {
      el.innerHTML = `<img src="${silhouetteSrc}" alt="不審者" style="filter:drop-shadow(0 0 10px rgba(255,255,255,0.95)) drop-shadow(0 0 5px #E85C4A); background:rgba(255,255,255,0.08); border-radius:8px; padding:2px;">`;
    } else {
      el.innerHTML = `<span class="sv2-enemy-word">${word}</span>`;
    }

    layer.appendChild(el);

    const speedMultiplier = 1.0 + (sv2Wave - 1) * 0.25;

    sv2Enemies.push({
      x: startX,
      y: startY,
      speedY: (5.5 + Math.random() * 3.5) * speedMultiplier,
      vx: (Math.random() - 0.5) * 16,
      alive: true,
      el: el,
      isBoss: false,
      hp: 1
    });

    updateStatusChip();
  }

  function spawnWave4Bosses() {
    const layer = document.getElementById("sv2-enemies-layer");
    if (!layer) return;
    layer.innerHTML = "";
    sv2Enemies = [];

    const silverSrc = getBossSpriteSrc("silver");
    const bronzeSrc = getBossSpriteSrc("bronze");

    const bossConfigs = [
      { id: "bronze_1", src: bronzeSrc, x: 15, color: "#CD7F32", name: "🥉 銅ジョー #1" },
      { id: "bronze_2", src: bronzeSrc, x: 35, color: "#CD7F32", name: "🥉 銅ジョー #2" },
      { id: "bronze_3", src: bronzeSrc, x: 55, color: "#CD7F32", name: "🥉 銅ジョー #3" },
      { id: "bronze_4", src: bronzeSrc, x: 75, color: "#CD7F32", name: "🥉 銅ジョー #4" },
      { id: "silver_1", src: silverSrc, x: 25, color: "#C0C0C0", name: "🥈 銀ジョー #1" },
      { id: "silver_2", src: silverSrc, x: 45, color: "#C0C0C0", name: "🥈 銀ジョー #2" },
      { id: "silver_3", src: silverSrc, x: 65, color: "#C0C0C0", name: "🥈 銀ジョー #3" },
      { id: "silver_4", src: silverSrc, x: 80, color: "#C0C0C0", name: "🥈 銀ジョー #4" },
      { id: "silver_5", src: silverSrc, x: 90, color: "#C0C0C0", name: "🥈 銀ジョー #5" }
    ];

    bossConfigs.forEach((cfg, idx) => {
      const el = document.createElement("div");
      el.className = "sv2-enemy";
      el.style.left = `${cfg.x}%`;
      el.style.top = `${12 + (idx % 2) * 8}%`;
      el.innerHTML = `
        <div style="text-align:center;">
          <img src="${cfg.src}" alt="${cfg.name}" style="width:42px;height:42px;object-fit:contain;filter:drop-shadow(0 0 10px ${cfg.color});">
          <div id="sv2-hp-${cfg.id}" style="font-size:9px;font-weight:900;color:#FFE39E;background:rgba(0,0,0,0.8);padding:1px 4px;border-radius:4px;">HP: 8</div>
        </div>
      `;
      layer.appendChild(el);

      sv2Enemies.push({
        id: cfg.id,
        x: cfg.x,
        y: 12 + (idx % 2) * 8,
        baseX: cfg.x,
        vx: (idx % 2 === 0 ? 1 : -1) * (18 + idx * 2),
        speedY: 0.45,
        alive: true,
        el: el,
        isBoss: true,
        hp: 8,
        maxHp: 8,
        phase: idx * 1.2
      });
    });

    updateStatusChip();
  }

  function spawnWave5Bosses() {
    const layer = document.getElementById("sv2-enemies-layer");
    if (!layer) return;
    layer.innerHTML = "";
    sv2Enemies = [];

    const goldSrc = getBossSpriteSrc("gold");

    const goldConfigs = [
      { id: "gold_1", x: 15, name: "🥇 金ジョー #1" },
      { id: "gold_2", x: 30, name: "🥇 金ジョー #2" },
      { id: "gold_3", x: 45, name: "🥇 金ジョー #3" },
      { id: "gold_4", x: 60, name: "🥇 金ジョー #4" },
      { id: "gold_5", x: 75, name: "🥇 金ジョー #5" },
      { id: "gold_6", x: 90, name: "🥇 金ジョー #6" }
    ];

    goldConfigs.forEach((cfg, idx) => {
      const el = document.createElement("div");
      el.className = "sv2-enemy";
      el.style.left = `${cfg.x}%`;
      el.style.top = `${10 + (idx % 2) * 7}%`;
      el.innerHTML = `
        <div style="text-align:center;">
          <img src="${goldSrc}" alt="${cfg.name}" style="width:48px;height:48px;object-fit:contain;filter:drop-shadow(0 0 14px #FFD700);">
          <div id="sv2-hp-${cfg.id}" style="font-size:10px;font-weight:900;color:#FFD700;background:rgba(0,0,0,0.85);padding:1px 5px;border-radius:4px;border:1px solid #FFD700;">HP: 12</div>
        </div>
      `;
      layer.appendChild(el);

      sv2Enemies.push({
        id: cfg.id,
        x: cfg.x,
        y: 10 + (idx % 2) * 7,
        baseX: cfg.x,
        vx: (idx % 2 === 0 ? 1 : -1) * (24 + idx * 3),
        speedY: 0.6,
        alive: true,
        el: el,
        isBoss: true,
        hp: 12,
        maxHp: 12,
        phase: idx * 0.9
      });
    });

    updateStatusChip();
  }

  function clearBulletsAndEffects() {
    const bulletsLayer = document.getElementById("sv2-bullets-layer");
    const enemyBulletsLayer = document.getElementById("sv2-enemy-bullets-layer");
    const effectsLayer = document.getElementById("sv2-effects-layer");
    if (bulletsLayer) bulletsLayer.innerHTML = "";
    if (enemyBulletsLayer) enemyBulletsLayer.innerHTML = "";
    if (effectsLayer) effectsLayer.innerHTML = "";
    sv2Bullets = [];
    sv2EnemyBullets = [];
  }

  function updateStatusChip() {
    const chip = document.getElementById("sv2-status-chip");
    if (!chip) return;

    if (sv2Wave <= 3) {
      const aliveOnScreen = sv2Enemies.filter((e) => e.alive).length;
      const maxThisWave = SV2_WAVE_TOTALS[sv2Wave];
      const remainingTotal = (maxThisWave - sv2WaveSpawnCount) + aliveOnScreen;
      chip.textContent = `Wave ${sv2Wave}: 残り${remainingTotal}体`;
    } else if (sv2Wave === 4) {
      const aliveBosses = sv2Enemies.filter((e) => e.alive);
      chip.textContent = `Wave 4 ボス戦 [残り生存: ${aliveBosses.length}体]`;
    } else if (sv2Wave === 5) {
      const aliveGold = sv2Enemies.filter((e) => e.alive);
      chip.textContent = `最終決戦！ 金ボス軍団 [残り: ${aliveGold.length}体]`;
    }
  }

  function updatePlayerUI() {
    const playerEl = document.getElementById("sv2-player");
    if (playerEl) {
      playerEl.style.left = `${sv2PlayerX}%`;
    }
  }

  function setControlsEnabled(enabled) {
    ["sv2-btn-left", "sv2-btn-fire", "sv2-btn-right"].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) btn.disabled = !enabled;
    });
  }

  function startInvaderGame() {
    stopLoop();
    const resultPanel = document.getElementById("sv2-result-panel");
    if (resultPanel) resultPanel.classList.add("is-hidden");

    sv2PlayerX = 50;
    sv2MoveDir = 0;
    sv2Wave = 1;
    sv2WaveSpawnCount = 0;
    sv2SpawnCooldown = 0;
    sv2LastShotTime = 0;
    sv2EnemyShootTimer = 0;

    clearBulletsAndEffects();
    const layer = document.getElementById("sv2-enemies-layer");
    if (layer) layer.innerHTML = "";
    sv2Enemies = [];

    spawnSingleWaveEnemy();
    spawnSingleWaveEnemy();
    spawnSingleWaveEnemy();

    updatePlayerUI();
    updateStatusChip();
    setControlsEnabled(true);

    sv2Running = true;
    sv2LastTime = performance.now();
    sv2RafId = requestAnimationFrame(gameLoop);
  }

  function openInvaderStage() {
    const overlay = document.getElementById("sv2-overlay");
    if (overlay) overlay.classList.remove("is-hidden");
    startInvaderGame();
  }

  function closeInvaderStage() {
    stopLoop();
    sv2MoveDir = 0;
    const overlay = document.getElementById("sv2-overlay");
    if (overlay) overlay.classList.add("is-hidden");
  }

  function stopLoop() {
    sv2Running = false;
    if (sv2RafId !== null) {
      cancelAnimationFrame(sv2RafId);
      sv2RafId = null;
    }
  }

  function finishInvaderGame(isWin) {
    stopLoop();
    sv2MoveDir = 0;
    setControlsEnabled(false);

    const panel = document.getElementById("sv2-result-panel");
    const titleEl = document.getElementById("sv2-result-title");
    const subEl = document.getElementById("sv2-result-sub");

    if (titleEl) {
      titleEl.classList.toggle("is-fail", !isWin);
      titleEl.textContent = isWin ? "🎉 完全防衛クリア！" : "⚠️ ゲームオーバー（リタイア・被弾）";
    }
    if (subEl) {
      subEl.textContent = isWin
        ? "全50体の敵と大量のボス群をすべて撃退しました！完璧な防衛力です！"
        : "ゲームオーバー！敵の攻撃に被弾するか、防衛ラインを突破されました。次は全ボス撃退を目指そう！";
    }
    if (panel) panel.classList.remove("is-hidden");
  }

  function fireBullet() {
    if (!sv2Running) return;
    const now = performance.now();
    if (now - sv2LastShotTime < 190) return;
    if (sv2Bullets.length >= 4) return;

    const layer = document.getElementById("sv2-bullets-layer");
    if (!layer) return;

    sv2LastShotTime = now;
    const bulletEl = document.createElement("div");
    bulletEl.className = "sv2-bullet";
    const startY = 82;
    bulletEl.style.left = `${sv2PlayerX}%`;
    bulletEl.style.top = `${startY}%`;
    layer.appendChild(bulletEl);

    sv2Bullets.push({
      x: sv2PlayerX,
      y: startY,
      active: true,
      el: bulletEl
    });
  }

  function enemyShootBullet() {
    const aliveEnemies = sv2Enemies.filter(e => e.alive);
    if (aliveEnemies.length === 0) return;

    const layer = document.getElementById("sv2-enemy-bullets-layer");
    if (!layer) return;

    const shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];

    const ebEl = document.createElement("div");
    ebEl.className = "sv2-enemy-bullet";
    ebEl.style.left = `${shooter.x}%`;
    ebEl.style.top = `${shooter.y}%`;
    layer.appendChild(ebEl);

    sv2EnemyBullets.push({
      x: shooter.x,
      y: shooter.y,
      active: true,
      el: ebEl
    });
  }

  function spawnHitEffect(x, y, isBig) {
    const layer = document.getElementById("sv2-effects-layer");
    if (!layer) return;
    const boom = document.createElement("div");
    boom.className = "sv2-boom";
    boom.textContent = isBig ? "🌟" : "💥";
    boom.style.left = `${x}%`;
    boom.style.top = `${y}%`;
    layer.appendChild(boom);

    setTimeout(() => {
      if (boom.parentNode) boom.parentNode.removeChild(boom);
    }, 450);
  }

  function gameLoop(now) {
    if (!sv2Running) return;

    const dt = Math.min(0.05, (now - sv2LastTime) / 1000);
    sv2LastTime = now;

    if (sv2MoveDir !== 0) {
      sv2PlayerX = Math.max(6, Math.min(94, sv2PlayerX + sv2MoveDir * 66 * dt));
      updatePlayerUI();
    }

    sv2EnemyShootTimer += dt;
    const intervalTarget = 2.0 + Math.random() * 0.5; // 2.0〜2.5秒
    if (sv2EnemyShootTimer >= intervalTarget) {
      sv2EnemyShootTimer = 0;
      enemyShootBullet();
    }

    for (let i = sv2EnemyBullets.length - 1; i >= 0; i--) {
      const eb = sv2EnemyBullets[i];
      eb.y += 45 * dt;

      if (eb.y >= 82 && eb.y <= 92 && Math.abs(eb.x - sv2PlayerX) <= 6.5) {
        eb.active = false;
        spawnHitEffect(sv2PlayerX, 85, true);
        finishInvaderGame(false);
        return;
      }

      if (eb.y > 100) {
        eb.active = false;
      }

      if (!eb.active) {
        if (eb.el && eb.el.parentNode) eb.el.parentNode.removeChild(eb.el);
        sv2EnemyBullets.splice(i, 1);
      } else {
        eb.el.style.top = `${eb.y}%`;
        eb.el.style.left = `${eb.x}%`;
      }
    }

    for (let i = sv2Bullets.length - 1; i >= 0; i--) {
      const b = sv2Bullets[i];
      b.y -= 115 * dt;

      if (b.y < -5) {
        b.active = false;
      } else {
        for (let j = 0; j < sv2Enemies.length; j++) {
          const e = sv2Enemies[j];
          if (!e.alive) continue;
          const hitRange = e.isBoss ? 9.0 : 6.0;

          if (Math.abs(b.x - e.x) <= hitRange && Math.abs(b.y - e.y) <= (hitRange * 1.1)) {
            b.active = false;

            if (e.isBoss) {
              e.hp -= 1;
              spawnHitEffect(e.x, e.y, true);

              const hpEl = document.getElementById(`sv2-hp-${e.id}`);
              if (hpEl) {
                hpEl.textContent = `HP: ${Math.max(0, e.hp)}`;
              }

              if (e.hp <= 0) {
                e.alive = false;
                if (e.el && e.el.parentNode) e.el.parentNode.removeChild(e.el);
                spawnHitEffect(e.x, e.y, true);
              }
            } else {
              e.alive = false;
              if (e.el && e.el.parentNode) e.el.parentNode.removeChild(e.el);
              spawnHitEffect(e.x, e.y, false);
            }

            updateStatusChip();
            break;
          }
        }
      }

      if (!b.active) {
        if (b.el && b.el.parentNode) b.el.parentNode.removeChild(b.el);
        sv2Bullets.splice(i, 1);
      } else {
        b.el.style.top = `${b.y}%`;
      }
    }

    if (sv2Wave <= 3 && sv2WaveSpawnCount < SV2_WAVE_TOTALS[sv2Wave]) {
      sv2SpawnCooldown += dt;
      const activeCount = sv2Enemies.filter((e) => e.alive).length;
      if (activeCount < 4 || sv2SpawnCooldown > 1.0) {
        sv2SpawnCooldown = 0;
        spawnSingleWaveEnemy();
      }
    }

    const aliveEnemies = sv2Enemies.filter((e) => e.alive);
    if (aliveEnemies.length === 0) {
      if (sv2Wave <= 3 && sv2WaveSpawnCount >= SV2_WAVE_TOTALS[sv2Wave]) {
        sv2Wave++;
        sv2WaveSpawnCount = 0;
        sv2EnemyShootTimer = 0;
        clearBulletsAndEffects();
        if (sv2Wave === 2 || sv2Wave === 3) {
          spawnSingleWaveEnemy();
          spawnSingleWaveEnemy();
        }
        updateStatusChip();
      } else if (sv2Wave === 4) {
        sv2Wave = 5;
        spawnWave5Bosses();
        updateStatusChip();
      } else if (sv2Wave === 5) {
        finishInvaderGame(true);
        return;
      }
    }

    if (sv2Wave <= 3) {
      for (let i = 0; i < sv2Enemies.length; i++) {
        const e = sv2Enemies[i];
        if (!e.alive) continue;

        e.y += e.speedY * dt;
        e.x += Math.sin(now * 0.003 + i) * e.vx * dt;
        e.x = Math.max(8, Math.min(92, e.x));

        e.el.style.left = `${e.x}%`;
        e.el.style.top = `${e.y}%`;

        if (e.y >= 78) {
          finishInvaderGame(false);
          return;
        }
      }
    } else if (sv2Wave === 4 || sv2Wave === 5) {
      for (let i = 0; i < sv2Enemies.length; i++) {
        const b = sv2Enemies[i];
        if (!b.alive) continue;

        b.phase += dt * 2.2;
        b.baseX += b.vx * dt;
        
        if (b.baseX >= 86) {
          b.baseX = 86;
          b.vx *= -1;
        } else if (b.baseX <= 14) {
          b.baseX = 14;
          b.vx *= -1;
        }

        const playerPull = (sv2PlayerX - b.x) * 0.15 * dt;
        b.x = b.baseX + Math.sin(b.phase + i) * 8 + playerPull;
        b.x = Math.max(10, Math.min(90, b.x));

        b.y += b.speedY * dt + Math.cos(b.phase * 0.7) * 0.25;
        b.el.style.left = `${b.x}%`;
        b.el.style.top = `${b.y}%`;

        if (b.y >= 78) {
          finishInvaderGame(false);
          return;
        }
      }
    }

    sv2RafId = requestAnimationFrame(gameLoop);
  }

  function backToMenu() {
    closeInvaderStage();
    if (window.SubViewBridge && typeof window.SubViewBridge.openMenu === "function") {
      window.SubViewBridge.openMenu();
    }
  }

  function bindInvaderEvents() {
    const btnLeft = document.getElementById("sv2-btn-left");
    const btnRight = document.getElementById("sv2-btn-right");
    const btnFire = document.getElementById("sv2-btn-fire");
    const btnBackMenu = document.getElementById("sv2-btn-back-menu");
    const btnRetireEarly = document.getElementById("sv2-btn-exit");

    const resReplay = document.getElementById("sv2-res-replay");
    const resMenu = document.getElementById("sv2-res-menu");
    const resExit = document.getElementById("sv2-res-exit");

    if (btnLeft) {
      btnLeft.addEventListener("mousedown", () => { sv2MoveDir = -1; });
      btnLeft.addEventListener("touchstart", (e) => { e.preventDefault(); sv2MoveDir = -1; }, { passive: false });
    }
    if (btnRight) {
      btnRight.addEventListener("mousedown", () => { sv2MoveDir = 1; });
      btnRight.addEventListener("touchstart", (e) => { e.preventDefault(); sv2MoveDir = 1; }, { passive: false });
    }

    const stopMove = () => { sv2MoveDir = 0; };
    window.addEventListener("mouseup", stopMove);
    window.addEventListener("touchend", stopMove);
    window.addEventListener("touchcancel", stopMove);

    if (btnFire) btnFire.addEventListener("click", fireBullet);

    if (btnBackMenu) btnBackMenu.addEventListener("click", backToMenu);
    
    if (btnRetireEarly) {
      btnRetireEarly.addEventListener("click", () => {
        if (confirm("ゲームを途中リタイアしますか？")) {
          finishInvaderGame(false);
        }
      });
    }

    if (resReplay) resReplay.addEventListener("click", startInvaderGame);
    if (resMenu) resMenu.addEventListener("click", backToMenu);
    if (resExit) resExit.addEventListener("click", closeInvaderStage);

    document.addEventListener("keydown", (e) => {
      const overlay = document.getElementById("sv2-overlay");
      if (!overlay || overlay.classList.contains("is-hidden")) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        sv2MoveDir = -1;
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        sv2MoveDir = 1;
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        fireBullet();
      }
    });

    document.addEventListener("keyup", (e) => {
      const overlay = document.getElementById("sv2-overlay");
      if (!overlay || overlay.classList.contains("is-hidden")) return;

      if ((e.key === "ArrowLeft" && sv2MoveDir === -1) || (e.key === "ArrowRight" && sv2MoveDir === 1)) {
        sv2MoveDir = 0;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    createInvaderDOM();

    if (window.SubViewBridge && typeof window.SubViewBridge.registerGame === "function") {
      window.SubViewBridge.registerGame({
        id: "invader",
        icon: "👾",
        title: "ジョーくんインベーダー",
        desc: "全50体撃破！3Wave雑魚 ➜ 銅4＆銀5ボス ➜ 金ボス6体（敵からの反撃あり）！",
        onOpen: openInvaderStage
      });
    }
  });
})();