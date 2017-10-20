#ifndef _NUPIC_OS_TIMER_H_
#define _NUPIC_OS_TIMER_H_

#include "nupic/os/Timer.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace os {
		class Timer : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::Timer*, std::weak_ptr<Timer>> _timers;

			std::shared_ptr<nupic::Timer> _timer;

			static POLY_METHOD(New);
			static POLY_METHOD(start);
			static POLY_METHOD(stop);
			static POLY_METHOD(getElapsed);
			static POLY_METHOD(reset);
			static POLY_METHOD(getStartCount);
			static POLY_METHOD(isStarted);
			static POLY_METHOD(toString);

		};
	}
}


#endif