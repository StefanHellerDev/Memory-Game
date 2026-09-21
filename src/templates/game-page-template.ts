import { ThemeConfig } from '../config/themes';
import chessPawn from '../assets/img/chess_pawn.svg';

export function gamePageTemplate(boardSize: number, themeConfig: ThemeConfig) {
	return `
    <main class="game-page">
			<header class="game-page__header">
        <div>Punkte</div>
        <div class="game-page__currentPlayerBox">
          Current player: 
          <div class="game-page__showActivePlayer">
            <img src="${chessPawn}">
          </div>
        </div>
        <img src="${themeConfig.exitButton[0]}">
      </header>

      <section class="game-page__board" id="gameBoard" data-board-size="${boardSize}"></section>
    </main>
  `;
}
