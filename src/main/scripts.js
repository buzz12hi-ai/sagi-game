/*
レガシー、コードは
src/main/js
 - assets.js
 - data.js
 - main.js
 - state.js
 - ui.js
 に移行済み
*/

/* =========================================================
   だまされるな！1週間チャレンジ - ゲーム本体スクリプト
   -----------------------------------------------------------
   構成
   0. 画像アセット一覧（IMAGE_ASSETS）
   1. データ部分（ITEMS / QUESTIONS）
   2. ゲームの状態（state）
   3. 画面を切り替える・描画する関数たち
   4. ボタンなどのイベント登録
   ========================================================= */


/* =========================================================
   0. 画像アセット一覧
   画像を追加・差し替えたいときは、ここだけを編集すれば
   ゲーム本体（3./4.）は変更不要です。
   ========================================================= */
const IMG_BASE = "../resource/images/";

const IMAGE_ASSETS = {

  characters: {
    studentNeutral: IMG_BASE + "images.jpeg",
    studentHappy:   IMG_BASE + "images-2.jpeg",
    studentSad:     IMG_BASE + "images-3.jpeg",
    studentWalking: IMG_BASE + "images-1.jpeg",

    mother:        IMG_BASE + "images-6.jpeg",
    motherWorried: IMG_BASE + "images-7.jpeg",

    elderlyWomanCane:    IMG_BASE + "images-11.jpeg",
    elderlyWomanWorried: IMG_BASE + "images-10.jpeg",
    elderlyManGlasses:   IMG_BASE + "images-9.jpeg",
    elderlyManWorried:   IMG_BASE + "Unknown.jpeg",

    workerGas:            IMG_BASE + "images-8.jpeg",
    suspiciousVisitor:    IMG_BASE + "sagi_syoukaki_houmonhanbai_oshiuri~2.jpg",
    suspiciousSilhouette: IMG_BASE + "images.png",

    manTroubled: IMG_BASE + "images-5.jpeg",
    manShocked:  IMG_BASE + "images-4.jpeg",
  },

  backgrounds: {
    entrance:    IMG_BASE + "玄関.jpg",
    livingRoom:  IMG_BASE + "リビング.jpg",
    myRoom:      IMG_BASE + "自分の部屋.jpg",
    schoolRoute: IMG_BASE + "学校の通学路.jpeg",
    atm:         IMG_BASE + "ATM.jpeg",
    convenienceStoreFallback: IMG_BASE + "mall2_1-768x432.jpg",
    policeStation: IMG_BASE + "police_station_1-768x432.jpg",
    intersection:  IMG_BASE + "intersection_1-768x432.jpg",
    hideout:       IMG_BASE + "hideout_1-768x432.jpg",
  },

  screenshots: {
    instagram:      IMG_BASE + "Screenshot_20260713-210410~2.jpg",
    gameAppNotice:  IMG_BASE + "Screenshot_20260714-152224.png",
    shoppingAd:     IMG_BASE + "Screenshot_20260713-222036.png",
    phoneCall:      IMG_BASE + "Screenshot_20260714-075852.png",
    lineSidejob:    IMG_BASE + "Screenshot_20260713-195050.png",
    lineOfficial:   IMG_BASE + "Screenshot_20260713-224932.png",
    gmailPolice:    IMG_BASE + "Screenshot_20260714-150551.png",
    gmailDelivery:  IMG_BASE + "Screenshot_20260714-145923.png",
  },
};


/* =========================================================
   1. データ部分
   ========================================================= */
const ITEMS = [
  { id: "switch",   name: "Nintendo Switch 2",     emoji: "🎮", image: null, price: 49980 },
  { id: "earphone", name: "ワイヤレスイヤホン",       emoji: "🎧", image: null, price: 15000 },
  { id: "trip",     name: "修学旅行のお小遣い",       emoji: "🎒", image: null, price: 20000 },
  { id: "club",     name: "部活用品",                emoji: "⚽", image: null, price: 10000 },
  { id: "fashion",  name: "流行りの服",              emoji: "👕", image: null, price: 12000 },
];

