/*=========================================================
   data.js
   -----------------------------------------------------------
   問題プール定義（全4モード各16問・計64問・難易度全面リファイン版）
   難易度設計：小学生 ＜ 高齢者 ＜ 中高生 ＝ 一般
   ========================================================= */

const ITEMS = [
  { id: "snack",      group: "初級", name: "高級お菓子セット",     emoji: "🍫", image: null, price: 3000 },
  { id: "stationery", group: "初級", name: "おしゃれ文房具セット", emoji: "✏️", image: null, price: 5000 },
  { id: "book",       group: "初級", name: "話題の漫画全巻セット", emoji: "📚", image: null, price: 8000 },

  { id: "fashion",    group: "普通", name: "流行りのブランド服",   emoji: "👕", image: null, price: 12000 },
  { id: "club",       group: "普通", name: "部活の最新ギア用品",   emoji: "⚽", image: null, price: 15000 },
  { id: "earphone",   group: "普通", name: "ワイヤレスイヤホン",   emoji: "🎧", image: null, price: 18000 },

  { id: "game_soft",  group: "上級", name: "新作ゲームソフト2本", emoji: "💿", image: null, price: 24000 },
  { id: "goods",      group: "上級", name: "限定推し活グッズ",     emoji: "✨", image: null, price: 30000 },
  { id: "smartwatch", group: "上級", name: "スマートウォッチ",     emoji: "⌚", image: null, price: 38000 },

  { id: "switch",     group: "MAX",  name: "Nintendo Switch 2", emoji: "🎮", image: null, price: 50300 }
];

const DAY_INTRO_COMMENTS = {
  "月": "新しい1週間の始まりだね！\n落ち着いて判断していこう！",
  "火": "少し慣れてきた頃かな？\n今日も確認を忘れずに！",
  "水": "あと半分！\n焦らず進もう！",
  "木": "詐欺は突然やってくるよ。\n今日も気を付けよう！",
  "金": "もう少しで週末！\n最後まで油断しないでね！",
  "土": "いよいよ終盤！\n学んだことを活かそう！",
  "日": "今日は最後の日！\n落ち着いて過ごそう！",
};

const DAILY_ACTIONS_BY_DAY = {
  "月": [
    { label: "📱 スマホを見る", cat: "smartphone" },
    { label: "📚 宿題をする", cat: "family" },
    { label: "⚽ 友達と遊ぶ", cat: "go_out" }
  ],
  "水": [
    { label: "🏃 部活へ行く", cat: "go_out" },
    { label: "🏪 コンビニへ行く", cat: "go_out" },
    { label: "🏠 家に帰る", cat: "family" }
  ],
  "土": [
    { label: "🛍️ 買い物へ行く", cat: "go_out" },
    { label: "🎮 ゲームをする", cat: "smartphone" },
    { label: "🚗 家族と出かける", cat: "family" }
  ]
};

const THREE_PRINCIPLES = [
  { head: "① 喋らない（話さない）", desc: "怪しい相手へ個人情報や暗証番号・口座情報を伝えない" },
  { head: "② 払わない（渡さない）", desc: "急かされても、すぐにお金や電子マネーを振り込まない・買わない" },
  { head: "③ 騙されない（相談する）", desc: "うまい話を鵜呑みにせず、必ず公式窓口や警察・公的機関に確認する" }
];

const SKILL_MAP = {
  // 小学生モード用
  "q_elem_police_mail": "こわいメールに慌てず大人の人に相談する力",
  "q_elem_present_scam": "タダでもらえるウソの話を見抜く力",
  "q_elem_carrier_real": "本物のお知らせを安全に使う力",
  "q_elem_delivery_real": "荷物の不在連絡をおうちの人と確認する力",
  "q_elem_atm_help": "困っているお年寄りを大人の人に知らせて助ける力",
  "q_elem_inspection_scam": "知らない人を家に入れず断る力",
  "q_elem_impersonate_scam": "友達を名乗る怪しい連絡を直接確かめる力",
  "q_elem_home_help": "慌てるお母さんを落ち着かせて詐欺を防ぐ力",
  "q_elem_konbini_help": "電子マネーを買おうとするおじいさんを店員に知らせる力",
  "q_elem_shopping_scam": "安すぎる偽物ショッピングサイトを見破る力",
  "q_elem_gameapp_real": "ゲームの安全なお知らせを正しく読む力",
  "q_elem_romance_scam": "ネットの知らない人からのお金の話を断る力",
  "q_elem_rmt_scam": "ゲーム内通貨・アイテム増殖の罠を見抜く力",
  "q_elem_screenshare_scam": "通話アプリでの認証コード聞き出しを防ぐ力",
  "q_elem_fake_youtuber": "有名人の偽プレゼントDMを見破る力",
  "q_elem_gacha_code": "無料ガチャを装うカード情報入力を防ぐ力",

  // 中高生モード用
  "q_teen_police_mail": "偽警察からの不安を煽るメールを看破する力",
  "q_teen_present_scam": "SNSのプレゼント企画を見極める力",
  "q_teen_carrier_real": "通信会社からの公式通知を確認する力",
  "q_teen_delivery_real": "不在通知から公式サイトを利用する力",
  "q_teen_atm_help": "ATMで困っている人を安全に助ける力",
  "q_teen_inspection_scam": "訪問点検トラブルを回避する力",
  "q_teen_impersonate_scam": "乗っ取りアカウントからの送金要求を防ぐ力",
  "q_teen_home_help": "家族への詐欺指示を一緒に防ぐ力",
  "q_teen_konbini_help": "電子マネー詐欺に気づいて店員に知らせる力",
  "q_teen_shopping_ad_scam": "偽ショッピング広告を見分ける力",
  "q_teen_gameapp_real": "公式アプリのお知らせを安全に使う力",
  "q_teen_romance_scam": "SNSでの投資勧誘を断る力",
  "q_teen_dark_job": "高額日払いを謳う闇バイト（受け子等）を拒絶する力",
  "q_teen_ticket_scam": "SNSでのチケット個人間売買詐欺を見破る力",
  "q_teen_copyright_dm": "偽の著作権侵害警告による乗っ取りを防ぐ力",
  "q_teen_ai_fake_ad": "生成AI・ディープフェイク偽動画広告を見抜く力",

  // 一般（大人）モード用
  "q_adult_police_paypay_scam": "警察を装う決済不正利用フィッシングを看破する力",
  "q_adult_subsc_scam": "サブスク自動更新解除を騙る架空請求を遮断する力",
  "q_adult_etax_scam": "国税庁・e-Tax還付通知の真偽を見抜く力",
  "q_adult_bank_otp_scam": "銀行ワンタイムパスワード搾取を見破る力",
  "q_adult_task_scam": "簡単なタスク副業（SNS副業詐欺）を拒絶する力",
  "q_adult_invest_scam": "著名人悪用・SNS投資グループ勧誘を断る力",
  "q_adult_fire_insurance_scam": "火災保険申請代行・悪質リフォーム勧誘を防ぐ力",
  "q_adult_card_real": "クレジットカード会社の正規利用通知を正しく確認する力",
  "q_adult_biz_cloud_real": "クラウドサービスの正規仕様変更通知を扱う力",
  "q_adult_colleague_help": "職場の同僚へのサポート詐欺（遠隔操作）を止める力",
  "q_adult_customs_scam": "国際小包の関税未納スミッシングを見抜く力",
  "q_adult_myna_scam": "マイナポータル有効期限切れ偽装SMSを見破る力",
  "q_adult_utility_scam": "ライフライン供給停止を騙る緊急スミッシングを防ぐ力",
  "q_adult_ponzi_scam": "元本保証・AI自動トレードを謳う出資金詐欺を断る力",
  "q_adult_travel_cancel_scam": "身に覚えのない宿泊予約キャンセル料詐欺を見抜く力",
  "q_adult_card_freeze_scam": "カード不正利用検知を装う偽認証メールを遮断する力",

  // 高齢者モード用
  "q_senior_call_police": "警察を騙る電話を毅然と切る力",
  "q_senior_call_refund": "市役所還付金詐欺を見破る力",
  "q_senior_call_son": "オレオレ詐欺（息子騙り）を直接確認する力",
  "q_senior_call_power": "大手電力会社騙りの電話勧誘を断る力",
  "q_senior_call_bank_real": "銀行からの正規連絡を正しく照会する力",
  "q_senior_visit_roof": "屋根点検商法を家に入れず断る力",
  "q_senior_visit_precious": "不要品・貴金属の強引な買い取りを断る力",
  "q_senior_visit_water": "水道局を騙る水質点検詐欺を防ぐ力",
  "q_senior_visit_fire": "消防署騙りの高額消火器販売を断る力",
  "q_senior_visit_gas_real": "ガス点検の事前通知を確認する力",
  "q_senior_visit_pipe_clean": "排水管高圧洗浄の格安チラシ商法を断る力",
  "q_senior_sms_delivery": "宅配不在通知の偽リンクを開かない力",
  "q_senior_web_support": "パソコンの偽警告画面（サポート詐欺）を消去する力",
  "q_senior_mail_tax": "国税庁騙りの未納通知を見破る力",
  "q_senior_sms_carrier_real": "携帯会社からの正規請求案内を確認する力",
  "q_senior_mail_card_real": "クレジットカード会社の正規セキュリティ通知を扱う力"
};

/* =========================================================
   【小学生モード用問題プール】（全16問・全漢字ルビ付き）
   難易度：初級（子どもが取りがちな行動で迷わせる）
   ========================================================= */
