#include "NuPIC.hpp"

namespace node_nupic {
	namespace engine {
		void NuPIC::Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload) {
		}
	}

}

///* ---------------------------------------------------------------------
// * Numenta Platform for Intelligent Computing (NuPIC)
// * Copyright (C) 2013, Numenta, Inc.  Unless you have an agreement
// * with Numenta, Inc., for a separate license for this software code, the
// * following terms and conditions apply:
// *
// * This program is free software: you can redistribute it and/or modify
// * it under the terms of the GNU Affero Public License version 3 as
// * published by the Free Software Foundation.
// *
// * This program is distributed in the hope that it will be useful,
// * but WITHOUT ANY WARRANTY; without even the implied warranty of
// * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
// * See the GNU Affero Public License for more details.
// *
// * You should have received a copy of the GNU Affero Public License
// * along with this program.  If not, see http://www.gnu.org/licenses.
// *
// * http://numenta.org/licenses/
// * ---------------------------------------------------------------------
// */
//
//import nupic_module from "../bindings";
//
///**
// * @file
// * NuPIC init/shutdown operations
// */
//
///** @namespace nupic
// *
// * Contains the primary NuPIC API.
// */
//// namespace nupic
//// {
////  class Network;
//
///**
// * Initialization and shutdown operations for NuPIC engine.
// */
//export interface NuPiC_Static {
//	/**
//     * Initialize NuPIC.
//     *
//     * @note It's safe to reinitialize an initialized NuPIC.
//     * @note Creating a Network will auto-initialize NuPIC.
//     */
//	init(): void;
//
//	/**
//	 * Shutdown NuPIC.
//	 *
//	 * @note As a safety measure, NuPIC with any Network still registered to it
//	 * is not allowed to be shut down.
//	 */
//	shutdown(): void;
//
//	/**
//	 *
//	 * @return Whether NuPIC is initialized successfully.
//	 */
//	isInitialized(): boolean;
//}
//export interface NuPIC {
//	/**
//     * Having Network as friend class to allow Networks register/unregister
//     * themselves at creation and destruction time by calling non-public methods of NuPIC.
//     *
//     */
//	// friend class Network;
//
//	// public static void registerNetwork(Network* net);
//	// public static void unregisterNetwork(Network* net);
//	// public static std::public set<Networkpublic public *> networks_;
//	// static bool; initialized_;
//}
//// } // namespace nupic
//
//export let NuPIC: NuPiC_Static = nupic_module.NuPIC;
