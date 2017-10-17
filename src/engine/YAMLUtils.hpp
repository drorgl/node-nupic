#ifndef _NUPIC_ENGINE_YAMLUTILS_H_
#define _NUPIC_ENGINE_YAMLUTILS_H_

#include "nupic/engine/YAMLUtils.hpp"

#include "../nupic.h"

class YAMLUtils : public overres::ObjectWrap {
public:
	static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

	static POLY_METHOD(toValue	 );
	static POLY_METHOD(toValueMap);

};
#endif