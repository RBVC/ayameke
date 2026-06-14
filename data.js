const CHARACTER_DATA = {
    "kagura": {
        nameJP: "菖蒲カグラ",
        nameEN: "Ayame Kagura",
        enTitle: "ARTIFICIAL SINGING SYNTHESIZER",
        subTitle: "Digital Doppelgänger Project",
        mainImg: "picture/kagura-main.png",
        sacraImg: "picture/kagura-sacra.png",
        
        // 紹介文（UTAUの記述を除去し、RVC/歌唱モデルとして調整）
        aboutText: "菖蒲カグラは、バーチャルシンガー「菖蒲さくら」の声をベースに生み出されたデジタル・ドッペルゲンガーです。自分の声からもう一人の自分を構築したいという願いから生まれたこの歌唱モデルは、AI技術を用いることで、さくら本人の声質・癖・歌い方をリアルに再現します。",
        
        // 詳細プロフィール（Canvaから抽出）
        profile: {
            gender: "女",
            birthday: "9月16日",
            height: "160cm",
            pronoun: "僕 (まれに私)",
            personality: "無口なダウナー系。メイド服やゴスロリなど黒中心の服を好む。"
        },
        
        // 容姿の設定
        appearance: {
            hair: "白髪 / 前髪は姫カット / 後髪はロング（たまにお団子）",
            eyes: "紫 (まれにカラコン)",
            fashion: "メイド服・ゴスロリなど"
        },

        visuals: [
            { src: "picture/kagura-main.png", label: "Normal Style" },
            { src: "picture/kagura-twin.png", label: "Twin Tails" },
            { src: "picture/kagura-twin2.png", label: "Twin Tails (Close-up)" }
        ],

        songs: [
            { title: "全方向美少女 - 乃紫", src: "music/any-angle.mp3" },
            { title: "B級 - ちゃんみな", src: "music/b-list.mp3" },
            { title: "ド屑 - なきそ", src: "music/dokuzu.mp3" },
            { title: "ドメスティックでバイオレンス - Ado", src: "music/domestic.mp3" },
            { title: "アイデンティティ - Kanaria", src: "music/identity.mp3" },
            { title: "Shadow Shadow - Azari", src: "music/shadow-shadow.mp3" }
        ],
        downloadUrl: "https://github.com/RBVC/ayameke/releases/download/v1.0.0/Ayame_Kagura.pth"
    }
};