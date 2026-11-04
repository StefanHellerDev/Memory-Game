import { ThemeConfig } from '../config/themes';
import confettiPic from '../assets/img/code_vibes_theme/Code_vibes_confetti.svg';

/**
 * Creates the winner page markup based on the final scores
 * and the selected theme configuration.
 *
 * @param themeConfig - The configuration of the selected game theme.
 * @param pointsBlue - The final score of the blue player.
 * @param pointsOrange - The final score of the orange player.
 * @returns The HTML markup for the winner page.
 */
export function winnerPageTemplate(themeConfig: ThemeConfig, winnerIndex: number) {
	return `
    <main class="winner-page page-slide-in">

	    <div class="winner-page__confetti">
				<img class="d_none" id="confetti" src="${confettiPic}">
			</div>

			<div class="winner-page__display">
		    <img class="winner-page__display--text" src="${themeConfig.winnerText[winnerIndex]}">
  		  <img class="winner-page__display--picture" src="${themeConfig.winnerPicture[winnerIndex]}">
				<div class="winner-page__display--winnerBackToStart" id="winnerBackToStartBtn">
  	  		<img src="${themeConfig.winnerBackToStart}">
				</div>
			</div>

    </main>
  `;
}
