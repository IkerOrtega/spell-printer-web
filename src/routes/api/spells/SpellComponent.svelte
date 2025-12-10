<script lang="ts">
	import { type Spell } from './Spell.ts';

	interface Props {
		spell: Spell;
	}

	let { spell }: Props = $props();

    function toggleSelected (){
        spell.selected = !spell.selected;
        console.log("selected: " + spell.selected);

    }
</script>
<button onclick={() => toggleSelected()} >
    <li class="spell-card" class:selected={spell.selected}>
        <strong>{spell.title}</strong>
        <div>Type: {spell.type}</div>
        <div>Level: {spell.level}</div>
    </li>
</button>
<style>
	.spell-card {
		padding: 1rem;
		border-radius: 0.5rem;
		background: #f3f3f3;


	}
    .selected {
        border-color: #f3f;
        background: #f3f;
    }


</style>
