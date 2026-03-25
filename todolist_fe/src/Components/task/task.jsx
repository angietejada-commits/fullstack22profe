
import { useState, useEffect } from "react"
import taskService from "../../Services/taskService.js"


import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


function Task(){


  const [formTask, setFormTask] = useState({  
    title: "",
    description: "", 
  })
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function createTask(){     
    if(formTask.title === "" || formTask.description === ""){
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 2000)
      return
    }
    console.log(formTask)
    const data = await taskService.createTask(formTask)  
    console.log(data)
    handleClose()
  }


  const handleChangeForm = (e)=>{
    setFormTask({
      ...formTask,
      [e.target.name]: e.target.value
    })
  }


  useEffect(() => {
    async function getTasks(){
      const data = await taskService.getTasks()
      console.log(data.data)
    }
    getTasks()
  }, [formTask])
  
  return(
    <>        
     <Button variant="outlined" onClick={handleClickOpen}>
        Crear Tarea
     </Button>       
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Crear una tarea
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 1,
            top: 1,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
           <TextField onChange={handleChangeForm} name="title" label="Titulo" fullWidth margin="dense" variant="outlined" />
           <TextField onChange={handleChangeForm} name="description" label="Descripcion" fullWidth rows={4} multiline margin="dense" variant="outlined"/>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:"#d13737ff"}} autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button autoFocus onClick={createTask}>
            Guardar
          </Button>
          {alert && (
            <Alert severity="error">Todos los campos son obligatorios</Alert>
          )}
        </DialogActions>                          
      </BootstrapDialog>
    </>
  )

}

export default Task