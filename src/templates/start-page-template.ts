import controllerBig from '../assets/img/background_controller.svg';
import buttonController from '/assets/img/button_controller.svg';
import buttonArrow from '../assets/img/buttonArrow.svg';
import buttonArrowHover from '../assets/img/buttonArrowHover.svg';

/**
 * Creates the markup for the start page with the introductory text
 * and play button.
 *
 * @returns The HTML markup for the start page.
 */
export function startPageTemplate() {
	return `
  <main class="start-page">

  <section class="center-box" aria-labelledby="start-title">
    <p class="center-box__text">It’s play time.</p>
    <h1 class="center-box__text center-box__text--big" id="start-title">Ready to play?</h1>
  </section>

  <button class="button button__start button__start--primary" id="playButton" type="button">
    <img class="button__controller" src="${buttonController}" alt="" aria-hidden="true">
    <span>Play</span>
    <img class="button__arrow" src="${buttonArrow}" alt="" aria-hidden="true">
    <img class="button__arrow--hover" src="${buttonArrowHover}" alt="" aria-hidden="true">
  </button>

</main>

<img id="controllerBig" src="${controllerBig}" alt="" aria-hidden="true">
  `;
}
