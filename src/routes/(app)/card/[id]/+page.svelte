<script lang="ts">
	import type { PageProps } from './$types';

    import VDay from "./VDay.svelte";

    import Countdown from './Countdown.svelte';

	let { data }: PageProps = $props();


    let isValentinesDay = $state(false);
    const currentDate: any = new Date();
    const futureDate: any = new Date("2025-02-14T00:00:00");
    isValentinesDay = true; //currentDate >= futureDate;

</script>

{#if !isValentinesDay}
    <Countdown />
{:else if data.pageType == "vday"}
    <VDay data={data.pageData} />
{/if}