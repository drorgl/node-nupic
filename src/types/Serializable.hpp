#ifndef _NUPIC_TYPES_SERIALIZABLE_H_
#define _NUPIC_TYPES_SERIALIZABLE_H_

#include "nupic/types/Serializable.hpp"

#include "../nupic.h"


namespace node_nupic {
	namespace types {
		class Serializable : public overres::ObjectWrap {
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
//  * Copyright (C) 2015, Numenta, Inc.  Unless you have an agreement
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
//  * ----------------------------------------------------------------------
//  */

// /** @file
//  * Definitions for the base Serializable class in C++
//  */

// #ifndef NTA_serializable_HPP
// #define NTA_serializable_HPP

// #include <iostream>

// #include <capnp/message.h>
// #include <capnp/serialize.h>
// #include <kj/std/iostream.h>

// namespace nupic {

//   /**
//    * Base Serializable class that any serializable class
//    * should inherit from.
//    */
//   template <class ProtoT>
//   class Serializable {
//     public:
//       void write(std::ostream& stream) const
//       {
//         capnp::MallocMessageBuilder message;
//         typename ProtoT::Builder proto = message.initRoot<ProtoT>();
//         write(proto);

//         kj::std::StdOutputStream out(stream);
//         capnp::writeMessage(out, message);
//       }

//       void read(std::istream& stream)
//       {
//         kj::std::StdInputStream in(stream);

//         capnp::InputStreamMessageReader message(in);
//         typename ProtoT::Reader proto = message.getRoot<ProtoT>();
//         read(proto);
//       }

//       virtual void write(typename ProtoT::Builder& proto) const = 0;
//       virtual void read(typename ProtoT::Reader& proto) = 0;

//       virtual ~Serializable() {}
//   };

// } // end namespace nupic
// #endif // NTA_serializable_HPP
#endif