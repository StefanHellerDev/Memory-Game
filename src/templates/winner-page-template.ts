import { ThemeConfig } from '../config/themes';

export function winnerPageTemplate(themeConfig: ThemeConfig, pointsBlue: number, pointsOrange: number) {
	let index = 2;
	if (pointsBlue > pointsOrange) {
		index = 0;
	} else if (pointsBlue < pointsOrange) {
		index = 1;
	}

	return `
    <main class="winner-page page-slide-in">

    <div class="winner-page__confetti">
			<img class="d_none" id="confetti" src="./src/assets/img/code_vibes_theme/Code_vibes_confetti.png">
		</div>

		<div class="winner-page__display">
	    <img class="winner-page__display--text" src="${themeConfig.winnerText[index]}">
  	  <img class="winner-page__display--picture" src="${themeConfig.winnerPicture[index]}">
			<div class="winner-page__display--winnerBackToStart" id="winnerBackToStartBtn">
  	  	<img src="${themeConfig.winnerBackToStart}">
			</div>
		</div>

    </main>
  `;
}
