#ifndef _NUPIC_ENGINE_UNIFORMLINKPOLICY_H_
#define _NUPIC_ENGINE_UNIFORMLINKPOLICY_H_

#include "nupic/engine/UniformLinkPolicy.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace engine {

		class UniformLinkPolicy : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::UniformLinkPolicy*, std::weak_ptr<UniformLinkPolicy>> _uniformlinkpolicies;

			std::shared_ptr<nupic::UniformLinkPolicy> _uniformlinkpolicy;


			static POLY_METHOD(New);
			static POLY_METHOD(setSrcDimensions);
			static POLY_METHOD(setDestDimensions);
			static POLY_METHOD(getSrcDimensions);
			static POLY_METHOD(getDestDimensions);
			static POLY_METHOD(setNodeOutputElementCount);
			static POLY_METHOD(buildProtoSplitterMap);
			static POLY_METHOD(initialize);
			static POLY_METHOD(isInitialized);
			static POLY_METHOD(getInputBoundsForNode);
			static POLY_METHOD(getInputForNode);
			static POLY_METHOD(populateInputElements);
		};
	}
}


#endif