const QUESTIONS_ELEMENTARY = [
  {
    id: "q_elem_police_mail", category: "scam", source: "メール", title: "【<ruby>大<rt>だい</rt></ruby>ピンチ】<ruby>警察<rt>けいさつ</rt></ruby>からメールがきた！？",
    characterName: "にせものの<ruby>警察<rt>けいさつ</rt></ruby>",
    narration: "がっこうから <ruby>帰<rt>かえ</rt></ruby>って スマホを <ruby>見<rt>み</rt></ruby>ると、こわいメールが <ruby>届<rt>とど</rt></ruby>いていました。\n『【たいへんだ】あなたの <ruby>名<rt>な</rt></ruby><ruby>前<rt>まえ</rt></ruby>が <ruby>犯罪<rt>はんざい</rt></ruby>に つかわれました！ 24<ruby>時間<rt>じかん</rt></ruby><ruby>以内<rt>いない</rt></ruby>に <ruby>下<rt>した</rt></ruby>のボタンをおして <ruby>名<rt>な</rt></ruby><ruby>前<rt>まえ</rt></ruby>と パスワードを <ruby>入力<rt>にゅうりょく</rt></ruby>しないと、あなたを <ruby>逮捕<rt>たいほ</rt></ruby>します！』",
    dialogue: [
      { speaker: "あやしいメール", line: "【<ruby>警告<rt>けいこく</rt></ruby>】いそいで！ <ruby>下<rt>した</rt></ruby>の <ruby>青<rt>あお</rt></ruby>い<ruby>文字<rt>もじ</rt></ruby>（リンク）をおして、パスワードと <ruby>名<rt>な</rt></ruby><ruby>前<rt>まえ</rt></ruby>を <ruby>入力<rt>にゅうりょく</rt></ruby>してください！" },
      { speaker: "主人公", line: "「たいほするって かいてある…どうしよう！ はやく <ruby>入力<rt>にゅうりょく</rt></ruby>しないと つかまっちゃうのかな…！？」" }
    ],
    point: "<ruby>本物<rt>ほんもの</rt></ruby>の <ruby>警察<rt>けいさつ</rt></ruby>が、メールで『<ruby>名<rt>な</rt></ruby><ruby>前<rt>まえ</rt></ruby>やパスワードを<ruby>入<rt>い</rt></ruby>れろ』と おくることは ぜったいに ありません！",
    notification: "📱ピコン 【<ruby>警察<rt>けいさつ</rt></ruby>】たいほします！",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.gmailPolice,
    desc: "「24<ruby>時間<rt>じかん</rt></ruby><ruby>以内<rt>いない</rt></ruby>に ボタンをおして <ruby>名<rt>な</rt></ruby><ruby>前<rt>まえ</rt></ruby>を <ruby>入力<rt>にゅうりょく</rt></ruby>しないと つかまります」と メールが きた！",
    correctChoices: [
      { text: "メールの ボタンはおさずに、すぐ おうちの <ruby>人<rt>ひと</rt></ruby>（お<ruby>父<rt>とう</rt></ruby>さんやお<ruby>母<rt>かあ</rt></ruby>さん）に メールを <ruby>見<rt>み</rt></ruby>せて <ruby>相談<rt>そうだん</rt></ruby>する", money: 0, explain: "せいかい！ こわがらせる メールは <ruby>詐欺<rt>さぎ</rt></ruby>（うそ）だよ！ すぐ おうちの<ruby>人<rt>ひと</rt></ruby>に <ruby>見<rt>み</rt></ruby>せて <ruby>正解<rt>せいかい</rt></ruby>！" }
    ],
    wrongChoices: [
      { text: "「たいほされたら こまる！」と あわてて、メールのボタンをおして <ruby>名<rt>な</rt></ruby><ruby>前<rt>まえ</rt></ruby>とパスワードを <ruby>入力<rt>にゅうりょく</rt></ruby>する", money: -20000, damageType: "personal_info", explain: "だまされちゃった！ <ruby>大切<rt>たいせつ</rt></ruby>な パスワードが <ruby>悪<rt>わる</rt></ruby>ものに ぬすまれて お<ruby>金<rt>かね</rt></ruby>をとられちゃうよ！" },
      { text: "「ほんとうに けいさつかな？」と たしかめるために、メールに かいてある でんわ<ruby>番号<rt>ばんごう</rt></ruby>に でんわしてみる", money: -15000, damageType: "money", explain: "あぶない！ さぎグループのでんわに つながって、こわい<ruby>声<rt>こえ</rt></ruby>で お<ruby>金<rt>かね</rt></ruby>をはらえとおどされちゃうよ！" },
      { text: "おうちの<ruby>人<rt>ひと</rt></ruby>におこられるのが こわいので、なかよしの <ruby>友<rt>とも</rt></ruby>だちに LINEで メールを <ruby>転送<rt>てんそう</rt></ruby>してきいてみる", money: -10000, damageType: "personal_info", explain: "あぶない！ <ruby>友<rt>とも</rt></ruby>だちもリンクをおして だまされてしまう<ruby>危険<rt>きけん</rt></ruby>があるよ。おとなの<ruby>人<rt>ひと</rt></ruby>にすぐ<ruby>見<rt>み</rt></ruby>せよう！" }
    ]
  },
  {
    id: "q_elem_present_scam", category: "scam", source: "ネット・SNS", title: "ゲーム<ruby>機<rt>き</rt></ruby>が タダでもらえる！？",
    characterName: "プレゼントのアカウント",
    narration: "スマホで <ruby>動画<rt>どうが</rt></ruby>を <ruby>見<rt>み</rt></ruby>ていると、すてきな メッセージが <ruby>届<rt>とど</rt></ruby>きました。\n『【<ruby>大<rt>おお</rt></ruby>あたり！】100<ruby>名<rt>めい</rt></ruby>さまに <ruby>最新<rt>さいしん</rt></ruby>ゲーム<ruby>機<rt>き</rt></ruby>を タダで プレゼント！ いまスグ <ruby>手続<rt>てつづ</rt></ruby>きしてね！』",
    dialogue: [
      { speaker: "プレゼント", line: "おめでとう！ おうちに ゲーム<ruby>機<rt>き</rt></ruby>を おくるので、お<ruby>父<rt>とう</rt></ruby>さんやお<ruby>母<rt>かあ</rt></ruby>さんの クレジットカード<ruby>番号<rt>ばんごう</rt></ruby>を <ruby>入力<rt>にゅうりょく</rt></ruby>してね！（※<ruby>送料<rt>そうりょう</rt></ruby>500<ruby>円<rt>えん</rt></ruby>だけ かかります）" },
      { speaker: "主人公", line: "「500<ruby>円<rt>えん</rt></ruby>だけで あの<ruby>最新<rt>さいしん</rt></ruby>ゲーム<ruby>機<rt>き</rt></ruby>が もらえるの！？ すっごく おとくだ！ はやくほしいな！」" }
    ],
    point: "『タダであげるけど カード<ruby>番号<rt>ばんごう</rt></ruby>をいれて』は、カードから お<ruby>金<rt>かね</rt></ruby>を ぬすむ うそのお<ruby>話<rt>はなし</rt></ruby>（<ruby>詐欺<rt>さぎ</rt></ruby>）です！",
    notification: "📱ピコン <ruby>当<rt>とう</rt></ruby>せんメッセージ！",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.instagram,
    desc: "「<ruby>最新<rt>さいしん</rt></ruby>ゲーム<ruby>機<rt>き</rt></ruby>が あたりました！ <ruby>送料<rt>そうりょう</rt></ruby>500<ruby>円<rt>えん</rt></ruby>の カード<ruby>番号<rt>ばんごう</rt></ruby>を <ruby>入<rt>い</rt></ruby>れてください」と かいてある。",
    correctChoices: [
      { text: "「タダなのに カード<ruby>番号<rt>ばんごう</rt></ruby>を <ruby>求<rt>もと</rt></ruby>めるのは <ruby>怪<rt>あや</rt></ruby>しい！」と きづいて、ボタンをおさず おうちの<ruby>人<rt>ひと</rt></ruby>に「これホント？」と <ruby>確認<rt>かくにん</rt></ruby>する", money: 0, explain: "せいかい！ うまいお<ruby>話<rt>はなし</rt></ruby>には ウラがあるよ。おうちの<ruby>人<rt>ひと</rt></ruby>に<ruby>相談<rt>そうだん</rt></ruby>して しっかり<ruby>防<rt>ふせ</rt></ruby>げたね！" }
    ],
    wrongChoices: [
      { text: "500<ruby>円<rt>えん</rt></ruby>なら お<ruby>小遣<rt>こづか</rt></ruby>いでも はらえるから、おうちの<ruby>人<rt>ひと</rt></ruby>のカードを <ruby>探<rt>さが</rt></ruby>してきて <ruby>番号<rt>ばんごう</rt></ruby>を <ruby>入力<rt>にゅうりょく</rt></ruby>する", money: -25000, damageType: "personal_info", explain: "だまされた！ カードから たくさんのお<ruby>金<rt>かね</rt></ruby>が ぜんぶぬすまれちゃうよ！" },
      { text: "ほんとうに ゲームが もらえるか たしかめるため、メッセージで「いつ とどきますか？」と <ruby>返信<rt>へんしん</rt></ruby>してみる", money: -10000, damageType: "personal_info", explain: "あぶない！ <ruby>返信<rt>へんしん</rt></ruby>すると「<ruby>連絡<rt>れんらく</rt></ruby>がとれるカモ」と おもわれて、もっとたくさんの <ruby>詐欺<rt>さぎ</rt></ruby>メッセージが <ruby>届<rt>とど</rt></ruby>くようになっちゃうよ！" },
      { text: "「あとで お<ruby>金<rt>かね</rt></ruby>をはらえばいいや」と おもって、じぶんの なまえと じゅうしょだけ <ruby>先<rt>さき</rt></ruby>に <ruby>入力<rt>にゅうりょく</rt></ruby>する", money: -15000, damageType: "personal_info", explain: "あぶない！ <ruby>住所<rt>じゅうしょ</rt></ruby>や なまえなどの <ruby>個人情報<rt>こじんじょうほう</rt></ruby>が わるいグループに ぜんぶ バレちゃうよ！" }
    ]
  },
  {
    id: "q_elem_carrier_real", category: "real", source: "メール", title: "【<ruby>本物<rt>ほんもの</rt></ruby>】スマホの つかいすぎの おしらせ",
    characterName: "スマホ<ruby>会社<rt>がいしゃ</rt></ruby>",
    narration: "がっこうの <ruby>帰<rt>かえ</rt></ruby>り<ruby>道<rt>みち</rt></ruby>、スマホ<ruby>会社<rt>がいしゃ</rt></ruby>から メールが <ruby>届<rt>とど</rt></ruby>きました。\n『【おしらせ】<ruby>今月<rt>こんげつ</rt></ruby>の インターネットの つかえる<ruby>量<rt>りょう</rt></ruby>が のこり<ruby>少<rt>すく</rt></ruby>なくなりました。<ruby>公式<rt>こうしき</rt></ruby>アプリから <ruby>確認<rt>かくにん</rt></ruby>してください。』",
    dialogue: [
      { speaker: "スマホ会社", line: "※このメールには ボタン（リンク）はありません。スマホに はじめから<ruby>入<rt>はい</rt></ruby>っている <ruby>公式<rt>こうしき</rt></ruby>アプリを ひらいてください。" },
      { speaker: "主人公", line: "「<ruby>動画<rt>どうが</rt></ruby>を <ruby>見<rt>み</rt></ruby>すぎちゃったかな？ アプリで たしかめてみよう。」" }
    ],
    point: "あやしいリンクを おさせずに、『<ruby>公式<rt>こうしき</rt></ruby>アプリから <ruby>確認<rt>かくにん</rt></ruby>してね』という おしらせは、あんしんな <ruby>本物<rt>ほんもの</rt></ruby>のおしらせです。",
    notification: "📱ピコン スマホ<ruby>会社<rt>がいしゃ</rt></ruby>からのおしらせ",
    bg: IMAGE_ASSETS.backgrounds.schoolRoute,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.dataNotice,
    desc: "「ネットの つかいすぎ <ruby>注意<rt>ちゅうい</rt></ruby>。<ruby>公式<rt>こうしき</rt></ruby>アプリから <ruby>確認<rt>かくにん</rt></ruby>してください」という あんない。",
    correctChoices: [
      { text: "メールにかいてあるとおり、スマホに <ruby>入<rt>はい</rt></ruby>っている <ruby>公式<rt>こうしき</rt></ruby>アプリを じぶんでひらいて <ruby>確認<rt>かくにん</rt></ruby>する", money: 300, explain: "せいかい！ <ruby>本物<rt>ほんもの</rt></ruby>のおしらせを <ruby>正<rt>ただ</rt></ruby>しく公式アプリから かくにん できたね！（+300<ruby>円<rt>えん</rt></ruby>）" }
    ],
    wrongChoices: [
      { text: "「ネットから メールが くるのは ぜんぶ<ruby>詐欺<rt>さぎ</rt></ruby>だ！」と おもいこんで、スマホの つうしん<ruby>契約<rt>けいやく</rt></ruby>を けそうとする", money: -5000, damageType: "money", explain: "まちがい！ <ruby>本物<rt>ほんもの</rt></ruby>のおしらせもあるから、あわてずに <ruby>確認<rt>かくにん</rt></ruby>しよう！（-5,000<ruby>円<rt>えん</rt></ruby>）" },
      { text: "ネットで「スマホ つうしんりょう ふやす うらわざ」と けんさくして、あやしいサイトの ファイルを ダウンロードする", money: -15000, damageType: "account", explain: "あぶない！ ウイルスが はいった アプリを ダウンロードしてしまって、スマホが こわれちゃうよ！" },
      { text: "おしらせを みなかったことにして、そのまま <ruby>高画質<rt>こうがしつ</rt></ruby>の <ruby>動画<rt>どうが</rt></ruby>を なんじかんも つづけて <ruby>見<rt>み</rt></ruby>る", money: -5000, damageType: "money", explain: "ざんねん！ ネットが つかえなくなって、ついかのお<ruby>金<rt>かね</rt></ruby>が かかっちゃうよ。（-5,000<ruby>円<rt>えん</rt></ruby>）" }
    ]
  },
  {
    id: "q_elem_delivery_real", category: "real", source: "メール", title: "<ruby>宅配便<rt>たくはいびん</rt></ruby>の おるす<ruby>通知<rt>つうち</rt></ruby>",
    characterName: "<ruby>宅配便<rt>たくはいびん</rt></ruby>のおにいさん",
    narration: "<ruby>休<rt>やす</rt></ruby>みの<ruby>日<rt>ひ</rt></ruby>に <ruby>家<rt>いえ</rt></ruby>にいると、<ruby>宅配便<rt>たくはいびん</rt></ruby>から メールが <ruby>届<rt>とど</rt></ruby>きました。\n『お<ruby>荷物<rt>にもつ</rt></ruby>を おとどけに<ruby>伺<rt>うかが</rt></ruby>いましたが、おるすでした。<ruby>伝票<rt>でんぴょう</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>：1234-5678。もう<ruby>一度<rt>いちど</rt></ruby> とどける おねがいは <ruby>公式<rt>こうしき</rt></ruby>サイトから してください。』",
    dialogue: [
      { speaker: "主人公", line: "「あ、<ruby>今日<rt>きょう</rt></ruby> とどくはずだった マンガの<ruby>本<rt>ほん</rt></ruby>だ！ お<ruby>問<rt>と</rt></ruby>い<ruby>合<rt>あ</rt></ruby>わせ<ruby>番号<rt>ばんごう</rt></ruby>も ちゃんと かいてあるぞ。」" }
    ],
    point: "<ruby>荷物<rt>にもつ</rt></ruby>の <ruby>番号<rt>ばんごう</rt></ruby>が ちゃんと かいてあって、<ruby>公式<rt>こうしき</rt></ruby>アプリから <ruby>手続<rt>てつづ</rt></ruby>きできるものは <ruby>本物<rt>ほんもの</rt></ruby>の れんらくです。",
    notification: "📱ピコン おにもつのおしらせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.gmailDelivery,
    desc: "「おるすだったので <ruby>荷物<rt>にもつ</rt></ruby>を もちかえりました。<ruby>公式<rt>こうしき</rt></ruby>アプリから さい<ruby>配達<rt>はいたつ</rt></ruby>を おねがいしてください」",
    correctChoices: [
      { text: "おうちの<ruby>人<rt>ひと</rt></ruby>に「<ruby>荷物<rt>にもつ</rt></ruby>の<ruby>不在<rt>ふざい</rt></ruby>メールが<ruby>届<rt>とど</rt></ruby>いてるよ」と<ruby>伝<rt>つた</rt></ruby>えて、<ruby>公式<rt>こうしき</rt></ruby>アプリやサイトから さいはいたつを <ruby>頼<rt>たの</rt></ruby>んでもらう", money: 300, explain: "せいかい！ おうちの<ruby>人<rt>ひと</rt></ruby>と<ruby>一緒<rt>いっしょ</rt></ruby>に <ruby>正<rt>ただ</rt></ruby>しく<ruby>手続<rt>てつづ</rt></ruby>きできたね！（+300<ruby>円<rt>えん</rt></ruby>）" }
    ],
    wrongChoices: [
      { text: "「メールは あぶないから ぜんぶ むし！」と おもって、メールを けして なにもしない", money: -5000, damageType: "money", explain: "ざんねん！ <ruby>本物<rt>ほんもの</rt></ruby>の<ruby>荷物<rt>にもつ</rt></ruby>が お<ruby>店<rt>みせ</rt></ruby>に もどっちゃったよ。（-5,000<ruby>円<rt>えん</rt></ruby>）" },
      { text: "はやく ほしいから、ネットの けいじばんで「たくはいびんの でんわばんごう」を さがして でんわする", money: -10000, damageType: "personal_info", explain: "あぶない！ ニセモノの 問い合わせ窓口に つながって、じゅうしょを ききだされちゃうよ！" },
      { text: "おるすばんの まんま、じぶんひとりで とおい たくはいびんの センターまで とりに<ruby>行<rt>い</rt></ruby>こうとする", money: -5000, damageType: "money", explain: "あぶない！ こどもひとりで いくのは きけんだよ。おうちの<ruby>人<rt>ひと</rt></ruby>に たのもう！（-5,000<ruby>円<rt>えん</rt></ruby>）" }
    ]
  },
  {
    id: "q_elem_atm_help", category: "help", source: "街中（ぎんこう）", title: "ATMで こまっている おばあさん",
    characterName: "困っている高齢者",
    narration: "お<ruby>買<rt>か</rt></ruby>いものの とちゅう、ぎんこうの ATMで、でんわを しながら あわてて ボタンを おしている おばあさんを <ruby>見<rt>み</rt></ruby>かけました。",
    dialogue: [
      { speaker: "おばあさん", line: "「（でんわで）はい、<ruby>言<rt>い</rt></ruby>われたとおり<ruby>番号<rt>ばんごう</rt></ruby>をおしました！ これで <ruby>医療費<rt>いりょうひ</rt></ruby>の お<ruby>金<rt>かね</rt></ruby>が もどってくるんですね…？」" },
      { speaker: "主人公", line: "「でんわしながら ATMを おしてる…！ これって ニュースで<ruby>見<rt>み</rt></ruby>た <ruby>詐欺<rt>さぎ</rt></ruby>じゃないかな！？」" }
    ],
    point: "ATMを そうさして『お<ruby>金<rt>かね</rt></ruby>がもらえる・もどってくる』ことは ぜったいに ありません！ 100%<ruby>詐欺<rt>さぎ</rt></ruby>です！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.atm,
    character: IMAGE_ASSETS.characters.elderlyWomanCane,
    screenshot: null,
    desc: "おばあさんが でんわで <ruby>指示<rt>しじ</rt></ruby>されながら ATMでお<ruby>金<rt>かね</rt></ruby>を <ruby>送金<rt>そうきん</rt></ruby>しようとしている。",
    correctChoices: [
      { text: "ちかくの ぎんこうの<ruby>人<rt>ひと</rt></ruby>や <ruby>店員<rt>てんいん</rt></ruby>さんに「おばあさんが だまされているかも！」と <ruby>急<rt>いそ</rt></ruby>いで<ruby>知<rt>し</rt></ruby>らせる", money: 300, explain: "✨ だいせいかい！ すぐに おとなに <ruby>知<rt>し</rt></ruby>らせたおかげで おばあさんを <ruby>救<rt>すく</rt></ruby>えたよ！（お<ruby>礼<rt>れい</rt></ruby>+300<ruby>円<rt>えん</rt></ruby>）" }
    ],
    wrongChoices: [
      { text: "おばあちゃんのかわりに でんわを かわってあげて、あいての いう<ruby>通<rt>とお</rt></ruby>りに ボタンをおしてあげる", money: -8000, damageType: "money", explain: "ダメー！ <ruby>詐欺<rt>さぎ</rt></ruby>の お<ruby>手<rt>て</rt></ruby>つだいを してしまってお<ruby>金<rt>かね</rt></ruby>がぬすまれちゃったよ！" },
      { text: "「おとなのすることだから かんけいないや」と おもって、なにもせずに す通りする", money: -5000, damageType: "money", explain: "ざんねん！ おばあさんが お<ruby>金<rt>かね</rt></ruby>を ぜんぶ とられちゃったよ。" },
      { text: "おばあさんの うしろに ならんで、「はやく おわらないかな」と ボタンを じっと<ruby>見<rt>み</rt></ruby>つめる", money: -5000, damageType: "money", explain: "ざんねん！ みているだけでは さぎを とめられないよ。ぎんこうの<ruby>人<rt>ひと</rt></ruby>を よぼう！" }
    ]
  },
  {
    id: "q_elem_inspection_scam", category: "scam", source: "おうちの げんかん", title: "「やねが こわれてるよ！」",
    characterName: "点検商法詐欺師",
    narration: "おうちで おるす<ruby>番<rt>ばん</rt></ruby>をしていると、ピンポーンと チャイムが なり、<ruby>作業着<rt>さぎょうぎ</rt></ruby>のおじさんが <ruby>立<rt>た</rt></ruby>っていました。",
    dialogue: [
      { speaker: "訪問業者", line: "「<ruby>近所<rt>きんじょ</rt></ruby>で<ruby>工事<rt>こうじ</rt></ruby>してるんだけど、<ruby>君<rt>きみ</rt></ruby>の<ruby>家<rt>いえ</rt></ruby>の<ruby>屋根<rt>やね</rt></ruby>の<ruby>瓦<rt>かわら</rt></ruby>が<ruby>落<rt>お</rt></ruby>ちそうで<ruby>危<rt>あぶ</rt></ruby>ないよ！いまスグ ハシゴで<ruby>登<rt>のぼ</rt></ruby>って<ruby>無料<rt>むりょう</rt></ruby>で<ruby>見<rt>み</rt></ruby>てあげるよ！」" },
      { speaker: "主人公", line: "「お<ruby>父<rt>とう</rt></ruby>さんもお<ruby>母<rt>かあ</rt></ruby>さんもいないけど…<ruby>入<rt>はい</rt></ruby>ってもらっていいのかな？」" }
    ],
    point: "「<ruby>屋根<rt>やね</rt></ruby>がこわれている」と<ruby>突然<rt>とつぜん</rt></ruby>やってくる<ruby>人<rt>ひと</rt></ruby>は、じぶんで<ruby>屋根<rt>やね</rt></ruby>をこわして<ruby>高額<rt>こうがく</rt></ruby>なお<ruby>金<rt>かね</rt></ruby>を<ruby>請求<rt>せいきゅう</rt></ruby>する<ruby>詐欺<rt>さぎ</rt></ruby>の<ruby>危険<rt>きけん</rt></ruby>があります！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: null,
    desc: "「<ruby>屋根<rt>やね</rt></ruby>が<ruby>危<rt>あぶ</rt></ruby>ないから、いまスグ<ruby>登<rt>のぼ</rt></ruby>って<ruby>点検<rt>てんけん</rt></ruby>してあげる」と <ruby>知<rt>し</rt></ruby>らない<ruby>業者<rt>ぎょうしゃ</rt></ruby>が <ruby>家<rt>いえ</rt></ruby>に<ruby>入<rt>はい</rt></ruby>ろうとしている。",
    correctChoices: [
      { text: "ドアのカギを<ruby>開<rt>あ</rt></ruby>けずに インターホンごしに「いま おとなの<ruby>人<rt>ひと</rt></ruby>が いないので わかりません」と <ruby>断<rt>ことわ</rt></ruby>る", money: 0, explain: "せいかい！ おるす<ruby>番<rt>ばん</rt></ruby>のときは <ruby>絶対<rt>ぜったい</rt></ruby>に ドアを あけちゃダメだよ！" }
    ],
    wrongChoices: [
      { text: "「やねが おちたら たいへんだ！」と おもって、カギを あけて おじさんを お<ruby>庭<rt>にわ</rt></ruby>に あんないする", money: -20000, damageType: "money", explain: "あぶない！ <ruby>屋根<rt>やね</rt></ruby>を わざと <ruby>壊<rt>こわ</rt></ruby>されて <ruby>高<rt>たか</rt></ruby>いお<ruby>金<rt>かね</rt></ruby>を せいきゅうされちゃうよ！" },
      { text: "「お<ruby>母<rt>かあ</rt></ruby>さんに でんわするから まってて」と つたえて、ドアを あけたまま リビングに もどる", money: -25000, damageType: "money", explain: "あぶない！ ドアをあけっぱなしにすると、しらない<ruby>人<rt>ひと</rt></ruby>が かってに いえのなかに はいってきちゃうよ！" },
      { text: "「タダなら みてもらおう」と おもって、おじさんに ハシゴを かしてあげる", money: -20000, damageType: "money", explain: "あぶない！ てんけん<ruby>詐欺<rt>さぎ</rt></ruby>の わなに はまっちゃうよ！" }
    ]
  },
  {
    id: "q_elem_impersonate_scam", category: "scam", source: "LINE・チャット", title: "<ruby>友<rt>とも</rt></ruby>だちからの「たすけて！」",
    characterName: "<ruby>友<rt>とも</rt></ruby>だち（なりすまし）",
    narration: "スマホを <ruby>見<rt>み</rt></ruby>ていると、なかよしの <ruby>友<rt>とも</rt></ruby>だちから きゅうに メッセージが きました。\n『【<ruby>緊急<rt>きんきゅう</rt></ruby>】おねがい！ こまってて<ruby>親<rt>おや</rt></ruby>にいえないの！ いまスグ コンビニで 1<ruby>万<rt>まん</rt></ruby><ruby>円<rt>えん</rt></ruby>のギフトカードを<ruby>買<rt>か</rt></ruby>って <ruby>番号<rt>ばんごう</rt></ruby>をおしえて！』",
    dialogue: [
      { speaker: "友だち（？）", line: "「あした <ruby>絶対<rt>ぜったい</rt></ruby>に お<ruby>金<rt>かね</rt></ruby>は<ruby>返<rt>かえ</rt></ruby>すから！ たすけて！」" },
      { speaker: "主人公", line: "「えっ、いつもと <ruby>言葉<rt>ことば</rt></ruby>づかいが ちがうような…？ でも<ruby>困<rt>こま</rt></ruby>ってるのかな？」" }
    ],
    point: "<ruby>友<rt>とも</rt></ruby>だちのアカウントが <ruby>乗<rt>の</rt></ruby>っ<ruby>取<rt>と</rt></ruby>られている（<ruby>悪<rt>わる</rt></ruby>ものにうばわれている）<ruby>可能性<rt>かのうせい</rt></ruby>が<ruby>高<rt>たか</rt></ruby>いです！",
    notification: "📱ピコン <ruby>友<rt>とも</rt></ruby>だちからの<ruby>緊急<rt>きんきゅう</rt></ruby>メッセージ",
    bg: IMAGE_ASSETS.backgrounds.schoolRoute,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.instagram,
    desc: "<ruby>友<rt>とも</rt></ruby>だちから「いますぐ コンビニで ギフトカードを<ruby>買<rt>か</rt></ruby>って <ruby>番号<rt>ばんごう</rt></ruby>をおしえて」と たのまれた。",
    correctChoices: [
      { text: "メッセージには <ruby>返事<rt>へんじ</rt></ruby>をせず、じかに <ruby>会<rt>あ</rt></ruby>うか でんわをして「ほんとに あなたが <ruby>送<rt>おく</rt></ruby>ったの？」と たしかめる", money: 0, explain: "せいかい！ <ruby>乗<rt>の</rt></ruby>っ<ruby>取<rt>と</rt></ruby>り<ruby>詐欺<rt>さぎ</rt></ruby>だよ！ べつの<ruby>方法<rt>ほうほう</rt></ruby>で <ruby>本人<rt>ほんにん</rt></ruby>に たしかめるのが <ruby>正解<rt>せいかい</rt></ruby>！" }
    ],
    wrongChoices: [
      { text: "<ruby>友<rt>とも</rt></ruby>だちが かわいそうだから、お<ruby>小遣<rt>こづか</rt></ruby>いで コンビニへ<ruby>行<rt>い</rt></ruby>って カードを<ruby>買<rt>か</rt></ruby>い <ruby>番号<rt>ばんごう</rt></ruby>を おしえる", money: -10000, damageType: "line_takeover", explain: "だまされた！ <ruby>犯人<rt>はんにん</rt></ruby>が<ruby>友<rt>とも</rt></ruby>だちのふりをしていただけだよ。お<ruby>金<rt>かね</rt></ruby>はもどらないよ！" },
      { text: "「1<ruby>万<rt>まん</rt></ruby><ruby>円<rt>えん</rt></ruby>は たかいから 1,000<ruby>円<rt>えん</rt></ruby>ならいいよ」と メッセージで <ruby>返信<rt>へんしん</rt></ruby>する", money: -5000, damageType: "line_takeover", explain: "あぶない！ さぎグループと やりとりをつづけると、だまされて カードをかわされちゃうよ！" },
      { text: "ほかの <ruby>友<rt>とも</rt></ruby>だちの グループチャットに「〇〇ちゃんが こまってるよ！」と てんそうする", money: -10000, damageType: "line_takeover", explain: "あぶない！ ほかの<ruby>友<rt>とも</rt></ruby>だちまで さぎにあっちゃうよ！" }
    ]
  },
  {
    id: "q_elem_home_help", category: "help", source: "おうち（リビング）", title: "お<ruby>母<rt>かあ</rt></ruby>さんが パニックに！？",
    characterName: "母",
    narration: "がっこうから <ruby>帰<rt>かえ</rt></ruby>ると、お<ruby>母<rt>かあ</rt></ruby>さんが <ruby>青<rt>あお</rt></ruby>い<ruby>顔<rt>かお</rt></ruby>をして でんわを していました。\nお<ruby>母<rt>かあ</rt></ruby>さん：「<ruby>警察<rt>けいさつ</rt></ruby>から でんわがあって… <ruby>私<rt>わたし</rt></ruby>たちのお<ruby>金<rt>かね</rt></ruby>が あぶないから、べつの<ruby>口座<rt>こうざ</rt></ruby>に ぜんぶ お<ruby>金<rt>かね</rt></ruby>を うつしなさいって…」",
    dialogue: [
      { speaker: "母", line: "「どうしよう… すぐにお<ruby>金<rt>かね</rt></ruby>を <ruby>送<rt>おく</rt></ruby>らないと つかまっちゃうのかしら…」" },
      { speaker: "主人公", line: "「お<ruby>母<rt>かあ</rt></ruby>さん、おちついて！ でんわでお<ruby>金<rt>かね</rt></ruby>を<ruby>送<rt>おく</rt></ruby>れっていうのは ニュースで<ruby>見<rt>み</rt></ruby>た<ruby>詐欺<rt>さぎ</rt></ruby>だよ！」" }
    ],
    point: "<ruby>本物<rt>ほんもの</rt></ruby>の <ruby>警察<rt>けいさつ</rt></ruby>が「<ruby>指定<rt>してい</rt></ruby>したべつの<ruby>口座<rt>こうざ</rt></ruby>に お<ruby>金<rt>かね</rt></ruby>を <ruby>送<rt>おく</rt></ruby>れ」と でんわすることは 100%ありません！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.motherWorried,
    screenshot: null,
    desc: "お<ruby>母<rt>かあ</rt></ruby>さんが「<ruby>警察<rt>けいさつ</rt></ruby>から でんわでお<ruby>金<rt>かね</rt></ruby>を<ruby>送<rt>おく</rt></ruby>れと <ruby>言<rt>い</rt></ruby>われた」と あわてている。",
    correctChoices: [
      { text: "「お<ruby>母<rt>かあ</rt></ruby>さん おちついて！ でんわでお<ruby>金<rt>かね</rt></ruby>を<ruby>送<rt>おく</rt></ruby>れっていうのは ぜったい<ruby>詐欺<rt>さぎ</rt></ruby>だよ！ でんわをきって 110<ruby>番<rt>ばん</rt></ruby>で たしかめよう！」と <ruby>止<rt>と</rt></ruby>める", money: 300, explain: "✨ お<ruby>母<rt>かあ</rt></ruby>さんを <ruby>救<rt>すく</rt></ruby>ったね！ でんわでお<ruby>金<rt>かね</rt></ruby>のお<ruby>話<rt>はなし</rt></ruby>は すべて<ruby>詐欺<rt>さぎ</rt></ruby>！ しっかり<ruby>止<rt>と</rt></ruby>められたね！（お<ruby>礼<rt>れい</rt></ruby>+300<ruby>円<rt>えん</rt></ruby>）" }
    ],
    wrongChoices: [
      { text: "お<ruby>母<rt>かあ</rt></ruby>さんが つかまったら こわいので、いっしょに ぎんこうへ <ruby>走<rt>はし</rt></ruby>ってお<ruby>金<rt>かね</rt></ruby>を <ruby>送金<rt>そうきん</rt></ruby>するのを てつだう", money: -25000, damageType: "money", explain: "だまされちゃった！ <ruby>家族<rt>かぞく</rt></ruby>の<ruby>大切<rt>たいせつ</rt></ruby>な お<ruby>金<rt>かね</rt></ruby>が ぜんぶ ぬすまれちゃったよ！" },
      { text: "おとなの もんだいだから、なにも いわずに じぶんの へやに いって ゲームをする", money: -20000, damageType: "money", explain: "ざんねん！ お<ruby>母<rt>かあ</rt></ruby>さんが だまされて お<ruby>金<rt>かね</rt></ruby>を とられちゃったよ。" },
      { text: "「あとで お<ruby>父<rt>とう</rt></ruby>さんに きけばいいや」と おもって、そのまま お<ruby>母<rt>かあ</rt></ruby>さんの でんわを みている", money: -20000, damageType: "money", explain: "あぶない！ いまスグ とめないと、お<ruby>金<rt>かね</rt></ruby>を はらっちゃうよ！" }
    ]
  },
  {
    id: "q_elem_konbini_help", category: "help", source: "街中（コンビニ）", title: "コンビニで こまっている おじいさん",
    characterName: "高齢者笑顔",
    narration: "コンビニに<ruby>行<rt>い</rt></ruby>くと、レジで おじいさんが 15<ruby>万<rt>まん</rt></ruby><ruby>円<rt>えん</rt></ruby><ruby>分<rt>ぶん</rt></ruby>の ギフトカードを <ruby>出<rt>だ</rt></ruby>して こまっていました。",
    dialogue: [
      { speaker: "おじいさん", line: "「パソコンに『ウイルス<ruby>感染<rt>かんせん</rt></ruby>！』と<ruby>出<rt>で</rt></ruby>て でんわしたら、このカードを<ruby>買<rt>か</rt></ruby>って<ruby>番号<rt>ばんごう</rt></ruby>を<ruby>教<rt>おし</rt></ruby>えろと<ruby>言<rt>い</rt></ruby>われてね…」" },
      { speaker: "主人公", line: "「<ruby>画面<rt>がめん</rt></ruby>の<ruby>警告<rt>けいこく</rt></ruby>で<ruby>電子<rt>でんし</rt></ruby>マネーを<ruby>買<rt>か</rt></ruby>え…！？ これってサポート<ruby>詐欺<rt>さぎ</rt></ruby>だ！」" }
    ],
    point: "パソコンの<ruby>警告<rt>けいこく</rt></ruby><ruby>画面<rt>がめん</rt></ruby>はウソ！『コンビニでカードを<ruby>買<rt>か</rt></ruby>え』は サポート<ruby>詐欺<rt>さぎ</rt></ruby>です！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.convenienceStoreFallback,
    character: IMAGE_ASSETS.characters.elderlyManGlasses,
    screenshot: null,
    desc: "おじいさんが パソコンの ウイルス<ruby>消去<rt>しょうきょ</rt></ruby><ruby>名目<rt>めいもく</rt></ruby>で 15<ruby>万<rt>まん</rt></ruby><ruby>円<rt>えん</rt></ruby><ruby>分<rt>ぶん</rt></ruby>の カードを<ruby>買<rt>か</rt></ruby>おうとしている。",
    correctChoices: [
      { text: "コンビニの <ruby>店員<rt>てんいん</rt></ruby>さんに「おじいさん <ruby>詐欺<rt>さぎ</rt></ruby>にあってます！ <ruby>買<rt>か</rt></ruby>うのを<ruby>止<rt>と</rt></ruby>めてあげてください！」と <ruby>伝<rt>つた</rt></ruby>える", money: 300, explain: "✨ ナイス！ <ruby>店員<rt>てんいん</rt></ruby>さんと いっしょに おじいさんの <ruby>被害<rt>ひがい</rt></ruby>を ふせげたね！（お<ruby>礼<rt>れい</rt></ruby>+300<ruby>円<rt>えん</rt></ruby>）" }
    ],
    wrongChoices: [
      { text: "<ruby>親切<rt>しんせつ</rt></ruby>のつもりで カードの<ruby>裏<rt>うら</rt></ruby>の<ruby>銀色<rt>ぎんいろ</rt></ruby>を コインでけずって でんわの<ruby>相手<rt>あいて</rt></ruby>に <ruby>教<rt>おし</rt></ruby>えてあげる", money: -10000, damageType: "money", explain: "ダメー！ <ruby>番号<rt>ばんごう</rt></ruby>をおしえたら お<ruby>金<rt>かね</rt></ruby>がぜんぶ <ruby>犯人<rt>はんにん</rt></ruby>に ぬすまれちゃうよ！" },
      { text: "おじいさんに「15<ruby>万<rt>まん</rt></ruby><ruby>円<rt>えん</rt></ruby>は たかいから 5,000<ruby>円<rt>えん</rt></ruby>にしたら？」と アドバイスする", money: -5000, damageType: "money", explain: "あぶない！ いくらであっても カードを かわせるのは <ruby>詐欺<rt>さぎ</rt></ruby>だよ！" },
      { text: "おじいさんが かいものを おえるまで、レジの うしろで だまって まつ", money: -5000, damageType: "money", explain: "ざんねん！ おじいさんが だまされて お<ruby>金<rt>かね</rt></ruby>を はらっちゃったよ。" }
    ]
  },
  {
    id: "q_elem_shopping_scam", category: "scam", source: "ネット広告", title: "ゲームソフトが 90%オフの 300<ruby>円<rt>えん</rt></ruby>！？",
    characterName: "激安ショップ",
    narration: "ネットを<ruby>見<rt>み</rt></ruby>ていると、<ruby>定価<rt>ていか</rt></ruby>8,000<ruby>円<rt>えん</rt></ruby>の<ruby>大人気<rt>だいにんき</rt></ruby>ゲームソフトが『<ruby>本日<rt>ほんじつ</rt></ruby><ruby>限定<rt>げんてい</rt></ruby>90%OFF！ 300<ruby>円<rt>えん</rt></ruby>！』という<ruby>広告<rt>こうこく</rt></ruby>が<ruby>出<rt>で</rt></ruby>てきました。",
    dialogue: [
      { speaker: "広告サイト", line: "「【<ruby>残<rt>のこ</rt></ruby>りあと1<ruby>個<rt>こ</rt></ruby>】クレジットカードですぐに<ruby>支払<rt>しはら</rt></ruby>えば <ruby>今日<rt>きょう</rt></ruby>すぐ<ruby>送<rt>おく</rt></ruby>ります！」" },
      { speaker: "主人公", line: "「300<ruby>円<rt>えん</rt></ruby>で あの<ruby>大人気<rt>だいにんき</rt></ruby>ゲームが <ruby>買<rt>か</rt></ruby>えちゃうの！？ ほしいな！」" }
    ],
    point: "<ruby>安<rt>やす</rt></ruby>すぎるネット<ruby>通販<rt>つうはん</rt></ruby>は <ruby>偽<rt>にせ</rt></ruby>サイト！ お<ruby>金<rt>かね</rt></ruby>をはらっても <ruby>偽物<rt>にせもの</rt></ruby>すら<ruby>届<rt>とど</rt></ruby>かず カード<ruby>情報<rt>じょうほう</rt></ruby>が<ruby>盗<rt>ぬす</rt></ruby>まれます！",
    notification: "📱ピコン タイムセールのお知らせ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.shoppingAd,
    desc: "<ruby>定価<rt>ていか</rt></ruby>8,000<ruby>円<rt>えん</rt></ruby>のゲームが「<ruby>本日<rt>ほんじつ</rt></ruby><ruby>限定<rt>げんてい</rt></ruby>300<ruby>円<rt>えん</rt></ruby>！」と クレジットカード<ruby>決済<rt>けっさい</rt></ruby>を せまっている。",
    correctChoices: [
      { text: "「<ruby>定価<rt>ていか</rt></ruby>より <ruby>安<rt>やす</rt></ruby>すぎるのは <ruby>偽<rt>にせ</rt></ruby>サイトの<ruby>罠<rt>わな</rt></ruby>だ！」と きづいて、おうちの<ruby>人<rt>ひと</rt></ruby>に <ruby>確認<rt>かくにん</rt></ruby>してから ページをとじる", money: 0, explain: "せいかい！ あやしい<ruby>安売<rt>やすう</rt></ruby>りサイトを <ruby>見<rt>み</rt></ruby>やぶれたね！" }
    ],
    wrongChoices: [
      { text: "<ruby>売<rt>う</rt></ruby>り<ruby>切<rt>き</rt></ruby>れたら こまるから、おうちの<ruby>人<rt>ひと</rt></ruby>のカードを かってにつかって 300<ruby>円<rt>えん</rt></ruby>で<ruby>買<rt>か</rt></ruby>っちゃう", money: -20000, damageType: "personal_info", explain: "だまされた！ ゲームは <ruby>届<rt>とど</rt></ruby>かず、カードから <ruby>何万<rt>なんまん</rt></ruby><ruby>円<rt>えん</rt></ruby>も ぬすまれちゃうよ！" },
      { text: "ほんものか どうか たしかめるため、サイトのお問い合わせフォームに なまえと でんわばんごうを かく", money: -10000, damageType: "personal_info", explain: "あぶない！ こじんじょうほうが ぬすまれて、しらないばんごうから でんわが かかってくるようになっちゃうよ！" },
      { text: "「やすいから 友だちにも おしえてあげよう！」と SNSに サイトのリンクを はりつける", money: -15000, damageType: "personal_info", explain: "あぶない！ なかよしの 友だちまで だまされて 被害に あっちゃうよ！" }
    ]
  },
  {
    id: "q_elem_gameapp_real", category: "real", source: "ゲームアプリ", title: "【<ruby>本物<rt>ほんもの</rt></ruby>】あしたの メンテナンスのおしらせ",
    characterName: "運営チーム",
    narration: "すきな スマホゲームを ひらくと、ゲームの なかに おしらせが <ruby>出<rt>で</rt></ruby>ていました。",
    dialogue: [
      { speaker: "公式お知らせ", line: "「【おしらせ】あすの ひる14:00〜17:00まで メンテナンスを します。この<ruby>時間<rt>じかん</rt></ruby>は ゲームであそべません。」" },
      { speaker: "主人公", line: "「あしたの ひるまは メンテなんだね。べつの あそびを しよう。」" }
    ],
    point: "ゲームアプリの なかに <ruby>表示<rt>ひょうじ</rt></ruby>される <ruby>公式<rt>こうしき</rt></ruby>の おしらせは <ruby>本物<rt>ほんもの</rt></ruby>です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.gameAppNotice,
    desc: "ゲームのなかで「あした メンテナンスで あそべない<ruby>時間<rt>じかん</rt></ruby>があります」と <ruby>案内<rt>あんない</rt></ruby>されている。",
    correctChoices: [
      { text: "「<ruby>明日<rt>あした</rt></ruby>の ひるまは <ruby>遊<rt>あそ</rt></ruby>べないんだな」と <ruby>確認<rt>かくにん</rt></ruby>して、そのまま ふつうに ゲームを とじる", money: 300, explain: "せいかい！ <ruby>本物<rt>ほんもの</rt></ruby>のおしらせを おちついて <ruby>確認<rt>かくにん</rt></ruby>できたね！（+300<ruby>円<rt>えん</rt></ruby>）" }
    ],
    wrongChoices: [
      { text: "「データが <ruby>消<rt>き</rt></ruby>えちゃうかも！」と あわてて、ネットの あやしい <ruby>掲示板<rt>けいじばん</rt></ruby>に パスワードを<ruby>書<rt>か</rt></ruby>きこむ", money: -5000, damageType: "account", explain: "あぶない！ ふつうのおしらせなのに パスワードを<ruby>教<rt>おし</rt></ruby>えて アカウントを<ruby>盗<rt>ぬす</rt></ruby>まれちゃったよ。（-5,000<ruby>円<rt>えん</rt></ruby>）" },
      { text: "「メンテちゅうも あそびたい！」と おもって、ネットで『メンテかいじょ アプリ』を ダウンロードする", money: -15000, damageType: "account", explain: "あぶない！ ウイルスが はいった アプリを いれてしまって、アカウントが ぬすまれちゃうよ！" },
      { text: "「メンテナンスなんて うそだ！」と おこって、ゲームアプリを スマホから けしてしまう", money: -5000, damageType: "money", explain: "ざんねん！ せっかくそだてた ゲームデータが きえちゃったよ。（-5,000<ruby>円<rt>えん</rt></ruby>）" }
    ]
  },
  {
    id: "q_elem_romance_scam", category: "scam", source: "ネット・SNS", title: "ネットの<ruby>知<rt>し</rt></ruby>らない<ruby>人<rt>ひと</rt></ruby>からの「お<ruby>金<rt>かね</rt></ruby>あげます」",
    characterName: "あやしい人",
    narration: "SNSで <ruby>知<rt>し</rt></ruby>らない<ruby>人<rt>ひと</rt></ruby>から <ruby>親切<rt>しんせつ</rt></ruby>そうな メッセージが <ruby>届<rt>とど</rt></ruby>きました。\n『<ruby>君<rt>きみ</rt></ruby>の<ruby>将来<rt>しょうらい</rt></ruby>のために、<ruby>毎日<rt>まいにち</rt></ruby>お<ruby>金<rt>かね</rt></ruby>がふえる<ruby>特別<rt>とくべつ</rt></ruby>なサイトを<ruby>教<rt>おし</rt></ruby>えてあげる。ここにお<ruby>金<rt>かね</rt></ruby>を<ruby>預<rt>あず</rt></ruby>けてみて！』",
    dialogue: [
      { speaker: "あやしい人", line: "「わたしを<ruby>信<rt>しん</rt></ruby>じて！ ぜったいに お<ruby>金持<rt>かねも</rt></ruby>ちになれるよ！」" },
      { speaker: "主人公", line: "「ネットで<ruby>知<rt>し</rt></ruby>り<ruby>合<rt>あ</rt></ruby>ったばかりの<ruby>人<rt>ひと</rt></ruby>だけど、ホントにお<ruby>金<rt>かね</rt></ruby>が<ruby>増<rt>ふ</rt></ruby>えるのかな…？」" }
    ],
    point: "ネットで「<ruby>絶対<rt>ぜったい</rt></ruby>にお<ruby>金<rt>かね</rt></ruby>が<ruby>増<rt>ふ</rt></ruby>える・<ruby>儲<rt>もう</rt></ruby>かる」と<ruby>誘<rt>さそ</rt></ruby>ってくる<ruby>人<rt>ひと</rt></ruby>は 100% <ruby>詐欺<rt>さぎ</rt></ruby>グループです！",
    notification: "📱ピコン DMが届きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.romanceTalk,
    desc: "ネットで<ruby>知<rt>し</rt></ruby>り<ruby>合<rt>あ</rt></ruby>った<ruby>人<rt>ひと</rt></ruby>から「<ruby>毎日<rt>まいにち</rt></ruby>お<ruby>金<rt>かね</rt></ruby>が<ruby>増<rt>ふ</rt></ruby>えるサイトがあるから お<ruby>金<rt>かね</rt></ruby>を<ruby>振<rt>ふ</rt></ruby>りこんで」と <ruby>言<rt>い</rt></ruby>われた。",
    correctChoices: [
      { text: "「ネットで しりあった<ruby>人<rt>ひと</rt></ruby>からの お<ruby>金<rt>かね</rt></ruby>の<ruby>話<rt>はなし</rt></ruby>は ぜったい<ruby>詐欺<rt>さぎ</rt></ruby>！」と <ruby>判断<rt>はんだん</rt></ruby>して、へんしんせずに ブロックする", money: 0, explain: "せいかい！ お<ruby>金<rt>かね</rt></ruby>を<ruby>振<rt>ふ</rt></ruby>りこまず すぐにブロックできたね！" }
    ],
    wrongChoices: [
      { text: "お<ruby>金持<rt>かねも</rt></ruby>ちになりたいから、お<ruby>年玉<rt>としだま</rt></ruby>の1<ruby>万<rt>まん</rt></ruby><ruby>円<rt>えん</rt></ruby>を <ruby>相手<rt>あいて</rt></ruby>の<ruby>言<rt>い</rt></ruby>った<ruby>口座<rt>こうざ</rt></ruby>へ <ruby>振<rt>ふ</rt></ruby>りこんでみる", money: -25000, damageType: "money", explain: "だまされた！ <ruby>振<rt>ふ</rt></ruby>りこんだお<ruby>金<rt>かね</rt></ruby>は ぜんぶ<ruby>盗<rt>ぬす</rt></ruby>まれて <ruby>二度<rt>にど</rt></ruby>ともどってこないよ！" },
      { text: "「ほんとうに ふえるの？」と メッセージで きいてみて、しょうこの ガゾウを みせてもらう", money: -10000, damageType: "money", explain: "あぶない！ ニセモノの ガゾウで しんじこまされて、お<ruby>金<rt>かね</rt></ruby>を はらわされちゃうよ！" },
      { text: "「お<ruby>金<rt>かね</rt></ruby>がないから むりです」と メッセージを かえす", money: -5000, damageType: "personal_info", explain: "あぶない！ へんしんすると「こどもだから だませそう」と おもわれて しつこく さそわれちゃうよ！" }
    ]
  },
  {
    id: "q_elem_rmt_scam", category: "scam", source: "ネット動画", title: "コイン<ruby>無料<rt>むりょう</rt></ruby><ruby>増殖<rt>ぞうしょく</rt></ruby>の「ウラワザ」！？",
    characterName: "ウラワザサイト",
    narration: "ネットで ゲームの <ruby>攻略<rt>こうりゃく</rt></ruby>動画を <ruby>見<rt>み</rt></ruby>ていると、気になる動画が ありました。\n『【かんたん】このサイトに ログインするだけで、ガチャのコインが 100<ruby>万<rt>まん</rt></ruby>コイン <ruby>無料<rt>むりょう</rt></ruby>で ふえるよ！』",
    dialogue: [
      { speaker: "あやしいサイト", line: "コインをうけとるために、あなたの ゲームのIDと パスワードを 入力してください。" },
      { speaker: "主人公", line: "「100万コインも もらえるの！？ でも パスワードを 入れていいのかな…？」" }
    ],
    point: "「コインがふえるウラワザ」と うそをついて、アカウントを ぬすむ ネットのわなです！",
    notification: "📱ピコン コイン無料ゲットのおしらせ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.gameCoinScam,
    desc: "「コインが100万枚ふえるウラワザ。ゲームのパスワードを入力してください」と かいてある。",
    correctChoices: [
      { text: "「ゲームの パスワードを ほかの人に おしえるのは ぜったいダメ！」と 判断して、サイトをとじる", money: 0, explain: "せいかい！ パスワードを 教えたら アカウントを ぬすまれちゃうよ！" }
    ],
    wrongChoices: [
      { text: "100万コインが ほしいから、じぶんの ゲームのIDと パスワードを 入力する", money: -20000, damageType: "account", explain: "だまされた！ 大切な アカウントが ぬすまれて ゲームが あそべなくなっちゃったよ！" },
      { text: "「サブアカウントなら いいかも」と おもって、べつの アカウントの パスワードを いれてみる", money: -10000, damageType: "account", explain: "あぶない！ サブアカウントも ぬすまれて、友だちに めいわくメッセージが おくられちゃうよ！" },
      { text: "友だちに「コインがふえるサイトを みつけたよ！」と メッセージで リンクをおくる", money: -15000, damageType: "account", explain: "あぶない！ 友だちのアカウントまで ぬすまれて トラブルになっちゃうよ！" }
    ]
  },
  {
    id: "q_elem_screenshare_scam", category: "scam", source: "通話アプリ", title: "ネットの<ruby>友<rt>とも</rt></ruby>だちからの「画面をみせて」",
    characterName: "ネットの知り合い",
    narration: "オンラインゲームで 知り合った人から、通話アプリで メッセージが きました。\n『ゲームの強い裏ワザを教えてあげるから、スマホの画面共有（がめんきょうゆう）をオンにして！』",
    dialogue: [
      { speaker: "ネットの知り合い", line: "「いま君のスマホに届いたSMSの【6桁の認証番号】を画面に見せてくれたら、特別なアイテムをあげるよ！」" },
      { speaker: "主人公", line: "「画面共有で SMSの 番号を見せてって… なんでだろう？」" }
    ],
    point: "SMSに届く「認証番号（にんしょうばんごう）」は、アカウントを守る超重要なカギです！他人に見せたらアカウントを乗っ取られます！",
    notification: "📱ピコン 【認証コード】123456",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.instagram,
    desc: "ネットの知り合いから「裏ワザのために 画面共有して SMSの認証コードを見せて」と言われた。",
    correctChoices: [
      { text: "「SMSの 認証コードや 画面は ぜったいに 人に見せちゃダメ！」と 断って 通話をきる", money: 0, explain: "せいかい！ 認証番号を 人に見せたら アカウントが ぬすまれちゃうよ！ 正しく見抜けたね！" }
    ],
    wrongChoices: [
      { text: "特別なアイテムが ほしいので、画面共有をオンにして SMSの番号を そのまま見せる", money: -20000, damageType: "account", explain: "アカウント乗っ取りだよ！ 認証コードを使われて、大切なアカウントを奪われてしまった！" },
      { text: "「画面をみせるのは こわいから、番号を チャットで かいて おしえるね」と 送信する", money: -20000, damageType: "account", explain: "あぶない！ 文字で おしえても アカウントが ぜんぶ ぬすまれちゃうよ！" },
      { text: "「裏ワザの やりかたを さきにおしえて」と たのんで、そのまま 通話をつづける", money: -10000, damageType: "account", explain: "あぶない！ うまいこと 言いくるめられて、けっきょく 番号を おしえさせられちゃうよ！" }
    ]
  },
  {
    id: "q_elem_fake_youtuber", category: "scam", source: "SNSのDM", title: "人気YouTuberの「極秘サインプレゼント」",
    characterName: "偽YouTuber",
    narration: "大好きな 有名YouTuberと そっくりの アカウントから、ダイレクトメッセージ（DM）が 届きました。\n『【ファン限定】キミにだけ 特別なサイン色紙を プレゼントするよ！ 発送するから 個人情報を教えてね！』",
    dialogue: [
      { speaker: "偽YouTuber", line: "「色紙を送るから、君の【名前】【家の住所】【通っている小学校名】【親の電話番号】を返信してね！」" },
      { speaker: "主人公", line: "「大好きなYouTuberからDMだ！ でも、小学校の名前まで 教えていいのかな…？」" }
    ],
    point: "有名人のアイコンを勝手に使った偽アカウントです！個人情報を聞き出して悪用する危険があります！",
    notification: "📱ピコン YouTuberからのDM",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.youtuberDmScam,
    desc: "有名YouTuberそっくりのアカウントから「サインを送るから 住所や通っている小学校名を教えて」とDMが届いた。",
    correctChoices: [
      { text: "公式の 本物アカウントと ユーザーIDを くらべて、「ニセモノのアカウントだ！」と 見抜いて 個人情報は おしえない", money: 0, explain: "せいかい！ アイコンは本物に見えても偽アカウントだよ。個人情報をしっかり守れたね！" }
    ],
    wrongChoices: [
      { text: "大好きな YouTuberだから、自分の名前と 家の住所、小学校の名前を メッセージで 返信する", money: -10000, damageType: "personal_info", explain: "個人情報搾取だよ！ 悪質なグループに大切な個人情報が知られてしまった！" },
      { text: "「色紙が とどくまで 親には ナイショにして おどろかせよう！」と じぶんの 携帯番号だけ おしえる", money: -10000, damageType: "personal_info", explain: "あぶない！ 迷惑電話や さぎメッセージが たくさん かかってくるようになっちゃうよ！" },
      { text: "本物かどうか たしかめるため、「ほんとうに 本人ですか？」と DMで きいてみる", money: -5000, damageType: "personal_info", explain: "あぶない！ さぎグループは「本物だよ！」と ウソをついて だまそうとしてくるよ！" }
    ]
  },
  {
    id: "q_elem_gacha_code", category: "scam", source: "ネット広告", title: "「10連ガチャ無料コード配布中！」",
    characterName: "無料ガチャサイト",
    narration: "ネットを見ていると、「10連ガチャが今すぐ無料で回せるシリアルコードプレゼント！」というバナー広告を見つけました。",
    dialogue: [
      { speaker: "無料ガチャ画面", line: "コード受け取り手続き：年齢確認（18歳以上確認）のため、クレジットカード番号と暗証番号を入力してください。請求はされません。" },
      { speaker: "主人公", line: "「無料のガチャコードなのに、なんで親のカード番号が必要なんだろう…？」" }
    ],
    point: "「無料」をエサに、子どもに親のクレジットカード情報を入力させようとする危険な罠です！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.gachaCodeScam,
    desc: "「ガチャ無料コードをあげるから、年齢確認のためにクレジットカード番号を入力して」と要求された。",
    correctChoices: [
      { text: "「無料なのに クレジットカード入力を 求めるのは ぜったい詐欺だ！」と 見抜いて、すぐ ページを閉じる", money: 0, explain: "せいかい！ タダをエサにカード情報を盗む手口だよ。絶対に入力しちゃダメ！" }
    ],
    wrongChoices: [
      { text: "ガチャを引きたいので、おうちの人の 財布からカードを出して 番号と暗証番号を 入力する", money: -25000, damageType: "personal_info", explain: "クレジットカード搾取詐欺だよ！ 親のカードから高額なお金が不正利用されてしまった！" },
      { text: "「カード番号なら だいじょうぶかな」と 思って、暗証番号は 空らんにして カード番号だけ 入れる", money: -20000, damageType: "personal_info", explain: "あぶない！ カード番号だけでも 勝手にお金をつかわれてしまう危険があるよ！" },
      { text: "ガチャコードが もらえるか 試すため、じぶんの メールアドレスと 名前だけ 入力する", money: -10000, damageType: "personal_info", explain: "あぶない！ こどもの個人情報が ぬすまれて、たくさんの 詐欺メールが 届くようになっちゃうよ！" }
    ]
  }
];

