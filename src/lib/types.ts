export interface UserPreferencesType {
  like: string[];
  dislike: string[];
  allergens: string[];
  info: {
    weight: string;
    height: string;
    age: string;
    gender: string;
    weekly_exercise: string;
  }
};

export interface MenuItemType {
  label: string;
  amount: number;
  macronutrients: string[];
  calories: number;
}

export interface MealType {
  menu_label: string;
}

export interface MealTypeFull extends MealType {
  menu_items: Array<MenuItemType>
}

export interface DayType {
  week_day: "Lunes",
  breakfast: Array<MealType>;
  lunch: Array<MealType>;
  dinner: Array<MealType>;
}

export type WeekType = Array<DayType>;
