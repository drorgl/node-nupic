#include "ClassifierResult.hpp"

namespace node_nupic {
	namespace algorithms {
		void ClassifierResult::Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload) {
		}
	}

}

///* ---------------------------------------------------------------------
// * Numenta Platform for Intelligent Computing (NuPIC)
// * Copyright (C) 2013-2015, Numenta, Inc.  Unless you have an agreement
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
//import { bool, Int, Real64, UInt } from "../types/Types";
//
//// #ifndef NTA_classifier_result_HPP
//// #define NTA_classifier_result_HPP
//
//// #include <map>
//// #include <vector>
//
//// #include <nupic/types/Types.hpp>
//
//// using namespace std;
//
//// namespace nupic
//// {
////   namespace algorithms
////   {
//// namespace cla_classifier {
//export interface IResultStep {
//	first: Int;
//	second: Real64[];
//}
//
///** CLA classifier result class.
// *
// * @b Responsibility
// * The ClassifierResult is responsible for storing result data and
// * cleaning up the data when deleted.
// *
// */
//export interface ClassifierResult_Static {
//	/**
//			   * Constructor.
//			   */
//	new(): ClassifierResult;
//
//	/**
//	 * Destructor - frees memory allocated during lifespan.
//	 */
//	// virtual ~ClassifierResult();
//	/**
//	 * Checks if the other instance has the exact same values.
//	 *
//	 * @param other The other instance to compare to.
//	 * @returns True iff the other instance has the same values.
//	 */
//	// virtual bool operator== (const ClassifierResult& other) const;
//
//}
//
//export interface ClassifierResult {
//	// public:
//	// first: Int;
//	// second: Real64[];
//
//	/**
//	 * Creates and returns a vector for a given step.
//	 *
//	 * The vectors created are stored and can be accessed with the
//	 * iterator methods. The vectors are owned by this class and are
//	 * deleted in the destructor.
//	 *
//	 * @param step The prediction step to create a vector for. If -1, then
//	 *             a vector for the actual values to use for each bucket
//	 *             is returned.
//	 * @param size The size of the desired vector.
//	 * @param value The value to populate the vector with.
//	 *
//	 * @returns The specified vector.
//	 */
//	createVector(step: Int, size: UInt, value: Real64): Real64[];
//
//	/**
//	 * Iterator method begin.
//	 */
//	//   virtual map<Int, Array<Real64>*>::const_iterator begin()
//	//   {
//	//     return result_.begin();
//	//   }
//
//	//   /**
//	//    * Iterator method end.
//	//    */
//	//   virtual map<Int, Array<Real64>*>::const_iterator end()
//	//   {
//	//     return result_.end();
//	//   }
//
//	// private:
//
//	//   map<Int, Array<Real64>*> result_;
//	getResultMap(): { [step: number]: Real64[]; };
//	getResultArray(): IResultStep[];
//
//	} // end class ClassifierResult
//export let ClassifierResult: ClassifierResult_Static = nupic_module.x;
//
//// } // end namespace cla_classifier
////   } // end namespace algorithms
//// } // end namespace nupic
//
//// #endif // NTA_classifier_result_HPP
