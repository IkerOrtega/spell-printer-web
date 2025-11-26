<script>
	//import type { Spell } from './api/spells/Spell';

	const options = {
		method: 'GET'
	};

	const spells = fetch('http://localhost:8080/api/v1/spell', options)
		.then((response) => response.json())
		.then((response) => console.log(response))
		.catch((err) => console.error(err));
</script>

{#await spells then}
	{console.log(spells)}
{/await}

<h1>Hola mundo</h1>

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
