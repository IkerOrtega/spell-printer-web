import { PUBLIC_SPELLS_API } from '$env/static/private';
import type { SpellResponse } from '$lib/SpellResponse';

export async function fetchSpells(): Promise<SpellResponse> {
	const res = await fetch(PUBLIC_SPELLS_API);

	if (!res.ok) {
		throw new Error(`HTTP ${res.status}`);
	}

	return res.json();
}