/* ---- 問題データ（全15問） ----------------------------------------------
   category : "scam" = 詐欺イベント / "real" = 本物イベント / "help" = 助けるイベント
   source   : イベントがどこから来たか
   characterName / narration / dialogue / point / notification
            : ストーリー演出用のデータ（4. の関数がそのまま読み込みます）
   choices[].type : "correct" = 正解 / "wrong" = 不正解 / "partial" = △
------------------------------------------------------------------------ */
const QUESTIONS = [

  // ---------------- ① 訪問 ----------------
  {
    id: "q_inspection_scam",
    category: "scam",
    source: "訪問",
    title: "点検商法",

    characterName: "訪問業者",
    narration: "学校から帰ると、家の前に見慣れない人が立っていた。\n近所で工事をしているらしく、道具箱を持っている。",
    dialogue: [
      { speaker: "訪問業者", line: "こんにちは。近所で工事してる者だけど、屋根が少し傷んでるのが見えたんだよね。" },
      { speaker: "訪問業者", line: "今日なら無料で点検できるよ。ちょっと屋根裏だけ見せてもらえる？" },
      { speaker: "主人公", line: "（お父さんもお母さんも仕事でまだ帰ってこない…どうしよう）" },
    ],
    point: "無料点検・今日限定・即決を迫るのは訪問販売トラブルの典型パターン。名刺や書類を見せられても、その場で判断せず必ず家族に相談しよう。",
    notification: null,

    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: null,
    desc: "近所で工事をしていることを口実に、「屋根が壊れていますよ」と家を訪ねてきた業者。\n「無料で点検します」と、そのまま家に上がろうとしてくる。",
    choices: [
      { text: "家に入れる", type: "wrong", money: -15000,
        explain: "知らない業者を確認もせず家に入れるのは危険。無料点検を口実に高額な工事費を請求される「点検商法」の典型的な手口だよ。" },
      { text: "家族に相談する", type: "correct", money: 0,
        explain: "正解！ 一人で判断せず、まず家族に相談することが大切。怪しい訪問には「話さない」を意識しよう。" },
      { text: "考えるために一旦保留にする", type: "wrong", money: -15000,
        explain: "その場で保留にしても、業者がしつこく居座ったり、後日連絡してくることも。すぐに家族へ相談するのが一番安全だよ。" },
      { text: "名刺や作業着を確認し、本物だと思ったのでその場で点検を頼む", type: "wrong", money: -15000,
        explain: "名刺や作業着は簡単に用意できてしまう。「確認したから大丈夫」と思ってその場で決めてしまうこと自体が危険。見た目の確認だけで安心せず、必ず家族に相談しよう。" },
    ],
  },
  {
    id: "q_gas_real",
    category: "real",
    source: "訪問",
    title: "ガス会社の定期点検",

    characterName: "ガス会社 作業員",
    narration: "数日前、ポストにガス会社からのお知らせが入っていたのを思い出す。\n「○月○日に定期点検にうかがいます」と書いてあった気がする。",
    dialogue: [
      { speaker: "ガス会社 作業員", line: "こんにちは、○○ガスです。本日は定期点検でうかがいました。" },
      { speaker: "ガス会社 作業員", line: "こちら身分証と作業証明書です。少しお時間よろしいですか？" },
      { speaker: "主人公", line: "（そういえば、お知らせのハガキが来てたはず…同じ日付かな？）" },
    ],
    point: "事前通知と身分証、両方が一致していれば信頼できる可能性が高い。ただし「事前通知があったから」だけで安心せず、身分証の確認は必ず行おう。",
    notification: null,

    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: null,
    desc: "ガス会社から事前に「○月○日に点検します」という通知が届いていた。\n当日、制服姿の社員が身分証・名札を見せながら点検を依頼してきた。",
    choices: [
      { text: "身分証を確認して対応する", type: "correct", money: 0,
        explain: "正解！ 事前通知があり、身分証もきちんと確認できるなら本物の点検である可能性が高いよ。確認する習慣が大事。" },
      { text: "無条件で追い返す", type: "partial", money: -1000,
        explain: "本物の点検を断ってしまうと、後で結局対応が必要になることも。「確認する」というワンステップを忘れずに。" },
      { text: "家に入れる（身分証を確認せず）", type: "wrong", money: -2000,
        explain: "本物っぽく見えても、身分証を確認せずに家に入れるのは危険。事前通知があっても必ず確認しよう。" },
      { text: "身分証は確認せず、事前通知があったので信用してそのまま対応する", type: "wrong", money: -2000,
        explain: "「事前に知らせが来ていたから」という理由だけで信用するのも危険。通知の内容を装って訪問するケースもあるため、身分証の確認は毎回必ず行おう。" },
    ],
  },

  // ---------------- ② Gmail ----------------
  {
    id: "q_police_mail_scam",
    category: "scam",
    source: "Gmail",
    title: "偽警察メール",

    characterName: "自分",
    narration: "スマホを見ると、見慣れない件名のメールが届いていた。\n「あなたの口座が犯罪に利用されています」――ドキッとして開いてしまう。",
    dialogue: [
      { speaker: "主人公", line: "え…犯罪に利用されてるって、どういうこと…？" },
      { speaker: "主人公", line: "「至急確認しないと逮捕されます」って書いてある。すごく焦る…。" },
      { speaker: "主人公", line: "下に確認用のリンクがある。とりあえず開いてみようかな…。" },
    ],
    point: "「至急」「逮捕」など不安をあおる文面は詐欺メールの典型的な特徴。メール内の連絡先ではなく、自分で調べた公式窓口に確認するのが鉄則。",
    notification: "📱ピコン　Gmailから通知",

    bg: null,
    character: null,
    screenshot: IMAGE_ASSETS.screenshots.gmailPolice,
    desc: "件名：「あなたの口座が犯罪に利用されています」\n「至急確認しないと逮捕されます」と書かれ、確認用のリンクへ誘導されている。",
    choices: [
      { text: "メール内のURLを開く", type: "wrong", money: -8000,
        explain: "本物の警察が、メールのリンクから個人情報の入力を求めることはない。焦らせる文面は詐欺の典型パターンだよ。" },
      { text: "個人情報を入力する", type: "wrong", money: -8000,
        explain: "「渡さない」が鉄則。個人情報や口座情報は、どんなに急かされても絶対に入力しないこと。" },
      { text: "自分で警察署の代表番号を調べて確認する", type: "correct", money: 0,
        explain: "正解！ メール内の連絡先ではなく、自分で調べた公式の番号に確認するのが安全な方法だよ。" },
      { text: "メールに書かれている電話番号にかけて確認する", type: "wrong", money: -8000,
        explain: "「確認しよう」という考え自体は正しいけれど、メールに書かれた電話番号自体が詐欺グループのものである可能性が高い。確認は必ず自分で調べた公式の番号を使おう。" },
    ],
  },
  {
    id: "q_delivery_real",
    category: "real",
    source: "Gmail",
    title: "宅配会社からのメール",

    characterName: "自分",
    narration: "宅配会社からメールが届いていた。\n「お荷物をお届けしましたが、ご不在でした」と書かれている。そういえば今日は荷物が届く予定だった。",
    dialogue: [
      { speaker: "主人公", line: "あ、そういえば今日届くはずだった荷物だ。再配達をお願いしないと。" },
      { speaker: "主人公", line: "メールには「お問い合わせ番号」も書いてあるし、リンクもある。どこから手続きすればいいかな。" },
    ],
    point: "「お問い合わせ番号」や具体的な情報が書いてあっても、それだけで本物と決めつけないこと。手続きは公式アプリ・公式サイトから行うのが一番安全。",
    notification: "📱ピコン　Gmailから通知",

    bg: null,
    character: null,
    screenshot: IMAGE_ASSETS.screenshots.gmailDelivery,
    desc: "「お荷物をお届けしましたが、ご不在でした。」\n再配達の手続きは、宅配会社の公式サイトから行うよう案内されている。",
    choices: [
      { text: "メールのリンクを開く", type: "partial", money: -500,
        explain: "本物のメールでも、リンクを直接開く癖をつけると偽メールを見分けにくくなる。公式アプリ・サイトを直接調べる習慣をつけよう。" },
      { text: "宅配会社の公式アプリ・公式サイトから確認する", type: "correct", money: 0,
        explain: "正解！ メール内のリンクに頼らず、公式アプリやブックマークした公式サイトから確認するのが確実だよ。" },
      { text: "詐欺だと思って何もしない", type: "wrong", money: -1000,
        explain: "本物の荷物を受け取れなくなってしまう。「怪しい＝全部無視」ではなく、公式ルートで確認することが大切。" },
      { text: "メール内の「お問い合わせ番号」を使い、メール内のリンク先で再配達を依頼する", type: "partial", money: -500,
        explain: "お問い合わせ番号があると信用しがちだけど、番号ごとコピーして使う偽メールもある。番号があってもリンク先ではなく、公式アプリ・サイトから手続きしよう。" },
    ],
  },

  // ---------------- ③ Instagram ----------------
  {
    id: "q_romance_scam",
    category: "scam",
    source: "Instagram",
    title: "ロマンス詐欺",

    characterName: "自分",
    narration: "知らないアカウントからフォローされ、DMが届いた。\nプロフィール写真はとても爽やかで、海外で働いているという自己紹介が書かれている。",
    dialogue: [
      { speaker: "相手（DM）", line: "はじめまして。プロフィールを見て気になりました😊" },
      { speaker: "相手（DM）", line: "実は投資で稼いでいて、よかったら一緒にやってみない？少額からでも大丈夫だよ。" },
      { speaker: "主人公", line: "（優しそうな人だし、写真もちゃんとしてるし…どうしよう）" },
    ],
    point: "SNSで知り合った相手からお金や投資の話が出たら、それだけで警戒サイン。写真や自己紹介がしっかりしていても、中身が本人とは限らない。",
    notification: "📱ピコン　Instagramから通知",

    bg: null,
    character: null,
    screenshot: IMAGE_ASSETS.screenshots.instagram,
    desc: "知らない人からフォローされ、DMが届いた。\n「プロフィールを見て気になりました😊」「実は投資で稼いでいるんだけど、一緒にやらない？」",
    choices: [
      { text: "相手のプロフィールだけを見て信用する", type: "wrong", money: -10000,
        explain: "プロフィール写真や経歴は簡単に偽装できる。見た目の情報だけで信用するのは危険だよ。" },
      { text: "ビデオ通話をして本人なら信用する", type: "wrong", money: -10000,
        explain: "ビデオ通話ができても、投資の話に発展した時点で警戒が必要。手口が巧妙化していることも覚えておこう。" },
      { text: "お金や投資の話になった時点でやり取りをやめる", type: "correct", money: 0,
        explain: "正解！ SNSで知り合った相手からお金や投資の話が出たら、それだけで詐欺を疑って距離を置こう。" },
      { text: "海外にいる相手だと分かったので、自分だけで慎重にやり取りを続けて様子を見る", type: "wrong", money: -10000,
        explain: "「慎重にやり取りする」つもりでも、投資の話が出ている時点でリスクは同じ。一人で対応を続けず、その場でやり取りをやめて大人に相談しよう。" },
    ],
  },
  {
    id: "q_impersonate_scam",
    category: "scam",
    source: "Instagram",
    title: "なりすまし",

    characterName: "自分",
    narration: "普段からよくやり取りしている友達のアカウントから、急にDMが届いた。\nアイコンも名前もいつも通りだけど、なんだか慌てた様子。",
    dialogue: [
      { speaker: "友達（？）", line: "ごめん急いでる！PayPayで3000円だけ送ってもらえない！？" },
      { speaker: "友達（？）", line: "あとで絶対返すから！今すぐお願い！" },
      { speaker: "主人公", line: "（いつもの友達のアカウントだし…でも、なんか焦ってて変な感じ）" },
    ],
    point: "アカウントは名前もアイコンもそのまま乗っ取られることがある。「いつも通りに見える」ことは本人確認の証拠にはならない。",
    notification: "📱ピコン　Instagramから通知",

    bg: null,
    character: null,
    screenshot: IMAGE_ASSETS.screenshots.instagram,
    desc: "普段やり取りしている友達と同じ名前・アイコンのアカウントから\n「急いでる！PayPayで3000円送って！」とDMが届いた。",
    choices: [
      { text: "いつもの友達だからすぐ送る", type: "wrong", money: -3000,
        explain: "アカウントは名前やアイコンごと簡単にコピーできる。「いつもの友達」に見えても油断は禁物だよ。" },
      { text: "DMで「本当に○○？」と聞く", type: "partial", money: -1500,
        explain: "同じDMの中で確認しても、相手が乗っ取り犯なら「本当だよ」と返してくるだけ。別の手段で確認する必要があるよ。" },
      { text: "LINEや電話で本人に確認する", type: "correct", money: 0,
        explain: "正解！ お金の話が出たら、DMとは別の手段（電話やLINE通話）で本人に直接確認するのが安全だよ。" },
      { text: "アイコンや名前がいつも通りだったので、本人だと判断して送る", type: "wrong", money: -3000,
        explain: "アイコンや名前が同じでも、アカウントが乗っ取られていれば見た目はそのまま。見た目の一致は判断材料にならないよ。" },
    ],
  },
  {
    id: "q_gameapp_real",
    category: "real",
    source: "Instagram",
    title: "ゲーム公式アプリのお知らせ",

    characterName: "自分",
    narration: "いつも遊んでいるゲームを開くと、お知らせが1件届いていた。\n「夏休みキャンペーン開催中！」と表示されている。",
    dialogue: [
      { speaker: "主人公", line: "夏休みキャンペーンか。アプリの中のお知らせだし、これは本物だよね。" },
      { speaker: "友達（LINE）", line: "ねえ、さっきSNSで同じキャンペーンの広告見つけたよ！こっちからも登録できるみたい。" },
    ],
    point: "同じ内容のキャンペーンでも、案内される入口によって安全性は変わる。最終的な確認・登録は必ず公式アプリの中で行おう。",
    notification: "📱ピコン　ゲームアプリから通知",

    bg: null,
    character: null,
    screenshot: IMAGE_ASSETS.screenshots.gameAppNotice,
    desc: "ゲーム公式アプリのお知らせ欄に\n「夏休みキャンペーン開催中！」と表示されている。",
    choices: [
      { text: "アプリ内のお知らせから確認する", type: "correct", money: 0,
        explain: "正解！ 公式アプリ内のお知らせは信頼できる情報源。困ったときは公式のお知らせを確認する習慣をつけよう。" },
      { text: "「広告だから全部危険」と思って無視する", type: "partial", money: -500,
        explain: "本物のキャンペーン情報を見逃してしまうことも。「公式アプリの中かどうか」で見分けるのがポイントだよ。" },
      { text: "SNSで見つけた同じキャンペーンのリンクを開く", type: "wrong", money: -1000,
        explain: "内容が同じでも、SNS上のリンクは偽サイトに誘導する詐欺の可能性がある。必ず公式アプリ内で確認しよう。" },
      { text: "友達が送ってきた同じ画面のスクリーンショットを信じて、そこに書かれたリンクを開く", type: "wrong", money: -1000,
        explain: "友達からの情報でも、画面のスクリーンショットは偽サイトのものかもしれない。友達経由の情報でも、最終確認は必ず公式アプリの中で行おう。" },
    ],
  },

  // ---------------- ④ 広告 ----------------
  {
    id: "q_shopping_ad_scam",
    category: "scam",
    source: "広告",
    title: "偽ショッピング広告",

    characterName: "自分",
    narration: "SNSを見ていると、広告が目に入った。\n「人気ワイヤレスイヤホン50％OFF」「公式セール開催中！」と書かれている。",
    dialogue: [
      { speaker: "主人公", line: "50％オフ…！ちょうど欲しかったやつだ。しかもコメント欄、口コミもたくさんついてる。" },
      { speaker: "主人公", line: "評価も高いし、これなら安心して買えそう。" },
    ],
    point: "口コミの数や評価の高さも作り込まれていることがある。安さや評判に飛びつかず、まず商品名を検索して公式ルートを確認しよう。",
    notification: "📱ピコン　広告が表示されました",

    bg: null,
    character: null,
    screenshot: IMAGE_ASSETS.screenshots.shoppingAd,
    desc: "SNSで「人気ワイヤレスイヤホン50％OFF」「公式セール開催中！」という広告が表示された。",
    choices: [
      { text: "広告からそのまま購入する", type: "wrong", money: -4000,
        explain: "SNS広告の中には、代金を払っても商品が届かない詐欺サイトへ誘導するものがある。安さだけで飛びつくのは危険だよ。" },
      { text: "商品名を検索し、公式サイト・公式アプリから探す", type: "correct", money: 0,
        explain: "正解！ 広告のリンクを直接開かず、自分で商品名を検索して公式ルートから探すのが安全だよ。" },
      { text: "有名企業だから信用して個人情報を入力する", type: "wrong", money: -4000,
        explain: "有名企業のロゴやデザインも偽サイトで簡単に真似できる。「渡さない」を意識して個人情報の入力は慎重に。" },
      { text: "口コミの数が多く評価も高かったので、信用してそのまま購入する", type: "wrong", money: -4000,
        explain: "口コミの数や星評価は、詐欺サイトでも簡単に水増しできてしまう。評判の良さだけを根拠に信用せず、公式ルートで確認しよう。" },
    ],
  },

  // ---------------- ⑤ LINE ----------------
  {
    id: "q_sidejob_scam",
    category: "scam",
    source: "LINE",
    title: "LINE副業詐欺",

    characterName: "自分",
    narration: "LINEのオープンチャットを眺めていると、こんなメッセージが目についた。\n「スマホだけで月5万円稼げます！」「未成年でもOK！」",
    dialogue: [
      { speaker: "募集アカウント", line: "スマホだけで月5万円稼げる副業、気になりませんか？未成年でも大丈夫です！" },
      { speaker: "募集アカウント", line: "詳しい内容は個別LINEで説明します。まずは気軽にメッセージください。" },
      { speaker: "主人公", line: "（個人情報は教えなければ大丈夫かな…話だけ聞いてみようかな）" },
    ],
    point: "「話を聞くだけ」のつもりでも、関わり続けること自体が勧誘の一部になっている。うまい話に興味を持った時点で、関わらずに離れるのが一番安全。",
    notification: "📱ピコン　LINEから通知",

    bg: null,
    character: null,
    screenshot: IMAGE_ASSETS.screenshots.lineSidejob,
    desc: "LINEオープンチャットで\n「スマホだけで月5万円稼げます！」「未成年でもOK！」「詳細は個別LINEへ」と誘われた。",
    choices: [
      { text: "詳しい話だけ聞いてみる", type: "wrong", money: -6000,
        explain: "話を聞くだけのつもりでも、個別LINEに移動すると個人情報や登録料を求められることが多いよ。" },
      { text: "プロフィールを確認して参加する", type: "wrong", money: -6000,
        explain: "プロフィールが立派でも中身は詐欺グループということも。「うまい話」には気をつけよう。" },
      { text: "グループを退出し勧誘に応じない", type: "correct", money: 0,
        explain: "正解！ 「簡単に稼げる」という誘いは詐欺の可能性が高い。関わらずにすぐ離れるのが一番安全だよ。" },
      { text: "個人情報は教えないと決めた上で、稼ぎ方の説明だけ聞いてみる", type: "partial", money: -3000,
        explain: "個人情報を守っていても、話を聞き続けること自体が相手の勧誘のペースに乗ってしまうことになる。「うまい話」だと感じた時点で関わらないのが一番安全だよ。" },
    ],
  },
  {
    id: "q_line_official_real",
    category: "real",
    source: "LINE",
    title: "LINE公式アカウント",

    characterName: "自分",
    narration: "よく行くコンビニのLINE公式アカウントから通知が届いた。\n「50円引きクーポン」が届いたようだ。",
    dialogue: [
      { speaker: "主人公", line: "お、クーポンだ。今度買い物するときに使お。" },
      { speaker: "主人公", line: "でも念のため、本当に公式のアカウントか確認しておこうかな。" },
    ],
    point: "LINE公式アカウントには認証マークが付く。クーポンなどのお得な情報も、マークを確認する習慣をつければ安心して活用できる。",
    notification: "📱ピコン　LINEから通知",

    bg: null,
    character: null,
    screenshot: IMAGE_ASSETS.screenshots.lineOfficial,
    desc: "コンビニのLINE公式アカウントから「50円引きクーポン」が届いた。",
    choices: [
      { text: "認証マークを確認して利用する", type: "correct", money: 0,
        explain: "正解！ LINE公式アカウントには認証マークが付く。マークを確認する習慣をつければ安心して使えるよ。" },
      { text: "LINEだから危険だと思いブロックする", type: "wrong", money: -500,
        explain: "本物のお得な情報を逃してしまうことに。「LINE＝全部危険」ではなく、公式マークで見分けよう。" },
      { text: "友達から送られてきた画像を使う", type: "wrong", money: -500,
        explain: "画像は簡単に転送・偽造できてしまう。クーポンは必ず公式アカウントから直接受け取ろう。" },
      { text: "クーポン画面をスクリーンショットして保存し、レジでそれを見せて使う", type: "partial", money: -250,
        explain: "スクリーンショットは誰でもコピーして使い回せてしまうため、お店側も真偽を判断しづらい。公式アカウントの画面からそのまま提示するのが確実だよ。" },
    ],
  },

  // ---------------- ⑥ 電話 ----------------
  {
    id: "q_police_call_scam",
    category: "scam",
    source: "電話",
    title: "偽警察電話",

    characterName: "電話の相手",
    narration: "知らない番号から電話がかかってきた。\n出てみると、低く落ち着いた声で「警察です」と名乗る相手。",
    dialogue: [
      { speaker: "電話の相手", line: "○○県警です。あなた名義の口座が、特殊詐欺に使われていることが分かりました。" },
      { speaker: "電話の相手", line: "詳しい取り調べが必要なので、これからLINEを追加してください。" },
      { speaker: "主人公", line: "（え、警察から電話…？でもLINEで取り調べって、なんか変な気もする）" },
    ],
    point: "警察がLINEで取り調べを行うことはない。電話を一度切って、自分で調べた警察署の代表番号にかけ直して確認しよう。",
    notification: "📞プルルル…着信中",

    bg: null,
    character: null,
    screenshot: IMAGE_ASSETS.screenshots.phoneCall,
    desc: "「○○県警です。」「あなた名義の口座が特殊詐欺に使われています。」「LINEで取り調べを行います。」",
    choices: [
      { text: "指示どおりLINEを追加する", type: "wrong", money: -9000,
        explain: "警察がLINEで取り調べを行うことはない。指示に従ってLINEを追加すると、詐欺グループとやり取りが始まってしまうよ。" },
      { text: "名前を聞き電話を切り、自分で警察署へ確認する", type: "correct", money: 0,
        explain: "正解！ その場で信じず、一度電話を切って自分で調べた警察署の番号に確認するのが安全だよ。" },
      { text: "LINEで警察手帳を見せてもらう", type: "wrong", money: -9000,
        explain: "画像は簡単に加工・偽造できる。LINEで見せられた手帳が本物である保証はまったくないよ。" },
      { text: "折り返し用の番号を教えてもらい、後でその番号にかけ直して確認する", type: "wrong", money: -9000,
        explain: "「後で確認する」という考えは正しいけれど、相手から教えられた番号自体が詐欺グループにつながるものである可能性が高い。確認は必ず自分で調べた公式の番号を使おう。" },
    ],
  },
  {
    id: "q_phoneshop_real",
    category: "real",
    source: "電話",
    title: "携帯ショップからの電話",

    characterName: "携帯ショップ 店員",
    narration: "先日修理をお願いしていた携帯ショップから電話がかかってきた。",
    dialogue: [
      { speaker: "携帯ショップ 店員", line: "お世話になっております。ご依頼いただいていた修理が完了しましたのでご連絡しました。" },
      { speaker: "携帯ショップ 店員", line: "お受け取りのお日にちを確認させていただいてもよろしいですか？" },
      { speaker: "主人公", line: "（そういえば修理お願いしてたな。予約内容とも合ってるし…）" },
    ],
    point: "内容が予約と一致していても、暗証番号や口座情報を電話で伝える必要はない。確認すべきは「用件が本物かどうか」であって、個人情報を渡す理由にはならない。",
    notification: "📞プルルル…着信中",

    bg: null,
    character: null,
    screenshot: IMAGE_ASSETS.screenshots.phoneCall,
    desc: "予約していた携帯ショップから「修理が完了しました。」と電話が来た。",
    choices: [
      { text: "内容を確認する", type: "correct", money: 0,
        explain: "正解！ 予約していた内容と一致していれば問題ないよ。落ち着いて内容を確認しよう。" },
      { text: "詐欺だと思って切る", type: "wrong", money: -1500,
        explain: "本物の連絡まで切ってしまうと、必要な手続きが進まなくなることも。内容と状況を照らし合わせて判断しよう。" },
      { text: "暗証番号を教える", type: "wrong", money: -1500,
        explain: "たとえ本物のお店からの電話でも、暗証番号を電話で伝える必要はない。「渡さない」を徹底しよう。" },
      { text: "予約内容と合っていたので、そのまま口座番号を伝えて支払いを済ませる", type: "wrong", money: -1500,
        explain: "予約内容が合っていることと、口座情報を電話で伝えて良いことは別問題。本物の連絡であっても、口座番号などを電話でその場で伝える必要はないよ。" },
    ],
  },

  // ---------------- ⑦ 助けるイベント ----------------
  {
    id: "q_atm_help",
    category: "help",
    source: "助ける",
    title: "ATMでの出来事",

    characterName: "お年寄り（女性）",
    narration: "銀行のATMコーナーに立ち寄ると、電話をしながら操作しているお年寄りの姿が目に入った。\n様子が少し慌てているように見える。",
    dialogue: [
      { speaker: "お年寄り", line: "（電話口に向かって）はい、はい…言われた通りに、振込のボタンを押せばいいんですね…。" },
      { speaker: "主人公", line: "（電話をしながらATMを操作するのって、テレビで見た特殊詐欺の話に似てる気がする…）" },
    ],
    point: "電話をしながらのATM操作は、特殊詐欺でよく見られる状況。まずは声をかけて、一度電話を切ってもらうことが被害を防ぐ第一歩になる。",
    notification: null,

    bg: IMAGE_ASSETS.backgrounds.atm,
    character: IMAGE_ASSETS.characters.elderlyWomanCane,
    screenshot: null,
    desc: "ATMでお年寄りが、電話をしながら操作をしている。",
    choices: [
      { text: "「大丈夫ですか？詐欺かもしれないので、一度電話を切って店員さんに相談しませんか？」と声を掛ける", type: "correct", money: 1000,
        explain: "正解！ 電話をしながらのATM操作は特殊詐欺の典型的な状況。優しく声をかけて、店員さんに繋げることが被害を防ぐ第一歩だよ。" },
      { text: "代わりにATMを操作する", type: "wrong", money: -5000,
        explain: "操作を代わりにしてしまうと、気づかないうちに詐欺の手助けをしてしまう可能性がある。まずは声をかけて状況を確認しよう。" },
      { text: "何もしない", type: "wrong", money: -5000,
        explain: "気づいていながら何もしないと、被害を防げたかもしれない機会を逃してしまう。困っている人には勇気を出して声をかけよう。" },
      { text: "本人には声をかけず、その場を離れてから警察に通報する", type: "partial", money: 0,
        explain: "通報という行動自体は間違いではないけれど、その場で本人に声をかけないと、警察が来る前に振込が完了してしまうかもしれない。まずはその場で声をかけることが大切だよ。" },
    ],
  },
  {
    id: "q_konbini_help",
    category: "help",
    source: "助ける",
    title: "コンビニでの出来事",

    characterName: "お年寄り（男性）",
    narration: "コンビニのレジに並んでいると、前にいるお年寄りが電子マネーカードを何枚もレジに出しているのが見えた。",
    dialogue: [
      { speaker: "お年寄り", line: "（店員さんに）これ、5万円分お願いします。急いでいるので。" },
      { speaker: "主人公", line: "（電子マネーカードを5万円分…？何に使うんだろう、様子が気になるな）" },
    ],
    point: "電子マネーカードの高額購入を急いでいる様子は、詐欺で「支払い」として使われている可能性が高いサイン。店員に伝えることで確認や声かけをしてもらえる。",
    notification: null,

    bg: IMAGE_ASSETS.backgrounds.convenienceStoreFallback,
    character: IMAGE_ASSETS.characters.elderlyManGlasses,
    screenshot: null,
    desc: "お年寄りが、電子マネーカードを5万円分購入しようとしている。",
    choices: [
      { text: "店員へ事情を伝える", type: "correct", money: 1000,
        explain: "正解！ 電子マネーカードの高額購入は詐欺の要求であることが多い。店員さんに伝えれば、確認や声かけをしてもらえるよ。" },
      { text: "購入を手伝う", type: "wrong", money: -5000,
        explain: "手伝ってしまうと詐欺の被害が進んでしまう。困っていそうな様子に気づいたら、まず店員さんに伝えよう。" },
      { text: "その場を離れる", type: "wrong", money: -5000,
        explain: "気づいたのに離れてしまうと、防げたはずの被害を止められない。勇気を出して周りに知らせよう。" },
      { text: "本人に直接「それ、詐欺じゃないですか？」と問いただす", type: "partial", money: -1000,
        explain: "直接問いただすと、本人が驚いたり信じてもらえなかったりして、かえって話がこじれることも。まずは店員さんに伝えて、対応してもらうほうが効果的だよ。" },
    ],
  },
  {
    id: "q_home_help",
    category: "help",
    source: "助ける",
    title: "家庭での出来事",

    characterName: "母",
    narration: "家に帰ると、母が電話を切ったところだった。少し不安そうな顔をしている。",
    dialogue: [
      { speaker: "母", line: "さっき警察から電話があってね。「口座が犯罪に使われているので、別の口座へ移してください」って言われたの。" },
      { speaker: "母", line: "言われた通りにした方がいいのかしら…。" },
      { speaker: "主人公", line: "（別の口座に移す…？それ、なんか聞いたことある話と似てる気がする）" },
    ],
    point: "「口座を移してください」という指示は特殊詐欺の典型的な手口。「怪しい」と伝えるだけでなく、一緒に警察署へ確認しに行くところまで行動することが大切。",
    notification: null,

    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.motherWorried,
    screenshot: null,
    desc: "母親が「警察から『口座が犯罪に使われているので別口座へ移してください』と言われた。」と話している。",
    choices: [
      { text: "一緒に警察署へ確認する", type: "correct", money: 3000,
        explain: "正解！ 本物の警察が電話で口座の変更を指示することはない。一緒に警察署へ確認しに行くことで、家族を詐欺から守れるよ。" },
      { text: "振り込みを勧める", type: "wrong", money: -10000,
        explain: "「別口座へ移して」は特殊詐欺の典型的な手口。振り込みを勧めてしまうと、大切な家族が被害に遭ってしまうよ。" },
      { text: "何もしない", type: "wrong", money: -10000,
        explain: "違和感に気づいていたのに何もしないと、家族が詐欺の被害に遭ってしまうかもしれない。「変だな」と思ったら一緒に確認しよう。" },
      { text: "母に「怪しいから絶対にやめて」とだけ伝え、それ以上は特に何もしない", type: "partial", money: -3000,
        explain: "危険だと伝えること自体はよいことだけれど、それだけでは不安は解消されない。一緒に警察署へ確認しに行くところまで行動して、はじめて安心できるよ。" },
    ],
  },
];


