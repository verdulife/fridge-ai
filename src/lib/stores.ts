import type { UserPreferencesType } from '@/lib/types';

import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { getCurrentDay } from '@/lib/utils';

export const CurrentDay = writable(getCurrentDay());

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

const defaultUiPreferences = {
  show_breakfast: true,
  show_lunch: true,
  show_dinner: true,
  dark_mode: false,
};

const localUserPreferences = browser && localStorage.getItem("fridgeai-user");
export const UserPreferences = writable(localUserPreferences ? JSON.parse(localUserPreferences) : defaultUserPreferences);
UserPreferences.subscribe((value) => browser && (localStorage["fridgeai-user"] = JSON.stringify(value)));

const localMenus = browser && localStorage.getItem("fridgeai-menus");
export const Menus = writable(localMenus ? JSON.parse(localMenus) : []);
Menus.subscribe((value) => browser && (localStorage["fridgeai-menus"] = JSON.stringify(value)));

const localUiPreferences = browser && localStorage.getItem("fridgeai-ui");
export const UiPreferences = writable(localUiPreferences ? JSON.parse(localUiPreferences) : defaultUiPreferences);
UiPreferences.subscribe((value) => browser && (localStorage["fridgeai-ui"] = JSON.stringify(value)));