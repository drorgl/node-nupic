#ifndef _NUPIC_ALGORITHMS_SEGMENT_H_
#define _NUPIC_ALGORITHMS_SEGMENT_H_

#include "nupic/algorithms/Segment.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace algorithms {
		class Segment : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::algorithms::Cells4::Segment*, std::weak_ptr<Segment>> _segments;

			std::shared_ptr<nupic::algorithms::Cells4::Segment> _segment;


			static POLY_METHOD(New);
			static POLY_METHOD(New_detail);
			static POLY_METHOD(atDutyCycleTier);
			static POLY_METHOD(invariants);
			static POLY_METHOD(checkConnected);
			static POLY_METHOD(empty);
			static POLY_METHOD(size);
			static POLY_METHOD(isSequenceSegment);
			static POLY_METHOD(frequency);
			static POLY_METHOD(getFrequency);
			static POLY_METHOD(nConnected);
			static POLY_METHOD(getTotalActivations);
			static POLY_METHOD(getPositiveActivations);
			static POLY_METHOD(getLastActiveIteration);
			static POLY_METHOD(getLastPosDutyCycle);
			static POLY_METHOD(getLastPosDutyCycleIteration);
			static POLY_METHOD(has);
			static POLY_METHOD(setPermanence);
			static POLY_METHOD(getPermanence);
			static POLY_METHOD(getSrcCellIdx);
			static POLY_METHOD(getSrcCellIndices);
			static POLY_METHOD(clear);
			//static POLY_METHOD([idx:number]: InSynapse;			);
			static POLY_METHOD(addSynapses);
			static POLY_METHOD(recomputeConnected);
			static POLY_METHOD(decaySynapses2);
			static POLY_METHOD(decaySynapses);
			static POLY_METHOD(freeNSynapses);
			static POLY_METHOD(isActive);
			static POLY_METHOD(computeActivity);
			static POLY_METHOD(dutyCycle);
			static POLY_METHOD(persistentSize);
			static POLY_METHOD(save);
			static POLY_METHOD(load);


		};
	}
}
//
//interface CState_Static {
//	new(): CState;
//	// CState& operator=(const CState& o)
//}
//export interface CState { // : Serializable<CStateProto>
//	initialize(nCells: UInt): bool;
//	usePythonMemory(pData: Buffer, nCells: UInt): void;
//	isSet(cellIdx: UInt): boolean;
//	set(cellIdx: UInt): void;
//	resetAll(): void;
//	arrayPtr(): Buffer;
//	// print( outStream:std::ostream) :void;
//	// using Serializable::write;
//	// virtual void write(CStateProto::Builder& proto) const override
//	// using Serializable::read;
//	// virtual void read(CStateProto::Reader& proto) override
//	// load(std::istream& inStream):void
//	version(): UInt;
//}
///**
// * Add an index to CState so that we can find all On cells without
// * a sequential search of the entire array.
// */
//interface CStateIndexed_Static {
//	new(): CStateIndexed;
//
//	// CStateIndexed& operator=(CStateIndexed& o)
//
//}
//
//export interface CStateIndexed extends CState {
//
//	// static const VERSION = 1;
//
//	cellsOn(fSorted?: bool/* = false*/): UInt[];
//
//	set(cellIdx: UInt): void;
//
//	resetAll(): void;
//
//	// void print(std::ostream& outStream) const
//
//	// void write(CStateProto::Builder& proto) const override
//
//	// void read(CStateProto::Reader& proto) override
//
//	// void load(std::istream& inStream)
//
//	version(): UInt;
//
//}
//
//// These are iteration count tiers used when computing segment duty cycle
//const _numTiers = 9;
//const _dutyCycleTiers = [0, 100, 320, 1000,
//	3200, 10000, 32000, 100000,
//	320000];
//
//// This is the alpha used in each tier. dutyCycleAlphas[n] is used when
///// iterationIdx > dutyCycleTiers[n]
//const _dutyCycleAlphas = [0.0, 0.0032, 0.0010, 0.00032,
//	0.00010, 0.000032, 0.000010, 0.0000032,
//	0.0000010];
//export type InSynapses = InSynapse[];

#endif