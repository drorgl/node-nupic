#ifndef _NUPIC_NTYPES_ARRAYBASE_H_
#define _NUPIC_NTYPES_ARRAYBASE_H_

#include "../nupic.h"


#include "nupic/ntypes/ArrayBase.hpp"

class ArrayBase : public overres::ObjectWrap {
public:
	static void Init(Handle<Object> target, std::shared_ptr<namespace_wrap> overload);

	/*static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::algorithms::ArrayBuffer*, std::weak_ptr<Input>> _inputs;

	std::shared_ptr<nupic::Input> _input;

	static POLY_METHOD(New);
	static POLY_METHOD(compute);*/
};

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
import nupic_module from "../bindings";
import { NTA_BasicType, size_t } from "../types/Types";
// /** @file
//  * Definitions for the ArrayBase class
//   *
//   * An ArrayBase object contains a memory buffer that is used for
//   * implementing zero-copy and one-copy operations in NuPIC.
//   * An ArrayBase contains:
//   * - a pointer to a buffer
//   * - a length
//   * - a type
//   * - a flag indicating whether or not the object owns the buffer.
//   */

// #ifndef NTA_ARRAY_BASE_HPP
// #define NTA_ARRAY_BASE_HPP

// #include <iostream> // for ostream
// #include <stdlib.h> // for size_t
// #include <string>

// #include <nupic/types/Types.h>

// namespace nupic
// {
/**
 * An ArrayBase is used for passing arrays of data back and forth between
 * a client application and NuPIC, minimizing copying. It facilitates
 * both zero-copy and one-copy operations.
 */
export interface ArrayBase_Static {
	/**
	   * Caller provides a buffer to use.
	   * NuPIC always copies data into this buffer
	   * Caller frees buffer when no longer needed.
	   */
	new(type: NTA_BasicType, buffer: Buffer): ArrayBase;

	/**
     * Caller does not provide a buffer --
     * Nupic will either provide a buffer via setBuffer or
     * ask the ArrayBase to allocate a buffer via allocateBuffer.
     */
	new(type: NTA_BasicType): ArrayBase;

	/**
   * The destructor ensures the array doesn't leak its buffer (if
   * it owns it).
   */
	// virtual ~ArrayBase();

}

export interface ArrayBase {

	/**
     * Ask ArrayBase to allocate its buffer
     */

	allocateBuffer(count: size_t): void;

	setBuffer(buffer: Buffer): void;

	releaseBuffer(): void;

	getBuffer(): Buffer;

	getArray<T>(TType: string): T[];

	// number of elements of given type in the buffer

	getCount(): size_t;

	getType(): NTA_BasicType;

}
export let ArrayBase: ArrayBase_Static = nupic_module.x;

//   // Serialization for diagnostic purposes
//   std::ostream& operator<<(std::ostream&, const ArrayBase&);

// }

// #endif
#endif