import * as React from 'react';
import styles from './Header.module.scss';
import { IHeaderProps } from './IHeaderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp";    
import "@pnp/sp/webs";    
import "@pnp/sp/lists/web";    
import "@pnp/sp/items/list"; 
import { SPComponentLoader } from '@microsoft/sp-loader';
import { ICategory } from '../../models/INavigation';
import HeaderItem from './HeaderItem';
import Constants from '../../common/constants';
import ListDataManager from '../../managers/list.data.manager';


export default class Header extends React.Component<IHeaderProps, {}> {
  
  constructor(props:IHeaderProps){
    super(props)
    
  }

  public state = {
    isLoading: false,
    hasErrors: false,
    errors: null,
    items: null,
  };
 
  
  public render(): React.ReactElement<IHeaderProps> {
    return (
      <div className={ styles.header }>
      {/* <img className={styles.numrex_image} src={require('./Images/numrex.png')} /> */}
          {/* <h3>{this.props.listName || Constants.Defaults.Header.listName}</h3> */}

          {this.state.isLoading
          ?
          this.renderLoader()
          :
          this.renderListData()
          }
          <div className={styles.clear}></div>
      </div>
    );
  }


  private renderLoader() {
    return (
      <div className={styles.loader}>
      
      </div>
    );
    3
  }

  private renderListData() {
    return (
      <div className={styles.mainHeader}>
          {this.state.hasErrors
            ?
            this.renderError()
            :
            this.state.items && this.state.items.map((item: ICategory, key: any) => {
              return <HeaderItem item={item} key={key}></HeaderItem>;
            })
          }
      </div>

    );
  }

  private renderError() {
    return (
      <div className={styles.error}>{this.state.errors}</div>
    );
  }

  public componentDidMount() {

    this.loadListData();
  }

  private async loadListData() {
    try {
      this.setState({ isLoading: true, hasErrors: false });
      let listName = this.props.HeaderListName || Constants.Defaults.Header.listName;
      let list = await ListDataManager.getHeaderData(listName);

      this.setState({
        isLoading: false,
        items: list
      });
    } catch (error) {
      console.log('Get List data error: ', error);
      this.setState({
        isLoading: false,
        hasErrors: true,
        errors: Constants.Errors.ListError
      });
    }
  }


}


