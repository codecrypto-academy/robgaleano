import { useFetchProductByIdQuery } from "@/hooks/product.hook";
import { useParams } from "react-router-dom";
import {
  AlertDialog,
  Button,
  Card,
  Text,
  Heading,
  Flex,
  Badge,
  Separator,
  Box,
  Avatar,
  TextField,
} from "@radix-ui/themes";
import {
  AlertCircle,
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@radix-ui/themes";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import { Context } from "@/middleware/app-context";
import { ProductCart } from "@/types/product";

// Define the form data structure
type QuantityFormData = {
  quantity: number;
};

const ProductDetail = () => {
  const { prodId } = useParams();
  const navigate = useNavigate();
  const { appState, setAppState } = useContext(Context);
  const [productState, setProductState] = useState<Product | null>(null);

  // Set up react-hook-form
  const { control, handleSubmit, setValue, watch } = useForm<QuantityFormData>({
    defaultValues: {
      quantity: 1,
    },
  });

  // Get current quantity value
  const currentQuantity = watch("quantity");

  const productQuery = useFetchProductByIdQuery(prodId ?? "");

  const {
    data: product,
    isLoading,
    error: isError,
  } = useQuery(productQuery) as {
    data: Product;
    isLoading: boolean;
    error: unknown;
  };

  // Initialize productState when product data is loaded
  useEffect(() => {
    if (product) {
      setProductState(product);
    }
  }, [product]);

  const handleGoBack = () => {
    navigate("/products");
  };

  // Function to increase quantity
  const incrementQuantity = () => {
    const newValue = currentQuantity + 1;
    if (productState && newValue <= productState.units_in_stock) {
      setValue("quantity", newValue);
    }
  };

  // Function to decrease quantity
  const decrementQuantity = () => {
    const newValue = currentQuantity - 1;
    if (newValue >= 1) {
      setValue("quantity", newValue);
    }
  };

  const addToCart = (product: Product, quantity: number) => {
    // Check if product already exists in cart
    const existingProductIndex = (appState?.cart as ProductCart[]).findIndex(
      (item) => item.product_id === product?.product_id
    );

    let updatedCart;

    if (existingProductIndex !== -1) {
      // Product already exists, update its quantity
      updatedCart = [...(appState.cart as ProductCart[])];
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        quantity: updatedCart[existingProductIndex].quantity + quantity,
      };
    } else {
      // Add as new product
      updatedCart = [
        ...(appState.cart as ProductCart[]),
        {
          product_id: product?.product_id,
          product_name: product?.product_name,
          quantity,
          unit_price: product?.unit_price,
        },
      ];
    }

    // Update available stock in the local state
    if (productState) {
      setProductState({
        ...productState,
        units_in_stock: productState.units_in_stock - quantity,
      });
    }

    setAppState({
      ...appState,
      cart: updatedCart,
    });
  };

  // Handle cart submission
  const onSubmit = (formData: QuantityFormData) => {
    // Here you would add the item to cart with the specified quantity
    const { quantity } = formData;
    addToCart(product, quantity);
    
    // Navigate to shopping bag after adding to cart
    navigate("/shopping-bag");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={handleGoBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !productState) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={handleGoBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <AlertDialog.Root>
          <AlertDialog.Content>
            <Flex gap="3">
              <AlertCircle className="h-4 w-4" />
              <Box>
                <Heading size="3">Error</Heading>
                <Text size="2">
                  Failed to load product details. Please try again later.
                </Text>
              </Box>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="soft" onClick={handleGoBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to products
      </Button>

      <div className="grid grid-cols-1 mt-4">
        {/* Product Info */}
        <Card className="p-6">
          <Flex direction="column" gap="4">
            {/* Header with name and stock status */}
            <Flex justify="between" align="start">
              <Heading as="h1" size="6">
                {/* Product Image */}
                <Avatar
                  size="4"
                  src="/box.png"
                  fallback={productState.product_name.charAt(0)}
                  alt={productState.product_name}
                  className="mr-4"
                  radius="large"
                />
                {productState.product_name}
              </Heading>
              <Badge
                variant="soft"
                color={productState.units_in_stock > 0 ? "green" : "red"}
              >
                {productState.units_in_stock > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </Flex>

            {/* Price */}
            <Box>
              <Heading size="5" className="text-primary">
                ${productState.unit_price.toFixed(2)}
              </Heading>
              {productState.units_in_stock > 0 && (
                <Text size="2" className="text-gray-500 mt-1">
                  {productState.units_in_stock} units available
                </Text>
              )}
            </Box>

            <Separator size="4" />

            {/* Product Details */}
            <Box>
              <Heading size="3" className="mb-2">
                Description
              </Heading>
              <Text size="2" className="text-gray-600">
                {productState.quantity_per_unit}
              </Text>
            </Box>

            {/* Additional Details */}
            <Box>
              <Heading size="3" className="mb-2">
                Product Details
              </Heading>
              <Flex direction="column" gap="2">
                <Flex justify="between">
                  <Text size="2" className="text-gray-500">
                    Product ID:
                  </Text>
                  <Text size="2">{productState.product_id}</Text>
                </Flex>
                <Flex justify="between">
                  <Text size="2" className="text-gray-500">
                    Category ID:
                  </Text>
                  <Text size="2">{productState.category_id}</Text>
                </Flex>
                <Flex justify="between">
                  <Text size="2" className="text-gray-500">
                    Supplier ID:
                  </Text>
                  <Text size="2">{productState.supplier_id}</Text>
                </Flex>
                {productState.units_on_order > 0 && (
                  <Flex justify="between">
                    <Text size="2" className="text-gray-500">
                      Units on Order:
                    </Text>
                    <Text size="2">{productState.units_on_order}</Text>
                  </Flex>
                )}
              </Flex>
            </Box>

            <Separator size="4" />

            {/* Quantity Selector and Add to Cart Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <Box className="mb-4">
                <Heading size="3" className="mb-6">
                  Quantity
                </Heading>
                <Flex gap="2" align="center" className="mt-4">
                  <Button
                    type="button"
                    variant="soft"
                    onClick={decrementQuantity}
                    disabled={currentQuantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <Controller
                    name="quantity"
                    control={control}
                    rules={{
                      required: true,
                      min: 1,
                      max: productState.units_in_stock,
                    }}
                    render={({ field }) => (
                      <TextField.Root
                        {...field}
                        type="number"
                        value={field.value.toString()}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (
                            !isNaN(value) &&
                            value >= 1 &&
                            value <= productState.units_in_stock
                          ) {
                            field.onChange(value);
                          }
                        }}
                        style={{ width: "80px", textAlign: "center" }}
                      />
                    )}
                  />

                  <Button
                    type="button"
                    variant="soft"
                    onClick={incrementQuantity}
                    disabled={currentQuantity >= productState.units_in_stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>

                  <Text size="2" className="ml-2 text-gray-500">
                    {productState.units_in_stock} available
                  </Text>
                </Flex>
              </Box>

              {/* Add to Cart Button */}
              <Button
                type="submit"
                size="3"
                variant="solid"
                className="w-full mt-4"
                disabled={productState.units_in_stock === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {productState.units_in_stock === 0 ? "Sold Out" : "Add to Cart"}
              </Button>
            </form>

            {productState.discontinued === 1 && (
              <Text size="2" className="text-red-500 text-center">
                This product has been discontinued.
              </Text>
            )}
          </Flex>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
