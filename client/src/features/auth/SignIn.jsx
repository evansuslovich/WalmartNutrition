import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { setUser } from "../../app/services/slices/authSlice";
import { useLoginMutation } from "../../app/services/api/authApi";
import { useSnackbar } from 'notistack'
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

export default function SignIn() {

  const [account, setAccount] = useState({});
  const [login, {isLoading}] = useLoginMutation();
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAccount(values => ({ ...values, [name]: value }))
  }

  return (
    <div className="containter">
      <div className="row">
        <div className="col-4 offset-4">
          
          <h1>Login</h1>

          <Box
            component="form"
            method="post"
            noValidate
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="Email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={handleChange}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
              onClick={async () => {
                try {
                  const user = await login(account).unwrap();
                  dispatch(setUser(user));
                  localStorage.setItem('token', user.token)
                  navigate("/")
                  enqueueSnackbar('You are now signed in', { variant: 'success' });
                } catch (err) {
                  enqueueSnackbar('Login failed', { variant: 'error' });
                }
              }}
            >
              Login
            </Button>

          </Box>
        </div>
      </div>
    </div>
  )
}