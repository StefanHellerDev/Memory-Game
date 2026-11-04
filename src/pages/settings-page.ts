import { mainPageTemplate } from '../templates/main-page-template';
import { initGamePage } from '../pages/game-page';
import settingsLineBefore from '../assets/img/settings-page-line-before.svg';
import settingsLineAfter from '../assets/img/settings-page-line-after.svg';
import { GameSettings } from '../types/game-types';
import { initThemeInputs } from '../components/settings-controls';
import { initPlayerInputs } from '../components/settings-controls';
import { initBoardSizeInputs } from '../components/settings-controls';

const memoryAppRef = document.getElementById('memoryApp');
if (!memoryAppRef) {
	throw new Error('Element with id "memoryApp" not found.');
}

/**
 * Displays the main page and initializes the settings page.
 */
export function showMainPage(): void {
	if (!memoryAppRef) return;
	memoryAppRef.innerHTML = mainPageTemplate();
	initSettingsPage();
}

/**
 * Initializes the settings page, restores previously stored settings,
 * binds all input controls, and updates the start button state.
 */
function initSettingsPage(): void {
	restoreStoredSettings();
	initThemeInputs();
	initPlayerInputs();
	initBoardSizeInputs();
	initStartButton();
	updateStartButtonState();
}

/**
 * Restores previously saved game settings from session storage
 * and updates the related radio selections and display values.
 */
function restoreStoredSettings(): void {
	const storedSettings = sessionStorage.getItem('gameSettings');
	if (!storedSettings) return;

	const settings = JSON.parse(storedSettings) as GameSettings;

	restoreRadioSelection('gameTheme', settings.theme);
	restoreRadioSelection('player', settings.player);
	restoreRadioSelection('boardSize', String(settings.boardSize));

	restoreSettingsDisplay();
}

/**
 * Restores a radio button selection by matching its name and value.
 *
 * @param name - The name attribute of the radio button group.
 * @param value - The value of the radio button that should be selected.
 */
function restoreRadioSelection(name: string, value: string): void {
	const input = document.querySelector<HTMLInputElement>(`input[name="${name}"][value="${value}"]`);

	if (input) input.checked = true;
}

/**
 * Restores all displayed settings values from the currently selected inputs.
 */
function restoreSettingsDisplay(): void {
	restoreThemeDisplay();
	restorePlayerDisplay();
	restoreBoardSizeDisplay();
}

/**
 * Restores the theme preview image and displayed theme name
 * from the currently selected theme input.
 */
function restoreThemeDisplay(): void {
	const input = document.querySelector<HTMLInputElement>('input[name="gameTheme"]:checked');

	if (!input) return;

	const preview = document.getElementById('theme-preview') as HTMLImageElement | null;
	const display = document.getElementById('displayGameTheme');

	if (preview && input.dataset.previewSrc) {
		preview.src = input.dataset.previewSrc;
	}

	if (display && input.dataset.themeChoice) {
		display.innerText = input.dataset.themeChoice;
	}
}

/**
 * Restores the displayed player value from the currently selected player input.
 */
function restorePlayerDisplay(): void {
	const input = document.querySelector<HTMLInputElement>('input[name="player"]:checked');

	const display = document.getElementById('displayPlayer');

	if (input?.dataset.playerChoice && display) {
		display.innerText = input.dataset.playerChoice;
	}
}

/**
 * Restores the displayed board size from the currently selected board size input.
 */
function restoreBoardSizeDisplay(): void {
	const input = document.querySelector<HTMLInputElement>('input[name="boardSize"]:checked');

	const display = document.getElementById('displayBoardSize');

	if (input?.dataset.boardSizeChoice && display) {
		display.innerText = input.dataset.boardSizeChoice;
	}
}

/**
 * Updates the start button and progress lines based on whether
 * all required game settings have been selected.
 */
export function updateStartButtonState(): void {
	const themeSelected = document.querySelector('input[name="gameTheme"]:checked');
	const playerSelected = document.querySelector('input[name="player"]:checked');
	const boardSizeSelected = document.querySelector('input[name="boardSize"]:checked');

	const allSelected = themeSelected && playerSelected && boardSizeSelected;

	updateStartButton(Boolean(allSelected));
	updateProgressLines(Boolean(allSelected));
}

/**
 * Enables or disables the start button based on whether all required settings are selected.
 *
 * @param allSelected - Indicates whether all required game settings have been selected.
 */
function updateStartButton(allSelected: boolean): void {
	const startButton = document.getElementById('startButton') as HTMLButtonElement | null;

	if (!startButton) return;

	startButton.disabled = !allSelected;
}

/**
 * Updates the progress line images based on whether all required settings are selected.
 *
 * @param allSelected - Indicates whether all required game settings have been selected.
 */
function updateProgressLines(allSelected: boolean): void {
	const lines = document.querySelectorAll<HTMLImageElement>('.settings-progress-line');
	const src = allSelected ? settingsLineAfter : settingsLineBefore;

	lines.forEach((line) => {
		line.src = src;
	});
}

/**
 * Returns the currently selected game settings.
 *
 * @returns The selected theme, player, and board size, or `null` if a required setting is missing.
 */
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

/**
 * Initializes the start button and binds the game start handler.
 */
function initStartButton(): void {
	const startButton = document.getElementById('startButton') as HTMLButtonElement | null;
	if (!startButton) return;
	startButton.addEventListener('click', saveSettingsAndStartGame);
}

/**
 * Saves the selected game settings to session storage
 * and starts the game page.
 */
function saveSettingsAndStartGame(): void {
	const settings = getSelectedGameSettings();
	if (!settings) return;
	sessionStorage.setItem('gameSettings', JSON.stringify(settings));
	initGamePage();
}
