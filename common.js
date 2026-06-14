// common.js の loadModelPage 関数内に以下を追記
function loadModelPage(data) {
    // （これまでの処理は維持）
    document.getElementById('js-en-name').innerText = data.nameEN.split(' ')[1].toUpperCase();

    // プロフィール情報の生成
    const infoGrid = document.getElementById('js-profile-info');
    const p = data.profile;
    const a = data.appearance;
    infoGrid.innerHTML = `
        <div class="info-item"><span>Birthday</span>${p.birthday}</div>
        <div class="info-item"><span>Height</span>${p.height}</div>
        <div class="info-item"><span>First-person</span>${p.pronoun}</div>
        <div class="info-item"><span>Hair</span>${a.hair}</div>
        <div class="info-item"><span>Eyes</span>${a.eyes}</div>
    `;
    
    // （ギャラリーやプレイリストの処理へ続く）
}