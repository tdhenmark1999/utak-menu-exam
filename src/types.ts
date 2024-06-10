export interface MenuItemBase {
    category: string;
    name: string;
    options?: string;
    price: number;
    cost: number;
    stock: number;
  }
  
  export interface MenuItem extends MenuItemBase {
    id: string;
  }
  
  export interface MenuItemInitial extends MenuItemBase {
    id?: string;
  }
  