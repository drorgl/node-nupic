#ifndef _NUPIC_NTYPES_ARRAYBASE_H_
#define _NUPIC_NTYPES_ARRAYBASE_H_

#include "nupic/ntypes/ArrayBase.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace ntypes {

		class ArrayBase : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::ArrayBase*, std::weak_ptr<ArrayBase>> _arrays;

			std::shared_ptr<nupic::ArrayBase> _array;

			static POLY_METHOD(New);
			static POLY_METHOD(allocateBuffer);
			static POLY_METHOD(setBuffer);
			static POLY_METHOD(releaseBuffer);
			static POLY_METHOD(getBuffer);
			static POLY_METHOD(getArray);
			static POLY_METHOD(getCount);
			static POLY_METHOD(getType);
		};
	}
}

	
#endif