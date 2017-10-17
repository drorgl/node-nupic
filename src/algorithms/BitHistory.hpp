#ifndef _NUPIC_ALGORITHMS_BITHISTORY_H_
#define _NUPIC_ALGORITHMS_BITHISTORY_H_

#include "nupic/algorithms/BitHistory.hpp"

#include "../nupic.h"

class BitHistory : public overres::ObjectWrap {
public:
	static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::algorithms::cla_classifier::BitHistory*, std::weak_ptr<BitHistory>> _inputs;

	std::shared_ptr<nupic::algorithms::cla_classifier::BitHistory> _bithistory;

	static POLY_METHOD(New);
	static POLY_METHOD(New_bitnum);
	static POLY_METHOD(store);
	static POLY_METHOD(infer);
	static POLY_METHOD(save);
	static POLY_METHOD(load);
	static POLY_METHOD(op_Equals);
	static POLY_METHOD(op_NotEquals);
};
#endif