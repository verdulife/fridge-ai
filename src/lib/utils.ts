import type { DayType, IngredientsType, PromptInputEvalMenusType, PromptInputMealType, PromptInputRecipeType, PromptInputSuggestedTitleType } from '@/lib/types';

import { readDataStream } from 'ai';
import { get } from 'svelte/store';
import { Menus, UserPreferences } from '@/lib/stores';
import { SEASONS_RANGES } from './consts';
import toast from 'svelte-french-toast';

export async function generate(url: string, input: PromptInputMealType | PromptInputRecipeType | PromptInputSuggestedTitleType | PromptInputEvalMenusType) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });

    if (!res.ok || !res.body) return;
    const reader = res.body.getReader();
    let data = '';

    for await (const { type, value } of readDataStream(reader)) {
      if (type === 'text') data += value;
    }

    const parsedData = JSON.parse(data);
    return parsedData;
  } catch {
    throw new Error('Error parsing data');
  }
};

export function onlyMenuTitles() {
  const menus = get(Menus);

  const allMeals = menus.map((menu: DayType) => {
    const meals = [];

    if (menu.breakfast) meals.push(menu.breakfast.label);
    if (menu.lunch) meals.push(menu.lunch.label);
    if (menu.dinner) meals.push(menu.dinner.label);

    return meals;
  });

  return allMeals.flat();
}

export function getCurrentDay(): string {
  return new Intl.DateTimeFormat("es-ES", { weekday: 'long' }).format(new Date());
}

export function getCurrentSeason(): string {
  const current_month = new Date().getMonth() + 1;

  if (current_month >= SEASONS_RANGES.spring_from && current_month < SEASONS_RANGES.summer_from) return 'primavera';
  else if (current_month >= SEASONS_RANGES.summer_from && current_month < SEASONS_RANGES.fall_from) return 'verano';
  else if (current_month >= SEASONS_RANGES.fall_from && current_month < SEASONS_RANGES.winter_from) return 'otoño';
  else return 'invierno';
}

export function setDislike({ name }: IngredientsType) {
  UserPreferences.update((value) => {
    value.dislike = [...value.dislike, name];
    toast.success('Añadido ingrediente que detestas');
    return value;
  });
}

export function formatIngredient({ name, amount, unit }: IngredientsType) {
  if (!Number(amount) || !unit) return name;
  return `${name} (${amount} ${unit})`;
}

export function formatPrice(price: number | undefined) {
  if (!price) return;
  return Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(Number(price));
}