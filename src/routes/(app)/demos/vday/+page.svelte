<script lang="ts">
    import "$lib/css/vday.css";

    let CustomMessage = "Some endearing Custom Message will be displayed here!";
    let CustomSignature = "From";
    let CustomName = "Sir Blob";

    let showImage = true,
        imageSrc = "https://media1.tenor.com/m/Y6Et1qZU818AAAAd/cat-cats.gif";

    let backgroundColor = "bg-pink-300",
        titleTextColor = "text-red-500",
        signatureTextColor = "text-pink-700";

    const onColorBGChange = (e: any) => {
        backgroundColor = e.target.value;
    };
    const onColorTitleChange = (e: any) => {
        titleTextColor = e.target.value;
    };
    const onColorSignatureChange = (e: any) => {
        signatureTextColor = e.target.value;
    };
    const onShowImageChange = (e: any) => {
        showImage = e.target.value === "true";
    };
    const onSignatureChange = (e: any) => {
        CustomSignature = e.target.value;
    };

    let pageData: any = null;

    async function createValentinePage() {
        let obj = {
            name: CustomName,
            message: CustomMessage,
            signature: CustomSignature,
            image: {
                enabled: showImage,
                url: imageSrc,
            },
            colors: {
                backgroundColor: backgroundColor,
                titleTextColor: titleTextColor,
                signatureTextColor: signatureTextColor,
            }
        };

        pageData = await (
            await fetch("/page/vday", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            })
        ).json();
    }
</script>

<svelte:head>
    <title>Happy Valentine's Day</title>
    <meta name="description" content="Happy Valentine's Day" />
    <meta name="keywords" content="Happy Valentine's Day" />

    <link rel="icon" type="image/png" href="/cupid.png" />
</svelte:head>

<main class="min-h-screen flex flex-col {backgroundColor}">
    <div class="mx-auto space-y-10 px-4 py-20">
        <h1 class="text-7xl text-center font-bold {titleTextColor} lg:text-8xl">
            Happy Valentine's Day
        </h1>
        <p class="text-3xl lg:text-4xl">{CustomMessage}</p>
        <br />
        <p class="text-2xl lg:text-3xl {signatureTextColor}">
            {CustomSignature}
            {CustomName}
        </p>
        {#if showImage}
            <img
                src={imageSrc}
                alt="optional_gif"
                class="mx-auto w-1/2 lg:w-1/3"
            />
        {/if}

        <div
            class="mfont card preset-filled-surface-100-900 w-full p-6 text-center mx-auto grid grid-flow-row"
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
                        (Please note this down for future reference if you want to edit the page)
                    </span>
                </h2>
                <br />
                <a
                    href="/page/{pageData.id}"
                    class="btn preset-filled-primary-500">View Page</a
                >
            {:else}
                <h1 class="mx-auto text-3xl">Settings</h1>
                <br />
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <label class="label mx-auto">
                        <span class="label-text">Background Color</span>
                        <select class="select" on:change={onColorBGChange}>
                            <option value="bg-pink-300">Pink</option>
                            <option value="bg-red-300">Red</option>
                            <option value="bg-purple-300">Purple</option>
                            <option value="bg-blue-300">Blue</option>
                            <option value="bg-green-300">Green</option>
                        </select>
                    </label>
                    <label class="label mx-auto">
                        <span class="label-text">Title Text Color</span>
                        <select class="select" on:change={onColorTitleChange}>
                            <option value="text-red-500">Red</option>
                            <option value="text-pink-500">Pink</option>
                            <option value="text-purple-500">Purple</option>
                            <option value="text-blue-500">Blue</option>
                            <option value="text-green-500">Green</option>
                        </select>
                    </label>
                    <label class="label mx-auto">
                        <span class="label-text">Signature Text Color</span>
                        <select
                            class="select"
                            on:change={onColorSignatureChange}
                        >
                            <option value="text-red-700">Red</option>
                            <option value="text-pink-700">Pink</option>
                            <option value="text-purple-700">Purple</option>
                            <option value="text-blue-700">Blue</option>
                            <option value="text-green-700">Green</option>
                        </select>
                    </label>
                    <label class="label mx-auto">
                        <span class="label-text">Signature Text Color</span>
                        <select
                            class="select"
                            on:change={onColorSignatureChange}
                        >
                            <option value="text-red-700">Red</option>
                            <option value="text-pink-700">Pink</option>
                            <option value="text-purple-700">Purple</option>
                            <option value="text-blue-700">Blue</option>
                            <option value="text-green-700">Green</option>
                        </select>
                    </label>
                    <label class="label mx-auto">
                        <span class="label-text">Show Image</span>
                        <select class="select" on:change={onShowImageChange}>
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
                    <label class="label mx-auto col-span-1 lg:col-span-2">
                        <span class="label-text">Custom Text</span>
                        <textarea
                            class="textarea rounded-sm"
                            placeholder={CustomMessage}
                            bind:value={CustomMessage}
                        ></textarea>
                    </label>
                    <label class="label mx-auto">
                        <span class="label-text">Signature</span>
                        <select class="select" on:change={onSignatureChange}>
                            <option value="From">From</option>
                            <option value="Love">Love</option>
                            <option value="Yours Truly">Yours Truly</option>
                            <option value="Sincerely">Sincerely</option>
                            <option value="Best Wishes">Best Wishes</option>
                        </select>
                    </label>
                    <label class="label mx-auto">
                        <span class="label-text">Name</span>
                        <input
                            type="text"
                            class="input input-bordered"
                            bind:value={CustomName}
                        />
                    </label>
                    <button
                        type="button"
                        class="btn preset-filled-primary-500 col-span-1 lg:col-span-2"
                        on:click={createValentinePage}>Save</button
                    >
                </div>
            {/if}
        </div>
    </div>
</main>
