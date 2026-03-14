/**
 * @deprecated Use the Watch type from '../data/types' instead.
 * This interface is kept for backward compatibility but the canonical
 * Watch type is defined in src/data/types.ts.
 */
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
