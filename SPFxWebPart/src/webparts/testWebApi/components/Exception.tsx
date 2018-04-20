import * as React from 'react';
import styles from './TestWebApi.module.scss';
import { IExceptionProps } from './IExceptionProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Exception extends React.Component<IExceptionProps, {}> {
  public render(): React.ReactElement<IExceptionProps> {
    return (
      <div className={ styles.testWebApi }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <span className={ styles.exceptionColumn }>
              { escape(this.props.message) }
            </span>
          </div>
        </div>
      </div>
    );
  }
}
