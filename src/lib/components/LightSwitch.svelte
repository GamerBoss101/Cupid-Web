<script lang="ts">
	import { onMount } from "svelte";
	import Icon from "@iconify/svelte";

	let isDark: boolean;

	onMount(() => {
		const darkMode = localStorage.theme;
		isDark = darkMode === "dark";
	});

	function toggleTheme() {
		isDark = !isDark;
		localStorage.theme = isDark ? "dark" : "light";

		document.documentElement.dataset.theme = localStorage.theme;
	}
</script>

<button
	class="btn variant-ghost-surface"
	on:click={toggleTheme}
	aria-label="Light Switch"
>
	{#if isDark}
		<Icon icon="mdi:weather-sunny" class="w-6 h-6" />
	{:else}
		<Icon icon="mdi:weather-night" class="w-6 h-6" />
	{/if}
</button>

<style>
	button {
		transition: all 0.2s ease-in-out;
	}
	button:hover {
		transform: scale(1.1);
	}
</style>
