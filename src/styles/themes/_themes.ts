export type ThemeName = 'code' | 'game' | 'food';
export interface ThemeConfig {
name: string;
cards: string[];
cardsBack: string[];
backToGameButton: string[];
exitButton: string[];
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  code: {
    name: 'Code Vibes',
    cards: [
      './src/assets/img/code_vibes_theme/Code_vibes_card01.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card02.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card03.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card04.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card05.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card06.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card07.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card08.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card09.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card10.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card11.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card12.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card13.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card14.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card15.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card16.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card17.png',
      './src/assets/img/code_vibes_theme/Code_vibes_card18.png',
    ],
    cardsBack: [
      './src/assets/img/code_vibes_theme/Code_vibes_card_back.png'
    ],
    backToGameButton: [
      './src/assets/img/code_vibes_theme/Code_vibes_backtogame.png',
      './src/assets/img/code_vibes_theme/Code_vibes_backtogame_hover.png',
    ],
    exitButton: [
      './src/assets/img/code_vibes_theme/Code_vibes_exit_button.png',
      './src/assets/img/code_vibes_theme/Code_vibes_exit_button_hover.png',
    ],
  },

  game: {
    name: 'Game',
    cards: [
      './src/assets/img/game_theme/game_card01.png',
      './src/assets/img/game_theme/game_card02.png',
      './src/assets/img/game_theme/game_card03.png',
      './src/assets/img/game_theme/game_card04.png',
      './src/assets/img/game_theme/game_card05.png',
      './src/assets/img/game_theme/game_card06.png',
      './src/assets/img/game_theme/game_card07.png',
      './src/assets/img/game_theme/game_card08.png',
      './src/assets/img/game_theme/game_card09.png',
      './src/assets/img/game_theme/game_card10.png',
      './src/assets/img/game_theme/game_card11.png',
      './src/assets/img/game_theme/game_card12.png',
      './src/assets/img/game_theme/game_card13.png',
      './src/assets/img/game_theme/game_card14.png',
      './src/assets/img/game_theme/game_card15.png',
      './src/assets/img/game_theme/game_card16.png',
      './src/assets/img/game_theme/game_card17.png',
      './src/assets/img/game_theme/game_card18.png',
    ],
    cardsBack: [
      './src/assets/img/game_theme/game_card_back.png'
    ],
    backToGameButton: [
      './src/assets/img/game_theme/game_backtogame.png',
      './src/assets/img/game_theme/game_backtogame_hover.png',
    ],
    exitButton: [
      './src/assets/img/game_theme/game_exit_button.png',
      './src/assets/img/game_theme/game_exit_button_hover.png',
    ],
  },

  food: {
    name: 'Food',
    cards: [
      '',
    ],
    cardsBack: [
      './'
    ],
    backToGameButton: [
      './',
      './',
    ],
    exitButton: [
      './',
      './',
    ],
  },
}