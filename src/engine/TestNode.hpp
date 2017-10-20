#ifndef _NUPIC_ENGINE_TESTNODE_H_
#define _NUPIC_ENGINE_TESTNODE_H_

#include "nupic/engine/TestNode.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace engine {

		class TestNode : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::TestNode*, std::weak_ptr<TestNode>> _test_nodes;

			std::shared_ptr<nupic::TestNode> _test_node;


			static POLY_METHOD(New_valueMap);
			static POLY_METHOD(New_bundleIO);
			static POLY_METHOD(New_proto);
			static POLY_METHOD(createSpec);
			static POLY_METHOD(getNodeType);
			static POLY_METHOD(compute);
			static POLY_METHOD(executeCommand);
			static POLY_METHOD(getNodeOutputElementCount);
			static POLY_METHOD(getParameterFromBuffer);
			static POLY_METHOD(setParameterFromBuffer);
			static POLY_METHOD(initialize);
			static POLY_METHOD(serialize);
			static POLY_METHOD(deserialize);
			static POLY_METHOD(write);
			static POLY_METHOD(read);
			static POLY_METHOD(getParameterArrayCount);
			static POLY_METHOD(getParameterReal64);
			static POLY_METHOD(setParameterReal64);
			static POLY_METHOD(isParameterShared);
		};
	}
}
	
#endif