import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Pagination from "@material-ui/lab/Pagination";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;
const ProductContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
`;
const PaginationBar = styled(Pagination)`
  margin: 12px 0px 12px 0px;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(8);
  const [productsLength, setProductsLength] = useState(0);
  const handlePage = (event, value) => {
    setCurrentPage(value);
    setStartIndex(value === 1 ? 0 : 8 * (value - 1));
    setLastIndex(8 * value < productsLength ? 8 * value : productsLength);
  };
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:8000/api/products?category=${cat}`
            : "http://localhost:8000/api/products"
        );
        setProducts(res.data);
        setProductsLength(res.data.length);
        setFilteredProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cat, setProductsLength, setFilteredProducts]);

  useEffect(() => {
    cat &&
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    )&& setProductsLength(setFilteredProducts.length);
  }, [products, cat, filters, setProductsLength]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  console.log(sort);
  return (
    <Container>
      <ProductContainer>
        {cat
          ? filteredProducts.map((item) => (
              <Product item={item} key={item._id} />
            ))
          : products
              .slice(startIndex, lastIndex)
              .map((item) => (
                <Product setCurrentPage item={item} key={item._id} />
              ))}
      </ProductContainer>
      <p>currentPage:{currentPage}</p>
      <PaginationBar
        page={currentPage}
        onChange={handlePage}
        count={
          cat
            ? Math.ceil(filteredProducts.length / 8)
            : Math.ceil(products.length / 8)
        }
      />
    </Container>
  );
};

export default Products;
