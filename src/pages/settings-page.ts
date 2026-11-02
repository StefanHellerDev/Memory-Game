// *************************
// Main Page / Settings page
// *************************

import { mainPageTemplate } from '../templates/main-page-template';
import { initGamePage } from '../pages/game-page';
import settingsLineBefore from '../assets/img/settings-page-line-before.svg';
import settingsLineAfter from '../assets/img/settings-page-line-after.svg';
import themeVisualCodeVibes from '../assets/img/code_vibes_theme/theme_visual-code_vibes.png';

const memoryAppRef = document.getElementById('memoryApp');
if (!memoryAppRef) {
	throw new Error('Element with id "memoryApp" not found.');
}

export function showMainPage(): void {
	if (!memoryAppRef) return;
	memoryAppRef.innerHTML = mainPageTemplate();
	initSettingsPage();
}

function initSettingsPage(): void {
	initThemeInputs();
	initPlayerInputs();
	initBoardSizeInputs();
	initStartButton();
}

function initThemeInputs(): void {
	const themePreview = document.getElementById('theme-preview') as HTMLImageElement | null;
	const themeInputs = document.querySelectorAll<HTMLInputElement>('input[name="gameTheme"]');
	const displayGameTheme = document.getElementById('displayGameTheme');
	let selectedThemeSrc = getSelectedThemeSrc();

	themeInputs.forEach((input) => {
		bindThemeInput(
			input,
			themePreview,
			displayGameTheme,
			() => selectedThemeSrc,
			(src) => (selectedThemeSrc = src),
		);
	});
}

function bindThemeInput(
	input: HTMLInputElement,
	themePreview: HTMLImageElement | null,
	displayGameTheme: HTMLElement | null,
	getSelectedSrc: () => string,
	setSelectedSrc: (src: string) => void,
): void {
	bindThemeHover(input, themePreview, getSelectedSrc);
	bindThemeChange(input, themePreview, displayGameTheme, setSelectedSrc);
}

function bindThemeHover(input: HTMLInputElement, themePreview: HTMLImageElement | null, getSelectedSrc: () => string): void {
	const label = input.closest('label');
	if (!label) return;

	label.addEventListener('mouseenter', () => showThemePreview(input, themePreview));
	label.addEventListener('mouseleave', () => resetThemePreview(themePreview, getSelectedSrc()));
}

function showThemePreview(input: HTMLInputElement, themePreview: HTMLImageElement | null): void {
	if (!themePreview || !input.dataset.previewSrc) return;
	themePreview.src = input.dataset.previewSrc;
}

function resetThemePreview(themePreview: HTMLImageElement | null, selectedThemeSrc: string): void {
	if (!themePreview) return;
	themePreview.src = selectedThemeSrc;
}

function bindThemeChange(
	input: HTMLInputElement,
	themePreview: HTMLImageElement | null,
	displayGameTheme: HTMLElement | null,
	setSelectedSrc: (src: string) => void,
): void {
	input.addEventListener('change', () => {
		handleThemeChange(input, themePreview, displayGameTheme, setSelectedSrc);
	});
}

function handleThemeChange(
	input: HTMLInputElement,
	themePreview: HTMLImageElement | null,
	displayGameTheme: HTMLElement | null,
	setSelectedSrc: (src: string) => void,
): void {
	const previewSrc = input.dataset.previewSrc;
	const themeChoice = input.dataset.themeChoice;
	if (!previewSrc || !themeChoice) return;

	setSelectedSrc(previewSrc);
	updateThemeDisplay(themePreview, displayGameTheme, previewSrc, themeChoice);
	updateStartButtonState();
}

function updateThemeDisplay(themePreview: HTMLImageElement | null, displayGameTheme: HTMLElement | null, previewSrc: string, themeChoice: string): void {
	if (themePreview) themePreview.src = previewSrc;
	if (!displayGameTheme) return;

	displayGameTheme.innerText = themeChoice;
	animateSelection(displayGameTheme);
}

