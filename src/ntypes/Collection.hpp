#ifndef _NUPIC_NTYPES_COLLECTION_H_
#define _NUPIC_NTYPES_COLLECTION_H_

#include "nupic/ntypes/Collection.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace ntypes {

		class Collection : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::Collection<void>*, std::weak_ptr<Collection>> _collections;

			std::shared_ptr<nupic::Collection<void>> _collection;

			static POLY_METHOD(New);
			static POLY_METHOD(getCount);
			static POLY_METHOD(getByIndex);
			static POLY_METHOD(contains);
			static POLY_METHOD(add);
			static POLY_METHOD(remove);
		};
	}
}

	
#endif