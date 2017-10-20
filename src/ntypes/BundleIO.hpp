#ifndef _NUPIC_NTYPES_BUNDLEIO_H_
#define _NUPIC_NTYPES_BUNDLEIO_H_

#include "nupic/ntypes/BundleIO.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace ntypes {

		class BundleIO : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::BundleIO*, std::weak_ptr<BundleIO>> _bundleIOs;

			std::shared_ptr<nupic::BundleIO> _bundleio;

			static POLY_METHOD(New);
			static POLY_METHOD(getOutputStream);
			static POLY_METHOD(getInputStream);
			static POLY_METHOD(getPath);
		};
	}
}

	
#endif