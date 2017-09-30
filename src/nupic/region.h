#ifndef _NUPIC_REGION_H_
#define _NUPIC_REGION_H_

#include "../nupic.h"

#include "nupic/engine/Region.hpp"

class Region : public overres::ObjectWrap{
public:
	static void Init(Handle<Object> target, std::shared_ptr<namespace_wrap> overload);
	
	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::Region*, std::weak_ptr<Region>> _regions;

	std::shared_ptr<nupic::Region> _region;


	static POLY_METHOD(New);

};

#endif