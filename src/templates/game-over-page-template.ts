import { ThemeConfig } from '../config/themes';

export function gameOverPageTemplate(themeConfig: ThemeConfig, pointsBlue: number, pointsOrange: number) {
	return `
    <main class="game-over-page">

      <div class="game-over-page__box">
        <img src="${themeConfig.gameOver}">

        <p class="game-over-page__box--final-score">Final Score</p>

        <div class="game-over-page__box--score-box">
          <p id="pointsBlue">${pointsBlue}</p>
          <p id="pointsOrange">${pointsOrange}</p>
        </div>

      </div>
    </main>
  `;
}
