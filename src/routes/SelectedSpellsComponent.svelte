<script lang="ts">
	import type { Spell } from '../lib/Spell';

	interface Props {
		spells: Spell[];
	}

	let { spells }: Props = $props();
</script>

<h3>Hechizos seleccionados</h3>
<section class="selected-spells">


	{#if spells.length === 0}
		<p class="empty">No hay hechizos seleccionados</p>
	{:else}
		<ul>
			{#each spells as spell}
				<li class="selected-card">
					<strong>{spell.title}</strong>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	h3 {
		text-align: center;
	}
	.selected-spells {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}


</style>
