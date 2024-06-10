import React from 'react';
import { MenuItem as MenuItemType } from '../types';

interface MenuItemProps {
  item: MenuItemType;
  updateItem: (id: string, item: MenuItemType) => void;
  deleteItem: (id: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, updateItem, deleteItem }) => {
  return (
    <div>
      <h3>{item.name}</h3>
      <p>Category: {item.category}</p>
      <p>Options: {item.options}</p>
      <p>Price: {item.price}</p>
      <p>Cost: {item.cost}</p>
      <p>Amount in Stock: {item.stock}</p>
      <button onClick={() => updateItem(item.id, item)}>Edit</button>
      <button onClick={() => deleteItem(item.id)}>Delete</button>
    </div>
  );
};

export default MenuItem;
