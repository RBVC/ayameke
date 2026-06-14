document.addEventListener('DOMContentLoaded', () => {
    // 1. ヘッダー・メニュー注入
    const headerHTML = `
        <header id="site-header">
            <div class="header-container">
                <div class="logo"><a href="index.html">AYAMEKE</a></div>
                <div class="menu-btn" id="menu-btn"><span></span><span></span></div>
            </div>
        </header>
        <nav class="nav-overlay" id="nav-overlay">
            <ul>
                <li><a href="#hero">TOP</a></li>
                <li><a href="#about">ABOUT</a></li>
                <li><a href="#visuals">VISUALS</a></li>
                <li><a href="#voice">VOICE</a></li>
                <li><a href="#download">DOWNLOAD</a></li>
                <li><a href="#guideline">GUIDELINE</a></li>
            </ul>
        </nav>`;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // 2. フッター注入
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
        document.querySelectorAll('.nav-overlay a').forEach(link => {
            link.onclick = () => {
                menuBtn.classList.remove('active');
                navOverlay.classList.remove('active');
            };
        });
    }

    // 4. モデルデータの流し込み (model.html の場合のみ)
    const params = new URLSearchParams(window.location.search);
    const charId = params.get('id');
    if (charId && CHARACTER_DATA[charId] && document.getElementById('js-name')) {
        const data = CHARACTER_DATA[charId];
        document.title = `${data.nameJP} | AYAMEKE`;
        document.getElementById('js-name').innerHTML = data.nameJP.replace('カグラ', '<span class="purple">カグラ</span>');
        document.getElementById('js-en-title').innerText = data.enTitle;
        document.getElementById('js-main-img').src = data.mainImg;
        document.getElementById('js-sacra-img').src = data.sacraImg;
        document.getElementById('js-about-text').innerText = data.aboutText;
        document.getElementById('js-en-name').innerText = data.nameEN.split(' ')[1].toUpperCase();
        document.getElementById('js-dl-btn').href = data.downloadUrl;

        // プロフィール生成
        const infoGrid = document.getElementById('js-profile-info');
        infoGrid.innerHTML = `
            <div class="info-item"><span>Birthday</span>${data.profile.birthday}</div>
            <div class="info-item"><span>Height</span>${data.profile.height}</div>
            <div class="info-item"><span>Pronoun</span>${data.profile.pronoun}</div>
            <div class="info-item"><span>Hair</span>${data.appearance.hair}</div>
            <div class="info-item"><span>Eyes</span>${data.appearance.eyes}</div>
        `;

        // ギャラリー生成
        const galleryGrid = document.getElementById('js-gallery');
        data.visuals.forEach(v => {
            galleryGrid.innerHTML += `<div class="gallery-item"><img src="${v.src}"><p>${v.label}</p></div>`;
        });

        // プレイリスト生成
        const playlist = document.getElementById('js-playlist');
        data.songs.forEach(s => {
            playlist.innerHTML += `<li class="track" data-src="${s.src}">${s.title}</li>`;
        });
        if(typeof initPlayer === 'function') initPlayer();
    }
});