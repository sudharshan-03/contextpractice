import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import {
  Box,
  Button,
  Card,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
} from "@mui/material";
import data from './data.js';
import { useContext } from "react";
import { UserContext } from "../App.jsx";

const CustomButton = styled(Button)({
  backgroundColor: "#ddd",
  color: "#000",
  border: "1px solid #999",
  width: "70px",
});

function Checkout() {
  const {totalCount, count, handlePlus, handleMinus, clear} = useContext(UserContext);
  const navigate = useNavigate();
  const filtered = data.filter(d=>count[d.id] >0);
  const totalPrice = filtered.reduce((tot, n) => tot + n.price * count[n.id],0)

  const handleCheck = () => {
      if(Object.values(count).some(val => val > 0)) {
        navigate('/placeorder')
      }
  }

  return (
    <>
      <Navbar />
      <Box sx={{ padding: "70px 20px 0px" }}>
        <Button
          variant="outlined"
          size="large"
          color="black"
          sx={{ border: "1px solid grey", display: "block" }}
          onClick={() => navigate(-1)}
        >
          BACK TO PRODUCTS
        </Button>
        <Typography variant="h6" sx={{ fontWeight: "bold", padding: "15px 0" }}>
          Shopping Cart
        </Typography>
        <Card sx={{ width: "900px", padding: "20px 40px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
            <Typography variant="h5">You Have {totalCount} Items in Your Cart</Typography>
            <Button
              variant="outlined"
              size="large"
              color="black"
              sx={{ border: "1px solid grey", display: "block" }}
              onClick={clear}
            >
              CLEAR SHOPPING CART
            </Button>
          </Box>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center" sx={{ fontSize: "1.1rem" }}>
                    Products
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "1.1rem" }}>
                    Quantity
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "1.1rem" }}>
                    Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map(d => (
                  <TableRow
                  sx={{ "& td, & th": { borderBottom: 2, borderTop: 2 } }}
                  key={d.id}
                >
                  <TableCell component="th" scope="row">
                    <img
                      src={d.image}
                      alt={d.category}
                      height="150"
                      width="150"
                      style={{objectFit:"contain"}}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
                  >
                    {d.name}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "1.1rem" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <CustomButton size="small" onClick={() => handleMinus(d.id)}>-</CustomButton>
                      <Typography sx={{ fontWeight: "bold" }}>{count[d.id]}</Typography>
                      <CustomButton size="small" onClick={() => handlePlus(d.id)}>+</CustomButton>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
                  >
                    ${count[d.id] * d.price}
                  </TableCell>
                </TableRow>
                ))}
                <TableRow
                  sx={{ "& td, & th": { borderBottom: 2, borderTop: 2 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    colSpan={2}
                    align="center"
                    sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
                  >
                    Total-Price
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    align="right"
                    sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
                  >
                    ${totalPrice}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <Button variant="contained" sx={{backgroundColor: "#0D47A1", margin: "20px 0"}} onClick={handleCheck}>CHECKOUT</Button>
      </Box>
    </>
  );
}

export default Checkout;
