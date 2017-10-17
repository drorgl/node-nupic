#include "nupic.h"

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
NuPIC::Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload) {
	//input_general_callback::overload = overload;

	auto namespace_overload = overload->add_namespace("NuPIC");
	//auto class_overload = overload->add_class("Input");
	
	/**
	* Initialize NuPIC.
	*
	* @note It's safe to reinitialize an initialized NuPIC.
	* @note Creating a Network will auto-initialize NuPIC.
	*/
	//static void init();
	namespace_overload->add_overload("init", {}, init);

	/**
	* Shutdown NuPIC.
	*
	* @note As a safety measure, NuPIC with any Network still registered to it
	* is not allowed to be shut down.
	*/
	//static void shutdown();
	namespace_overload->add_overload("shutdown", {}, shutdown);

	/**
	*
	* @return Whether NuPIC is initialized successfully.
	*/
	//static bool isInitialized();
	namespace_overload->add_overload("isInitialized", {}, isInitialized);

}


POLY_METHOD(NuPIC::init) {
	nupic::NuPIC::init();
}
POLY_METHOD(NuPIC::shutdown) {
	nupic::NuPIC::shutdown();

}
POLY_METHOD(NuPIC::isInitialized) {
	auto result = nupic::NuPIC::isInitialized();
	info.SetReturnValue(result);
}

