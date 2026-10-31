import './styles/main.scss';
import { THEMES } from './config/themes';
import { ThemeConfig } from './config/themes';
import { startPageTemplate } from './templates/start-page-template';
import { mainPageTemplate } from './templates/main-page-template';
import { gamePageTemplate } from './templates/game-page-template';
import { gameOverPageTemplate } from './templates/game-over-page-template';
import { winnerPageTemplate } from './templates/winner-page-template';
import { createSingleCard } from './templates/game-page-template';
import { ThemeName } from './config/themes';

let activePlayer: string;
let pointsBlue = 0;
let pointsOrange = 0;

const memoryAppRef = document.getElementById('memoryApp');
if (!memoryAppRef) {
	throw new Error('Element with id "memoryApp" not found.');
}

const winnerPageRef = document.getElementById('winnerPage');
if (!winnerPageRef) {
	throw new Error('Element with id "winnerPage" not found.');
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
	showStartPage();
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
	playGame(settings.player, settings.boardSize, themeConfig);
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

	initModal();
}

function playGame(firstColor: string, boardSize: number, themeConfig: ThemeConfig): void {
	activePlayer = firstColor;

	setCurrentPlayerColor(activePlayer);
	clickAndRotateCard(boardSize, themeConfig);
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

interface CardState {
	firstCard: HTMLButtonElement | null;
	secondCard: HTMLButtonElement | null;
	isCheckingCards: boolean;
}

function clickAndRotateCard(boardSize: number, themeConfig: ThemeConfig): void {
	const fieldRef = document.getElementById('gameBoard');
	if (!fieldRef) return;

	const state: CardState = {
		firstCard: null,
		secondCard: null,
		isCheckingCards: false,
	};

	fieldRef.addEventListener('click', (event) => {
		handleCardClick(event, state, boardSize, themeConfig);
	});
}

function handleCardClick(event: MouseEvent, state: CardState, boardSize: number, themeConfig: ThemeConfig): void {
	if (state.isCheckingCards) return;

	const clickedCard = getClickedCard(event);
	if (!clickedCard || isInvalidCard(clickedCard, state)) return;

	clickedCard.classList.add('is-flipped');
	handleSelectedCard(clickedCard, state, boardSize, themeConfig);
}

function getClickedCard(event: MouseEvent): HTMLButtonElement | null {
	const target = event.target as HTMLElement;

	return target.closest<HTMLButtonElement>('.memory-card');
}

function isInvalidCard(card: HTMLButtonElement, state: CardState): boolean {
	if (card.classList.contains('is-matched')) return true;
	return card === state.firstCard;
}

function handleSelectedCard(card: HTMLButtonElement, state: CardState, boardSize: number, themeConfig: ThemeConfig): void {
	if (!state.firstCard) {
		state.firstCard = card;
		return;
	}

	state.secondCard = card;
	checkSelectedCards(state, boardSize, themeConfig);
}

function checkSelectedCards(state: CardState, boardSize: number, themeConfig: ThemeConfig): void {
	if (!state.firstCard || !state.secondCard) return;

	if (cardsMatch(state.firstCard, state.secondCard)) {
		handleMatchingCards(state, boardSize, themeConfig);
	} else {
		handleNonMatchingCards(state);
	}
}

function cardsMatch(firstCard: HTMLButtonElement, secondCard: HTMLButtonElement): boolean {
	return firstCard.dataset.pairId === secondCard.dataset.pairId;
}

function handleMatchingCards(state: CardState, boardSize: number, themeConfig: ThemeConfig): void {
	if (!state.firstCard || !state.secondCard) return;

	state.firstCard.classList.add('is-matched');
	state.secondCard.classList.add('is-matched');
	addOnePointToActivePlayer();
	checkIfMatchEnds(boardSize, themeConfig);
	resetSelectedCards(state);
}

function handleNonMatchingCards(state: CardState): void {
	if (!state.firstCard || !state.secondCard) return;

	const cardOne = state.firstCard;
	const cardTwo = state.secondCard;
	state.isCheckingCards = true;

	switchActivePlayer();
	resetCardsAfterDelay(cardOne, cardTwo, state);
}

function resetCardsAfterDelay(cardOne: HTMLButtonElement, cardTwo: HTMLButtonElement, state: CardState): void {
	setTimeout(() => {
		rotateCardsBack(cardOne, cardTwo);
		resetSelectedCards(state);
		state.isCheckingCards = false;
	}, 1000);
}

function switchActivePlayer(): void {
	if (activePlayer === 'blue') {
		activePlayer = 'orange';
	} else {
		activePlayer = 'blue';
	}

	setCurrentPlayerColor(activePlayer);
}

function resetSelectedCards(state: CardState): void {
	state.firstCard = null;
	state.secondCard = null;
}

function addOnePointToActivePlayer(): void {
	if (activePlayer == 'blue') {
		pointsBlue++;
	} else if (activePlayer == 'orange') {
		pointsOrange++;
	}
	updateScoreBoard(activePlayer);
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

function checkIfMatchEnds(boardSize: number, themeConfig: ThemeConfig): void {
	if (boardSize / 2 == pointsBlue + pointsOrange) {
		gameOver(themeConfig);
	}
	return;
}

function rotateCardsBack(cardOne: HTMLButtonElement, cardTwo: HTMLButtonElement): void {
	cardOne.classList.remove('is-flipped');
	cardTwo.classList.remove('is-flipped');
}

// *************************
//        Modal
// *************************

function initModal(): void {
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
	pointsBlue = 0;
	pointsOrange = 0;
	showMainPage();
}

function bindOverlayClose(overlay: HTMLElement): void {
	overlay.addEventListener('click', (event: MouseEvent) => {
		if (event.target === overlay) {
			overlay.classList.remove('active');
		}
	});
}

// *************************
//        Game OVER
// *************************

function gameOver(themeConfig: ThemeConfig): void {
	if (!memoryAppRef) return;
	memoryAppRef.innerHTML = gameOverPageTemplate(themeConfig, pointsBlue, pointsOrange);
	setTimeout(() => {
		winnerPage(themeConfig);
	}, 3000);
}

function winnerPage(themeConfig: ThemeConfig): void {
	if (!memoryAppRef || !winnerPageRef) return;

	memoryAppRef.innerHTML = '';
	winnerPageRef.innerHTML = winnerPageTemplate(themeConfig, pointsBlue, pointsOrange);

	showConfettiIfNeeded(themeConfig);
	initWinnerBackButton();
}

function showConfettiIfNeeded(themeConfig: ThemeConfig): void {
	const confettiRef = document.getElementById('confetti');
	if (!confettiRef) return;

	const hasWinner = pointsBlue !== pointsOrange;
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
	pointsBlue = 0;
	pointsOrange = 0;

	if (winnerPageRef) {
		winnerPageRef.innerHTML = '';
	}

	showMainPage();
}
