export class AuthConfig {
    constructor(json) {
        /**
         * The client's id as registered with the auth server
         */
        this.clientId = '';
        /**
         * The client's redirectUri as registered with the auth server
         */
        this.redirectUri = '';
        /**
         * An optional second redirectUri where the auth server
         * redirects the user to after logging out.
         */
        this.postLogoutRedirectUri = '';
        /**
         * Defines whether to use 'redirectUri' as a replacement
         * of 'postLogoutRedirectUri' if the latter is not set.
         */
        this.redirectUriAsPostLogoutRedirectUriFallback = true;
        /**
         * The auth server's endpoint that allows to log
         * the user in when using implicit flow.
         */
        this.loginUrl = '';
        /**
         * The requested scopes
         */
        this.scope = 'openid profile';
        this.resource = '';
        this.rngUrl = '';
        /**
         * Defines whether to use OpenId Connect during
         * implicit flow.
         */
        this.oidc = true;
        /**
         * Defines whether to request an access token during
         * implicit flow.
         */
        this.requestAccessToken = true;
        this.options = null;
        /**
         * The issuer's uri.
         */
        this.issuer = '';
        /**
         * The logout url.
         */
        this.logoutUrl = '';
        /**
         * Defines whether to clear the hash fragment after logging in.
         */
        this.clearHashAfterLogin = true;
        /**
         * Url of the token endpoint as defined by OpenId Connect and OAuth 2.
         */
        this.tokenEndpoint = null;
        /**
         * Url of the revocation endpoint as defined by OpenId Connect and OAuth 2.
         */
        this.revocationEndpoint = null;
        /**
         * Names of known parameters sent out in the TokenResponse. https://tools.ietf.org/html/rfc6749#section-5.1
         */
        this.customTokenParameters = [];
        /**
         * Url of the userinfo endpoint as defined by OpenId Connect.
         */
        this.userinfoEndpoint = null;
        this.responseType = '';
        /**
         * Defines whether additional debug information should
         * be shown at the console. Note that in certain browsers
         * the verbosity of the console needs to be explicitly set
         * to include Debug level messages.
         */
        this.showDebugInformation = false;
        /**
         * The redirect uri used when doing silent refresh.
         */
        this.silentRefreshRedirectUri = '';
        this.silentRefreshMessagePrefix = '';
        /**
         * Set this to true to display the iframe used for
         * silent refresh for debugging.
         */
        this.silentRefreshShowIFrame = false;
        /**
         * Timeout for silent refresh.
         * @internal
         * @deprecated use silentRefreshTimeout
         */
        this.siletRefreshTimeout = 1000 * 20;
        /**
         * Timeout for silent refresh.
         */
        this.silentRefreshTimeout = 1000 * 20;
        /**
         * Some auth servers don't allow using password flow
         * w/o a client secret while the standards do not
         * demand for it. In this case, you can set a password
         * here. As this password is exposed to the public
         * it does not bring additional security and is therefore
         * as good as using no password.
         */
        this.dummyClientSecret = '';
        /**
         * Defines whether https is required.
         * The default value is remoteOnly which only allows
         * http for localhost, while every other domains need
         * to be used with https.
         */
        this.requireHttps = 'remoteOnly';
        /**
         * Defines whether every url provided by the discovery
         * document has to start with the issuer's url.
         */
        this.strictDiscoveryDocumentValidation = true;
        /**
         * JSON Web Key Set (https://tools.ietf.org/html/rfc7517)
         * with keys used to validate received id_tokens.
         * This is taken out of the disovery document. Can be set manually too.
         */
        this.jwks = null;
        /**
         * Map with additional query parameter that are appended to
         * the request when initializing implicit flow.
         */
        this.customQueryParams = null;
        this.silentRefreshIFrameName = 'angular-oauth-oidc-silent-refresh-iframe';
        /**
         * Defines when the token_timeout event should be raised.
         * If you set this to the default value 0.75, the event
         * is triggered after 75% of the token's life time.
         */
        this.timeoutFactor = 0.75;
        /**
         * If true, the lib will try to check whether the user
         * is still logged in on a regular basis as described
         * in http://openid.net/specs/openid-connect-session-1_0.html#ChangeNotification
         */
        this.sessionChecksEnabled = false;
        /**
         * Interval in msec for checking the session
         * according to http://openid.net/specs/openid-connect-session-1_0.html#ChangeNotification
         */
        this.sessionCheckIntervall = 3 * 1000;
        /**
         * Url for the iframe used for session checks
         */
        this.sessionCheckIFrameUrl = null;
        /**
         * Name of the iframe to use for session checks
         */
        this.sessionCheckIFrameName = 'angular-oauth-oidc-check-session-iframe';
        /**
         * This property has been introduced to disable at_hash checks
         * and is indented for Identity Provider that does not deliver
         * an at_hash EVEN THOUGH its recommended by the OIDC specs.
         * Of course, when disabling these checks then we are bypassing
         * a security check which means we are more vulnerable.
         */
        this.disableAtHashCheck = false;
        /**
         * Defines wether to check the subject of a refreshed token after silent refresh.
         * Normally, it should be the same as before.
         */
        this.skipSubjectCheck = false;
        this.useIdTokenHintForSilentRefresh = false;
        /**
         * Defined whether to skip the validation of the issuer in the discovery document.
         * Normally, the discovey document's url starts with the url of the issuer.
         */
        this.skipIssuerCheck = false;
        /**
         * final state sent to issuer is built as follows:
         * state = nonce + nonceStateSeparator + additional state
         * Default separator is ';' (encoded %3B).
         * In rare cases, this character might be forbidden or inconvenient to use by the issuer so it can be customized.
         */
        this.nonceStateSeparator = ';';
        /**
         * Set this to true to use HTTP BASIC auth for AJAX calls
         */
        this.useHttpBasicAuth = false;
        /**
         * Decreases the Expiration time of tokens by this number of seconds
         */
        this.decreaseExpirationBySec = 0;
        /**
         * The interceptors waits this time span if there is no token
         */
        this.waitForTokenInMsec = 0;
        /**
         * Code Flow is by defauld used together with PKCI which is also higly recommented.
         * You can disbale it here by setting this flag to true.
         * https://tools.ietf.org/html/rfc7636#section-1.1
         */
        this.disablePKCE = false;
        /**
         * Set this to true to preserve the requested route including query parameters after code flow login.
         * This setting enables deep linking for the code flow.
         */
        this.preserveRequestedRoute = false;
        /**
         * Allows to disable the timer for the id_token used
         * for token refresh
         */
        this.disableIdTokenTimer = false;
        /**
         * Blocks other origins requesting a silent refresh
         */
        this.checkOrigin = false;
        /**
         * This property allows you to override the method that is used to open the login url,
         * allowing a way for implementations to specify their own method of routing to new
         * urls.
         */
        this.openUri = (uri) => {
            location.href = uri;
        };
        if (json) {
            Object.assign(this, json);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy9saWIvc3JjL2F1dGguY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sT0FBTyxVQUFVO0lBeVJyQixZQUFZLElBQTBCO1FBeFJ0Qzs7V0FFRztRQUNJLGFBQVEsR0FBSSxFQUFFLENBQUM7UUFFdEI7O1dBRUc7UUFDSSxnQkFBVyxHQUFJLEVBQUUsQ0FBQztRQUV6Qjs7O1dBR0c7UUFDSSwwQkFBcUIsR0FBSSxFQUFFLENBQUM7UUFFbkM7OztXQUdHO1FBQ0ksK0NBQTBDLEdBQUksSUFBSSxDQUFDO1FBRTFEOzs7V0FHRztRQUNJLGFBQVEsR0FBSSxFQUFFLENBQUM7UUFFdEI7O1dBRUc7UUFDSSxVQUFLLEdBQUksZ0JBQWdCLENBQUM7UUFFMUIsYUFBUSxHQUFJLEVBQUUsQ0FBQztRQUVmLFdBQU0sR0FBSSxFQUFFLENBQUM7UUFFcEI7OztXQUdHO1FBQ0ksU0FBSSxHQUFJLElBQUksQ0FBQztRQUVwQjs7O1dBR0c7UUFDSSx1QkFBa0IsR0FBSSxJQUFJLENBQUM7UUFFM0IsWUFBTyxHQUFTLElBQUksQ0FBQztRQUU1Qjs7V0FFRztRQUNJLFdBQU0sR0FBSSxFQUFFLENBQUM7UUFFcEI7O1dBRUc7UUFDSSxjQUFTLEdBQUksRUFBRSxDQUFDO1FBRXZCOztXQUVHO1FBQ0ksd0JBQW1CLEdBQUksSUFBSSxDQUFDO1FBRW5DOztXQUVHO1FBQ0ksa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFFckM7O1dBRUc7UUFDSSx1QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFFMUM7O1dBRUc7UUFDSSwwQkFBcUIsR0FBYyxFQUFFLENBQUM7UUFFN0M7O1dBRUc7UUFDSSxxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFFakMsaUJBQVksR0FBSSxFQUFFLENBQUM7UUFFMUI7Ozs7O1dBS0c7UUFDSSx5QkFBb0IsR0FBSSxLQUFLLENBQUM7UUFFckM7O1dBRUc7UUFDSSw2QkFBd0IsR0FBSSxFQUFFLENBQUM7UUFFL0IsK0JBQTBCLEdBQUksRUFBRSxDQUFDO1FBRXhDOzs7V0FHRztRQUNJLDRCQUF1QixHQUFJLEtBQUssQ0FBQztRQUV4Qzs7OztXQUlHO1FBQ0ksd0JBQW1CLEdBQVksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVoRDs7V0FFRztRQUNJLHlCQUFvQixHQUFZLElBQUksR0FBRyxFQUFFLENBQUM7UUFFakQ7Ozs7Ozs7V0FPRztRQUNJLHNCQUFpQixHQUFZLEVBQUUsQ0FBQztRQUV2Qzs7Ozs7V0FLRztRQUNJLGlCQUFZLEdBQTRCLFlBQVksQ0FBQztRQUU1RDs7O1dBR0c7UUFDSSxzQ0FBaUMsR0FBSSxJQUFJLENBQUM7UUFFakQ7Ozs7V0FJRztRQUNJLFNBQUksR0FBWSxJQUFJLENBQUM7UUFFNUI7OztXQUdHO1FBQ0ksc0JBQWlCLEdBQVksSUFBSSxDQUFDO1FBRWxDLDRCQUF1QixHQUFJLDBDQUEwQyxDQUFDO1FBRTdFOzs7O1dBSUc7UUFDSSxrQkFBYSxHQUFJLElBQUksQ0FBQztRQUU3Qjs7OztXQUlHO1FBQ0kseUJBQW9CLEdBQUksS0FBSyxDQUFDO1FBRXJDOzs7V0FHRztRQUNJLDBCQUFxQixHQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7UUFFekM7O1dBRUc7UUFDSSwwQkFBcUIsR0FBWSxJQUFJLENBQUM7UUFFN0M7O1dBRUc7UUFDSSwyQkFBc0IsR0FBSSx5Q0FBeUMsQ0FBQztRQUUzRTs7Ozs7O1dBTUc7UUFDSSx1QkFBa0IsR0FBSSxLQUFLLENBQUM7UUFFbkM7OztXQUdHO1FBQ0kscUJBQWdCLEdBQUksS0FBSyxDQUFDO1FBRTFCLG1DQUE4QixHQUFJLEtBQUssQ0FBQztRQUUvQzs7O1dBR0c7UUFDSSxvQkFBZSxHQUFJLEtBQUssQ0FBQztRQVNoQzs7Ozs7V0FLRztRQUNJLHdCQUFtQixHQUFJLEdBQUcsQ0FBQztRQUVsQzs7V0FFRztRQUNJLHFCQUFnQixHQUFJLEtBQUssQ0FBQztRQU9qQzs7V0FFRztRQUNJLDRCQUF1QixHQUFJLENBQUMsQ0FBQztRQUVwQzs7V0FFRztRQUNJLHVCQUFrQixHQUFJLENBQUMsQ0FBQztRQVUvQjs7OztXQUlHO1FBQ0ksZ0JBQVcsR0FBSSxLQUFLLENBQUM7UUFFNUI7OztXQUdHO1FBQ0ksMkJBQXNCLEdBQUksS0FBSyxDQUFDO1FBRXZDOzs7V0FHRztRQUNJLHdCQUFtQixHQUFJLEtBQUssQ0FBQztRQUVwQzs7V0FFRztRQUNJLGdCQUFXLEdBQUksS0FBSyxDQUFDO1FBUTVCOzs7O1dBSUc7UUFDSSxZQUFPLEdBQTJCLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDL0MsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDdEIsQ0FBQyxDQUFDO1FBWkEsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7Q0FVRiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBdXRoQ29uZmlnIHtcbiAgLyoqXG4gICAqIFRoZSBjbGllbnQncyBpZCBhcyByZWdpc3RlcmVkIHdpdGggdGhlIGF1dGggc2VydmVyXG4gICAqL1xuICBwdWJsaWMgY2xpZW50SWQ/ID0gJyc7XG5cbiAgLyoqXG4gICAqIFRoZSBjbGllbnQncyByZWRpcmVjdFVyaSBhcyByZWdpc3RlcmVkIHdpdGggdGhlIGF1dGggc2VydmVyXG4gICAqL1xuICBwdWJsaWMgcmVkaXJlY3RVcmk/ID0gJyc7XG5cbiAgLyoqXG4gICAqIEFuIG9wdGlvbmFsIHNlY29uZCByZWRpcmVjdFVyaSB3aGVyZSB0aGUgYXV0aCBzZXJ2ZXJcbiAgICogcmVkaXJlY3RzIHRoZSB1c2VyIHRvIGFmdGVyIGxvZ2dpbmcgb3V0LlxuICAgKi9cbiAgcHVibGljIHBvc3RMb2dvdXRSZWRpcmVjdFVyaT8gPSAnJztcblxuICAvKipcbiAgICogRGVmaW5lcyB3aGV0aGVyIHRvIHVzZSAncmVkaXJlY3RVcmknIGFzIGEgcmVwbGFjZW1lbnRcbiAgICogb2YgJ3Bvc3RMb2dvdXRSZWRpcmVjdFVyaScgaWYgdGhlIGxhdHRlciBpcyBub3Qgc2V0LlxuICAgKi9cbiAgcHVibGljIHJlZGlyZWN0VXJpQXNQb3N0TG9nb3V0UmVkaXJlY3RVcmlGYWxsYmFjaz8gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgYXV0aCBzZXJ2ZXIncyBlbmRwb2ludCB0aGF0IGFsbG93cyB0byBsb2dcbiAgICogdGhlIHVzZXIgaW4gd2hlbiB1c2luZyBpbXBsaWNpdCBmbG93LlxuICAgKi9cbiAgcHVibGljIGxvZ2luVXJsPyA9ICcnO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVxdWVzdGVkIHNjb3Blc1xuICAgKi9cbiAgcHVibGljIHNjb3BlPyA9ICdvcGVuaWQgcHJvZmlsZSc7XG5cbiAgcHVibGljIHJlc291cmNlPyA9ICcnO1xuXG4gIHB1YmxpYyBybmdVcmw/ID0gJyc7XG5cbiAgLyoqXG4gICAqIERlZmluZXMgd2hldGhlciB0byB1c2UgT3BlbklkIENvbm5lY3QgZHVyaW5nXG4gICAqIGltcGxpY2l0IGZsb3cuXG4gICAqL1xuICBwdWJsaWMgb2lkYz8gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHdoZXRoZXIgdG8gcmVxdWVzdCBhbiBhY2Nlc3MgdG9rZW4gZHVyaW5nXG4gICAqIGltcGxpY2l0IGZsb3cuXG4gICAqL1xuICBwdWJsaWMgcmVxdWVzdEFjY2Vzc1Rva2VuPyA9IHRydWU7XG5cbiAgcHVibGljIG9wdGlvbnM/OiBhbnkgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgaXNzdWVyJ3MgdXJpLlxuICAgKi9cbiAgcHVibGljIGlzc3Vlcj8gPSAnJztcblxuICAvKipcbiAgICogVGhlIGxvZ291dCB1cmwuXG4gICAqL1xuICBwdWJsaWMgbG9nb3V0VXJsPyA9ICcnO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHdoZXRoZXIgdG8gY2xlYXIgdGhlIGhhc2ggZnJhZ21lbnQgYWZ0ZXIgbG9nZ2luZyBpbi5cbiAgICovXG4gIHB1YmxpYyBjbGVhckhhc2hBZnRlckxvZ2luPyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFVybCBvZiB0aGUgdG9rZW4gZW5kcG9pbnQgYXMgZGVmaW5lZCBieSBPcGVuSWQgQ29ubmVjdCBhbmQgT0F1dGggMi5cbiAgICovXG4gIHB1YmxpYyB0b2tlbkVuZHBvaW50Pzogc3RyaW5nID0gbnVsbDtcblxuICAvKipcbiAgICogVXJsIG9mIHRoZSByZXZvY2F0aW9uIGVuZHBvaW50IGFzIGRlZmluZWQgYnkgT3BlbklkIENvbm5lY3QgYW5kIE9BdXRoIDIuXG4gICAqL1xuICBwdWJsaWMgcmV2b2NhdGlvbkVuZHBvaW50Pzogc3RyaW5nID0gbnVsbDtcblxuICAvKipcbiAgICogTmFtZXMgb2Yga25vd24gcGFyYW1ldGVycyBzZW50IG91dCBpbiB0aGUgVG9rZW5SZXNwb25zZS4gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi01LjFcbiAgICovXG4gIHB1YmxpYyBjdXN0b21Ub2tlblBhcmFtZXRlcnM/OiBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBVcmwgb2YgdGhlIHVzZXJpbmZvIGVuZHBvaW50IGFzIGRlZmluZWQgYnkgT3BlbklkIENvbm5lY3QuXG4gICAqL1xuICBwdWJsaWMgdXNlcmluZm9FbmRwb2ludD86IHN0cmluZyA9IG51bGw7XG5cbiAgcHVibGljIHJlc3BvbnNlVHlwZT8gPSAnJztcblxuICAvKipcbiAgICogRGVmaW5lcyB3aGV0aGVyIGFkZGl0aW9uYWwgZGVidWcgaW5mb3JtYXRpb24gc2hvdWxkXG4gICAqIGJlIHNob3duIGF0IHRoZSBjb25zb2xlLiBOb3RlIHRoYXQgaW4gY2VydGFpbiBicm93c2Vyc1xuICAgKiB0aGUgdmVyYm9zaXR5IG9mIHRoZSBjb25zb2xlIG5lZWRzIHRvIGJlIGV4cGxpY2l0bHkgc2V0XG4gICAqIHRvIGluY2x1ZGUgRGVidWcgbGV2ZWwgbWVzc2FnZXMuXG4gICAqL1xuICBwdWJsaWMgc2hvd0RlYnVnSW5mb3JtYXRpb24/ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSByZWRpcmVjdCB1cmkgdXNlZCB3aGVuIGRvaW5nIHNpbGVudCByZWZyZXNoLlxuICAgKi9cbiAgcHVibGljIHNpbGVudFJlZnJlc2hSZWRpcmVjdFVyaT8gPSAnJztcblxuICBwdWJsaWMgc2lsZW50UmVmcmVzaE1lc3NhZ2VQcmVmaXg/ID0gJyc7XG5cbiAgLyoqXG4gICAqIFNldCB0aGlzIHRvIHRydWUgdG8gZGlzcGxheSB0aGUgaWZyYW1lIHVzZWQgZm9yXG4gICAqIHNpbGVudCByZWZyZXNoIGZvciBkZWJ1Z2dpbmcuXG4gICAqL1xuICBwdWJsaWMgc2lsZW50UmVmcmVzaFNob3dJRnJhbWU/ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRpbWVvdXQgZm9yIHNpbGVudCByZWZyZXNoLlxuICAgKiBAaW50ZXJuYWxcbiAgICogQGRlcHJlY2F0ZWQgdXNlIHNpbGVudFJlZnJlc2hUaW1lb3V0XG4gICAqL1xuICBwdWJsaWMgc2lsZXRSZWZyZXNoVGltZW91dD86IG51bWJlciA9IDEwMDAgKiAyMDtcblxuICAvKipcbiAgICogVGltZW91dCBmb3Igc2lsZW50IHJlZnJlc2guXG4gICAqL1xuICBwdWJsaWMgc2lsZW50UmVmcmVzaFRpbWVvdXQ/OiBudW1iZXIgPSAxMDAwICogMjA7XG5cbiAgLyoqXG4gICAqIFNvbWUgYXV0aCBzZXJ2ZXJzIGRvbid0IGFsbG93IHVzaW5nIHBhc3N3b3JkIGZsb3dcbiAgICogdy9vIGEgY2xpZW50IHNlY3JldCB3aGlsZSB0aGUgc3RhbmRhcmRzIGRvIG5vdFxuICAgKiBkZW1hbmQgZm9yIGl0LiBJbiB0aGlzIGNhc2UsIHlvdSBjYW4gc2V0IGEgcGFzc3dvcmRcbiAgICogaGVyZS4gQXMgdGhpcyBwYXNzd29yZCBpcyBleHBvc2VkIHRvIHRoZSBwdWJsaWNcbiAgICogaXQgZG9lcyBub3QgYnJpbmcgYWRkaXRpb25hbCBzZWN1cml0eSBhbmQgaXMgdGhlcmVmb3JlXG4gICAqIGFzIGdvb2QgYXMgdXNpbmcgbm8gcGFzc3dvcmQuXG4gICAqL1xuICBwdWJsaWMgZHVtbXlDbGllbnRTZWNyZXQ/OiBzdHJpbmcgPSAnJztcblxuICAvKipcbiAgICogRGVmaW5lcyB3aGV0aGVyIGh0dHBzIGlzIHJlcXVpcmVkLlxuICAgKiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyByZW1vdGVPbmx5IHdoaWNoIG9ubHkgYWxsb3dzXG4gICAqIGh0dHAgZm9yIGxvY2FsaG9zdCwgd2hpbGUgZXZlcnkgb3RoZXIgZG9tYWlucyBuZWVkXG4gICAqIHRvIGJlIHVzZWQgd2l0aCBodHRwcy5cbiAgICovXG4gIHB1YmxpYyByZXF1aXJlSHR0cHM/OiBib29sZWFuIHwgJ3JlbW90ZU9ubHknID0gJ3JlbW90ZU9ubHknO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHdoZXRoZXIgZXZlcnkgdXJsIHByb3ZpZGVkIGJ5IHRoZSBkaXNjb3ZlcnlcbiAgICogZG9jdW1lbnQgaGFzIHRvIHN0YXJ0IHdpdGggdGhlIGlzc3VlcidzIHVybC5cbiAgICovXG4gIHB1YmxpYyBzdHJpY3REaXNjb3ZlcnlEb2N1bWVudFZhbGlkYXRpb24/ID0gdHJ1ZTtcblxuICAvKipcbiAgICogSlNPTiBXZWIgS2V5IFNldCAoaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzc1MTcpXG4gICAqIHdpdGgga2V5cyB1c2VkIHRvIHZhbGlkYXRlIHJlY2VpdmVkIGlkX3Rva2Vucy5cbiAgICogVGhpcyBpcyB0YWtlbiBvdXQgb2YgdGhlIGRpc292ZXJ5IGRvY3VtZW50LiBDYW4gYmUgc2V0IG1hbnVhbGx5IHRvby5cbiAgICovXG4gIHB1YmxpYyBqd2tzPzogb2JqZWN0ID0gbnVsbDtcblxuICAvKipcbiAgICogTWFwIHdpdGggYWRkaXRpb25hbCBxdWVyeSBwYXJhbWV0ZXIgdGhhdCBhcmUgYXBwZW5kZWQgdG9cbiAgICogdGhlIHJlcXVlc3Qgd2hlbiBpbml0aWFsaXppbmcgaW1wbGljaXQgZmxvdy5cbiAgICovXG4gIHB1YmxpYyBjdXN0b21RdWVyeVBhcmFtcz86IG9iamVjdCA9IG51bGw7XG5cbiAgcHVibGljIHNpbGVudFJlZnJlc2hJRnJhbWVOYW1lPyA9ICdhbmd1bGFyLW9hdXRoLW9pZGMtc2lsZW50LXJlZnJlc2gtaWZyYW1lJztcblxuICAvKipcbiAgICogRGVmaW5lcyB3aGVuIHRoZSB0b2tlbl90aW1lb3V0IGV2ZW50IHNob3VsZCBiZSByYWlzZWQuXG4gICAqIElmIHlvdSBzZXQgdGhpcyB0byB0aGUgZGVmYXVsdCB2YWx1ZSAwLjc1LCB0aGUgZXZlbnRcbiAgICogaXMgdHJpZ2dlcmVkIGFmdGVyIDc1JSBvZiB0aGUgdG9rZW4ncyBsaWZlIHRpbWUuXG4gICAqL1xuICBwdWJsaWMgdGltZW91dEZhY3Rvcj8gPSAwLjc1O1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGUgbGliIHdpbGwgdHJ5IHRvIGNoZWNrIHdoZXRoZXIgdGhlIHVzZXJcbiAgICogaXMgc3RpbGwgbG9nZ2VkIGluIG9uIGEgcmVndWxhciBiYXNpcyBhcyBkZXNjcmliZWRcbiAgICogaW4gaHR0cDovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3Qtc2Vzc2lvbi0xXzAuaHRtbCNDaGFuZ2VOb3RpZmljYXRpb25cbiAgICovXG4gIHB1YmxpYyBzZXNzaW9uQ2hlY2tzRW5hYmxlZD8gPSBmYWxzZTtcblxuICAvKipcbiAgICogSW50ZXJ2YWwgaW4gbXNlYyBmb3IgY2hlY2tpbmcgdGhlIHNlc3Npb25cbiAgICogYWNjb3JkaW5nIHRvIGh0dHA6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LXNlc3Npb24tMV8wLmh0bWwjQ2hhbmdlTm90aWZpY2F0aW9uXG4gICAqL1xuICBwdWJsaWMgc2Vzc2lvbkNoZWNrSW50ZXJ2YWxsPyA9IDMgKiAxMDAwO1xuXG4gIC8qKlxuICAgKiBVcmwgZm9yIHRoZSBpZnJhbWUgdXNlZCBmb3Igc2Vzc2lvbiBjaGVja3NcbiAgICovXG4gIHB1YmxpYyBzZXNzaW9uQ2hlY2tJRnJhbWVVcmw/OiBzdHJpbmcgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoZSBpZnJhbWUgdG8gdXNlIGZvciBzZXNzaW9uIGNoZWNrc1xuICAgKi9cbiAgcHVibGljIHNlc3Npb25DaGVja0lGcmFtZU5hbWU/ID0gJ2FuZ3VsYXItb2F1dGgtb2lkYy1jaGVjay1zZXNzaW9uLWlmcmFtZSc7XG5cbiAgLyoqXG4gICAqIFRoaXMgcHJvcGVydHkgaGFzIGJlZW4gaW50cm9kdWNlZCB0byBkaXNhYmxlIGF0X2hhc2ggY2hlY2tzXG4gICAqIGFuZCBpcyBpbmRlbnRlZCBmb3IgSWRlbnRpdHkgUHJvdmlkZXIgdGhhdCBkb2VzIG5vdCBkZWxpdmVyXG4gICAqIGFuIGF0X2hhc2ggRVZFTiBUSE9VR0ggaXRzIHJlY29tbWVuZGVkIGJ5IHRoZSBPSURDIHNwZWNzLlxuICAgKiBPZiBjb3Vyc2UsIHdoZW4gZGlzYWJsaW5nIHRoZXNlIGNoZWNrcyB0aGVuIHdlIGFyZSBieXBhc3NpbmdcbiAgICogYSBzZWN1cml0eSBjaGVjayB3aGljaCBtZWFucyB3ZSBhcmUgbW9yZSB2dWxuZXJhYmxlLlxuICAgKi9cbiAgcHVibGljIGRpc2FibGVBdEhhc2hDaGVjaz8gPSBmYWxzZTtcblxuICAvKipcbiAgICogRGVmaW5lcyB3ZXRoZXIgdG8gY2hlY2sgdGhlIHN1YmplY3Qgb2YgYSByZWZyZXNoZWQgdG9rZW4gYWZ0ZXIgc2lsZW50IHJlZnJlc2guXG4gICAqIE5vcm1hbGx5LCBpdCBzaG91bGQgYmUgdGhlIHNhbWUgYXMgYmVmb3JlLlxuICAgKi9cbiAgcHVibGljIHNraXBTdWJqZWN0Q2hlY2s/ID0gZmFsc2U7XG5cbiAgcHVibGljIHVzZUlkVG9rZW5IaW50Rm9yU2lsZW50UmVmcmVzaD8gPSBmYWxzZTtcblxuICAvKipcbiAgICogRGVmaW5lZCB3aGV0aGVyIHRvIHNraXAgdGhlIHZhbGlkYXRpb24gb2YgdGhlIGlzc3VlciBpbiB0aGUgZGlzY292ZXJ5IGRvY3VtZW50LlxuICAgKiBOb3JtYWxseSwgdGhlIGRpc2NvdmV5IGRvY3VtZW50J3MgdXJsIHN0YXJ0cyB3aXRoIHRoZSB1cmwgb2YgdGhlIGlzc3Vlci5cbiAgICovXG4gIHB1YmxpYyBza2lwSXNzdWVyQ2hlY2s/ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEFjY29yZGluZyB0byByZmM2NzQ5IGl0IGlzIHJlY29tbWVuZGVkIChidXQgbm90IHJlcXVpcmVkKSB0aGF0IHRoZSBhdXRoXG4gICAqIHNlcnZlciBleHBvc2VzIHRoZSBhY2Nlc3NfdG9rZW4ncyBsaWZlIHRpbWUgaW4gc2Vjb25kcy5cbiAgICogVGhpcyBpcyBhIGZhbGxiYWNrIHZhbHVlIGZvciB0aGUgY2FzZSB0aGlzIHZhbHVlIGlzIG5vdCBleHBvc2VkLlxuICAgKi9cbiAgcHVibGljIGZhbGxiYWNrQWNjZXNzVG9rZW5FeHBpcmF0aW9uVGltZUluU2VjPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBmaW5hbCBzdGF0ZSBzZW50IHRvIGlzc3VlciBpcyBidWlsdCBhcyBmb2xsb3dzOlxuICAgKiBzdGF0ZSA9IG5vbmNlICsgbm9uY2VTdGF0ZVNlcGFyYXRvciArIGFkZGl0aW9uYWwgc3RhdGVcbiAgICogRGVmYXVsdCBzZXBhcmF0b3IgaXMgJzsnIChlbmNvZGVkICUzQikuXG4gICAqIEluIHJhcmUgY2FzZXMsIHRoaXMgY2hhcmFjdGVyIG1pZ2h0IGJlIGZvcmJpZGRlbiBvciBpbmNvbnZlbmllbnQgdG8gdXNlIGJ5IHRoZSBpc3N1ZXIgc28gaXQgY2FuIGJlIGN1c3RvbWl6ZWQuXG4gICAqL1xuICBwdWJsaWMgbm9uY2VTdGF0ZVNlcGFyYXRvcj8gPSAnOyc7XG5cbiAgLyoqXG4gICAqIFNldCB0aGlzIHRvIHRydWUgdG8gdXNlIEhUVFAgQkFTSUMgYXV0aCBmb3IgQUpBWCBjYWxsc1xuICAgKi9cbiAgcHVibGljIHVzZUh0dHBCYXNpY0F1dGg/ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSB3aW5kb3cgb2YgdGltZSAoaW4gc2Vjb25kcykgdG8gYWxsb3cgdGhlIGN1cnJlbnQgdGltZSB0byBkZXZpYXRlIHdoZW4gdmFsaWRhdGluZyBpZF90b2tlbidzIGlhdCBhbmQgZXhwIHZhbHVlcy5cbiAgICovXG4gIHB1YmxpYyBjbG9ja1NrZXdJblNlYz86IG51bWJlcjtcblxuICAvKipcbiAgICogRGVjcmVhc2VzIHRoZSBFeHBpcmF0aW9uIHRpbWUgb2YgdG9rZW5zIGJ5IHRoaXMgbnVtYmVyIG9mIHNlY29uZHNcbiAgICovXG4gIHB1YmxpYyBkZWNyZWFzZUV4cGlyYXRpb25CeVNlYz8gPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgaW50ZXJjZXB0b3JzIHdhaXRzIHRoaXMgdGltZSBzcGFuIGlmIHRoZXJlIGlzIG5vIHRva2VuXG4gICAqL1xuICBwdWJsaWMgd2FpdEZvclRva2VuSW5Nc2VjPyA9IDA7XG5cbiAgLyoqXG4gICAqIFNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgdG8gdXNlIHNpbGVudCByZWZyZXNoIHRvZ2V0aGVyIHdpdGhcbiAgICogY29kZSBmbG93LiBBcyBzaWxlbnQgcmVmcmVzaCBpcyB0aGUgb25seSBvcHRpb24gZm9yIHJlZnJlc2hpbmdcbiAgICogd2l0aCBpbXBsaWNpdCBmbG93LCB5b3UgZG9uJ3QgbmVlZCB0byBleHBsaWNpdGx5IHR1cm4gaXQgb24gaW5cbiAgICogdGhpcyBjYXNlLlxuICAgKi9cbiAgcHVibGljIHVzZVNpbGVudFJlZnJlc2g/O1xuXG4gIC8qKlxuICAgKiBDb2RlIEZsb3cgaXMgYnkgZGVmYXVsZCB1c2VkIHRvZ2V0aGVyIHdpdGggUEtDSSB3aGljaCBpcyBhbHNvIGhpZ2x5IHJlY29tbWVudGVkLlxuICAgKiBZb3UgY2FuIGRpc2JhbGUgaXQgaGVyZSBieSBzZXR0aW5nIHRoaXMgZmxhZyB0byB0cnVlLlxuICAgKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzYzNiNzZWN0aW9uLTEuMVxuICAgKi9cbiAgcHVibGljIGRpc2FibGVQS0NFPyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBTZXQgdGhpcyB0byB0cnVlIHRvIHByZXNlcnZlIHRoZSByZXF1ZXN0ZWQgcm91dGUgaW5jbHVkaW5nIHF1ZXJ5IHBhcmFtZXRlcnMgYWZ0ZXIgY29kZSBmbG93IGxvZ2luLlxuICAgKiBUaGlzIHNldHRpbmcgZW5hYmxlcyBkZWVwIGxpbmtpbmcgZm9yIHRoZSBjb2RlIGZsb3cuXG4gICAqL1xuICBwdWJsaWMgcHJlc2VydmVSZXF1ZXN0ZWRSb3V0ZT8gPSBmYWxzZTtcblxuICAvKipcbiAgICogQWxsb3dzIHRvIGRpc2FibGUgdGhlIHRpbWVyIGZvciB0aGUgaWRfdG9rZW4gdXNlZFxuICAgKiBmb3IgdG9rZW4gcmVmcmVzaFxuICAgKi9cbiAgcHVibGljIGRpc2FibGVJZFRva2VuVGltZXI/ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEJsb2NrcyBvdGhlciBvcmlnaW5zIHJlcXVlc3RpbmcgYSBzaWxlbnQgcmVmcmVzaFxuICAgKi9cbiAgcHVibGljIGNoZWNrT3JpZ2luPyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGpzb24/OiBQYXJ0aWFsPEF1dGhDb25maWc+KSB7XG4gICAgaWYgKGpzb24pIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcywganNvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgcHJvcGVydHkgYWxsb3dzIHlvdSB0byBvdmVycmlkZSB0aGUgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBvcGVuIHRoZSBsb2dpbiB1cmwsXG4gICAqIGFsbG93aW5nIGEgd2F5IGZvciBpbXBsZW1lbnRhdGlvbnMgdG8gc3BlY2lmeSB0aGVpciBvd24gbWV0aG9kIG9mIHJvdXRpbmcgdG8gbmV3XG4gICAqIHVybHMuXG4gICAqL1xuICBwdWJsaWMgb3BlblVyaT86ICh1cmk6IHN0cmluZykgPT4gdm9pZCA9ICh1cmkpID0+IHtcbiAgICBsb2NhdGlvbi5ocmVmID0gdXJpO1xuICB9O1xufVxuIl19