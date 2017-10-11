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
import { ASSERT_ANY_THROW, ASSERT_EQ, ASSERT_TRUE, EXPECT_STREQ, TEST } from "../test_base";

import { Fraction } from "../../../typings/index";

/** @file
 * Implementation of Fraction test
 */

// #include <nupic/types/Fraction.hpp>
// #include <sstream>
// #include <limits>
// #include <nupic/types/Types.hpp>
// #include <gtest/gtest.h>

// using namespace nupic;

TEST("FractionTest", "All", () => {
	// create fractions
	// tslint:disable-next-line:no-unused-expression
	new Fraction(1);
	// tslint:disable-next-line:no-unused-expression
	new Fraction(0);
	// tslint:disable-next-line:no-unused-expression
	new Fraction(-1);
	// tslint:disable-next-line:no-unused-expression
	new Fraction(1, 2);
	// tslint:disable-next-line:no-unused-expression
	new Fraction(2, 1);
	// tslint:disable-next-line:no-unused-expression
	new Fraction(-1, 2);
	// tslint:disable-next-line:no-unused-expression
	new Fraction(-2, 1);
	// tslint:disable-next-line:no-unused-expression
	new Fraction(2, 3);
	// tslint:disable-next-line:no-unused-expression
	new Fraction(3, 2);
	// Current overflow cutoff of 10 million
	const tooLarge = 20000000;

	ASSERT_ANY_THROW(() => new Fraction(3, 0));
	ASSERT_ANY_THROW(() => new Fraction(-3, 0));
	ASSERT_ANY_THROW(() => new Fraction(0, 0));
	ASSERT_ANY_THROW(() => new Fraction(tooLarge, 0));
	ASSERT_ANY_THROW(() => new Fraction(tooLarge, 1));
	ASSERT_ANY_THROW(() => new Fraction(0, tooLarge));
	// There is some strange interaction with the SHOULDFAIL macro here.
	// Without this syntax, the compiler thinks we're declaring a new variable
	// tooLarge of type Fraction (which masks the old tooLarge).
	ASSERT_ANY_THROW(() => new Fraction(tooLarge));
	ASSERT_ANY_THROW(() => new Fraction(20000000));
	ASSERT_ANY_THROW(() => new Fraction(-tooLarge));
	ASSERT_ANY_THROW(() => new Fraction(-tooLarge, 0));
	ASSERT_ANY_THROW(() => new Fraction(0, -tooLarge));
	ASSERT_ANY_THROW(() => new Fraction(-tooLarge));
	// ASSERT_ANY_THROW(() => new Fraction(std.numeric_limits<int>.max()));
	// ASSERT_ANY_THROW(() => new Fraction(std.numeric_limits<int>.min()));

	// Test isNaturalNumber() (natural numbers must be nonnegative)
	ASSERT_TRUE(new Fraction(1).isNaturalNumber());
	ASSERT_TRUE(new Fraction(0).isNaturalNumber());
	ASSERT_TRUE(!new Fraction(-1).isNaturalNumber());
	ASSERT_TRUE(!new Fraction(1, 2).isNaturalNumber());
	ASSERT_TRUE(new Fraction(2, 1).isNaturalNumber());
	ASSERT_TRUE(!new Fraction(-1, 2).isNaturalNumber());
	ASSERT_TRUE(!new Fraction(-2, 1).isNaturalNumber());
	ASSERT_TRUE(!new Fraction(3, 2).isNaturalNumber());
	ASSERT_TRUE(!new Fraction(-3, 2).isNaturalNumber());

	// Test getNumerator()
	ASSERT_EQ(2, new Fraction(2, 1).getNumerator());
	ASSERT_EQ(0, new Fraction(0, 1).getNumerator());
	ASSERT_EQ(-2, new Fraction(-2, 1).getNumerator());
	ASSERT_EQ(2, new Fraction(2, -2).getNumerator());
	ASSERT_EQ(0, new Fraction(0, -2).getNumerator());
	ASSERT_EQ(-2, new Fraction(-2, -2).getNumerator());

	// Test getDenominator()
	ASSERT_EQ(1, new Fraction(0).getDenominator());
	ASSERT_EQ(1, new Fraction(2).getDenominator());
	ASSERT_EQ(-2, new Fraction(0, -2).getDenominator());
	ASSERT_EQ(-2, new Fraction(-2, -2).getDenominator());

	// Test setNumerator()
	let b = new Fraction(1);
	b.setNumerator(0);
	ASSERT_EQ(0, b.getNumerator());
	b = new Fraction(2, 3);
	b.setNumerator(-2);
	ASSERT_EQ(-2, b.getNumerator());
	b = new Fraction(2, -3);
	b.setNumerator(2);
	ASSERT_EQ(2, b.getNumerator());

	// Test setDenominator()
	ASSERT_ANY_THROW(() => new Fraction(1).setDenominator(0));
	b = new Fraction(1);
	b.setDenominator(2);
	ASSERT_EQ(2, b.getDenominator());
	b = new Fraction(-2, 3);
	b.setDenominator(5);
	ASSERT_EQ(5, b.getDenominator());

	// Test setFraction()
	ASSERT_ANY_THROW(() => new Fraction(1).setFraction(1, 0));
	ASSERT_ANY_THROW(() => new Fraction(-2).setFraction(-3, 0));
	b = new Fraction(2);
	b.setFraction(1, 1);
	ASSERT_TRUE(new Fraction(1) === b);
	b = new Fraction(1);
	b.setFraction(-1, 2);
	ASSERT_TRUE(new Fraction(-1, 2) === b);
	b = new Fraction(0);
	b.setFraction(-6, 4);
	ASSERT_TRUE(new Fraction(-6, 4) === b);

	// Test computeGCD()
	ASSERT_EQ(5, Fraction.computeGCD(5, 10));
	ASSERT_EQ(1, Fraction.computeGCD(1, 1));
	ASSERT_EQ(1, Fraction.computeGCD(0, 1));
	ASSERT_EQ(3, Fraction.computeGCD(3, 0));
	ASSERT_EQ(1, Fraction.computeGCD(1, 0));
	ASSERT_EQ(1, Fraction.computeGCD(1, -1));

	// Test computeLCM
	ASSERT_EQ(10, Fraction.computeLCM(5, 2));
	ASSERT_EQ(1, Fraction.computeLCM(1, 1));
	ASSERT_EQ(0, Fraction.computeLCM(0, 0));
	ASSERT_EQ(0, Fraction.computeLCM(0, -1));
	ASSERT_EQ(0, Fraction.computeLCM(-1, 2));

	// Test reduce()
	let a = new Fraction(1);
	a.reduce();
	ASSERT_EQ(1, a.getNumerator());
	ASSERT_EQ(1, a.getDenominator());
	a = new Fraction(2, 2);
	a.reduce();
	ASSERT_EQ(1, a.getNumerator());
	ASSERT_EQ(1, a.getDenominator());
	a = new Fraction(-1);
	a.reduce();
	ASSERT_EQ(-1, a.getNumerator());
	ASSERT_EQ(1, a.getDenominator());
	a = new Fraction(-1, -1);
	a.reduce();
	ASSERT_EQ(1, a.getNumerator());
	ASSERT_EQ(1, a.getDenominator());
	a = new Fraction(2, -2);
	a.reduce();
	ASSERT_EQ(-1, a.getNumerator());
	ASSERT_EQ(1, a.getDenominator());
	a = new Fraction(-2, 2);
	a.reduce();
	ASSERT_EQ(-1, a.getNumerator());
	ASSERT_EQ(1, a.getDenominator());
	a = new Fraction(20, 6);
	a.reduce();
	ASSERT_EQ(10, a.getNumerator());
	ASSERT_EQ(3, a.getDenominator());
	a = new Fraction(-2, 6);
	a.reduce();
	ASSERT_EQ(-1, a.getNumerator());
	ASSERT_EQ(3, a.getDenominator());

	// Test *
	const one = new Fraction(1);
	const zero = new Fraction(0);
	const neg_one = new Fraction(-1);
	// ASSERT_TRUE(one === one * one);
	// ASSERT_TRUE(one === neg_one * neg_one);
	// ASSERT_TRUE(zero === zero * one);
	// ASSERT_TRUE(zero === zero * zero);
	// ASSERT_TRUE(zero === zero * neg_one);
	// ASSERT_TRUE(neg_one === one * neg_one);
	// ASSERT_TRUE(neg_one === neg_one * one);
	// ASSERT_TRUE(Fraction(10) === one * Fraction(20, 2));

	// ASSERT_TRUE(one === one * 1);
	// ASSERT_TRUE(one === one * 1);
	// ASSERT_TRUE(zero === zero * 1);
	// ASSERT_TRUE(zero === zero * 1);
	// ASSERT_TRUE(zero === zero * -1);
	// ASSERT_TRUE(zero === zero * -1);
	// ASSERT_TRUE(-1 === one * -1);
	// ASSERT_TRUE(-1 === neg_one * 1);
	// ASSERT_TRUE(new Fraction(10) === one * 10);
	// ASSERT_TRUE(new Fraction(10) === neg_one * -10);

	// // Test /
	// ASSERT_TRUE(one === one / one);
	// ASSERT_TRUE(zero === zero / one);
	// ASSERT_TRUE(zero === zero / neg_one);
	// ASSERT_TRUE(new Fraction(-0) === zero / neg_one);
	// ASSERT_ANY_THROW(() => one / zero);
	// ASSERT_TRUE(new Fraction(3, 2) === new Fraction(3) / new Fraction(2));
	// ASSERT_TRUE(new Fraction(2, -3) === new Fraction(2) / new Fraction(-3));

	// // Test -
	// ASSERT_TRUE(zero === one - one);
	// ASSERT_TRUE(neg_one === zero - one);
	// ASSERT_TRUE(one === zero - neg_one);
	// ASSERT_TRUE(zero === neg_one - neg_one);
	// ASSERT_TRUE(new Fraction(1, 2) === new Fraction(3, 2) - one);
	// ASSERT_TRUE(new Fraction(-1, 2) === new Fraction(-3, 2) - neg_one);

	// // Test +
	// ASSERT_TRUE(zero === neg_one + one);
	// ASSERT_TRUE(one === zero + one);
	// ASSERT_TRUE(one === (neg_one + one) + one);
	// ASSERT_TRUE(one === one + zero);
	// ASSERT_TRUE(new Fraction(-2) === neg_one + neg_one);
	// ASSERT_TRUE(new Fraction(1, 2) === new Fraction(-1, 2) + one);
	// ASSERT_TRUE(new Fraction(-3, 2) === neg_one + new Fraction(-1, 2));

	// // Test %
	// ASSERT_TRUE(new Fraction(1, 2) === new Fraction(3, 2) % one);
	// ASSERT_TRUE(new Fraction(-1, 2) === new Fraction(-1, 2) % one);
	// ASSERT_TRUE(new Fraction(3, 2) === new Fraction(7, 2) % new Fraction(2));
	// ASSERT_TRUE(new Fraction(-1, 2) === new Fraction(-3, 2) % one);
	// ASSERT_TRUE(new Fraction(-1, 2) === new Fraction(-3, 2) % neg_one);
	// ASSERT_TRUE(new Fraction(1, 2) === new Fraction(3, 2) % neg_one);
	// ASSERT_ANY_THROW(() => new Fraction(1, 2) % new Fraction(0));
	// ASSERT_ANY_THROW(() => new Fraction(-3, 2) % new Fraction(0, -2));

	// Test <
	ASSERT_TRUE(zero < one);
	ASSERT_TRUE(!(one < zero));
	ASSERT_TRUE(!(zero < zero));
	ASSERT_TRUE(!(one < one));
	ASSERT_TRUE(new Fraction(1, 2) < one);
	ASSERT_TRUE(new Fraction(-3, 2) < new Fraction(1, -2));
	ASSERT_TRUE(new Fraction(-1, 2) < new Fraction(3, 2));

	// Test >
	ASSERT_TRUE(one > zero);
	ASSERT_TRUE(!(zero > zero));
	ASSERT_TRUE(!(one > one));
	ASSERT_TRUE(!(zero > one));
	ASSERT_TRUE(one > new Fraction(1, 2));
	ASSERT_TRUE(new Fraction(1, -2) > new Fraction(-3, 2));
	ASSERT_TRUE(new Fraction(1, 2) > new Fraction(-3, 2));

	// Test <=
	ASSERT_TRUE(zero <= one);
	ASSERT_TRUE(!(one <= zero));
	ASSERT_TRUE(new Fraction(1, 2) <= one);
	ASSERT_TRUE(new Fraction(-3, 2) <= new Fraction(1, -2));
	ASSERT_TRUE(new Fraction(-1, 2) <= new Fraction(3, 2));
	ASSERT_TRUE(zero <= zero);
	ASSERT_TRUE(one <= one);
	ASSERT_TRUE(neg_one <= neg_one);
	ASSERT_TRUE(new Fraction(-7, 4) <= new Fraction(14, -8));

	// Test >=
	ASSERT_TRUE(one >= zero);
	ASSERT_TRUE(!(zero >= one));
	ASSERT_TRUE(one >= new Fraction(1, 2));
	ASSERT_TRUE(new Fraction(1, -2) >= new Fraction(-3, 2));
	ASSERT_TRUE(new Fraction(1, 2) >= new Fraction(-3, 2));
	ASSERT_TRUE(zero >= zero);
	ASSERT_TRUE(one >= one);
	ASSERT_TRUE(neg_one >= neg_one);
	ASSERT_TRUE(new Fraction(-7, 4) >= new Fraction(14, -8));

	// Test ==
	ASSERT_TRUE(one === one);
	ASSERT_TRUE(zero === zero);
	ASSERT_TRUE(!(one === zero));
	ASSERT_TRUE(new Fraction(1, 2) === new Fraction(2, 4));
	ASSERT_TRUE(new Fraction(-1, 2) === new Fraction(2, -4));
	ASSERT_TRUE(new Fraction(0, 1) === new Fraction(0, -1));
	ASSERT_TRUE(new Fraction(0, 1) === new Fraction(0, 2));

	// Test <<
	EXPECT_STREQ("3/4", new Fraction(3, 4).toString());
	EXPECT_STREQ("-1/2", new Fraction(-2, 4).toString());
	EXPECT_STREQ("0", new Fraction(0, 1).toString());
	EXPECT_STREQ("0", new Fraction(0, -1).toString());
	EXPECT_STREQ("-1/2", new Fraction(1, -2).toString());
	EXPECT_STREQ("3", new Fraction(3, 1).toString());
	EXPECT_STREQ("-3", new Fraction(-3, 1).toString());
	EXPECT_STREQ("3", new Fraction(6, 2).toString());
	EXPECT_STREQ("-3", new Fraction(6, -2).toString());
	EXPECT_STREQ("1", new Fraction(-1, -1).toString());
	EXPECT_STREQ("1", new Fraction(-2, -2).toString());

	// Test fromDouble()
	ASSERT_TRUE(one === Fraction.fromDouble(1.0));
	ASSERT_TRUE(zero === Fraction.fromDouble(0.0));
	ASSERT_TRUE(new Fraction(1, 2) === Fraction.fromDouble(0.5));
	ASSERT_TRUE(new Fraction(-1, 2) === Fraction.fromDouble(-0.5));
	ASSERT_TRUE(new Fraction(333, 1000) === Fraction.fromDouble(.333));
	ASSERT_TRUE(new Fraction(1, 3) === Fraction.fromDouble(.3333333));
	ASSERT_TRUE(new Fraction(1, -3) === Fraction.fromDouble(-.33333333));
	ASSERT_ANY_THROW(() => Fraction.fromDouble(tooLarge));
	ASSERT_ANY_THROW(() => Fraction.fromDouble(1.0 / (tooLarge)));
	ASSERT_ANY_THROW(() => Fraction.fromDouble(-tooLarge));
	ASSERT_ANY_THROW(() => Fraction.fromDouble(-1.0 / (tooLarge)));
	// ASSERT_ANY_THROW(() => Fraction.fromDouble(std.numeric_limits<double>.max()));
	// ASSERT_ANY_THROW(() => Fraction.fromDouble(std.numeric_limits<double>.min()));
	// ASSERT_ANY_THROW(() => Fraction.fromDouble(-std.numeric_limits<double>.max()));
	// ASSERT_ANY_THROW(() => Fraction.fromDouble(-std.numeric_limits<double>.min()));

	// Test toDouble()
	ASSERT_EQ(0.0, new Fraction(0).toDouble());
	ASSERT_EQ(0.0, new Fraction(-0).toDouble());
	ASSERT_EQ(0.0, new Fraction(0, 1).toDouble());
	ASSERT_EQ(0.5, new Fraction(1, 2).toDouble());
	ASSERT_EQ(-0.5, new Fraction(-1, 2).toDouble());
	ASSERT_EQ(-0.5, new Fraction(1, -2).toDouble());
	ASSERT_EQ(0.5, new Fraction(-1, -2).toDouble());

});
