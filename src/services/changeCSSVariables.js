export const changeCSSVariables = (theme) => {
	const root = document.querySelector(":root");
	const elementsToChange = ['sidebar', 'bg', 'text', 'active', 'icons'];
	elementsToChange.forEach(item => {
		root.style.setProperty(`--theme-default-${item}`, `var(--theme-${theme}-${item})`);
	})
	
};