/* =========================================================
   2. ゲームの状態（プレイ中に変化する情報をまとめて管理）
   ========================================================= */
const state = {
  money: 50000,
  selectedItem: null,
  weeklyQuestions: [],
  daySchedule: [],
  slotIndex: 0,
  dialogueIndex: 0,
  correctCount: 0,
};

const WEEKDAY_LABELS = ["月", "火", "水", "木", "金", "土"];
const SHOPPING_LABEL = "日";

// 9問を6日間に配分する日程を作る（3日は1問、3日は2問で 3×1 + 3×2 = 9問）
function buildDaySchedule() {
  const weekdayIndexes = [0, 1, 2, 3, 4, 5];
  const shuffledIndexes = shuffleArray(weekdayIndexes);
  const doubleDayIndexes = new Set(shuffledIndexes.slice(0, 3));

  const schedule = [];
  for (let day = 0; day < 6; day++) {
    const questionsOnThisDay = doubleDayIndexes.has(day) ? 2 : 1;
    for (let slot = 0; slot < questionsOnThisDay; slot++) {
      schedule.push({
        weekdayIndex: day,
        periodLabel: questionsOnThisDay === 2 ? (slot === 0 ? "午前" : "午後") : "",
      });
    }
  }
  return schedule;
}


/* =========================================================
   3. 画面を切り替える・描画する関数たち
   ========================================================= */

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((el) => {
    el.classList.toggle("active", el.id === screenId);
  });
}

