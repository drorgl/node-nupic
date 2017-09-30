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
	

};

#endif