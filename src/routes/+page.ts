// +page.ts
import type { PageLoad } from './$types';
import type { SpellResponse } from './api/spells/SpellResponse';

export const load: PageLoad = async () => {
	const res = await fetch('');// TODO Use .env
	const data: SpellResponse = await res.json();
	return {
		spells: data.spellList
	};
};