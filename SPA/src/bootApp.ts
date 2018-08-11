import { IReProperty } from './model/IReProperty';
import { ReManagerServiceFactory } from './services/ReManagerServiceFactory';
import ComponentManager from './components/ComponentManager';

export class bootstrapper {

  public onInit(): void {

    // Create the div elements to hold the header and footer
    const header = document.createElement("div");
    const footer = document.createElement("div");

    // Insert the header and footer on the page
    const workspace = document.getElementById('spaContainer');
    if (workspace) {

      // Get the header and footer data and render it
      const service = ReManagerServiceFactory.getService(true);
      service.getReProperties(null, null)
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
