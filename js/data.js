/* =========================================================
   data.js
   問題プール定義（4モード各16問・計64問）
   【大分県警3原則 実践型4択設計】
   ① 喋らない（情報漏洩） / ② 払わない（金銭送金） / 
   ③ 騙されない（偽窓口・言いくるめ） / ④ 正規確認（安全解決）
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
  "木": "詐欺は日常のふとした瞬間にやってくるよ。\n今日も気を付けよう！",
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
  { head: "① 喋らない（話さない・教えない）", desc: "怪しい相手へ個人情報、パスワード、暗証番号、画面共有でコードを教えない" },
  { head: "② 払わない（渡さない・買わない）", desc: "急かされても、すぐにお金を振り込まない・クレカ決済しない・電子マネーを買わない" },
  { head: "③ 騙されない（確認する・相談する）", desc: "届いた連絡先やうまい話を信じず、自ら調べた正規窓口や家族・警察に確認する" }
];

const SKILL_MAP = {
  // 小学生モード
  "elementary_q01": "メールの脅迫に慌てず大人の人に相談する力",
  "elementary_q02": "プレゼント当選を装うカード情報要求を見抜く力",
  "elementary_q03": "突然の点検訪問を玄関先で断る力",
  "elementary_q04": "別アカウントからの友達の送金要求を確かめる力",
  "elementary_q05": "割引広告に惑わされず公式情報を確認する力",
  "elementary_q06": "ネットの知らない人からの儲け話を断る力",
  "elementary_q07": "コイン増殖の裏ワザを装うアカウント盗難を防ぐ力",
  "elementary_q08": "画面共有による認証コードの流出を防ぐ力",
  "elementary_q09": "有名人の偽アカウントによる個人情報集めを見破る力",
  "elementary_q10": "無料コードを口実にしたカード情報要求を遮断する力",
  "elementary_q11": "簡単副業を謳う怪しい広告を見抜く力",
  "elementary_q12": "ATMで困っているお年寄りを店員に知らせて助ける力",
  "elementary_q13": "電話で慌てる家族を落ち着かせて被害を防ぐ力",
  "elementary_q14": "いつもと違うデザインの公式広告を正しく確認する力",
  "elementary_q15": "不在通知から公式ルートで再配達を依頼する力",
  "elementary_q16": "お店からの期間限定クーポンを正しく確かめる力",

  // 中高生モード
  "teen_q01": "公的機関を名乗る緊急警告メールの真偽を見抜く力",
  "teen_q02": "配信者を装う偽当選DMの個人情報要求を見破る力",
  "teen_q03": "通信会社からの正規の通信量通知を扱う力",
  "teen_q04": "宅配通知から正規アプリで照会する力",
  "teen_q05": "ATMで指示を受ける高齢者を周囲と連携して守る力",
  "teen_q06": "突然の無料点検訪問を毅然と断る力",
  "teen_q07": "友達アカウントからの電子マネー要求を直接確認する力",
  "teen_q08": "口座移動を迫る電話から家族を守る力",
  "teen_q09": "お得すぎる公式SNSキャンペーンを正しく照合する力",
  "teen_q10": "海外発信の不審電話に個人情報を渡さない力",
  "teen_q11": "親しくなったSNSアカウントからの投資勧誘を断る力",
  "teen_q12": "限定品を謳う偽通販・高額転売サイトを見抜く力",
  "teen_q13": "荷物運搬などを謳う闇バイト（特殊詐欺受け子）を拒絶する力",
  "teen_q14": "SNSでのチケット個人間先払い取引を回避する力",
  "teen_q15": "偽の著作権侵害警告によるログイン情報窃取を防ぐ力",
  "teen_q16": "有名人出演のAI偽動画広告（ディープフェイク）を見破る力",

  // 一般（大人）モード
  "adult_q01": "サブスク自動更新を騙る架空請求SMSを遮断する力",
  "adult_q02": "国税庁・e-Tax還付通知の偽サイト誘導を見抜く力",
  "adult_q03": "銀行セキュリティ通知を装うフィッシングを回避する力",
  "adult_q04": "警察官を騙るLINE誘導・偽逮捕状詐欺を看破する力",
  "adult_q05": "著名人悪用のSNS投資グループ勧誘を見破る力",
  "adult_q06": "火災保険不正請求を勧誘する悪質業者を拒絶する力",
  "adult_q07": "ATMで電話指示を受ける高齢者を店員と連携して救う力",
  "adult_q08": "クレジットカード会社の正規明細通知を安全に確認する力",
  "adult_q09": "職場の同僚のPC偽警告（サポート詐欺）を止める力",
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
   【小学生モード用問題プール】（全16問・ルビ付き・3原則思考型4択）
   ========================================================= */
