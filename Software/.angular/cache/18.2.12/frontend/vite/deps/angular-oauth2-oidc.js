import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHeaders,
  HttpParams
} from "./chunk-KK35M6XF.js";
import {
  CommonModule,
  DOCUMENT
} from "./chunk-GWAU3GAC.js";
import {
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  NgZone,
  Optional,
  makeEnvironmentProviders,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵgetInheritedFactory,
  ɵɵinject
} from "./chunk-ADJ6LL3Q.js";
import {
  merge
} from "./chunk-LBBSG2YE.js";
import "./chunk-WSXI74FV.js";
import {
  Subject,
  __async,
  catchError,
  combineLatest,
  debounceTime,
  delay,
  filter,
  first,
  from,
  map,
  mergeMap,
  of,
  race,
  switchMap,
  take,
  tap,
  throwError,
  timeout
} from "./chunk-NGNUV6BG.js";

// node_modules/angular-oauth2-oidc/fesm2022/angular-oauth2-oidc.mjs
var NullValidationHandler = class {
  validateSignature(validationParams) {
    return Promise.resolve(null);
  }
  validateAtHash(validationParams) {
    return Promise.resolve(true);
  }
};
var OAuthModuleConfig = class {
};
var OAuthResourceServerConfig = class {
};
var DateTimeProvider = class {
};
var SystemDateTimeProvider = class _SystemDateTimeProvider extends DateTimeProvider {
  now() {
    return Date.now();
  }
  new() {
    return /* @__PURE__ */ new Date();
  }
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵSystemDateTimeProvider_BaseFactory;
      return function SystemDateTimeProvider_Factory(__ngFactoryType__) {
        return (ɵSystemDateTimeProvider_BaseFactory || (ɵSystemDateTimeProvider_BaseFactory = ɵɵgetInheritedFactory(_SystemDateTimeProvider)))(__ngFactoryType__ || _SystemDateTimeProvider);
      };
    })();
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _SystemDateTimeProvider,
      factory: _SystemDateTimeProvider.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SystemDateTimeProvider, [{
    type: Injectable
  }], null, null);
})();
var LoginOptions = class {
  constructor() {
    this.disableNonceCheck = false;
    this.preventClearHashAfterLogin = false;
  }
};
var OAuthLogger = class {
};
var OAuthStorage = class {
};
var MemoryStorage = class _MemoryStorage {
  constructor() {
    this.data = /* @__PURE__ */ new Map();
  }
  getItem(key) {
    return this.data.get(key);
  }
  removeItem(key) {
    this.data.delete(key);
  }
  setItem(key, data) {
    this.data.set(key, data);
  }
  static {
    this.ɵfac = function MemoryStorage_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MemoryStorage)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _MemoryStorage,
      factory: _MemoryStorage.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MemoryStorage, [{
    type: Injectable
  }], null, null);
})();
var ReceivedTokens = class {
};
var OAuthEvent = class {
  constructor(type) {
    this.type = type;
  }
};
var OAuthSuccessEvent = class extends OAuthEvent {
  constructor(type, info = null) {
    super(type);
    this.info = info;
  }
};
var OAuthInfoEvent = class extends OAuthEvent {
  constructor(type, info = null) {
    super(type);
    this.info = info;
  }
};
var OAuthErrorEvent = class extends OAuthEvent {
  constructor(type, reason, params = null) {
    super(type);
    this.reason = reason;
    this.params = params;
  }
};
function b64DecodeUnicode(str) {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  return decodeURIComponent(atob(base64).split("").map(function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function base64UrlEncode(str) {
  const base64 = btoa(str);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
var AuthConfig = class {
  constructor(json) {
    this.clientId = "";
    this.redirectUri = "";
    this.postLogoutRedirectUri = "";
    this.redirectUriAsPostLogoutRedirectUriFallback = true;
    this.loginUrl = "";
    this.scope = "openid profile";
    this.resource = "";
    this.rngUrl = "";
    this.oidc = true;
    this.requestAccessToken = true;
    this.options = null;
    this.issuer = "";
    this.logoutUrl = "";
    this.clearHashAfterLogin = true;
    this.tokenEndpoint = null;
    this.revocationEndpoint = null;
    this.customTokenParameters = [];
    this.userinfoEndpoint = null;
    this.responseType = "";
    this.showDebugInformation = false;
    this.silentRefreshRedirectUri = "";
    this.silentRefreshMessagePrefix = "";
    this.silentRefreshShowIFrame = false;
    this.siletRefreshTimeout = 1e3 * 20;
    this.silentRefreshTimeout = 1e3 * 20;
    this.dummyClientSecret = "";
    this.requireHttps = "remoteOnly";
    this.strictDiscoveryDocumentValidation = true;
    this.jwks = null;
    this.customQueryParams = null;
    this.silentRefreshIFrameName = "angular-oauth-oidc-silent-refresh-iframe";
    this.timeoutFactor = 0.75;
    this.sessionChecksEnabled = false;
    this.sessionCheckIntervall = 3 * 1e3;
    this.sessionCheckIFrameUrl = null;
    this.sessionCheckIFrameName = "angular-oauth-oidc-check-session-iframe";
    this.disableAtHashCheck = false;
    this.skipSubjectCheck = false;
    this.useIdTokenHintForSilentRefresh = false;
    this.skipIssuerCheck = false;
    this.nonceStateSeparator = ";";
    this.useHttpBasicAuth = false;
    this.decreaseExpirationBySec = 0;
    this.waitForTokenInMsec = 0;
    this.disablePKCE = false;
    this.preserveRequestedRoute = false;
    this.disableIdTokenTimer = false;
    this.checkOrigin = false;
    this.openUri = (uri) => {
      location.href = uri;
    };
    if (json) {
      Object.assign(this, json);
    }
  }
};
var WebHttpUrlEncodingCodec = class {
  encodeKey(k) {
    return encodeURIComponent(k);
  }
  encodeValue(v) {
    return encodeURIComponent(v);
  }
  decodeKey(k) {
    return decodeURIComponent(k);
  }
  decodeValue(v) {
    return decodeURIComponent(v);
  }
};
var ValidationHandler = class {
};
var AbstractValidationHandler = class {
  /**
   * Validates the at_hash in an id_token against the received access_token.
   */
  validateAtHash(params) {
    return __async(this, null, function* () {
      const hashAlg = this.inferHashAlgorithm(params.idTokenHeader);
      const tokenHash = yield this.calcHash(params.accessToken, hashAlg);
      const leftMostHalf = tokenHash.substr(0, tokenHash.length / 2);
      const atHash = base64UrlEncode(leftMostHalf);
      const claimsAtHash = params.idTokenClaims["at_hash"].replace(/=/g, "");
      if (atHash !== claimsAtHash) {
        console.error("exptected at_hash: " + atHash);
        console.error("actual at_hash: " + claimsAtHash);
      }
      return atHash === claimsAtHash;
    });
  }
  /**
   * Infers the name of the hash algorithm to use
   * from the alg field of an id_token.
   *
   * @param jwtHeader the id_token's parsed header
   */
  inferHashAlgorithm(jwtHeader) {
    const alg = jwtHeader["alg"];
    if (!alg.match(/^.S[0-9]{3}$/)) {
      throw new Error("Algorithm not supported: " + alg);
    }
    return "sha-" + alg.substr(2);
  }
};
var UrlHelperService = class _UrlHelperService {
  getHashFragmentParams(customHashFragment) {
    let hash2 = customHashFragment || window.location.hash;
    hash2 = decodeURIComponent(hash2);
    if (hash2.indexOf("#") !== 0) {
      return {};
    }
    const questionMarkPosition = hash2.indexOf("?");
    if (questionMarkPosition > -1) {
      hash2 = hash2.substr(questionMarkPosition + 1);
    } else {
      hash2 = hash2.substr(1);
    }
    return this.parseQueryString(hash2);
  }
  parseQueryString(queryString) {
    const data = {};
    let pair, separatorIndex, escapedKey, escapedValue, key, value;
    if (queryString === null) {
      return data;
    }
    const pairs = queryString.split("&");
    for (let i = 0; i < pairs.length; i++) {
      pair = pairs[i];
      separatorIndex = pair.indexOf("=");
      if (separatorIndex === -1) {
        escapedKey = pair;
        escapedValue = null;
      } else {
        escapedKey = pair.substr(0, separatorIndex);
        escapedValue = pair.substr(separatorIndex + 1);
      }
      key = decodeURIComponent(escapedKey);
      value = decodeURIComponent(escapedValue);
      if (key.substr(0, 1) === "/") {
        key = key.substr(1);
      }
      data[key] = value;
    }
    return data;
  }
  static {
    this.ɵfac = function UrlHelperService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UrlHelperService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _UrlHelperService,
      factory: _UrlHelperService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UrlHelperService, [{
    type: Injectable
  }], null, null);
})();
var digestLength = 32;
var blockSize = 64;
var K = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
function hashBlocks(w, v, p, pos, len) {
  let a, b, c, d, e, f, g, h, u, i, j, t1, t2;
  while (len >= 64) {
    a = v[0];
    b = v[1];
    c = v[2];
    d = v[3];
    e = v[4];
    f = v[5];
    g = v[6];
    h = v[7];
    for (i = 0; i < 16; i++) {
      j = pos + i * 4;
      w[i] = (p[j] & 255) << 24 | (p[j + 1] & 255) << 16 | (p[j + 2] & 255) << 8 | p[j + 3] & 255;
    }
    for (i = 16; i < 64; i++) {
      u = w[i - 2];
      t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
      u = w[i - 15];
      t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
      w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
    }
    for (i = 0; i < 64; i++) {
      t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g) | 0) + (h + (K[i] + w[i] | 0) | 0) | 0;
      t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    v[0] += a;
    v[1] += b;
    v[2] += c;
    v[3] += d;
    v[4] += e;
    v[5] += f;
    v[6] += g;
    v[7] += h;
    pos += 64;
    len -= 64;
  }
  return pos;
}
var Hash = class {
  constructor() {
    this.digestLength = digestLength;
    this.blockSize = blockSize;
    this.state = new Int32Array(8);
    this.temp = new Int32Array(64);
    this.buffer = new Uint8Array(128);
    this.bufferLength = 0;
    this.bytesHashed = 0;
    this.finished = false;
    this.reset();
  }
  // Resets hash state making it possible
  // to re-use this instance to hash other data.
  reset() {
    this.state[0] = 1779033703;
    this.state[1] = 3144134277;
    this.state[2] = 1013904242;
    this.state[3] = 2773480762;
    this.state[4] = 1359893119;
    this.state[5] = 2600822924;
    this.state[6] = 528734635;
    this.state[7] = 1541459225;
    this.bufferLength = 0;
    this.bytesHashed = 0;
    this.finished = false;
    return this;
  }
  // Cleans internal buffers and re-initializes hash state.
  clean() {
    for (let i = 0; i < this.buffer.length; i++) {
      this.buffer[i] = 0;
    }
    for (let i = 0; i < this.temp.length; i++) {
      this.temp[i] = 0;
    }
    this.reset();
  }
  // Updates hash state with the given data.
  //
  // Optionally, length of the data can be specified to hash
  // fewer bytes than data.length.
  //
  // Throws error when trying to update already finalized hash:
  // instance must be reset to use it again.
  update(data, dataLength = data.length) {
    if (this.finished) {
      throw new Error("SHA256: can't update because hash was finished.");
    }
    let dataPos = 0;
    this.bytesHashed += dataLength;
    if (this.bufferLength > 0) {
      while (this.bufferLength < 64 && dataLength > 0) {
        this.buffer[this.bufferLength++] = data[dataPos++];
        dataLength--;
      }
      if (this.bufferLength === 64) {
        hashBlocks(this.temp, this.state, this.buffer, 0, 64);
        this.bufferLength = 0;
      }
    }
    if (dataLength >= 64) {
      dataPos = hashBlocks(this.temp, this.state, data, dataPos, dataLength);
      dataLength %= 64;
    }
    while (dataLength > 0) {
      this.buffer[this.bufferLength++] = data[dataPos++];
      dataLength--;
    }
    return this;
  }
  // Finalizes hash state and puts hash into out.
  //
  // If hash was already finalized, puts the same value.
  finish(out) {
    if (!this.finished) {
      const bytesHashed = this.bytesHashed;
      const left = this.bufferLength;
      const bitLenHi = bytesHashed / 536870912 | 0;
      const bitLenLo = bytesHashed << 3;
      const padLength = bytesHashed % 64 < 56 ? 64 : 128;
      this.buffer[left] = 128;
      for (let i = left + 1; i < padLength - 8; i++) {
        this.buffer[i] = 0;
      }
      this.buffer[padLength - 8] = bitLenHi >>> 24 & 255;
      this.buffer[padLength - 7] = bitLenHi >>> 16 & 255;
      this.buffer[padLength - 6] = bitLenHi >>> 8 & 255;
      this.buffer[padLength - 5] = bitLenHi >>> 0 & 255;
      this.buffer[padLength - 4] = bitLenLo >>> 24 & 255;
      this.buffer[padLength - 3] = bitLenLo >>> 16 & 255;
      this.buffer[padLength - 2] = bitLenLo >>> 8 & 255;
      this.buffer[padLength - 1] = bitLenLo >>> 0 & 255;
      hashBlocks(this.temp, this.state, this.buffer, 0, padLength);
      this.finished = true;
    }
    for (let i = 0; i < 8; i++) {
      out[i * 4 + 0] = this.state[i] >>> 24 & 255;
      out[i * 4 + 1] = this.state[i] >>> 16 & 255;
      out[i * 4 + 2] = this.state[i] >>> 8 & 255;
      out[i * 4 + 3] = this.state[i] >>> 0 & 255;
    }
    return this;
  }
  // Returns the final hash digest.
  digest() {
    const out = new Uint8Array(this.digestLength);
    this.finish(out);
    return out;
  }
  // Internal function for use in HMAC for optimization.
  _saveState(out) {
    for (let i = 0; i < this.state.length; i++) {
      out[i] = this.state[i];
    }
  }
  // Internal function for use in HMAC for optimization.
  _restoreState(from2, bytesHashed) {
    for (let i = 0; i < this.state.length; i++) {
      this.state[i] = from2[i];
    }
    this.bytesHashed = bytesHashed;
    this.finished = false;
    this.bufferLength = 0;
  }
};
function hash(data) {
  const h = new Hash().update(data);
  const digest = h.digest();
  h.clean();
  return digest;
}
var hkdfSalt = new Uint8Array(digestLength);
var HashHandler = class {
};
function decodeUTF8(s) {
  if (typeof s !== "string") throw new TypeError("expected string");
  const d = s, b = new Uint8Array(d.length);
  for (let i = 0; i < d.length; i++) b[i] = d.charCodeAt(i);
  return b;
}
function encodeUTF8(arr) {
  const s = [];
  for (let i = 0; i < arr.length; i++) s.push(String.fromCharCode(arr[i]));
  return s.join("");
}
var DefaultHashHandler = class _DefaultHashHandler {
  calcHash(valueToHash, algorithm) {
    return __async(this, null, function* () {
      const candHash = encodeUTF8(hash(decodeUTF8(valueToHash)));
      return candHash;
    });
  }
  toHashString2(byteArray) {
    let result = "";
    for (const e of byteArray) {
      result += String.fromCharCode(e);
    }
    return result;
  }
  toHashString(buffer) {
    const byteArray = new Uint8Array(buffer);
    let result = "";
    for (const e of byteArray) {
      result += String.fromCharCode(e);
    }
    return result;
  }
  static {
    this.ɵfac = function DefaultHashHandler_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DefaultHashHandler)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _DefaultHashHandler,
      factory: _DefaultHashHandler.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultHashHandler, [{
    type: Injectable
  }], null, null);
})();
var OAuthService = class _OAuthService extends AuthConfig {
  constructor(ngZone, http, storage, tokenValidationHandler, config, urlHelper, logger, crypto, document, dateTimeService) {
    super();
    this.ngZone = ngZone;
    this.http = http;
    this.config = config;
    this.urlHelper = urlHelper;
    this.logger = logger;
    this.crypto = crypto;
    this.dateTimeService = dateTimeService;
    this.discoveryDocumentLoaded = false;
    this.state = "";
    this.eventsSubject = new Subject();
    this.discoveryDocumentLoadedSubject = new Subject();
    this.grantTypesSupported = [];
    this.inImplicitFlow = false;
    this.saveNoncesInLocalStorage = false;
    this.debug("angular-oauth2-oidc v10");
    this.document = document;
    if (!config) {
      config = {};
    }
    this.discoveryDocumentLoaded$ = this.discoveryDocumentLoadedSubject.asObservable();
    this.events = this.eventsSubject.asObservable();
    if (tokenValidationHandler) {
      this.tokenValidationHandler = tokenValidationHandler;
    }
    if (config) {
      this.configure(config);
    }
    try {
      if (storage) {
        this.setStorage(storage);
      } else if (typeof sessionStorage !== "undefined") {
        this.setStorage(sessionStorage);
      }
    } catch (e) {
      console.error("No OAuthStorage provided and cannot access default (sessionStorage).Consider providing a custom OAuthStorage implementation in your module.", e);
    }
    if (this.checkLocalStorageAccessable()) {
      const ua = window?.navigator?.userAgent;
      const msie = ua?.includes("MSIE ") || ua?.includes("Trident");
      if (msie) {
        this.saveNoncesInLocalStorage = true;
      }
    }
    this.setupRefreshTimer();
  }
  checkLocalStorageAccessable() {
    if (typeof window === "undefined") return false;
    const test = "test";
    try {
      if (typeof window["localStorage"] === "undefined") return false;
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * Use this method to configure the service
   * @param config the configuration
   */
  configure(config) {
    Object.assign(this, new AuthConfig(), config);
    this.config = Object.assign({}, new AuthConfig(), config);
    if (this.sessionChecksEnabled) {
      this.setupSessionCheck();
    }
    this.configChanged();
  }
  configChanged() {
    this.setupRefreshTimer();
  }
  restartSessionChecksIfStillLoggedIn() {
    if (this.hasValidIdToken()) {
      this.initSessionCheck();
    }
  }
  restartRefreshTimerIfStillLoggedIn() {
    this.setupExpirationTimers();
  }
  setupSessionCheck() {
    this.events.pipe(filter((e) => e.type === "token_received")).subscribe(() => {
      this.initSessionCheck();
    });
  }
  /**
   * Will setup up silent refreshing for when the token is
   * about to expire. When the user is logged out via this.logOut method, the
   * silent refreshing will pause and not refresh the tokens until the user is
   * logged back in via receiving a new token.
   * @param params Additional parameter to pass
   * @param listenTo Setup automatic refresh of a specific token type
   */
  setupAutomaticSilentRefresh(params = {}, listenTo, noPrompt = true) {
    let shouldRunSilentRefresh = true;
    this.clearAutomaticRefreshTimer();
    this.automaticRefreshSubscription = this.events.pipe(tap((e) => {
      if (e.type === "token_received") {
        shouldRunSilentRefresh = true;
      } else if (e.type === "logout") {
        shouldRunSilentRefresh = false;
      }
    }), filter((e) => e.type === "token_expires" && (listenTo == null || listenTo === "any" || e.info === listenTo)), debounceTime(1e3)).subscribe(() => {
      if (shouldRunSilentRefresh) {
        this.refreshInternal(params, noPrompt).catch(() => {
          this.debug("Automatic silent refresh did not work");
        });
      }
    });
    this.restartRefreshTimerIfStillLoggedIn();
  }
  refreshInternal(params, noPrompt) {
    if (!this.useSilentRefresh && this.responseType === "code") {
      return this.refreshToken();
    } else {
      return this.silentRefresh(params, noPrompt);
    }
  }
  /**
   * Convenience method that first calls `loadDiscoveryDocument(...)` and
   * directly chains using the `then(...)` part of the promise to call
   * the `tryLogin(...)` method.
   *
   * @param options LoginOptions to pass through to `tryLogin(...)`
   */
  loadDiscoveryDocumentAndTryLogin(options = null) {
    return this.loadDiscoveryDocument().then(() => {
      return this.tryLogin(options);
    });
  }
  /**
   * Convenience method that first calls `loadDiscoveryDocumentAndTryLogin(...)`
   * and if then chains to `initLoginFlow()`, but only if there is no valid
   * IdToken or no valid AccessToken.
   *
   * @param options LoginOptions to pass through to `tryLogin(...)`
   */
  loadDiscoveryDocumentAndLogin(options = null) {
    options = options || {};
    return this.loadDiscoveryDocumentAndTryLogin(options).then(() => {
      if (!this.hasValidIdToken() || !this.hasValidAccessToken()) {
        const state = typeof options.state === "string" ? options.state : "";
        this.initLoginFlow(state);
        return false;
      } else {
        return true;
      }
    });
  }
  debug(...args) {
    if (this.showDebugInformation) {
      this.logger.debug(...args);
    }
  }
  validateUrlFromDiscoveryDocument(url) {
    const errors = [];
    const httpsCheck = this.validateUrlForHttps(url);
    const issuerCheck = this.validateUrlAgainstIssuer(url);
    if (!httpsCheck) {
      errors.push("https for all urls required. Also for urls received by discovery.");
    }
    if (!issuerCheck) {
      errors.push("Every url in discovery document has to start with the issuer url.Also see property strictDiscoveryDocumentValidation.");
    }
    return errors;
  }
  validateUrlForHttps(url) {
    if (!url) {
      return true;
    }
    const lcUrl = url.toLowerCase();
    if (this.requireHttps === false) {
      return true;
    }
    if ((lcUrl.match(/^http:\/\/localhost($|[:/])/) || lcUrl.match(/^http:\/\/localhost($|[:/])/)) && this.requireHttps === "remoteOnly") {
      return true;
    }
    return lcUrl.startsWith("https://");
  }
  assertUrlNotNullAndCorrectProtocol(url, description) {
    if (!url) {
      throw new Error(`'${description}' should not be null`);
    }
    if (!this.validateUrlForHttps(url)) {
      throw new Error(`'${description}' must use HTTPS (with TLS), or config value for property 'requireHttps' must be set to 'false' and allow HTTP (without TLS).`);
    }
  }
  validateUrlAgainstIssuer(url) {
    if (!this.strictDiscoveryDocumentValidation) {
      return true;
    }
    if (!url) {
      return true;
    }
    return url.toLowerCase().startsWith(this.issuer.toLowerCase());
  }
  setupRefreshTimer() {
    if (typeof window === "undefined") {
      this.debug("timer not supported on this plattform");
      return;
    }
    if (this.hasValidIdToken() || this.hasValidAccessToken()) {
      this.clearAccessTokenTimer();
      this.clearIdTokenTimer();
      this.setupExpirationTimers();
    }
    if (this.tokenReceivedSubscription) this.tokenReceivedSubscription.unsubscribe();
    this.tokenReceivedSubscription = this.events.pipe(filter((e) => e.type === "token_received")).subscribe(() => {
      this.clearAccessTokenTimer();
      this.clearIdTokenTimer();
      this.setupExpirationTimers();
    });
  }
  setupExpirationTimers() {
    if (this.hasValidAccessToken()) {
      this.setupAccessTokenTimer();
    }
    if (!this.disableIdTokenTimer && this.hasValidIdToken()) {
      this.setupIdTokenTimer();
    }
  }
  setupAccessTokenTimer() {
    const expiration = this.getAccessTokenExpiration();
    const storedAt = this.getAccessTokenStoredAt();
    const timeout2 = this.calcTimeout(storedAt, expiration);
    this.ngZone.runOutsideAngular(() => {
      this.accessTokenTimeoutSubscription = of(new OAuthInfoEvent("token_expires", "access_token")).pipe(delay(timeout2)).subscribe((e) => {
        this.ngZone.run(() => {
          this.eventsSubject.next(e);
        });
      });
    });
  }
  setupIdTokenTimer() {
    const expiration = this.getIdTokenExpiration();
    const storedAt = this.getIdTokenStoredAt();
    const timeout2 = this.calcTimeout(storedAt, expiration);
    this.ngZone.runOutsideAngular(() => {
      this.idTokenTimeoutSubscription = of(new OAuthInfoEvent("token_expires", "id_token")).pipe(delay(timeout2)).subscribe((e) => {
        this.ngZone.run(() => {
          this.eventsSubject.next(e);
        });
      });
    });
  }
  /**
   * Stops timers for automatic refresh.
   * To restart it, call setupAutomaticSilentRefresh again.
   */
  stopAutomaticRefresh() {
    this.clearAccessTokenTimer();
    this.clearIdTokenTimer();
    this.clearAutomaticRefreshTimer();
  }
  clearAccessTokenTimer() {
    if (this.accessTokenTimeoutSubscription) {
      this.accessTokenTimeoutSubscription.unsubscribe();
    }
  }
  clearIdTokenTimer() {
    if (this.idTokenTimeoutSubscription) {
      this.idTokenTimeoutSubscription.unsubscribe();
    }
  }
  clearAutomaticRefreshTimer() {
    if (this.automaticRefreshSubscription) {
      this.automaticRefreshSubscription.unsubscribe();
    }
  }
  calcTimeout(storedAt, expiration) {
    const now = this.dateTimeService.now();
    const delta = (expiration - storedAt) * this.timeoutFactor - (now - storedAt);
    const duration = Math.max(0, delta);
    const maxTimeoutValue = 2147483647;
    return duration > maxTimeoutValue ? maxTimeoutValue : duration;
  }
  /**
   * DEPRECATED. Use a provider for OAuthStorage instead:
   *
   * { provide: OAuthStorage, useFactory: oAuthStorageFactory }
   * export function oAuthStorageFactory(): OAuthStorage { return localStorage; }
   * Sets a custom storage used to store the received
   * tokens on client side. By default, the browser's
   * sessionStorage is used.
   * @ignore
   *
   * @param storage
   */
  setStorage(storage) {
    this._storage = storage;
    this.configChanged();
  }
  /**
   * Loads the discovery document to configure most
   * properties of this service. The url of the discovery
   * document is infered from the issuer's url according
   * to the OpenId Connect spec. To use another url you
   * can pass it to to optional parameter fullUrl.
   *
   * @param fullUrl
   */
  loadDiscoveryDocument(fullUrl = null) {
    return new Promise((resolve, reject) => {
      if (!fullUrl) {
        fullUrl = this.issuer || "";
        if (!fullUrl.endsWith("/")) {
          fullUrl += "/";
        }
        fullUrl += ".well-known/openid-configuration";
      }
      if (!this.validateUrlForHttps(fullUrl)) {
        reject("issuer  must use HTTPS (with TLS), or config value for property 'requireHttps' must be set to 'false' and allow HTTP (without TLS).");
        return;
      }
      this.http.get(fullUrl).subscribe((doc) => {
        if (!this.validateDiscoveryDocument(doc)) {
          this.eventsSubject.next(new OAuthErrorEvent("discovery_document_validation_error", null));
          reject("discovery_document_validation_error");
          return;
        }
        this.loginUrl = doc.authorization_endpoint;
        this.logoutUrl = doc.end_session_endpoint || this.logoutUrl;
        this.grantTypesSupported = doc.grant_types_supported;
        this.issuer = doc.issuer;
        this.tokenEndpoint = doc.token_endpoint;
        this.userinfoEndpoint = doc.userinfo_endpoint || this.userinfoEndpoint;
        this.jwksUri = doc.jwks_uri;
        this.sessionCheckIFrameUrl = doc.check_session_iframe || this.sessionCheckIFrameUrl;
        this.discoveryDocumentLoaded = true;
        this.discoveryDocumentLoadedSubject.next(doc);
        this.revocationEndpoint = doc.revocation_endpoint || this.revocationEndpoint;
        if (this.sessionChecksEnabled) {
          this.restartSessionChecksIfStillLoggedIn();
        }
        this.loadJwks().then((jwks) => {
          const result = {
            discoveryDocument: doc,
            jwks
          };
          const event = new OAuthSuccessEvent("discovery_document_loaded", result);
          this.eventsSubject.next(event);
          resolve(event);
          return;
        }).catch((err2) => {
          this.eventsSubject.next(new OAuthErrorEvent("discovery_document_load_error", err2));
          reject(err2);
          return;
        });
      }, (err2) => {
        this.logger.error("error loading discovery document", err2);
        this.eventsSubject.next(new OAuthErrorEvent("discovery_document_load_error", err2));
        reject(err2);
      });
    });
  }
  loadJwks() {
    return new Promise((resolve, reject) => {
      if (this.jwksUri) {
        this.http.get(this.jwksUri).subscribe((jwks) => {
          this.jwks = jwks;
          resolve(jwks);
        }, (err2) => {
          this.logger.error("error loading jwks", err2);
          this.eventsSubject.next(new OAuthErrorEvent("jwks_load_error", err2));
          reject(err2);
        });
      } else {
        resolve(null);
      }
    });
  }
  validateDiscoveryDocument(doc) {
    let errors;
    if (!this.skipIssuerCheck && doc.issuer !== this.issuer) {
      this.logger.error("invalid issuer in discovery document", "expected: " + this.issuer, "current: " + doc.issuer);
      return false;
    }
    errors = this.validateUrlFromDiscoveryDocument(doc.authorization_endpoint);
    if (errors.length > 0) {
      this.logger.error("error validating authorization_endpoint in discovery document", errors);
      return false;
    }
    errors = this.validateUrlFromDiscoveryDocument(doc.end_session_endpoint);
    if (errors.length > 0) {
      this.logger.error("error validating end_session_endpoint in discovery document", errors);
      return false;
    }
    errors = this.validateUrlFromDiscoveryDocument(doc.token_endpoint);
    if (errors.length > 0) {
      this.logger.error("error validating token_endpoint in discovery document", errors);
    }
    errors = this.validateUrlFromDiscoveryDocument(doc.revocation_endpoint);
    if (errors.length > 0) {
      this.logger.error("error validating revocation_endpoint in discovery document", errors);
    }
    errors = this.validateUrlFromDiscoveryDocument(doc.userinfo_endpoint);
    if (errors.length > 0) {
      this.logger.error("error validating userinfo_endpoint in discovery document", errors);
      return false;
    }
    errors = this.validateUrlFromDiscoveryDocument(doc.jwks_uri);
    if (errors.length > 0) {
      this.logger.error("error validating jwks_uri in discovery document", errors);
      return false;
    }
    if (this.sessionChecksEnabled && !doc.check_session_iframe) {
      this.logger.warn("sessionChecksEnabled is activated but discovery document does not contain a check_session_iframe field");
    }
    return true;
  }
  /**
   * Uses password flow to exchange userName and password for an
   * access_token. After receiving the access_token, this method
   * uses it to query the userinfo endpoint in order to get information
   * about the user in question.
   *
   * When using this, make sure that the property oidc is set to false.
   * Otherwise stricter validations take place that make this operation
   * fail.
   *
   * @param userName
   * @param password
   * @param headers Optional additional http-headers.
   */
  fetchTokenUsingPasswordFlowAndLoadUserProfile(userName, password, headers = new HttpHeaders()) {
    return this.fetchTokenUsingPasswordFlow(userName, password, headers).then(() => this.loadUserProfile());
  }
  /**
   * Loads the user profile by accessing the user info endpoint defined by OpenId Connect.
   *
   * When using this with OAuth2 password flow, make sure that the property oidc is set to false.
   * Otherwise stricter validations take place that make this operation fail.
   */
  loadUserProfile() {
    if (!this.hasValidAccessToken()) {
      throw new Error("Can not load User Profile without access_token");
    }
    if (!this.validateUrlForHttps(this.userinfoEndpoint)) {
      throw new Error("userinfoEndpoint must use HTTPS (with TLS), or config value for property 'requireHttps' must be set to 'false' and allow HTTP (without TLS).");
    }
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders().set("Authorization", "Bearer " + this.getAccessToken());
      this.http.get(this.userinfoEndpoint, {
        headers,
        observe: "response",
        responseType: "text"
      }).subscribe((response) => {
        this.debug("userinfo received", JSON.stringify(response));
        if (response.headers.get("content-type").startsWith("application/json")) {
          let info = JSON.parse(response.body);
          const existingClaims = this.getIdentityClaims() || {};
          if (!this.skipSubjectCheck) {
            if (this.oidc && (!existingClaims["sub"] || info.sub !== existingClaims["sub"])) {
              const err2 = "if property oidc is true, the received user-id (sub) has to be the user-id of the user that has logged in with oidc.\nif you are not using oidc but just oauth2 password flow set oidc to false";
              reject(err2);
              return;
            }
          }
          info = Object.assign({}, existingClaims, info);
          this._storage.setItem("id_token_claims_obj", JSON.stringify(info));
          this.eventsSubject.next(new OAuthSuccessEvent("user_profile_loaded"));
          resolve({
            info
          });
        } else {
          this.debug("userinfo is not JSON, treating it as JWE/JWS");
          this.eventsSubject.next(new OAuthSuccessEvent("user_profile_loaded"));
          resolve(JSON.parse(response.body));
        }
      }, (err2) => {
        this.logger.error("error loading user info", err2);
        this.eventsSubject.next(new OAuthErrorEvent("user_profile_load_error", err2));
        reject(err2);
      });
    });
  }
  /**
   * Uses password flow to exchange userName and password for an access_token.
   * @param userName
   * @param password
   * @param headers Optional additional http-headers.
   */
  fetchTokenUsingPasswordFlow(userName, password, headers = new HttpHeaders()) {
    const parameters = {
      username: userName,
      password
    };
    return this.fetchTokenUsingGrant("password", parameters, headers);
  }
  /**
   * Uses a custom grant type to retrieve tokens.
   * @param grantType Grant type.
   * @param parameters Parameters to pass.
   * @param headers Optional additional HTTP headers.
   */
  fetchTokenUsingGrant(grantType, parameters, headers = new HttpHeaders()) {
    this.assertUrlNotNullAndCorrectProtocol(this.tokenEndpoint, "tokenEndpoint");
    let params = new HttpParams({
      encoder: new WebHttpUrlEncodingCodec()
    }).set("grant_type", grantType).set("scope", this.scope);
    if (this.useHttpBasicAuth) {
      const header = btoa(`${this.clientId}:${this.dummyClientSecret}`);
      headers = headers.set("Authorization", "Basic " + header);
    }
    if (!this.useHttpBasicAuth) {
      params = params.set("client_id", this.clientId);
    }
    if (!this.useHttpBasicAuth && this.dummyClientSecret) {
      params = params.set("client_secret", this.dummyClientSecret);
    }
    if (this.customQueryParams) {
      for (const key of Object.getOwnPropertyNames(this.customQueryParams)) {
        params = params.set(key, this.customQueryParams[key]);
      }
    }
    for (const key of Object.keys(parameters)) {
      params = params.set(key, parameters[key]);
    }
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");
    return new Promise((resolve, reject) => {
      this.http.post(this.tokenEndpoint, params, {
        headers
      }).subscribe((tokenResponse) => {
        this.debug("tokenResponse", tokenResponse);
        this.storeAccessTokenResponse(tokenResponse.access_token, tokenResponse.refresh_token, tokenResponse.expires_in || this.fallbackAccessTokenExpirationTimeInSec, tokenResponse.scope, this.extractRecognizedCustomParameters(tokenResponse));
        if (this.oidc && tokenResponse.id_token) {
          this.processIdToken(tokenResponse.id_token, tokenResponse.access_token).then((result) => {
            this.storeIdToken(result);
            resolve(tokenResponse);
          });
        }
        this.eventsSubject.next(new OAuthSuccessEvent("token_received"));
        resolve(tokenResponse);
      }, (err2) => {
        this.logger.error("Error performing ${grantType} flow", err2);
        this.eventsSubject.next(new OAuthErrorEvent("token_error", err2));
        reject(err2);
      });
    });
  }
  /**
   * Refreshes the token using a refresh_token.
   * This does not work for implicit flow, b/c
   * there is no refresh_token in this flow.
   * A solution for this is provided by the
   * method silentRefresh.
   */
  refreshToken() {
    this.assertUrlNotNullAndCorrectProtocol(this.tokenEndpoint, "tokenEndpoint");
    return new Promise((resolve, reject) => {
      let params = new HttpParams({
        encoder: new WebHttpUrlEncodingCodec()
      }).set("grant_type", "refresh_token").set("scope", this.scope).set("refresh_token", this._storage.getItem("refresh_token"));
      let headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
      if (this.useHttpBasicAuth) {
        const header = btoa(`${this.clientId}:${this.dummyClientSecret}`);
        headers = headers.set("Authorization", "Basic " + header);
      }
      if (!this.useHttpBasicAuth) {
        params = params.set("client_id", this.clientId);
      }
      if (!this.useHttpBasicAuth && this.dummyClientSecret) {
        params = params.set("client_secret", this.dummyClientSecret);
      }
      if (this.customQueryParams) {
        for (const key of Object.getOwnPropertyNames(this.customQueryParams)) {
          params = params.set(key, this.customQueryParams[key]);
        }
      }
      this.http.post(this.tokenEndpoint, params, {
        headers
      }).pipe(switchMap((tokenResponse) => {
        if (this.oidc && tokenResponse.id_token) {
          return from(this.processIdToken(tokenResponse.id_token, tokenResponse.access_token, true)).pipe(tap((result) => this.storeIdToken(result)), map(() => tokenResponse));
        } else {
          return of(tokenResponse);
        }
      })).subscribe((tokenResponse) => {
        this.debug("refresh tokenResponse", tokenResponse);
        this.storeAccessTokenResponse(tokenResponse.access_token, tokenResponse.refresh_token, tokenResponse.expires_in || this.fallbackAccessTokenExpirationTimeInSec, tokenResponse.scope, this.extractRecognizedCustomParameters(tokenResponse));
        this.eventsSubject.next(new OAuthSuccessEvent("token_received"));
        this.eventsSubject.next(new OAuthSuccessEvent("token_refreshed"));
        resolve(tokenResponse);
      }, (err2) => {
        this.logger.error("Error refreshing token", err2);
        this.eventsSubject.next(new OAuthErrorEvent("token_refresh_error", err2));
        reject(err2);
      });
    });
  }
  removeSilentRefreshEventListener() {
    if (this.silentRefreshPostMessageEventListener) {
      window.removeEventListener("message", this.silentRefreshPostMessageEventListener);
      this.silentRefreshPostMessageEventListener = null;
    }
  }
  setupSilentRefreshEventListener() {
    this.removeSilentRefreshEventListener();
    this.silentRefreshPostMessageEventListener = (e) => {
      const message = this.processMessageEventMessage(e);
      if (this.checkOrigin && e.origin !== location.origin) {
        console.error("wrong origin requested silent refresh!");
      }
      this.tryLogin({
        customHashFragment: message,
        preventClearHashAfterLogin: true,
        customRedirectUri: this.silentRefreshRedirectUri || this.redirectUri
      }).catch((err2) => this.debug("tryLogin during silent refresh failed", err2));
    };
    window.addEventListener("message", this.silentRefreshPostMessageEventListener);
  }
  /**
   * Performs a silent refresh for implicit flow.
   * Use this method to get new tokens when/before
   * the existing tokens expire.
   */
  silentRefresh(params = {}, noPrompt = true) {
    const claims = this.getIdentityClaims() || {};
    if (this.useIdTokenHintForSilentRefresh && this.hasValidIdToken()) {
      params["id_token_hint"] = this.getIdToken();
    }
    if (!this.validateUrlForHttps(this.loginUrl)) {
      throw new Error("loginUrl  must use HTTPS (with TLS), or config value for property 'requireHttps' must be set to 'false' and allow HTTP (without TLS).");
    }
    if (typeof this.document === "undefined") {
      throw new Error("silent refresh is not supported on this platform");
    }
    const existingIframe = this.document.getElementById(this.silentRefreshIFrameName);
    if (existingIframe) {
      this.document.body.removeChild(existingIframe);
    }
    this.silentRefreshSubject = claims["sub"];
    const iframe = this.document.createElement("iframe");
    iframe.id = this.silentRefreshIFrameName;
    this.setupSilentRefreshEventListener();
    const redirectUri = this.silentRefreshRedirectUri || this.redirectUri;
    this.createLoginUrl(null, null, redirectUri, noPrompt, params).then((url) => {
      iframe.setAttribute("src", url);
      if (!this.silentRefreshShowIFrame) {
        iframe.style["display"] = "none";
      }
      this.document.body.appendChild(iframe);
    });
    const errors = this.events.pipe(filter((e) => e instanceof OAuthErrorEvent), first());
    const success = this.events.pipe(filter((e) => e.type === "token_received"), first());
    const timeout2 = of(new OAuthErrorEvent("silent_refresh_timeout", null)).pipe(delay(this.silentRefreshTimeout));
    return race([errors, success, timeout2]).pipe(map((e) => {
      if (e instanceof OAuthErrorEvent) {
        if (e.type === "silent_refresh_timeout") {
          this.eventsSubject.next(e);
        } else {
          e = new OAuthErrorEvent("silent_refresh_error", e);
          this.eventsSubject.next(e);
        }
        throw e;
      } else if (e.type === "token_received") {
        e = new OAuthSuccessEvent("silently_refreshed");
        this.eventsSubject.next(e);
      }
      return e;
    })).toPromise();
  }
  /**
   * This method exists for backwards compatibility.
   * {@link OAuthService#initLoginFlowInPopup} handles both code
   * and implicit flows.
   */
  initImplicitFlowInPopup(options) {
    return this.initLoginFlowInPopup(options);
  }
  initLoginFlowInPopup(options) {
    options = options || {};
    return this.createLoginUrl(null, null, this.silentRefreshRedirectUri, false, {
      display: "popup"
    }).then((url) => {
      return new Promise((resolve, reject) => {
        const checkForPopupClosedInterval = 500;
        let windowRef = null;
        if (!options.windowRef) {
          windowRef = window.open(url, "ngx-oauth2-oidc-login", this.calculatePopupFeatures(options));
        } else if (options.windowRef && !options.windowRef.closed) {
          windowRef = options.windowRef;
          windowRef.location.href = url;
        }
        let checkForPopupClosedTimer;
        const tryLogin = (hash2) => {
          this.tryLogin({
            customHashFragment: hash2,
            preventClearHashAfterLogin: true,
            customRedirectUri: this.silentRefreshRedirectUri
          }).then(() => {
            cleanup();
            resolve(true);
          }, (err2) => {
            cleanup();
            reject(err2);
          });
        };
        const checkForPopupClosed = () => {
          if (!windowRef || windowRef.closed) {
            cleanup();
            reject(new OAuthErrorEvent("popup_closed", {}));
          }
        };
        if (!windowRef) {
          reject(new OAuthErrorEvent("popup_blocked", {}));
        } else {
          checkForPopupClosedTimer = window.setInterval(checkForPopupClosed, checkForPopupClosedInterval);
        }
        const cleanup = () => {
          window.clearInterval(checkForPopupClosedTimer);
          window.removeEventListener("storage", storageListener);
          window.removeEventListener("message", listener);
          if (windowRef !== null) {
            windowRef.close();
          }
          windowRef = null;
        };
        const listener = (e) => {
          const message = this.processMessageEventMessage(e);
          if (message && message !== null) {
            window.removeEventListener("storage", storageListener);
            tryLogin(message);
          } else {
            console.log("false event firing");
          }
        };
        const storageListener = (event) => {
          if (event.key === "auth_hash") {
            window.removeEventListener("message", listener);
            tryLogin(event.newValue);
          }
        };
        window.addEventListener("message", listener);
        window.addEventListener("storage", storageListener);
      });
    });
  }
  calculatePopupFeatures(options) {
    const height = options.height || 470;
    const width = options.width || 500;
    const left = window.screenLeft + (window.outerWidth - width) / 2;
    const top = window.screenTop + (window.outerHeight - height) / 2;
    return `location=no,toolbar=no,width=${width},height=${height},top=${top},left=${left}`;
  }
  processMessageEventMessage(e) {
    let expectedPrefix = "#";
    if (this.silentRefreshMessagePrefix) {
      expectedPrefix += this.silentRefreshMessagePrefix;
    }
    if (!e || !e.data || typeof e.data !== "string") {
      return;
    }
    const prefixedMessage = e.data;
    if (!prefixedMessage.startsWith(expectedPrefix)) {
      return;
    }
    return "#" + prefixedMessage.substr(expectedPrefix.length);
  }
  canPerformSessionCheck() {
    if (!this.sessionChecksEnabled) {
      return false;
    }
    if (!this.sessionCheckIFrameUrl) {
      console.warn("sessionChecksEnabled is activated but there is no sessionCheckIFrameUrl");
      return false;
    }
    const sessionState = this.getSessionState();
    if (!sessionState) {
      console.warn("sessionChecksEnabled is activated but there is no session_state");
      return false;
    }
    if (typeof this.document === "undefined") {
      return false;
    }
    return true;
  }
  setupSessionCheckEventListener() {
    this.removeSessionCheckEventListener();
    this.sessionCheckEventListener = (e) => {
      const origin = e.origin.toLowerCase();
      const issuer = this.issuer.toLowerCase();
      this.debug("sessionCheckEventListener");
      if (!issuer.startsWith(origin)) {
        this.debug("sessionCheckEventListener", "wrong origin", origin, "expected", issuer, "event", e);
        return;
      }
      switch (e.data) {
        case "unchanged":
          this.ngZone.run(() => {
            this.handleSessionUnchanged();
          });
          break;
        case "changed":
          this.ngZone.run(() => {
            this.handleSessionChange();
          });
          break;
        case "error":
          this.ngZone.run(() => {
            this.handleSessionError();
          });
          break;
      }
      this.debug("got info from session check inframe", e);
    };
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener("message", this.sessionCheckEventListener);
    });
  }
  handleSessionUnchanged() {
    this.debug("session check", "session unchanged");
    this.eventsSubject.next(new OAuthInfoEvent("session_unchanged"));
  }
  handleSessionChange() {
    this.eventsSubject.next(new OAuthInfoEvent("session_changed"));
    this.stopSessionCheckTimer();
    if (!this.useSilentRefresh && this.responseType === "code") {
      this.refreshToken().then(() => {
        this.debug("token refresh after session change worked");
      }).catch(() => {
        this.debug("token refresh did not work after session changed");
        this.eventsSubject.next(new OAuthInfoEvent("session_terminated"));
        this.logOut(true);
      });
    } else if (this.silentRefreshRedirectUri) {
      this.silentRefresh().catch(() => this.debug("silent refresh failed after session changed"));
      this.waitForSilentRefreshAfterSessionChange();
    } else {
      this.eventsSubject.next(new OAuthInfoEvent("session_terminated"));
      this.logOut(true);
    }
  }
  waitForSilentRefreshAfterSessionChange() {
    this.events.pipe(filter((e) => e.type === "silently_refreshed" || e.type === "silent_refresh_timeout" || e.type === "silent_refresh_error"), first()).subscribe((e) => {
      if (e.type !== "silently_refreshed") {
        this.debug("silent refresh did not work after session changed");
        this.eventsSubject.next(new OAuthInfoEvent("session_terminated"));
        this.logOut(true);
      }
    });
  }
  handleSessionError() {
    this.stopSessionCheckTimer();
    this.eventsSubject.next(new OAuthInfoEvent("session_error"));
  }
  removeSessionCheckEventListener() {
    if (this.sessionCheckEventListener) {
      window.removeEventListener("message", this.sessionCheckEventListener);
      this.sessionCheckEventListener = null;
    }
  }
  initSessionCheck() {
    if (!this.canPerformSessionCheck()) {
      return;
    }
    const existingIframe = this.document.getElementById(this.sessionCheckIFrameName);
    if (existingIframe) {
      this.document.body.removeChild(existingIframe);
    }
    const iframe = this.document.createElement("iframe");
    iframe.id = this.sessionCheckIFrameName;
    this.setupSessionCheckEventListener();
    const url = this.sessionCheckIFrameUrl;
    iframe.setAttribute("src", url);
    iframe.style.display = "none";
    this.document.body.appendChild(iframe);
    this.startSessionCheckTimer();
  }
  startSessionCheckTimer() {
    this.stopSessionCheckTimer();
    this.ngZone.runOutsideAngular(() => {
      this.sessionCheckTimer = setInterval(this.checkSession.bind(this), this.sessionCheckIntervall);
    });
  }
  stopSessionCheckTimer() {
    if (this.sessionCheckTimer) {
      clearInterval(this.sessionCheckTimer);
      this.sessionCheckTimer = null;
    }
  }
  checkSession() {
    const iframe = this.document.getElementById(this.sessionCheckIFrameName);
    if (!iframe) {
      this.logger.warn("checkSession did not find iframe", this.sessionCheckIFrameName);
    }
    const sessionState = this.getSessionState();
    if (!sessionState) {
      this.stopSessionCheckTimer();
    }
    const message = this.clientId + " " + sessionState;
    iframe.contentWindow.postMessage(message, this.issuer);
  }
  createLoginUrl() {
    return __async(this, arguments, function* (state = "", loginHint = "", customRedirectUri = "", noPrompt = false, params = {}) {
      const that = this;
      let redirectUri;
      if (customRedirectUri) {
        redirectUri = customRedirectUri;
      } else {
        redirectUri = this.redirectUri;
      }
      const nonce = yield this.createAndSaveNonce();
      if (state) {
        state = nonce + this.config.nonceStateSeparator + encodeURIComponent(state);
      } else {
        state = nonce;
      }
      if (!this.requestAccessToken && !this.oidc) {
        throw new Error("Either requestAccessToken or oidc or both must be true");
      }
      if (this.config.responseType) {
        this.responseType = this.config.responseType;
      } else {
        if (this.oidc && this.requestAccessToken) {
          this.responseType = "id_token token";
        } else if (this.oidc && !this.requestAccessToken) {
          this.responseType = "id_token";
        } else {
          this.responseType = "token";
        }
      }
      const seperationChar = that.loginUrl.indexOf("?") > -1 ? "&" : "?";
      let scope = that.scope;
      if (this.oidc && !scope.match(/(^|\s)openid($|\s)/)) {
        scope = "openid " + scope;
      }
      let url = that.loginUrl + seperationChar + "response_type=" + encodeURIComponent(that.responseType) + "&client_id=" + encodeURIComponent(that.clientId) + "&state=" + encodeURIComponent(state) + "&redirect_uri=" + encodeURIComponent(redirectUri) + "&scope=" + encodeURIComponent(scope);
      if (this.responseType.includes("code") && !this.disablePKCE) {
        const [challenge, verifier] = yield this.createChallangeVerifierPairForPKCE();
        if (this.saveNoncesInLocalStorage && typeof window["localStorage"] !== "undefined") {
          localStorage.setItem("PKCE_verifier", verifier);
        } else {
          this._storage.setItem("PKCE_verifier", verifier);
        }
        url += "&code_challenge=" + challenge;
        url += "&code_challenge_method=S256";
      }
      if (loginHint) {
        url += "&login_hint=" + encodeURIComponent(loginHint);
      }
      if (that.resource) {
        url += "&resource=" + encodeURIComponent(that.resource);
      }
      if (that.oidc) {
        url += "&nonce=" + encodeURIComponent(nonce);
      }
      if (noPrompt) {
        url += "&prompt=none";
      }
      for (const key of Object.keys(params)) {
        url += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      }
      if (this.customQueryParams) {
        for (const key of Object.getOwnPropertyNames(this.customQueryParams)) {
          url += "&" + key + "=" + encodeURIComponent(this.customQueryParams[key]);
        }
      }
      return url;
    });
  }
  initImplicitFlowInternal(additionalState = "", params = "") {
    if (this.inImplicitFlow) {
      return;
    }
    this.inImplicitFlow = true;
    if (!this.validateUrlForHttps(this.loginUrl)) {
      throw new Error("loginUrl  must use HTTPS (with TLS), or config value for property 'requireHttps' must be set to 'false' and allow HTTP (without TLS).");
    }
    let addParams = {};
    let loginHint = null;
    if (typeof params === "string") {
      loginHint = params;
    } else if (typeof params === "object") {
      addParams = params;
    }
    this.createLoginUrl(additionalState, loginHint, null, false, addParams).then(this.config.openUri).catch((error) => {
      console.error("Error in initImplicitFlow", error);
      this.inImplicitFlow = false;
    });
  }
  /**
   * Starts the implicit flow and redirects to user to
   * the auth servers' login url.
   *
   * @param additionalState Optional state that is passed around.
   *  You'll find this state in the property `state` after `tryLogin` logged in the user.
   * @param params Hash with additional parameter. If it is a string, it is used for the
   *               parameter loginHint (for the sake of compatibility with former versions)
   */
  initImplicitFlow(additionalState = "", params = "") {
    if (this.loginUrl !== "") {
      this.initImplicitFlowInternal(additionalState, params);
    } else {
      this.events.pipe(filter((e) => e.type === "discovery_document_loaded")).subscribe(() => this.initImplicitFlowInternal(additionalState, params));
    }
  }
  /**
   * Reset current implicit flow
   *
   * @description This method allows resetting the current implict flow in order to be initialized again.
   */
  resetImplicitFlow() {
    this.inImplicitFlow = false;
  }
  callOnTokenReceivedIfExists(options) {
    const that = this;
    if (options.onTokenReceived) {
      const tokenParams = {
        idClaims: that.getIdentityClaims(),
        idToken: that.getIdToken(),
        accessToken: that.getAccessToken(),
        state: that.state
      };
      options.onTokenReceived(tokenParams);
    }
  }
  storeAccessTokenResponse(accessToken, refreshToken, expiresIn, grantedScopes, customParameters) {
    this._storage.setItem("access_token", accessToken);
    if (grantedScopes && !Array.isArray(grantedScopes)) {
      this._storage.setItem("granted_scopes", JSON.stringify(grantedScopes.split(" ")));
    } else if (grantedScopes && Array.isArray(grantedScopes)) {
      this._storage.setItem("granted_scopes", JSON.stringify(grantedScopes));
    }
    this._storage.setItem("access_token_stored_at", "" + this.dateTimeService.now());
    if (expiresIn) {
      const expiresInMilliSeconds = expiresIn * 1e3;
      const now = this.dateTimeService.new();
      const expiresAt = now.getTime() + expiresInMilliSeconds;
      this._storage.setItem("expires_at", "" + expiresAt);
    }
    if (refreshToken) {
      this._storage.setItem("refresh_token", refreshToken);
    }
    if (customParameters) {
      customParameters.forEach((value, key) => {
        this._storage.setItem(key, value);
      });
    }
  }
  /**
   * Delegates to tryLoginImplicitFlow for the sake of competability
   * @param options Optional options.
   */
  tryLogin(options = null) {
    if (this.config.responseType === "code") {
      return this.tryLoginCodeFlow(options).then(() => true);
    } else {
      return this.tryLoginImplicitFlow(options);
    }
  }
  parseQueryString(queryString) {
    if (!queryString || queryString.length === 0) {
      return {};
    }
    if (queryString.charAt(0) === "?") {
      queryString = queryString.substr(1);
    }
    return this.urlHelper.parseQueryString(queryString);
  }
  tryLoginCodeFlow(options = null) {
    return __async(this, null, function* () {
      options = options || {};
      const querySource = options.customHashFragment ? options.customHashFragment.substring(1) : window.location.search;
      const parts = this.getCodePartsFromUrl(querySource);
      const code = parts["code"];
      const state = parts["state"];
      const sessionState = parts["session_state"];
      if (!options.preventClearHashAfterLogin) {
        const href = location.origin + location.pathname + location.search.replace(/code=[^&$]*/, "").replace(/scope=[^&$]*/, "").replace(/state=[^&$]*/, "").replace(/session_state=[^&$]*/, "").replace(/^\?&/, "?").replace(/&$/, "").replace(/^\?$/, "").replace(/&+/g, "&").replace(/\?&/, "?").replace(/\?$/, "") + location.hash;
        history.replaceState(null, window.name, href);
      }
      const [nonceInState, userState] = this.parseState(state);
      this.state = userState;
      if (parts["error"]) {
        this.debug("error trying to login");
        this.handleLoginError(options, parts);
        const err2 = new OAuthErrorEvent("code_error", {}, parts);
        this.eventsSubject.next(err2);
        return Promise.reject(err2);
      }
      if (!options.disableNonceCheck) {
        if (!nonceInState) {
          this.saveRequestedRoute();
          return Promise.resolve();
        }
        if (!options.disableOAuth2StateCheck) {
          const success = this.validateNonce(nonceInState);
          if (!success) {
            const event = new OAuthErrorEvent("invalid_nonce_in_state", null);
            this.eventsSubject.next(event);
            return Promise.reject(event);
          }
        }
      }
      this.storeSessionState(sessionState);
      if (code) {
        yield this.getTokenFromCode(code, options);
        this.restoreRequestedRoute();
        return Promise.resolve();
      } else {
        return Promise.resolve();
      }
    });
  }
  saveRequestedRoute() {
    if (this.config.preserveRequestedRoute) {
      this._storage.setItem("requested_route", window.location.pathname + window.location.search);
    }
  }
  restoreRequestedRoute() {
    const requestedRoute = this._storage.getItem("requested_route");
    if (requestedRoute) {
      history.replaceState(null, "", window.location.origin + requestedRoute);
    }
  }
  /**
   * Retrieve the returned auth code from the redirect uri that has been called.
   * If required also check hash, as we could use hash location strategy.
   */
  getCodePartsFromUrl(queryString) {
    if (!queryString || queryString.length === 0) {
      return this.urlHelper.getHashFragmentParams();
    }
    if (queryString.charAt(0) === "?") {
      queryString = queryString.substr(1);
    }
    return this.urlHelper.parseQueryString(queryString);
  }
  /**
   * Get token using an intermediate code. Works for the Authorization Code flow.
   */
  getTokenFromCode(code, options) {
    let params = new HttpParams({
      encoder: new WebHttpUrlEncodingCodec()
    }).set("grant_type", "authorization_code").set("code", code).set("redirect_uri", options.customRedirectUri || this.redirectUri);
    if (!this.disablePKCE) {
      let PKCEVerifier;
      if (this.saveNoncesInLocalStorage && typeof window["localStorage"] !== "undefined") {
        PKCEVerifier = localStorage.getItem("PKCE_verifier");
      } else {
        PKCEVerifier = this._storage.getItem("PKCE_verifier");
      }
      if (!PKCEVerifier) {
        console.warn("No PKCE verifier found in oauth storage!");
      } else {
        params = params.set("code_verifier", PKCEVerifier);
      }
    }
    return this.fetchAndProcessToken(params, options);
  }
  fetchAndProcessToken(params, options) {
    options = options || {};
    this.assertUrlNotNullAndCorrectProtocol(this.tokenEndpoint, "tokenEndpoint");
    let headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
    if (this.useHttpBasicAuth) {
      const header = btoa(`${this.clientId}:${this.dummyClientSecret}`);
      headers = headers.set("Authorization", "Basic " + header);
    }
    if (!this.useHttpBasicAuth) {
      params = params.set("client_id", this.clientId);
    }
    if (!this.useHttpBasicAuth && this.dummyClientSecret) {
      params = params.set("client_secret", this.dummyClientSecret);
    }
    return new Promise((resolve, reject) => {
      if (this.customQueryParams) {
        for (const key of Object.getOwnPropertyNames(this.customQueryParams)) {
          params = params.set(key, this.customQueryParams[key]);
        }
      }
      this.http.post(this.tokenEndpoint, params, {
        headers
      }).subscribe((tokenResponse) => {
        this.debug("refresh tokenResponse", tokenResponse);
        this.storeAccessTokenResponse(tokenResponse.access_token, tokenResponse.refresh_token, tokenResponse.expires_in || this.fallbackAccessTokenExpirationTimeInSec, tokenResponse.scope, this.extractRecognizedCustomParameters(tokenResponse));
        if (this.oidc && tokenResponse.id_token) {
          this.processIdToken(tokenResponse.id_token, tokenResponse.access_token, options.disableNonceCheck).then((result) => {
            this.storeIdToken(result);
            this.eventsSubject.next(new OAuthSuccessEvent("token_received"));
            this.eventsSubject.next(new OAuthSuccessEvent("token_refreshed"));
            resolve(tokenResponse);
          }).catch((reason) => {
            this.eventsSubject.next(new OAuthErrorEvent("token_validation_error", reason));
            console.error("Error validating tokens");
            console.error(reason);
            reject(reason);
          });
        } else {
          this.eventsSubject.next(new OAuthSuccessEvent("token_received"));
          this.eventsSubject.next(new OAuthSuccessEvent("token_refreshed"));
          resolve(tokenResponse);
        }
      }, (err2) => {
        console.error("Error getting token", err2);
        this.eventsSubject.next(new OAuthErrorEvent("token_refresh_error", err2));
        reject(err2);
      });
    });
  }
  /**
   * Checks whether there are tokens in the hash fragment
   * as a result of the implicit flow. These tokens are
   * parsed, validated and used to sign the user in to the
   * current client.
   *
   * @param options Optional options.
   */
  tryLoginImplicitFlow(options = null) {
    options = options || {};
    let parts;
    if (options.customHashFragment) {
      parts = this.urlHelper.getHashFragmentParams(options.customHashFragment);
    } else {
      parts = this.urlHelper.getHashFragmentParams();
    }
    this.debug("parsed url", parts);
    const state = parts["state"];
    const [nonceInState, userState] = this.parseState(state);
    this.state = userState;
    if (parts["error"]) {
      this.debug("error trying to login");
      this.handleLoginError(options, parts);
      const err2 = new OAuthErrorEvent("token_error", {}, parts);
      this.eventsSubject.next(err2);
      return Promise.reject(err2);
    }
    const accessToken = parts["access_token"];
    const idToken = parts["id_token"];
    const sessionState = parts["session_state"];
    const grantedScopes = parts["scope"];
    if (!this.requestAccessToken && !this.oidc) {
      return Promise.reject("Either requestAccessToken or oidc (or both) must be true.");
    }
    if (this.requestAccessToken && !accessToken) {
      return Promise.resolve(false);
    }
    if (this.requestAccessToken && !options.disableOAuth2StateCheck && !state) {
      return Promise.resolve(false);
    }
    if (this.oidc && !idToken) {
      return Promise.resolve(false);
    }
    if (this.sessionChecksEnabled && !sessionState) {
      this.logger.warn("session checks (Session Status Change Notification) were activated in the configuration but the id_token does not contain a session_state claim");
    }
    if (this.requestAccessToken && !options.disableNonceCheck) {
      const success = this.validateNonce(nonceInState);
      if (!success) {
        const event = new OAuthErrorEvent("invalid_nonce_in_state", null);
        this.eventsSubject.next(event);
        return Promise.reject(event);
      }
    }
    if (this.requestAccessToken) {
      this.storeAccessTokenResponse(accessToken, null, parts["expires_in"] || this.fallbackAccessTokenExpirationTimeInSec, grantedScopes);
    }
    if (!this.oidc) {
      this.eventsSubject.next(new OAuthSuccessEvent("token_received"));
      if (this.clearHashAfterLogin && !options.preventClearHashAfterLogin) {
        this.clearLocationHash();
      }
      this.callOnTokenReceivedIfExists(options);
      return Promise.resolve(true);
    }
    return this.processIdToken(idToken, accessToken, options.disableNonceCheck).then((result) => {
      if (options.validationHandler) {
        return options.validationHandler({
          accessToken,
          idClaims: result.idTokenClaims,
          idToken: result.idToken,
          state
        }).then(() => result);
      }
      return result;
    }).then((result) => {
      this.storeIdToken(result);
      this.storeSessionState(sessionState);
      if (this.clearHashAfterLogin && !options.preventClearHashAfterLogin) {
        this.clearLocationHash();
      }
      this.eventsSubject.next(new OAuthSuccessEvent("token_received"));
      this.callOnTokenReceivedIfExists(options);
      this.inImplicitFlow = false;
      return true;
    }).catch((reason) => {
      this.eventsSubject.next(new OAuthErrorEvent("token_validation_error", reason));
      this.logger.error("Error validating tokens");
      this.logger.error(reason);
      return Promise.reject(reason);
    });
  }
  parseState(state) {
    let nonce = state;
    let userState = "";
    if (state) {
      const idx = state.indexOf(this.config.nonceStateSeparator);
      if (idx > -1) {
        nonce = state.substr(0, idx);
        userState = state.substr(idx + this.config.nonceStateSeparator.length);
      }
    }
    return [nonce, userState];
  }
  validateNonce(nonceInState) {
    let savedNonce;
    if (this.saveNoncesInLocalStorage && typeof window["localStorage"] !== "undefined") {
      savedNonce = localStorage.getItem("nonce");
    } else {
      savedNonce = this._storage.getItem("nonce");
    }
    if (savedNonce !== nonceInState) {
      const err2 = "Validating access_token failed, wrong state/nonce.";
      console.error(err2, savedNonce, nonceInState);
      return false;
    }
    return true;
  }
  storeIdToken(idToken) {
    this._storage.setItem("id_token", idToken.idToken);
    this._storage.setItem("id_token_claims_obj", idToken.idTokenClaimsJson);
    this._storage.setItem("id_token_expires_at", "" + idToken.idTokenExpiresAt);
    this._storage.setItem("id_token_stored_at", "" + this.dateTimeService.now());
  }
  storeSessionState(sessionState) {
    this._storage.setItem("session_state", sessionState);
  }
  getSessionState() {
    return this._storage.getItem("session_state");
  }
  handleLoginError(options, parts) {
    if (options.onLoginError) {
      options.onLoginError(parts);
    }
    if (this.clearHashAfterLogin && !options.preventClearHashAfterLogin) {
      this.clearLocationHash();
    }
  }
  getClockSkewInMsec(defaultSkewMsc = 6e5) {
    if (!this.clockSkewInSec && this.clockSkewInSec !== 0) {
      return defaultSkewMsc;
    }
    return this.clockSkewInSec * 1e3;
  }
  /**
   * @ignore
   */
  processIdToken(idToken, accessToken, skipNonceCheck = false) {
    const tokenParts = idToken.split(".");
    const headerBase64 = this.padBase64(tokenParts[0]);
    const headerJson = b64DecodeUnicode(headerBase64);
    const header = JSON.parse(headerJson);
    const claimsBase64 = this.padBase64(tokenParts[1]);
    const claimsJson = b64DecodeUnicode(claimsBase64);
    const claims = JSON.parse(claimsJson);
    let savedNonce;
    if (this.saveNoncesInLocalStorage && typeof window["localStorage"] !== "undefined") {
      savedNonce = localStorage.getItem("nonce");
    } else {
      savedNonce = this._storage.getItem("nonce");
    }
    if (Array.isArray(claims.aud)) {
      if (claims.aud.every((v) => v !== this.clientId)) {
        const err2 = "Wrong audience: " + claims.aud.join(",");
        this.logger.warn(err2);
        return Promise.reject(err2);
      }
    } else {
      if (claims.aud !== this.clientId) {
        const err2 = "Wrong audience: " + claims.aud;
        this.logger.warn(err2);
        return Promise.reject(err2);
      }
    }
    if (!claims.sub) {
      const err2 = "No sub claim in id_token";
      this.logger.warn(err2);
      return Promise.reject(err2);
    }
    if (this.sessionChecksEnabled && this.silentRefreshSubject && this.silentRefreshSubject !== claims["sub"]) {
      const err2 = `After refreshing, we got an id_token for another user (sub). Expected sub: ${this.silentRefreshSubject}, received sub: ${claims["sub"]}`;
      this.logger.warn(err2);
      return Promise.reject(err2);
    }
    if (!claims.iat) {
      const err2 = "No iat claim in id_token";
      this.logger.warn(err2);
      return Promise.reject(err2);
    }
    if (!this.skipIssuerCheck && claims.iss !== this.issuer) {
      const err2 = "Wrong issuer: " + claims.iss;
      this.logger.warn(err2);
      return Promise.reject(err2);
    }
    if (!skipNonceCheck && claims.nonce !== savedNonce) {
      const err2 = "Wrong nonce: " + claims.nonce;
      this.logger.warn(err2);
      return Promise.reject(err2);
    }
    if (Object.prototype.hasOwnProperty.call(this, "responseType") && (this.responseType === "code" || this.responseType === "id_token")) {
      this.disableAtHashCheck = true;
    }
    if (!this.disableAtHashCheck && this.requestAccessToken && !claims["at_hash"]) {
      const err2 = "An at_hash is needed!";
      this.logger.warn(err2);
      return Promise.reject(err2);
    }
    const now = this.dateTimeService.now();
    const issuedAtMSec = claims.iat * 1e3;
    const expiresAtMSec = claims.exp * 1e3;
    const clockSkewInMSec = this.getClockSkewInMsec();
    if (issuedAtMSec - clockSkewInMSec >= now || expiresAtMSec + clockSkewInMSec - this.decreaseExpirationBySec <= now) {
      const err2 = "Token has expired";
      console.error(err2);
      console.error({
        now,
        issuedAtMSec,
        expiresAtMSec
      });
      return Promise.reject(err2);
    }
    const validationParams = {
      accessToken,
      idToken,
      jwks: this.jwks,
      idTokenClaims: claims,
      idTokenHeader: header,
      loadKeys: () => this.loadJwks()
    };
    if (this.disableAtHashCheck) {
      return this.checkSignature(validationParams).then(() => {
        const result = {
          idToken,
          idTokenClaims: claims,
          idTokenClaimsJson: claimsJson,
          idTokenHeader: header,
          idTokenHeaderJson: headerJson,
          idTokenExpiresAt: expiresAtMSec
        };
        return result;
      });
    }
    return this.checkAtHash(validationParams).then((atHashValid) => {
      if (!this.disableAtHashCheck && this.requestAccessToken && !atHashValid) {
        const err2 = "Wrong at_hash";
        this.logger.warn(err2);
        return Promise.reject(err2);
      }
      return this.checkSignature(validationParams).then(() => {
        const atHashCheckEnabled = !this.disableAtHashCheck;
        const result = {
          idToken,
          idTokenClaims: claims,
          idTokenClaimsJson: claimsJson,
          idTokenHeader: header,
          idTokenHeaderJson: headerJson,
          idTokenExpiresAt: expiresAtMSec
        };
        if (atHashCheckEnabled) {
          return this.checkAtHash(validationParams).then((atHashValid2) => {
            if (this.requestAccessToken && !atHashValid2) {
              const err2 = "Wrong at_hash";
              this.logger.warn(err2);
              return Promise.reject(err2);
            } else {
              return result;
            }
          });
        } else {
          return result;
        }
      });
    });
  }
  /**
   * Returns the received claims about the user.
   */
  getIdentityClaims() {
    const claims = this._storage.getItem("id_token_claims_obj");
    if (!claims) {
      return null;
    }
    return JSON.parse(claims);
  }
  /**
   * Returns the granted scopes from the server.
   */
  getGrantedScopes() {
    const scopes = this._storage.getItem("granted_scopes");
    if (!scopes) {
      return null;
    }
    return JSON.parse(scopes);
  }
  /**
   * Returns the current id_token.
   */
  getIdToken() {
    return this._storage ? this._storage.getItem("id_token") : null;
  }
  padBase64(base64data) {
    while (base64data.length % 4 !== 0) {
      base64data += "=";
    }
    return base64data;
  }
  /**
   * Returns the current access_token.
   */
  getAccessToken() {
    return this._storage ? this._storage.getItem("access_token") : null;
  }
  getRefreshToken() {
    return this._storage ? this._storage.getItem("refresh_token") : null;
  }
  /**
   * Returns the expiration date of the access_token
   * as milliseconds since 1970.
   */
  getAccessTokenExpiration() {
    if (!this._storage.getItem("expires_at")) {
      return null;
    }
    return parseInt(this._storage.getItem("expires_at"), 10);
  }
  getAccessTokenStoredAt() {
    return parseInt(this._storage.getItem("access_token_stored_at"), 10);
  }
  getIdTokenStoredAt() {
    return parseInt(this._storage.getItem("id_token_stored_at"), 10);
  }
  /**
   * Returns the expiration date of the id_token
   * as milliseconds since 1970.
   */
  getIdTokenExpiration() {
    if (!this._storage.getItem("id_token_expires_at")) {
      return null;
    }
    return parseInt(this._storage.getItem("id_token_expires_at"), 10);
  }
  /**
   * Checkes, whether there is a valid access_token.
   */
  hasValidAccessToken() {
    if (this.getAccessToken()) {
      const expiresAt = this._storage.getItem("expires_at");
      const now = this.dateTimeService.new();
      if (expiresAt && parseInt(expiresAt, 10) - this.decreaseExpirationBySec < now.getTime() - this.getClockSkewInMsec()) {
        return false;
      }
      return true;
    }
    return false;
  }
  /**
   * Checks whether there is a valid id_token.
   */
  hasValidIdToken() {
    if (this.getIdToken()) {
      const expiresAt = this._storage.getItem("id_token_expires_at");
      const now = this.dateTimeService.new();
      if (expiresAt && parseInt(expiresAt, 10) - this.decreaseExpirationBySec < now.getTime() - this.getClockSkewInMsec()) {
        return false;
      }
      return true;
    }
    return false;
  }
  /**
   * Retrieve a saved custom property of the TokenReponse object. Only if predefined in authconfig.
   */
  getCustomTokenResponseProperty(requestedProperty) {
    return this._storage && this.config.customTokenParameters && this.config.customTokenParameters.indexOf(requestedProperty) >= 0 && this._storage.getItem(requestedProperty) !== null ? JSON.parse(this._storage.getItem(requestedProperty)) : null;
  }
  /**
   * Returns the auth-header that can be used
   * to transmit the access_token to a service
   */
  authorizationHeader() {
    return "Bearer " + this.getAccessToken();
  }
  logOut(customParameters = {}, state = "") {
    let noRedirectToLogoutUrl = false;
    if (typeof customParameters === "boolean") {
      noRedirectToLogoutUrl = customParameters;
      customParameters = {};
    }
    const id_token = this.getIdToken();
    this._storage.removeItem("access_token");
    this._storage.removeItem("id_token");
    this._storage.removeItem("refresh_token");
    if (this.saveNoncesInLocalStorage) {
      localStorage.removeItem("nonce");
      localStorage.removeItem("PKCE_verifier");
    } else {
      this._storage.removeItem("nonce");
      this._storage.removeItem("PKCE_verifier");
    }
    this._storage.removeItem("expires_at");
    this._storage.removeItem("id_token_claims_obj");
    this._storage.removeItem("id_token_expires_at");
    this._storage.removeItem("id_token_stored_at");
    this._storage.removeItem("access_token_stored_at");
    this._storage.removeItem("granted_scopes");
    this._storage.removeItem("session_state");
    if (this.config.customTokenParameters) {
      this.config.customTokenParameters.forEach((customParam) => this._storage.removeItem(customParam));
    }
    this.silentRefreshSubject = null;
    this.eventsSubject.next(new OAuthInfoEvent("logout"));
    if (!this.logoutUrl) {
      return;
    }
    if (noRedirectToLogoutUrl) {
      return;
    }
    let logoutUrl;
    if (!this.validateUrlForHttps(this.logoutUrl)) {
      throw new Error("logoutUrl  must use HTTPS (with TLS), or config value for property 'requireHttps' must be set to 'false' and allow HTTP (without TLS).");
    }
    if (this.logoutUrl.indexOf("{{") > -1) {
      logoutUrl = this.logoutUrl.replace(/\{\{id_token\}\}/, encodeURIComponent(id_token)).replace(/\{\{client_id\}\}/, encodeURIComponent(this.clientId));
    } else {
      let params = new HttpParams({
        encoder: new WebHttpUrlEncodingCodec()
      });
      if (id_token) {
        params = params.set("id_token_hint", id_token);
      }
      const postLogoutUrl = this.postLogoutRedirectUri || this.redirectUriAsPostLogoutRedirectUriFallback && this.redirectUri || "";
      if (postLogoutUrl) {
        params = params.set("post_logout_redirect_uri", postLogoutUrl);
        if (state) {
          params = params.set("state", state);
        }
      }
      for (const key in customParameters) {
        params = params.set(key, customParameters[key]);
      }
      logoutUrl = this.logoutUrl + (this.logoutUrl.indexOf("?") > -1 ? "&" : "?") + params.toString();
    }
    this.config.openUri(logoutUrl);
  }
  /**
   * @ignore
   */
  createAndSaveNonce() {
    const that = this;
    return this.createNonce().then(function(nonce) {
      if (that.saveNoncesInLocalStorage && typeof window["localStorage"] !== "undefined") {
        localStorage.setItem("nonce", nonce);
      } else {
        that._storage.setItem("nonce", nonce);
      }
      return nonce;
    });
  }
  /**
   * @ignore
   */
  ngOnDestroy() {
    this.clearAccessTokenTimer();
    this.clearIdTokenTimer();
    this.removeSilentRefreshEventListener();
    const silentRefreshFrame = this.document.getElementById(this.silentRefreshIFrameName);
    if (silentRefreshFrame) {
      silentRefreshFrame.remove();
    }
    this.stopSessionCheckTimer();
    this.removeSessionCheckEventListener();
    const sessionCheckFrame = this.document.getElementById(this.sessionCheckIFrameName);
    if (sessionCheckFrame) {
      sessionCheckFrame.remove();
    }
  }
  createNonce() {
    return new Promise((resolve) => {
      if (this.rngUrl) {
        throw new Error("createNonce with rng-web-api has not been implemented so far");
      }
      const unreserved = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
      let size = 45;
      let id = "";
      const crypto = typeof self === "undefined" ? null : self.crypto || self["msCrypto"];
      if (crypto) {
        let bytes = new Uint8Array(size);
        crypto.getRandomValues(bytes);
        if (!bytes.map) {
          bytes.map = Array.prototype.map;
        }
        bytes = bytes.map((x) => unreserved.charCodeAt(x % unreserved.length));
        id = String.fromCharCode.apply(null, bytes);
      } else {
        while (0 < size--) {
          id += unreserved[Math.random() * unreserved.length | 0];
        }
      }
      resolve(base64UrlEncode(id));
    });
  }
  checkAtHash(params) {
    return __async(this, null, function* () {
      if (!this.tokenValidationHandler) {
        this.logger.warn("No tokenValidationHandler configured. Cannot check at_hash.");
        return true;
      }
      return this.tokenValidationHandler.validateAtHash(params);
    });
  }
  checkSignature(params) {
    if (!this.tokenValidationHandler) {
      this.logger.warn("No tokenValidationHandler configured. Cannot check signature.");
      return Promise.resolve(null);
    }
    return this.tokenValidationHandler.validateSignature(params);
  }
  /**
   * Start the implicit flow or the code flow,
   * depending on your configuration.
   */
  initLoginFlow(additionalState = "", params = {}) {
    if (this.responseType === "code") {
      return this.initCodeFlow(additionalState, params);
    } else {
      return this.initImplicitFlow(additionalState, params);
    }
  }
  /**
   * Starts the authorization code flow and redirects to user to
   * the auth servers login url.
   */
  initCodeFlow(additionalState = "", params = {}) {
    if (this.loginUrl !== "") {
      this.initCodeFlowInternal(additionalState, params);
    } else {
      this.events.pipe(filter((e) => e.type === "discovery_document_loaded")).subscribe(() => this.initCodeFlowInternal(additionalState, params));
    }
  }
  initCodeFlowInternal(additionalState = "", params = {}) {
    if (!this.validateUrlForHttps(this.loginUrl)) {
      throw new Error("loginUrl  must use HTTPS (with TLS), or config value for property 'requireHttps' must be set to 'false' and allow HTTP (without TLS).");
    }
    let addParams = {};
    let loginHint = null;
    if (typeof params === "string") {
      loginHint = params;
    } else if (typeof params === "object") {
      addParams = params;
    }
    this.createLoginUrl(additionalState, loginHint, null, false, addParams).then(this.config.openUri).catch((error) => {
      console.error("Error in initAuthorizationCodeFlow");
      console.error(error);
    });
  }
  createChallangeVerifierPairForPKCE() {
    return __async(this, null, function* () {
      if (!this.crypto) {
        throw new Error("PKCE support for code flow needs a CryptoHander. Did you import the OAuthModule using forRoot() ?");
      }
      const verifier = yield this.createNonce();
      const challengeRaw = yield this.crypto.calcHash(verifier, "sha-256");
      const challenge = base64UrlEncode(challengeRaw);
      return [challenge, verifier];
    });
  }
  extractRecognizedCustomParameters(tokenResponse) {
    const foundParameters = /* @__PURE__ */ new Map();
    if (!this.config.customTokenParameters) {
      return foundParameters;
    }
    this.config.customTokenParameters.forEach((recognizedParameter) => {
      if (tokenResponse[recognizedParameter]) {
        foundParameters.set(recognizedParameter, JSON.stringify(tokenResponse[recognizedParameter]));
      }
    });
    return foundParameters;
  }
  /**
   * Revokes the auth token to secure the vulnarability
   * of the token issued allowing the authorization server to clean
   * up any security credentials associated with the authorization
   */
  revokeTokenAndLogout(customParameters = {}, ignoreCorsIssues = false) {
    const revokeEndpoint = this.revocationEndpoint;
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    if (!accessToken) {
      return Promise.resolve();
    }
    let params = new HttpParams({
      encoder: new WebHttpUrlEncodingCodec()
    });
    let headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
    if (this.useHttpBasicAuth) {
      const header = btoa(`${this.clientId}:${this.dummyClientSecret}`);
      headers = headers.set("Authorization", "Basic " + header);
    }
    if (!this.useHttpBasicAuth) {
      params = params.set("client_id", this.clientId);
    }
    if (!this.useHttpBasicAuth && this.dummyClientSecret) {
      params = params.set("client_secret", this.dummyClientSecret);
    }
    if (this.customQueryParams) {
      for (const key of Object.getOwnPropertyNames(this.customQueryParams)) {
        params = params.set(key, this.customQueryParams[key]);
      }
    }
    return new Promise((resolve, reject) => {
      let revokeAccessToken;
      let revokeRefreshToken;
      if (accessToken) {
        const revokationParams = params.set("token", accessToken).set("token_type_hint", "access_token");
        revokeAccessToken = this.http.post(revokeEndpoint, revokationParams, {
          headers
        });
      } else {
        revokeAccessToken = of(null);
      }
      if (refreshToken) {
        const revokationParams = params.set("token", refreshToken).set("token_type_hint", "refresh_token");
        revokeRefreshToken = this.http.post(revokeEndpoint, revokationParams, {
          headers
        });
      } else {
        revokeRefreshToken = of(null);
      }
      if (ignoreCorsIssues) {
        revokeAccessToken = revokeAccessToken.pipe(catchError((err2) => {
          if (err2.status === 0) {
            return of(null);
          }
          return throwError(err2);
        }));
        revokeRefreshToken = revokeRefreshToken.pipe(catchError((err2) => {
          if (err2.status === 0) {
            return of(null);
          }
          return throwError(err2);
        }));
      }
      combineLatest([revokeAccessToken, revokeRefreshToken]).subscribe((res) => {
        this.logOut(customParameters);
        resolve(res);
        this.logger.info("Token successfully revoked");
      }, (err2) => {
        this.logger.error("Error revoking token", err2);
        this.eventsSubject.next(new OAuthErrorEvent("token_revoke_error", err2));
        reject(err2);
      });
    });
  }
  /**
   * Clear location.hash if it's present
   */
  clearLocationHash() {
    if (location.hash != "") {
      location.hash = "";
    }
  }
  static {
    this.ɵfac = function OAuthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OAuthService)(ɵɵinject(NgZone), ɵɵinject(HttpClient), ɵɵinject(OAuthStorage, 8), ɵɵinject(ValidationHandler, 8), ɵɵinject(AuthConfig, 8), ɵɵinject(UrlHelperService), ɵɵinject(OAuthLogger), ɵɵinject(HashHandler, 8), ɵɵinject(DOCUMENT), ɵɵinject(DateTimeProvider));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _OAuthService,
      factory: _OAuthService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OAuthService, [{
    type: Injectable
  }], () => [{
    type: NgZone
  }, {
    type: HttpClient
  }, {
    type: OAuthStorage,
    decorators: [{
      type: Optional
    }]
  }, {
    type: ValidationHandler,
    decorators: [{
      type: Optional
    }]
  }, {
    type: AuthConfig,
    decorators: [{
      type: Optional
    }]
  }, {
    type: UrlHelperService
  }, {
    type: OAuthLogger
  }, {
    type: HashHandler,
    decorators: [{
      type: Optional
    }]
  }, {
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: DateTimeProvider
  }], null);
})();
var OAuthResourceServerErrorHandler = class {
};
var OAuthNoopResourceServerErrorHandler = class {
  handleError(err2) {
    return throwError(err2);
  }
};
var DefaultOAuthInterceptor = class _DefaultOAuthInterceptor {
  constructor(oAuthService, errorHandler, moduleConfig) {
    this.oAuthService = oAuthService;
    this.errorHandler = errorHandler;
    this.moduleConfig = moduleConfig;
  }
  checkUrl(url) {
    if (this.moduleConfig.resourceServer.customUrlValidation) {
      return this.moduleConfig.resourceServer.customUrlValidation(url);
    }
    if (this.moduleConfig.resourceServer.allowedUrls) {
      return !!this.moduleConfig.resourceServer.allowedUrls.find((u) => url.toLowerCase().startsWith(u.toLowerCase()));
    }
    return true;
  }
  intercept(req, next) {
    const url = req.url.toLowerCase();
    if (!this.moduleConfig || !this.moduleConfig.resourceServer || !this.checkUrl(url)) {
      return next.handle(req);
    }
    const sendAccessToken = this.moduleConfig.resourceServer.sendAccessToken;
    if (!sendAccessToken) {
      return next.handle(req).pipe(catchError((err2) => this.errorHandler.handleError(err2)));
    }
    return merge(of(this.oAuthService.getAccessToken()).pipe(filter((token) => !!token)), this.oAuthService.events.pipe(
      filter((e) => e.type === "token_received"),
      timeout(this.oAuthService.waitForTokenInMsec || 0),
      catchError(() => of(null)),
      // timeout is not an error
      map(() => this.oAuthService.getAccessToken())
    )).pipe(take(1), mergeMap((token) => {
      if (token) {
        const header = "Bearer " + token;
        const headers = req.headers.set("Authorization", header);
        req = req.clone({
          headers
        });
      }
      return next.handle(req).pipe(catchError((err2) => this.errorHandler.handleError(err2)));
    }));
  }
  static {
    this.ɵfac = function DefaultOAuthInterceptor_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DefaultOAuthInterceptor)(ɵɵinject(OAuthService), ɵɵinject(OAuthResourceServerErrorHandler), ɵɵinject(OAuthModuleConfig, 8));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _DefaultOAuthInterceptor,
      factory: _DefaultOAuthInterceptor.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultOAuthInterceptor, [{
    type: Injectable
  }], () => [{
    type: OAuthService
  }, {
    type: OAuthResourceServerErrorHandler
  }, {
    type: OAuthModuleConfig,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
function createDefaultLogger() {
  return console;
}
function createDefaultStorage() {
  return typeof sessionStorage !== "undefined" ? sessionStorage : new MemoryStorage();
}
function provideOAuthClient(config = null, validationHandlerClass = NullValidationHandler) {
  return makeEnvironmentProviders([OAuthService, UrlHelperService, {
    provide: OAuthLogger,
    useFactory: createDefaultLogger
  }, {
    provide: OAuthStorage,
    useFactory: createDefaultStorage
  }, {
    provide: ValidationHandler,
    useClass: validationHandlerClass
  }, {
    provide: HashHandler,
    useClass: DefaultHashHandler
  }, {
    provide: OAuthResourceServerErrorHandler,
    useClass: OAuthNoopResourceServerErrorHandler
  }, {
    provide: OAuthModuleConfig,
    useValue: config
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: DefaultOAuthInterceptor,
    multi: true
  }, {
    provide: DateTimeProvider,
    useClass: SystemDateTimeProvider
  }]);
}
var OAuthModule = class _OAuthModule {
  static forRoot(config = null, validationHandlerClass = NullValidationHandler) {
    return {
      ngModule: _OAuthModule,
      providers: [provideOAuthClient(config, validationHandlerClass)]
    };
  }
  static {
    this.ɵfac = function OAuthModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OAuthModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _OAuthModule,
      imports: [CommonModule]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [CommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OAuthModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [],
      exports: []
    }]
  }], null, null);
})();
var err = `PLEASE READ THIS CAREFULLY:

Beginning with angular-oauth2-oidc version 9, the JwksValidationHandler
has been moved to an library of its own. If you need it for implementing
OAuth2/OIDC **implicit flow**, please install it using npm:

  npm i angular-oauth2-oidc-jwks --save

After that, you can import it into your application:

  import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

Please note, that this dependency is not needed for the **code flow**,
which is nowadays the **recommented** one for single page applications.
This also results in smaller bundle sizes.
`;
var JwksValidationHandler = class extends NullValidationHandler {
  constructor() {
    super();
    console.error(err);
  }
};
var AUTH_CONFIG = new InjectionToken("AUTH_CONFIG");
export {
  AUTH_CONFIG,
  AbstractValidationHandler,
  AuthConfig,
  DateTimeProvider,
  DefaultHashHandler,
  DefaultOAuthInterceptor,
  HashHandler,
  JwksValidationHandler,
  LoginOptions,
  MemoryStorage,
  NullValidationHandler,
  OAuthErrorEvent,
  OAuthEvent,
  OAuthInfoEvent,
  OAuthLogger,
  OAuthModule,
  OAuthModuleConfig,
  OAuthNoopResourceServerErrorHandler,
  OAuthResourceServerConfig,
  OAuthResourceServerErrorHandler,
  OAuthService,
  OAuthStorage,
  OAuthSuccessEvent,
  ReceivedTokens,
  SystemDateTimeProvider,
  UrlHelperService,
  ValidationHandler,
  provideOAuthClient
};
//# sourceMappingURL=angular-oauth2-oidc.js.map
