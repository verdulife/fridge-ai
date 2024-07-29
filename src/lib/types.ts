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
};

export interface IngredientsType {
  name: string;
  amount: number | string;
  unit: string | null;
}

export interface MealType {
  menu_label: string;
  menu_ingredients: Array<IngredientsType>;
  time_to_prepare: string;
  aproximate_price_in_spain_euros: string;
  recipe?: string;
}

export interface DayType {
  week_day: "Lunes",
  breakfast: MealType;
  lunch: MealType;
  dinner: MealType;
  aproximate_price_in_spain_euros?: number;
}

export type WeekType = Array<DayType>;

export interface RouteType {
  path: string;
  label: string;
  icon: string;
}