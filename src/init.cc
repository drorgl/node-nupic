#include "nupic.h"


#include "nupic/bla.h"

#include <tracer.h>

extern "C"{ 
void
init(Handle<Object> target) {
	//assert(false);
	tracer::Init(target);

	auto overload = std::make_shared<overload_resolution>();

	overload->add_type_alias("int", "Number");
	overload->add_type_alias("double", "Number");
	overload->add_type_alias("float", "Number");
	//Register

	base::Init(target, overload);

	photo::Init(target, overload);

	//Init

	IOArray::Init(target, overload);

	target->Set(Nan::New("version").ToLocalChecked(), Nan::New("1.0.0").ToLocalChecked());

	//validate type/overload registrations
	assert(overload->validate_type_registrations());
};
}

NODE_MODULE(nupic, init)
