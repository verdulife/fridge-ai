import type { UserPreferencesType } from '@/lib/types';

import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultUserPreferences: UserPreferencesType = {
  like: [],
  dislike: [],
  allergens: [],
  info: {
    height: "160 cm",
    weight: "60 kg",
    age: "30 años",
    gender: "female",
    weekly_exercise: "none",
  }
};

const localUserPreferences = browser && localStorage.getItem("fridgeai-user");
export const UserPreferences = writable(localUserPreferences ? JSON.parse(localUserPreferences) : defaultUserPreferences);
UserPreferences.subscribe((value) => browser && (localStorage["fridgeai-user"] = JSON.stringify(value)));

const localMenus = browser && localStorage.getItem("fridgeai-menus");
export const Menus = writable(localMenus ? JSON.parse(localMenus) : []);
Menus.subscribe((value) => browser && (localStorage["fridgeai-menus"] = JSON.stringify(value)));

const localDishes = browser && localStorage.getItem("fridgeai-dishes");
export const Dishes = writable(localDishes ? JSON.parse(localDishes) : []);
Dishes.subscribe((value) => browser && (localStorage["fridgeai-dishes"] = JSON.stringify(value)));