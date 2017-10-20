#ifndef _NUPIC_ALGORITHMS_TEMPORALMEMORY_H_
#define _NUPIC_ALGORITHMS_TEMPORALMEMORY_H_

#include "nupic/algorithms/TemporalMemory.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace algorithms {
		class TemporalMemory : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::algorithms::temporal_memory::TemporalMemory*, std::weak_ptr<TemporalMemory>> _temporal_memories;

			std::shared_ptr<nupic::algorithms::temporal_memory::TemporalMemory> _temporal_memory;


			static POLY_METHOD(New);
			static POLY_METHOD(New_dimensions);
			static POLY_METHOD(initialize);
			static POLY_METHOD(version);
			static POLY_METHOD(seed_);
			static POLY_METHOD(reset);
			static POLY_METHOD(activateCells);
			static POLY_METHOD(activateDendrites);
			static POLY_METHOD(compute);
			static POLY_METHOD(createSegment);
			static POLY_METHOD(cellsForColumn);
			static POLY_METHOD(numberOfCells);
			static POLY_METHOD(getActiveCells);
			static POLY_METHOD(getPredictiveCells);
			static POLY_METHOD(getWinnerCells);
			static POLY_METHOD(getActiveSegments);
			static POLY_METHOD(getMatchingSegments);
			static POLY_METHOD(getColumnDimensions);
			static POLY_METHOD(numberOfColumns);
			static POLY_METHOD(getCellsPerColumn);
			static POLY_METHOD(getActivationThreshold);
			static POLY_METHOD(setActivationThreshold);
			static POLY_METHOD(getInitialPermanence);
			static POLY_METHOD(setInitialPermanence);
			static POLY_METHOD(getConnectedPermanence);
			static POLY_METHOD(setConnectedPermanence);
			static POLY_METHOD(getMinThreshold);
			static POLY_METHOD(setMinThreshold);
			static POLY_METHOD(getMaxNewSynapseCount);
			static POLY_METHOD(setMaxNewSynapseCount);
			static POLY_METHOD(getCheckInputs);
			static POLY_METHOD(setCheckInputs);
			static POLY_METHOD(getPermanenceIncrement);
			static POLY_METHOD(setPermanenceIncrement);
			static POLY_METHOD(getPermanenceDecrement);
			static POLY_METHOD(setPermanenceDecrement);
			static POLY_METHOD(getPredictedSegmentDecrement);
			static POLY_METHOD(setPredictedSegmentDecrement);
			static POLY_METHOD(getMaxSegmentsPerCell);
			static POLY_METHOD(getMaxSynapsesPerSegment);
			static POLY_METHOD(_validateCell);
			static POLY_METHOD(save);
			static POLY_METHOD(load);
			static POLY_METHOD(persistentSize);
			static POLY_METHOD(op_Equals);
			static POLY_METHOD(op_NotEquals);
			static POLY_METHOD(printParameters);
			static POLY_METHOD(columnForCell);
			static POLY_METHOD(printState);
		};
	}
}

	

#endif