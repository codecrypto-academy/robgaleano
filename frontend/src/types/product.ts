export interface Product {
  product_id: number;
  product_name: string;
  supplier_id: number;
  category_id: number;
  quantity_per_unit: string;
  unit_price: number;
  units_in_stock: number;
  units_on_order: number;
  reorder_level: number;
  discontinued: number; // Using number as the JSON shows 0, could also be boolean if appropriate
}

export interface ProductCart {
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price?: number; // Added unit price for price calculations
}
