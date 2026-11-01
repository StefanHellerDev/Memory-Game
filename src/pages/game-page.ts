// *************************
//        Game page
// *************************

import { GameSettings } from '../types/game-types';
import { MemoryCard } from '../types/game-types';
import { ThemeName } from '../config/themes';
import { THEMES } from '../config/themes';
import { ThemeConfig } from '../config/themes';
import { gamePageTemplate } from '../templates/game-page-template';
import { createSingleCard } from '../templates/game-page-template';
import { gameState } from '../state/game-state';
import { gameOver } from '../pages/winner-page';
import { initModal } from '../components/modal';

export function initGamePage(): void {
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

const memoryAppRef = document.getElementById('memoryApp');
if (!memoryAppRef) {
	throw new Error('Element with id "memoryApp" not found.');
}

function createGameBoard(boardSize: number, shuffledCards: MemoryCard[], themeConfig: ThemeConfig): void {
	if (!memoryAppRef) return;
	memoryAppRef.innerHTML = gamePageTemplate(boardSize, themeConfig, gameState.pointsBlue, gameState.pointsOrange);

	const gameBoardRef = document.getElementById('gameBoard');
	if (!gameBoardRef) return;

	for (let i = 0; i < shuffledCards.length; i++) {
		const card = shuffledCards[i];
		createSingleCard(gameBoardRef, card, themeConfig);
	}

	initModal();
}

function playGame(firstColor: string, boardSize: number, themeConfig: ThemeConfig): void {
	gameState.activePlayer = firstColor;

	setCurrentPlayerColor(gameState.activePlayer);
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
	if (gameState.activePlayer === 'blue') {
		gameState.activePlayer = 'orange';
	} else {
		gameState.activePlayer = 'blue';
	}

	setCurrentPlayerColor(gameState.activePlayer);
}

function resetSelectedCards(state: CardState): void {
	state.firstCard = null;
	state.secondCard = null;
}

function addOnePointToActivePlayer(): void {
	if (gameState.activePlayer == 'blue') {
		gameState.pointsBlue++;
	} else if (gameState.activePlayer == 'orange') {
		gameState.pointsOrange++;
	}
	updateScoreBoard(gameState.activePlayer);
	return;
}

function updateScoreBoard(activePlayer: string): void {
	if (activePlayer == 'orange') {
		const scoreRef = document.getElementById('pointsOrange');
		if (!scoreRef) {
			throw new Error('Element with id "pointsOrange" not found.');
		}
		scoreRef.innerHTML = `${gameState.pointsOrange}`;
	} else {
		const scoreRef = document.getElementById('pointsBlue');
		if (!scoreRef) {
			throw new Error('Element with id "pointsBlue" not found.');
		}
		scoreRef.innerHTML = `${gameState.pointsBlue}`;
	}
	return;
}

function checkIfMatchEnds(boardSize: number, themeConfig: ThemeConfig): void {
	if (boardSize / 2 == gameState.pointsBlue + gameState.pointsOrange) {
		gameOver(themeConfig);
	}
	return;
}

function rotateCardsBack(cardOne: HTMLButtonElement, cardTwo: HTMLButtonElement): void {
	cardOne.classList.remove('is-flipped');
	cardTwo.classList.remove('is-flipped');
}
