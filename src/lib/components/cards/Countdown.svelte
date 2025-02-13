<script lang="ts">
    import { onMount } from "svelte";

    let dayElement: HTMLSpanElement, hourElement: HTMLSpanElement, minuteElement: HTMLSpanElement, secondElement: HTMLSpanElement;
    let days = 0, hours = 0, minutes = 0, seconds = 0;
    const futureDate: any = new Date("2025-02-14T00:00:00");
    
    const countdown = () => {
        const currentDate: any = new Date();

        const difference = futureDate - currentDate;

        days = Math.floor(difference / (1000 * 60 * 60 * 24));
        hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((difference % (1000 * 60)) / 1000);

        dayElement.innerText = String(days);
        hourElement.innerText = String(hours);
        minuteElement.innerText = String(minutes);
        secondElement.innerText = String(seconds);
    };

    onMount(() => {
        setInterval(countdown, 1000);
    });
</script>

<svelte:head>
    <title>Not Yet :)</title>

    <link rel="icon" type="image/png" href="/cupid.png" />
</svelte:head>

<main class="min-h-screen flex flex-col bg-slate-400">
    <div class="mx-auto space-y-5 px-4 py-20">
        <h1 class="text-7xl text-center font-bold text-red-500 lg:text-8xl">
            Not Yet :)
        </h1>
        <p class="text-3xl lg:text-4xl text-center">Valentine's Day is in</p>
        <div class="flex justify-center space-x-4">
            <div class="text-2xl lg:text-3xl">
                <span class="text-pink-700" bind:this={dayElement}></span> Days
            </div>
            <div class="text-2xl lg:text-3xl">
                <span class="text-pink-700" bind:this={hourElement}></span> Hours
            </div>
            <div class="text-2xl lg:text-3xl">
                <span class="text-pink-700" bind:this={minuteElement}></span> Minutes
            </div>
            <div class="text-2xl lg:text-3xl">
                <span class="text-pink-700" bind:this={secondElement}></span> Seconds
            </div>
        </div>
    </div>
</main>