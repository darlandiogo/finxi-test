<template>
    <div v-if="loading" class="loading">
        <sui-icon name="notched circle" size="big" centered loading />
    </div>
</template>
<script>
export default {
    props:{
        loading: Boolean
    }
}
</script>
<style>
    .loading{
        margin: 10% 0 5% 0;
        display:flex;
        justify-content:center;
    }
</style>