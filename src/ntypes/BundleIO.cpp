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
import { bool } from "../types/Types";

// #ifndef NTA_BUNDLEIO_HPP
// #define NTA_BUNDLEIO_HPP

// #include <nupic/os/Path.hpp>
// #include <nupic/os/FStream.hpp>

// namespace nupic
// {
export interface BundleIO_Static {
	new(
		bundlePath: string, label: string,
		regionName: string, isInput: bool): BundleIO;

	// ~BundleIO();
}

export interface BundleIO {

	// These are {o,i}fstream instead of {o,i}stream so that
	// the node can explicitly close() them.
	// std::ofstream& getOutputStream(const string& name) const;

	// std::ifstream& getInputStream(const string& name) const;

	getPath(name: string): string;

	//   private:

	//     // Before a request for a new stream,
	//     // there should be no open streams.
	//     void checkStreams_() const;

	//     // Should never read and write at the same time -- this helps
	//     // to enforce.
	//     bool isInput_;

	//     // We only need the file prefix, but store the bundle path
	//     // for error messages
	//     string bundlePath_;

	//     // Store the whole prefix instead of just the label
	//     string filePrefix_;

	//     // Store the region name for debugging
	//     string regionName_;

	//     // We own the streams -- helps with finding errors
	//     // and with enforcing one-stream-at-a-time
	//     // These are mutable because the bundle doesn't conceptually
	//     // change when you serialize/deserialize.
	//     mutable std::ofstream *ostream_;
	//     mutable std::ifstream *istream_;

} // class BundleIO
export let BundleIO: BundleIO_Static = nupic_module.x;
// } // namespace nupic

// #endif // NTA_BUNDLEIO_HPP
