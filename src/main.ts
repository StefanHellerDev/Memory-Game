import './styles/main.scss';
import { THEMES } from './config/themes';
import { ThemeConfig } from './config/themes';
import { startPageTemplate } from './templates/start-page-template';
import { mainPageTemplate } from './templates/main-page-template';
import { gamePageTemplate } from './templates/game-page-template';
import { createSingleCard } from './templates/game-page-template';
import { ThemeName } from './config/themes';

let activePlayer: string; // blue or orange
let pointsBlue = 0;
let pointsOrange = 0;

const memoryAppRef = document.getElementById('memoryApp');
if (!memoryAppRef) {
	throw new Error('Element with id "memoryApp" not found.');
}

function showStartPage(): void {
	if (!memoryAppRef) return;
	memoryAppRef.innerHTML = startPageTemplate();
	const playButton = document.getElementById('playButton');
	if (!playButton) return;
	playButton.addEventListener('click', showMainPage);
}

function showMainPage(): void {
	if (!memoryAppRef) return;
	memoryAppRef.innerHTML = mainPageTemplate();
	initSettingsPage();
}

document.addEventListener('DOMContentLoaded', () => {
	// showStartPage(); // normal start
	initGamePage(); // start at game page
});

// *************************
// Main Page / Settings page
// *************************

function initSettingsPage(): void {
	initThemeInputs();
	initPlayerInputs();
	initBoardSizeInputs();
	initStartButton();
}

function initThemeInputs() {
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

function initPlayerInputs() {
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

function initBoardSizeInputs() {
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

function getSelectedThemeSrc(): string {
	const checkedInput = document.querySelector<HTMLInputElement>('input[name="gameTheme"]:checked');

	return checkedInput?.dataset.previewSrc || './src/assets/img/code_vibes_theme/theme_visual-code_vibes.png';
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

	const src = allSelected ? './src/assets/img/settings-page-line-after.svg' : './src/assets/img/settings-page-line-before.svg';

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

// *************************
//        Game page
// *************************

interface GameSettings {
	theme: ThemeName;
	player: 'blue' | 'orange';
	boardSize: 16 | 24 | 36;
}

export interface MemoryCard {
	id: number;
	pairId: number;
	imageSrc: string;
}

function initGamePage(): void {
	const settings = getStoredGameSettings();
	if (!settings) return;

	applyTheme(settings.theme);

	const themeConfig = THEMES[settings.theme];
	const pairCount = settings.boardSize / 2;
	const selectedCards = themeConfig.cards.slice(0, pairCount);
	const cardPairs = createCardPairs(selectedCards);
	const shuffledCards = shuffleCards(cardPairs);

	createGameBoard(settings.boardSize, shuffledCards, themeConfig);

	playGame(settings.player);
}

function getStoredGameSettings(): GameSettings | null {
	const storedSettings = sessionStorage.getItem('gameSettings');
	if (!storedSettings) return null;
	return JSON.parse(storedSettings) as GameSettings;
}

function applyTheme(theme: ThemeName): void {
	const element = document.querySelector('body');
	if (!element) return;
	element.dataset.theme = theme;
}

function createCardPairs(selectedCards: string[]): MemoryCard[] {
	const cards = selectedCards.map((imageSrc, index) => [
		{
			id: index * 2,
			pairId: index,
			imageSrc,
		},
		{
			id: index * 2 + 1,
			pairId: index,
			imageSrc,
		},
	]);
	return cards.flat();
}

function shuffleCards(cardPair: MemoryCard[]): MemoryCard[] {
	let currentIndex = cardPair.length;
	while (currentIndex != 0) {
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[cardPair[currentIndex], cardPair[randomIndex]] = [cardPair[randomIndex], cardPair[currentIndex]];
	}
	return cardPair;
}

function createGameBoard(boardSize: number, shuffledCards: MemoryCard[], themeConfig: ThemeConfig): void {
	if (!memoryAppRef) return;
	memoryAppRef.innerHTML = gamePageTemplate(boardSize, themeConfig, pointsBlue, pointsOrange);

	const gameBoardRef = document.getElementById('gameBoard');
	if (!gameBoardRef) return;

	for (let i = 0; i < shuffledCards.length; i++) {
		const card = shuffledCards[i];
		createSingleCard(gameBoardRef, card, themeConfig);
	}
}

function playGame(firstColor: string): void {
	activePlayer = firstColor;

	setCurrentPlayerColor(activePlayer);
	clickAndRotateCard();
}

function setCurrentPlayerColor(activePlayer: string): void {
	const showActivePlayer = document.querySelector<HTMLElement>('.game-page__showActivePlayer');
	if (showActivePlayer) {
		if (activePlayer == 'blue') {
			showActivePlayer.style.backgroundColor = 'var(--color-player-blue)';
		} else {
			showActivePlayer.style.backgroundColor = 'var(--color-player-orange)';
		}
	}
}

function clickAndRotateCard(): void {
	let firstCard: HTMLButtonElement | null = null;
	let secondCard: HTMLButtonElement | null = null;

	const fieldRef = document.getElementById('gameBoard');
	if (!fieldRef) return;

	fieldRef.addEventListener('click', (e) => {
		const target = e.target as HTMLElement;
		const clickedCard = target.closest<HTMLButtonElement>('.memory-card');
		if (!clickedCard) return;

		clickedCard.classList.toggle('is-flipped');

		if (!firstCard) {
			firstCard = clickedCard;
			return;
		}

		if (clickedCard === firstCard) return;

		secondCard = clickedCard;

		console.log('First:', firstCard.dataset.pairId);
		console.log('Second:', secondCard.dataset.pairId);

		if (firstCard.dataset.pairId === secondCard.dataset.pairId) {
			console.log('Pair found!');
			addOnePointToActivePlayer();
		} else {
			console.log('No match!');
		}

		firstCard = null;
		secondCard = null;
	});
}

function addOnePointToActivePlayer(): void {
	if (activePlayer == 'blue') {
		pointsBlue++;
	} else if (activePlayer == 'orange') {
		pointsOrange++;
	}
	updateScoreBoard(activePlayer);
	console.log('Blue: ', pointsBlue);
	console.log('Orange: ', pointsOrange);
	return;
}

function updateScoreBoard(activePlayer: string): void {
	if (activePlayer == 'orange') {
		const scoreRef = document.getElementById('pointsOrange');
		if (!scoreRef) {
			throw new Error('Element with id "pointsOrange" not found.');
		}
		scoreRef.innerHTML = `${pointsOrange}`;
	} else {
		const scoreRef = document.getElementById('pointsBlue');
		if (!scoreRef) {
			throw new Error('Element with id "pointsBlue" not found.');
		}
		scoreRef.innerHTML = `${pointsBlue}`;
	}
	return;
}
