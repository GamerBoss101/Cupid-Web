<script>
    import Icon from "@iconify/svelte";
    import LightSwitch from "./LightSwitch.svelte";
    
    let isOpen = false;
    const toggleMenu = () => (isOpen = !isOpen);
</script>

<nav class="sticky top-0 z-50 shadow-xl text-black dark:text-white bg-pink-300 dark:bg-pink-800">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4">
            <!-- Logo -->
            <h1 class="text-xl font-semibold"><a href="/">Cupid Web</a></h1>

            <!-- Mobile Menu Button -->
            <button class="md:hidden justify-self-end" on:click={toggleMenu}>
                {#if isOpen}
                    <Icon icon="eva:close-outline" class="w-6 h-6" />
                {:else}
                    <Icon icon="eva:menu-outline" class="w-6 h-6" />
                {/if}
            </button>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center gap-4 justify-center">
                <a href="/#create" class="btn variant-ghost">Create</a>
                <a href="/#edit" class="btn variant-ghost">Edit</a>
            </div>

            <!-- Light Switch -->
            <div class="justify-self-end">
                <LightSwitch />
            </div>
        </div>

        <!-- Mobile Menu -->
        {#if isOpen}
            <div class="md:hidden p-4 space-y-2">
                <a href="/#create" class="btn variant-ghost">Create</a>
                <a href="/#edit" class="btn variant-ghost">Edit</a>
            </div>
        {/if}
    </div>
</nav>