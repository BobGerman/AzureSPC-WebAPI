import { IReProperty } from '../model/IReProperty';
import { IReManagerService } from './IReManagerService';
import AuthService from './AuthService';

export default class MockReManagerService implements IReManagerService {
    
    public getReProperties (clientId: string, 
                            endpointUrl: string):
        Promise<IReProperty[] | string> {

        return new Promise<IReProperty[]> ((resolve, reject) => {

            const authSvc = new AuthService();
            authSvc.getToken()
            .then((token) => {
                resolve ([
                    {
                        "id": 1,
                        "name": 'TOKEN: ' + token,
                        "address": "5 Happy Street",
                        "unit": "",
                        "city": "Burlington",
                        "state": "MA",
                        "postalCode": "01803",
                        "country": null,
                        "purchaseDate": "2010-12-03T00:00:00",
                        "purchaseAmount": 344000,
                        "isForSale": false,
                        "isForRent": false
                    }
                ]);
            })
            .catch((error) => {
                resolve ([
                    {
                        "id": 1,
                        "name": 'ERROR: ' + error,
                        "address": "5 Progress Road",
                        "unit": "",
                        "city": "Burlington",
                        "state": "MA",
                        "postalCode": "01803",
                        "country": null,
                        "purchaseDate": "2010-12-03T00:00:00",
                        "purchaseAmount": 344000,
                        "isForSale": false,
                        "isForRent": false
                    }
                ]);
            })

        });

    }

}