/* =========================================================
   【高齢者モード専用問題プール】（全16問・全ジャンル完全網羅）
   難易度：中級（電話・訪問・SMSの日常的な状況から判断）
   ========================================================= */
const QUESTIONS_SENIOR = [
  // ── ジャンル①：電話系（5問） ──
  {
    id: "q_senior_call_police", genre: "phone_visit", category: "scam", source: "固定電話", title: "警察官を騙る「口座不正利用」の電話",
    characterName: "偽警察官",
    narration: "ご自宅の固定電話に、警察署の捜査二課を名乗る人物から電話がかかってきました。\n相手：「詐欺グループの隠れ家から、あなたの名義の通帳が見つかりました。口座が凍結される恐れがあるため、守るための手続きが必要です。」",
    dialogue: [
      { speaker: "自称・警察官", line: "これから向かわせる金融庁の職員に通帳とキャッシュカードを預けてください。暗証番号も確認のためメモに書いて渡してください。" },
      { speaker: "あなた", line: "（警察からの電話…逮捕や凍結と言われると動揺してしまうが…）" }
    ],
    point: "警察官や金融庁職員がキャッシュカードを預かったり、暗証番号を聞き出すことは絶対にありません。100%詐欺です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.phoneCall,
    desc: "警察を名乗る電話で「口座が悪用されている。職員がカードを預かりに行くので暗証番号を渡して」と言われた。",
    correctChoices: [
      { text: "「警察がカードを預かることはない」と判断し、電話を切って自分で警察署の代表電話へかけ直す", money: 0, explain: "正解！ 警察がカードや暗証番号を求めることは絶対にありません。自ら調べた番号で確認が鉄則です。" }
    ],
    wrongChoices: [
      { text: "警察の捜査に協力するため、自宅に来た職員に通帳とカードを渡し、暗証番号のメモを添える", money: -25000, damageType: "money", explain: "キャッシュカード詐欺盗です！預けたカードから全財産が即座に引き出されてしまいます。" },
      { text: "念のため相手の「内線番号と所属」をメモし、相手が指定した電話番号へ折り返し電話して確かめる", money: -20000, damageType: "money", explain: "危険です！犯人グループの仲間に繋がり、「間違いなく警察です」と信用させられてカードを奪われます。" },
      { text: "カードは渡さず、暗証番号だけを電話口で相手の警察官（自称）に口頭で伝えてしまう", money: -15000, damageType: "personal_info", explain: "危険です！暗証番号を教えてしまうと、ネットバンキング等を不正開設され被害に遭う恐れがあります。" }
    ]
  },
  {
    id: "q_senior_call_refund", genre: "phone_visit", category: "scam", source: "固定電話", title: "市役所職員を騙る「医療費還付金」の電話",
    characterName: "自称・市役所職員",
    narration: "市役所の保険年金課を名乗る人物から電話がかかってきました。\n相手：「過去5年間の医療費の過払い金（24,500円）の返金通知を郵送しましたが、返送期限が過ぎています。本日中なら特別に手続き可能です。」",
    dialogue: [
      { speaker: "自称・市役所", line: "携帯電話を持って、お近くの無人ATMへ向かってください。到着したら当課の専用フリーダイヤルへお電話くだされば受取操作を案内します。" },
      { speaker: "あなた", line: "（医療費が戻ってくるのはありがたいが、ATMで手続きするものなのだろうか…？）" }
    ],
    point: "市役所や公的機関が「ATMでお金を返金（還付）する」ことは絶対にありません。ATMの操作は『送金（支払い）』しかできません。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.phoneCall,
    desc: "市役所を名乗り「医療費の還付金がある。携帯を持ってATMへ行って指示通り操作して」と案内された。",
    correctChoices: [
      { text: "「ATMで還付金の受け取りは絶対にできない」と判断し、電話を切って市役所の公式窓口へ確認する", money: 0, explain: "正解！ ATM操作で還付金が受け取れることは100%ありません！見事に詐欺を防ぎました。" }
    ],
    wrongChoices: [
      { text: "本日中の期限に間に合わせるため、携帯電話を持って急いでATMへ行き、指示通りにボタンを押す", money: -25000, damageType: "money", explain: "還付金詐欺です！受取操作と見せかけて、自分の口座から犯人口座へ全額送金させられてしまいます。" },
      { text: "「ATMの操作が分からないので、自宅にお金を持ってきてほしい」と相手に頼む", money: -20000, damageType: "money", explain: "危険です！「手数料が必要」と言って自宅に受け子（訪問員）がやってきて現金を直接騙し取られます。" },
      { text: "相手に市役所の住所を確認し、教えられたフリーダイヤルへ掛け直して手続きの続きを聞く", money: -15000, damageType: "money", explain: "危険です！教えられた番号は詐欺グループのコールセンターに繋がり、騙され続けてしまいます。" }
    ]
  },
  {
    id: "q_senior_call_son", genre: "phone_visit", category: "scam", source: "固定電話", title: "「携帯の番号が変わった」息子を騙る電話",
    characterName: "偽の息子",
    narration: "固定電話が鳴り、慌てた様子の男の声が聞こえてきました。\n男：「母さん（父さん）？ 俺だけど…風邪引いて喉が痛くて声が変なんだ。実は会社の書類が入ったカバンを落としてしまって、今日中に補填のお金が必要なんだ。」",
    dialogue: [
      { speaker: "自称・息子", line: "携帯もカバンと一緒に無くしたから番号が変わったんだ。今から言う新しい番号に登録して。同僚が家にお金を取りに行くから用意して！" },
      { speaker: "あなた", line: "（息子が大変なことになっている…急いでお金を用意してあげなければ…！？）" }
    ],
    point: "「電話番号が変わった」「カバンを落とした」「代わりの者が金を取りに行く」は、オレオレ詐欺の王道パターンです。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.phoneCall,
    desc: "息子を名乗る人物から「カバンを落とした。番号が変わった。同僚が金を取りに行く」と電話があった。",
    correctChoices: [
      { text: "一度電話を切り、あらかじめ電話帳に登録してある「息子の元々の携帯電話番号」へ直接かけ直して確認する", money: 0, explain: "正解！ 「電話番号が変わった」と言われても元の番号にかけるのがオレオレ詐欺を100%防ぐ鉄則です！" }
    ],
    wrongChoices: [
      { text: "息子のピンチを救うため、言われた通りの金額を銀行で下ろし、自宅に来た会社の同僚に手渡す", money: -25000, damageType: "money", explain: "オレオレ詐欺です！大切な資産が騙し取られてしまいます。" },
      { text: "教えられた「新しい息子の番号」にすぐ電話をかけ直し、「お金を用意できたよ」と伝える", money: -20000, damageType: "money", explain: "危険です！詐欺犯の番号に掛けているため、そのまま現金の受け渡し場所を指定されてしまいます。" },
      { text: "電話口で「〇〇（息子の名前）かい？」とこちらから名前を言い、声の様子を確かめようとする", money: -15000, damageType: "personal_info", explain: "危険です！こちらから名前を教えてしまうと、犯人はその名前を使って本物の息子になりすまします。" }
    ]
  },
  {
    id: "q_senior_call_power", genre: "phone_visit", category: "scam", source: "固定電話", title: "大手電力会社を装う「電気料金が安くなる」勧誘",
    characterName: "自称・電力プラン窓口",
    narration: "大手電力会社の関連窓口を名乗る人物から電話がありました。\n相手：「電気料金の高騰に伴う特別プランのご案内です。月々の電気代が確実に3割安くなります。現在の検針票をお手元にご用意ください。」",
    dialogue: [
      { speaker: "勧誘電話", line: "プラン切替のため、検針票に記載されている『お客様番号』と『供給地点特定番号』を今すぐ読み上げてください。" },
      { speaker: "あなた", line: "（大手電力会社を名乗っているし安くなるなら教えるべきか…？）" }
    ],
    point: "検針票の番号を教えると、本人の承諾なしに別の電力会社へ勝手に契約を切り替えられ、高額な解約違約金を請求されるトラブルが多発しています。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.phoneCall,
    desc: "「電気代が安くなる」と電話があり、検針票のお客様番号や契約者情報の読み上げを要求された。",
    correctChoices: [
      { text: "「電話口で検針票の番号は教えられません。詳しい案内書類を郵送してください」と断り、検針票の番号は教えない", money: 0, explain: "正解！ 検針票の情報は重要な個人情報です。安易に教えないことで勝手な契約変更を防げます。" }
    ],
    wrongChoices: [
      { text: "電気代が安くなるなら助かると思い、検針票に書かれた番号や契約者氏名をすべて読み上げる", money: -15000, damageType: "personal_info", explain: "勝手に別会社へ契約変更され、後から高額な請求や法外な解約手数料を請求されてしまいます。" },
      { text: "「後で掛け直すので、そちらの電話番号と担当者名を教えてください」と相手の連絡先だけ聞く", money: -5000, damageType: "personal_info", explain: "相手は言葉巧みに「今だけの特別枠です」と急かし、結局番号を聞き出そうと粘られます。" },
      { text: "「家族に相談してから決めます」と伝え、検針票のコピーをFAXで送る約束をする", money: -10000, damageType: "personal_info", explain: "FAXを送ってしまうと重要な契約番号が渡り、勝手に契約を切り替えられてしまいます。" }
    ]
  },
  {
    id: "q_senior_call_bank_real", genre: "public_service", category: "real", source: "固定電話", title: "【本物】取引銀行の支店担当者からの「定期預金満期」の案内",
    characterName: "取引銀行の正規担当者",
    narration: "長年利用している地元銀行の担当者から自宅に電話がありました。\n相手：「いつもお世話になっております。〇〇銀行〇〇支店の〇〇です。来月満期を迎える定期預金の満期案内書類をお送りいたしましたのでご確認をお願いいたします。」",
    dialogue: [
      { speaker: "銀行担当者", line: "暗証番号をお伺いしたりカードをお預かりすることはございません。同封の書類をお手元でご確認いただければ幸いです。" },
      { speaker: "あなた", line: "（暗証番号も聞かれず、郵送書類の確認案内だけだった。）" }
    ],
    point: "取引のある正規の銀行からの案内であり、暗証番号を聞いたりカードを預かる等の要求が一切ない案内は本物です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.phoneShop,
    desc: "取引銀行の支店担当者から「定期預金の満期書類をお送りしましたのでご確認ください」と連絡があった。",
    correctChoices: [
      { text: "電話の内容をメモし、自宅に郵送されてきた正規の書類を確認した上で、必要に応じて窓口へ行く", money: 300, explain: "正解！ 正規の案内を正しく受け取り、安全に対応できました。（+300円）" }
    ],
    wrongChoices: [
      { text: "「銀行員を名乗る電話はすべて詐欺だ！」と怒鳴り散らし、長年利用している口座を即日解約する", money: -5000, damageType: "money", explain: "正規の担当者からの親切な案内まで過剰に拒絶すると手続きに支障が出てしまいます。（-5,000円）" },
      { text: "親切な担当者だからと信用し、電話口でキャッシュカードの暗証番号や家族構成を自分から話してしまう", money: -10000, damageType: "personal_info", explain: "正規の行員であっても電話口で暗証番号を伝えるべきではありません。" },
      { text: "届いた満期案内の封筒を開封せずにそのままゴミ箱へ捨てて放置する", money: -5000, damageType: "money", explain: "満期手続きを放置すると、優遇金利が適用されなくなるなどの不利益が生じます。（-5,000円）" }
    ]
  },

  // ── ジャンル②：訪問系（6問） ──
  {
    id: "q_senior_visit_roof", genre: "phone_visit", category: "scam", source: "自宅訪問", title: "「屋根の瓦がずれています」突然の訪問点検",
    characterName: "訪問業者",
    narration: "自宅で過ごしていると玄関のチャイムが鳴り、作業着を着た若い男が立っていました。\n男：「近所で外壁工事をしている者ですが、お宅の屋根の瓦がズレて今にも落ちそうです。親切で教えてあげました。」",
    dialogue: [
      { speaker: "訪問業者", line: "今ならハシゴを持ってきているので、無料で屋根に登って点検してあげますよ。早く直さないと雨漏りしますよ！" },
      { speaker: "あなた", line: "（突然の訪問で屋根が危険と言われたが、どう対応すべきか…）" }
    ],
    point: "「近所で工事中」「屋根が壊れている」と突然訪問し、屋根に登って自ら瓦を割って高額契約を迫る『点検商法』が急増しています。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: null,
    desc: "突然の訪問者が「屋根がずれていて危険。今すぐ無料で屋根に登って点検します」と迫ってきた。",
    correctChoices: [
      { text: "「知り合いの工務店に相談しますので結構です」とインターホン越しに断り、絶対に敷地や屋根に上がらせない", money: 0, explain: "正解！ 突然の点検業者は絶対に家や屋根に上げないことが被害防止の鉄則です。" }
    ],
    wrongChoices: [
      { text: "無料で見てもらえるなら助かると思い、庭に入ってもらいハシゴで屋根に登らせる", money: -20000, damageType: "money", explain: "点検商法です！わざと屋根を壊され、不安を煽られて数百万円の不要な工事契約を結ばされます。" },
      { text: "「瓦が落ちそう」と聞いて怖くなったので、玄関を開けて詳しい修繕費用の見積もりを出してもらう", money: -15000, damageType: "money", explain: "危険です！家に上がり込まれ、居座られて強引に高額な契約書にサインさせられます。" },
      { text: "屋根には登らせないが、業者の名刺をもらって「屋根の写真だけ撮ってきて」とお願いする", money: -10000, damageType: "personal_info", explain: "他人の壊れた屋根の写真を提示されて騙され、高額な修繕契約を結ばされてしまいます。" }
    ]
  },
  {
    id: "q_senior_visit_precious", genre: "phone_visit", category: "scam", source: "自宅訪問", title: "「不用品を何でも買い取ります」押し買い訪問",
    characterName: "不用品買取業者",
    narration: "「古着や壊れた家電など何でも無料で引き取ります」と電話があった後、業者の男が自宅を訪ねてきました。\n男：「古着を見るついでに、ご自宅に古い指輪や金歯、ネックレスはありませんか？鑑定だけでも無料ですよ。」",
    dialogue: [
      { speaker: "買取業者", line: "貴金属を出してくれるまで今日は帰りませんよ。見せるだけでいいですから。" },
      { speaker: "あなた", line: "（不用品回収のはずなのに、急に貴金属を出せと居座られてしまった…）" }
    ],
    point: "不用品回収を口実に上がり込み、貴金属や宝石を市場価格の数十分の1で強引に買い叩く『押し買い（訪問購入トラブル）』です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: null,
    desc: "不用品回収業者が「貴金属や宝石を出さないと帰らない」と居座り、強引に貴金属を要求してきた。",
    correctChoices: [
      { text: "「貴金属の売却はお断りします。お引き取りください。帰らないなら警察を呼びます」とキッパリ退去を命じる", money: 0, explain: "正解！ 訪問購入は法律で拒否できます。退去を求め、応じない場合は直ちに110番しましょう。" }
    ],
    wrongChoices: [
      { text: "早く帰ってほしいので、タンスの奥から古い指輪やネックレスを出して言われた数百円で手放す", money: -20000, damageType: "money", explain: "押し買い被害です！数十万円相当の貴重な財産をわずかな金額で奪われてしまいます。" },
      { text: "「値段がつかないような壊れたアクセサリーなら…」と見せて査定してもらう", money: -15000, damageType: "money", explain: "危険です！品物を見せた瞬間に強引に安い金額を押し付けられ、持ち去られてしまいます。" },
      { text: "「今日は夫（家族）がいないので明日また来てください」と次回の訪問を約束する", money: -5000, damageType: "personal_info", explain: "再度訪問され、より強引に貴金属の提出を迫られることになります。" }
    ]
  },
  {
    id: "q_senior_visit_water", genre: "public_service", category: "scam", source: "自宅訪問", title: "「水道局の方から来ました」水質検査と高額浄水器",
    characterName: "自称・水道局関係者",
    narration: "「水道局の方から来ました。この地域の水道管が汚れており、水質検査を行っています」と作業服の男が訪ねてきました。\n男：「コップに水道水を汲んでください。検査薬を入れると…ほら、水が黄色く変色しました！有害物質が含まれていますよ！」",
    dialogue: [
      { speaker: "訪問者", line: "このまま飲むと体を壊しますよ。今なら特別に高性能浄水器を20万円で取り付けます。" },
      { speaker: "あなた", line: "（薬を入れたら急に黄色くなった…本当に水道水が危険なのだろうか？）" }
    ],
    point: "水道局が個人の住宅を突然訪れて水質検査をしたり、浄水器を販売することは一切ありません。試薬の化学反応（塩素反応）を利用した典型的な詐欺です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: null,
    desc: "「水道局の方から来た。水が汚れているので20万円の浄水器が必要」と契約を迫られた。",
    correctChoices: [
      { text: "「水道局が個別に浄水器を販売することはない」と見抜き、「購入しません」と断ってドアを閉める", money: 0, explain: "正解！ 水道局が浄水器を販売することは絶対にありません。変色は塩素に反応しただけのトリックです。" }
    ],
    wrongChoices: [
      { text: "水が黄色くなって健康への不安を感じたので、勧められた20万円の浄水器をその場で契約する", money: -20000, damageType: "money", explain: "悪質な訪問販売です！市販の安価な浄水器を高額で売りつけられてしまいます。" },
      { text: "「水道局の職員なら」と信用し、台所に上がってもらって水道管の点検を頼む", money: -15000, damageType: "money", explain: "家に上がり込まれ、さらに高額な水道管交換工事（数十万円）を契約させられます。" },
      { text: "「20万円は高いので、半額の10万円にならないか」と値引き交渉してみる", money: -10000, damageType: "money", explain: "相手は喜んで「特別に値引きします」と応じ、不要な安物器具を高額で購入させられます。" }
    ]
  },
  {
    id: "q_senior_visit_fire", genre: "public_service", category: "scam", source: "自宅訪問", title: "「消防署の方から来ました」消火器の強制点検・販売",
    characterName: "自称・防災点検員",
    narration: "消防服に似た服を着た人物が訪ねてきました。\n相手：「消防署の方から来ました。法律が改正され、住宅用消火器の薬剤詰め替えと新規設置が義務化されました。古い消火器を回収し、新しいものを設置します。」",
    dialogue: [
      { speaker: "訪問者", line: "点検・交換費用として35,000円になります。今すぐお支払いください。" },
      { speaker: "あなた", line: "（消防署の人がわざわざ集金に来るものなのだろうか…？）" }
    ],
    point: "消防署が消火器の訪問販売や点検を行ったり、金銭を請求することは絶対にありません。「消防署の方（方角）」と言って騙す手口です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: null,
    desc: "「消防署の方から来た。消火器の交換が義務化されたので35,000円払え」と請求された。",
    correctChoices: [
      { text: "「本物の消防署が販売や点検で集金することはない」と指摘し、購入を断って警察や消防署へ通報する", money: 0, explain: "正解！ 消防署員を装う悪質な訪問販売です。騙されずに断れました。" }
    ],
    wrongChoices: [
      { text: "法律で義務化されたなら罰則があると困ると思い、言われた通り35,000円を現金で支払う", money: -20000, damageType: "money", explain: "不当な消火器販売詐欺です！定価数千円のものを不当に高く買わされてしまいます。" },
      { text: "自宅にある古い消火器を渡して点検してもらい、領収書だけ受け取る", money: -15000, damageType: "money", explain: "消火器を持ち去られた上に、後から高額な点検料・廃棄料の請求書が送られてきます。" },
      { text: "「近所の家もみんな買っていますか？」と近隣の購入状況を聞いてから判断しようとする", money: -10000, damageType: "money", explain: "「向かいの〇〇さんも買われましたよ」と嘘をつかれて騙されてしまいます。" }
    ]
  },
  {
    id: "q_senior_visit_gas_real", genre: "public_service", category: "real", source: "自宅訪問", title: "【本物】法令に基づく「ガス設備定期点検」の訪問",
    characterName: "ガス供給会社点検員",
    narration: "事前の検針票とともに「〇月〇日に定期点検に伺います」とチラシが入っていた日、制服を着たガス会社の点検員が訪ねてきました。\n点検員：「法令で定められた4年に1度のガス漏れ点検に伺いました。身分証はこちらです。点検費用は一切かかりません。」",
    dialogue: [
      { speaker: "点検員", line: "屋外のガスメーターと室内のコンロ・給湯器のガス漏れ検査を行います。よろしければ立ち会いをお願いします。" },
      { speaker: "あなた", line: "（事前に案内用紙が入っていたガス点検だ。身分証も提示して費用も無料と言っている。）" }
    ],
    point: "事前にお知らせチラシが投函されており、社員証・身分証を明示し、費用の請求や機器の販売を一切行わない点検は正規の法令点検です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: null,
    desc: "事前に通知があった正規のガス点検員が、身分証を提示して無料の定期点検に訪れた。",
    correctChoices: [
      { text: "提示された身分証と事前案内の日時を確認し、立ち会いのもとで点検を受けて受領印を押す", money: 300, explain: "正解！ 事前通知と身分証を確認し、正規の安全点検を正しく受けることができました。（+300円）" }
    ],
    wrongChoices: [
      { text: "「訪問点検はすべて詐欺だ」と決めつけ、点検員を怒鳴りつけて点検を完全に拒否する", money: -5000, damageType: "money", explain: "法令で定められた重要なガス安全点検を受けないと、ガス漏れ事故のリスクが残ってしまいます。（-5,000円）" },
      { text: "点検員にカギを預けて自分は買い物へ出かけてしまう", money: -10000, damageType: "money", explain: "正規の点検であっても、家の中に他人がいる状態で無人にするのは防犯上極めて危険です。" },
      { text: "「ガス漏れ警報器の交換が必要」と言われたら、その場で言われるまま高額な現金を支払う", money: -5000, damageType: "money", explain: "正規点検ではその場での現金集金は行わず、次月のガス料金と合算請求が基本です。" }
    ]
  },
  {
    id: "q_senior_visit_pipe_clean", genre: "phone_visit", category: "scam", source: "自宅訪問", title: "「排水管高圧洗浄キャンペーン・3,000円」の罠",
    characterName: "排水管清掃業者",
    narration: "ポストに「地域一斉排水管清掃キャンペーン！今なら高圧洗浄が特別価格3,000円」というチラシが入っていた数日後、業者の男が訪問してきました。\n男：「チラシの清掃に伺いました。3,000円で排水管をお掃除しますね。」",
    dialogue: [
      { speaker: "清掃業者", line: "「お宅の床下の排水管、油汚れで完全に腐食して割れかけていますよ！今すぐ特殊補修工事をしないと床が抜けます。工事費は35万円です！」" },
      { speaker: "あなた", line: "（3,000円の清掃のはずが、急に35万円の補修工事が必要と言われてしまった…）" }
    ],
    point: "「格安清掃チラシ」で家に入り込み、床下の写真を捏造したり不安を煽って数十万円の高額追加工事を契約させる悪質点検商法です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: IMAGE_ASSETS.screenshots.seniorPipeCleanFlyer,
    desc: "「3,000円で排水管洗浄をする」と訪れた業者が、作業後に「腐食がひどく35万円の緊急補修が必要」と迫ってきた。",
    correctChoices: [
      { text: "その場での契約はきっぱり断り、チラシの3,000円のみ支払って退去させ、家を建てた工務店に相談する", money: 0, explain: "正解！ 格安チラシをきっかけにした高額点検商法です。その場での契約を拒否して被害を防ぎました。" }
    ],
    wrongChoices: [
      { text: "床が抜けると脅されて怖くなったので、勧められた35万円の追加補修工事の契約書にサインする", money: -25000, damageType: "money", explain: "点検商法被害です！不要で法外な高額工事費を騙し取られてしまいます。" },
      { text: "「今日工事をしてくれるなら20万円にして」とその場で値引きさせて契約する", money: -20000, damageType: "money", explain: "危険です！最初から高額に設定されているため、値引きされても大きな被害になります。" },
      { text: "業者が提示した「腐食した床下の写真」を信じて、追加の薬剤洗浄（5万円）だけお願いする", money: -10000, damageType: "money", explain: "写真は他人の家の画像を使った捏造です。不要な費用を騙し取られてしまいます。" }
    ]
  },

  // ── ジャンル③：SMS・ネット系（5問） ──
  {
    id: "q_senior_sms_delivery", genre: "mail_sms", category: "scam", source: "スマートフォンSMS", title: "宅配業者を装う「不在持ち帰り」偽SMS",
    characterName: "偽宅配ショートメール",
    narration: "スマートフォンのSMS（ショートメッセージ）に通知が届きました。\n内容：【配送業者】お客様宛のお荷物をお届けにあがりましたが不在のため持ち帰りました。配送状況の確認および再配達指定はこちらからご確認ください。http://fake-delivery-check.jp",
    dialogue: [
      { speaker: "あなた", line: "（荷物の心当たりは特にないが、不在通知のリンクを押して確認した方がいいだろうか？）" }
    ],
    point: "SMSに記載されたリンクを開くと、偽のログイン画面で個人情報を盗まれたり、不正なウイルスアプリをインストールさせられます。",
    notification: "📱ピコン 【不在通知】荷物持ち帰りのお知らせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.gmailDelivery,
    desc: "「お荷物を持ち帰りました」と不審な英数字のリンクが記載されたSMSが届いた。",
    correctChoices: [
      { text: "SMS本文のリンクは開かず、心当たりがなければ削除するか、宅配便の公式アプリで伝票番号を照会する", money: 0, explain: "正解！ 偽SMSのリンクは絶対に開かないのが鉄則です。" }
    ],
    wrongChoices: [
      { text: "どんな荷物か確認するため、SMSに記載されたリンクをタップして表示された画面で電話番号を入力する", money: -20000, damageType: "personal_info", explain: "フィッシング詐欺です！不正アプリが勝手にインストールされ、高額な不正決済被害に遭います。" },
      { text: "「荷物に心当たりがありません」とSMSの送信元電話番号へ直接返信メッセージを送る", money: -10000, damageType: "personal_info", explain: "危険です！番号が生きていることが犯人に伝わり、大量の詐欺メッセージが届くようになります。" },
      { text: "リンク先で「本人確認」として指示されたセキュリティアプリ（偽ファイル）をインストールする", money: -25000, damageType: "account", explain: "不正アプリによってスマホが乗っ取られ、勝手に他人へ詐欺SMSを大量送信されてしまいます。" }
    ]
  },
  {
    id: "q_senior_web_support", genre: "mail_sms", category: "scam", source: "パソコン・タブレット", title: "「ウイルスに感染！」警告音とサポート詐欺",
    characterName: "偽マイクロソフト警告",
    narration: "パソコンでニュースサイトを見ていると、突然けたたましい警告音が鳴り響き、画面一面に赤い警告が表示されました。\n画面：『警告！システムがウイルスに感染しました。個人情報が流出しています。直ちにサポート窓口（050-XXXX-XXXX）へ電話してください。』",
    dialogue: [
      { speaker: "警告画面", line: "【警告】電源を切るとパソコンが完全に破壊されます。直ちに電話してください！" },
      { speaker: "あなた", line: "（すごい警告音と『破壊される』という文字で心臓がバクバクする…どうしよう…）" }
    ],
    point: "大音量の警告音や全画面警告は、Webサイト上に表示されているだけの偽物（サポート詐欺）です。電話をかけると遠隔操作で高額な電子マネーを要求されます。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.adScam,
    desc: "「ウイルス感染！PCが破壊されます」と大音量で警告画面が表示され、電話をかけるよう要求されている。",
    correctChoices: [
      { text: "画面に表示された電話番号には絶対にかけず、ブラウザのタスクを終了させる（またはパソコンを再起動する）", money: 0, explain: "正解！ 画面に表示されているだけの偽警告です。電話をかけずに画面を閉じれば被害はありません。" }
    ],
    wrongChoices: [
      { text: "パソコンが壊れると困るので、画面の電話番号へ電話をかけ、相手の指示通り遠隔操作を許可する", money: -25000, damageType: "money", explain: "サポート詐欺です！カタコトの男に遠隔操作ソフトを入れられ、数十万円の電子マネーカードを請求されます。" },
      { text: "画面を閉じようとせず、「ウイルスを消去する」と書かれた点滅ボタンを何回もクリックする", money: -15000, damageType: "account", explain: "偽の警告画面が何重にも開き、さらに悪質な不正プログラムがダウンロードされてしまいます。" },
      { text: "焦って近所のコンビニへ走り、店員さんに「パソコンの修理代の電子マネーをください」と頼む", money: -10000, damageType: "money", explain: "サポート詐欺の罠に自らはまってしまい、電子マネーを騙し取られてしまいます。" }
    ]
  },
  {
    id: "q_senior_mail_tax", genre: "mail_sms", category: "scam", source: "メール・SMS", title: "国税庁を装う「未納税金の最終差し押さえ」通知",
    characterName: "自称・国税庁納付窓口",
    narration: "メールに「国税庁」を名乗る重要通知が届きました。\n内容：【重要なお知らせ】未納の所得税がございます。納付期限を過ぎているため、24時間以内にご納付いただけない場合、給与や年金・不動産の差し押さえを執行いたします。支払い手続き：http://nta-tax-pay.org",
    dialogue: [
      { speaker: "あなた", line: "（税金の未納なんてないはずだが、『差し押さえ』と書かれると不安になる…）" }
    ],
    point: "国税庁や税務署がメールやSMSで納税通知を送ったり、WebサイトからクレジットカードやVプリカで納付させることは絶対にありません。",
    notification: "📱ピコン 【国税庁】重要なお知らせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.seniorTaxScam,
    desc: "国税庁を名乗り「税金の未納がある。24時間以内に支払わないと差し押さえを実行する」とメールが届いた。",
    correctChoices: [
      { text: "「公的機関がメールで納税や差し押さえを通告することはない」と判断し、リンクを開かずメールを削除する", money: 0, explain: "正解！ 国税庁を騙る典型的なフィッシング詐欺です。落ち着いて無視できました。" }
    ],
    wrongChoices: [
      { text: "年金を差し押さえられたら困るので、リンクを開いてクレジットカード番号を入力し未納金を支払う", money: -25000, damageType: "personal_info", explain: "フィッシング詐欺です！カード情報が盗まれ、高額な不正利用被害に遭ってしまいます。" },
      { text: "「身に覚えがありません」とメールに記載された問い合わせ先メールアドレスへ返信する", money: -10000, damageType: "personal_info", explain: "危険です！実在するメールアドレスと確認され、税務署を騙る脅迫メールが執拗に届くようになります。" },
      { text: "メールの指示に従い、コンビニでVプリカ（電子マネー）を購入して番号を入力する", money: -25000, damageType: "money", explain: "典型的な架空請求詐欺です！国税庁が電子マネーでの納税を求めることは絶対にありません。" }
    ]
  },
  {
    id: "q_senior_sms_carrier_real", genre: "mail_sms", category: "real", source: "スマートフォンSMS", title: "【本物】携帯電話会社からの「月額利用料金の確定」案内",
    characterName: "携帯会社公式",
    narration: "毎月利用している携帯電話会社からSMSが届きました。\n内容：【お知らせ】今月のご請求金額が確定いたしました。ご請求額および内訳は、公式アプリまたはMyページ（ブックマーク）よりご確認いただけます。※本メッセージから直接のパスワード入力は求めません。",
    dialogue: [
      { speaker: "あなた", line: "（毎月届く請求確定の案内だ。直接リンクを踏ませる文面もないな。）" }
    ],
    point: "本文に直接ログインURLを載せず、「公式アプリやブックマークからご確認ください」と案内する通知は正規の公式通知です。",
    notification: "📱ピコン 携帯料金確定のお知らせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.dataNotice,
    desc: "「月額料金が確定しました。公式アプリ等からご確認ください（直接のログイン要求なし）」との通知。",
    correctChoices: [
      { text: "いつも使っている公式アプリまたは自分で保存したブックマークからマイページを開き、料金の内訳を確認する", money: 300, explain: "正解！ 正しい正規の通知を落ち着いて公式ルートから確認できました。（+300円）" }
    ],
    wrongChoices: [
      { text: "「SMSはすべて詐欺に違いない」と思い込み、携帯ショップの窓口へ怒鳴り込みに行く", money: -5000, damageType: "money", explain: "正規のお知らせに対して過剰に反応すると生活が不便になってしまいます。（-5,000円）" },
      { text: "「請求額が高くなっていたら困る」と、ネットの検索窓で適当に見つけた電話番号へ電話して聞く", money: -10000, damageType: "personal_info", explain: "検索上位の偽サポート窓口に繋がってしまい、個人情報を聞き出される危険があります。" },
      { text: "請求案内を一切見ずに放置し、引き落とし口座の残高確認も行わない", money: -5000, damageType: "money", explain: "残高不足で引き落としができず、利用停止になってしまうリスクがあります。（-5,000円）" }
    ]
  },
  {
    id: "q_senior_mail_card_real", genre: "mail_sms", category: "real", source: "メール", title: "【本物】クレジットカード会社からの「明細確定」通知",
    characterName: "カード会社公式",
    narration: "普段利用しているクレジットカード会社からメールが届きました。\n内容：【〇〇カード】今月のご利用代金明細書を作成いたしました。明細内容は公式Webサービス（会員ログイン画面）よりご確認ください。※不審なフィッシングメールにご注意ください。",
    dialogue: [
      { speaker: "あなた", line: "（普段使っているカード会社からの定期明細案内だ。）" }
    ],
    point: "定期的な利用明細の確定通知であり、個人情報やカード番号の緊急入力を急かす文面がないものは本物の正規連絡です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.lineOfficial,
    desc: "クレジットカード会社から「今月のご利用明細が確定しました。公式サイトよりご確認ください」と届いた。",
    correctChoices: [
      { text: "ブラウザのブックマークに保存してあるカード会社の会員サイトへログインして明細内容を確認する", money: 300, explain: "正解！ 正規の案内を自ら安全なブックマーク経由で確認できました。（+300円）" }
    ],
    wrongChoices: [
      { text: "「明細メールは危ない」と思い込み、毎月の利用明細を一切確認せず放置する", money: -5000, damageType: "money", explain: "正規の明細確認を怠ると、万が一の不正利用の早期発見が遅れてしまいます。（-5,000円）" },
      { text: "メールに返信して「私の今月の支払額はいくらですか？」とカード番号を添えて送信する", money: -15000, damageType: "personal_info", explain: "送信専用のメールアドレスにカード番号を送信すると、情報流出の危険があります。" },
      { text: "カードを不正利用されたと勘違いして、カード会社に電話もせずカードにハサミを入れて切断する", money: -5000, damageType: "money", explain: "再発行手数料がかかり、公共料金の引き落としが滞ってしまいます。（-5,000円）" }
    ]
  }
];

