import React, { useState } from 'react';
import { MenuItem as MenuItemType, MenuItemInitial } from '../types';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItemForm from './MenuItemForm';

interface MenuItemListProps {
  items: MenuItemType[];
  addItem: (item: MenuItemInitial) => void;
  updateItem: (id: string, item: MenuItemInitial) => void;
  deleteItem: (id: string) => void;
}

const MenuItemList: React.FC<MenuItemListProps> = ({ items, addItem, updateItem, deleteItem }) => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MenuItemInitial | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleClickOpen = () => {
    setCurrentItem(undefined); // Reset current item for new item creation
    setOpen(true);
  };

  const handleEditOpen = (item: MenuItemType) => {
    setCurrentItem(item); // Set current item for editing
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmOpen = (id: string) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteItem(deleteId);
      handleConfirmClose();
    }
  };

  const handleFormSubmit = (item: MenuItemInitial) => {
    if (currentItem && currentItem.id) {
      console.log('Updating item with id:', currentItem.id);
      updateItem(currentItem.id, item);
    } else {
      console.log('Adding new item');
      addItem(item);
    }
    handleClose();
  };

  return (
    <div>
        <div className='btn-add-container'>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
            Add Menu
          </Button>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{currentItem ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
          <DialogContent>
            <MenuItemForm addItem={handleFormSubmit} updateItem={updateItem} existingItem={currentItem} onClose={handleClose} />
          </DialogContent>
       
        </Dialog>
        <Dialog open={confirmOpen} onClose={handleConfirmClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this item?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <TableCell className="table-header">Category</TableCell>
                <TableCell className="table-header">Name</TableCell>
                <TableCell className="table-header">Options</TableCell>
                <TableCell className="table-header">Price</TableCell>
                <TableCell className="table-header">Cost</TableCell>
                <TableCell className="table-header">Stock</TableCell>
                <TableCell className="table-header">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id} className={index % 2 === 0 ? 'table-row' : ''}>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.options}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.cost}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditOpen(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleConfirmOpen(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
};

export default MenuItemList;
