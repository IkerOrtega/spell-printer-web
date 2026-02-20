<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();

	function printPdf() {
		window.print();
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<h1 class="title">Buscador de Conjuros</h1>
	<button class="print" onclick="{printPdf}">Imprimir</button>

</svelte:head>

{@render children()}

<style>
	.title {
		font-size: 2rem;
		margin-bottom: 1rem;
		text-align: center;
	}
</style>