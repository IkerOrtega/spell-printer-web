<script lang="ts">
	import type { Spell } from '../lib/Spell';

	interface Props {
		spells: Spell[];
	}

	let { spells }: Props = $props();
</script>

<section class="selected-spells">
	<h3>Hechizos seleccionados</h3>

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
