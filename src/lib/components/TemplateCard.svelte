<script lang="ts">

    export let title: string;
    export let description: string;
    export let link: string;

</script>

<div class="card bg-pink-100 dark:bg-pink-700 p-4 rounded-lg shadow-md space-y-2">
    <h3 class="text-center text-xl font-semibold">{title}</h3>
    <p class="text-lg">{description}</p>
    <a href="{link}" class="btn mx-auto flex bg-pink-500 text-white">Create</a>
</div>