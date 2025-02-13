<script lang="ts">
    import "$lib/css/vday.css";

    export let data;
</script>

<svelte:head>
    <title>Happy Valentine's Day</title>
    <meta name="description" content="Happy Valentine's Day" />
    <meta name="keywords" content="Happy Valentine's Day" />

    <link rel="icon" type="image/png" href="/cupid.png" />
</svelte:head>

<main class="min-h-screen flex flex-col {data.colors.backgroundColor}">
    <div class="mx-auto space-y-10 px-4 py-20">
        <h1 class="text-7xl text-center font-bold {data.colors.titleTextColor} lg:text-8xl">
            Happy Valentine's Day
        </h1>
        <p class="text-3xl lg:text-4xl">{data.message}</p>
        <br />
        <p class="text-2xl lg:text-3xl {data.colors.signatureTextColor}">
            {data.signature}
            {data.name}
        </p>
        {#if data.image.enabled}
            <img
                src="{data.image.url}"
                alt="optional_gif"
                class="mx-auto w-1/2 lg:w-1/3"
            />
        {/if}
    </div>
</main>