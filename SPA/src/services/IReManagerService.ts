import { IReProperty } from '../model/IReProperty';

export interface IReManagerService {
    getReProperties(clientId: string,
                    endpointUrl: string):
        Promise<IReProperty[] | string>;
}
