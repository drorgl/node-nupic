#ifndef _NUPIC_NTYPES_SCALAR_H_
#define _NUPIC_NTYPES_SCALAR_H_

#include "nupic/ntypes/Scalar.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace ntypes {

		class Scalar : public overres::ObjectWrap {
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
//  * Definitions for the Scalar class
//  *
//  * A Scalar object is an instance of an NTA_BasicType -- essentially a union
//  * It is used internally in the conversion of YAML strings to C++ objects.
//  */

// #ifndef NTA_SCALAR_HPP
// #define NTA_SCALAR_HPP

// #include <nupic/types/Types.h>
// #include <nupic/utils/Log.hpp> // temporary, while implementation is in hpp
// #include <string>

// namespace nupic
// {
//   class Scalar
//   {
//   public:
//     Scalar(NTA_BasicType theTypeParam);

//     NTA_BasicType getType();

//     template <typename T> T getValue() const;

//     union {
//       NTA_Handle handle;
//       NTA_Byte byte;
//       NTA_Int16 int16;
//       NTA_UInt16 uint16;
//       NTA_Int32 int32;
//       NTA_UInt32 uint32;
//       NTA_Int64 int64;
//       NTA_UInt64 uint64;
//       NTA_Real32 real32;
//       NTA_Real64 real64;
//       bool boolean;
//     } value;

//   private:
//     NTA_BasicType theType_;

//   };

// }

// #endif // NTA_SCALAR_HPP
#endif