const QUESTIONS_ELEMENTARY = [
  // ── 詐欺（11問） ──
  {
    id: "elementary_q01", category: "scam", source: "メール", title: "【<ruby>重要<rt>じゅうよう</rt></ruby>】<ruby>警察<rt>けいさつ</rt></ruby>からのメール",
    characterName: "サイバー捜査課",
    narration: "スマホに <ruby>警察<rt>けいさつ</rt></ruby>を <ruby>名乗<rt>なの</rt></ruby>る <ruby>相手<rt>あいて</rt></ruby>から メールが <ruby>届<rt>とど</rt></ruby>きました。\n『【<ruby>緊急<rt>きんきゅう</rt></ruby>】あなたのスマホが <ruby>犯罪<rt>はんざい</rt></ruby>に <ruby>利用<rt>りよう</rt></ruby>されています。24<ruby>時間<rt>じかん</rt></ruby><ruby>以内<rt>いない</rt></ruby>に <ruby>下<rt>した</rt></ruby>のリンクから パスワードを <ruby>入力<rt>にゅうりょく</rt></ruby>して <ruby>確認<rt>かくにん</rt></ruby>しないと、あなたを <ruby>逮捕<rt>たいほ</rt></ruby>します。』",
    dialogue: [
      { speaker: "連絡通知", line: "【<ruby>警告<rt>けいこく</rt></ruby>】<ruby>本人<rt>ほんにん</rt></ruby><ruby>確認<rt>かくにん</rt></ruby>が できない<ruby>場合<rt>ばあい</rt></ruby>、スマホの<ruby>利用<rt>りよう</rt></ruby>を <ruby>停止<rt>ていし</rt></ruby>し <ruby>法的<rt>ほうてき</rt></ruby><ruby>措置<rt>そち</rt></ruby>を とります。" },
      { speaker: "主人公", line: "「たいほって かいてある…！ いますぐ <ruby>確認<rt>かくにん</rt></ruby>しないと つかまっちゃうのかな…！？」" }
    ],
    point: "<ruby>警察<rt>けいさつ</rt></ruby>が メールで パスワードを <ruby>入<rt>い</rt></ruby>れさせたり、『たいほする』とおどすことは ぜったいに ありません！",
    notification: "📱ピコン 【警察】たいほの警告",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryPoliceMailScam,
    desc: "「24<ruby>時間<rt>じかん</rt></ruby><ruby>以内<rt>いない</rt></ruby>に リンクから パスワードを <ruby>入<rt>い</rt></ruby>れないと つかまります」と かいてある。",
    correctChoices: [
      { text: "メールのリンクは <ruby>押<rt>お</rt></ruby>さず、すぐ おうちの<ruby>人<rt>ひと</rt></ruby>に <ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>せて <ruby>相談<rt>そうだん</rt></ruby>する", money: 0, principleTag: "safe", explain: "せいかい！【騙されない・相談する】リンクを開かずに大人の人に相談できたね！" }
    ],
    wrongChoices: [
      { text: "たいほされたら <ruby>困<rt>こま</rt></ruby>るから、リンクを <ruby>開<rt>ひら</rt></ruby>いて パスワードと <ruby>名前<rt>なまえ</rt></ruby>を <ruby>入力<rt>にゅうりょく</rt></ruby>する", money: -25000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】パスワードを悪ものに教えてしまい、アカウントを奪われて25,000円の被害が出たよ！" },
      { text: "「たいほを取り消すには調査費用が必要」と書いてあるのでお金を振り込む", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】脅されてお金を払ってしまい、大切な30,000円を奪われたよ！" },
      { text: "メールに書いてある電話番号に電話をかけて「本当につかまるの？」と聞く", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】詐欺グループの電話につながり、脅されて15,000円取られてしまったよ！" }
    ]
  },
  {
    id: "elementary_q02", category: "scam", source: "SNSのDM", title: "ゲーム<ruby>機<rt>き</rt></ruby>が タダでもらえる！？",
    characterName: "プレゼント企画",
    narration: "SNSの ダイレクトメッセージに、うれしい <ruby>連絡<rt>れんらく</rt></ruby>が <ruby>届<rt>とど</rt></ruby>きました。\n『【<ruby>当選<rt>とうせん</rt></ruby>おめでとう！】100<ruby>名<rt>めい</rt></ruby>さまに <ruby>最新<rt>さいしん</rt></ruby>ゲーム<ruby>機<rt>き</rt></ruby>を 無料プレゼント！ お<ruby>届<rt>とど</rt></ruby>けのための <ruby>手続<rt>てつづ</rt></ruby>きをしてください。』",
    dialogue: [
      { speaker: "アカウント", line: "ゲーム<ruby>機<rt>き</rt></ruby>の <ruby>発送<rt>はっそう</rt></ruby>のため、<ruby>送料<rt>そうりょう</rt></ruby>500<ruby>円<rt>えん</rt></ruby>の クレジットカード<ruby>決済<rt>けっさい</rt></ruby>と <ruby>住所<rt>じゅうしょ</rt></ruby>を <ruby>入力<rt>にゅうりょく</rt></ruby>してください。" },
      { speaker: "主人公", line: "「500<ruby>円<rt>えん</rt></ruby>だけで ゲーム<ruby>機<rt>き</rt></ruby>が もらえるの！？ いますぐ ほしいな！」" }
    ],
    point: "『タダであげるけど 送料だけカードではらって』は、カード番号を盗む典型的な手口です！",
    notification: "📱ピコン 当選メッセージ！",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryGamePrizeScam,
    desc: "「最新ゲーム機があたりました。送料500円のカード情報を入力してください」と書かれている。",
    correctChoices: [
      { text: "カード番号は入力せず、おうちの人に「これ本物かな？」と見せて確認する", money: 0, principleTag: "safe", explain: "せいかい！【騙されない・相談する】タダをエサにカード情報を盗む詐欺だよ！しっかり相談できたね！" }
    ],
    wrongChoices: [
      { text: "プレゼントを送ってもらうため、自分の名前・自宅の住所・小学校名を詳しく返信する", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】大切な個人情報を教えてしまい、悪質なグループに名簿として売られてしまったよ！" },
      { text: "500円なら安いので、おうちの人のクレジットカード番号を入力して決済する", money: -25000, principleTag: "pay", damageType: "personal_info", explain: "【払ってしまった！】カード番号を盗まれ、海外のサイトで勝手に25,000円分使われてしまったよ！" },
      { text: "相手のアカウントにDMで「本当にゲーム機は届きますか？」と確認メッセージを送る", money: -12000, principleTag: "fooled", damageType: "personal_info", explain: "【相手に騙された！】「本物ですよ」と安心させられ、言われるがまま個人情報を教えてしまったよ！" }
    ]
  },
  {
    id: "elementary_q03", category: "scam", source: "おうちの玄関", title: "「屋根の瓦がずれてるよ！」",
    characterName: "訪問作業員",
    narration: "おうちでお留守番をしていると、インターホンが鳴り、作業着を着た男の人が立っていました。",
    dialogue: [
      { speaker: "作業員", line: "「近くで工事をしてる者だけど、お宅の屋根の瓦が落ちそうで危ないよ！今すぐハシゴで登って無料で見てあげるよ！」" },
      { speaker: "主人公", line: "「親はいないけど…屋根が壊れてたら危ないのかな…？」" }
    ],
    point: "突然やってきて「今すぐ無料で見ます」という訪問者は、わざと壊して高額なお金を請求する危険があります！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: null,
    desc: "「屋根が危ないから、今すぐ無料で登って点検してあげる」と家に入ろうとしている。",
    correctChoices: [
      { text: "玄関のカギを開けずに、インターホン越しに「親がいないので分かりません」と断る", money: 0, principleTag: "safe", explain: "せいかい！【喋らない・家に入れない】お留守番のときは絶対にドアを開けちゃダメだよ！" }
    ],
    wrongChoices: [
      { text: "「いま親が留守で、自分一人しかいません」と正直に状況を話してしまう", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】一人で留守番していることを教えてしまい、強引に敷地に入り込まれたよ！" },
      { text: "「点検代は無料だけど出張費3,000円が必要」と言われ、お小遣いから支払ってしまう", money: -12000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】お金を払ってしまい、「屋根の修理代」としてさらにお金を要求されたよ！" },
      { text: "親切な人だと思い、玄関のドアを開けて業者を庭や屋根へ案内する", money: -25000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】わざと屋根を壊され、「すぐ直さないと危ない」と高額修理代25,000円を請求されたよ！" }
    ]
  },
  {
    id: "elementary_q04", category: "scam", source: "SNSのDM", title: "友達からの「たすけて！」",
    characterName: "健太（別アカウント）",
    narration: "SNSを見ていると、仲良しの友達「健太」の名前と写真のアカウントから急にメッセージが届きました。\n『今ちょっと困ってて親に言えないの。PayPayで3,000円分送ってほしい！明日返すから！』\nでも、いつものアカウントとは違う新しいアカウントのようです。",
    dialogue: [
      { speaker: "健太？", line: "「本当に急いでるんだ！頼むから誰にも言わずに送って！」" },
      { speaker: "主人公", line: "「いつもの健太とアカウントが違うような…？ でも困ってるのかな？」" }
    ],
    point: "友達の名前や写真を使っていても、別アカウントから突然お金を要求されたら乗っ取りや偽アカウントを疑いましょう！",
    notification: "📱ピコン 健太からのメッセージ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryFriendImpersonationScam,
    desc: "友達を名乗る別アカウントから「困っているから3,000円送って」とメッセージが届いた。",
    correctChoices: [
      { text: "お金は送らず、いつもの電話や学校で直接会って「さっきメッセージ送った？」と本人に確認する", money: 0, principleTag: "safe", explain: "せいかい！【騙されない・別ルート確認】偽アカウントの手口だよ！別ルートで確認できて正解！" }
    ],
    wrongChoices: [
      { text: "「お金はないけど、自分のアカウントのパスワードならあげる」と教えてしまう", money: -20000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】自分のアカウントまで乗っ取られ、勝手に友達へ詐欺メッセージを送られたよ！" },
      { text: "友達が困っているからと、言われた通りPayPayで3,000円を送金する", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】偽アカウントの詐欺で、「もっと送って」と要求され計15,000円失ったよ！" },
      { text: "メッセージで「本当に健太？ 何組の誰先生？」と質問してやり取りを続ける", money: -10000, principleTag: "fooled", damageType: "line_takeover", explain: "【相手に騙された！】言葉巧みにごまかされて信じ込まされ、結局お金を送金してしまったよ！" }
    ]
  },
  {
    id: "elementary_q05", category: "scam", source: "ネット広告", title: "ワイヤレスイヤホンが50%OFF！？",
    characterName: "限定セール広告",
    narration: "SNSを見ていると、定価19,800円の欲しかったイヤホンが「夏休み限定50%OFF！ 9,900円！」という広告が表示されました。",
    dialogue: [
      { speaker: "広告ページ", line: "【残りあと2個】本日限りの特別価格！クレジットカードですぐにお支払いください。" },
      { speaker: "主人公", line: "「半額で買えちゃうの！？ お得だけど、この広告からすぐ買っていいのかな？」" }
    ],
    point: "広告の見た目だけで信じず、商品の公式サイトを自分で検索して同じセールが行われているか確認しましょう！",
    notification: "📱ピコン セールのお知らせ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryDiscountAdScam,
    desc: "19,800円のイヤホンが「本日限定9,900円」と広告に表示され、カード決済を迫っている。",
    correctChoices: [
      { text: "広告からは買わずに、自分でメーカーの公式サイトを検索して同じセールがあるか確かめる", money: 0, principleTag: "safe", explain: "せいかい！【騙されない・公式確認】偽のショッピングサイトだったよ！公式サイトで確認できて大正解！" }
    ],
    wrongChoices: [
      { text: "会員登録画面で、親の名前・電話番号・クレジットカード情報をすべて入力する", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】入力したカード情報と個人情報を盗まれ、不正利用被害に遭ったよ！" },
      { text: "売り切れたら嫌なので、広告のボタンを押してお金をすぐに支払う", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】お金を払ったのに商品は届かず、サイトは消えてお金を失ったよ！" },
      { text: "広告の「お問い合わせサポート」に連絡し、「正規品ですか？」と質問する", money: -12000, principleTag: "fooled", damageType: "personal_info", explain: "【相手に騙された！】「本物です」と嘘の返信を信じてしまい、購入してお金を騙し取られたよ！" }
    ]
  },
  {
    id: "elementary_q06", category: "scam", source: "SNSのDM", title: "ネットの知り合いから「お金あげます」",
    characterName: "親切そうなアカウント",
    narration: "SNSで最近知り合った人から、親切そうなメッセージが届きました。\n『毎日少しずつお金が増える特別なサイトがあるよ。君の将来のために教えてあげるから、ここにお金を預けてみて！』",
    dialogue: [
      { speaker: "相手", line: "「私を信じて！ 最初に1万円預けるだけで、来週には3万円になるよ！」" },
      { speaker: "主人公", line: "「ネットで知り合ったばかりの人だけど…本当にお金が増えるのかな？」" }
    ],
    point: "「絶対にお金が増える」「お金を預けて」と言ってくる相手は詐欺グループです！すぐやり取りをやめましょう！",
    notification: "📱ピコン メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryMoneyInviteScam,
    desc: "「毎日お金が増えるサイトがあるから、ここにお金を預けて」と勧誘された。",
    correctChoices: [
      { text: "「絶対にお金が増える話なんてない」と見抜いて、お金は送らず相手をブロックする", money: 0, principleTag: "safe", explain: "せいかい！【騙されない・遮断する】投資詐欺の手口だよ！甘い言葉に乗らずブロックできて大正解！" }
    ],
    wrongChoices: [
      { text: "「登録のため」と言われて、自分の銀行口座や生年月日を相手に教えてしまう", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】口座情報を悪用され、勝手に有料プランに登録されて損害が出たよ！" },
      { text: "お小遣いを増やしたいので、お年玉の貯金から1万円を指定された口座へ振り込む", money: -25000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】振り込んだお金は戻らず、「手数料が必要」と騙され計25,000円失ったよ！" },
      { text: "「本当にお金が増えた実績画面を見せて」と相手に頼んで説明を聞く", money: -12000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽の残高画面を見せられて信じ込んでしまい、結局送金してしまったよ！" }
    ]
  },
  {
    id: "elementary_q07", category: "scam", source: "ネット動画", title: "コイン「無料無限増殖」の裏ワザ！？",
    characterName: "裏ワザ動画",
    narration: "動画サイトで「限定レアキャラとガチャコインが100万枚タダで手に入る裏ワザサイト！」という動画を見つけました。",
    dialogue: [
      { speaker: "裏ワザサイト", line: "コインを受け取るために、あなたのゲームの「ID」と「パスワード」を入力してください。" },
      { speaker: "主人公", line: "「100万コインも手に入るの！？ パスワードを入れて大丈夫かな…？」" }
    ],
    point: "「無料」「裏ワザ」と嘘をついて、ゲームのアカウント情報を盗み取るフィッシングサイトです！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryGameCoinScam,
    desc: "「コインが無限に増える。ゲームのIDとパスワードを入力してください」と要求された。",
    correctChoices: [
      { text: "ゲームのパスワードを他人に教えるのは絶対に危険なので、入力せずに動画を閉じる", money: 0, principleTag: "safe", explain: "せいかい！【喋らない・入力しない】アカウント乗っ取りの罠だよ！パスワードを守れて安心だね！" }
    ],
    wrongChoices: [
      { text: "ガチャをたくさん引きたいので、自分のゲームIDとパスワードを入力する", money: -25000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】アカウントを奪われて課金アイテムを勝手に売られ、25,000円の損害が出たよ！" },
      { text: "「システム利用料500円」と書かれていたので、電子マネーを買って支払う", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】お金を払ってもコインは増えず、電子マネーを盗まれてしまったよ！" },
      { text: "動画のコメント欄で「本当に増えますか？」と質問し、投稿者の指示に従う", money: -12000, principleTag: "fooled", damageType: "account", explain: "【相手に騙された！】「全員もらえますよ」と嘘をつかれて信じてしまい、アカウントを失ったよ！" }
    ]
  },
  {
    id: "elementary_q08", category: "scam", source: "通話アプリ", title: "「チートのやり方を教えるよ」",
    characterName: "ネットの友達",
    narration: "オンラインゲームで知り合った人から、通話アプリで「ゲームが強くなる裏ワザを教えてあげるから、スマホの画面共有をオンにして」と言われました。",
    dialogue: [
      { speaker: "相手", line: "「いま君のスマホに届いたSMSの【6桁の数字】を画面に見せてくれたら、アイテムをあげるよ！」" },
      { speaker: "主人公", line: "「画面共有でSMSの番号を見せるの…？ なんでだろう？」" }
    ],
    point: "画面共有中に届いた認証番号を見せると、スマホのアカウントを乗っ取られてしまいます！",
    notification: "📱ピコン 【認証コード】492103",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryScreenShareScam,
    desc: "「裏ワザを教えるから画面共有して、届いたSMSの認証番号を見せて」と言われた。",
    correctChoices: [
      { text: "「認証コードやスマホの画面は人に見せられない」とキッパリ断り、画面共有を切る", money: 0, principleTag: "safe", explain: "せいかい！【喋らない・見せない】画面共有で見えた認証番号を使ってアカウントを奪う手口だよ！" }
    ],
    wrongChoices: [
      { text: "裏ワザを教えてもらいたいので、画面共有をオンにしてSMSの番号を見せる", money: -25000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】認証コードを見せてしまい、アカウントを乗っ取られて大被害が出たよ！" },
      { text: "「裏ワザの登録料」として、親の電子マネーから3,000円を送金してしまう", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】お金を払っても裏ワザなどはなく、お金を騙し取られたよ！" },
      { text: "「番号は見せないけど、通話の指示に従って操作するね」と相手の言う通りにする", money: -15000, principleTag: "fooled", damageType: "account", explain: "【相手に騙された！】言葉巧みに設定を変更させられ、スマホのセキュリティを外されてしまったよ！" }
    ]
  },
  {
    id: "elementary_q09", category: "scam", source: "SNSのDM", title: "人気YouTuberの「極秘サイン色紙プレゼント」",
    characterName: "有名配信者そっくり垢",
    narration: "大好きな有名YouTuberとそっくりのアイコンのアカウントから、「限定サイン色紙が当選したよ！」とDMが届きました。",
    dialogue: [
      { speaker: "配信者？", line: "「色紙を送るから、君の【名前】【家の住所】【通っている小学校名】【親の電話番号】を返信してね！」" },
      { speaker: "主人公", line: "「大好きなYouTuberからだ！ でも小学校の名前まで教えていいのかな…？」" }
    ],
    point: "有名人になりすました偽アカウントです！公式マークやユーザーIDをしっかり確認しましょう！",
    notification: "📱ピコン サイン当選のDM！",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryYoutuberSignScam,
    desc: "「サインを送るから、名前・住所・小学校名・親の電話番号を教えて」とDMが届いた。",
    correctChoices: [
      { text: "公式マークやIDを確認し、「偽物のアカウントだ」と見抜いて個人情報は教えない", money: 0, principleTag: "safe", explain: "せいかい！【喋らない・教えない】有名人そっくりに作った偽アカウントだよ！個人情報を守れたね！" }
    ],
    wrongChoices: [
      { text: "サインがどうしても欲しいので、自分の名前・住所・小学校名をメッセージで返信する", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】大切な個人情報を教えてしまい、悪質なグループに住所や学校名が知られたよ！" },
      { text: "「色紙の送料と梱包代として1,500円送金して」と言われ、すぐにお金を送る", money: -18000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】お金を払っても色紙は届かず、犯人に持ち逃げされてしまったよ！" },
      { text: "「本物のYouTuberですか？」とDMで質問し、送られてきた偽の証明書を信じる", money: -12000, principleTag: "fooled", damageType: "personal_info", explain: "【相手に騙された！】偽の動画や画像で信用させられ、結局個人情報を渡してしまったよ！" }
    ]
  },
  {
    id: "elementary_q10", category: "scam", source: "ネット広告", title: "10連ガチャ無料コード配布中！",
    characterName: "無料コード配布サイト",
    narration: "ネットを見ていると、「ゲームの10連ガチャが今すぐ無料で引けるシリアルコードプレゼント！」というページを見つけました。",
    dialogue: [
      { speaker: "配布ページ", line: "受け取り手続き：年齢確認のため、保護者のクレジットカード番号を入力してください。お金はかかりません。" },
      { speaker: "主人公", line: "「無料ガチャなのに、なんで親のカード番号が必要なんだろう…？」" }
    ],
    point: "「無料」をエサに、子どもに親のクレジットカード情報を入力させようとする危険な罠です！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryGachaCodeScam,
    desc: "「ガチャ無料コードをあげるから、年齢確認のために親のカード番号を入れて」と要求された。",
    correctChoices: [
      { text: "「無料なのにカード番号を求めるのは詐欺だ」と見抜いて、すぐページを閉じる", money: 0, principleTag: "safe", explain: "せいかい！【騙されない・入力しない】無料を口実にカード番号を盗む詐欺だよ！入力しなくて正解！" }
    ],
    wrongChoices: [
      { text: "ガチャを引きたいので、親の財布からカードを出して番号と有効期限を入力する", money: -30000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】クレジットカード情報を盗まれ、勝手に30,000円分不正利用されたよ！" },
      { text: "「年齢確認の手数料100円」と書かれていたので、小遣いから電子マネーで払う", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】一度払ったことで詐欺グループに狙われ、追加でお金を請求されたよ！" },
      { text: "サイトの「よくある質問」を読んで、「安全なサイトです」という説明を信じる", money: -20000, principleTag: "fooled", damageType: "personal_info", explain: "【相手に騙された！】サイトの嘘の説明に騙されてカード番号を入れてしまい大被害になったよ！" }
    ]
  },
  {
    id: "elementary_q11", category: "scam", source: "ネット広告", title: "1日で簡単に3万円！の広告",
    characterName: "簡単副業広告",
    narration: "ネットを見ていると、「ゲームの感想を書くだけで1日3万円！誰でもできる簡単副業！」というバナー広告を見つけました。",
    dialogue: [
      { speaker: "副業サイト", line: "登録手続き：お仕事の報酬を受け取るため、あなたの銀行口座番号とおうちの電話番号を入力してください。" },
      { speaker: "主人公", line: "「感想を書くだけで3万円もらえるの！？やってみたいな！」" }
    ],
    point: "「誰でも簡単に高額が稼げる」は個人情報収集や悪質商法の罠です！絶対に応募してはいけません！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryEasyMoneyScam,
    desc: "「感想を書くだけで1日3万円。口座番号と電話番号を入力してください」と要求された。",
    correctChoices: [
      { text: "「簡単に大金が稼げる話は絶対に嘘だ」と見抜いて、何も入力せずページを閉じる", money: 0, principleTag: "safe", explain: "せいかい！【騙されない・応募しない】甘い言葉で個人情報を集める悪質な広告だよ！" }
    ],
    wrongChoices: [
      { text: "報酬をもらいたいので、自分の名前・自宅の電話番号・口座番号を入力して送信する", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】大切な個人情報が詐欺グループに渡り、架空請求の電話が鳴り止まなくなったよ！" },
      { text: "「最初にお仕事の教材代として3,000円必要」と言われ、お小遣いから支払ってしまう", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】お金を払っても仕事は紹介されず、教材代を持ち逃げされてしまったよ！" },
      { text: "「本当に稼げますか？」とお問い合わせフォームから質問して相手の返事を待つ", money: -12000, principleTag: "fooled", damageType: "personal_info", explain: "【相手に騙された！】「安心ですよ」と言いくるめられて納得し、結局お金を払ってしまったよ！" }
    ]
  },

  // ── 助ける（2問） ──
  {
    id: "elementary_q12", category: "help", source: "銀行のATM", title: "ATMで困っているおばあさん",
    characterName: "困っている高齢者",
    narration: "お買い物の途中、銀行のATMで、電話をしながら慌ててボタンを押しているおばあさんを見かけました。",
    dialogue: [
      { speaker: "おばあさん", line: "「（電話で）はい、言われた通り番号を押しました！ これで医療費の還付金が戻ってくるんですね…？」" },
      { speaker: "主人公", line: "「電話しながらATMでお金が戻るって…これってニュースで見た還付金詐欺じゃないかな！？」" }
    ],
    point: "ATMを操作して『お金が戻ってくる』ことは絶対にありません！ 100%詐欺です！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.atm,
    character: IMAGE_ASSETS.characters.elderlyWomanCane,
    screenshot: null,
    desc: "おばあさんが電話で指示を受けながらATMでお金を送金しようとしている。",
    correctChoices: [
      { text: "近くの銀行員さんや店員さんに「おばあさんが騙されているかも！」と急いで知らせる", money: 300, principleTag: "safe", explain: "✨ 大正解！【騙されない・周囲と連携】すぐに大人の人に知らせたおかげでおばあさんを救えたよ！（お礼+300円）" }
    ],
    wrongChoices: [
      { text: "電話の相手に自分の名前を名乗り、「僕がおばあちゃんの暗証番号を聞いて入力します」と言う", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】暗証番号を聞き出して入力してしまい、預金が全額引き出されてしまったよ！" },
      { text: "おばあさんの代わりに電話を代わって、相手の指示通りに送金ボタンを押してあげる", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】詐欺の送金を手伝ってしまい、おばあさんの大切な貯金が奪われたよ！" },
      { text: "電話口の男から「市役所の正規手続きです」と言われて「そうなんだ」と見守る", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】嘘の説明を信じてしまい、送金を止められずに被害が出てしまったよ。" }
    ]
  },
  {
    id: "elementary_q13", category: "help", source: "おうちのリビング", title: "お母さんがパニックに！？",
    characterName: "母",
    narration: "学校から帰ると、お母さんが青い顔をして電話をしていました。\nお母さん：「警察から電話があって…口座が犯罪に使われたから、安全な別口座にお金を全部移しなさいって言われたの…」",
    dialogue: [
      { speaker: "母", line: "「どうしよう… すぐにお金を振り込まないと逮捕されちゃうのかしら…」" },
      { speaker: "主人公", line: "「お母さん落ち着いて！ 電話でお金を送れっていうのは詐欺だよ！」" }
    ],
    point: "本物の警察が「指定した別の口座にお金を移せ」と電話することは100%ありません！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.motherWorried,
    screenshot: null,
    desc: "お母さんが「警察から電話でお金を別口座に移せと言われた」と慌てている。",
    correctChoices: [
      { text: "「警察がお金を移せというのは絶対詐欺だよ！ 一度切って110番で確認しよう！」と止める", money: 300, principleTag: "safe", explain: "✨ 家族を救ったね！【騙されない・警察へ確認】電話でお金の話はすべて詐欺！ しっかり止められたね！（お礼+300円）" }
    ],
    wrongChoices: [
      { text: "電話を代わって、家族全員の名前・生年月日・通帳の暗証番号を相手に伝える", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】大切な家族の個人情報を教えてしまい、別の詐欺にも狙われるようになったよ！" },
      { text: "逮捕されたら大変だから、お母さんと一緒に銀行へ行って急いでお金を振り込む", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】家族の大切な貯金が全部だまし取られてしまったよ！" },
      { text: "相手が「捜査の秘密だから誰にも言うな」と言っているのを信じて黙って見守る", money: -20000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】脅迫を信じてしまい、お母さんの振り込みを止められなかったよ。" }
    ]
  },

  // ── 本物（3問） ──
  {
    id: "elementary_q14", category: "real", source: "SNS投稿", title: "夏休みキャンペーンのゲーム広告",
    characterName: "ゲーム公式アカウント",
    narration: "SNSを見ていると、遊んでいるゲームの公式アカウントから「夏休みキャンペーン開催中！」という広告が流れてきました。いつもと少しデザインが違います。",
    dialogue: [
      { speaker: "ゲーム公式", line: "【公式お知らせ】夏休みログインボーナス配布中！ 詳細はゲーム内お知らせまたは公式ポータルサイトをご確認ください。" },
      { speaker: "主人公", line: "「いつもの広告と絵の雰囲気が違うな…これって詐欺なのかな？」" }
    ],
    point: "見た目がいつもと違っても詐欺とは限りません。公式アカウントのマークやゲーム内のお知らせで確認しましょう！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.elementarySummerGameCampaignReal,
    desc: "「夏休みキャンペーン開催中。ゲーム内お知らせから確認してください」と案内されている。",
    correctChoices: [
      { text: "「見た目だけで決めつけず」公式マークを確認し、いつものゲーム内お知らせを開いて確かめる", money: 0, principleTag: "safe", explain: "せいかい！【正規確認】本物の公式キャンペーンだったね！安全なルートで正しく確認できたよ！" }
    ],
    wrongChoices: [
      { text: "確認のため、広告のリプライ欄に自分のアカウントIDとパスワードを書き込む", money: -20000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】公開されたパスワードを見られてアカウントを盗まれてしまったよ！" },
      { text: "「ボーナスを受け取るには課金が必要」と勘違いし、勝手に有料アイテムを買う", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】無料でもらえるものだったのに、無駄なお金を使ってしまったよ。" },
      { text: "「いつもとデザインが違うから全部詐欺だ！」と決めつけてアプリを削除する", money: -8000, principleTag: "fooled", damageType: "money", explain: "【誤認拒絶】本物のイベントだったのにデータを消してしまい、復旧に手数料がかかってしまったよ。" }
    ]
  },
  {
    id: "elementary_q15", category: "real", source: "メール", title: "宅配便のおるす通知",
    characterName: "宅配業者",
    narration: "おうちにいると、宅配会社からメールが届きました。\n『お荷物をお届けにあがりましたが不在でした。伝票番号：1234-5678。再配達は公式アプリまたは公式サイトからご依頼ください。』",
    dialogue: [
      { speaker: "主人公", line: "「今日届く予定だったマンガの本だ！ 伝票番号もちゃんと書いてあるぞ。」" }
    ],
    point: "伝票番号が明記され、公式アプリや公式サイトからの手続きを案内する通知は本物の連絡です。",
    notification: "📱ピコン お荷物のおしらせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.elementaryDeliveryNoticeReal,
    desc: "「お留守のため荷物を持ち帰りました。伝票番号をご確認の上公式アプリからご依頼ください」と届いた。",
    correctChoices: [
      { text: "おうちの人に伝えて、ブックマークしてある公式アプリから伝票番号で再配達を頼む", money: 0, principleTag: "safe", explain: "せいかい！【正規確認】公式アプリから伝票番号を入れて安全に再配達を頼めたね！" }
    ],
    wrongChoices: [
      { text: "メールに返信して、親のクレジットカード番号や暗証番号を書いて送ってしまう", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】宅配便の再配達にクレジットカード情報は不要です！情報流出被害が出たよ。" },
      { text: "「再配達手数料が必要」と勘違いして、ネットで見つけた怪しい窓口へお金を払う", money: -12000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】正規の再配達は無料なのに、偽の窓口にお金を騙し取られたよ！" },
      { text: "「不在通知は全部詐欺だ」と思い込み、何も確認せずに荷物を完全に放置する", money: -8000, principleTag: "fooled", damageType: "money", explain: "【誤認拒絶】本物の荷物が返送され、往復の送料とキャンセル料8,000円を請求されたよ！" }
    ]
  },
  {
    id: "elementary_q16", category: "real", source: "LINE公式", title: "お店から届いた夏休み10％OFFクーポン！？",
    characterName: "ショップ公式LINE",
    narration: "いつも利用しているお店の公式LINEから、「夏休み限定！ 10%OFFクーポン配布中！」というメッセージが届きました。普段はあまりクーポンが届かないお店です。",
    dialogue: [
      { speaker: "ショップ公式", line: "【会員様へ】お会計時にこの画面のバーコードをレジでご提示ください。※リンク先でのカード番号入力等は一切不要です。" },
      { speaker: "主人公", line: "「普段クーポンが来ないお店だから怪しい気もするけど…本物なのかな？」" }
    ],
    point: "公式LINEの認証マークがあり、個人情報やカード入力を求めずにレジ提示だけで使えるクーポンは本物です。",
    notification: "📱ピコン お店からのクーポン！",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.elementarySummerCouponReal,
    desc: "「夏休み10%OFFクーポン。お会計時にレジで提示してください」とLINEが届いた。",
    correctChoices: [
      { text: "公式アカウントの緑の認証マークを確認し、お買い物のときにレジで画面を見せる", money: 0, principleTag: "safe", explain: "せいかい！【正規確認】本物の公式クーポンだったね！正しく確認してお得にお買い物できたよ！" }
    ],
    wrongChoices: [
      { text: "「クーポン適用のため」と思い込み、LINEのトーク画面に親の住所やカード番号を書く", money: -18000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】レジで見せるだけのクーポンなのに、不要な個人情報を送ってしまったよ！" },
      { text: "「クーポン購入代金」が必要だと勘違いし、電子マネーを買って送金する", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】無料の割引クーポンなのに、勝手に送金してお金を失ってしまったよ！" },
      { text: "「普段来ないクーポンは詐欺だ！」と疑い、公式アカウントを通報・ブロックする", money: -8000, principleTag: "fooled", damageType: "money", explain: "【誤認拒絶】本物のお得なクーポンを捨ててしまい、割引を受けることができなかったよ。" }
    ]
  }
];

/* =========================================================
   【中高生モード用問題プール】（全16問・3原則思考型4択）
   ========================================================= */
const QUESTIONS_TEEN = [
  // ── 詐欺（11問） ──
  {
    id: "teen_q01", category: "scam", source: "SMS通知", title: "サイバー犯罪捜査課通知",
    characterName: "サイバー犯罪捜査課",
    narration: "スマホに警察を名乗るSMSが届きました。\n内容：【重要】あなた名義の銀行口座が特殊詐欺の送金先に利用されていることが判明しました。24時間以内に下記URLより本人認証を行わない場合、全口座を凍結し法的措置へ移行します。",
    dialogue: [
      { speaker: "通知メッセージ", line: "緊急本人確認ポータル：http://police-cyber-security.jp-auth.net" },
      { speaker: "主人公", line: "（口座凍結や法的措置って書いてある…焦るな、どう対応すればいいんだ？）" }
    ],
    point: "警察がSMSでパスワード認証を求めたり、URLリンクから口座の照会を指示することは絶対にありません。",
    notification: "📱ピコン 【警告】口座凍結のお知らせ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenPoliceFreezeScam,
    desc: "「不正利用検知。24時間以内にリンクから本人確認しないと口座を凍結します」とSMSが届いた。",
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
    id: "teen_q02", category: "scam", source: "SNSのDM", title: "公式風 特別プレゼント企画",
    characterName: "人気配信者プレゼント企画",
    narration: "SNSを見ていると、有名配信者そっくりなアカウントから「当選おめでとうございます！欲しい物をプレゼントします。24時間以内に発送先住所を登録してください」とDMが届きました。",
    dialogue: [
      { speaker: "アカウント", line: "【発送手続き】下記フォームより、氏名・自宅住所・電話番号および本人確認用クレジットカード情報をご入力ください。（送料500円のみ発生します）" },
      { speaker: "主人公", line: "（送料500円だけでプレゼントが届くの！？ お得だけどクレカ入力が必要なのか…）" }
    ],
    point: "有名人を騙る偽アカウントです。「無料プレゼント」を口実に個人情報やクレカ情報を盗む手口に注意しましょう。",
    notification: "📱ピコン 当選DMが届きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenFakeGiftScam,
    desc: "「プレゼント当選！送料500円の決済と配送先住所を24時間以内に入力してください」とDMが届いた。",
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
    id: "teen_q03", category: "real", source: "SMS通知", title: "公式 通信キャリア制限通知",
    characterName: "通信キャリア公式",
    narration: "部活動の帰り道、スマホに通信会社から通知が届きました。\n内容：【お知らせ】今月のデータ通信量が上限に達しました。速度制限を解除する場合は、公式マイページまたは公式アプリよりお手続きください。",
    dialogue: [
      { speaker: "通信キャリア", line: "※本SMSには直接のログインリンクは記載されておりません。ブラウザのブックマークや公式アプリをご利用ください。" }
    ],
    point: "SMS本文に直接ログインURLを載せず、「公式アプリやブックマークからアクセスしてください」と案内する通知は正規の公式通知です。",
    notification: "📱ピコン 通信会社からの通知",
    bg: IMAGE_ASSETS.backgrounds.schoolRoute,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.teenDataNoticeReal,
    desc: "「データ上限到達のお知らせ。手続きは公式アプリ・マイページから行なってください（直リンクなし）」との通知。",
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
    id: "teen_q04", category: "real", source: "メール通知", title: "宅配会社 不在通知",
    characterName: "宅配業者",
    narration: "休日に家で過ごしていると、宅配会社からメールが届きました。\n内容：お荷物のお届けに伺いましたがご不在でした。伝票番号：1234-5678。再配達の依頼は公式LINEまたは公式サイトよりお願いいたします。",
    dialogue: [
      { speaker: "主人公", line: "（今日届く予定だったネット通販の荷物だ。お問い合わせ伝票番号も明記されているな。）" }
    ],
    point: "伝票番号が明記され、公式アプリ・公式サイトからの再配達手続きを案内する通知は正規の連絡です。",
    notification: "📱ピコン 不在持ち帰りのお知らせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.teenDeliveryNoticeReal,
    desc: "「ご不在のため荷物を持ち帰りました。伝票番号をご用意の上公式アプリより再配達を依頼してください」との案内。",
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
    id: "teen_q05", category: "help", source: "街中（銀行ATM）", title: "ATMでの高齢者電話操作",
    characterName: "困っている高齢者",
    narration: "ショッピングモールのATMコーナーを通ると、電話をしながら慌ててボタンを操作している高齢者を見かけました。",
    dialogue: [
      { speaker: "おばあさん", line: "（電話口へ）「はい、言われた通り操作しました！ これで医療費の還付金が戻ってくるんですね…？」" },
      { speaker: "主人公", line: "（電話で指示を受けながらATMで還付金…！？ 還付金詐欺じゃないかな？）" }
    ],
    point: "ATMを操作して還付金が受け取れることは絶対にありません！ 周囲の大人の協力を得て止めましょう！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.atm,
    character: IMAGE_ASSETS.characters.elderlyWomanCane,
    screenshot: null,
    desc: "高齢者が携帯電話で指示を受けながらATMで「還付金」の振込操作をしている。",
    correctChoices: [
      { text: "「還付金はATMで受け取れません！詐欺かもしれません！」と声をかけ、操作を止めて銀行員や店員を呼ぶ", money: 300, principleTag: "safe", explain: "✨ 正解！【騙されない・周囲と連携】ATM操作で還付金が戻ることは絶対にありません。声をかけて被害を防げました！（お礼+300円）" }
    ],
    wrongChoices: [
      { text: "電話を代わり、おばあさんの代わりに口座番号や暗証番号を電話口で伝えてしまう", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】暗証番号を犯人に教えてしまい、おばあさんの預金を全額奪わせてしまいました。" },
      { text: "おばあさんの代わりに操作を手伝い、相手の言う通りの送金ボタンを押してあげる", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】詐欺の送金を手伝ってしまい、高齢者の大切な預金を奪わせてしまいました。" },
      { text: "電話口の相手から「市役所の年金課です」と怒鳴られ、「本当なんだ」とそのまま見守る", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】犯人の脅迫に騙されて止められず、高齢者は全額送金してしまいました。" }
    ]
  },
  {
    id: "teen_q06", category: "scam", source: "自宅訪問", title: "緊急屋根・瓦点検商法",
    characterName: "近隣工事作業員",
    narration: "自宅で過ごしていると玄関のチャイムが鳴り、作業服を着た男が立っていました。\n男：「近所で工事をしている者ですが、お宅の屋根の瓦がズレて落ちそうですよ。今ならハシゴがあるので無料で見てあげます。」",
    dialogue: [
      { speaker: "作業員", line: "放置すると次の雨で雨漏りしますよ。今すぐ屋根に登って点検しましょうか？" },
      { speaker: "主人公", line: "（親は外出中だけど…本当に瓦が落ちて近所の人に当たったら大変なのかな…？）" }
    ],
    point: "突然の訪問点検は、自ら瓦を割って高額な修繕契約を迫る「点検商法」の典型手口です！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: null,
    desc: "「屋根が崩れそうで危険。今すぐ無料で点検する」と訪問業者が家に入ろうとしている。",
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
    id: "teen_q07", category: "scam", source: "SNSチャット", title: "友達のアカウントから急なお願い",
    characterName: "友達のアカウント",
    narration: "部活の帰り道、仲の良い友達のSNSアカウントから急な連絡が届きました。\n『頼む！ 今どうしても親に言えない事情があって困ってるの！ 今すぐコンビニで1万円分の電子マネーを買って番号を送って！ 明日学校で絶対返す！』",
    dialogue: [
      { speaker: "友達？", line: "お願いだから急いで！ 誰にも言わないで！" },
      { speaker: "主人公", line: "（いつもの言葉遣いと少し違うような…でも友達が一大事なのかな？）" }
    ],
    point: "友達のアカウントが乗っ取られている可能性が高いです。「電子マネーの番号を送って」は100%詐欺を疑いましょう。",
    notification: "📱ピコン 友達からの緊急連絡",
    bg: IMAGE_ASSETS.backgrounds.schoolRoute,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenFriendMoneyScam,
    desc: "仲の良い友達から「今すぐコンビニで1万円分の電子マネーを買って番号を送って」と届いた。",
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
    id: "teen_q08", category: "help", source: "家庭（リビング）", title: "お母さんへの不審な警察電話",
    characterName: "母",
    narration: "学校から帰ると、お母さんが青ざめた顔で電話を切るところでした。\n母：「警察から電話があって…私の口座が犯罪に使われたから、安全な別口座にお金を全額移しなさいと言われたの…」",
    dialogue: [
      { speaker: "母", line: "どうしよう…指示された口座に今すぐ振り込まないと逮捕されちゃうかしら…" },
      { speaker: "主人公", line: "（警察が電話で口座の金を移せなんて言うはずがない…！）" }
    ],
    point: "警察が電話で「指定口座にお金を移せ」と指示することは100%ありません。偽警察詐欺です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.motherWorried,
    screenshot: null,
    desc: "お母さんが「警察から口座のお金を別の口座に移せと言われた」とパニックになっている。",
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
    id: "teen_q09", category: "real", source: "公式SNS投稿", title: "公式Xで見つけた期間限定ガチャキャンペーン",
    characterName: "ゲーム公式X",
    narration: "X（旧Twitter）を見ていると、普段遊んでいるゲームの公式アカウント（金色の公式認証マーク付き）から「大型アップデート記念！ 今だけガチャ石1,000個プレゼントキャンペーン開催！」という投稿が流れてきました。",
    dialogue: [
      { speaker: "ゲーム公式", line: "【公式キャンペーン】プレゼントはゲーム内プレゼントボックスに直接付与されます。※外部サイトへの誘導やパスワード入力は一切ありません。" },
      { speaker: "主人公", line: "（いつもよりかなりお得な内容だけど…これって詐欺じゃないのかな？）" }
    ],
    point: "公式認証マークを確認し、外部サイトへの誘導がなくゲーム内へ直接付与されるキャンペーンは安全な公式告知です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.teenGameCampaignReal,
    desc: "「ガチャ石1,000個プレゼント。ゲーム内ボックスへ直接付与（外部誘導なし）」と公式告知されている。",
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
    id: "teen_q10", category: "scam", source: "スマートフォン着信", title: "国外からの怪しい電話",
    characterName: "自動音声・不審な発信者",
    narration: "スマホに見覚えのない「+1」から始まる国際電話番号から着信がありました。電話に出ると、片言の日本語で自動音声が流れてきました。\n『こちらは重要確認センターです。あなた宛の重要書類が届いておりません。確認のため、氏名・生年月日・暗証番号を入力してください。』",
    dialogue: [
      { speaker: "自動音声", line: "ダイヤルの【1】を押して、本人確認情報をご入力ください。" },
      { speaker: "主人公", line: "（海外からの電話番号だ…重要書類って何の確認だろう？）" }
    ],
    point: "見覚えのない国際電話や不審な自動音声で個人情報を要求されたら、すぐに切断しましょう。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenOverseasCallScam,
    desc: "海外番号から電話があり、「重要書類の確認のため氏名や暗証番号を入力してください」と要求された。",
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
    id: "teen_q11", category: "scam", source: "Instagram DM", title: "日本人アカウントからの「投資に興味ない？」",
    characterName: "親密なフォロワー",
    narration: "Instagramで、友達もフォローしている日本人アカウントからフォローされ、何日か世間話をして仲良くなりました。\n相手：「普段どんなバイトしてるの？ 実は私、スマホだけで月15万稼げる暗号資産の運用をやってるんだけど、興味ない？」",
    dialogue: [
      { speaker: "相手", line: "「私の指示通りに専用サイトに入金するだけだよ。友達にも特別に教えたいな！」" },
      { speaker: "主人公", line: "（友達もフォローしてる人だし、会話も自然だったけど…投資の話に乗っていいのかな？）" }
    ],
    point: "友達がフォローしていても安全とは限りません。SNSで親密になった後に投資や送金を勧めるのは詐欺です。",
    notification: "📱ピコン DMが届きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenInvestmentDmscam,
    desc: "SNSで知り合った相手から「スマホで月15万稼げる投資サイトに入金してみて」と誘われた。",
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
    id: "teen_q12", category: "scam", source: "ネット通販", title: "本日まで・数量限定のアイドルグッズ",
    characterName: "限定グッズショップ",
    narration: "公式ストアで即完売した大好きなアイドルの限定ライブグッズを探していると、別の通販サイトで見つけました。\n定価8,000円のグッズが『39,800円・本日23:59まで・残り1点・販売元：不明な海外業者』と表示されています。",
    dialogue: [
      { speaker: "販売ページ", line: "【プレミア価格】クレジットカードまたは銀行振込で即日発送！キャンセル不可。" },
      { speaker: "主人公", line: "（どうしても欲しいグッズだ…高額だけど今日を逃したら二度と手に入らないかも…）" }
    ],
    point: "「残り1点」「本日まで」と煽る非公式の怪しいショップは、偽物が届くかお金だけ奪われる危険があります。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenIdolGoodsScam,
    desc: "完売した人気グッズが非公式通販で高額販売され、「本日限定・残り1点」と購入を急かしている。",
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
    id: "teen_q13", category: "scam", source: "SNS募集", title: "荷物を運ぶだけ 日給5万円のバイト",
    characterName: "高額バイト募集",
    narration: "SNSで『#日払い #高額バイト #荷物を受け取って届けるだけ #書類運搬 #日給5万円 #身分証提示必須』という投稿を見つけました。",
    dialogue: [
      { speaker: "募集担当DM", line: "「誰でもできる簡単なお仕事です。生徒手帳か保険証の写真を送ってくれれば、秘密のチャットアプリで詳細を指示します。」" },
      { speaker: "主人公", line: "（荷物を運ぶだけで5万円！？ ちょっと怪しい気もするけど、すぐにお金が欲しいな…）" }
    ],
    point: "「荷物や書類を運ぶだけ」は特殊詐欺の『受け子・出し子』です！一度身分証を送ると脅されて抜け出せなくなります！",
    notification: "📱ピコン バイト募集への返信",
    bg: IMAGE_ASSETS.backgrounds.schoolRoute,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenDarkJobScam,
    desc: "「荷物を運ぶだけで日給5万円。身分証の写真を送ってください」と闇バイトの勧誘を受けた。",
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
    id: "teen_q14", category: "scam", source: "SNS投稿", title: "ライブ良席チケット譲ります",
    characterName: "チケット譲渡アカウント",
    narration: "SNSで、大人気ライブの完売チケットについて「急用で行けなくなったのでアリーナ最前列チケットを定価で譲ります。PayPayで先払い確認後に電子チケットを分配します」という投稿を見つけました。",
    dialogue: [
      { speaker: "譲渡希望者", line: "「他にも希望者が多いので、今すぐ送金できる方を優先します！」" },
      { speaker: "主人公", line: "（どうしても行きたかったライブだ！ 定価だし先にお金を送ればチケットがもらえるのかな…？）" }
    ],
    point: "SNSでの個人間先払い取引は極めて危険です。送金後にブロックされて逃げられる詐欺が多発しています。",
    notification: "📱ピコン チケット譲渡のDM",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenTicketResaleScam,
    desc: "「完売チケットを定価で譲る。PayPayで先払いしてくれたら電子チケットを送る」と連絡が届いた。",
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
    id: "teen_q15", category: "scam", source: "Instagram DM", title: "著作権侵害でアカウント削除！？",
    characterName: "偽著作権サポート",
    narration: "SNSを開くと、公式サポート風のアカウントから警告DMが届いていました。\n『【著作権侵害の警告】あなたの投稿が著作権を侵害していると通報されました。24時間以内にリンクから異議申し立てを行わない場合、アカウントが永久削除されます。』",
    dialogue: [
      { speaker: "偽サポート", line: "異議申し立てポータル：http://instagram-copyright-appeal-center.com" },
      { speaker: "主人公", line: "（アカウントが消されたら友達との思い出も消えちゃう…急いで異議申し立てしなきゃ！）" }
    ],
    point: "「アカウント削除」でパニックにさせ、偽ログイン画面にパスワードを入力させて乗っ取るフィッシングです。",
    notification: "📱ピコン 【警告】著作権侵害通知",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenCopyrightScam,
    desc: "「著作権侵害で通報された。24時間以内にリンクからログインして申し立てしないと削除する」と届いた。",
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
    id: "teen_q16", category: "scam", source: "SNS動画広告", title: "有名人出演の月20万円稼げるアプリ",
    characterName: "AI副業動画広告",
    narration: "SNSを見ていると、大人気タレントが出演する「誰でも月20万円稼げる最新スマホアプリ」の動画広告が流れてきました。",
    dialogue: [
      { speaker: "有名タレント（AI偽動画）", line: "「私もこのアプリを毎日使ってます！ 今だけ登録料無料で特別なボーナスがもらえますよ！」" },
      { speaker: "主人公", line: "（あの人気タレントが本人の声でおすすめしてる！ 本当に稼げるアプリなのかな？）" }
    ],
    point: "AI技術（ディープフェイク）で有名人の顔や声を偽装した詐欺広告です。本人が動画で話していても信用してはいけません。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenAiFakeAdScam,
    desc: "有名人が動画で「私も使っている」と副業アプリをおすすめしている広告が表示された。",
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
    id: "adult_q01", category: "scam", source: "SMS通知", title: "自動更新完了（サブスク架空請求）",
    characterName: "動画サービスカスタマー",
    narration: "スマートフォンのSMSに通知が届きました。\n内容：【重要】会員登録中のクラウド動画見放題プラン（月額49,800円）が自動更新されました。本日24時を過ぎると返金不可となります。退会・解約希望窓口：050-XXXX-XXXX",
    dialogue: [
      { speaker: "通知メッセージ", line: "心当たりのない登録・誤登録の解約手続きはお電話にて承ります。" },
      { speaker: "あなた", line: "（月額5万円近い高額請求！？ 無料お試し期間の解約を忘れていたのだろうか…？）" }
    ],
    point: "身に覚えのない自動更新を装い、焦らせて電話をかけさせて電子マネーや振込を迫る架空請求詐欺です。",
    notification: "📱ピコン 【重要】自動更新のお知らせ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.subscriptionScam,
    desc: "「月額49,800円が自動更新されました。本日中に解約希望の方は記載の電話番号へ」とSMSが届いた。",
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
    id: "adult_q02", category: "scam", source: "Eメール", title: "e-Tax還付金受取手続き",
    characterName: "国税庁税務相談課",
    narration: "メールボックスに「国税庁 e-Tax」を名乗る重要メールが届きました。\n内容：【重要】過年度の確定申告にかかる還付金（38,400円）の送金準備が完了いたしました。受取口座の有効期限が迫っておりますので、下記リンクより払戻先口座情報を照会してください。",
    dialogue: [
      { speaker: "e-Tax偽装メール", line: "認証URL：http://e-tax.nta-go-jp.secure-receive.com（※24時間以内にログインしてください）" },
      { speaker: "あなた", line: "（確定申告の還付金か？ ちょうど申告時期だし本物に見えるが…）" }
    ],
    point: "国税庁や税務署がメールの直リンクから口座情報やカード番号、暗証番号を入力させることは絶対にありません。",
    notification: "📱ピコン 【国税庁】還付金のお受け取りについて",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.taxRefundScam,
    desc: "「確定申告の還付金38,400円の送金手続き。リンクより受取口座とカード情報を入力してください」とメールが届いた。",
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
    id: "adult_q03", category: "scam", source: "SMS通知", title: "銀行不正ログイン検知",
    characterName: "銀行セキュリティデスク",
    narration: "スマートフォンのSMSに、利用している大手銀行から緊急通知が届きました。\n内容：【重要】異常な取引を検知したため、お取引を一時規制しております。ご本人様によるご確認はこちらから手続きを行ってください。http://bank-security-verify.net",
    dialogue: [
      { speaker: "偽サイト画面", line: "本人確認のため、店番号・口座番号・ログインパスワードおよび、スマホに届いたワンタイムパスワードを入力してください。" },
      { speaker: "あなた", line: "（口座が止められたら支払いが滞る…すぐに認証して解除しなきゃ…）" }
    ],
    point: "「不正利用検知」で焦らせ、本物の銀行から届いたワンタイムパスワード（OTP）を入力させて不正送金する手口です。",
    notification: "📱ピコン 【重要】取引規制のお知らせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.bankOtpScam,
    desc: "「不正ログイン検知のため口座規制中。リンク先でワンタイムパスワードを入力してください」とSMSが届いた。",
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
    id: "adult_q04", category: "scam", source: "電話・LINE誘導", title: "偽警察逮捕状詐欺",
    characterName: "警察庁捜査二課",
    narration: "スマホに警察を名乗る人物から電話があり、「あなたの名義の口座が資金洗浄に使われている。詳しい事情聴取のためLINEを追加してください」と指示されました。LINEを追加すると「逮捕状」と書かれた書類の画像が送られてきました。",
    dialogue: [
      { speaker: "自称・捜査官", line: "「身の潔白を証明するため、保釈保証金として50万円をこちらの指定口座へ一時供託してください。捜査終了後に返金します。」" },
      { speaker: "あなた", line: "（本物の逮捕状のような書類まで見せられた…どう対応すべきか…？）" }
    ],
    point: "警察がSNS（LINE）で事情聴取を行ったり、逮捕状の画像を送ったり、保釈金を振り込ませることは100%ありません。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.fakeArrestWarrant,
    desc: "警察を名乗りLINEで逮捕状を見せられ、「身の潔白のため保証金を振り込め」と指示された。",
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
    id: "adult_q05", category: "scam", source: "SNS広告・LINE", title: "投資勉強会（著名人悪用）",
    characterName: "有名アナリストアシスタント",
    narration: "SNSを見ていると、テレビでも有名な経済アナリストの写真を使った投資広告からLINEグループに誘導されました。グループ内では複数の参加者が「指示通りに買ったら100万円儲かった！」と投稿しています。",
    dialogue: [
      { speaker: "グループ管理者", line: "「明日公開の極秘銘柄です。最低一口30万円から、こちらの専用海外プラットフォームへご入金ください。」" },
      { speaker: "あなた", line: "（参加者全員が利益を出していると投稿している…少額なら試す価値はあるか…？）" }
    ],
    point: "有名人の肖像を無断悪用した偽広告からLINEグループへ誘導し、サクラ全員で煽って入金させる「SNS型投資詐欺」です。",
    notification: "📱ピコン 投資勉強会へのご案内",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.investmentGroupScam,
    desc: "有名アナリストの偽LINEグループで「全員が儲かっている。指定プラットフォームに入金して」と指示された。",
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
    id: "adult_q06", category: "scam", source: "電話・訪問勧誘", title: "火災保険で無料リフォーム（不正請求）",
    characterName: "住宅災害コンサルタント",
    narration: "自宅に業者から連絡がありました。\n「火災保険を使えば自己負担ゼロで屋根を修理できます。経年劣化の傷みでも、台風で壊れたことにして申請書類を作成しますのでご安心ください。」",
    dialogue: [
      { speaker: "業者", line: "申請手続きはこちらで代行します。保険金が下りたらその中から工事費と手数料30%をいただきます。" },
      { speaker: "あなた", line: "（自己負担なしでリフォームできるなら得だが…事実と違う理由で申請していいのか…？）" }
    ],
    point: "経年劣化を自然災害と偽って保険請求することは保険金詐欺（犯罪）に該当し、高額な違約金を請求されるトラブルが多発しています。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: IMAGE_ASSETS.screenshots.insuranceRepairScam,
    desc: "「火災保険を使えば自己負担ゼロで修繕できる。劣化を台風被害として代行申請する」と勧誘された。",
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
    id: "adult_q07", category: "help", source: "街中（コンビニATM）", title: "ATM高齢者（還付金詐欺阻止）",
    characterName: "困っている高齢者",
    narration: "コンビニのATM前で、高齢者がスマホで誰かと通話しながらATMを操作しています。\n電話口から「はい、次は【確認】を押して、数字の【985200】を入力してください」と指示が聞こえてきます。",
    dialogue: [
      { speaker: "高齢者", line: "「これで市役所からの給付金が私の口座に振り込まれるんですね…？」" },
      { speaker: "あなた", line: "（電話で数字を入力させてる…これって還付金詐欺の送金操作だ！）" }
    ],
    point: "ATMの操作で給付金や還付金が受け取れることは絶対にありません。数字の入力は送金額を指定させられています。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.atm,
    character: IMAGE_ASSETS.characters.elderlyWomanCane,
    screenshot: null,
    desc: "高齢者が電話で指示を受けながらATMで「給付金受取」と信じて送金操作をしている。",
    correctChoices: [
      { text: "「お母さん、それ還付金詐欺です！送金操作させられています！」と声をかけて止め、コンビニ店員と連携する", money: 300, principleTag: "safe", explain: "✨ 見事な救出！【騙されない・店員と連携】ATM操作で還付金が戻ることは絶対にありません。店員と連携して被害を防ぎました！（お礼+300円）" }
    ],
    wrongChoices: [
      { text: "電話口の相手に「代わりに暗証番号を押してあげます」と伝えて高齢者の暗証番号を聞き出す", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】高齢者の暗証番号を漏洩させてしまい、預金が全額引き出されてしまいました。" },
      { text: "親切心から高齢者の代わりに操作を代わり、相手の言う通りの送金ボタンを押してあげる", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】詐欺の送金を手伝ってしまい、高齢者の大切な預金を奪わせてしまいました。" },
      { text: "電話口の男から「市役所の正規手続きです」と説明され、「そうなのか」とそのまま見守る", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】犯人の説明を信じてしまい、高齢者の送金を止めることができませんでした。" }
    ]
  },
  {
    id: "adult_q08", category: "real", source: "クレジットカード会社", title: "【本物】クレジットカード会社からの「ご利用明細確定」通知",
    characterName: "カード会社公式",
    narration: "普段利用しているカード会社からメールが届きました。\n内容：【〇〇カード】今月のご利用代金明細書を作成いたしました。明細内容は公式Webサービス（会員ログイン画面）または公式アプリよりご確認ください。※不審なフィッシングメールにご注意ください。",
    dialogue: [
      { speaker: "あなた", line: "（普段使っているカード会社の定期明細案内だ。直接ログインさせる怪しいリンクもないな。）" }
    ],
    point: "定期的な利用明細の確定通知であり、個人情報やカード番号の入力を急かす文面がないものは本物の正規連絡です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.adultCardStatementReal,
    desc: "クレジットカード会社から「今月のご利用明細が確定しました。公式サイトよりご確認ください」と届いた。",
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
    id: "adult_q09", category: "help", source: "職場（オフィス）", title: "Microsoft偽警告（同僚サポート詐欺阻止）",
    characterName: "職場の同僚",
    narration: "オフィスで仕事中、隣の同僚が青ざめた顔で受話器を持ち、けたたましい警告音が鳴るノートPCの画面を見つめていました。\n同僚：「急に『ウイルス感染！PCがロックされました』って警告が出て…画面のサポート窓口に電話したら、今すぐ遠隔操作ソフトを入れて電子マネーで修理代を払えと言われてるんだけど…」",
    dialogue: [
      { speaker: "同僚", line: "会社の機密データが漏洩したら私の責任になる…言われた通りにお金を払った方がいいよね…！？" }
    ],
    point: "全画面警告と警告音はWebブラウザ上の偽物（サポート詐欺）です。遠隔操作ソフトを入れると社内ネットワークの機密情報が窃取されます。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.supportScamHelp,
    desc: "同僚がPCの偽警告画面にパニックになり、電話の指示で遠隔操作ソフトを入れようとしている。",
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
    id: "adult_q10", category: "scam", source: "スマートフォンSMS", title: "関税未納（国際郵便スミッシング）",
    characterName: "日本税関通関センター",
    narration: "スマートフォンに「日本税関」を名乗る緊急SMSが届きました。\n内容：【日本税関】海外から発送されたお荷物について関税（2,980円）が未納のため通関が保留されています。本日中に納付がない場合、商品は廃棄処分となります。支払い窓口：http://customs-japan-tax.vip",
    dialogue: [
      { speaker: "SMS通知", line: "支払い方法：クレジットカード決済 / Appleギフトカード決済" },
      { speaker: "あなた", line: "（海外通販で頼んだ荷物があったかもしれない…2980円なら払うべきか…？）" }
    ],
    point: "税関が個人の携帯電話へSMSで直接関税の納付を要求したり、ギフトカードで支払わせることは絶対にありません。",
    notification: "📱ピコン 【税関】関税未納通知",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.customsFeeScam,
    desc: "「国際郵便の関税2,980円が未納。本日中にリンクから支払わないと荷物を処分する」とSMSが届いた。",
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
    id: "adult_q11", category: "scam", source: "スマートフォンSMS", title: "マイナポータル（電子証明書更新）",
    characterName: "デジタル庁マイナポータル",
    narration: "スマートフォンに「デジタル庁」を名乗る緊急SMSが届きました。\n内容：【デジタル庁】マイナンバーカードの電子証明書が有効期限切れを迎えています。本日中に再登録されない場合、健康保険証連携および公金口座が一時停止されます。更新手続き：http://myna-portal-auth.com",
    dialogue: [
      { speaker: "あなた", line: "（保険証が使えなくなったら困る…今すぐ暗証番号を入力して更新すべきか…？）" }
    ],
    point: "デジタル庁や自治体がSMSでマイナンバーカードの暗証番号や暗証コードの再入力を求めることは絶対にありません。",
    notification: "📱ピコン 【デジタル庁】電子証明書更新のお知らせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.mynaPortalScam,
    desc: "「マイナンバーカードの電子証明書が期限切れ。本日中にリンクから暗証番号を再登録してください」と届いた。",
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
    id: "adult_q12", category: "scam", source: "スマートフォンSMS", title: "電気・ガス停止予告",
    characterName: "電力供給センター",
    narration: "スマートフォンのSMSに、電力会社を名乗る緊急警告が届きました。\n内容：【〇〇電力】電気料金（4,980円）の未払いが確認されました。本日18時までにお支払いが確認できない場合、電力の供給を停止いたします。至急お支払いください：http://power-pay-bill.net",
    dialogue: [
      { speaker: "あなた", line: "（電気が止められたら仕事も生活もできない！ 4,980円ならすぐリンクから払うべきか…？）" }
    ],
    point: "「本日夕方に電気を止める」など極度の焦りを生む文面はスミッシング詐欺の典型です。正規の電力会社が事前予告なしにSMSだけで即日送電停止することはありません。",
    notification: "📱ピコン 【警告】電力供給停止予告",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.utilityStopScam,
    desc: "「電気料金未払いのため本日18時に電力供給を停止します。至急リンクから支払ってください」とSMSが届いた。",
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
    id: "adult_q13", category: "scam", source: "ビジネスEメール", title: "偽請求書ビジネスメール（BEC）",
    characterName: "取引先担当者名義",
    narration: "会社のメールに、普段取引している会社とよく似たドメインから請求書メールが届きました。\n内容：【重要なお知らせ】弊社取引口座の変更について。今月度のお取引代金（250,000円）につきましては、セキュリティ強化のため下記の新指定口座へお振込みをお願いいたします。",
    dialogue: [
      { speaker: "メール文面", line: "※本口座変更は監査法人の指導によるものです。従来の旧口座へはお振込みにならないようご注意ください。" },
      { speaker: "あなた", line: "（いつもやり取りしている取引先の名前だ。口座変更の案内通りに処理していいだろうか…？）" }
    ],
    point: "取引先になりすまして振込先を変更させる「ビジネスメール詐欺（BEC）」です。メールの連絡先ではなく、既存の電話番号等で必ず確認しましょう。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.businessInvoiceScam,
    desc: "取引先から「振込先口座が変更になったので新口座へ振り込んでください」と請求書メールが届いた。",
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
    id: "adult_q14", category: "scam", source: "マッチングチャット", title: "マッチング相手からの「会うための交通費を貸して」",
    characterName: "さくら☆",
    narration: "マッチングアプリで知り合ってやり取りを重ね、仲良くなった女性「さくら」と今日初めて会う約束をしていました。\nしかし待ち合わせ直前に「ごめんなさい、交通費がないです…少しだけ貸してもらえないかな？会ったら必ず返すから！30,000円でいいです…！」とメッセージが届きました。",
    dialogue: [
      { speaker: "さくら", line: "「30,000円でいいです…！よろしくお願いします🥺」" },
      { speaker: "あなた", line: "（せっかく会える約束だったのに…会ったら返してくれると言っているし送金すべきか…？）" }
    ],
    point: "親密になった後に「会うための交通費」「トラブル解決金」などと理由をつけて先払いを求めるのはロマンス詐欺の典型です！",
    notification: "📱ピコン さくらからのメッセージ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.adultRomanceChatScam,
    desc: "「会うための交通費30,000円を貸して。会ったら必ず返すから」と送金を要求された。",
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
    id: "adult_q15", category: "scam", source: "Eメール", title: "身に覚えのないホテル予約「キャンセルはこちら」",
    characterName: "旅行予約サイトカスタマー",
    narration: "メールボックスを開くと、有名ホテル予約サイトから予約完了メールが届いていました。\n内容：【〇〇トラベル】スイートルーム2泊（合計198,000円）のご予約が完了しました。本日15時を過ぎるとキャンセル料100%が発生します。予約の取り消し・照会はこちら：http://travel-booking-cancel.net",
    dialogue: [
      { speaker: "あなた", line: "（予約した覚えがまったくない！ 20万円近く請求されたら大変だ、急いでキャンセルしなきゃ…！）" }
    ],
    point: "身に覚えのない超高額な予約メールを送り、「キャンセル料100%」で焦らせて偽の取消フォームへクレカ情報を再入力させるフィッシング詐欺です。",
    notification: "📱ピコン 【予約完了】キャンセル料のお知らせ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.hotelBookingScam,
    desc: "「身に覚えのないホテル予約（20万円）。本日中の取消はキャンセル料無料、リンクより手続きを」とメールが届いた。",
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
    id: "adult_q16", category: "real", source: "クレジットカード会社", title: "【本物】オンライン決済時の「3Dセキュア本人認証」",
    characterName: "カード会社公式認証",
    narration: "自ら公式オンラインストアでノートパソコンを購入し、決済ボタンを押したところ、カード会社の「本人認証サービス（3Dセキュア）」の画面が表示されました。\n画面：『お取引内容：〇〇公式ストア / 金額：88,000円。ご登録のカード会社公式ワンタイム認証アプリまたはSMSで届いたワンタイムパスワードをご入力ください。』",
    dialogue: [
      { speaker: "あなた", line: "（自分で今まさに購入手続きをしている最中の認証画面だ。金額と店舗名も一致している。）" }
    ],
    point: "自らが購入手続きを行っている最中に表示され、決済金額や利用加盟店名が正確に一致している正規の3Dセキュア画面は安全な本人認証です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.cardFraudPhishing,
    desc: "自分で買い物をしている最中に、金額と店舗名が正確に一致するカード会社の3Dセキュア画面が表示された。",
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
    id: "senior_q01", category: "scam", source: "固定電話・LINE", title: "偽警察からの電話とLINE「逮捕状」",
    characterName: "偽警察官",
    narration: "固定電話に警察官を名乗る人物から電話があり、「あなたの口座が犯罪に使われています。詳しく確認するのでLINEを追加してください」と言われました。LINEを追加すると警察官を名乗る相手から「逮捕状」と書かれた画像が送られてきました。",
    dialogue: [
      { speaker: "自称・警察官", line: "「このままだと逮捕されます。口座の預金を保護するため、金融庁の安全口座へ全額送金してください。」" },
      { speaker: "あなた", line: "（本物の逮捕状のような画像まで送られてきた…動揺してしまうがどうすべきか…？）" }
    ],
    point: "警察がSNS（LINE）で連絡を取ったり、逮捕状の画像を送ったり、お金を送金させることは絶対にありません！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.fakePoliceLineScam,
    desc: "警察を名乗りLINEで逮捕状を見せられ、「お金を安全口座へ送金しろ」と言われた。",
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
    id: "senior_q02", category: "scam", source: "スマートフォンSMS", title: "「特別給付金5万円」の受給手続きSMS",
    characterName: "年金給付センターサポート",
    narration: "スマホに「年金給付センターサポート」を名乗るSMSが届きました。\n内容：【重要】特別給付金50,000円の受給資格が確認されました。本日中に受給手続きを完了してください。受取口座の登録はこちら：http://nenkin-kyufu-auth.jp",
    dialogue: [
      { speaker: "あなた", line: "（給付金が5万円もらえるのか？『本日中』と書かれているし早く手続きすべきか…？）" }
    ],
    point: "給付金を装って「本日中」と焦らせ、銀行口座情報や暗証番号を入力させるフィッシング詐欺です。",
    notification: "📱ピコン 【給付金】受給手続きのお知らせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.benefitScam,
    desc: "「特別給付金5万円の受給手続き。本日中にリンクから口座情報を登録してください」と届いた。",
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
    id: "senior_q03", category: "scam", source: "固定電話", title: "息子を名乗る「急にお金が必要になった」",
    characterName: "自称・息子",
    narration: "固定電話が鳴り、慌てた様子の男の声が聞こえてきました。\n「母さん？ 俺だけど…風邪で声が変なんだ。実は会社の小切手が入ったカバンを無くしてしまって、今日中に補填のお金が必要なんだ。」",
    dialogue: [
      { speaker: "自称・息子", line: "携帯も無くしたから番号が変わったんだ。今から同僚が家にお金を取りに行くから用意して！" },
      { speaker: "あなた", line: "（息子が一大事になっている…急いでお金を用意してあげなければ…！？）" }
    ],
    point: "「電話番号が変わった」「カバンを無くした」「同僚が金を取りに行く」はオレオレ詐欺の王道パターンです！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: null,
    desc: "息子を名乗り「カバンを落とした。番号が変わった。同僚が金を取りに行く」と電話があった。",
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
    id: "senior_q04", category: "scam", source: "固定電話", title: "大手電力会社を装う「電気料金が安くなる」勧誘",
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
    screenshot: IMAGE_ASSETS.screenshots.electricityPlanScam,
    desc: "「電気代が安くなる」と電話があり、検針票のお客様番号や契約者情報の読み上げを要求された。",
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
    id: "senior_q05", category: "real", source: "郵便・電話", title: "【本物】取引銀行からの「定期預金満期」のご案内",
    characterName: "取引銀行の正規支店担当者",
    narration: "長年利用している地元銀行の担当者から自宅に定期預金の満期案内書類が届き、電話でも丁寧な案内がありました。\n「いつもお世話になっております。満期書類をお送りしましたのでご確認をお願いいたします。暗証番号を聞いたりカードをお預かりすることはございません。」",
    dialogue: [
      { speaker: "銀行担当者", line: "お手続きは同封の書類または店舗窓口にて承っております。" },
      { speaker: "あなた", line: "（暗証番号も聞かれず、郵送書類の確認案内だけだった。）" }
    ],
    point: "取引のある正規の銀行からの案内であり、暗証番号を聞いたりカードを預かる要求が一切ない通知は本物です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.bankMaturityReal,
    desc: "取引銀行から「定期預金の満期書類をお送りしましたのでご確認ください（カード預かり等なし）」と案内があった。",
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
    id: "senior_q06", category: "scam", source: "自宅訪問", title: "「屋根が壊れている」と突然の点検訪問",
    characterName: "突然の訪問作業員",
    narration: "自宅で過ごしていると玄関のインターホンが鳴り、作業服の男が立っていました。\n「近所で工事をしている者ですが、お宅の屋根の瓦がずれて今にも落ちそうです。危険なので今すぐ無料で見てあげます。」",
    dialogue: [
      { speaker: "作業員", line: "放置すると雨漏りで家が傷みますよ。ハシゴですぐ登って確認しますね。" },
      { speaker: "あなた", line: "（突然の訪問で屋根が危険と言われたが…無料なら見てもらうべきか…？）" }
    ],
    point: "「危険」「無料」「今すぐ」と不安を煽って屋根に登り、故意に瓦を壊して高額契約を迫る「点検商法」です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: null,
    desc: "突然の訪問者が「屋根がずれて危険。今すぐ無料で登って点検する」と迫ってきた。",
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
    id: "senior_q07", category: "scam", source: "固定電話", title: "「未納料金の支払いにプリペイドカード」要求",
    characterName: "通信サービス料金窓口",
    narration: "自宅に電話があり、「インターネットの利用料金に未納があります。本日中に支払わないとサービスを停止し法的手続きに入ります」と言われました。\n相手：「コンビニで電子マネー（プリペイドカード）を購入し、裏面の番号を電話で教えてください。」",
    dialogue: [
      { speaker: "電話の相手", line: "番号を教えていただければ、こちらで即座に未納解除の手続きを行います。" },
      { speaker: "あなた", line: "（ネットが止まったら困る…コンビニでカードを買って番号を教えればいいのか…？）" }
    ],
    point: "どのような企業であっても、未納料金の支払いにコンビニのプリペイドカード番号を要求することは100%詐欺です！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: null,
    desc: "「未納料金がある。コンビニでプリペイドカードを買って裏の番号を電話で教えろ」と言われた。",
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
    id: "senior_q08", category: "scam", source: "自宅訪問・チラシ", title: "水道局を名乗る「水質検査と浄水器交換」チラシ",
    characterName: "自称・水道局指定業者",
    narration: "ポストに「水道局関係・水質検査実施中。浄水器の交換が必要な場合があります」というチラシが入っており、直後に作業着の男が訪問してきました。\n男：「コップに水道水を入れてください。検査薬を入れると…ほら、水が黄色くなりました！有害物質が入っていますよ！」",
    dialogue: [
      { speaker: "訪問業者", line: "このままでは健康を害します。今なら特別価格20万円で高性能浄水器を取り付けます。" },
      { speaker: "あなた", line: "（薬を入れたら急に黄色くなった…本当に水道水が危険なのだろうか…？）" }
    ],
    point: "水道局が個人の住宅を突然訪れて水質検査をしたり、浄水器を販売することは絶対にありません。試薬の化学反応（塩素反応）を利用した詐欺です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: IMAGE_ASSETS.screenshots.waterPurifierScam,
    desc: "「水道水が汚れている。20万円の浄水器が必要」と契約を迫られた。",
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
    id: "senior_q09", category: "scam", source: "自宅訪問", title: "消防署を名乗る「火事の危険・消火器の強制点検」",
    characterName: "自称・防災点検員",
    narration: "消防服に似た服を着た人物が訪ねてきました。\n「消防署の方から来ました。最近この地域で住宅火災が増えており、点検したところお宅は非常に危険な状態です。法律で消火器の交換が義務化されました。」",
    dialogue: [
      { speaker: "訪問者", line: "今すぐ対策しないと火事になりますよ。今日なら特別な防災機器と消火器を35,000円で設置します。" },
      { speaker: "あなた", line: "（火事になったら近所にも迷惑がかかるし不安だな…その場で契約すべきか…？）" }
    ],
    point: "消防署が消火器の訪問販売や点検を行ったり、金銭を請求することは絶対にありません。「消防署の方（方角）」と言って騙す手口です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: null,
    desc: "「消防署の方から来た。消火器の交換が義務化されたので35,000円払え」と請求された。",
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
    id: "senior_q10", category: "real", source: "自宅訪問", title: "【本物】法令に基づく「ガス設備定期点検」の訪問",
    characterName: "ガス供給会社点検員",
    narration: "事前に検針票とともに「〇月〇日に定期点検に伺います」とチラシが入っていた日、制服を着たガス会社の点検員が訪ねてきました。\n「法令で定められた4年に1度のガス漏れ点検に伺いました。身分証はこちらです。点検費用は一切かかりません。」",
    dialogue: [
      { speaker: "点検員", line: "屋外のガスメーターと室内のコンロ・給湯器の検査を行います。お立ち会いをお願いいたします。" },
      { speaker: "あなた", line: "（事前に案内が入っていたガス点検だ。身分証も提示して費用も無料と言っている。）" }
    ],
    point: "事前にお知らせチラシが投函されており、社員証を明示し、費用の請求や機器の販売を一切行わない点検は正規の法令点検です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.gasInspectionReal,
    desc: "事前に通知があった正規のガス点検員が、身分証を提示して無料の定期点検に訪れた。",
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
    id: "senior_q11", category: "scam", source: "固定電話", title: "「年金の手続きを代行します」という電話",
    characterName: "年金手続き代行窓口",
    narration: "自宅の電話に年金機構の関係者を名乗る人物から電話がありました。\n「年金に関する重要な給付手続きが漏れております。当窓口で手続きを代行できますので、確認のため銀行口座番号と暗証番号を教えてください。」",
    dialogue: [
      { speaker: "電話の相手", line: "本日中に登録しないと、過去数年分の未払い年金が受け取れなくなりますよ。" },
      { speaker: "あなた", line: "（年金の手続きを代わりにしてくれるならありがたいが、電話で暗証番号を教えていいのか…？）" }
    ],
    point: "公的機関や日本年金機構が電話で銀行の暗証番号を聞き出すことは絶対にありません！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.pensionProcedureScam,
    desc: "「年金の手続きを代行する。確認のため銀行口座と暗証番号を教えて」と電話があった。",
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
    id: "senior_q12", category: "scam", source: "スマートフォンSMS", title: "宅配便の「お届けできませんでした」偽SMS",
    characterName: "偽宅配ショートメッセージ",
    narration: "スマホのSMSに通知が届きました。\n内容：【配送業者】お客様宛のお荷物をお届けにあがりましたが不在のため持ち帰りました。配送状況の確認および再配達指定はこちらからご確認ください。http://fake-delivery-check.jp",
    dialogue: [
      { speaker: "あなた", line: "（荷物の心当たりはないが、不在通知のリンクを押して確認した方がいいだろうか…？）" }
    ],
    point: "SMSに記載されたリンクを開くと、不正なウイルスアプリをインストールさせられたり個人情報を盗まれます。",
    notification: "📱ピコン 【不在通知】荷物持ち帰りのお知らせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.deliverySmishingScam,
    desc: "「お荷物を持ち帰りました。再配達はこちら」と不審なリンクが記載されたSMSが届いた。",
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
    id: "senior_q13", category: "scam", source: "パソコン・タブレット", title: "「ウイルスに感染！」大音量警告音とサポート詐欺",
    characterName: "偽マイクロソフト警告",
    narration: "パソコンでニュースを見ていると、突然けたたましい警告音が鳴り響き、画面一面に赤い警告が表示されました。\n画面：『警告！システムがウイルスに感染しました。個人情報が流出しています。直ちにサポート窓口（050-XXXX-XXXX）へ電話してください。』",
    dialogue: [
      { speaker: "警告画面", line: "【警告】電源を切るとパソコンが完全に破壊されます。直ちに電話してください！" },
      { speaker: "あなた", line: "（大音量の警告音と『破壊される』という文字で心臓がドキドキする…どうすれば…？）" }
    ],
    point: "大音量の警告音や全画面警告は、Webサイト上に表示されているだけの偽物（サポート詐欺）です。電話をかけてはいけません。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.supportScam,
    desc: "「ウイルス感染！PCが破壊されます」と大音量で警告画面が表示され、電話をかけるよう要求されている。",
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
    id: "senior_q14", category: "scam", source: "Eメール・SMS", title: "国税庁を騙る「未納税金の最終差し押さえ予告」",
    characterName: "国税庁納付指導窓口",
    narration: "メールに「国税庁」を名乗る重要通知が届きました。\n内容：【重要なお知らせ】未納の所得税がございます。納付期限を過ぎているため、24時間以内にご納付いただけない場合、給与や年金・不動産の差し押さえを執行いたします。支払い手続き：http://nta-tax-pay.org",
    dialogue: [
      { speaker: "あなた", line: "（税金の未納なんてないはずだが、『差し押さえ』と書かれると不安になる…）" }
    ],
    point: "国税庁や税務署がメールやSMSで納税通知を送ったり、Webサイトからクレジットカードや電子マネーで納付させることは絶対にありません。",
    notification: "📱ピコン 【国税庁】重要なお知らせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.taxSeizureScam,
    desc: "国税庁を名乗り「税金の未納がある。24時間以内に支払わないと差し押さえを実行する」とメールが届いた。",
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
    id: "senior_q15", category: "real", source: "スマートフォンSMS", title: "【本物】携帯電話会社からの「月額利用料金の確定」案内",
    characterName: "携帯会社公式",
    narration: "毎月利用している携帯電話会社からSMSが届きました。\n内容：【お知らせ】今月のご請求金額が確定いたしました。ご請求額および内訳は、公式アプリまたはMyページ（ブックマーク）よりご確認いただけます。※本メッセージから直接のパスワード入力は求めません。",
    dialogue: [
      { speaker: "あなた", line: "（毎月届く請求確定の案内だ。直接リンクを踏ませる文面もないな。）" }
    ],
    point: "本文に直接ログインURLを載せず、「公式アプリやブックマークからご確認ください」と案内する通知は正規の公式通知です。",
    notification: "📱ピコン 携帯料金確定のお知らせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.mobileBillReal,
    desc: "「月額料金が確定しました。公式アプリ等からご確認ください（直接のログイン要求なし）」との通知。",
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
    id: "senior_q16", category: "real", source: "Eメール", title: "【本物】クレジットカード会社からの「明細確定」通知",
    characterName: "カード会社公式",
    narration: "普段利用しているクレジットカード会社からメールが届きました。\n内容：【〇〇カード】今月のご利用代金明細書を作成いたしました。明細内容は公式Webサービス（会員ログイン画面）よりご確認ください。※不審なフィッシングメールにご注意ください。",
    dialogue: [
      { speaker: "あなた", line: "（普段使っているカード会社の定期明細案内だ。）" }
    ],
    point: "定期的な利用明細の確定通知であり、個人情報やカード番号の入力を急かす文面がないものは本物の正規連絡です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.cardStatementReal,
    desc: "クレジットカード会社から「今月のご利用明細が確定しました。公式サイトよりご確認ください」と届いた。",
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