<script lang="ts">
	import type { PageProps } from './$types';

    import VDay from "$lib/components/cards/VDay.svelte";
    import Pickup from '$lib/components/cards/Pickup.svelte';
    import BMV from '$lib/components/cards/BMV.svelte';

    import Countdown from '$lib/components/cards/Countdown.svelte';

	let { data }: PageProps = $props();

    let isValentinesDay = $state(false);
    const currentDate: any = new Date();
    const futureDate: any = new Date("2025-02-14T00:00:00");

    if(data.isDev) {
        isValentinesDay = true;
    } else {
        isValentinesDay = currentDate >= futureDate;
    }
</script>

{#if !isValentinesDay}
    <Countdown />
{:else if data.pageData.pageType == "vday"}
    <VDay data={data.pageData} />
{:else if data.pageData.pageType == "pickup"}
    <Pickup data={data.pageData} />
{:else if data.pageData.pageType == "bmv"}
    <BMV data={data.pageData} />
{/if}