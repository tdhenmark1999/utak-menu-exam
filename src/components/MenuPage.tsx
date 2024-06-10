import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, onValue, push, update, remove } from 'firebase/database';
import MenuItemList from './MenuItemList';
import { MenuItem, MenuItemInitial } from '../types';

const MenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const menuRef = ref(database, 'menuItems');
    onValue(menuRef, (snapshot) => {
      const items = snapshot.val();
      const itemList: MenuItem[] = [];
      for (let id in items) {
        itemList.push({ id, ...items[id] });
      }
      setMenuItems(itemList);
    });
  }, []);

  const addItem = (item: MenuItemInitial) => {
    const menuRef = ref(database, 'menuItems');
    push(menuRef, item);
  };

  const updateItem = (id: string, updatedItem: MenuItemInitial) => {
    const itemRef = ref(database, `menuItems/${id}`);
    console.log('Updating item:', updatedItem);
    update(itemRef, updatedItem);
  };

  const deleteItem = (id: string) => {
    const itemRef = ref(database, `menuItems/${id}`);
    remove(itemRef);
  };

  return (
    <div className='container'>
      <h1>Restaurant Menu Management</h1>
      <MenuItemList items={menuItems} addItem={addItem} updateItem={updateItem} deleteItem={deleteItem} />
    </div>
  );
};

export default MenuPage;