/* =========================================================
   【中高生モード用問題プール】（全16問）
   難易度：上級（SNS・DM・バイト・友達トラブル・画像とURLを吟味）
   ========================================================= */
const QUESTIONS_TEEN = [
  {
    id: "q_teen_police_mail", category: "scam", source: "SMS/Gmail", title: "【緊急】サイバー犯罪捜査課通知",
    characterName: "警察庁広報",
    narration: "「学校が終わり家に帰ってきた主人公。スマホを見ると1件の不審な通知が届いていた。」\n内容：【重要】あなた名義の口座が特殊詐欺の不正送金に利用された形跡があります。24時間以内に本人認証を行わない場合、全口座の凍結および法的措置が取られます。",
    dialogue: [
      { speaker: "不審メール", line: "【警告】緊急の本人確認が必要です。下記認証リンクより登録情報を照合してください。" },
      { speaker: "主人公", line: "（「逮捕」や「口座凍結」って書いてある…焦るな、どうすればいいんだろう？）" }
    ],
    point: "警察や公的機関がメールのリンクからログインや個人情報入力を求めることは絶対ありません。リンクを開かず、検索等で直接調べた窓口へ連絡しましょう。",
    notification: "📱ピコン 【警告】口座凍結のお知らせ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.gmailPolice,
    desc: "「【重要】不正利用の検知。24時間以内に本人認証を行わない場合、法的措置へ移行します」とフィッシングリンクが届いた。",
    correctChoices: [
      { text: "メール本文のリンクは一切開かず、検索等で調べた警察署の代表電話へ問い合わせる", money: 0, explain: "正解！ 焦らせる警告文は詐欺の典型。自分で調べた公式番号で確認するのが鉄則だよ！" }
    ],
    wrongChoices: [
      { text: "記載された緊急認証リンクを開き、状況を確認するためにログインIDとパスワードを入力する", money: -20000, damageType: "personal_info", explain: "フィッシング詐欺だよ！公的機関がメールでリンクから認証させることは絶対にないよ！" },
      { text: "「犯罪に関わっていない証拠」を提出するため、メール宛てに自分の学生証の写真を添付して返信する", money: -15000, damageType: "personal_info", explain: "危険！悪質な詐欺グループに学生証の個人情報を握られてしまいます。" },
      { text: "メール本文の送信元アドレスが「police-support@gmail.com」になっているのを見て「本物の警察だ」と信じる", money: -20000, damageType: "personal_info", explain: "警察などの公的機関がフリーメール（gmail等）を使用することは絶対にありません！" }
    ]
  },
  {
    id: "q_teen_present_scam", category: "scam", source: "SNS", title: "【公式風】特別プレゼント企画",
    characterName: "プレゼント企画",
    narration: "「SNSを見ていると、気になる広告や投稿が目に留まった。」\n人気インフルエンサーそっくりの投稿：「抽選で100名様に最新ゲーム機を無料プレゼント！手続きはリンクから」",
    dialogue: [
      { speaker: "アカウント", line: "【当選確定】おめでとうございます！発送手配のため、下記URLにてクレカ登録および配送先情報を入力してください。（※送料手数料500円のみ発生します）" },
      { speaker: "主人公", line: "（送料500円だけでゲーム機がもらえるの！？お得だけどカード登録必要かな…）" }
    ],
    point: "「無料プレゼントだが送料だけ必要」と騙り、クレジットカード情報や個人情報を盗み出す極めて巧妙なフィッシング詐欺です。",
    notification: "📱ピコン 当選DMが届きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.instagram,
    desc: "「当選おめでとうございます！送料500円の決済と配送先入力で最新ゲーム機をお届けします」とクレカ入力フォームが提示されている。",
    correctChoices: [
      { text: "本物のインフルエンサーの公式アカウント（ユーザーIDや認証バッジ）を確認し、偽企画と見破って無視する", money: 0, explain: "正解！ アイコンや名前は簡単に偽装できるよ。本物のIDや公式サイトで確認しよう！" }
    ],
    wrongChoices: [
      { text: "送料の500円だけなら安いので、クレジットカード情報と自宅の住所を入力して確定する", money: -25000, damageType: "personal_info", explain: "カード情報搾取詐欺だよ！クレジットカード情報が盗まれ高額な不正利用被害に遭うよ！" },
      { text: "「送料を着払いにしてください」とDMで返信し、こちらの氏名と電話番号を伝える", money: -10000, damageType: "personal_info", explain: "危険！個人情報が抜き取られ、別の詐欺ターゲットリストに登録されてしまいます。" },
      { text: "当選確率を上げるため、指定されたキャンペーン投稿を自分のSNSでリポスト・拡散する", money: -10000, damageType: "account", explain: "詐欺の拡散に加担してしまい、フォロワーや友達に被害を広げてしまいます。" }
    ]
  },
  {
    id: "q_teen_carrier_real", category: "real", source: "SMS", title: "【公式】通信キャリアご利用制限通知",
    characterName: "通信キャリア公式",
    narration: "「部活動の帰り道、スマホに1件の通知が届いた。」\n内容：【お知らせ】今月のデータ通信量が上限に達しました。低速化を解除する場合は、公式マイページまたは公式アプリよりお手続きください。",
    dialogue: [
      { speaker: "通信キャリア", line: "※本SMSには直接のログインリンクは記載されておりません。ブラウザのブックマークや公式アプリをご利用ください。" }
    ],
    point: "SMS本文に直接ログインURLを載せず、「公式アプリやブックマークからアクセスしてください」と誘導する通知は本物の公式通知の特徴です。",
    notification: "📱ピコン 通信会社からの通知",
    bg: IMAGE_ASSETS.backgrounds.schoolRoute,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.dataNotice,
    desc: "「データ上限到達のお知らせ。手続きは公式アプリ・マイページから行なってください（直リンクなし）」との通知。",
    correctChoices: [
      { text: "いつもスマホで使っている公式キャリアアプリを直接開いて通信量と制限状況を確認する", money: 300, explain: "正解！ 直リンクを載せず公式アプリへ誘導する通知は安全。公式アプリから正しく確認できたね！（+300円）" }
    ],
    wrongChoices: [
      { text: "「SMSの通知は全部詐欺だ」と思い込み、携帯の契約を即座に解約しにショップへ行く", money: -5000, damageType: "money", explain: "ミス！ 本物の正規なお知らせまで過剰反応すると不便になってしまうよ！（一律-5,000円）" },
      { text: "ネットで「通信制限を無料で解除する裏ワザツール」を検索して非公式プロファイルをインストールする", money: -20000, damageType: "account", explain: "危険！不正プロファイルによって通信を盗聴され、アカウントを乗っ取られてしまいます。" },
      { text: "通信制限を無視して、大容量ゲームのアップデートをモバイル通信で強行し続ける", money: -5000, damageType: "money", explain: "追加ギガの自動購入が発生し、高額な通信料が請求されてしまいます。（-5,000円）" }
    ]
  },
  {
    id: "q_teen_delivery_real", category: "real", source: "Gmail/SMS", title: "宅配会社 不在通知",
    characterName: "宅配業者",
    narration: "「休日に家でゆっくりしていると、1件のメールが届いた。」\n内容：お荷物のお届けに伺いましたがご不在でした。伝票番号：1234-5678。再配達の依頼は公式LINEまたは公式サイトよりお願いいたします。",
    dialogue: [
      { speaker: "主人公", line: "今日届く予定だったネット通販の荷物だ。お問い合わせ伝票番号も書いてあるな。" }
    ],
    point: "伝票番号が明記され、公式アプリ・公式サイトからの再配達手続きを案内する通知は正規の連絡です。",
    notification: "📱ピコン 不在持ち帰りのお知らせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.gmailDelivery,
    desc: "「ご不在のため荷物を持ち帰りました。伝票番号をご用意のうえ公式アプリより再配達を依頼してください」との案内。",
    correctChoices: [
      { text: "ブックマークしてある宅配会社の公式サイトを開き、記載された伝票番号を入力して再配達を依頼する", money: 300, explain: "正解！ 送られてきたリンクではなく自ら公式サイトを開いて伝票番号検索するのが一番安全だよ！（+300円）" }
    ],
    wrongChoices: [
      { text: "「宅配通知は全部フィッシング詐欺に違いない」と決めつけてメールを削除し荷物を放置する", money: -5000, damageType: "money", explain: "ミス！ 本物の荷物が保管期限切れで返送され、再送料を請求されてしまいます。（-5,000円）" },
      { text: "SNSで「この伝票番号の荷物届かないんだけど」と荷物番号を画像付きで投稿する", money: -5000, damageType: "personal_info", explain: "伝票番号から配達先の地域や個人情報が特定されてしまう危険があります。" },
      { text: "届いたメールに直接「今すぐ持ってきてください」と返信メールを送る", money: -5000, damageType: "money", explain: "送信専用アドレスのため再配達依頼が届かず、荷物を受け取れません。（-5,000円）" }
    ]
  },
  {
    id: "q_teen_atm_help", category: "help", source: "街中（銀行）", title: "ATMでの高齢者電話操作",
    characterName: "困っている高齢者",
    narration: "「家族と買い物に来たショッピングモール。銀行のATMコーナーの近くを通ると、電話をしながら慌ててボタンを操作しているお年寄りを見かけた。」",
    dialogue: [
      { speaker: "おばあさん", line: "（電話口へ）番号を入力しました！これで医療費の還付金が戻ってくるんですね…？" },
      { speaker: "主人公", line: "（電話で話しながらATMで還付金…！？還付金詐欺じゃないかな？）" }
    ],
    point: "「ATM操作で医療費や保険金の還付金が戻る」ことは絶対ありません。電話しながらの操作は詐欺の典型です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.atm,
    character: IMAGE_ASSETS.characters.elderlyWomanCane,
    screenshot: null,
    desc: "お年寄りが携帯電話で指示を受けながらATMで「還付金」の振込操作をしている。",
    correctChoices: [
      { text: "「おばあさん、ATMで還付金は受け取れません！詐欺の危険があるので一度電話を切って銀行員さんを呼びましょう！」と声をかける", money: 300, explain: "✨ 正解！ ATM操作で還付金が戻ることは絶対ないよ。声をかけて被害を防げたね！（お礼+300円）" }
    ],
    wrongChoices: [
      { text: "親切心でおばあさんの代わりに電話を受け、相手の指示通りに送金ボタンを押してあげる", money: -8000, damageType: "money", explain: "詐欺の振り込みを手伝ってしまい、被害を発生させてしまいました！" },
      { text: "「他人のすることだから関わらない方がいい」と何も言わずにその場を立ち去る", money: -5000, damageType: "money", explain: "おばあさんが大金を騙し取られてしまいました。店員さんや警備員さんに一声かけましょう。" },
      { text: "スマホでおばあさんの様子を動画撮影し、SNSに「ATM詐欺なう」と投稿する", money: -5000, damageType: "personal_info", explain: "被害を止める行動ではなく、プライバシー侵害やトラブルの原因になります。" }
    ]
  },
  {
    id: "q_teen_inspection_scam", category: "scam", source: "訪問", title: "緊急屋根・瓦 点検商法",
    characterName: "点検商法詐欺師",
    narration: "「学校から帰宅し家で過ごしていると、玄関のチャイムが鳴った。」\n作業着の男：「近所で工事をしている者ですが、お宅の屋根の瓦がズレて落ちそうですよ」",
    dialogue: [
      { speaker: "訪問業者", line: "今なら無料ではしごで登って点検してあげるよ。危険だから早く見ないと！" },
      { speaker: "主人公", line: "（親は仕事でいないけど…瓦が落っこちたら危険なのかな？）" }
    ],
    point: "「近所で工事中」「瓦が壊れている」と不安を煽り、屋根に登って自ら瓦を破壊して高額修繕契約を迫る「点検商法」の代表的手口です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: null,
    desc: "「瓦が壊れていて危険。今すぐ無料で屋根に登って点検します」と訪問業者が迫ってきた。",
    correctChoices: [
      { text: "ドアを開けず「親に確認しますので名刺をポストに入れておいてください」と断り、絶対に敷地や屋根に入れない", money: 0, explain: "正解！ 突然の訪問点検は「話さない・家に入れない」が鉄則。一人で判断せず必ず保護者に相談しよう！" }
    ],
    wrongChoices: [
      { text: "親が留守なので、親切な業者さんにお願いして今すぐ屋根に登って点検してもらう", money: -20000, damageType: "money", explain: "点検商法だよ！点検と称して屋根を壊され高額な工事契約を迫られるよ！" },
      { text: "「親の携帯番号を教えるので、そちらに電話して工事の相談をしてください」と電話番号を渡す", money: -10000, damageType: "personal_info", explain: "保護者の電話番号が悪質な営業リストに登録され、しつこい勧誘電話が続く原因になります。" },
      { text: "玄関の鍵を開けて業者を招き入れ、リビングで詳しい説明を聞く", money: -20000, damageType: "money", explain: "危険！居座られて高額なリフォーム契約書にサインさせられるトラブルに巻き込まれます。" }
    ]
  },
  {
    id: "q_teen_impersonate_scam", category: "scam", source: "Instagram/LINE", title: "友達アカウント乗っ取り急金要求",
    characterName: "友達（乗っ取り）",
    narration: "「部活で疲れて帰っている途中、スマホに急な通知が届いた。」\n友達の垢：「頼む！今すぐ電子マネーかAmazonカードを10,000円分買ってコード送って！明日返す！」",
    dialogue: [
      { speaker: "友達（？）", line: "頼む！親には言えないから助けて！" }
    ],
    point: "友達のSNS・LINEアカウントが乗っ取られた際の典型文面。「ギフトカードを買ってコードを送って」は100%乗っ取り詐欺です。",
    notification: "📱ピコン 友達からの緊急連絡",
    bg: IMAGE_ASSETS.backgrounds.schoolRoute,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.instagram,
    desc: "仲の良い友達から「緊急！今すぐ電子マネーやギフトカードコードを10,000円分送って」とメッセージが届いた。",
    correctChoices: [
      { text: "メッセージが届いたSNS上では返信せず、直接通話や対面など別の手段で本人に「アカウント乗っ取られてない？」と確認する", money: 0, explain: "正解！ アカウント乗っ取りの可能性があるよ。「ギフトカードを送って」は電話で直接確認が基本！" }
    ],
    wrongChoices: [
      { text: "困っている友達を助けるため、コンビニで10,000円分のカードを買って裏面のコード写真を送る", money: -10000, damageType: "line_takeover", explain: "乗っ取り詐欺だよ！送信したコードは即座に犯人に使われ、お金は二度と戻らないよ！" },
      { text: "「1万円は無理だけど2,000円ならいいよ」とメッセージで返信して交渉する", money: -5000, damageType: "line_takeover", explain: "少額であっても犯人に電子マネーを奪われてしまいます。" },
      { text: "「本当に〇〇くん？」とメッセージで秘密の合言葉を聞き、返事を待つ", money: -5000, damageType: "line_takeover", explain: "やり取りを続けるうちに巧妙な嘘で丸め込まれ、結局お金を支払わされてしまいます。" }
    ]
  },
  {
    id: "q_teen_home_help", category: "help", source: "家庭（リビング）", title: "お母さんへの不審な警察電話",
    characterName: "母",
    narration: "「学校から帰ると、お母さんが青ざめた顔で電話を切るところだった。」\n母：「警察から電話があって…あなたの口座が犯罪に使われたから、安全な別口座にお金を全額移しなさいと言われたの…」",
    dialogue: [
      { speaker: "母", line: "どうしよう…指示された口座に今すぐ振り込まないと逮捕されちゃうかしら…" }
    ],
    point: "警察が電話で「指定口座にお金を移せ」と指示することは100%ありません。偽警察詐欺です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.motherWorried,
    screenshot: null,
    desc: "お母さんが「警察から口座のお金を別の口座に移せと言われた」とパニックになっている。",
    correctChoices: [
      { text: "「お母さん落ち着いて！本物の警察が指定口座にお金を移せと言うことは絶対ないよ！110番で確認しよう！」と止める", money: 300, explain: "✨ 家族を救ったね！電話で「口座を移せ」は偽警察詐欺。しっかり止めて警察へ確認できたね！（お礼+300円）" }
    ],
    wrongChoices: [
      { text: "逮捕されたら大変だから、お母さんと一緒に急いで銀行へ行き指定口座へ全額送金する", money: -25000, damageType: "money", explain: "詐欺に遭って家族の大切な貯金が全額盗まれてしまったよ！" },
      { text: "相手が言っていた「警察官の名前と直通電話番号」へこちらから電話して詳細を聞く", money: -20000, damageType: "money", explain: "詐欺グループの仲間に繋がり、「今すぐ振り込まないと逮捕令状が出ます」と脅迫されてしまいます。" },
      { text: "「お母さんの問題だから」と何も言わずに自分の部屋へ行って勉強する", money: -20000, damageType: "money", explain: "お母さんがパニックのまま大金を振り込んでしまい、家族に甚大な被害が出てしまいます。" }
    ]
  },
  {
    id: "q_teen_konbini_help", category: "help", source: "街中（コンビニ）", title: "電子マネー高額購入のおじいさん",
    characterName: "高齢者笑顔",
    narration: "「部活帰りにコンビニに寄ると、レジで困惑した様子のおじいさんがギフトカードを15万円分出しているのを見かけた。」",
    dialogue: [
      { speaker: "おじいさん", line: "（レジで）パソコンの警告で電話したら、今すぐこのカードを買ってコードを教えろと言われてね…" }
    ],
    point: "パソコンの警告画面（サポート詐欺）で電子マネーカードを購入させるのは典型的な詐欺です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.convenienceStoreFallback,
    character: IMAGE_ASSETS.characters.elderlyManGlasses,
    screenshot: null,
    desc: "おじいさんがパソコンのウイルス除去名目で15万円分の電子マネーカードを購入しようとしている。",
    correctChoices: [
      { text: "すぐにコンビニの店員さんに「おじいさん、サポート詐欺に遭っているみたいです！カード販売を止めて警察を呼んでください」と伝える", money: 300, explain: "✨ ナイスプレイ！「画面の警告で電子マネーを買え」はサポート詐欺。店員さんへ連携して被害を防げたよ！（お礼+300円）" }
    ],
    wrongChoices: [
      { text: "親切心でおじいさんの代わりにカードの裏面の銀色部分を削って電話相手にコードを読み上げてあげる", money: -10000, damageType: "money", explain: "詐欺の片棒を担いでしまったよ！カード裏のコードを教えたらお金が盗まれるよ！" },
      { text: "おじいさんに「15万円は高いから、5万円分だけにしておいた方がいいよ」とアドバイスする", money: -8000, damageType: "money", explain: "少額であっても詐欺の被害を防ぐことはできません。" },
      { text: "急いで自分の買い物を済ませて、何も言わずにコンビニを出る", money: -5000, damageType: "money", explain: "おじいさんが15万円分のカードを買って騙し取られてしまいました。" }
    ]
  },
  {
    id: "q_teen_shopping_ad_scam", category: "scam", source: "SNS広告", title: "高級スニーカー 90%オフ激安セール",
    characterName: "激安ショップ",
    narration: "「SNSを見ていると、定価3万円の人気スニーカーが『本日限定90%OFF・2,980円』という広告が流れてきた。」",
    dialogue: [
      { speaker: "広告ページ", line: "【残り3点】大人気限定モデルが今だけ破格！クレジットカード決済ですぐに発送！" },
      { speaker: "主人公", line: "（ずっと欲しかったスニーカーだ！この値段で買えるの！？）" }
    ],
    point: "極端な値引き広告は偽ECサイトへの誘導です。お金を払っても粗悪品や何も届かず、クレカ情報が盗まれます。",
    notification: "📱ピコン タイムセールのお知らせ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.shoppingAd,
    desc: "定価3万円の人気商品が「本日限定90%OFF・2,980円」とクレジットカード決済を迫っている。",
    correctChoices: [
      { text: "広告のURLドメインや販売事業者情報を調べ、公式サイトの定価と比較して「偽ショッピング詐欺サイト」と判断し購入しない", money: 0, explain: "正解！ 異常な安さは偽サイトの典型。公式の定価やURLの確認が鉄則だよ！" }
    ],
    wrongChoices: [
      { text: "限定3点のタイムセールに間に合わせるため、急いでクレジットカード情報を入力して購入する", money: -20000, damageType: "personal_info", explain: "偽ECサイト詐欺だよ！商品が届かない上にカード情報を盗まれて不正利用されるよ！" },
      { text: "「クレカが不安なら銀行振込にしよう」と指定された個人名義の口座へ2,980円を振り込む", money: -10000, damageType: "money", explain: "振込先が個人口座のECサイトは100%詐欺です。お金は奪われ商品は届きません。" },
      { text: "友達に「スニーカーが3,000円で売ってる！」とURLを共有して一緒に買おうと誘う", money: -15000, damageType: "personal_info", explain: "友達まで巻き込んで偽サイトにカード情報を入力させてしまいます。" }
    ]
  },
  {
    id: "q_teen_gameapp_real", category: "real", source: "ゲームアプリ", title: "【公式】大型アップデートとメンテナンス予告",
    characterName: "運営チーム",
    narration: "「お気に入りのスマホゲームを起動すると、アプリ内にお知らせが表示された。」",
    dialogue: [
      { speaker: "公式お知らせ", line: "【予告】明日14:00〜17:00まで定期メンテナンスを実施します。メンテナンス中はゲームをプレイできません。" }
    ],
    point: "アプリ内の正規のお知らせ画面で表示されるメンテナンスやアップデート情報は本物の公式通知です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.gameAppNotice,
    desc: "アプリ内の公式お知らせで「明日定期メンテナンスを実施します」と案内されている。",
    correctChoices: [
      { text: "「明日のメンテ時間中は遊べないんだな」とゲーム内の公式スケジュールを確認し、そのまま普通にゲームを遊ぶ", money: 300, explain: "正解！ アプリ内の正規なお知らせを落ち着いて正しく確認できたね！（+300円）" }
    ],
    wrongChoices: [
      { text: "「データが消去される警告だ！」とパニックになり、非公式の外部バックアップサイトにIDとパスワードを入力する", money: -5000, damageType: "account", explain: "ミス！ 通常のメンテナンスに慌てて怪しいサイトへアカウント情報を渡してしまうのは危険だよ。（一律-5,000円）" },
      { text: "「メンテナンス中にログインできる裏技」をネットで探し、改造アプリをダウンロードする", money: -15000, damageType: "account", explain: "不正ツールによりアカウントが永久BAN（利用停止）されてしまいます。" },
      { text: "ゲームの公式Xアカウントに「メンテナンスするな！」と暴言をリプライする", money: -5000, damageType: "money", explain: "不適切なネット利用によりSNSアカウントが凍結されてしまいます。" }
    ]
  },
  {
    id: "q_teen_romance_scam", category: "scam", source: "SNS DM", title: "海外の美形アカウントからの投資案内",
    characterName: "投資インフルエンサー",
    narration: "「SNSで海外の美形アカウントから親しげにメッセージが届き、何日か世間話をした。」",
    dialogue: [
      { speaker: "相手", line: "あなただけに秘密の暗号資産投資を教えるね。私の指示通りに入金すれば必ず毎日10%増えるよ。" },
      { speaker: "主人公", line: "（仲良くなった人だけど、急にお金や投資の話になったぞ…？）" }
    ],
    point: "SNSで親密になった後に「絶対儲かる投資」を勧めてくるのは『SNS型ロマンス詐欺・投資詐欺』です。",
    notification: "📱ピコン DMが届きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.romanceTalk,
    desc: "SNSで知り合った相手から「二人で将来のためにお金を増やそう。この投資サイトに入金して」と指定口座を提示された。",
    correctChoices: [
      { text: "「SNSで知り合った相手からの投資やお金の話は100%詐欺」と判断し、返信をやめて即座にブロックする", money: 0, explain: "正解！ ロマンス詐欺・投資詐欺の手口だよ！絶対にお金を振り込まずブロックが正解！" }
    ],
    wrongChoices: [
      { text: "親切に教えてくれたお礼として、お小遣いから1万円だけ試しに指定された投資口座へ振り込んでみる", money: -25000, damageType: "money", explain: "ロマンス投資詐欺だよ！一度振り込んだお金は二度と戻らず、さらにお金を要求されるよ！" },
      { text: "「本当に出金できるか確認したいので、まず少額引き出す手順を教えて」とやり取りを続ける", money: -15000, damageType: "money", explain: "偽アプリ上で一時的に利益が出たように見せかけられ、さらに多額の入金を迫られます。" },
      { text: "投資は断るが、「友達として仲良くしたい」と自分の顔写真や住んでいる最寄り駅を教える", money: -10000, damageType: "personal_info", explain: "個人情報を握られ、脅迫や別の詐欺の標的にされてしまいます。" }
    ]
  },
  {
    id: "q_teen_dark_job", category: "scam", source: "SNSタイムライン", title: "「荷物を運ぶだけ」日給5万円の超高額バイト",
    characterName: "闇バイト勧誘アカウント",
    narration: "「お小遣いが欲しいなと思いながらSNSを見ていると、『#即日日払い #高額バイト #荷物を受け取って運ぶだけ #書類運搬 #日給5万円』という投稿を見つけた。」",
    dialogue: [
      { speaker: "DM相手", line: "「登録金なし、誰でもできる簡単なお仕事です。身分証の写真を送ったら、秘密のテレグラムで指定場所をお知らせします。」" },
      { speaker: "主人公", line: "（荷物を運ぶだけで5万円！？ ちょっと怪しい気もするけど、すぐお金が欲しいな…）" }
    ],
    point: "「荷物を受け取るだけ」「高額日払い」は特殊詐欺の『受け子・出し子』の闇バイトです。一度身分証を送ると脅されて抜け出せなくなります。",
    notification: "📱ピコン バイト募集への返信",
    bg: IMAGE_ASSETS.backgrounds.schoolRoute,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.darkJobScam,
    desc: "「指定場所で荷物を受け取って運ぶだけで日給5万円。身分証の写真を送ってください」と闇バイトの勧誘を受けた。",
    correctChoices: [
      { text: "「仕事内容に対して報酬が異常に高すぎる。特殊詐欺の闇バイト（受け子）だ！」と見抜いて絶対に応募せず通報する", money: 0, explain: "正解！ 闇バイトに一度でも手を染めると逮捕され一生を棒に振ります。絶対に応募してはダメ！" }
    ],
    wrongChoices: [
      { text: "荷物を運ぶだけなら怪しくないと思い、生徒手帳と保険証の写真を送って応募する", money: -25000, damageType: "personal_info", explain: "闇バイトです！個人情報を握られ、実家や家族を脅されて犯罪の実行役から抜け出せなくなります。" },
      { text: "「違法な仕事じゃないですよね？」とDMで質問し、相手が「合法です」と言ったので信用する", money: -20000, damageType: "personal_info", explain: "犯罪グループが「違法です」と言うはずがありません。言いくるめられて犯罪に加担させられます。" },
      { text: "友達に「日給5万円のバイト見つけたから一緒に行かない？」と誘う", money: -25000, damageType: "personal_info", explain: "友達まで犯罪グループに売り渡してしまい、重大な刑事事件に巻き込まれます。" }
    ]
  },
  {
    id: "q_teen_ticket_scam", category: "scam", source: "SNS投稿", title: "「ライブ良席チケット定価で譲ります」",
    characterName: "チケット譲渡アカウント",
    narration: "「大好きな推しグループの完売したライブチケットを探していると、SNSで『チケットお譲りします』という投稿を見つけた。」",
    dialogue: [
      { speaker: "譲渡希望者", line: "「アリーナ最前列のチケットが2枚余っています。定価でお譲りしますので、PayPayで送金後に電子チケットを分配します！」" },
      { speaker: "主人公", line: "（どうしても行きたかったライブだ！先にお金を送ればチケットがもらえるんだよね…？）" }
    ],
    point: "SNSでのチケット個人間売買は、先にお金を送金させた後にアカウントを消去して逃げる詐欺が多発しています。",
    notification: "📱ピコン チケット譲渡のDM",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.ticketResaleScam,
    desc: "「完売した人気チケットを定価で譲る。PayPayで先払いしてくれたら電子チケットを送る」と連絡が届いた。",
    correctChoices: [
      { text: "「SNS上での個人間先払い取引はチケット詐欺の典型」と判断し、主催者公式の公式トレード（リセール）以外では取引しない", money: 0, explain: "正解！ 個人間の先払い取引は99%詐欺です。チケットは公式トレードで購入しましょう。" }
    ],
    wrongChoices: [
      { text: "どうしてもライブに行きたいので、指示された通りPayPayで代金12,000円を先送りする", money: -15000, damageType: "money", explain: "チケット詐欺です！送金した瞬間にブロックされ、チケットは一切送られてきません。" },
      { text: "相手に「身分証の写真を送ってくれたら先払いします」と条件を出し、送られてきた学生証の画像を見て信用する", money: -15000, damageType: "money", explain: "送られてくる身分証は他人の悪用画像です。結局お金を持ち逃げされてしまいます。" },
      { text: "「半額だけ先に送る」と交渉して6,000円だけ送金する", money: -10000, damageType: "money", explain: "半額であってもお金を奪われ、チケットは手に入りません。" }
    ]
  },
  {
    id: "q_teen_copyright_dm", category: "scam", source: "Instagram DM", title: "「あなたの投稿が著作権侵害で通報されました」",
    characterName: "偽著作権サポート",
    narration: "「SNSを開くと、英語と日本語が混ざった公式風のアカウントから警告DMが届いていた。」",
    dialogue: [
      { speaker: "偽サポート", line: "「【著作権侵害の警告】あなたの投稿が著作権を侵害していると通報されました。24時間以内にリンクから異議申し立てを行わない場合、アカウントが永久削除されます。」" },
      { speaker: "主人公", line: "（アカウントが削除されたら友達の写真も全部消えちゃう…急いで確認しなきゃ！）" }
    ],
    point: "「著作権侵害」「アカウント凍結」で焦らせ、偽ログイン画面にパスワードを入力させてアカウントを乗っ取るフィッシング詐欺です。",
    notification: "📱ピコン 【警告】著作権侵害通知",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.copyrightDmScam,
    desc: "「著作権侵害で通報された。24時間以内にリンクからログインして異議申し立てしないと削除する」とDMが届いた。",
    correctChoices: [
      { text: "DM内の不審なリンクは絶対に開かず、公式アプリ内の「設定・ヘルプ＞サポート受信トレイ」から正規の警告通知の有無を確認する", money: 0, explain: "正解！ アカウント乗っ取りを狙った偽警告です。公式サポート画面から確認するのが安全です。" }
    ],
    wrongChoices: [
      { text: "アカウント削除を避けるため、DM内のリンクを開いて現在のログインIDとパスワードを入力する", money: -20000, damageType: "account", explain: "アカウント乗っ取りです！パスワードを奪われ、友達に詐欺メッセージを勝手に送信されてしまいます。" },
      { text: "「どの投稿が侵害ですか？」とDM宛てに返信して異議を唱える", money: -5000, damageType: "account", explain: "返信すると「確認のためパスワードを教えて」と騙され、乗っ取り被害に遭います。" },
      { text: "焦って自分のアカウントの全投稿とプロフィール写真をすべて削除する", money: -5000, damageType: "money", explain: "偽の警告に慌てて大切な思い出の投稿を自ら失ってしまうことになります。" }
    ]
  },
  {
    id: "q_teen_ai_fake_ad", category: "scam", source: "SNS動画広告", title: "有名人出演の「最新スマホ副業アプリ」",
    characterName: "AI副業広告",
    narration: "「SNSのショート動画を見ていると、大人気タレントが出演する『誰でも月20万稼げる副業アプリ』の広告が流れてきた。」",
    dialogue: [
      { speaker: "有名タレント（AI偽動画）", line: "「私もこのアプリを毎日使ってます！今だけ登録料無料で特別なボーナスがもらえますよ！」" },
      { speaker: "主人公", line: "（あの有名なタレントが本人の声でおすすめしてる！ 本当に稼げるアプリなのかな？）" }
    ],
    point: "AI技術（ディープフェイク）で有名人の声や口の動きを精巧に偽装した詐欺広告です。有名人がSNS広告で副業や投資を勧めることはありません。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.aiFakeAdScam,
    desc: "有名人が動画で「私も使っている」と副業アプリをおすすめしている広告が表示された。",
    correctChoices: [
      { text: "タレントの口の動きや声の不自然さを確認し、「AIで捏造されたディープフェイク偽広告」と見抜いてインストールしない", money: 0, explain: "正解！ 生成AIを悪用したディープフェイク偽広告です。タレントが副業を勧める広告は詐欺です。" }
    ],
    wrongChoices: [
      { text: "大好きなタレント本人が動画で話しているのだから本物だと信じ、アプリをダウンロードして銀行口座を登録する", money: -20000, damageType: "personal_info", explain: "AI偽広告です！登録した口座情報や個人情報を抜き取られ、高額な課金トラブルに遭ってしまいます。" },
      { text: "「有名人が出ているなら安心」と友達に動画をシェアして一緒に登録しようと勧める", money: -15000, damageType: "personal_info", explain: "友達にも被害を拡大させてしまい、人間関係トラブルに発展します。" },
      { text: "アプリのレビュー欄に並ぶ「本当に稼げました！」という高評価コメントを見て信用する", money: -15000, damageType: "money", explain: "レビュー欄のサクラ投稿に騙され、登録手数料名目でお金を騙し取られてしまいます。" }
    ]
  }
];

