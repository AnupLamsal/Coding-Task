import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import ProductEdit from "./components/ProductForm/ProductEdit";
import ProductForm from "./components/ProductForm/ProductForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/product" element={<ProductForm />} />
        <Route path="/product/edit/:id" element={<ProductEdit />} />
        <Route path="/search/:keyword" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
