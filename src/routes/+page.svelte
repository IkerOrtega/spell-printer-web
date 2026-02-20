<script lang="ts">
	import SelectedSpellsComponent from './SelectedSpellsComponent.svelte';
	import {loadSpells} from "$lib/hooks/useSpells.svelte";
	import type {Spell} from "$lib/Spell";
	import SpellComponent from "./PrintableSpellComponent.svelte";

	let spells = $state<Spell[]>([]);

	loadSpells().then(fetchedSpells => {
		if(fetchedSpells) {
			spells = fetchedSpells;
		} else {
			spells = [];
		}
	});

	// Search by title
	let search = $state('');
	let filteredSpells = $derived.by(() => {
		const query = search.trim().toLowerCase();

		if (!query) return spells;

		return spells.filter((spell) => spell.title.toLowerCase().includes(query));
	});

	// Selected Spells state. https://svelte.dev/docs/svelte/$state
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
<div class="body">
	<section class="controls">
		<label class="search">
			<span>Buscar conjuros</span>
			<input type="search" placeholder="Ej: fuego, curación..." bind:value={search} />
		</label>
	</section>
<section class="spellContainer">
	<div>
		<SelectedSpellsComponent spells={selectedSpells} />
	</div>
	<div>
		<ul class="spell-list">
			{#each filteredSpells as spell}
				<SpellComponent
					{spell}
					selected={selectedIds.has(spell.englishTitle)}
					onToggle={() => toggleSpell(spell.englishTitle)}
				/>
			{/each}
		</ul>
	</div>
</section>
	<section class="print-only">
		<ul class="spell-list">
			{#each selectedSpells as spell}
				<SpellComponent
						{spell}
						selected={false}
						onToggle={() => toggleSpell(spell.englishTitle)}
				/>
			{/each}
		</ul>
	</section>
</div>
<style>

	.search {
		input {
			border: black solid 1px;
		}
	}
	.spellContainer {
		display: grid;
		grid-template-columns: 20% 80%;
	}
	.print-only {
		display: none !important;
	}


	.controls {
		display: flex;
		/*gap: 1rem;*/
		margin-bottom: 1.5rem;
	}
	.spell-list {
		width: 21cm;
		list-style: none;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0;
	}

	@media print {
		.body > * {
			display: none !important;
		}
		.print-only {
			display: block !important;
		}


	}

</style>
