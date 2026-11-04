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

const memoryAppRef = document.getElementById('memoryApp');

interface CardState {
	firstCard: HTMLButtonElement | null;
	secondCard: HTMLButtonElement | null;
	isCheckingCards: boolean;
}

/**
 * Initializes the game page using the stored game settings.
 * Applies the selected theme, prepares the card pairs, creates the game board,
 * and starts the game.
 *
 * @returns Nothing.
 */
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

/**
 * Retrieves the stored game settings from session storage.
 *
 * @returns The parsed game settings, or `null` if no settings are stored.
 */
function getStoredGameSettings(): GameSettings | null {
	const storedSettings = sessionStorage.getItem('gameSettings');
	if (!storedSettings) return null;
	return JSON.parse(storedSettings) as GameSettings;
}

/**
 * Applies the selected theme to the document body.
 *
 * @param theme - The theme to apply.
 */
function applyTheme(theme: ThemeName): void {
	const element = document.querySelector('body');
	if (!element) return;
	element.dataset.theme = theme;
}

/**
 * Creates matching card pairs from the selected card images.
 *
 * @param selectedCards - The image paths used to create the card pairs.
 * @returns An array containing two memory cards for each selected image.
 */
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

/**
 * Randomizes the order of the given memory cards using the Fisher-Yates shuffle algorithm.
 *
 * @param cardPair - The memory cards to shuffle.
 * @returns The shuffled array of memory cards.
 */
function shuffleCards(cardPair: MemoryCard[]): MemoryCard[] {
	let currentIndex = cardPair.length;
	while (currentIndex != 0) {
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[cardPair[currentIndex], cardPair[randomIndex]] = [cardPair[randomIndex], cardPair[currentIndex]];
	}
	return cardPair;
}

/**
 * Creates and renders the game board with all shuffled memory cards.
 *
 * @param boardSize - The number of cards on the game board.
 * @param shuffledCards - The shuffled memory cards to render.
 * @param themeConfig - The configuration of the selected theme.
 */
function createGameBoard(boardSize: number, shuffledCards: MemoryCard[], themeConfig: ThemeConfig): void {
	if (!memoryAppRef) {
		throw new Error('Element with id "memoryApp" not found.');
		return;
	}
	memoryAppRef.innerHTML = gamePageTemplate(boardSize, themeConfig, gameState.pointsBlue, gameState.pointsOrange);

	const gameBoardRef = document.getElementById('gameBoard');
	if (!gameBoardRef) return;

	for (let i = 0; i < shuffledCards.length; i++) {
		const card = shuffledCards[i];
		createSingleCard(gameBoardRef, card, themeConfig);
	}

	initModal();
}

/**
 * Starts the game by setting the first active player
 * and enabling card interactions.
 *
 * @param firstColor - The color of the player who starts the game.
 * @param boardSize - The number of cards on the game board.
 * @param themeConfig - The configuration of the selected theme.
 */
function playGame(firstColor: string, boardSize: number, themeConfig: ThemeConfig): void {
	gameState.activePlayer = firstColor;

	setCurrentPlayerColor(gameState.activePlayer);
	clickAndRotateCard(boardSize, themeConfig);
}

/**
 * Updates the active player indicator with the corresponding player color.
 *
 * @param activePlayer - The color of the currently active player.
 */
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

/**
 * Initializes card click handling for the game board
 * and manages the temporary state of selected cards.
 *
 * @param boardSize - The number of cards on the game board.
 * @param themeConfig - The configuration of the selected theme.
 */
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

/**
 * Handles a card click, validates the selected card,
 * flips it, and processes the current card selection.
 *
 * @param event - The mouse event triggered by clicking the game board.
 * @param state - The current card selection state.
 * @param boardSize - The number of cards on the game board.
 * @param themeConfig - The configuration of the selected theme.
 */
function handleCardClick(event: MouseEvent, state: CardState, boardSize: number, themeConfig: ThemeConfig): void {
	if (state.isCheckingCards) return;

	const clickedCard = getClickedCard(event);
	if (!clickedCard || isInvalidCard(clickedCard, state)) return;

	clickedCard.classList.add('is-flipped');
	handleSelectedCard(clickedCard, state, boardSize, themeConfig);
}

/**
 * Returns the memory card element that was clicked.
 *
 * @param event - The mouse event triggered by clicking the game board.
 * @returns The clicked memory card element, or `null` if no card was clicked.
 */
function getClickedCard(event: MouseEvent): HTMLButtonElement | null {
	const target = event.target as HTMLElement;

	return target.closest<HTMLButtonElement>('.memory-card');
}

/**
 * Checks whether a selected card is invalid for the current turn.
 *
 * @param card - The selected memory card.
 * @param state - The current card selection state.
 * @returns `true` if the card is already matched or already selected, otherwise `false`.
 */
function isInvalidCard(card: HTMLButtonElement, state: CardState): boolean {
	if (card.classList.contains('is-matched')) return true;
	return card === state.firstCard;
}

/**
 * Stores the selected card as the first or second card
 * and checks the pair once two cards are selected.
 *
 * @param card - The currently selected memory card.
 * @param state - The current card selection state.
 * @param boardSize - The number of cards on the game board.
 * @param themeConfig - The configuration of the selected theme.
 */
