#include "nupic.h"


#include "nupic/input.h"

#include <tracer.h>

extern "C"{ 
void
init(Handle<Object> target) {
	//assert(false);
	tracer::Init(target);

	auto overload = std::make_shared<overload_resolution>();
	auto base_overload = overload->register_module(target);

	overload->add_type_alias("int", "Number");
	overload->add_type_alias("double", "Number");
	overload->add_type_alias("float", "Number");
	//Register

	input::Init(target, base_overload);

	//photo::Init(target, overload);

	//Init

	//IOArray::Init(target, overload);

	target->Set(Nan::New("version").ToLocalChecked(), Nan::New("1.0.0").ToLocalChecked());

	//validate type/overload registrations
	assert(overload->validate_type_registrations());
};
}

NODE_MODULE(nupic, init)
