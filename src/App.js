import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import {
  Home,
  About,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  Private,
  Products,
  AuthWrapper,
} from "./pages";

function App() {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route
            path="/checkout"
            element={
              <Private>
                <Checkout />
              </Private>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
