/* =========================================================
   data.js
   問題プール定義（4モード各16問・計64問）
   【完全中立・ネタバレ排除・小学生全ルビ・大分県警3原則4択設計】
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
  "月": "新しい1週間の始まりだね！\n落ち着いて進めていこう！",
  "火": "少し慣れてきた頃かな？\n今日も内容をよく確認しよう！",
  "水": "今日でちょうど真ん中！\n焦らず進もう！",
  "木": "木曜日になったよ！\n今日も一日頑張ろう！",
  "金": "もう少しで週末！\n最後までしっかり確認しよう！",
  "土": "いよいよ終盤！\n落ち着いて考えていこう！",
  "日": "今日は最後の日！\n1週間を振り返ってみよう！",
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
  { head: "① 喋らない（話さない・教えない）", desc: "相手へ個人情報、パスワード、暗証番号、画面共有でコードを教えない" },
  { head: "② 払わない（渡さない・買わない）", desc: "急かされても、すぐにお金を振り込まない・電子マネーを買わない" },
  { head: "③ 騙されない（確認する・相談する）", desc: "届いた連絡先や話をそのまま信じず、自ら調べた正規窓口や家族・警察に確認する" }
];

const SKILL_MAP = {
  // 小学生モード
  "elementary_q01": "メールの通知に慌てず大人の人に相談する力",
  "elementary_q02": "プレゼント当選画面の個人情報要求を見抜く力",
  "elementary_q03": "突然の点検訪問を玄関先で断る力",
  "elementary_q04": "別アカウントからの友達の送金要求を確かめる力",
  "elementary_q05": "割引広告に惑わされず公式情報を確認する力",
  "elementary_q06": "ネットの知らない人からの儲け話を断る力",
  "elementary_q07": "コイン増殖の裏ワザを装うアカウント盗難を防ぐ力",
  "elementary_q08": "画面共有による認証コードの流出を防ぐ力",
  "elementary_q09": "有名人を名乗るアカウントからの個人情報要求を見破る力",
  "elementary_q10": "無料コードを口実にした認証情報要求を遮断する力",
  "elementary_q11": "簡単副業を謳う広告を冷静に見極める力",
  "elementary_q12": "ATMで困っているお年寄りを店員に知らせて助ける力",
  "elementary_q13": "電話で慌てる家族を落ち着かせて被害を防ぐ力",
  "elementary_q14": "いつもと違うデザインの公式広告を正しく確認する力",
  "elementary_q15": "不在通知から公式ルートで再配達を依頼する力",
  "elementary_q16": "お店からの期間限定クーポンを正しく確かめる力",

  // 中高生モード
  "teen_q01": "公的機関を名乗る緊急通知の真偽を見抜く力",
  "teen_q02": "配信者を名乗るDMの個人情報要求を見破る力",
  "teen_q03": "通信会社からの正規の通信量通知を扱う力",
  "teen_q04": "宅配通知から正規アプリで照会する力",
  "teen_q05": "ATMで指示を受ける高齢者を周囲と連携して守る力",
  "teen_q06": "突然の無料点検訪問を毅然と断る力",
  "teen_q07": "友達アカウントからの電子マネー要求を直接確認する力",
  "teen_q08": "口座移動を迫る電話から家族を守る力",
  "teen_q09": "公式SNSキャンペーンを正しく照合する力",
  "teen_q10": "海外発信の不審電話に個人情報を渡さない力",
  "teen_q11": "親しくなったSNSアカウントからの投資勧誘を断る力",
  "teen_q12": "限定品を謳う通販サイトの信憑性を見抜く力",
  "teen_q13": "荷物運搬などを謳うバイト募集を拒絶する力",
  "teen_q14": "SNSでのチケット個人間先払い取引を回避する力",
  "teen_q15": "著作権警告DMによるログイン情報窃取を防ぐ力",
  "teen_q16": "有名人出演のAI動画広告を見破る力",

  // 一般（大人）モード
  "adult_q01": "サブスク自動更新を騙る架空請求SMSを遮断する力",
  "adult_q02": "国税庁・e-Tax還付通知の偽サイト誘導を見抜く力",
  "adult_q03": "銀行セキュリティ通知を装うフィッシングを回避する力",
  "adult_q04": "警察官を騙るLINE誘導・偽逮捕状詐欺を看破する力",
  "adult_q05": "著名人を騙るSNS投資グループ勧誘を見破る力",
  "adult_q06": "火災保険不正請求を勧誘する悪質業者を拒絶する力",
  "adult_q07": "ATMで電話指示を受ける高齢者を店員と連携して救う力",
  "adult_q08": "クレジットカード会社の正規明細通知を安全に確認する力",
  "adult_q09": "職場の同僚のPC警告画面トラブルを止める力",
  "adult_q10": "国際郵便の関税未納スミッシングを見抜く力",
  "adult_q11": "マイナポータル電子証明書更新の偽SMSを遮断する力",
  "adult_q12": "ライフライン供給停止を騙る緊急決済要求を防ぐ力",
  "adult_q13": "取引先を装う振込先変更ビジネスメール詐欺を防ぐ力",
  "adult_q14": "マッチング相手からの会う前の金銭要求を見破る力",
  "adult_q15": "身に覚えのない宿泊予約の偽キャンセル通知を看破する力",
  "adult_q16": "正規の3Dセキュア本人認証を正しく扱う力",

  // 高齢者モード
  "senior_q01": "警察官騙りのLINE誘導・偽逮捕状を断る力",
  "senior_q02": "特別給付金を装う偽SMSの口座情報要求を見抜く力",
  "senior_q03": "息子を名乗る急な金銭要求を元番号で確認する力",
  "senior_q04": "大手電力会社騙りの検針票情報聞き出しを防ぐ力",
  "senior_q05": "銀行からの正規の満期案内を正しく確認する力",
  "senior_q06": "屋根の突然の点検訪問を家に入れず断る力",
  "senior_q07": "未納料金を理由とするプリペイドカード要求を拒絶する力",
  "senior_q08": "水道局を装う水質検査・浄水器販売チラシを見抜く力",
  "senior_q09": "消防署関係者を騙る不安煽り防災機器販売を断る力",
  "senior_q10": "ガス設備の正規法令点検を正しく受ける力",
  "senior_q11": "年金手続き代行を名乗る口座情報聞き出しを防ぐ力",
  "senior_q12": "宅配業者を装う不在持ち帰り偽SMSを開かない力",
  "senior_q13": "パソコンの偽ウイルス警告画面を消去する力",
  "senior_q14": "国税庁を装う差し押さえ警告メールを見破る力",
  "senior_q15": "携帯電話会社からの正規の請求案内を扱う力",
  "senior_q16": "クレジットカード会社の正規明細通知を確認する力"
};

/* =========================================================
   【小学生モード用問題プール】（全16問・全漢字ルビ付き・3原則思考型4択）
   ========================================================= */
