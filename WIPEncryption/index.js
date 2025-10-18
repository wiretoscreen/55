(function(exports,common,patcher,metro,_vendetta,components,require$$0){'use strict';const { FormText } = components.Forms;
function Settings() {
  return /* @__PURE__ */ React.createElement(FormText, null, "Hello, world!");
}function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}var tweetnacl = {exports: {}};(function(module) {
  (function(nacl) {
    var u64 = function(h, l) {
      this.hi = h | 0 >>> 0;
      this.lo = l | 0 >>> 0;
    };
    var gf = function(init) {
      var i, r = new Float64Array(16);
      if (init)
        for (i = 0; i < init.length; i++)
          r[i] = init[i];
      return r;
    };
    var randombytes = function() {
      throw new Error("no PRNG");
    };
    var _0 = new Uint8Array(16);
    var _9 = new Uint8Array(32);
    _9[0] = 9;
    var gf0 = gf(), gf1 = gf([
      1
    ]), _121665 = gf([
      56129,
      1
    ]), D = gf([
      30883,
      4953,
      19914,
      30187,
      55467,
      16705,
      2637,
      112,
      59544,
      30585,
      16505,
      36039,
      65139,
      11119,
      27886,
      20995
    ]), D2 = gf([
      61785,
      9906,
      39828,
      60374,
      45398,
      33411,
      5274,
      224,
      53552,
      61171,
      33010,
      6542,
      64743,
      22239,
      55772,
      9222
    ]), X = gf([
      54554,
      36645,
      11616,
      51542,
      42930,
      38181,
      51040,
      26924,
      56412,
      64982,
      57905,
      49316,
      21502,
      52590,
      14035,
      8553
    ]), Y = gf([
      26200,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214
    ]), I = gf([
      41136,
      18958,
      6951,
      50414,
      58488,
      44335,
      6150,
      12099,
      55207,
      15867,
      153,
      11085,
      57099,
      20417,
      9344,
      11139
    ]);
    function L32(x, c) {
      return x << c | x >>> 32 - c;
    }
    function ld32(x, i) {
      var u = x[i + 3] & 255;
      u = u << 8 | x[i + 2] & 255;
      u = u << 8 | x[i + 1] & 255;
      return u << 8 | x[i + 0] & 255;
    }
    function dl64(x, i) {
      var h = x[i] << 24 | x[i + 1] << 16 | x[i + 2] << 8 | x[i + 3];
      var l = x[i + 4] << 24 | x[i + 5] << 16 | x[i + 6] << 8 | x[i + 7];
      return new u64(h, l);
    }
    function st32(x, j, u) {
      var i;
      for (i = 0; i < 4; i++) {
        x[j + i] = u & 255;
        u >>>= 8;
      }
    }
    function ts64(x, i, u) {
      x[i] = u.hi >> 24 & 255;
      x[i + 1] = u.hi >> 16 & 255;
      x[i + 2] = u.hi >> 8 & 255;
      x[i + 3] = u.hi & 255;
      x[i + 4] = u.lo >> 24 & 255;
      x[i + 5] = u.lo >> 16 & 255;
      x[i + 6] = u.lo >> 8 & 255;
      x[i + 7] = u.lo & 255;
    }
    function vn(x, xi, y, yi, n) {
      var i, d = 0;
      for (i = 0; i < n; i++)
        d |= x[xi + i] ^ y[yi + i];
      return (1 & d - 1 >>> 8) - 1;
    }
    function crypto_verify_16(x, xi, y, yi) {
      return vn(x, xi, y, yi, 16);
    }
    function crypto_verify_32(x, xi, y, yi) {
      return vn(x, xi, y, yi, 32);
    }
    function core(out, inp, k, c, h) {
      var w = new Uint32Array(16), x = new Uint32Array(16), y = new Uint32Array(16), t = new Uint32Array(4);
      var i, j, m;
      for (i = 0; i < 4; i++) {
        x[5 * i] = ld32(c, 4 * i);
        x[1 + i] = ld32(k, 4 * i);
        x[6 + i] = ld32(inp, 4 * i);
        x[11 + i] = ld32(k, 16 + 4 * i);
      }
      for (i = 0; i < 16; i++)
        y[i] = x[i];
      for (i = 0; i < 20; i++) {
        for (j = 0; j < 4; j++) {
          for (m = 0; m < 4; m++)
            t[m] = x[(5 * j + 4 * m) % 16];
          t[1] ^= L32(t[0] + t[3] | 0, 7);
          t[2] ^= L32(t[1] + t[0] | 0, 9);
          t[3] ^= L32(t[2] + t[1] | 0, 13);
          t[0] ^= L32(t[3] + t[2] | 0, 18);
          for (m = 0; m < 4; m++)
            w[4 * j + (j + m) % 4] = t[m];
        }
        for (m = 0; m < 16; m++)
          x[m] = w[m];
      }
      if (h) {
        for (i = 0; i < 16; i++)
          x[i] = x[i] + y[i] | 0;
        for (i = 0; i < 4; i++) {
          x[5 * i] = x[5 * i] - ld32(c, 4 * i) | 0;
          x[6 + i] = x[6 + i] - ld32(inp, 4 * i) | 0;
        }
        for (i = 0; i < 4; i++) {
          st32(out, 4 * i, x[5 * i]);
          st32(out, 16 + 4 * i, x[6 + i]);
        }
      } else {
        for (i = 0; i < 16; i++)
          st32(out, 4 * i, x[i] + y[i] | 0);
      }
    }
    function crypto_core_salsa20(out, inp, k, c) {
      core(out, inp, k, c, false);
      return 0;
    }
    function crypto_core_hsalsa20(out, inp, k, c) {
      core(out, inp, k, c, true);
      return 0;
    }
    var sigma = new Uint8Array([
      101,
      120,
      112,
      97,
      110,
      100,
      32,
      51,
      50,
      45,
      98,
      121,
      116,
      101,
      32,
      107
    ]);
    function crypto_stream_salsa20_xor(c, cpos, m, mpos, b, n, k) {
      var z = new Uint8Array(16), x = new Uint8Array(64);
      var u, i;
      if (!b)
        return 0;
      for (i = 0; i < 16; i++)
        z[i] = 0;
      for (i = 0; i < 8; i++)
        z[i] = n[i];
      while (b >= 64) {
        crypto_core_salsa20(x, z, k, sigma);
        for (i = 0; i < 64; i++)
          c[cpos + i] = (m ? m[mpos + i] : 0) ^ x[i];
        u = 1;
        for (i = 8; i < 16; i++) {
          u = u + (z[i] & 255) | 0;
          z[i] = u & 255;
          u >>>= 8;
        }
        b -= 64;
        cpos += 64;
        if (m)
          mpos += 64;
      }
      if (b > 0) {
        crypto_core_salsa20(x, z, k, sigma);
        for (i = 0; i < b; i++)
          c[cpos + i] = (m ? m[mpos + i] : 0) ^ x[i];
      }
      return 0;
    }
    function crypto_stream_salsa20(c, cpos, d, n, k) {
      return crypto_stream_salsa20_xor(c, cpos, null, 0, d, n, k);
    }
    function crypto_stream(c, cpos, d, n, k) {
      var s = new Uint8Array(32);
      crypto_core_hsalsa20(s, n, k, sigma);
      return crypto_stream_salsa20(c, cpos, d, n.subarray(16), s);
    }
    function crypto_stream_xor(c, cpos, m, mpos, d, n, k) {
      var s = new Uint8Array(32);
      crypto_core_hsalsa20(s, n, k, sigma);
      return crypto_stream_salsa20_xor(c, cpos, m, mpos, d, n.subarray(16), s);
    }
    function add1305(h, c) {
      var j, u = 0;
      for (j = 0; j < 17; j++) {
        u = u + (h[j] + c[j] | 0) | 0;
        h[j] = u & 255;
        u >>>= 8;
      }
    }
    var minusp = new Uint32Array([
      5,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      252
    ]);
    function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
      var s, i, j, u;
      var x = new Uint32Array(17), r = new Uint32Array(17), h = new Uint32Array(17), c = new Uint32Array(17), g = new Uint32Array(17);
      for (j = 0; j < 17; j++)
        r[j] = h[j] = 0;
      for (j = 0; j < 16; j++)
        r[j] = k[j];
      r[3] &= 15;
      r[4] &= 252;
      r[7] &= 15;
      r[8] &= 252;
      r[11] &= 15;
      r[12] &= 252;
      r[15] &= 15;
      while (n > 0) {
        for (j = 0; j < 17; j++)
          c[j] = 0;
        for (j = 0; j < 16 && j < n; ++j)
          c[j] = m[mpos + j];
        c[j] = 1;
        mpos += j;
        n -= j;
        add1305(h, c);
        for (i = 0; i < 17; i++) {
          x[i] = 0;
          for (j = 0; j < 17; j++)
            x[i] = x[i] + h[j] * (j <= i ? r[i - j] : 320 * r[i + 17 - j] | 0) | 0 | 0;
        }
        for (i = 0; i < 17; i++)
          h[i] = x[i];
        u = 0;
        for (j = 0; j < 16; j++) {
          u = u + h[j] | 0;
          h[j] = u & 255;
          u >>>= 8;
        }
        u = u + h[16] | 0;
        h[16] = u & 3;
        u = 5 * (u >>> 2) | 0;
        for (j = 0; j < 16; j++) {
          u = u + h[j] | 0;
          h[j] = u & 255;
          u >>>= 8;
        }
        u = u + h[16] | 0;
        h[16] = u;
      }
      for (j = 0; j < 17; j++)
        g[j] = h[j];
      add1305(h, minusp);
      s = -(h[16] >>> 7) | 0;
      for (j = 0; j < 17; j++)
        h[j] ^= s & (g[j] ^ h[j]);
      for (j = 0; j < 16; j++)
        c[j] = k[j + 16];
      c[16] = 0;
      add1305(h, c);
      for (j = 0; j < 16; j++)
        out[outpos + j] = h[j];
      return 0;
    }
    function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
      var x = new Uint8Array(16);
      crypto_onetimeauth(x, 0, m, mpos, n, k);
      return crypto_verify_16(h, hpos, x, 0);
    }
    function crypto_secretbox(c, m, d, n, k) {
      var i;
      if (d < 32)
        return -1;
      crypto_stream_xor(c, 0, m, 0, d, n, k);
      crypto_onetimeauth(c, 16, c, 32, d - 32, c);
      for (i = 0; i < 16; i++)
        c[i] = 0;
      return 0;
    }
    function crypto_secretbox_open(m, c, d, n, k) {
      var i;
      var x = new Uint8Array(32);
      if (d < 32)
        return -1;
      crypto_stream(x, 0, 32, n, k);
      if (crypto_onetimeauth_verify(c, 16, c, 32, d - 32, x) !== 0)
        return -1;
      crypto_stream_xor(m, 0, c, 0, d, n, k);
      for (i = 0; i < 32; i++)
        m[i] = 0;
      return 0;
    }
    function set25519(r, a) {
      var i;
      for (i = 0; i < 16; i++)
        r[i] = a[i] | 0;
    }
    function car25519(o) {
      var c;
      var i;
      for (i = 0; i < 16; i++) {
        o[i] += 65536;
        c = Math.floor(o[i] / 65536);
        o[(i + 1) * (i < 15 ? 1 : 0)] += c - 1 + 37 * (c - 1) * (i === 15 ? 1 : 0);
        o[i] -= c * 65536;
      }
    }
    function sel25519(p, q, b) {
      var t, c = ~(b - 1);
      for (var i = 0; i < 16; i++) {
        t = c & (p[i] ^ q[i]);
        p[i] ^= t;
        q[i] ^= t;
      }
    }
    function pack25519(o, n) {
      var i, j, b;
      var m = gf(), t = gf();
      for (i = 0; i < 16; i++)
        t[i] = n[i];
      car25519(t);
      car25519(t);
      car25519(t);
      for (j = 0; j < 2; j++) {
        m[0] = t[0] - 65517;
        for (i = 1; i < 15; i++) {
          m[i] = t[i] - 65535 - (m[i - 1] >> 16 & 1);
          m[i - 1] &= 65535;
        }
        m[15] = t[15] - 32767 - (m[14] >> 16 & 1);
        b = m[15] >> 16 & 1;
        m[14] &= 65535;
        sel25519(t, m, 1 - b);
      }
      for (i = 0; i < 16; i++) {
        o[2 * i] = t[i] & 255;
        o[2 * i + 1] = t[i] >> 8;
      }
    }
    function neq25519(a, b) {
      var c = new Uint8Array(32), d = new Uint8Array(32);
      pack25519(c, a);
      pack25519(d, b);
      return crypto_verify_32(c, 0, d, 0);
    }
    function par25519(a) {
      var d = new Uint8Array(32);
      pack25519(d, a);
      return d[0] & 1;
    }
    function unpack25519(o, n) {
      var i;
      for (i = 0; i < 16; i++)
        o[i] = n[2 * i] + (n[2 * i + 1] << 8);
      o[15] &= 32767;
    }
    function A(o, a, b) {
      var i;
      for (i = 0; i < 16; i++)
        o[i] = a[i] + b[i] | 0;
    }
    function Z(o, a, b) {
      var i;
      for (i = 0; i < 16; i++)
        o[i] = a[i] - b[i] | 0;
    }
    function M(o, a, b) {
      var i, j, t = new Float64Array(31);
      for (i = 0; i < 31; i++)
        t[i] = 0;
      for (i = 0; i < 16; i++) {
        for (j = 0; j < 16; j++) {
          t[i + j] += a[i] * b[j];
        }
      }
      for (i = 0; i < 15; i++) {
        t[i] += 38 * t[i + 16];
      }
      for (i = 0; i < 16; i++)
        o[i] = t[i];
      car25519(o);
      car25519(o);
    }
    function S(o, a) {
      M(o, a, a);
    }
    function inv25519(o, i) {
      var c = gf();
      var a;
      for (a = 0; a < 16; a++)
        c[a] = i[a];
      for (a = 253; a >= 0; a--) {
        S(c, c);
        if (a !== 2 && a !== 4)
          M(c, c, i);
      }
      for (a = 0; a < 16; a++)
        o[a] = c[a];
    }
    function pow2523(o, i) {
      var c = gf();
      var a;
      for (a = 0; a < 16; a++)
        c[a] = i[a];
      for (a = 250; a >= 0; a--) {
        S(c, c);
        if (a !== 1)
          M(c, c, i);
      }
      for (a = 0; a < 16; a++)
        o[a] = c[a];
    }
    function crypto_scalarmult(q, n, p) {
      var z = new Uint8Array(32);
      var x = new Float64Array(80), r, i;
      var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf();
      for (i = 0; i < 31; i++)
        z[i] = n[i];
      z[31] = n[31] & 127 | 64;
      z[0] &= 248;
      unpack25519(x, p);
      for (i = 0; i < 16; i++) {
        b[i] = x[i];
        d[i] = a[i] = c[i] = 0;
      }
      a[0] = d[0] = 1;
      for (i = 254; i >= 0; --i) {
        r = z[i >>> 3] >>> (i & 7) & 1;
        sel25519(a, b, r);
        sel25519(c, d, r);
        A(e, a, c);
        Z(a, a, c);
        A(c, b, d);
        Z(b, b, d);
        S(d, e);
        S(f, a);
        M(a, c, a);
        M(c, b, e);
        A(e, a, c);
        Z(a, a, c);
        S(b, a);
        Z(c, d, f);
        M(a, c, _121665);
        A(a, a, d);
        M(c, c, a);
        M(a, d, f);
        M(d, b, x);
        S(b, e);
        sel25519(a, b, r);
        sel25519(c, d, r);
      }
      for (i = 0; i < 16; i++) {
        x[i + 16] = a[i];
        x[i + 32] = c[i];
        x[i + 48] = b[i];
        x[i + 64] = d[i];
      }
      var x32 = x.subarray(32);
      var x16 = x.subarray(16);
      inv25519(x32, x32);
      M(x16, x16, x32);
      pack25519(q, x16);
      return 0;
    }
    function crypto_scalarmult_base(q, n) {
      return crypto_scalarmult(q, n, _9);
    }
    function crypto_box_keypair(y, x) {
      randombytes(x, 32);
      return crypto_scalarmult_base(y, x);
    }
    function crypto_box_beforenm(k, y, x) {
      var s = new Uint8Array(32);
      crypto_scalarmult(s, x, y);
      return crypto_core_hsalsa20(k, _0, s, sigma);
    }
    var crypto_box_afternm = crypto_secretbox;
    var crypto_box_open_afternm = crypto_secretbox_open;
    function crypto_box(c, m, d, n, y, x) {
      var k = new Uint8Array(32);
      crypto_box_beforenm(k, y, x);
      return crypto_box_afternm(c, m, d, n, k);
    }
    function crypto_box_open(m, c, d, n, y, x) {
      var k = new Uint8Array(32);
      crypto_box_beforenm(k, y, x);
      return crypto_box_open_afternm(m, c, d, n, k);
    }
    function add64() {
      var a = 0, b = 0, c = 0, d = 0, m16 = 65535, l, h, i;
      for (i = 0; i < arguments.length; i++) {
        l = arguments[i].lo;
        h = arguments[i].hi;
        a += l & m16;
        b += l >>> 16;
        c += h & m16;
        d += h >>> 16;
      }
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      return new u64(c & m16 | d << 16, a & m16 | b << 16);
    }
    function shr64(x, c) {
      return new u64(x.hi >>> c, x.lo >>> c | x.hi << 32 - c);
    }
    function xor64() {
      var l = 0, h = 0, i;
      for (i = 0; i < arguments.length; i++) {
        l ^= arguments[i].lo;
        h ^= arguments[i].hi;
      }
      return new u64(h, l);
    }
    function R(x, c) {
      var h, l, c1 = 32 - c;
      if (c < 32) {
        h = x.hi >>> c | x.lo << c1;
        l = x.lo >>> c | x.hi << c1;
      } else if (c < 64) {
        h = x.lo >>> c | x.hi << c1;
        l = x.hi >>> c | x.lo << c1;
      }
      return new u64(h, l);
    }
    function Ch(x, y, z) {
      var h = x.hi & y.hi ^ ~x.hi & z.hi, l = x.lo & y.lo ^ ~x.lo & z.lo;
      return new u64(h, l);
    }
    function Maj(x, y, z) {
      var h = x.hi & y.hi ^ x.hi & z.hi ^ y.hi & z.hi, l = x.lo & y.lo ^ x.lo & z.lo ^ y.lo & z.lo;
      return new u64(h, l);
    }
    function Sigma0(x) {
      return xor64(R(x, 28), R(x, 34), R(x, 39));
    }
    function Sigma1(x) {
      return xor64(R(x, 14), R(x, 18), R(x, 41));
    }
    function sigma0(x) {
      return xor64(R(x, 1), R(x, 8), shr64(x, 7));
    }
    function sigma1(x) {
      return xor64(R(x, 19), R(x, 61), shr64(x, 6));
    }
    var K = [
      new u64(1116352408, 3609767458),
      new u64(1899447441, 602891725),
      new u64(3049323471, 3964484399),
      new u64(3921009573, 2173295548),
      new u64(961987163, 4081628472),
      new u64(1508970993, 3053834265),
      new u64(2453635748, 2937671579),
      new u64(2870763221, 3664609560),
      new u64(3624381080, 2734883394),
      new u64(310598401, 1164996542),
      new u64(607225278, 1323610764),
      new u64(1426881987, 3590304994),
      new u64(1925078388, 4068182383),
      new u64(2162078206, 991336113),
      new u64(2614888103, 633803317),
      new u64(3248222580, 3479774868),
      new u64(3835390401, 2666613458),
      new u64(4022224774, 944711139),
      new u64(264347078, 2341262773),
      new u64(604807628, 2007800933),
      new u64(770255983, 1495990901),
      new u64(1249150122, 1856431235),
      new u64(1555081692, 3175218132),
      new u64(1996064986, 2198950837),
      new u64(2554220882, 3999719339),
      new u64(2821834349, 766784016),
      new u64(2952996808, 2566594879),
      new u64(3210313671, 3203337956),
      new u64(3336571891, 1034457026),
      new u64(3584528711, 2466948901),
      new u64(113926993, 3758326383),
      new u64(338241895, 168717936),
      new u64(666307205, 1188179964),
      new u64(773529912, 1546045734),
      new u64(1294757372, 1522805485),
      new u64(1396182291, 2643833823),
      new u64(1695183700, 2343527390),
      new u64(1986661051, 1014477480),
      new u64(2177026350, 1206759142),
      new u64(2456956037, 344077627),
      new u64(2730485921, 1290863460),
      new u64(2820302411, 3158454273),
      new u64(3259730800, 3505952657),
      new u64(3345764771, 106217008),
      new u64(3516065817, 3606008344),
      new u64(3600352804, 1432725776),
      new u64(4094571909, 1467031594),
      new u64(275423344, 851169720),
      new u64(430227734, 3100823752),
      new u64(506948616, 1363258195),
      new u64(659060556, 3750685593),
      new u64(883997877, 3785050280),
      new u64(958139571, 3318307427),
      new u64(1322822218, 3812723403),
      new u64(1537002063, 2003034995),
      new u64(1747873779, 3602036899),
      new u64(1955562222, 1575990012),
      new u64(2024104815, 1125592928),
      new u64(2227730452, 2716904306),
      new u64(2361852424, 442776044),
      new u64(2428436474, 593698344),
      new u64(2756734187, 3733110249),
      new u64(3204031479, 2999351573),
      new u64(3329325298, 3815920427),
      new u64(3391569614, 3928383900),
      new u64(3515267271, 566280711),
      new u64(3940187606, 3454069534),
      new u64(4118630271, 4000239992),
      new u64(116418474, 1914138554),
      new u64(174292421, 2731055270),
      new u64(289380356, 3203993006),
      new u64(460393269, 320620315),
      new u64(685471733, 587496836),
      new u64(852142971, 1086792851),
      new u64(1017036298, 365543100),
      new u64(1126000580, 2618297676),
      new u64(1288033470, 3409855158),
      new u64(1501505948, 4234509866),
      new u64(1607167915, 987167468),
      new u64(1816402316, 1246189591)
    ];
    function crypto_hashblocks(x, m, n) {
      var z = [], b = [], a = [], w = [], t, i, j;
      for (i = 0; i < 8; i++)
        z[i] = a[i] = dl64(x, 8 * i);
      var pos = 0;
      while (n >= 128) {
        for (i = 0; i < 16; i++)
          w[i] = dl64(m, 8 * i + pos);
        for (i = 0; i < 80; i++) {
          for (j = 0; j < 8; j++)
            b[j] = a[j];
          t = add64(a[7], Sigma1(a[4]), Ch(a[4], a[5], a[6]), K[i], w[i % 16]);
          b[7] = add64(t, Sigma0(a[0]), Maj(a[0], a[1], a[2]));
          b[3] = add64(b[3], t);
          for (j = 0; j < 8; j++)
            a[(j + 1) % 8] = b[j];
          if (i % 16 === 15) {
            for (j = 0; j < 16; j++) {
              w[j] = add64(w[j], w[(j + 9) % 16], sigma0(w[(j + 1) % 16]), sigma1(w[(j + 14) % 16]));
            }
          }
        }
        for (i = 0; i < 8; i++) {
          a[i] = add64(a[i], z[i]);
          z[i] = a[i];
        }
        pos += 128;
        n -= 128;
      }
      for (i = 0; i < 8; i++)
        ts64(x, 8 * i, z[i]);
      return n;
    }
    var iv = new Uint8Array([
      106,
      9,
      230,
      103,
      243,
      188,
      201,
      8,
      187,
      103,
      174,
      133,
      132,
      202,
      167,
      59,
      60,
      110,
      243,
      114,
      254,
      148,
      248,
      43,
      165,
      79,
      245,
      58,
      95,
      29,
      54,
      241,
      81,
      14,
      82,
      127,
      173,
      230,
      130,
      209,
      155,
      5,
      104,
      140,
      43,
      62,
      108,
      31,
      31,
      131,
      217,
      171,
      251,
      65,
      189,
      107,
      91,
      224,
      205,
      25,
      19,
      126,
      33,
      121
    ]);
    function crypto_hash(out, m, n) {
      var h = new Uint8Array(64), x = new Uint8Array(256);
      var i, b = n;
      for (i = 0; i < 64; i++)
        h[i] = iv[i];
      crypto_hashblocks(h, m, n);
      n %= 128;
      for (i = 0; i < 256; i++)
        x[i] = 0;
      for (i = 0; i < n; i++)
        x[i] = m[b - n + i];
      x[n] = 128;
      n = 256 - 128 * (n < 112 ? 1 : 0);
      x[n - 9] = 0;
      ts64(x, n - 8, new u64(b / 536870912 | 0, b << 3));
      crypto_hashblocks(h, x, n);
      for (i = 0; i < 64; i++)
        out[i] = h[i];
      return 0;
    }
    function add(p, q) {
      var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf(), g = gf(), h = gf(), t = gf();
      Z(a, p[1], p[0]);
      Z(t, q[1], q[0]);
      M(a, a, t);
      A(b, p[0], p[1]);
      A(t, q[0], q[1]);
      M(b, b, t);
      M(c, p[3], q[3]);
      M(c, c, D2);
      M(d, p[2], q[2]);
      A(d, d, d);
      Z(e, b, a);
      Z(f, d, c);
      A(g, d, c);
      A(h, b, a);
      M(p[0], e, f);
      M(p[1], h, g);
      M(p[2], g, f);
      M(p[3], e, h);
    }
    function cswap(p, q, b) {
      var i;
      for (i = 0; i < 4; i++) {
        sel25519(p[i], q[i], b);
      }
    }
    function pack(r, p) {
      var tx = gf(), ty = gf(), zi = gf();
      inv25519(zi, p[2]);
      M(tx, p[0], zi);
      M(ty, p[1], zi);
      pack25519(r, ty);
      r[31] ^= par25519(tx) << 7;
    }
    function scalarmult(p, q, s) {
      var b, i;
      set25519(p[0], gf0);
      set25519(p[1], gf1);
      set25519(p[2], gf1);
      set25519(p[3], gf0);
      for (i = 255; i >= 0; --i) {
        b = s[i / 8 | 0] >> (i & 7) & 1;
        cswap(p, q, b);
        add(q, p);
        add(p, p);
        cswap(p, q, b);
      }
    }
    function scalarbase(p, s) {
      var q = [
        gf(),
        gf(),
        gf(),
        gf()
      ];
      set25519(q[0], X);
      set25519(q[1], Y);
      set25519(q[2], gf1);
      M(q[3], X, Y);
      scalarmult(p, q, s);
    }
    function crypto_sign_keypair(pk, sk, seeded) {
      var d = new Uint8Array(64);
      var p = [
        gf(),
        gf(),
        gf(),
        gf()
      ];
      var i;
      if (!seeded)
        randombytes(sk, 32);
      crypto_hash(d, sk, 32);
      d[0] &= 248;
      d[31] &= 127;
      d[31] |= 64;
      scalarbase(p, d);
      pack(pk, p);
      for (i = 0; i < 32; i++)
        sk[i + 32] = pk[i];
      return 0;
    }
    var L = new Float64Array([
      237,
      211,
      245,
      92,
      26,
      99,
      18,
      88,
      214,
      156,
      247,
      162,
      222,
      249,
      222,
      20,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      16
    ]);
    function modL(r, x) {
      var carry, i, j, k;
      for (i = 63; i >= 32; --i) {
        carry = 0;
        for (j = i - 32, k = i - 12; j < k; ++j) {
          x[j] += carry - 16 * x[i] * L[j - (i - 32)];
          carry = Math.floor((x[j] + 128) / 256);
          x[j] -= carry * 256;
        }
        x[j] += carry;
        x[i] = 0;
      }
      carry = 0;
      for (j = 0; j < 32; j++) {
        x[j] += carry - (x[31] >> 4) * L[j];
        carry = x[j] >> 8;
        x[j] &= 255;
      }
      for (j = 0; j < 32; j++)
        x[j] -= carry * L[j];
      for (i = 0; i < 32; i++) {
        x[i + 1] += x[i] >> 8;
        r[i] = x[i] & 255;
      }
    }
    function reduce(r) {
      var x = new Float64Array(64), i;
      for (i = 0; i < 64; i++)
        x[i] = r[i];
      for (i = 0; i < 64; i++)
        r[i] = 0;
      modL(r, x);
    }
    function crypto_sign(sm, m, n, sk) {
      var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
      var i, j, x = new Float64Array(64);
      var p = [
        gf(),
        gf(),
        gf(),
        gf()
      ];
      crypto_hash(d, sk, 32);
      d[0] &= 248;
      d[31] &= 127;
      d[31] |= 64;
      var smlen = n + 64;
      for (i = 0; i < n; i++)
        sm[64 + i] = m[i];
      for (i = 0; i < 32; i++)
        sm[32 + i] = d[32 + i];
      crypto_hash(r, sm.subarray(32), n + 32);
      reduce(r);
      scalarbase(p, r);
      pack(sm, p);
      for (i = 32; i < 64; i++)
        sm[i] = sk[i];
      crypto_hash(h, sm, n + 64);
      reduce(h);
      for (i = 0; i < 64; i++)
        x[i] = 0;
      for (i = 0; i < 32; i++)
        x[i] = r[i];
      for (i = 0; i < 32; i++) {
        for (j = 0; j < 32; j++) {
          x[i + j] += h[i] * d[j];
        }
      }
      modL(sm.subarray(32), x);
      return smlen;
    }
    function unpackneg(r, p) {
      var t = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
      set25519(r[2], gf1);
      unpack25519(r[1], p);
      S(num, r[1]);
      M(den, num, D);
      Z(num, num, r[2]);
      A(den, r[2], den);
      S(den2, den);
      S(den4, den2);
      M(den6, den4, den2);
      M(t, den6, num);
      M(t, t, den);
      pow2523(t, t);
      M(t, t, num);
      M(t, t, den);
      M(t, t, den);
      M(r[0], t, den);
      S(chk, r[0]);
      M(chk, chk, den);
      if (neq25519(chk, num))
        M(r[0], r[0], I);
      S(chk, r[0]);
      M(chk, chk, den);
      if (neq25519(chk, num))
        return -1;
      if (par25519(r[0]) === p[31] >> 7)
        Z(r[0], gf0, r[0]);
      M(r[3], r[0], r[1]);
      return 0;
    }
    function crypto_sign_open(m, sm, n, pk) {
      var i;
      var t = new Uint8Array(32), h = new Uint8Array(64);
      var p = [
        gf(),
        gf(),
        gf(),
        gf()
      ], q = [
        gf(),
        gf(),
        gf(),
        gf()
      ];
      if (n < 64)
        return -1;
      if (unpackneg(q, pk))
        return -1;
      for (i = 0; i < n; i++)
        m[i] = sm[i];
      for (i = 0; i < 32; i++)
        m[i + 32] = pk[i];
      crypto_hash(h, m, n);
      reduce(h);
      scalarmult(p, q, h);
      scalarbase(q, sm.subarray(32));
      add(p, q);
      pack(t, p);
      n -= 64;
      if (crypto_verify_32(sm, 0, t, 0)) {
        for (i = 0; i < n; i++)
          m[i] = 0;
        return -1;
      }
      for (i = 0; i < n; i++)
        m[i] = sm[i + 64];
      return n;
    }
    var crypto_secretbox_KEYBYTES = 32, crypto_secretbox_NONCEBYTES = 24, crypto_secretbox_ZEROBYTES = 32, crypto_secretbox_BOXZEROBYTES = 16, crypto_scalarmult_BYTES = 32, crypto_scalarmult_SCALARBYTES = 32, crypto_box_PUBLICKEYBYTES = 32, crypto_box_SECRETKEYBYTES = 32, crypto_box_BEFORENMBYTES = 32, crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES, crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES, crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES, crypto_sign_BYTES = 64, crypto_sign_PUBLICKEYBYTES = 32, crypto_sign_SECRETKEYBYTES = 64, crypto_sign_SEEDBYTES = 32, crypto_hash_BYTES = 64;
    nacl.lowlevel = {
      crypto_core_hsalsa20,
      crypto_stream_xor,
      crypto_stream,
      crypto_stream_salsa20_xor,
      crypto_stream_salsa20,
      crypto_onetimeauth,
      crypto_onetimeauth_verify,
      crypto_verify_16,
      crypto_verify_32,
      crypto_secretbox,
      crypto_secretbox_open,
      crypto_scalarmult,
      crypto_scalarmult_base,
      crypto_box_beforenm,
      crypto_box_afternm,
      crypto_box,
      crypto_box_open,
      crypto_box_keypair,
      crypto_hash,
      crypto_sign,
      crypto_sign_keypair,
      crypto_sign_open,
      crypto_secretbox_KEYBYTES,
      crypto_secretbox_NONCEBYTES,
      crypto_secretbox_ZEROBYTES,
      crypto_secretbox_BOXZEROBYTES,
      crypto_scalarmult_BYTES,
      crypto_scalarmult_SCALARBYTES,
      crypto_box_PUBLICKEYBYTES,
      crypto_box_SECRETKEYBYTES,
      crypto_box_BEFORENMBYTES,
      crypto_box_NONCEBYTES,
      crypto_box_ZEROBYTES,
      crypto_box_BOXZEROBYTES,
      crypto_sign_BYTES,
      crypto_sign_PUBLICKEYBYTES,
      crypto_sign_SECRETKEYBYTES,
      crypto_sign_SEEDBYTES,
      crypto_hash_BYTES,
      gf,
      D,
      L,
      pack25519,
      unpack25519,
      M,
      A,
      S,
      Z,
      pow2523,
      add,
      set25519,
      modL,
      scalarmult,
      scalarbase
    };
    function checkLengths(k, n) {
      if (k.length !== crypto_secretbox_KEYBYTES)
        throw new Error("bad key size");
      if (n.length !== crypto_secretbox_NONCEBYTES)
        throw new Error("bad nonce size");
    }
    function checkBoxLengths(pk, sk) {
      if (pk.length !== crypto_box_PUBLICKEYBYTES)
        throw new Error("bad public key size");
      if (sk.length !== crypto_box_SECRETKEYBYTES)
        throw new Error("bad secret key size");
    }
    function checkArrayTypes() {
      for (var i = 0; i < arguments.length; i++) {
        if (!(arguments[i] instanceof Uint8Array))
          throw new TypeError("unexpected type, use Uint8Array");
      }
    }
    function cleanup(arr) {
      for (var i = 0; i < arr.length; i++)
        arr[i] = 0;
    }
    nacl.randomBytes = function(n) {
      var b = new Uint8Array(n);
      randombytes(b, n);
      return b;
    };
    nacl.secretbox = function(msg, nonce, key) {
      checkArrayTypes(msg, nonce, key);
      checkLengths(key, nonce);
      var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
      var c = new Uint8Array(m.length);
      for (var i = 0; i < msg.length; i++)
        m[i + crypto_secretbox_ZEROBYTES] = msg[i];
      crypto_secretbox(c, m, m.length, nonce, key);
      return c.subarray(crypto_secretbox_BOXZEROBYTES);
    };
    nacl.secretbox.open = function(box, nonce, key) {
      checkArrayTypes(box, nonce, key);
      checkLengths(key, nonce);
      var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
      var m = new Uint8Array(c.length);
      for (var i = 0; i < box.length; i++)
        c[i + crypto_secretbox_BOXZEROBYTES] = box[i];
      if (c.length < 32)
        return null;
      if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0)
        return null;
      return m.subarray(crypto_secretbox_ZEROBYTES);
    };
    nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES;
    nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
    nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;
    nacl.scalarMult = function(n, p) {
      checkArrayTypes(n, p);
      if (n.length !== crypto_scalarmult_SCALARBYTES)
        throw new Error("bad n size");
      if (p.length !== crypto_scalarmult_BYTES)
        throw new Error("bad p size");
      var q = new Uint8Array(crypto_scalarmult_BYTES);
      crypto_scalarmult(q, n, p);
      return q;
    };
    nacl.scalarMult.base = function(n) {
      checkArrayTypes(n);
      if (n.length !== crypto_scalarmult_SCALARBYTES)
        throw new Error("bad n size");
      var q = new Uint8Array(crypto_scalarmult_BYTES);
      crypto_scalarmult_base(q, n);
      return q;
    };
    nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
    nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES;
    nacl.box = function(msg, nonce, publicKey, secretKey) {
      var k = nacl.box.before(publicKey, secretKey);
      return nacl.secretbox(msg, nonce, k);
    };
    nacl.box.before = function(publicKey, secretKey) {
      checkArrayTypes(publicKey, secretKey);
      checkBoxLengths(publicKey, secretKey);
      var k = new Uint8Array(crypto_box_BEFORENMBYTES);
      crypto_box_beforenm(k, publicKey, secretKey);
      return k;
    };
    nacl.box.after = nacl.secretbox;
    nacl.box.open = function(msg, nonce, publicKey, secretKey) {
      var k = nacl.box.before(publicKey, secretKey);
      return nacl.secretbox.open(msg, nonce, k);
    };
    nacl.box.open.after = nacl.secretbox.open;
    nacl.box.keyPair = function() {
      var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
      var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
      crypto_box_keypair(pk, sk);
      return {
        publicKey: pk,
        secretKey: sk
      };
    };
    nacl.box.keyPair.fromSecretKey = function(secretKey) {
      checkArrayTypes(secretKey);
      if (secretKey.length !== crypto_box_SECRETKEYBYTES)
        throw new Error("bad secret key size");
      var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
      crypto_scalarmult_base(pk, secretKey);
      return {
        publicKey: pk,
        secretKey: new Uint8Array(secretKey)
      };
    };
    nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
    nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
    nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
    nacl.box.nonceLength = crypto_box_NONCEBYTES;
    nacl.box.overheadLength = nacl.secretbox.overheadLength;
    nacl.sign = function(msg, secretKey) {
      checkArrayTypes(msg, secretKey);
      if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
        throw new Error("bad secret key size");
      var signedMsg = new Uint8Array(crypto_sign_BYTES + msg.length);
      crypto_sign(signedMsg, msg, msg.length, secretKey);
      return signedMsg;
    };
    nacl.sign.open = function(signedMsg, publicKey) {
      checkArrayTypes(signedMsg, publicKey);
      if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
        throw new Error("bad public key size");
      var tmp = new Uint8Array(signedMsg.length);
      var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
      if (mlen < 0)
        return null;
      var m = new Uint8Array(mlen);
      for (var i = 0; i < m.length; i++)
        m[i] = tmp[i];
      return m;
    };
    nacl.sign.detached = function(msg, secretKey) {
      var signedMsg = nacl.sign(msg, secretKey);
      var sig = new Uint8Array(crypto_sign_BYTES);
      for (var i = 0; i < sig.length; i++)
        sig[i] = signedMsg[i];
      return sig;
    };
    nacl.sign.detached.verify = function(msg, sig, publicKey) {
      checkArrayTypes(msg, sig, publicKey);
      if (sig.length !== crypto_sign_BYTES)
        throw new Error("bad signature size");
      if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
        throw new Error("bad public key size");
      var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
      var m = new Uint8Array(crypto_sign_BYTES + msg.length);
      var i;
      for (i = 0; i < crypto_sign_BYTES; i++)
        sm[i] = sig[i];
      for (i = 0; i < msg.length; i++)
        sm[i + crypto_sign_BYTES] = msg[i];
      return crypto_sign_open(m, sm, sm.length, publicKey) >= 0;
    };
    nacl.sign.keyPair = function() {
      var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
      var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
      crypto_sign_keypair(pk, sk);
      return {
        publicKey: pk,
        secretKey: sk
      };
    };
    nacl.sign.keyPair.fromSecretKey = function(secretKey) {
      checkArrayTypes(secretKey);
      if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
        throw new Error("bad secret key size");
      var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
      for (var i = 0; i < pk.length; i++)
        pk[i] = secretKey[32 + i];
      return {
        publicKey: pk,
        secretKey: new Uint8Array(secretKey)
      };
    };
    nacl.sign.keyPair.fromSeed = function(seed) {
      checkArrayTypes(seed);
      if (seed.length !== crypto_sign_SEEDBYTES)
        throw new Error("bad seed size");
      var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
      var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
      for (var i = 0; i < 32; i++)
        sk[i] = seed[i];
      crypto_sign_keypair(pk, sk, true);
      return {
        publicKey: pk,
        secretKey: sk
      };
    };
    nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
    nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
    nacl.sign.seedLength = crypto_sign_SEEDBYTES;
    nacl.sign.signatureLength = crypto_sign_BYTES;
    nacl.hash = function(msg) {
      checkArrayTypes(msg);
      var h = new Uint8Array(crypto_hash_BYTES);
      crypto_hash(h, msg, msg.length);
      return h;
    };
    nacl.hash.hashLength = crypto_hash_BYTES;
    nacl.verify = function(x, y) {
      checkArrayTypes(x, y);
      if (x.length === 0 || y.length === 0)
        return false;
      if (x.length !== y.length)
        return false;
      return vn(x, 0, y, 0, x.length) === 0 ? true : false;
    };
    nacl.setPRNG = function(fn) {
      randombytes = fn;
    };
    (function() {
      var crypto = typeof self !== "undefined" ? self.crypto || self.msCrypto : null;
      if (crypto && crypto.getRandomValues) {
        var QUOTA = 65536;
        nacl.setPRNG(function(x, n) {
          var i, v = new Uint8Array(n);
          for (i = 0; i < n; i += QUOTA) {
            crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
          }
          for (i = 0; i < n; i++)
            x[i] = v[i];
          cleanup(v);
        });
      } else if (typeof commonjsRequire !== "undefined") {
        crypto = require$$0;
        if (crypto && crypto.randomBytes) {
          nacl.setPRNG(function(x, n) {
            var i, v = crypto.randomBytes(n);
            for (i = 0; i < n; i++)
              x[i] = v[i];
            cleanup(v);
          });
        }
      }
    })();
  })(module.exports ? module.exports : self.nacl = self.nacl || {});
})(tweetnacl);
var tweetnaclExports = tweetnacl.exports;const RowManager = metro.findByName("RowManager");
const pluginName = "Encryption";
function constructMessage(message, channel) {
  let msg = {
    id: "",
    type: 0,
    content: "",
    channel_id: channel.id,
    author: {
      id: "",
      username: "",
      avatar: "",
      discriminator: "",
      publicFlags: 0,
      avatarDecoration: null
    },
    attachments: [],
    embeds: [],
    mentions: [],
    mention_roles: [],
    pinned: false,
    mention_everyone: false,
    tts: false,
    timestamp: "",
    edited_timestamp: null,
    flags: 0,
    components: []
  };
  if (typeof message === "string")
    msg.content = message;
  else
    msg = {
      ...msg,
      ...message
    };
  return msg;
}
const shouldModify = function(message) {
  if (!message?.content?.startsWith("<enc:"))
    return false;
  const parts = message.content.split(":");
  if (parts.length < 2)
    return false;
  const encryptedContent = parts[1];
  return encryptedContent?.length > 2;
};
let patches = [];
const startPlugin = function() {
  try {
    _vendetta.logger.log("TweetNaCl: " + tweetnaclExports.box.keyPair());
    const patch1 = patcher.before("generate", RowManager.prototype, function([data]) {
      if (shouldModify(data.message)) {
        try {
          let decryptedContent = atob(data.message.content?.split(":")[1]) ?? null;
          if (decryptedContent == null)
            return;
          data.message.content = `${decryptedContent}
-# [Triggered Encryption]`;
        } catch (e) {
          return;
        }
      }
    });
    patches.push(patch1);
    _vendetta.logger.log(`${pluginName} loaded.`);
  } catch (err) {
    _vendetta.logger.error(`[${pluginName} Error]`, err);
  }
};
var index = {
  onLoad: function() {
    _vendetta.logger.log(`Loading ${pluginName}...`);
    for (let type of [
      "MESSAGE_CREATE",
      "MESSAGE_UPDATE",
      "LOAD_MESSAGES",
      "LOAD_MESSAGES_SUCCESS"
    ]) {
      _vendetta.logger.log(`Dispatching ${type} to enable handler.`);
      common.FluxDispatcher.dispatch({
        type,
        message: constructMessage("PLACEHOLDER", {
          id: "0"
        }),
        messages: []
      });
    }
    startPlugin();
  },
  onUnload: function() {
    _vendetta.logger.log(`Unloading ${pluginName}...`);
    for (let unpatch of patches)
      unpatch();
    patches = [];
    _vendetta.logger.log(`${pluginName} unloaded.`);
  },
  settings: Settings
};exports.default=index;Object.defineProperty(exports,'__esModule',{value:true});return exports;})({},vendetta.metro.common,vendetta.patcher,vendetta.metro,vendetta,vendetta.ui.components,require$$0);