# CoderDojo磐田 スライド

CoderDojo磐田で使用するスライドを公開しています。以下のリンクからスライドの一覧を参照することができます。

https://baki504.github.io/slides-staging/

スライドはMarkdownをinputに作成できる[Marp](https://marp.app/)を使用しています。

各種UMLには[PlantUML](https://plantuml.com/)を使用しています。指定のディレクトリにMarkdownを配置しておき、ビルド時に自動でSVG変換できるようにしています。

## ディレクトリ構成

```
.
├── public     # GitHub Pages成果物
├── plantuml   # PlantUML画像のinputとなるMarkdown
├── scripts    # 各種作業を効率化するためのスクリプト
├── slides     # スライドのinputとなるMarkdown
|   └── assets # アセットファイル（画像など）
└── themes     # スライドのカスタムテーマCSS
```

### カスタムテーマCSS

https://marpit.marp.app/theme-css

## 使い方

### スライドのプレビュー

```sh
npm run start
```

ブラウザで`slides`ディレクトリ配下のファイル一覧を表示します。該当するMarkdownを選択することで、スライドのプレビューができます。
 

### 公開用スライドファイル生成

```sh
npm run build
```

`public`ディレクトリに公開用スライドファイルを出力します。

- Marpで変換したスライドHTMLファイル
- assets内に配置した成果物（画像など）
  - `plantuml`ディレクトリ内のMarkdownを変換したSVGも含む (例: `diagram.md` -> `diagram.svg`)
- スライドHTMLファイルのリンク一覧にしたトップページ (`index.html`)

### トップページのブラウザ表示

```sh
npm run open
```

`public`ディレクトリに出力したトップページをブラウザで表示します。

## ライセンス

[WTFPL](/LICENSE)
