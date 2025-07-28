import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Checkout from "./Components/Checkout";
import Placeorder from "./Components/Placeorder";



const UserContext = createContext();
function App() {
  let [count, setCount] = useState({});

  const handlePlus = (id) => {
    setCount((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };
  const handleMinus = (id) => {
    setCount((prev) => ({ ...prev, [id]: (prev[id] || 0) - 1 }));
  };
  const clear = () => {
    setCount({});
  };

  const totalCount = Object.values(count).reduce((tot, n) => tot + n, 0);

  let passingValue = { count, handlePlus, handleMinus, clear, totalCount };
  
  return (
    <UserContext.Provider value={passingValue}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/placeorder" element={<Placeorder />} />
      </Routes>
    </UserContext.Provider>
  );
}


export default App;
export { UserContext };
