import * as AuthenticationContext from 'adal-angular';


export default class AuthService {

    private authContext: AuthenticationContext = null;
    private config: AuthenticationContext.Options = null;

    // TODO: Pass in tenant, clientId, and endpoints collection
    constructor() {

        this.config = {
            tenant: 'a25d4ef1-c73a-4dc1-bdb1-9a342260f216',
            clientId: '82deab78-7ff2-4e90-baec-83206f937e50',
            endpoints: {
                'reMgr': 'https://remanagerws.azurewebsites.net'
            },
            redirectUri: 'http://localhost:8080',
            cacheLocation: 'localStorage'
        };
        this.authContext = new AuthenticationContext(this.config);

    }

    // Pass client id etc here:
    public getToken(): Promise<string> {

        return new Promise<string>((resolve, reject) => {

            if (this.ensureLogin()) {
                const endpoint = this.config.endpoints['reMgr'];

                let cachedToken = this.authContext.getCachedToken(endpoint);
                if (cachedToken) {
                    resolve(cachedToken);
                } else {
                    this.authContext.acquireToken(
                        endpoint,
                        (error, acquiredToken) => {
                            if (error || !acquiredToken) {
                                reject(error);
                            } else {
                                resolve(acquiredToken);
                            }
                        }
                    );
                }
            } else {
                reject(`Login error: ${this.authContext.getLoginError()}`);
            }
        });

    }

    private ensureLogin(): boolean {

        var isCallback = this.authContext.isCallback(window.location.hash);
        if (isCallback && this.authContext.getLoginError()) {
            this.authContext.handleWindowCallback(window.location.hash);
        } else {
            var user = this.authContext.getCachedUser();
            if (!user) {
                this.authContext.login();
            } else {
                return true;
            }
        }
        return false;
    }

}