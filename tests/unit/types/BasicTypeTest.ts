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
// import { ASSERT_TRUE, TEST } from "../test_base";

// import { BasicType, NTA_BasicType } from "../../../typings/index";

// /** @file
//  * Implementation of BasicType test
//  */

// // #include <gtest/gtest.h>
// // #include <nupic/types/BasicType.hpp>

// // using namespace nupic;

// TEST("BasicTypeTest", "isValid", () => {
// 	ASSERT_TRUE(BasicType.isValid(NTA_BasicType.NTA_BasicType_Byte));
// 	ASSERT_TRUE(BasicType.isValid(NTA_BasicType.NTA_BasicType_Int16));
// 	ASSERT_TRUE(BasicType.isValid(NTA_BasicType.NTA_BasicType_UInt16));
// 	ASSERT_TRUE(BasicType.isValid(NTA_BasicType.NTA_BasicType_Int32));
// 	ASSERT_TRUE(BasicType.isValid(NTA_BasicType.NTA_BasicType_UInt32));
// 	ASSERT_TRUE(BasicType.isValid(NTA_BasicType.NTA_BasicType_Int64));
// 	ASSERT_TRUE(BasicType.isValid(NTA_BasicType.NTA_BasicType_UInt64));
// 	ASSERT_TRUE(BasicType.isValid(NTA_BasicType.NTA_BasicType_Real32));
// 	ASSERT_TRUE(BasicType.isValid(NTA_BasicType.NTA_BasicType_Real64));
// 	ASSERT_TRUE(BasicType.isValid(NTA_BasicType.NTA_BasicType_Real));
// 	ASSERT_TRUE(BasicType.isValid(NTA_BasicType.NTA_BasicType_Handle));
// 	ASSERT_TRUE(BasicType.isValid(NTA_BasicType.NTA_BasicType_Bool));

// 	ASSERT_TRUE(!BasicType.isValid(NTA_BasicType.NTA_BasicType_Last));
// 	ASSERT_TRUE(!(BasicType.isValid(777))); // NTA_BasicType(NTA_BasicType_Last + 777))));
// 	ASSERT_TRUE(!(BasicType.isValid(-1))); // NTA_BasicType(-1))));
// });

// TEST("BasicTypeTest", "getSize", () => {
// 	ASSERT_TRUE(BasicType.getSize(NTA_BasicType.NTA_BasicType_Byte) === 1);
// 	ASSERT_TRUE(BasicType.getSize(NTA_BasicType.NTA_BasicType_Int16) === 2);
// 	ASSERT_TRUE(BasicType.getSize(NTA_BasicType.NTA_BasicType_UInt16) === 2);
// 	ASSERT_TRUE(BasicType.getSize(NTA_BasicType.NTA_BasicType_Int32) === 4);
// 	ASSERT_TRUE(BasicType.getSize(NTA_BasicType.NTA_BasicType_UInt32) === 4);
// 	ASSERT_TRUE(BasicType.getSize(NTA_BasicType.NTA_BasicType_Int64) === 8);
// 	ASSERT_TRUE(BasicType.getSize(NTA_BasicType.NTA_BasicType_UInt64) === 8);
// 	ASSERT_TRUE(BasicType.getSize(NTA_BasicType.NTA_BasicType_Real32) === 4);
// 	ASSERT_TRUE(BasicType.getSize(NTA_BasicType.NTA_BasicType_Real64) === 8);
// 	ASSERT_TRUE(BasicType.getSize(NTA_BasicType.NTA_BasicType_Bool) === 1);
// 	// #ifdef NTA_DOUBLE_PRECISION
// 	ASSERT_TRUE(BasicType.getSize(NTA_BasicType.NTA_BasicType_Real) === 8); // Real64
// 	// #else
// 	ASSERT_TRUE(BasicType.getSize(NTA_BasicType.NTA_BasicType_Real) === 4); // Real32
// 	// #endif
// 	// ASSERT_TRUE(BasicType.getSize(NTA_BasicType.NTA_BasicType_Handle) === sizeof(void * ));
// });

// TEST("BasicTypeTest", "getName", () => {
// 	ASSERT_TRUE(BasicType.getName(NTA_BasicType.NTA_BasicType_Byte) === ("Byte"));
// 	ASSERT_TRUE(BasicType.getName(NTA_BasicType.NTA_BasicType_Int16) === ("Int16"));
// 	ASSERT_TRUE(BasicType.getName(NTA_BasicType.NTA_BasicType_UInt16) === ("UInt16"));
// 	ASSERT_TRUE(BasicType.getName(NTA_BasicType.NTA_BasicType_Int32) === ("Int32"));
// 	ASSERT_TRUE(BasicType.getName(NTA_BasicType.NTA_BasicType_UInt32) === ("UInt32"));
// 	ASSERT_TRUE(BasicType.getName(NTA_BasicType.NTA_BasicType_Int64) === ("Int64"));
// 	ASSERT_TRUE(BasicType.getName(NTA_BasicType.NTA_BasicType_UInt64) === ("UInt64"));
// 	ASSERT_TRUE(BasicType.getName(NTA_BasicType.NTA_BasicType_Real32) === ("Real32"));
// 	ASSERT_TRUE(BasicType.getName(NTA_BasicType.NTA_BasicType_Real64) === ("Real64"));
// 	// #ifdef NTA_DOUBLE_PRECISION
// 	ASSERT_TRUE(BasicType.getName(NTA_BasicType.NTA_BasicType_Real) === ("Real64"));
// 	// #else
// 	ASSERT_TRUE(BasicType.getName(NTA_BasicType.NTA_BasicType_Real) === ("Real32"));
// 	// #endif
// 	ASSERT_TRUE(BasicType.getName(NTA_BasicType.NTA_BasicType_Handle) === ("Handle"));
// 	ASSERT_TRUE(BasicType.getName(NTA_BasicType.NTA_BasicType_Bool) === ("Bool"));
// });

// TEST("BasicTypeTest", "parse", () => {
// 	ASSERT_TRUE(BasicType.parse("Byte") === NTA_BasicType.NTA_BasicType_Byte);
// 	ASSERT_TRUE(BasicType.parse("Int16") === NTA_BasicType.NTA_BasicType_Int16);
// 	ASSERT_TRUE(BasicType.parse("UInt16") === NTA_BasicType.NTA_BasicType_UInt16);
// 	ASSERT_TRUE(BasicType.parse("Int32") === NTA_BasicType.NTA_BasicType_Int32);
// 	ASSERT_TRUE(BasicType.parse("UInt32") === NTA_BasicType.NTA_BasicType_UInt32);
// 	ASSERT_TRUE(BasicType.parse("Int64") === NTA_BasicType.NTA_BasicType_Int64);
// 	ASSERT_TRUE(BasicType.parse("UInt64") === NTA_BasicType.NTA_BasicType_UInt64);
// 	ASSERT_TRUE(BasicType.parse("Real32") === NTA_BasicType.NTA_BasicType_Real32);
// 	ASSERT_TRUE(BasicType.parse("Real64") === NTA_BasicType.NTA_BasicType_Real64);
// 	ASSERT_TRUE(BasicType.parse("Real") === NTA_BasicType.NTA_BasicType_Real);
// 	ASSERT_TRUE(BasicType.parse("Handle") === NTA_BasicType.NTA_BasicType_Handle);
// 	ASSERT_TRUE(BasicType.parse("Bool") === NTA_BasicType.NTA_BasicType_Bool);
// });
