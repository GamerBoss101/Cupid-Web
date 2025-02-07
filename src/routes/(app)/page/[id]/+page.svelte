<script lang="ts">
	import type { PageProps } from './$types';

    import VDay from "./VDay.svelte";

	let { data }: PageProps = $props();
    let pageData: any = data.pageData;
</script>

{#if data.pageType == "vday"}
    <VDay data={pageData} />
{/if}