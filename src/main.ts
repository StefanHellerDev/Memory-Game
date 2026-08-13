import './styles/main.scss';
import { startPageTemplate } from './templates/start-page';




const memoryAppRef = document.getElementById('memoryApp')!;

export function showStartPage(): void {
	memoryAppRef.innerHTML = startPageTemplate();
}










document.addEventListener('DOMContentLoaded', () => {
	showStartPage();
});
