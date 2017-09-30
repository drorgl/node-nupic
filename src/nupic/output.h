#ifndef _NUPIC_OUTPUT_H_
#define _NUPIC_OUTPUT_H_

#include "../nupic.h"

#include "nupic/engine/Output.hpp"

class Output : public overres::ObjectWrap{
public:
	static void Init(Handle<Object> target, std::shared_ptr<namespace_wrap> overload);

	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::Output*, std::weak_ptr<Output>> _outputs;

	std::shared_ptr<nupic::Output> _output;


	static POLY_METHOD(New);

};

#endif