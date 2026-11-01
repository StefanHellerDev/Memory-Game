// *************************
//        Game OVER
// *************************

import { ThemeConfig } from '../config/themes';
import { gameOverPageTemplate } from '../templates/game-over-page-template';
import { winnerPageTemplate } from '../templates/winner-page-template';
import { gameState } from '../state/game-state';
import { showMainPage } from '../pages/settings-page';

const memoryAppRef = document.getElementById('memoryApp');
if (!memoryAppRef) {
	throw new Error('Element with id "memoryApp" not found.');
}

const winnerPageRef = document.getElementById('winnerPage');
if (!winnerPageRef) {
	throw new Error('Element with id "winnerPage" not found.');
}

export function gameOver(themeConfig: ThemeConfig): void {
	if (!memoryAppRef) return;
	memoryAppRef.innerHTML = gameOverPageTemplate(themeConfig, gameState.pointsBlue, gameState.pointsOrange);
	setTimeout(() => {
		winnerPage(themeConfig);
	}, 3000);
}

function winnerPage(themeConfig: ThemeConfig): void {
	if (!memoryAppRef || !winnerPageRef) return;

	memoryAppRef.innerHTML = '';
	winnerPageRef.innerHTML = winnerPageTemplate(themeConfig, gameState.pointsBlue, gameState.pointsOrange);

	showConfettiIfNeeded(themeConfig);
	initWinnerBackButton();
}

function showConfettiIfNeeded(themeConfig: ThemeConfig): void {
	const confettiRef = document.getElementById('confetti');
	if (!confettiRef) return;

	const hasWinner = gameState.pointsBlue !== gameState.pointsOrange;
	const isCodeVibes = themeConfig.name === 'Code Vibes';

	if (hasWinner && isCodeVibes) {
		confettiRef.classList.remove('d_none');
	}
}

function initWinnerBackButton(): void {
	const backButton = document.getElementById('winnerBackToStartBtn');
	if (!backButton) return;

	backButton.addEventListener('click', () => {
		resetGameAndShowMainPage();
	});
}

function resetGameAndShowMainPage(): void {
	gameState.pointsBlue = 0;
	gameState.pointsOrange = 0;

	if (winnerPageRef) {
		winnerPageRef.innerHTML = '';
	}

	showMainPage();
}
