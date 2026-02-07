import { fetchSpells } from '$lib/api/spells.svelte';
import type { Spell } from '$lib/Spell';
import type { SpellResponse } from '$lib/SpellResponse';

export async function loadSpells() {
	try {
		const data: SpellResponse = await fetchSpells();

		// get only spells
		let spells: Spell[];
		spells = data.spellList.map((spell) => ({
			...spell
		}));

		return spells;
	} catch (e) {
		let error = e instanceof Error ? e.message : 'Unknow error';
		console.error(error);
	}
}



