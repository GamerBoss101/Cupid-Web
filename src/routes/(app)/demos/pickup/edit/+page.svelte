<script lang="ts">
    import "$lib/css/pickup.css";
    import type { PageProps } from "./$types";

    import { goto } from "$app/navigation";

    let { data }: PageProps = $props();

    let pickupState = $state(1);

    let PickupLine = $state(data.pageData.pickupLine);
    let FollowUpLine = $state(data.pageData.followUpLine);

    let ButtonsOptions: any = $state(data.pageData.ButtonsOptions);

    let showImage = $state(data.pageData.image.enabled),
    imageSrc = $state(data.pageData.image.url);

    let backgroundColor = $state(data.pageData.colors.backgroundColor),
        titleTextColor = $state(data.pageData.colors.titleTextColor),
        buttonBGColor = $state(data.pageData.colors.buttonBGColor);

    const onColorBGChange = (e: any) => {
        backgroundColor = e.target.value;
    };
    const onColorTitleChange = (e: any) => {
        titleTextColor = e.target.value;
    };
    const onButtonBGColorChange = (e: any) => {
        buttonBGColor = e.target.value;
    };
    const onShowImageChange = (e: any) => {
        showImage = e.target.value === "true";
    };

    const addOption = () => {
        if (ButtonsOptions.length >= 5) return;
        ButtonsOptions = [
            ...ButtonsOptions,
            {
                text: "",
                value: ButtonsOptions.length + 1,
            },
        ];
    };

    const removeOption = (event: any) => {
        ButtonsOptions = ButtonsOptions.filter((option: any) => {
            return option.value !== event.value;
        });
    };

    let pageData: any = $state(null);

    async function updatePickUpPage() {
        let obj = {
            id: data.pageData.id,
            pickupLine: PickupLine,
            followUpLine: FollowUpLine,
            ButtonsOptions,
            image: {
                url: imageSrc,
                enabled: showImage,
            },
            colors: {
                backgroundColor,
                titleTextColor,
                buttonBGColor,
            },
        };

        pageData = await (
            await fetch("/card/pickup", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            })
        ).json();
    }

    async function deletePage() {
        pageData = await (
            await fetch("/card/pickup", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: data.pageData.id }),
            })
        ).json();

        return goto("/", { replaceState: true });
    }
</script>

<svelte:head>
    <title>Getting Picked Up ;)</title>
    <meta name="description" content="Getting Picked Up ;)" />

    <link rel="icon" type="image/png" href="/cupid.png" />
</svelte:head>