const QUESTIONS_ELEMENTARY = [
  // ── 詐欺（11問） ──
  {
    id: "elementary_q01", category: "scam", source: "メール", title: "【<ruby>重要<rt>じゅうよう</rt></ruby>】サイバー<ruby>犯罪<rt>はんざい</rt></ruby><ruby>対策<rt>たいさく</rt></ruby>センターからのおしらせ",
    characterName: "サイバー<ruby>捜査課<rt>そうさか</rt></ruby>",
    narration: "スマホに 1<ruby>通<rt>つう</rt></ruby>の メールが <ruby>届<rt>とど</rt></ruby>きました。\n<ruby>画面<rt>がめん</rt></ruby>の メールを <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "連絡通知", line: "【<ruby>警告<rt>けいこく</rt></ruby>】24<ruby>時間<rt>じかん</rt></ruby><ruby>以内<rt>いない</rt></ruby>に <ruby>下<rt>した</rt></ruby>のリンクより <ruby>本人<rt>ほんにん</rt></ruby><ruby>確認<rt>かくにん</rt></ruby>を <ruby>完了<rt>かんりょう</rt></ruby>してください。" },
      { speaker: "主人公", line: "「たいほって かいてある…！ どうしよう…！」" }
    ],
    point: "<ruby>警察<rt>けいさつ</rt></ruby>が メールで パスワードを <ruby>入<rt>い</rt></ruby>れさせたり、『たいほする』とおどすことは ぜったいに ありません！",
    notification: "📱ピコン 新着メールが届きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryPoliceMailScam,
    desc: "スマホに メールが <ruby>届<rt>とど</rt></ruby>いた。<ruby>画像<rt>がめん</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "メールのリンクは <ruby>押<rt>お</rt></ruby>さず、すぐ おうちの<ruby>人<rt>ひと</rt></ruby>に <ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>せて <ruby>相談<rt>そうだん</rt></ruby>する", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>騙<rt>だま</rt></ruby>されない・<ruby>相談<rt>そうだん</rt></ruby>する】リンクを <ruby>開<rt>ひら</rt></ruby>かずに おとなの<ruby>人<rt>ひと</rt></ruby>に <ruby>相談<rt>そうだん</rt></ruby>できたね！" }
    ],
    wrongChoices: [
      { text: "たいほされたら <ruby>困<rt>こま</rt></ruby>るから、リンクを <ruby>開<rt>ひら</rt></ruby>いて パスワードと <ruby>名前<rt>なまえ</rt></ruby>を <ruby>入力<rt>にゅうりょく</rt></ruby>する", money: -25000, principleTag: "speak", damageType: "account", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】パスワードを <ruby>悪<rt>わる</rt></ruby>ものに <ruby>教<rt>おし</rt></ruby>えてしまい、アカウントを <ruby>奪<rt>うば</rt></ruby>われて 25,000<ruby>円<rt>えん</rt></ruby>の <ruby>被害<rt>ひがい</rt></ruby>が でたよ！" },
      { text: "「たいほを <ruby>取<rt>と</rt></ruby>り<ruby>消<rt>け</rt></ruby>すには <ruby>調査<rt>ちょうさ</rt></ruby><ruby>費用<rt>ひよう</rt></ruby>が <ruby>必要<rt>ひつよう</rt></ruby>」と <ruby>書<rt>か</rt></ruby>いてあるので お<ruby>金<rt>かね</rt></ruby>を <ruby>振<rt>ふ</rt></ruby>り<ruby>込<rt>こ</rt></ruby>む", money: -30000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】おどされて お<ruby>金<rt>かね</rt></ruby>を <ruby>払<rt>はら</rt></ruby>ってしまい、<ruby>大切<rt>たいせつ</rt></ruby>な 30,000<ruby>円<rt>えん</rt></ruby>を <ruby>奪<rt>うば</rt></ruby>われたよ！" },
      { text: "メールに <ruby>書<rt>か</rt></ruby>いてある でんわ<ruby>番号<rt>ばんごう</rt></ruby>に でんわをかけて「<ruby>本当<rt>ほんとう</rt></ruby>につかまるの？」と <ruby>聞<rt>き</rt></ruby>く", money: -15000, principleTag: "fooled", damageType: "money", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】さぎグループの でんわに つながり、おどされて 15,000<ruby>円<rt>えん</rt></ruby> <ruby>取<rt>と</rt></ruby>られてしまったよ！" }
    ]
  },
  {
    id: "elementary_q02", category: "scam", source: "SNSのDM", title: "【<ruby>当選<rt>とうせん</rt></ruby><ruby>通知<rt>つうち</rt></ruby>】ゲーム<ruby>機<rt>き</rt></ruby>プレゼント<ruby>企画<rt>きかく</rt></ruby>",
    characterName: "プレゼント<ruby>企画<rt>きかく</rt></ruby>",
    narration: "SNSの ダイレクトメッセージに、メッセージが <ruby>届<rt>とど</rt></ruby>きました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "アカウント", line: "おめでとうございます！ <ruby>発送<rt>はっそう</rt></ruby><ruby>手続<rt>てつづ</rt></ruby>きのため、フォームに <ruby>入力<rt>にゅうりょく</rt></ruby>してください。" },
      { speaker: "主人公", line: "「最新ゲーム機があたったの！？ はやくほしいな！」" }
    ],
    point: "『タダであげるけど お金や暗証番号を教えて』は、個人情報やお小遣いをだまし取る手口です！",
    notification: "📱ピコン 当選メッセージ！",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryGamePrizeScam,
    desc: "SNSで メッセージが <ruby>届<rt>とど</rt></ruby>いた。<ruby>画像<rt>がめん</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "あやしいリンクは <ruby>開<rt>ひら</rt></ruby>かず、おうちの<ruby>人<rt>ひと</rt></ruby>に「これ<ruby>本当<rt>ほんとう</rt></ruby>かな？」と <ruby>見<rt>み</rt></ruby>せて <ruby>確認<rt>かくにん</rt></ruby>する", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>騙<rt>だま</rt></ruby>されない・<ruby>相談<rt>そうだん</rt></ruby>する】タダをエサにだまし<ruby>取<rt>と</rt></ruby>る さぎだよ！しっかり<ruby>相談<rt>そうだん</rt></ruby>できたね！" }
    ],
    wrongChoices: [
      { text: "プレゼントを <ruby>送<rt>おく</rt></ruby>ってもらうため、じぶんの<ruby>名前<rt>なまえ</rt></ruby>・<ruby>住所<rt>じゅうしょ</rt></ruby>・<ruby>小学校名<rt>しょうがっこうめい</rt></ruby>を くわしく <ruby>返信<rt>へんしん</rt></ruby>する", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】<ruby>大切<rt>たいせつ</rt></ruby>な <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を <ruby>教<rt>おし</rt></ruby>えてしまい、<ruby>悪<rt>わる</rt></ruby>いグループに <ruby>使<rt>つか</rt></ruby>われてしまったよ！" },
      { text: "「<ruby>送料<rt>そうりょう</rt></ruby>500<ruby>円<rt>えん</rt></ruby>が <ruby>必要<rt>ひつよう</rt></ruby>」と <ruby>言<rt>い</rt></ruby>われ、コンビニで プリペイドカードを <ruby>買<rt>か</rt></ruby>って <ruby>番号<rt>ばんごう</rt></ruby>を <ruby>送<rt>おく</rt></ruby>る", money: -25000, principleTag: "pay", damageType: "personal_info", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】お<ruby>金<rt>かね</rt></ruby>を だまし<ruby>取<rt>と</rt></ruby>られ、ゲーム<ruby>機<rt>き</rt></ruby>も とどかなかったよ！" },
      { text: "<ruby>相手<rt>あいて</rt></ruby>のアカウントにDMで「<ruby>本当<rt>ほんとう</rt></ruby>にゲーム<ruby>機<rt>き</rt></ruby>は とどきますか？」と <ruby>確認<rt>かくにん</rt></ruby>メッセージを <ruby>送<rt>おく</rt></ruby>る", money: -12000, principleTag: "fooled", damageType: "personal_info", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】「<ruby>本物<rt>ほんもの</rt></ruby>ですよ」と あんしんさせられ、うそを <ruby>信<rt>しん</rt></ruby>じてしまったよ！" }
    ]
  },
  {
    id: "elementary_q03", category: "scam", source: "おうちの玄関", title: "<ruby>近隣<rt>きんりん</rt></ruby><ruby>工事<rt>こうじ</rt></ruby>の ごあいさつ",
    characterName: "<ruby>訪問<rt>ほうもん</rt></ruby><ruby>作業員<rt>さぎょういん</rt></ruby>",
    narration: "おうちで おるす<ruby>番<rt>ばん</rt></ruby>をしていると、インターホンが <ruby>鳴<rt>な</rt></ruby>り、<ruby>作業着<rt>さぎょうぎ</rt></ruby>のおじさんが <ruby>立<rt>た</rt></ruby>っていました。",
    dialogue: [
      { speaker: "作業員", line: "「<ruby>近所<rt>きんじょ</rt></ruby>で <ruby>工事<rt>こうじ</rt></ruby>をしている者ですが、お<ruby>宅<rt>たく</rt></ruby>の<ruby>屋根<rt>やね</rt></ruby>の<ruby>瓦<rt>かわら</rt></ruby>が ずれてますよ。<ruby>無料<rt>むりょう</rt></ruby>で <ruby>見<rt>み</rt></ruby>てあげます。」" },
      { speaker: "主人公", line: "「お父さんもお母さんもいないけど…どうしよう？」" }
    ],
    point: "突然やってきて「今すぐ無料で見ます」という訪問者は、わざと壊して高額なお金を請求する危険があります！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.workerLabor,
    screenshot: null,
    desc: "「<ruby>屋根<rt>やね</rt></ruby>の<ruby>瓦<rt>かわら</rt></ruby>が ずれている。<ruby>無料<rt>むりょう</rt></ruby>で <ruby>点検<rt>てんけん</rt></ruby>する」と <ruby>言<rt>い</rt></ruby>われた。あなたなら どうする？",
    correctChoices: [
      { text: "<ruby>玄関<rt>げんかん</rt></ruby>のカギを <ruby>開<rt>あ</rt></ruby>けずに、インターホンごしに「いま おとなが いないので わかりません」と <ruby>断<rt>ことわ</rt></ruby>る", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>喋<rt>しゃべ</rt></ruby>らない・<ruby>家<rt>いえ</rt></ruby>に<ruby>入<rt>い</rt></ruby>れない】おるす<ruby>番<rt>ばん</rt></ruby>のときは ぜったいに ドアを あけちゃダメだよ！" }
    ],
    wrongChoices: [
      { text: "「いま おうちの<ruby>人<rt>ひと</rt></ruby>が いなくて、じぶん ひとりです」と <ruby>正直<rt>しょうじき</rt></ruby>に <ruby>状況<rt>じょうきょう</rt></ruby>を <ruby>話<rt>はな</rt></ruby>してしまう", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】ひとりで るすばんしていることを <ruby>教<rt>おし</rt></ruby>えてしまい、むりやり <ruby>敷地<rt>しきち</rt></ruby>に <ruby>入<rt>はい</rt></ruby>りこまれたよ！" },
      { text: "「<ruby>点検<rt>てんけん</rt></ruby>は <ruby>タダ<rt>ただ</rt></ruby>だけど <ruby>出張費<rt>しゅっちょうひ</rt></ruby>3,000<ruby>円<rt>えん</rt></ruby>が <ruby>必要<rt>ひつよう</rt></ruby>」と <ruby>言<rt>い</rt></ruby>われ、お<ruby>小遣<rt>こづか</rt></ruby>いから <ruby>支払<rt>しはら</rt></ruby>ってしまう", money: -12000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】お<ruby>金<rt>かね</rt></ruby>を <ruby>払<rt>はら</rt></ruby>ってしまい、さらに <ruby>高<rt>たか</rt></ruby>いお<ruby>金<rt>かね</rt></ruby>を せいきゅうされたよ！" },
      { text: "<ruby>親切<rt>しんせつ</rt></ruby>な<ruby>人<rt>ひと</rt></ruby>だと <ruby>思<rt>おも</rt></ruby>い、<ruby>玄関<rt>げんかん</rt></ruby>のドアを <ruby>開<rt>あ</rt></ruby>けて <ruby>業者<rt>ぎょうしゃ</rt></ruby>を お<ruby>庭<rt>にわ</rt></ruby>や <ruby>屋根<rt>やね</rt></ruby>へ <ruby>案内<rt>あんない</rt></ruby>する", money: -25000, principleTag: "fooled", damageType: "money", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】わざと<ruby>屋根<rt>やね</rt></ruby>を こわされ、<ruby>高<rt>たか</rt></ruby>い<ruby>修理代<rt>しゅうりだい</rt></ruby>を せいきゅうされたよ！" }
    ]
  },
  {
    id: "elementary_q04", category: "scam", source: "SNSのDM", title: "【メッセージ】<ruby>友達<rt>ともだち</rt></ruby>の<ruby>健太<rt>けんた</rt></ruby>",
    characterName: "<ruby>健太<rt>けんた</rt></ruby>（<ruby>別<rt>べつ</rt></ruby>アカウント）",
    narration: "SNSを <ruby>見<rt>み</rt></ruby>ていると、<ruby>友達<rt>ともだち</rt></ruby>の「<ruby>健太<rt>けんた</rt></ruby>」の <ruby>写真<rt>しゃしん</rt></ruby>の アカウントから メッセージが きました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "健太？", line: "「今ちょっと困ってて親に言えないの。PayPayで3,000円送って！明日返すから！」" },
      { speaker: "主人公", line: "「健太からだ。急いでるみたいだな…」" }
    ],
    point: "友達の名前や写真を使っていても、別アカウントから突然お金を要求されたら乗っ取りや偽アカウントを疑いましょう！",
    notification: "📱ピコン 健太からのメッセージ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryFriendImpersonationScam,
    desc: "「3,000<ruby>円<rt>えん</rt></ruby> <ruby>送<rt>おく</rt></ruby>ってほしい」と メッセージが <ruby>届<rt>とど</rt></ruby>いた。<ruby>画像<rt>がめん</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "お<ruby>金<rt>かね</rt></ruby>は <ruby>送<rt>おく</rt></ruby>らず、いつもの でんわや がっこうで じかに<ruby>会<rt>あ</rt></ruby>って「さっきメッセージ<ruby>送<rt>おく</rt></ruby>った？」と <ruby>本人<rt>ほんにん</rt></ruby>に <ruby>確認<rt>かくにん</rt></ruby>する", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>騙<rt>だま</rt></ruby>されない・<ruby>別<rt>べつ</rt></ruby>ルート<ruby>確認<rt>かくにん</rt></ruby>】にせアカウントの さぎだよ！ べつの<ruby>方法<rt>ほうほう</rt></ruby>で <ruby>本人<rt>ほんにん</rt></ruby>に かくにんできて せいかい！" }
    ],
    wrongChoices: [
      { text: "「お<ruby>金<rt>かね</rt></ruby>はないけど、じぶんのアカウントのパスワードなら あげる」と <ruby>教<rt>おし</rt></ruby>えてしまう", money: -20000, principleTag: "speak", damageType: "account", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】じぶんのアカウントまで うばわれて、<ruby>勝手<rt>かって</rt></ruby>に <ruby>友達<rt>ともだち</rt></ruby>へ さぎメッセージを <ruby>送<rt>おく</rt></ruby>られたよ！" },
      { text: "<ruby>友達<rt>ともだち</rt></ruby>が <ruby>困<rt>こま</rt></ruby>っているからと、<ruby>言<rt>い</rt></ruby>われた<ruby>通<rt>とお</rt></ruby>り お<ruby>小遣<rt>こづか</rt></ruby>いから 3,000<ruby>円<rt>えん</rt></ruby>を <ruby>送金<rt>そうきん</rt></ruby>する", money: -15000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】にせアカウントのさぎで、「もっと<ruby>送<rt>おく</rt></ruby>って」と せいきゅうされ お<ruby>金<rt>かね</rt></ruby>を <ruby>失<rt>うしな</rt></ruby>ったよ！" },
      { text: "メッセージで「<ruby>本当<rt>ほんとう</rt></ruby>に<ruby>健太<rt>けんた</rt></ruby>？ なん<ruby>組<rt>くみ</rt></ruby>の だれ<ruby>先生<rt>せんせい</rt></ruby>？」と <ruby>質問<rt>しつもん</rt></ruby>して やり<ruby>取<rt>と</rt></ruby>りを <ruby>続<rt>つづ</rt></ruby>ける", money: -10000, principleTag: "fooled", damageType: "line_takeover", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】ことばたくみに ごまかされて <ruby>信<rt>しん</rt></ruby>じこまされ、お<ruby>金<rt>かね</rt></ruby>を <ruby>取<rt>と</rt></ruby>られてしまったよ！" }
    ]
  },
  {
    id: "elementary_q05", category: "scam", source: "ネット広告", title: "【タイムセール】<ruby>人気<rt>にんき</rt></ruby>イヤホン<ruby>特別<rt>とくべつ</rt></ruby><ruby>割引<rt>わりびき</rt></ruby>",
    characterName: "<ruby>限定<rt>げんてい</rt></ruby>セール<ruby>広告<rt>こうこく</rt></ruby>",
    narration: "SNSを <ruby>見<rt>み</rt></ruby>ていると、タイムセールの <ruby>広告<rt>こうこく</rt></ruby>が <ruby>出<rt>で</rt></ruby>てきました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "広告ページ", line: "【<ruby>夏休<rt>なつやす</rt></ruby>み<ruby>限定<rt>げんてい</rt></ruby>】ワイヤレスイヤホンが <ruby>本日<rt>ほんじつ</rt></ruby>限りの <ruby>特別<rt>とくべつ</rt></ruby><ruby>価格<rt>かかく</rt></ruby>！" },
      { speaker: "主人公", line: "「欲しかったイヤホンだ！ 安くなってる！」" }
    ],
    point: "広告の見た目だけで信じず、商品の公式サイトを自分で検索して同じセールが行われているか確認しましょう！",
    notification: "📱ピコン セールのお知らせ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryDiscountAdScam,
    desc: "SNSに <ruby>激安<rt>げきやす</rt></ruby>セールの <ruby>広告<rt>こうこく</rt></ruby>が <ruby>出<rt>で</rt></ruby>てきた。<ruby>画像<rt>がめん</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "<ruby>広告<rt>こうこく</rt></ruby>からは <ruby>買<rt>か</rt></ruby>わずに、じぶんで メーカーの<ruby>公式<rt>こうしき</rt></ruby>サイトを <ruby>検索<rt>けんさく</rt></ruby>して おなじセールが あるか たしかめる", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>騙<rt>だま</rt></ruby>されない・<ruby>公式<rt>こうしき</rt></ruby><ruby>確認<rt>かくにん</rt></ruby>】にせのショッピングサイトだったよ！<ruby>公式<rt>こうしき</rt></ruby>サイトで かくにんできて だいせいかい！" }
    ],
    wrongChoices: [
      { text: "<ruby>会員<rt>かいいん</rt></ruby><ruby>登録<rt>とうろく</rt></ruby><ruby>画面<rt>がめん</rt></ruby>で、おうちの<ruby>人<rt>ひと</rt></ruby>の<ruby>名前<rt>なまえ</rt></ruby>・でんわ<ruby>番号<rt>ばんごう</rt></ruby>・<ruby>住所<rt>じゅうしょ</rt></ruby>を すべて<ruby>入力<rt>にゅうりょく</rt></ruby>する", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】<ruby>入力<rt>にゅうりょく</rt></ruby>した <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を ぬすまれ、<ruby>怪<rt>あや</rt></ruby>しい<ruby>電話<rt>でんわ</rt></ruby>が たくさん かかってくるようになったよ！" },
      { text: "<ruby>売<rt>う</rt></ruby>り<ruby>切<rt>き</rt></ruby>れたら いやだから、お<ruby>小遣<rt>こづか</rt></ruby>いで コンビニの ギフトカードを <ruby>買<rt>か</rt></ruby>って すぐに はらう", money: -20000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】お<ruby>金<rt>かね</rt></ruby>を はらったのに <ruby>商品<rt>しょうひん</rt></ruby>は とどかず、お<ruby>金<rt>かね</rt></ruby>を ぬすまれたよ！" },
      { text: "<ruby>広告<rt>こうこく</rt></ruby>の「お<ruby>問<rt>と</rt></ruby>い<ruby>合<rt>あ</rt></ruby>わせ」に れんらくし、「ホンモノの<ruby>商品<rt>しょうひん</rt></ruby>ですか？」と <ruby>質問<rt>しつもん</rt></ruby>する", money: -12000, principleTag: "fooled", damageType: "personal_info", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】「<ruby>本物<rt>ほんもの</rt></ruby>です」という ウソの へんじを <ruby>信<rt>しん</rt></ruby>じてしまい、お<ruby>金<rt>かね</rt></ruby>を とられたよ！" }
    ]
  },
  {
    id: "elementary_q06", category: "scam", source: "SNSのDM", title: "【メッセージ】おこづかいをふやそう！",
    characterName: "<ruby>親切<rt>しんせつ</rt></ruby>そうなアカウント",
    narration: "SNSで <ruby>知<rt>し</rt></ruby>らない <ruby>人<rt>ひと</rt></ruby>から メッセージが <ruby>届<rt>とど</rt></ruby>きました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "相手", line: "「毎日お金が増える特別なサイトを教えてあげる。ここにお金を預けてみて！」" },
      { speaker: "主人公", line: "「お金が増えるのかな…？」" }
    ],
    point: "「絶対にお金が増える」「お金を預けて」と言ってくる相手は詐欺グループです！すぐやり取りをやめましょう！",
    notification: "📱ピコン メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryMoneyInviteScam,
    desc: "「お<ruby>金<rt>かね</rt></ruby>がふえる」と メッセージが きた。<ruby>画像<rt>がめん</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "「ぜったいに お<ruby>金<rt>かね</rt></ruby>が ふえる お<ruby>話<rt>はなし</rt></ruby>なんて ない」と <ruby>見抜<rt>みぬ</rt></ruby>いて、お<ruby>金<rt>かね</rt></ruby>は <ruby>送<rt>おく</rt></ruby>らず <ruby>相手<rt>あいて</rt></ruby>を ブロックする", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>騙<rt>だま</rt></ruby>されない・<ruby>遮断<rt>しゃだん</rt></ruby>する】さぎの てぐちだよ！ うまいことばに のらず ブロックできて だいせいかい！" }
    ],
    wrongChoices: [
      { text: "「<ruby>登録<rt>とうろく</rt></ruby>のため」と <ruby>言<rt>い</rt></ruby>われて、じぶんの<ruby>生年月日<rt>せいねんがっぴ</rt></ruby>や <ruby>住所<rt>じゅうしょ</rt></ruby>を <ruby>相手<rt>あいて</rt></ruby>に <ruby>教<rt>おし</rt></ruby>えてしまう", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】<ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を <ruby>悪用<rt>あくよう</rt></ruby>され、トラブルに まきこまれてしまったよ！" },
      { text: "お<ruby>小遣<rt>こづか</rt></ruby>いを ふやしたいので、お<ruby>年玉<rt>としだま</rt></ruby>の <ruby>貯金<rt>ちょきん</rt></ruby>から 1<ruby>万<rt>まん</rt></ruby><ruby>円<rt>えん</rt></ruby>を <ruby>指定<rt>してい</rt></ruby>された <ruby>口座<rt>こうざ</rt></ruby>へ <ruby>振<rt>ふ</rt></ruby>り<ruby>込<rt>こ</rt></ruby>む", money: -25000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】<ruby>振<rt>ふ</rt></ruby>りこんだ お<ruby>金<rt>かね</rt></ruby>は もどらず、さらに「<ruby>手数料<rt>てすうりょう</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>」と だまし<ruby>取<rt>と</rt></ruby>られたよ！" },
      { text: "「<ruby>本当<rt>ほんとう</rt></ruby>にお<ruby>金<rt>かね</rt></ruby>が ふえた <ruby>証拠<rt>しょうこ</rt></ruby>の<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>せて」と <ruby>相手<rt>あいて</rt></ruby>に たのんで お<ruby>話<rt>はなし</rt></ruby>を <ruby>聞<rt>き</rt></ruby>く", money: -12000, principleTag: "fooled", damageType: "money", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】にせの<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>せられて <ruby>信<rt>しん</rt></ruby>じこんでしまい、お<ruby>金<rt>かね</rt></ruby>を はらってしまったよ！" }
    ]
  },
  {
    id: "elementary_q07", category: "scam", source: "ネット動画", title: "【<ruby>裏技<rt>うらわざ</rt></ruby>】ガチャコイン<ruby>無料<rt>むりょう</rt></ruby>プレゼント！",
    characterName: "<ruby>裏技<rt>うらわざ</rt></ruby><ruby>動画<rt>どうが</rt></ruby>",
    narration: "ネットで ゲームの <ruby>動画<rt>どうが</rt></ruby>を <ruby>見<rt>み</rt></ruby>ていると、気になる <ruby>案内<rt>あんない</rt></ruby>が ありました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "裏ワザサイト", line: "コインを <ruby>受<rt>う</rt></ruby>け<ruby>取<rt>と</rt></ruby>るために、ゲームの「ID」と「パスワード」を <ruby>入力<rt>にゅうりょく</rt></ruby>してください。" },
      { speaker: "主人公", line: "「コインがもらえるの！？ 入力してみようかな…」" }
    ],
    point: "「無料」「裏ワザ」と嘘をついて、ゲームのアカウント情報を盗み取るフィッシングサイトです！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryGameCoinScam,
    desc: "「コインを <ruby>受<rt>う</rt></ruby>け<ruby>取<rt>と</rt></ruby>るための<ruby>手続<rt>てつづ</rt></ruby>き」と かいてある。<ruby>画像<rt>がめん</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "ゲームのパスワードを たにんに <ruby>教<rt>おし</rt></ruby>えるのは ぜったいに <ruby>危険<rt>きけん</rt></ruby>なので、<ruby>入力<rt>にゅうりょく</rt></ruby>せずに <ruby>動画<rt>どうが</rt></ruby>を とじる", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>喋<rt>しゃべ</rt></ruby>らない・<ruby>入力<rt>にゅうりょく</rt></ruby>しない】アカウント<ruby>乗<rt>の</rt></ruby>っ<ruby>取<rt>と</rt></ruby>りの わなだよ！パスワードを まもれて あんしんだね！" }
    ],
    wrongChoices: [
      { text: "ガチャを たくさん ひきたいので、じぶんのゲームIDと パスワードを <ruby>入力<rt>にゅうりょく</rt></ruby>する", money: -25000, principleTag: "speak", damageType: "account", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】アカウントを うばわれて アイテムを <ruby>勝手<rt>かって</rt></ruby>に うられ、25,000<ruby>円<rt>えん</rt></ruby>の <ruby>損害<rt>そんがい</rt></ruby>が でたよ！" },
      { text: "「システム<ruby>利用料<rt>りようりょう</rt></ruby>500<ruby>円<rt>えん</rt></ruby>」と <ruby>書<rt>か</rt></ruby>いてあったので、お<ruby>小遣<rt>こづか</rt></ruby>いで カードを<ruby>買<rt>か</rt></ruby>って はらう", money: -15000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】お<ruby>金<rt>かね</rt></ruby>を はらっても コインは ふえず、お<ruby>金<rt>かね</rt></ruby>を だまし<ruby>取<rt>と</rt></ruby>られたよ！" },
      { text: "<ruby>動画<rt>どうが</rt></ruby>の コメント<ruby>欄<rt>らん</rt></ruby>で「<ruby>本当<rt>ほんとう</rt></ruby>に ふえますか？」と <ruby>質問<rt>しつもん</rt></ruby>し、とうこうしゃの <ruby>指示<rt>しじ</rt></ruby>に したがう", money: -12000, principleTag: "fooled", damageType: "account", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】「ぜんいん もらえます」という ウソを <ruby>信<rt>しん</rt></ruby>じてしまい、データを うばわれたよ！" }
    ]
  },
  {
    id: "elementary_q08", category: "scam", source: "通話アプリ", title: "【<ruby>通話<rt>つうわ</rt></ruby>】ゲームの<ruby>攻略<rt>こうりゃく</rt></ruby>について",
    characterName: "ネットの<ruby>友達<rt>ともだち</rt></ruby>",
    narration: "オンラインゲームで <ruby>知<rt>し</rt></ruby>り<ruby>合<rt>あ</rt></ruby>った <ruby>人<rt>ひと</rt></ruby>と <ruby>通話<rt>つうわ</rt></ruby>アプリで お<ruby>話<rt>はな</rt></ruby>ししています。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "相手", line: "「スマホの画面共有をオンにして、届いたSMSの番号を見せてくれたらアイテムをあげるよ！」" },
      { speaker: "主人公", line: "「画面共有でSMSの番号を見せるのかな…？」" }
    ],
    point: "画面共有中に届いた認証番号を見せると、スマホのアカウントを乗っ取られてしまいます！",
    notification: "📱ピコン 【認証コード】492103",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryScreenShareScam,
    desc: "「<ruby>画面<rt>がめん</rt></ruby><ruby>共有<rt>きょうゆう</rt></ruby>で SMSの<ruby>番号<rt>ばんごう</rt></ruby>を <ruby>見<rt>み</rt></ruby>せて」と <ruby>言<rt>い</rt></ruby>われた。<ruby>画像<rt>がめん</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "「<ruby>認証<rt>にんしょう</rt></ruby>コードや スマホの<ruby>画面<rt>がめん</rt></ruby>は たにんに <ruby>見<rt>み</rt></ruby>せられない」と キッパリ<ruby>断<rt>ことわ</rt></ruby>り、<ruby>画面<rt>がめん</rt></ruby><ruby>共有<rt>きょうゆう</rt></ruby>を きる", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>喋<rt>しゃべ</rt></ruby>らない・<ruby>見<rt>み</rt></ruby>せない】<ruby>画面<rt>がめん</rt></ruby><ruby>共有<rt>きょうゆう</rt></ruby>で <ruby>見<rt>み</rt></ruby>えた<ruby>番号<rt>ばんごう</rt></ruby>を つかって アカウントを うばう てぐちだよ！" }
    ],
    wrongChoices: [
      { text: "<ruby>裏技<rt>うらわざ</rt></ruby>を <ruby>教<rt>おし</rt></ruby>えてもらいたいので、<ruby>画面<rt>がめん</rt></ruby><ruby>共有<rt>きょうゆう</rt></ruby>を オンにして SMSの<ruby>番号<rt>ばんごう</rt></ruby>を <ruby>見<rt>み</rt></ruby>せる", money: -25000, principleTag: "speak", damageType: "account", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】<ruby>認証<rt>にんしょう</rt></ruby>コードを <ruby>見<rt>み</rt></ruby>せてしまい、アカウントを <ruby>乗<rt>の</rt></ruby>っ<ruby>取<rt>と</rt></ruby>られて だいひがいが でたよ！" },
      { text: "「<ruby>裏技<rt>うらわざ</rt></ruby>の <ruby>登録料<rt>とうろくりょう</rt></ruby>」として、お<ruby>小遣<rt>こづか</rt></ruby>いから 3,000<ruby>円<rt>えん</rt></ruby>を <ruby>送金<rt>そうきん</rt></ruby>してしまう", money: -20000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】お<ruby>金<rt>かね</rt></ruby>を はらっても <ruby>裏技<rt>うらわざ</rt></ruby>などは なく、お<ruby>金<rt>かね</rt></ruby>を だまし<ruby>取<rt>と</rt></ruby>られたよ！" },
      { text: "「<ruby>番号<rt>ばんごう</rt></ruby>は <ruby>見<rt>み</rt></ruby>せないけど、つうわの <ruby>指示<rt>しじ</rt></ruby>に したがって そうさするね」と <ruby>相手<rt>あいて</rt></ruby>の<ruby>言<rt>い</rt></ruby>う<ruby>通<rt>とお</rt></ruby>りにする", money: -15000, principleTag: "fooled", damageType: "account", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】ことばたくみに せっていを へんこうさせられ、アカウントを うばわれてしまったよ！" }
    ]
  },
  {
    id: "elementary_q09", category: "scam", source: "SNSのDM", title: "【DM】<ruby>人気<rt>にんき</rt></ruby>YouTuberサイン<ruby>色紙<rt>しきし</rt></ruby>のおしらせ",
    characterName: "<ruby>有名<rt>ゆうめい</rt></ruby><ruby>配信者<rt>はいしんしゃ</rt></ruby>そっくり垢",
    narration: "SNSの ダイレクトメッセージに、メッセージが <ruby>届<rt>とど</rt></ruby>きました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "配信者？", line: "「色紙を送るから、君の【名前】【家の住所】【通っている小学校名】を返信してね！」" },
      { speaker: "主人公", line: "「大好きなYouTuberからだ！返信しようかな？」" }
    ],
    point: "有名人になりすました偽アカウントです！公式マークやユーザーIDをしっかり確認しましょう！",
    notification: "📱ピコン サイン当選のDM！",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryYoutuberSignScam,
    desc: "YouTuberから メッセージが きた。<ruby>画像<rt>がめん</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "<ruby>公式<rt>こうしき</rt></ruby>マークやIDを <ruby>確認<rt>かくにん</rt></ruby>し、「にせもののアカウントだ」と <ruby>見抜<rt>みぬ</rt></ruby>いて <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>は <ruby>教<rt>おし</rt></ruby>えない", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>喋<rt>しゃべ</rt></ruby>らない・<ruby>教<rt>おし</rt></ruby>えない】ゆうめいじん そっくりに つくった にせアカウントだよ！<ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を まもれたね！" }
    ],
    wrongChoices: [
      { text: "サインが どうしても ほしいので、じぶんの<ruby>名前<rt>なまえ</rt></ruby>・<ruby>住所<rt>じゅうしょ</rt></ruby>・<ruby>小学校名<rt>しょうがっこうめい</rt></ruby>を メッセージで <ruby>返信<rt>へんしん</rt></ruby>する", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】<ruby>大切<rt>たいせつ</rt></ruby>な <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を <ruby>教<rt>おし</rt></ruby>えてしまい、<ruby>住所<rt>じゅうしょ</rt></ruby>や がっこうめいが しられたよ！" },
      { text: "「<ruby>色紙<rt>しきし</rt></ruby>の <ruby>送料<rt>そうりょう</rt></ruby>と こんぽう<ruby>代<rt>だい</rt></ruby>として 1,500<ruby>円<rt>えん</rt></ruby> <ruby>送金<rt>そうきん</rt></ruby>して」と <ruby>言<rt>い</rt></ruby>われ、すぐにお<ruby>金<rt>かね</rt></ruby>を <ruby>送<rt>おく</rt></ruby>る", money: -18000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】お<ruby>金<rt>かね</rt></ruby>を はらっても <ruby>色紙<rt>しきし</rt></ruby>は とどかず、お<ruby>金<rt>かね</rt></ruby>を ぬすまれてしまったよ！" },
      { text: "「ホンモノのYouTuberですか？」とDMで <ruby>質問<rt>しつもん</rt></ruby>し、<ruby>送<rt>おく</rt></ruby>られてきた にせのしょうめいしょを <ruby>信<rt>しん</rt></ruby>じる", money: -12000, principleTag: "fooled", damageType: "personal_info", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】にせの <ruby>画像<rt>がぞう</rt></ruby>で <ruby>信<rt>しん</rt></ruby>じこまされ、けっきょく <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を わたしてしまったよ！" }
    ]
  },
  {
    id: "elementary_q10", category: "scam", source: "ネット広告", title: "【コード<ruby>配布<rt>はいふ</rt></ruby>】10<ruby>連<rt>れん</rt></ruby>ガチャシリアルコード",
    characterName: "<ruby>無料<rt>むりょう</rt></ruby>コード<ruby>配布<rt>はいふ</rt></ruby>サイト",
    narration: "ネットを <ruby>見<rt>み</rt></ruby>ていると、ガチャコードの <ruby>配布<rt>はいふ</rt></ruby>ページを <ruby>見<rt>み</rt></ruby>つけました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "配布ページ", line: "無料コード受け取り：おうちの人のスマホに届く【確認番号】を入力してください。" },
      { speaker: "主人公", line: "「おうちの人のスマホを見るのかな…？」" }
    ],
    point: "「無料」をエサに、子どもにおうちの人の認証コードやパスワードを入力させようとする危険な罠です！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryGachaCodeScam,
    desc: "「ガチャコードを <ruby>受<rt>う</rt></ruby>け<ruby>取<rt>と</rt></ruby>るための<ruby>手続<rt>てつづ</rt></ruby>き」と かいてある。<ruby>画像<rt>がめん</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "「タダなのに おうちの<ruby>人<rt>ひと</rt></ruby>の <ruby>暗証<rt>あんしょう</rt></ruby>コードを <ruby>求<rt>もと</rt></ruby>めるのは さぎだ」と <ruby>見抜<rt>みぬ</rt></ruby>いて、すぐ ページを とじる", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>騙<rt>だま</rt></ruby>されない・<ruby>入力<rt>にゅうりょく</rt></ruby>しない】タダを くちに <ruby>大切<rt>たいせつ</rt></ruby>な コードを ぬすむ さぎだよ！<ruby>入力<rt>にゅうりょく</rt></ruby>しなくて せいかい！" }
    ],
    wrongChoices: [
      { text: "ガチャを ひきたいので、おうちの<ruby>人<rt>ひと</rt></ruby>のスマホを <ruby>見<rt>み</rt></ruby>て とどいた<ruby>認証<rt>にんしょう</rt></ruby>コードを <ruby>入力<rt>にゅうりょく</rt></ruby>する", money: -30000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】アカウントを <ruby>乗<rt>の</rt></ruby>っ<ruby>取<rt>と</rt></ruby>られ、おうちの<ruby>人<rt>ひと</rt></ruby>の お<ruby>金<rt>かね</rt></ruby>が 30,000<ruby>円<rt>えん</rt></ruby><ruby>分<rt>ぶん</rt></ruby> つかわれたよ！" },
      { text: "「コード<ruby>発行<rt>はっこう</rt></ruby><ruby>手数料<rt>てすうりょう</rt></ruby>100<ruby>円<rt>えん</rt></ruby>」と <ruby>書<rt>か</rt></ruby>いてあったので、お<ruby>小遣<rt>こづか</rt></ruby>いから はらう", money: -15000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】いちど はらったことで さぎグループに ねらわれ、もっと お<ruby>金<rt>かね</rt></ruby>を とられたよ！" },
      { text: "サイトの「あんぜんなサイトです」という せつめいを <ruby>信<rt>しん</rt></ruby>じて <ruby>手続<rt>てつづ</rt></ruby>きを <ruby>進<rt>すす</rt></ruby>める", money: -20000, principleTag: "fooled", damageType: "personal_info", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】サイトの ウソの せつめいに だまされて、だいひがいに なってしまったよ！" }
    ]
  },
  {
    id: "elementary_q11", category: "scam", source: "ネット広告", title: "【<ruby>募集<rt>ぼしゅう</rt></ruby>】ゲームの<ruby>感想<rt>かんそう</rt></ruby>モニター",
    characterName: "<ruby>簡単<rt>かんたん</rt></ruby><ruby>副業<rt>ふくぎょう</rt></ruby><ruby>広告<rt>こうこく</rt></ruby>",
    narration: "ネットを <ruby>見<rt>み</rt></ruby>ていると、お<ruby>小遣<rt>こづか</rt></ruby>い<ruby>稼<rt>かせ</rt></ruby>ぎの <ruby>広告<rt>こうこく</rt></ruby>を <ruby>見<rt>み</rt></ruby>つけました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "副業サイト", line: "報酬を受け取るため、おうちの電話番号とお名前を入力してください。" },
      { speaker: "主人公", line: "「感想を書くだけでいいのかな？」" }
    ],
    point: "「誰でも簡単に高額が稼げる」は個人情報収集や悪質商法の罠です！絶対に応募してはいけません！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryEasyMoneyScam,
    desc: "「<ruby>報酬<rt>ほうしゅう</rt></ruby>を <ruby>受<rt>う</rt></ruby>け<ruby>取<rt>と</rt></ruby>るための<ruby>手続<rt>てつづ</rt></ruby>き」と かいてある。<ruby>画像<rt>がめん</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "「かんたんに お<ruby>金<rt>かね</rt></ruby>が もらえるお<ruby>話<rt>はなし</rt></ruby>は ぜったいに ウソだ」と <ruby>見抜<rt>みぬ</rt></ruby>いて、なにも<ruby>入力<rt>にゅうりょく</rt></ruby>せずに ページを とじる", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>騙<rt>だま</rt></ruby>されない・<ruby>応募<rt>おうぼ</rt></ruby>しない】うまいことばで <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を あつめる あくしつな <ruby>広告<rt>こうこく</rt></ruby>だよ！" }
    ],
    wrongChoices: [
      { text: "お<ruby>小遣<rt>こづか</rt></ruby>いが もらいたいので、じぶんの<ruby>名前<rt>なまえ</rt></ruby>・いえのでんわ<ruby>番号<rt>ばんごう</rt></ruby>・<ruby>住所<rt>じゅうしょ</rt></ruby>を <ruby>入力<rt>にゅうりょく</rt></ruby>して <ruby>送信<rt>そうしん</rt></ruby>する", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】<ruby>大切<rt>たいせつ</rt></ruby>な <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>が さぎグループに わたり、<ruby>怪<rt>あや</rt></ruby>しいでんわが なってしまったよ！" },
      { text: "「さいしょに おしごとの きょうざい<ruby>代<rt>だい</rt></ruby>として 3,000<ruby>円<rt>えん</rt></ruby><ruby>必要<rt>ひつよう</rt></ruby>」と <ruby>言<rt>い</rt></ruby>われ、お<ruby>小遣<rt>こづか</rt></ruby>いから はらってしまう", money: -15000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】お<ruby>金<rt>かね</rt></ruby>を はらっても おしごとは しょうかいされず、お<ruby>金<rt>かね</rt></ruby>を もち<ruby>逃<rt>に</rt></ruby>げされたよ！" },
      { text: "「<ruby>本当<rt>ほんとう</rt></ruby>に お<ruby>小遣<rt>こづか</rt></ruby>いは もらえますか？」と お<ruby>問<rt>と</rt></ruby>い<ruby>合<rt>あ</rt></ruby>わせフォームから <ruby>聞<rt>き</rt></ruby>いてみる", money: -12000, principleTag: "fooled", damageType: "personal_info", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】「あんしんですよ」と ことばたくみに だまされ、お<ruby>金<rt>かね</rt></ruby>を はらってしまったよ！" }
    ]
  },

  // ── 助ける（2問） ──
  {
    id: "elementary_q12", category: "help", source: "銀行のATM", title: "ぎんこうの ATMにて",
    characterName: "<ruby>困<rt>こま</rt></ruby>っているおばあさん",
    narration: "お<ruby>買<rt>か</rt></ruby>いものの <ruby>途中<rt>とちゅう</rt></ruby>、ぎんこうの ATMで、でんわを しながら ボタンを <ruby>押<rt>お</rt></ruby>している おばあさんを <ruby>見<rt>み</rt></ruby>かけました。",
    dialogue: [
      { speaker: "おばあさん", line: "「（電話で）はい、言われた通り番号を押しました！ これでお金が戻るんですね…？」" },
      { speaker: "主人公", line: "「電話しながら操作してるな…どうしよう？」" }
    ],
    point: "ATMを操作して『お金が戻ってくる』ことは絶対にありません！ 100%詐欺です！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.atm,
    character: IMAGE_ASSETS.characters.elderlyWomanCane,
    screenshot: null,
    desc: "おばあさんが でんわを しながら ATMを <ruby>操作<rt>そうさ</rt></ruby>している。あなたなら どうする？",
    correctChoices: [
      { text: "ちかくの ぎんこうの<ruby>人<rt>ひと</rt></ruby>や <ruby>店員<rt>てんいん</rt></ruby>さんに「おばあさんが だまされているかも！」と いそいで <ruby>知<rt>し</rt></ruby>らせる", money: 300, principleTag: "safe", explain: "✨ だいせいかい！【<ruby>騙<rt>だま</rt></ruby>されない・まわりと<ruby>連携<rt>れんけい</rt></ruby>】すぐに おとなの<ruby>人<rt>ひと</rt></ruby>に <ruby>知<rt>し</rt></ruby>らせたおかげで おばあさんを たすけられたよ！（お<ruby>礼<rt>れい</rt></ruby>+300<ruby>円<rt>えん</rt></ruby>）" }
    ],
    wrongChoices: [
      { text: "でんわの<ruby>相手<rt>あいて</rt></ruby>に じぶんの<ruby>名前<rt>なまえ</rt></ruby>を なのり、「ぼくが おばあちゃんの<ruby>暗証<rt>あんしょう</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>を <ruby>聞<rt>き</rt></ruby>いて<ruby>入力<rt>にゅうりょく</rt></ruby>します」と <ruby>言<rt>い</rt></ruby>う", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】<ruby>暗証<rt>あんしょう</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>を <ruby>聞<rt>き</rt></ruby>きだして<ruby>入力<rt>にゅうりょく</rt></ruby>してしまい、おばあさんの お<ruby>金<rt>かね</rt></ruby>が ぬすまれたよ！" },
      { text: "おばあさんのかわりに でんわを かわって、<ruby>相手<rt>あいて</rt></ruby>の<ruby>指示<rt>しじ</rt></ruby><ruby>通<rt>とお</rt></ruby>りに そうきんボタンを <ruby>押<rt>お</rt></ruby>してあげる", money: -30000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】さぎの そうきんを てつだってしまい、おばあさんの <ruby>大切<rt>たいせつ</rt></ruby>な ちょきんが うばわれたよ！" },
      { text: "でんわの<ruby>男<rt>おとこ</rt></ruby>から「しやくしょの てつづきです」と <ruby>言<rt>い</rt></ruby>われて「そうなんだ」と そのまま<ruby>見守<rt>みまも</rt></ruby>る", money: -15000, principleTag: "fooled", damageType: "money", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】ウソの せつめいを <ruby>信<rt>しん</rt></ruby>じてしまい、そうきんを とめられなかったよ。" }
    ]
  },
  {
    id: "elementary_q13", category: "help", source: "おうちのリビング", title: "おうちでの でんわ",
    characterName: "お<ruby>母<rt>かあ</rt></ruby>さん",
    narration: "がっこうから <ruby>帰<rt>かえ</rt></ruby>ると、お<ruby>母<rt>かあ</rt></ruby>さんが あわてて でんわを していました。",
    dialogue: [
      { speaker: "母", line: "「警察から電話があって…口座のお金を別の口座に移しなさいって言われたの…」" },
      { speaker: "主人公", line: "「お母さん、どうしたの？」" }
    ],
    point: "本物の警察が「指定した別の口座にお金を移せ」と電話することは100%ありません！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.motherWorried,
    screenshot: null,
    desc: "お<ruby>母<rt>かあ</rt></ruby>さんが「お<ruby>金<rt>かね</rt></ruby>を べつの<ruby>口座<rt>こうざ</rt></ruby>に うつす」と <ruby>言<rt>い</rt></ruby>っている。あなたなら どうする？",
    correctChoices: [
      { text: "「けいさつが お<ruby>金<rt>かね</rt></ruby>を うつせというのは ぜったい さぎだよ！ いちど きって110<ruby>番<rt>ばん</rt></ruby>で <ruby>確認<rt>かくにん</rt></ruby>しよう！」と とめる", money: 300, principleTag: "safe", explain: "✨ かぞくを すくったね！【<ruby>騙<rt>だま</rt></ruby>されない・けいさつへ<ruby>確認<rt>かくにん</rt></ruby>】でんわでお<ruby>金<rt>かね</rt></ruby>のお<ruby>話<rt>はなし</rt></ruby>は すべて さぎ！ しっかり とめられたね！（お<ruby>礼<rt>れい</rt></ruby>+300<ruby>円<rt>えん</rt></ruby>）" }
    ],
    wrongChoices: [
      { text: "でんわを かわって、かぞくぜんいんの<ruby>名前<rt>なまえ</rt></ruby>・<ruby>生年月日<rt>せいねんがっぴ</rt></ruby>・<ruby>暗証<rt>あんしょう</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>を <ruby>相手<rt>あいて</rt></ruby>に <ruby>伝<rt>つた</rt></ruby>える", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】<ruby>大切<rt>たいせつ</rt></ruby>な かぞくの <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を <ruby>教<rt>おし</rt></ruby>えてしまい、べつの さぎにも ねらわれるようになったよ！" },
      { text: "たいほされたら たいへんだから、お<ruby>母<rt>かあ</rt></ruby>さんと いっしょに ぎんこうへ <ruby>行<rt>い</rt></ruby>って いそいでお<ruby>金<rt>かね</rt></ruby>を <ruby>振<rt>ふ</rt></ruby>り<ruby>込<rt>こ</rt></ruby>む", money: -30000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】かぞくの <ruby>大切<rt>たいせつ</rt></ruby>な ちょきんが ぜんぶ だまし<ruby>取<rt>と</rt></ruby>られてしまったよ！" },
      { text: "<ruby>相手<rt>あいて</rt></ruby>が「そうさの ひみつだから だれにも<ruby>言<rt>い</rt></ruby>うな」と <ruby>言<rt>い</rt></ruby>っているのを <ruby>信<rt>しん</rt></ruby>じて だまって<ruby>見守<rt>みまも</rt></ruby>る", money: -20000, principleTag: "fooled", damageType: "money", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】おどしを <ruby>信<rt>しん</rt></ruby>じてしまい、お<ruby>母<rt>かあ</rt></ruby>さんの ふりこみを とめられなかったよ。" }
    ]
  },

  // ── 本物（3問） ──
  {
    id: "elementary_q14", category: "real", source: "SNS投稿", title: "【おしらせ】<ruby>夏休<rt>なつやす</rt></ruby>みキャンペーン",
    characterName: "ゲーム<ruby>公式<rt>こうしき</rt></ruby>アカウント",
    narration: "SNSを <ruby>見<rt>み</rt></ruby>ていると、ゲームの <ruby>公式<rt>こうしき</rt></ruby>アカウントから キャンペーンの <ruby>投稿<rt>とうこう</rt></ruby>が 流れてきました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "ゲーム公式", line: "ログインボーナス配布中！ 詳細はゲーム内お知らせをご確認ください。" },
      { speaker: "主人公", line: "「いつもと少し雰囲気が違うけど、どうなんだろう？」" }
    ],
    point: "見た目がいつもと違っても詐欺とは限りません。公式アカウントのマークやゲーム内のお知らせで確認しましょう！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.elementarySummerGameCampaignReal,
    desc: "SNSに キャンペーンの <ruby>案内<rt>あんない</rt></ruby>が 流れてきた。<ruby>画像<rt>がめん</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "「<ruby>見<rt>み</rt></ruby>た<ruby>目<rt>め</rt></ruby>だけで <ruby>決<rt>き</rt></ruby>めつけず」<ruby>公式<rt>こうしき</rt></ruby>マークを <ruby>確認<rt>かくにん</rt></ruby>し、いつもの ゲーム<ruby>内<rt>ない</rt></ruby>おしらせを <ruby>開<rt>ひら</rt></ruby>いて たしかめる", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>正規<rt>せいき</rt></ruby><ruby>確認<rt>かくにん</rt></ruby>】ホンモノの <ruby>公式<rt>こうしき</rt></ruby>キャンペーンだったね！ あんぜんな ルートで ただしく かくにんできたよ！" }
    ],
    wrongChoices: [
      { text: "<ruby>確認<rt>かくにん</rt></ruby>のため、<ruby>広告<rt>こうこく</rt></ruby>の リプライ<ruby>欄<rt>らん</rt></ruby>に じぶんのアカウントIDと パスワードを <ruby>書<rt>か</rt></ruby>きこむ", money: -20000, principleTag: "speak", damageType: "account", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】みんなに <ruby>見<rt>み</rt></ruby>えるばしょに パスワードを かいてしまい、アカウントを ぬすまれたよ！" },
      { text: "「ボーナスを <ruby>受<rt>う</rt></ruby>け<ruby>取<rt>と</rt></ruby>るには かきんが <ruby>必要<rt>ひつよう</rt></ruby>」と かんちがいし、お<ruby>小遣<rt>こづか</rt></ruby>いで アイテムを <ruby>買<rt>か</rt></ruby>う", money: -15000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】タダで もらえるものだったのに、むだな お<ruby>金<rt>かね</rt></ruby>を つかってしまったよ。" },
      { text: "「いつもと デザインが ちがうから ぜんぶ さぎだ！」と <ruby>決<rt>き</rt></ruby>めつけて アプリを けしてしまう", money: -8000, principleTag: "fooled", damageType: "money", explain: "【<ruby>誤認<rt>ごにん</rt></ruby><ruby>拒絶<rt>きょぜつ</rt></ruby>】ホンモノの イベントだったのに データを けしてしまい、ふっきゅうに お<ruby>金<rt>かね</rt></ruby>が かかってしまったよ。" }
    ]
  },
  {
    id: "elementary_q15", category: "real", source: "メール", title: "【お<ruby>届<rt>とど</rt></ruby>けもの】ご<ruby>不在<rt>ふざい</rt></ruby><ruby>連絡<rt>れんらく</rt></ruby>",
    characterName: "<ruby>宅配<rt>たくはい</rt></ruby><ruby>業者<rt>ぎょうしゃ</rt></ruby>",
    narration: "おうちにいると、メールが 1<ruby>通<rt>つう</rt></ruby> <ruby>届<rt>とど</rt></ruby>きました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "連絡通知", line: "荷物を持ち帰りました。再配達のご依頼は公式アプリからお願いいたします。" },
      { speaker: "主人公", line: "「頼んでいた本かな？ 伝票番号が書いてあるぞ。」" }
    ],
    point: "伝票番号が明記され、公式アプリや公式サイトからの手続きを案内する通知は本物の連絡です。",
    notification: "📱ピコン お荷物のおしらせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.elementaryDeliveryNoticeReal,
    desc: "お<ruby>留守<rt>るす</rt></ruby><ruby>通知<rt>つうち</rt></ruby>のメールが <ruby>届<rt>とど</rt></ruby>いた。<ruby>画像<rt>がめん</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "おうちの<ruby>人<rt>ひと</rt></ruby>に つたえて、ブックマークしてある <ruby>公式<rt>こうしき</rt></ruby>アプリから <ruby>伝票<rt>でんぴょう</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>で さい<ruby>配達<rt>はいたつ</rt></ruby>を たのむ", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>正規<rt>せいき</rt></ruby><ruby>確認<rt>かくにん</rt></ruby>】<ruby>公式<rt>こうしき</rt></ruby>アプリから でんぴょう<ruby>番号<rt>ばんごう</rt></ruby>を いれて あんぜんに さいはいたつを たのめたね！" }
    ],
    wrongChoices: [
      { text: "メールに <ruby>返信<rt>へんしん</rt></ruby>して、おうちの<ruby>暗証<rt>あんしょう</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>や パスワードを <ruby>書<rt>か</rt></ruby>いて <ruby>送<rt>おく</rt></ruby>ってしまう", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】たくはいびんの さいはいたつに パスワードなどは ふようです！ <ruby>情報<rt>じょうほう</rt></ruby>が もれてしまったよ。" },
      { text: "「さい<ruby>配達<rt>はいたつ</rt></ruby><ruby>手数料<rt>てすうりょう</rt></ruby>が <ruby>必要<rt>ひつよう</rt></ruby>」と かんちがいして、ネットで <ruby>見<rt>み</rt></ruby>つけた <ruby>怪<rt>あや</rt></ruby>しい<ruby>窓口<rt>まどぐち</rt></ruby>へ お<ruby>金<rt>かね</rt></ruby>を はらう", money: -12000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】ほんものの さいはいたつは <ruby>無料<rt>むりょう</rt></ruby>なのに、にせの まどぐちにお<ruby>金<rt>かね</rt></ruby>を とられたよ！" },
      { text: "「ふざいつうちメールは ぜんぶ さぎだ」と <ruby>思<rt>おも</rt></ruby>いこみ、なにも <ruby>確認<rt>かくにん</rt></ruby>せずに にもつを ほうりだす", money: -8000, principleTag: "fooled", damageType: "money", explain: "【<ruby>誤認<rt>ごにん</rt></ruby><ruby>拒絶<rt>きょぜつ</rt></ruby>】ホンモノの にもつが お<ruby>店<rt>みせ</rt></ruby>に もどってしまい、キャンセルりょうを せいきゅうされたよ！" }
    ]
  },
  {
    id: "elementary_q16", category: "real", source: "LINE公式", title: "【クーポン】10％OFF クーポンのおしらせ",
    characterName: "ショップ<ruby>公式<rt>こうしき</rt></ruby>LINE",
    narration: "いつも <ruby>利用<rt>りよう</rt></ruby>している お<ruby>店<rt>みせ</rt></ruby>の <ruby>公式<rt>こうしき</rt></ruby>LINEから メッセージが きました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "ショップ公式", line: "お会計時にレジでバーコードをご提示ください。" },
      { speaker: "主人公", line: "「クーポンが届いた！使ってみようかな？」" }
    ],
    point: "公式LINEの認証マークがあり、個人情報やカード入力を求めずにレジ提示だけで使えるクーポンは本物です。",
    notification: "📱ピコン お店からのクーポン！",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.elementarySummerCouponReal,
    desc: "お<ruby>店<rt>みせ</rt></ruby>から クーポンが <ruby>届<rt>とど</rt></ruby>いた。<ruby>画像<rt>がめん</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "<ruby>公式<rt>こうしき</rt></ruby>アカウントの みどりの<ruby>認証<rt>にんしょう</rt></ruby>マークを <ruby>確認<rt>かくにん</rt></ruby>し、お<ruby>買<rt>か</rt></ruby>いもののときに レジで <ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>せる", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>正規<rt>せいき</rt></ruby><ruby>確認<rt>かくにん</rt></ruby>】ホンモノの <ruby>公式<rt>こうしき</rt></ruby>クーポンだったね！ ただしく <ruby>確認<rt>かくにん</rt></ruby>して おトクに おかいものできたよ！" }
    ],
    wrongChoices: [
      { text: "「クーポンをつかうため」と <ruby>思<rt>おも</rt></ruby>いこみ、LINEの トーク<ruby>画面<rt>がめん</rt></ruby>に おうちの<ruby>住所<rt>じゅうしょ</rt></ruby>や でんわ<ruby>番号<rt>ばんごう</rt></ruby>を かいてしまう", money: -18000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】レジで <ruby>見<rt>み</rt></ruby>せるだけの クーポンなのに、いらない <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を <ruby>送<rt>おく</rt></ruby>ってしまったよ！" },
      { text: "「クーポンの こうにゅう<ruby>代<rt>だい</rt></ruby>が <ruby>必要<rt>ひつよう</rt></ruby>」と かんちがいし、お<ruby>小遣<rt>こづか</rt></ruby>いから お<ruby>金<rt>かね</rt></ruby>を <ruby>送金<rt>そうきん</rt></ruby>してしまう", money: -15000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】<ruby>無料<rt>むりょう</rt></ruby>の わりびきクーポンなのに、<ruby>勝手<rt>かって</rt></ruby>にお<ruby>金<rt>かね</rt></ruby>を はらってしまったよ！" },
      { text: "「ふだん こないクーポンは さぎだ！」と うたがい、<ruby>公式<rt>こうしき</rt></ruby>アカウントを つうほう・ブロックする", money: -8000, principleTag: "fooled", damageType: "money", explain: "【<ruby>誤認<rt>ごにん</rt></ruby><ruby>拒絶<rt>きょぜつ</rt></ruby>】ホンモノの おトクなクーポンを すててしまい、わりびきを うけることが できなかったよ。" }
    ]
  }
];

/* =========================================================
   【中高生モード用問題プール】（全16問・3原則思考型4択）
   ========================================================= */
const QUESTIONS_TEEN = [
  // ── 詐欺（11問） ──
  {
    id: "teen_q01", category: "scam", source: "SMS通知", title: "【警視庁】不正アクセス検知に関する緊急通知",
    characterName: "サイバー犯罪捜査課",
    narration: "スマホに1通のSMSが届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "通知メッセージ", line: "【重要】24時間以内に下記URLより本人認証を行わない場合、全口座を凍結いたします。" },
      { speaker: "主人公", line: "「口座凍結って書いてある…焦るな、どう対応すればいいんだ？」" }
    ],
    point: "警察がSMSでパスワード認証を求めたり、URLリンクから口座の照会を指示することは絶対にありません。",
    notification: "📱ピコン 新着通知が届きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenPoliceFreezeScam,
    desc: "警察を名乗るSMSが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "SMS本文のリンクは開かず、自分で調べた最寄りの警察署の代表電話へ問い合わせる", money: 0, principleTag: "safe", explain: "正解！【騙されない・警察へ確認】焦らせる脅迫通知はフィッシング詐欺。自発的に調べた番号で確認が鉄則！" }
    ],
    wrongChoices: [
      { text: "口座が凍結されると困るので、リンク先で銀行の口座番号・ログインID・暗証番号を入力する", money: -25000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】口座情報を盗み取られ、残高から25,000円が即座に不正送金されました。" },
      { text: "「調査協力の供託金」として指定口座へお金を急いで振り込む", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】偽警察詐欺にお金を騙し取られ、大切な貯金30,000円を失いました。" },
      { text: "SMS記載の「捜査担当直通電話」に連絡し、「誤認です」と釈明して指示に従う", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽窓口で言葉巧みに言いくるめられ、保釈保証金名目で15,000円払わされました。" }
    ]
  },
  {
    id: "teen_q02", category: "scam", source: "SNSのDM", title: "【当選確定】限定プレゼントキャンペーン",
    characterName: "人気配信者プレゼント企画",
    narration: "SNSのDMに通知が届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "アカウント", line: "当選確定！発送手配のため、下記URLにて情報をご入力ください。" },
      { speaker: "主人公", line: "「プレゼントがもらえるの！？確認してみよう。」" }
    ],
    point: "有名人を騙る偽アカウントです。「無料プレゼント」を口実に個人情報やクレカ情報を盗む手口に注意しましょう。",
    notification: "📱ピコン 当選DMが届きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenFakeGiftScam,
    desc: "SNSでプレゼント当選のDMが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "DMのリンクは開かず、本物の配信者の公式アカウント（IDや認証マーク）で企画の有無を確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・公式確認】アイコンを真似た偽アカウントです。公式マークやユーザーIDで正しく見破れました！" }
    ],
    wrongChoices: [
      { text: "プレゼント発送フォームに、自分の氏名・自宅住所・親のクレカ番号を入力する", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】個人情報とカード番号を盗まれ、海外サイトで25,000円分不正決済されました。" },
      { text: "「送料500円なら安い」とPayPayや電子マネーで指定された相手に送金する", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】お金を払っても商品は一切届かず、「通関手数料」とさらに要求されました。" },
      { text: "「本物ですか？ 証拠に限定動画を見せてください」とDMで相手とやり取りする", money: -12000, principleTag: "fooled", damageType: "personal_info", explain: "【相手に騙された！】偽の動画リンクを開かされ、ウイルス感染してスマホのデータを盗まれました。" }
    ]
  },
  {
    id: "teen_q03", category: "real", source: "SMS通知", title: "【通信会社】データ通信量に関するお知らせ",
    characterName: "通信キャリア公式",
    narration: "部活動の帰り道、スマホに通知が届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "通信キャリア", line: "今月のデータ通信量が上限に達しました。公式アプリよりお手続きください。" },
      { speaker: "主人公", line: "「動画を見すぎたかな？確認してみよう。」" }
    ],
    point: "SMS本文に直接ログインURLを載せず、「公式アプリやブックマークからアクセスしてください」と案内する通知は正規の公式通知です。",
    notification: "📱ピコン 新着通知が届きました",
    bg: IMAGE_ASSETS.backgrounds.schoolRoute,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.teenDataNoticeReal,
    desc: "通信会社から通知が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "通知だけで詐欺と決めつけず、普段使っている公式アプリを開いて実際の通信量と利用状況を確認する", money: 0, principleTag: "safe", explain: "正解！【正規確認】直リンクを載せず公式アプリへ誘導する通知は安全。公式アプリから正しく確認できました！" }
    ],
    wrongChoices: [
      { text: "ネット検索で見つけた「通信量制限解除サイト」に自分の電話番号とパスワードを入力する", money: -20000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】怪しい非公式サイトにログイン情報を渡してしまい、アカウントを盗まれました。" },
      { text: "制限解除のためと思い込み、ネットで見つけた怪しい窓口へ電子マネーを送金する", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】正規の手続きではない偽窓口にお金を騙し取られてしまいました。" },
      { text: "「SMSは全部詐欺だ」と思い込み、携帯の契約を即解約しに行く", money: -8000, principleTag: "fooled", damageType: "money", explain: "【誤認拒絶】正規のお知らせに過剰反応して解約違約金と再契約事務手数料8,000円がかかりました。" }
    ]
  },
  {
    id: "teen_q04", category: "real", source: "メール通知", title: "【不在通知】お荷物のお届けについて",
    characterName: "宅配業者",
    narration: "休日に家で過ごしていると、メールが届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "連絡通知", line: "荷物を持ち帰りました。再配達のご依頼は公式LINEまたは公式サイトよりお願いいたします。" },
      { speaker: "主人公", line: "「通販で買った荷物かな？確認してみよう。」" }
    ],
    point: "伝票番号が明記され、公式アプリ・公式サイトからの再配達手続きを案内する通知は正規の連絡です。",
    notification: "📱ピコン 新着メールが届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.teenDeliveryNoticeReal,
    desc: "宅配の不在通知が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "ブックマークしてある宅配会社の公式サイトを開き、伝票番号を入力して再配達を依頼する", money: 0, principleTag: "safe", explain: "正解！【正規確認】送られてきたリンクではなく自ら公式サイトを開いて伝票番号検索するのが最も安全です！" }
    ],
    wrongChoices: [
      { text: "メールに返信して、自分の住所・電話番号・クレジットカード番号を送ってしまう", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】再配達にカード番号は不要です！送信専用アドレス宛に個人情報を流出させました。" },
      { text: "「再配達には手数料が必要」と誤認し、ネットで見つけた有料代行サービスに支払う", money: -12000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】正規の再配達は無料なのに、不要な代行手数料を支払ってしまいました。" },
      { text: "「不在通知は詐欺が多いから」とメールを削除し、荷物の受け取りを完全に放置する", money: -8000, principleTag: "fooled", damageType: "money", explain: "【誤認拒絶】本物の荷物だったため保管期限切れで返送され、往復送料と手数料8,000円を請求されました。" }
    ]
  },
  {
    id: "teen_q05", category: "help", source: "街中（銀行ATM）", title: "ATMコーナーでの出来事",
    characterName: "困っている高齢者",
    narration: "ショッピングモールのATMコーナーを通ると、電話をしながらボタンを操作しているおばあさんを見かけました。",
    dialogue: [
      { speaker: "おばあさん", line: "（電話口へ）「はい、言われた通り操作しました！ これで医療費が戻ってくるんですね…？」" },
      { speaker: "主人公", line: "「電話で指示を受けながら操作してるな…どうしよう？」" }
    ],
    point: "ATMを操作して還付金が受け取れることは絶対にありません！ 周囲の大人の協力を得て止めましょう！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.atm,
    character: IMAGE_ASSETS.characters.elderlyWomanCane,
    screenshot: null,
    desc: "おばあさんが電話で指示を受けながらATMを操作している。あなたならどうする？",
    correctChoices: [
      { text: "「おばあさん、それ還付金は受け取れません！詐欺かもしれません！」と声をかけ、操作を止めて銀行員や店員を呼ぶ", money: 300, principleTag: "safe", explain: "✨ 正解！【騙されない・周囲と連携】ATM操作で還付金が戻ることは絶対にありません。声をかけて被害を防げました！（お礼+300円）" }
    ],
    wrongChoices: [
      { text: "電話を代わり、おばあさんの代わりに口座番号や暗証番号を電話口で伝えてしまう", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】暗証番号を犯人に教えてしまい、おばあさんの預金を全額奪わせてしまいました。" },
      { text: "おばあさんの代わりに操作を手伝い、相手の言う通りの送金ボタンを押してあげる", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】詐欺の送金を手伝ってしまい、高齢者の大切な預金を奪わせてしまいました。" },
      { text: "電話口の相手から「市役所の年金課です」と怒鳴られ、「本当なんだ」とそのまま見守る", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】犯人の脅迫に騙されて止められず、高齢者は全額送金してしまいました。" }
    ]
  },
  {
    id: "teen_q06", category: "scam", source: "自宅訪問", title: "近隣工事に伴う屋根点検のご案内",
    characterName: "近隣工事作業員",
    narration: "自宅で過ごしていると玄関のチャイムが鳴り、作業服を着た男が立っていました。\n男：「近所で工事をしている者ですが、お宅の屋根の瓦がズレてますよ。今ならハシゴがあるので無料で見てあげます。」",
    dialogue: [
      { speaker: "作業員", line: "「今すぐ屋根に登って点検しましょうか？」" },
      { speaker: "主人公", line: "「親は外出中だけど…どうしよう？」" }
    ],
    point: "突然の訪問点検は、自ら瓦を割って高額な修繕契約を迫る「点検商法」の典型手口です！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.workerLabor,
    screenshot: null,
    desc: "「屋根を無料で点検する」と訪問業者が家に入ろうとしている。あなたならどうする？",
    correctChoices: [
      { text: "「親がいないので対応できません。名刺を置いてお引き取りください」とドアを開けずに断る", money: 0, principleTag: "safe", explain: "正解！【喋らない・家に入れない】突然の点検業者は絶対に敷地に入れないのが鉄則です！" }
    ],
    wrongChoices: [
      { text: "「今親が留守なので、親の携帯電話番号と帰宅時間を教えます」と伝える", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】親の連絡先と留守時間を教えてしまい、執拗な脅迫電話を受けるようになりました。" },
      { text: "「仮押さえ費用として1万円前払いが必要」と言われ、財布から手渡してしまう", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】お金を手渡した瞬間に業者は立ち去り、1円も戻りませんでした。" },
      { text: "親切な業者だと思い、屋根に登ってもらって診断結果の説明を聞く", money: -25000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】わざと瓦を壊され、「今すぐ修理しないと崩れる」と高額契約を結ばされました。" }
    ]
  },
  {
    id: "teen_q07", category: "scam", source: "SNSチャット", title: "【チャット】友達からの緊急メッセージ",
    characterName: "友達のアカウント",
    narration: "部活の帰り道、仲の良い友達のSNSアカウントから連絡が届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "友達？", line: "「お願いだから急いで！ 誰にも言わないで！」" },
      { speaker: "主人公", line: "「急にお願いされたな…どうしたんだろう？」" }
    ],
    point: "友達のアカウントが乗っ取られている可能性が高いです。「電子マネーの番号を送って」は100%詐欺を疑いましょう。",
    notification: "📱ピコン 友達からの新着メッセージ",
    bg: IMAGE_ASSETS.backgrounds.schoolRoute,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenFriendMoneyScam,
    desc: "友達からメッセージが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "チャットには返信せず、直接電話をかけるか対面で「さっき連絡くれた？」と本人確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・別ルート確認】アカウント乗っ取り詐欺です。別ルートで本人確認が鉄則！" }
    ],
    wrongChoices: [
      { text: "「電子マネーは買えないけど、認証コードなら届いたから教えるね」とSMS番号を伝える", money: -20000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】自分のアカウントの認証コードを教えてしまい、アカウントを乗っ取られました。" },
      { text: "親友のピンチだからと急いでコンビニへ行き、1万円分のカードを買って番号を送る", money: -25000, principleTag: "pay", damageType: "line_takeover", explain: "【払ってしまった！】乗っ取り詐欺です！番号は即座に使われ、「まだ足りない」とさらに奪われました。" },
      { text: "チャット上で「合言葉は？ 本当に本人？」と質問してやり取りを続ける", money: -12000, principleTag: "fooled", damageType: "line_takeover", explain: "【相手に騙された！】「疑うのかよ！」と逆上されて言いくるめられ、結局お金を送金してしまいました。" }
    ]
  },
  {
    id: "teen_q08", category: "help", source: "家庭（リビング）", title: "お母さんにかかってきた電話",
    characterName: "母",
    narration: "学校から帰ると、お母さんが青ざめた顔で電話を切るところでした。\n母：「警察から電話があって…口座のお金を別の口座に移しなさいと言われたの…」",
    dialogue: [
      { speaker: "母", line: "「今すぐ振り込まないと大変なことになるのかしら…」" },
      { speaker: "主人公", line: "「お母さん、落ち着いて！」" }
    ],
    point: "警察が電話で「指定口座にお金を移せ」と指示することは100%ありません。偽警察詐欺です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.motherWorried,
    screenshot: null,
    desc: "お母さんが電話の指示に従ってお金を移そうとしている。あなたならどうする？",
    correctChoices: [
      { text: "「お母さん落ち着いて！本物の警察が電話で口座を移せと言うことは絶対にないよ！110番で確認しよう！」と止める", money: 300, principleTag: "safe", explain: "✨ 家族を救ったね！【騙されない・警察へ確認】電話で「口座を移せ」は偽警察詐欺。しっかり止めて被害を防げました！（お礼+300円）" }
    ],
    wrongChoices: [
      { text: "電話をかけ直し、家族の通帳の暗証番号や預金残高を相手にすべて伝えてしまう", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】口座情報を教えてしまい、預金を不正引き出しされてしまいました。" },
      { text: "逮捕されたら大変だから、お母さんと一緒に銀行へ行って急いで全額振り込む", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】家族の大切な貯金25,000円が全額騙し取られてしまいました。" },
      { text: "電話の相手から「捜査の妨害をするな」と脅され、怖くなってそのまま様子を見る", money: -20000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】犯人の脅迫を信じてしまい、お母さんはパニックのまま送金してしまいました。" }
    ]
  },
  {
    id: "teen_q09", category: "real", source: "公式SNS投稿", title: "【公式X】大型アップデート記念キャンペーン",
    characterName: "ゲーム公式X",
    narration: "X（旧Twitter）を見ていると、ゲームの投稿が流れてきました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "ゲーム公式", line: "大型アップデート記念！ガチャ石プレゼントキャンペーン開催！" },
      { speaker: "主人公", line: "「キャンペーンの案内だ。確認してみよう。」" }
    ],
    point: "公式認証マークを確認し、外部サイトへの誘導がなくゲーム内へ直接付与されるキャンペーンは安全な公式告知です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.teenGameCampaignReal,
    desc: "SNSにゲームのキャンペーン情報が表示された。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "公式アカウントの認証マークを確認し、ゲームを起動してゲーム内お知らせとボックスを確認する", money: 0, principleTag: "safe", explain: "正解！【正規確認】外部誘導のない正規の公式キャンペーンです。ゲーム内から安全に確認できました！" }
    ],
    wrongChoices: [
      { text: "投稿のリプライ欄に、自分のゲームIDと引き継ぎパスワードを書き込んでしまう", money: -25000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】公開された引き継ぎコードを見られてアカウントを奪われてしまいました。" },
      { text: "「受け取り手数料が必要」と便乗してきた偽アカウントにお金を送金してしまう", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】公式に便乗した詐欺アカウントにお金を騙し取られてしまいました。" },
      { text: "「お得すぎるキャンペーンは全部詐欺だ」と決めつけ、ゲームのアカウントを削除する", money: -10000, principleTag: "fooled", damageType: "account", explain: "【誤認拒絶】本物のキャンペーンだったのにアカウントを失い、復旧費用がかかってしまいました。" }
    ]
  },
  {
    id: "teen_q10", category: "scam", source: "スマートフォン着信", title: "【着信】重要確認センターより",
    characterName: "自動音声・不審な発信者",
    narration: "スマホに着信がありました。電話に出ると、自動音声が流れてきました。\n画面の情報を確認してみよう。",
    dialogue: [
      { speaker: "自動音声", line: "「こちらは重要確認センターです。本人確認情報をご入力ください。」" },
      { speaker: "主人公", line: "「海外からの電話番号だな…何の確認だろう？」" }
    ],
    point: "見覚えのない国際電話や不審な自動音声で個人情報を要求されたら、すぐに切断しましょう。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenOverseasCallScam,
    desc: "見覚えのない番号から電話があり、自動音声が流れた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "個人情報は一切入力せず、その場で直ちに電話を切って着信拒否に設定する", money: 0, principleTag: "safe", explain: "正解！【喋らない・切断する】国際電話を利用した詐欺です。一切対応せずに切断が正解！" }
    ],
    wrongChoices: [
      { text: "ガイダンスに従って、自分の氏名・生年月日・暗証番号をプッシュ入力する", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】暗証番号と生年月日を盗まれ、決済サービスから25,000円不正利用されました。" },
      { text: "「書類の保管手数料」を支払うよう案内され、クレジットカード番号を入力する", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】カード情報を不正利用され、高額な国際決済被害に遭ってしまいました。" },
      { text: "「オペレーターに繋ぐ」を押して、片言の相手に「何の書類ですか？」と問い合わせる", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】高額な国際通話料金が発生した上、言葉巧みに脅迫されて送金させられました。" }
    ]
  },
  {
    id: "teen_q11", category: "scam", source: "Instagram DM", title: "【DM】Instagramのフォロワーからのメッセージ",
    characterName: "親密なフォロワー",
    narration: "Instagramで、相互フォローの相手からメッセージが届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "相手", line: "「私の指示通りに専用サイトに入金するだけだよ。興味ない？」" },
      { speaker: "主人公", line: "「投資の案内が届いたな…どうしよう？」" }
    ],
    point: "友達がフォローしていても安全とは限りません。SNSで親密になった後に投資や送金を勧めるのは詐欺です。",
    notification: "📱ピコン 新着DMが届きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenInvestmentDmscam,
    desc: "SNSで知り合った相手からメッセージが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "投資の話には一切乗らず、これ以上やり取りを続けずに相手をブロック・通報する", money: 0, principleTag: "safe", explain: "正解！【騙されない・遮断する】SNS型投資詐欺です。どれだけ親しくなってもお金の話は遮断！" }
    ],
    wrongChoices: [
      { text: "口座開設のために、自分の運転免許証や保険証の写真を送ってしまう", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】身分証が悪用され、闇バイトの契約や偽口座開設に使われてしまいました。" },
      { text: "友達もフォローしているから信用し、お小遣いの1万円を指定口座へ入金してみる", money: -25000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】投資詐欺です！入金したお金は引き出せず、さらに追加請求されました。" },
      { text: "「本当にお金が増えた実績を見せて」と頼んで相手の説明を詳しく聞く", money: -12000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽の残高スクショを見せられて信じ込み、結局お金を払ってしまいました。" }
    ]
  },
  {
    id: "teen_q12", category: "scam", source: "ネット通販", title: "【数量限定】人気アイドル限定グッズ販売",
    characterName: "限定グッズショップ",
    narration: "通販サイトで、完売した限定グッズの販売ページを見つけました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "販売ページ", line: "【残り1点】本日23:59までの特別価格！" },
      { speaker: "主人公", line: "「欲しかったグッズだ。在庫があるぞ。」" }
    ],
    point: "「残り1点」「本日まで」と煽る非公式の怪しいショップは、偽物が届くかお金だけ奪われる危険があります。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenIdolGoodsScam,
    desc: "通販サイトに商品が掲載されている。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "衝動買いせず、公式サイトで再販情報がないか確認し、販売元の情報が怪しいサイトでは購入しない", money: 0, principleTag: "safe", explain: "正解！【騙されない・公式確認】悪質な転売・偽通販の罠を見破り、冷静に被害を回避できました！" }
    ],
    wrongChoices: [
      { text: "購入手続き画面で、自分の氏名・住所・クレジットカード情報を入力する", money: -30000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】カード情報を抜き取られ、海外サイトで限度額いっぱいまで不正利用されました。" },
      { text: "どうしても欲しいので、貯金を崩して39,800円を指定口座へ振り込む", money: -25000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】振込詐欺です！入金した瞬間にサイトが閉鎖され、商品は届きませんでした。" },
      { text: "ショップの「お問い合わせチャット」に「公式の正規品ですか？」と質問する", money: -12000, principleTag: "fooled", damageType: "personal_info", explain: "【相手に騙された！】「本物です」と偽の鑑定書画像を送られて信じてしまい、購入してしまいました。" }
    ]
  },
  {
    id: "teen_q13", category: "scam", source: "SNS募集", title: "【即日払い】書類運搬アシスタント募集",
    characterName: "高額バイト募集",
    narration: "SNSで、バイト募集の投稿を見つけました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "募集担当DM", line: "「誰でもできる簡単なお仕事です。身分証の写真を送ってください。」" },
      { speaker: "主人公", line: "「荷物を運ぶだけの仕事か…」" }
    ],
    point: "「荷物や書類を運ぶだけ」は特殊詐欺の『受け子・出し子』です！一度身分証を送ると脅されて抜け出せなくなります！",
    notification: "📱ピコン バイト募集への返信",
    bg: IMAGE_ASSETS.backgrounds.schoolRoute,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenDarkJobScam,
    desc: "SNSでバイト募集の案内を見つけた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "「仕事内容に対して報酬が高すぎる。闇バイト（犯罪の受け子）だ」と見抜いて応募せず通報する", money: 0, principleTag: "safe", explain: "正解！【騙されない・応募しない】特殊詐欺の受け子募集です！関わると逮捕されます。見破って正解！" }
    ],
    wrongChoices: [
      { text: "運ぶだけなら大丈夫だと思い、自分の学生証・住所・顔写真を送って応募する", money: -30000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】個人情報を握られて脅迫され、犯罪の実行役として抜け出せなくなりました。" },
      { text: "「登録手数料として先に5,000円必要」と言われ、電子マネーを送金する", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】お金を騙し取られた上、詐欺グループの名簿に登録されてしまいました。" },
      { text: "「具体的な仕事内容と荷物の中身は何ですか？」とDMで質問してみる", money: -15000, principleTag: "fooled", damageType: "personal_info", explain: "【相手に騙された！】「違法性はないよ」と言いくるめられて電話番号を教え、執拗に勧誘されました。" }
    ]
  },
  {
    id: "teen_q14", category: "scam", source: "SNS投稿", title: "【SNS譲渡】人気ライブチケットお譲りします",
    characterName: "チケット譲渡アカウント",
    narration: "SNSで、ライブチケット譲渡の投稿を見つけました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "譲渡希望者", line: "「PayPayで先払い確認後に電子チケットを分配します！」" },
      { speaker: "主人公", line: "「完売したチケットだ。連絡してみようかな。」" }
    ],
    point: "SNSでの個人間先払い取引は極めて危険です。送金後にブロックされて逃げられる詐欺が多発しています。",
    notification: "📱ピコン チケット譲渡のDM",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenTicketResaleScam,
    desc: "SNSでチケット譲渡の案内が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "「SNSでの個人間先払いはチケット詐欺の典型」と判断し、公式リセール（再販）以外では購入しない", money: 0, principleTag: "safe", explain: "正解！【騙されない・公式リセール利用】個人間の先払いは99%詐欺です。公式トレード利用が鉄則！" }
    ],
    wrongChoices: [
      { text: "取引の保証のためと言われ、自分の名前・電話番号・学生証の写真を送ってしまう", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】自分の身分証画像が悪用され、別のチケット詐欺のなりすましに使われました。" },
      { text: "チケットが欲しいので、言われた通りPayPayで代金12,000円を相手に先送りする", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】チケット詐欺です！送金した瞬間にアカウントをブロックされ逃げられました。" },
      { text: "相手から送られてきた「身分証の写真」を見て本物だと信じ込み取引を進める", money: -18000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】身分証は他人の拾い画像でした。信用して送金したお金は全額奪われました。" }
    ]
  },
  {
    id: "teen_q15", category: "scam", source: "Instagram DM", title: "【警告】著作権侵害に関する申し立て通知",
    characterName: "偽著作権サポート",
    narration: "SNSに、警告のダイレクトメッセージが届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "偽サポート", line: "【著作権侵害】24時間以内にリンクから異議申し立てを行ってください。" },
      { speaker: "主人公", line: "「アカウントが削除されるって書いてある…どうしよう？」" }
    ],
    point: "「アカウント削除」でパニックにさせ、偽ログイン画面にパスワードを入力させて乗っ取るフィッシングです。",
    notification: "📱ピコン 【警告】著作権侵害通知",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenCopyrightScam,
    desc: "著作権侵害の警告DMが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "DM内のリンクは開かず、公式アプリの正規の「設定・アカウントステータス」画面から確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・公式設定で確認】アカウント乗っ取りを狙うフィッシングです。公式画面から確認して正解！" }
    ],
    wrongChoices: [
      { text: "アカウント削除を避けるため、DMのリンクを開いてログインIDとパスワードを入力する", money: -25000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】パスワードを盗まれて乗っ取られ、勝手に友達へ詐欺メッセージを拡散されました。" },
      { text: "「著作権侵害の解決手数料」として電子マネーのコードを購入して送信する", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】お金を払ってもアカウントは保護されず、金銭だけを騙し取られました。" },
      { text: "「何の投稿が侵害ですか？」と警告DMに直接返信してサポートとやり取りする", money: -12000, principleTag: "fooled", damageType: "account", explain: "【相手に騙された！】偽サポートに言葉巧みに認証コードを聞き出され、乗っ取られてしまいました。" }
    ]
  },
  {
    id: "teen_q16", category: "scam", source: "SNS動画広告", title: "【広告】話題の副業アプリのご紹介",
    characterName: "AI副業動画広告",
    narration: "SNSを見ていると、動画広告が流れてきました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "有名タレント（AI動画）", line: "「私もこのアプリを毎日使ってます！特別なボーナスがもらえますよ！」" },
      { speaker: "主人公", line: "「あの有名人が紹介してるアプリだ。どうなんだろう？」" }
    ],
    point: "AI技術（ディープフェイク）で有名人の顔や声を偽装した詐欺広告です。本人が動画で話していても信用してはいけません。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenAiFakeAdScam,
    desc: "有名人が出演する動画広告が流れてきた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "「AIで作られた有名人の偽動画（ディープフェイク）だ」と見破り、本人の公式SNSで確認して無視する", money: 0, principleTag: "safe", explain: "正解！【騙されない・AI偽動画を見破る】ディープフェイク偽広告です。有名人が副業を勧める広告は詐欺！" }
    ],
    wrongChoices: [
      { text: "信用してアプリをダウンロードし、自分の氏名・生年月日・銀行口座を登録する", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】登録した口座情報を抜き取られ、有料プランの高額請求被害に遭いました。" },
      { text: "「ボーナス受取のための初回チャージ」として3,000円をアプリに入金する", money: -18000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】入金したお金は戻らず、「システム利用料」としてさらに請求されました。" },
      { text: "広告のレビュー欄にある「本当に稼げました！」という絶賛コメントを信じて登録する", money: -15000, principleTag: "fooled", damageType: "personal_info", explain: "【相手に騙された！】レビューはすべてサクラの自作自演でした。騙されて被害に遭いました。" }
    ]
  }
];

/* =========================================================
   【一般（大人）モード用問題プール】（全16問・最高難易度3原則思考型）
   ========================================================= */
const QUESTIONS_ADULT = [
  // ── 詐欺（12問） ──
  {
    id: "adult_q01", category: "scam", source: "SMS通知", title: "【重要】会員登録の自動更新完了のお知らせ",
    characterName: "動画サービスカスタマー",
    narration: "スマートフォンのSMSに通知が届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "通知メッセージ", line: "【重要】動画見放題プランが自動更新されました。解約手続きはお電話にて承ります。" },
      { speaker: "あなた", line: "（高額な請求通知が届いている…どう対応すべきか？）" }
    ],
    point: "身に覚えのない自動更新を装い、焦らせて電話をかけさせて電子マネーや振込を迫る架空請求詐欺です。",
    notification: "📱ピコン 新着メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.subscriptionScam,
    desc: "自動更新完了の通知が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "記載された電話番号には絶対に連絡せず、普段利用している正規アプリの契約管理画面から確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・公式マイページ確認】架空請求詐欺です。相手が提示した連絡先ではなく公式画面で確認が鉄則！" }
    ],
    wrongChoices: [
      { text: "解約手続きのためと言われ、SMSの返信で氏名・生年月日・クレジットカード番号を伝える", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】カード情報を盗まれ、海外サイトで限度額まで不正決済されました。" },
      { text: "「本日中に解約金を払えば返金される」と言われ、指定口座へ49,800円を振り込む", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】架空請求詐欺にお金を支払ってしまい、全額騙し取られました。" },
      { text: "引き落とされたら困るので、SMSに記載された解約窓口の番号へ直ちに電話をかける", money: -20000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】詐欺グループに繋がり、「解約には保証金が必要」と騙し取られました。" }
    ]
  },
  {
    id: "adult_q02", category: "scam", source: "Eメール", title: "【国税庁】過年度税額還付のご案内",
    characterName: "国税庁税務相談課",
    narration: "メールボックスに1通のメールが届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "e-Tax通知メール", line: "【重要】還付金の送金準備が完了いたしました。下記リンクより口座情報を照会してください。" },
      { speaker: "あなた", line: "（国税庁からの還付金案内だ。確認してみよう。）" }
    ],
    point: "国税庁や税務署がメールの直リンクから口座情報やカード番号、暗証番号を入力させることは絶対にありません。",
    notification: "📱ピコン 新着メールが届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.taxRefundScam,
    desc: "国税庁からの還付金案内メールが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "メールのリンクは一切開かず、検索等で直接開いた国税庁の正規e-Taxマイページから通知を確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・公式サイト照会】フィッシング詐欺です。公的機関の重要通知は自発的に公式サイトへログインして確認！" }
    ],
    wrongChoices: [
      { text: "還付金を受け取るため、リンクを開いて銀行のログインID・暗証番号を入力する", money: -30000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】入力した口座情報から不正送金され、預金を全額奪われました。" },
      { text: "「払戻手数料として先に3,000円が必要」と案内され、クレジットカードで決済する", money: -25000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】カード情報を不正利用され、高額な不正請求被害に遭いました。" },
      { text: "メール記載の税務相談電話番号に電話をかけ、「何年度の還付金ですか？」と問い合わせる", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽の税務窓口に繋がり、「手続き費用」として電子マネーを要求されました。" }
    ]
  },
  {
    id: "adult_q03", category: "scam", source: "SMS通知", title: "【〇〇銀行】異常取引検知に伴う取引規制のお知らせ",
    characterName: "銀行セキュリティデスク",
    narration: "スマートフォンのSMSに、利用している銀行から緊急通知が届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "偽サイト画面", line: "本人確認のため、口座番号とスマホに届いたワンタイムパスワードを入力してください。" },
      { speaker: "あなた", line: "（取引規制がかかっているようだ…どう対応すべきか？）" }
    ],
    point: "「不正利用検知」で焦らせ、本物の銀行から届いたワンタイムパスワード（OTP）を入力させて不正送金する手口です。",
    notification: "📱ピコン 新着メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.bankOtpScam,
    desc: "銀行からの取引規制SMSが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "SMSのリンクは絶対に開かず、普段使っている正規の公式バンキングアプリを直接起動して状況を確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・公式アプリ確認】ワンタイムパスワード搾取型フィッシングです。公式アプリから直接確認して完全防御！" }
    ],
    wrongChoices: [
      { text: "規制を解除するため、リンク先で口座番号と届いたワンタイムパスワードを入力する", money: -30000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】入力した瞬間に犯人側で送金が実行され、口座から30,000円が即座に不正送金されました。" },
      { text: "「セキュリティ解除手数料」が必要と表示されたため、指定口座へ振り込みを行う", money: -25000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】解除手数料名目でお金を奪われ、さらに追加送金を要求されました。" },
      { text: "SMSに記載されたセキュリティセンターの番号へ電話して指示を仰ぐ", money: -18000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】犯人に繋がり、「一時的な安全口座」にお金を全額移すよう指示され騙し取られました。" }
    ]
  },
  {
    id: "adult_q04", category: "scam", source: "電話・LINE誘導", title: "【重要】捜査手続きに関するご連絡",
    characterName: "警察庁捜査二課",
    narration: "警察を名乗る人物から電話があり、LINEを追加するよう指示されました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "自称・捜査官", line: "「保釈保証金としてこちらの指定口座へ一時供託してください。」" },
      { speaker: "あなた", line: "（書類の画像が送られてきた…どう対応すべきか？）" }
    ],
    point: "警察がSNS（LINE）で事情聴取を行ったり、逮捕状の画像を送ったり、保釈金を振り込ませることは100%ありません。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.fakeArrestWarrant,
    desc: "警察を名乗る人物からLINEで書類が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "指示には一切従わず通話を切り、相手の連絡先ではなく自ら調べた警察署の代表番号へ通報・照会する", money: 0, principleTag: "safe", explain: "正解！【騙されない・警察へ確認】LINE誘導型の偽警察詐欺です。警察がSNSで金銭を要求することは絶対にありません！" }
    ],
    wrongChoices: [
      { text: "身の潔白を証明するため、自分の身分証の両面写真と銀行口座情報をLINEで送る", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】身分証が悪用されて偽の銀行口座を作られ、犯罪インフラとして売買されました。" },
      { text: "逮捕されるのが怖いので、指示された指定口座へ保証金の一部を急いで振り込む", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】特殊詐欺です！振り込んだ保証金30,000円はそのまま奪われ、逃げられました。" },
      { text: "LINE通話で相手の警察官（自称）の取り調べを受け、相手の指示通りに資産状況を説明する", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】巧みに言いくるめられて資産を特定され、全額送金させられてしまいました。" }
    ]
  },
  {
    id: "adult_q05", category: "scam", source: "SNS広告・LINE", title: "【招待】著名アナリスト限定投資勉強会",
    characterName: "有名アナリストアシスタント",
    narration: "SNS広告からLINEグループに案内されました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "グループ管理者", line: "「明日公開の銘柄です。こちらの専用プラットフォームへご入金ください。」" },
      { speaker: "あなた", line: "（グループ内で多くの人がやり取りしているな…）" }
    ],
    point: "有名人の肖像を無断悪用した偽広告からLINEグループへ誘導し、サクラ全員で煽って入金させる「SNS型投資詐欺」です。",
    notification: "📱ピコン グループへの招待が届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.investmentGroupScam,
    desc: "LINEグループで投資案内が行われている。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "著名人の公式SNSやニュースで投資詐欺の注意喚起を確認し、LINEグループを即座に退会・通報する", money: 0, principleTag: "safe", explain: "正解！【騙されない・公式確認】SNS型投資詐欺です。グループ内の「儲かった」という投稿はすべてサクラの自作自演！" }
    ],
    wrongChoices: [
      { text: "口座開設用フォームに、自分のマイナンバーや銀行口座のログイン情報を登録する", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】大切な金融情報が抜き取られ、不正送金被害に遭ってしまいました。" },
      { text: "他の参加者も全員利益を出しているので、推奨された取引所へまず少額を入金してみる", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】投資詐欺です！入金した30,000円は引き出せず、「出金税」とさらに要求されました。" },
      { text: "「本当にアナリスト本人ですか？」とグループ内で質問し、サクラたちの回答を信用する", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】他のサクラ参加者たちから一斉に言いくるめられ、安心させられて入金してしまいました。" }
    ]
  },
  {
    id: "adult_q06", category: "scam", source: "電話・訪問勧誘", title: "火災保険を活用した住宅修繕のご案内",
    characterName: "住宅災害コンサルタント",
    narration: "自宅に業者から連絡がありました。\n「火災保険を使えば自己負担ゼロで屋根を修理できます。申請手続きはこちらで代行します。」",
    dialogue: [
      { speaker: "業者", line: "「保険金が下りたらその中から工事費をいただきますのでご安心ください。」" },
      { speaker: "あなた", line: "（保険で修繕できるという案内だが…どう対応すべきか？）" }
    ],
    point: "経年劣化を自然災害と偽って保険請求することは保険金詐欺（犯罪）に該当し、高額な違約金を請求されるトラブルが多発しています。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerLabor,
    screenshot: IMAGE_ASSETS.screenshots.insuranceRepairScam,
    desc: "「火災保険で自己負担なく修繕できる」と案内された。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "「虚偽の理由で保険申請することはできない」ときっぱり断り、契約している正規の保険会社へ相談する", money: 0, principleTag: "safe", explain: "正解！【騙されない・正規保険会社へ相談】不正請求トラブルです。経年劣化を偽る申請は犯罪リスクがあります！" }
    ],
    wrongChoices: [
      { text: "保険証券を見せて、契約内容や保険証券番号を業者にすべて控えさせる", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】保険情報を勝手に使われて不正申請され、保険会社から契約解除されました。" },
      { text: "「調査手数料」として、契約前に業者へ30,000円の前払金を支払ってしまう", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】前金を払った後、業者と音信不通になりお金を持ち逃げされました。" },
      { text: "「みんなやってますよ」という業者の説明を信じて、申請代行の委任状にサインする", money: -25000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】不正申請と判定されて保険金は下りず、業者から高額な違約金25,000円を請求されました。" }
    ]
  },
  {
    id: "adult_q07", category: "help", source: "街中（コンビニATM）", title: "コンビニATMコーナーにて",
    characterName: "困っている高齢者",
    narration: "コンビニのATM前で、おばあさんがスマホで誰かと通話しながらATMを操作しています。\n電話口から指示が聞こえてきます。",
    dialogue: [
      { speaker: "おばあさん", line: "「これで給付金が私の口座に振り込まれるんですね…？」" },
      { speaker: "あなた", line: "（電話で数字を入力させているな…どう対応すべきか？）" }
    ],
    point: "ATMの操作で給付金や還付金が受け取れることは絶対にありません。数字の入力は送金額を指定させられています。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.atm,
    character: IMAGE_ASSETS.characters.elderlyWomanCane,
    screenshot: null,
    desc: "おばあさんが電話で指示を受けながらATMを操作している。あなたならどうする？",
    correctChoices: [
      { text: "「おばあさん、それ還付金詐欺です！送金操作させられています！」と声をかけて止め、コンビニ店員と連携する", money: 300, principleTag: "safe", explain: "✨ 見事な救出！【騙されない・店員と連携】ATM操作で還付金が戻ることは絶対にありません。店員と連携しておばあさんの被害を防ぎました！（お礼+300円）" }
    ],
    wrongChoices: [
      { text: "電話口の相手に「代わりに暗証番号を押してあげます」と伝えておばあさんの暗証番号を聞き出す", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】おばあさんの暗証番号を漏洩させてしまい、預金が全額引き出されてしまいました。" },
      { text: "親切心からおばあさんの代わりに操作を代わり、相手の言う通りの送金ボタンを押してあげる", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】詐欺の送金を手伝ってしまい、高齢者の大切な預金を奪わせてしまいました。" },
      { text: "電話口の男から「市役所の正規手続きです」と説明され、「そうなのか」とそのまま見守る", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】犯人の説明を信じてしまい、おばあさんの送金を止めることができませんでした。" }
    ]
  },
  {
    id: "adult_q08", category: "real", source: "クレジットカード会社", title: "【〇〇カード】今月のご利用代金明細確定のお知らせ",
    characterName: "カード会社公式",
    narration: "普段利用しているカード会社からメールが届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "カード会社通知", line: "【〇〇カード】今月のご利用代金明細書を作成いたしました。公式Webサービスよりご確認ください。" },
      { speaker: "あなた", line: "（定期明細の案内メールだ。確認してみよう。）" }
    ],
    point: "定期的な利用明細の確定通知であり、個人情報やカード番号の入力を急かす文面がないものは本物の正規連絡です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.adultCardStatementReal,
    desc: "クレジットカード会社から明細通知が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "ブラウザのブックマークに保存してあるカード会社の会員サイトへログインして明細を確認する", money: 0, principleTag: "safe", explain: "正解！【正規確認】正規の案内を自ら安全なブックマーク経由で確認できました！" }
    ],
    wrongChoices: [
      { text: "メールに返信して、自分のカード番号と暗証番号を書いて「明細を郵送してください」と送る", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】メールで暗証番号を送るのは極めて危険です。情報流出被害に遭いました。" },
      { text: "「明細発行手数料」と勘違いし、ネットで見つけた怪しい口座へ振り込みを行う", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】正規のWEB明細確認は無料です。不要なお金を騙し取られてしまいました。" },
      { text: "メールを放置し、身に覚えのない請求がないかどうかも一切確認しない", money: -8000, principleTag: "fooled", damageType: "money", explain: "【誤認拒絶】正規の明細確認を怠ると、万が一の不正利用の早期発見が遅れてしまいます。" }
    ]
  },
  {
    id: "adult_q09", category: "help", source: "職場（オフィス）", title: "職場の同僚のPC画面トラブル",
    characterName: "職場の同僚",
    narration: "オフィスで仕事中、隣の同僚が受話器を持ち、ノートPCの画面を見つめていました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "同僚", line: "「急に警告画面が出て…画面のサポート窓口に電話したら修理代が必要と言われてるんだけど…」" },
      { speaker: "あなた", line: "（同僚のパソコンに警告画面が出ているな…どう対応すべきか？）" }
    ],
    point: "全画面警告と警告音はWebブラウザ上の偽物（サポート詐欺）です。遠隔操作ソフトを入れると社内ネットワークの機密情報が窃取されます。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.colleagueTroubled,
    screenshot: IMAGE_ASSETS.screenshots.supportScamHelp,
    desc: "同僚のPCに警告画面が表示されている。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "「それ偽物のサポート詐欺だよ！今すぐ電話を切って、ブラウザを強制終了（または社内情シスへ連絡）しよう！」と同僚を制止する", money: 300, principleTag: "safe", explain: "✨ 職場を救った！【騙されない・強制終了して情シス報告】サポート詐欺です。電話を切らせてブラウザを終了させ、機密流出を防ぎました！（お礼+300円）" }
    ],
    wrongChoices: [
      { text: "サポートの指示に従い、社内ネットワークのログインIDとパスワードを電話で伝えてしまう", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】社内IDを漏洩させ、社内サーバーに侵入されて重要機密を窃取されました。" },
      { text: "情報漏洩したら大変なので、同僚と一緒に急いでコンビニへ行って電子マネーを買って支払う", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】サポート詐欺に加担してしまい、会社のパソコンを遠隔操作され金銭を奪われました。" },
      { text: "電話の相手から「今切るとデータが完全消去される」と脅迫され、信じて指示に従う", money: -20000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽警告の脅迫を信じてしまい、パソコンを乗っ取られて大被害が出ました。" }
    ]
  },
  {
    id: "adult_q10", category: "scam", source: "スマートフォンSMS", title: "【日本税関】通関手数料および関税のお支払いについて",
    characterName: "日本税関通関センター",
    narration: "スマートフォンにSMSが届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "SMS通知", line: "【日本税関】関税が未納のため通関手続きが保留されています。本日中にご納付ください。" },
      { speaker: "あなた", line: "（税関からの連絡だ。確認してみよう。）" }
    ],
    point: "税関が個人の携帯電話へSMSで直接関税の納付を要求したり、ギフトカードで支払わせることは絶対にありません。",
    notification: "📱ピコン 新着メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.customsFeeScam,
    desc: "税関を名乗るSMSが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "「税関がSMSで直接支払いを迫ることはない」と見抜き、通知のリンクは使わず削除する", money: 0, principleTag: "safe", explain: "正解！【騙されない・スミッシング遮断】税関を騙るスミッシング詐欺です。ギフトカード決済要求を見事に回避！" }
    ],
    wrongChoices: [
      { text: "荷物照会のため、リンク先でクレジットカード番号やセキュリティコードを入力する", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】フィッシング詐欺です！カード情報が盗まれ、海外サイトで不正利用されました。" },
      { text: "荷物が処分されると困るので、指示された通りギフトカードを買ってコードを送信する", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】コードを即座に奪われ、「延滞料金が追加された」とさらに要求されました。" },
      { text: "SMS記載の配送センターへ電話をかけ、「何の荷物ですか？」と問い合わせる", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽の税関窓口に繋がり、荷物保管料として電子マネーを騙し取られました。" }
    ]
  },
  {
    id: "adult_q11", category: "scam", source: "スマートフォンSMS", title: "【重要】マイナンバーカードに関するお知らせ",
    characterName: "デジタル庁マイナポータル",
    narration: "スマートフォンにSMSが届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "SMS通知", line: "【重要】マイナンバーカードの電子証明書の有効期限が切れています。下記リンクより更新手続きをお願いいたします。" },
      { speaker: "あなた", line: "（マイナンバーカードの通知だ…どう対応すべきか？）" }
    ],
    point: "デジタル庁や自治体がSMSでマイナンバーカードの暗証番号や暗証コードの再入力を求めることは絶対にありません。",
    notification: "📱ピコン 新着メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.mynaPortalScam,
    desc: "スマホに「Digital Agency」からメッセージが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "メッセージのリンクは開かず、公式のマイナポータルアプリまたは市区町村窓口で更新状況を確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・公的窓口で確認】マイナンバー情報を狙うフィッシングです。更新は正規ルートで確認が鉄則！" }
    ],
    wrongChoices: [
      { text: "保険証が使えなくなると困るので、リンクを開いてマイナンバーと暗証番号4桁を入力する", money: -30000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】マイナンバーと暗証番号が盗まれ、本人確認を悪用されて勝手に借金を背負わされました。" },
      { text: "「更新手数料1,000円」の請求画面が表示されたため、クレジットカードで支払う", money: -25000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】カード情報を抜き取られ、高額な不正ショッピング被害に遭いました。" },
      { text: "SMS記載のサポート番号へ電話し、「更新手続きのやり方を教えてほしい」と頼む", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽のサポート窓口に繋がり、更新手数料名目で15,000円を振り込まされました。" }
    ]
  },
  {
    id: "adult_q12", category: "scam", source: "スマートフォンSMS", title: "【〇〇電力】電力供給停止予告に関する重要なお知らせ",
    characterName: "電力供給センター",
    narration: "スマートフォンのSMSに通知が届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "SMS通知", line: "【〇〇電力】電気料金の未払いが確認されました。本日18時までにお支払いください。" },
      { speaker: "あなた", line: "（電気代の未払い通知だ…確認してみよう。）" }
    ],
    point: "「本日夕方に電気を止める」など極度の焦りを生む文面はスミッシング詐欺の典型です。正規の電力会社が事前予告なしにSMSだけで即日送電停止することはありません。",
    notification: "📱ピコン 新着メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.utilityStopScam,
    desc: "電力会社を名乗るSMSが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "SMSのリンクは絶対に開かず、紙の検針票に記載された公式の問い合わせ番号または正規マイページで確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・正規請求書で確認】ライフライン停止を騙る詐欺です。焦ってリンクから決済せず自発照会！" }
    ],
    wrongChoices: [
      { text: "リンク先で顧客情報を照会するため、契約者氏名・生年月日・クレジットカード番号を入力する", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】スミッシング詐欺です！入力したカード情報が盗まれ、不正利用されました。" },
      { text: "電気が止まると大変なので、リンク先の決済画面から4,980円を急いで支払う", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】偽の決済サイトにお金を騙し取られ、カード情報も抜かれてしまいました。" },
      { text: "SMS記載の緊急停止回避ダイヤルに電話し、オペレーターに支払い猶予を相談する", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽窓口で「今すぐ電子マネーを買えば猶予する」と騙し取られてしまいました。" }
    ]
  },
  {
    id: "adult_q13", category: "scam", source: "ビジネスEメール", title: "【請求書】お取引代金のお振込先口座変更について",
    characterName: "取引先担当者名義",
    narration: "会社のメールに請求書が届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "メール文面", line: "【重要なお知らせ】セキュリティ強化のため下記の新指定口座へお振込みをお願いいたします。" },
      { speaker: "あなた", line: "（振込先口座変更の案内だ。確認してみよう。）" }
    ],
    point: "取引先になりすまして振込先を変更させる「ビジネスメール詐欺（BEC）」です。メールの連絡先ではなく、既存の電話番号等で必ず確認しましょう。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.businessInvoiceScam,
    desc: "取引先から振込先変更の請求書メールが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "メールの指示だけを鵜呑みにせず、以前から社内で登録してある取引先の代表電話番号へ電話して口座変更の事実を確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・別ルート電話確認】ビジネスメール詐欺です。別ルート（既存の電話番号）での確認が最大の防壁！" }
    ],
    wrongChoices: [
      { text: "取引確認のためと称して、自社の取引銀行口座情報や社印の画像データをメールで返信する", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】自社の機密情報と印影を盗まれ、偽の契約書作成に悪用されてしまいました。" },
      { text: "取引先からの正式な請求書メールなので、指示された新口座へ250,000円を振り込む", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】ビジネスメール詐欺です！会社の資金が犯人の口座へ不正送金されました。" },
      { text: "請求書メールに記載されている「経理部担当者直通携帯」へ電話をかけて確認する", money: -25000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】メール記載の番号は犯人の電話だったため、騙されて振り込みを実行してしまいました。" }
    ]
  },
  {
    id: "adult_q14", category: "scam", source: "マッチングチャット", title: "さくら☆さんからのメッセージ",
    characterName: "さくら☆",
    narration: "マッチングアプリで仲良くなった「さくら」からメッセージが届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "さくら", line: "「ごめんなさい、交通費がないです…少しだけ貸してもらえないかな？30,000円でいいです…！」" },
      { speaker: "あなた", line: "（メッセージが届いたな…どう返信すべきか？）" }
    ],
    point: "親密になった後に「会うための交通費」「トラブル解決金」などと理由をつけて先払いを求めるのはロマンス詐欺の典型です！",
    notification: "📱ピコン 新着メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.adultRomanceChatScam,
    desc: "マッチング相手からメッセージが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "「会う前の金銭要求（先払い）はロマンス詐欺の典型」と見抜き、送金せずにやり取りを中止・通報する", money: 0, principleTag: "safe", explain: "正解！【騙されない・先払いは絶対拒絶】典型的なロマンス詐欺です。会ったことのない相手にお金を送金せず完全回避！" }
    ],
    wrongChoices: [
      { text: "相手を信用し、送金手続きのために自分の銀行口座情報や暗証番号、自宅の住所を教えてしまう", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】口座情報を悪用され、勝手に決済サービスに連携されてお金を抜き取られました。" },
      { text: "会いたい一心で、相手から指定されたPayPayや個人口座へ言われた通り30,000円を送金する", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】送金した瞬間に相手と連絡が取れなくなり、30,000円を持ち逃げされました。" },
      { text: "「会ったら本当に返してくれる？」とメッセージで質問し、「絶対に返す」という甘い言葉を信じてしまう", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】言いくるめられて納得させられ、結局お金を振り込んで騙し取られました。" }
    ]
  },
  {
    id: "adult_q15", category: "scam", source: "Eメール", title: "【予約完了】高級リゾートホテルご宿泊予約の確認",
    characterName: "旅行予約サイトカスタマー",
    narration: "メールボックスを開くと、ホテル予約完了メールが届いていました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "予約完了メール", line: "【予約完了】本日15時以降のキャンセルはキャンセル料100%が発生いたします。" },
      { speaker: "あなた", line: "（予約完了メールが届いている…どう対応すべきか？）" }
    ],
    point: "身に覚えのない超高額な予約メールを送り、「キャンセル料100%」で焦らせて偽の取消フォームへクレカ情報を再入力させるフィッシング詐欺です。",
    notification: "📱ピコン 新着メールが届きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.hotelBookingScam,
    desc: "ホテルの予約確認メールが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "メール記載のリンクは一切開かず、普段使っている正規の旅行アプリにログインして予約履歴が存在しないことを確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・正規アプリ照会】偽の予約完了メールで焦らせる詐欺です。正規の予約履歴を確認して冷静に対処！" }
    ],
    wrongChoices: [
      { text: "20万円請求されたら困るので、メールのリンクを開いてカード番号と暗証番号を入力しキャンセル申請する", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】フィッシング詐欺です！キャンセル手続きと見せかけてカード情報を抜き取られました。" },
      { text: "「キャンセル事務手数料」として請求された5,000円をクレジットカードで決済する", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】架空の手数料を騙し取られ、カードも不正利用されてしまいました。" },
      { text: "メール記載のカスタマーサポート番号へ電話をかけて「誤予約を取り消してほしい」と頼む", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽のサポート窓口に繋がり、キャンセル保証料として電子マネーを要求されました。" }
    ]
  },
  {
    id: "adult_q16", category: "real", source: "クレジットカード会社", title: "【本人認証】オンライン決済3Dセキュア認証",
    characterName: "カード会社公式認証",
    narration: "公式オンラインストアでノートパソコンを購入し、決済ボタンを押しました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "認証画面", line: "ご登録のワンタイム認証アプリまたはSMSで届いたワンタイムパスワードをご入力ください。" },
      { speaker: "あなた", line: "（本人認証の画面が表示された。確認してみよう。）" }
    ],
    point: "自らが購入手続きを行っている最中に表示され、決済金額や利用加盟店名が正確に一致している正規の3Dセキュア画面は安全な本人認証です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.cardFraudPhishing,
    desc: "買い物中にカードの本人認証画面が表示された。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "購入店舗名と請求金額が正しいことを確認した上で、正規のワンタイムパスワードを入力して決済を完了する", money: 0, principleTag: "safe", explain: "正解！【正規確認】自分が操作中の正規な3Dセキュア認証です。金額と店舗名を確認して安全に購入完了！" }
    ],
    wrongChoices: [
      { text: "届いたワンタイムパスワードをSNSに投稿し、「このコード誰か使っていいよ」と公開する", money: -20000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】ワンタイムパスワードを第三者に悪用され、勝手に不正決済されてしまいました。" },
      { text: "「認証代行業者」と称する外部の怪しいサイトにお金を払って認証を代行させようとする", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】不要な代行詐欺にお金を騙し取られ、カード情報も抜き取られました。" },
      { text: "「ワンタイムパスワードの入力画面はすべて詐欺だ」と思い込み、正規の購入手続きを途中で強制破棄する", money: -8000, principleTag: "fooled", damageType: "money", explain: "【誤認拒絶】正規セキュリティ認証への過剰反応です。限定セールの購入権利を失いキャンセル料が発生しました。" }
    ]
  }
];

/* =========================================================
   【高齢者モード専用問題プール】（全16問・助ける撤廃・3原則思考型4択）
   ========================================================= */
const QUESTIONS_SENIOR = [
  // ── 詐欺（11問） ──
  {
    id: "senior_q01", category: "scam", source: "固定電話・LINE", title: "警察署捜査二課を名乗る電話",
    characterName: "警察捜査二課",
    narration: "固定電話に警察を名乗る電話があり、LINEを追加するよう案内されました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "自称・警察官", line: "「口座を保護するため、指定の口座へ預金を移してください。」" },
      { speaker: "あなた", line: "（警察からの連絡だ…どう対応すべきか？）" }
    ],
    point: "警察がSNS（LINE）で連絡を取ったり、逮捕状の画像を送ったり、お金を送金させることは絶対にありません！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.fakePoliceLineScam,
    desc: "警察を名乗る人物からLINEで画像が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "相手との連絡を直ちに絶ち、相手が示した連絡先ではなく自分で調べた警察署の代表番号へ確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・警察へ確認】偽警察によるSNS誘導詐欺です。警察がお金を送金させることは絶対にありません！" }
    ],
    wrongChoices: [
      { text: "LINE通話で事情聴取を受け、通帳の口座番号と暗証番号をすべて相手に伝えてしまう", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】口座情報を悪用され、預金口座から全額不正引き出しされてしまいました。" },
      { text: "逮捕されると困るので、指示された指定口座へ預金を急いで送金する", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】特殊詐欺被害です！老後の大切な資産30,000円分が即座に奪われてしまいました。" },
      { text: "LINEで送られてきた「逮捕状」の画像を本物だと信じ、相手の指示通りに行動する", money: -20000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽の逮捕状に騙され、自宅に来た偽職員にキャッシュカードを渡してしまいました。" }
    ]
  },
  {
    id: "senior_q02", category: "scam", source: "スマートフォンSMS", title: "【年金給付センター】特別給付金受給手続きのご案内",
    characterName: "年金給付センターサポート",
    narration: "スマホのSMSに通知が届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "SMS通知", line: "【特別給付金】本日中に受給手続きを完了してください。" },
      { speaker: "あなた", line: "（給付金に関する案内が届いている…）" }
    ],
    point: "給付金を装って「本日中」と焦らせ、銀行口座情報や暗証番号を入力させるフィッシング詐欺です。",
    notification: "📱ピコン 新着メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.benefitScam,
    desc: "給付金の案内SMSが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "SMSのボタンは押さず、給付金について公的機関の公式サイトや自治体窓口で直接確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・自治体窓口で確認】給付金を騙るフィッシング詐欺です。SMSのリンクを開かず公的窓口で確認が鉄則！" }
    ],
    wrongChoices: [
      { text: "5万円を受け取りたいので、リンクを開いて銀行の口座番号と暗証番号を入力する", money: -25000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】口座情報を盗まれ、給付金どころか預金口座から25,000円不正送金されました。" },
      { text: "「受給手続きの手数料」として、コンビニで1,000円分の電子マネーを買って送金する", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】お金を騙し取られた上、詐欺グループのカモ名簿に登録されてしまいました。" },
      { text: "SMSに記載された問い合わせフリーダイヤルへ電話して受取方法を聞く", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽の窓口に繋がり、「手続き手数料」として高額な電子マネーを要求されました。" }
    ]
  },
  {
    id: "senior_q03", category: "scam", source: "固定電話", title: "息子を名乗る人物からの電話",
    characterName: "自称・息子",
    narration: "固定電話が鳴り、慌てた様子の男の声が聞こえてきました。",
    dialogue: [
      { speaker: "自称・息子", line: "「母さん？ 俺だけど…カバンを無くして今日中にお金が必要なんだ。同僚が家に取りに行くから用意して！」" },
      { speaker: "あなた", line: "（息子からの一大事の連絡だ…どう対応すべきか？）" }
    ],
    point: "「電話番号が変わった」「カバンを無くした」「同僚が金を取りに行く」はオレオレ詐欺の王道パターンです！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: null,
    desc: "息子を名乗る人物から電話があった。あなたならどうする？",
    correctChoices: [
      { text: "一度電話を切り、あらかじめ手帳に控えてある息子の本当の携帯電話番号へかけて確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・元の番号へ確認】オレオレ詐欺の鉄則は「元の知っている番号にかけ直す」ことです！" }
    ],
    wrongChoices: [
      { text: "息子のピンチを助けるため、自宅にある預金通帳の残高や保管場所を電話で教えてしまう", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】資産情報を聞き出され、自宅に強盗や受け子が押しかけてくる被害に遭いました。" },
      { text: "息子の一大事だとパニックになり、自宅に来た上司や同僚を名乗る男にお金を渡す", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】オレオレ詐欺です！老後の大切なお金30,000円分がそのまま騙し取られました。" },
      { text: "男から言われた「新しい携帯番号」へ電話をかけて事実関係を確認する", money: -20000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】犯人の仲間に繋がり、「早く払わないと息子さんが逮捕される」と脅迫されました。" }
    ]
  },
  {
    id: "senior_q04", category: "scam", source: "固定電話", title: "電力会社関連窓口からのプラン切替案内",
    characterName: "自称・電力プラン窓口",
    narration: "電話がかかってきました。\n相手：「電気料金の特別プランのご案内です。検針票をお手元にご用意ください。」",
    dialogue: [
      { speaker: "勧誘電話", line: "「検針票のお客様番号と供給地点特定番号を読み上げてください。」" },
      { speaker: "あなた", line: "（電気代が安くなるという案内だが…どう対応すべきか？）" }
    ],
    point: "検針票の番号を教えると、本人の承諾なしに別の電力会社へ勝手に契約を切り替えられ、高額な解約違約金を請求されるトラブルが多発しています。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.electricityPlanScam,
    desc: "検針票情報の読み上げを要求された。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "「電話での契約変更はしません。書面を送ってください」と断り、検針票の番号は教えない", money: 0, principleTag: "safe", explain: "正解！【喋らない・教えない】検針票の情報は重要な個人情報です。安易に教えないことで勝手な契約変更を防げます！" }
    ],
    wrongChoices: [
      { text: "安くなるならありがたいと、検針票のお客様番号・供給地点番号・契約者氏名をすべて伝える", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】勝手に別会社へ契約変更され、後から高額な請求や法外な解約手数料を請求されました。" },
      { text: "「契約変更の事務手数料として3,000円必要」と言われ、クレジットカード番号を伝えて支払う", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】不要な手数料を騙し取られ、カード情報も抜き取られてしまいました。" },
      { text: "大手電力会社の名前を名乗っているから信用できると思い込み、電話口で契約を承諾する", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】大手電力会社を騙る悪質な代理店でした。高額なプランに切り替えられてしまいました。" }
    ]
  },
  {
    id: "senior_q05", category: "real", source: "郵便・電話", title: "【取引銀行】定期預金満期に関するご案内",
    characterName: "取引銀行の正規支店担当者",
    narration: "利用している銀行から満期案内書類が届き、担当者から電話がありました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "銀行担当者", line: "「満期書類をお送りいたしましたのでご確認ください。暗証番号をお伺いすることはございません。」" },
      { speaker: "あなた", line: "（定期預金の案内だ。確認してみよう。）" }
    ],
    point: "取引のある正規の銀行からの案内であり、暗証番号を聞いたりカードを預かる要求が一切ない通知は本物です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.bankMaturityReal,
    desc: "取引銀行から満期案内が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "郵送されてきた書類を確認し、必要に応じて店舗窓口へ出向いて手続きする", money: 0, principleTag: "safe", explain: "正解！【正規確認】正規の案内を正しく受け取り、安全に対応できました！" }
    ],
    wrongChoices: [
      { text: "電話の担当者に「暗証番号を言うから代わりに手続きして」と暗証番号を伝えてしまう", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】正規の銀行員であっても電話口で暗証番号を伝えるのは重大なセキュリティ違反です。" },
      { text: "「満期手続き手数料が必要」と誤認し、ネットで見つけた怪しい口座へ送金してしまう", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】正規の手続きは無料なのに、関係のない偽口座にお金を振り込んでしまいました。" },
      { text: "「銀行からの連絡はすべて詐欺だ！」と怒鳴り散らして定期預金を解約し放置する", money: -8000, principleTag: "fooled", damageType: "money", explain: "【誤認拒絶】正規の案内まで過剰に拒絶し、中途解約ペナルティで利息8,000円を失いました。" }
    ]
  },
  {
    id: "senior_q06", category: "scam", source: "自宅訪問", title: "突然の屋根点検訪問",
    characterName: "突然の訪問作業員",
    narration: "自宅のインターホンが鳴り、作業服の男が立っていました。\n「近所で工事をしている者ですが、お宅の屋根の瓦がずれてますよ。無料で見てあげます。」",
    dialogue: [
      { speaker: "作業員", line: "「ハシゴですぐ登って確認しますね。」" },
      { speaker: "あなた", line: "（突然の訪問だが…どう対応すべきか？）" }
    ],
    point: "「危険」「無料」「今すぐ」と不安を煽って屋根に登り、故意に瓦を壊して高額契約を迫る「点検商法」です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.workerLabor,
    screenshot: null,
    desc: "「屋根を無料で点検する」と訪問業者が迫ってきた。あなたならどうする？",
    correctChoices: [
      { text: "「知り合いの工務店に見てもらいますので結構です」と断り、絶対に敷地や屋根に上がらせない", money: 0, principleTag: "safe", explain: "正解！【喋らない・家に入れない】突然の点検業者は絶対に家や屋根に上げないことが被害防止の鉄則です！" }
    ],
    wrongChoices: [
      { text: "「家を建てたハウスメーカーの名前と家族の連絡先」を業者に教えて相談させようとする", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】個人情報を悪質グループに把握され、執拗な押し掛け営業を受けるようになりました。" },
      { text: "「今すぐ応急処置が必要」と言われ、その場で手付金として30,000円を手渡す", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】お金を払った後、粗悪な工事をされてさらに高額な追加工事を迫られました。" },
      { text: "無料で見てもらえるなら助かると思い、屋根に登って点検してもらう", money: -25000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】点検商法です！わざと屋根を壊され、「直さないと危険」と高額工事を結ばされました。" }
    ]
  },
  {
    id: "senior_q07", category: "scam", source: "固定電話", title: "【重要】インターネット利用料金の未納について",
    characterName: "通信サービス料金窓口",
    narration: "電話がありました。\n相手：「ネット利用料金に未納があります。コンビニで電子マネーを購入し、裏面の番号を教えてください。」",
    dialogue: [
      { speaker: "電話の相手", line: "「番号を教えていただければ、すぐに未納解除の手続きを行います。」" },
      { speaker: "あなた", line: "（料金未納の電話だ…どう対応すべきか？）" }
    ],
    point: "どのような企業であっても、未納料金の支払いにコンビニのプリペイドカード番号を要求することは100%詐欺です！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: null,
    desc: "電話で電子マネーカードの購入と番号を要求された。あなたならどうする？",
    correctChoices: [
      { text: "「プリペイドカードで支払いを求めるのは詐欺」と判断し、電話を切って契約先の正規請求書を確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・プリペイド要求は拒絶】架空請求詐欺です。プリペイドカードの番号を電話で要求されたら100%詐欺！" }
    ],
    wrongChoices: [
      { text: "コンビニで買ったカードの裏の銀色部分を削り、番号を電話口で相手に読み上げてしまう", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】プリペイド詐欺です！伝えた瞬間に額面25,000円分が全額犯人に使われました。" },
      { text: "「銀行振込でも可能」と言われ、指定された個人名義の口座へ未納金を振り込む", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】架空請求詐欺です！振り込んだお金はそのまま犯人に持ち逃げされました。" },
      { text: "「カードの買い方が分からない」と相手に相談し、電話の指示通りにコンビニ端末を操作する", money: -20000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】相手の言う通りに電子マネーを発行させられ、全額騙し取られてしまいました。" }
    ]
  },
  {
    id: "senior_q08", category: "scam", source: "自宅訪問・チラシ", title: "地域一斉水質検査に関するお知らせ",
    characterName: "自称・水道局指定業者",
    narration: "ポストにチラシが入っており、作業着の男が訪ねてきました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "訪問業者", line: "「水質検査薬を入れると黄色くなりました。高性能浄水器を取り付けますね。」" },
      { speaker: "あなた", line: "（水質検査の案内だ…どう対応すべきか？）" }
    ],
    point: "水道局が個人の住宅を突然訪れて水質検査をしたり、浄水器を販売することは絶対にありません。試薬の化学反応（塩素反応）を利用した詐欺です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: IMAGE_ASSETS.screenshots.waterPurifierScam,
    desc: "水質検査と浄水器の設置を勧められた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "「水道局が浄水器を販売することはない」と見抜き、「買いません」と断ってドアを閉める", money: 0, principleTag: "safe", explain: "正解！【騙されない・水道局騙りを撃退】水道局を騙る悪質訪問販売です。試薬の変色は塩素反応のトリック！" }
    ],
    wrongChoices: [
      { text: "家族構成や持病、普段飲んでいる薬について業者に詳しく教えてしまう", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】健康の不安を握られ、高額な健康食品やサプリメントの送り付け詐欺に遭いました。" },
      { text: "水が黄色くなって怖くなったので、勧められた20万円の浄水器を手付金前払いで契約する", money: -25000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】悪質な訪問販売です！市販の安価な浄水器を高額で売りつけられました。" },
      { text: "「チラシに書いてある電話番号」へ電話をかけて、本当に水道局か確認する", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】詐欺グループの共犯者に繋がり、「地域の水道管が危険」と騙されてしまいました。" }
    ]
  },
  {
    id: "senior_q09", category: "scam", source: "自宅訪問", title: "住宅防火対策および消火設備のご案内",
    characterName: "自称・防災点検員",
    narration: "消防服に似た服を着た人物が訪ねてきました。\n「消防署の方から来ました。消火器の交換が義務化されたので設置します。」",
    dialogue: [
      { speaker: "訪問者", line: "「消火器の費用として35,000円になります。」" },
      { speaker: "あなた", line: "（消防関係の訪問だ…どう対応すべきか？）" }
    ],
    point: "消防署が消火器の訪問販売や点検を行ったり、金銭を請求することは絶対にありません。「消防署の方（方角）」と言って騙す手口です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: null,
    desc: "「消火器の交換代金を支払え」と請求された。あなたならどうする？",
    correctChoices: [
      { text: "「消防署が消火器の販売や集金をすることはない」と知っているので、その場できっぱり断る", money: 0, principleTag: "safe", explain: "正解！【騙されない・きっぱり拒絶】消防署員を装う悪質な訪問販売です。不安に付け込む手口を冷静に撃退！" }
    ],
    wrongChoices: [
      { text: "「自宅に消火器が何本あるか、どこに置いてあるか」を業者に案内して見せてしまう", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】家の中の様子や間取りを物色され、空き巣の標的にされてしまいました。" },
      { text: "火事になったら大変だと不安になり、言われるがまま35,000円を支払って契約する", money: -25000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】不当な消火器販売詐欺です！定価数千円のものを法外な値段で買わされました。" },
      { text: "「消防署の方（ほう）から来ました」という言葉を「消防署の職員」だと信じ込む", money: -20000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】公的機関のフリに騙され、不要な火災警報器の交換契約を結ばされました。" }
    ]
  },
  {
    id: "senior_q10", category: "real", source: "自宅訪問", title: "【法令点検】ガス設備定期保安点検のお知らせ",
    characterName: "ガス供給会社点検員",
    narration: "事前にチラシが入っていた日、制服を着たガス会社の点検員が訪ねてきました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "点検員", line: "「4年に1度の定期ガス漏れ点検に伺いました。点検費用は無料です。」" },
      { speaker: "あなた", line: "（事前通知のあったガス点検だ。確認してみよう。）" }
    ],
    point: "事前にお知らせチラシが投函されており、社員証を明示し、費用の請求や機器の販売を一切行わない点検は正規の法令点検です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.gasInspectionReal,
    desc: "正規のガス点検員が無料点検に訪れた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "身分証と事前案内を確認し、立ち会いのもとで点検を受けて受領印を押す", money: 0, principleTag: "safe", explain: "正解！【正規確認】事前通知と身分証を確認し、正規の安全点検を正しく受けることができました！" }
    ],
    wrongChoices: [
      { text: "点検員に「上がってお茶でも飲んで」と家計簿や通帳、家族の予定表を見せてしまう", money: -12000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】点検員であっても不要な個人情報や金銭情報を人に見せるのは危険です。" },
      { text: "点検員に「点検代のチップ」として現金を無理やり手渡そうとする", money: -10000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】正規の点検は完全無料です。不要な金銭のやり取りでトラブルになりました。" },
      { text: "「訪問者はすべて詐欺師だ！」と怒鳴りつけて法令点検を完全に拒否する", money: -8000, principleTag: "fooled", damageType: "money", explain: "【誤認拒絶】法令で定められた重要な安全点検を受けず、ガス警報器の再検査費用が発生しました。" }
    ]
  },
  {
    id: "senior_q11", category: "scam", source: "固定電話", title: "年金受給手続き代行に関するご案内",
    characterName: "年金手続き代行窓口",
    narration: "電話がありました。\n「年金の重要な受給手続きが漏れております。口座番号と暗証番号を教えてください。」",
    dialogue: [
      { speaker: "電話の相手", line: "「本日中に登録しないと年金が受け取れなくなりますよ。」" },
      { speaker: "あなた", line: "（年金に関する連絡だ…どう対応すべきか？）" }
    ],
    point: "公的機関や日本年金機構が電話で銀行の暗証番号を聞き出すことは絶対にありません！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.pensionProcedureScam,
    desc: "電話で口座情報と暗証番号を要求された。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "電話で情報は一切伝えず、日本年金機構の公式ダイヤルや年金事務所へ自分で調べて確認する", money: 0, principleTag: "safe", explain: "正解！【喋らない・公式年金事務所へ照会】年金手続きを口実にした口座情報搾取詐欺です。暗証番号を教えず正解！" }
    ],
    wrongChoices: [
      { text: "未払い年金を受け取るため、銀行名・口座番号・キャッシュカード暗証番号を電話で伝える", money: -30000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】口座情報を悪用され、預金口座から預金が全額引き出されてしまいました。" },
      { text: "「手続き代行費用」として指定された口座へ2万円を先に振り込んでしまう", money: -25000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】代行費用を騙し取られ、年金の手続きも一切行われませんでした。" },
      { text: "「今日中に登録しないと失効する」と言われて焦り、相手の電話指示に従って行動する", money: -20000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】自宅に来た偽職員にキャッシュカードを手渡し、全額盗まれてしまいました。" }
    ]
  },
  {
    id: "senior_q12", category: "scam", source: "スマートフォンSMS", title: "【不在通知】お荷物の持ち帰りについて",
    characterName: "偽宅配ショートメッセージ",
    narration: "スマホのSMSに通知が届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "SMS通知", line: "【不在通知】お荷物を持ち帰りました。再配達指定はこちらからご確認ください。" },
      { speaker: "あなた", line: "（荷物の不在通知だ…確認してみよう。）" }
    ],
    point: "SMSに記載されたリンクを開くと、不正なウイルスアプリをインストールさせられたり個人情報を盗まれます。",
    notification: "📱ピコン 新着メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.deliverySmishingScam,
    desc: "不在通知のSMSが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "SMS本文のリンクは絶対にタップせず、そのままメッセージを削除する", money: 0, principleTag: "safe", explain: "正解！【騙されない・偽SMS遮断】偽SMS（スミッシング）です。リンクを開かずに削除するのが鉄則！" }
    ],
    wrongChoices: [
      { text: "リンク先の偽画面で、携帯電話番号や暗証番号、Apple IDのパスワードを入力する", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】フィッシング詐欺です！パスワードを盗まれ、不正決済被害に遭いました。" },
      { text: "「再配達手数料500円」の請求画面が出たため、クレジットカード情報を入力して支払う", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】カード情報を盗み取られ、海外サイトで不正利用されてしまいました。" },
      { text: "何が届いたか気になるので、SMSに記載されたリンクをタップして画面を開く", money: -15000, principleTag: "fooled", damageType: "personal_info", explain: "【相手に騙された！】偽アプリが勝手にインストールされ、スマホを遠隔操作されてしまいました。" }
    ]
  },
  {
    id: "senior_q13", category: "scam", source: "パソコン・タブレット", title: "パソコンに表示された警告画面",
    characterName: "偽マイクロソフト警告",
    narration: "パソコンの画面に突然警告が表示されました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "警告画面", line: "【警告】システムが感染しました。直ちにサポート窓口へ電話してください。" },
      { speaker: "あなた", line: "（警告音が鳴っている…どう対応すべきか？）" }
    ],
    point: "大音量の警告音や全画面警告は、Webサイト上に表示されているだけの偽物（サポート詐欺）です。電話をかけてはいけません。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.supportScam,
    desc: "パソコンに警告画面が表示された。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "画面の電話番号には絶対に電話せず、ブラウザを閉じる（またはPCを再起動する）", money: 0, principleTag: "safe", explain: "正解！【騙されない・電話をかけず閉じる】画面に表示されているだけの偽警告です。電話をかけずに画面を閉じれば安全！" }
    ],
    wrongChoices: [
      { text: "電話の相手に遠隔操作を許可し、パソコン内の住所録や通帳の写真データを見せてしまう", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】パソコン内の個人情報をすべて抜き取られ、悪用されてしまいました。" },
      { text: "パソコンを直すため、指示された通りコンビニで30,000円分の電子マネーを買って番号を伝える", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】サポート詐欺です！高額な電子マネーを騙し取られ、ウイルスも消えませんでした。" },
      { text: "パソコンが壊れると困るので、画面に表示された電話番号へすぐに電話をかけてしまう", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】カタコトの男に遠隔操作ソフトを入れられ、セキュリティを破壊されました。" }
    ]
  },
  {
    id: "senior_q14", category: "scam", source: "Eメール・SMS", title: "【国税庁】所得税の未納および差押え予告通知",
    characterName: "国税庁納付指導窓口",
    narration: "メールに通知が届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "通知メッセージ", line: "【重要】未納の所得税がございます。24時間以内にご納付ください。" },
      { speaker: "あなた", line: "（差押え予告と書かれている…どう対応すべきか？）" }
    ],
    point: "国税庁や税務署がメールやSMSで納税通知を送ったり、Webサイトからクレジットカードや電子マネーで納付させることは絶対にありません。",
    notification: "📱ピコン 新着通知が届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.taxSeizureScam,
    desc: "税金の未納通知が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "「公的機関がメールで納税を迫ることはない」と判断し、リンクを開かず削除して税務署へ確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・税務署へ確認】国税庁を騙る典型的なフィッシング詐欺です。落ち着いて無視して正解！" }
    ],
    wrongChoices: [
      { text: "差し押さえを解除するため、リンク先でクレジットカード番号やセキュリティコードを入力する", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】フィッシング詐欺です！カード情報が盗まれ、高額な不正利用被害に遭いました。" },
      { text: "差し押さえられたら大変なので、指定されたサイトから電子マネーで税金を支払う", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】偽の納税サイトにお金を騙し取られ、税務署の未納も解決しませんでした。" },
      { text: "メール記載の「納税相談窓口」へ電話をかけ、未納の内訳を教えてもらう", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽の職員に繋がり、「延滞利息を免除するからすぐ振り込め」と騙されました。" }
    ]
  },
  {
    id: "senior_q15", category: "real", source: "スマートフォンSMS", title: "【携帯会社】月額ご利用料金確定のお知らせ",
    characterName: "携帯会社公式",
    narration: "スマホにSMSが届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "携帯会社通知", line: "【お知らせ】今月のご請求金額が確定いたしました。公式アプリよりご確認ください。" },
      { speaker: "あなた", line: "（毎月の請求案内だ。確認してみよう。）" }
    ],
    point: "本文に直接ログインURLを載せず、「公式アプリやブックマークからご確認ください」と案内する通知は正規の公式通知です。",
    notification: "📱ピコン 新着メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.mobileBillReal,
    desc: "携帯料金の確定通知が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "いつも使っている公式アプリまたはブックマークからマイページを開き、料金を確認する", money: 0, principleTag: "safe", explain: "正解！【正規確認】正しい正規の通知を落ち着いて公式ルートから確認できました！" }
    ],
    wrongChoices: [
      { text: "SMSに返信して、自分の名前・携帯の暗証番号・クレジットカード番号を送ってしまう", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】送信専用システムに重要な個人情報を返信してしまい、流出リスクが発生しました。" },
      { text: "「料金支払い」と誤認し、ネットで見つけた怪しい決済窓口へお金を振り込む", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】口座振替になっているのに、関係のない偽窓口へ二重支払いしてしまいました。" },
      { text: "「SMSはすべて詐欺に違いない」と思い込み、携帯ショップへ怒鳴り込みに行く", money: -8000, principleTag: "fooled", damageType: "money", explain: "【誤認拒絶】正規のお知らせに過剰反応し、ショップ窓口での不要な手続き手数料が発生しました。" }
    ]
  },
  {
    id: "senior_q16", category: "real", source: "Eメール", title: "【〇〇カード】今月のご利用明細確定のご案内",
    characterName: "カード会社公式",
    narration: "カード会社からメールが届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "カード会社通知", line: "【〇〇カード】今月のご利用代金明細書を作成いたしました。公式サイトよりご確認ください。" },
      { speaker: "あなた", line: "（カード明細の案内だ。確認してみよう。）" }
    ],
    point: "定期的な利用明細の確定通知であり、個人情報やカード番号の入力を急かす文面がないものは本物の正規連絡です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.cardStatementReal,
    desc: "カードの利用明細案内が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "ブラウザのブックマークに保存してあるカード会社の会員サイトへログインして明細を確認する", money: 0, principleTag: "safe", explain: "正解！【正規確認】正規の案内を自ら安全なブックマーク経由で確認できました！" }
    ],
    wrongChoices: [
      { text: "メールに返信して、自分のカード番号と暗証番号を書いて「明細を郵送してください」と送る", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】メールで暗証番号を送るのは極めて危険です。情報流出被害に遭いました。" },
      { text: "「明細発行手数料」と勘違いし、ネットで見つけた怪しい口座へ振り込みを行う", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】正規のWEB明細確認は無料です。不要なお金を騙し取られてしまいました。" },
      { text: "メールを放置し、身に覚えのない請求がないかどうかも一切確認しない", money: -8000, principleTag: "fooled", damageType: "money", explain: "【誤認拒絶】正規の明細確認を怠ると、万が一の不正利用の早期発見が遅れてしまいます。" }
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
    correctChoice = { text: "公式窓口へ直接問い合わせて安全に確認する", money: 0, principleTag: "safe", type: "correct", explain: "正解！ 公式ルートで自ら確認するのが最も確実です。" };
  }

  const fallbackWrongs = [
    { text: "不安を感じたので、指示されたリンクを開いて詳細を確認する", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "危険です！個人情報や認証情報を盗み取られてしまいます。" },
    { text: "相手に電話をかけて、直接事情を聞いてから判断しようとする", money: -15000, principleTag: "fooled", damageType: "money", explain: "危険です！詐欺グループの共犯者に言いくるめられてしまいます。" },
    { text: "本物か確かめずに、とりあえず言われた通りの手続きを進めてしまう", money: -25000, principleTag: "pay", damageType: "money", explain: "危険です！多額の金銭を騙し取られてしまいます。" }
  ];

  let fIdx = 0;
  while (wrongChoicesPicked.length < 3) {
    wrongChoicesPicked.push({ ...fallbackWrongs[fIdx % fallbackWrongs.length], type: "wrong" });
    fIdx++;
  }

  return shuffleArray([correctChoice, ...wrongChoicesPicked.slice(0, 3)]);
}