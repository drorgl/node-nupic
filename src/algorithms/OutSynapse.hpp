#ifndef _NUPIC_ALGORITHMS_OUTSYNAPSE_H_
#define _NUPIC_ALGORITHMS_OUTSYNAPSE_H_

#include "nupic/algorithms/OutSynapse.hpp"

#include "../nupic.h"


class OutSynapse : public overres::ObjectWrap {
public:
	static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::algorithms::Cells4::OutSynapse*, std::weak_ptr<OutSynapse>> _outSynapses;

	std::shared_ptr<nupic::algorithms::Cells4::OutSynapse> _outSynapse;

	static POLY_METHOD(New			);
	static POLY_METHOD(op_Equals	);
	static POLY_METHOD(dstCellIdx	);
	static POLY_METHOD(dstSegIdx	);
	static POLY_METHOD(goesTo		);
	static POLY_METHOD(equals		);
	static POLY_METHOD(invariants	);
};

	//new(
	//	dstCellIdx?: UInt/* =(UInt) -1*/,
	//	dstSegIdx?: UInt/* =(UInt) -1*/
	//	// Cells4* cells =NULL
	//): OutSynapse;
	//// bool operator==(const OutSynapse& a, const OutSynapse& b);
	//dstCellIdx(): UInt;
	//dstSegIdx(): UInt;
	//goesTo(dstCellIdx: UInt, dstSegIdx: UInt): bool;
	//equals(o: OutSynapse): bool;
	//invariants(cells?: Cells4[]/* =nullptr*/): bool;
#endif