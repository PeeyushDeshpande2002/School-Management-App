import React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Divider, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
//import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sidebar = () => {
    const location = useLocation();

    return (
        <List>
            {/* Home */}
            <ListItemButton component={Link} to="/Admin">
                <ListItemIcon>
                    <HomeIcon color={location.pathname === '/Admin' || location.pathname === '/Admin/dashboard' ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>

            {/* Classes */}
            <ListItemButton component={Link} to="/Admin/classes">
                <ListItemIcon>
                    <ClassOutlinedIcon color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Classes" />
            </ListItemButton>

            {/* Teachers */}
            <ListItemButton component={Link} to="/Admin/teachers">
                <ListItemIcon>
                    <SupervisorAccountOutlinedIcon color={location.pathname.startsWith('/Admin/teachers') ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Teachers" />
            </ListItemButton>

            {/* Students */}
            <ListItemButton component={Link} to="/Admin/students">
                <ListItemIcon>
                    <PersonOutlineIcon color={location.pathname.startsWith('/Admin/students') ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Students" />
            </ListItemButton>

            <Divider sx={{ my: 1 }} />

            {/* User Section */}
            <ListSubheader component="div" inset>
                User
            </ListSubheader>

            {/* Logout */}
            <ListItemButton component={Link} to="/logout">
                <ListItemIcon>
                    <ExitToAppIcon color={location.pathname.startsWith('/logout') ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </List>
    );
};

export default Sidebar;
