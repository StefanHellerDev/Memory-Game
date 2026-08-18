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
	const playButton = document.getElementById("playButton");
	if (!playButton) return;
  playButton.addEventListener("click", showMainPage);

}

export function showMainPage(): void {
	if (!memoryAppRef) return;
	memoryAppRef.innerHTML = mainPageTemplate();
}

// document.addEventListener('DOMContentLoaded', () => {
// 	showStartPage();
// });
