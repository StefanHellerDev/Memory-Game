import { startPageTemplate } from '../templates/start-page-template';
import { showMainPage } from './settings-page';

const memoryAppRef = document.getElementById('memoryApp');
if (!memoryAppRef) {
	throw new Error('Element with id "memoryApp" not found.');
}

/**
 * Displays the start page and initializes the play button.
 */
export function showStartPage(): void {
	if (!memoryAppRef) return;
	memoryAppRef.innerHTML = startPageTemplate();

	const playButton = document.getElementById('playButton');
	if (!playButton) return;

	playButton.addEventListener('click', showMainPage);
}
