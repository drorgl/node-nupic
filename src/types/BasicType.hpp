#ifndef _NUPIC_TYPES_BASICTYPE_H_
#define _NUPIC_TYPES_BASICTYPE_H_

#include "nupic/types/BasicType.hpp"

#include "../nupic.h"

class BasicType : public overres::ObjectWrap {
public:
	static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();


	static POLY_METHOD(isValid);
	static POLY_METHOD(getName);
	static POLY_METHOD(getSize);
	static POLY_METHOD(parse  );

};


#endif