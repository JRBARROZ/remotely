<template>
    <div class="wrapper">
        <div class=" text-center mt-4 text-title">
            <h1 class="font-lexend text-2xl">{{title}}</h1>
            <slot />
        </div>
    </div>
</template>

<script>

export default {
    props: {
        title: String,
    }
}
</script>