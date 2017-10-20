#ifndef _NUPIC_ALGORITHMS_ANOMALY_H_
#define _NUPIC_ALGORITHMS_ANOMALY_H_

#include "nupic/algorithms/Anomaly.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace algorithms {

		class Anomaly : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::algorithms::anomaly::Anomaly *, std::weak_ptr<Anomaly>> _inputs;

			std::shared_ptr<nupic::algorithms::anomaly::Anomaly> _input;

			static POLY_METHOD(New);
			static POLY_METHOD(compute);
		};
	};
}
#endif