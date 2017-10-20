#ifndef _NUPIC_ALGORITHMS_SEGMENTUPDATE_H_
#define _NUPIC_ALGORITHMS_SEGMENTUPDATE_H_

//#include "nupic/algorithms/SegmentUpdate.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace algorithms {
		class SegmentUpdate : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			//static std::unordered_map<nupic::algorithms::Cells4::SegmentUpdate*, std::weak_ptr<SegmentUpdate>> _segment_updates;

			//std::shared_ptr<nupic::algorithms::Cells4::SegmentUpdate> _segment_update;

			static POLY_METHOD(New);
			static POLY_METHOD(New_cell);
			static POLY_METHOD(isSequenceSegment);
			static POLY_METHOD(cellIdx);
			static POLY_METHOD(segIdx);
			static POLY_METHOD(timeStamp);
			//static POLY_METHOD([idx:number]: UInt;	);
			static POLY_METHOD(size);
			static POLY_METHOD(empty);
			static POLY_METHOD(isNewSegment);
			static POLY_METHOD(isPhase1Segment);
			static POLY_METHOD(isWeaklyPredicting);
			static POLY_METHOD(invariants);
			static POLY_METHOD(save);
			static POLY_METHOD(load);
			static POLY_METHOD(print);
		};
	}
}


	//new(): SegmentUpdate;
	//new(
	//	cellIdx: UInt, segIdx: UInt,
	//	sequenceSegment: bool, timeStamp: UInt,
	//	synapses?: UInt[]/* = Array<UInt>()*/,
	//	phase1Flag?: bool/* = false*/,
	//	weaklyPredicting?: bool /*= false*/,
	//	cells?: Cells4[] /*=nullptr*/): SegmentUpdate;
	//// SegmentUpdate& operator=(const SegmentUpdate& o)

	//isSequenceSegment(): bool;
	//cellIdx(): UInt;
	//segIdx(): UInt;
	//timeStamp(): UInt;
	//[idx: number]: UInt;
	//size(): UInt;
	//empty(): bool;
	//isNewSegment(): bool;
	//isPhase1Segment(): bool;
	//isWeaklyPredicting(): bool;
	//invariants(cells?: Cells4[]/* =nullptr*/): bool;
	//// void save(std::ostream& outStream) const
	//// void load(std::istream& inStream)
	//// void print(std::ostream& outStream, bool longFormat =false,
	////           UInt nCellsPerCol = 0) const
#endif