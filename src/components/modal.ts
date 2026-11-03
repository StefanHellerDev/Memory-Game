import { gameState } from '../state/game-state';
import { showMainPage } from '../pages/settings-page';

/**
 * Initializes the modal controls and binds all open and close events.
 */
export function initModal(): void {
	const openBtn = document.getElementById('openModalBtn');
	const closeBtn = document.getElementById('closeModalBtn');
	const closeBtnExit = document.getElementById('closeModalBtnExit');
	const overlay = document.getElementById('modalOverlay');

	if (!openBtn || !closeBtn || !closeBtnExit || !overlay) return;

	bindOpenModal(openBtn, overlay);
	bindCloseModal(closeBtn, overlay);
	bindExitModal(closeBtnExit, overlay);
	bindOverlayClose(overlay);
}

/**
 * Binds the modal open action to the given button.
 *
 * @param openBtn - The button used to open the modal.
 * @param overlay - The modal overlay element.
 */
function bindOpenModal(openBtn: HTMLElement, overlay: HTMLElement): void {
	openBtn.addEventListener('click', () => {
		overlay.classList.add('active');
	});
}

/**
 * Binds the modal close action to the given button.
 *
 * @param closeBtn - The button used to close the modal.
 * @param overlay - The modal overlay element.
 */
function bindCloseModal(closeBtn: HTMLElement, overlay: HTMLElement): void {
	closeBtn.addEventListener('click', () => {
		overlay.classList.remove('active');
	});
}

/**
 * Binds the exit action to the modal exit button.
 *
 * @param closeBtnExit - The button used to exit the game modal.
 * @param overlay - The modal overlay element.
 */
function bindExitModal(closeBtnExit: HTMLElement, overlay: HTMLElement): void {
	closeBtnExit.addEventListener('click', () => {
		closeGameModal(overlay);
	});
}

/**
 * Closes the game modal, resets the scores, and returns to the main page.
 *
 * @param overlay - The modal overlay element.
 */
function closeGameModal(overlay: HTMLElement): void {
	overlay.classList.remove('active');
	gameState.pointsBlue = 0;
	gameState.pointsOrange = 0;
	showMainPage();
}

/**
 * Closes the modal when the user clicks directly on the overlay.
 *
 * @param overlay - The modal overlay element.
 */
function bindOverlayClose(overlay: HTMLElement): void {
	overlay.addEventListener('click', (event: MouseEvent) => {
		if (event.target === overlay) {
			overlay.classList.remove('active');
		}
	});
}
