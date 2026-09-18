import { MemoryCard } from '../main';

export function gamePageTemplate(cards: MemoryCard[], boardsize: number) {
	return `
    <main class="game-page">
			<header>
			</header>
      <section class="game-board" id="gameBoard"></section>
    </main>
  `;
}