<main class="min-h-screen w-full flex flex-col {backgroundColor}">
    <div class="mx-auto container space-y-15 px-4 py-20">
        <section class="space-y-10 mx-auto my-10">
            {#if pickupState != 1}
                <button
                    class="btn mx-auto text-3xl p-6 lg:text-5xl lg:p-8 {buttonBGColor}"
                    onclick={() => (pickupState = 1)}
                >
                    Go Back
                </button>
            {/if}
            <h1
                class="text-6xl text-center font-bold {titleTextColor} lg:text-7xl"
            >
                {pickupState == 1 ? PickupLine : FollowUpLine}
            </h1>
            {#if pickupState != 1 && showImage}
                <img
                    src={imageSrc}
                    alt="optional_gif"
                    class="mx-auto w-1/2 lg:w-1/3"
                />
            {/if}
            {#if pickupState == 1}
                <div class="flex justify-center space-x-4">
                    {#each ButtonsOptions as option}
                        <button
                            class="btn mx-4 text-3xl p-6 lg:text-5xl lg:p-8 {buttonBGColor}"
                            onclick={() => (pickupState = 2)}
                        >
                            {option.text}
                        </button>
                    {/each}
                </div>
            {/if}
        </section>
        <section class="mx-auto">
            <div
                class="mfont card preset-filled-surface-100-900 dark:preset-filled-surface-100-900 p-6 text-center mx-auto grid grid-flow-row w-3/4"
            >
                {#if pageData != null}
                    <h2 class="mx-auto text-2xl">
                        Your page has been created successfully!
                        <br />
                        Page Code: <code>{pageData.id}</code>
                        <br />
                        Page Password: <code>{pageData.password}</code>
                        <br />
                        <span class="text-sm">
                            (Please note this down for future reference if you
                            want to edit the page)
                        </span>
                    </h2>
                    <br />
                    <a
                        href="/card/{pageData.id}"
                        class="btn preset-filled-primary-500">View Page</a
                    >
                {:else}
                    <h1 class="mx-auto text-3xl">Settings</h1>
                    <br />
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <label class="label mx-auto">
                            <span class="label-text">Background Color</span>
                            <select class="select" onchange={onColorBGChange}>
                                <option value="bg-pink-300">Pink</option>
                                <option value="bg-red-200">Red</option>
                                <option value="bg-purple-300">Purple</option>
                                <option value="bg-blue-300">Blue</option>
                                <option value="bg-green-300">Green</option>
                            </select>
                        </label>
                        <label class="label mx-auto">
                            <span class="label-text">Title Text Color</span>
                            <select
                                class="select"
                                onchange={onColorTitleChange}
                            >
                                <option value="text-red-500">Red</option>
                                <option value="text-pink-500">Pink</option>
                                <option value="text-purple-500">Purple</option>
                                <option value="text-blue-500">Blue</option>
                                <option value="text-green-500">Green</option>
                            </select>
                        </label>
                        <label class="label mx-auto">
                            <span class="label-text"
                                >Button Background Text Color</span
                            >
                            <select
                                class="select"
                                onchange={onButtonBGColorChange}
                            >
                                <option value="preset-filled-primary-500"
                                    >Pink</option
                                >
                                <option value="preset-filled-tertiary-500"
                                    >Purple</option
                                >
                                <option value="preset-filled-success-500"
                                    >Green</option
                                >
                                <option value="preset-filled-warning-500"
                                    >Yellow</option
                                >
                                <option value="preset-filled-error-500"
                                    >Red</option
                                >
                                <option value="preset-filled-secondary-500"
                                    >Blue</option
                                >
                            </select>
                        </label>
                        <label class="label mx-auto col-span-1 lg:col-span-2">
                            <span class="label-text">Pick Up Line</span>
                            <textarea
                                class="textarea rounded-sm"
                                placeholder={PickupLine}
                                bind:value={PickupLine}
                            ></textarea>
                        </label>
                        <label class="label mx-auto col-span-1 lg:col-span-2">
                            <span class="label-text"
                                >Add and Remove Button Options</span
                            >
                            <div class="gap-4 grid grid-cols-1 lg:grid-cols-4">
                                {#each ButtonsOptions as option}
                                    <div class="flex space-x-4">
                                        <input
                                            type="text"
                                            class="input input-bordered"
                                            bind:value={option.text}
                                        />
                                        <button
                                            type="button"
                                            class="btn preset-filled-primary-500"
                                            onclick={() => {
                                                removeOption(option);
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                {/each}
                                <button
                                    type="button"
                                    class="btn preset-filled-primary-500"
                                    onclick={addOption}
                                >
                                    Add
                                </button>
                            </div></label
                        >
                        <label class="label mx-auto col-span-1 lg:col-span-2">
                            <span class="label-text">Follow Up</span>
                            <textarea
                                class="textarea rounded-sm"
                                placeholder={FollowUpLine}
                                bind:value={FollowUpLine}
                            ></textarea>
                        </label>
                        <label class="label mx-auto">
                            <span class="label-text">Show Image</span>
                            <select class="select" onchange={onShowImageChange}>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </label>
                        {#if showImage}
                            <label class="label mx-auto">
                                <span class="label-text">Image URL</span>
                                <input
                                    type="text"
                                    class="input input-bordered"
                                    bind:value={imageSrc}
                                />
                            </label>
                        {/if}
                        <button
                            type="button"
                            class="btn preset-filled-primary-500 col-span-1 lg:col-span-2"
                            onclick={updatePickUpPage}>Save</button
                        >
                        <button
                            type="button"
                            class="btn preset-filled-error-500 col-span-1 lg:col-span-2"
                            onclick={deletePage}>Delete</button
                        >
                    </div>
                {/if}
            </div>
        </section>
    </div>
</main>