function handleSelectedCard(card: HTMLButtonElement, state: CardState, boardSize: number, themeConfig: ThemeConfig): void {
	if (!state.firstCard) {
		state.firstCard = card;
		return;
	}

	state.secondCard = card;
	checkSelectedCards(state, boardSize, themeConfig);
}

/**
 * Checks whether the two selected cards match
 * and handles the result accordingly.
 *
 * @param state - The current card selection state.
 * @param boardSize - The number of cards on the game board.
 * @param themeConfig - The configuration of the selected theme.
 */
function checkSelectedCards(state: CardState, boardSize: number, themeConfig: ThemeConfig): void {
	if (!state.firstCard || !state.secondCard) return;

	if (cardsMatch(state.firstCard, state.secondCard)) {
		handleMatchingCards(state, boardSize, themeConfig);
	} else {
		handleNonMatchingCards(state);
	}
}

/**
 * Checks whether two selected cards belong to the same pair.
 *
 * @param firstCard - The first selected memory card.
 * @param secondCard - The second selected memory card.
 * @returns `true` if both cards have the same pair ID, otherwise `false`.
 */
function cardsMatch(firstCard: HTMLButtonElement, secondCard: HTMLButtonElement): boolean {
	return firstCard.dataset.pairId === secondCard.dataset.pairId;
}

/**
 * Handles a matching card pair by marking both cards as matched,
 * updating the active player's score, checking for the game end,
 * and resetting the selected cards.
 *
 * @param state - The current card selection state.
 * @param boardSize - The number of cards on the game board.
 * @param themeConfig - The configuration of the selected theme.
 */
function handleMatchingCards(state: CardState, boardSize: number, themeConfig: ThemeConfig): void {
	if (!state.firstCard || !state.secondCard) return;

	state.firstCard.classList.add('is-matched');
	state.secondCard.classList.add('is-matched');
	addOnePointToActivePlayer();
	checkIfMatchEnds(boardSize, themeConfig);
	resetSelectedCards(state);
}

/**
 * Handles a non-matching card pair by switching the active player,
 * temporarily locking card input, and flipping the cards back after a delay.
 *
 * @param state - The current card selection state.
 */
function handleNonMatchingCards(state: CardState): void {
	if (!state.firstCard || !state.secondCard) return;

	const cardOne = state.firstCard;
	const cardTwo = state.secondCard;
	state.isCheckingCards = true;

	resetCardsAfterDelay(cardOne, cardTwo, state);
}

/**
 * Flips two non-matching cards back after a short delay
 * and resets the current card selection state.
 *
 * @param cardOne - The first selected memory card.
 * @param cardTwo - The second selected memory card.
 * @param state - The current card selection state.
 */
function resetCardsAfterDelay(cardOne: HTMLButtonElement, cardTwo: HTMLButtonElement, state: CardState): void {
	setTimeout(() => {
		rotateCardsBack(cardOne, cardTwo);
		resetSelectedCards(state);
		state.isCheckingCards = false;
		switchActivePlayer();
	}, 1000);
}

/**
 * Switches the active player between blue and orange
 * and updates the active player indicator.
 */
function switchActivePlayer(): void {
	if (gameState.activePlayer === 'blue') {
		gameState.activePlayer = 'orange';
	} else {
		gameState.activePlayer = 'blue';
	}

	setCurrentPlayerColor(gameState.activePlayer);
}

/**
 * Resets the currently selected cards in the card state.
 *
 * @param state - The current card selection state.
 */
function resetSelectedCards(state: CardState): void {
	state.firstCard = null;
	state.secondCard = null;
}

/**
 * Adds one point to the currently active player
 * and updates the scoreboard.
 */
function addOnePointToActivePlayer(): void {
	if (gameState.activePlayer == 'blue') {
		gameState.pointsBlue++;
	} else if (gameState.activePlayer == 'orange') {
		gameState.pointsOrange++;
	}
	updateScoreBoard(gameState.activePlayer);
	return;
}

/**
 * Updates the scoreboard for the currently active player.
 *
 * @param activePlayer - The color of the player whose score should be updated.
 * @throws If the corresponding score element cannot be found in the DOM.
 */
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

/**
 * Checks whether all card pairs have been matched
 * and ends the game when the board is complete.
 *
 * @param boardSize - The number of cards on the game board.
 * @param themeConfig - The configuration of the selected theme.
 */
function checkIfMatchEnds(boardSize: number, themeConfig: ThemeConfig): void {
	if (boardSize / 2 == gameState.pointsBlue + gameState.pointsOrange) {
		setTimeout(() => {
			gameOver(themeConfig);
		}, 1000);
	}
	return;
}

/**
 * Flips two selected cards back to their hidden state.
 *
 * @param cardOne - The first selected memory card.
 * @param cardTwo - The second selected memory card.
 */
function rotateCardsBack(cardOne: HTMLButtonElement, cardTwo: HTMLButtonElement): void {
	cardOne.classList.remove('is-flipped');
	cardTwo.classList.remove('is-flipped');
}
