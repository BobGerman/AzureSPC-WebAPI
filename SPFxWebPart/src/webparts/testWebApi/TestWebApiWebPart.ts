import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TestWebApiWebPartStrings';
import TestWebApi from './components/TestWebApi';
import { ITestWebApiProps } from './components/ITestWebApiProps';
import Exception from './components/Exception';
import { IExceptionProps } from './components/IExceptionProps';

import { IReProperty } from './model/IReProperty';
import { IReManagerService } from './service/IReManagerService';
import { ReManagerServiceFactory } from './service/ReManagerServiceFactory';

export interface ITestWebApiWebPartProps {
  clientId: string;
  endpointUrl: string;
}

export default class TestWebApiWebPart extends BaseClientSideWebPart<ITestWebApiWebPartProps> {

  public render(): void {

    const service = ReManagerServiceFactory.getService(Environment.type);

    if (this.properties.clientId && this.properties.endpointUrl) {
      service.getReProperties(this.context,
        this.context.serviceScope,
        this.properties.clientId,
        this.properties.endpointUrl)
        .then((reProperties: IReProperty[]) => {

          const element: React.ReactElement<ITestWebApiProps> = React.createElement(
            TestWebApi,
            {
              reProperties: reProperties
            }
          );

          ReactDom.render(element, this.domElement);
        })
        .catch((message: string) => {
          const element: React.ReactElement<IExceptionProps> = React.createElement(
            Exception,
            {
              message: message
            }
          );
          ReactDom.render(element, this.domElement);
        });
    } else {
      const element: React.ReactElement<IExceptionProps> = React.createElement(
        Exception,
        {
          message: 'Please edit the web part and enter the client ID and endpoint URL'
        }
      );
      ReactDom.render(element, this.domElement);
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('clientId', {
                  label: strings.ClientIdFieldLabel
                }),
                PropertyPaneTextField('endpointUrl', {
                  label: strings.EndpointUrlFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
