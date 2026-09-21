import { ThemeConfig } from '../config/themes';

export function gamePageTemplate(boardSize: number, themeConfig: ThemeConfig) {
	return `
    <main class="game-page">
			<header class="game-page__header">
        <div>Punkte</div>
        <div>Current player:</div>
        <img src="${themeConfig.exitButton[0]}">
      </header>

      <section class="game-page__board" id="gameBoard" data-board-size="${boardSize}"></section>
    </main>
  `;
}
