import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/* export const useCounterStore = defineStore('counter', () => {
	const count = ref(0)
	const doubleCount = computed(() => count.value * 2)
	function increment() {
		count.value++
	}

	return { count, doubleCount, increment }
}) */

export const useCounterStore = defineStore('counter', {
	state: () => ({
		count: 0,
		a: 1,
		b: 2,
		sum: 0,
	}),
	getters: {
		querySum() {
			this.sum = this.a + this.b
		},
	},
	actions: {
		doubleCount() {
			computed(() => this.count * 2)
		},
		increment() {
			this.count++
		}
	}
})