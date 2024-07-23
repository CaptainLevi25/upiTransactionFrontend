import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fab } from '@mui/material';
import { Add, AddBox, AddIcCallRounded } from '@mui/icons-material';
import axios from 'axios';

export default function FormDialog({fetchAllTransaction, fetchCategoryData}) {
  const {_id} =  JSON.parse(localStorage.getItem('user'));
  const [name,setname] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [isFormValid, setIsFormValid] = React.useState(false);
  React.useEffect(() => {
    const validateForm = () => {
    
      const isname = !!name
      setIsFormValid(isname);
    };
    validateForm();

  }, [name]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlesave = async()=>{
    try {
       const res =  name && await axios.post("http://localhost:8000/postcategories", {
        name : name,
       // user : "669d6167c5f101403e870ee9"
        user : _id

       })
       console.log(res);
       fetchAllTransaction();
        fetchCategoryData();
       setOpen(false);
    } catch (error) {
        console.log("error in saving category" , error);
    }
  }

  return (
    <React.Fragment>
    <Fab color="primary" aria-label="add" onClick={handleClickOpen} size='large'>
    <Add  />
    </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
         // component: 'form',
          // onSubmit: (event) => {
          //   event.preventDefault();
          //   const formData = new FormData(event.currentTarget);
          //   const formJson = Object.fromEntries(formData.entries());
          //   const email = formJson.email;
          //   console.log(email);
          //   handleClose();
          // },
        }}
      >
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
       
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="category"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e)=>setname(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button  disabled={!isFormValid} onClick={handlesave}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
