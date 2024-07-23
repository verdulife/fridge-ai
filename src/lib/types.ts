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

export interface MealType {
  menu_label: string;
  menu_ingredients: Array<string>;
  time_to_prepare: string;
}

export interface DayType {
  week_day: "Lunes",
  breakfast: Array<MealType>;
  lunch: Array<MealType>;
  dinner: Array<MealType>;
}

export type WeekType = Array<DayType>;