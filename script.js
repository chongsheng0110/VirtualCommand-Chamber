// HPの初期値
let hp = 100;
let autoGachaCount = 0;  // 自動ガチャのカウント
const maxAutoGachaCount = 100;  // 最大自動ガチャ回数

// データを直接定義
const gachaData = [
    { description: "弱い攻撃", damage: 10 },
    { description: "強い攻撃", damage: 20 },
    { description: "致命的な攻撃", damage: 50 },
    { description: "微弱な攻撃", damage: 5 }
];

// HTML要素の取得
const hpElement = document.getElementById("hp");
const resultElement = document.getElementById("result");
const gachaButton = document.getElementById("gacha-btn");

// ガチャを引く関数
function pullGacha() {
    if (gachaData.length === 0) {
        resultElement.textContent = "データがありません。";
        return;
    }

    // ランダムな結果を選ぶ
    const randomIndex = Math.floor(Math.random() * gachaData.length);
    const gachaResult = gachaData[randomIndex];

    // 結果を表示
    resultElement.textContent = `結果: ${gachaResult.description} - ダメージ: ${gachaResult.damage}`;

    // HPを減少させる
    hp -= gachaResult.damage;
    if (hp < 0) hp = 0;

    // HPを更新
    hpElement.textContent = `HP: ${hp}`;

    // HPが0になったら自動ガチャを開始
    if (hp === 0 && autoGachaCount === 0) {
        startAutoGacha();
    }

    if (hp === 0 && autoGachaCount === 0) {
        resultElement.textContent += " - HPがゼロになりました！";
    }
}

// 自動ガチャを開始する関数
function startAutoGacha() {
    const autoGachaInterval = setInterval(() => {
        if (autoGachaCount >= maxAutoGachaCount) {
            clearInterval(autoGachaInterval);  // 最大回数に達したら停止
            resultElement.textContent += " - 自動ガチャが停止しました。";
            gachaButton.disabled = true;
            return;
        }
        pullGacha();  // 自動でガチャを引く
        autoGachaCount++;
    }, 60000);  // 1分ごとにガチャを引く
}

// ガチャボタンがクリックされたときの処理
gachaButton.addEventListener("click", pullGacha);
