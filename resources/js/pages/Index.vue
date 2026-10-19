<template>
	<div class="Test">
		<div class="Test__block">
			CLEAN PROJECT VUE LARAVEL
		</div>
	</div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
.Test {
    @include div100;

    border: 1px solid red;
    background: blue;

    &__block {
        @include center;
        @include font(10rem);
    }
}
</style>

