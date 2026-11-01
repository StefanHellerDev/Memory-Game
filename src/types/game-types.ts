import { ThemeName } from '../config/themes';

export interface GameSettings {
	theme: ThemeName;
	player: 'blue' | 'orange';
	boardSize: 16 | 24 | 36;
}

export interface MemoryCard {
	id: number;
	pairId: number;
	imageSrc: string;
}
