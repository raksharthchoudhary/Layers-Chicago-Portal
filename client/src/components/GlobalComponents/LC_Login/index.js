import React from 'react';
//import { useNavigate } from 'react-router-dom';

import { 
  Container, 
  Box, 
  Typography,
  ThemeProvider,
  StyledEngineProvider,
  Button,
} from '@mui/material';

import pageStyles from './loginPage.module.scss';
import formStyles from './loginForm.module.scss';
import LC_Theme from '../LC_Theme';

function Login() {

  const handleLogin = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    
    const squareAuthUrl = `https://connect.squareupsandbox.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
    window.location.href = squareAuthUrl;
  };

  return (
    <StyledEngineProvider injectFirst>
      <div className={pageStyles.background}>
        <Box className={pageStyles.header}>
          <Typography variant="subtitle1">
            Welcome to the Layers Chicago Portal! 
          </Typography>
        </Box>
        <div className={pageStyles.content}>
          <Container className={formStyles.loginContainer}>
            <Typography className={formStyles.loginText}>
              Login via Square™
            </Typography>
            <Button className={formStyles.loginButton} onClick={handleLogin}/>
          </Container>
        </div>
        <Box className={pageStyles.footer}>
          <Typography variant="subtitle1">
            ©2024 Layers Chicago, LLC, a Retail company. 
          </Typography>
          <ThemeProvider theme={LC_Theme}>
            <Typography variant="subtitle2" color="primary">
              Portal developed in partnership with RV Design ©2024. All rights reserved. 
            </Typography>
          </ThemeProvider>
        </Box>
      </div>
    </StyledEngineProvider>
  );
}

export default Login;

//OPTIONAL COMPONENTS

/*

<Dialog
    classes={{
      paperFullScreen: pageStyles.success,
    }}
    open={isSuccess}
    fullScreen
    TransitionComponent={Fade}
    transitionDuration={1000}
  >
    <Typography variant='h3'>
      Welcome, Raksharth!
    </Typography>
  </Dialog>

  ```````````````````````````````````````````````````````````
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUsernameChange = (event) => {
    setIsEmpty(false);
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setIsEmpty(false);
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    if(username === '' && password === ''){
      setIsEmpty(true);
    }
    else if(username === 'rchoudhary' && password === '12345'){
      setIsLogging(true);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    }
    else{
      setIsError(true);
    }

    //console.log(`Username: ${username}, Password: ${password}`);
  };

  `````````````````````````````````````````````````````````````````````````
  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
    <OutlinedInput
      classes={{
        root: formStyles.inputContainer,
        input: formStyles.textContainer,
        notchedOutline: isEmpty ? formStyles.emptyContainer : formStyles.highlightContainer,
      }}
      autoFocus
      required
      fullWidth
      id="username"
      name="username"
      placeholder={isError ? "Invalid Username!" : "Username *"}
      value={username}
      onChange={handleUsernameChange}
    />
    <OutlinedInput
      classes={{
        root: formStyles.inputContainer,
        input: formStyles.textContainer,
        notchedOutline: isEmpty ? formStyles.emptyContainer : formStyles.highlightContainer,
      }}
      required
      fullWidth
      id="password"
      name="password"
      type="password"
      placeholder={isError ? "Invalid Password" : "Password *"}
      value={password}
      onChange={handlePasswordChange}
    />
  </form>
*/