# 都道府県別総人口・人口構成の可視化Webサイト

[都道府県別総人口・人口構成の可視化Webサイト](https://kazuya0202.github.io/frontend-yumemi/)

本サイトは、RESAS APIから都道府県別の総人口および人口構成を取得し、グラフを描画します。


## 技術スタック

- ライブラリ・フレームワーク
  - React
  - TypeScript
  - Vite

- ツール
  - ESLint
  - Prettier
  - Vitest


## ローカル環境のセットアップ

> [!note]
> ローカル環境で実行するには、RESAS API の API キーを取得、設定する必要があります。 \
> RESAS APIは [こちら](https://opendata.resas-portal.go.jp) から取得し、取得した API はリポジトリのルートに `.env.local` ファイルを作成し、環境変数に設定してください。
> ```sh
> # .env.local
> VITE_RESAS_API_KEY=<取得したAPIキー>
> ```

- パッケージのインストール

```sh
pnpm install
```

- 実行

```sh
pnpm run dev
```

- ESLintによるチェック

```sh
pnpm run lint
```

- Vitestによるテスト

```sh
pnpm run test
```

- ビルド

```sh
pnpm run build
```
