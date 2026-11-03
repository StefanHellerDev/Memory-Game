import { ThemeConfig } from '../config/themes';

/**
 * Creates the game-over page markup with the final score and theme-specific images.
 *
 * @param themeConfig - The configuration of the selected theme.
 * @param pointsBlue - The final score of the blue player.
 * @param pointsOrange - The final score of the orange player.
 * @returns The HTML markup for the game-over page.
 */
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
