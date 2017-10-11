#ifndef _NUPIC_DIMENSIONS_H_
#define _NUPIC_DIMENSIONS_H_

#include "../nupic.h"

#include "nupic/ntypes/Dimensions.hpp"

class Dimensions: public overres::ObjectWrap{
public:
	static void Init(Handle<Object> target, std::shared_ptr<namespace_wrap> overload);

	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::Dimensions*, std::weak_ptr<Dimensions>> _dimensions;

	std::shared_ptr<nupic::Dimensions> _dimensions;

	static POLY_METHOD(New);
	static POLY_METHOD(New_v);
	static POLY_METHOD(New_x);
	static POLY_METHOD(New_x_y);
	static POLY_METHOD(New_x_y_z);
	static POLY_METHOD(getCount);
	static POLY_METHOD(getDimensionCount);
	static POLY_METHOD(getDimension);
	static POLY_METHOD(isUnspecified);
	static POLY_METHOD(isDontcare);
	static POLY_METHOD(isSpecified);
	static POLY_METHOD(isOnes);
	static POLY_METHOD(isValid);
	static POLY_METHOD(getIndex);
	static POLY_METHOD(getCoordinate);
	static POLY_METHOD(toString);
	static POLY_METHOD(promote);
};

#endif