export interface Watch {
  id: string;
  name: string;
  nameAr: string;
  brand: string;
  brandAr: string;
  category: string;
  categoryAr: string;
  price: number;
  rating: number;
  image: string;
  heroImage: string;
  movement: string;
  caseDiameter: string;
  waterResistance: string;
  crystal: string;
  caseMaterial: string;
  bracelet: string;
  powerReserve: string;
  description: string;
  descriptionAr: string;
  pros: string[];
  cons: string[];
  affiliateLinks: {
    amazon: string;
    jomashop: string;
  };
  tags: string[];
}
