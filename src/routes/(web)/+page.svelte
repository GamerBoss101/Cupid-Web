<script lang="ts">
    import TemplateCard from "$lib/components/TemplateCard.svelte";
    import PreviewCard from "$lib/components/PreviewCard.svelte";

    let messages = [
        "Shoot Your Shot!",
        "Love is in the air!",
        "Cupid is here to help!",
    ];

    let currentMessage = messages[Math.floor(Math.random() * messages.length)];
</script>


<main class="container mx-auto space-y-10 px-4 py-20">
    <img class="w-1/6 mx-auto" src="/cupid.png" alt="cupid"/>
    <h1 class="text-4xl font-semibold text-center">{currentMessage}</h1>

    <section id="create" class="space-y-2">
        <h2 class="text-2xl font-semibold">Create a Card Valentine</h2>
        <p class="text-lg">
            Create a valentine for your person/s. 
            You can choose from a variety of templates and customize it to your liking.
        </p>

        <div class="card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TemplateCard title="Valentine's Day Card" description="This is a simple valentine's day card" link="/demos/vday" />
        </div>
    </section>

    <section id="preview" class="space-y-2">
        <h2 class="text-2xl font-semibold">Preview a Card</h2>
        <p class="text-lg">
            Preview a valentine card that has been created by someone else.
        </p>

        <div class="card-grid grid grid-rows-1 gap-4">
            <PreviewCard />
        </div>

    </section>

</main>