#ifndef _NUPIC_MATH_FUNCTIONS_H_
#define _NUPIC_MATH_FUNCTIONS_H_

//#include "nupic/math/Functions.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace math {

		class Functions : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			/*static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::algorithms::ArrayBuffer*, std::weak_ptr<Input>> _inputs;

			std::shared_ptr<nupic::Input> _input;

			static POLY_METHOD(New);
			static POLY_METHOD(compute);*/
		};
	}
}


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

// /** @file
//  * Declarations for math functions
//  */

// #ifndef NTA_MATH_FUNCTIONS_HPP
// #define NTA_MATH_FUNCTIONS_HPP

// #include <nupic/utils/Log.hpp> // For NTA_ASSERT

// #include <cmath>
// // #include <boost/math/special_functions/gamma.hpp>
// // #include <boost/math/special_functions/digamma.hpp>
// // #include <boost/math/special_functions/beta.hpp>
// // #include <boost/math/special_functions/erf.hpp>

// namespace nupic {

//   // TODO: replace other functions by boost/math

//   static const double pi  =  3.14159265358979311600e+00;

//   //--------------------------------------------------------------------------------
//   template <typename T>
//   inline T lgamma(T x)
//   {
//     return boost::math::lgamma(x);
//   }

//   //--------------------------------------------------------------------------------
//   template <typename T>
//   inline T digamma(T x)
//   {
//     return boost::math::digamma(x);
//   }

//   //--------------------------------------------------------------------------------
//   template <typename T>
//   inline T beta(T x, T y)
//   {
//     return boost::math::beta(x, y);
//   }

//   //--------------------------------------------------------------------------------
//   template <typename T>
//   inline T erf(T x)
//   {
//     return boost::math::erf(x);
//   }

//   //--------------------------------------------------------------------------------
//   double fact(unsigned long n)
//   {
//     static double a[171];
//     static bool init = true;

//     if (init) {
//       init = false;
//       a[0] = 1.0;
//       for (size_t i = 1; i != 171; ++i)
// 	a[i] = i * a[i-1];
//     }

//     if (n < 171)
//       return a[n];
//     else
//       return exp(lgamma(n+1.0));
//   }

//   //--------------------------------------------------------------------------------
//   double lfact(unsigned long n)
//   {
//     static double a[2000];
//     static bool init = true;

//     if (init) {
//       for (size_t i = 0; i != 2000; ++i)
// 	a[i] = lgamma(i+1.0);
//     }

//     if (n < 2000)
//       return a[n];
//     else
//       return lgamma(n+1.0);
//   }

//   //--------------------------------------------------------------------------------
//   double binomial(unsigned long n, unsigned long k)
//   {
//     {
//       NTA_ASSERT(k <= n)
// 	<< "binomial: Wrong arguments: n= " << n << " k= " << k;
//     }

//     if (n < 171)
//       return floor(0.5 + fact(n) / (fact(k) * fact(n-k)));
//     else
//       return floor(0.5 + exp(lfact(n) - lfact(k) - lfact(n-k)));
//   }

//   //--------------------------------------------------------------------------------
// };

// #endif //NTA_MATH_FUNCTIONS_HPP
#endif