<script lang="ts">
	import { injectAnalytics } from "@vercel/analytics/sveltekit";
	import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

	import { onMount } from "svelte";

	let { children } = $props();

	onMount(() => {
        document.documentElement.dataset.theme = localStorage.theme;
	});

	injectSpeedInsights();
	injectAnalytics();
</script>

{@render children()}
