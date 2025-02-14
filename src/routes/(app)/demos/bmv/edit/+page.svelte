<script lang="ts">
    import "$lib/css/bmv.css";
    import type { PageProps } from "./$types";

    import { goto } from "$app/navigation";

    let { data }: PageProps = $props();

    let valentineState = $state(1);
    let noFail = $state(data.pageData?.noFail ?? false);
    let noFailCount = $state(5);

    let ButtonsOptions: any = $state(data.pageData.ButtonsOptions);
    const yesButton = function () {
        valentineState = 2;
    };
    const noButton = function () {
        if (noFail) {
            valentineState = 2;
        } else noFailCount++;
    }; 

    let showImage = $state(data.pageData.image.initial.enabled),
        imageSrc = $state(data.pageData.image.initial.url);

    let FollowUpMessage = $state(data.pageData.followUpMessage),
        followUpImage = $state(data.pageData.image.followUp.url);

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

    const onNoFailChange = (e: any) => {
        noFail = e.target.value === "true";
    };

    let pageData: any = $state(null);

    async function updateBMVPage() {
        let obj = {
            ButtonsOptions,
            followUpMessage: FollowUpMessage,
            noFail,
            image: {
                initial: {
                    url: imageSrc,
                    enabled: showImage,
                },
                followUp: {
                    url: followUpImage,
                    enabled: showImage,
                },
            },
            colors: {
                backgroundColor,
                titleTextColor,
                buttonBGColor,
            },
        };

        pageData = await (
            await fetch("/card/bmv", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            })
        ).json();

        console.log(pageData);
    }

    async function deletePage() {
        pageData = await (
            await fetch("/card/bmv", {
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
    <title>The Big Question o_O</title>
    <meta name="description" content="The Big Question o_O" />

    <link rel="icon" type="image/png" href="/cupid.png" />
</svelte:head>

<main class="min-h-screen w-full flex flex-col {backgroundColor}">
    <div class="mx-auto container space-y-10 px-4 py-5">
        <section class="space-y-5 mx-auto my-10">
            {#if valentineState == 1}
                {#if showImage}
                    <img
                        src={imageSrc}
                        alt="optional_gif"
                        class="mx-auto w-1/2 lg:w-1/4"
                    />
                {/if}
                <h1
                    class="text-6xl text-center font-bold {titleTextColor} lg:text-7xl"
                >
                    Will You Be My Valentine?
                </h1>
                <div class="flex justify-center space-x-4">
                    <button
                        class="btn mx-4 {buttonBGColor}"
                        style="font-size: {noFailCount*10}px; padding: {noFailCount*10}px;"
                        onclick={yesButton}
                    >
                        {ButtonsOptions[0].text}
                    </button>
                    <button
                        class="btn mx-4 {buttonBGColor}"
                        style="font-size: {noFailCount == 5 ? 50 : 50 - noFailCount*2}px; padding: {noFailCount == 5 ? 50 : 50 - noFailCount*2}px;"
                        onclick={noButton}
                    >
                        {ButtonsOptions[1].text}
                    </button>
                </div>
            {:else}
                <button
                    class="btn mx-auto text-xl p-5 lg:text-3xl {buttonBGColor}"
                    onclick={() => {
                        valentineState = 1;
                        noFailCount = 4;
                    }}
                >
                    Go Back
                </button>
                {#if showImage}
                    <img
                        src={followUpImage}
                        alt="optional_gif"
                        class="mx-auto w-1/2 lg:w-1/4"
                    />
                {/if}
                <h1
                    class="text-6xl text-center font-bold {titleTextColor} lg:text-7xl"
                >
                    {FollowUpMessage}
                </h1>
            {/if}
        </section>
        {#if !Boolean(data.preview)}
            <section class="m-font font-semibold mx-auto">
                <div
                    class="card preset-filled-surface-100-900 dark:preset-filled-surface-100-900 p-6 text-center mx-auto grid grid-flow-row w-3/4"
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
                                (Please note this down for future reference if
                                you want to edit the page)
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
                                <select
                                    class="select"
                                    onchange={onColorBGChange}
                                >
                                    <option value="bg-pink-300">Pink</option>
                                    <option value="bg-red-200">Red</option>
                                    <option value="bg-purple-300">Purple</option
                                    >
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
                                    <option value="text-purple-500"
                                        >Purple</option
                                    >
                                    <option value="text-blue-500">Blue</option>
                                    <option value="text-green-500">Green</option
                                    >
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
                            <label class="label mx-auto">
                                <span class="label-text">No Fail</span>
                                <select
                                    class="select"
                                    onchange={onNoFailChange}
                                >
                                    <option selected={noFail} value="true">Yes</option>
                                    <option selected={!noFail} value="false">No</option>
                                </select>
                            </label>
                            <label
                                class="label mx-auto col-span-1 lg:col-span-2"
                            >
                                <span class="label-text">Follow Up</span>
                                <textarea
                                    class="textarea rounded-sm"
                                    placeholder={FollowUpMessage}
                                    bind:value={FollowUpMessage}
                                ></textarea>
                            </label>
                            <label
                                class="label mx-auto col-span-1 lg:col-span-2"
                            >
                                <span class="label-text">Button Options</span>
                                <div
                                    class="gap-4 grid grid-cols-1 lg:grid-cols-2"
                                >
                                    {#each ButtonsOptions as option}
                                        <div class="flex space-x-4">
                                            <input
                                                type="text"
                                                class="input input-bordered"
                                                bind:value={option.text}
                                            />
                                        </div>
                                    {/each}
                                </div></label
                            >
                            <div
                                class="card text-red-700 text-xl p-4 col-span-1 lg:col-span-2"
                            >
                                <p>
                                    Note: The Yes Button get bigger the more
                                    they click "No" if "No Fail" is set to Yes.
                                </p>
                            </div>
                            <label class="label mx-auto">
                                <span class="label-text">Show Image</span>
                                <select
                                    class="select"
                                    onchange={onShowImageChange}
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label>
                            {#if showImage}
                                <label class="label mx-auto">
                                    <span class="label-text">Ask Image URL</span
                                    >
                                    <input
                                        type="text"
                                        class="input input-bordered"
                                        bind:value={imageSrc}
                                    />
                                </label>
                                <label class="label mx-auto">
                                    <span class="label-text"
                                        >Follow Up Image URL</span
                                    >
                                    <input
                                        type="text"
                                        class="input input-bordered"
                                        bind:value={followUpImage}
                                    />
                                </label>
                            {/if}
                            <button
                                type="button"
                                class="btn preset-filled-primary-500 col-span-1 lg:col-span-2"
                                onclick={updateBMVPage}>Save</button
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
        {/if}
    </div>
</main>
