/* =========================================================
   sub-view.js (UFO Catcher Arcade - 50 Prizes & Detailed Modal)
   ========================================================= */

(function () {
  "use strict";

  const SV_PASSCODE = "7777";
  const SV_REQUIRED_TAPS = 20;
  const SV_TAP_TIMEOUT_MS = 4000;

  let svTapCount = 0;
  let svTapTimer = null;

  let svCraneX = 50;
  let svIsAnimating = false;
  let svMoveInterval = null;
  let svPrizes = [];
  let svCaughtCount = 0;

  const svRegisteredGames = [];

  function registerSubGame(gameDef) {
    if (!gameDef || !gameDef.id || !gameDef.title || typeof gameDef.onOpen !== "function") return;
    if (!svRegisteredGames.some((g) => g.id === gameDef.id)) {
      svRegisteredGames.push(gameDef);
    }
  }

  window.SubViewBridge = {
    registerGame: registerSubGame,
    openMenu: openMenuOverlay
  };

  // 12 Jo-kun characters + 38 detailed fraud terms & countermeasures = 50 prizes
  function getAllPrizeEntries() {
    const chars = (typeof IMAGE_ASSETS !== "undefined" && IMAGE_ASSETS.characters)
      ? IMAGE_ASSETS.characters
      : {};

    return [
      { kind: "img",  label: "通常ジョーくん",       src: chars.joe || "resource/images/ジョー君通常.png", tip: "「こんにちは！日頃から防犯意識を高く持ち、怪しい話に耳を貸さないことが一番大切だよ！」" },
      { kind: "img",  label: "喜びジョーくん",       src: chars.joeHappy || "resource/images/ジョー君喜.png", tip: "「やったね！詐欺を見破ると本当に嬉しいよね！その冷静な判断力が君の財産を守るよ！」" },
      { kind: "img",  label: "哀しみジョーくん",     src: chars.joeSad || "resource/images/ジョー君哀.png", tip: "「被害に遭うと本当に悲しい気持ちになってしまうんだ…。だからこそ絶対にお金を渡さないで！」" },
      { kind: "img",  label: "驚きジョーくん",       src: chars.joeSurprised || "resource/images/ジョー君驚き.png", tip: "「えっ、自分がそんな巧妙な手口に狙われるなんて信じられないって？ 油断は禁物だよ！」" },
      { kind: "img",  label: "考えるジョーくん",     src: chars.joeThinking || "resource/images/ジョー君考える.png", tip: "「『これって本当かな？』と一呼吸置いて自分で調べる。そのひと手間で詐欺は100%防げるんだ！」" },
      { kind: "img",  label: "応援ジョーくん",       src: chars.joeCheer || "resource/images/ジョー君応援.png", tip: "「負けるな！家族や友達、みんなで声を掛け合って、悪質な詐欺グループを追い出そう！」" },
      { kind: "img",  label: "困りジョーくん",       src: chars.joeWorry || "resource/images/ジョー君困り.png", tip: "「焦って電話をかけたりリンクを踏むと罠にハマるよ。困ったらすぐに警察相談『#9110』へ！」" },
      { kind: "img",  label: "怒りジョーくん",       src: chars.joeAngry || "resource/images/ジョー君怒.png", tip: "「人の不安につけ込んでお金をだまし取る詐欺グループなんて絶対に許さないぞ！」" },
      { kind: "img",  label: "リラックスジョーくん", src: chars.joeRelax || "resource/images/ジョー君楽.png", tip: "「日頃から落ち着いた心構えでいれば、いざという時も『話さない・払わない』を実践できるね」" },
      { kind: "img",  label: "金ジョーくん",         src: chars.joeGold || "resource/images/金ジョー君.png", tip: "「おめでとう！金色のジョーくんをゲットだ！君の防犯マスターとしての誇りだよ！」" },
      { kind: "img",  label: "銀ジョーくん",         src: chars.joeSilver || "resource/images/銀ジョー君.png", tip: "「素晴らしい！銀のジョーくん獲得！日頃の防犯対策がバッチリできている証拠だね」" },
      { kind: "img",  label: "銅ジョーくん",         src: chars.joeBronze || "resource/images/銅ジョー君.png", tip: "「銅のジョーくんゲット！ここからさらに防犯の知識を深めて、周りの人も守ってあげよう！」" },
      
      { kind: "text", label: "🚨 詐欺に気を付けよう！", colorClass: "", detail: "【手口と対策】\n見知らぬ番号からの着信や、不審なSMS・メールが届いたときは、内容をうのみにせず即座に遮断・削除しましょう。少しでも怪しいと感じたら、自分で検索せず家族や警察へ相談するのが鉄則です。" },
      { kind: "text", label: "🛡️ 3原則：話さない", colorClass: "is-green", detail: "【大分県警・警察庁の防犯3原則 ①】\n警察官や銀行員、自治体職員を名乗る者から、電話やメッセージで「口座番号」「暗証番号」「パスワード」「認証コード」を聞き出されても、絶対に教えないでください。" },
      { kind: "text", label: "💸 3原則：払わない", colorClass: "is-green", detail: "【大分県警・警察庁の防犯3原則 ②】\n「今日中に支払わないと逮捕する」「延滞金が発生する」などと巧妙に焦らされても、その場で慌てて現金を振り込んだり、コンビニで電子マネーカードを買って番号を伝えることは絶対に避けてください。" },
      { kind: "text", label: "🔍 3原則：騙されない", colorClass: "is-green", detail: "【大分県警・警察庁の防犯3原則 ③】\n届いた連絡先やURLをそのまま信じず、自分で調べた公式の代表電話番号や正規のアプリ、または警察相談専用電話『#9110』へ直接架けて、本当に事実かどうかを確認しましょう。" },
      { kind: "text", label: "📞 迷ったら #9110 へ相談！", colorClass: "is-blue", detail: "【警察相談専用電話】\n全国共通の短縮ダイヤル『#9110』に電話すると、最寄りの警察本部等の相談窓口に繋がります。「これって詐欺かな？」と不安に思ったときは、事件になる前に迷わずご相談ください。" },
      { kind: "text", label: "👮 ニセ警察詐欺に注意", colorClass: "", detail: "【手口と詳細】\n「マネーロンダリングに関与している」「逮捕状が出ている」などと脅し、LINEなどのメッセージアプリへ誘導して偽の逮捕状画像を見せ、指定口座へ資産を振り込ませる手口です。警察がSNSで金銭を要求することは100%ありません。" },
      { kind: "text", label: "💼 闇バイトは犯罪の実行役", colorClass: "is-green", detail: "【若年層の重大なリスク】\nSNSやネット掲示板の「高額報酬」「ホワイト案件」「荷物を運ぶだけ」といった甘い言葉に釣られて加担すると、特殊詐欺の「受け子・出し子」として逮捕されます。一度個人情報を渡すと脅されて抜け出せなくなります。" },
      { kind: "text", label: "📉 SNS型投資・ロマンス詐欺", colorClass: "is-blue", detail: "【巧妙な資産詐取】\nSNSやマッチングアプリで親密になった相手から「絶対に儲かる投資がある」「専用アプリに入れよう」と誘われ、最初は少額の利益が出ても、追加投資した途端に出金できなくなる国際的な詐欺グループの手口です。" },
      { kind: "text", label: "📄 架空請求・未納料金詐欺", colorClass: "", detail: "【SMS・ハガキの罠】\n「有料動画の未納料金がある」「訴訟に発展する」などと書かれたSMSやハガキを送りつけ、不安をあおって指定の連絡先へ電話させ、電子マネーや銀行振込で金銭をだまし取る手口です。身に覚えのない請求は完全に無視しましょう。" },
      { kind: "text", label: "💰 還付金詐欺（ATM操作）", colorClass: "is-blue", detail: "【ATM誘導の罠】\n市役所や税務署を騙り、「医療費や保険料の過払い金が戻る」と電話でATMへ誘導し、言葉巧みに操作させて実際には犯人の口座へ送金（振り込み）させる手口です。ATMで還付金が戻る手続きは絶対に存在しません。" },
      { kind: "text", label: "💻 サポート詐欺（偽警告）", colorClass: "is-green", detail: "【パソコン画面の脅し】\nネット閲覧中に突然「ウイルスに感染しました」と大音量とともに警告画面と電話番号が表示され、架空のサポート料金を電子マネーで請求したり、遠隔操作ソフトを入れさせて個人情報を盗む詐欺です。慌てずブラウザを強制終了させましょう。" },
      { kind: "text", label: "💳 キャッシュカード詐欺", colorClass: "is-blue", detail: "【対面でのカード窃盗】\n警察官や銀行員、百貨店員などを装って自宅を訪れ、「あなたのカードが不正利用されている」「新しいカードに交換が必要」と信じ込ませ、隙を見て本物のキャッシュカードを封筒ごとすり替えて盗み取る手口です。" },
      { kind: "text", label: "📦 宅配・不在通知の偽SMS", colorClass: "", detail: "【スミッシングの脅威】\n「お荷物をお届けにあがりましたが不在でした」というSMSのリンク先から偽の宅配アプリやフィッシングサイトに誘導され、スマホのID・パスワードやキャリア決済枠を不正利用される被害が急増しています。" },
      { kind: "text", label: "🌐 国際電話番号（＋）の悪用", colorClass: "is-green", detail: "【海外発信の不審着信】\n「＋1」や「＋44」など、頭に「＋」がついた国際電話番号からの不審な着信やSMSが増加しています。心当たりがない場合は絶対に出ない、折り返さないことが被害を防ぐ有効な手段です。" },
      { kind: "text", label: "🏷️ オレオレ詐欺・預貯金詐欺", colorClass: "is-blue", detail: "【親族なりすまし】\n「オレだけど、カバンを落とした」「会社の金を横領してしまった」などと息子や孫を装い、現金やキャッシュカードを自宅に取りに来させたり郵送させる手口です。必ず元の電話番号にかけ直して事実を確かめましょう。" },
      { kind: "text", label: "🎫 チケット・グッズ転売詐欺", colorClass: "", detail: "【個人間取引の罠】\nSNS上で「チケットが余った」「推し活グッズを定価で譲ります」と持ちかけ、スマホ決済等で先払いさせた後に連絡を絶つ詐欺です。チケットや高額グッズは必ず公式の正規トレード・リセールサイトを利用しましょう。" },
      { kind: "text", label: "🖨️ 火災保険・屋根点検商法", colorClass: "is-green", detail: "【悪質な訪問点検】\n「近所で工事をしている。無料で屋根を見てあげる」と突然訪問し、わざと瓦を壊したり経年劣化を自然災害と偽って高額な修繕契約や保険金申請代行手数料をだまし取る悪質商法です。突然の点検業者は絶対に家に入れないでください。" },
      { kind: "text", label: "🪙 暗号資産・電子マネー送金", colorClass: "is-blue", detail: "【追跡困難な決済要求】\n詐欺グループは足がつかないようにするため、金銭の支払いに「ビットコイン等の暗号資産」や「コンビニのプリペイド型電子マネー（ギフトカード）」を指定してきます。これらを要求されたら100%詐欺です。" },
      { kind: "text", label: "📢 マイナンバー不審通知", colorClass: "", detail: "【公的機関を騙る偽案内】\n「マイナンバーカードの電子証明書の有効期限が切れています」「口座登録が必要です」などとSMSやメールを送りつけ、偽サイトに誘導して個人情報や口座番号を盗み取る手口です。行政機関がSMSで入力を求めることはありません。" },
      { kind: "text", label: "⚠️ 怪しい話は必ず確認・相談", colorClass: "is-green", detail: "【最大の防御策】\n詐欺グループは「誰にも言わないで」「今すぐ手続きして」と周囲に相談させないよう巧妙に仕向けます。少しでも不安や疑問を感じたら、どんなに急かされても必ず家族や警察（#9110）に相談してください。" },
      { kind: "text", label: "📱 スマホの画面共有の罠", colorClass: "is-blue", detail: "【遠隔アプリの悪用】\nサポートや手続きと称して、通話アプリの「画面共有機能」をオンにさせ、スマホに届いたSMSの認証番号を盗み見たり、ネットバンキングを勝手に操作して預金を不正送金させる極めて危険な手口です。画面共有で他人に画面を見せないで！" },
      { kind: "text", label: "🏦 銀行口座の売買・譲渡は犯罪", colorClass: "", detail: "【口座売買の罰則】\n「使っていない口座を貸してほしい」「口座を買い取ります」という話に乗って口座やキャッシュカードを他人に譲り渡す行為は、犯罪に使われるだけでなく、法律により厳しく処罰され、数年間新規の口座開設ができなくなります。" },
      { kind: "text", label: "✉️ 偽の税関・関税未納通知", colorClass: "is-green", detail: "【海外荷物を騙る詐欺】\n「海外からの荷物が税関で留め置かれている。関税を支払わないと処分される」という偽メールやSMSを送り、クレジットカード情報を入力させる手口です。税関がSMSで直接金銭を請求することはありません。" },
      { kind: "text", label: "🏨 ホテル・旅行予約の偽キャンセル通知", colorClass: "is-blue", detail: "【焦らせるフィッシング】\n身に覚えのない高級ホテルの予約完了メールや「キャンセル料100%発生」という通知を送りつけ、焦ってリンク先の偽ログイン画面を開かせて個人情報を盗み取る手口です。必ず公式アプリの予約履歴を確認しましょう。" },
      { kind: "text", label: "🔑 ワンタイムパスワードの厳重管理", colorClass: "", detail: "【認証コードの死守】\nネットバンキングやSNSのログイン時にスマホへ届く「ワンタイムパスワード（認証コード）」は、あなた自身の身分を証明する極めて重要な鍵です。他人に教えたり、画面で見せることは絶対に避けてください。" },
      { kind: "text", label: "🛒 フリマアプリの直接取引の危険", colorClass: "is-green", detail: "【規約外取引のトラブル】\nフリマアプリ等で「手数料がかかるから直接銀行口座に振り込んでほしい」「LINEでやり取りしよう」とアプリ外の取引に誘い、代金を支払ったのに商品が届かない、あるいは偽物が送られてくる詐欺トラブルです。" },
      { kind: "text", label: "💡 電気・ガス供給停止の脅し", colorClass: "is-blue", detail: "【ライフラインを人質に】\n「電気料金が未払いのため本気で送電を停止する」といったSMSを送りつけ、偽の決済ページでお金を支払わせる手口です。電力会社やガス会社が事前通知なしにSMSだけで即日ライフラインを止めることはありません。" },
      { kind: "text", label: "🏢 会社のビジネスメール詐欺（BEC）", colorClass: "", detail: "【企業を狙う不正送金】\n取引先や社長を装い、「取引先銀行口座が変更になったので新しい口座へ振り込んでほしい」という偽メールを送り、会社の資金を不正送金させる手口です。変更時は必ず従来の電話番号で事実確認を行ってください。" },
      { kind: "text", label: "💖 マッチングアプリのロマンス詐欺", colorClass: "is-green", detail: "【甘い言葉の裏の顔】\nマッチングアプリやSNSで知り合い、数ヶ月にわたって恋愛感情や結婚の約束を抱かせた後、「将来のための投資資金が必要」「税金を払えば出金できる」と大金をだまし取る卑劣な詐欺です。会ったことのない相手への送金はゼロに！" },
      { kind: "text", label: "📞 警察相談専用電話 #9110", colorClass: "is-blue", detail: "【全国共通の安心窓口】\n事件になる前であっても、「これって怪しいかも？」「詐欺かもしれない」と感じた時は、警察の専門相談員がアドバイスや対応をしてくれる『#9110』へお気軽にお電話ください。あなたの勇気が被害を防ぎます。" }
    ];
  }

  // 50 slots for 50 piled-up prizes inside UFO catcher case
  const SV_LAYOUT_SLOTS = [
    { x: 10, y: 70 }, { x: 20, y: 72 }, { x: 30, y: 71 }, { x: 40, y: 73 }, { x: 50, y: 70 }, { x: 60, y: 72 }, { x: 70, y: 71 }, { x: 80, y: 70 }, { x: 90, y: 72 },
    { x: 15, y: 78 }, { x: 25, y: 76 }, { x: 35, y: 79 }, { x: 45, y: 77 }, { x: 55, y: 79 }, { x: 65, y: 76 }, { x: 75, y: 78 }, { x: 85, y: 77 },
    { x: 12, y: 85 }, { x: 22, y: 83 }, { x: 32, y: 86 }, { x: 42, y: 84 }, { x: 52, y: 86 }, { x: 62, y: 84 }, { x: 72, y: 85 }, { x: 82, y: 83 }, { x: 92, y: 85 },
    { x: 18, y: 92 }, { x: 28, y: 90 }, { x: 38, y: 93 }, { x: 48, y: 91 }, { x: 58, y: 93 }, { x: 68, y: 91 }, { x: 78, y: 92 }, { x: 88, y: 90 },
    { x: 20, y: 62 }, { x: 32, y: 64 }, { x: 44, y: 61 }, { x: 56, y: 63 }, { x: 68, y: 62 }, { x: 80, y: 64 },
    { x: 15, y: 53 }, { x: 30, y: 55 }, { x: 45, y: 52 }, { x: 60, y: 54 }, { x: 75, y: 53 },
    { x: 22, y: 44 }, { x: 38, y: 46 }, { x: 54, y: 43 }, { x: 70, y: 45 }, { x: 85, y: 44 }
  ];

  function createSubViewDOM() {
    if (document.getElementById("sv-auth-overlay")) return;

    const authOverlay = document.createElement("div");
    authOverlay.id = "sv-auth-overlay";
    authOverlay.className = "sv-overlay is-hidden";
    authOverlay.innerHTML = `
      <div class="sv-auth-card">
        <span class="sv-auth-badge">🔒 SECRET ACCESS</span>
        <h3 class="sv-auth-title">秘密のパスワードを入力</h3>
        <p class="sv-auth-desc">4桁のパスワードを入力すると、おまけのミニゲームが開きます。</p>
        <input type="password" id="sv-auth-input" class="sv-auth-input" inputmode="numeric" maxlength="8" placeholder="••••">
        <p id="sv-auth-error" class="sv-auth-error is-hidden">⚠️ パスワードが違います。もう一度入力してください。</p>
        <div class="sv-auth-btns">
          <button type="button" id="sv-auth-submit" class="sv-auth-btn-primary">決定</button>
          <button type="button" id="sv-auth-cancel" class="sv-auth-btn-cancel">タイトルへ戻る</button>
        </div>
      </div>
    `;
    document.body.appendChild(authOverlay);

    const menuOverlay = document.createElement("div");
    menuOverlay.id = "sv-menu-overlay";
    menuOverlay.className = "sv-overlay is-hidden";
    menuOverlay.innerHTML = `
      <div class="sv-menu-card">
        <div class="sv-beta-badge">
          <h2>試作品</h2>
          <p>※まだ試験段階中です</p>
        </div>
        <header class="sv-menu-header">
          <span class="sv-menu-badge">🎮 SECRET BONUS ROOM</span>
          <h2 class="sv-menu-title">おまけミニゲーム選択</h2>
          <p class="sv-menu-sub">あそびたいミニゲームをえらんでね！</p>
        </header>
        <div class="sv-menu-list" id="sv-menu-list"></div>
        <div class="sv-menu-notice">
          🛡️ 息抜きのミニゲーム中も、実生活での詐欺には要注意！<br>
          怪しい話には「話さない・払わない・騙されない」を忘れずに！
        </div>
        <button type="button" id="sv-menu-exit" class="sv-menu-exit-btn">◀ タイトルへ戻る</button>
      </div>
    `;
    document.body.appendChild(menuOverlay);

    // UFO Catcher Window
    const gameOverlay = document.createElement("div");
    gameOverlay.id = "sv-game-overlay";
    gameOverlay.className = "sv-overlay is-hidden";
    gameOverlay.innerHTML = `
      <div class="sv-stage-window">
        <header class="sv-header">
          <h2 class="sv-title">🛸 ジョーくんUFOキャッチャー (50個モード)</h2>
          <span id="sv-counter" class="sv-counter">ゲット: 0 / 50</span>
        </header>

        <p class="sv-guide">
          【操作方法】「◀ 左へ」「▶ 右へ」でクレーンを動かし、「⬇️ つかむ！」ボタンでキャッチしよう！（※20%の確率で途中で落とすハラハラ仕様！）
        </p>

        <div class="sv-case" id="sv-case">
          <div class="sv-rail"></div>
          <div class="sv-crane is-open" id="sv-crane">
            <div class="sv-trolley"></div>
            <div class="sv-wire" id="sv-wire"></div>
            <div class="sv-claw">
              <div class="sv-claw-core"></div>
              <div class="sv-arm sv-arm-l"></div>
              <div class="sv-arm sv-arm-r"></div>
            </div>
            <div class="sv-caught-slot" id="sv-caught-slot"></div>
          </div>
          <div class="sv-items-layer" id="sv-items-layer"></div>
        </div>

        <div id="sv-result-banner" class="sv-result-banner is-hidden"></div>

        <div class="sv-controls">
          <button type="button" id="sv-btn-left" class="sv-ctrl-btn">◀ 左へ</button>
          <button type="button" id="sv-btn-catch" class="sv-ctrl-btn is-catch">⬇️ つかむ！</button>
          <button type="button" id="sv-btn-right" class="sv-ctrl-btn">▶ 右へ</button>
        </div>

        <div class="sv-notice-box">
          遊んでくれてありがとう！<br>
          楽しいゲームの外でも、詐欺には気を付けよう！<br>
          怪しい話はすぐに信じず、必ず確認しよう！
        </div>

        <div class="sv-footer-btns">
          <button type="button" id="sv-btn-reset" class="sv-btn-sub">🔄 ならべ直す</button>
          <button type="button" id="sv-btn-back-menu" class="sv-btn-sub sv-menu-menu">📋 ゲーム選択へ戻る</button>
          <button type="button" id="sv-btn-exit" class="sv-btn-sub sv-btn-exit">◀ タイトルへ戻る</button>
        </div>
      </div>
    `;
    document.body.appendChild(gameOverlay);

    // Detailed Modal Popup for Got Prizes (Jo-kun speech or detailed fraud info)
    const modalOverlay = document.createElement("div");
    modalOverlay.id = "sv-prize-modal";
    modalOverlay.className = "sv-prize-modal-overlay is-hidden";
    modalOverlay.innerHTML = `
      <div class="sv-prize-modal-card">
        <span class="sv-modal-badge" id="sv-modal-badge">🎉 ゲット！</span>
        <h3 class="sv-modal-title" id="sv-modal-title">タイトル</h3>
        <div class="sv-modal-body" id="sv-modal-body">詳細な解説テキスト</div>
        <button type="button" id="sv-modal-close" class="sv-modal-close-btn">OK (つづける)</button>
      </div>
    `;
    document.body.appendChild(modalOverlay);

    registerSubGame({
      id: "crane",
      icon: "🛸",
      title: "ジョーくんUFOキャッチャー",
      desc: "全50種のジョーくん＋詐欺対策プレートをクレーンでキャッチ（詳細解説つき）！",
      onOpen: openGameStage
    });

    bindSubViewEvents();
  }

  function normalizeDigits(val) {
    return (val || "").trim().replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
  }

  function openAuthPrompt() {
    const authOverlay = document.getElementById("sv-auth-overlay");
    const input = document.getElementById("sv-auth-input");
    const errorEl = document.getElementById("sv-auth-error");
    if (input) input.value = "";
    if (errorEl) errorEl.classList.add("is-hidden");
    if (authOverlay) authOverlay.classList.remove("is-hidden");
    setTimeout(() => { if (input) input.focus(); }, 80);
  }

  function closeAuthPrompt() {
    const authOverlay = document.getElementById("sv-auth-overlay");
    if (authOverlay) authOverlay.classList.add("is-hidden");
  }

  function verifyAuthPrompt() {
    const input = document.getElementById("sv-auth-input");
    const errorEl = document.getElementById("sv-auth-error");
    const code = normalizeDigits(input ? input.value : "");

    if (code === SV_PASSCODE) {
      if (errorEl) errorEl.classList.add("is-hidden");
      closeAuthPrompt();
      openMenuOverlay();
    } else {
      if (errorEl) errorEl.classList.remove("is-hidden");
      if (input) { input.value = ""; input.focus(); }
    }
  }

  function openMenuOverlay() {
    const menuOverlay = document.getElementById("sv-menu-overlay");
    const listEl = document.getElementById("sv-menu-list");
    if (listEl) {
      listEl.innerHTML = "";
      svRegisteredGames.forEach((game) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "sv-menu-item-btn";
        btn.innerHTML = `
          <span class="sv-menu-item-icon">${game.icon || "🎮"}</span>
          <div class="sv-menu-item-info">
            <span class="sv-menu-item-title">${game.title}</span>
            <span class="sv-menu-item-desc">${game.desc || ""}</span>
          </div>
        `;
        btn.addEventListener("click", () => {
          closeMenuOverlay();
          game.onOpen();
        });
        listEl.appendChild(btn);
      });
    }
    if (menuOverlay) menuOverlay.classList.remove("is-hidden");
  }

  function closeMenuOverlay() {
    const menuOverlay = document.getElementById("sv-menu-overlay");
    if (menuOverlay) menuOverlay.classList.add("is-hidden");
  }

  function resetPrizes() {
    const layer = document.getElementById("sv-items-layer");
    const banner = document.getElementById("sv-result-banner");
    const caughtSlot = document.getElementById("sv-caught-slot");
    if (!layer) return;

    layer.innerHTML = "";
    if (caughtSlot) caughtSlot.innerHTML = "";
    if (banner) banner.classList.add("is-hidden");

    const entries = getAllPrizeEntries();
    const shuffledSlots = [...SV_LAYOUT_SLOTS].sort(() => Math.random() - 0.5);

    svPrizes = entries.map((entry, idx) => {
      const slot = shuffledSlots[idx] || { x: 50, y: 70 };
      let el;

      if (entry.kind === "text") {
        el = document.createElement("div");
        el.className = `sv-text-prize ${entry.colorClass || ""}`;
        el.textContent = entry.label;
      } else {
        el = document.createElement("img");
        el.src = entry.src;
        el.alt = entry.label;
        el.className = "sv-item";
      }

      el.style.left = `${slot.x}%`;
      el.style.top = `${slot.y}%`;
      layer.appendChild(el);

      return {
        id: idx,
        kind: entry.kind,
        label: entry.label,
        tip: entry.tip || "",
        detail: entry.detail || "",
        src: entry.src || null,
        colorClass: entry.colorClass || "",
        x: slot.x,
        y: slot.y,
        caught: false,
        el: el
      };
    });

    svCaughtCount = 0;
    svCraneX = 50;
    updateCranePosition();
    updateCounterUI();
  }

  function openGameStage() {
    resetPrizes();
    const gameOverlay = document.getElementById("sv-game-overlay");
    if (gameOverlay) gameOverlay.classList.remove("is-hidden");
  }

  function closeGameStage() {
    stopMovingCrane();
    const gameOverlay = document.getElementById("sv-game-overlay");
    if (gameOverlay) gameOverlay.classList.add("is-hidden");
  }

  function updateCranePosition() {
    const crane = document.getElementById("sv-crane");
    if (crane) crane.style.left = `${svCraneX}%`;
  }

  function updateCounterUI() {
    const counter = document.getElementById("sv-counter");
    if (counter) counter.textContent = `ゲット: ${svCaughtCount} / ${svPrizes.length}`;
  }

  function moveCrane(delta) {
    if (svIsAnimating) return;
    svCraneX = Math.max(10, Math.min(90, svCraneX + delta));
    updateCranePosition();
  }

  function startMovingCrane(delta) {
    if (svIsAnimating) return;
    stopMovingCrane();
    moveCrane(delta);
    svMoveInterval = setInterval(() => { moveCrane(delta); }, 90);
  }

  function stopMovingCrane() {
    if (svMoveInterval) {
      clearInterval(svMoveInterval);
      svMoveInterval = null;
    }
  }

  function setControlsDisabled(disabled) {
    ["sv-btn-left", "sv-btn-catch", "sv-btn-right", "sv-btn-reset"].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) btn.disabled = disabled;
    });
  }

  function showPrizeModal(target) {
    const modal = document.getElementById("sv-prize-modal");
    const badge = document.getElementById("sv-modal-badge");
    const title = document.getElementById("sv-modal-title");
    const body = document.getElementById("sv-modal-body");
    if (!modal) return;

    if (target.kind === "img") {
      badge.textContent = "🤖 ジョーくんの防犯応援";
      title.textContent = `「${target.label}」をゲット！`;
      body.innerHTML = `
        <div style="text-align:center; margin-bottom:10px;">
          <img src="${target.src}" alt="${target.label}" style="height:80px; object-fit:contain;">
        </div>
        <p style="margin:0; font-size:15px; line-height:1.6; font-weight:700; color:#1B2A4A;">${target.tip}</p>
      `;
    } else {
      badge.textContent = "🛡️ 詐欺対策・手口解説";
      title.textContent = target.label;
      body.innerHTML = `
        <div style="font-size:14px; line-height:1.75; font-weight:700; color:#1B2A4A; white-space:pre-line;">${target.detail}</div>
      `;
    }

    modal.classList.remove("is-hidden");
  }

  function closePrizeModal() {
    const modal = document.getElementById("sv-prize-modal");
    if (modal) modal.classList.add("is-hidden");
  }

  function triggerCatch() {
    if (svIsAnimating) return;
    stopMovingCrane();

    const crane = document.getElementById("sv-crane");
    const wire = document.getElementById("sv-wire");
    const caughtSlot = document.getElementById("sv-caught-slot");
    const banner = document.getElementById("sv-result-banner");
    const caseEl = document.getElementById("sv-case");
    if (!crane || !wire || !caseEl) return;

    svIsAnimating = true;
    setControlsDisabled(true);
    if (banner) banner.classList.add("is-hidden");
    if (caughtSlot) caughtSlot.innerHTML = "";

    crane.classList.remove("is-closed");
    crane.classList.add("is-open");

    let target = null;
    let minDist = Infinity;
    svPrizes.forEach((p) => {
      if (p.caught) return;
      const dist = Math.abs(p.x - svCraneX);
      if (dist <= 14 && dist < minDist) {
        minDist = dist;
        target = p;
      }
    });

    const caseHeight = caseEl.clientHeight || 310;
    const dropWireHeight = target
      ? Math.max(60, Math.round(caseHeight * (target.y / 100) - 52))
      : Math.round(caseHeight * 0.65);

    setTimeout(() => { wire.style.height = `${dropWireHeight}px`; }, 80);

    setTimeout(() => {
      crane.classList.remove("is-open");
      crane.classList.add("is-closed");

      if (target) {
        // 20%の確率で途中で落とす（ハラハラ演出）
        const isDropped = Math.random() < 0.20;
        if (isDropped) {
          target = null; // 落としてしまったため取得失敗扱い
        } else {
          target.caught = true;
          target.el.classList.add("is-captured");
          if (caughtSlot) {
            if (target.kind === "text") {
              const plate = document.createElement("div");
              plate.className = `sv-caught-text-prize ${target.colorClass || ""}`;
              plate.textContent = target.label;
              caughtSlot.appendChild(plate);
            } else {
              const caughtImg = document.createElement("img");
              caughtImg.src = target.src;
              caughtImg.alt = target.label;
              caughtSlot.appendChild(caughtImg);
            }
          }
        }
      }
    }, 840);

    setTimeout(() => { wire.style.height = "16px"; }, 1120);

    setTimeout(() => {
      if (caughtSlot) caughtSlot.innerHTML = "";
      crane.classList.remove("is-closed");
      crane.classList.add("is-open");

      if (target) {
        svCaughtCount += 1;
        updateCounterUI();
        if (banner) {
          banner.classList.remove("is-hidden", "is-miss");
          if (svCaughtCount >= svPrizes.length) {
            banner.textContent = `🏆 全50個コンプリート！【特徴】現実の詐欺に絶対負けない最強の防衛力！`;
          } else {
            banner.textContent = `🎉 「${target.label}」をゲットしました！`;
          }
        }
        // 詳細ポップアップモーダルを表示
        showPrizeModal(target);
      } else {
        if (banner) {
          banner.classList.remove("is-hidden");
          banner.classList.add("is-miss");
          banner.textContent = "ああっ！アームからすり抜けて落としてしまった…！もう一度チャレンジ！";
        }
      }

      svIsAnimating = false;
      setControlsDisabled(false);
    }, 1900);
  }

  function bindSubViewEvents() {
    const authSubmit = document.getElementById("sv-auth-submit");
    const authCancel = document.getElementById("sv-auth-cancel");
    const authInput = document.getElementById("sv-auth-input");

    if (authSubmit) authSubmit.addEventListener("click", verifyAuthPrompt);
    if (authCancel) authCancel.addEventListener("click", closeAuthPrompt);
    if (authInput) {
      authInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          verifyAuthPrompt();
        }
      });
    }

    const modalCloseBtn = document.getElementById("sv-modal-close");
    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closePrizeModal);

    const btnLeft = document.getElementById("sv-btn-left");
    const btnRight = document.getElementById("sv-btn-right");
    const btnCatch = document.getElementById("sv-btn-catch");
    const btnReset = document.getElementById("sv-btn-reset");
    const btnBackMenu = document.getElementById("sv-btn-back-menu");
    const btnExit = document.getElementById("sv-btn-exit");

    if (btnLeft) {
      btnLeft.addEventListener("mousedown", () => startMovingCrane(-5));
      btnLeft.addEventListener("touchstart", (e) => { e.preventDefault(); startMovingCrane(-5); }, { passive: false });
    }
    if (btnRight) {
      btnRight.addEventListener("mousedown", () => startMovingCrane(5));
      btnRight.addEventListener("touchstart", (e) => { e.preventDefault(); startMovingCrane(5); }, { passive: false });
    }

    window.addEventListener("mouseup", stopMovingCrane);
    window.addEventListener("touchend", stopMovingCrane);
    window.addEventListener("touchcancel", stopMovingCrane);

    if (btnCatch) btnCatch.addEventListener("click", triggerCatch);
    if (btnReset) btnReset.addEventListener("click", resetPrizes);
    if (btnBackMenu) {
      btnBackMenu.addEventListener("click", () => {
        closeGameStage();
        openMenuOverlay();
      });
    }
    if (btnExit) {
      btnExit.addEventListener("click", () => {
        closeGameStage();
        closeMenuOverlay();
      });
    }

    document.addEventListener("keydown", (e) => {
      const gameOverlay = document.getElementById("sv-game-overlay");
      if (!gameOverlay || gameOverlay.classList.contains("is-hidden")) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        moveCrane(-5);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        moveCrane(5);
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        triggerCatch();
      }
    });
  }

  function initTitleTrigger() {
    const titleJoeImg = document.getElementById("title-joe-image");
    const titleScreen = document.getElementById("screen-title");
    const startBtn = document.getElementById("btn-start");
    if (!titleJoeImg || !titleScreen) return;

    titleJoeImg.style.touchAction = "manipulation";
    titleJoeImg.style.userSelect = "none";
    titleJoeImg.style.webkitUserSelect = "none";

    const handleJoeTapAction = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (!titleScreen.classList.contains("active")) {
        svTapCount = 0;
        return;
      }

      svTapCount++;
      if (svTapTimer) clearTimeout(svTapTimer);
      svTapTimer = setTimeout(() => { svTapCount = 0; }, SV_TAP_TIMEOUT_MS);

      if (svCaughtCount >= 0 && svTapCount >= SV_REQUIRED_TAPS) {
        svTapCount = 0;
        if (svTapTimer) clearTimeout(svTapTimer);
        openAuthPrompt();
      }
    };

    titleJoeImg.addEventListener("click", handleJoeTapAction);
    titleJoeImg.addEventListener("touchend", handleJoeTapAction, { passive: false });

    if (startBtn) {
      startBtn.addEventListener("click", () => {
        svTapCount = 0;
        if (svTapTimer) clearTimeout(svTapTimer);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    createSubViewDOM();
    initTitleTrigger();
  });
})();