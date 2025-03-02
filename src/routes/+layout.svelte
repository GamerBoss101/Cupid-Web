<script lang="ts">
	import { injectAnalytics } from "@vercel/analytics/sveltekit";
	import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

	let { children } = $props();

	injectSpeedInsights();
	injectAnalytics();
</script>

{@render children()}
