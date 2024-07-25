import { UserPreferences } from '@/lib/stores';
import toast from 'svelte-french-toast';

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