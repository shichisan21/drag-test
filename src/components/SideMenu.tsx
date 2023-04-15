import { useState, FC } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import styles from "@/styles/Home.module.css";
import { Routes, Link, Route } from "react-router-dom";
import { PanelContents } from "./PanelContents";

interface SideMenuProps {}

const SideMenu: FC<SideMenuProps> = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Drawer anchor='left' open={true} variant='persistent'>
      <List>
        <ListItemButton component={Link} to='/'>
          <ListItemText primary='Home' />
        </ListItemButton>
        <ListItemButton component={Link} to='/'>
          <ListItemText primary='Home' />
        </ListItemButton>
        <ListItemButton component={Link} to='/'>
          <ListItemText primary='Home' />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary='PageA' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton>
              <ListItemText primary='PageB' />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Routes>
        <Route path='/' element={<PanelContents value='apple' />} />
      </Routes>
    </Drawer>
  );
};

export default SideMenu;
