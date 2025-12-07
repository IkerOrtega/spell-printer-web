<script lang="ts">
	import {
		filteredSpells,
		levelFilter,
		searchQuery,
		sortBy,
		sortDir,
		spellsStore,
		typeFilter
	} from './stores/spells/spell.ts';
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

<h1 class="title">Spell Browser</h1>

<section class="controls">
	<input type="text" placeholder="Search spells..." bind:value={$searchQuery} />

	<select bind:value={$typeFilter}>
		<option value={null}>All Types</option>
		{#each types as t}
			<option value={t}>{t}</option>
		{/each}
	</select>

	<select bind:value={$levelFilter}>
		<option value={null}>All Levels</option>
		{#each levels as lvl}
			<option value={lvl}>{lvl}</option>
		{/each}
	</select>

	<select bind:value={$sortBy}>
		<option value={null}>No Sorting</option>
		<option value="title">Sort by Title</option>
		<option value="level">Sort by Level</option>
	</select>

	<select bind:value={$sortDir}>
		<option value="asc">Asc</option>
		<option value="desc">Desc</option>
	</select>
</section>

<ul class="spell-list">
	{#each $filteredSpells as spell}
		<li class="spell-card">
			<strong>{spell.title}</strong>
			<div>Type: {spell.type}</div>
			<div>Level: {spell.level}</div>
		</li>
	{/each}
</ul>

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
	.spell-card {
		padding: 1rem;
		border-radius: 0.5rem;
		background: #f3f3f3;
	}
</style>
