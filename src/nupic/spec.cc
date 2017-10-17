#include "spec.h"

//namespace input_general_callback {
//	std::shared_ptr<overload_resolution> overload;
//	NAN_METHOD(callback) {
//		if (overload == nullptr) {
//			throw std::runtime_error("input_callback is empty");
//		}
//		return overload->execute("input", info);
//	}
//}

void
Spec::Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload) {
	//input_general_callback::overload = overload;

	auto class_overload = overload->add_class("Spec");
	

}


