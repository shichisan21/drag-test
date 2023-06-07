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

  const testParameter = "test";
  const address = `/post/${testParameter}`;

  return (
    <Drawer anchor='left' open={true} variant='persistent' sx={{ width: 240 }}>
      <List>
        <Link
          href={{
            pathname: "/checkBoxGrid",
          }}
        >
          <ListItemButton>CheckBoxGrid</ListItemButton>
        </Link>
        <Link
          href={{
            pathname: "/separateList",
          }}
        >
          <ListItemButton>SeparateList</ListItemButton>
        </Link>
        <Link
          href={{
            pathname: "/checkboxList",
          }}
        >
          <ListItemButton>CheckboxList</ListItemButton>
        </Link>
        <Link
          href={{
            pathname: "/objectToList",
          }}
        >
          <ListItemButton>ObjectToList</ListItemButton>
        </Link>
        <Link
          href={{
            pathname: "/objectToList",
          }}
        >
          <ListItemButton>AddArea</ListItemButton>
        </Link>
        <Link
          href={{
            pathname: "/CityDateTable",
          }}
        >
          <ListItemButton>crossList</ListItemButton>
        </Link>
        <Link
          href={{
            pathname: "/dragAndDrop",
            query: {
              fruits: [
                "grape",
                "kiwi",
                "pineapple",
                "pear",
                "mango",
                "watermelon",
                "peach",
                "plum",
                "cherry",
                "strawberry",
                "raspberry",
                "blueberry",
                "blackberry",
                "apricot",
                "nectarine",
              ],
            },
          }}
        >
          <ListItemButton>D and D</ListItemButton>
        </Link>
        <Link
          href={{
            pathname: "/about",
            query: { fruits: ["apple", "banana", "orange"] },
          }}
        >
          <ListItemButton>Page1</ListItemButton>
        </Link>
        <Link
          href={{
            pathname: "/listPage",
            query: {
              fruits: [
                "grape",
                "kiwi",
                "pineapple",
                "pear",
                "mango",
                "watermelon",
                "peach",
                "plum",
                "cherry",
                "strawberry",
                "raspberry",
                "blueberry",
                "blackberry",
                "apricot",
                "nectarine",
                "pomegranate",
                "guava",
                "papaya",
                "fig",
                "persimmon",
                "cranberry",
                "gooseberry",
                "elderberry",
                "currant",
                "boysenberry",
                "loganberry",
                "mulberry",
                "coconut",
                "lemon",
                "lime",
                "grapefruit",
                "tangerine",
                "clementine",
                "kumquat",
                "melon",
                "honeydew",
                "cantaloupe",
                "jackfruit",
                "durian",
                "starfruit",
                "passionfruit",
                "dragonfruit",
                "kiwano",
                "cherimoya",
                "rhubarb",
                "quince",
                "kiwiberry",
                "blackcurrant",
                "redcurrant",
                "whitecurrant",
                "physalis",
                "persimon",
              ],
            },
          }}
        >
          <ListItemButton>ListPage</ListItemButton>
        </Link>
        <Link href={address}>
          <ListItemButton>Page2</ListItemButton>
        </Link>
        <Link
          href={{
            pathname: "/chatRoom",
          }}
        >
          <ListItemButton>Chatroom</ListItemButton>
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
