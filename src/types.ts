export type ProductItem = {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
  vatRate: number;
};

export type CartItem = {
  id: number;
  quantity: number;
};

export type CartProductItem = {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
  availableQuantity: number;
  vatRate: number;
};
