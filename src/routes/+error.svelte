<script>
    import "../app.css";
    import { onMount } from 'svelte';
    onMount(() => {
        const darkMode = localStorage.theme;

        if (darkMode === 'dark') {
            document.documentElement.classList.add('dark');
        }
    });
</script>

<svelte:head>
    <title>Where are you going?</title>
    <link rel="icon" type="image/png" href="/cupid.png" />
</svelte:head>

<main class="min-h-screen flex bg-pink-200 dark:bg-pink-900 space-y-20 px-4 py-20">
    <h1 class="mx-auto font-bold text-6xl">404 or 500 or idk :(</h1>
</main>