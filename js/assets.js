/* =========================================================
   assets.js
   画像アセット・ファイルパス定義
   （大人主人公・新NPC・証拠スクショ完全同期版）
   ========================================================= */

const IMG_BASE = "images/";

const IMAGE_ASSETS = {

  // 背景画像
  backgrounds: {
    schoolRoute:              IMG_BASE + "学校の通学路.jpeg",
    schoolRoute2:             IMG_BASE + "通学路.jpg",
    schoolRoute3:             IMG_BASE + "通学路2 .jpg",
    schoolRoute4:             IMG_BASE + "通学路3 .jpg",
    school:                   IMG_BASE + "学校.jpeg",
    school2:                  IMG_BASE + "学校2 .jpeg",
    schoolCorridor:           IMG_BASE + "学校外廊下.jpg",
    livingRoom:               IMG_BASE + "リビング.jpg",
    myRoom:                   IMG_BASE + "自分の部屋.jpg",
    myRoom2:                  IMG_BASE + "部屋2 .jpg",
    entrance:                 IMG_BASE + "玄関.jpg",
    policeStation:            IMG_BASE + "警察署.jpg",
    atm:                      IMG_BASE + "ATM.jpeg",
    convenienceStoreFallback: IMG_BASE + "ショッピングモール.jpg",
    secretBase:               IMG_BASE + "秘密基地（使わないかも）.jpg"
  },

  // キャラクター立ち絵
  characters: {
    // ジョーくん（全9表情）
    joe:               IMG_BASE + "ジョー君通常.png",
    joeHappy:          IMG_BASE + "ジョー君喜.png",
    joeSad:            IMG_BASE + "ジョー君哀.png",
    joeSurprised:      IMG_BASE + "ジョー君驚き.png",
    joeThinking:       IMG_BASE + "ジョー君考える.png",
    joeCheer:          IMG_BASE + "ジョー君応援.png",
    joeWorry:          IMG_BASE + "ジョー君困り.png",
    joeAngry:          IMG_BASE + "ジョー君怒.png",
    joeRelax:          IMG_BASE + "ジョー君楽.png",

    // 学生主人公（小学生・中高生モード用）
    studentNeutral:    IMG_BASE + "普通主人公.png",
    studentHappy:      IMG_BASE + "主人公喜び.png",
    studentSad:        IMG_BASE + "主人公泣き.png",
    studentQuestion:   IMG_BASE + "主人公疑問.png",
    studentWorry:      IMG_BASE + "主人公困り.png",
    studentWalking:    IMG_BASE + "通学主人公.png",
    studentSmartphone: IMG_BASE + "携帯みる主人公.png",

    // 一般（大人）主人公（大人モード用）
    adultNeutral:      IMG_BASE + "一般主人公.png",
    adultHappy:        IMG_BASE + "一般主人公喜.png",
    adultSad:          IMG_BASE + "一般主人公哀.png",
    adultQuestion:     IMG_BASE + "一般主人公考える.png",
    adultThinking:     IMG_BASE + "一般主人公考える.png",
    adultWorry:        IMG_BASE + "一般主人公哀.png",
    adultWalking:      IMG_BASE + "一般主人公.png",
    adultSmartphone:   IMG_BASE + "一般主人公仕事中.png",
    adultAngry:        IMG_BASE + "一般主人公怒.png",

    // 高齢者主人公（高齢者モード用）
    seniorNeutral:     IMG_BASE + "高齢者.png",
    seniorHappy:       IMG_BASE + "高齢者笑顔.png",
    seniorSad:         IMG_BASE + "困っている高齢者.png",
    seniorQuestion:    IMG_BASE + "高齢者.png",
    seniorWorry:       IMG_BASE + "困っている高齢者.png",
    seniorWalking:     IMG_BASE + "高齢者.png",
    seniorSmartphone:  IMG_BASE + "高齢者笑顔.png",

    // NPC・家族・同僚・作業員・店員
    colleagueTroubled: IMG_BASE + "困ってる同僚.png",
    workerLabor:       IMG_BASE + "作業員.png",
    fireTruck:         IMG_BASE + "消防車.png",
    workerGas:         IMG_BASE + "コンビニ店員.png",
    elderlyWomanCane:  IMG_BASE + "困っている高齢者.png",
    elderlyWoman:      IMG_BASE + "高齢者.png",
    elderlyManGlasses: IMG_BASE + "高齢者笑顔.png",
    motherWorried:     IMG_BASE + "親困り.png",
    motherSmile:       IMG_BASE + "親笑顔.png",
    silhouette:        IMG_BASE + "シルエット.png"
  },

  // 証拠スクリーンショット・資料画像（4モード完全直結）
  screenshots: {

    // ── 【小学生モード用（13枚）】 ──
    elementaryPoliceMailScam:         IMG_BASE + "小学生_偽警察メール詐欺.jpg",
    elementaryGamePrizeScam:          IMG_BASE + "小学生_ゲーム機当選詐欺.jpg",
    elementaryFriendImpersonationScam: IMG_BASE + "小学生_友達なりすまし詐欺.jpg",
    elementaryDiscountAdScam:         IMG_BASE + "小学生_イヤホン広告詐欺.jpg",
    elementaryMoneyInviteScam:        IMG_BASE + "小学生_お金あげる詐欺.jpg",
    elementaryGameCoinScam:           IMG_BASE + "小学生_ゲームコイン裏ワザ詐欺.jpg",
    elementaryScreenShareScam:        IMG_BASE + "小学生_画面共有チート詐欺.jpg",
    elementaryYoutuberSignScam:       IMG_BASE + "小学生_YouTuberサインDM詐欺.jpg",
    elementaryGachaCodeScam:          IMG_BASE + "小学生_無料ガチャコード詐欺.jpg",
    elementaryEasyMoneyScam:          IMG_BASE + "小学生_簡単副業広告詐欺.jpg",
    elementarySummerGameCampaignReal: IMG_BASE + "小学生_夏休みゲーム広告本物.jpg",
    elementaryDeliveryNoticeReal:     IMG_BASE + "小学生_宅配不在通知本物.jpg",
    elementarySummerCouponReal:       IMG_BASE + "小学生_夏休みクーポン本物.jpg",

    // ── 【中高生モード用（13枚）】 ──
    teenPoliceFreezeScam:             IMG_BASE + "中高生_偽警察口座凍結詐欺.jpg",
    teenFakeGiftScam:                 IMG_BASE + "中高生_偽プレゼントDM詐欺.jpg",
    teenDataNoticeReal:               IMG_BASE + "中高生_通信量通知本物.jpg",
    teenDeliveryNoticeReal:           IMG_BASE + "中高生_宅配不在通知本物.jpg",
    teenFriendMoneyScam:              IMG_BASE + "中高生_友達なりすましWebMoney詐欺.jpg",
    teenGameCampaignReal:             IMG_BASE + "中高生_ゲーム公式キャンペーン本物.jpg",
    teenOverseasCallScam:             IMG_BASE + "中高生_国外不審電話詐欺.jpg",
    teenInvestmentDmscam:             IMG_BASE + "中高生_SNS投資勧誘詐欺.jpg",
    teenIdolGoodsScam:                IMG_BASE + "中高生_アイドルグッズ通販詐欺.jpg",
    teenDarkJobScam:                  IMG_BASE + "中高生_闇バイト募集詐欺.jpg",
    teenTicketResaleScam:             IMG_BASE + "中高生_チケット転売詐欺.jpg",
    teenCopyrightScam:                IMG_BASE + "中高生_著作権警告詐欺.jpg",
    teenAiFakeAdScam:                 IMG_BASE + "中高生_AI有名人偽広告.jpg",

    // ── 【一般（大人）モード用（14枚）】 ──
    subscriptionScam:                 IMG_BASE + "一般_サブスク自動更新詐欺.jpg",
    taxRefundScam:                    IMG_BASE + "一般_eTax還付金詐欺.jpg",
    bankOtpScam:                      IMG_BASE + "銀行ワンタイム詐欺.jpg",
    fakeArrestWarrant:                IMG_BASE + "一般_偽警察逮捕状詐欺.jpg",
    investmentGroupScam:              IMG_BASE + "一般_投資勉強会詐欺.jpg",
    insuranceRepairScam:              IMG_BASE + "一般_火災保険リフォーム詐欺.jpg",
    adultCardStatementReal:           IMG_BASE + "一般_カード明細通知本物.jpg",
    supportScamHelp:                  IMG_BASE + "一般_サポート詐欺助ける.jpg",
    customsFeeScam:                   IMG_BASE + "一般_税関関税未納詐欺.jpg",
    mynaPortalScam:                   IMG_BASE + "一般_マイナポータル詐欺.jpg",
    utilityStopScam:                  IMG_BASE + "一般_電気ガス供給停止詐欺.jpg",
    businessInvoiceScam:              IMG_BASE + "一般_偽請求書ビジネスメール.jpg",
    adultRomanceChatScam:             IMG_BASE + "一般_ロマンス詐欺.jpg",
    hotelBookingScam:                 IMG_BASE + "一般_ホテル予約詐欺.jpg",
    cardFraudPhishing:                IMG_BASE + "一般_カード不正利用詐欺.jpg",

    // ── 【高齢者モード用（12枚）】 ──
    fakePoliceLineScam:               IMG_BASE + "高齢者_警察官騙り逮捕状詐欺.jpg",
    benefitScam:                      IMG_BASE + "高齢者_市役所還付金詐欺.jpg",
    electricityPlanScam:              IMG_BASE + "高齢者_電力プラン契約詐欺.jpg",
    bankMaturityReal:                 IMG_BASE + "高齢者_銀行満期案内本物.jpg",
    waterPurifierScam:                IMG_BASE + "高齢者_水道局騙り浄水器詐欺.jpg",
    gasInspectionReal:                IMG_BASE + "高齢者_ガス定期点検本物.jpg",
    pensionProcedureScam:             IMG_BASE + "高齢者_年金手続き詐欺.jpg",
    deliverySmishingScam:             IMG_BASE + "高齢者_宅配スミッシング.jpg",
    supportScam:                      IMG_BASE + "高齢者_サポート詐欺.jpg",
    taxSeizureScam:                   IMG_BASE + "高齢者_国税庁差押メール詐欺.jpg",
    mobileBillReal:                   IMG_BASE + "高齢者_携帯料金通知本物.jpg",
    cardStatementReal:                IMG_BASE + "高齢者_カード明細通知本物.jpg"
  }
};