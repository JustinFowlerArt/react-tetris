interface BoxCollider {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

export const checkCollision = (rectA: BoxCollider, rectB: BoxCollider) =>
	rectA.x1 < rectB.x2 &&
	rectA.x2 > rectB.x1 &&
	rectA.y1 < rectB.y2 &&
	rectA.y2 > rectB.y1;

export const gameHeight = 1280;

export const gameWidth = 640;
