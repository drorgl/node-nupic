#ifndef _NUPIC_SPEC_H_
#define _NUPIC_SPEC_H_

#include "../nupic.h"

#include "nupic/engine/Spec.hpp"

class Spec : public overres::ObjectWrap{
public:
	static void Init(Handle<Object> target, std::shared_ptr<namespace_wrap> overload);

	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::Spec*, std::weak_ptr<Spec>> _specs;

	std::shared_ptr<nupic::Spec> _spec;

	static POLY_METHOD(New);
	static POLY_METHOD(toString);



};

#endif