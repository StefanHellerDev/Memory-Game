import './styles/main.scss';
import { showStartPage } from './pages/start-page';

/**
 * Initializes the application after the DOM has been fully loaded.
 */
function initApp(): void {
	showStartPage();
}

document.addEventListener('DOMContentLoaded', initApp);
