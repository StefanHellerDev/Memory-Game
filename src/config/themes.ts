export type ThemeName = 'code' | 'game' | 'food';
export interface ThemeConfig {
	name: string;
	cards: string[];
	cardsBack: string[];
	backToGameButton: string[];
	exitButton: string[];
	gameOver: string[];
	winnerText: string[];
	winnerPicture: string[];
	winnerBackToStart: string[];
}

const themeImages = import.meta.glob('/src/assets/img/**/*.{png,svg}', {
	eager: true,
	query: '?url',
	import: 'default',
}) as Record<string, string>;

/**
 * Resolves a theme image path to the imported image URL.
 *
 * @param path - The relative path of the theme image inside the image directory.
 * @returns The resolved image URL.
 * @throws If the requested theme image cannot be found.
 */
function themeImage(path: string): string {
	const fullPath = `/src/assets/img/${path}`;
	const image = themeImages[fullPath];

	if (!image) {
		throw new Error(`Theme image not found: ${fullPath}`);
	}

	return image;
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
	code: {
		name: 'Code Vibes',
		cards: [
			themeImage('code_vibes_theme/Code_vibes_card01.png'),
			themeImage('code_vibes_theme/Code_vibes_card02.png'),
			themeImage('code_vibes_theme/Code_vibes_card03.png'),
			themeImage('code_vibes_theme/Code_vibes_card04.png'),
			themeImage('code_vibes_theme/Code_vibes_card05.png'),
			themeImage('code_vibes_theme/Code_vibes_card06.png'),
			themeImage('code_vibes_theme/Code_vibes_card07.png'),
			themeImage('code_vibes_theme/Code_vibes_card08.png'),
			themeImage('code_vibes_theme/Code_vibes_card09.png'),
			themeImage('code_vibes_theme/Code_vibes_card10.png'),
			themeImage('code_vibes_theme/Code_vibes_card11.png'),
			themeImage('code_vibes_theme/Code_vibes_card12.png'),
			themeImage('code_vibes_theme/Code_vibes_card13.png'),
			themeImage('code_vibes_theme/Code_vibes_card14.png'),
			themeImage('code_vibes_theme/Code_vibes_card15.png'),
			themeImage('code_vibes_theme/Code_vibes_card16.png'),
			themeImage('code_vibes_theme/Code_vibes_card17.png'),
			themeImage('code_vibes_theme/Code_vibes_card18.png'),
		],
		cardsBack: [themeImage('code_vibes_theme/Code_vibes_card_back.png')],
		backToGameButton: [themeImage('code_vibes_theme/Code_vibes_backtogame.png'), themeImage('code_vibes_theme/Code_vibes_backtogame_hover.png')],
		exitButton: [themeImage('code_vibes_theme/Code_vibes_exit_button.svg'), themeImage('code_vibes_theme/Code_vibes_exit_button_hover.png')],
		gameOver: [
			themeImage('code_vibes_theme/Code_vibes_game_over.svg'),
			themeImage('code_vibes_theme/Code_points_ind_blue.svg'),
			themeImage('code_vibes_theme/Code_points_ind_orange.svg'),
		],
		winnerText: [
			themeImage('code_vibes_theme/Code_vibes_winner_blue_Text.svg'),
			themeImage('code_vibes_theme/Code_vibes_winner_orange_Text.svg'),
			themeImage('code_vibes_theme/Code_vibes_draw_Text.svg'),
		],
		winnerPicture: [
			themeImage('code_vibes_theme/Code_vibes_winner_blue_Player.svg'),
			themeImage('code_vibes_theme/Code_vibes_winner_orange_Player.svg'),
			themeImage('code_vibes_theme/Code_vibes_draw_Scale.svg'),
		],
		winnerBackToStart: [themeImage('code_vibes_theme/Code_vibes_BackToStart.svg')],
	},

	game: {
		name: 'Game',
		cards: [
			themeImage('game_theme/game_card01.png'),
			themeImage('game_theme/game_card02.png'),
			themeImage('game_theme/game_card03.png'),
			themeImage('game_theme/game_card04.png'),
			themeImage('game_theme/game_card05.png'),
			themeImage('game_theme/game_card06.png'),
			themeImage('game_theme/game_card07.png'),
			themeImage('game_theme/game_card08.png'),
			themeImage('game_theme/game_card09.png'),
			themeImage('game_theme/game_card10.png'),
			themeImage('game_theme/game_card11.png'),
			themeImage('game_theme/game_card12.png'),
			themeImage('game_theme/game_card13.png'),
			themeImage('game_theme/game_card14.png'),
			themeImage('game_theme/game_card15.png'),
			themeImage('game_theme/game_card16.png'),
			themeImage('game_theme/game_card17.png'),
			themeImage('game_theme/game_card18.png'),
		],
		cardsBack: [themeImage('game_theme/game_card_back.png')],
		backToGameButton: [themeImage('game_theme/game_backtogame.png'), themeImage('game_theme/game_backtogame_hover.png')],
		exitButton: [themeImage('game_theme/game_exit_button.svg'), themeImage('game_theme/game_exit_button_hover.png')],
		gameOver: [themeImage('game_theme/game_game_over.svg'), themeImage('chess_blue.svg'), themeImage('chess_orange.svg')],
		winnerText: [
			themeImage('game_theme/game_winner_blue_Text.svg'),
			themeImage('game_theme/game_winner_orange_Text.svg'),
			themeImage('game_theme/game_draw_Text.svg'),
		],
		winnerPicture: [themeImage('game_theme/game_pokal.svg'), themeImage('game_theme/game_pokal.svg'), themeImage('game_theme/game_draw_Scale.svg')],
		winnerBackToStart: [themeImage('game_theme/game_BackToStart.svg')],
	},

	food: {
		name: 'Food',
		cards: [
			themeImage('food_theme/food_card01.png'),
			themeImage('food_theme/food_card02.png'),
			themeImage('food_theme/food_card03.png'),
			themeImage('food_theme/food_card04.png'),
			themeImage('food_theme/food_card05.png'),
			themeImage('food_theme/food_card06.png'),
			themeImage('food_theme/food_card07.png'),
			themeImage('food_theme/food_card08.png'),
			themeImage('food_theme/food_card09.png'),
			themeImage('food_theme/food_card10.png'),
			themeImage('food_theme/food_card11.png'),
			themeImage('food_theme/food_card12.png'),
			themeImage('food_theme/food_card13.png'),
			themeImage('food_theme/food_card14.png'),
			themeImage('food_theme/food_card15.png'),
			themeImage('food_theme/food_card16.png'),
			themeImage('food_theme/food_card17.png'),
			themeImage('food_theme/food_card18.png'),
		],
		cardsBack: [themeImage('food_theme/food_card_back.png')],
		backToGameButton: [themeImage('food_theme/food_backtogame.png'), themeImage('food_theme/food_backtogame_hover.png')],
		exitButton: [themeImage('food_theme/food_exit_button.svg'), themeImage('food_theme/food_exit_button_hover.png')],
		gameOver: [themeImage('food_theme/food_game_over.svg'), themeImage('chess_blue.svg'), themeImage('chess_orange.svg')],
		winnerText: [
			themeImage('food_theme/food_winner_blue_Text.svg'),
			themeImage('food_theme/food_winner_orange_Text.svg'),
			themeImage('food_theme/food_draw_Text.svg'),
		],
		winnerPicture: [
			themeImage('food_theme/food_winner_blue_Player.svg'),
			themeImage('food_theme/food_winner_orange_Player.svg'),
			themeImage('food_theme/food_draw_Scale.svg'),
		],
		winnerBackToStart: [themeImage('food_theme/food_BackToStart.svg')],
	},
};
