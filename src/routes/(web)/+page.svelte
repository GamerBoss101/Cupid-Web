<script lang="ts">

    let messages = [
        "Shoot Your Shot!",
        "Love is in the air!",
        "Cupid is here to help!",
    ];

    let currentMessage = messages[Math.floor(Math.random() * messages.length)];
</script>


<main class="container mx-auto space-y-10 px-4 py-10">
    <img class="w-1/6 mx-auto" src="/cupid.png" alt="cupid"/>
    <h1 class="text-4xl font-semibold text-center">{currentMessage}</h1>
</main>