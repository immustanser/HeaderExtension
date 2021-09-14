import { ICategory, IMenuItem, INavigation, ISubCategory } from "../models/INavigation";
import { sp } from "@pnp/sp";    
import "@pnp/sp/webs";    
import "@pnp/sp/lists/web";    
import "@pnp/sp/items/list"; 
import { SPComponentLoader } from '@microsoft/sp-loader';
import IHeader from "../models/IHeader";
import Constants from "../common/constants";
import { Web } from "@pnp/sp/webs";


export default class ListDataManager{


    public static async getHeaderData(listName:string):Promise<ICategory[]>{

        let navCategories:ICategory[] = [];
        // let list = sp.web.lists.getByTitle(listName).items;
        // let items : any[] = await list.get();

        let web = Web(Constants.Defaults.GlobalSiteURL);
        let list = web.lists.getByTitle(Constants.Defaults.Header.listName).items;
        const items: any[] = await list.get();
        console.log("items;", items);

        items.map((item:any)=>{
           let menuItem: IMenuItem = { title : item.Title, url : item.PageLink.Url  };
           let navSubCategories :ISubCategory = {subCatName : item.SubCategory, menuItems:[menuItem]};
        //    var subCatObj = navSubCategoriesObj.filter(p=>{p.subCatName == item.SubCategory, p.menuItems == [menuItem]})
           var navCat = navCategories.filter(p=>p.name == item.Category );
           
            if(navCat && navCat.length > 0)
            {
                navCat[0].IsubCategories.push(navSubCategories);
                // if(subCatObj && subCatObj.length>0)
                // {
                //     subCatObj[0].menuItems.push(menuItem);
                // }
                
            }
            else{
                var navSubCat:ISubCategory = {subCatName : item.SubCategory, menuItems:[]}
                navSubCat.menuItems.push(menuItem);
                var cat: ICategory = { name : item.Category, IsubCategories:[]};
                cat.IsubCategories.push(navSubCat);
                navCategories.push(cat);
            }

           
        })

        console.log("Data", navCategories);
        return navCategories;

    }



}