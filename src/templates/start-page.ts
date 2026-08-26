import controllerBig from '../assets/img/background_controller.svg';
import buttonController from '../assets/img/button_controller.png';
import buttonArrow from '../assets/img/buttonArrow.png';
import buttonArrowHover from '../assets/img/buttonArrowHover.png';

export function startPageTemplate() {
	return `
  <div class="start-page">
    <div class="center-box">
      <p class="center-box__text">It’s play time.</p>
      <p class="center-box__text center-box__text--big">Ready to play?</p>
    </div>

    <button class="button button__start button__start--primary" id="playButton">
      <img class="button__controller" src="${buttonController}" alt="Button controller" />
      <span>Play</span>
      <img class="button__arrow" src="${buttonArrow}" alt="Button arrow" />
      <img class="button__arrow--hover" src="${buttonArrowHover}" alt="Button arrow thick" />
    </button>
  </div>

  <img id="controllerBig" src="${controllerBig}" alt="Big controller" />
  `;
}
