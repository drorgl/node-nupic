#ifndef _NUPIC_ENGINE_INPUT_H_
#define _NUPIC_ENGINE_INPUT_H_

#include "nupic/engine/Input.hpp"

#include "../nupic.h"

class Input : public overres::ObjectWrap {
public:
	static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::Input*, std::weak_ptr<Input>> _inputs;

	std::shared_ptr<nupic::Input> _input;

	static POLY_METHOD(New);
	static POLY_METHOD(setName);
	static POLY_METHOD(getName);
	static POLY_METHOD(addLink);
	static POLY_METHOD(findLink);
	static POLY_METHOD(removeLink);
	static POLY_METHOD(prepare);
	static POLY_METHOD(getData);
	static POLY_METHOD(getRegion);
	static POLY_METHOD(getLinks);
	static POLY_METHOD(isRegionLevel);
	static POLY_METHOD(evaluateLinks);
	static POLY_METHOD(initialize);
	static POLY_METHOD(isInitialized);
	static POLY_METHOD(getSplitterMap);
	static POLY_METHOD(getInputForNode);
};
	
#endif