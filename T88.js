import { bin2s, bin2short, subbin, short2bin } from "https://code4fukui.github.io/binutil/binutil.js";

export const decode = (bin) => {
  const t88id = "PC-8801 Tape Image(T88)\0";
  const id = bin2s(bin, 0, t88id.length);
  if (id != t88id) throw new Error("not T88");
  let idx = t88id.length;
  const ret = [];
  let datalen = 0;
  for (;;) {
    const id = bin2short(bin, idx, true);
    idx += 2;
    const len = bin2short(bin, idx, true);
    idx += 2;
    const body = subbin(bin, idx, len);
    idx += len;
    console.log(id.toString(16), len.toString(16), body.length);
    if (id == 0) break;
    if (id == 1) {
      const ver = bin2short(body, 0, true);
      //console.log("ver", ver.toString(16));
      if (ver != 0x100) throw new Error("only upport ver 0x101");
    } else if (id == 0x101) { // data
      const data = subbin(body, 12, body.length - 12);
      ret.push(data);
      datalen += data.length;
      //console.log(data); // data and 255?
    }
    if (idx == bin.length) break;
  }
  if (!ret.length) throw new Error("no data in T88");
  const data = new Uint8Array(datalen);
  let i = 0;
  for (const b of ret) {
    data.set(b, i);
    i += b.length;
  }
  return data;
};

export const T88 = { encode, decode };
