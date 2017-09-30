#ifndef _NODE_NUPIC_H_
#define _NODE_NUPIC_H_

#include <v8.h>
#include <node.h>
#include <node_object_wrap.h>
#include <node_version.h>
#include <node_buffer.h>
#include <string.h>
#include <nan.h>

#include "safecast.h"

#include "overload_resolution.h"

#include <unordered_map>

using namespace v8;



inline v8::Local<v8::Object> CreateNamedObject(v8::Handle<v8::Object> target, std::string objectName) {
	auto obj = Nan::New<v8::Object>();
	target->Set(Nan::New(objectName).ToLocalChecked(), obj);
	return obj;
}

inline void SetObjectProperty(v8::Local<v8::Object> obj, std::string propertyName, v8::Local<v8::Value> val) {
	obj->Set(Nan::New(propertyName).ToLocalChecked(), val);
}

inline void SetObjectProperty(v8::Local<v8::Object> obj, std::string propertyName, int val) {
	SetObjectProperty(obj, propertyName, Nan::New(val));
}

inline void SetObjectProperty(v8::Local<v8::Object> obj, std::string propertyName, std::string val) {
	SetObjectProperty(obj, propertyName, Nan::New(val).ToLocalChecked());
}



inline bool file_exists(const std::string& name) {
	std::ifstream f(name.c_str());
	return f.good();
}

inline std::string string_replace(std::string subject, const std::string& search, const std::string& replace) {
	size_t pos = 0;
	while ((pos = subject.find(search, pos)) != std::string::npos) {
		subject.replace(pos, search.length(), replace);
		pos += replace.length();
	}
	return subject;
}

#endif

