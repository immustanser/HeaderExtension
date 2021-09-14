import * as React from 'react';
import { IMenuItem } from '../../models/INavigation';
import styles from './Header.module.scss';
import { IHeaderProps } from './IHeaderProps';
import MenuItems from './MenuItems';




export default class SubCategories extends React.Component<any, {}> {

  public render(): React.ReactElement<IHeaderProps> {
    return (

      <div className={styles.SubCategory}>
        <button>{this.props.categoriesDate.subCatName}</button>
        <div className={styles.MenuItemsCss}>
           {this.props.categoriesDate.menuItems.map((menuItemsData: IMenuItem) => {
                  return <MenuItems menuItemsData={menuItemsData}></MenuItems>
                })}
        </div>
      </div>

    );
  }
}
