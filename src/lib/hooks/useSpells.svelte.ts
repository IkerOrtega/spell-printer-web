import { fetchSpells } from '$lib/api/spells.svelte';
import type { Spell } from '$lib/Spell';
import type { SpellResponse } from '$lib/SpellResponse';

export function useSpells() {
	let spells = $state<Spell[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);

	async function load() {
		loading = true;
		error = null;

		try {
			const data: SpellResponse = await fetchSpells();

			// get only spells
			spells = data.spellList.map((spell) => ({
				...spell
			}));

            console.log(spells);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Unknow error';
		} finally {
			loading = false;
		}
	}

	load();

	return {
		spells,
		loading,
		error,
		reload: load
	};
}





