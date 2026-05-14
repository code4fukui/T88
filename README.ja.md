# T88

NEC PC-8801シリーズのT88テープイメージファイルをデコードするためのJavaScript/ESMモジュールです。

T88形式は、NEC PC-8801シリーズのパーソナルコンピュータ用テープイメージとして一般的なファイル形式です。本ライブラリは、T88コンテナファイルから生のプログラムやデータのバイナリを抽出します。

## 使い方

このモジュールはDenoやモダンなWebブラウザで使用できます。

### Deno

```js
import { T88 } from "https://code4fukui.github.io/T88/T88.js";

// T88ファイルを読み込む
const t88FileContent = await Deno.readFile("./test.t88");

// T88データをデコードして生のバイナリを取得する
const decodedData = T88.decode(t88FileContent);

console.log(decodedData, decodedData.length);

// 抽出したバイナリデータを保存する
await Deno.writeFile("./test.bin", decodedData);
```

### ブラウザ

```js
import { T88 } from "https://code4fukui.github.io/T88/T88.js";

// 'file' が <input type="file"> から取得した File オブジェクトであると想定
async function handleFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const t88FileContent = new Uint8Array(arrayBuffer);
  
  try {
    const decodedData = T88.decode(t88FileContent);
    console.log("デコードされたデータ:", decodedData);
    // これでデコードされた decodedData (Uint8Array) を使用できます
  } catch (e) {
    console.error("T88ファイルのデコードに失敗しました:", e.message);
  }
}
```

## API

### `T88.decode(t88Data)`
- **`t88Data`**: `Uint8Array` - `.t88`ファイルの生のバイトデータ。
- **戻り値**: `Uint8Array` - T88ファイル内のすべてのデータブロックを連結したデータ。
- **例外**: ファイルが有効なT88ファイルでない場合、またはサポートされていないバージョンが使用されている場合に `Error` をスローします。

## 参考資料

T88形式の仕様に関する主な参考資料は以下の通りです。
- [Manuke Station : T88Format](https://quagma.sakura.ne.jp/manuke/t88format.html) (日本語)

### T88 ブロックID

T88ファイルは、16進数のIDで識別される一連のブロックで構成されています。本ライブラリは、その中の `Data` ブロック (`0x101`) の内容を抽出します。

- `0x00`: 終了
- `0x01`: バージョン
- `0x100`: ブランク
- `0x101`: データ
- `0x102`: スペース
- `0x103`: マーク

## ライセンス

MIT License
