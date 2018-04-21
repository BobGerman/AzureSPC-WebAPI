declare interface ITestWebApiWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ClientIdFieldLabel: string;
  EndpointUrlFieldLabel: string;
  DataSourceFieldLabel: string;
  MockDataSourceLabel: string;
  SqlDataSourceLabel: string;
}

declare module 'TestWebApiWebPartStrings' {
  const strings: ITestWebApiWebPartStrings;
  export = strings;
}
