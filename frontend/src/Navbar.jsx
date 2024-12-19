import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {setUser, setLoading} from './redux/auth/authSlice'
const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const{enqueueSnackbar} = useSnackbar();
  const { user, loading } = useSelector((store) => store.auth);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();

    navigate(`/${user.role}/profile`); // Navigate to the profile page
  };
  const handleLogoutClick = async() => {
    handleMenuClose();
     try {
          const res = await fetch("http://localhost:8000/api/user/logout", {
            methods: "GET",
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            dispatch(setUser(null));
            enqueueSnackbar(data.message, { variant: "success" });
            navigate("/");
          }
        } catch (error) {
          console.log(error);
          enqueueSnackbar("Logout failed!", { variant: "error" });
        }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo or App Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
          Indian Public School
        </Typography>

        {/* Profile Button with Menu */}
        <Box>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
