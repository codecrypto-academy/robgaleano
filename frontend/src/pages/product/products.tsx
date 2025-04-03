import { useFetchProductsQuery } from "@/hooks/product.hook";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product";
import { Table, Skeleton, IconButton } from "@radix-ui/themes";
import "./products.css";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  const productsQuery = useFetchProductsQuery();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery(productsQuery) as {
    data: Array<Product>;
    isLoading: boolean;
    error: unknown;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-3xl px-4">
          <Skeleton className="w-full mb-8" height={"36px"} />
          <Skeleton className="w-full mb-8" height={"64px"} />
          <Skeleton className="w-full mb-8" height={"64px"} />
          <Skeleton className="w-full mb-8" height={"64px"} />
          <Skeleton className="w-full mb-8" height={"64px"} />
          <Skeleton className="w-full" height={"36px"} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error loading products</div>
    );
  }

  return (
    <div className="p-4 product-list--container h-full">
      <h1 className="text-2xl font-bold mb-2">Products</h1>
      <div className="overflow-hidden border rounded-md flex flex-col">
        <div className="w-full">
          <Table.Root
            className="w-full table-fixed border-collapse"
            size={"2"}
            variant={"surface"}
          >
            <Table.Header className="bg-white z-10 w-full shadow-sm">
              <Table.Row>
                <Table.ColumnHeaderCell className="text-left p-2 border-b w-2/7">
                  Name
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="text-left p-2 border-b w-1/7">
                  Quantity Per Unit
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="text-left p-2 border-b w-1/7">
                  Price
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="text-left p-2 border-b w-1/7">
                  Stock
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="text-left p-2 border-b w-1/7">
                  Orders
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="text-left p-2 border-b w-1/7">
                  Actions
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
          </Table.Root>
        </div>
        <div className="max-h-[70vh] overflow-auto">
          <Table.Root
            className="w-full table-fixed border-collapse"
            size={"2"}
            variant={"surface"}
          >
            <Table.Body>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <Table.Row key={product.product_id}>
                    <Table.RowHeaderCell className="w-2/7">
                      {product.product_name}
                    </Table.RowHeaderCell>
                    <Table.Cell className="w-1/7">
                      {product.quantity_per_unit}
                    </Table.Cell>
                    <Table.Cell className="w-1/7">
                      ${product.unit_price.toFixed(2)}
                    </Table.Cell>
                    <Table.Cell className="w-1/7">
                      {product.units_in_stock}
                    </Table.Cell>
                    <Table.Cell className="w-1/7">
                      {product.units_on_order}
                    </Table.Cell>
                    <Table.Cell className="w-1/7">
                      <IconButton
                        color="indigo"
                        variant="soft"
                        onClick={() =>
                          navigate(`/products/${product.product_id}`)
                        }
                      >
                        <Eye width={18} height={18} />
                      </IconButton>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={5} className="text-center p-4">
                    No products found
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
    </div>
  );
};

export default Products;
