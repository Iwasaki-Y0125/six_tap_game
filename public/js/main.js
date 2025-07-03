//todo 3.ダークモードのON/OFF切替ボタン
// 1.HTMLでボタンを設置
// 2.ボタンの要素を取得
const Lbtn = document.getElementById("L-Bbutton");

// saveTheme = ローカルストレージに保存されたテーマ（文字列）
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  // 保存されたテーマを適用
  document.body.classList.add(savedTheme);
  Lbtn.innerText = savedTheme === "dark-mode" ? "ライトモード" : "ダークモード";
} else {
  // 保存がなければ OS の設定に従う
  const isDarkMode = window.matchMedia(
    //CSSのメディアクエリをJSで使えるようにするための組み込み関数
    "(prefers-color-scheme: dark)" //ユーザーがダークモードを使っているか
  ).matches;
  // .matches; //「条件が今合ってるか？」が true / falseの情報で保存
  const defaultTheme = isDarkMode ? "dark-mode" : "light-mode";
  // isDarkMode が true なら "dark-mode"、false なら "light-mode" を文字列で保存
  document.body.classList.add(defaultTheme);
  Lbtn.innerText = isDarkMode ? "ライトモード" : "ダークモード";
}

// ボタンを押したときにテーマを切り替え＋保存
Lbtn.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    //.contains-指定したクラス名が現在その要素に付いているかどうかを true / false で返す
    document.body.classList.replace("dark-mode", "light-mode");
    Lbtn.innerText = "ダークモード";
    localStorage.setItem("theme", "light-mode"); // ← ローカルストレージに保存
  } else {
    document.body.classList.replace("light-mode", "dark-mode");
    Lbtn.innerText = "ライトモード";
    localStorage.setItem("theme", "dark-mode"); // ← ローカルストレージに保存
  }
});



//todo 6.ミニゲーム（連打力チェッカー）

//* 1.スタート画面
// スタートボタン：クリックで３秒待機画面に遷移
let isPlaying = false; // ゲームがプレイ中かどうかのフラグ
let renda = 0; // 連打数の初期値

document.getElementById("startBtn").addEventListener("click", function () {
  isPlaying = true; // ゲームがプレイ中に設定
  // スタート画面を非表示にして、待機画面を表示
  document.getElementById("rendaTop").classList.replace("screen", "hidden"); // スタート画面を非表示
  document.getElementById("rendaReady").classList.replace("hidden", "screen"); // 待機画面を表示

  readyTime();
});

//* 2.３秒待機画面
// 1.3秒間カウントダウン表示：「連打開始まで3, 2, 1」の表示
let countdownInterval;
function readyTime() {
  let countdown = 3; // カウントダウンの初期値
  clearInterval(countdownInterval); // 既存のカウントダウンがあればクリア
  countdownInterval = setInterval(() => {
    // setInterval(() => { ... }, 1000);　1秒ごとに、指定された関数を繰り返し実行する関数
    countdown--; // カウントダウンを1秒ずつ減らす
    document.getElementById("readyTime").innerText = countdown;
    if (countdown <= 0) {
      clearInterval(countdownInterval); // カウントダウンが0になったら停止
      document
        .getElementById("rendaReady")
        .classList.replace("screen", "hidden"); // 待機画面を非表示
      document
        .getElementById("rendaPlay")
        .classList.replace("hidden", "screen"); // 連打中画面を表示

      startPlay(); // 連打フェーズ開始
    }
  }, 1000);
} // 1秒ごとに実行

