#ifndef _NUPIC_ENGINE_YAMLUTILS_H_
#define _NUPIC_ENGINE_YAMLUTILS_H_

#include "../nupic.h"


#include "nupic/engine/YAMLUtils.hpp"

class YAMLUtils : public overres::ObjectWrap {
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
// #ifndef NTA_YAML_HPP
// #define NTA_YAML_HPP

// #include <nupic/types/Types.hpp>
// #include <nupic/ntypes/Value.hpp>
// #include <nupic/ntypes/Collection.hpp>
// #include <nupic/engine/Spec.hpp>

// namespace nupic
// {

//   namespace YAMLUtils
//   {
//     /*
//      * For converting default values
//      */
//     Value toValue(const std::string& yamlstring, NTA_BasicType dataType);

//     /*
//      * For converting param specs for Regions and LinkPolicies
//      */
//     ValueMap toValueMap(
//       const char* yamlstring,
//       Collection<ParameterSpec>& parameters,
//       const std::string & nodeType = "",
//       const std::string & regionName = ""
//       );

//   } // namespace YAMLUtils
// } // namespace nupic

// #endif //  NTA_YAML_HPP
#endif