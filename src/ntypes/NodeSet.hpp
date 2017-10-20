#ifndef _NUPIC_NTYPES_NODESET_H_
#define _NUPIC_NTYPES_NODESET_H_

#include "nupic/ntypes/NodeSet.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace ntypes {

		class NodeSet : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::NodeSet*, std::weak_ptr<NodeSet>> _nodesets;

			std::shared_ptr<nupic::NodeSet> _nodeset;

			static POLY_METHOD(New);
			static POLY_METHOD(allOn);
			static POLY_METHOD(allOff);
			static POLY_METHOD(add);
			static POLY_METHOD(remove);
		};
	}
}

	
#endif