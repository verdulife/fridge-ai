export interface UserPreferencesType {
  like: string[];
  dislike: string[];
  allergens: string[];
  info: {
    created_at: string;
    weight: string;
    height: string;
    age: string;
    gender: string;
    weekly_exercise: string;
  },
  average_preparation_time_per_dish: string;
  average_cost_per_dish: string;
};

export interface IngredientsType {
  name: string;
  amount: number | string;
  unit: string | null;
}

export interface DishType {
  label: string;
  ingredients: Array<IngredientsType>;
  time_to_prepare: string;
  approximate_price_euros: string;
  recipe?: string;
}

export interface DayType {
  [key: string]: string | DishType | number | undefined;
  week_day: string;
  breakfast?: DishType;
  lunch?: DishType;
  dinner?: DishType;
  approximate_price_euros?: number;
}

export type WeekType = Array<DayType>;

export interface RouteType {
  path: string;
  label: string;
  icon: string;
}