# T88

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A JavaScript/ESM module for decoding NEC PC-8801 T88 tape image files.

The T88 format is a common file format for tape images from the NEC PC-8801 series of personal computers. This library extracts the raw program and data binary from a T88 container file.

## Usage

This module can be used in Deno or modern web browsers.

### Deno

```js
import { T88 } from "https://code4fukui.github.io/T88/T88.js";

// Read a T88 file
const t88FileContent = await Deno.readFile("./test.t88");

// Decode the T88 data to get the raw binary
const decodedData = T88.decode(t88FileContent);

console.log(decodedData, decodedData.length);

// Save the extracted binary data
await Deno.writeFile("./test.bin", decodedData);
```

### Browser

```js
import { T88 } from "https://code4fukui.github.io/T88/T88.js";

// Assuming 'file' is a File object from an <input type="file">
async function handleFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const t88FileContent = new Uint8Array(arrayBuffer);
  
  try {
    const decodedData = T88.decode(t88FileContent);
    console.log("Decoded data:", decodedData);
    // You can now use the decodedData Uint8Array
  } catch (e) {
    console.error("Failed to decode T88 file:", e.message);
  }
}
```

## API

### `T88.decode(t88Data)`
- **`t88Data`**: `Uint8Array` - The raw byte data of a `.t88` file.
- **Returns**: `Uint8Array` - The concatenated data from all data blocks within the T88 file.
- **Throws**: An `Error` if the file is not a valid T88 file or uses an unsupported version.

## Reference

The primary reference for the T88 format specification:
- [Manuke Station : T88Format](https://quagma.sakura.ne.jp/manuke/t88format.html) (in Japanese)

### T88 Block IDs

A T88 file consists of a series of blocks, each identified by a hexadecimal ID. This library extracts the content from the `Data` blocks (`0x101`).

- `0x00`: End
- `0x01`: Version
- `0x100`: Blank
- `0x101`: Data
- `0x102`: Space
- `0x103`: Mark

## License

MIT License