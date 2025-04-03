import { Product } from "@/types/product";
import { QueryObserverOptions } from "@tanstack/react-query";

const makeProductsQueryOptions = (
  query: string,
  queryFn: () => Promise<Array<Product>>
): QueryObserverOptions => {
  return {
    queryKey: ["products", query],
    queryFn,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 0,
  };
};

const makeProductByIdQueryOptions = (
  productId: string,
  queryFn: () => Promise<Product>
): QueryObserverOptions => {
  return {
    queryKey: ["product", productId],
    queryFn,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 0,
  };
};

export const useFetchProductsQuery = (): QueryObserverOptions => {
  const fetchProducts = makeProductsQueryOptions("products", async () => {
    const response = await fetch("http://localhost:3000/products");
    return response.json();
  });
  return fetchProducts;
};

export const useFetchProductByIdQuery = (productId: string): QueryObserverOptions => {
  const fetchProductById = makeProductByIdQueryOptions(productId, async () => {
    const response = await fetch(`http://localhost:3000/products/${productId}`);
    if (!response.ok) {
      throw new Error("Product not found");
    }
    return response.json();
  });
  return fetchProductById;
};
