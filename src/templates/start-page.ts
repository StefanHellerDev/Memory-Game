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

    <button class="button button--primary">
      <img id="button__controller" src="${buttonController}" alt="Button controller" />
      <span>Play</span>
      <img id="button__arrow" src="${buttonArrow}" alt="Button arrow" />
      <img id="button__arrow-hover" src="${buttonArrowHover}" alt="Button arrow" />
    </button>
  </div>

  <img id="controllerBig" src="${controllerBig}" alt="Big controller" />
  `;
}
