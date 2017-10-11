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
import { ASSERT_TRUE, TEST } from "../test_base";

import { UInt } from "../../../typings/index";
/** @file
 * Implementation for Directory test
 */

// #include <nupic/os/Regex.hpp>
// #include <gtest/gtest.h>

// using namespace std;
// using namespace nupic;

TEST("RegexTest", "Basic", () => {
	ASSERT_TRUE((new RegExp(".*")).test(""));
	ASSERT_TRUE((new RegExp(".*")).test("dddddfsdsgregegr"));
	ASSERT_TRUE((new RegExp("d.*")).test("d"));
	ASSERT_TRUE((new RegExp("^d.*")).test("ddsfffdg"));
	ASSERT_TRUE(!(new RegExp("d.*")).test(""));
	ASSERT_TRUE(!(new RegExp("d.*")).test("a"));
	ASSERT_TRUE(!(new RegExp("^d.*")).test("ad"));
	ASSERT_TRUE(!(new RegExp("Sensor")).test("CategorySensor"));

	ASSERT_TRUE((new RegExp("\\\\")).test("\\"));

	//  ASSERT_TRUE((new RegExp("")).test("")("\\w", "a"));
	//  ASSERT_TRUE((new RegExp("")).test("")("\\d", "3"));
	//  ASSERT_TRUE((new RegExp("")).test("")("\\w{3}", "abc"));
	//  ASSERT_TRUE((new RegExp("")).test("")("^\\w{3}$", "abc"));
	//  ASSERT_TRUE((new RegExp("")).test("")("[\\w]{3}", "abc"));

	ASSERT_TRUE((new RegExp("[A-Za-z0-9_]{3}")).test("abc"));

	// Invalid expression tests (should throw)
	try {
		ASSERT_TRUE((new RegExp("")).test(""));
		ASSERT_TRUE(false);
	} catch (e) {
		// nop
	}

	try {
		ASSERT_TRUE((new RegExp("xyz[")).test(""));
		ASSERT_TRUE(false);
	} catch (e) {
		// nop
	}
});
