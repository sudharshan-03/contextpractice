import {
  Box,
  Typography,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  styled,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import data from "./data.js";
import { useContext, useState } from "react";
import { UserContext } from "../App.jsx";

const CustomCheckbox = styled(Checkbox)({
  "&.Mui-checked": {
    color: "red",
  },
});

// Styled FormControlLabel
const CustomFormControlLabel = styled(FormControlLabel)({
  width: "100%",
  textAlign: "center",
  display: "flex",
  justifyContent: "space-between",
  gap: "70px",
  "& .MuiFormControlLabel-label": {
    fontSize: "1.1em",
    fontWeight: "bold",
  },
});

const CustomButton = styled(Button)({
  backgroundColor: "#ddd",
  color: "#000",
  border: "1px solid #999",
  width: "100%",
});

function Product() {
  let {count, handlePlus, handleMinus} = useContext(UserContext)

  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { label: "Bread", value: "bread" },
    { label: "Dairy", value: "dairy" },
    { label: "Fruits", value: "fruits" },
    { label: "Seasoning & Spices", value: "seasoning" },
    { label: "Vegetables", value: "vegetables" },
  ];

  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredProducts =
    selectedCategories.length === 0
      ? data
      : data.filter((product) => selectedCategories.includes(product.category));

  const handleAll = (e) => {
    if(e.target.checked){
      setSelectedCategories([]);
    }
  };

  return (
    <>
      <Box sx={{ marginTop: "64px" }}>
        <Grid container>
          <Grid size={3}>
            <Box
              sx={{
                minHeight: "calc(100vh - 64px)",
                position: "fixed",
                paddingTop: "20px",
                width: "23%",
              }}
            >
              <CustomFormControlLabel
                control={
                  <CustomCheckbox
                    value="all"
                    checked={selectedCategories.length === 0}
                    onChange={handleAll}
                  />
                }
                label="All Categories"
                labelPlacement="start"
              />
              {categories.map((category) => (
                <CustomFormControlLabel
                  control={
                    <CustomCheckbox
                      value={category}
                      checked={selectedCategories.includes(category.value)}
                      onChange={() => handleCheckboxChange(category.value)}
                    />
                  }
                  label={category.label}
                  labelPlacement="start"
                  key={category.value}
                />
              ))}
            </Box>
          </Grid>
          <Grid size={9}>
            <Box
              sx={{
                minHeight: "calc(100vh - 64px)",
                backgroundColor: "#eee",
                padding: "20px 5px",
                display: "flex",
                flexFlow: "row wrap",
                gap: "10px",
              }}
            >
              {filteredProducts.map((d) => {
                const countval = count[d.id] || 0;
                return (
                  <Card
                    sx={{
                      width: "320px",
                      border: "1px solid #999",
                      height: "fit-content",
                      paddingBottom: "1px",
                    }}
                    key={d.id}
                  >
                    <CardContent>
                      <Typography variant="h6">{d.name}</Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      image={d.image}
                      sx={{
                        width: "150px",
                        height: "150px",
                        objectFit: "contain",
                        margin: "0 auto",
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ display: "block" }}>
                        {d.sub}
                      </Typography>
                      <Typography variant="p" sx={{ color: "grey" }}>
                        ${d.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {countval === 0 ? (
                        <CustomButton
                          variant="outlined"
                          onClick={() => handlePlus(d.id)}
                        >
                          ADD TO CART
                        </CustomButton>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            gap: "40px",
                            padding: "0 30px",
                          }}
                        >
                          <CustomButton onClick={() => handleMinus(d.id)}>
                            -
                          </CustomButton>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {countval}
                          </Typography>
                          <CustomButton onClick={() => handlePlus(d.id)}>
                            +
                          </CustomButton>
                        </Box>
                      )}
                    </CardActions>
                  </Card>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Product;
