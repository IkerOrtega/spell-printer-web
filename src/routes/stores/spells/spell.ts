// src/lib/stores/spells.ts
import { derived, writable } from 'svelte/store';
import type { Spell } from './../../api/spells/Spell';

export const spellsStore = writable<Spell[]>([]);

// User controls
export const searchQuery = writable('');
export const typeFilter = writable<string | null>(null);
export const levelFilter = writable<string | null>(null);
export const sortBy = writable<'title' | 'level' | null>(null);
export const sortDir = writable<'asc' | 'desc'>('asc');

export const filteredSpells = derived(
	[spellsStore, searchQuery, typeFilter, levelFilter, sortBy, sortDir],
	([$spells, $search, $type, $level, $sortBy, $dir]) => {
		let result = [...$spells];

		// Search
		if ($search.trim() !== '') {
			const q = $search.toLowerCase();
			result = result.filter(
				(s) =>
					s.title.toLowerCase().includes(q) ||
					s.englishTitle.toLowerCase().includes(q)
			);
		}

		// Filter by type
		if ($type) {
			result = result.filter((s) => s.type === $type);
		}

		// Filter by level
		if ($level) {
			result = result.filter((s) => s.level === $level);
		}

		// Sorting
		if ($sortBy) {
			result.sort((a, b) => {
				const left = a[$sortBy]!;
				const right = b[$sortBy]!;

				if (left < right) return $dir === 'asc' ? -1 : 1;
				if (left > right) return $dir === 'asc' ? 1 : -1;
				return 0;
			});
		}

		return result;
	}
);