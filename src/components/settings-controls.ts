import themeVisualCodeVibes from '../assets/img/code_vibes_theme/theme_visual-code_vibes.png';
import { updateStartButtonState } from '../pages/settings-page';

/**
 * Initializes the theme selection inputs and updates the selected theme preview state.
 */
export function initThemeInputs(): void {
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

/**
 * Binds hover and change events to a theme input.
 *
 * @param input - The theme input element to bind.
 * @param themePreview - The image element used to preview the selected theme.
 * @param displayGameTheme - The element used to display the selected theme.
 * @param getSelectedSrc - Returns the currently selected theme image source.
 * @param setSelectedSrc - Updates the currently selected theme image source.
 */
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

/**
 * Binds hover events to a theme input label to preview
 * and restore the selected theme image.
 *
 * @param input - The theme input element whose label should react to hover.
 * @param themePreview - The image element used to display the theme preview.
 * @param getSelectedSrc - Returns the currently selected theme image source.
 */
function bindThemeHover(input: HTMLInputElement, themePreview: HTMLImageElement | null, getSelectedSrc: () => string): void {
	const label = input.closest('label');
	if (!label) return;

	label.addEventListener('mouseenter', () => showThemePreview(input, themePreview));
	label.addEventListener('mouseleave', () => resetThemePreview(themePreview, getSelectedSrc()));
}

/**
 * Displays the preview image for the hovered theme input.
 *
 * @param input - The theme input containing the preview image source.
 * @param themePreview - The image element used to display the theme preview.
 */
function showThemePreview(input: HTMLInputElement, themePreview: HTMLImageElement | null): void {
	if (!themePreview || !input.dataset.previewSrc) return;
	themePreview.src = input.dataset.previewSrc;
}

/**
 * Restores the preview image to the currently selected theme.
 *
 * @param themePreview - The image element used to display the theme preview.
 * @param selectedThemeSrc - The image source of the currently selected theme.
 */
function resetThemePreview(themePreview: HTMLImageElement | null, selectedThemeSrc: string): void {
	if (!themePreview) return;
	themePreview.src = selectedThemeSrc;
}

/**
 * Binds a change event to a theme input.
 *
 * @param input - The theme input element to observe.
 * @param themePreview - The image element used to display the theme preview.
 * @param displayGameTheme - The element used to display the selected theme.
 * @param setSelectedSrc - Updates the currently selected theme image source.
 */
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

/**
 * Handles a theme selection change and updates the related UI state.
 *
 * @param input - The changed theme input element.
 * @param themePreview - The image element used to display the theme preview.
 * @param displayGameTheme - The element used to display the selected theme.
 * @param setSelectedSrc - Updates the currently selected theme image source.
 */
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

/**
 * Updates the selected theme preview and displayed theme name.
 *
 * @param themePreview - The image element used to display the theme preview.
 * @param displayGameTheme - The element used to display the selected theme name.
 * @param previewSrc - The image source of the selected theme.
 * @param themeChoice - The display name of the selected theme.
 */
function updateThemeDisplay(themePreview: HTMLImageElement | null, displayGameTheme: HTMLElement | null, previewSrc: string, themeChoice: string): void {
	if (themePreview) themePreview.src = previewSrc;
	if (!displayGameTheme) return;

	displayGameTheme.innerText = themeChoice;
	animateSelection(displayGameTheme);
}

/**
 * Initializes the player selection inputs.
 */
export function initPlayerInputs(): void {
	const playerInputs = document.querySelectorAll<HTMLInputElement>('input[name="player"]');
	const displayPlayer = document.getElementById('displayPlayer');

	playerInputs.forEach((input) => {
		bindPlayerInput(input, displayPlayer);
	});
}

/**
 * Binds a change event to a player selection input.
 *
 * @param input - The player input element to observe.
 * @param displayPlayer - The element used to display the selected player.
 */
function bindPlayerInput(input: HTMLInputElement, displayPlayer: HTMLElement | null): void {
	input.addEventListener('change', () => {
		handlePlayerChange(input, displayPlayer);
	});
}

/**
 * Handles a player selection change and updates the related UI state.
 *
 * @param input - The changed player input element.
 * @param displayPlayer - The element used to display the selected player.
 */
function handlePlayerChange(input: HTMLInputElement, displayPlayer: HTMLElement | null): void {
	const playerChoice = input.dataset.playerChoice;
	if (!playerChoice) return;

	updatePlayerDisplay(displayPlayer, playerChoice);
	updateStartButtonState();
}

/**
 * Updates the displayed player selection and triggers its selection animation.
 *
 * @param displayPlayer - The element used to display the selected player.
 * @param playerChoice - The selected player value to display.
 */
function updatePlayerDisplay(displayPlayer: HTMLElement | null, playerChoice: string): void {
	if (!displayPlayer) return;

	displayPlayer.innerText = playerChoice;
	animateSelection(displayPlayer);
}

/**
 * Initializes the board size selection inputs.
 */
export function initBoardSizeInputs(): void {
	const boardSizeInputs = document.querySelectorAll<HTMLInputElement>('input[name="boardSize"]');
	const displayBoardSize = document.getElementById('displayBoardSize');

	boardSizeInputs.forEach((input) => {
		bindBoardSizeInput(input, displayBoardSize);
	});
}

/**
 * Binds a change event to a board size input.
 *
 * @param input - The board size input element to observe.
 * @param displayBoardSize - The element used to display the selected board size.
 */
function bindBoardSizeInput(input: HTMLInputElement, displayBoardSize: HTMLElement | null): void {
	input.addEventListener('change', () => {
		handleBoardSizeChange(input, displayBoardSize);
	});
}

/**
 * Handles a board size selection change and updates the related UI state.
 *
 * @param input - The changed board size input element.
 * @param displayBoardSize - The element used to display the selected board size.
 */
function handleBoardSizeChange(input: HTMLInputElement, displayBoardSize: HTMLElement | null): void {
	const boardSizeChoice = input.dataset.boardSizeChoice;
	if (!boardSizeChoice) return;

	updateBoardSizeDisplay(displayBoardSize, boardSizeChoice);
	updateStartButtonState();
}

/**
 * Updates the displayed board size and triggers its selection animation.
 *
 * @param displayBoardSize - The element used to display the selected board size.
 * @param boardSizeChoice - The selected board size value to display.
 */
function updateBoardSizeDisplay(displayBoardSize: HTMLElement | null, boardSizeChoice: string): void {
	if (!displayBoardSize) return;

	displayBoardSize.innerText = boardSizeChoice;
	animateSelection(displayBoardSize);
}

/**
 * Returns the preview image source of the currently selected theme.
 *
 * @returns The selected theme preview source, or the default theme image source.
 */
function getSelectedThemeSrc(): string {
	const checkedInput = document.querySelector<HTMLInputElement>('input[name="gameTheme"]:checked');

	return checkedInput?.dataset.previewSrc || themeVisualCodeVibes;
}

/**
 * Triggers the selection change animation on a given element.
 *
 * @param element - The element that should be animated.
 */
function animateSelection(element: HTMLElement): void {
	element.classList.remove('selection-changed');
	void element.offsetWidth;
	element.classList.add('selection-changed');

	element.addEventListener('animationend', () => element.classList.remove('selection-changed'), { once: true });
}
