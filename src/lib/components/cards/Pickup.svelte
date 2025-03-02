<script lang="ts">
    import "$lib/css/pickup.css";
    import CardTags from "../CardTags.svelte";

    let { data } = $props();

    let pickupState = $state(1);
</script>

<svelte:head>
    <title>Getting Picked Up ;)</title>
    <meta name="description" content="Getting Picked Up ;)" />

    <CardTags />

    <link rel="icon" type="image/png" href="/cupid.png" />
</svelte:head>

<main class="min-h-screen w-full flex flex-col {data.colors.backgroundColor}">
    <div class="mx-auto container space-y-10 px-4 py-5">
        <section class="space-y-5 mx-auto my-10">
            {#if pickupState != 1}
                <button
                    class="btn mx-auto text-2xl p-5 lg:text-4xl lg:p-6 {data.colors.buttonBGColor}"
                    onclick={() => (pickupState = 1)}
                >
                    Go Back
                </button>
            {/if}
            <h1
                class="text-6xl text-center font-bold {data.colors.titleTextColor} lg:text-7xl"
            >
                {pickupState == 1 ? data.pickupLine : data.followUpLine}
            </h1>
            {#if pickupState != 1 && data.image.enabled}
                <img
                    src={data.image.url}
                    alt="optional_gif"
                    class="mx-auto w-1/2 lg:w-1/3"
                />
            {/if}
            {#if pickupState == 1}
                <div class="flex justify-center space-x-4">
                    {#each data.ButtonsOptions as option}
                        <button
                            class="btn mx-4 text-3xl p-6 lg:text-5xl lg:p-8 {data.colors.buttonBGColor}"
                            onclick={() => (pickupState = 2)}
                        >
                            {option.text}
                        </button>
                    {/each}
                </div>
            {/if}
        </section>
    </div>
</main>