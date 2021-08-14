<template>
	<div class=" w-full p-4 font-comfoorta">
		<div class="flex items-center justify-center mt-4 gap-2 cursor-pointer" @click="sendToHome">
			<svg class="w-8 h-8"  viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M21.0787 0C32.5618 0 42 9.4382 42 21.0787C42 32.5618 32.5618 42 21.0787 42C9.4382 42 0 32.5618 0 21.0787C0 9.4382 9.4382 0 21.0787 0ZM18.8764 9.59551C18.8764 7.55056 22.0225 7.55056 22.0225 9.59551V20.764L29.2584 22.809C31.1461 23.4382 30.3596 26.427 28.3146 25.9551L20.1348 23.4382C19.3483 23.2809 18.8764 22.6517 18.8764 21.8652V9.59551ZM21.0787 3.14607C11.1685 3.14607 3.14607 11.1685 3.14607 21.0787C3.14607 30.8315 11.1685 38.8539 21.0787 38.8539C30.8315 38.8539 38.8539 30.8315 38.8539 21.0787C38.8539 11.1685 30.8315 3.14607 21.0787 3.14607Z" fill="#58588B"/>
			</svg>
			<h1 class="text-2xl text-title">Remotely</h1>
		</div>  
	</div>
</template>
<script>
export default {
	methods: {
		sendToHome() {
			this.$router.push('/');
		}
	}
}
</script>