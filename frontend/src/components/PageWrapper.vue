<template>
    <div class="wrapper">
        <div class=" text-center mt-4 font-lexend text-2xl text-title">
            <h1>{{title}}</h1>
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