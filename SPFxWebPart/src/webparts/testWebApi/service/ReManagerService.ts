import { IReProperty } from '../model/IReProperty';
import { IReManagerService } from './IReManagerService';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';

import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';

export default class ReManagerService implements IReManagerService {
    
    public getReProperties (context: IWebPartContext,
                            serviceScope: ServiceScope,
                            clientId: string,
                            endpointUrl: string):
        Promise<IReProperty[] | string> {
        
        var aadClient: AadHttpClient =
            new AadHttpClient(serviceScope, clientId);

        const result = new Promise<IReProperty[] | string>((resolve, reject) => {

            aadClient.get(endpointUrl, AadHttpClient.configurations.v1)
            .then((res: any): Promise<any> => {
                if (!res.ok) {
                    throw {
                        message: "Error " + res.status + " - " + res.statusText
                    };
                }
                return res.json();
            })
            .then((reProperties: IReProperty[]): void => {
                 resolve(reProperties);
            })
            .catch((error: any)=> {
                reject(error.message);
            });
        });

        return result;
    }

}