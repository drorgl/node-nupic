#ifndef _NUPIC_UTILS_RANDOM_H_
#define _NUPIC_UTILS_RANDOM_H_

#include "nupic/utils/Random.hpp"

#include "../nupic.h"

class Random : public overres::ObjectWrap {
public:
	static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::Random*, std::weak_ptr<Random>> _randoms;

	std::shared_ptr<nupic::Random> _random;


	static POLY_METHOD(GetRandomSeed);
	
	static POLY_METHOD(New			);
	static POLY_METHOD(initSeeder	);
	static POLY_METHOD(shutdown		);
	static POLY_METHOD(write		);
	static POLY_METHOD(read			);
	static POLY_METHOD(getUInt32	);
	static POLY_METHOD(getUInt64	);
	static POLY_METHOD(getReal64	);
	static POLY_METHOD(sample		);
	static POLY_METHOD(shuffle		);
	static POLY_METHOD(getSeed		);
	static POLY_METHOD(max			);
	static POLY_METHOD(min			);


};


#endif