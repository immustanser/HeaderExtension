export interface INavigation {
  categories: ICategory[];
}

export interface ICategory {
  name: string;
  IsubCategories: ISubCategory[];
}

export interface ISubCategory {
  subCatName: string;
  menuItems:IMenuItem[];
}

export interface IMenuItem {
  title: string;
  url: string
}
