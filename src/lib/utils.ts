import type { DayType, IngredoemtsType } from './types';

import { get } from 'svelte/store';
import { Menus, UserPreferences } from '@/lib/stores';
import { readDataStream } from 'ai';
import toast from 'svelte-french-toast';

export async function generate(url: string, input: any) {
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

  try {
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (err) {
    return err;
  }
};

export function allMenuTitles() {
  const menus = get(Menus);

  return menus.map((menu: DayType) => ({
    weekDay: menu.week_day,
    breakfast: menu.breakfast[0].menu_label,
    lunch: menu.lunch[0].menu_label,
    dinner: menu.dinner[0].menu_label
  }));
}

export function getCurrentDay(): string {
  return new Intl.DateTimeFormat("es-ES", { weekday: 'long' }).format(new Date());
}

export function setLike(ingredient: string) {
  UserPreferences.update((value) => {
    value.like = [...value.like, ingredient];
    toast.success('Añadido ingrediente que te gusta');

    if (value.dislike.includes(ingredient)) {
      value.dislike = value.dislike.filter((item: string) => item !== ingredient);
    }

    return value;
  });

}

export function setDislike(ingredient: string) {
  UserPreferences.update((value) => {
    value.dislike = [...value.dislike, ingredient];
    toast.success('Añadido ingrediente que detestas');

    if (value.like.includes(ingredient)) {
      value.like = value.like.filter((item: string) => item !== ingredient);
    }
    return value;
  });
}

export function formatIngredient(ingredient: IngredoemtsType) {
  return `${ingredient.name} (${ingredient.amount}${ingredient.unit})`;
}