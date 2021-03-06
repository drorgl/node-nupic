#include "BasicType.hpp"


namespace node_nupic {
	namespace types {
		void BasicType::Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload) {
		}
	}

}

//// /* ---------------------------------------------------------------------
////  * Numenta Platform for Intelligent Computing (NuPIC)
////  * Copyright (C) 2013, Numenta, Inc.  Unless you have an agreement
////  * with Numenta, Inc., for a separate license for this software code, the
////  * following terms and conditions apply:
////  *
////  * This program is free software: you can redistribute it and/or modify
////  * it under the terms of the GNU Affero Public License version 3 as
////  * published by the Free Software Foundation.
////  *
////  * This program is distributed in the hope that it will be useful,
////  * but WITHOUT ANY WARRANTY; without even the implied warranty of
////  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
////  * See the GNU Affero Public License for more details.
////  *
////  * You should have received a copy of the GNU Affero Public License
////  * along with this program.  If not, see http://www.gnu.org/licenses.
////  *
////  * http://numenta.org/licenses/
////  * ---------------------------------------------------------------------
////  */
//import nupic_module from "../bindings";
//import { bool, NTA_BasicType, size_t } from "../types/Types";
//
//// #ifndef NTA_BASIC_TYPE_HPP
//// #define NTA_BASIC_TYPE_HPP
//
//// #include <nupic/types/Types.h>
//// #include <string>
//
//// namespace nupic
//// {
//// The BasicType class provides operations on NTA_BasicType as static methods.
////
//// The supported operations are:
//// - isValid()
//// - getName()
//// - getSize() and parse().
////
//export interface BasicType_Static {
//	// Check if the provided basic type os in the proper range.
//	//
//	// In C++ enums are just glorified integers and you can cast
//	// an int to any enum even if the int value is outside of the range of
//	// definedenum values. The compiler will say nothing. The NTA_BasicType
//	// enum has a special value called NTA_BasicType_Last that marks the end of
//	// of the valid rnge of values and isValid() returns true if if the input
//	// falls in the range [0, NTA_BasicType_Last) and false otherwise. Note,
//	// that NTA_BasicType_Last itself is an invalid value eventhough it is
//	// defined in the enum.
//	isValid(t: NTA_BasicType): bool;
//
//	// Return the name of a basic type (without the "NTA_BasicType_") prefix.
//	// For example the name of NTA_BasicType_Int32 is "int32".
//	getName(t: NTA_BasicType): string;
//
//	// Return the size in bits of a basic type
//	getSize(t: NTA_BasicType): size_t;
//
//	// Parse a string and return the corresponding basic type
//	//
//	// The string should contain the name of the basic type
//	// without the "NTA_BasicType_" prefix. For example the name
//	// of NTA_BasicType_Int32 is "Int32"
//	parse(s: string): NTA_BasicType;
//}
//
//interface BasicType {
//
//	// // Like getName above, but can be used in a templated method
//	// template <typename T> static const char* getName();
//
//	// // To convert <T> -> NTA_BasicType in a templated method
//	// template <typename T> static NTA_BasicType getType();
//
//	//   private:
//	//     BasicType();
//	//     BasicType(const BasicType &);
//}
//
//export let BasicType: BasicType_Static = nupic_module.x;
//// }
//
//// #endif
