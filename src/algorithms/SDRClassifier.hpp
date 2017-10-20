#ifndef _NUPIC_ALGORITHMS_SDRCLASSIFIER_H_
#define _NUPIC_ALGORITHMS_SDRCLASSIFIER_H_

//#include "nupic/algorithms/SDRClassifier.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace algorithms {
		class SDRClassifier : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			//static std::unordered_map<nupic::algorithms::sdr_classifier::SDRClassifier*, std::weak_ptr<SDRClassifier>> _sdr_classifiers;

			//std::shared_ptr<nupic::algorithms::sdr_classifier::SDRClassifier> _sdrclassifier;


			static POLY_METHOD(New);
			static POLY_METHOD(New_steps);
			static POLY_METHOD(compute);
			static POLY_METHOD(version);
			static POLY_METHOD(getVerbosity);
			static POLY_METHOD(setVerbosity);
			static POLY_METHOD(getAlpha);
			static POLY_METHOD(persistentSize);
			static POLY_METHOD(save);
			static POLY_METHOD(load);
		};
	}
}
		/*new(): SDRClassifier;
		new(
			steps: UInt[], alpha: Real64, actValueAlpha: Real64,
			verbosity: UInt): SDRClassifier;
		compute(
			recordNum: UInt, patternNZ: UInt[], bucketIdxList: UInt[],
			actValueList: Real64[], category: bool, learn: bool, infer: bool,
			result: ClassifierResult): void;
		version(): UInt;
		getVerbosity(): UInt;
		setVerbosity(verbosity: UInt): void;
		getAlpha(): UInt;
		persistentSize(): UInt;
		save(): Buffer;
		load(state: Buffer): void;*/
#endif