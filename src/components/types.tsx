export type IStage = Array<Array<ICell>>;

export type ICell = (number | string)[];

export type ITetrominos = {
	0: ITetromino;
	I: ITetromino;
	J: ITetromino;
	L: ITetromino;
	O: ITetromino;
	S: ITetromino;
	T: ITetromino;
	Z: ITetromino;
};

export type ITetromino = {
	shape: ITetrominoShape;
};

export type ITetrominoShape = Array<Array<string | number>>

export type IPlayer = {
    pos: { x: number, y: number },
    tetromino: ITetrominoShape,
    collided: boolean,
}