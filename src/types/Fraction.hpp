#ifndef _NUPIC_TYPES_FRACTION_H_
#define _NUPIC_TYPES_FRACTION_H_

#include "nupic/types/Fraction.hpp"

#include "../nupic.h"

class Fraction : public overres::ObjectWrap {
public:
	static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::Fraction*, std::weak_ptr<Fraction>> _fractions;

	std::shared_ptr<nupic::Fraction> _fraction;


	static POLY_METHOD(New							);
	static POLY_METHOD(New_numerator				);
	static POLY_METHOD(New_numerator_denominator	);
	static POLY_METHOD(fromDouble					);
	static POLY_METHOD(computeGCD					);
	static POLY_METHOD(computeLCM					);
	static POLY_METHOD(isNaturalNumber				);
	static POLY_METHOD(getNumerator					);
	static POLY_METHOD(getDenominator				);
	static POLY_METHOD(setNumerator					);
	static POLY_METHOD(setDenominator				);
	static POLY_METHOD(setFraction					);
	static POLY_METHOD(reduce						);
	static POLY_METHOD(op_Multiply					);
	static POLY_METHOD(op_Divide					);
	static POLY_METHOD(op_Subtract					);
	static POLY_METHOD(op_Add						);
	static POLY_METHOD(op_Modulo					);
	static POLY_METHOD(op_LessThan					);
	static POLY_METHOD(op_GreaterThan				);
	static POLY_METHOD(op_LessThanOrEqual			);
	static POLY_METHOD(op_GreaterThanOrEqual		);
	static POLY_METHOD(op_Equals					);
	static POLY_METHOD(toDouble						);
	static POLY_METHOD(toString						);
		};
#endif