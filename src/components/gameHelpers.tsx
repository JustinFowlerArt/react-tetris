type BoxCollider = {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
};

type Cell = number | string[];

export const checkCollision = (rectA: BoxCollider, rectB: BoxCollider) =>
	rectA.x1 < rectB.x2 &&
	rectA.x2 > rectB.x1 &&
	rectA.y1 < rectB.y2 &&
	rectA.y2 > rectB.y1;

export const gameHeight = 20;

export const gameWidth = 12;

export const createStage = () =>
	Array.from(Array(gameHeight), () => new Array(gameWidth).fill([0, 'clear']));
