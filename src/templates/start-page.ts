import controllerBig from '../assets/img/stadia_controller.svg';
import controllerButton from '../assets/img/Button_Controller.svg';
import controllerButtonHover from '../assets/img/Button_Controller_hover.svg';

export function startPageTemplate() {
	return `
  <div class="center-box">
    <p class="center-box__text">It’s play time.</p>
    <p class="center-box__text center-box__text--big">Ready to play?</p>
  </div>
  <div class="play-button">
    <img src="${controllerButton}" alt="Controller Button" />
  </div>

  <img src="${controllerBig}" alt="Big controller" />
  `;
}