/* =========================================================
   【一般（大人）モード用問題プール】（全16問）
   難易度：最高難易度（税務・OTP・API・サブスク・投資・出資）
   ========================================================= */
const QUESTIONS_ADULT = [
  {
    id: "q_adult_police_paypay_scam", category: "scam", source: "Eメール/Gmail", title: "県警察を装う「PayPayアカウント不正利用・法的措置」通知",
    characterName: "偽警察・サイバー課",
    narration: "「仕事の合間にスマートフォンのメールを確認すると、『大分県警察』を名乗る不審なメールが届いていた。」\n内容：【重要】あなたのPayPayアカウントが特殊詐欺事件に利用されている可能性が確認されました。至急確認を行わない場合、アカウントの利用停止や法的措置の対象となる場合があります。",
    dialogue: [
      { speaker: "県警察偽装メール", line: "下記URLより本人確認を行ってください。\nhttps://paypay-secure-check.com\n※ご不明な点がございましたら、PayPay公式サポートまでお問い合わせください。" },
      { speaker: "あなた", line: "（警察からのメールで『PayPay不正利用』や『法的措置』と書かれている…今すぐ確認しないとまずいだろうか…？）" }
    ],
    point: "警察や公的機関が民間のメールやリンクからPayPayや銀行の本人認証・パスワード入力を求めることは絶対にありません。公式アプリから直接確認しましょう。",
    notification: "📱ピコン 【大分県警察】PayPay不正利用の警告",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.gmailPolice,
    desc: "「PayPayが詐欺に利用された疑い。至急リンクから本人確認しないと法的措置へ移行します」と警察名義のメールが届いた。",
    correctChoices: [
      { text: "メール本文のリンクは一切押さず、スマートフォンの正規PayPayアプリを直接起動してアカウント警告の有無を確認する", money: 0, explain: "正解！ 警察と決済サービスを組み合わせた最新のフィッシング詐欺です。自ら公式アプリを開いて確認するのが鉄則です。" }
    ],
    wrongChoices: [
      { text: "法的措置を回避するため、メール記載のリンク先（paypay-secure-check.com）でPayPayログイン情報と認証コードを入力する", money: -25000, damageType: "account", explain: "フィッシング詐欺です！PayPayアカウントが乗っ取られ、残高や連携銀行から全額不正送金されてしまいます。" },
      { text: "メールに記載された「問い合わせ窓口」の電話番号へ連絡し、警察の担当者へ事実確認を行う", money: -15000, damageType: "personal_info", explain: "詐欺グループの偽窓口に繋がり、「身の潔白を証明するため別口座へ預金を退避させろ」と指示されます。" },
      { text: "メールの差出人ドメインを確認せず、「大分県警察」という署名を信用して記載の異議申し立てフォームを送信する", money: -20000, damageType: "personal_info", explain: "個人情報が詐欺犯に渡り、警察を騙るさらなる二次被害に巻き込まれます。" }
    ]
  },
  {
    id: "q_adult_subsc_scam", category: "scam", source: "SMS通知", title: "「クラウド動画サービス 自動更新完了通知」",
    characterName: "偽サブスク窓口",
    narration: "業務の合間にスマホを見ると、1件のSMSが届いていました。\n内容：【重要】会員登録中の動画見放題プラン（月額49,800円）が自動更新されました。本日24時を過ぎると返金不可となります。退会・解約希望窓口：050-XXXX-XXXX",
    dialogue: [
      { speaker: "SMS通知", line: "心当たりのない登録・誤登録の解約手続きはお電話にて承ります。" },
      { speaker: "あなた", line: "（月額5万円近い高額プラン！？ 無料お試し期間で解約し忘れていたのだろうか…？）" }
    ],
    point: "実在しない契約や身に覚えのない自動更新を装い、焦らせて電話をかけさせ、解約手数料名目で電子マネーや振込を迫る架空請求詐欺です。",
    notification: "📱ピコン 【重要】自動更新のお知らせ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.gmailDelivery,
    desc: "「月額49,800円が自動更新されました。本日中に解約希望の方は記載の電話番号へ」とSMSが届いた。",
    correctChoices: [
      { text: "SMS記載の電話番号には絶対にかけず、普段利用している正規配信サービスのマイページやカード明細から契約状況を確認する", money: 0, explain: "正解！ 架空請求詐欺です。相手が提示した連絡先ではなく、公式マイページで契約状況を確認するのが鉄則です。" }
    ],
    wrongChoices: [
      { text: "本日中の自動引き落としを止めるため、記載された050番号へ直ちに電話をかけて解約を申し出る", money: -25000, damageType: "money", explain: "詐欺グループに繋がり、「解約には保証金が必要」「今日中にコンビニで決済を」と騙し取られてしまいます。" },
      { text: "「登録した覚えがありません。即時返金してください」とSMSに直接返信する", money: -10000, damageType: "personal_info", explain: "電話番号がアクティブであることが伝わり、脅迫的な架空請求SMSが大量に届くようになります。" },
      { text: "焦ってクレジットカード会社に電話し、すべてのカードを即時解約・利用停止にする", money: -5000, damageType: "money", explain: "公共料金等の正規の自動引き落としまで停止し、再発行手続きに多大な支障が出ます。（-5,000円）" }
    ]
  },
  {
    id: "q_adult_etax_scam", category: "scam", source: "Eメール", title: "国税庁・e-Tax「還付金の受取手続き」通知",
    characterName: "自称・国税庁税務相談課",
    narration: "メールボックスに「国税庁 e-Tax」を名乗る重要メールが届きました。\n内容：【重要】過年度の確定申告にかかる還付金（38,400円）の送金準備が完了いたしました。受取口座の有効期限が迫っておりますので、下記リンクより払戻先口座情報を照会してください。",
    dialogue: [
      { speaker: "e-Tax偽装メール", line: "認証URL：https://e-tax.nta-go-jp.secure-receive.com（※24時間以内にログインしてください）" },
      { speaker: "あなた", line: "（確定申告の還付金か？ ちょうど確定申告の時期だし本物に見えるが…）" }
    ],
    point: "国税庁や税務署がメールの直リンクから口座番号やクレジットカード情報、暗証番号を入力させることは絶対にありません。ドメイン末尾の偽装（.comなど）に要注意です。",
    notification: "📱ピコン 【国税庁】還付金のお受け取りについて",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.etaxScam,
    desc: "「確定申告の還付金38,400円の送金手続き。リンクより受取口座とカード情報を入力してください」とメールが届いた。",
    correctChoices: [
      { text: "URLドメインの末尾が「.com」である偽サイトと見破り、メールのリンクは開かずブラウザのブックマークから正規e-Taxへログインする", money: 0, explain: "正解！ フィッシング詐欺です。公的機関の重要通知は自らブックマークや検索から公式サイトへログインして確認しましょう。" }
    ],
    wrongChoices: [
      { text: "還付金の受け取り期限が切れる前に、メール記載のURLを開いて銀行口座番号と暗証番号を入力する", money: -25000, damageType: "account", explain: "フィッシング詐欺です！入力した口座情報から不正送金され、預金をすべて奪われてしまいます。" },
      { text: "「受取手数料」としてクレジットカード情報の入力を求められたので、カード番号とセキュリティコードを入力する", money: -25000, damageType: "personal_info", explain: "国税庁が還付金の送金にクレカ入力を求めることはありません。カード情報を抜き取られます。" },
      { text: "メール本文の差出人表示が「国税庁 <info@nta.go.jp>」になっているのを確認して安心しリンクを開く", money: -20000, damageType: "account", explain: "差出人アドレスの表示名は簡単に偽装できます。リンク先URLのドメインを見極める必要があります。" }
    ]
  },
  {
    id: "q_adult_bank_otp_scam", category: "scam", source: "SMS通知", title: "都市銀行を騙る「第三者不正ログイン検知」",
    characterName: "偽銀行セキュリティ",
    narration: "スマートフォンのSMSに、口座を保有している大手都市銀行から緊急通知が届きました。\n内容：【〇〇銀行】異常な取引を検知したため、お取引を一時規制しております。ご本人様によるご確認はこちらから手続きを行ってください。http://bank-security-verify.net",
    dialogue: [
      { speaker: "偽サイト画面", line: "本人確認のため、店番号・口座番号・ログインパスワードおよび、スマホに届いたワンタイムパスワードを入力してください。" },
      { speaker: "あなた", line: "（口座が止められたら仕事の支払いも滞る…すぐに解除しなきゃ…）" }
    ],
    point: "「不正利用検知」で焦らせ、本物の銀行から届いたワンタイムパスワード（OTP）を入力させ、リアルタイムで犯人の口座へ全額不正送金する手口です。",
    notification: "📱ピコン 【重要】取引規制のお知らせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.bankOtpScam,
    desc: "「不正ログイン検知のため口座規制中。ワンタイムパスワードを入力して解除してください」とSMSが届いた。",
    correctChoices: [
      { text: "SMSのリンクは絶対に開かず、普段使っている正規の公式バンキングアプリを直接起動して取引履歴と規制の有無を確認する", money: 0, explain: "正解！ ワンタイムパスワード搾取型の最悪のフィッシング詐欺です。公式アプリから直接確認することで被害を完全に防げました。" }
    ],
    wrongChoices: [
      { text: "取引規制を解除するため、SMSのリンク先で口座情報とスマートフォンに届いたワンタイムパスワードを入力する", money: -25000, damageType: "account", explain: "入力した瞬間に犯人側の送金が完了し、口座の預金が全額他口座へ不正送金されてしまいます。" },
      { text: "「ワンタイムパスワードは送金用のものだから関係ないだろう」とログインパスワードだけ入力する", money: -20000, damageType: "account", explain: "ログイン情報を奪われ、登録メールアドレスや電話番号を勝手に書き換えられてしまいます。" },
      { text: "SMSに記載された認証用電話番号へ電話をかけ、音声ガイダンスに従って暗証番号をプッシュ入力する", money: -25000, damageType: "account", explain: "偽の音声ガイダンスで口座情報を窃取され、即座に不正送金が行われます。" }
    ]
  },
  {
    id: "q_adult_task_scam", category: "scam", source: "LINE/SNS", title: "「SNS動画にいいねするだけ」高額在宅ワーク勧誘",
    characterName: "在宅ワーク仲介者",
    narration: "転職・副業情報サイトを閲覧した後、SNSのダイレクトメッセージで副業のスカウトが届きました。\n相手：「指定されたYouTube動画に『高評価』を押してスクショを送るだけで、1件500円。1日30分で日給15,000円〜30,000円稼げます。」",
    dialogue: [
      { speaker: "副業アシスタント", line: "最初の3回分の報酬1,500円は実際にお振込みしました。次はより高単価のVIPタスク（保証金5万円の入金が必要）へステップアップしましょう！" },
      { speaker: "あなた", line: "（本当に1,500円振り込まれた…！ 保証金5万円を入れればもっと稼げるのかな…？）" }
    ],
    point: "最初に少額の報酬を実際に振り込んで信用させ、高額タスクのために「保証金」や「システム手数料」を振り込ませて連絡を絶つ『タスク副業詐欺』です。",
    notification: "📱ピコン 副業スカウトのメッセージ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.lineSidejob,
    desc: "「動画にいいねするだけで日給3万円。信用確認のため最初に保証金5万円を入金してください」と勧誘された。",
    correctChoices: [
      { text: "「報酬を得るために先にお金を支払わせる副業は100%詐欺」と見抜き、保証金は一切振り込まず即座にブロック・通報する", money: 0, explain: "正解！ 典型的なタスク副業詐欺です。最初の少額振込は信用させるための罠。入金せずにブロックが正解です。" }
    ],
    wrongChoices: [
      { text: "実際に1,500円が口座に振り込まれた実績を信用し、指定された口座へ保証金5万円を振り込む", money: -25000, damageType: "money", explain: "副業詐欺です！入金した保証金は引き出せなくなり、「出金には追加で10万円必要」と次々にお金を騙し取られます。" },
      { text: "「保証金は払えないので、少額タスク（500円）だけ続けさせてほしい」と交渉する", money: -10000, damageType: "personal_info", explain: "タスク報酬の受取名目で口座情報や身分証を要求され、悪用されてしまいます。" },
      { text: "「友達を紹介したら紹介料がもらえる」と言われ、同僚にこの副業を紹介する", money: -20000, damageType: "personal_info", explain: "同僚を詐欺被害に巻き込み、自身の信用も完全に失墜してしまいます。" }
    ]
  },
  {
    id: "q_adult_invest_scam", category: "scam", source: "SNS広告/LINE", title: "著名経済アナリストを騙る「秘密の投資勉強会」",
    characterName: "自称・著名アナリストの助手",
    narration: "SNSを見ていると、テレビでも有名な経済アナリストの写真を使った投資広告が表示され、LINEの投資グループに招待されました。\n相手：「勝率92%のAI自動売買システムを、グループ限定で無料公開します。指示通りに指定の海外取引所へ入金してください。」",
    dialogue: [
      { speaker: "グループ参加者（サクラ）", line: "先生の指示通りに入金したら、昨日だけで30万円利益が出ました！ 本当に感謝です！" },
      { speaker: "あなた", line: "（グループの全員が儲かっていると投稿している…少額なら試してみる価値はあるか…？）" }
    ],
    point: "有名人の肖像を無断悪用した偽広告からLINEグループへ誘導し、サクラ全員で煽って偽の投資アプリへ入金させる『SNS型投資詐欺』です。",
    notification: "📱ピコン 投資勉強会へのご案内",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.youtuberScam,
    desc: "有名アナリストの偽LINEグループで「全員が儲かっている。指定の投資プラットフォームに入金して」と指示された。",
    correctChoices: [
      { text: "著名人の公式SNS等で投資勧誘偽広告への注意喚起を確認し、指定された取引所への入金は一切行わずグループを退会・通報する", money: 0, explain: "正解！ SNS型投資詐欺です。有名人の偽広告やグループ内のサクラの投稿に惑わされず、正しく見抜きました。" }
    ],
    wrongChoices: [
      { text: "他の参加者の利益報告を見て信頼できると判断し、推奨された専用取引所アプリへ10万円を入金する", money: -25000, damageType: "money", explain: "SNS型投資詐欺です！画面上の残高は増えているように見せかけられますが、実際には出金できず全額奪われます。" },
      { text: "「まずはお試しで1万円だけ」と個人名義の指定振込先へ入金し、取引画面の利益推移を見る", money: -15000, damageType: "money", explain: "偽の利益画面を見せられ、「もっと入金すれば数千万円になる」と言葉巧みに大金を振り込まされます。" },
      { text: "先生の助手（自称）に「元本保証の契約書を発行してほしい」と依頼し、送られてきたPDFを見て安心する", money: -25000, damageType: "money", explain: "偽造された契約書です。出資法違反の投資詐欺に騙され、全額持ち逃げされてしまいます。" }
    ]
  },
  {
    id: "q_adult_fire_insurance_scam", category: "scam", source: "電話/訪問", title: "「火災保険で実質無料リフォーム」申請代行勧誘",
    characterName: "住宅診断コンサルタント",
    narration: "自宅に「住宅災害調査協会」と名乗る業者から連絡がありました。\n相手：「台風や大雪の被害として申請すれば、ご自宅のリフォームが火災保険金で全額無料になります。申請手続きは弊社が代行しますので自己負担は一切ありません。」",
    dialogue: [
      { speaker: "業者", line: "保険会社への申請理由はこちらで『自然災害による破損』として書類を作成します。成功報酬として保険金の35%をいただきます。" },
      { speaker: "あなた", line: "（経年劣化の傷みも自然災害として保険申請できるのだろうか…？）" }
    ],
    point: "経年劣化を自然災害と偽って保険請求することは保険金詐欺（犯罪）に加担させられる恐れがあり、高額な解約手数料や違約金を請求されるトラブルが多発しています。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: null,
    desc: "「火災保険を使えば自己負担ゼロで修繕できる。申請理由は自然災害として代行する」と契約を迫られた。",
    correctChoices: [
      { text: "「経年劣化を自然災害と偽って申請することは不正請求（犯罪）になる」と断り、加入中の保険会社へ直接相談する", money: 0, explain: "正解！ 不正請求トラブルです。経年劣化を災害と偽る申請は犯罪に巻き込まれるリスクがあります。正規の保険会社へ相談が鉄則です。" }
    ],
    wrongChoices: [
      { text: "自己負担ゼロで自宅のリフォームができるなら得だと考え、申請代行および修繕工事の委任状にサインする", money: -20000, damageType: "money", explain: "保険会社から不正申請と判定されて保険金が下りず、業者からは高額な違約金や工事費を全額自腹で請求されてしまいます。" },
      { text: "「保険金が下りなかった場合はキャンセルできるか」を確認し、キャンセル無料と言われたので契約する", money: -15000, damageType: "money", explain: "口約束は無視され、「申請書類作成費用」など別の名目で多額の違約金を請求されます。" },
      { text: "業者の指示通り、保険会社の鑑定人に対して「先月の強風で壊れた」と虚偽の口裏合わせを行う", money: -25000, damageType: "money", explain: "保険金詐欺の共犯として保険契約を強制解除され、損害賠償請求を受ける重大なリスクを負います。" }
    ]
  },
  {
    id: "q_adult_card_real", category: "real", source: "クレジットカード会社", title: "【公式】オンラインショッピング利用時の「3Dセキュア認証」",
    characterName: "カード会社公式認証",
    narration: "自ら公式オンラインストアでノートパソコンを購入し、決済ボタンを押したところ、カード会社の「本人認証サービス（3Dセキュア）」の画面が表示されました。\n画面：『お取引内容：〇〇公式ストア / 金額：88,000円。ご登録のカード会社公式ワンタイム認証アプリまたはSMSで届いたワンタイムパスワードをご入力ください。』",
    dialogue: [
      { speaker: "あなた", line: "（自分で今まさに購入手続きをしている最中の認証画面だ。金額と店舗名も一致している。）" }
    ],
    point: "自らが購入手続きを行っている最中に表示され、決済金額や利用加盟店名が正確に一致している正規の3Dセキュア画面は、安全な本人認証です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.shoppingAd,
    desc: "自分で買い物をしている最中に、金額と店舗名が正確に一致するカード会社の3Dセキュア画面が表示された。",
    correctChoices: [
      { text: "購入店舗名と請求金額が正しいことを確認した上で、正規のワンタイムパスワードを入力して決済を完了する", money: 300, explain: "正解！ 自分が操作中の正規な3Dセキュア認証です。金額と店舗名の照合を行なった上で安全に購入できました。（+300円）" }
    ],
    wrongChoices: [
      { text: "「ワンタイムパスワードを求める画面はすべて詐欺だ」と思い込み、ブラウザを強制終了して購入を破棄する", money: -5000, damageType: "money", explain: "ミス！ 自分で正規サイトで購入している最中の正規セキュリティ認証です。過剰反応すると正規の買い物ができなくなります。（-5,000円）" },
      { text: "認証画面を無視して、同じサイトで別のクレジットカードを使って何度も決済を試行する", money: -5000, damageType: "money", explain: "不正アタックと判定され、カード決済が一時的にロックされてしまいます。（-5,000円）" },
      { text: "カード会社に電話もせず、「カードがハッキングされた」とSNSにカード表面の写真をアップする", money: -15000, damageType: "personal_info", explain: "写真からカード情報が流出し、本物の不正利用被害に遭ってしまいます。" }
    ]
  },
  {
    id: "q_adult_biz_cloud_real", category: "real", source: "クラウドサービス", title: "【公式】業務管理クラウド「APIセキュリティ仕様変更」のお知らせ",
    characterName: "クラウドサービス運営",
    narration: "普段業務で契約・利用しているクラウド管理サービスから、登録メールアドレスにお知らせが届きました。\n内容：【重要なお知らせ】セキュリティ強化に伴い、来月15日より旧形式APIのサポートを終了いたします。現在連携機能をご利用のお客様は、公式管理コンソール（ブックマーク）より最新バージョンへの設定更新をお願いいたします。",
    dialogue: [
      { speaker: "公式通知", line: "※本メールに直接のログイン認証リンクはございません。ブラウザのお気に入り等から管理画面へサインインしてください。" }
    ],
    point: "直接のログインURLを記載せず、公式管理画面への自発的アクセスを促す定期的な仕様変更やセキュリティアップデートの連絡は本物の正規通知です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.lineOfficial,
    desc: "「セキュリティ仕様変更のお知らせ。設定確認はブックマークの管理画面から行ってください（直リンクなし）」との通知。",
    correctChoices: [
      { text: "ブラウザのブックマークから正規の管理コンソールへサインインし、公式アナウンスとAPI連携状況を確認する", money: 300, explain: "正解！ 直リンクのない正規の仕様変更通知です。自ら安全なルートでログインして正しく確認できました。（+300円）" }
    ],
    wrongChoices: [
      { text: "「業務メールを装った標的型攻撃メールに違いない」と決めつけ、メールを読まずに削除して放置する", money: -5000, damageType: "money", explain: "ミス！ 本物の業務通知を放置すると、来月以降にシステム連携が停止して業務に支障が出てしまいます。（-5,000円）" },
      { text: "メールの差出人アドレスへ「APIキーの更新をお願いします」と社内APIキーを本文に書いて返信する", money: -20000, damageType: "account", explain: "機密情報であるAPIキーを平文メールで送信することは重大なセキュリティ事故に繋がります。" },
      { text: "ネットで「API仕様変更の回避ツール」を検索し、出所の不確かなスクリプトを社内環境で実行する", money: -25000, damageType: "account", explain: "社内ネットワークにマルウェアを感染させ、重大なインシデントを引き起こしてしまいます。" }
    ]
  },
  {
    id: "q_adult_colleague_help", category: "help", source: "職場（オフィス）", title: "同僚のPCに表示された「Microsoft偽警告画面」",
    characterName: "職場の同僚",
    narration: "オフィスのデスクで仕事をしていると、隣の同僚が青ざめた顔で受話器を持ち、大音量の警告音が鳴るノートPCの画面を見つめていました。\n同僚：「急に『スパイウェア感染！PCがロックされました』って警告が出て…画面のサポート窓口に電話したら、今すぐ遠隔操作ソフトを入れて電子マネーで修理代を払えと言われてるんだけど…」",
    dialogue: [
      { speaker: "同僚", line: "会社の情報が漏洩したら私の責任になる…急いで言われた通りにお金を払った方がいいよね…！？" }
    ],
    point: "全画面表示の警告音付き画面はWebブラウザ上の偽物（サポート詐欺）です。電話の指示に従って遠隔操作ソフトを入れると、社内ネットワーク情報や機密データが窃取されます。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.adScam,
    desc: "職場の同僚がPCの偽警告画面にパニックになり、電話の指示で遠隔操作ソフトを入れて電子マネーを払おうとしている。",
    correctChoices: [
      { text: "「ブラウザに表示されているだけの偽サポート詐欺だよ！今すぐ電話を切って、LANケーブルを抜いて社内の情シス部門へ連絡しよう！」と同僚を制止する", money: 300, explain: "✨ 職場を救った！サポート詐欺の手口です。電話を切らせてブラウザを終了させ、会社の機密流出と金銭被害を未然に防ぎました！（お礼+300円）" }
    ],
    wrongChoices: [
      { text: "会社の情報漏洩を防ぐため、同僚と一緒に急いでコンビニへ走り社費で電子マネーを購入してくる", money: -25000, damageType: "money", explain: "サポート詐欺に加担してしまい、会社のパソコンを遠隔操作され金銭と機密情報を奪われてしまいました。" },
      { text: "「早く直るなら遠隔操作してもらった方がいい」と同僚のPC操作を手伝う", money: -25000, damageType: "account", explain: "社内ネットワークにバックドアを仕掛けられ、ランサムウェア等の甚大な企業被害に発展します。" },
      { text: "パニックになる同僚を横目に、「自分のPCじゃないから」と何もせず放置する", money: -15000, damageType: "money", explain: "社内の機密情報が流出し、会社全体で数千万円規模のセキュリティインシデントに発展してしまいます。" }
    ]
  },
  {
    id: "q_adult_customs_scam", category: "scam", source: "スマートフォンSMS", title: "税関・国際郵便を装う「通関手数料・関税未納」通知",
    characterName: "自称・日本税関通関部",
    narration: "スマートフォンに「日本税関」を名乗る緊急SMSが届きました。\n内容：【日本税関】海外から発送されたお荷物について関税（2,980円）が未納のため通関手続きが保留されています。本日中にご納付がない場合、商品は廃棄処分となります。関税支払いサイト：http://customs-japan-tax.vip",
    dialogue: [
      { speaker: "SMS通知", line: "支払い方法：クレジットカード決済 / Appleギフトカード決済" },
      { speaker: "あなた", line: "（海外通販で頼んだ荷物があったかもしれない…関税が2980円なら払うべきか…？）" }
    ],
    point: "税関が個人の携帯電話へSMSで直接関税の納付を要求したり、ギフトカードで支払わせることは絶対にありません。国際郵便の関税は通常、配達時の着払いまたは正規納付書で行われます。",
    notification: "📱ピコン 【税関】関税未納通知",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.customsScam,
    desc: "「国際郵便の関税2,980円が未納のため保留中。本日中にリンクから支払わないと破棄します」とSMSが届いた。",
    correctChoices: [
      { text: "「税関がSMSで直接支払いやギフトカード決済を求めることは絶対にない」と見抜き、リンクを開かず削除する", money: 0, explain: "正解！ 税関を騙るスミッシング詐欺です。ギフトカードやSMS決済を要求する手口を見事に回避しました。" }
    ],
    wrongChoices: [
      { text: "荷物が廃棄処分されるのを防ぐため、リンクを開いてクレジットカード番号を入力し関税を決済する", money: -20000, damageType: "personal_info", explain: "フィッシング詐欺です！入力したカード情報が盗まれ、高額な不正利用被害に遭ってしまいます。" },
      { text: "「少額ならギフトカードの方が安全だろう」とAppleギフトカードを購入してコードを送信する", money: -15000, damageType: "money", explain: "ギフトカードの残高は即座に犯人に使われ、荷物も届きません。" },
      { text: "SMS記載のリンク先で海外通販サイトのアカウントIDとパスワードを入力して配送状況を確認する", money: -20000, damageType: "account", explain: "通販アカウントを乗っ取られ、登録済みのクレジットカードで勝手に高額商品を購入されてしまいます。" }
    ]
  },
  {
    id: "q_adult_myna_scam", category: "scam", source: "スマートフォンSMS", title: "デジタル庁を装う「マイナンバーカード有効期限切れ」通知",
    characterName: "自称・デジタル庁ポータル",
    narration: "スマートフォンに「デジタル庁」を名乗る緊急SMSが届きました。\n内容：【デジタル庁】マイナンバーカードの電子証明書が有効期限切れを迎えています。本日中に再登録されない場合、健康保険証連携および公金受取口座が一時停止されます。更新手続き：http://myna-portal-auth.com",
    dialogue: [
      { speaker: "あなた", line: "（マイナ保険証が使えなくなったら病院で困るな…今すぐ暗証番号を入力して更新すべきか…？）" }
    ],
    point: "デジタル庁や自治体がSMSでマイナンバーカードの暗証番号や暗証コードの再入力を求めることは絶対にありません。更新は必ず市区町村窓口で行われます。",
    notification: "📱ピコン 【デジタル庁】電子証明書更新のお知らせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.mynaPortalScam,
    desc: "「マイナンバーカードの電子証明書が期限切れ。本日中に暗証番号を再登録してください」とSMSが届いた。",
    correctChoices: [
      { text: "「行政機関がSMSで電子証明書の更新や暗証番号入力を求めることはない」と見抜き、リンクを開かず削除する", money: 0, explain: "正解！ マイナンバー情報を狙うフィッシング詐欺です。電子証明書の更新は市区町村窓口で行われます。" }
    ],
    wrongChoices: [
      { text: "保険証や公金口座が使えなくなると困るので、リンクを開いてマイナンバー・氏名・暗証番号4桁を入力する", money: -25000, damageType: "personal_info", explain: "フィッシング詐欺です！大切なマイナンバー情報と暗証番号が詐欺グループに渡ってしまいます。" },
      { text: "「本物のマイナポータルか確かめよう」と、リンク先でマイナンバーカードの表裏写真をアップロードする", money: -25000, damageType: "personal_info", explain: "本人確認書類を丸ごと奪われ、勝手にオンライン銀行口座や消費者金融を開設されてしまいます。" },
      { text: "SMSに記載された更新窓口の電話番号へ電話し、オペレーターに暗証番号を口頭で伝える", money: -20000, damageType: "personal_info", explain: "詐欺グループに個人情報が渡り、不正アクセス被害に遭ってしまいます。" }
    ]
  },
  {
    id: "q_adult_utility_scam", category: "scam", source: "スマートフォンSMS", title: "電力会社を騙る「未払い料金による供給停止予告」",
    characterName: "自称・電力供給センター",
    narration: "スマートフォンのSMSに、電力会社を名乗る緊急警告が届きました。\n内容：【〇〇電力】電気料金（4,980円）の未払いが確認されました。本日18時までにお支払いが確認できない場合、電力の供給を停止いたします。至急お支払いください：http://power-pay-bill.net",
    dialogue: [
      { speaker: "あなた", line: "（電気を止められたら生活も仕事もできない！ 4,980円ならすぐリンクから払ってしまおうか…？）" }
    ],
    point: "「本日夕方に電気を止める」など極度の焦りを生む文面はスミッシング詐欺の典型です。正規の電力会社は書面での予告なしに突然SMSで即日送電停止を通告することはありません。",
    notification: "📱ピコン 【警告】電力供給停止予告",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.utilityScam,
    desc: "「電気料金未払いのため本日18時に電力供給を停止します。至急リンクから支払ってください」とSMSが届いた。",
    correctChoices: [
      { text: "SMS記載のリンクは絶対に開かず、紙の検針票に記載された公式コールセンターまたは正規マイページで未払いの有無を確認する", money: 0, explain: "正解！ ライフライン停止を騙るスミッシング詐欺です。焦ってリンクから決済せず自発的に公式確認できました。" }
    ],
    wrongChoices: [
      { text: "今晩電気が止まると生活できないので、リンクを開いてクレジットカード情報を入力し4,980円を支払う", money: -20000, damageType: "personal_info", explain: "スミッシング詐欺です！入力したカード情報が盗まれ、高額な不正利用被害に遭ってしまいます。" },
      { text: "「クレジットカードが怖いなら電子マネーで」とリンク先の指示に従いVプリカを購入して支払う", money: -15000, damageType: "money", explain: "架空請求詐欺です！電力会社がSMSで電子マネーでの送電停止回避を求めることはありません。" },
      { text: "SMSの発信元番号へ電話をかけ、「引き落とし口座を変更したい」と口座情報を伝える", money: -20000, damageType: "personal_info", explain: "詐欺グループに口座番号と名義を窃取され、不正利用の標的にされます。" }
    ]
  },
  {
    id: "q_adult_ponzi_scam", category: "scam", source: "知人からの紹介/LINE", title: "「月利15%完全自動AIファンド・元本確約」",
    characterName: "投資ファンド紹介者",
    narration: "信頼している知人から「元本保証で毎月確実に15%の配当が出る特別なAI投資ファンドがある」とLINEで紹介されました。\n相手：「プロの機関投資家しか入れない非公開ファンドだよ。今月だけ限定で個人枠が空いたから、一口30万円から投資できるよ。」",
    dialogue: [
      { speaker: "知人", line: "「僕も半年間ずっと毎月4万5千円の配当を受け取れているから絶対に安心だよ！ 契約書もちゃんとしているから！」" },
      { speaker: "あなた", line: "（知人が実際に配当をもらっているなら本当なのかな…？）" }
    ],
    point: "「元本保証（確約）で高利回り」は出資法違反であり、後から入った人の出資金を前の人の配当に回す典型的な『ポンジ・スキーム（投資詐欺）』です。初期は本当に配当が出ますが、突然破綻して全額持ち逃げされます。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.cryptoStakingScam,
    desc: "「元本保証で月利15%の確定配当。知人も実際に配当をもらっている」と一口30万円の投資を勧められた。",
    correctChoices: [
      { text: "「元本保証で月利15%など経済合理上あり得ない（ポンジスキーム詐欺）」と判断し、知人からの出資勧誘をきっぱり断る", money: 0, explain: "正解！ 典型的なポンジスキーム型投資詐欺です。知人自身も騙されている状態を見抜き、被害を回避しました。" }
    ],
    wrongChoices: [
      { text: "知人が実際に配当を受け取っている実績を信じ、指定口座へ一口30万円を振り込んで出資する", money: -25000, damageType: "money", explain: "ポンジスキーム詐欺です！数ヶ月後にファンドは音信不通となり、預けた出資金は1円も戻りません。" },
      { text: "「一口30万円は無理だが、10万円なら試したい」と少額での参加をお願いする", money: -15000, damageType: "money", explain: "少額であっても全額持ち逃げされます。また、知人との人間関係も完全に崩壊します。" },
      { text: "「家族にも相談して、家族の貯金からも追加で出資枠を確保してほしい」と申し出る", money: -25000, damageType: "money", explain: "家族の大切な資産まで巻き込んで数百万円規模の甚大な被害を被ってしまいます。" }
    ]
  },
  {
    id: "q_adult_travel_cancel_scam", category: "scam", source: "Eメール", title: "宿泊予約サイト「予約完了および高額取消料発生」",
    characterName: "偽トラベルカスタマー",
    narration: "メールボックスを開くと、有名ホテル予約サイトを騙る予約確認メールが届いていました。\n内容：【〇〇トラベル】高級リゾートホテル スイートルーム2泊（合計198,000円）のご予約が完了いたしました。本日15時以降のキャンセルはキャンセル料100%が発生いたします。予約の取り消し・照会はこちら：http://travel-booking-cancel.net",
    dialogue: [
      { speaker: "あなた", line: "（予約した覚えがまったくない！ 20万円近く請求されたら大変だ、急いでキャンセルしなきゃ…！）" }
    ],
    point: "身に覚えのない超高額な予約完了メールを送り、「キャンセル料100%」でパニックを起こさせて偽の取消フォームへクレジットカード情報を再入力させる手口です。",
    notification: "📱ピコン 【予約完了】キャンセル料のお知らせ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.travelCancelScam,
    desc: "「身に覚えのない高級ホテル予約（20万円）。本日中の取消はキャンセル料無料、リンクより手続きを」とメールが届いた。",
    correctChoices: [
      { text: "メール記載のリンクは一切開かず、普段利用している正規旅行サイトの公式アプリ・ブックマークにログインして予約履歴が存在しないことを確認する", money: 0, explain: "正解！ 偽の予約完了メールで焦らせるフィッシング詐欺です。正規の予約履歴を確認して冷静に対処できました。" }
    ],
    wrongChoices: [
      { text: "20万円のキャンセル料を請求されるのを防ぐため、メールのリンクを開いてカード情報を再入力しキャンセル手続きを行う", money: -20000, damageType: "personal_info", explain: "フィッシング詐欺です！キャンセル手続きと見せかけてカード情報を抜き取られてしまいます。" },
      { text: "「予約していません。キャンセル料は払いません」とメール宛てに返信して抗議する", money: -10000, damageType: "personal_info", explain: "詐欺グループにアクティブなメールアドレスと認識され、脅迫的な架空請求メールが届くようになります。" },
      { text: "メールに記載された「ホテル現地の電話番号」と称する番号へ電話をかける", money: -15000, damageType: "money", explain: "偽のホテル担当者に繋がり、「キャンセルにはデポジット（預り金）が必要」とお金を騙し取られます。" }
    ]
  },
  {
    id: "q_adult_card_freeze_scam", category: "scam", source: "Eメール", title: "クレジットカード「不正利用検知によるカード一時停止」",
    characterName: "偽カードセキュリティデスク",
    narration: "普段メインで使っているクレジットカード会社からメールが届きました。\n内容：【重要】第三者による不正アクセスの可能性を検知したため、カードの利用を一時停止しております。ご本人様確認およびカード利用再開のお手続きは下記より完了させてください。https://card-member-security.com",
    dialogue: [
      { speaker: "あなた", line: "（メインカードが止められたら公共料金の引き落としも止まってしまう…早く再開させないと…）" }
    ],
    point: "カード会社を装い、カード番号・有効期限だけでなく「裏面セキュリティコード」や「3Dセキュアのパスワード」まで一括で盗み取る巧妙なフィッシングメールです。",
    notification: "📱ピコン 【重要】カード利用停止のお知らせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.policeOrgScam,
    desc: "「カード不正利用を検知し利用停止中。リンクから本人確認とセキュリティ認証を行ってください」とメールが届いた。",
    correctChoices: [
      { text: "メールのリンクは開かず、財布から本物のクレジットカードを取り出して裏面に記載された正規のカスタマー電話番号へ問い合わせる", money: 0, explain: "正解！ 不正検知を装うフィッシング詐欺です。カード裏面の公式デスクへ直接確認するのが最も確実です。" }
    ],
    wrongChoices: [
      { text: "公共料金等の引き落としが止まると困るので、メールのリンクを開いてカード番号・有効期限・セキュリティコードを入力する", money: -25000, damageType: "personal_info", explain: "カード情報搾取詐欺です！セキュリティコードまで盗まれ、海外サイトで限度額いっぱいまで不正決済されてしまいます。" },
      { text: "「カードが止まっているか確かめよう」と、手近なネット通販サイトで高額商品をカード決済してみる", money: -10000, damageType: "money", explain: "不要な注文をしてしまったり、不正利用の検知が遅れる原因になります。" },
      { text: "メールのリンク先でカード会社のWeb明細ログインIDとパスワードだけを入力して確認する", money: -20000, damageType: "account", explain: "会員ページを乗っ取られ、勝手にリボ払い枠やキャッシング枠を利用されてしまいます。" }
    ]
  }
];

