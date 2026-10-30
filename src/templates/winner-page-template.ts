import { ThemeConfig } from '../config/themes';

export function winnerPageTemplate(themeConfig: ThemeConfig, pointsBlue: number, pointsOrange: number) {
	let index = 2;
	if (pointsBlue > pointsOrange) {
		index = 0;
	} else if (pointsBlue < pointsOrange) {
		index = 1;
	}
	return `
    <main class="winner-page">
    
    <img class="winner-page__confetti" src="./src/assets/img/code_vibes_theme/Code_vibes_confetti.png">
    <img src="${themeConfig.winnerText[index]}">
    <img src="${themeConfig.winnerPicture[index]}">

    </main>
  `;
}
