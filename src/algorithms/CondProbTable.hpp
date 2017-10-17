#ifndef _NUPIC_ALGORITHMS_CONDPROBTABLE_H_
#define _NUPIC_ALGORITHMS_CONDPROBTABLE_H_

#include "nupic/algorithms/CondProbTable.hpp"

#include "../nupic.h"

class CondProbTable : public overres::ObjectWrap {
public:
	static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::CondProbTable*, std::weak_ptr<CondProbTable>> _condProbTables;

	std::shared_ptr<nupic::CondProbTable> _condProbTable;

	static POLY_METHOD(New);
	static POLY_METHOD(convertInferType);
	static POLY_METHOD(numRows);
	static POLY_METHOD(numColumns);
	static POLY_METHOD(updateRow);
	static POLY_METHOD(inferRow);
	static POLY_METHOD(inferRow_scores);
	static POLY_METHOD(getRow);
	static POLY_METHOD(getTable);
	static POLY_METHOD(saveState);
	static POLY_METHOD(readState);

};
//new(hintNumCols?: UInt/*=0*/, hintNumRows?: UInt/*=0*/): CondProbTable;
//convertInferType(name: string): inferType;
//numRows(): UInt;
//numColumns(): UInt;
//updateRow(row: UInt, distribution: Real[]): void;
//inferRow(
//	distribution: Real[], outScores: Real[],
//	infer?: inferType/*=inferMarginal*/): void;
//// void inferRow (Array<Real>::const_iterator distribution,
////                Array<Real>::iterator outScores, inferType infer=inferMarginal);
//getRow(row: UInt, contents: Real[]): void;
//// getTable(): SparseMatrix<UInt, Real>;
//saveState(): Buffer;
//readState(state: Buffer): void;

#endif