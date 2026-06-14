document.addEventListener('DOMContentLoaded', () => {
    // 1. 共通ヘッダー注入
    const headerHTML = `
        <header id="site-header">
            <div class="header-container">
                <div class="logo"><a href="index.html">AYAMEKE</a></div>
                <div class="menu-btn" id="menu-btn"><span></span><span></span></div>
            </div>
        </header>
        <nav class="nav-overlay" id="nav-overlay">
            <ul>
                <li><a href="index.html">TOP</a></li>
                <li class="nav-model-link"><a href="model.html?id=kagura">AYAME KAGURA</a></li>
            </ul>
        </nav>`;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // 2. 共通フッター注入
    const footerHTML = `<footer><p>© 2024 AYAMEKE PROJECT / 菖蒲家</p></footer>`;
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // 3. メニュー制御
    const menuBtn = document.getElementById('menu-btn');
    const navOverlay = document.getElementById('nav-overlay');
    if(menuBtn) {
        menuBtn.onclick = () => {
            menuBtn.classList.toggle('active');
            navOverlay.classList.toggle('active');
        };
    }

    // 4. モデルデータの処理
    const params = new URLSearchParams(window.location.search);
    const charId = params.get('id');
    if (charId && CHARACTER_DATA[charId] && document.getElementById('js-model-content')) {
        renderModelPage(CHARACTER_DATA[charId]);
    }
});

function renderModelPage(data) {
    document.title = `${data.nameJP} | AYAMEKE`;
    document.getElementById('js-title-jp').innerHTML = data.nameJP.replace('カグラ', '<span class="purple">カグラ</span>');
    document.getElementById('js-title-en').innerText = data.enTitle;
    document.getElementById('js-hero-img').src = data.mainImg;
    document.getElementById('js-about-img').src = data.sacraImg;
    document.getElementById('js-about-text').innerText = data.aboutText;
    document.getElementById('js-dl-link').href = data.downloadUrl;

    // プロフィール情報
    document.getElementById('js-profile-grid').innerHTML = `
        <div class="info-item"><span>Birthday</span>${data.profile.birthday}</div>
        <div class="info-item"><span>Height</span>${data.profile.height}</div>
        <div class="info-item"><span>Pronoun</span>${data.profile.pronoun}</div>
        <div class="info-item"><span>Hair</span>${data.appearance.hair}</div>
        <div class="info-item"><span>Eyes</span>${data.appearance.eyes}</div>
    `;

    // ギャラリー
    const gal = document.getElementById('js-gallery-grid');
    data.visuals.forEach(v => {
        gal.innerHTML += `<div class="gallery-item"><img src="${v.src}"><p>${v.label}</p></div>`;
    });

    // 音声リスト
    const list = document.getElementById('js-song-list');
    data.songs.forEach(s => {
        list.innerHTML += `<li class="track" data-src="${s.src}">${s.title}</li>`;
    });

    initTabs();
    if(typeof initAudioPlayer === 'function') initPlayer();
}

function initTabs() {
    const tabs = document.querySelectorAll('.sub-nav li');
    const sections = document.querySelectorAll('.model-section');

    tabs.forEach(tab => {
        tab.onclick = () => {
            const target = tab.dataset.target;
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
            window.scrollTo(0, 0); // 切り替え時に上へ
        };
    });
}