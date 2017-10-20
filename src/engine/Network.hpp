#ifndef _NUPIC_ENGINE_NETWORK_H_
#define _NUPIC_ENGINE_NETWORK_H_

#include "nupic/engine/Network.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace engine {

		class Network : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::Network*, std::weak_ptr<Network>> _networks;

			std::shared_ptr<nupic::Network> _network;



			static POLY_METHOD(New);
			static POLY_METHOD(New_path);
			static POLY_METHOD(registerPyRegion);
			static POLY_METHOD(unregisterPyRegion);
			static POLY_METHOD(unregisterCPPRegion);
			static POLY_METHOD(initialize);
			static POLY_METHOD(save);
			static POLY_METHOD(addRegion);
			static POLY_METHOD(addRegionFromBundle);
			static POLY_METHOD(addRegionFromProto);
			static POLY_METHOD(removeRegion);
			static POLY_METHOD(link);
			static POLY_METHOD(removeLink);
			static POLY_METHOD(getRegions);
			static POLY_METHOD(getLinks);
			static POLY_METHOD(setPhases);
			static POLY_METHOD(getPhases);
			static POLY_METHOD(getMinPhase);
			static POLY_METHOD(getMaxPhase);
			static POLY_METHOD(setMinEnabledPhase);
			static POLY_METHOD(setMaxEnabledPhase);
			static POLY_METHOD(getMinEnabledPhase);
			static POLY_METHOD(getMaxEnabledPhase);
			static POLY_METHOD(run);
			static POLY_METHOD(getCallbacks);
			static POLY_METHOD(enableProfiling);
			static POLY_METHOD(disableProfiling);
			static POLY_METHOD(resetProfiling);
			static POLY_METHOD(write);
			static POLY_METHOD(read);
		};
	}
}


#endif