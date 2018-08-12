import * as AuthenticationContext from 'adal-angular';


export default class AuthService {

    private authContext: AuthenticationContext;
    private config: AuthenticationContext.Options;
    private resourceId: string;

    // TODO: Pass in tenant, clientId, and endpoints collection
    constructor() {

        this.resourceId = '63029ef5-80fc-43be-b586-6cd4053f85c2';//this.config.endpoints['reMgr'];
        this.config = {
            tenant: 'bgtest18.onmicrosoft.com',
            clientId: '82deab78-7ff2-4e90-baec-83206f937e50',
            redirectUri: 'http://localhost:8080',
            cacheLocation: 'localStorage'
        };
        this.authContext = new AuthenticationContext(this.config);

    }

    public getToken(): Promise<string> {

        return new Promise<string>((resolve, reject) => {

            if (this.ensureLogin()) {

                let cachedToken = this.authContext.getCachedToken(this.resourceId);
                if (cachedToken) {
                    resolve(cachedToken);
                } else {
                    this.authContext.acquireToken(
                        this.resourceId,
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

        if (isCallback && !this.authContext.getLoginError()) {
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