<script lang="ts">
	import { type Spell } from '../lib/Spell.ts';
	interface Props {
		spell: Spell;
		selected: boolean;
		onToggle: () => void;
	}

	let { spell, selected, onToggle }: Props = $props();
</script>

<li>
	<button type="button" class="spell-card" class:selected onclick={onToggle}>
		<strong>{spell.title}</strong>
		<div>Type: {spell.type}</div>
		<div>Level: {spell.level}</div>
	</button>
</li>

<style>
	.spell-card {
		width: 20rem;
		padding: 1rem;
		border-radius: 0.5rem;
		background: #f3f3f3;
	}
	.selected {
		border-color: #f3f;
		background: #f3f;
	}
</style>
