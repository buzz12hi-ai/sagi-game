/* =========================================================
   assets.js
   -----------------------------------------------------------
   画像パス定義（Finder最新画像素材・拡張子完全同期版）
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
    joe:          IMG_BASE + "ジョー君通常.png",
    joeHappy:     IMG_BASE + "ジョー君喜.png",
    joeSad:       IMG_BASE + "ジョー君哀.png",
    joeSurprised: IMG_BASE + "ジョー君驚き.png",
    joeThinking:  IMG_BASE + "ジョー君考える.png",
    joeCheer:     IMG_BASE + "ジョー君応援.png",
    joeWorry:     IMG_BASE + "ジョー君困り.png",
    joeAngry:     IMG_BASE + "ジョー君怒.png",
    joeRelax:     IMG_BASE + "ジョー君楽.png",

    // 学生主人公（小学生・中高生・一般大人モード用）
    studentNeutral:    IMG_BASE + "普通主人公.png",
    studentHappy:      IMG_BASE + "主人公喜び.png",
    studentSad:        IMG_BASE + "主人公泣き.png",
    studentQuestion:   IMG_BASE + "主人公疑問.png",
    studentWorry:      IMG_BASE + "主人公困り.png",
    studentWalking:    IMG_BASE + "通学主人公.png",
    studentSmartphone: IMG_BASE + "携帯みる主人公.png",

    // 高齢者主人公（高齢者モード用）
    seniorNeutral:     IMG_BASE + "高齢者.png",
    seniorHappy:       IMG_BASE + "高齢者笑顔.png",
    seniorSad:         IMG_BASE + "困っている高齢者.png",
    seniorQuestion:    IMG_BASE + "高齢者.png",
    seniorWorry:       IMG_BASE + "困っている高齢者.png",
    seniorWalking:     IMG_BASE + "高齢者.png",
    seniorSmartphone:  IMG_BASE + "高齢者笑顔.png",

    // NPC・親・詐欺師（実在拡張子に完全同期）
    suspiciousVisitor: IMG_BASE + "点検商法詐欺師.png",
    workerGas:         IMG_BASE + "コンビニ店員.png",
    elderlyWomanCane:  IMG_BASE + "困っている高齢者.png",
    elderlyWoman:      IMG_BASE + "高齢者.png",
    elderlyManGlasses: IMG_BASE + "高齢者笑顔.png",
    motherWorried:     IMG_BASE + "親困り.png",
    motherSmile:       IMG_BASE + "親笑顔.png",
    silhouette:        IMG_BASE + "シルエット.png"
  },

  // スマホ画面・スクリーンショット・資料画像（新規追加分を完全網羅）
  screenshots: {
    // 既存素材
    gmailPolice:        IMG_BASE + "偽警察詐欺.png",
    gmailDelivery:      IMG_BASE + "宅配メール.png",
    instagram:          IMG_BASE + "なりすまし詐欺.png",
    gameAppNotice:      IMG_BASE + "ゲーム広告本物.png",
    shoppingAd:         IMG_BASE + "ショッピング広告詐欺.jpg",
    lineSidejob:        IMG_BASE + "投資詐欺.png",
    lineOfficial:       IMG_BASE + "LINE公式.jpg",
    phoneCall:          IMG_BASE + "詐欺電話.png",
    phoneShop:          IMG_BASE + "携帯ショップ電話.png",
    romanceHome:        IMG_BASE + "ロマンス詐欺ホーム.jpg",
    romanceTalk:        IMG_BASE + "ロマンス詐欺トーク.png",
    favGoods:           IMG_BASE + "推し活ショッピング詐欺.jpg",
    adScam:             IMG_BASE + "広告詐欺？ .png",
    tiktokAd:           IMG_BASE + "TikTok広告詐欺.jpg",
    youtuberScam:       IMG_BASE + "YouTuberなりすまし詐欺.jpg",
    gameAdScam:         IMG_BASE + "ゲーム広告詐欺.jpg",
    dataNotice:         IMG_BASE + "通信量通知本物.jpg",

    // 新規追加素材（Finder実ファイル名と完全一致）
    gameCoinScam:       IMG_BASE + "ゲームコイン裏ワザ詐欺.jpg",
    youtuberDmScam:     IMG_BASE + "YouTuber サイン DM 詐欺.jpg",
    gachaCodeScam:      IMG_BASE + "無料ガチャコード詐欺.jpg",
    darkJobScam:        IMG_BASE + "闇バイト募集詐欺.jpg",
    ticketResaleScam:   IMG_BASE + "チケット転売詐欺.jpg",
    copyrightDmScam:    IMG_BASE + "著作権警告詐欺.jpg",
    aiFakeAdScam:       IMG_BASE + "AI 有名人偽広告.jpg",
    etaxScam:           IMG_BASE + "eTax還付金詐欺.jpg",
    mynaPortalScam:     IMG_BASE + "マイナポータル詐欺.jpg",
    bankOtpScam:        IMG_BASE + "銀行ワンタイム詐欺.jpg",
    utilityScam:        IMG_BASE + "電気ガス供給停止詐欺.jpg",
    cryptoStakingScam:  IMG_BASE + "暗号資産ステーキング詐欺.jpg",
    travelCancelScam:   IMG_BASE + "偽ホテル予約キャンセル詐欺.jpg",
    policeOrgScam:      IMG_BASE + "警察機関偽装詐欺.jpg",
    customsScam:        IMG_BASE + "税関関税未納詐欺.jpg",
    seniorTaxScam:      IMG_BASE + "国税庁差押メール.jpg",
    seniorPensionSms:   IMG_BASE + "年金給付金SMS.jpg",
    seniorPipeCleanFlyer: IMG_BASE + "排水管清掃チラシ.jpg"
  }
};