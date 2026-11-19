/* =========================================================
   data-teen.js
   中高生モード専用問題プール（全16問）
   【一般名称統一・誤記修正・金額矛盾解消版】
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
    point: "有名人を騙る偽アカウントです。「無料プレゼント」を口実に個人情報やクレジットカード情報を盗む手口に注意しましょう。",
    notification: "📱ピコン 当選DMが届きました",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenFakeGiftScam,
    desc: "SNSでプレゼント当選のDMが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "DMのリンクは開かず、本物の配信者の公式アカウント（IDや認証マーク）で企画の有無を確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・公式確認】アイコンを真似た偽アカウントです。公式マークやユーザーIDで正しく見破れました！" }
    ],
    wrongChoices: [
      { text: "プレゼント発送フォームに、自分の氏名・自宅住所・親のクレジットカード番号を入力する", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】個人情報とカード番号を盗まれ、海外サイトで25,000円分不正決済されました。" },
      { text: "「送料500円なら安い」とスマホ決済や電子マネーで指定された相手に送金する", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】お金を払っても商品は一切届かず、「通関手数料」とさらに要求されました。" },
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
      { speaker: "連絡通知", line: "荷物を持ち帰りました。再配達のご依頼は公式アプリまたは公式サイトよりお願いいたします。" },
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
      { text: "メールに返信して、自分の住所・電話番号・クレジットカード番号を送る", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】再配達にカード番号は不要です！送信専用アドレス宛に個人情報を流出させました。" },
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
      { text: "電話を代わり、おばあさんの代わりに口座番号や暗証番号を電話口で伝える", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】暗証番号を犯人に教えてしまい、おばあさんの預金を全額奪わせてしまいました。" },
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
      { text: "ドアを開けずに「分かりません。結構です」と一言で断る", money: 0, principleTag: "safe", explain: "正解！【喋らない・家に入れない】突然の点検業者は理由を告げずきっぱり断るのが鉄則です！" }
    ],
    wrongChoices: [
      { text: "「今親が留守なので、親の携帯電話番号と帰宅時間を教えます」と伝える", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】親の連絡先と留守時間を教えてしまい、執拗な脅迫電話を受けるようになりました。" },
      { text: "「仮押さえ費用として1万円前払いが必要」と言われ、財布から手渡す", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】お金を手渡した瞬間に業者は立ち去り、1円も戻りませんでした。" },
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
      { text: "電話をかけ直し、家族の口座の暗証番号や預金残高を相手にすべて伝える", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】口座情報を教えてしまい、預金を不正引き出しされてしまいました。" },
      { text: "逮捕されたら大変だから、お母さんと一緒に銀行へ行って急いで振り込む", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】家族の大切な貯金30,000円が騙し取られてしまいました。" },
      { text: "電話の相手から「捜査の妨害をするな」と脅され、怖くなってそのまま様子を見る", money: -20000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】犯人の脅迫を信じてしまい、お母さんはパニックのまま送金してしまいました。" }
    ]
  },
  {
    id: "teen_q09", category: "real", source: "公式SNS投稿", title: "【公式SNS】大型アップデート記念キャンペーン",
    characterName: "ゲーム公式SNS",
    narration: "SNSを見ていると、ゲームの投稿が流れてきました。\n画面の内容を確認してみよう。",
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
      { text: "投稿の返信欄に、自分のゲームIDと引き継ぎパスワードを書き込む", money: -25000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】公開された引き継ぎコードを見られてアカウントを奪われてしまいました。" },
      { text: "「受け取り手数料が必要」と便乗してきた偽アカウントにお金を送金する", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】公式に便乗した詐欺アカウントにお金を騙し取られてしまいました。" },
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
    id: "teen_q11", category: "scam", source: "写真SNSのDM", title: "【DM】SNSのフォロワーからのメッセージ",
    characterName: "親密なフォロワー",
    narration: "写真SNSで、相互フォローの相手からメッセージが届きました。\n画面の内容を確認してみよう。",
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
      { text: "口座開設のために、自分の運転免許証や保険証の写真を送る", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】身分証が悪用され、闇バイトの契約や偽口座開設に使われてしまいました。" },
      { text: "友達もフォローしているから信用し、お小遣いの1万円を指定口座へ入金してみる", money: -25000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】投資詐欺です！入金したお金は引き出せず、さらに追加請求されました。" },
      { text: "「本当にお金が増えた実績を見せて」と頼んで相手の説明を詳しく聞く", money: -12000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽の残高画面画像を見せられて信じ込み、結局お金を払ってしまいました。" }
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
      { speaker: "譲渡希望者", line: "「スマホ決済で先払い確認後に電子チケットを分配します！」" },
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
      { text: "取引の保証のためと言われ、自分の名前・電話番号・学生証の写真を送る", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】自分の身分証画像が悪用され、別のチケット詐欺のなりすましに使われました。" },
      { text: "チケットが欲しいので、言われた通りスマホ決済で代金12,000円を相手に先払いする", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】チケット詐欺です！送金した瞬間にアカウントをブロックされ逃げられました。" },
      { text: "相手から送られてきた「身分証の写真」を見て本物だと信じ込み取引を進める", money: -18000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】身分証は他人の拾い画像でした。信用して送金したお金は全額奪われました。" }
    ]
  },
  {
    id: "teen_q15", category: "scam", source: "写真SNSのDM", title: "【警告】著作権侵害に関する申し立て通知",
    characterName: "偽著作権サポート",
    narration: "SNSに、警告のダイレクトメッセージが届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "偽サポート", line: "【著作権侵害】24時間以内にリンクから異議申し立てを行ってください。" },
      { speaker: "主人公", line: "「アカウントが削除されるって書いてある…どうしよう？」" }
    ],
    point: "「アカウント削除」でパニックにさせ、偽ログイン画面にパスワードを入力させて乗っ取るフィッシング詐欺です。",
    notification: "📱ピコン 【警告】著作権侵害通知",
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.teenCopyrightScam,
    desc: "著作権侵害の警告DMが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "DM内のリンクは開かず、公式アプリの正規の「設定・アカウントステータス」画面から確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・公式設定で確認】アカウント乗っ取りを狙うフィッシング詐欺です。公式画面から確認して正解！" }
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