// 3.連打中画面
// 連打中画面がクリックされたときの処理
const rendaBtn = document.getElementById("rendaBtn");
rendaBtn.onclick = () => {
  if (!isPlaying) return;
  renda++; // 連打数をカウントアップ
  document.getElementById("playScore").innerText = `${renda}連打`; // 連打数を表示更新
};
//6秒間のカウントダウン表示
let playInterval; // カウントダウン用の変数を宣言
function startPlay() {
  let playTime = 6; // 連打時間の初期値
  clearInterval(playInterval); // 既存のカウントダウンがあればクリア
  playInterval = setInterval(() => {
    // setInterval(() => { ... }, 1000);　1秒ごとに、指定された関数を繰り返し実行する関数
    playTime--; // カウントダウンを1秒ずつ減らす
    document.getElementById("playTime").innerText = `あと ${playTime} 秒`;
    if (playTime <= 0) {
      clearInterval(playInterval); // カウントダウンが0になったら停止
      isPlaying = false; // ゲームが終了したことを示すフラグを更新
      document
        .getElementById("rendaPlay")
        .classList.replace("screen", "hidden"); // 連打中画面を非表示
      document.getElementById("rendaEnd").classList.replace("hidden", "screen"); // 終了画面を表示
      setTimeout(() => {
        document
          .getElementById("rendaEnd")
          .classList.replace("screen", "hidden"); // 終了画面を非表示
        document
          .getElementById("rendaResult")
          .classList.replace("hidden", "screen"); // 終了画面を表示
        showResult();
      }, 1000); // 1秒後に結果画面を表示
    }
  }, 1000);
} // 1秒ごとに実行

// 4.結果画面
function showResult() {
  document.getElementById("resultScore").innerText = `${renda}連打`; // 結果画面に連打数を表示

  const rankImg = document.getElementById("rankImg");
  const rank = document.getElementById("rank");
  const rankMessage = document.getElementById("rankMessage");

  // 2.結果メッセージ：連打数に応じたメッセージを表示
  if (renda <= 0) {
    rankImg.src = "image/E.GIF";
    rank.innerText = "寝起きのナマケモノ 級";
    rankMessage.innerText = "起きただけでエラい";
  } else if (renda <= 15) {
    rankImg.src = "image/D.GIF";
    rank.innerText = "ペンギンのおさんぽ 級";
    rankMessage.innerText = "てちてちてちてち";
  } else if (renda <= 30) {
    rankImg.src = "image/C.GIF";
    rank.innerText = "アザラシのおなかぺちぺち 級";
    rankMessage.innerText = "ぺちぺちは実は威嚇なのです";
  } else if (renda <= 50) {
    rankImg.src = "image/B.GIF";
    rank.innerText = "さんぽ前の柴犬のしっぽ 級";
    rankMessage.innerText = "テンションMAX";
  } else {
    rankImg.src = "image/A.GIF";
    rank.innerText = "クビナガカイツブリの水上走り 級";
    rankMessage.innerText = "はやすぎる…！";
  }
}

// 4.Xに投稿するボタン：Xに連打数を投稿

document.getElementById("postToX").addEventListener("click", function () {
  const rankText = document.getElementById("rank").innerText;
  const siteURL = "https://iwasaki-y0125.github.io/Portfolio/";
  const postText = `6秒連打で ${renda}連打しました！${rankText} #6秒連打 ${siteURL}`;
  const postUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
    postText
  )}`;
  window.open(postUrl, "_blank"); // 新しいタブでXに投稿
});

// 5.再挑戦ボタン：3秒待機画面に戻る

document.getElementById("retryBtn").addEventListener("click", function () {
  document.getElementById("rendaResult").classList.replace("screen", "hidden"); // 結果画面を非表示
  document.getElementById("rendaReady").classList.replace("hidden", "screen"); // 待機画面を表示

  isPlaying = true; // ゲームが再度プレイ中に設定
  document.getElementById("readyTime").innerText = "3"; // カウントダウン表示をリセット

  renda = 0; // 連打数をリセット
  document.getElementById("playTime").innerText = "あと 6 秒"; // 連打時間表示をリセット
  document.getElementById("playScore").innerText = `${renda}連打`; // 連打数表示をリセット

  readyTime();
});
