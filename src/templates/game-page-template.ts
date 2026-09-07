export function gamePageTemplate() {
	return `
    <main class="game-page">
      <section class="game-board" id="gameBoard"></section>
    </main>
  `;
}

export function createMemoryCard(cardSrc: string): HTMLButtonElement {
	const card = document.createElement('button');

	card.className = 'memory-card';
	card.type = 'button';
	card.dataset.card = cardSrc;

	card.innerHTML = `
		<div class="memory-card__inner">
			<div class="memory-card__back"></div>

			<div class="memory-card__front">
				<img src="${cardSrc}" alt="">
			</div>
		</div>
	`;

	return card;
}
