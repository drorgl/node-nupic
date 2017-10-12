/* ---------------------------------------------------------------------
 * Numenta Platform for Intelligent Computing (NuPIC)
 * Copyright (C) 2016, Numenta, Inc.  Unless you have an agreement
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
import nupic_module from "../bindings";

import { bool, Real64, UInt, } from "../types/Types";

import {ClassifierResult} from "./ClassifierResult";

/** @file
 * Definitions for the SDRClassifier.
 */

// #ifndef NTA_SDR_CLASSIFIER_HPP
// #define NTA_SDR_CLASSIFIER_HPP

// #include <deque>
// #include <iostream>
// #include <map>
// #include <string>
// #include <vector>

// #include <nupic/proto/SdrClassifier.capnp.h>
// #include <nupic/types/Serializable.hpp>
// #include <nupic/types/Types.hpp>
// #include <nupic/math/DenseMatrix.hpp>

// namespace nupic
// {
//   namespace algorithms
//   {

//    typedef cla_classifier::ClassifierResult ClassifierResult;

export namespace sdr_classifier {

	const sdrClassifierVersion = 1;

	// typedef Dense<UInt, Real64> Matrix;
	// type Matrix = Dense<UInt, Real64>;

	// : public Serializable<SdrClassifierProto>
	export interface SDRClassifier_Static {
		/**
			   * Constructor for use when deserializing.
			   */
		new(): SDRClassifier;

		/**
		 * Constructor.
		 *
		 * @param steps The different number of steps to learn and predict.
		 * @param alpha The alpha to use when decaying the duty cycles.
		 * @param actValueAlpha The alpha to use when decaying the actual
		 *                      values for each bucket.
		 * @param verbosity The logging verbosity.
		 */
		new(
			steps: UInt[], alpha: Real64, actValueAlpha: Real64,
			verbosity: UInt): SDRClassifier;

		/**
		 * Destructor.
		 */
		// virtual ~SDRClassifier();

		/**
* Compare the other instance to this one.
*
* @param other Another instance of SDRClassifier to compare to.
* @returns true iff other is identical to this instance.
*/
		// virtual bool operator=== (;const SDRClassifier& other); const ;

	}

	export interface SDRClassifier {

		/**
		 * Compute the likelihoods for each bucket.
		 *
		 * @param recordNum An incrementing integer for each record. Gaps in
		 *                  numbers correspond to missing records.
		 * @param patternNZ The active input bit indices.
		 * @param bucketIdx The current value bucket index.
		 * @param actValue The current scalar value.
		 * @param category Whether the actual values represent categories.
		 * @param learn Whether or not to perform learning.
		 * @param infer Whether or not to perform inference.
		 * @param result A mapping from prediction step to a vector of
		 *               likelihoods where the value at an index corresponds
		 *               to the bucket with the same index. In addition, the
		 *               values for key 0 correspond to the actual values to
		 *               used when predicting each bucket.
		 */
		compute(
			recordNum: UInt, patternNZ: UInt[], bucketIdxList: UInt[],
			actValueList: Real64[], category: bool, learn: bool, infer: bool,
			result: ClassifierResult): void;

		/**
		 * Gets the version number
		 */
		version(): UInt;

		/**
		 * Getter and setter for verbosity level.
		 */
		getVerbosity(): UInt;
		setVerbosity(verbosity: UInt): void;

		/**
		 * Gets the learning rate
		 */
		getAlpha(): UInt;

		/**
		 * Get the size of the string needed for the serialized state.
		 */
		persistentSize(): UInt;

		/**
		 * Save the state to the ostream.
		 */
		// void save(std::ostream& outStream) const;
		save(): Buffer;

		/**
		 * Load state from istream.
		 */
		// void load(std::istream& inStream);
		load(state: Buffer): void;

		/**
		 * Save the state to the builder.
		 */
		// void write(SdrClassifierProto::Builder& proto) const override;

		/**
		 * Save the state to the stream.
		 */
		// using Serializable::write;

		/**
		 * Load state from reader.
		 */
		// void read(SdrClassifierProto::Reader& proto) override;

		/**
		 * Load state from stream.
		 */
		// using Serializable::read;

	}  // end of SDRClassifier class

	export let SDRClassifier: SDRClassifier_Static = nupic_module.x;
}  // end of namespace sdr_classifier
//   }  // end of namespace algorithms
// }  // end of name space nupic

// #   endif
