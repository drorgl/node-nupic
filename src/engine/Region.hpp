#ifndef _NUPIC_ENGINE_REGION_H_
#define _NUPIC_ENGINE_REGION_H_

#include "nupic/engine/Region.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace engine {

		class Region : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::Region *, std::weak_ptr<Region >> _regions;

			std::shared_ptr<nupic::Region> _region;

			static POLY_METHOD(New);
			static POLY_METHOD(New_dimensions);
			static POLY_METHOD(New_proto);
			static POLY_METHOD(getpecFromType);
			static POLY_METHOD(registerPyRegion);
			static POLY_METHOD(registerCPPRegion);
			static POLY_METHOD(unregisterPyRegion);
			static POLY_METHOD(unregisterCPPRegion);
			static POLY_METHOD(getNetwork);
			static POLY_METHOD(getName);
			static POLY_METHOD(getDimensions);
			static POLY_METHOD(setDimensions);
			static POLY_METHOD(getType);
			static POLY_METHOD(getSpec);
			static POLY_METHOD(getParameterInt32);
			static POLY_METHOD(getParameterUInt32);
			static POLY_METHOD(getParameterInt64);
			static POLY_METHOD(getParameterUInt64);
			static POLY_METHOD(getParameterReal32);
			static POLY_METHOD(getParameterReal64);
			static POLY_METHOD(getParameterHandle);
			static POLY_METHOD(getParameterBool);
			static POLY_METHOD(setParameterInt32);
			static POLY_METHOD(setParameterUInt32);
			static POLY_METHOD(setParameterInt64);
			static POLY_METHOD(setParameterUInt64);
			static POLY_METHOD(setParameterReal32);
			static POLY_METHOD(setParameterReal64);
			static POLY_METHOD(setParameterHandle);
			static POLY_METHOD(setParameterBool);
			static POLY_METHOD(setParameterCallback);
			static POLY_METHOD(getParameterArray);
			static POLY_METHOD(setParameterArray);
			static POLY_METHOD(setParameterString);
			static POLY_METHOD(getParameterString);
			static POLY_METHOD(isParameterShared);
			static POLY_METHOD(prepareInputs);
			static POLY_METHOD(getInputData);
			static POLY_METHOD(getOutputData);
			static POLY_METHOD(getInputCount);
			static POLY_METHOD(getOutputCount);
			static POLY_METHOD(enable);
			static POLY_METHOD(disable);
			static POLY_METHOD(executeCommand);
			static POLY_METHOD(compute);
			static POLY_METHOD(enableProfiling);
			static POLY_METHOD(disableProfiling);
			static POLY_METHOD(resetProfiling);
			static POLY_METHOD(getComputeTimer);
			static POLY_METHOD(getExecuteTimer);
			static POLY_METHOD(initialize);
			static POLY_METHOD(isInitialized);
			static POLY_METHOD(getOutput);
			static POLY_METHOD(getInput);
			static POLY_METHOD(getInputs);
			static POLY_METHOD(getOutputs);
			static POLY_METHOD(evaluateLinks);
			static POLY_METHOD(getLinkErrors);
			static POLY_METHOD(getNodeOutputElementCount);
			static POLY_METHOD(initOutputs);
			static POLY_METHOD(initInputs);
			static POLY_METHOD(intialize);
			static POLY_METHOD(setDimensionInfo);
			static POLY_METHOD(getDimensionInfo);
			static POLY_METHOD(hasOutgoingLinks);
			static POLY_METHOD(uninitialize);
			static POLY_METHOD(removeAllIncomingLinks);
			static POLY_METHOD(getEnabledNodes);
			static POLY_METHOD(setPhases);
			static POLY_METHOD(getPhases);
			static POLY_METHOD(write);
			static POLY_METHOD(read);
		};
	}
}
	
#endif