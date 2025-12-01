import type { Spell } from './Spell';


export interface SpellResponse {
	size: number;
	filter: string;
	spellList: Spell[];
}