function initPlayerInputs(): void {
	const playerInputs = document.querySelectorAll<HTMLInputElement>('input[name="player"]');
	const displayPlayer = document.getElementById('displayPlayer');

	playerInputs.forEach((input) => {
		bindPlayerInput(input, displayPlayer);
	});
}

function bindPlayerInput(input: HTMLInputElement, displayPlayer: HTMLElement | null): void {
	input.addEventListener('change', () => {
		handlePlayerChange(input, displayPlayer);
	});
}

function handlePlayerChange(input: HTMLInputElement, displayPlayer: HTMLElement | null): void {
	const playerChoice = input.dataset.playerChoice;
	if (!playerChoice) return;

	updatePlayerDisplay(displayPlayer, playerChoice);
	updateStartButtonState();
}

function updatePlayerDisplay(displayPlayer: HTMLElement | null, playerChoice: string): void {
	if (!displayPlayer) return;

	displayPlayer.innerText = playerChoice;
	animateSelection(displayPlayer);
}

function initBoardSizeInputs(): void {
	const boardSizeInputs = document.querySelectorAll<HTMLInputElement>('input[name="boardSize"]');
	const displayBoardSize = document.getElementById('displayBoardSize');

	boardSizeInputs.forEach((input) => {
		bindBoardSizeInput(input, displayBoardSize);
	});
}

function bindBoardSizeInput(input: HTMLInputElement, displayBoardSize: HTMLElement | null): void {
	input.addEventListener('change', () => {
		handleBoardSizeChange(input, displayBoardSize);
	});
}

function handleBoardSizeChange(input: HTMLInputElement, displayBoardSize: HTMLElement | null): void {
	const boardSizeChoice = input.dataset.boardSizeChoice;
	if (!boardSizeChoice) return;

	updateBoardSizeDisplay(displayBoardSize, boardSizeChoice);
	updateStartButtonState();
}

function updateBoardSizeDisplay(displayBoardSize: HTMLElement | null, boardSizeChoice: string): void {
	if (!displayBoardSize) return;

	displayBoardSize.innerText = boardSizeChoice;
	animateSelection(displayBoardSize);
}

function getSelectedThemeSrc(): string {
	const checkedInput = document.querySelector<HTMLInputElement>('input[name="gameTheme"]:checked');

	return checkedInput?.dataset.previewSrc || themeVisualCodeVibes;
}

function animateSelection(element: HTMLElement): void {
	element.classList.remove('selection-changed');
	void element.offsetWidth;
	element.classList.add('selection-changed');

	element.addEventListener('animationend', () => element.classList.remove('selection-changed'), { once: true });
}

function updateStartButtonState(): void {
	const themeSelected = document.querySelector('input[name="gameTheme"]:checked');
	const playerSelected = document.querySelector('input[name="player"]:checked');
	const boardSizeSelected = document.querySelector('input[name="boardSize"]:checked');

	const allSelected = themeSelected && playerSelected && boardSizeSelected;

	updateStartButton(Boolean(allSelected));
	updateProgressLines(Boolean(allSelected));
}

function updateStartButton(allSelected: boolean): void {
	const startButton = document.getElementById('startButton') as HTMLButtonElement | null;

	if (!startButton) return;

	startButton.disabled = !allSelected;
}

function updateProgressLines(allSelected: boolean): void {
	const lines = document.querySelectorAll<HTMLImageElement>('.settings-progress-line');
	const src = allSelected ? settingsLineAfter : settingsLineBefore;
	lines.forEach((line) => {
		line.src = src;
	});
}

function getSelectedGameSettings() {
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

function initStartButton(): void {
	const startButton = document.getElementById('startButton') as HTMLButtonElement | null;
	if (!startButton) return;
	startButton.addEventListener('click', saveSettingsAndStartGame);
}

function saveSettingsAndStartGame(): void {
	const settings = getSelectedGameSettings();
	if (!settings) return;
	sessionStorage.setItem('gameSettings', JSON.stringify(settings));
	initGamePage();
}
