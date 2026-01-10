<script lang="ts">
	import type { Spell } from '$lib/Spell';
	import type { SpellResponse } from '../lib/SpellResponse.ts';
	import SelectedSpellsComponent from './SelectedSpellsComponent.svelte';
	import SpellComponent from './SpellComponent.svelte';

	let spells = $state<Spell[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);

	async function loadSpells() {
		try {
			const res = await fetch('http://localhost:8082/api/v1/spell');

			if (!res.ok) {
				throw new Error(`HTTP ${res.status}`);
			}

			const data: SpellResponse = await res.json();

			// 🔥 Adaptamos datos de API → UI
			spells = data.spellList.map((spell) => ({
				...spell
			}));
		} catch (e) {
			error = e instanceof Error ? e.message : 'Unknow error';
		} finally {
			loading = false;
		}
	}

	loadSpells();

	// Search by title
	let search = $state('');
	let filteredSpells = $derived.by(() => {
		const query = search.trim().toLowerCase();

		if (!query) return spells;

		return spells.filter((spell) => spell.title.toLowerCase().includes(query));
	});

	// Slected Spells state. https://svelte.dev/docs/svelte/$state
	let selectedIds = $state<Set<string>>(new Set());

	function toggleSpell(id: string) {
		const next = new Set(selectedIds);

		next.has(id) ? next.delete(id) : next.add(id);

		selectedIds = next;
	}

	// Selected Spells.
	let selectedSpells = $derived.by(() =>
		spells.filter((spell) => selectedIds.has(spell.englishTitle))
	);
</script>

<h1 class="title">Buscador de Conjuros.</h1>

<section class="controls">
	<label class="search">
		<span>Buscar hechizo</span>
		<input type="search" placeholder="Ej: fuego, curación..." bind:value={search} />
	</label>
</section>

<section class="gridContainer">
	<ul class="spell-list">
		{#each filteredSpells as spell}
			<SpellComponent
				{spell}
				selected={selectedIds.has(spell.englishTitle)}
				onToggle={() => toggleSpell(spell.englishTitle)}
			/>
		{/each}
	</ul>
	<div>
		<SelectedSpellsComponent spells={selectedSpells} />
	</div>
</section>

<style>
	.title {
		font-size: 2rem;
		margin-bottom: 1rem;
	}
	.controls {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}
	.spell-list {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 1rem;
	}
	.gridContainer {
		display: grid;
		grid-template-columns: 0.2fr 0.8fr;
	}
</style>
