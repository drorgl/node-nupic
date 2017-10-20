#ifndef _NUPIC_ENGINE_NUPIC_H_
#define _NUPIC_ENGINE_NUPIC_H_

#include "nupic/engine/NuPIC.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace engine {

		class NuPIC : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::NuPIC*, std::weak_ptr<NuPIC>> _nupics;

			std::shared_ptr<nupic::NuPIC> _nupic;


			static POLY_METHOD(init);
			static POLY_METHOD(shutdown);
			static POLY_METHOD(isInitialized);

		};
	}
}
 
#endif