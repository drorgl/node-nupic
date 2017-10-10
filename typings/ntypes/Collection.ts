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
import { bool, pair ,size_t} from "../types/Types";
import { NTA_CHECK, NTA_THROW } from "../utils/Log";
// #ifndef NTA_COLLECTION_HPP
// #define NTA_COLLECTION_HPP

// #include <nupic/ntypes/Collection.hpp>
// #include <nupic/utils/Log.hpp>
// #include <string>
// #include <vector>

// namespace nupic
// {
//   // A collection is a templated class that contains items of type t.
//   // It supports lookup by name and by index. The items are stored in a map
//   // and copies are also stored in a vector (it's Ok to use pointers).
//   // You can add items using the add() method.
//   //

class Collection<T>
{
	private vec_: Array<pair<string, T>>;

	public getCount(): size_t {
		return this.vec_.length;
	}

	// This method provides access by index to the contents of the collection
	// The indices are in insertion order.
	//

	public getByIndex(index: size_t): pair<string, T> {
		NTA_CHECK(() => index < vec_.length);
		return this.vec_[index];
	}

	public contains(name: string): bool {
		for (const i of this.vec_) {
			if (i.first === name) {
				return true;
			}
		}
		return false;
	}

	public getByName(name: string): T {
		for (const i of this.vec_) {

			if (i.first === name) {
				return i.second;
			}
		}
		NTA_THROW("No item named: " + name);
	}

	// TODO: move add/remove to a ModifiableCollection subclass
	// This method should be internal but is currently tested
	// in net_test.py in test_node_spec
	public add(name: string, item: T): void {
		// make sure we don't already have something with this name
		for (const i of this.vec_) {
			if (i.first === name) {
				NTA_THROW("Unable to add item '" + name + "' to collection "
					+ "because it already exists");
			}
		}

		// Add the new item to the vector
		this.vec_.push(new pair(name, item));
	}

	public remove(name: string): void {
		for (const i of this.vec_) {
			if (i.first === name) {
				break;
			}
		}
		if (i === vec_.end()) {
			NTA_THROW("No item named '" + name + "' in collection");
		}

		this.vec_.erase(i);
	}

	// #ifdef NTA_INTERNAL
	//    pair<string, T>& getByIndex(size_t index);
	// #endif

}
// }

// #endif
