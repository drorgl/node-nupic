#ifndef _NUPIC_ALGORITHMS_CONNECTIONS_H_
#define _NUPIC_ALGORITHMS_CONNECTIONS_H_

//#include "nupic/algorithms/Connections.hpp"

#include "../nupic.h"

namespace nupic {
	namespace algorithms {
		namespace connections {
			class Connections;
		}
	}
}

namespace node_nupic {

	class Connections : public overres::ObjectWrap {
	public:
		static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

		static Nan::Persistent<v8::FunctionTemplate> constructor;
		virtual v8::Local<v8::Function> get_constructor();

		static std::unordered_map<nupic::algorithms::connections::Connections*, std::weak_ptr<Connections>> _inputs;

		std::shared_ptr<nupic::algorithms::connections::Connections> _input;


		static POLY_METHOD(New);
		static POLY_METHOD(New_numCells);
		static POLY_METHOD(initialize);
		static POLY_METHOD(createSegment);
		static POLY_METHOD(createSynapse);
		static POLY_METHOD(destroySegment);
		static POLY_METHOD(destroySynapse);
		static POLY_METHOD(updateSynapsePermanence);
		static POLY_METHOD(segmentsForCell);
		static POLY_METHOD(synapsesForSegment);
		static POLY_METHOD(cellForSegment);
		static POLY_METHOD(idxOnCellForSegment);
		static POLY_METHOD(mapSegmentsToCells);
		static POLY_METHOD(segmentForSynapse);
		static POLY_METHOD(dataForSegment);
		static POLY_METHOD(dataForSynapse);
		static POLY_METHOD(getSegment);
		static POLY_METHOD(segmentFlatListLength);
		static POLY_METHOD(compareSegments);
		static POLY_METHOD(synapsesForPresynapticCell);
		static POLY_METHOD(computeActivity_cells);
		static POLY_METHOD(computeActivity_cell);
		static POLY_METHOD(save);
		static POLY_METHOD(load);
		static POLY_METHOD(numCells);
		static POLY_METHOD(numSegments);
		static POLY_METHOD(numSegments_cell);
		static POLY_METHOD(numSynapses);
		static POLY_METHOD(numSynapses_segments);
		static POLY_METHOD(op_Equals);
		static POLY_METHOD(op_NotEquals);
		static POLY_METHOD(subscribe);
		static POLY_METHOD(unsubscribe);

	};
}

	//export interface Synapse {
	//	flatIdx: UInt32;
	//}

	//
	//export interface SynapseData {
	//	presynapticCell: CellIdx;
	//	permanence: Permanence;
	//	segment: Segment;
	//}

	//export interface SegmentData {
	//	synapses: Synapse[];
	//	cell: CellIdx;
	//}

	//interface CellData {
	//	segments: Segment[];
	//}

	//export interface ConnectionsEventHandler {
	//	/**
 //        * Called after a segment is created.
 //        */
	//	onCreateSegment(segment: Segment): void;

	//	/**
 //        * Called before a segment is destroyed.
 //        */
	//	onDestroySegment(segment: Segment): void;

	//	/**
 //        * Called after a synapse is created.
 //        */
	//	onCreateSynapse(synapse: Synapse): void;

	//	/**
 //        * Called before a synapse is destroyed.
 //        */
	//	onDestroySynapse(synapse: Synapse): void;

	//	/**
 //        * Called before a synapse's permanence is changed.
 //        */
	//	onUpdateSynapsePermanence(
	//		synapse: Synapse,
	//		permanence: Permanence): void;
	//}


		//new(): Connections;
		//new(numCells: CellIdx): Connections;
		//// static const VERSION = 2;
		//initialize(numCells: CellIdx): void;
		//createSegment(cell: CellIdx): Segment;
		//createSynapse(
		//	segment: Segment,
		//	presynapticCell: CellIdx,
		//	permanence: Permanence): Synapse;
		//destroySegment(segment: Segment): void;
		//destroySynapse(synapse: Synapse): void;
		//updateSynapsePermanence(
		//	synapse: Synapse,
		//	permanence: Permanence): void;
		//segmentsForCell(cell: CellIdx): Segment[];
		//synapsesForSegment(segment: Segment): Synapse[];
		//cellForSegment(segment: Segment): CellIdx;
		//idxOnCellForSegment(segment: Segment): SegmentIdx;
		//mapSegmentsToCells(segments: Segment[]): CellIdx[];
		//segmentForSynapse(synapse: Synapse): Segment;
		//dataForSegment(segment: Segment): SegmentData;
		//dataForSynapse(synapse: Synapse): SynapseData;
		//getSegment(cell: CellIdx, idx: SegmentIdx): Segment;
		//segmentFlatListLength(): UInt32;
		//compareSegments(a: Segment, b: Segment): bool;
		//synapsesForPresynapticCell(presynapticCell: CellIdx): Synapse[];
		//computeActivity(
		//	numActiveConnectedSynapsesForSegment: UInt32[],
		//	numActivePotentialSynapsesForSegment: UInt32[],
		//	activePresynapticCells: CellIdx[],
		//	connectedPermanence: Permanence): void;
		//computeActivity(
		//	numActiveConnectedSynapsesForSegment: UInt32[],
		//	numActivePotentialSynapsesForSegment: UInt32[] ,
		//	activePresynapticCell: CellIdx,
		//	connectedPermanence: Permanence): void;
		//save(): Buffer;
		//load(state: Buffer): void;
		//numCells(): CellIdx;
		//numSegments(): UInt;
		//numSegments(cell: CellIdx): UInt;
		//numSynapses(): UInt;
		//numSynapses(segment: Segment): UInt;

		//// bool operator==(const Connections &other) const;
		//// bool operator!=(const Connections &other) const;
		//subscribe(handler: ConnectionsEventHandler): UInt32;
		//unsubscribe(token: UInt32): void;

#endif