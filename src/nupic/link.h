#ifndef _NUPIC_LINK_H_
#define _NUPIC_LINK_H_

#include "../nupic.h"

#include "nupic/engine/Link.hpp"

class Link : public overres::ObjectWrap{
public:
	static void Init(Handle<Object> target, std::shared_ptr<namespace_wrap> overload);

	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::Link*, std::weak_ptr<Link>> _links;

	std::shared_ptr<nupic::Link> _link;

	static POLY_METHOD(New);

};

#endif