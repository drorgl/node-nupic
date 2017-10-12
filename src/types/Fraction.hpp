#ifndef _NUPIC_TYPES_FRACTION_H_
#define _NUPIC_TYPES_FRACTION_H_

#include "../nupic.h"


#include "nupic/types/Fraction.hpp"

class Fraction : public overres::ObjectWrap {
public:
	static void Init(Handle<Object> target, std::shared_ptr<namespace_wrap> overload);

	/*static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::algorithms::ArrayBuffer*, std::weak_ptr<Input>> _inputs;

	std::shared_ptr<nupic::Input> _input;

	static POLY_METHOD(New);
	static POLY_METHOD(compute);*/
};

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
import { bool, double, int, size_t, uint } from "../types/Types";

// #ifndef NTA_FRACTION_HPP
// #define NTA_FRACTION_HPP

// #include <ostream>

// namespace nupic
// {

export interface Fraction_Static {
	new(_numerator: int, _denominator: int): Fraction;
	new(_numerator: int): Fraction;
	new(): Fraction;
	fromDouble(value: double, tolerance?: uint /*= 10000*/): Fraction;
	computeGCD(a: int, b: int): uint;
	computeLCM(a: int, b: int): uint;

}

export interface Fraction {
	//   private:
	//     int numerator_, denominator_;
	//     // arbitrary cutoff -- need to fix overflow handling. 64-bits everywhere?
	//     const static int overflowCutoff = 10000000;

	//   public:

	isNaturalNumber(): bool;

	getNumerator(): int;
	getDenominator(): int;

	setNumerator(_numerator: int): void;
	setDenominator(_denominator: int): void;
	setFraction(_numerator: int, _denominator: int): void;

	reduce(): void;

	// Fraction operator*(const Fraction& rhs);
	// Fraction operator*(const int rhs);
	// friend Fraction operator/(const Fraction& lhs, const Fraction& rhs);
	// friend Fraction operator-(const Fraction& lhs, const Fraction& rhs);
	// Fraction operator+(const Fraction& rhs);
	// Fraction operator%(const Fraction& rhs);
	// bool operator<(const Fraction& rhs);
	// bool operator>(const Fraction& rhs);
	// bool operator<=(const Fraction& rhs);
	// bool operator>=(const Fraction& rhs);
	// friend bool operator==(Fraction lhs, Fraction rhs);
	// friend std::ostream& operator<<(std::ostream& out, Fraction rhs);

	toDouble(): double;
	toString(): string; // << operator!
}

export let Fraction: Fraction_Static = nupic_module.x;
// }

// #endif //NTA_FRACTION_HPP
#endif