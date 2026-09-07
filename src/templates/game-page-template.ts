import { MemoryCard } from '../main';

export function gamePageTemplate() {
	return `
    <main class="game-page">
			<header>
			</header>
      <section class="game-board" id="gameBoard"></section>
    </main>
  `;
}

export function createMemoryCard(cardSrc: MemoryCard, cardsBack: string[]): HTMLButtonElement {
	const card = document.createElement('button');

	card.className = 'memory-card';
	card.type = 'button';
	card.dataset.cardId = String(cardSrc.id);
	card.dataset.pairId = String(cardSrc.pairId);

	card.innerHTML = `
		<div class="memory-card__inner">
			<div class="memory-card__back">
				<img src="${cardsBack[0]}" alt="">
			</div>

			<div class="memory-card__front">
				<img src="${cardSrc.imageSrc}" alt="">
			</div>
		</div>
	`;

	return card;
}
