<script lang="ts">
    import "$lib/css/pickup.css";
    import CardTags from "../CardTags.svelte";

    let { data } = $props();

    let valentineState = $state(1);
    let noFailCount = $state(5);

    const yesButton = function () {
        valentineState = 2;
    };

    const noButton = function () {
        if (data.noFail) {
            valentineState = 2;
        } else noFailCount++;
    }; 
</script>

<svelte:head>
    <title>The Big Question o_O</title>
    <meta name="description" content="The Big Question o_O" />

    <CardTags />

    <link rel="icon" type="image/png" href="/cupid.png" />
</svelte:head>

<main class="min-h-screen w-full flex flex-col {data.colors.backgroundColor}">
    <div class="mx-auto container space-y-15 px-4 py-20">
        <section class="space-y-10 mx-auto my-10">
            {#if valentineState == 1}
                {#if data.image.initial.enabled}
                    <img
                        src={data.image.initial.url}
                        alt="optional_gif"
                        class="mx-auto w-1/2 lg:w-1/4"
                    />
                {/if}
                <h1
                    class="text-6xl text-center font-bold {data.colors.titleTextColor} lg:text-7xl"
                >
                    Will You Be My Valentine?
                </h1>
                <div class="flex justify-center space-x-4">
                    <button
                        class="btn mx-4 {data.colors.buttonBGColor}"
                        style="font-size: {noFailCount*10}px; padding: {noFailCount*10}px;"
                        onclick={yesButton}
                    >
                        {data.ButtonsOptions[0].text}
                    </button>
                    <button
                        class="btn mx-4 {data.colors.buttonBGColor}"
                        style="font-size: {noFailCount == 5 ? 50 : 50 - noFailCount*2}px; padding: {noFailCount == 5 ? 50 : 50 - noFailCount*2}px;"
                        onclick={noButton}
                    >
                        {data.ButtonsOptions[1].text}
                    </button>
                </div>
            {:else}
                <button
                    class="btn mx-auto text-xl p-5 lg:text-3xl {data.colors.buttonBGColor}"
                    onclick={() => {
                        valentineState = 1;
                        noFailCount = 4;
                    }}
                >
                    Go Back
                </button>
                {#if data.image.followUp.enabled}
                    <img
                        src={data.image.followUp.url}
                        alt="optional_gif"
                        class="mx-auto w-1/2 lg:w-1/4"
                    />
                {/if}
                <h1
                    class="text-6xl text-center font-bold {data.colors.titleTextColor} lg:text-7xl"
                >
                    {data.followUpMessage}
                </h1>
            {/if}
        </section>
    </div>
</main> 