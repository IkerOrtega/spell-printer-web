// src/lib/stores/spells.ts
import { writable } from 'svelte/store';
import type { Spell } from '../../api/spells/Spell';

function createSpellStore() {
	const stored = localStorage.getItem('spells');
	const initial = stored ? (JSON.parse(stored) as Spell[]) : [];

	const store = writable<Spell[]>(initial);

	store.subscribe((value) => {
		localStorage.setItem('spells', JSON.stringify(value));
	});

	return store;
}

export const spellsStore = createSpellStore();