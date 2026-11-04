import { ThemeConfig } from '../config/themes';
import { gameOverPageTemplate } from '../templates/game-over-page-template';
import { winnerPageTemplate } from '../templates/winner-page-template';
import { gameState } from '../state/game-state';
import { showMainPage } from '../pages/settings-page';

const memoryAppRef = document.getElementById('memoryApp');
const winnerPageRef = document.getElementById('winnerPage');

/**
 * Displays the game-over page and switches to the winner page after a short delay.
 *
 * @param themeConfig - The configuration of the selected theme.
 */
export function gameOver(themeConfig: ThemeConfig): void {
	if (!memoryAppRef) {
		throw new Error('Element with id "memoryApp" not found.');
	}
	memoryAppRef.innerHTML = gameOverPageTemplate(themeConfig, gameState.pointsBlue, gameState.pointsOrange);

	setTimeout(() => {
		winnerPage(themeConfig);
	}, 3000);
}

/**
 * Displays the winner page, handles optional confetti,
 * and initializes the back button.
 *
 * @param themeConfig - The configuration of the selected theme.
 */
function winnerPage(themeConfig: ThemeConfig): void {
	if (!memoryAppRef || !winnerPageRef) return;

	let winnerIndex = 2;
	if (gameState.pointsBlue > gameState.pointsOrange) {
		winnerIndex = 0;
	} else if (gameState.pointsBlue < gameState.pointsOrange) {
		winnerIndex = 1;
	}

	memoryAppRef.innerHTML = '';
	winnerPageRef.innerHTML = winnerPageTemplate(themeConfig, winnerIndex);

	showConfettiIfNeeded(themeConfig);
	initWinnerBackButton();
}

/**
 * Displays the confetti animation when there is a winner
 * and the selected theme is Code Vibes.
 *
 * @param themeConfig - The configuration of the selected theme.
 */
function showConfettiIfNeeded(themeConfig: ThemeConfig): void {
	const confettiRef = document.getElementById('confetti');
	if (!confettiRef) return;

	const hasWinner = gameState.pointsBlue !== gameState.pointsOrange;
	const isCodeVibes = themeConfig.name === 'Code Vibes';

	if (hasWinner && isCodeVibes) {
		confettiRef.classList.remove('d_none');
	}
}

/**
 * Initializes the back button on the winner page.
 */
function initWinnerBackButton(): void {
	const backButton = document.getElementById('winnerBackToStartBtn');
	if (!backButton) return;

	backButton.addEventListener('click', () => {
		resetGameAndShowMainPage();
	});
}

/**
 * Resets the game scores, clears the winner page,
 * and returns to the main page.
 */
function resetGameAndShowMainPage(): void {
	gameState.pointsBlue = 0;
	gameState.pointsOrange = 0;

	if (winnerPageRef) {
		winnerPageRef.innerHTML = '';
	}

	showMainPage();
}
