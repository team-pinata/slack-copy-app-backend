# Slack Copy App Backend

## 開発

### 準備
```sh
npm install
```

### デバッグ
```
npm run dev
```

### API追加方法
本プロジェクトは`OpenAPI Specification`に則っている。
APIの追加後にコードの自動生成を行うことで、スキーマ駆動開発を目指す。

#### 手順
1. [定義ファイル](./openapi.yaml)を編集する
2. コマンドを実行しコードを自動生成する
    - `./gen-code.sh`
3. 今回追加した`operationId`と同じ名前の関数を、[`src/handlers/handlers.js`](./src/handlers/handlers.js)へ追加する

**注意**
自動生成されたファイルは手で更新を行わないこと

### エディタの設定
#### VSCode
コードの自動整形を有効にするため`.vscode/settings.json`へ下記を追記する

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
} 
```
