<script lang="ts">
	import '../../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>Cupid Web</title>
	<meta name="description" content="Cupid Web" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="icon" type="image/png" href="/cupid.png" />
</svelte:head>


<main class="min-h-screen flex flex-col bg-pink-200 dark:bg-pink-900">
	<NavBar />
	{@render children()}
	<Footer />
</main>

<style>
	@import url('/Montserrat.css');

	main {
		font-family: 'Montserrat', sans-serif !important;
	}
</style>