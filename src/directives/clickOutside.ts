interface ClickOutsideHTMLElement extends HTMLElement {
	clickOutsideEvent: (event: Event) => void;
}

export default {
	beforeMount(el: ClickOutsideHTMLElement, binding: any) {
		el.clickOutsideEvent = (event: Event) => {
			if (!(el === event.target || el.contains(event.target as Node))) {
				binding.value(event);
			}
		};
		document.addEventListener('click', el.clickOutsideEvent);
	},
	unmounted(el: ClickOutsideHTMLElement) {
		document.removeEventListener('click', el.clickOutsideEvent);
	},
};