function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function pickWeeklyQuestions() {
  const byCategory = (cat) => QUESTIONS.filter((q) => q.category === cat);

  const scamPicked = shuffleArray(byCategory("scam")).slice(0, 4);
  const realPicked = shuffleArray(byCategory("real")).slice(0, 3);
  const helpPicked = shuffleArray(byCategory("help")).slice(0, 2);

  return shuffleArray([...scamPicked, ...realPicked, ...helpPicked]);
}

// 今、出題中の問題データを取得する
function currentQuestion() {
  return state.weeklyQuestions[state.slotIndex];
}

function setImageSafely(imgElement, src) {
  if (!src) {
    imgElement.removeAttribute("src");
    imgElement.classList.add("is-hidden");
    return;
  }
  imgElement.classList.remove("is-hidden");
  imgElement.onerror = () => imgElement.classList.add("is-hidden");
  imgElement.src = src;
}

function updateMoneyDisplay() {
  document.getElementById("money-display").textContent =
    state.money.toLocaleString("ja-JP");
}

function renderDayTracker() {
  const tracker = document.getElementById("day-tracker");
  tracker.innerHTML = "";

  const isShoppingPhase = state.slotIndex >= state.daySchedule.length;
  const currentWeekdayIndex = isShoppingPhase
    ? WEEKDAY_LABELS.length
    : state.daySchedule[state.slotIndex].weekdayIndex;

  const allLabels = [...WEEKDAY_LABELS, SHOPPING_LABEL];

  allLabels.forEach((label, i) => {
    const dot = document.createElement("div");
    dot.className = "day-dot";
    if (i < currentWeekdayIndex) dot.classList.add("is-done");
    if (i === currentWeekdayIndex) dot.classList.add("is-current");
    dot.textContent = label;
    tracker.appendChild(dot);
  });
}

