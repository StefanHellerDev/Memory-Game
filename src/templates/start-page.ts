import controllerBig from '../assets/img/stadia_controller.svg';
import controllerButton from '../assets/img/Button_Controller.svg';
import controllerButtonHover from '../assets/img/Button_Controller_hover.svg';

export function startPageTemplate() {
	return `
  <div class="start-page">
    <div class="center-box">
      <p class="center-box__text">It’s play time.</p>
      <p class="center-box__text center-box__text--big">Ready to play?</p>
    </div>

    <div class="play-button">
      <img class="svg-icon svg-default" src="${controllerButton}" alt="Controller Button" />
      <img class="svg-icon svg-hover" src="${controllerButtonHover}" alt="Controller Button" />
    </div>

  </div>

  <img id="controllerBig" src="${controllerBig}" alt="Big controller" />  
  `;
}
