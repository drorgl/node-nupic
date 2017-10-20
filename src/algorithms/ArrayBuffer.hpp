#ifndef _NUPIC_ALGORITHMS_ARRAYBUFFER_H_
#define _NUPIC_ALGORITHMS_ARRAYBUFFER_H_

#include "nupic/algorithms/ArrayBuffer.hpp"

#include "../nupic.h"



namespace node_nupic {
	namespace algorithms {
		class ArrayBuffer : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			/*static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::algorithms::ArrayBuffer*, std::weak_ptr<Input>> _inputs;

			std::shared_ptr<nupic::Input> _input;

			static POLY_METHOD(New);
			static POLY_METHOD(compute);*/
		};
	}
}

// /* ---------------------------------------------------------------------
//  * Numenta Platform for Intelligent Computing (NuPIC)
//  * Copyright (C) 2013, Numenta, Inc.  Unless you have an agreement
//  * with Numenta, Inc., for a separate license for this software code, the
//  * following terms and conditions apply:
//  *
//  * This program is free software: you can redistribute it and/or modify
//  * it under the terms of the GNU Affero Public License version 3 as
//  * published by the Free Software Foundation.
//  *
//  * This program is distributed in the hope that it will be useful,
//  * but WITHOUT ANY WARRANTY; without even the implied warranty of
//  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//  * See the GNU Affero Public License for more details.
//  *
//  * You should have received a copy of the GNU Affero Public License
//  * along with this program.  If not, see http://www.gnu.org/licenses.
//  *
//  * http://numenta.org/licenses/
//  * ---------------------------------------------------------------------
//  */

// /** @file
//  *  This header file defines the data structures used for
//  *  facilitating the passing of numpy arrays from python
//  *  code to C code.
//  */

// // #ifndef NTA_ARRAY_BUFFER_HPP
// // #define NTA_ARRAY_BUFFER_HPP

// // #ifdef __cplusplus
// // extern "C" {
// // #endif  // __cplusplus

// // Structure that wraps the essential elements of
// // a numpy array object.
// // typedef struct _NUMPY_ARRAY {
// //   int nNumDims;
// //   const int * pnDimensions;
// //   const int * pnStrides;
// //   const char * pData;
// // } NUMPY_ARRAY;

// // Bounding box
// typedef struct _BBOX {
//   int   nLeft;
//   int   nRight;
//   int   nTop;
//   int   nBottom;
// } BBOX;

// // Macros for clipping boxes
// #ifndef MIN
// #define MIN(x, y)    ((x) <= (y) ? (x) : (y))
// #endif // MIN
// #ifndef MAX
// #define MAX(x, y)    ((x) <= (y) ? (y) : (x))
// #endif // MAX

// #ifdef __cplusplus
// }
// #endif  // __cplusplus

// #endif // NTA_ARRAY_BUFFER_HPP
#endif