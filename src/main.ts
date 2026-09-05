import './styles/main.scss';
import { startPageTemplate } from './templates/start-page-template';
import { mainPageTemplate } from './templates/main-page-template';
import { gamePageTemplate } from './templates/game-page-template';

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
	initSettingsPage();
}

document.addEventListener('DOMContentLoaded', () => {
	showStartPage();
});

// *************************
// Main Page / Settings page
// *************************

export function initSettingsPage(): void {
	initThemeInputs();
	initPlayerInputs();
	initBoardSizeInputs();
	initStartButton();
}

export function initThemeInputs() {
	const themePreview = document.getElementById('theme-preview') as HTMLImageElement | null;
	const themeInputs = document.querySelectorAll<HTMLInputElement>('input[name="gameTheme"]');
	const displayGameTheme = document.getElementById('displayGameTheme');
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
			const previewSrc = input.dataset.previewSrc;
			const themeChoice = input.dataset.themeChoice;

			if (!previewSrc || !themeChoice) return;

			selectedThemeSrc = previewSrc;

			if (displayGameTheme) {
				displayGameTheme.innerText = themeChoice;
				animateSelection(displayGameTheme);
			}

			if (themePreview) themePreview.src = previewSrc;

			updateStartButtonState();
		});
	});
}

export function initPlayerInputs() {
	const playerInputs = document.querySelectorAll<HTMLInputElement>('input[name="player"]');
	const displayPlayer = document.getElementById('displayPlayer');

	playerInputs.forEach((input) => {
		input.addEventListener('change', () => {
			const playerChoice = input.dataset.playerChoice;

			if (!playerChoice) return;

			if (displayPlayer) {
				displayPlayer.innerText = playerChoice;
				animateSelection(displayPlayer);
			}
			updateStartButtonState();
		});
	});
}

export function initBoardSizeInputs() {
	const boardSizeInputs = document.querySelectorAll<HTMLInputElement>('input[name="boardSize"]');
	const displayBoardSize = document.getElementById('displayBoardSize');

	boardSizeInputs.forEach((input) => {
		input.addEventListener('change', () => {
			const boardSizeChoice = input.dataset.boardSizeChoice;

			if (!boardSizeChoice) return;

			if (displayBoardSize) {
				displayBoardSize.innerText = boardSizeChoice;
				animateSelection(displayBoardSize);
			}
			updateStartButtonState();
		});
	});
}

export function getSelectedThemeSrc(): string {
	const checkedInput = document.querySelector<HTMLInputElement>('input[name="gameTheme"]:checked');

	return checkedInput?.dataset.previewSrc || './src/assets/img/code_vibes_theme/theme_visual-code_vibes.png';
}

export function animateSelection(element: HTMLElement): void {
	element.classList.remove('selection-changed');
	void element.offsetWidth;
	element.classList.add('selection-changed');

	element.addEventListener('animationend', () => element.classList.remove('selection-changed'), { once: true });
}

export function updateStartButtonState(): void {
	const themeSelected = document.querySelector('input[name="gameTheme"]:checked');
	const playerSelected = document.querySelector('input[name="player"]:checked');
	const boardSizeSelected = document.querySelector('input[name="boardSize"]:checked');

	const allSelected = themeSelected && playerSelected && boardSizeSelected;

	updateStartButton(Boolean(allSelected));
	updateProgressLines(Boolean(allSelected));
}

export function updateStartButton(allSelected: boolean): void {
	const startButton = document.getElementById('startButton') as HTMLButtonElement | null;

	if (!startButton) return;

	startButton.disabled = !allSelected;
}

export function updateProgressLines(allSelected: boolean): void {
	const lines = document.querySelectorAll<HTMLImageElement>('.settings-progress-line');

	const src = allSelected ? './src/assets/img/settings-page-line-after.svg' : './src/assets/img/settings-page-line-before.svg';

	lines.forEach((line) => {
		line.src = src;
	});
}

export function getSelectedGameSettings() {
	const theme = document.querySelector<HTMLInputElement>('input[name="gameTheme"]:checked');

	const player = document.querySelector<HTMLInputElement>('input[name="player"]:checked');

	const boardSize = document.querySelector<HTMLInputElement>('input[name="boardSize"]:checked');

	if (!theme || !player || !boardSize) return null;

	return {
		theme: theme.value,
		player: player.value,
		boardSize: Number(boardSize.value),
	};
}

export function initStartButton(): void {
	const startButton = document.getElementById('startButton') as HTMLButtonElement | null;

	if (!startButton) return;

	startButton.addEventListener('click', saveSettingsAndStartGame);
}

export function saveSettingsAndStartGame(): void {
	const settings = getSelectedGameSettings();
	if (!settings) return;

	sessionStorage.setItem('gameSettings', JSON.stringify(settings));

	if (!memoryAppRef) return;
	memoryAppRef.innerHTML = gamePageTemplate();
	initGamePage();
}

// *************************
//        Game page
// *************************

export function initGamePage(): void {
	// initThemeInputs();
	// initPlayerInputs();
	// initBoardSizeInputs();
	// initStartButton();
}
