import settingsHeaderLine from '../assets/img/settings-header-line.svg';
import imageGameThemes from '../assets/img/image_game_themes.svg';
import settingsLine from '../assets/img/settings-line.svg';
import imageChoosePlayer from '../assets/img/image_choose_player.svg';
import imageBoardSize from '../assets/img/image_Board_size.svg';
import settingsPageLineBefore from '../assets/img/settings-page-line-before.svg';
import imageStartButton from '../assets/img/smart_display.svg';
import themeVisualCodeVibes from '../assets/img/code_vibes_theme/theme_visual-code_vibes.png';
import themeVisualGame from '../assets/img/game_theme/theme_visual-game.png';
import themeVisualFood from '../assets/img/food_theme/theme_visual-food.png';

/**
 * Creates the markup for the main settings page, including theme,
 * player, and board size selection controls.
 *
 * @returns The HTML markup for the main settings page.
 */
export function mainPageTemplate() {
	return `  
  <main class="main-page">

    <section class="main-page--content">

      <header class="main-page__settings-header">
        <h1>Settings</h1>
        <img src="${settingsHeaderLine}" alt="">
      </header>

      <section class="main-page--content">

        <form class="settings-detail">

          <fieldset class="settings-group flex-column">

            <legend class="settings-group--legend">
              <img src="${imageGameThemes}" alt="">
              <h2>Game themes</h2>
            </legend>

            <label class="settings-group--items">
              <input type="radio" name="gameTheme" value="code"
                data-preview-src="${themeVisualCodeVibes}"
                data-theme-choice="Code Vibes">
              <span class="settings-label-text">Code vibes theme</span>
              <img class="settings-line" src="${settingsLine}" alt="">
            </label>

            <label class="settings-group--items">
              <input type="radio" name="gameTheme" value="game"
                data-preview-src="${themeVisualGame}" data-theme-choice="Game">
              <span class="settings-label-text">Game theme</span>
              <img class="settings-line" src="${settingsLine}" alt="">
            </label>

            <label class="settings-group--items">
              <input type="radio" name="gameTheme" value="food"
                data-preview-src="${themeVisualFood}" data-theme-choice="Food">
              <span class="settings-label-text">Food theme</span>
              <img class="settings-line" src="${settingsLine}" alt="">
            </label>
          </fieldset>

          <fieldset class="settings-group flex-column">
            <legend class="settings-group--legend">
              <img src="${imageChoosePlayer}" alt="">
              <h2>Choose player</h2>
            </legend>

            <label class="settings-group--items">
              <input type="radio" name="player" id="blue" value="blue" data-player-choice="Blue">
              <span>Blue</span>
              <img class="settings-line" src="${settingsLine}" alt="Settings line">
            </label>

            <label class="settings-group--items">
              <input type="radio" name="player" id="orange" value="orange" data-player-choice="Orange">
              <span>Orange</span>
              <img class="settings-line" src="${settingsLine}" alt="Settings line">
            </label>
          </fieldset>

          <fieldset class="settings-group flex-column">
            <legend class="settings-group--legend">
              <img src="${imageBoardSize}" alt="">
              <h2>Board size</h2>
            </legend>

            <label class="settings-group--items">
              <input type="radio" name="boardSize" id="16cards" value="16" data-board-size-choice="16 Cards">
              <span>16 cards</span>
              <img class="settings-line" src="${settingsLine}" alt="Settings line">
            </label>

            <label class="settings-group--items">
              <input type="radio" name="boardSize" id="24cards" value="24" data-board-size-choice="24 Cards">
              <span>24 cards</span>
              <img class="settings-line" src="${settingsLine}" alt="Settings line">
            </label>

            <label class="settings-group--items">
              <input type="radio" name="boardSize" id="36cards" value="36" data-board-size-choice="36 Cards">
              <span>36 cards</span>
              <img class="settings-line" src="${settingsLine}" alt="Settings line">
            </label>
          </fieldset>

        </form>

        <aside>
          <img id="theme-preview" src="${themeVisualCodeVibes}"
            alt="Visual theme">

          <section>
            <span id="displayGameTheme">Game theme</span>
            <img class="settings-progress-line" src="${settingsPageLineBefore}" alt="">
            <span id="displayPlayer">Player</span>
            <img class="settings-progress-line" src="${settingsPageLineBefore}" alt="">
            <span id="displayBoardSize">Board size</span>

            <button class="button button__setting button__setting--primary" id="startButton" disabled>
              <img class="button__play" src="${imageStartButton}" alt="Start button" />
              <span>Start</span>
            </button>

          </section>
        </aside>

      </section>

    </section>

  </main>
  `;
}
