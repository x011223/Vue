<template>
    <div id="app">
        <header-wrapper></header-wrapper>
    </div>
</template>

<script>
    import HeaderWrapper from './components/header/headerwrapper'
    export default {
        name: 'app',
        components: {
            HeaderWrapper,
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }
</style>
