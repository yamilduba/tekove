


let sudoku = [];

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function randomNumber() {
	let num = Math.floor(Math.random() * 9 + 1);
	return num;
}

function randomFiller(a) {
	while (a.length < 9) {
		let num = randomNumber();
		a.push(num);
		if (a.indexOf(num) < a.lastIndexOf(num)) {
			a.pop();
		}
	}
	return a;
}

function populateSudoku() {
	let arr = [];
	while (sudoku.length < 9) {
		arr = [];
		sudoku.push(Array.from(randomFiller(arr)));
	}
	return arr;
}

function arrange3x3() {
	let arr = [];
	let line1 = [];
	let line2 = [];
	let line3 = [];
	for (let i = 0; i < sudoku.length; i++) {
		line1.push(sudoku[i].splice(0, 3));
		line2.push(sudoku[i].splice(0, 3));
		line3.push(sudoku[i].splice(0, 3));
	}
	for (let i = 0; i < sudoku.length; i += 3) {
		sudoku[i].push(line1.splice(0, 3));
	}
	for (let i = 1; i < sudoku.length; i += 3) {
		sudoku[i].push(line2.splice(0, 3));
	}
	for (let i = 2; i < sudoku.length; i += 3) {
		sudoku[i].push(line3.splice(0, 3));
	}
	sudoku = [].concat.apply([], sudoku);
	return sudoku;
}

function shuffleY(lmr) {
	let check = false;
	let x = [];
	let y = [];
	let z = [];
	while (check === false) {
		for (let i = 0; i < sudoku.length; i++) {
			x.push(sudoku[i][lmr][0]);
		}
		for (let i = 0; i < sudoku.length; i++) {
			y.push(sudoku[i][lmr][1]);
		}
		for (let i = 0; i < sudoku.length; i++) {
			z.push(sudoku[i][lmr][2]);
		}
		if (x.every((element, index) => {
			return index === x.lastIndexOf(element);
		}) && y.every((element, index) => {
			return index === y.lastIndexOf(element);
		})) {
			check = true;
		} else {
			x.splice(0);
			y.splice(0);
			z.splice(0);
			for (let i = 0; i < sudoku.length; i++) {
				shuffle(sudoku[i][lmr]);
			}
		}
	}
}

function mirrorSudoku() {
	sudoku.forEach((element, index) => {
		sudoku[index] = [].concat.apply([], element);
	})
	let copy = JSON.parse(JSON.stringify(sudoku));
	for (let i = 0; i < sudoku.length; i++) {
		for (let j = 0; j < sudoku.length; j++) {
			copy[j][i] = sudoku[i][j];
		}
	}
	for (let i = 0; i < copy.length; i++) {
		sudoku[i].splice(0);
		sudoku[i].push(copy[i].splice(0, 3));
		sudoku[i].push(copy[i].splice(0, 3));
		sudoku[i].push(copy[i].splice(0, 3));
	}
}

populateSudoku();
arrange3x3();
shuffleY(0);
shuffleY(1);
shuffleY(2);
mirrorSudoku();
shuffleY(0);
shuffleY(1);
shuffleY(2);

sudoku = [].concat.apply([], sudoku);
sudoku = [].concat.apply([], sudoku);

console.log(sudoku.join(''));





