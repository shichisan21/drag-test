import { useState, FC } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

interface SideMenuProps {}

const SideMenu: FC<SideMenuProps> = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Drawer anchor='left' open={true} variant='persistent'>
      <List>
        <ListItemButton>About</ListItemButton>
        <ListItemButton>Page1</ListItemButton>
        <Link href='/about'>
          <ListItemButton>Page2</ListItemButton>
        </Link>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary='about' />
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
    </Drawer>
  );
};

export default SideMenu;