function updateStatusBar() {
  document.getElementById("status-bar").classList.remove("hidden");
  renderDayTracker();
  updateMoneyDisplay();
}

function itemVisualHTML(item, imgClass) {
  if (item.image) {
    return `<img class="${imgClass}" src="${item.image}" alt="${item.name}">`;
  }
  return `<span class="item-emoji ${imgClass}-emoji">${item.emoji}</span>`;
}

// ---- ①→②：タイトル画面からアイテム選択画面へ ----
function goToItemSelect() {
  document.getElementById("status-bar").classList.add("hidden");
  const list = document.getElementById("item-list");
  list.innerHTML = "";

  ITEMS.forEach((item) => {
    const card = document.createElement("button");
    card.className = "item-card";
    card.type = "button";
    card.innerHTML = `
      ${itemVisualHTML(item, "item-photo")}
      <span class="item-name">${item.name}</span>
      <span class="item-price">¥${item.price.toLocaleString("ja-JP")}</span>
    `;
    card.addEventListener("click", () => startWeek(item));
    list.appendChild(card);
  });

  showScreen("screen-item");
}

// ---- ②→③：欲しい物を決めたら状態を初期化し、あらすじ画面へ ----
function startWeek(item) {
  state.selectedItem = item;
  state.money = 50000;
  state.slotIndex = 0;
  state.dialogueIndex = 0;
  state.correctCount = 0;
  state.weeklyQuestions = pickWeeklyQuestions();
  state.daySchedule = buildDaySchedule();

  showSynopsis();
}

