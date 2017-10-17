#ifndef _NUPIC_ENGINE_REGIONIMPL_H_
#define _NUPIC_ENGINE_REGIONIMPL_H_

#include "nupic/engine/RegionImpl.hpp"

#include "../nupic.h"

class RegionImpl : public overres::ObjectWrap {
public:
	static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::RegionImpl*, std::weak_ptr<RegionImpl>> _regionimpls;

	std::shared_ptr<nupic::RegionImpl> _regionimpl;

	static POLY_METHOD(New								);
	static POLY_METHOD(createSpec						);
	static POLY_METHOD(getType							);
	static POLY_METHOD(getName							);
	static POLY_METHOD(getEnabledNodes					);
	static POLY_METHOD(getParameterInt32				);
	static POLY_METHOD(getParameterUInt32				);
	static POLY_METHOD(getParameterInt64				);
	static POLY_METHOD(getParameterUInt64				);
	static POLY_METHOD(getParameterReal32				);
	static POLY_METHOD(getParameterReal64				);
	static POLY_METHOD(getParameterHandle				);
	static POLY_METHOD(getParameterBool					);
	static POLY_METHOD(setParameterInt32				);
	static POLY_METHOD(setParameterUInt32				);
	static POLY_METHOD(setParameterInt64				);
	static POLY_METHOD(setParameterUInt64				);
	static POLY_METHOD(setParameterReal32				);
	static POLY_METHOD(setParameterReal64				);
	static POLY_METHOD(setParameterHandle				);
	static POLY_METHOD(setParameterBool					);
	static POLY_METHOD(getParameterArray				);
	static POLY_METHOD(setParameterArray				);
	static POLY_METHOD(setParameterString				);
	static POLY_METHOD(getParameterString				);
	static POLY_METHOD(serialize						);
	static POLY_METHOD(deserialize						);
	static POLY_METHOD(write							);
	static POLY_METHOD(read								);
	static POLY_METHOD(initialize						);
	static POLY_METHOD(compute							);
	static POLY_METHOD(executeCommand					);
	static POLY_METHOD(getNodeOutputElementCount		);
	static POLY_METHOD(getParameterFromBuffer			);
	static POLY_METHOD(setParameterFromBuffer			);
	static POLY_METHOD(getParameterArrayCount			);
	static POLY_METHOD(isParameterShared				);

};

	
#endif