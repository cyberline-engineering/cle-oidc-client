var N = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ye(e) {
  var t = e.default;
  if (typeof t == "function") {
    var s = function() {
      return t.apply(this, arguments);
    };
    s.prototype = t.prototype;
  } else
    s = {};
  return Object.defineProperty(s, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(s, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), s;
}
function be(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var z = { exports: {} };
const ke = {}, Ee = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ke
}, Symbol.toStringTag, { value: "Module" })), Te = /* @__PURE__ */ ye(Ee);
var te;
function F() {
  return te || (te = 1, function(e, t) {
    (function(s, r) {
      e.exports = r();
    })(N, function() {
      var s = s || function(r, i) {
        var n;
        if (typeof window < "u" && window.crypto && (n = window.crypto), typeof self < "u" && self.crypto && (n = self.crypto), typeof globalThis < "u" && globalThis.crypto && (n = globalThis.crypto), !n && typeof window < "u" && window.msCrypto && (n = window.msCrypto), !n && typeof N < "u" && N.crypto && (n = N.crypto), !n && typeof be == "function")
          try {
            n = Te;
          } catch {
          }
        var o = function() {
          if (n) {
            if (typeof n.getRandomValues == "function")
              try {
                return n.getRandomValues(new Uint32Array(1))[0];
              } catch {
              }
            if (typeof n.randomBytes == "function")
              try {
                return n.randomBytes(4).readInt32LE();
              } catch {
              }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        }, l = Object.create || function() {
          function a() {
          }
          return function(d) {
            var p;
            return a.prototype = d, p = new a(), a.prototype = null, p;
          };
        }(), c = {}, u = c.lib = {}, _ = u.Base = function() {
          return {
            extend: function(a) {
              var d = l(this);
              return a && d.mixIn(a), (!d.hasOwnProperty("init") || this.init === d.init) && (d.init = function() {
                d.$super.init.apply(this, arguments);
              }), d.init.prototype = d, d.$super = this, d;
            },
            create: function() {
              var a = this.extend();
              return a.init.apply(a, arguments), a;
            },
            init: function() {
            },
            mixIn: function(a) {
              for (var d in a)
                a.hasOwnProperty(d) && (this[d] = a[d]);
              a.hasOwnProperty("toString") && (this.toString = a.toString);
            },
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }(), g = u.WordArray = _.extend({
          init: function(a, d) {
            a = this.words = a || [], d != i ? this.sigBytes = d : this.sigBytes = a.length * 4;
          },
          toString: function(a) {
            return (a || w).stringify(this);
          },
          concat: function(a) {
            var d = this.words, p = a.words, m = this.sigBytes, y = a.sigBytes;
            if (this.clamp(), m % 4)
              for (var k = 0; k < y; k++) {
                var T = p[k >>> 2] >>> 24 - k % 4 * 8 & 255;
                d[m + k >>> 2] |= T << 24 - (m + k) % 4 * 8;
              }
            else
              for (var R = 0; R < y; R += 4)
                d[m + R >>> 2] = p[R >>> 2];
            return this.sigBytes += y, this;
          },
          clamp: function() {
            var a = this.words, d = this.sigBytes;
            a[d >>> 2] &= 4294967295 << 32 - d % 4 * 8, a.length = r.ceil(d / 4);
          },
          clone: function() {
            var a = _.clone.call(this);
            return a.words = this.words.slice(0), a;
          },
          random: function(a) {
            for (var d = [], p = 0; p < a; p += 4)
              d.push(o());
            return new g.init(d, a);
          }
        }), S = c.enc = {}, w = S.Hex = {
          stringify: function(a) {
            for (var d = a.words, p = a.sigBytes, m = [], y = 0; y < p; y++) {
              var k = d[y >>> 2] >>> 24 - y % 4 * 8 & 255;
              m.push((k >>> 4).toString(16)), m.push((k & 15).toString(16));
            }
            return m.join("");
          },
          parse: function(a) {
            for (var d = a.length, p = [], m = 0; m < d; m += 2)
              p[m >>> 3] |= parseInt(a.substr(m, 2), 16) << 24 - m % 8 * 4;
            return new g.init(p, d / 2);
          }
        }, b = S.Latin1 = {
          stringify: function(a) {
            for (var d = a.words, p = a.sigBytes, m = [], y = 0; y < p; y++) {
              var k = d[y >>> 2] >>> 24 - y % 4 * 8 & 255;
              m.push(String.fromCharCode(k));
            }
            return m.join("");
          },
          parse: function(a) {
            for (var d = a.length, p = [], m = 0; m < d; m++)
              p[m >>> 2] |= (a.charCodeAt(m) & 255) << 24 - m % 4 * 8;
            return new g.init(p, d);
          }
        }, h = S.Utf8 = {
          stringify: function(a) {
            try {
              return decodeURIComponent(escape(b.stringify(a)));
            } catch {
              throw new Error("Malformed UTF-8 data");
            }
          },
          parse: function(a) {
            return b.parse(unescape(encodeURIComponent(a)));
          }
        }, v = u.BufferedBlockAlgorithm = _.extend({
          reset: function() {
            this._data = new g.init(), this._nDataBytes = 0;
          },
          _append: function(a) {
            typeof a == "string" && (a = h.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes;
          },
          _process: function(a) {
            var d, p = this._data, m = p.words, y = p.sigBytes, k = this.blockSize, T = k * 4, R = y / T;
            a ? R = r.ceil(R) : R = r.max((R | 0) - this._minBufferSize, 0);
            var C = R * k, I = r.min(C * 4, y);
            if (C) {
              for (var A = 0; A < C; A += k)
                this._doProcessBlock(m, A);
              d = m.splice(0, C), p.sigBytes -= I;
            }
            return new g.init(d, I);
          },
          clone: function() {
            var a = _.clone.call(this);
            return a._data = this._data.clone(), a;
          },
          _minBufferSize: 0
        });
        u.Hasher = v.extend({
          cfg: _.extend(),
          init: function(a) {
            this.cfg = this.cfg.extend(a), this.reset();
          },
          reset: function() {
            v.reset.call(this), this._doReset();
          },
          update: function(a) {
            return this._append(a), this._process(), this;
          },
          finalize: function(a) {
            a && this._append(a);
            var d = this._doFinalize();
            return d;
          },
          blockSize: 16,
          _createHelper: function(a) {
            return function(d, p) {
              return new a.init(p).finalize(d);
            };
          },
          _createHmacHelper: function(a) {
            return function(d, p) {
              return new E.HMAC.init(a, p).finalize(d);
            };
          }
        });
        var E = c.algo = {};
        return c;
      }(Math);
      return s;
    });
  }(z)), z.exports;
}
var Re = F(), ce = { exports: {} };
(function(e, t) {
  (function(s, r) {
    e.exports = r(F());
  })(N, function(s) {
    return function(r) {
      var i = s, n = i.lib, o = n.WordArray, l = n.Hasher, c = i.algo, u = [], _ = [];
      (function() {
        function w(E) {
          for (var a = r.sqrt(E), d = 2; d <= a; d++)
            if (!(E % d))
              return !1;
          return !0;
        }
        function b(E) {
          return (E - (E | 0)) * 4294967296 | 0;
        }
        for (var h = 2, v = 0; v < 64; )
          w(h) && (v < 8 && (u[v] = b(r.pow(h, 1 / 2))), _[v] = b(r.pow(h, 1 / 3)), v++), h++;
      })();
      var g = [], S = c.SHA256 = l.extend({
        _doReset: function() {
          this._hash = new o.init(u.slice(0));
        },
        _doProcessBlock: function(w, b) {
          for (var h = this._hash.words, v = h[0], E = h[1], a = h[2], d = h[3], p = h[4], m = h[5], y = h[6], k = h[7], T = 0; T < 64; T++) {
            if (T < 16)
              g[T] = w[b + T] | 0;
            else {
              var R = g[T - 15], C = (R << 25 | R >>> 7) ^ (R << 14 | R >>> 18) ^ R >>> 3, I = g[T - 2], A = (I << 15 | I >>> 17) ^ (I << 13 | I >>> 19) ^ I >>> 10;
              g[T] = C + g[T - 7] + A + g[T - 16];
            }
            var $ = p & m ^ ~p & y, L = v & E ^ v & a ^ E & a, D = (v << 30 | v >>> 2) ^ (v << 19 | v >>> 13) ^ (v << 10 | v >>> 22), ve = (p << 26 | p >>> 6) ^ (p << 21 | p >>> 11) ^ (p << 7 | p >>> 25), ee = k + ve + $ + _[T] + g[T], Se = D + L;
            k = y, y = m, m = p, p = d + ee | 0, d = a, a = E, E = v, v = ee + Se | 0;
          }
          h[0] = h[0] + v | 0, h[1] = h[1] + E | 0, h[2] = h[2] + a | 0, h[3] = h[3] + d | 0, h[4] = h[4] + p | 0, h[5] = h[5] + m | 0, h[6] = h[6] + y | 0, h[7] = h[7] + k | 0;
        },
        _doFinalize: function() {
          var w = this._data, b = w.words, h = this._nDataBytes * 8, v = w.sigBytes * 8;
          return b[v >>> 5] |= 128 << 24 - v % 32, b[(v + 64 >>> 9 << 4) + 14] = r.floor(h / 4294967296), b[(v + 64 >>> 9 << 4) + 15] = h, w.sigBytes = b.length * 4, this._process(), this._hash;
        },
        clone: function() {
          var w = l.clone.call(this);
          return w._hash = this._hash.clone(), w;
        }
      });
      i.SHA256 = l._createHelper(S), i.HmacSHA256 = l._createHmacHelper(S);
    }(Math), s.SHA256;
  });
})(ce);
const xe = ce.exports;
var le = { exports: {} };
(function(e, t) {
  (function(s, r) {
    e.exports = r(F());
  })(N, function(s) {
    return function() {
      var r = s, i = r.lib, n = i.WordArray, o = r.enc;
      o.Base64 = {
        stringify: function(c) {
          var u = c.words, _ = c.sigBytes, g = this._map;
          c.clamp();
          for (var S = [], w = 0; w < _; w += 3)
            for (var b = u[w >>> 2] >>> 24 - w % 4 * 8 & 255, h = u[w + 1 >>> 2] >>> 24 - (w + 1) % 4 * 8 & 255, v = u[w + 2 >>> 2] >>> 24 - (w + 2) % 4 * 8 & 255, E = b << 16 | h << 8 | v, a = 0; a < 4 && w + a * 0.75 < _; a++)
              S.push(g.charAt(E >>> 6 * (3 - a) & 63));
          var d = g.charAt(64);
          if (d)
            for (; S.length % 4; )
              S.push(d);
          return S.join("");
        },
        parse: function(c) {
          var u = c.length, _ = this._map, g = this._reverseMap;
          if (!g) {
            g = this._reverseMap = [];
            for (var S = 0; S < _.length; S++)
              g[_.charCodeAt(S)] = S;
          }
          var w = _.charAt(64);
          if (w) {
            var b = c.indexOf(w);
            b !== -1 && (u = b);
          }
          return l(c, u, g);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      };
      function l(c, u, _) {
        for (var g = [], S = 0, w = 0; w < u; w++)
          if (w % 4) {
            var b = _[c.charCodeAt(w - 1)] << w % 4 * 2, h = _[c.charCodeAt(w)] >>> 6 - w % 4 * 2, v = b | h;
            g[S >>> 2] |= v << 24 - S % 4 * 8, S++;
          }
        return n.create(g, S);
      }
    }(), s.enc.Base64;
  });
})(le);
const se = le.exports;
var de = { exports: {} };
(function(e, t) {
  (function(s, r) {
    e.exports = r(F());
  })(N, function(s) {
    return s.enc.Utf8;
  });
})(de);
const Ce = de.exports;
function K(e) {
  this.message = e;
}
K.prototype = new Error(), K.prototype.name = "InvalidCharacterError";
var re = typeof window < "u" && window.atob && window.atob.bind(window) || function(e) {
  var t = String(e).replace(/=+$/, "");
  if (t.length % 4 == 1)
    throw new K("'atob' failed: The string to be decoded is not correctly encoded.");
  for (var s, r, i = 0, n = 0, o = ""; r = t.charAt(n++); ~r && (s = i % 4 ? 64 * s + r : r, i++ % 4) ? o += String.fromCharCode(255 & s >> (-2 * i & 6)) : 0)
    r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(r);
  return o;
};
function Ie(e) {
  var t = e.replace(/-/g, "+").replace(/_/g, "/");
  switch (t.length % 4) {
    case 0:
      break;
    case 2:
      t += "==";
      break;
    case 3:
      t += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }
  try {
    return function(s) {
      return decodeURIComponent(re(s).replace(/(.)/g, function(r, i) {
        var n = i.charCodeAt(0).toString(16).toUpperCase();
        return n.length < 2 && (n = "0" + n), "%" + n;
      }));
    }(t);
  } catch {
    return re(t);
  }
}
function B(e) {
  this.message = e;
}
function Ue(e, t) {
  if (typeof e != "string")
    throw new B("Invalid token specified");
  var s = (t = t || {}).header === !0 ? 0 : 1;
  try {
    return JSON.parse(Ie(e.split(".")[s]));
  } catch (r) {
    throw new B("Invalid token specified: " + r.message);
  }
}
B.prototype = new Error(), B.prototype.name = "InvalidTokenError";
var Pe = {
  debug: () => {
  },
  info: () => {
  },
  warn: () => {
  },
  error: () => {
  }
}, U, P, W = /* @__PURE__ */ ((e) => (e[e.NONE = 0] = "NONE", e[e.ERROR = 1] = "ERROR", e[e.WARN = 2] = "WARN", e[e.INFO = 3] = "INFO", e[e.DEBUG = 4] = "DEBUG", e))(W || {});
((e) => {
  function t() {
    U = 3, P = Pe;
  }
  e.reset = t;
  function s(i) {
    if (!(0 <= i && i <= 4))
      throw new Error("Invalid log level");
    U = i;
  }
  e.setLevel = s;
  function r(i) {
    P = i;
  }
  e.setLogger = r;
})(W || (W = {}));
var f = class {
  constructor(e) {
    this._name = e;
  }
  debug(...e) {
    U >= 4 && P.debug(f._format(this._name, this._method), ...e);
  }
  info(...e) {
    U >= 3 && P.info(f._format(this._name, this._method), ...e);
  }
  warn(...e) {
    U >= 2 && P.warn(f._format(this._name, this._method), ...e);
  }
  error(...e) {
    U >= 1 && P.error(f._format(this._name, this._method), ...e);
  }
  throw(e) {
    throw this.error(e), e;
  }
  create(e) {
    const t = Object.create(this);
    return t._method = e, t.debug("begin"), t;
  }
  static createStatic(e, t) {
    const s = new f(`${e}.${t}`);
    return s.debug("begin"), s;
  }
  static _format(e, t) {
    const s = `[${e}]`;
    return t ? `${s} ${t}:` : s;
  }
  static debug(e, ...t) {
    U >= 4 && P.debug(f._format(e), ...t);
  }
  static info(e, ...t) {
    U >= 3 && P.info(f._format(e), ...t);
  }
  static warn(e, ...t) {
    U >= 2 && P.warn(f._format(e), ...t);
  }
  static error(e, ...t) {
    U >= 1 && P.error(f._format(e), ...t);
  }
};
W.reset();
var Oe = "10000000-1000-4000-8000-100000000000", O = class {
  static _randomWord() {
    return Re.lib.WordArray.random(1).words[0];
  }
  static generateUUIDv4() {
    return Oe.replace(
      /[018]/g,
      (t) => (+t ^ O._randomWord() & 15 >> +t / 4).toString(16)
    ).replace(/-/g, "");
  }
  static generateCodeVerifier() {
    return O.generateUUIDv4() + O.generateUUIDv4() + O.generateUUIDv4();
  }
  static generateCodeChallenge(e) {
    try {
      const t = xe(e);
      return se.stringify(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    } catch (t) {
      throw f.error("CryptoUtils.generateCodeChallenge", t), t;
    }
  }
  static generateBasicAuth(e, t) {
    const s = Ce.parse([e, t].join(":"));
    return se.stringify(s);
  }
}, q = class {
  constructor(e) {
    this._name = e, this._logger = new f(`Event('${this._name}')`), this._callbacks = [];
  }
  addHandler(e) {
    return this._callbacks.push(e), () => this.removeHandler(e);
  }
  removeHandler(e) {
    const t = this._callbacks.lastIndexOf(e);
    t >= 0 && this._callbacks.splice(t, 1);
  }
  raise(...e) {
    this._logger.debug("raise:", ...e);
    for (const t of this._callbacks)
      t(...e);
  }
}, V = class {
  static decode(e) {
    try {
      return Ue(e);
    } catch (t) {
      throw f.error("JwtUtils.decode", t), t;
    }
  }
}, ie = class {
  static center({ ...e }) {
    var t, s, r;
    return e.width == null && (e.width = (t = [800, 720, 600, 480].find((i) => i <= window.outerWidth / 1.618)) != null ? t : 360), (s = e.left) != null || (e.left = Math.max(0, Math.round(window.screenX + (window.outerWidth - e.width) / 2))), e.height != null && ((r = e.top) != null || (e.top = Math.max(0, Math.round(window.screenY + (window.outerHeight - e.height) / 2)))), e;
  }
  static serialize(e) {
    return Object.entries(e).filter(([, t]) => t != null).map(([t, s]) => `${t}=${typeof s != "boolean" ? s : s ? "yes" : "no"}`).join(",");
  }
}, x = class extends q {
  constructor() {
    super(...arguments), this._logger = new f(`Timer('${this._name}')`), this._timerHandle = null, this._expiration = 0, this._callback = () => {
      const e = this._expiration - x.getEpochTime();
      this._logger.debug("timer completes in", e), this._expiration <= x.getEpochTime() && (this.cancel(), super.raise());
    };
  }
  static getEpochTime() {
    return Math.floor(Date.now() / 1e3);
  }
  init(e) {
    const t = this._logger.create("init");
    e = Math.max(Math.floor(e), 1);
    const s = x.getEpochTime() + e;
    if (this.expiration === s && this._timerHandle) {
      t.debug("skipping since already initialized for expiration at", this.expiration);
      return;
    }
    this.cancel(), t.debug("using duration", e), this._expiration = s;
    const r = Math.min(e, 5);
    this._timerHandle = setInterval(this._callback, r * 1e3);
  }
  get expiration() {
    return this._expiration;
  }
  cancel() {
    this._logger.create("cancel"), this._timerHandle && (clearInterval(this._timerHandle), this._timerHandle = null);
  }
}, G = class {
  static readParams(e, t = "query") {
    if (!e)
      throw new TypeError("Invalid URL");
    const r = new URL(e, window.location.origin)[t === "fragment" ? "hash" : "search"];
    return new URLSearchParams(r.slice(1));
  }
}, M = class extends Error {
  constructor(e, t) {
    var s, r, i;
    if (super(e.error_description || e.error || ""), this.form = t, this.name = "ErrorResponse", !e.error)
      throw f.error("ErrorResponse", "No error passed"), new Error("No error passed");
    this.error = e.error, this.error_description = (s = e.error_description) != null ? s : null, this.error_uri = (r = e.error_uri) != null ? r : null, this.state = e.userState, this.session_state = (i = e.session_state) != null ? i : null;
  }
}, X = class extends Error {
  constructor(e) {
    super(e), this.name = "ErrorTimeout";
  }
}, Ae = class {
  constructor(e) {
    this._logger = new f("AccessTokenEvents"), this._expiringTimer = new x("Access token expiring"), this._expiredTimer = new x("Access token expired"), this._expiringNotificationTimeInSeconds = e.expiringNotificationTimeInSeconds;
  }
  load(e) {
    const t = this._logger.create("load");
    if (e.access_token && e.expires_in !== void 0) {
      const s = e.expires_in;
      if (t.debug("access token present, remaining duration:", s), s > 0) {
        let i = s - this._expiringNotificationTimeInSeconds;
        i <= 0 && (i = 1), t.debug("registering expiring timer, raising in", i, "seconds"), this._expiringTimer.init(i);
      } else
        t.debug("canceling existing expiring timer because we're past expiration."), this._expiringTimer.cancel();
      const r = s + 1;
      t.debug("registering expired timer, raising in", r, "seconds"), this._expiredTimer.init(r);
    } else
      this._expiringTimer.cancel(), this._expiredTimer.cancel();
  }
  unload() {
    this._logger.debug("unload: canceling existing access token timers"), this._expiringTimer.cancel(), this._expiredTimer.cancel();
  }
  addAccessTokenExpiring(e) {
    return this._expiringTimer.addHandler(e);
  }
  removeAccessTokenExpiring(e) {
    this._expiringTimer.removeHandler(e);
  }
  addAccessTokenExpired(e) {
    return this._expiredTimer.addHandler(e);
  }
  removeAccessTokenExpired(e) {
    this._expiredTimer.removeHandler(e);
  }
}, qe = class {
  constructor(e, t, s, r, i) {
    this._callback = e, this._client_id = t, this._intervalInSeconds = r, this._stopOnError = i, this._logger = new f("CheckSessionIFrame"), this._timer = null, this._session_state = null, this._message = (o) => {
      o.origin === this._frame_origin && o.source === this._frame.contentWindow && (o.data === "error" ? (this._logger.error("error message from check session op iframe"), this._stopOnError && this.stop()) : o.data === "changed" ? (this._logger.debug("changed message from check session op iframe"), this.stop(), this._callback()) : this._logger.debug(o.data + " message from check session op iframe"));
    };
    const n = new URL(s);
    this._frame_origin = n.origin, this._frame = window.document.createElement("iframe"), this._frame.style.visibility = "hidden", this._frame.style.position = "fixed", this._frame.style.left = "-1000px", this._frame.style.top = "0", this._frame.width = "0", this._frame.height = "0", this._frame.src = n.href;
  }
  load() {
    return new Promise((e) => {
      this._frame.onload = () => {
        e();
      }, window.document.body.appendChild(this._frame), window.addEventListener("message", this._message, !1);
    });
  }
  start(e) {
    if (this._session_state === e)
      return;
    this._logger.create("start"), this.stop(), this._session_state = e;
    const t = () => {
      !this._frame.contentWindow || !this._session_state || this._frame.contentWindow.postMessage(this._client_id + " " + this._session_state, this._frame_origin);
    };
    t(), this._timer = setInterval(t, this._intervalInSeconds * 1e3);
  }
  stop() {
    this._logger.create("stop"), this._session_state = null, this._timer && (clearInterval(this._timer), this._timer = null);
  }
}, he = class {
  constructor() {
    this._logger = new f("InMemoryWebStorage"), this._data = {};
  }
  clear() {
    this._logger.create("clear"), this._data = {};
  }
  getItem(e) {
    return this._logger.create(`getItem('${e}')`), this._data[e];
  }
  setItem(e, t) {
    this._logger.create(`setItem('${e}')`), this._data[e] = t;
  }
  removeItem(e) {
    this._logger.create(`removeItem('${e}')`), delete this._data[e];
  }
  get length() {
    return Object.getOwnPropertyNames(this._data).length;
  }
  key(e) {
    return Object.getOwnPropertyNames(this._data)[e];
  }
}, Y = class {
  constructor(e = [], t = null) {
    this._jwtHandler = t, this._logger = new f("JsonService"), this._contentTypes = [], this._contentTypes.push(...e, "application/json"), t && this._contentTypes.push("application/jwt");
  }
  async fetchWithTimeout(e, t = {}) {
    const { timeoutInSeconds: s, ...r } = t;
    if (!s)
      return await fetch(e, r);
    const i = new AbortController(), n = setTimeout(() => i.abort(), s * 1e3);
    try {
      return await fetch(e, {
        ...t,
        signal: i.signal
      });
    } catch (o) {
      throw o instanceof DOMException && o.name === "AbortError" ? new X("Network timed out") : o;
    } finally {
      clearTimeout(n);
    }
  }
  async getJson(e, {
    token: t,
    credentials: s
  } = {}) {
    const r = this._logger.create("getJson"), i = {
      Accept: this._contentTypes.join(", ")
    };
    t && (r.debug("token passed, setting Authorization header"), i.Authorization = "Bearer " + t);
    let n;
    try {
      r.debug("url:", e), n = await this.fetchWithTimeout(e, { method: "GET", headers: i, credentials: s });
    } catch (c) {
      throw r.error("Network Error"), c;
    }
    r.debug("HTTP response received, status", n.status);
    const o = n.headers.get("Content-Type");
    if (o && !this._contentTypes.find((c) => o.startsWith(c)) && r.throw(new Error(`Invalid response Content-Type: ${o != null ? o : "undefined"}, from URL: ${e}`)), n.ok && this._jwtHandler && (o == null ? void 0 : o.startsWith("application/jwt")))
      return await this._jwtHandler(await n.text());
    let l;
    try {
      l = await n.json();
    } catch (c) {
      throw r.error("Error parsing JSON response", c), n.ok ? c : new Error(`${n.statusText} (${n.status})`);
    }
    if (!n.ok)
      throw r.error("Error from server:", l), l.error ? new M(l) : new Error(`${n.statusText} (${n.status}): ${JSON.stringify(l)}`);
    return l;
  }
  async postForm(e, {
    body: t,
    basicAuth: s,
    timeoutInSeconds: r,
    initCredentials: i
  }) {
    const n = this._logger.create("postForm"), o = {
      Accept: this._contentTypes.join(", "),
      "Content-Type": "application/x-www-form-urlencoded"
    };
    s !== void 0 && (o.Authorization = "Basic " + s);
    let l;
    try {
      n.debug("url:", e), l = await this.fetchWithTimeout(e, { method: "POST", headers: o, body: t, timeoutInSeconds: r, credentials: i });
    } catch (g) {
      throw n.error("Network error"), g;
    }
    n.debug("HTTP response received, status", l.status);
    const c = l.headers.get("Content-Type");
    if (c && !this._contentTypes.find((g) => c.startsWith(g)))
      throw new Error(`Invalid response Content-Type: ${c != null ? c : "undefined"}, from URL: ${e}`);
    const u = await l.text();
    let _ = {};
    if (u)
      try {
        _ = JSON.parse(u);
      } catch (g) {
        throw n.error("Error parsing JSON response", g), l.ok ? g : new Error(`${l.statusText} (${l.status})`);
      }
    if (!l.ok)
      throw n.error("Error from server:", _), _.error ? new M(_, t) : new Error(`${l.statusText} (${l.status}): ${JSON.stringify(_)}`);
    return _;
  }
}, Ne = class {
  constructor(e) {
    this._settings = e, this._logger = new f("MetadataService"), this._jsonService = new Y(["application/jwk-set+json"]), this._signingKeys = null, this._metadata = null, this._metadataUrl = this._settings.metadataUrl, this._settings.signingKeys && (this._logger.debug("using signingKeys from settings"), this._signingKeys = this._settings.signingKeys), this._settings.metadata && (this._logger.debug("using metadata from settings"), this._metadata = this._settings.metadata), this._settings.fetchRequestCredentials && (this._logger.debug("using fetchRequestCredentials from settings"), this._fetchRequestCredentials = this._settings.fetchRequestCredentials);
  }
  resetSigningKeys() {
    this._signingKeys = null;
  }
  async getMetadata() {
    const e = this._logger.create("getMetadata");
    if (this._metadata)
      return e.debug("using cached values"), this._metadata;
    if (!this._metadataUrl)
      throw e.throw(new Error("No authority or metadataUrl configured on settings")), null;
    e.debug("getting metadata from", this._metadataUrl);
    const t = await this._jsonService.getJson(this._metadataUrl, { credentials: this._fetchRequestCredentials });
    return e.debug("merging remote JSON with seed metadata"), this._metadata = Object.assign({}, this._settings.metadataSeed, t), this._metadata;
  }
  getIssuer() {
    return this._getMetadataProperty("issuer");
  }
  getAuthorizationEndpoint() {
    return this._getMetadataProperty("authorization_endpoint");
  }
  getUserInfoEndpoint() {
    return this._getMetadataProperty("userinfo_endpoint");
  }
  getTokenEndpoint(e = !0) {
    return this._getMetadataProperty("token_endpoint", e);
  }
  getCheckSessionIframe() {
    return this._getMetadataProperty("check_session_iframe", !0);
  }
  getEndSessionEndpoint() {
    return this._getMetadataProperty("end_session_endpoint", !0);
  }
  getRevocationEndpoint(e = !0) {
    return this._getMetadataProperty("revocation_endpoint", e);
  }
  getKeysEndpoint(e = !0) {
    return this._getMetadataProperty("jwks_uri", e);
  }
  async _getMetadataProperty(e, t = !1) {
    const s = this._logger.create(`_getMetadataProperty('${e}')`), r = await this.getMetadata();
    if (s.debug("resolved"), r[e] === void 0) {
      if (t === !0) {
        s.warn("Metadata does not contain optional property");
        return;
      }
      s.throw(new Error("Metadata does not contain property " + e));
    }
    return r[e];
  }
  async getSigningKeys() {
    const e = this._logger.create("getSigningKeys");
    if (this._signingKeys)
      return e.debug("returning signingKeys from cache"), this._signingKeys;
    const t = await this.getKeysEndpoint(!1);
    e.debug("got jwks_uri", t);
    const s = await this._jsonService.getJson(t);
    if (e.debug("got key set", s), !Array.isArray(s.keys))
      throw e.throw(new Error("Missing keys on keyset")), null;
    return this._signingKeys = s.keys, this._signingKeys;
  }
}, ge = class {
  constructor({
    prefix: e = "oidc.",
    store: t = localStorage
  } = {}) {
    this._logger = new f("WebStorageStateStore"), this._store = t, this._prefix = e;
  }
  async set(e, t) {
    this._logger.create(`set('${e}')`), e = this._prefix + e, await this._store.setItem(e, t);
  }
  async get(e) {
    return this._logger.create(`get('${e}')`), e = this._prefix + e, await this._store.getItem(e);
  }
  async remove(e) {
    this._logger.create(`remove('${e}')`), e = this._prefix + e;
    const t = await this._store.getItem(e);
    return await this._store.removeItem(e), t;
  }
  async getAllKeys() {
    this._logger.create("getAllKeys");
    const e = await this._store.length, t = [];
    for (let s = 0; s < e; s++) {
      const r = await this._store.key(s);
      r && r.indexOf(this._prefix) === 0 && t.push(r.substr(this._prefix.length));
    }
    return t;
  }
}, Me = "code", He = "openid", je = "client_secret_post", Be = "query", We = 60 * 15, Fe = 60 * 5, ue = class {
  constructor({
    authority: e,
    metadataUrl: t,
    metadata: s,
    signingKeys: r,
    metadataSeed: i,
    client_id: n,
    client_secret: o,
    response_type: l = Me,
    scope: c = He,
    redirect_uri: u,
    post_logout_redirect_uri: _,
    client_authentication: g = je,
    prompt: S,
    display: w,
    max_age: b,
    ui_locales: h,
    acr_values: v,
    resource: E,
    response_mode: a = Be,
    filterProtocolClaims: d = !0,
    loadUserInfo: p = !1,
    staleStateAgeInSeconds: m = We,
    clockSkewInSeconds: y = Fe,
    userInfoJwtIssuer: k = "OP",
    mergeClaims: T = !1,
    stateStore: R,
    refreshTokenCredentials: C,
    revokeTokenAdditionalContentTypes: I,
    fetchRequestCredentials: A,
    extraQueryParams: $ = {},
    extraTokenParams: L = {}
  }) {
    if (this.authority = e, t ? this.metadataUrl = t : (this.metadataUrl = e, e && (this.metadataUrl.endsWith("/") || (this.metadataUrl += "/"), this.metadataUrl += ".well-known/openid-configuration")), this.metadata = s, this.metadataSeed = i, this.signingKeys = r, this.client_id = n, this.client_secret = o, this.response_type = l, this.scope = c, this.redirect_uri = u, this.post_logout_redirect_uri = _, this.client_authentication = g, this.prompt = S, this.display = w, this.max_age = b, this.ui_locales = h, this.acr_values = v, this.resource = E, this.response_mode = a, this.filterProtocolClaims = !!d, this.loadUserInfo = !!p, this.staleStateAgeInSeconds = m, this.clockSkewInSeconds = y, this.userInfoJwtIssuer = k, this.mergeClaims = !!T, this.revokeTokenAdditionalContentTypes = I, A && C && console.warn("Both fetchRequestCredentials and refreshTokenCredentials is set. Only fetchRequestCredentials will be used."), this.fetchRequestCredentials = A || C || "same-origin", R)
      this.stateStore = R;
    else {
      const D = typeof window < "u" ? window.localStorage : new he();
      this.stateStore = new ge({ store: D });
    }
    this.extraQueryParams = $, this.extraTokenParams = L;
  }
}, $e = class {
  constructor(e, t) {
    this._settings = e, this._metadataService = t, this._logger = new f("UserInfoService"), this._getClaimsFromJwt = async (s) => {
      const r = this._logger.create("_getClaimsFromJwt");
      try {
        const i = V.decode(s);
        return r.debug("JWT decoding successful"), i;
      } catch (i) {
        throw r.error("Error parsing JWT response"), i;
      }
    }, this._jsonService = new Y(void 0, this._getClaimsFromJwt);
  }
  async getClaims(e) {
    const t = this._logger.create("getClaims");
    e || this._logger.throw(new Error("No token passed"));
    const s = await this._metadataService.getUserInfoEndpoint();
    t.debug("got userinfo url", s);
    const r = await this._jsonService.getJson(s, {
      token: e,
      credentials: this._settings.fetchRequestCredentials
    });
    return t.debug("got claims", r), r;
  }
}, _e = class {
  constructor(e, t) {
    this._settings = e, this._metadataService = t, this._logger = new f("TokenClient"), this._jsonService = new Y(this._settings.revokeTokenAdditionalContentTypes);
  }
  async exchangeCode({
    grant_type: e = "authorization_code",
    redirect_uri: t = this._settings.redirect_uri,
    client_id: s = this._settings.client_id,
    client_secret: r = this._settings.client_secret,
    ...i
  }) {
    const n = this._logger.create("exchangeCode");
    s || n.throw(new Error("A client_id is required")), t || n.throw(new Error("A redirect_uri is required")), i.code || n.throw(new Error("A code is required")), i.code_verifier || n.throw(new Error("A code_verifier is required"));
    const o = new URLSearchParams({ grant_type: e, redirect_uri: t });
    for (const [_, g] of Object.entries(i))
      g != null && o.set(_, g);
    let l;
    switch (this._settings.client_authentication) {
      case "client_secret_basic":
        if (!r)
          throw n.throw(new Error("A client_secret is required")), null;
        l = O.generateBasicAuth(s, r);
        break;
      case "client_secret_post":
        o.append("client_id", s), r && o.append("client_secret", r);
        break;
    }
    const c = await this._metadataService.getTokenEndpoint(!1);
    n.debug("got token endpoint");
    const u = await this._jsonService.postForm(c, { body: o, basicAuth: l, initCredentials: this._settings.fetchRequestCredentials });
    return n.debug("got response"), u;
  }
  async exchangeCredentials({
    grant_type: e = "password",
    client_id: t = this._settings.client_id,
    client_secret: s = this._settings.client_secret,
    scope: r = this._settings.scope,
    username: i,
    password: n
  }) {
    const o = this._logger.create("exchangeCredentials");
    t || o.throw(new Error("A client_id is required"));
    const l = new URLSearchParams({ grant_type: e, username: i, password: n, scope: r });
    let c;
    switch (this._settings.client_authentication) {
      case "client_secret_basic":
        if (!s)
          throw o.throw(new Error("A client_secret is required")), null;
        c = O.generateBasicAuth(t, s);
        break;
      case "client_secret_post":
        l.append("client_id", t), s && l.append("client_secret", s);
        break;
    }
    const u = await this._metadataService.getTokenEndpoint(!1);
    o.debug("got token endpoint");
    const _ = await this._jsonService.postForm(u, { body: l, basicAuth: c, initCredentials: this._settings.fetchRequestCredentials });
    return o.debug("got response"), _;
  }
  async exchangeRefreshToken({
    grant_type: e = "refresh_token",
    client_id: t = this._settings.client_id,
    client_secret: s = this._settings.client_secret,
    timeoutInSeconds: r,
    ...i
  }) {
    const n = this._logger.create("exchangeRefreshToken");
    t || n.throw(new Error("A client_id is required")), i.refresh_token || n.throw(new Error("A refresh_token is required"));
    const o = new URLSearchParams({ grant_type: e });
    for (const [_, g] of Object.entries(i))
      g != null && o.set(_, g);
    let l;
    switch (this._settings.client_authentication) {
      case "client_secret_basic":
        if (!s)
          throw n.throw(new Error("A client_secret is required")), null;
        l = O.generateBasicAuth(t, s);
        break;
      case "client_secret_post":
        o.append("client_id", t), s && o.append("client_secret", s);
        break;
    }
    const c = await this._metadataService.getTokenEndpoint(!1);
    n.debug("got token endpoint");
    const u = await this._jsonService.postForm(c, { body: o, basicAuth: l, timeoutInSeconds: r, initCredentials: this._settings.fetchRequestCredentials });
    return n.debug("got response"), u;
  }
  async revoke(e) {
    var t;
    const s = this._logger.create("revoke");
    e.token || s.throw(new Error("A token is required"));
    const r = await this._metadataService.getRevocationEndpoint(!1);
    s.debug(`got revocation endpoint, revoking ${(t = e.token_type_hint) != null ? t : "default token type"}`);
    const i = new URLSearchParams();
    for (const [n, o] of Object.entries(e))
      o != null && i.set(n, o);
    i.set("client_id", this._settings.client_id), this._settings.client_secret && i.set("client_secret", this._settings.client_secret), await this._jsonService.postForm(r, { body: i }), s.debug("got response");
  }
}, Le = [
  "iss",
  "aud",
  "exp",
  "nbf",
  "iat",
  "jti",
  "auth_time",
  "nonce",
  "acr",
  "amr",
  "azp",
  "at_hash"
], De = class {
  constructor(e, t) {
    this._settings = e, this._metadataService = t, this._logger = new f("ResponseValidator"), this._userInfoService = new $e(this._settings, this._metadataService), this._tokenClient = new _e(this._settings, this._metadataService);
  }
  async validateSigninResponse(e, t) {
    const s = this._logger.create("validateSigninResponse");
    this._processSigninState(e, t), s.debug("state processed"), await this._processCode(e, t), s.debug("code processed"), e.isOpenId && this._validateIdTokenAttributes(e), s.debug("tokens validated"), await this._processClaims(e, t == null ? void 0 : t.skipUserInfo, e.isOpenId), s.debug("claims processed");
  }
  async validateCredentialsResponse(e, t) {
    const s = this._logger.create("validateCredentialsResponse");
    e.isOpenId && this._validateIdTokenAttributes(e), s.debug("tokens validated"), await this._processClaims(e, t, e.isOpenId), s.debug("claims processed");
  }
  async validateRefreshResponse(e, t) {
    var s, r;
    const i = this._logger.create("validateRefreshResponse");
    e.userState = t.data, (s = e.session_state) != null || (e.session_state = t.session_state), (r = e.scope) != null || (e.scope = t.scope), e.isOpenId && !!e.id_token && (this._validateIdTokenAttributes(e, t.id_token), i.debug("ID Token validated")), e.id_token || (e.id_token = t.id_token, e.profile = t.profile);
    const n = e.isOpenId && !!e.id_token;
    await this._processClaims(e, !1, n), i.debug("claims processed");
  }
  validateSignoutResponse(e, t) {
    const s = this._logger.create("validateSignoutResponse");
    if (t.id !== e.state && s.throw(new Error("State does not match")), s.debug("state validated"), e.userState = t.data, e.error)
      throw s.warn("Response was error", e.error), new M(e);
  }
  _processSigninState(e, t) {
    var s;
    const r = this._logger.create("_processSigninState");
    if (t.id !== e.state && r.throw(new Error("State does not match")), t.client_id || r.throw(new Error("No client_id on state")), t.authority || r.throw(new Error("No authority on state")), this._settings.authority !== t.authority && r.throw(new Error("authority mismatch on settings vs. signin state")), this._settings.client_id && this._settings.client_id !== t.client_id && r.throw(new Error("client_id mismatch on settings vs. signin state")), r.debug("state validated"), e.userState = t.data, (s = e.scope) != null || (e.scope = t.scope), e.error)
      throw r.warn("Response was error", e.error), new M(e);
    t.code_verifier && !e.code && r.throw(new Error("Expected code in response")), !t.code_verifier && e.code && r.throw(new Error("Unexpected code in response"));
  }
  async _processClaims(e, t = !1, s = !0) {
    const r = this._logger.create("_processClaims");
    if (e.profile = this._filterProtocolClaims(e.profile), t || !this._settings.loadUserInfo || !e.access_token) {
      r.debug("not loading user info");
      return;
    }
    r.debug("loading user info");
    const i = await this._userInfoService.getClaims(e.access_token);
    r.debug("user info claims received from user info endpoint"), s && i.sub !== e.profile.sub && r.throw(new Error("subject from UserInfo response does not match subject in ID Token")), e.profile = this._mergeClaims(e.profile, this._filterProtocolClaims(i)), r.debug("user info claims received, updated profile:", e.profile);
  }
  _mergeClaims(e, t) {
    const s = { ...e };
    for (const [r, i] of Object.entries(t))
      for (const n of Array.isArray(i) ? i : [i]) {
        const o = s[r];
        o ? Array.isArray(o) ? o.includes(n) || o.push(n) : s[r] !== n && (typeof n == "object" && this._settings.mergeClaims ? s[r] = this._mergeClaims(o, n) : s[r] = [o, n]) : s[r] = n;
      }
    return s;
  }
  _filterProtocolClaims(e) {
    const t = { ...e };
    if (this._settings.filterProtocolClaims)
      for (const s of Le)
        delete t[s];
    return t;
  }
  async _processCode(e, t) {
    const s = this._logger.create("_processCode");
    if (e.code) {
      s.debug("Validating code");
      const r = await this._tokenClient.exchangeCode({
        client_id: t.client_id,
        client_secret: t.client_secret,
        code: e.code,
        redirect_uri: t.redirect_uri,
        code_verifier: t.code_verifier,
        ...t.extraTokenParams
      });
      Object.assign(e, r);
    } else
      s.debug("No code to process");
  }
  _validateIdTokenAttributes(e, t) {
    var s;
    const r = this._logger.create("_validateIdTokenAttributes");
    r.debug("decoding ID Token JWT");
    const i = V.decode((s = e.id_token) != null ? s : "");
    if (i.sub || r.throw(new Error("ID Token is missing a subject claim")), t) {
      const n = V.decode(t);
      n.sub !== i.sub && r.throw(new Error("sub in id_token does not match current sub")), n.auth_time && n.auth_time !== i.auth_time && r.throw(new Error("auth_time in id_token does not match original auth_time")), n.azp && n.azp !== i.azp && r.throw(new Error("azp in id_token does not match original azp")), !n.azp && i.azp && r.throw(new Error("azp not in id_token, but present in original id_token"));
    }
    e.profile = i;
  }
}, H = class {
  constructor(e) {
    this.id = e.id || O.generateUUIDv4(), this.data = e.data, e.created && e.created > 0 ? this.created = e.created : this.created = x.getEpochTime(), this.request_type = e.request_type;
  }
  toStorageString() {
    return new f("State").create("toStorageString"), JSON.stringify({
      id: this.id,
      data: this.data,
      created: this.created,
      request_type: this.request_type
    });
  }
  static fromStorageString(e) {
    return f.createStatic("State", "fromStorageString"), new H(JSON.parse(e));
  }
  static async clearStaleState(e, t) {
    const s = f.createStatic("State", "clearStaleState"), r = x.getEpochTime() - t, i = await e.getAllKeys();
    s.debug("got keys", i);
    for (let n = 0; n < i.length; n++) {
      const o = i[n], l = await e.get(o);
      let c = !1;
      if (l)
        try {
          const u = H.fromStorageString(l);
          s.debug("got item from key:", o, u.created), u.created <= r && (c = !0);
        } catch (u) {
          s.error("Error parsing state for key:", o, u), c = !0;
        }
      else
        s.debug("no item in storage for key:", o), c = !0;
      c && (s.debug("removed item for key:", o), e.remove(o));
    }
  }
}, Z = class extends H {
  constructor(e) {
    super(e), e.code_verifier === !0 ? this.code_verifier = O.generateCodeVerifier() : e.code_verifier && (this.code_verifier = e.code_verifier), this.code_verifier && (this.code_challenge = O.generateCodeChallenge(this.code_verifier)), this.authority = e.authority, this.client_id = e.client_id, this.redirect_uri = e.redirect_uri, this.scope = e.scope, this.client_secret = e.client_secret, this.extraTokenParams = e.extraTokenParams, this.response_mode = e.response_mode, this.skipUserInfo = e.skipUserInfo;
  }
  toStorageString() {
    return new f("SigninState").create("toStorageString"), JSON.stringify({
      id: this.id,
      data: this.data,
      created: this.created,
      request_type: this.request_type,
      code_verifier: this.code_verifier,
      authority: this.authority,
      client_id: this.client_id,
      redirect_uri: this.redirect_uri,
      scope: this.scope,
      client_secret: this.client_secret,
      extraTokenParams: this.extraTokenParams,
      response_mode: this.response_mode,
      skipUserInfo: this.skipUserInfo
    });
  }
  static fromStorageString(e) {
    f.createStatic("SigninState", "fromStorageString");
    const t = JSON.parse(e);
    return new Z(t);
  }
}, ze = class {
  constructor({
    url: e,
    authority: t,
    client_id: s,
    redirect_uri: r,
    response_type: i,
    scope: n,
    state_data: o,
    response_mode: l,
    request_type: c,
    client_secret: u,
    nonce: _,
    skipUserInfo: g,
    extraQueryParams: S,
    extraTokenParams: w,
    ...b
  }) {
    if (this._logger = new f("SigninRequest"), !e)
      throw this._logger.error("ctor: No url passed"), new Error("url");
    if (!s)
      throw this._logger.error("ctor: No client_id passed"), new Error("client_id");
    if (!r)
      throw this._logger.error("ctor: No redirect_uri passed"), new Error("redirect_uri");
    if (!i)
      throw this._logger.error("ctor: No response_type passed"), new Error("response_type");
    if (!n)
      throw this._logger.error("ctor: No scope passed"), new Error("scope");
    if (!t)
      throw this._logger.error("ctor: No authority passed"), new Error("authority");
    this.state = new Z({
      data: o,
      request_type: c,
      code_verifier: !0,
      client_id: s,
      authority: t,
      redirect_uri: r,
      response_mode: l,
      client_secret: u,
      scope: n,
      extraTokenParams: w,
      skipUserInfo: g
    });
    const h = new URL(e);
    h.searchParams.append("client_id", s), h.searchParams.append("redirect_uri", r), h.searchParams.append("response_type", i), h.searchParams.append("scope", n), _ && h.searchParams.append("nonce", _), h.searchParams.append("state", this.state.id), this.state.code_challenge && (h.searchParams.append("code_challenge", this.state.code_challenge), h.searchParams.append("code_challenge_method", "S256"));
    for (const [v, E] of Object.entries({ response_mode: l, ...b, ...S }))
      E != null && h.searchParams.append(v, E.toString());
    this.url = h.href;
  }
}, Je = "openid", J = class {
  constructor(e) {
    this.access_token = "", this.token_type = "", this.profile = {}, this.state = e.get("state"), this.session_state = e.get("session_state"), this.error = e.get("error"), this.error_description = e.get("error_description"), this.error_uri = e.get("error_uri"), this.code = e.get("code");
  }
  get expires_in() {
    if (this.expires_at !== void 0)
      return this.expires_at - x.getEpochTime();
  }
  set expires_in(e) {
    typeof e == "string" && (e = Number(e)), e !== void 0 && e >= 0 && (this.expires_at = Math.floor(e) + x.getEpochTime());
  }
  get isOpenId() {
    var e;
    return ((e = this.scope) == null ? void 0 : e.split(" ").includes(Je)) || !!this.id_token;
  }
}, Ke = class {
  constructor({
    url: e,
    state_data: t,
    id_token_hint: s,
    post_logout_redirect_uri: r,
    extraQueryParams: i,
    request_type: n
  }) {
    if (this._logger = new f("SignoutRequest"), !e)
      throw this._logger.error("ctor: No url passed"), new Error("url");
    const o = new URL(e);
    s && o.searchParams.append("id_token_hint", s), r && (o.searchParams.append("post_logout_redirect_uri", r), t && (this.state = new H({ data: t, request_type: n }), o.searchParams.append("state", this.state.id)));
    for (const [l, c] of Object.entries({ ...i }))
      c != null && o.searchParams.append(l, c.toString());
    this.url = o.href;
  }
}, Ve = class {
  constructor(e) {
    this.state = e.get("state"), this.error = e.get("error"), this.error_description = e.get("error_description"), this.error_uri = e.get("error_uri");
  }
}, Ge = class {
  constructor(e) {
    this._logger = new f("OidcClient"), this.settings = new ue(e), this.metadataService = new Ne(this.settings), this._validator = new De(this.settings, this.metadataService), this._tokenClient = new _e(this.settings, this.metadataService);
  }
  async createSigninRequest({
    state: e,
    request: t,
    request_uri: s,
    request_type: r,
    id_token_hint: i,
    login_hint: n,
    skipUserInfo: o,
    nonce: l,
    response_type: c = this.settings.response_type,
    scope: u = this.settings.scope,
    redirect_uri: _ = this.settings.redirect_uri,
    prompt: g = this.settings.prompt,
    display: S = this.settings.display,
    max_age: w = this.settings.max_age,
    ui_locales: b = this.settings.ui_locales,
    acr_values: h = this.settings.acr_values,
    resource: v = this.settings.resource,
    response_mode: E = this.settings.response_mode,
    extraQueryParams: a = this.settings.extraQueryParams,
    extraTokenParams: d = this.settings.extraTokenParams
  }) {
    const p = this._logger.create("createSigninRequest");
    if (c !== "code")
      throw new Error("Only the Authorization Code flow (with PKCE) is supported");
    const m = await this.metadataService.getAuthorizationEndpoint();
    p.debug("Received authorization endpoint", m);
    const y = new ze({
      url: m,
      authority: this.settings.authority,
      client_id: this.settings.client_id,
      redirect_uri: _,
      response_type: c,
      scope: u,
      state_data: e,
      prompt: g,
      display: S,
      max_age: w,
      ui_locales: b,
      id_token_hint: i,
      login_hint: n,
      acr_values: h,
      resource: v,
      request: t,
      request_uri: s,
      extraQueryParams: a,
      extraTokenParams: d,
      request_type: r,
      response_mode: E,
      client_secret: this.settings.client_secret,
      skipUserInfo: o,
      nonce: l
    });
    await this.clearStaleState();
    const k = y.state;
    return await this.settings.stateStore.set(k.id, k.toStorageString()), y;
  }
  async readSigninResponseState(e, t = !1) {
    const s = this._logger.create("readSigninResponseState"), r = new J(G.readParams(e, this.settings.response_mode));
    if (!r.state)
      throw s.throw(new Error("No state in response")), null;
    const i = await this.settings.stateStore[t ? "remove" : "get"](r.state);
    if (!i)
      throw s.throw(new Error("No matching state found in storage")), null;
    return { state: Z.fromStorageString(i), response: r };
  }
  async processSigninResponse(e) {
    const t = this._logger.create("processSigninResponse"), { state: s, response: r } = await this.readSigninResponseState(e, !0);
    return t.debug("received state from storage; validating response"), await this._validator.validateSigninResponse(r, s), r;
  }
  async processResourceOwnerPasswordCredentials({
    username: e,
    password: t,
    skipUserInfo: s = !1
  }) {
    const r = await this._tokenClient.exchangeCredentials({ username: e, password: t }), i = new J(new URLSearchParams());
    return Object.assign(i, r), await this._validator.validateCredentialsResponse(i, s), i;
  }
  async useRefreshToken({
    state: e,
    timeoutInSeconds: t
  }) {
    const s = this._logger.create("useRefreshToken"), r = await this._tokenClient.exchangeRefreshToken({
      refresh_token: e.refresh_token,
      scope: e.scope,
      timeoutInSeconds: t
    }), i = new J(new URLSearchParams());
    return Object.assign(i, r), s.debug("validating response", i), await this._validator.validateRefreshResponse(i, e), i;
  }
  async createSignoutRequest({
    state: e,
    id_token_hint: t,
    request_type: s,
    post_logout_redirect_uri: r = this.settings.post_logout_redirect_uri,
    extraQueryParams: i = this.settings.extraQueryParams
  } = {}) {
    const n = this._logger.create("createSignoutRequest"), o = await this.metadataService.getEndSessionEndpoint();
    if (!o)
      throw n.throw(new Error("No end session endpoint")), null;
    n.debug("Received end session endpoint", o);
    const l = new Ke({
      url: o,
      id_token_hint: t,
      post_logout_redirect_uri: r,
      state_data: e,
      extraQueryParams: i,
      request_type: s
    });
    await this.clearStaleState();
    const c = l.state;
    return c && (n.debug("Signout request has state to persist"), await this.settings.stateStore.set(c.id, c.toStorageString())), l;
  }
  async readSignoutResponseState(e, t = !1) {
    const s = this._logger.create("readSignoutResponseState"), r = new Ve(G.readParams(e, this.settings.response_mode));
    if (!r.state) {
      if (s.debug("No state in response"), r.error)
        throw s.warn("Response was error:", r.error), new M(r);
      return { state: void 0, response: r };
    }
    const i = await this.settings.stateStore[t ? "remove" : "get"](r.state);
    if (!i)
      throw s.throw(new Error("No matching state found in storage")), null;
    return { state: H.fromStorageString(i), response: r };
  }
  async processSignoutResponse(e) {
    const t = this._logger.create("processSignoutResponse"), { state: s, response: r } = await this.readSignoutResponseState(e, !0);
    return s ? (t.debug("Received state from storage; validating response"), this._validator.validateSignoutResponse(r, s)) : t.debug("No state from storage; skipping response validation"), r;
  }
  clearStaleState() {
    return this._logger.create("clearStaleState"), H.clearStaleState(this.settings.stateStore, this.settings.staleStateAgeInSeconds);
  }
  async revokeToken(e, t) {
    return this._logger.create("revokeToken"), await this._tokenClient.revoke({
      token: e,
      token_type_hint: t
    });
  }
}, Qe = class {
  constructor(e) {
    this._userManager = e, this._logger = new f("SessionMonitor"), this._start = async (t) => {
      const s = t.session_state;
      if (!s)
        return;
      const r = this._logger.create("_start");
      if (t.profile ? (this._sub = t.profile.sub, this._sid = t.profile.sid, r.debug("session_state", s, ", sub", this._sub)) : (this._sub = void 0, this._sid = void 0, r.debug("session_state", s, ", anonymous user")), this._checkSessionIFrame) {
        this._checkSessionIFrame.start(s);
        return;
      }
      try {
        const i = await this._userManager.metadataService.getCheckSessionIframe();
        if (i) {
          r.debug("initializing check session iframe");
          const n = this._userManager.settings.client_id, o = this._userManager.settings.checkSessionIntervalInSeconds, l = this._userManager.settings.stopCheckSessionOnError, c = new qe(this._callback, n, i, o, l);
          await c.load(), this._checkSessionIFrame = c, c.start(s);
        } else
          r.warn("no check session iframe found in the metadata");
      } catch (i) {
        r.error("Error from getCheckSessionIframe:", i instanceof Error ? i.message : i);
      }
    }, this._stop = () => {
      const t = this._logger.create("_stop");
      if (this._sub = void 0, this._sid = void 0, this._checkSessionIFrame && this._checkSessionIFrame.stop(), this._userManager.settings.monitorAnonymousSession) {
        const s = setInterval(async () => {
          clearInterval(s);
          try {
            const r = await this._userManager.querySessionStatus();
            if (r) {
              const i = {
                session_state: r.session_state,
                profile: r.sub && r.sid ? {
                  sub: r.sub,
                  sid: r.sid
                } : null
              };
              this._start(i);
            }
          } catch (r) {
            t.error("error from querySessionStatus", r instanceof Error ? r.message : r);
          }
        }, 1e3);
      }
    }, this._callback = async () => {
      const t = this._logger.create("_callback");
      try {
        const s = await this._userManager.querySessionStatus();
        let r = !0;
        s && this._checkSessionIFrame ? s.sub === this._sub ? (r = !1, this._checkSessionIFrame.start(s.session_state), s.sid === this._sid ? t.debug("same sub still logged in at OP, restarting check session iframe; session_state", s.session_state) : (t.debug("same sub still logged in at OP, session state has changed, restarting check session iframe; session_state", s.session_state), this._userManager.events._raiseUserSessionChanged())) : t.debug("different subject signed into OP", s.sub) : t.debug("subject no longer signed into OP"), r ? this._sub ? this._userManager.events._raiseUserSignedOut() : this._userManager.events._raiseUserSignedIn() : t.debug("no change in session detected, no event to raise");
      } catch (s) {
        this._sub && (t.debug("Error calling queryCurrentSigninSession; raising signed out event", s), this._userManager.events._raiseUserSignedOut());
      }
    }, e || this._logger.throw(new Error("No user manager passed")), this._userManager.events.addUserLoaded(this._start), this._userManager.events.addUserUnloaded(this._stop), this._init().catch((t) => {
      this._logger.error(t);
    });
  }
  async _init() {
    this._logger.create("_init");
    const e = await this._userManager.getUser();
    if (e)
      this._start(e);
    else if (this._userManager.settings.monitorAnonymousSession) {
      const t = await this._userManager.querySessionStatus();
      if (t) {
        const s = {
          session_state: t.session_state,
          profile: t.sub && t.sid ? {
            sub: t.sub,
            sid: t.sid
          } : null
        };
        this._start(s);
      }
    }
  }
}, j = class {
  constructor(e) {
    var t;
    this.id_token = e.id_token, this.session_state = (t = e.session_state) != null ? t : null, this.access_token = e.access_token, this.refresh_token = e.refresh_token, this.token_type = e.token_type, this.scope = e.scope, this.profile = e.profile, this.expires_at = e.expires_at, this.state = e.userState;
  }
  get expires_in() {
    if (this.expires_at !== void 0)
      return this.expires_at - x.getEpochTime();
  }
  set expires_in(e) {
    e !== void 0 && (this.expires_at = Math.floor(e) + x.getEpochTime());
  }
  get expired() {
    const e = this.expires_in;
    if (e !== void 0)
      return e <= 0;
  }
  get scopes() {
    var e, t;
    return (t = (e = this.scope) == null ? void 0 : e.split(" ")) != null ? t : [];
  }
  toStorageString() {
    return new f("User").create("toStorageString"), JSON.stringify({
      id_token: this.id_token,
      session_state: this.session_state,
      access_token: this.access_token,
      refresh_token: this.refresh_token,
      token_type: this.token_type,
      scope: this.scope,
      profile: this.profile,
      expires_at: this.expires_at
    });
  }
  static fromStorageString(e) {
    return f.createStatic("User", "fromStorageString"), new j(JSON.parse(e));
  }
}, ne = "oidc-client", pe = class {
  constructor() {
    this._abort = new q("Window navigation aborted"), this._disposeHandlers = /* @__PURE__ */ new Set(), this._window = null;
  }
  async navigate(e) {
    const t = this._logger.create("navigate");
    if (!this._window)
      throw new Error("Attempted to navigate on a disposed window");
    t.debug("setting URL in window"), this._window.location.replace(e.url);
    const { url: s, keepOpen: r } = await new Promise((i, n) => {
      const o = (l) => {
        var c;
        const u = l.data, _ = (c = e.scriptOrigin) != null ? c : window.location.origin;
        if (!(l.origin !== _ || (u == null ? void 0 : u.source) !== ne)) {
          try {
            const g = G.readParams(u.url, e.response_mode).get("state");
            if (g || t.warn("no state found in response url"), l.source !== this._window && g !== e.state)
              return;
          } catch {
            this._dispose(), n(new Error("Invalid response from window"));
          }
          i(u);
        }
      };
      window.addEventListener("message", o, !1), this._disposeHandlers.add(() => window.removeEventListener("message", o, !1)), this._disposeHandlers.add(this._abort.addHandler((l) => {
        this._dispose(), n(l);
      }));
    });
    return t.debug("got response from window"), this._dispose(), r || this.close(), { url: s };
  }
  _dispose() {
    this._logger.create("_dispose");
    for (const e of this._disposeHandlers)
      e();
    this._disposeHandlers.clear();
  }
  static _notifyParent(e, t, s = !1, r = window.location.origin) {
    e.postMessage({
      source: ne,
      url: t,
      keepOpen: s
    }, r);
  }
}, fe = {
  location: !1,
  toolbar: !1,
  height: 640
}, we = "_blank", Xe = 60, Ye = 2, me = 10, Ze = class extends ue {
  constructor(e) {
    const {
      popup_redirect_uri: t = e.redirect_uri,
      popup_post_logout_redirect_uri: s = e.post_logout_redirect_uri,
      popupWindowFeatures: r = fe,
      popupWindowTarget: i = we,
      redirectMethod: n = "assign",
      redirectTarget: o = "self",
      iframeNotifyParentOrigin: l = e.iframeNotifyParentOrigin,
      iframeScriptOrigin: c = e.iframeScriptOrigin,
      silent_redirect_uri: u = e.redirect_uri,
      silentRequestTimeoutInSeconds: _ = me,
      automaticSilentRenew: g = !0,
      validateSubOnSilentRenew: S = !0,
      includeIdTokenInSilentRenew: w = !1,
      monitorSession: b = !1,
      monitorAnonymousSession: h = !1,
      checkSessionIntervalInSeconds: v = Ye,
      query_status_response_type: E = "code",
      stopCheckSessionOnError: a = !0,
      revokeTokenTypes: d = ["access_token", "refresh_token"],
      revokeTokensOnSignout: p = !1,
      includeIdTokenInSilentSignout: m = !1,
      accessTokenExpiringNotificationTimeInSeconds: y = Xe,
      userStore: k
    } = e;
    if (super(e), this.popup_redirect_uri = t, this.popup_post_logout_redirect_uri = s, this.popupWindowFeatures = r, this.popupWindowTarget = i, this.redirectMethod = n, this.redirectTarget = o, this.iframeNotifyParentOrigin = l, this.iframeScriptOrigin = c, this.silent_redirect_uri = u, this.silentRequestTimeoutInSeconds = _, this.automaticSilentRenew = g, this.validateSubOnSilentRenew = S, this.includeIdTokenInSilentRenew = w, this.monitorSession = b, this.monitorAnonymousSession = h, this.checkSessionIntervalInSeconds = v, this.stopCheckSessionOnError = a, this.query_status_response_type = E, this.revokeTokenTypes = d, this.revokeTokensOnSignout = p, this.includeIdTokenInSilentSignout = m, this.accessTokenExpiringNotificationTimeInSeconds = y, k)
      this.userStore = k;
    else {
      const T = typeof window < "u" ? window.sessionStorage : new he();
      this.userStore = new ge({ store: T });
    }
  }
}, Q = class extends pe {
  constructor({
    silentRequestTimeoutInSeconds: e = me
  }) {
    super(), this._logger = new f("IFrameWindow"), this._timeoutInSeconds = e, this._frame = Q.createHiddenIframe(), this._window = this._frame.contentWindow;
  }
  static createHiddenIframe() {
    const e = window.document.createElement("iframe");
    return e.style.visibility = "hidden", e.style.position = "fixed", e.style.left = "-1000px", e.style.top = "0", e.width = "0", e.height = "0", e.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms"), window.document.body.appendChild(e), e;
  }
  async navigate(e) {
    this._logger.debug("navigate: Using timeout of:", this._timeoutInSeconds);
    const t = setTimeout(() => this._abort.raise(new X("IFrame timed out without a response")), this._timeoutInSeconds * 1e3);
    return this._disposeHandlers.add(() => clearTimeout(t)), await super.navigate(e);
  }
  close() {
    var e;
    this._frame && (this._frame.parentNode && (this._frame.addEventListener("load", (t) => {
      var s;
      const r = t.target;
      (s = r.parentNode) == null || s.removeChild(r), this._abort.raise(new Error("IFrame removed from DOM"));
    }, !0), (e = this._frame.contentWindow) == null || e.location.replace("about:blank")), this._frame = null), this._window = null;
  }
  static notifyParent(e, t) {
    return super._notifyParent(window.parent, e, !1, t);
  }
}, et = class {
  constructor(e) {
    this._settings = e, this._logger = new f("IFrameNavigator");
  }
  async prepare({
    silentRequestTimeoutInSeconds: e = this._settings.silentRequestTimeoutInSeconds
  }) {
    return new Q({ silentRequestTimeoutInSeconds: e });
  }
  async callback(e) {
    this._logger.create("callback"), Q.notifyParent(e, this._settings.iframeNotifyParentOrigin);
  }
}, tt = 500, oe = class extends pe {
  constructor({
    popupWindowTarget: e = we,
    popupWindowFeatures: t = {}
  }) {
    super(), this._logger = new f("PopupWindow");
    const s = ie.center({ ...fe, ...t });
    this._window = window.open(void 0, e, ie.serialize(s));
  }
  async navigate(e) {
    var t;
    (t = this._window) == null || t.focus();
    const s = setInterval(() => {
      (!this._window || this._window.closed) && this._abort.raise(new Error("Popup closed by user"));
    }, tt);
    return this._disposeHandlers.add(() => clearInterval(s)), await super.navigate(e);
  }
  close() {
    this._window && (this._window.closed || (this._window.close(), this._abort.raise(new Error("Popup closed")))), this._window = null;
  }
  static notifyOpener(e, t) {
    if (!window.opener)
      throw new Error("No window.opener. Can't complete notification.");
    return super._notifyParent(window.opener, e, t);
  }
}, st = class {
  constructor(e) {
    this._settings = e, this._logger = new f("PopupNavigator");
  }
  async prepare({
    popupWindowFeatures: e = this._settings.popupWindowFeatures,
    popupWindowTarget: t = this._settings.popupWindowTarget
  }) {
    return new oe({ popupWindowFeatures: e, popupWindowTarget: t });
  }
  async callback(e, t = !1) {
    this._logger.create("callback"), oe.notifyOpener(e, t);
  }
}, rt = class {
  constructor(e) {
    this._settings = e, this._logger = new f("RedirectNavigator");
  }
  async prepare({
    redirectMethod: e = this._settings.redirectMethod,
    redirectTarget: t = this._settings.redirectTarget
  }) {
    var s;
    this._logger.create("prepare");
    let r = window.self;
    t === "top" && (r = (s = window.top) != null ? s : window.self);
    const i = r.location[e].bind(r.location);
    let n;
    return {
      navigate: async (o) => {
        this._logger.create("navigate");
        const l = new Promise((c, u) => {
          n = u;
        });
        return i(o.url), await l;
      },
      close: () => {
        this._logger.create("close"), n == null || n(new Error("Redirect aborted")), r.stop();
      }
    };
  }
}, it = class extends Ae {
  constructor(e) {
    super({ expiringNotificationTimeInSeconds: e.accessTokenExpiringNotificationTimeInSeconds }), this._logger = new f("UserManagerEvents"), this._userLoaded = new q("User loaded"), this._userUnloaded = new q("User unloaded"), this._silentRenewError = new q("Silent renew error"), this._userSignedIn = new q("User signed in"), this._userSignedOut = new q("User signed out"), this._userSessionChanged = new q("User session changed");
  }
  load(e, t = !0) {
    super.load(e), t && this._userLoaded.raise(e);
  }
  unload() {
    super.unload(), this._userUnloaded.raise();
  }
  addUserLoaded(e) {
    return this._userLoaded.addHandler(e);
  }
  removeUserLoaded(e) {
    return this._userLoaded.removeHandler(e);
  }
  addUserUnloaded(e) {
    return this._userUnloaded.addHandler(e);
  }
  removeUserUnloaded(e) {
    return this._userUnloaded.removeHandler(e);
  }
  addSilentRenewError(e) {
    return this._silentRenewError.addHandler(e);
  }
  removeSilentRenewError(e) {
    return this._silentRenewError.removeHandler(e);
  }
  _raiseSilentRenewError(e) {
    this._silentRenewError.raise(e);
  }
  addUserSignedIn(e) {
    return this._userSignedIn.addHandler(e);
  }
  removeUserSignedIn(e) {
    this._userSignedIn.removeHandler(e);
  }
  _raiseUserSignedIn() {
    this._userSignedIn.raise();
  }
  addUserSignedOut(e) {
    return this._userSignedOut.addHandler(e);
  }
  removeUserSignedOut(e) {
    this._userSignedOut.removeHandler(e);
  }
  _raiseUserSignedOut() {
    this._userSignedOut.raise();
  }
  addUserSessionChanged(e) {
    return this._userSessionChanged.addHandler(e);
  }
  removeUserSessionChanged(e) {
    this._userSessionChanged.removeHandler(e);
  }
  _raiseUserSessionChanged() {
    this._userSessionChanged.raise();
  }
}, nt = class {
  constructor(e) {
    this._userManager = e, this._logger = new f("SilentRenewService"), this._isStarted = !1, this._retryTimer = new x("Retry Silent Renew"), this._tokenExpiring = async () => {
      const t = this._logger.create("_tokenExpiring");
      try {
        await this._userManager.signinSilent(), t.debug("silent token renewal successful");
      } catch (s) {
        if (s instanceof X) {
          t.warn("ErrorTimeout from signinSilent:", s, "retry in 5s"), this._retryTimer.init(5);
          return;
        }
        t.error("Error from signinSilent:", s), this._userManager.events._raiseSilentRenewError(s);
      }
    };
  }
  async start() {
    const e = this._logger.create("start");
    if (!this._isStarted) {
      this._isStarted = !0, this._userManager.events.addAccessTokenExpiring(this._tokenExpiring), this._retryTimer.addHandler(this._tokenExpiring);
      try {
        await this._userManager.getUser();
      } catch (t) {
        e.error("getUser error", t);
      }
    }
  }
  stop() {
    this._isStarted && (this._retryTimer.cancel(), this._retryTimer.removeHandler(this._tokenExpiring), this._userManager.events.removeAccessTokenExpiring(this._tokenExpiring), this._isStarted = !1);
  }
}, ot = class {
  constructor(e) {
    this.refresh_token = e.refresh_token, this.id_token = e.id_token, this.session_state = e.session_state, this.scope = e.scope, this.profile = e.profile, this.data = e.state;
  }
}, at = class {
  constructor(e) {
    this._logger = new f("UserManager"), this.settings = new Ze(e), this._client = new Ge(e), this._redirectNavigator = new rt(this.settings), this._popupNavigator = new st(this.settings), this._iframeNavigator = new et(this.settings), this._events = new it(this.settings), this._silentRenewService = new nt(this), this.settings.automaticSilentRenew && this.startSilentRenew(), this._sessionMonitor = null, this.settings.monitorSession && (this._sessionMonitor = new Qe(this));
  }
  get events() {
    return this._events;
  }
  get metadataService() {
    return this._client.metadataService;
  }
  async getUser() {
    const e = this._logger.create("getUser"), t = await this._loadUser();
    return t ? (e.info("user loaded"), this._events.load(t, !1), t) : (e.info("user not found in storage"), null);
  }
  async removeUser() {
    const e = this._logger.create("removeUser");
    await this.storeUser(null), e.info("user removed from storage"), this._events.unload();
  }
  async signinRedirect(e = {}) {
    this._logger.create("signinRedirect");
    const {
      redirectMethod: t,
      ...s
    } = e, r = await this._redirectNavigator.prepare({ redirectMethod: t });
    await this._signinStart({
      request_type: "si:r",
      ...s
    }, r);
  }
  async signinRedirectCallback(e = window.location.href) {
    const t = this._logger.create("signinRedirectCallback"), s = await this._signinEnd(e);
    return s.profile && s.profile.sub ? t.info("success, signed in subject", s.profile.sub) : t.info("no subject"), s;
  }
  async signinResourceOwnerCredentials({
    username: e,
    password: t,
    skipUserInfo: s = !1
  }) {
    const r = this._logger.create("signinResourceOwnerCredential"), i = await this._client.processResourceOwnerPasswordCredentials({ username: e, password: t, skipUserInfo: s });
    r.debug("got signin response");
    const n = await this._buildUser(i);
    return n.profile && n.profile.sub ? r.info("success, signed in subject", n.profile.sub) : r.info("no subject"), n;
  }
  async signinPopup(e = {}) {
    const t = this._logger.create("signinPopup"), {
      popupWindowFeatures: s,
      popupWindowTarget: r,
      ...i
    } = e, n = this.settings.popup_redirect_uri;
    n || t.throw(new Error("No popup_redirect_uri configured"));
    const o = await this._popupNavigator.prepare({ popupWindowFeatures: s, popupWindowTarget: r }), l = await this._signin({
      request_type: "si:p",
      redirect_uri: n,
      display: "popup",
      ...i
    }, o);
    return l && (l.profile && l.profile.sub ? t.info("success, signed in subject", l.profile.sub) : t.info("no subject")), l;
  }
  async signinPopupCallback(e = window.location.href, t = !1) {
    const s = this._logger.create("signinPopupCallback");
    await this._popupNavigator.callback(e, t), s.info("success");
  }
  async signinSilent(e = {}) {
    var t;
    const s = this._logger.create("signinSilent"), {
      silentRequestTimeoutInSeconds: r,
      ...i
    } = e;
    let n = await this._loadUser();
    if (n != null && n.refresh_token) {
      s.debug("using refresh token");
      const u = new ot(n);
      return await this._useRefreshToken(u);
    }
    const o = this.settings.silent_redirect_uri;
    o || s.throw(new Error("No silent_redirect_uri configured"));
    let l;
    n && this.settings.validateSubOnSilentRenew && (s.debug("subject prior to silent renew:", n.profile.sub), l = n.profile.sub);
    const c = await this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds: r });
    return n = await this._signin({
      request_type: "si:s",
      redirect_uri: o,
      prompt: "none",
      id_token_hint: this.settings.includeIdTokenInSilentRenew ? n == null ? void 0 : n.id_token : void 0,
      ...i
    }, c, l), n && ((t = n.profile) != null && t.sub ? s.info("success, signed in subject", n.profile.sub) : s.info("no subject")), n;
  }
  async _useRefreshToken(e) {
    const t = await this._client.useRefreshToken({
      state: e,
      timeoutInSeconds: this.settings.silentRequestTimeoutInSeconds
    }), s = new j({ ...e, ...t });
    return await this.storeUser(s), this._events.load(s), s;
  }
  async signinSilentCallback(e = window.location.href) {
    const t = this._logger.create("signinSilentCallback");
    await this._iframeNavigator.callback(e), t.info("success");
  }
  async signinCallback(e = window.location.href) {
    const { state: t } = await this._client.readSigninResponseState(e);
    switch (t.request_type) {
      case "si:r":
        return await this.signinRedirectCallback(e);
      case "si:p":
        return await this.signinPopupCallback(e);
      case "si:s":
        return await this.signinSilentCallback(e);
      default:
        throw new Error("invalid response_type in state");
    }
  }
  async signoutCallback(e = window.location.href, t = !1) {
    const { state: s } = await this._client.readSignoutResponseState(e);
    if (!!s)
      switch (s.request_type) {
        case "so:r":
          await this.signoutRedirectCallback(e);
          break;
        case "so:p":
          await this.signoutPopupCallback(e, t);
          break;
        case "so:s":
          await this.signoutSilentCallback(e);
          break;
        default:
          throw new Error("invalid response_type in state");
      }
  }
  async querySessionStatus(e = {}) {
    const t = this._logger.create("querySessionStatus"), {
      silentRequestTimeoutInSeconds: s,
      ...r
    } = e, i = this.settings.silent_redirect_uri;
    i || t.throw(new Error("No silent_redirect_uri configured"));
    const n = await this._loadUser(), o = await this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds: s }), l = await this._signinStart({
      request_type: "si:s",
      redirect_uri: i,
      prompt: "none",
      id_token_hint: this.settings.includeIdTokenInSilentRenew ? n == null ? void 0 : n.id_token : void 0,
      response_type: this.settings.query_status_response_type,
      scope: "openid",
      skipUserInfo: !0,
      ...r
    }, o);
    try {
      const c = await this._client.processSigninResponse(l.url);
      return t.debug("got signin response"), c.session_state && c.profile.sub ? (t.info("success for subject", c.profile.sub), {
        session_state: c.session_state,
        sub: c.profile.sub,
        sid: c.profile.sid
      }) : (t.info("success, user not authenticated"), null);
    } catch (c) {
      if (this.settings.monitorAnonymousSession && c instanceof M)
        switch (c.error) {
          case "login_required":
          case "consent_required":
          case "interaction_required":
          case "account_selection_required":
            return t.info("success for anonymous user"), {
              session_state: c.session_state
            };
        }
      throw c;
    }
  }
  async _signin(e, t, s) {
    const r = await this._signinStart(e, t);
    return await this._signinEnd(r.url, s);
  }
  async _signinStart(e, t) {
    const s = this._logger.create("_signinStart");
    try {
      const r = await this._client.createSigninRequest(e);
      return s.debug("got signin request"), await t.navigate({
        url: r.url,
        state: r.state.id,
        response_mode: r.state.response_mode,
        scriptOrigin: this.settings.iframeScriptOrigin
      });
    } catch (r) {
      throw s.debug("error after preparing navigator, closing navigator window"), t.close(), r;
    }
  }
  async _signinEnd(e, t) {
    const s = this._logger.create("_signinEnd"), r = await this._client.processSigninResponse(e);
    return s.debug("got signin response"), await this._buildUser(r, t);
  }
  async _buildUser(e, t) {
    const s = this._logger.create("_buildUser"), r = new j(e);
    if (t) {
      if (t !== r.profile.sub)
        throw s.debug("current user does not match user returned from signin. sub from signin:", r.profile.sub), new M({ ...e, error: "login_required" });
      s.debug("current user matches user returned from signin");
    }
    return await this.storeUser(r), s.debug("user stored"), this._events.load(r), r;
  }
  async signoutRedirect(e = {}) {
    const t = this._logger.create("signoutRedirect"), {
      redirectMethod: s,
      ...r
    } = e, i = await this._redirectNavigator.prepare({ redirectMethod: s });
    await this._signoutStart({
      request_type: "so:r",
      post_logout_redirect_uri: this.settings.post_logout_redirect_uri,
      ...r
    }, i), t.info("success");
  }
  async signoutRedirectCallback(e = window.location.href) {
    const t = this._logger.create("signoutRedirectCallback"), s = await this._signoutEnd(e);
    return t.info("success"), s;
  }
  async signoutPopup(e = {}) {
    const t = this._logger.create("signoutPopup"), {
      popupWindowFeatures: s,
      popupWindowTarget: r,
      ...i
    } = e, n = this.settings.popup_post_logout_redirect_uri, o = await this._popupNavigator.prepare({ popupWindowFeatures: s, popupWindowTarget: r });
    await this._signout({
      request_type: "so:p",
      post_logout_redirect_uri: n,
      state: n == null ? void 0 : {},
      ...i
    }, o), t.info("success");
  }
  async signoutPopupCallback(e = window.location.href, t = !1) {
    const s = this._logger.create("signoutPopupCallback");
    await this._popupNavigator.callback(e, t), s.info("success");
  }
  async _signout(e, t) {
    const s = await this._signoutStart(e, t);
    return await this._signoutEnd(s.url);
  }
  async _signoutStart(e = {}, t) {
    var s;
    const r = this._logger.create("_signoutStart");
    try {
      const i = await this._loadUser();
      r.debug("loaded current user from storage"), this.settings.revokeTokensOnSignout && await this._revokeInternal(i);
      const n = e.id_token_hint || i && i.id_token;
      n && (r.debug("setting id_token_hint in signout request"), e.id_token_hint = n), await this.removeUser(), r.debug("user removed, creating signout request");
      const o = await this._client.createSignoutRequest(e);
      return r.debug("got signout request"), await t.navigate({
        url: o.url,
        state: (s = o.state) == null ? void 0 : s.id
      });
    } catch (i) {
      throw r.debug("error after preparing navigator, closing navigator window"), t.close(), i;
    }
  }
  async _signoutEnd(e) {
    const t = this._logger.create("_signoutEnd"), s = await this._client.processSignoutResponse(e);
    return t.debug("got signout response"), s;
  }
  async signoutSilent(e = {}) {
    var t;
    const s = this._logger.create("signoutSilent"), {
      silentRequestTimeoutInSeconds: r,
      ...i
    } = e, n = this.settings.includeIdTokenInSilentSignout ? (t = await this._loadUser()) == null ? void 0 : t.id_token : void 0, o = this.settings.popup_post_logout_redirect_uri, l = await this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds: r });
    await this._signout({
      request_type: "so:s",
      post_logout_redirect_uri: o,
      id_token_hint: n,
      ...i
    }, l), s.info("success");
  }
  async signoutSilentCallback(e = window.location.href) {
    const t = this._logger.create("signoutSilentCallback");
    await this._iframeNavigator.callback(e), t.info("success");
  }
  async revokeTokens(e) {
    const t = await this._loadUser();
    await this._revokeInternal(t, e);
  }
  async _revokeInternal(e, t = this.settings.revokeTokenTypes) {
    const s = this._logger.create("_revokeInternal");
    if (!e)
      return;
    const r = t.filter((i) => typeof e[i] == "string");
    if (!r.length) {
      s.debug("no need to revoke due to no token(s)");
      return;
    }
    for (const i of r)
      await this._client.revokeToken(
        e[i],
        i
      ), s.info(`${i} revoked successfully`), i !== "access_token" && (e[i] = null);
    await this.storeUser(e), s.debug("user stored"), this._events.load(e);
  }
  startSilentRenew() {
    this._logger.create("startSilentRenew"), this._silentRenewService.start();
  }
  stopSilentRenew() {
    this._silentRenewService.stop();
  }
  get _userStoreKey() {
    return `user:${this.settings.authority}:${this.settings.client_id}`;
  }
  async _loadUser() {
    const e = this._logger.create("_loadUser"), t = await this.settings.userStore.get(this._userStoreKey);
    return t ? (e.debug("user storageString loaded"), j.fromStorageString(t)) : (e.debug("no user storageString"), null);
  }
  async storeUser(e) {
    const t = this._logger.create("storeUser");
    if (e) {
      t.debug("storing user");
      const s = e.toStorageString();
      await this.settings.userStore.set(this._userStoreKey, s);
    } else
      this._logger.debug("removing user"), await this.settings.userStore.remove(this._userStoreKey);
  }
  async clearStaleState() {
    await this._client.clearStaleState();
  }
}, ct = "2.2.0", _t = ct;
const ae = (e, t) => (e || (e = []), t || (t = []), Array.isArray(e) || (e = e.split(" ")), Array.isArray(t) || (t = t.split(" ")), e.concat(t).filter((s, r, i) => i.indexOf(s) === r).join(" ").trim()), lt = "https://stage.identity.multicartshop.com", dt = "https://identity.multicartshop.com", ht = "Multicart.TypeScript.Client";
class gt {
  constructor(t = {}) {
    this.configuration = t;
  }
  set config(t) {
    this.configuration = t;
  }
  get sandbox() {
    return !!this.configuration.sandbox;
  }
  get basePath() {
    return this.configuration.basePath || this.sandbox ? lt : dt;
  }
  get client_id() {
    return this.configuration.client_id || ht;
  }
  get redirect_uri() {
    return this.configuration.redirect_uri || (window == null ? void 0 : window.location.origin) + "/login";
  }
  get logout_redirect_uri() {
    return this.configuration.logout_redirect_uri || (window == null ? void 0 : window.location.origin) + "/logout";
  }
  get client_secret() {
    return this.configuration.client_secret;
  }
  get scopes() {
    return this.configuration.scopes;
  }
}
const ut = new gt();
class pt extends at {
  constructor(t = ut) {
    const s = {
      authority: t.basePath,
      loadUserInfo: !0,
      client_id: t.client_id,
      redirect_uri: t.redirect_uri,
      post_logout_redirect_uri: t.logout_redirect_uri,
      client_secret: t.client_secret,
      scope: ae(t.scopes)
    };
    super(s), this.configuration = t;
  }
  async signinClientCredentials({
    scopes: t
  } = {}) {
    var c;
    const s = this._logger.create("signinClientCredentials"), r = await this.metadataService.getTokenEndpoint().catch((u) => s.error(u));
    if (!r)
      throw new Error("Token endpoint not be empty");
    const {
      client_id: i,
      client_secret: n,
      scope: o
    } = this.settings, l = ae(o, t);
    if (!n)
      throw new Error("No client_secret configured");
    try {
      const _ = await (await fetch(r, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: i,
          client_secret: n,
          scope: l
        }).toString(),
        mode: "cors"
      })).json(), g = new j(_);
      return g.expires_at = Math.floor(Date.now() / 1e3) + ((c = _.expires_in) != null ? c : 0), await this.storeUser(g), s.debug("user stored"), this._events.load(g), g;
    } catch (u) {
      throw s.error("Login failed", u), new Error("Login failed");
    }
  }
}
export {
  Ae as AccessTokenEvents,
  qe as CheckSessionIFrame,
  ut as DefaultMulticartOAuthConfig,
  M as ErrorResponse,
  X as ErrorTimeout,
  he as InMemoryWebStorage,
  W as Log,
  f as Logger,
  dt as MULTICART_AUTH_PROD_PATH,
  lt as MULTICART_AUTH_SANDBOX_PATH,
  ht as MULTICART_CLIENT_ID,
  Ne as MetadataService,
  pt as MulticartOAuthClient,
  gt as MulticartOAuthConfiguration,
  Ge as OidcClient,
  ue as OidcClientSettingsStore,
  Qe as SessionMonitor,
  J as SigninResponse,
  Z as SigninState,
  Ve as SignoutResponse,
  H as State,
  j as User,
  at as UserManager,
  Ze as UserManagerSettingsStore,
  _t as Version,
  ge as WebStorageStateStore,
  ae as mergeScopes
};
//# sourceMappingURL=cle-oidc-client.mjs.map