// ---- ③：あらすじ画面 ----
function showSynopsis() {
  const item = state.selectedItem;
  const card = document.getElementById("synopsis-card");
  card.innerHTML = `
    <p class="synopsis-text">
      あなたは中学生。1週間後、欲しかった「${item.name}」を買うために、
      50,000円を守りながら過ごすことになる。<br><br>
      でも、街にもスマホの中にも「詐欺」は潜んでいる。<br>
      話さない・騙されない・渡さない。<br>
      正しい判断で、自分と家族を守り抜こう。
    </p>
  `;
  showScreen("screen-synopsis");
}

// ---- ④：曜日の始まりを知らせる画面 ----
// label を中央に表示し、タップまたは一定時間で次の処理（onNext）へ進む
function showDayIntro(label, onNext) {
  document.getElementById("dayintro-label").textContent = label;
  showScreen("screen-dayintro");

  const btn = document.getElementById("btn-dayintro-next");
  let hasAdvanced = false;

  const advance = () => {
    if (hasAdvanced) return;
    hasAdvanced = true;
    clearTimeout(autoTimer);
    btn.onclick = null;
    onNext();
  };

  btn.onclick = advance;
  const autoTimer = setTimeout(advance, 1600);
}

// ---- ⑤〜⑧：その日のイベント（ナレーション〜問題）を開始する ----
function showEvent() {
  if (state.slotIndex >= state.weeklyQuestions.length) {
    goToShopping();
    return;
  }

  updateStatusBar();

  const scheduleSlot = state.daySchedule[state.slotIndex];
  const isNewDay =
    state.slotIndex === 0 ||
    scheduleSlot.weekdayIndex !== state.daySchedule[state.slotIndex - 1].weekdayIndex;

  if (isNewDay) {
    const weekdayName = WEEKDAY_LABELS[scheduleSlot.weekdayIndex];
    showDayIntro(`${weekdayName}曜日`, startEventFlow);
  } else {
    startEventFlow();
  }
}

