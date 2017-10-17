#ifndef _NUPIC_ENGINE_REGIONIMPLFACTORY_H_
#define _NUPIC_ENGINE_REGIONIMPLFACTORY_H_

#include "nupic/engine/RegionImplFactory.hpp"

#include "../nupic.h"

class RegionImplFactory : public overres::ObjectWrap {
public:
	static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::RegionImplFactory*, std::weak_ptr<RegionImplFactory>> _regionimplfactories;

	std::shared_ptr<nupic::RegionImplFactory> _regionimplfactory;


	static POLY_METHOD(getInstance				);
	static POLY_METHOD(registerPyRegionPackage	);
	static POLY_METHOD(registerPyRegion			);
	static POLY_METHOD(registerCPPRegion		);
	static POLY_METHOD(unregisterPyRegion		);
	static POLY_METHOD(unregisterCPPRegion		);
	static POLY_METHOD(createRegionImpl			);
	static POLY_METHOD(deserializeRegionImpl	);
	static POLY_METHOD(getSpec					);
	static POLY_METHOD(cleanup					);
};

	
#endif