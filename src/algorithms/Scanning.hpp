#ifndef _NUPIC_ALGORITHMS_SCANNING_H_
#define _NUPIC_ALGORITHMS_SCANNING_H_

//#include "nupic/algorithms/Scanning.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace algorithms {
		class Scanning : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			/*static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::algorithms::ArrayBuffer*, std::weak_ptr<Input>> _inputs;

			std::shared_ptr<nupic::Input> _input;

			static POLY_METHOD(New);
			static POLY_METHOD(compute);*/

			static POLY_METHOD(computeAlpha);
		};
	}
}

// void computeAlpha(size_t xstep, size_t ystep,
//                   size_t widthS, size_t heightS,
//                   size_t imageWidth, size_t imageHeight,
//                   size_t xcount, size_t ycount,
//                   size_t weightWidth, float sharpness,
//                   float* data, float* values, float* counts, float* weights)

#endif