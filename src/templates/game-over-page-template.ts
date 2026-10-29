import { ThemeConfig } from '../config/themes';

export function gameOverPageTemplate(themeConfig: ThemeConfig, pointsBlue: number, pointsOrange: number) {
	return `
    <main class="game-over-page">

      <div class="game-over-page__box">
        <img src="${themeConfig.gameOver[0]}">

        <p class="game-over-page__box--final-score">Final Score</p>

        <div class="game-over-page__box--score-box">
          <div class="game-page__score-board--single-score game-page__score-board--single-score-blue">
            <img src="${themeConfig.gameOver[1]}">
            <p id="pointsBlue">${pointsBlue}</p>
          </div>
          
          <div class="game-page__score-board--single-score game-page__score-board--single-score-orange">
            <img src="${themeConfig.gameOver[2]}">
            <p id="pointsOrange">${pointsOrange}</p>
          </div>
        </div>

      </div>
    </main>
  `;
}
