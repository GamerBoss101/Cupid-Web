<script lang="ts">

    let arrows = [
        "/love_arrow.png",
        "/cloud_arrow.png",
        "/hearts.png",
        "/more_hearts.png",
    ];

    let randomArrow = arrows[Math.floor(Math.random() * arrows.length)];

</script>

<meta property="og:title" content="You have Mail!" />
<meta property="og:image" content="{randomArrow}" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="500" />
<meta property="og:image:height" content="500" />