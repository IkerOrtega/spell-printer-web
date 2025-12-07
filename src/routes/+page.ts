// +page.ts
import type { PageLoad } from './$types';
import type { SpellResponse } from './api/spells/SpellResponse';
import {PUBLIC_SPELLS_API} from '$env/static/public'

export const load: PageLoad = async () => {
	const res = await fetch(PUBLIC_SPELLS_API);
	const data: SpellResponse = await res.json();

	return {
		spells: data.spellList
	};
};