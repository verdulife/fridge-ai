import type { DayType, IngredientsType } from './types';

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

  console.log(data);

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
    breakfast: menu.breakfast.label,
    lunch: menu.lunch.label,
    dinner: menu.dinner.label
  }));
}

export function getCurrentDay(): string {
  return new Intl.DateTimeFormat("es-ES", { weekday: 'long' }).format(new Date());
}

export function setLike({ name }: IngredientsType) {
  UserPreferences.update((value) => {
    value.like = [...value.like, name];
    toast.success('Añadido ingrediente que te gusta');

    if (value.dislike.includes(name)) {
      value.dislike = value.dislike.filter((item: string) => item !== name);
    }

    return value;
  });

}

export function setDislike({ name }: IngredientsType) {
  UserPreferences.update((value) => {
    value.dislike = [...value.dislike, name];
    toast.success('Añadido ingrediente que detestas');

    if (value.like.includes(name)) {
      value.like = value.like.filter((item: string) => item !== name);
    }
    return value;
  });
}

export function formatIngredient({ name, amount, unit }: IngredientsType) {
  return `${name} (${amount}${unit ? " " : ""}${unit})`;
}

export function formatPrice(price: number) {
  return Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(Number(price));
}