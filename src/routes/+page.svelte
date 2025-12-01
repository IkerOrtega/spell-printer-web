<script lang="ts">
	export let data;
	const spells = data.spells;
</script>

<h1>Spells</h1>

<ul>
	{#each spells as spell, index}
		<li>{index} – {spell.title}</li>

		{console.log(spell)}
	{/each}
</ul>

<style>
	h1 {
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
	}
</style>
