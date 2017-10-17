#include "Collection.hpp"

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
//import { bool, pair, size_t } from "../types/Types";
//import { NTA_CHECK, NTA_THROW } from "../utils/Log";
//// #ifndef NTA_COLLECTION_HPP
//// #define NTA_COLLECTION_HPP
//
//// #include <nupic/ntypes/Collection.hpp>
//// #include <nupic/utils/Log.hpp>
//// #include <string>
//// #include <vector>
//
//// namespace nupic
//// {
////   // A collection is a templated class that contains items of type t.
////   // It supports lookup by name and by index. The items are stored in a map
////   // and copies are also stored in a vector (it's Ok to use pointers).
////   // You can add items using the add() method.
////   //
//
//export interface Collection<T> {
//
//	getCount(): size_t;
//
//	// This method provides access by index to the contents of the collection
//	// The indices are in insertion order.
//	//
//
//	getByIndex(index: size_t): pair<string, T>;
//
//	contains(name: string): bool;
//
//	getByName(name: string): T;
//
//	// TODO: move add/remove to a ModifiableCollection subclass
//	// This method should be internal but is currently tested
//	// in net_test.py in test_node_spec
//	add(name: string, item: T): void;
//
//	remove(name: string): void;
//
//	// #ifdef NTA_INTERNAL
//	//    pair<string, T>& getByIndex(size_t index);
//	// #endif
//
//}
//// }
//
//// #endif
