<script lang="ts">
	import SelectedSpellsComponent from './SelectedSpellsComponent.svelte';
	import SpellComponent from './SpellComponent.svelte';
	import {loadSpells} from "$lib/hooks/useSpells.svelte";
	import type {Spell} from "$lib/Spell";
	import PrintableSpellComponent from "./PrintableSpellComponent.svelte";

	let spells = $state<Spell[]>([]);

	function printPdf() {
		window.print();
	}

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
<div class="body">
	<h1 class="title">Buscador de Conjuros.</h1>

	<section class="controls">
		<label class="search">
			<span>Buscar hechizo</span>
			<input type="search" placeholder="Ej: fuego, curación..." bind:value={search} />
		</label>
		<button class="print" onclick="{printPdf}">Imprimir</button>
	</section>
<section class="spellContainer">
	<div>
		<SelectedSpellsComponent spells={selectedSpells} />
	</div>
	<div>
		<ul class="spell-list">
			{#each filteredSpells as spell}
				<PrintableSpellComponent
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
				<PrintableSpellComponent
						{spell}
						selected={selectedIds.has(spell.englishTitle)}
						onToggle={() => toggleSpell(spell.englishTitle)}
				/>
			{/each}
		</ul>
	</section>
</div>
<style>

	.spellContainer {
		display: grid;
		grid-template-columns: 20% 80%;
	}
	.print-only {
		display: none !important;
	}

	.title {
		font-size: 2rem;
		margin-bottom: 1rem;
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
