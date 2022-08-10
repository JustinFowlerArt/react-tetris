type Tetrominos = {
	0: Tetromino;
	I: Tetromino;
	J: Tetromino;
	L: Tetromino;
	O: Tetromino;
	S: Tetromino;
	T: Tetromino;
	Z: Tetromino;
};

type Tetromino = {
	shape: TetrominoShape;
};

export type TetrominoShape = Array<Array<string | number>>

const tetrominos: Tetrominos = {
	0: { shape: [[0]] },
	I: {
		shape: [
			[0, 'I', 0, 0],
			[0, 'I', 0, 0],
			[0, 'I', 0, 0],
			[0, 'I', 0, 0],
		],
	},
	J: {
		shape: [
			[0, 'J', 0],
			[0, 'J', 0],
			['J', 'J', 0],
		],
	},
	L: {
		shape: [
			[0, 'L', 0],
			[0, 'L', 0],
			[0, 'L', 'L'],
		],
	},
	O: {
		shape: [
			['O', 'O'],
			['O', 'O'],
		],
	},
	S: {
		shape: [
			[0, 'S', 'S'],
			['S', 'S', 0],
			[0, 0, 0],
		],
	},
	T: {
		shape: [
			['T', 'T', 'T'],
			[0, 'T', 0],
            [0, 0, 0],
		],
	},
	Z: {
		shape: [
			['Z', 'Z', 0],
			[0, 'Z', 'Z'],
			[0, 0, 0],
		],
	},
};

export const randomTetromino = () => {
	const tetrominoKeys = 'IJLOSTZ';
	const randomTetromino =
        tetrominoKeys[Math.floor(Math.random() * tetrominoKeys.length)];
	return tetrominos[randomTetromino as keyof Tetrominos];
};
