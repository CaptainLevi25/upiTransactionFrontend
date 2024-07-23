import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  IconButton,
  Icon,
  styled,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { Add, AddCircle } from "@mui/icons-material";

//const categoriesArray = ["Category 1", "Category 2", "Category 3"];

export default function Transaction({cats,fetchAllTransaction, fetchCategoryData}) {
  const {_id} =  JSON.parse(localStorage.getItem('user'));
  const [categoriesArray,setcategoriesArray] = useState (Array.from(cats).map(itm=>itm.name))
  const [open, setOpen] = useState(false);
  const [desc, setdesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState(categoriesArray);

  const [isFormValid, setIsFormValid] = useState(false);
useEffect(()=>{
 console.log("cats",cats); 
  setcategoriesArray(Array.from(cats).map(itm=>itm.name));
},[cats])
useEffect(()=>{
  setCategories(categoriesArray);
  
},[categoriesArray])
const StyledIconButton = styled(IconButton)(({ theme }) => ({

  backgroundColor: '#2146FF', // Blue background color
  color: '#fff', // White icon color
  borderRadius: '50%', // Make it circular
  width: 56, // Large width
  height: 56, // Large height
  
  '&:hover': {
    backgroundColor: '#1976D2', // Darker blue on hover
  },
}));
    
  useEffect(() => {
    const validateForm = () => {
      const isCategoryValid =
        (category && !newCategory) || (!category && newCategory);
      const isAmountValid = !!amount && !!desc;
      setIsFormValid(isCategoryValid && isAmountValid);
    };

    validateForm();
  }, [amount, category, newCategory, desc]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [load, setload] = useState(false);
  const handleSave = async () => {
    try {
      if (newCategory && !categories.includes(newCategory)) {
        setCategories([...categories, newCategory]);
      }
      setload(true);
      // Save form data logic here
      console.log(amount,category);
     const res =  await axios.post("http://localhost:8000/maketransactions", {
        amount: amount,
        description: desc,
        party: "Anil",
        type: "UPI",
        categoryName: category || newCategory,
      //  user: "669d6167c5f101403e870ee9",
        user: _id,

      });
      console.log("resposne", res);
      fetchAllTransaction();
       fetchCategoryData();
    } catch (e) {
      console.log("error in creating transaction", e);
    } finally {
      setload(false);
      setOpen(false);
    }
  };

  return (
    <div>
        
        <StyledIconButton onClick={handleClickOpen} className=" shadow-2xl">
            <Add />
        </StyledIconButton>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Payment History</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Short Description"
            fullWidth
            variant="outlined"
            value={desc}
            onChange={(e) => {
              setdesc(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Category"
            select
            fullWidth
            variant="outlined"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setNewCategory("");
            }}
            disabled={!!newCategory}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="New Category (if not listed)"
            fullWidth
            variant="outlined"
            value={newCategory}
            onChange={(e) => {
              setNewCategory(e.target.value);
              setCategory("");
            }}
            disabled={!!category}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!isFormValid}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
