# T88

T88フォーマットのデコーダーを JavaScript/ES モジュールで実装しました。

## 使い方

```js
import { T88 } from "https://code4fukui.github.io/T88/T88.js";

const bin = await Deno.readFile("./test.t88");
const data = T88.decode(bin);
console.log(data, data.length);
await Deno.writeFile("./test.bin", data);
```

## 参考

- [Manuke Station : T88Format](https://quagma.sakura.ne.jp/manuke/t88format.html)

### ID

```
0 0 ; end
1 2 ; version
100 8 ; blank
101 2912 ; data
102 8 ; space
103 8 ; mark
```

## ライセンス

MIT License