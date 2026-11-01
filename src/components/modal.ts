import { gameState } from '../state/game-state';
import { showMainPage } from '../pages/settings-page';

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

function bindOpenModal(openBtn: HTMLElement, overlay: HTMLElement): void {
	openBtn.addEventListener('click', () => {
		overlay.classList.add('active');
	});
}

function bindCloseModal(closeBtn: HTMLElement, overlay: HTMLElement): void {
	closeBtn.addEventListener('click', () => {
		overlay.classList.remove('active');
	});
}

function bindExitModal(closeBtnExit: HTMLElement, overlay: HTMLElement): void {
	closeBtnExit.addEventListener('click', () => {
		closeGameModal(overlay);
	});
}

function closeGameModal(overlay: HTMLElement): void {
	overlay.classList.remove('active');
	gameState.pointsBlue = 0;
	gameState.pointsOrange = 0;
	showMainPage();
}

function bindOverlayClose(overlay: HTMLElement): void {
	overlay.addEventListener('click', (event: MouseEvent) => {
		if (event.target === overlay) {
			overlay.classList.remove('active');
		}
	});
}
