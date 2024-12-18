import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  ListSubheader,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
//import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../../redux/auth/authSlice";
import { useSnackbar } from "notistack";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const logoutHandler = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/user/logout", {
        methods: "GET",
        credentials: "include",
      });
      //console.log(res);

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
    <List>
      {/* Home */}
      <ListItemButton component={Link} to="/Admin">
        <ListItemIcon>
          <HomeIcon
            color={
              location.pathname === "/Admin" ||
              location.pathname === "/Admin/dashboard"
                ? "primary"
                : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>

      {/* Classes */}
      <ListItemButton component={Link} to="/Admin/classes">
        <ListItemIcon>
          <ClassOutlinedIcon
            color={
              location.pathname.startsWith("/Admin/classes")
                ? "primary"
                : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="Classes" />
      </ListItemButton>

      {/* Teachers */}
      <ListItemButton component={Link} to="/Admin/teachers">
        <ListItemIcon>
          <SupervisorAccountOutlinedIcon
            color={
              location.pathname.startsWith("/Admin/teachers")
                ? "primary"
                : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="Teachers" />
      </ListItemButton>

      {/* Students */}
      <ListItemButton component={Link} to="/Admin/students">
        <ListItemIcon>
          <PersonOutlineIcon
            color={
              location.pathname.startsWith("/Admin/students")
                ? "primary"
                : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="Students" />
      </ListItemButton>

      <Divider sx={{ my: 1 }} />

      {/* User Section */}
      <ListSubheader component="div" inset>
        User
      </ListSubheader>

      {/* Logout */}
      <ListItemButton component={Link} onClick={logoutHandler}>
        <ListItemIcon>
          <ExitToAppIcon
            color={
              location.pathname.startsWith("/logout") ? "primary" : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

export default Sidebar;
