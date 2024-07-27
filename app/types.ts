// Define a new type for cart items
export interface CartItem extends Shoe {
  quantity: number;
}

// Existing Shoe interface
export interface Shoe {
  id: string;
  title: string;
  price: number;
  items_left: number;
  gender: string;
  category: string;
  description: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  slug: {
    current: string;
  };
  rating?: number;
//   reviews?: Review[];
}