function getQuestionChoices(question) {
  let correctChoice = null;
  let wrongChoicesPicked = [];

  if (question.correctChoices && question.correctChoices.length > 0) {
    correctChoice = { ...shuffleArray(question.correctChoices)[0], type: "correct" };
  }

  if (question.wrongChoices && question.wrongChoices.length > 0) {
    wrongChoicesPicked = shuffleArray(question.wrongChoices).slice(0, 3).map(w => ({
      ...w,
      type: "wrong"
    }));
  }

  if (!correctChoice) {
    correctChoice = { text: "公式窓口やブックマークから直接安全に確認する", money: 0, type: "correct", explain: "正解！ 公式ルートで自ら確認するのが最も確実です。" };
  }

  const fallbackWrongs = [
    { text: "記載されたリンクを開き、状況確認のため本人認証を行う", money: -20000, damageType: "personal_info", explain: "危険です！個人情報やアカウント情報を渡してしまいます。" },
    { text: "指示された通りに急いで指定の窓口や口座へ送金手続きを行う", money: -25000, damageType: "money", explain: "危険です！詐欺グループにお金を騙し取られてしまいます。" },
    { text: "相手に返信し、詳しい事情や対応方法を直接聞いて判断する", money: -10000, damageType: "personal_info", explain: "危険です！詐欺犯に言いくるめられて被害が拡大してしまいます。" }
  ];

  let fIdx = 0;
  while (wrongChoicesPicked.length < 3) {
    wrongChoicesPicked.push({ ...fallbackWrongs[fIdx % fallbackWrongs.length], type: "wrong" });
    fIdx++;
  }

  return shuffleArray([correctChoice, ...wrongChoicesPicked.slice(0, 3)]);
}
