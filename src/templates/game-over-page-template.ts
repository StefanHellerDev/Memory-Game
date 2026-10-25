import { ThemeConfig } from '../config/themes';

export function gameOverPageTemplate(themeConfig: ThemeConfig) {
	return `
    <main class="game-over-page">
    
        <img src="${themeConfig.exitButton[0]}">
    </main>
  `;
}
