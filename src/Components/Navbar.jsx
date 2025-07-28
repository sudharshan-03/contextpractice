import React, { useContext } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router";
import { UserContext } from "../App";

function Navbar() {
  let {totalCount} = useContext(UserContext);
  const navigate = useNavigate();
  const handleLog = () => {
    if(totalCount){
        navigate('/checkout')
    }
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar sx={{ backgroundColor: "#0D47A1" }}>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Welcome To React E-commerce Shopping Mart
            </Typography>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <Button color="inherit" sx={{ fontWeight: "bold" }} onClick={() => navigate('/')}>
                Logout
              </Button>
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                sx={{ mr: 2, color: totalCount ? "white": "blue" }}
                onClick={handleLog}
              >
                <Badge
                  badgeContent={totalCount}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#aa0000", // custom background color
                      color: "white", // custom text color
                    },
                  }}
                >
                  <ShoppingCartIcon/>
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
