<script lang="ts">
    import TemplateCard from "$lib/components/TemplateCard.svelte";

    let messages = [
        "Shoot Your Shot!",
        "Love is in the air!",
        "Cupid is here to help!",
    ];

    let currentMessage = messages[Math.floor(Math.random() * messages.length)];
</script>


<main class="container mx-auto space-y-6 px-6 py-20">
    <img class="w-1/6 mx-auto" src="/cupid.png" alt="cupid"/>
    <h1 class="text-4xl font-semibold text-center text-pink-700 dark:text-pink-200">{currentMessage}</h1>
    <p class="text-2xl text-center text-pink-700 dark:text-pink-200">
        Create a valentine for your person/s. 
        You can choose from a variety of templates and customize it to your liking.
    </p>

    <section id="create" class="py-20 space-y-3 card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TemplateCard title="Valentine's Day Card" description="This is a simple valentine's day card" link="/demos/vday" />
    </section>

    <section id="edit" class="space-y-2 py-20">

        <div class="card bg-pink-100 dark:bg-pink-700 p-4 rounded-lg shadow-md space-y-2 w-1/2 mx-auto">
            <h2 class="text-2xl font-semibold text-center">Edit a Card</h2>
            <p class="text-lg">
                Edit a valentine that you have already created. 
                You can customize it to your liking.
            </p>
    
            <form>
                <div class="flex flex-col space-y-2">
                    <label for="id" class="text-lg">Card Id</label>
                    <input type="text" id="id" name="id" placeholder="Card Id" class="input" />
                    <label for="password" class="text-lg">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" class="input" />
                    <button type="submit" class="btn bg-pink-500 text-white">Edit</button>
                </div>
            </form>
        </div>

    </section>

</main>