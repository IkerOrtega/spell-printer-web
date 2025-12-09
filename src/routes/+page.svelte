<script lang="ts">
	import SpellComponent from './api/spells/SpellComponent.svelte';
	import {
		filteredSpells,
		levelFilter,
		searchQuery,
		sortBy,
		sortDir,
		spellsStore,
		typeFilter
	} from './stores/spells/spellFilter.ts';
	export let data;

	// Load spells from backend into the store
	$spellsStore = data.spells;

	// Extract available types and levels dynamically
	const types = [...new Set(data.spells.map((s) => s.type))];
	const levels = [
		...new Set(
			data.spells
				.map((s) => Number.parseInt(s.level))
				.sort((a, b) => a - b)
		)
	];
</script>

<h1 class="title">Buscador de Hechizos.</h1>

<section class="controls">
	<input type="text" placeholder="Buscar por título..." bind:value={$searchQuery} />

	<select bind:value={$typeFilter}>
		<option value={null}>Todos los tipos</option>
		{#each types as t}
			<option value={t}>{t}</option>
		{/each}
	</select>

	<select bind:value={$levelFilter}>
		<option value={null}>Todos los niveles</option>
		{#each levels as lvl}
			<option value={lvl}>{lvl}</option>
		{/each}
	</select>

	<select bind:value={$sortBy}>
		<option value={null}>Sin filtro</option>
		<option value="title">Filtrar por título</option>
		<option value="level">Fitrar por nivel</option>
	</select>

	<select bind:value={$sortDir}>
		<option value="asc">Asc</option>
		<option value="desc">Desc</option>
	</select>
</section>

<section class="gridContainer">
	<ul class="spell-list">
		{#each $filteredSpells as spell}
			<SpellComponent {spell}></SpellComponent>
		{/each}
	</ul>
	<div>
		<p>De alguna forma mágica aquí se van a pintar las cartas</p>
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
