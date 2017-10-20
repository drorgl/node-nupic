#ifndef _NUPIC_ALGORITHMS_INSYNAPSE_H_
#define _NUPIC_ALGORITHMS_INSYNAPSE_H_


#include "nupic/algorithms/InSynapse.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace algorithms {
		class InSynapse : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::algorithms::Cells4::InSynapse*, std::weak_ptr<InSynapse>> _insynapses;

			std::shared_ptr<nupic::algorithms::Cells4::InSynapse> _insynapse;


			static POLY_METHOD(New);
			static POLY_METHOD(New_srcid);
			static POLY_METHOD(op_Equals);
			static POLY_METHOD(srcCellIdx);
			static POLY_METHOD(permanence);
			static POLY_METHOD(print);
		};
	}
}
		//new(): InSynapse;
		//new(srcCellIdx: UInt, permanence: Real): InSynapse;
		//// inline InSynapse& operator=(const InSynapse& o)
		//srcCellIdx(): UInt;
		//permanence(): Real;
		//permanence(): Real;
		//// inline void print(std::ostream& outStream) const;
#endif