// ナレーション→会話→通知→問題、の順に進む最初のステップ
function startEventFlow() {
  state.dialogueIndex = 0;
  const question = currentQuestion();

  if (question.narration) {
    showNarration();
  } else {
    handleNarrationNext();
  }
}

function showNarration() {
  const question = currentQuestion();
  const scheduleSlot = state.daySchedule[state.slotIndex];
  const weekdayName = WEEKDAY_LABELS[scheduleSlot.weekdayIndex];
  const dayLabelText = scheduleSlot.periodLabel
    ? `${weekdayName}曜日・${scheduleSlot.periodLabel}`
    : `${weekdayName}曜日`;

  document.getElementById("narration-daylabel").textContent = dayLabelText;
  document.getElementById("narration-text").textContent = question.narration;
  showScreen("screen-narration");
}

// ナレーションの「次へ」：会話があれば会話へ、無ければ通知か問題へ
function handleNarrationNext() {
  const question = currentQuestion();
  if (question.dialogue && question.dialogue.length > 0) {
    showDialogueLine();
  } else {
    goToAfterDialogue();
  }
}

function showDialogueLine() {
  const question = currentQuestion();
  const line = question.dialogue[state.dialogueIndex];
  document.getElementById("dialogue-speaker").textContent = line.speaker;
  document.getElementById("dialogue-line").textContent = line.line;
  showScreen("screen-dialogue");
}

// 会話の「次へ」：まだ続きがあれば次の行、終わっていれば通知か問題へ
function goToDialogueNext() {
  const question = currentQuestion();
  state.dialogueIndex += 1;

  if (state.dialogueIndex < question.dialogue.length) {
    showDialogueLine();
  } else {
    goToAfterDialogue();
  }
}

// 会話が終わったあとの分岐：通知が必要なイベントだけスマホ通知を見せる
function goToAfterDialogue() {
  const question = currentQuestion();
  if (question.notification) {
    showNotification();
  } else {
    showQuestion();
  }
}

function showNotification() {
  const question = currentQuestion();
  document.getElementById("notification-text").textContent = question.notification;
  showScreen("screen-notification");
}

function handleNotificationOpen() {
  showQuestion();
}

// 背景・人物 or スクリーンショットを描き分ける
// suspiciousVisitor だけ背景が黒いため、ブレンドモードで馴染ませる
function renderEventVisual(question) {
  const screenshotImg = document.getElementById("event-screenshot-image");
  const bgImg = document.getElementById("event-bg-image");
  const characterImg = document.getElementById("event-character-image");
  const visual = document.getElementById("event-visual");

  characterImg.classList.remove("blend-multiply", "blend-screen");

  if (question.screenshot) {
    visual.classList.add("is-screenshot-mode");
    setImageSafely(screenshotImg, question.screenshot);
    setImageSafely(bgImg, null);
    setImageSafely(characterImg, null);
    return;
  }

  visual.classList.remove("is-screenshot-mode");
  setImageSafely(screenshotImg, null);
  setImageSafely(bgImg, question.bg);
  setImageSafely(characterImg, question.character);

  if (question.character === IMAGE_ASSETS.characters.suspiciousVisitor) {
    characterImg.classList.add("blend-screen");
  } else if (question.character) {
    characterImg.classList.add("blend-multiply");
  }
}

// ---- ⑧：問題文と4択を表示する ----
function showQuestion() {
  const question = currentQuestion();
  const scheduleSlot = state.daySchedule[state.slotIndex];
  const weekdayName = WEEKDAY_LABELS[scheduleSlot.weekdayIndex];

  const dayLabelText = scheduleSlot.periodLabel
    ? `${weekdayName}曜日・${scheduleSlot.periodLabel}`
    : `${weekdayName}曜日`;
  document.getElementById("event-daylabel").textContent = dayLabelText;
  document.getElementById("event-progress").textContent =
    `${state.slotIndex + 1} / ${state.weeklyQuestions.length}問目`;

  document.getElementById("event-source").textContent = `📍 ${question.source}`;
  document.getElementById("event-title").textContent = question.title;
  document.getElementById("event-desc").textContent = question.desc;

  renderEventVisual(question);

  const choiceList = document.getElementById("choice-list");
  choiceList.innerHTML = "";

  shuffleArray(question.choices).forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.type = "button";
    btn.textContent = choice.text;
    btn.addEventListener("click", () => handleChoice(choice));
    choiceList.appendChild(btn);
  });

  showScreen("screen-event");
}

