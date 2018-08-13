import { IReProperty } from './model/IReProperty';
import { ReManagerServiceFactory } from './services/ReManagerServiceFactory';
import ComponentManager from './components/ComponentManager';

export class bootstrapper {

  public onInit(): void {

    const workspace = document.getElementById('spaContainer');
    // Hard-coded for now
    const tenant = 'bgtest18.onmicrosoft.com';
    const clientId = '82deab78-7ff2-4e90-baec-83206f937e50';
    const resourceId = '63029ef5-80fc-43be-b586-6cd4053f85c2';
    const endpointUrl = 'https://remgrwebapirg6mawh7cyslk.azurewebsites.net';

    if (workspace) {

      const service = ReManagerServiceFactory.getService(false);
      service.getReProperties(tenant, clientId, resourceId, endpointUrl)
        .then ((data: IReProperty[]) => {
          ComponentManager.render(workspace, workspace, data);
        })
        .catch ((error: string) => {
          console.log(`Error in CustomHeaderFooterApplicationCustomizer: ${error}`);
        });
  
    } else {

      // The elemement we want to attach to is missing
      console.log('Error in CustomHeaderFooterApplicationCustomizer: Unable to find element to attach header and footer');
      
    }
  }
}

// In-line code starts here
(() => {
  let b = new bootstrapper();
  b.onInit();  
})();
