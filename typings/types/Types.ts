/* ---------------------------------------------------------------------
 * Numenta Platform for Intelligent Computing (NuPIC)
 * Copyright (C) 2013, Numenta, Inc.  Unless you have an agreement
 * with Numenta, Inc., for a separate license for this software code, the
 * following terms and conditions apply:
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero Public License for more details.
 *
 * You should have received a copy of the GNU Affero Public License
 * along with this program.  If not, see http://www.gnu.org/licenses.
 *
 * http://numenta.org/licenses/
 * ---------------------------------------------------------------------
 */

/** @file
 * Basic C++ type definitions used throughout `nupic.core` and rely on `Types.h`
 */

// #ifndef NTA_TYPES_HPP
// #define NTA_TYPES_HPP

// #include <nupic/types/Types.h>

// ----------------------------------------------------------------------

// namespace nupic
// {
/**
 * @name Basic types
 *
 * @{
 */

/**
 * Represents a 8-bit byte.
 */

type NTA_Byte = number; //        Byte;

/**
 * Represents a 16-bit signed integer.
 */
type NTA_Int16 = number; //      Int16;

/**
 * Represents a 16-bit unsigned integer.
 */
type NTA_UInt16 = number; //     UInt16;

/**
 * Represents a 32-bit signed integer.
 */
type NTA_Int32 = number; //       Int32;

/**
 * Represents a 32-bit unsigned integer.
 */
type NTA_UInt32 = number; //      UInt32;

/**
 * Represents a 64-bit signed integer.
 */
type NTA_Int64 = number; //          Int64;

/**
 * Represents a 64-bit unsigned integer.
 */
type NTA_UInt64 = number; //       UInt64;

/**
 * Represents a 32-bit real number(a floating-point number).
 */
type NTA_Real32 = number; //      Real32;

/**
 * Represents a 64-bit real number(a floating-point number).
 */
type NTA_Real64 = number; //     Real64;

/**
 * Represents an opaque handle/pointer, same as `void *`
 */
type NTA_Handle = number; //      Handle;

/**
* Represents an opaque pointer, same as `uintptr_t`
*/
type NTA_UIntPtr = number; //     UIntPtr;

/**
 * @}
 */

/**
 * @name Flexible types
 *
 * The following are flexible types depending on `NTA_DOUBLE_PRECISION` and `NTA_BIG_INTEGER`.
 *
 * @{
 *
 */

/**
 * Represents a real number(a floating-point number).
 *
 * Same as nupic::Real64 if `NTA_DOUBLE_PRECISION` is defined, nupic::Real32 otherwise.
 */
type NTA_Real = number; // Real;

/**
 * Represents a signed integer.
 *
 * Same as nupic::Int64 if `NTA_BIG_INTEGER` is defined, nupic::Int32 otherwise.
 */
type NTA_Int = number; //  Int;

/**
 * Represents a unsigned integer.
 *
 * Same as nupic::UInt64 if `NTA_BIG_INTEGER` is defined, nupic::UInt32 otherwise.
 */
type NTA_UInt = number; // UInt;

/**
 * Represents lengths of arrays, strings and so on.
 */
type NTA_Size = number; // Size;

/**
* @}
*/

/**
* This enum represents the documented logging level of the debug logger.
*
* Use it like `LDEBUG(nupic::LogLevel_XXX)`.
*/
//   enum LogLevel
//   {
//     /**
//      * Log level: None.
//      */
//     LogLevel_None = NTA_LogLevel_None,
//     /**
//      * Log level: Minimal.
//      */
//     LogLevel_Minimal,
//     /**
//      * Log level: Normal.
//      */
//     LogLevel_Normal,
//     /**
//      * Log level: Verbose.
//      */
//     LogLevel_Verbose,
//   };

// } // end namespace nupic

// #ifdef SWIG
// #undef NTA_INTERNAL
// #endif // SWIG

// #endif // NTA_TYPES_HPP

/**
 * Basic types enumeration
 */
export enum NTA_BasicType {
	/**
	 * Represents a 8-bit byte.
	 */
	NTA_BasicType_Byte,

	/**
	 * Represents a 16-bit signed integer.
	 */
	NTA_BasicType_Int16,

	/**
	 * Represents a 16-bit unsigned integer.
	 */
	NTA_BasicType_UInt16,

	/**
	 * Represents a 32-bit signed integer.
	 */
	NTA_BasicType_Int32,

	/**
	 * Represents a 32-bit unsigned integer.
	 */
	NTA_BasicType_UInt32,

	/**
	 * Represents a 64-bit signed integer.
	 */
	NTA_BasicType_Int64,

	/**
	 * Represents a 64-bit unsigned integer.
	 */
	NTA_BasicType_UInt64,

	/**
	 * Represents a 32-bit real number(a floating-point number).
	 */
	NTA_BasicType_Real32,

	/**
	 * Represents a 64-bit real number(a floating-point number).
	 */
	NTA_BasicType_Real64,

	/**
	 * Represents a opaque handle/pointer, same as `void *`
	 */
	NTA_BasicType_Handle,

	/**
	 * Represents a boolean. The size is compiler-defined.
	 *
	 * There is no typedef'd "Bool" or "NTA_Bool". We just need a way to refer
	 * to bools with a NTA_BasicType.
	 */
	NTA_BasicType_Bool,

	/**
	 * @note This is not an actual type, just a marker for validation purposes
	 */
	NTA_BasicType_Last,

	// #ifdef NTA_DOUBLE_PRECISION
	/** TODO: document */
	NTA_BasicType_Real = NTA_BasicType_Real64,
	// #else
	/** TODO: document */
	// NTA_BasicType_Real = NTA_BasicType_Real32,
	// #endif

}// NTA_BasicType;
