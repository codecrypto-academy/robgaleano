import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home/home";
import Products from "@/pages/product/products";
import ProductDetail from "@/pages/product/product-detail/product-detail";
import ShoppingBag from "@/pages/shopping-bag/shopping-bag";
import NotFound from "@/pages/not-found/not-found";
import "./main.css";
import { Toaster } from "sonner";

const Main = () => {
  return (
    <main className="main-container">
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:prodId" element={<ProductDetail />} />
        <Route path="/shopping-bag" element={<ShoppingBag/>} />
      </Routes>
    </main>
  );
};

export default Main;
