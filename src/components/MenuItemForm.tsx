import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MenuItemInitial } from '../types';
import { TextField, Button } from '@mui/material';

interface MenuItemFormProps {
  addItem: (item: MenuItemInitial) => void;
  updateItem?: (id: string, item: MenuItemInitial) => void;
  existingItem?: MenuItemInitial;
  onClose?: () => void;
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({ addItem, updateItem, existingItem, onClose }) => {
  const formik = useFormik({
    initialValues: existingItem || {
      category: '',
      name: '',
      options: '',
      price: 0,
      cost: 0,
      stock: 0,
    },
    validationSchema: Yup.object({
      category: Yup.string().required('Required'),
      name: Yup.string().required('Required'),
      price: Yup.number().required('Required').min(0, 'Price cannot be negative'),
      cost: Yup.number().required('Required').min(0, 'Cost cannot be negative'),
      stock: Yup.number().required('Required').min(0, 'Stock cannot be negative'),
    }),
    onSubmit: (values) => {
      if (existingItem && existingItem.id) {
        console.log('Updating item:', values);
        if (updateItem) {
          updateItem(existingItem.id, values);
        } else {
          console.error('updateItem function is not defined');
        }
      } else {
        console.log('Adding new item:', values);
        addItem(values);
      }
      formik.resetForm();
      if (onClose) {
        onClose();
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        label="Category"
        name="category"
        value={formik.values.category}
        onChange={formik.handleChange}
        error={formik.touched.category && Boolean(formik.errors.category)}
        helperText={formik.touched.category && formik.errors.category}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Options"
        name="options"
        value={formik.values.options}
        onChange={formik.handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Price"
        name="price"
        type="number"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Cost"
        name="cost"
        type="number"
        value={formik.values.cost}
        onChange={formik.handleChange}
        error={formik.touched.cost && Boolean(formik.errors.cost)}
        helperText={formik.touched.cost && formik.errors.cost}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Amount in Stock"
        name="stock"
        type="number"
        value={formik.values.stock}
        onChange={formik.handleChange}
        error={formik.touched.stock && Boolean(formik.errors.stock)}
        helperText={formik.touched.stock && formik.errors.stock}
      />
      <div className='form-btn-container'>
        <Button color="primary" variant="contained"  type="submit">
          {existingItem ? 'Update' : 'Add'} Item
        </Button>
        <Button color="error" variant="contained" onClick={onClose}>
            Cancel
        </Button>
      </div>
    </form>
  );
};

export default MenuItemForm;
