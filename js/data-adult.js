/* =========================================================
   data-adult.js
   一般（大人）モード専用問題プール（全16問）
   【一般名称統一・誤記修正版】
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
      { text: "引き落とされたら困るので、SMSに記載された解約窓口の番号へ直ちに電話をかける", money: -20000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】詐欺グループに繋がり、「解約には保証金が必要」と言われお金を騙し取られました。" }
    ]
  },
  {
    id: "adult_q02", category: "scam", source: "Eメール", title: "【国税庁】過年度税額還付のご案内",
    characterName: "国税庁税務相談課",
    narration: "メールボックスに1通のメールが届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "電子納税通知メール", line: "【重要】還付金の送金準備が完了いたしました。下記リンクより口座情報を照会してください。" },
      { speaker: "あなた", line: "（国税庁からの還付金案内だ。確認してみよう。）" }
    ],
    point: "国税庁や税務署がメールの直リンクから口座情報やカード番号、暗証番号を入力させることは絶対にありません。",
    notification: "📱ピコン 新着メールが届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.taxRefundScam,
    desc: "国税庁からの還付金案内メールが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "メールのリンクは一切開かず、検索等で直接開いた国税庁の正規電子納税マイページから通知を確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・公式サイト照会】フィッシング詐欺です。公的機関の重要通知は自発的に公式サイトへログインして確認！" }
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
    point: "「不正利用検知」で焦らせ、本物の銀行から届いたワンタイムパスワードを入力させて不正送金する手口です。",
    notification: "📱ピコン 新着メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.bankOtpScam,
    desc: "銀行からの取引規制SMSが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "SMSのリンクは絶対に開かず、普段使っている正規の公式バンキングアプリを直接起動して状況を確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・公式アプリ確認】ワンタイムパスワード搾取型フィッシング詐欺です。公式アプリから直接確認して完全防御！" }
    ],
    wrongChoices: [
      { text: "規制を解除するため、リンク先で口座番号と届いたワンタイムパスワードを入力する", money: -30000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】入力した瞬間に犯人側で送金が実行され、口座から30,000円が即座に不正送金されました。" },
      { text: "「セキュリティ解除手数料」が必要と表示されたため、指定口座へ振り込みを行う", money: -25000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】解除手数料名目でお金を奪われ、さらに追加送金を要求されました。" },
      { text: "SMSに記載されたセキュリティセンターの番号へ電話して指示を仰ぐ", money: -18000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】犯人に繋がり、「一時的な安全口座」にお金を全額移すよう指示され騙し取られました。" }
    ]
  },
  {
    id: "adult_q04", category: "scam", source: "電話・メッセージアプリ誘導", title: "【重要】捜査手続きに関するご連絡",
    characterName: "警察庁捜査二課",
    narration: "警察を名乗る人物から電話があり、メッセージアプリを追加するよう指示されました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "自称・捜査官", line: "「保釈保証金としてこちらの指定口座へ一時供託してください。」" },
      { speaker: "あなた", line: "（書類の画像が送られてきた…どう対応すべきか？）" }
    ],
    point: "警察がメッセージアプリ（SNS）で事情聴取を行ったり、逮捕状の画像を送ったり、保釈金を振り込ませることは100%ありません。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.fakeArrestWarrant,
    desc: "警察を名乗る人物からメッセージアプリで書類が届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "指示には一切従わず通話を切り、相手の連絡先ではなく自ら調べた警察署の代表番号へ通報・照会する", money: 0, principleTag: "safe", explain: "正解！【騙されない・警察へ確認】SNS誘導型の偽警察詐欺です。警察がアプリ上で金銭を要求することは絶対にありません！" }
    ],
    wrongChoices: [
      { text: "身の潔白を証明するため、自分の身分証の両面写真と銀行口座情報をメッセージアプリで送る", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】身分証が悪用されて偽の銀行口座を作られ、犯罪インフラとして売買されました。" },
      { text: "逮捕されるのが怖いので、指示された指定口座へ保証金の一部を急いで振り込む", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】特殊詐欺です！振り込んだ保証金30,000円はそのまま奪われ、逃げられました。" },
      { text: "アプリ通話で相手の警察官（自称）の取り調べを受け、相手の指示通りに資産状況を説明する", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】巧みに言いくるめられて資産を特定され、全額送金させられてしまいました。" }
    ]
  },
  {
    id: "adult_q05", category: "scam", source: "SNS広告・メッセージアプリ", title: "【招待】著名アナリスト限定投資勉強会",
    characterName: "有名アナリストアシスタント",
    narration: "SNS広告からメッセージアプリのグループに案内されました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "グループ管理者", line: "「明日公開の銘柄です。こちらの専用プラットフォームへご入金ください。」" },
      { speaker: "あなた", line: "（グループ内で多くの人がやり取りしているな…）" }
    ],
    point: "有名人の肖像を無断悪用した偽広告からグループへ誘導し、サクラ全員で煽って入金させる「SNS型投資詐欺」です。",
    notification: "📱ピコン グループへの招待が届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.investmentGroupScam,
    desc: "メッセージアプリのグループで投資案内が行われている。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "著名人の公式SNSやニュースで投資詐欺の注意喚起を確認し、グループを即座に退会・通報する", money: 0, principleTag: "safe", explain: "正解！【騙されない・公式確認】SNS型投資詐欺です。グループ内の「儲かった」という投稿はすべてサクラの自作自演！" }
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
      { text: "勧誘はその場できっぱり断り、契約している保険会社に直接相談する", money: 0, principleTag: "safe", explain: "正解！【騙されない・正規保険会社へ相談】不正請求トラブルです。経年劣化を偽る申請は犯罪リスクがあります！" }
    ],
    wrongChoices: [
      { text: "保険証券を見せて、契約内容や保険証券番号を業者にすべて控えさせる", money: -15000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】保険情報を勝手に使われて不正申請され、保険会社から契約解除されました。" },
      { text: "「調査手数料」として、契約前に業者へ30,000円の前払金を支払う", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】前金を払った後、業者と音信不通になりお金を持ち逃げされました。" },
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
      { text: "「それ偽物のサポート詐欺だよ！今すぐ電話を切って、ブラウザを強制終了（または社内情報システム担当へ連絡）しよう！」と同僚を制止する", money: 300, principleTag: "safe", explain: "✨ 職場を救った！【騙されない・強制終了して社内担当へ報告】サポート詐欺です。電話を切らせてブラウザを終了させ、機密流出を防ぎました！（お礼+300円）" }
    ],
    wrongChoices: [
      { text: "サポートの指示に従い、社内ネットワークのログインIDとパスワードを電話で伝える", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】社内IDを漏洩させ、社内サーバーに侵入されて重要機密を窃取されました。" },
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
      { text: "「税関がSMSで直接支払いを迫ることはない」と見抜き、通知のリンクは使わず削除する", money: 0, principleTag: "safe", explain: "正解！【騙されない・偽SMS遮断】税関を騙るSMS詐欺です。ギフトカード決済要求を見事に回避！" }
    ],
    wrongChoices: [
      { text: "荷物照会のため、リンク先でクレジットカード番号やセキュリティコードを入力する", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】フィッシング詐欺です！カード情報が盗まれ、海外サイトで不正利用されました。" },
      { text: "荷物が処分されると困るので、指示された通りギフトカードを買ってコードを送信する", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】コードを即座に奪われ、「延滞料金が追加された」とさらに要求されました。" },
      { text: "SMS記載の配送センターへ電話をかけ、「何の荷物ですか？」と問い合わせる", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽の税関窓口に繋がり、荷物保管料として電子マネーを騙し取られました。" }
    ]
  },
  {
    id: "adult_q11", category: "scam", source: "スマートフォンSMS", title: "【重要】マイナンバーカードに関するお知らせ",
    characterName: "デジタル庁マイナンバー窓口",
    narration: "スマートフォンにSMSが届きました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "SMS通知", line: "【重要】マイナンバーカードの電子証明書の有効期限が切れています。下記リンクより更新手続きをお願いいたします。" },
      { speaker: "あなた", line: "（マイナンバーカードの通知だ…どう対応すべきか？）" }
    ],
    point: "デジタル庁や自治体がSMSでマイナンバーカードの暗証番号やパスワードの再入力を求めることは絶対にありません。",
    notification: "📱ピコン 新着メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.mynaPortalScam,
    desc: "スマホにマイナンバー関連のメッセージが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "メッセージのリンクは開かず、公式のマイナンバー専用アプリまたは市区町村窓口で更新状況を確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・公的窓口で確認】マイナンバー情報を狙うフィッシング詐欺です。更新は正規ルートで確認が鉄則！" }
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
    point: "「本日夕方に電気を止める」など極度の焦りを生む文面はSMS詐欺の典型です。正規の電力会社が事前予告なしにSMSだけで即日送電停止することはありません。",
    notification: "📱ピコン 新着メッセージが届きました",
    bg: IMAGE_ASSETS.backgrounds.livingRoom,
    character: IMAGE_ASSETS.characters.silhouette,
    screenshot: IMAGE_ASSETS.screenshots.utilityStopScam,
    desc: "電力会社を名乗るSMSが届いた。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "SMSのリンクは絶対に開かず、紙の検針票に記載された公式の問い合わせ番号または正規マイページで確認する", money: 0, principleTag: "safe", explain: "正解！【騙されない・正規請求書で確認】ライフライン停止を騙る詐欺です。焦ってリンクから決済せず自発照会！" }
    ],
    wrongChoices: [
      { text: "リンク先で顧客情報を照会するため、契約者氏名・生年月日・クレジットカード番号を入力する", money: -25000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】SMS詐欺です！入力したカード情報が盗まれ、不正利用されました。" },
      { text: "電気が止まると大変なので、リンク先の決済画面から4,980円を急いで支払う", money: -20000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】偽の決済サイトにお金を騙し取られ、カード情報も抜かれてしまいました。" },
      { text: "SMS記載の緊急停止回避ダイヤルに電話し、オペレーターに支払い猶予を相談する", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】偽窓口で「今すぐ電子マネーを買えば猶予する」と言われ、お金を騙し取られてしまいました。" }
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
      { text: "「会ったことのない人物からの金銭要求は詐欺」と見抜き、送金せずにやり取りを中止・通報する", money: 0, principleTag: "safe", explain: "正解！【騙されない・先払いは絶対拒絶】典型的なロマンス詐欺です。会ったことのない相手にお金を送金せず完全回避！" }
    ],
    wrongChoices: [
      { text: "相手を信用し、送金手続きのために自分の銀行口座情報や暗証番号、自宅の住所を教える", money: -20000, principleTag: "speak", damageType: "personal_info", explain: "【喋ってしまった！】口座情報を悪用され、勝手に決済サービスに連携されてお金を抜き取られました。" },
      { text: "会いたい一心で、相手から指定されたスマホ決済や個人口座へ言われた通り30,000円を送金する", money: -30000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】送金した瞬間に相手と連絡が取れなくなり、30,000円を持ち逃げされました。" },
      { text: "「会ったら本当に返してくれる？」とメッセージで質問し、「絶対に返す」という甘い言葉を信じる", money: -15000, principleTag: "fooled", damageType: "money", explain: "【相手に騙された！】言いくるめられて納得させられ、結局お金を振り込んで騙し取られました。" }
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
    point: "身に覚えのない高額な予約メールを送り、「キャンセル料100%」で焦らせて偽の取消フォームへクレジットカード情報を再入力させるフィッシング詐欺です。",
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
    id: "adult_q16", category: "real", source: "クレジットカード会社", title: "【本人認証】オンライン決済の本人認証画面",
    characterName: "カード会社公式認証",
    narration: "公式オンラインストアでノートパソコンを購入し、決済ボタンを押しました。\n画面の内容を確認してみよう。",
    dialogue: [
      { speaker: "認証画面", line: "ご登録のワンタイム認証アプリまたはSMSで届いたワンタイムパスワードをご入力ください。" },
      { speaker: "あなた", line: "（本人認証の画面が表示された。確認してみよう。）" }
    ],
    point: "自らが購入手続きを行っている最中に表示され、決済金額や利用加盟店名が正確に一致している正規の本人認証（3Dセキュア）画面は安全な認証です。",
    notification: null,
    bg: IMAGE_ASSETS.backgrounds.myRoom,
    character: IMAGE_ASSETS.characters.workerGas,
    screenshot: IMAGE_ASSETS.screenshots.cardFraudPhishing,
    desc: "買い物中にカードの本人認証画面が表示された。画像の内容をよく確認して、あなたならどうする？",
    correctChoices: [
      { text: "購入店舗名と請求金額が正しいことを確認した上で、正規のワンタイムパスワードを入力して決済を完了する", money: 0, principleTag: "safe", explain: "正解！【正規確認】自分が操作中の正規な本人認証です。金額と店舗名を確認して安全に購入完了！" }
    ],
    wrongChoices: [
      { text: "届いたワンタイムパスワードをSNSに投稿し、「このコード誰か使っていいよ」と公開する", money: -20000, principleTag: "speak", damageType: "account", explain: "【喋ってしまった！】ワンタイムパスワードを第三者に悪用され、勝手に不正決済されてしまいました。" },
      { text: "「認証代行業者」と称する外部の怪しいサイトにお金を払って認証を代行させようとする", money: -15000, principleTag: "pay", damageType: "money", explain: "【払ってしまった！】不要な代行詐欺にお金を騙し取られ、カード情報も抜き取られました。" },
      { text: "「ワンタイムパスワードの入力画面はすべて詐欺だ」と思い込み、正規の購入手続きを途中で強制破棄する", money: -8000, principleTag: "fooled", damageType: "money", explain: "【誤認拒絶】正規セキュリティ認証への過剰反応です。限定セールの購入権利を失いキャンセル料が発生しました。" }
    ]
  }
];