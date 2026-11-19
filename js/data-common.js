/* =========================================================
   data-common.js
   共通目標アイテム・防犯3原則・スキルマップ・共通選択肢生成関数・
   大分県＆警察庁公式統計データ（若年層・闇バイト含む）
   ========================================================= */

const ITEMS = [
  { id: "snack",      group: "初級", name: "高級お菓子セット",       rubyName: "<ruby>高級<rt>こうきゅう</rt></ruby>お<ruby>菓子<rt>かし</rt></ruby>セット",                           emoji: "🍫", image: null, price: 3000 },
  { id: "stationery", group: "初級", name: "おしゃれ文房具セット",   rubyName: "おしゃれ<ruby>文房具<rt>ぶんぼうぐ</rt></ruby>セット",                                         emoji: "✏️", image: null, price: 5000 },
  { id: "book",       group: "初級", name: "話題の漫画全巻セット",   rubyName: "<ruby>話題<rt>わだい</rt></ruby>の <ruby>漫画<rt>まんが</rt></ruby><ruby>全巻<rt>ぜんかん</rt></ruby>セット", emoji: "📚", image: null, price: 8000 },

  { id: "fashion",    group: "普通", name: "流行りのブランド服",     rubyName: "<ruby>流行<rt>はや</rt></ruby>りの ブランド<ruby>服<rt>ふく</rt></ruby>",                          emoji: "👕", image: null, price: 12000 },
  { id: "club",       group: "普通", name: "部活で使う新しい道具",   rubyName: "<ruby>部活<rt>ぶかつ</rt></ruby>で <ruby>使<rt>つか</rt></ruby>う <ruby>新<rt>あたら</rt></ruby>しい <ruby>道具<rt>どうぐ</rt></ruby>", emoji: "⚽", image: null, price: 15000 },
  { id: "earphone",   group: "普通", name: "ワイヤレスイヤホン",     rubyName: "ワイヤレスイヤホン",                                                                       emoji: "🎧", image: null, price: 18000 },

  { id: "game_soft",  group: "上級", name: "新作ゲームソフト2本",    rubyName: "<ruby>新作<rt>しんさく</rt></ruby>ゲームソフト2<ruby>本<rt>ほん</rt></ruby>",                emoji: "💿", image: null, price: 24000 },
  { id: "goods",      group: "上級", name: "限定推し活グッズ",       rubyName: "<ruby>限定<rt>げんてい</rt></ruby><ruby>推<rt>お</rt></ruby>し<ruby>活<rt>かつ</rt></ruby>グッズ", emoji: "✨", image: null, price: 30000 },
  { id: "smartwatch", group: "上級", name: "スマートウォッチ",       rubyName: "スマートウォッチ",                                                                         emoji: "⌚", image: null, price: 38000 },

  { id: "switch",     group: "MAX",  name: "最新ゲーム機",           rubyName: "<ruby>最新<rt>さいしん</rt></ruby>ゲーム<ruby>機<rt>き</rt></ruby>",                         emoji: "🎮", image: null, price: 50300 }
];

const DAY_INTRO_COMMENTS = {
  "月": "新しい1週間の始まりだね！\n落ち着いて進めていこう！",
  "火": "少し慣れてきた頃かな？\n今日も内容をよく確認しよう！",
  "水": "今日でちょうど真ん中！\n焦らず進もう！",
  "木": "木曜日になったよ！\n今日も一日頑張ろう！",
  "金": "もう少しで週末！\n最後までしっかり確認しよう！",
  "土": "いよいよ終盤！\n落ち着いて考えていこう！",
  "日": "今日は最後の日！\n1週間を振り返ってみよう！"
};

