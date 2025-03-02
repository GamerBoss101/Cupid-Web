<script lang="ts">

    export let url = '';

    export let floatCardDirection = 'left';

</script>

<div class="card bg-pink-100 p-4 rounded-lg shadow-md space-y-2 {floatCardDirection === 'right' ? 'float-right' : 'float-left'}">
    <iframe title="h" src="{url}?preview=true" class="w-1/2 h-96"></iframe>
</div>