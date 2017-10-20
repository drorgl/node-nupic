#ifndef _NUPIC_ALGORITHMS_CLASSIFIERRESULT_H_
#define _NUPIC_ALGORITHMS_CLASSIFIERRESULT_H_

#include "nupic/algorithms/ClassifierResult.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace algorithms {
		class ClassifierResult : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::algorithms::cla_classifier::ClassifierResult*, std::weak_ptr<ClassifierResult>> _classifierResults;

			std::shared_ptr<nupic::algorithms::cla_classifier::ClassifierResult> _classifierResult;

			static POLY_METHOD(New);
			static POLY_METHOD(createVector);
			static POLY_METHOD(getResultMap);
			static POLY_METHOD(getResultArray);
		};
	}
}
#endif