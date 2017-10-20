#include "Timer.hpp"

namespace node_nupic {
	namespace os {
		void Timer::Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload) {
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
//import { bool, Real64, UInt64 } from "../types/Types";
//// /** @file
////  * Timer interface
////  */
//
//// #ifndef NTA_TIMER2_HPP
//// #define NTA_TIMER2_HPP
//
//// #include <string>
//// #include <nupic/types/Types.hpp>
//
//// namespace nupic
//// {
//
////   /**
////    * @Responsibility
////    * Simple stopwatch services
////    *
////    * @Description
////    * A timer object is a stopwatch. You can start it, stop it, read the
////    * elapsed time, and reset it. It is very convenient for performance
////    * measurements.
////    *
////    * Uses the most precise and lowest overhead timer available on a given system.
////    *
////    */
//export interface Timer_Static {
//	/**
//		* Create a stopwatch
//		*
//		* @param startme  If true, the timer is started when created
//		*/
//	new(startme?: bool/* = false*/): Timer;
//}
//
//export interface Timer {
//
//	/**
//     * Start the stopwatch
//     */
//
//	start(): void;
//
//	/**
//     * Stop the stopwatch. When restarted, time will accumulate
//     */
//
//	stop(): void;
//
//	/**
//     * If stopped, return total elapsed time.
//     * If started, return current elapsed time but don't stop the clock
//     * return the value in seconds;
//     */
//
//	getElapsed(): Real64;
//
//	/**
//     * Reset the stopwatch, setting accumulated time to zero.
//     */
//
//	reset(): void;
//
//	/**Train
//     * Return the number of time the stopwatch has been started.
//     */
//
//	getStartCount(): UInt64;
//
//	/**
//     * Returns true is the stopwatch is currently running
//     */
//
//	isStarted(): bool;
//
//	toString(): string;
//
//	//   private:
//	//     // internally times are stored as ticks
//	//     UInt64 prevElapsed_;   // total time as of last stop() (in ticks)
//	//     UInt64 start_;         // time that start() was called (in ticks)
//	//     UInt64 nstarts_;       // number of times start() was called
//	//     bool started_;         // true if was started
//
//} // class Timer
//
//export let Timer: Timer_Static = nupic_module.x;
//
//// } // namespace nupic
//
//// #endif // NTA_TIMER2_HPP
