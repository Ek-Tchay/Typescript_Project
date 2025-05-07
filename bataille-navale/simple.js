"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchSimpleMode = launchSimpleMode;
var promises_1 = require("node:readline/promises");
var node_process_1 = require("node:process");
var MATRIX_SIZE = 8;
var EMPTY_CELL = ' ';
var SHIP_CELL = 'B';
var HIT_CELL = 'X';
var MISS_CELL = '~';
function createEmptyBoard() {
    return Array.from({ length: MATRIX_SIZE }, function () { return Array(MATRIX_SIZE).fill(EMPTY_CELL); });
}
function placeShipsRandomly(board, numberOfShips) {
    var placed = 0;
    while (placed < numberOfShips) {
        var row = Math.floor(Math.random() * MATRIX_SIZE);
        var col = Math.floor(Math.random() * MATRIX_SIZE);
        if (board[row][col] === EMPTY_CELL) {
            board[row][col] = SHIP_CELL;
            placed++;
        }
    }
}
function printBoard(board, hideShips) {
    if (hideShips === void 0) { hideShips = true; }
    var header = '   ' + Array.from({ length: MATRIX_SIZE }, function (_, i) { return String.fromCharCode(65 + i); }).join(' ');
    console.log(header);
    board.forEach(function (row, i) {
        var rowString = row.map(function (cell) { return (hideShips && cell === SHIP_CELL ? EMPTY_CELL : cell); }).join(' ');
        console.log((i + 1).toString().padStart(2) + ' ' + rowString);
    });
}
function parseInput(input) {
    var match = input.trim().toUpperCase().match(/^([A-H])(\d)$/);
    if (!match)
        return null;
    var col = match[1].charCodeAt(0) - 65;
    var row = parseInt(match[2], 10) - 1;
    if (row < 0 || row >= MATRIX_SIZE || col < 0 || col >= MATRIX_SIZE)
        return null;
    return [row, col];
}
function isGameOver(player) {
    return player.shipsRemaining === 0;
}
function playTurn(current, opponent, rl) {
    return __awaiter(this, void 0, void 0, function () {
        var valid, target, row, col, input_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // console.clear();
                    console.log("\n".concat(current.name, ", voici votre grille de tirs :"));
                    printBoard(current.shotsBoard, false);
                    valid = false;
                    target = null;
                    row = 0;
                    col = 0;
                    _a.label = 1;
                case 1:
                    if (!!valid) return [3 /*break*/, 3];
                    return [4 /*yield*/, rl.question("".concat(current.name, ", entrez une position \u00E0 attaquer (ex: D5): "))];
                case 2:
                    input_1 = _a.sent();
                    target = parseInput(input_1);
                    if (target) {
                        row = target[0], col = target[1];
                        if (current.shotsBoard[row][col] === EMPTY_CELL) {
                            valid = true;
                        }
                        else {
                            console.log('Vous avez déjà tiré ici !');
                        }
                    }
                    else {
                        console.log('Entrée invalide. Réessayez.');
                    }
                    return [3 /*break*/, 1];
                case 3:
                    if (opponent.ownBoard[row][col] === SHIP_CELL) {
                        console.log('Touché !');
                        current.shotsBoard[row][col] = HIT_CELL;
                        opponent.ownBoard[row][col] = HIT_CELL;
                        opponent.shipsRemaining--;
                        console.log(opponent.shipsRemaining);
                    }
                    else {
                        console.log('Loupé !');
                        current.shotsBoard[row][col] = MISS_CELL;
                        // opponent.shotsBoard[row][col] = MISS_CELL;
                        console.log(opponent.shipsRemaining);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function launchSimpleMode(numberOfShips) {
    return __awaiter(this, void 0, void 0, function () {
        var rl, player1, player2, currentPlayer, opponent;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    rl = (0, promises_1.createInterface)({ input: node_process_1.stdin, output: node_process_1.stdout });
                    player1 = {
                        name: 'Joueur1',
                        ownBoard: createEmptyBoard(),
                        shotsBoard: createEmptyBoard(),
                        shipsRemaining: numberOfShips,
                    };
                    player2 = {
                        name: 'Joueur2',
                        ownBoard: createEmptyBoard(),
                        shotsBoard: createEmptyBoard(),
                        shipsRemaining: numberOfShips,
                    };
                    placeShipsRandomly(player1.ownBoard, numberOfShips);
                    placeShipsRandomly(player2.ownBoard, numberOfShips);
                    console.log("Grille de Joueur1 (avec bateaux) :");
                    printBoard(player1.ownBoard, false);
                    console.log("Grille de Joueur2 (avec bateaux) :");
                    printBoard(player2.ownBoard, false);
                    currentPlayer = player1;
                    opponent = player2;
                    _b.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    return [4 /*yield*/, playTurn(currentPlayer, opponent, rl)];
                case 2:
                    _b.sent();
                    if (isGameOver(opponent)) {
                        console.log("\n\uD83C\uDF89 ".concat(currentPlayer.name, " a gagn\u00E9 ! \uD83C\uDF89"));
                        return [3 /*break*/, 3];
                    }
                    _a = [opponent, currentPlayer], currentPlayer = _a[0], opponent = _a[1];
                    return [3 /*break*/, 1];
                case 3: return [4 /*yield*/, rl.close()];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
