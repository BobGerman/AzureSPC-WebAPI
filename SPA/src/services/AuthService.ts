import * as AuthenticationContext from 'adal-angular';

// TODO: Make it dynamic, not hard-coded values
const config: AuthenticationContext.Options =
{
    tenant: 'a25d4ef1-c73a-4dc1-bdb1-9a342260f216',
    clientId: '82deab78-7ff2-4e90-baec-83206f937e50',
    endpoints: {
        'reMgr': 'https://remanagerws.azurewebsites.net'
    },
    cacheLocation: 'localStorage'
};

// TODO:
// ??? WHY did articles say I needed this ???
// Hack to get a reference to ADAL, which is not CommonJS friendly
// declare const window: any;
// let adal: AuthenticationContext = window.AuthenticationContext;

export default class AuthService {

    private authContext: AuthenticationContext = null;

    // Pass client id etc here:
    public getToken(): Promise<string> {
        return new Promise<string>((resolve, reject) => {

            const endpoint = config.endpoints['reMgr'];
            this.authContext = new AuthenticationContext(config);

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
                )
            }
        })
    }
}