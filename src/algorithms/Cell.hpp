#ifndef _NUPIC_ALGORITHMS_CELL_H_
#define _NUPIC_ALGORITHMS_CELL_H_

#include "nupic/algorithms/Cell.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace algorithms {
		class Cell : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::algorithms::Cells4::Cell*, std::weak_ptr<Cell>> _inputs;

			std::shared_ptr<nupic::algorithms::Cells4::Cell> _cell;

			static POLY_METHOD(New);
			static POLY_METHOD(empty);
			static POLY_METHOD(nSynapses);
			static POLY_METHOD(size);
			static POLY_METHOD(nSegments);
			static POLY_METHOD(getNonEmptySegList);
			//static POLY_METHOD(//[segIdx: number]: Segment;		);//indexer
			static POLY_METHOD(getSegment);
			static POLY_METHOD(getFreeSegment);
			static POLY_METHOD(setSegmentOrder);
			static POLY_METHOD(updateDutyCycle);
			static POLY_METHOD(rebalanceSegments);
			static POLY_METHOD(getMostActiveSegment);
			static POLY_METHOD(releaseSegment);
			static POLY_METHOD(invariants);
			static POLY_METHOD(persistentSize);
			static POLY_METHOD(save);
			static POLY_METHOD(load);

		};
	}
}

	//new(): Cell;
	//empty(): bool;
	//nSynapses(): UInt;
	//size(): UInt;
	//nSegments(): UInt;
	//getNonEmptySegList(): UInt[];
	//[segIdx: number]: Segment;
	//getSegment(segIdx: UInt): Segment;
	//getFreeSegment(
	//	synapses: InSynapses,
	//	initFrequency: Real,
	//	sequenceSegmentFlag: bool,
	//	permConnected: Real,
	//	iteration: UInt): UInt;
	//setSegmentOrder(matchPythonOrder: bool): void;
	//updateDutyCycle(iterations: UInt): void;
	//rebalanceSegments(): void;
	//getMostActiveSegment(): UInt;
	//releaseSegment( segIdx: UInt): void;
	//invariants(cells?: Cells4 /*=nullptr*/): bool;
	//persistentSize(): UInt;
	//  void save(std::ostream& outStream) const;
	//  void load(std::istream& inStream);
#endif