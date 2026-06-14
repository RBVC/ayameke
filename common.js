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
    
    // 基本情報の埋め込み
    const nodes = {
        'js-title-jp': data.nameJP.replace('カグラ', '<span class="purple">カグラ</span>'),
        'js-title-en': data.enTitle,
        'js-hero-img': data.mainImg,
        'js-about-img': data.sacraImg,
        'js-about-text': data.aboutText,
        'js-en-name': data.nameEN.split(' ')[1].toUpperCase(),
        'js-dl-link': data.downloadUrl
    };

    for (const [id, value] of Object.entries(nodes)) {
        const el = document.getElementById(id);
        if (el) {
            if (id === 'js-title-jp') el.innerHTML = value;
            else if (id === 'js-dl-link') el.href = value;
            else if (id.includes('img')) el.src = value;
            else el.innerText = value;
        }
    }

    // プロフィール
    const profileGrid = document.getElementById('js-profile-grid');
    if(profileGrid) {
        profileGrid.innerHTML = `
            <div class="info-item"><span>Birthday</span>${data.profile.birthday}</div>
            <div class="info-item"><span>Height</span>${data.profile.height}</div>
            <div class="info-item"><span>Pronoun</span>${data.profile.pronoun}</div>
            <div class="info-item"><span>Hair</span>${data.appearance.hair}</div>
            <div class="info-item"><span>Eyes</span>${data.appearance.eyes}</div>
        `;
    }

    // ギャラリー
    const gal = document.getElementById('js-gallery-grid');
    if(gal) {
        gal.innerHTML = '';
        data.visuals.forEach(v => {
            gal.innerHTML += `<div class="gallery-item"><img src="${v.src}"><p>${v.label}</p></div>`;
        });
    }

    // 音声リスト
    const list = document.getElementById('js-song-list');
    if(list) {
        list.innerHTML = '';
        data.songs.forEach(s => {
            list.innerHTML += `<li class="track" data-src="${s.src}">${s.title}</li>`;
        });
    }

    initTabs();
    if(typeof initPlayer === 'function') initPlayer();
}

function initTabs() {
    const tabs = document.querySelectorAll('.sub-nav li');
    const sections = document.querySelectorAll('.model-section');

    tabs.forEach(tab => {
        tab.onclick = () => {
            const targetId = tab.dataset.target;

            // 全てリセット
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => {
                s.classList.remove('active');
                s.style.display = 'none';
            });

            // ターゲットのみ表示
            tab.classList.add('active');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                // MAINだけはflex、他はblock
                targetSection.style.display = (targetId === 'sec-main') ? 'flex' : 'block';
            }
            window.scrollTo(0, 0); 
        };
    });
}