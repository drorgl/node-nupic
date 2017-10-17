#ifndef _NUPIC_LINK_H_
#define _NUPIC_LINK_H_

#include "nupic/engine/Link.hpp"

#include "../nupic.h"

class Link : public overres::ObjectWrap{
public:
	static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::Link*, std::weak_ptr<Link>> _links;

	std::shared_ptr<nupic::Link> _link;

	static POLY_METHOD(New);
	static POLY_METHOD(New_type);
	static POLY_METHOD(New_name);
	static POLY_METHOD(connectToNetwork);
	static POLY_METHOD(setSrcDimensions);
	static POLY_METHOD(setDestDimensions);
	static POLY_METHOD(initialize);
	static POLY_METHOD(getSrcDimensions);
	static POLY_METHOD(getDestDimensions);
	static POLY_METHOD(getLinkType);
	static POLY_METHOD(getLinkParams);
	static POLY_METHOD(getSrcRegionName);
	static POLY_METHOD(getSrcOutputName);
	static POLY_METHOD(getDestRegionName);
	static POLY_METHOD(getDestInputName);
	static POLY_METHOD(getMoniker);
	static POLY_METHOD(getSrc);
	static POLY_METHOD(getDest);
	static POLY_METHOD(compute);
	static POLY_METHOD(buildSplitterMap);
	static POLY_METHOD(shiftBufferedData);
	static POLY_METHOD(toString);
};

#endif