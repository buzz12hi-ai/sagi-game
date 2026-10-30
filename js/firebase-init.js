/* =========================================================
   firebase-init.js
   Firebase SDK 初期化および認証・接続管理レイヤー
   【実値設定済み】
   ========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSyAwVsRej1WsnbWrQLTrTVYWNf-UEO42Gug",
  authDomain: "sagi-game.firebaseapp.com",
  projectId: "sagi-game",
  storageBucket: "sagi-game.firebasestorage.app",
  messagingSenderId: "478520831741",
  appId: "1:478520831741:web:89824dee8e1c2823b21894",
  measurementId: "G-FWEZR64FW8"
};

const firebaseServiceState = {
  isInitialized: false,
  isAnonymousAuthenticated: false,
  currentUid: null,
  initError: null
};

function isConfigConfigured() {
  return firebaseConfig.apiKey !== "YOUR_API_KEY" &&
         firebaseConfig.projectId !== "YOUR_PROJECT_ID";
}

function initializeFirebaseApp() {
  if (typeof firebase === "undefined") {
    console.warn("[Firebase] SDK が読み込まれていません。ローカル環境として動作します。");
    return false;
  }

  if (!isConfigConfigured()) {
    console.info("[Firebase] 設定値がプレースホルダーです。firebaseConfig を実値に更新するまでクラウド接続は保留されます。");
    return false;
  }

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebaseServiceState.isInitialized = true;
    console.log("[Firebase] 初期化に成功しました。");
    return true;
  } catch (error) {
    firebaseServiceState.initError = error;
    console.error("[Firebase] 初期化中にエラーが発生しました:", error);
    return false;
  }
}

async function autoSignInAnonymously() {
  if (!firebaseServiceState.isInitialized) {
    return null;
  }

  try {
    const auth = firebase.auth();
    if (auth.currentUser) {
      firebaseServiceState.isAnonymousAuthenticated = auth.currentUser.isAnonymous;
      firebaseServiceState.currentUid = auth.currentUser.uid;
      return auth.currentUser;
    }

    const userCredential = await auth.signInAnonymously();
    firebaseServiceState.isAnonymousAuthenticated = true;
    firebaseServiceState.currentUid = userCredential.user.uid;
    console.log("[Firebase Auth] 匿名認証に成功しました。UID:", firebaseServiceState.currentUid);
    return userCredential.user;
  } catch (error) {
    console.warn("[Firebase Auth] 匿名認証に失敗しました:", error);
    return null;
  }
}

function getFirestoreDb() {
  if (!firebaseServiceState.isInitialized || typeof firebase === "undefined") {
    return null;
  }
  try {
    return firebase.firestore();
  } catch (e) {
    return null;
  }
}

function getFirebaseAuth() {
  if (!firebaseServiceState.isInitialized || typeof firebase === "undefined") {
    return null;
  }
  try {
    return firebase.auth();
  } catch (e) {
    return null;
  }
}

function isFirebaseCloudReady() {
  return firebaseServiceState.isInitialized &&
         (firebaseServiceState.isAnonymousAuthenticated || (firebase.auth().currentUser !== null));
}

window.addEventListener("DOMContentLoaded", () => {
  const initialized = initializeFirebaseApp();
  if (initialized) {
    autoSignInAnonymously();
  }
});