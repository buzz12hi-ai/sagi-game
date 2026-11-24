/* =========================================================
   data-senior.js
   高齢者モード専用問題プール（全16問）
   【問題9キャラクター変更（消防士）＆ファイル名完全一致対応版】
   ========================================================= */

const QUESTIONS_SENIOR = [
  // ── 詐欺（11問） ──
  {
    id: "senior_q01", category: "scam", source: "固定電話・メッセージアプリ", title: "警察署の捜査担当を名乗る電話",
    characterName: "警察捜査二課（自称）",
    narration: "固定電話に警察を名乗る電話があり、スマホのメッセージアプリを追加するよう案内されました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "自称・警察官", line: "「口座を保護するため、指定の口座へ預金を移してください。」" },
      { speaker: "あなた", line: "（警察からの連絡だ…どう対応すべきか？）" }
    ],
    point: "警察がメッセージアプリで連絡を取ったり、逮捕状の画像を送ったり、お金を振り込ませることは絶対にありません！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.fakePoliceLineScam,
    desc: "警察を名乗る人物からメッセージアプリで画像が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "相手との連絡をすぐにやめ、相手が言った番号ではなく自分で調べた警察署の代表番号へ電話して確かめる", money: 0, principleTag: "safe", explain: "正解！【騙されない・警察へ電話して確かめる】偽警察によるアプリ誘導詐欺です。警察がお金を振り込ませることは絶対にありません！" }
    ],
    wrongChoices: [
      { text: "アプリ通話で事情聴取を受け、通帳の口座番号と暗証番号をすべて相手に伝える", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】口座情報を悪用され、預金口座から全額引き出されてしまいました。" },
      { text: "逮捕されると困るので、指示された指定口座へ預金を急いで振り込む", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】特殊詐欺被害です！老後の大切な資産30,000円分が即座に奪われてしまいました。" },
      { text: "アプリで送られてきた「逮捕状」の画像を本物だと信じ、相手の指示通りに行動する", money: -20000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽の逮捕状に騙され、自宅に来た偽職員にキャッシュカードを渡してしまいました。" }
    ]
  },
  {
    id: "senior_q02", category: "scam", source: "携帯のショートメール（SMS）", title: "【年金給付センター】特別給付金の受け取り手続きのご案内",
    characterName: "年金給付センターサポート",
    narration: "スマホのショートメール（SMS）に通知が届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "SMS通知", line: "【特別給付金】本日中に受け取り手続きを完了してください。" },
      { speaker: "あなた", line: "（給付金に関する案内が届いている…）" }
    ],
    point: "給付金を装って「本日中」と焦らせ、銀行口座情報や暗証番号を入力させる偽サイトの詐欺です。",
    notification: "📱ピコン 新着メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.benefitScam,
    desc: "給付金の案内メールが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "メールのボタンは押さず、市役所などの窓口へ直接電話して確かめる", money: 0, principleTag: "safe", explain: "正解！【騙されない・市役所へ電話して確かめる】給付金を騙る偽メール詐欺です。リンクを開かず市役所に確かめるのが一番安全です！" }
    ],
    wrongChoices: [
      { text: "5万円を受け取りたいので、リンクを開いて銀行の口座番号と暗証番号を入力する", money: -25000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】口座情報を盗まれ、給付金どころか預金口座から25,000円不正に引き出されました。" },
      { text: "「受け取り手続きの手数料」として、コンビニで1,000円分の電子マネーを買って送る", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】お金を騙し取られた上、詐欺グループの名簿に登録されてしまいました。" },
      { text: "メールに書かれた問い合わせ番号へ電話して受け取り方法を聞く", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽の窓口に繋がり、「手続き手数料」として高額な電子マネーを要求されました。" }
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
    point: "「電話番号が変わった」「カバンを無くした」「同僚がお金を取りに行く」はオレオレ詐欺の典型的な手口です！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: null,
    desc: "息子を名乗る人物から電話があった。あなたならどうする？",
    correctChoices: [
      { text: "一度電話を切り、あらかじめ手帳に控えてある息子の本当の携帯番号へ電話して確かめる", money: 0, principleTag: "safe", explain: "正解！【騙されない・元の番号へ電話して確かめる】オレオレ詐欺を防ぐには「もとから知っている番号にかけ直す」ことが鉄則です！" }
    ],
    wrongChoices: [
      { text: "息子のピンチを助けるため、自宅にある預金通帳の残高や保管場所を電話で教える", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】資産情報を聞き出され、自宅に強盗や受け子が押しかけてくる被害に遭いました。" },
      { text: "息子の一大事だと慌ててしまい、自宅に来た上司や同僚を名乗る男にお金を渡す", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】オレオレ詐欺です！老後の大切なお金30,000円分がそのまま騙し取られました。" },
      { text: "男から言われた「新しい携帯番号」へ電話をかけて事実を確かめる", money: -20000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】犯人の仲間に繋がり、「早く払わないと息子さんが逮捕される」と脅されました。" }
    ]
  },
  {
    id: "senior_q04", category: "scam", source: "固定電話", title: "電力会社関連窓口からのプラン切替案内",
    characterName: "自称・電力プラン窓口",
    narration: "電話がかかってきました。\n相手：「電気料金の特別プランのご案内です。検針票をお手元にご用意ください。」",
    dialogue: [
      { speaker: "勧誘電話", line: "「検針票のお客様番号と契約番号を読み上げてください。」" },
      { speaker: "あなた", line: "（電気代が安くなるという案内だが…どう対応すべきか？）" }
    ],
    point: "検針票の番号を教えると、本人の承諾なしに別の電力会社へ勝手に契約を切り替えられ、高額な解約金を請求されるトラブルが多発しています。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: null,
    desc: "検針票情報の読み上げを求められた。あなたならどうする？",
    correctChoices: [
      { text: "「電話での契約変更はしません。書類を送ってください」と断り、検針票の番号は教えない", money: 0, principleTag: "safe", explain: "正解！【話さない・教えない】検針票の情報は大切な個人情報です。電話で番号を教えないことで勝手な契約変更を防げます！" }
    ],
    wrongChoices: [
      { text: "安くなるならありがたいと、検針票のお客様番号・契約番号・名前をすべて伝える", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】勝手に別会社へ契約変更され、後から高額な請求や解約手数料を請求されました。" },
      { text: "「契約変更の事務手数料として3,000円必要」と言われ、クレジットカード番号を伝えて支払う", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】不要な手数料を騙し取られ、カード情報も抜き取られてしまいました。" },
      { text: "大手電力会社の名前を名乗っているから信用できると思い込み、電話口で契約を承諾する", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】大手電力会社を名乗る悪質な業者でした。高い料金のプランに切り替えられてしまいました。" }
    ]
  },
  {
    id: "senior_q05", category: "real", source: "郵便・電話", title: "【取引銀行】定期預金満期に関するご案内",
    characterName: "取引銀行の正規支店担当者",
    narration: "利用している銀行から満期案内書類が届き、担当者から電話がありました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "銀行担当者", line: "「満期書類をお送りいたしましたのでご確認ください。暗証番号をお伺いすることはございません。」" },
      { speaker: "あなた", line: "（定期預金の案内だ。確かめてみよう。）" }
    ],
    point: "取引のある正規の銀行からの案内であり、暗証番号を聞いたりカードを預かる要求が一切ない通知は本物です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.bankMaturityReal,
    desc: "取引銀行から満期案内が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "郵送されてきた書類を確かめ、必要に応じて銀行の店舗窓口へ出向いて手続きする", money: 0, principleTag: "safe", explain: "正解！【正規の確かめ方】本物の案内を落ち着いて受け取り、銀行の窓口で安全に対応できました！" }
    ],
    wrongChoices: [
      { text: "電話の担当者に「暗証番号を言うから代わりに手続きして」と暗証番号を伝える", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】本物の銀行員であっても、電話口で暗証番号を伝えるのは非常に危険です。" },
      { text: "「満期手続き手数料が必要」と思い込み、怪しい口座へ送金する", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】銀行の手続きは無料なのに、関係のない偽口座にお金を振り込んでしまいました。" },
      { text: "「銀行からの連絡はすべて詐欺だ！」と思い込んで、定期預金を解約して放置する", money: -8000, principleTag: "fooled", damageType: "money", explain: "【誤解による損】本物の案内まで断ってしまい、中途解約で利息8,000円を失いました。" }
    ]
  },
  {
    id: "senior_q06", category: "scam", source: "自宅訪問", title: "突然の屋根点検訪問",
    characterName: "突然の訪問作業員",
    narration: "自宅のインターホンが鳴り、作業服の男が立っていました。\n「近所で工事をしている者ですが、お宅の屋根の瓦がズレてますよ。無料で見てあげます。」",
    dialogue: [
      { speaker: "作業員", line: "「ハシゴですぐ登って確認しますね。」" },
      { speaker: "あなた", line: "（突然の訪問だが…どう対応すべきか？）" }
    ],
    point: "「危険」「無料」「今すぐ」と不安をあおって屋根に登り、わざと瓦を壊して高額契約を迫る悪質な手口（点検商法）です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.workerLabor,
    screenshot: null,
    desc: "「屋根を無料で点検する」と訪問業者が迫ってきた。あなたならどうする？",
    correctChoices: [
      { text: "「知り合いの大工さんに見てもらいますので結構です」と断り、絶対に敷地や屋根に上がらせない", money: 0, principleTag: "safe", explain: "正解！【話さない・家に入れない】突然来た点検業者は理由を告げずきっぱり断ることが一番の方法です！" }
    ],
    wrongChoices: [
      { text: "「家を建てた会社名と家族の連絡先」を業者に教えて相談させようとする", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】個人情報を悪質業者に知られてしまい、何度も押し掛け営業を受けるようになりました。" },
      { text: "「今すぐ応急処置が必要」と言われ、その場で手付金として30,000円を手渡す", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】お金を払った後、雑な工事をされてさらに高額な追加工事を迫られました。" },
      { text: "無料で見てもらえるなら助かると思い、屋根に登って点検してもらう", money: -25000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】点検商法です！わざと屋根を壊され、「今すぐ修理しないと崩れる」と高額契約を結ばされました。" }
    ]
  },
  {
    id: "senior_q07", category: "scam", source: "固定電話", title: "【重要】インターネット利用料金の未納について",
    characterName: "通信サービス料金窓口",
    narration: "電話がありました。\n相手：「ネット利用料金に未納があります。コンビニで電子マネーカードを購入し、裏面の番号を教えてください。」",
    dialogue: [
      { speaker: "電話の相手", line: "「番号を教えていただければ、すぐに未納解除の手続きを行います。」" },
      { speaker: "あなた", line: "（料金未納の電話だ…どう対応すべきか？）" }
    ],
    point: "どのような会社であっても、未納料金の支払いにコンビニで買う電子マネーカード（プリペイドカード）の番号を要求することは100%詐欺です！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: null,
    desc: "電話で電子マネーカードの購入と番号を要求された。あなたならどうする？",
    correctChoices: [
      { text: "「電子マネーカードで支払いを求めるのは詐欺」と判断し、電話を切って契約先の正規の請求書を確かめる", money: 0, principleTag: "safe", explain: "正解！【騙されない・電子マネー要求は断る】架空請求詐欺です。コンビニのカード番号を電話で聞かれたら100%詐欺です！" }
    ],
    wrongChoices: [
      { text: "コンビニで買ったカードの裏の銀色部分を削り、番号を電話口で相手に読み上げる", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】カード詐欺です！番号を伝えた瞬間に25,000円分が全額犯人に使われました。" },
      { text: "「銀行振込でも可能」と言われ、指定された個人名義の口座へ未納金を振り込む", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】架空請求詐欺です！振り込んだお金はそのまま犯人に持ち逃げされました。" },
      { text: "「カードの買い方が分からない」と相手に相談し、電話の指示通りにコンビニの機械を操作する", money: -20000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】相手の言う通りに電子マネーを発行させられ、全額騙し取られてしまいました。" }
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
    point: "水道局が個人の家を突然訪ねて水質検査をしたり、浄水器を売ることは絶対にありません。薬品で水の色を変えて怖がらせる手口です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.suspiciousVisitor,
    screenshot: IMAGE_ASSETS.screenshots.waterPurifierScam,
    desc: "水質検査と浄水器の設置を勧められた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "「水道局が浄水器を販売することはない」と見抜き、「買いません」と断ってドアを閉める", money: 0, principleTag: "safe", explain: "正解！【騙されない・水道局を名乗る業者を撃退】水道局を装った悪質な訪問販売です。薬の色の変化は水道水の塩素に反応するだけのトリックです！" }
    ],
    wrongChoices: [
      { text: "家族構成や持病、普段飲んでいる薬について業者に詳しく教える", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】健康の不安を知られ、高額な健康食品やサプリメントの送り付け詐欺に遭いました。" },
      { text: "水が黄色くなって怖くなったので、勧められた20万円の浄水器を手付金前払いで契約する", money: -25000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】悪質な訪問販売です！市販の安い浄水器を高額で売りつけられました。" },
      { text: "「チラシに書いてある電話番号」へ電話をかけて、本当に水道局か確かめる", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】詐欺グループの仲間に繋がり、「地域の水道管が危険」と騙されてしまいました。" }
    ]
  },
  {
    id: "senior_q09", category: "scam", source: "自宅訪問", title: "住宅防火対策および消火設備のご案内",
    // 消防士に変更
    characterName: "自称・防災点検員",
    narration: "消防服に似た服を着た人物が訪ねてきました。\n「消防署の方から来ました。消火器の交換が義務化されたので設置します。」",
    dialogue: [
      { speaker: "訪問者", line: "「消火器の費用として35,000円になります。」" },
      { speaker: "あなた", line: "（消防関係の訪問だ…どう対応すべきか？）" }
    ],
    point: "消防署が消火器の訪問販売や集金を行うことは絶対にありません。「消防署の方（方角）」と言って職員のように思い込ませる手口です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    // 作業員(suspiciousVisitor)から消防士(fireTruck)に変更
    character: IMAGE_ASSETS.characters.fireTruck,
    screenshot: null,
    desc: "「消火器の交換代金を支払え」と請求された。あなたならどうする？",
    correctChoices: [
      { text: "「消防署が消火器の販売や集金をすることはない」と知っているので、その場できっぱり断る", money: 0, principleTag: "safe", explain: "正解！【騙されない・きっぱり断る】消防署員を装う悪質な訪問販売です。不安につけ込む手口を冷静に撃退！" }
    ],
    wrongChoices: [
      { text: "「自宅に消火器が何本あるか、どこに置いてあるか」を業者に案内して見せる", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】家の中の様子や間取りを下見され、空き巣の標的にされてしまいました。" },
      { text: "火事になったら大変だと不安になり、言われるがまま35,000円を支払って契約する", money: -25000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】不当な消火器販売詐欺です！定価数千円のものを法外な値段で買わされました。" },
      { text: "「消防署の方（ほう）から来ました」という言葉を「消防署の職員」だと信じ込む", money: -20000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】公的機関のフリに騙され、不要な火災警報器の交換契約を結ばされました。" }
    ]
  },
  {
    id: "senior_q10", category: "real", source: "自宅訪問", title: "【定期点検】ガス設備の定期安全点検のお知らせ",
    characterName: "ガス供給会社点検員",
    narration: "事前にチラシが入っていた日、制服を着たガス会社の点検員が訪ねてきました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "点検員", line: "「4年に1度の定期ガス漏れ点検に伺いました。点検費用は無料です。」" },
      { speaker: "あなた", line: "（事前にお知らせがあったガス点検だ。確かめてみよう。）" }
    ],
    point: "事前にお知らせチラシが投函されており、社員証を見せ、費用の請求や商品の販売を一切行わない点検は正規の安全点検です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.entrance,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.gasInspectionReal,
    desc: "正規のガス点検員が無料点検に訪れた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "社員証と事前のチラシを確かめ、立ち会いのもとで点検を受けて確認印を押す", money: 0, principleTag: "safe", explain: "正解！【正規の確かめ方】事前通知と社員証を確かめ、本物の安全点検を正しく受けることができました！" }
    ],
    wrongChoices: [
      { text: "点検員に「上がってお茶でも飲んで」と家計簿や通帳、家族の予定表を見せる", money: -12000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】正規の点検員であっても、不要な個人情報や通帳などを人に見せるのは危険です。" },
      { text: "点検員に「点検代のお礼」として現金を無理やり手渡そうとする", money: -10000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】正規の点検は完全無料です。不要なお金のやり取りでトラブルになりました。" },
      { text: "「訪問者はすべて詐欺師だ！」と怒鳴りつけて安全点検を完全に拒否する", money: -8000, principleTag: "fooled", damageType: "money", explain: "【誤解による損】法律で定められた大切な安全点検を受けず、ガス警報器の再検査費用がかかりました。" }
    ]
  },
  {
    id: "senior_q11", category: "scam", source: "固定電話", title: "年金受け取り手続き代行に関するご案内",
    characterName: "年金手続き代行窓口",
    narration: "電話がありました。\n「年金の重要な受け取り手続きが漏れております。口座番号と暗証番号を教えてください。」",
    dialogue: [
      { speaker: "電話の相手", line: "「本日中に登録しないと年金が受け取れなくなりますよ。」" },
      { speaker: "あなた", line: "（年金に関する連絡だ…どう対応すべきか？）" }
    ],
    point: "日本年金機構などの公的機関が、電話で銀行の暗証番号を聞き出すことは絶対にありません！",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.pensionProcedureScam,
    desc: "電話で口座情報と暗証番号を聞かれた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "電話では情報を一切伝えず、日本年金機構や地域の年金事務所へ自分で電話番号を調べて電話で確かめる", money: 0, principleTag: "safe", explain: "正解！【話さない・年金事務所へ電話して確かめる】年金手続きを口実にした口座情報狙いの詐欺です。暗証番号を教えず正解！" }
    ],
    wrongChoices: [
      { text: "未払い年金を受け取るため、銀行名・口座番号・キャッシュカード暗証番号を電話で伝える", money: -30000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】口座情報を悪用され、預金口座からお金が全額引き出されてしまいました。" },
      { text: "「手続き代行費用」として指定された口座へ2万円を先に振り込む", money: -25000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】代行費用を騙し取られ、年金の手続きも一切行われませんでした。" },
      { text: "「今日中に登録しないと受け取れなくなる」と言われて焦り、相手の電話指示に従って行動する", money: -20000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】自宅に来た偽職員にキャッシュカードを手渡し、全額盗まれてしまいました。" }
    ]
  },
  {
    id: "senior_q12", category: "scam", source: "携帯のショートメール（SMS）", title: "【不在通知】お荷物の持ち帰りについて",
    characterName: "偽宅配ショートメール",
    narration: "スマホのショートメール（SMS）に通知が届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "SMS通知", line: "【不在通知】お荷物を持ち帰りました。再配達指定はこちらからご確認ください。" },
      { speaker: "あなた", line: "（荷物の不在通知だ…確かめてみよう。）" }
    ],
    point: "ショートメール（SMS）に書かれたURLを押すと、危険な偽アプリを入れられたり、暗証番号を盗み取られます。",
    notification: "📱ピコン 新着メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.deliverySmishingScam,
    desc: "不在通知のショートメールが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "メールの中のURL（青い文字）は絶対に押さず、そのままメッセージを削除する", money: 0, principleTag: "safe", explain: "正解！【騙されない・偽メール遮断】ショートメールを使った詐欺です。URLを押さずに削除するのが鉄則！" }
    ],
    wrongChoices: [
      { text: "開いた偽画面で、携帯電話番号や暗証番号、スマホのIDとパスワードを入力する", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】偽サイトにパスワードを盗まれ、身に覚えのない買い物の請求被害に遭いました。" },
      { text: "「再配達手数料500円」の請求画面が出たため、クレジットカード情報を入力して支払う", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】カード情報を盗み取られ、海外サイトで不正利用されてしまいました。" },
      { text: "何が届いたか気になるので、メールに書かれたURLを押して画面を開く", money: -15000, principleTag: "fooled", damageType: "personal_info", explain: "【相手に騙された！】不正な偽アプリが勝手に入り、スマホを遠隔操作されてしまいました。" }
    ]
  },
  {
    id: "senior_q13", category: "scam", source: "パソコン・タブレット", title: "パソコンに表示された警告画面",
    characterName: "偽の警告画面",
    narration: "パソコンの画面に突然警告が表示されました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "警告画面", line: "【警告】システムがウイルスに感染しました。直ちにサポート窓口へ電話してください。" },
      { speaker: "あなた", line: "（警告音が鳴っている…どう対応すべきか？）" }
    ],
    point: "大音量の警告音や画面いっぱいの警告は、インターネット画面上に出ているだけの偽物（サポート詐欺）です。表示された番号に電話をかけてはいけません。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.supportScam,
    desc: "パソコンに警告画面が表示された。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "画面の電話番号には絶対に電話せず、画面を閉じる（またはパソコンを再起動する）", money: 0, principleTag: "safe", explain: "正解！【騙されない・電話をかけず閉じる】画面に表示されているだけの偽警告です。電話をかけずに閉じれば安全です！" }
    ],
    wrongChoices: [
      { text: "電話の相手にパソコンの遠隔操作を許可し、パソコン内の住所録や通帳の写真データを見せる", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】パソコン内の個人情報をすべて抜き取られ、悪用されてしまいました。" },
      { text: "パソコンを直すため、指示された通りコンビニで30,000円分の電子マネーを買って番号を伝える", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】サポート詐欺です！そもそもウイルスなどなく、お金だけを騙し取られてしまいました。" },
      { text: "パソコンが壊れると困るので、画面に表示された電話番号へすぐに電話をかける", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】電話の相手に遠隔操作ソフトを入れられ、設定を勝手に変えられてお金を要求されました。" }
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
    point: "国税庁や税務署がメールやSMSで納税通知を送ったり、インターネット画面から電子マネーで支払わせることは絶対にありません。",
    notification: "📱ピコン 新着通知が届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.taxSeizureScam,
    desc: "税金の未納通知が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "「国の機関がメールで支払いを迫ることはない」と判断し、リンクを開かず削除して税務署へ電話して確かめる", money: 0, principleTag: "safe", explain: "正解！【騙されない・税務署へ電話して確かめる】国税庁を装った典型的な偽メール詐欺です。落ち着いて無視して正解！" }
    ],
    wrongChoices: [
      { text: "差し押さえを解除するため、リンク先でクレジットカード番号や裏面の3桁の番号を入力する", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】偽サイト詐欺です！カード情報が盗まれ、高額な不正利用被害に遭いました。" },
      { text: "差し押さえられたら大変だから、指定されたサイトから電子マネーで税金を支払う", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】偽の納税サイトにお金を騙し取られてしまいました。" },
      { text: "メール記載の「納税相談窓口」へ電話をかけ、未納の内訳を教えてもらう", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽の職員に繋がり、「延滞料金を免除するからすぐ振り込め」と騙されました。" }
    ]
  },
  {
    id: "senior_q15", category: "real", source: "携帯のショートメール（SMS）", title: "【携帯会社】月額ご利用料金確定のお知らせ",
    characterName: "携帯会社公式",
    narration: "スマホにショートメール（SMS）が届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "携帯会社通知", line: "【お知らせ】今月のご請求金額が確定いたしました。公式アプリよりご確認ください。" },
      { speaker: "あなた", line: "（毎月の請求案内だ。確かめてみよう。）" }
    ],
    point: "本文に直接ログイン用URLを載せず、「公式アプリやブックマークからご確認ください」と案内する通知は本物の公式通知です。",
    notification: "📱ピコン 新着メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.mobileBillReal,
    desc: "携帯料金の確定通知が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "いつも使っている公式アプリまたはブックマークから会員ページを開き、料金を確かめる", money: 0, principleTag: "safe", explain: "正解！【正規の確かめ方】本物の通知を落ち着いて公式アプリから確かめることができました！" }
    ],
    wrongChoices: [
      { text: "届いたメッセージに返信して、自分の名前・携帯の暗証番号・クレジットカード番号を送る", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】返信して暗証番号やカード番号を送るのは大変危険です。情報漏れの恐れがあります。" },
      { text: "「料金支払い」と思い込み、ネットで見つけた怪しい決済窓口へお金を振り込む", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】口座引き落としになっているのに、関係のない偽窓口へ二重支払いしてしまいました。" },
      { text: "「ショートメールはすべて詐欺に違いない」と思い込み、携帯ショップへ怒鳴り込みに行く", money: -8000, principleTag: "fooled", damageType: "money", explain: "【誤解による損】本物のお知らせに過剰反応し、ショップ窓口での不要な手続き費用が発生しました。" }
    ]
  },
  {
    id: "senior_q16", category: "real", source: "Eメール", title: "【〇〇カード】今月のご利用明細確定のご案内",
    characterName: "カード会社公式",
    narration: "カード会社からメールが届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "カード会社通知", line: "【〇〇カード】今月のご利用代金明細書を作成いたしました。公式サイトよりご確認ください。" },
      { speaker: "あなた", line: "（カード明細の案内だ。確かめてみよう。）" }
    ],
    point: "定期的な利用明細の確定通知であり、個人情報やカード番号の入力を急かす文面がないものは本物の正規連絡です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.cardStatementReal,
    desc: "カードの利用明細案内が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "普段から登録してあるカード会社の公式サイトへログインして明細を確かめる", money: 0, principleTag: "safe", explain: "正解！【正規の確かめ方】本物の案内を自ら安全なブックマーク経由で確かめられました！" }
    ],
    wrongChoices: [
      { text: "メールに返信して、自分のカード番号と暗証番号を書いて「明細を郵送してください」と送る", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】メールで暗証番号を送るのは極めて危険です。情報流出被害に遭いました。" },
      { text: "「明細発行手数料」と勘違いし、ネットで見つけた怪しい口座へ振り込みを行う", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】正規の会員ページでの明細確認は無料です。不要なお金を騙し取られてしまいました。" },
      { text: "メールを放置し、身に覚えのない請求がないかどうかも一切確認しない", money: -8000, principleTag: "fooled", damageType: "money", explain: "【誤解による損】定期的な明細の確認を怠ると、万が一の不正利用の発見が遅れてしまいます。" }
    ]
  }
];