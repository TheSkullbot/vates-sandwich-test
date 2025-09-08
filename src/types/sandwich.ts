export type IngredientCategory = "bread" | "sauce" | "cheese" | "filling"

export interface Sandwich
{
  id : string;
  name : string;
  bread : string;
  sauce : string;
  cheese : string;
  filling : string;
  createdAt : number;
}

export type BareSandwich = Omit<Sandwich, "id" | "name" | "createdAt">;

export interface IngredientsState
{
  bread : string[];
  sauce : string[];
  cheese : string[];
  filling : string[];
}

export const defaultIngredients : IngredientsState = {
  bread   : [
    "Italien",
    "Parmesan Origan",
    "Blé complet",
    "Blanc",
    "Wrap"
  ],
  sauce   : [
    "Chipotle Southwest",
    "Sweet Onion",
    "Mayonnaise",
    "Moutarde au miel",
    "Barbecue"
  ],
  cheese  : [
    "Cheddar",
    "Monterey Jack",
    "Mozzarella",
    "Emmental",
    "Fromage américain"
  ],
  filling : [
    "Poulet",
    "Jambon",
    "Thon",
    "Steak & Cheese",
    "Poulet Teriyaki"
  ]
};

export const STORAGE_KEYS = {
  INGREDIENTS : "sandwich_app_ingredients",
  SANDWICHES  : "sandwich_app_sandwiches"
} as const;
