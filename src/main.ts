import './styles/main.scss';
import { startPageTemplate } from './templates/start-page';
import { mainPageTemplate } from './templates/main-page';

const memoryAppRef = document.getElementById('memoryApp');
if (!memoryAppRef) {
	throw new Error('Element with id "memoryApp" not found.');
}

export function showStartPage(): void {
	if (!memoryAppRef) return;
	memoryAppRef.innerHTML = startPageTemplate();
	const playButton = document.getElementById('playButton');
	if (!playButton) return;
	playButton.addEventListener('click', showMainPage);
}

export function showMainPage(): void {
	if (!memoryAppRef) return;
	memoryAppRef.innerHTML = mainPageTemplate();
}

// *************************
// Main Page / Settings page
// *************************

const themePreview = document.getElementById('theme-preview') as HTMLImageElement | null;
const themeInputs = document.querySelectorAll<HTMLInputElement>('input[name="gameTheme"]');

let selectedThemeSrc = getSelectedThemeSrc();

themeInputs.forEach((input) => {
	const label = input.closest('label');

	label?.addEventListener('mouseenter', () => {
		if (!themePreview || !input.dataset.previewSrc) return;
		themePreview.src = input.dataset.previewSrc;
	});

	label?.addEventListener('mouseleave', () => {
		if (!themePreview) return;
		themePreview.src = selectedThemeSrc;
	});

	input.addEventListener('change', () => {
		if (!input.dataset.previewSrc) return;

		selectedThemeSrc = input.dataset.previewSrc;
		if (themePreview) themePreview.src = selectedThemeSrc;
	});
});

function getSelectedThemeSrc(): string {
	const checkedInput = document.querySelector<HTMLInputElement>('input[name="gameTheme"]:checked');

	return checkedInput?.dataset.previewSrc || './src/assets/img/code_vibes_theme/theme_visual-code_vibes.png';
}

// document.addEventListener('DOMContentLoaded', () => {
// 	showStartPage();
// });
