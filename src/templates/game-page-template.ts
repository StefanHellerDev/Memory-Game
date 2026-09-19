// import { MemoryCard } from '../main';

export function gamePageTemplate(boardSize: number) {
	return `
    <main class="game-page">
			<header class="game-page-header"></header>
      <section class="game-board" id="gameBoard" data-board-size="${boardSize}"></section>
    </main>
  `;
}
