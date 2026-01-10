import type { Spell } from '$lib/Spell';


export interface SpellResponse {
	size: number;
	filter: string;
	spellList: Spell[];
}