import './styles/main.scss';
import { showStartPage } from './pages/start-page';
import { showMainPage } from './pages/settings-page'; ///////////////////////////////////////////////

/**
 * Initializes the application after the DOM has been fully loaded.
 */
function initApp(): void {
	// showStartPage();
	showMainPage(); /////////////////////////////////////////////////////////////////////////////////////
}

document.addEventListener('DOMContentLoaded', initApp);
