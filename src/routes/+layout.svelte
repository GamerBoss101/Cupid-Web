<script lang="ts">
    import { injectAnalytics } from '@vercel/analytics/sveltekit';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

    import { onMount } from 'svelte';

    let { children } = $props();

    onMount(() => {
        document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        );
    });

    injectSpeedInsights();
    injectAnalytics();
</script>

{@render children()}