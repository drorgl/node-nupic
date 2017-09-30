#ifndef _NUPIC_INPUT_H_
#define _NUPIC_INPUT_H_

#include "../nupic.h"


class input : public overres::ObjectWrap{
public:
	static void Init(Handle<Object> target, std::shared_ptr<overload_resolution> overload);

	static POLY_METHOD(New_region_type_level);
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