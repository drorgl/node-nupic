#include "Array.hpp"

namespace node_nupic {
	namespace ntypes {
		void Array::Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload) {
		}
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

// // ---
// //
// // Definitions for the Array class
// //
// // It is a sub-class of ArrayBase that owns its buffer
// //
// // ---

// #ifndef NTA_ARRAY_HPP
// #define NTA_ARRAY_HPP

// #include <nupic/ntypes/ArrayBase.hpp>
// #include <nupic/utils/Log.hpp>

// namespace nupic
// {
//   class Array : public ArrayBase
//   {
//   public:
//     Array(NTA_BasicType type, void * buffer, size_t count) :
//       ArrayBase(type, buffer, count)
//     {
//     }

//     explicit Array(NTA_BasicType type) : ArrayBase(type)
//     {
//     }

//     //Array(const Array & other) : ArrayBase(other)
//     //{
//     //}

//     void invariant()
//     {
//       if (!own_)
//         NTA_THROW << "Array must own its buffer";
//     }
//   private:
//     // Hide base class method (invalid for Array)
//     void setBuffer(void * buffer, size_t count);
//   };
// }

// #endif
