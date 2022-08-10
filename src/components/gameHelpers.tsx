type BoxCollider = {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
};

export const checkCollision = (rectA: BoxCollider, rectB: BoxCollider) =>
	rectA.x1 < rectB.x2 &&
	rectA.x2 > rectB.x1 &&
	rectA.y1 < rectB.y2 &&
	rectA.y2 > rectB.y1;

export type IStage = Array<Array<ICell>>;

export type ICell = (number | string)[];

export const clearCell: ICell = [0, 'clear'];

export const stageHeight = 20;

export const stageWidth = 12;

export const createStage = (): IStage =>
	Array.from(Array(stageHeight), () => new Array(stageWidth).fill(clearCell));
