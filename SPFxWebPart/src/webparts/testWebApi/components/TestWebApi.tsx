import * as React from 'react';
import styles from './TestWebApi.module.scss';
import { ITestWebApiProps } from './ITestWebApiProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class TestWebApi extends React.Component<ITestWebApiProps, {}> {
  public render(): React.ReactElement<ITestWebApiProps> {
    return (
      <div className={ styles.testWebApi }>
        <div className={ styles.container }>
          { this.props.reProperties.map(p => (
          <div className={ styles.row }>
            <span className={ styles.column }>{escape(p.name)}</span>
            <span className={ styles.column }>{escape(p.address)}</span>
            <span className={ styles.column }>{escape(p.city)},
              {escape(p.state)} {escape(p.postalCode)}
            </span>
          </div>
          )) }
        </div>
      </div>
    );
  }
}
