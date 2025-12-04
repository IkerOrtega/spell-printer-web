<script lang="ts">
	import { type Spell } from './Spell.ts';

	interface Props {
		spell: Spell;
	}

	let { spell }: Props = $props();
</script>

<li class="spell-card">
	<strong>{spell.title}</strong>
	<div>Type: {spell.type}</div>
	<div>Level: {spell.level}</div>
</li>

<style>
	.spell-card {
		padding: 1rem;
		border-radius: 0.5rem;
		background: #f3f3f3;
	}
</style>
