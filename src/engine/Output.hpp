#ifndef _NUPIC_ENGINE_OUTPUT_H_
#define _NUPIC_ENGINE_OUTPUT_H_

#include "nupic/engine/Output.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace engine {

		class Output : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::Output*, std::weak_ptr<Output>> _outputs;

			std::shared_ptr<nupic::Output> _output;



			static POLY_METHOD(New);
			static POLY_METHOD(setName);
			static POLY_METHOD(getName);
			static POLY_METHOD(initialize);
			static POLY_METHOD(addLink);
			static POLY_METHOD(removeLink);
			static POLY_METHOD(hasOutgoingLinks);
			static POLY_METHOD(getData);
			static POLY_METHOD(isRegionLevel);
			static POLY_METHOD(getRegion);
			static POLY_METHOD(getNodeOutputElementCount);
		};
	}
}


#endif