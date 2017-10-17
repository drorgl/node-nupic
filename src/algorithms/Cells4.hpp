#ifndef _NUPIC_ALGORITHMS_CELL4_H_
#define _NUPIC_ALGORITHMS_CELL4_H_

#include "nupic/algorithms/Cells4.hpp"

#include "../nupic.h"

class Cells4 : public overres::ObjectWrap {
public:
	static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::algorithms::Cells4::Cells4*, std::weak_ptr<Cells4>> _inputs;

	std::shared_ptr<nupic::algorithms::Cells4::Cells4> _cells4;

	static POLY_METHOD(New);
	static POLY_METHOD(_generateListsOfSynapsesToAdjustForAdaptSegment);
	static POLY_METHOD(initialize);
	static POLY_METHOD(version);
	static POLY_METHOD(setStatePointers);
	static POLY_METHOD(getStatePointers);
	static POLY_METHOD(getLearnStatePointers);
	static POLY_METHOD(nSegments);
	static POLY_METHOD(nCells);
	static POLY_METHOD(nColumns);
	static POLY_METHOD(nCellsPerCol);
	static POLY_METHOD(getMinThreshold);
	static POLY_METHOD(getPermConnected);
	static POLY_METHOD(getVerbosity);
	static POLY_METHOD(getMaxAge);
	static POLY_METHOD(getPamLength);
	static POLY_METHOD(getMaxInfBacktrack);
	static POLY_METHOD(getMaxLrnBacktrack);
	static POLY_METHOD(getPamCounter);
	static POLY_METHOD(getMaxSeqLength);
	static POLY_METHOD(getAvgLearnedSeqLength);
	static POLY_METHOD(getNLrnIterations);
	static POLY_METHOD(getMaxSegmentsPerCell);
	static POLY_METHOD(getMaxSynapsesPerSegment);
	static POLY_METHOD(getCheckSynapseConsistency);
	static POLY_METHOD(setMaxInfBacktrack);
	static POLY_METHOD(setMaxLrnBacktrack);
	static POLY_METHOD(setVerbosity);
	static POLY_METHOD(setMaxAge);
	static POLY_METHOD(setMaxSeqLength);
	static POLY_METHOD(setCheckSynapseConsistency);
	static POLY_METHOD(setMaxSegmentsPerCell);
	static POLY_METHOD(setMaxSynapsesPerCell);
	static POLY_METHOD(nSegmentsOnCell);
	static POLY_METHOD(nSynapses);
	static POLY_METHOD(__nSegmentsOnCell);
	static POLY_METHOD(nSynapsesInCell);
	static POLY_METHOD(getCell);
	static POLY_METHOD(getCellIdx);
	static POLY_METHOD(getSegment);
	static POLY_METHOD(segment);
	static POLY_METHOD(compute);
	static POLY_METHOD(reset);
	static POLY_METHOD(isActive);
	static POLY_METHOD(getBestMatchingCellT);
	static POLY_METHOD(getBestMatchingCellT1);
	static POLY_METHOD(computeForwardPropagation);
	static POLY_METHOD(updateInferenceState);
	static POLY_METHOD(inferPhase1);
	static POLY_METHOD(inferPhase2);
	static POLY_METHOD(inferBacktrack);
	static POLY_METHOD(updateLearningState);
	static POLY_METHOD(learnPhase1);
	static POLY_METHOD(learnPhase2);
	static POLY_METHOD(learnBacktrack);
	static POLY_METHOD(learnBacktrackFrom);
	static POLY_METHOD(_updateAvgLearnedSeqLength);
	static POLY_METHOD(chooseCellsToLearnFrom);
	static POLY_METHOD(getCellForNewSegment);
	static POLY_METHOD(computeUpdate);
	static POLY_METHOD(addOutSynapses);
	static POLY_METHOD(eraseOutSynapses);
	static POLY_METHOD(processSegmentUpdates);
	static POLY_METHOD(applyGlobalDecay);
	static POLY_METHOD(adaptSegment);
	static POLY_METHOD(trimSegments);
	static POLY_METHOD(persistentSize);
	static POLY_METHOD(write);
	static POLY_METHOD(read);
	static POLY_METHOD(saveToFile);
	static POLY_METHOD(loadFromFile);
	static POLY_METHOD(save);
	static POLY_METHOD(load);
	static POLY_METHOD(print);
	static POLY_METHOD(setCellSegmentOrder);
	static POLY_METHOD(addNewSegment);
	static POLY_METHOD(updateSegment);
	static POLY_METHOD(_rebalance);
	static POLY_METHOD(rebuildOutSynapses);
	static POLY_METHOD(trimOldSegments);
	static POLY_METHOD(printStates);
	static POLY_METHOD(printState);
	static POLY_METHOD(dumpPrevPatterns);
	static POLY_METHOD(dumpSegmentUpdates);
	static POLY_METHOD(getNonEmptySegList);
	static POLY_METHOD(dumpTiming);
	static POLY_METHOD(resetTimers);
	static POLY_METHOD(invariants);
	static POLY_METHOD(stats);
};
//
//const _MAX_CELLS = 1 << 18;      // power of 2 allows efficient array indexing
//const _MAX_SEGS = 1 << 7;      // power of 2 allows efficient array indexing
//
//	new(
//		nColumns?: UInt/* =0*/, nCellsPerCol?: UInt/* =0*/,
//		activationThreshold?: UInt/* =1*/,
//		minThreshold?: UInt/* =1*/,
//		newSynapseCount?: UInt/* =1*/,
//		segUpdateValidDuration?: UInt/* =1*/,
//		permInitial?: Real/* =.5*/,
//		permConnected?: Real/* =.8*/,
//		permMax?: Real/* =1*/,
//		permDec?: Real/* =.1*/,
//		permInc?: Real/* =.1*/,
//		globalDecay?: Real/* =0*/,
//		doPooling?: bool/* =false*/,
//		seed?: int/* =-1*/,
//		initFromCpp?: bool /* =false*/,
//		checkSynapseConsistency?: bool/* =false*/): Cells4;
//
//	_generateListsOfSynapsesToAdjustForAdaptSegment(
//		segment: Segment,
//		synapsesSet: Set< UInt> | UInt[],
//		inactiveSrcCellIdxs: UInt[],
//		inactiveSynapseIdxs: UInt[],
//		activeSrcCellIdxs: UInt[],
//		activeSynapseIdxs: UInt[]): void;
//
//
//	initialize(
//		nColumns?: UInt/* =0*/, nCellsPerCol?: UInt/* =0*/,
//		activationThreshold?: UInt/* =1*/,
//		minThreshold?: UInt/* =1*/,
//		newSynapseCount?: UInt/* =1*/,
//		segUpdateValidDuration?: UInt/* =1*/,
//		permInitial?: Real/* =.5*/,
//		permConnected?: Real/* =.8*/,
//		permMax?: Real/* =1*/,
//		permDec?: Real/* =.1*/,
//		permInc?: Real/* =.1*/,
//		globalDecay?: Real/* =.1*/,
//		doPooling?: bool/* =false*/,
//		initFromCpp?: bool/* =false*/,
//		checkSynapseConsistency?: bool/* =false*/): void;
//
//	version(): UInt;
//
//	//  setStatePointers( infActiveT: Buffer, infActiveT1: Buffer,
//	//             infPredT: Buffer,  infPredT1: Buffer,
//	//            Real* colConfidenceT, Real* colConfidenceT1,
//	//            Real* cellConfidenceT, Real* cellConfidenceT1):void;
//
//	//  getStatePointers(Byte*& activeT, Byte*& activeT1,
//	//                              Byte*& predT, Byte*& predT1,
//	//                              Real*& colConfidenceT, Real*& colConfidenceT1,
//	//                              Real*& confidenceT, Real*& confidenceT1) :void;
//
//	
//	// getLearnStatePointers(Byte * & activeT, Byte * & activeT1,
//	// 	                     Byte * & predT, Byte * & predT1): void;
//
//	nSegments(): UInt;
//	nCells(): UInt;
//	nColumns(): UInt;
//	nCellsPerCol(): UInt;
//	getMinThreshold(): UInt;
//	getPermConnected(): Real;
//	getVerbosity(): UInt;
//	getMaxAge(): UInt;
//	getPamLength(): UInt;
//	getMaxInfBacktrack(): UInt;
//	getMaxLrnBacktrack(): UInt;
//	getPamCounter(): UInt;
//	getMaxSeqLength(): UInt;
//	getAvgLearnedSeqLength(): Real;
//	getNLrnIterations(): UInt;
//	getMaxSegmentsPerCell(): Int;
//	getMaxSynapsesPerSegment(): Int;
//	getCheckSynapseConsistency(): bool;
//
//	setMaxInfBacktrack(t: UInt): void;
//	setMaxLrnBacktrack(t: UInt): void;
//	setVerbosity(v: UInt): void;
//	setMaxAge(a: UInt): void;
//	setMaxSeqLength(v: UInt): void;
//	setCheckSynapseConsistency(val: bool): void;
//
//	setMaxSegmentsPerCell(maxSegs: int): void;
//
//	setMaxSynapsesPerCell(maxSyns: int): void;
//	nSegmentsOnCell(colIdx: UInt, cellIdxInCol: UInt): UInt;
//	nSynapses(): UInt;
//	__nSegmentsOnCell(cellIdx: UInt): UInt;
//	nSynapsesInCell(cellIdx: UInt): UInt;
//	getCell(colIdx: UInt, cellIdxInCol: UInt): Cell;
//	getCellIdx(colIdx: UInt, cellIdxInCol: UInt): UInt;
//	getSegment(colIdx: UInt, cellIdxInCol: UInt, segIdx: UInt): Segment;
//	segment(cellIdx: UInt, segIdx: UInt): Segment;
//	compute(input: Real[], output: Real[], doInference: bool, doLearning: bool): void;
//	reset(): void;
//	isActive(cellIdx: UInt, segIdx: UInt, state: CState): bool;
//	// getBestMatchingCellT( colIdx:UInt,  state: CState,  minThreshold:UInt):std::pair<UInt, UInt>;
//	// getBestMatchingCellT1( colIdx:UInt,  state: CState,  minThreshold:UInt):std::pair<UInt, UInt>;
//	computeForwardPropagation(state: CStateIndexed): void;
//	computeForwardPropagation(state: CState): void;
//	updateInferenceState(activeColumns: UInt[]): void;
//	inferPhase1(activeColumns: UInt[], useStartCells: bool): bool;
//	inferPhase2(): bool;
//	inferBacktrack(activeColumns: UInt[]): void;
//	updateLearningState(
//		activeColumns: UInt[],
//		input: Real[]): void;
//	learnPhase1(activeColumns: UInt[], readOnly: bool): bool;
//	learnPhase2(readOnly: bool): void;
//	learnBacktrack(): UInt;
//	learnBacktrackFrom(startOffset: UInt, readOnly: bool): bool;
//	_updateAvgLearnedSeqLength(prevSeqLength: UInt): void;
//	chooseCellsToLearnFrom(
//		cellIdx: UInt, segIdx: UInt,
//		nSynToAdd: UInt, state: CStateIndexed, srcCells: UInt[]): void;
//	getCellForNewSegment(colIdx: UInt): UInt;
//	computeUpdate(
//		cellIdx: UInt, segIdx: UInt, activeState: CStateIndexed,
//		sequenceSegmentFlag: bool, newSynapsesFlag: bool): bool;
//	// template <typename It>
//	//   void addOutSynapses(UInt dstCellIdx, UInt dstSegIdx,
//	//                       It newSynapse,
//	//                       It newSynapsesEnd);
//	eraseOutSynapses(
//		dstCellIdx: UInt, dstSegIdx: UInt,
//		srcCells: UInt[]): void;
//	processSegmentUpdates(input: Real[], predictedState: CState): void;
//	applyGlobalDecay(): void;
//	adaptSegment( update: SegmentUpdate): void;
//	trimSegments( minPermanence: Real,  minNumSyns: UInt): pair<UInt, UInt>;
//	persistentSize(): UInt;
//	// virtual void write(Cells4Proto::Builder& proto) const override;
//	// virtual void read(Cells4Proto::Reader& proto) override;
//	saveToFile(filePath: string): void;
//	loadFromFile(filePath: string): void;
//	// void save(std::ostream& outStream) const;
//	// void load(std::istream& inStream);
//	// void print(std::ostream& outStream) const;
//	setCellSegmentOrder(matchPythonOrder: bool): void;
//	addNewSegment(
//		colIdx: UInt, cellIdxInCol: UInt,
//		sequenceSegmentFlag: bool,
//		extSynapses: pair< UInt, UInt >  ): void;
//	updateSegment(
//		colIdx: UInt, cellIdxInCol: UInt, segIdx: UInt,
//		extSynapses: pair < UInt, UInt >  ): void;
//	_rebalance(): void;
//	rebuildOutSynapses(): void;
//	trimOldSegments(age: UInt): void;
//	printStates(): void;
//	printState(state: UInt[]): void;
//	// dumpPrevPatterns(patterns: std: : deque as UInt[] ): void;
//	dumpSegmentUpdates(): void;
//	getNonEmptySegList(colIdx: UInt, cellIdxInCol: UInt): UInt[];
//	dumpTiming(): void;
//	resetTimers(): void;
//	invariants(verbose?: bool/* = false*/): bool;
//	stats(): void;
#endif