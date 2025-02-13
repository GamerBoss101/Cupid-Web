<script lang="ts">
    import { goto } from "$app/navigation";

    const handleProfile = () => {
        goto("/profile");
    };

</script>


<footer class="w-full bg-pink-300 dark:bg-pink-800 py-4 sticky bottom-0">
    <p class="font-semibold mx-auto flex w-full text-center justify-center items-center gap-1">
        Made with ❤️ by <a class="text-blue-500 cursor-pointer" href="https://dev.sirblob.me/portfolio">Sir Blob</a>
        -
        <a href="https://ko-fi.com/sirblob" target="_blank" class="text-blue-500 cursor-pointer">
            Donate :)
        </a>
    </p> 
</footer>