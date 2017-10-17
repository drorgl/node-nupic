#ifndef _NUPIC_ENGINE_LINKPOLICYFACTORY_H_
#define _NUPIC_ENGINE_LINKPOLICYFACTORY_H_

#include "nupic/engine/LinkPolicyFactory.hpp"

#include "../nupic.h"

class LinkPolicyFactory : public overres::ObjectWrap {
public:
	static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

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

// /** @file
//  * Definition of the LinkPolicyFactory API
//  */

// #ifndef NTA_LINKPOLICY_FACTORY_HPP
// #define NTA_LINKPOLICY_FACTORY_HPP

// #include <string>

// namespace nupic
// {

//   class LinkPolicy;
//   class Link;
//   class Region;

//   class LinkPolicyFactory
//   {
//   public:

//     // LinkPolicyFactory is a lightweight object
//     LinkPolicyFactory() {};
//     ~LinkPolicyFactory() {};

//     // Create a LinkPolicy of a specific type; caller gets ownership.
//     LinkPolicy* createLinkPolicy(const std::string policyType,
//                                const std::string policyParams,
//                                Link* link);

//   private:

//   };

// } // namespace nupic

// #endif // NTA_LINKPOLICY_FACTORY_HPP
#endif