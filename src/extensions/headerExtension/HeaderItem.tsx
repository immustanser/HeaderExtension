import * as React from 'react';
import { ISubCategory } from '../../models/INavigation';
import styles from './Header.module.scss';
import { IHeaderProps } from './IHeaderProps';
import SubCategories from './SubCategories';



export default class HeaderItem extends React.Component<any, {}> {

  public render(): React.ReactElement<IHeaderProps> {
    return (
      <div className={styles.Category}>
        {this.props.item.name}
        <div className={styles.SubCategory}>
          {this.props.item.IsubCategories.map((categoriesDate: ISubCategory) => {
            return <SubCategories categoriesDate={categoriesDate}></SubCategories>;
          })}
        </div>
      </div>
    );
  }
}