const DAY_INTRO_COMMENTS_ELEMENTARY = {
  "月": "<ruby>新<rt>あたら</rt></ruby>しい 1<ruby>週間<rt>しゅうかん</rt></ruby>の <ruby>始<rt>はじ</rt></ruby>まりだね！\n<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いて <ruby>進<rt>すす</rt></ruby>めていこう！",
  "火": "<ruby>少<rt>すこ</rt></ruby>し <ruby>慣<rt>な</rt></ruby>れてきた <ruby>頃<rt>ころ</rt></ruby>かな？\n<ruby>今日<rt>きょう</rt></ruby>も <ruby>内容<rt>ないよう</rt></ruby>を よく <ruby>確認<rt>かくにん</rt></ruby>しよう！",
  "水": "<ruby>今日<rt>きょう</rt></ruby>で ちょうど <ruby>真<rt>ま</rt></ruby>ん<ruby>中<rt>なか</rt></ruby>！\n<ruby>焦<rt>あせ</rt></ruby>らず <ruby>進<rt>すす</rt></ruby>もう！",
  "木": "<ruby>木曜日<rt>もくようび</rt></ruby>に なったよ！\n<ruby>今日<rt>きょう</rt></ruby>も <ruby>一日<rt>いちにち</rt></ruby> <ruby>頑張<rt>がんば</rt></ruby>ろう！",
  "金": "もう<ruby>少<rt>すこ</rt></ruby>しで <ruby>週末<rt>しゅうまつ</rt></ruby>！\n<ruby>最後<rt>さいご</rt></ruby>まで しっかり <ruby>確認<rt>かくにん</rt></ruby>しよう！",
  "土": "いよいよ <ruby>終盤<rt>しゅうばん</rt></ruby>！\n<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いて <ruby>考<rt>かんが</rt></ruby>えていこう！",
  "日": "<ruby>今日<rt>きょう</rt></ruby>は <ruby>最後<rt>さいご</rt></ruby>の <ruby>日<rt>ひ</rt></ruby>！\n1<ruby>週間<rt>しゅうかん</rt></ruby>を ふりかえってみよう！"
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

const DAILY_ACTIONS_BY_DAY_ELEMENTARY = {
  "月": [
    { label: "📱 スマホを <ruby>見<rt>み</rt></ruby>る", cat: "smartphone" },
    { label: "📚 <ruby>宿題<rt>しゅくだい</rt></ruby>をする", cat: "family" },
    { label: "⚽ <ruby>友達<rt>ともだち</rt></ruby>と <ruby>遊<rt>あそ</rt></ruby>ぶ", cat: "go_out" }
  ],
  "水": [
    { label: "🏃 <ruby>部活<rt>ぶかつ</rt></ruby>へ <ruby>行<rt>い</rt></ruby>く", cat: "go_out" },
    { label: "🏪 コンビニへ <ruby>行<rt>い</rt></ruby>く", cat: "go_out" },
    { label: "🏠 <ruby>家<rt>いえ</rt></ruby>に <ruby>帰<rt>かえ</rt></ruby>る", cat: "family" }
  ],
  "土": [
    { label: "🛍️ お<ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>へ <ruby>行<rt>い</rt></ruby>く", cat: "go_out" },
    { label: "🎮 ゲームをする", cat: "smartphone" },
    { label: "🚗 <ruby>家族<rt>かぞく</rt></ruby>と <ruby>出<rt>で</rt></ruby>かける", cat: "family" }
  ]
};

const THREE_PRINCIPLES = [
  { head: "① 喋らない（話さない・教えない）", desc: "相手へ個人情報、パスワード、暗証番号、画面共有でコードを教えない" },
  { head: "② 払わない（渡さない・買わない）", desc: "急かされても、すぐにお金を振り込まない・電子マネーを買わない" },
  { head: "③ 騙されない（確認する・相談する）", desc: "届いた連絡先や話をそのまま信じず、自ら調べた正規窓口や家族・警察に確認する" }
];

const THREE_PRINCIPLES_ELEMENTARY = [
  { head: "① <ruby>喋<rt>しゃべ</rt></ruby>らない（<ruby>話<rt>はな</rt></ruby>さない・<ruby>教<rt>おし</rt></ruby>えない）", desc: "<ruby>相手<rt>あいて</rt></ruby>に <ruby>名前<rt>なまえ</rt></ruby>・<ruby>住所<rt>じゅうしょ</rt></ruby>・パスワード・<ruby>暗証<rt>あんしょう</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>を <ruby>教<rt>おし</rt></ruby>えない" },
  { head: "② <ruby>払<rt>はら</rt></ruby>わない（<ruby>渡<rt>わた</rt></ruby>さない・<ruby>買<rt>か</rt></ruby>わない）", desc: "<ruby>急<rt>いそ</rt></ruby>がされても、すぐにお<ruby>金<rt>かね</rt></ruby>を <ruby>振<rt>ふ</rt></ruby>り<ruby>込<rt>こ</rt></ruby>まない・プリペイドカードを <ruby>買<rt>か</rt></ruby>わない" },
  { head: "③ <ruby>騙<rt>だま</rt></ruby>されない（<ruby>確<rt>たし</rt></ruby>かめる・<ruby>相談<rt>そうだん</rt></ruby>する）", desc: "<ruby>届<rt>とど</rt></ruby>いた <ruby>連絡<rt>れんらく</rt></ruby>を そのまま <ruby>信<rt>しん</rt></ruby>じず、おうちの<ruby>人<rt>ひと</rt></ruby>や <ruby>警察<rt>けいさつ</rt></ruby>に <ruby>相談<rt>そうだん</rt></ruby>する" }
];

const THREE_PRINCIPLES_SENIOR = [
  { head: "① 話さない（個人情報を教えない）", desc: "相手へ名前・住所・口座番号・暗証番号などを電話やメールで教えない" },
  { head: "② 渡さない（お金やカードを払わない）", desc: "急かされても、すぐにお金を振り込んだり、コンビニで電子マネーを買わない" },
  { head: "③ 騙されない（自分で調べて確かめる）", desc: "相手の言う連絡先をそのまま信じず、家族や警察（#9110）へ電話して確かめる" }
];

const OITA_SCAM_STATS = {
  // ① 大分県内の特殊詐欺 被害件数・被害額推移（令和3〜7年）
  yearlyTrend: [
    { yearLabel: "令和3年", rubyYearLabel: "<ruby>令和<rt>れいわ</rt></ruby>3<ruby>年<rt>ねん</rt></ruby>", cases: 150, amountText: "約8,178万円", rubyAmountText: "<ruby>約<rt>やく</rt></ruby>8,178<ruby>万円<rt>まんえん</rt></ruby>", note: "", rubyNote: "" },
    { yearLabel: "令和4年", rubyYearLabel: "<ruby>令和<rt>れいわ</rt></ruby>4<ruby>年<rt>ねん</rt></ruby>", cases: 177, amountText: "約2億1,956万円", rubyAmountText: "<ruby>約<rt>やく</rt></ruby>2<ruby>億<rt>おく</rt></ruby>1,956<ruby>万円<rt>まんえん</rt></ruby>", note: "", rubyNote: "" },
    { yearLabel: "令和5年", rubyYearLabel: "<ruby>令和<rt>れいわ</rt></ruby>5<ruby>年<rt>ねん</rt></ruby>", cases: 260, amountText: "約3億1,090万円", rubyAmountText: "<ruby>約<rt>やく</rt></ruby>3<ruby>億<rt>おく</rt></ruby>1,090<ruby>万円<rt>まんえん</rt></ruby>", note: "", rubyNote: "" },
    { yearLabel: "令和6年", rubyYearLabel: "<ruby>令和<rt>れいわ</rt></ruby>6<ruby>年<rt>ねん</rt></ruby>", cases: 280, amountText: "約7億3,684万円", rubyAmountText: "<ruby>約<rt>やく</rt></ruby>7<ruby>億<rt>おく</rt></ruby>3,684<ruby>万円<rt>まんえん</rt></ruby>", note: "※SNS型投資・ロマンス詐欺（279件・約16億1,237万円）含む計559件・約23億4,921万円", rubyNote: "※SNS<ruby>型<rt>がた</rt></ruby>を <ruby>含<rt>ふく</rt></ruby>めると <ruby>計<rt>けい</rt></ruby>559<ruby>件<rt>けん</rt></ruby>・<ruby>約<rt>やく</rt></ruby>23<ruby>億<rt>おく</rt></ruby>4,921<ruby>万円<rt>まんえん</rt></ruby>" },
    { yearLabel: "令和7年", rubyYearLabel: "<ruby>令和<rt>れいわ</rt></ruby>7<ruby>年<rt>ねん</rt></ruby>", cases: 400, amountText: "約8億5,893万円", rubyAmountText: "<ruby>約<rt>やく</rt></ruby>8<ruby>億<rt>おく</rt></ruby>5,893<ruby>万円<rt>まんえん</rt></ruby>", note: "※SNS型投資・ロマンス詐欺（347件・約15億1,409万円）含む計747件・約23億7,302万円", rubyNote: "※SNS<ruby>型<rt>がた</rt></ruby>を <ruby>含<rt>ふく</rt></ruby>めると <ruby>計<rt>けい</rt></ruby>747<ruby>件<rt>けん</rt></ruby>・<ruby>約<rt>やく</rt></ruby>23<ruby>億<rt>おく</rt></ruby>7,302<ruby>万円<rt>まんえん</rt></ruby>" }
  ],
  // ② 大分県内の被害者年代別割合（令和8年9月末 暫定値）
  ageBreakdown: [
    { label: "20歳代未満", rubyLabel: "20<ruby>歳代未満<rt>さいだいみまん</rt></ruby>", pct: 1.8, highlight: false },
    { label: "20歳代", rubyLabel: "20<ruby>歳代<rt>さいだい</rt></ruby>", pct: 11.3, highlight: false },
    { label: "30歳代", rubyLabel: "30<ruby>歳代<rt>さいだい</rt></ruby>", pct: 9.4, highlight: false },
    { label: "40歳代", rubyLabel: "40<ruby>歳代<rt>さいだい</rt></ruby>", pct: 10.8, highlight: false },
    { label: "50歳代", rubyLabel: "50<ruby>歳代<rt>さいだい</rt></ruby>", pct: 19.4, highlight: false },
    { label: "60〜64歳", rubyLabel: "60〜64<ruby>歳<rt>さい</rt></ruby>", pct: 9.7, highlight: false },
    { label: "65歳以上", rubyLabel: "65<ruby>歳以上<rt>さいいじょう</rt></ruby>", pct: 37.6, highlight: true }
  ],
  // ③ 警察庁確定値（全国・令和7年）：ニセ警察詐欺 年代別認知件数（個人被害計11,012件）
  nisePoliceByAge: [
    { label: "10代以下", rubyLabel: "10<ruby>代以下<rt>だいいか</rt></ruby>", cases: 48, detail: "携帯着信 81.3%", rubyDetail: "<ruby>携帯<rt>けいたい</rt></ruby> 81.3%", highlight: false },
    { label: "20代", rubyLabel: "20<ruby>代<rt>だい</rt></ruby>", cases: 1718, detail: "携帯着信 94.5%", rubyDetail: "<ruby>携帯<rt>けいたい</rt></ruby> 94.5%", highlight: true },
    { label: "30代（最多）", rubyLabel: "30<ruby>代<rt>だい</rt></ruby>（<ruby>最多<rt>さいた</rt></ruby>）", cases: 2239, detail: "携帯着信 96.9%", rubyDetail: "<ruby>携帯<rt>けいたい</rt></ruby> 96.9%", highlight: true },
    { label: "40代", rubyLabel: "40<ruby>代<rt>だい</rt></ruby>", cases: 1612, detail: "携帯着信 91.8%", rubyDetail: "<ruby>携帯<rt>けいたい</rt></ruby> 91.8%", highlight: false },
    { label: "50代", rubyLabel: "50<ruby>代<rt>だい</rt></ruby>", cases: 1376, detail: "携帯着信 66.9%", rubyDetail: "<ruby>携帯<rt>けいたい</rt></ruby> 66.9%", highlight: false },
    { label: "60代", rubyLabel: "60<ruby>代<rt>だい</rt></ruby>", cases: 1545, detail: "固定電話 56.6%", rubyDetail: "<ruby>固定電話<rt>こていでんわ</rt></ruby> 56.6%", highlight: false },
    { label: "70代", rubyLabel: "70<ruby>代<rt>だい</rt></ruby>", cases: 1554, detail: "固定電話 71.8%", rubyDetail: "<ruby>固定電話<rt>こていでんわ</rt></ruby> 71.8%", highlight: false },
    { label: "80代以上", rubyLabel: "80<ruby>代以上<rt>だいいじょう</rt></ruby>", cases: 920, detail: "固定電話 79.1%", rubyDetail: "<ruby>固定電話<rt>こていでんわ</rt></ruby> 79.1%", highlight: false }
  ],
  // ④ 警察庁「令和7年の犯罪情勢」：主な資金獲得犯罪（闇バイト等）の検挙人員 年齢別割合
  darkJobArrestByAge: [
    { label: "14〜19歳（10代）", rubyLabel: "14〜19<ruby>歳<rt>さい</rt></ruby>（10<ruby>代<rt>だい</rt></ruby>）", pct: 15.7, highlight: true },
    { label: "20〜24歳（最多）", rubyLabel: "20〜24<ruby>歳<rt>さい</rt></ruby>（<ruby>最多<rt>さいた</rt></ruby>）", pct: 23.4, highlight: true },
    { label: "25〜29歳", rubyLabel: "25〜29<ruby>歳<rt>さい</rt></ruby>", pct: 18.7, highlight: true },
    { label: "30〜39歳", rubyLabel: "30〜39<ruby>歳<rt>さい</rt></ruby>", pct: 19.9, highlight: false },
    { label: "40〜49歳", rubyLabel: "40〜49<ruby>歳<rt>さい</rt></ruby>", pct: 11.7, highlight: false },
    { label: "50歳以上", rubyLabel: "50<ruby>歳以上<rt>さいいじょう</rt></ruby>", pct: 10.7, highlight: false }
  ]
};

const SKILL_MAP = {
  "elementary_q01": "メールの通知に慌てず大人の人に相談する力",
  "elementary_q02": "プレゼント当選画面の個人情報要求を見抜く力",
  "elementary_q03": "突然の点検訪問に玄関を開けず対応する力",
  "elementary_q04": "別アカウントからの友達の送金要求を確かめる力",
  "elementary_q05": "割引広告に惑わされず公式情報を確認する力",
  "elementary_q06": "ネットの知らない人からの儲け話を断る力",
  "elementary_q07": "コイン増殖の裏ワザを装うアカウント盗難を防ぐ力",
  "elementary_q08": "画面共有による認証コードの流出を防ぐ力",
  "elementary_q09": "人気配信者を名乗るアカウントからの個人情報要求を見破る力",
  "elementary_q10": "無料コードを口実にした認証情報要求を遮断する力",
  "elementary_q11": "簡単副業を謳う広告を冷静に見極める力",
  "elementary_q12": "ATMで困っているお年寄りを店員に知らせて助ける力",
  "elementary_q13": "電話で慌てる家族を落ち着かせて被害を防ぐ力",
  "elementary_q14": "いつもと違うデザインの公式広告を正しく確認する力",
  "elementary_q15": "不在通知から公式ルートで再配達を依頼する力",
  "elementary_q16": "お店からの期間限定クーポンを正しく確かめる力",

  "teen_q01": "公的機関を名乗る緊急通知の真偽を見抜く力",
  "teen_q02": "配信者を名乗るDMの個人情報要求を見破る力",
  "teen_q03": "通信会社からの正規の通信量通知を正しく確認する力",
  "teen_q04": "宅配通知から正規アプリで荷物を確認する力",
  "teen_q05": "ATMで指示を受ける高齢者を周囲と連携して守る力",
  "teen_q06": "突然の無料点検訪問を毅然と断る力",
  "teen_q07": "友達アカウントからの電子マネー要求を直接確認する力",
  "teen_q08": "口座移動を迫る電話から家族を守る力",
  "teen_q09": "公式SNSキャンペーンを正しく確認する力",
  "teen_q10": "海外発信の不審電話に個人情報を渡さない力",
  "teen_q11": "親しくなったSNSアカウントからの投資勧誘を断る力",
  "teen_q12": "限定品を謳う通販サイトの信憑性を見抜く力",
  "teen_q13": "荷物運搬などを謳うバイト募集を拒絶する力",
  "teen_q14": "SNSでのチケット個人間先払い取引を回避する力",
  "teen_q15": "著作権警告DMによるログイン情報窃取を防ぐ力",
  "teen_q16": "有名人出演のAI動画広告を見破る力",

  "adult_q01": "サブスク自動更新を騙る架空請求SMSを遮断する力",
  "adult_q02": "国税庁・電子納税還付通知の偽サイト誘導を見抜く力",
  "adult_q03": "銀行セキュリティ通知を装う偽サイト誘導を回避する力",
  "adult_q04": "警察官を騙るメッセージアプリ誘導・偽逮捕状詐欺を看破する力",
  "adult_q05": "著名人を騙るSNS投資グループ勧誘を見破る力",
  "adult_q06": "火災保険不正請求を勧誘する悪質業者を拒絶する力",
  "adult_q07": "ATMで電話指示を受ける高齢者を店員と連携して救う力",
  "adult_q08": "クレジットカード会社の正規明細通知を安全に確認する力",
  "adult_q09": "職場の同僚のPC警告画面トラブルを止める力",
  "adult_q10": "国際郵便の関税未納SMS詐欺を見抜く力",
  "adult_q11": "マイナンバー関連の電子証明書更新を騙る偽SMSを遮断する力",
  "adult_q12": "ライフライン供給停止を騙る緊急決済要求を防ぐ力",
  "adult_q13": "取引先を装う振込先変更メール詐欺を防ぐ力",
  "adult_q14": "マッチング相手からの会う前の金銭要求を見破る力",
  "adult_q15": "身に覚えのない宿泊予約の偽キャンセル通知を看破する力",
  "adult_q16": "正規のオンライン決済本人認証を正しく扱う力",

  "senior_q01": "警察官を名乗るメッセージアプリ誘導・偽の逮捕状を断る力",
  "senior_q02": "特別給付金を装う偽メールの口座情報要求を見抜く力",
  "senior_q03": "息子を名乗る急な金銭要求を元の番号に電話して確かめる力",
  "senior_q04": "大手電力会社を名乗る検針票情報の聞き出しを防ぐ力",
  "senior_q05": "銀行からの正規の満期案内を正しく確かめる力",
  "senior_q06": "屋根の突然の点検訪問を家に入れず断る力",
  "senior_q07": "未納料金を理由とする電子マネーカードの要求を断る力",
  "senior_q08": "水道局を装う水質検査・浄水器販売のチラシを見抜く力",
  "senior_q09": "消防署関係者を装い不安をあおる防災機器販売を断る力",
  "senior_q10": "ガス設備の正規の定期点検を正しく受ける力",
  "senior_q11": "年金手続き代行を名乗る口座情報の聞き出しを防ぐ力",
  "senior_q12": "宅配業者を装う不在持ち帰りの偽メールを開かない力",
  "senior_q13": "パソコンの偽ウイルス警告画面を閉じる力",
  "senior_q14": "国税庁を装う差し押さえ警告メールを見破る力",
  "senior_q15": "携帯電話会社からの正規の請求案内を確かめる力",
  "senior_q16": "クレジットカード会社の正規明細通知を確かめる力"
};

const SKILL_MAP_ELEMENTARY = {
  "elementary_q01": "メールの <ruby>通知<rt>つうち</rt></ruby>に <ruby>慌<rt>あわ</rt></ruby>てず <ruby>大人<rt>おとな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>に <ruby>相談<rt>そうだん</rt></ruby>する<ruby>力<rt>ちから</rt></ruby>",
  "elementary_q02": "プレゼント<ruby>当選<rt>とうせん</rt></ruby><ruby>画面<rt>がめん</rt></ruby>の <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>の <ruby>要求<rt>ようきゅう</rt></ruby>を <ruby>見抜<rt>みぬ</rt></ruby>く<ruby>力<rt>ちから</rt></ruby>",
  "elementary_q03": "<ruby>突然<rt>とつぜん</rt></ruby>の <ruby>点検<rt>てんけん</rt></ruby><ruby>訪問<rt>ほうもん</rt></ruby>に <ruby>玄関<rt>げんかん</rt></ruby>を <ruby>開<rt>あ</rt></ruby>けずに <ruby>対応<rt>たいおう</rt></ruby>する<ruby>力<rt>ちから</rt></ruby>",
  "elementary_q04": "<ruby>別<rt>べつ</rt></ruby>アカウントからの <ruby>友達<rt>ともだち</rt></ruby>の お<ruby>金<rt>かね</rt></ruby>の お<ruby>願<rt>ねが</rt></ruby>いを <ruby>確<rt>たし</rt></ruby>かめる<ruby>力<rt>ちから</rt></ruby>",
  "elementary_q05": "<ruby>割引<rt>わりびき</rt></ruby><ruby>広告<rt>こうこく</rt></ruby>に まどわされず <ruby>公式<rt>こうしき</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を <ruby>確認<rt>かくにん</rt></ruby>する<ruby>力<rt>ちから</rt></ruby>",
  "elementary_q06": "ネットの <ruby>知<rt>し</rt></ruby>らない<ruby>人<rt>ひと</rt></ruby>からの お<ruby>金<rt>かね</rt></ruby>もうけの <ruby>話<rt>はなし</rt></ruby>を <ruby>断<rt>ことわ</rt></ruby>る<ruby>力<rt>ちから</rt></ruby>",
  "elementary_q07": "コイン<ruby>増殖<rt>ぞうしょく</rt></ruby>の <ruby>裏<rt>うら</rt></ruby>ワザを <ruby>装<rt>よそお</rt></ruby>う アカウント<ruby>盗難<rt>とうなん</rt></ruby>を <ruby>防<rt>ふせ</rt></ruby>ぐ<ruby>力<rt>ちから</rt></ruby>",
  "elementary_q08": "<ruby>画面<rt>がめん</rt></ruby><ruby>共有<rt>きょうゆう</rt></ruby>による <ruby>認証<rt>にんしょう</rt></ruby>コードの <ruby>流出<rt>りゅうしゅつ</rt></ruby>を <ruby>防<rt>ふせ</rt></ruby>ぐ<ruby>力<rt>ちから</rt></ruby>",
  "elementary_q09": "<ruby>人気<rt>にんき</rt></ruby><ruby>配信者<rt>はいしんしゃ</rt></ruby>を <ruby>名乗<rt>なの</rt></ruby>る アカウントからの <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby><ruby>要求<rt>ようきゅう</rt></ruby>を <ruby>見破<rt>みやぶ</rt></ruby>る<ruby>力<rt>ちから</rt></ruby>",
  "elementary_q10": "<ruby>無料<rt>むりょう</rt></ruby>コードを <ruby>口実<rt>こうじつ</rt></ruby>にした <ruby>認証<rt>にんしょう</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>の <ruby>要求<rt>ようきゅう</rt></ruby>を <ruby>遮断<rt>しゃだん</rt></ruby>する<ruby>力<rt>ちから</rt></ruby>",
  "elementary_q11": "かんたん<ruby>副業<rt>ふくぎょう</rt></ruby>を うたう <ruby>広告<rt>こうこく</rt></ruby>を <ruby>冷静<rt>れいせい</rt></ruby>に <ruby>見極<rt>みきわ</rt></ruby>める<ruby>力<rt>ちから</rt></ruby>",
  "elementary_q12": "ATMで <ruby>困<rt>こま</rt></ruby>っている お<ruby>年寄<rt>としよ</rt></ruby>りを <ruby>店員<rt>てんいん</rt></ruby>に <ruby>知<rt>し</rt></ruby>らせて <ruby>助<rt>たす</rt></ruby>ける<ruby>力<rt>ちから</rt></ruby>",
  "elementary_q13": "<ruby>電話<rt>でんわ</rt></ruby>で <ruby>慌<rt>あわ</rt></ruby>てる <ruby>家族<rt>かぞく</rt></ruby>を <ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>かせて <ruby>被害<rt>ひがい</rt></ruby>を <ruby>防<rt>ふせ</rt></ruby>ぐ<ruby>力<rt>ちから</rt></ruby>",
  "elementary_q14": "いつもと <ruby>違<rt>ちが</rt></ruby>う デザインの <ruby>公式<rt>こうしき</rt></ruby><ruby>広告<rt>こうこく</rt></ruby>を <ruby>正<rt>ただ</rt></ruby>しく <ruby>確認<rt>かくにん</rt></ruby>する<ruby>力<rt>ちから</rt></ruby>",
  "elementary_q15": "<ruby>不在<rt>ふざい</rt></ruby><ruby>通知<rt>つうち</rt></ruby>から <ruby>公式<rt>こうしき</rt></ruby>ルートで <ruby>再配達<rt>さいはいたつ</rt></ruby>を <ruby>頼<rt>たの</rt></ruby>む<ruby>力<rt>ちから</rt></ruby>",
  "elementary_q16": "お<ruby>店<rt>みせ</rt></ruby>からの <ruby>期間<rt>きかん</rt></ruby><ruby>限定<rt>げんてい</rt></ruby>クーポンを <ruby>正<rt>ただ</rt></ruby>しく <ruby>確<rt>たし</rt></ruby>かめる<ruby>力<rt>ちから</rt></ruby>"
};

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
    { text: "本物か確かめずに、とりあえず言われた通りの手続きを進める", money: -25000, principleTag: "pay", damageType: "money", explain: "危険です！多額の金銭を騙し取られてしまいます。" }
  ];

  let fIdx = 0;
  while (wrongChoicesPicked.length < 3) {
    wrongChoicesPicked.push({ ...fallbackWrongs[fIdx % fallbackWrongs.length], type: "wrong" });
    fIdx++;
  }

  return shuffleArray([correctChoice, ...wrongChoicesPicked.slice(0, 3)]);
}