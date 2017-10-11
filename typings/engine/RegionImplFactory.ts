// /* ---------------------------------------------------------------------
//  * Numenta Platform for Intelligent Computing (NuPIC)
//  * Copyright (C) 2013-2015, Numenta, Inc.  Unless you have an agreement
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
import {BundleIO} from "../ntypes/BundleIO";
import { bool } from "../types/Types";
import {Region} from "./Region";
import {RegionImpl} from "./RegionImpl";
import {GenericRegisteredRegionImpl} from "./RegisteredRegionImpl";
import {Spec} from "./Spec";

// /** @file
//  * Definition of the RegionImpl Factory API
//  *
//  * A RegionImplFactory creates RegionImpls upon request.
//  * Pynode creation is delegated to another class (TBD).
//  * Because all C++ RegionImpls are compiled in to NuPIC,
//  * the RegionImpl factory knows about them explicitly.
//  *
//  */

// #ifndef NTA_REGION_IMPL_FACTORY_HPP
// #define NTA_REGION_IMPL_FACTORY_HPP

// #include <map>
// #include <string>
// #include <memory>

// //#include <boost/shared_ptr.hpp>
// #include <capnp/any.h>

// namespace nupic
// {

//   class RegionImpl;
//   class Region;
//   class DynamicPythonLibrary;
//   struct Spec;
//   class BundleIO;
//   class ValueMap;
//   class GenericRegisteredRegionImpl;
interface RegionImplFactory_Static {
	getInstance(): RegionImplFactory;

	// RegionImplFactory is a lightweight object
	// ~RegionImplFactory() {};

	registerPyRegionPackage(path: string): void;

	// Allows the user to load custom Python regions
	registerPyRegion(module: string, className: string): void;

	// Allows the user to load custom C++ regions
	registerCPPRegion(name: string, wrapper: GenericRegisteredRegionImpl): void;

	// Allows the user to unregister Python regions
	unregisterPyRegion(className: string): void;

	// Allows the user to unregister C++ regions
	unregisterCPPRegion(name: string): void;

}

export interface RegionImplFactory {

	// Create a RegionImpl of a specific type; caller gets ownership.
	createRegionImpl(
		nodeType: string,
		nodeParams: string,
		region: Region): RegionImpl;

	// Create a RegionImpl from serialized state; caller gets ownership.
	deserializeRegionImpl(
		nodeType: string,
		bundle: BundleIO,
		region: Region): RegionImpl;

	// Create a RegionImpl from capnp proto; caller gets ownership.
	// deserializeRegionImpl(
	// 	nodeType: string,
	// 	proto: capnp: : AnyPointer:  : Reader,
	// 	region: Region): RegionImpl;

	// Returns nodespec for a specific node type; Factory retains ownership.
	getSpec(nodeType: string): Spec;

	// RegionImplFactory caches nodespecs and the dynamic library reference
	// This frees up the cached information.
	// Should be called only if there are no outstanding
	// nodespec references (e.g. in NuPIC shutdown) or pynodes.
	cleanup(): void;

	//   private:
	//     RegionImplFactory() {};
	//     RegionImplFactory(RegionImplFactory &);

	//     // TODO: implement locking for thread safety for this global data structure
	//     // TODO: implement cleanup

	//     // getSpec returns references to nodespecs in this cache.
	//     // should not be cleaned up until those references have disappeared.
	//     std::map<string, Spec*> nodespecCache_;

	//     // Using shared_ptr here to ensure the dynamic python library object
	//     // is deleted when the factory goes away. Can't use scoped_ptr
	//     // because it is not initialized in the constructor.
	//     std::shared_ptr<DynamicPythonLibrary> pyLib_;
}
export let RegionImplFactory: RegionImplFactory_Static = nupic_module.x;
// }

// #endif // NTA_REGION_IMPL_FACTORY_HPP
