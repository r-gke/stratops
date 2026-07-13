import {type Result} from '@badrap/result';
import {type PositionError} from '../../chess';
import type {Setup} from '../../setup';
import {type BoardDimensions, type Piece, type Rules} from '../../types';
import {defined} from '../../util.js';
import {GameFamily} from './GameFamily';
import {registerAbaloneFenParser, registerAbaloneFenWriter} from "../../fen";
import {type MoveNotation, type Pos, pos2key} from "./util";
import {type Board} from "../../board";

export class Dohyo extends GameFamily {
	static override rules: Rules = 'dohyo';
	static override height: BoardDimensions['ranks'] = 7;
	static override width: BoardDimensions['files'] = 7;
	static override startingPieceCount = 11;
	static override winningScore = 9;
	
	protected constructor() {
		super('dohyo');
	}
	
	override clone(): Dohyo {
		return super.clone() as Dohyo;
	}
	
	static override getClass() {
		return this;
	}
	
	static override default(): Dohyo {
		return super.default() as Dohyo;
	}
	
	static override fromSetup(setup: Setup): Result<Dohyo, PositionError> {
		return super.fromSetup(setup).map(v => {
			if (defined(setup.lastMove)) v.play(setup.lastMove);
			return v as Dohyo;
		});
	}
	
	//
	//
	static override getMaxUsable(): number | undefined {
		return 2;
	}
	
	static override getInitialBoardFen(): string {
		return '1SS1/SSSSS/1SSSS1/7/1ssss1/sssss/1ss1';
	}
	
	static override getEmptyBoardFen(): string {
		return '4/5/6/7/6/5/4';
	}
	
	protected static override computeMoveNotationCoreCore(notation: MoveNotation, board: Board, from: Pos, to: Pos, vect: Pos, n: number, cFrom: Piece): string {
		return n < 3?
			this.computeMoveNotationCore_rot(from, to):
			super.computeMoveNotationCoreCore(notation, board, from, to, vect, n, cFrom);
	}
	
	protected static computeMoveNotationCore_rot(from: Pos, to: Pos,): string {
		return pos2key(from) + pos2key(to);
	}
}

registerAbaloneFenParser(
	'dohyo',
	fen => Dohyo.readFen(fen, 0, 0).map(t => Dohyo.fenSetupFromTuple(t)),
);
registerAbaloneFenWriter('dohyo', board => Dohyo.writeFen(board));
