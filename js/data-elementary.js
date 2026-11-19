/* =========================================================
   data-elementary.js
   小学生モード専用問題プール（全16問）
   【全漢字総ルビ・誤記修正・一般名称統一版】
   ========================================================= */

const QUESTIONS_ELEMENTARY = [
  // ── 詐欺（11問） ──
  {
    id: "elementary_q01", category: "scam", source: "メール", title: "【<ruby>重要<rt>じゅうよう</rt></ruby>】サイバー<ruby>犯罪<rt>はんざい</rt></ruby><ruby>対策<rt>たいさく</rt></ruby>センターからのおしらせ",
    characterName: "サイバー<ruby>捜査課<rt>そうさか</rt></ruby>",
    narration: "スマホに 1<ruby>通<rt>つう</rt></ruby>の メールが <ruby>届<rt>とど</rt></ruby>きました。\n<ruby>画面<rt>がめん</rt></ruby>の メールを <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "<ruby>連絡<rt>れんらく</rt></ruby><ruby>通知<rt>つうち</rt></ruby>", line: "【<ruby>警告<rt>けいこく</rt></ruby>】24<ruby>時間<rt>じかん</rt></ruby><ruby>以内<rt>いない</rt></ruby>に <ruby>下<rt>した</rt></ruby>のリンクより <ruby>本人<rt>ほんにん</rt></ruby><ruby>確認<rt>かくにん</rt></ruby>を <ruby>完了<rt>かんりょう</rt></ruby>してください。" },
      { speaker: "主人公", line: "「<ruby>逮捕<rt>たいほ</rt></ruby>って <ruby>書<rt>か</rt></ruby>いてある…！ どうしよう…！」" }
    ],
    point: "<ruby>警察<rt>けいさつ</rt></ruby>が メールで パスワードを <ruby>入<rt>い</rt></ruby>れさせたり、『<ruby>逮捕<rt>たいほ</rt></ruby>する』とおどすことは ぜったいに ありません！",
    notification: "📱ピコン <ruby>新着<rt>しんちゃく</rt></ruby>メールが <ruby>届<rt>とど</rt></ruby>きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryPoliceMailScam,
    desc: "スマホに メールが <ruby>届<rt>とど</rt></ruby>いた。<ruby>画像<rt>がぞう</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "メールのリンクは <ruby>押<rt>お</rt></ruby>さず、すぐ おうちの<ruby>人<rt>ひと</rt></ruby>に <ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>せて <ruby>相談<rt>そうだん</rt></ruby>する", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>騙<rt>だま</rt></ruby>されない・<ruby>相談<rt>そうだん</rt></ruby>する】リンクを <ruby>開<rt>ひら</rt></ruby>かずに <ruby>大人<rt>おとな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>に <ruby>相談<rt>そうだん</rt></ruby>できたね！" }
    ],
    wrongChoices: [
      { text: "<ruby>逮捕<rt>たいほ</rt></ruby>されたら <ruby>困<rt>こま</rt></ruby>るから、リンクを <ruby>開<rt>ひら</rt></ruby>いて パスワードと <ruby>名前<rt>なまえ</rt></ruby>を <ruby>入力<rt>にゅうりょく</rt></ruby>する", money: -25000, principleTag: "speak", damageType: "account", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】パスワードを <ruby>悪<rt>わる</rt></ruby>ものに <ruby>教<rt>おし</rt></ruby>えてしまい、アカウントを <ruby>奪<rt>うば</rt></ruby>われて 25,000<ruby>円<rt>えん</rt></ruby>の <ruby>被害<rt>ひがい</rt></ruby>が でたよ！" },
      { text: "「<ruby>逮捕<rt>たいほ</rt></ruby>を <ruby>取<rt>と</rt></ruby>り<ruby>消<rt>け</rt></ruby>すには <ruby>調査<rt>ちょうさ</rt></ruby><ruby>費用<rt>ひよう</rt></ruby>が <ruby>必要<rt>ひつよう</rt></ruby>」と <ruby>書<rt>か</rt></ruby>いてあるので お<ruby>金<rt>かね</rt></ruby>を <ruby>振<rt>ふ</rt></ruby>り<ruby>込<rt>こ</rt></ruby>む", money: -30000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】おどされて お<ruby>金<rt>かね</rt></ruby>を <ruby>払<rt>はら</rt></ruby>ってしまい、<ruby>大切<rt>たいせつ</rt></ruby>な 30,000<ruby>円<rt>えん</rt></ruby>を <ruby>奪<rt>うば</rt></ruby>われたよ！" },
      { text: "メールに <ruby>書<rt>か</rt></ruby>いてある <ruby>電話番号<rt>でんわばんごう</rt></ruby>に でんわをかけて「<ruby>本当<rt>ほんとう</rt></ruby>につかまるの？」と <ruby>聞<rt>き</rt></ruby>く", money: -15000, principleTag: "fooled", damageType: "money", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】さぎグループの でんわに つながり、おどされて 15,000<ruby>円<rt>えん</rt></ruby> <ruby>取<rt>と</rt></ruby>られてしまったよ！" }
    ]
  },
  {
    id: "elementary_q02", category: "scam", source: "SNSのDM", title: "【<ruby>当選<rt>とうせん</rt></ruby><ruby>通知<rt>つうち</rt></ruby>】ゲーム<ruby>機<rt>き</rt></ruby>プレゼント<ruby>企画<rt>きかく</rt></ruby>",
    characterName: "プレゼント<ruby>企画<rt>きかく</rt></ruby>",
    narration: "SNSの ダイレクトメッセージに、メッセージが <ruby>届<rt>とど</rt></ruby>きました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "アカウント", line: "おめでとうございます！ <ruby>発送<rt>はっそう</rt></ruby><ruby>手続<rt>てつづ</rt></ruby>きのため、フォームに <ruby>入力<rt>にゅうりょく</rt></ruby>してください。" },
      { speaker: "主人公", line: "「<ruby>最新<rt>さいしん</rt></ruby>ゲーム<ruby>機<rt>き</rt></ruby>が あたったの！？ はやくほしいな！」" }
    ],
    point: "『タダであげるけど お<ruby>金<rt>かね</rt></ruby>や <ruby>暗証<rt>あんしょう</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>を <ruby>教<rt>おし</rt></ruby>えて』は、<ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>や お<ruby>小遣<rt>こづか</rt></ruby>いを だまし<ruby>取<rt>と</rt></ruby>る <ruby>手口<rt>てぐち</rt></ruby>です！",
    notification: "📱ピコン <ruby>当選<rt>とうせん</rt></ruby>メッセージ！",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryGamePrizeScam,
    desc: "SNSで メッセージが <ruby>届<rt>とど</rt></ruby>いた。<ruby>画像<rt>がぞう</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "あやしいリンクは <ruby>開<rt>ひら</rt></ruby>かず、おうちの<ruby>人<rt>ひと</rt></ruby>に「これ<ruby>本当<rt>ほんとう</rt></ruby>かな？」と <ruby>見<rt>み</rt></ruby>せて <ruby>確認<rt>かくにん</rt></ruby>する", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>騙<rt>だま</rt></ruby>されない・<ruby>相談<rt>そうだん</rt></ruby>する】タダをエサに だまし<ruby>取<rt>と</rt></ruby>る さぎだよ！ しっかり<ruby>相談<rt>そうだん</rt></ruby>できたね！" }
    ],
    wrongChoices: [
      { text: "プレゼントを <ruby>送<rt>おく</rt></ruby>ってもらうため、じぶんの<ruby>名前<rt>なまえ</rt></ruby>・<ruby>住所<rt>じゅうしょ</rt></ruby>・<ruby>小学校名<rt>しょうがっこうめい</rt></ruby>を くわしく <ruby>返信<rt>へんしん</rt></ruby>する", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】<ruby>大切<rt>たいせつ</rt></ruby>な <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を <ruby>教<rt>おし</rt></ruby>えてしまい、<ruby>悪<rt>わる</rt></ruby>いグループに <ruby>使<rt>つか</rt></ruby>われてしまったよ！" },
      { text: "「<ruby>送料<rt>そうりょう</rt></ruby>500<ruby>円<rt>えん</rt></ruby>が <ruby>必要<rt>ひつよう</rt></ruby>」と <ruby>言<rt>い</rt></ruby>われ、コンビニで プリペイドカードを <ruby>買<rt>か</rt></ruby>って <ruby>番号<rt>ばんごう</rt></ruby>を <ruby>送<rt>おく</rt></ruby>る", money: -25000, principleTag: "pay", damageType: "personal_info", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】お<ruby>金<rt>かね</rt></ruby>を だまし<ruby>取<rt>と</rt></ruby>られ、ゲーム<ruby>機<rt>き</rt></ruby>も とどかなかったよ！" },
      { text: "<ruby>相手<rt>あいて</rt></ruby>のアカウントにDMで「<ruby>本当<rt>ほんとう</rt></ruby>にゲーム<ruby>機<rt>き</rt></ruby>は とどきますか？」と <ruby>確認<rt>かくにん</rt></ruby>メッセージを <ruby>送<rt>おく</rt></ruby>る", money: -12000, principleTag: "fooled", damageType: "personal_info", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】「<ruby>本物<rt>ほんもの</rt></ruby>ですよ」と あんしんさせられ、うそを <ruby>信<rt>しん</rt></ruby>じてしまったよ！" }
    ]
  },
  {
    id: "elementary_q03", category: "scam", source: "おうちの<ruby>玄関<rt>げんかん</rt></ruby>", title: "<ruby>近隣<rt>きんりん</rt></ruby><ruby>工事<rt>こうじ</rt></ruby>の ごあいさつ",
    characterName: "<ruby>訪問<rt>ほうもん</rt></ruby><ruby>作業員<rt>さぎょういん</rt></ruby>",
    narration: "おうちで おるす<ruby>番<rt>ばん</rt></ruby>をしていると、インターホンが <ruby>鳴<rt>な</rt></ruby>り、<ruby>作業着<rt>さぎょうぎ</rt></ruby>のおじさんが <ruby>立<rt>た</rt></ruby>っていました。",
    dialogue: [
      { speaker: "<ruby>作業員<rt>さぎょういん</rt></ruby>", line: "「<ruby>近所<rt>きんじょ</rt></ruby>で <ruby>工事<rt>こうじ</rt></ruby>をしている者ですが、お<ruby>宅<rt>たく</rt></ruby>の<ruby>屋根<rt>やね</rt></ruby>の<ruby>瓦<rt>かわら</rt></ruby>が ずれてますよ。<ruby>無料<rt>むりょう</rt></ruby>で <ruby>見<rt>み</rt></ruby>てあげます。」" },
      { speaker: "主人公", line: "「お<ruby>父<rt>とう</rt></ruby>さんも お<ruby>母<rt>かあ</rt></ruby>さんも いないけど…どうしよう？」" }
    ],
    point: "<ruby>突然<rt>とつぜん</rt></ruby>やってきて「<ruby>今<rt>いま</rt></ruby>すぐ<ruby>無料<rt>むりょう</rt></ruby>で<ruby>見<rt>み</rt></ruby>ます」という <ruby>訪問者<rt>ほうもんしゃ</rt></ruby>は、わざと<ruby>壊<rt>こわ</rt></ruby>して <ruby>高額<rt>こうがく</rt></ruby>なお<ruby>金<rt>かね</rt></ruby>を <ruby>請求<rt>せいきゅう</rt></ruby>する <ruby>危険<rt>きけん</rt></ruby>が あります！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.workerLabor,
    screenshot: null,
    desc: "「<ruby>屋根<rt>やね</rt></ruby>の<ruby>瓦<rt>かわら</rt></ruby>が ずれている。<ruby>無料<rt>むりょう</rt></ruby>で <ruby>点検<rt>てんけん</rt></ruby>する」と <ruby>言<rt>い</rt></ruby>われた。あなたなら どうする？",
    correctChoices: [
      { text: "<ruby>玄関<rt>げんかん</rt></ruby>のドアは <ruby>開<rt>あ</rt></ruby>けず、インターホンにも「<ruby>応答<rt>おうとう</rt></ruby>しない（<ruby>出<rt>で</rt></ruby>ない）」でおく", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>喋<rt>しゃべ</rt></ruby>らない・<ruby>家<rt>いえ</rt></ruby>に<ruby>入<rt>い</rt></ruby>れない】<ruby>留守番<rt>るすばん</rt></ruby><ruby>中<rt>ちゅう</rt></ruby>に <ruby>返事<rt>へんじ</rt></ruby>をすると「<ruby>子<rt>こ</rt></ruby>どもだけで <ruby>大人<rt>おとな</rt></ruby>がいない」と <ruby>知<rt>し</rt></ruby>られる <ruby>危険<rt>きけん</rt></ruby>があるため、<ruby>出<rt>で</rt></ruby>ないのが いちばん <ruby>安全<rt>あんぜん</rt></ruby>だよ！" }
    ],
    wrongChoices: [
      { text: "「いま おうちの<ruby>人<rt>ひと</rt></ruby>が いなくて、じぶん ひとりです」と <ruby>正直<rt>しょうじき</rt></ruby>に <ruby>状況<rt>じょうきょう</rt></ruby>を <ruby>話<rt>はな</rt></ruby>す", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】ひとりで るすばんしていることを <ruby>教<rt>おし</rt></ruby>えてしまい、むりやり <ruby>敷地<rt>しきち</rt></ruby>に <ruby>入<rt>はい</rt></ruby>りこまれたよ！" },
      { text: "「<ruby>点検<rt>てんけん</rt></ruby>は タダだけど <ruby>出張費<rt>しゅっちょうひ</rt></ruby>3,000<ruby>円<rt>えん</rt></ruby>が <ruby>必要<rt>ひつよう</rt></ruby>」と <ruby>言<rt>い</rt></ruby>われ、お<ruby>小遣<rt>こづか</rt></ruby>いから <ruby>支払<rt>しはら</rt></ruby>う", money: -12000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】お<ruby>金<rt>かね</rt></ruby>を <ruby>払<rt>はら</rt></ruby>ってしまい、さらに <ruby>高<rt>たか</rt></ruby>いお<ruby>金<rt>かね</rt></ruby>を せいきゅうされたよ！" },
      { text: "<ruby>親切<rt>しんせつ</rt></ruby>な<ruby>人<rt>ひと</rt></ruby>だと <ruby>思<rt>おも</rt></ruby>い、<ruby>玄関<rt>げんかん</rt></ruby>のドアを <ruby>開<rt>あ</rt></ruby>けて <ruby>業者<rt>ぎょうしゃ</rt></ruby>を お<ruby>庭<rt>にわ</rt></ruby>や <ruby>屋根<rt>やね</rt></ruby>へ <ruby>案内<rt>あんない</rt></ruby>する", money: -25000, principleTag: "fooled", damageType: "money", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】わざと<ruby>屋根<rt>やね</rt></ruby>を こわされ、<ruby>高<rt>たか</rt></ruby>い<ruby>修理代<rt>しゅうりだい</rt></ruby>を せいきゅうされたよ！" }
    ]
  },
  {
    id: "elementary_q04", category: "scam", source: "SNSのDM", title: "【メッセージ】<ruby>友達<rt>ともだち</rt></ruby>の<ruby>健太<rt>けんた</rt></ruby>",
    characterName: "<ruby>健太<rt>けんた</rt></ruby>（<ruby>別<rt>べつ</rt></ruby>アカウント）",
    narration: "SNSを <ruby>見<rt>み</rt></ruby>ていると、<ruby>友達<rt>ともだち</rt></ruby>の「<ruby>健太<rt>けんた</rt></ruby>」の <ruby>写真<rt>しゃしん</rt></ruby>の アカウントから メッセージが きました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "<ruby>健太<rt>けんた</rt></ruby>？", line: "「<ruby>今<rt>いま</rt></ruby>ちょっと <ruby>困<rt>こま</rt></ruby>ってて <ruby>親<rt>おや</rt></ruby>に <ruby>言<rt>い</rt></ruby>えないの。スマホ<ruby>決済<rt>けっさい</rt></ruby>で 3,000<ruby>円<rt>えん</rt></ruby> <ruby>送<rt>おく</rt></ruby>って！ <ruby>明日<rt>あした</rt></ruby> <ruby>返<rt>かえ</rt></ruby>すから！」" },
      { speaker: "主人公", line: "「<ruby>健太<rt>けんた</rt></ruby>からだ。<ruby>急<rt>いそ</rt></ruby>いでるみたいだな…」" }
    ],
    point: "<ruby>友達<rt>ともだち</rt></ruby>の <ruby>名前<rt>なまえ</rt></ruby>や <ruby>写真<rt>しゃしん</rt></ruby>を <ruby>使<rt>つか</rt></ruby>っていても、<ruby>別<rt>べつ</rt></ruby>アカウントから <ruby>突然<rt>とつぜん</rt></ruby>お<ruby>金<rt>かね</rt></ruby>を <ruby>頼<rt>たの</rt></ruby>まれたら、<ruby>乗<rt>の</rt></ruby>っ<ruby>取<rt>と</rt></ruby>りや <ruby>偽<rt>にせ</rt></ruby>アカウントを <ruby>疑<rt>うたが</rt></ruby>いましょう！",
    notification: "📱ピコン <ruby>健太<rt>けんた</rt></ruby>からのメッセージ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryFriendImpersonationScam,
    desc: "「3,000<ruby>円<rt>えん</rt></ruby> <ruby>送<rt>おく</rt></ruby>ってほしい」と メッセージが <ruby>届<rt>とど</rt></ruby>いた。<ruby>画像<rt>がぞう</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "お<ruby>金<rt>かね</rt></ruby>は <ruby>送<rt>おく</rt></ruby>らず、いつもの でんわや がっこうで じかに<ruby>会<rt>あ</rt></ruby>って「さっきメッセージ<ruby>送<rt>おく</rt></ruby>った？」と <ruby>本人<rt>ほんにん</rt></ruby>に <ruby>確認<rt>かくにん</rt></ruby>する", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>騙<rt>だま</rt></ruby>されない・<ruby>別<rt>べつ</rt></ruby>ルート<ruby>確認<rt>かくにん</rt></ruby>】にせアカウントの さぎだよ！ べつの<ruby>方法<rt>ほうほう</rt></ruby>で <ruby>本人<rt>ほんにん</rt></ruby>に かくにんできて せいかい！" }
    ],
    wrongChoices: [
      { text: "「お<ruby>金<rt>かね</rt></ruby>は ないけど、じぶんのアカウントのパスワードなら あげる」と <ruby>教<rt>おし</rt></ruby>える", money: -20000, principleTag: "speak", damageType: "account", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】じぶんのアカウントまで うばわれて、<ruby>勝手<rt>かって</rt></ruby>に <ruby>友達<rt>ともだち</rt></ruby>へ さぎメッセージを <ruby>送<rt>おく</rt></ruby>られたよ！" },
      { text: "<ruby>友達<rt>ともだち</rt></ruby>が <ruby>困<rt>こま</rt></ruby>っているからと、<ruby>言<rt>い</rt></ruby>われた<ruby>通<rt>とお</rt></ruby>り お<ruby>小遣<rt>こづか</rt></ruby>いから 3,000<ruby>円<rt>えん</rt></ruby>を <ruby>送金<rt>そうきん</rt></ruby>する", money: -15000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】にせアカウントのさぎで、「もっと<ruby>送<rt>おく</rt></ruby>って」と せいきゅうされ お<ruby>金<rt>かね</rt></ruby>を <ruby>失<rt>うしな</rt></ruby>ったよ！" },
      { text: "メッセージで「<ruby>本当<rt>ほんとう</rt></ruby>に<ruby>健太<rt>けんた</rt></ruby>？ なん<ruby>組<rt>くみ</rt></ruby>の だれ<ruby>先生<rt>せんせい</rt></ruby>？」と <ruby>質問<rt>しつもん</rt></ruby>して やり<ruby>取<rt>と</rt></ruby>りを <ruby>続<rt>つづ</rt></ruby>ける", money: -10000, principleTag: "fooled", damageType: "line_takeover", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】ことばたくみに ごまかされて <ruby>信<rt>しん</rt></ruby>じこまされ、お<ruby>金<rt>かね</rt></ruby>を <ruby>取<rt>と</rt></ruby>られてしまったよ！" }
    ]
  },
  {
    id: "elementary_q05", category: "scam", source: "ネット<ruby>広告<rt>こうこく</rt></ruby>", title: "【タイムセール】<ruby>人気<rt>にんき</rt></ruby>イヤホン<ruby>特別<rt>とくべつ</rt></ruby><ruby>割引<rt>わりびき</rt></ruby>",
    characterName: "<ruby>限定<rt>げんてい</rt></ruby>セール<ruby>広告<rt>こうこく</rt></ruby>",
    narration: "SNSを <ruby>見<rt>み</rt></ruby>ていると、タイムセールの <ruby>広告<rt>こうこく</rt></ruby>が <ruby>出<rt>で</rt></ruby>てきました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "<ruby>広告<rt>こうこく</rt></ruby>ページ", line: "【<ruby>夏休<rt>なつやす</rt></ruby>み<ruby>限定<rt>げんてい</rt></ruby>】ワイヤレスイヤホンが <ruby>本日<rt>ほんじつ</rt></ruby><ruby>限<rt>かぎ</rt></ruby>りの <ruby>特別<rt>とくべつ</rt></ruby><ruby>価格<rt>かかく</rt></ruby>！" },
      { speaker: "主人公", line: "「<ruby>欲<rt>ほ</rt></ruby>しかったイヤホンだ！ <ruby>安<rt>やす</rt></ruby>くなってる！」" }
    ],
    point: "<ruby>広告<rt>こうこく</rt></ruby>の <ruby>見<rt>み</rt></ruby>た<ruby>目<rt>め</rt></ruby>だけで <ruby>信<rt>しん</rt></ruby>じず、<ruby>商品<rt>しょうひん</rt></ruby>の <ruby>公式<rt>こうしき</rt></ruby>サイトを じぶんで <ruby>検索<rt>けんさく</rt></ruby>して <ruby>同<rt>おな</rt></ruby>じセールが <ruby>行<rt>おこな</rt></ruby>われているか <ruby>確認<rt>かくにん</rt></ruby>しましょう！",
    notification: "📱ピコン セールのお<ruby>知<rt>し</rt></ruby>らせ",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryDiscountAdScam,
    desc: "SNSに <ruby>激安<rt>げきやす</rt></ruby>セールの <ruby>広告<rt>こうこく</rt></ruby>が <ruby>出<rt>で</rt></ruby>てきた。<ruby>画像<rt>がぞう</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "<ruby>広告<rt>こうこく</rt></ruby>からは <ruby>買<rt>か</rt></ruby>わずに、じぶんで メーカーの<ruby>公式<rt>こうしき</rt></ruby>サイトを <ruby>検索<rt>けんさく</rt></ruby>して おなじセールが あるか たしかめる", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>騙<rt>だま</rt></ruby>されない・<ruby>公式<rt>こうしき</rt></ruby><ruby>確認<rt>かくにん</rt></ruby>】にせのショッピングサイトだったよ！ <ruby>公式<rt>こうしき</rt></ruby>サイトで かくにんできて だいせいかい！" }
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
      { speaker: "<ruby>相手<rt>あいて</rt></ruby>", line: "「<ruby>毎日<rt>まいにち</rt></ruby>お<ruby>金<rt>かね</rt></ruby>が <ruby>増<rt>ふ</rt></ruby>える <ruby>特別<rt>とくべつ</rt></ruby>なサイトを <ruby>教<rt>おし</rt></ruby>えてあげる。ここにお<ruby>金<rt>かね</rt></ruby>を <ruby>預<rt>あず</rt></ruby>けてみて！」" },
      { speaker: "主人公", line: "「お<ruby>金<rt>かね</rt></ruby>が <ruby>増<rt>ふ</rt></ruby>えるのかな…？」" }
    ],
    point: "「<ruby>絶対<rt>ぜったい</rt></ruby>にお<ruby>金<rt>かね</rt></ruby>が <ruby>増<rt>ふ</rt></ruby>える」「お<ruby>金<rt>かね</rt></ruby>を <ruby>預<rt>あず</rt></ruby>けて」と <ruby>言<rt>い</rt></ruby>ってくる <ruby>相手<rt>あいて</rt></ruby>は <ruby>詐欺<rt>さぎ</rt></ruby>グループです！ すぐ やり<ruby>取<rt>と</rt></ruby>りを やめましょう！",
    notification: "📱ピコン メッセージが <ruby>届<rt>とど</rt></ruby>きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryMoneyInviteScam,
    desc: "「お<ruby>金<rt>かね</rt></ruby>がふえる」と メッセージが きた。<ruby>画像<rt>がぞう</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "「ぜったいに お<ruby>金<rt>かね</rt></ruby>が ふえる お<ruby>話<rt>はなし</rt></ruby>なんて ない」と <ruby>見抜<rt>みぬ</rt></ruby>いて、お<ruby>金<rt>かね</rt></ruby>は <ruby>送<rt>おく</rt></ruby>らず <ruby>相手<rt>あいて</rt></ruby>を ブロックする", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>騙<rt>だま</rt></ruby>されない・<ruby>遮断<rt>しゃだん</rt></ruby>する】さぎの てぐちだよ！ うまいことばに のらず ブロックできて だいせいかい！" }
    ],
    wrongChoices: [
      { text: "「<ruby>登録<rt>とうろく</rt></ruby>のため」と <ruby>言<rt>い</rt></ruby>われて、じぶんの<ruby>生年月日<rt>せいねんがっぴ</rt></ruby>や <ruby>住所<rt>じゅうしょ</rt></ruby>を <ruby>相手<rt>あいて</rt></ruby>に <ruby>教<rt>おし</rt></ruby>える", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】<ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を <ruby>悪用<rt>あくよう</rt></ruby>され、トラブルに まきこまれてしまったよ！" },
      { text: "お<ruby>小遣<rt>こづか</rt></ruby>いを ふやしたいので、お<ruby>年玉<rt>としだま</rt></ruby>の <ruby>貯金<rt>ちょきん</rt></ruby>から 1<ruby>万<rt>まん</rt></ruby><ruby>円<rt>えん</rt></ruby>を <ruby>指定<rt>してい</rt></ruby>された <ruby>口座<rt>こうざ</rt></ruby>へ <ruby>振<rt>ふ</rt></ruby>り<ruby>込<rt>こ</rt></ruby>む", money: -25000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】<ruby>振<rt>ふ</rt></ruby>りこんだ お<ruby>金<rt>かね</rt></ruby>は もどらず、さらに「<ruby>手数料<rt>てすうりょう</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>」と だまし<ruby>取<rt>と</rt></ruby>られたよ！" },
      { text: "「<ruby>本当<rt>ほんとう</rt></ruby>にお<ruby>金<rt>かね</rt></ruby>が ふえた <ruby>証拠<rt>しょうこ</rt></ruby>の<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>せて」と <ruby>相手<rt>あいて</rt></ruby>に たのんで お<ruby>話<rt>はなし</rt></ruby>を <ruby>聞<rt>き</rt></ruby>く", money: -12000, principleTag: "fooled", damageType: "money", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】にせの<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>せられて <ruby>信<rt>しん</rt></ruby>じこんでしまい、お<ruby>金<rt>かね</rt></ruby>を はらってしまったよ！" }
    ]
  },
  {
    id: "elementary_q07", category: "scam", source: "ネット<ruby>動画<rt>どうが</rt></ruby>", title: "【<ruby>裏技<rt>うらわざ</rt></ruby>】ガチャコイン<ruby>無料<rt>むりょう</rt></ruby>プレゼント！",
    characterName: "<ruby>裏技<rt>うらわざ</rt></ruby><ruby>動画<rt>どうが</rt></ruby>",
    narration: "ネットで ゲームの <ruby>動画<rt>どうが</rt></ruby>を <ruby>見<rt>み</rt></ruby>ていると、<ruby>気<rt>き</rt></ruby>になる <ruby>案内<rt>あんない</rt></ruby>が ありました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "<ruby>裏<rt>うら</rt></ruby>ワザサイト", line: "コインを <ruby>受<rt>う</rt></ruby>け<ruby>取<rt>と</rt></ruby>るために、ゲームの「ID」と「パスワード」を <ruby>入力<rt>にゅうりょく</rt></ruby>してください。" },
      { speaker: "主人公", line: "「コインが もらえるの！？ <ruby>入力<rt>にゅうりょく</rt></ruby>してみようかな…」" }
    ],
    point: "「<ruby>無料<rt>むりょう</rt></ruby>」「<ruby>裏<rt>うら</rt></ruby>ワザ」と <ruby>嘘<rt>うそ</rt></ruby>をついて、ゲームの アカウント<ruby>情報<rt>じょうほう</rt></ruby>を <ruby>盗<rt>ぬす</rt></ruby>み<ruby>取<rt>と</rt></ruby>る にせサイトです！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryGameCoinScam,
    desc: "「コインを <ruby>受<rt>う</rt></ruby>け<ruby>取<rt>と</rt></ruby>るための<ruby>手続<rt>てつづ</rt></ruby>き」と かいてある。<ruby>画像<rt>がぞう</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "ゲームのパスワードを たにんに <ruby>教<rt>おし</rt></ruby>えるのは ぜったいに <ruby>危険<rt>きけん</rt></ruby>なので、<ruby>入力<rt>にゅうりょく</rt></ruby>せずに <ruby>動画<rt>どうが</rt></ruby>を とじる", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>喋<rt>しゃべ</rt></ruby>らない・<ruby>入力<rt>にゅうりょく</rt></ruby>しない】アカウント<ruby>乗<rt>の</rt></ruby>っ<ruby>取<rt>と</rt></ruby>りの わなだよ！ パスワードを まもれて あんしんだね！" }
    ],
    wrongChoices: [
      { text: "ガチャを たくさん ひきたいので、じぶんのゲームIDと パスワードを <ruby>入力<rt>にゅうりょく</rt></ruby>する", money: -25000, principleTag: "speak", damageType: "account", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】アカウントを うばわれて アイテムを <ruby>勝手<rt>かって</rt></ruby>に うられ、25,000<ruby>円<rt>えん</rt></ruby>の <ruby>損害<rt>そんがい</rt></ruby>が でたよ！" },
      { text: "「システム<ruby>利用料<rt>りようりょう</rt></ruby>500<ruby>円<rt>えん</rt></ruby>」と <ruby>書<rt>か</rt></ruby>いてあったので、お<ruby>小遣<rt>こづか</rt></ruby>いから カードを<ruby>買<rt>か</rt></ruby>って はらう", money: -15000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】お<ruby>金<rt>かね</rt></ruby>を はらっても コインは ふえず、お<ruby>金<rt>かね</rt></ruby>を だまし<ruby>取<rt>と</rt></ruby>られたよ！" },
      { text: "<ruby>動画<rt>どうが</rt></ruby>の コメント<ruby>欄<rt>らん</rt></ruby>で「<ruby>本当<rt>ほんとう</rt></ruby>に ふえますか？」と <ruby>質問<rt>しつもん</rt></ruby>し、とうこうしゃの <ruby>指示<rt>しじ</rt></ruby>に したがう", money: -12000, principleTag: "fooled", damageType: "account", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】「ぜんいん もらえます」という ウソを <ruby>信<rt>しん</rt></ruby>じてしまい、データを うばわれたよ！" }
    ]
  },
  {
    id: "elementary_q08", category: "scam", source: "<ruby>通話<rt>つうわ</rt></ruby>アプリ", title: "【<ruby>通話<rt>つうわ</rt></ruby>】ゲームの<ruby>攻略<rt>こうりゃく</rt></ruby>について",
    characterName: "ネットの<ruby>友達<rt>ともだち</rt></ruby>",
    narration: "オンラインゲームで <ruby>知<rt>し</rt></ruby>り<ruby>合<rt>あ</rt></ruby>った <ruby>人<rt>ひと</rt></ruby>と <ruby>通話<rt>つうわ</rt></ruby>アプリで お<ruby>話<rt>はな</rt></ruby>ししています。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "<ruby>相手<rt>あいて</rt></ruby>", line: "「スマホの <ruby>画面<rt>がめん</rt></ruby><ruby>共有<rt>きょうゆう</rt></ruby>を オンにして、<ruby>届<rt>とど</rt></ruby>いた SMSの <ruby>番号<rt>ばんごう</rt></ruby>を <ruby>見<rt>み</rt></ruby>せてくれたら アイテムを あげるよ！」" },
      { speaker: "主人公", line: "「<ruby>画面<rt>がめん</rt></ruby><ruby>共有<rt>きょうゆう</rt></ruby>で SMSの <ruby>番号<rt>ばんごう</rt></ruby>を <ruby>見<rt>み</rt></ruby>せるのかな…？」" }
    ],
    point: "<ruby>画面<rt>がめん</rt></ruby><ruby>共有<rt>きょうゆう</rt></ruby><ruby>中<rt>ちゅう</rt></ruby>に <ruby>届<rt>とど</rt></ruby>いた <ruby>認証<rt>にんしょう</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>を <ruby>見<rt>み</rt></ruby>せると、スマホの アカウントを <ruby>乗<rt>の</rt></ruby>っ<ruby>取<rt>と</rt></ruby>られてしまいます！",
    notification: "📱ピコン 【<ruby>認証<rt>にんしょう</rt></ruby>コード】492103",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryScreenShareScam,
    desc: "「<ruby>画面<rt>がめん</rt></ruby><ruby>共有<rt>きょうゆう</rt></ruby>で SMSの<ruby>番号<rt>ばんごう</rt></ruby>を <ruby>見<rt>み</rt></ruby>せて」と <ruby>言<rt>い</rt></ruby>われた。<ruby>画像<rt>がぞう</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "「<ruby>認証<rt>にんしょう</rt></ruby>コードや スマホの<ruby>画面<rt>がめん</rt></ruby>は たにんに <ruby>見<rt>み</rt></ruby>せられない」と キッパリ<ruby>断<rt>ことわ</rt></ruby>り、<ruby>画面<rt>がめん</rt></ruby><ruby>共有<rt>きょうゆう</rt></ruby>を きる", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>喋<rt>しゃべ</rt></ruby>らない・<ruby>見<rt>み</rt></ruby>せない】<ruby>画面<rt>がめん</rt></ruby><ruby>共有<rt>きょうゆう</rt></ruby>で <ruby>見<rt>み</rt></ruby>えた<ruby>番号<rt>ばんごう</rt></ruby>を つかって アカウントを うばう てぐちだよ！" }
    ],
    wrongChoices: [
      { text: "<ruby>裏技<rt>うらわざ</rt></ruby>を <ruby>教<rt>おし</rt></ruby>えてもらいたいので、<ruby>画面<rt>がめん</rt></ruby><ruby>共有<rt>きょうゆう</rt></ruby>を オンにして SMSの<ruby>番号<rt>ばんごう</rt></ruby>を <ruby>見<rt>み</rt></ruby>せる", money: -25000, principleTag: "speak", damageType: "account", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】<ruby>認証<rt>にんしょう</rt></ruby>コードを <ruby>見<rt>み</rt></ruby>せてしまい、アカウントを <ruby>乗<rt>の</rt></ruby>っ<ruby>取<rt>と</rt></ruby>られて だいひがいが でたよ！" },
      { text: "「<ruby>裏技<rt>うらわざ</rt></ruby>の <ruby>登録料<rt>とうろくりょう</rt></ruby>」として、お<ruby>小遣<rt>こづか</rt></ruby>いから 3,000<ruby>円<rt>えん</rt></ruby>を <ruby>送金<rt>そうきん</rt></ruby>する", money: -20000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】お<ruby>金<rt>かね</rt></ruby>を はらっても <ruby>裏技<rt>うらわざ</rt></ruby>などは なく、お<ruby>金<rt>かね</rt></ruby>を だまし<ruby>取<rt>と</rt></ruby>られたよ！" },
      { text: "「<ruby>番号<rt>ばんごう</rt></ruby>は <ruby>見<rt>み</rt></ruby>せないけど、つうわの <ruby>指示<rt>しじ</rt></ruby>に したがって そうさするね」と <ruby>相手<rt>あいて</rt></ruby>の<ruby>言<rt>い</rt></ruby>う<ruby>通<rt>とお</rt></ruby>りにする", money: -15000, principleTag: "fooled", damageType: "account", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】ことばたくみに せっていを へんこうさせられ、アカウントを うばわれてしまったよ！" }
    ]
  },
  {
    id: "elementary_q09", category: "scam", source: "SNSのDM", title: "【DM】<ruby>人気<rt>にんき</rt></ruby><ruby>動画<rt>どうが</rt></ruby><ruby>配信者<rt>はいしんしゃ</rt></ruby>サイン<ruby>色紙<rt>しきし</rt></ruby>のおしらせ",
    characterName: "<ruby>有名<rt>ゆうめい</rt></ruby><ruby>配信者<rt>はいしんしゃ</rt></ruby>そっくりアカウント",
    narration: "SNSの ダイレクトメッセージに、メッセージが <ruby>届<rt>とど</rt></ruby>きました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "<ruby>配信者<rt>はいしんしゃ</rt></ruby>？", line: "「<ruby>色紙<rt>しきし</rt></ruby>を <ruby>送<rt>おく</rt></ruby>るから、<ruby>君<rt>きみ</rt></ruby>の【<ruby>名前<rt>なまえ</rt></ruby>】【<ruby>家<rt>いえ</rt></ruby>の<ruby>住所<rt>じゅうしょ</rt></ruby>】【<ruby>通<rt>かよ</rt></ruby>っている<ruby>小学校名<rt>しょうがっこうめい</rt></ruby>】を <ruby>返信<rt>へんしん</rt></ruby>してね！」" },
      { speaker: "主人公", line: "「<ruby>大好<rt>だいす</rt></ruby>きな <ruby>動画<rt>どうが</rt></ruby><ruby>配信者<rt>はいしんしゃ</rt></ruby>からだ！ <ruby>返信<rt>へんしん</rt></ruby>しようかな？」" }
    ],
    point: "<ruby>有名人<rt>ゆうめいじん</rt></ruby>になりすました <ruby>偽<rt>にせ</rt></ruby>アカウントです！ <ruby>公式<rt>こうしき</rt></ruby>マークや ユーザーIDを しっかり <ruby>確認<rt>かくにん</rt></ruby>しましょう！",
    notification: "📱ピコン サイン<ruby>当選<rt>とうせん</rt></ruby>のDM！",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryYoutuberSignScam,
    desc: "<ruby>人気<rt>にんき</rt></ruby><ruby>配信者<rt>はいしんしゃ</rt></ruby>から メッセージが きた。<ruby>画像<rt>がぞう</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "「<ruby>有名人<rt>ゆうめいじん</rt></ruby>から <ruby>直接<rt>ちょくせつ</rt></ruby>メッセージが <ruby>届<rt>とど</rt></ruby>くはずがない（<ruby>偽物<rt>にせもの</rt></ruby>のアカウントだ）」と <ruby>見抜<rt>みぬ</rt></ruby>いて、<ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>は <ruby>絶対<rt>ぜったい</rt></ruby>に <ruby>教<rt>おし</rt></ruby>えない", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>喋<rt>しゃべ</rt></ruby>らない・<ruby>教<rt>おし</rt></ruby>えない】ゆうめいじん そっくりに つくった にせアカウントだよ！ <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を まもれたね！" }
    ],
    wrongChoices: [
      { text: "サインが どうしても ほしいので、じぶんの<ruby>名前<rt>なまえ</rt></ruby>・<ruby>住所<rt>じゅうしょ</rt></ruby>・<ruby>小学校名<rt>しょうがっこうめい</rt></ruby>を メッセージで <ruby>返信<rt>へんしん</rt></ruby>する", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】<ruby>大切<rt>たいせつ</rt></ruby>な <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を <ruby>教<rt>おし</rt></ruby>えてしまい、<ruby>住所<rt>じゅうしょ</rt></ruby>や がっこうめいが しられたよ！" },
      { text: "「<ruby>色紙<rt>しきし</rt></ruby>の <ruby>送料<rt>そうりょう</rt></ruby>と こんぽう<ruby>代<rt>だい</rt></ruby>として 1,500<ruby>円<rt>えん</rt></ruby> <ruby>送金<rt>そうきん</rt></ruby>して」と <ruby>言<rt>い</rt></ruby>われ、すぐにお<ruby>金<rt>かね</rt></ruby>を <ruby>送<rt>おく</rt></ruby>る", money: -18000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】お<ruby>金<rt>かね</rt></ruby>を はらっても <ruby>色紙<rt>しきし</rt></ruby>は とどかず、お<ruby>金<rt>かね</rt></ruby>を ぬすまれてしまったよ！" },
      { text: "「ホンモノの <ruby>配信者<rt>はいしんしゃ</rt></ruby>ですか？」とDMで <ruby>質問<rt>しつもん</rt></ruby>し、<ruby>送<rt>おく</rt></ruby>られてきた にせのしょうめいしょを <ruby>信<rt>しん</rt></ruby>じる", money: -12000, principleTag: "fooled", damageType: "personal_info", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】にせの <ruby>画像<rt>がぞう</rt></ruby>で <ruby>信<rt>しん</rt></ruby>じこまされ、けっきょく <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を わたしてしまったよ！" }
    ]
  },
  {
    id: "elementary_q10", category: "scam", source: "ネット<ruby>広告<rt>こうこく</rt></ruby>", title: "【コード<ruby>配布<rt>はいふ</rt></ruby>】10<ruby>連<rt>れん</rt></ruby>ガチャシリアルコード",
    characterName: "<ruby>無料<rt>むりょう</rt></ruby>コード<ruby>配布<rt>はいふ</rt></ruby>サイト",
    narration: "ネットを <ruby>見<rt>み</rt></ruby>ていると、ガチャコードの <ruby>配布<rt>はいふ</rt></ruby>ページを <ruby>見<rt>み</rt></ruby>つけました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "<ruby>配布<rt>はいふ</rt></ruby>ページ", line: "<ruby>無料<rt>むりょう</rt></ruby>コード<ruby>受<rt>う</rt></ruby>け<ruby>取<rt>と</rt></ruby>り：おうちの<ruby>人<rt>ひと</rt></ruby>の スマホに <ruby>届<rt>とど</rt></ruby>く【<ruby>確認<rt>かくにん</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>】を <ruby>入力<rt>にゅうりょく</rt></ruby>してください。" },
      { speaker: "主人公", line: "「おうちの<ruby>人<rt>ひと</rt></ruby>の スマホを <ruby>見<rt>み</rt></ruby>るのかな…？」" }
    ],
    point: "「<ruby>無料<rt>むりょう</rt></ruby>」を エサに、<ruby>子<rt>こ</rt></ruby>どもに おうちの<ruby>人<rt>ひと</rt></ruby>の <ruby>認証<rt>にんしょう</rt></ruby>コードや パスワードを <ruby>入力<rt>にゅうりょく</rt></ruby>させようとする <ruby>危険<rt>きけん</rt></ruby>な <ruby>罠<rt>わな</rt></ruby>です！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryGachaCodeScam,
    desc: "「ガチャコードを <ruby>受<rt>う</rt></ruby>け<ruby>取<rt>と</rt></ruby>るための<ruby>手続<rt>てつづ</rt></ruby>き」と かいてある。<ruby>画像<rt>がぞう</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "「タダなのに おうちの<ruby>人<rt>ひと</rt></ruby>の <ruby>暗証<rt>あんしょう</rt></ruby>コードを <ruby>求<rt>もと</rt></ruby>めるのは さぎだ」と <ruby>見抜<rt>みぬ</rt></ruby>いて、すぐ ページを とじる", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>騙<rt>だま</rt></ruby>されない・<ruby>入力<rt>にゅうりょく</rt></ruby>しない】タダを エサに <ruby>大切<rt>たいせつ</rt></ruby>な コードを ぬすむ さぎだよ！ <ruby>入力<rt>にゅうりょく</rt></ruby>しなくて せいかい！" }
    ],
    wrongChoices: [
      { text: "ガチャを ひきたいので、おうちの<ruby>人<rt>ひと</rt></ruby>のスマホを <ruby>見<rt>み</rt></ruby>て とどいた<ruby>認証<rt>にんしょう</rt></ruby>コードを <ruby>入力<rt>にゅうりょく</rt></ruby>する", money: -30000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】アカウントを <ruby>乗<rt>の</rt></ruby>っ<ruby>取<rt>と</rt></ruby>られ、おうちの<ruby>人<rt>ひと</rt></ruby>の お<ruby>金<rt>かね</rt></ruby>が 30,000<ruby>円<rt>えん</rt></ruby><ruby>分<rt>ぶん</rt></ruby> つかわれたよ！" },
      { text: "「コード<ruby>発行<rt>はっこう</rt></ruby><ruby>手数料<rt>てすうりょう</rt></ruby>100<ruby>円<rt>えん</rt></ruby>」と <ruby>書<rt>か</rt></ruby>いてあったので、お<ruby>小遣<rt>こづか</rt></ruby>いから はらう", money: -15000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】いちど はらったことで さぎグループに ねらわれ、もっと お<ruby>金<rt>かね</rt></ruby>を とられたよ！" },
      { text: "サイトの「あんぜんなサイトです」という せつめいを <ruby>信<rt>しん</rt></ruby>じて <ruby>手続<rt>てつづ</rt></ruby>きを <ruby>進<rt>すす</rt></ruby>める", money: -20000, principleTag: "fooled", damageType: "personal_info", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】サイトの ウソの せつめいに だまされて、だいひがいに なってしまったよ！" }
    ]
  },
  {
    id: "elementary_q11", category: "scam", source: "ネット<ruby>広告<rt>こうこく</rt></ruby>", title: "【<ruby>募集<rt>ぼしゅう</rt></ruby>】ゲームの<ruby>感想<rt>かんそう</rt></ruby>モニター",
    characterName: "<ruby>簡単<rt>かんたん</rt></ruby><ruby>副業<rt>ふくぎょう</rt></ruby><ruby>広告<rt>こうこく</rt></ruby>",
    narration: "ネットを <ruby>見<rt>み</rt></ruby>ていると、お<ruby>小遣<rt>こづか</rt></ruby>い<ruby>稼<rt>かせ</rt></ruby>ぎの <ruby>広告<rt>こうこく</rt></ruby>を <ruby>見<rt>み</rt></ruby>つけました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "<ruby>副業<rt>ふくぎょう</rt></ruby>サイト", line: "<ruby>報酬<rt>ほうしゅう</rt></ruby>を <ruby>受<rt>う</rt></ruby>け<ruby>取<rt>と</rt></ruby>るため、おうちの <ruby>電話番号<rt>でんわばんごう</rt></ruby>と お<ruby>名前<rt>なまえ</rt></ruby>を <ruby>入力<rt>にゅうりょく</rt></ruby>してください。" },
      { speaker: "主人公", line: "「<ruby>感想<rt>かんそう</rt></ruby>を <ruby>書<rt>か</rt></ruby>くだけで いいのかな？」" }
    ],
    point: "「だれでも かんたんに たくさん お<ruby>金<rt>かね</rt></ruby>が もらえる」は、<ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を あつめる わなです！ <ruby>絶対<rt>ぜったい</rt></ruby>に <ruby>応募<rt>おうぼ</rt></ruby>してはいけません！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.elementaryEasyMoneyScam,
    desc: "「<ruby>報酬<rt>ほうしゅう</rt></ruby>を <ruby>受<rt>う</rt></ruby>け<ruby>取<rt>と</rt></ruby>るための<ruby>手続<rt>てつづ</rt></ruby>き」と かいてある。<ruby>画像<rt>がぞう</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "「かんたんに お<ruby>金<rt>かね</rt></ruby>が もらえるお<ruby>話<rt>はなし</rt></ruby>は ぜったいに ウソだ」と <ruby>見抜<rt>みぬ</rt></ruby>いて、なにも<ruby>入力<rt>にゅうりょく</rt></ruby>せずに ページを とじる", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>騙<rt>だま</rt></ruby>されない・<ruby>応募<rt>おうぼ</rt></ruby>しない】うまいことばで <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を あつめる あくしつな <ruby>広告<rt>こうこく</rt></ruby>だよ！" }
    ],
    wrongChoices: [
      { text: "お<ruby>小遣<rt>こづか</rt></ruby>いが もらいたいので、じぶんの<ruby>名前<rt>なまえ</rt></ruby>・いえのでんわ<ruby>番号<rt>ばんごう</rt></ruby>・<ruby>住所<rt>じゅうしょ</rt></ruby>を <ruby>入力<rt>にゅうりょく</rt></ruby>して <ruby>送信<rt>そうしん</rt></ruby>する", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】<ruby>大切<rt>たいせつ</rt></ruby>な <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>が さぎグループに わたり、<ruby>怪<rt>あや</rt></ruby>しい<ruby>電話<rt>でんわ</rt></ruby>が かかってくるように なってしまったよ！" },
      { text: "「さいしょに おしごとの きょうざい<ruby>代<rt>だい</rt></ruby>として 3,000<ruby>円<rt>えん</rt></ruby><ruby>必要<rt>ひつよう</rt></ruby>」と <ruby>言<rt>い</rt></ruby>われ、お<ruby>小遣<rt>こづか</rt></ruby>いから はらう", money: -15000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】お<ruby>金<rt>かね</rt></ruby>を はらっても おしごとは しょうかいされず、お<ruby>金<rt>かね</rt></ruby>を もち<ruby>逃<rt>に</rt></ruby>げされたよ！" },
      { text: "「<ruby>本当<rt>ほんとう</rt></ruby>に お<ruby>小遣<rt>こづか</rt></ruby>いは もらえますか？」と お<ruby>問<rt>と</rt></ruby>い<ruby>合<rt>あ</rt></ruby>わせフォームから <ruby>聞<rt>き</rt></ruby>いてみる", money: -12000, principleTag: "fooled", damageType: "personal_info", explain: "【<ruby>相手<rt>あいて</rt></ruby>に<ruby>騙<rt>だま</rt></ruby>された！】「あんしんですよ」と ことばたくみに だまされ、お<ruby>金<rt>かね</rt></ruby>を はらってしまったよ！" }
    ]
  },

  // ── 助ける（2問） ──
  {
    id: "elementary_q12", category: "help", source: "<ruby>銀行<rt>ぎんこう</rt></ruby>のATM", title: "ぎんこうの ATMにて",
    characterName: "<ruby>困<rt>こま</rt></ruby>っているおばあさん",
    narration: "お<ruby>買<rt>か</rt></ruby>いものの <ruby>途中<rt>とちゅう</rt></ruby>、ぎんこうの ATMで、でんわを しながら ボタンを <ruby>押<rt>お</rt></ruby>している おばあさんを <ruby>見<rt>み</rt></ruby>かけました。",
    dialogue: [
      { speaker: "おばあさん", line: "「（<ruby>電話<rt>でんわ</rt></ruby>で）はい、<ruby>言<rt>い</rt></ruby>われた<ruby>通<rt>とお</rt></ruby>り <ruby>番号<rt>ばんごう</rt></ruby>を <ruby>押<rt>お</rt></ruby>しました！ これでお<ruby>金<rt>かね</rt></ruby>が <ruby>戻<rt>もど</rt></ruby>るんですね…？」" },
      { speaker: "主人公", line: "「<ruby>電話<rt>でんわ</rt></ruby>しながら <ruby>操作<rt>そうさ</rt></ruby>してるな…どうしよう？」" }
    ],
    point: "ATMを <ruby>操作<rt>そうさ</rt></ruby>して『お<ruby>金<rt>かね</rt></ruby>が <ruby>戻<rt>もど</rt></ruby>ってくる』ことは <ruby>絶対<rt>ぜったい</rt></ruby>に ありません！ 100% <ruby>詐欺<rt>さぎ</rt></ruby>です！",
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
      { speaker: "<ruby>母<rt>はは</rt></ruby>", line: "「<ruby>警察<rt>けいさつ</rt></ruby>から <ruby>電話<rt>でんわ</rt></ruby>があって…<ruby>口座<rt>こうざ</rt></ruby>のお<ruby>金<rt>かね</rt></ruby>を <ruby>別<rt>べつ</rt></ruby>の<ruby>口座<rt>こうざ</rt></ruby>に <ruby>移<rt>うつ</rt></ruby>しなさいって <ruby>言<rt>い</rt></ruby>われたの…」" },
      { speaker: "主人公", line: "「お<ruby>母<rt>かあ</rt></ruby>さん、どうしたの？」" }
    ],
    point: "<ruby>本物<rt>ほんもの</rt></ruby>の <ruby>警察<rt>けいさつ</rt></ruby>が「<ruby>指定<rt>してい</rt></ruby>した <ruby>別<rt>べつ</rt></ruby>の <ruby>口座<rt>こうざ</rt></ruby>に お<ruby>金<rt>かね</rt></ruby>を <ruby>移<rt>うつ</rt></ruby>せ」と <ruby>電話<rt>でんわ</rt></ruby>することは 100% ありません！",
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
    id: "elementary_q14", category: "real", source: "SNS<ruby>投稿<rt>とうこう</rt></ruby>", title: "【おしらせ】<ruby>夏休<rt>なつやす</rt></ruby>みキャンペーン",
    characterName: "ゲーム<ruby>公式<rt>こうしき</rt></ruby>アカウント",
    narration: "SNSを <ruby>見<rt>み</rt></ruby>ていると、ゲームの <ruby>公式<rt>こうしき</rt></ruby>アカウントから キャンペーンの <ruby>投稿<rt>とうこう</rt></ruby>が <ruby>流<rt>なが</rt></ruby>れてきました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "ゲーム<ruby>公式<rt>こうしき</rt></ruby>", line: "ログインボーナス<ruby>配布中<rt>はいふちゅう</rt></ruby>！ <ruby>詳細<rt>しょうさい</rt></ruby>は ゲーム<ruby>内<rt>ない</rt></ruby>おしらせを ご<ruby>確認<rt>かくにん</rt></ruby>ください。" },
      { speaker: "主人公", line: "「いつもと <ruby>少<rt>すこ</rt></ruby>し ふんいきが <ruby>違<rt>ちが</rt></ruby>うけど、どうなんだろう？」" }
    ],
    point: "<ruby>見<rt>み</rt></ruby>た<ruby>目<rt>め</rt></ruby>が いつもと <ruby>違<rt>ちが</rt></ruby>っても <ruby>詐欺<rt>さぎ</rt></ruby>とは <ruby>限<rt>かぎ</rt></ruby>りません。<ruby>公式<rt>こうしき</rt></ruby>アカウントのマークや ゲーム<ruby>内<rt>ない</rt></ruby>のお<ruby>知<rt>し</rt></ruby>らせで <ruby>確認<rt>かくにん</rt></ruby>しましょう！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.elementarySummerGameCampaignReal,
    desc: "SNSに キャンペーンの <ruby>案内<rt>あんない</rt></ruby>が <ruby>流<rt>なが</rt></ruby>れてきた。<ruby>画像<rt>がぞう</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "「<ruby>見<rt>み</rt></ruby>た<ruby>目<rt>め</rt></ruby>だけで <ruby>決<rt>き</rt></ruby>めつけず」<ruby>公式<rt>こうしき</rt></ruby>マークを <ruby>確認<rt>かくにん</rt></ruby>し、いつもの ゲーム<ruby>内<rt>ない</rt></ruby>おしらせを <ruby>開<rt>ひら</rt></ruby>いて たしかめる", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>正規<rt>せいき</rt></ruby><ruby>確認<rt>かくにん</rt></ruby>】ホンモノの <ruby>公式<rt>こうしき</rt></ruby>キャンペーンだったね！ あんぜんな ルートで ただしく かくにんできたよ！" }
    ],
    wrongChoices: [
      { text: "<ruby>確認<rt>かくにん</rt></ruby>のため、<ruby>広告<rt>こうこく</rt></ruby>の リプライ<ruby>欄<rt>らん</rt></ruby>に じぶんのアカウントIDと パスワードを <ruby>書<rt>か</rt></ruby>きこむ", money: -20000, principleTag: "speak", damageType: "account", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】みんなに <ruby>見<rt>み</rt></ruby>えるばしょに パスワードを かいてしまい、アカウントを ぬすまれたよ！" },
      { text: "「ボーナスを <ruby>受<rt>う</rt></ruby>け<ruby>取<rt>と</rt></ruby>るには かきんが <ruby>必要<rt>ひつよう</rt></ruby>」と かんちがいし、お<ruby>小遣<rt>こづか</rt></ruby>いで アイテムを <ruby>買<rt>か</rt></ruby>う", money: -15000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】タダで もらえるものだったのに、むだな お<ruby>金<rt>かね</rt></ruby>を つかってしまったよ。" },
      { text: "「いつもと デザインが ちがうから ぜんぶ さぎだ！」と <ruby>決<rt>き</rt></ruby>めつけて アプリを <ruby>消<rt>け</rt></ruby>す", money: -8000, principleTag: "fooled", damageType: "money", explain: "【<ruby>誤認<rt>ごにん</rt></ruby><ruby>拒絶<rt>きょぜつ</rt></ruby>】ホンモノの イベントだったのに データを けしてしまい、ふっきゅうに お<ruby>金<rt>かね</rt></ruby>が かかってしまったよ。" }
    ]
  },
  {
    id: "elementary_q15", category: "real", source: "メール", title: "【お<ruby>届<rt>とど</rt></ruby>けもの】ご<ruby>不在<rt>ふざい</rt></ruby><ruby>連絡<rt>れんらく</rt></ruby>",
    characterName: "<ruby>宅配<rt>たくはい</rt></ruby><ruby>業者<rt>ぎょうしゃ</rt></ruby>",
    narration: "おうちにいると、メールが 1<ruby>通<rt>つう</rt></ruby> <ruby>届<rt>とど</rt></ruby>きました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "<ruby>連絡<rt>れんらく</rt></ruby><ruby>通知<rt>つうち</rt></ruby>", line: "<ruby>荷物<rt>にもつ</rt></ruby>を <ruby>持<rt>も</rt></ruby>ち<ruby>帰<rt>かえ</rt></ruby>りました。<ruby>再配達<rt>さいはいたつ</rt></ruby>のご<ruby>依頼<rt>いらい</rt></ruby>は <ruby>公式<rt>こうしき</rt></ruby>アプリから お<ruby>願<rt>ねが</rt></ruby>いいたします。" },
      { speaker: "主人公", line: "「<ruby>頼<rt>たの</rt></ruby>んでいた <ruby>本<rt>ほん</rt></ruby>かな？ <ruby>伝票<rt>でんぴょう</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>が <ruby>書<rt>か</rt></ruby>いてあるぞ。」" }
    ],
    point: "<ruby>伝票<rt>でんぴょう</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>が <ruby>書<rt>か</rt></ruby>いてあり、<ruby>公式<rt>こうしき</rt></ruby>アプリや <ruby>公式<rt>こうしき</rt></ruby>サイトからの <ruby>手続<rt>てつづ</rt></ruby>きを <ruby>案内<rt>あんない</rt></ruby>する <ruby>通知<rt>つうち</rt></ruby>は <ruby>本物<rt>ほんもの</rt></ruby>の <ruby>連絡<rt>れんらく</rt></ruby>です。",
    notification: "📱ピコン お<ruby>荷物<rt>にもつ</rt></ruby>のおしらせ",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.elementaryDeliveryNoticeReal,
    desc: "お<ruby>留守<rt>るす</rt></ruby><ruby>通知<rt>つうち</rt></ruby>のメールが <ruby>届<rt>とど</rt></ruby>いた。<ruby>画像<rt>がぞう</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "おうちの<ruby>人<rt>ひと</rt></ruby>に つたえて、ブックマークしてある <ruby>公式<rt>こうしき</rt></ruby>アプリから <ruby>伝票<rt>でんぴょう</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>で さい<ruby>配達<rt>はいたつ</rt></ruby>を たのむ", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>正規<rt>せいき</rt></ruby><ruby>確認<rt>かくにん</rt></ruby>】<ruby>公式<rt>こうしき</rt></ruby>アプリから でんぴょう<ruby>番号<rt>ばんごう</rt></ruby>を いれて あんぜんに さいはいたつを たのめたね！" }
    ],
    wrongChoices: [
      { text: "メールに <ruby>返信<rt>へんしん</rt></ruby>して、おうちの<ruby>暗証<rt>あんしょう</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>や パスワードを <ruby>書<rt>か</rt></ruby>いて <ruby>送<rt>おく</rt></ruby>る", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】たくはいびんの さいはいたつに パスワードなどは ふようです！ <ruby>情報<rt>じょうほう</rt></ruby>が もれてしまったよ。" },
      { text: "「さい<ruby>配達<rt>はいたつ</rt></ruby><ruby>手数料<rt>てすうりょう</rt></ruby>が <ruby>必要<rt>ひつよう</rt></ruby>」と かんちがいして、ネットで <ruby>見<rt>み</rt></ruby>つけた <ruby>怪<rt>あや</rt></ruby>しい<ruby>窓口<rt>まどぐち</rt></ruby>へ お<ruby>金<rt>かね</rt></ruby>を はらう", money: -12000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】ほんものの さいはいたつは <ruby>無料<rt>むりょう</rt></ruby>なのに、にせの まどぐちにお<ruby>金<rt>かね</rt></ruby>を とられたよ！" },
      { text: "「ふざいつうちメールは ぜんぶ さぎだ」と <ruby>思<rt>おも</rt></ruby>いこみ、なにも <ruby>確認<rt>かくにん</rt></ruby>せずに にもつを ほったらかしにする", money: -8000, principleTag: "fooled", damageType: "money", explain: "【<ruby>誤認<rt>ごにん</rt></ruby><ruby>拒絶<rt>きょぜつ</rt></ruby>】ホンモノの にもつが お<ruby>店<rt>みせ</rt></ruby>に もどってしまい、キャンセルりょうを せいきゅうされたよ！" }
    ]
  },
  {
    id: "elementary_q16", category: "real", source: "<ruby>公式<rt>こうしき</rt></ruby>メッセージ", title: "【クーポン】10％OFF クーポンのおしらせ",
    characterName: "ショップ<ruby>公式<rt>こうしき</rt></ruby>メッセージ",
    narration: "いつも <ruby>利用<rt>りよう</rt></ruby>している お<ruby>店<rt>みせ</rt></ruby>の <ruby>公式<rt>こうしき</rt></ruby>メッセージアプリから おしらせが きました。\n<ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう。",
    dialogue: [
      { speaker: "ショップ<ruby>公式<rt>こうしき</rt></ruby>", line: "お<ruby>会計時<rt>かいけいじ</rt></ruby>に レジで バーコードを ご<ruby>提示<rt>ていじ</rt></ruby>ください。" },
      { speaker: "主人公", line: "「クーポンが <ruby>届<rt>とど</rt></ruby>いた！ <ruby>使<rt>つか</rt></ruby>ってみようかな？」" }
    ],
    point: "<ruby>公式<rt>こうしき</rt></ruby>アカウントの <ruby>認証<rt>にんしょう</rt></ruby>マークがあり、<ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>や カード<ruby>入力<rt>にゅうりょく</rt></ruby>を <ruby>求<rt>もと</rt></ruby>めずに レジで <ruby>見<rt>み</rt></ruby>せるだけで <ruby>使<rt>つか</rt></ruby>えるクーポンは <ruby>本物<rt>ほんもの</rt></ruby>です。",
    notification: "📱ピコン お<ruby>店<rt>みせ</rt></ruby>からのクーポン！",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.elementarySummerCouponReal,
    desc: "お<ruby>店<rt>みせ</rt></ruby>から クーポンが <ruby>届<rt>とど</rt></ruby>いた。<ruby>画像<rt>がぞう</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>て、あなたなら どうする？",
    correctChoices: [
      { text: "<ruby>公式<rt>こうしき</rt></ruby>アカウントの みどりの<ruby>認証<rt>にんしょう</rt></ruby>マークを <ruby>確認<rt>かくにん</rt></ruby>し、お<ruby>買<rt>か</rt></ruby>いもののときに レジで <ruby>画面<rt>がめん</rt></ruby>を <ruby>見<rt>み</rt></ruby>せる", money: 0, principleTag: "safe", explain: "せいかい！【<ruby>正規<rt>せいき</rt></ruby><ruby>確認<rt>かくにん</rt></ruby>】ホンモノの <ruby>公式<rt>こうしき</rt></ruby>クーポンだったね！ ただしく <ruby>確認<rt>かくにん</rt></ruby>して おトクに おかいものできたよ！" }
    ],
    wrongChoices: [
      { text: "「クーポンをつかうため」と <ruby>思<rt>おも</rt></ruby>いこみ、メッセージの トーク<ruby>画面<rt>がめん</rt></ruby>に おうちの<ruby>住所<rt>じゅうしょ</rt></ruby>や でんわ<ruby>番号<rt>ばんごう</rt></ruby>を <ruby>書<rt>か</rt></ruby>く", money: -18000, principleTag: "speak", damageType: "personal_info", explain: "【<ruby>喋<rt>しゃべ</rt></ruby>ってしまった！】レジで <ruby>見<rt>み</rt></ruby>せるだけの クーポンなのに、いらない <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を <ruby>送<rt>おく</rt></ruby>ってしまったよ！" },
      { text: "「クーポンの こうにゅう<ruby>代<rt>だい</rt></ruby>が <ruby>必要<rt>ひつよう</rt></ruby>」と <ruby>勘違<rt>かんちが</rt></ruby>いし、お<ruby>小遣<rt>こづか</rt></ruby>いから お<ruby>金<rt>かね</rt></ruby>を <ruby>送金<rt>そうきん</rt></ruby>する", money: -15000, principleTag: "pay", damageType: "money", explain: "【<ruby>払<rt>はら</rt></ruby>ってしまった！】<ruby>無料<rt>むりょう</rt></ruby>の わりびきクーポンなのに、<ruby>勝手<rt>かって</rt></ruby>にお<ruby>金<rt>かね</rt></ruby>を はらってしまったよ！" },
      { text: "「ふだん こないクーポンは さぎだ！」と うたがい、<ruby>公式<rt>こうしき</rt></ruby>アカウントを つうほう・ブロックする", money: -8000, principleTag: "fooled", damageType: "money", explain: "【<ruby>誤認<rt>ごにん</rt></ruby><ruby>拒絶<rt>きょぜつ</rt></ruby>】ホンモノの おトクなクーポンを すててしまい、わりびきを うけることが できなかったよ。" }
    ]
  }
];