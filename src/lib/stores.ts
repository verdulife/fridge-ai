import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultUser = {};
const localUser = browser && localStorage.getItem("userData");
export const User = writable(localUser ? JSON.parse(localUser) : defaultUser);
User.subscribe((value) => browser && (localStorage.userData = JSON.stringify(value)));