function getNextButtonLabel() {
  const nextIndex = state.slotIndex + 1;
  if (nextIndex >= state.weeklyQuestions.length) return "買い物へ";

  const currentWeekday = state.daySchedule[state.slotIndex].weekdayIndex;
  const nextWeekday = state.daySchedule[nextIndex].weekdayIndex;
  return currentWeekday === nextWeekday ? "次のできごとへ" : "次の日へ";
}

function resultCharacterFor(choiceType) {
  if (choiceType === "correct") return IMAGE_ASSETS.characters.studentHappy;
  if (choiceType === "partial") return IMAGE_ASSETS.characters.studentNeutral;
  return IMAGE_ASSETS.characters.studentSad;
}

// ---- ⑨：選択肢を選んだときの処理 ----
function handleChoice(choice) {
  const question = currentQuestion();

  state.money += choice.money;
  updateMoneyDisplay();
  if (choice.type === "correct") state.correctCount += 1;

  const badge = document.getElementById("result-badge");
  const moneyText = document.getElementById("result-money");
  const currentMoneyText = document.getElementById("result-current-money");
  const explain = document.getElementById("result-explain");
  const pointText = document.getElementById("result-point");
  const resultCharacterImg = document.getElementById("result-character-image");

  badge.classList.remove("is-correct", "is-partial", "is-wrong");

  if (choice.type === "correct") {
    badge.textContent = "◎ 正解！";
    badge.classList.add("is-correct");
  } else if (choice.type === "partial") {
    badge.textContent = "△ おしい！";
    badge.classList.add("is-partial");
  } else {
    badge.textContent = "✕ 詐欺にひっかかった…";
    badge.classList.add("is-wrong");
  }

  if (choice.money > 0) {
    moneyText.textContent = `所持金 +${choice.money.toLocaleString("ja-JP")}円`;
  } else if (choice.money < 0) {
    moneyText.textContent = `所持金 ${choice.money.toLocaleString("ja-JP")}円`;
  } else {
    moneyText.textContent = "所持金の増減なし";
  }

  currentMoneyText.textContent = `現在の所持金：¥${state.money.toLocaleString("ja-JP")}`;
  explain.textContent = choice.explain;
  pointText.textContent = question.point ? `💡 今回のポイント\n${question.point}` : "";

  setImageSafely(resultCharacterImg, resultCharacterFor(choice.type));
  document.getElementById("btn-next").textContent = getNextButtonLabel();

  showScreen("screen-result");
}

// ---- 「次へ」ボタン：次の問題、または買い物イベントへ進む ----
function goToNextDay() {
  state.slotIndex += 1;
  showEvent();
}

// ---- ⑩：日曜日の始まりを見せてから買い物イベントへ ----
function goToShopping() {
  showDayIntro("日曜日", showShoppingScreen);
}

function showShoppingScreen() {
  updateStatusBar();
  const card = document.getElementById("shopping-card");
  const item = state.selectedItem;
  const canAfford = state.money >= item.price;

  card.innerHTML = `
    ${itemVisualHTML(item, "shopping-photo")}
    <p class="shopping-title">${item.name}（¥${item.price.toLocaleString("ja-JP")}）</p>
    <p class="shopping-detail">
      今の所持金は <strong>¥${state.money.toLocaleString("ja-JP")}</strong> だよ。<br>
      ${canAfford ? "欲しかった物が買えそう！" : "残念、必要な金額に足りていないみたい…"}
    </p>
  `;

  showScreen("screen-shopping");
}

// ---- ⑪：エンディング ----
function showEnding() {
  const item = state.selectedItem;
  const canAfford = state.money >= item.price;
  const card = document.getElementById("ending-card");
  const totalQuestions = state.weeklyQuestions.length;

  const endingCharacter = canAfford
    ? IMAGE_ASSETS.characters.studentHappy
    : IMAGE_ASSETS.characters.studentSad;

  const statsHTML = `
    <div class="ending-stats-grid">
      <div class="ending-stat">
        <span class="ending-stat-label">最終所持金</span>
        <span class="ending-stat-value">¥${state.money.toLocaleString("ja-JP")}</span>
      </div>
      <div class="ending-stat">
        <span class="ending-stat-label">正解数</span>
        <span class="ending-stat-value">${state.correctCount} / ${totalQuestions}問</span>
      </div>
    </div>
  `;

  if (canAfford) {
    card.innerHTML = `
      <div class="ending-visual">
        <img class="ending-character-image" src="${endingCharacter}" alt="中学生（喜び）">
        ${itemVisualHTML(item, "ending-item-photo")}
      </div>
      <p class="ending-title is-good">${item.name}が買えた！</p>
      <p class="ending-detail">
        詐欺を見抜き、困っている人にも手を差し伸べたキミ。<br>
        「話さない・騙されない・渡さない」を実践できたね。<br>
        これからも落ち着いて、しっかり確認する習慣を続けよう。
      </p>
      ${statsHTML}
    `;
  } else {
    const shortfall = item.price - state.money;
    card.innerHTML = `
      <div class="ending-visual">
        <img class="ending-character-image" src="${endingCharacter}" alt="中学生（残念）">
        ${itemVisualHTML(item, "ending-item-photo")}
      </div>
      <p class="ending-title is-bad">${item.name}まで、あと¥${shortfall.toLocaleString("ja-JP")}足りなかった…</p>
      <p class="ending-detail">
        詐欺の被害にあうと、欲しかった物を諦めなければいけないことも。<br>
        次にプレイするときは「話さない・騙されない・渡さない」を思い出して、<br>
        落ち着いて確認する習慣を身につけよう。
      </p>
      ${statsHTML}
    `;
  }

  card.querySelectorAll("img").forEach((img) => {
    img.onerror = () => img.classList.add("is-hidden");
  });

  showScreen("screen-ending");
}

// ---- 「もう一度遊ぶ」：最初から ----
function restartGame() {
  state.money = 50000;
  state.selectedItem = null;
  state.weeklyQuestions = [];
  state.daySchedule = [];
  state.slotIndex = 0;
  state.dialogueIndex = 0;
  state.correctCount = 0;
  document.getElementById("status-bar").classList.add("hidden");
  showScreen("screen-title");
}


/* =========================================================
   4. ボタンなどのイベントを登録する
   ========================================================= */
document.getElementById("btn-start").addEventListener("click", goToItemSelect);
document.getElementById("btn-synopsis-next").addEventListener("click", showEvent);
document.getElementById("btn-narration-next").addEventListener("click", handleNarrationNext);
document.getElementById("btn-dialogue-next").addEventListener("click", goToDialogueNext);
document.getElementById("btn-notification-open").addEventListener("click", handleNotificationOpen);
document.getElementById("btn-next").addEventListener("click", goToNextDay);
document.getElementById("btn-ending").addEventListener("click", showEnding);
document.getElementById("btn-restart").addEventListener("click", restartGame);

showScreen("screen-title");