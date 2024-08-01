import type { UserPreferencesType } from '@/lib/types';

import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { getCurrentDay } from '@/lib/utils';
import { average_cost_options, average_preparation_options, exercise_options, gender_options } from '@/lib/consts';

export const CurrentDay = writable(getCurrentDay());

export const defaultUserPreferences: UserPreferencesType = {
  like: [],
  dislike: [],
  allergens: [],
  info: {
    created_at: new Date().getFullYear().toString(),
    height: "165 cm",
    weight: "70 kg",
    age: "30 años",
    gender: gender_options[0].id,
    weekly_exercise: exercise_options[0].id,
  },
  average_preparation_time_per_dish: average_preparation_options[0].id,
  average_cost_per_dish: average_cost_options[0].id,
};

export const defaultUiPreferences = {
  guide_done: false,
  show_breakfast: true,
  show_lunch: true,
  show_dinner: true,
  dark_mode: false,
};

export const defaultMenus = [
  { week_day: 'Lunes' },
  { week_day: 'Martes' },
  { week_day: 'Miércoles' },
  { week_day: 'Jueves' },
  { week_day: 'Viernes' },
  { week_day: 'Sábado' },
  { week_day: 'Domingo' }
];

const localUserPreferences = browser && localStorage.getItem("fridgeai-user");
export const UserPreferences = writable(localUserPreferences ? JSON.parse(localUserPreferences) : defaultUserPreferences);
UserPreferences.subscribe((value) => browser && (localStorage["fridgeai-user"] = JSON.stringify(value)));

const localMenus = browser && localStorage.getItem("fridgeai-menus");
export const Menus = writable(localMenus ? JSON.parse(localMenus) : defaultMenus);
Menus.subscribe((value) => browser && (localStorage["fridgeai-menus"] = JSON.stringify(value)));

const localUiPreferences = browser && localStorage.getItem("fridgeai-ui");
export const UiPreferences = writable(localUiPreferences ? JSON.parse(localUiPreferences) : defaultUiPreferences);
UiPreferences.subscribe((value) => browser && (localStorage["fridgeai-ui"] = JSON.stringify(value)));