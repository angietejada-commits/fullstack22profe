import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import { useState  } from 'react';
import userService from '../../Services/userService.js';
const boxContainer ={  
          marginTop: 8,
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }

const Login = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const [success, setSuccess] = useState(false);

 async function handleSubmit(e){
  e.preventDefault();
      if(!email || !password){
        setError("Ingrese los datos")
        setTimeout(()=>setError(""),3000)
        return
      }
      const request = await userService.logIn(email,password)
      if(request.data==null){     
        setError(request.message)
        setTimeout(()=>setError(""),3000)
        return
      }else{
        setSuccess(true)
        setTimeout(()=>setSuccess(false),3000)
        return
      }      
 }

 function onChangeEmail(e){
  setEmail(e.target.value)
 }
  

  return (
    <Container maxWidth="xs">
      <Box
        sx={boxContainer}
      > 
        <Box sx={{color: "black"}}>
           <AppleIcon sx={{fontSize: 50}} />
        </Box>
        <Box component="form" sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"            
            autoFocus
            onChange={onChangeEmail}
            
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"            
            autoComplete="current-password"
            onChange={(e)=>setPassword(e.target.value)}
          /> 
          {
            error && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>)
          }
          {
            success && (
            <Alert variant="filled" severity="success">
              Inicio de Sesion Exitoso 😀
            </Alert>)
          }
          
          <Button
            type="submit"
            fullWidth
            variant="contained" 
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
           Iniciar Sesion
          </Button>          
        </Box>
      </Box>
    </Container>
  );
};

export default Login;