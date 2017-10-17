#ifndef _NUPIC_ALGORITHMS_SPATIALPOOLER_H_
#define _NUPIC_ALGORITHMS_SPATIALPOOLER_H_

#include "nupic/algorithms/SpatialPooler.hpp"

#include "../nupic.h"

class SpatialPooler : public overres::ObjectWrap {
public:
	static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

	static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::algorithms::spatial_pooler::SpatialPooler*, std::weak_ptr<SpatialPooler>> _spatial_poolers;

	std::shared_ptr<nupic::algorithms::spatial_pooler::SpatialPooler> _spatial_pooler;


	static POLY_METHOD(New								);
	static POLY_METHOD(New_dimensions					);
	static POLY_METHOD(updateDutyCyclesHelper_			);
	static POLY_METHOD(initialize						);
	static POLY_METHOD(compute							);
	static POLY_METHOD(stripUnlearnedColumns			);
	static POLY_METHOD(version							);
	static POLY_METHOD(save								);
	static POLY_METHOD(load								);
	static POLY_METHOD(persistentSize					);
	static POLY_METHOD(getColumnDimensions				);
	static POLY_METHOD(getInputDimensions				);
	static POLY_METHOD(getNumColumns					);
	static POLY_METHOD(getNumInputs						);
	static POLY_METHOD(getPotentialRadius				);
	static POLY_METHOD(setPotentialRadius				);
	static POLY_METHOD(getPotentialPct					);
	static POLY_METHOD(setPotentialPct					);
	static POLY_METHOD(getGlobalInhibition				);
	static POLY_METHOD(setGlobalInhibition				);
	static POLY_METHOD(getNumActiveColumnsPerInhArea	);
	static POLY_METHOD(setNumActiveColumnsPerInhArea	);
	static POLY_METHOD(getLocalAreaDensity				);
	static POLY_METHOD(setLocalAreaDensity				);
	static POLY_METHOD(getStimulusThreshold				);
	static POLY_METHOD(setStimulusThreshold				);
	static POLY_METHOD(getInhibitionRadius				);
	static POLY_METHOD(setInhibitionRadius				);
	static POLY_METHOD(getDutyCyclePeriod				);
	static POLY_METHOD(setDutyCyclePeriod				);
	static POLY_METHOD(getBoostStrength					);
	static POLY_METHOD(setBoostStrength					);
	static POLY_METHOD(getIterationNum					);
	static POLY_METHOD(setIterationNum					);
	static POLY_METHOD(getIterationLearnNum				);
	static POLY_METHOD(setIterationLearnNum				);
	static POLY_METHOD(getSpVerbosity					);
	static POLY_METHOD(setSpVerbosity					);
	static POLY_METHOD(getWrapAround					);
	static POLY_METHOD(setWrapAround					);
	static POLY_METHOD(getUpdatePeriod					);
	static POLY_METHOD(setUpdatePeriod					);
	static POLY_METHOD(getSynPermTrimThreshold			);
	static POLY_METHOD(setSynPermTrimThreshold			);
	static POLY_METHOD(getSynPermActiveInc				);
	static POLY_METHOD(setSynPermActiveInc				);
	static POLY_METHOD(getSynPermInactiveDec			);
	static POLY_METHOD(setSynPermInactiveDec			);
	static POLY_METHOD(getSynPermBelowStimulusInc		);
	static POLY_METHOD(setSynPermBelowStimulusInc		);
	static POLY_METHOD(getSynPermConnected				);
	static POLY_METHOD(setSynPermConnected				);
	static POLY_METHOD(getSynPermMax					);
	static POLY_METHOD(setSynPermMax					);
	static POLY_METHOD(getMinPctOverlapDutyCycles		);
	static POLY_METHOD(setMinPctOverlapDutyCycles		);
	static POLY_METHOD(getBoostFactors					);
	static POLY_METHOD(setBoostFactors					);
	static POLY_METHOD(getOverlapDutyCycles				);
	static POLY_METHOD(setOverlapDutyCycles				);
	static POLY_METHOD(getActiveDutyCycles				);
	static POLY_METHOD(setActiveDutyCycles				);
	static POLY_METHOD(getMinOverlapDutyCycles			);
	static POLY_METHOD(setMinOverlapDutyCycles			);
	static POLY_METHOD(getPotential						);
	static POLY_METHOD(setPotential						);
	static POLY_METHOD(getPermanence					);
	static POLY_METHOD(setPermanence					);
	static POLY_METHOD(getConnectedSynapses				);
	static POLY_METHOD(getConnectedCounts				);
	static POLY_METHOD(printParameters					);
	static POLY_METHOD(getOverlaps						);
	static POLY_METHOD(getBoostedOverlaps				);
	static POLY_METHOD(toDense_							);
	static POLY_METHOD(boostOverlaps_					);
	static POLY_METHOD(mapColumn_						);
	static POLY_METHOD(mapPotential_					);
	static POLY_METHOD(initPermConnected_				);
	static POLY_METHOD(initPermNonConnected_			);
	static POLY_METHOD(initPermanence_					);
	static POLY_METHOD(clip_							);
	static POLY_METHOD(updatePermanencesForColumn_		);
	static POLY_METHOD(countConnected_					);
	static POLY_METHOD(raisePermanencesToThreshold_		);
	static POLY_METHOD(calculateOverlap_				);
	static POLY_METHOD(calculateOverlapPct_				);
	static POLY_METHOD(isWinner_						);
	static POLY_METHOD(addToWinners_					);
	static POLY_METHOD(inhibitColumns_					);
	static POLY_METHOD(inhibitColumnsGlobal_			);
	static POLY_METHOD(inhibitColumnsLocal_				);
	static POLY_METHOD(adaptSynapses_					);
	static POLY_METHOD(bumpUpWeakColumns_				);
	static POLY_METHOD(updateInhibitionRadius_			);
	static POLY_METHOD(avgColumnsPerInput_				);
	static POLY_METHOD(avgConnectedSpanForColumn1D_		);
	static POLY_METHOD(avgConnectedSpanForColumn2D_		);
	static POLY_METHOD(avgConnectedSpanForColumnND_		);
	static POLY_METHOD(updateMinDutyCycles_				);
	static POLY_METHOD(updateMinDutyCyclesGlobal_		);
	static POLY_METHOD(updateMinDutyCyclesLocal_		);
	static POLY_METHOD(updateDutyCycles_				);
	static POLY_METHOD(updateBoostFactors_				);
	static POLY_METHOD(updateBoostFactorsLocal_			);
	static POLY_METHOD(updateBoostFactorsGlobal_		);
	static POLY_METHOD(updateBookeepingVars_			);
	static POLY_METHOD(isUpdateRound_					);
	static POLY_METHOD(seed_							);
	static POLY_METHOD(printState						);
};

		//new(): SpatialPooler;
		//new(
		//	inputDimensions: UInt[],
		//	columnDimensions: UInt[],
		//	potentialRadius?: UInt/*=16*/,
		//	potentialPct?: Real/*=0.5*/,
		//	globalInhibition?: bool/*=true*/,
		//	localAreaDensity?: Real/*=-1.0*/,
		//	numActiveColumnsPerInhArea?: UInt/*=10*/,
		//	stimulusThreshold?: UInt/*=0*/,
		//	synPermInactiveDec?: Real/*=0.008*/,
		//	synPermActiveInc?: Real/*=0.05*/,
		//	synPermConnected?: Real/*=0.1*/,
		//	minPctOverlapDutyCycles?: Real/*=0.001*/,
		//	dutyCyclePeriod?: UInt/*=1000*/,
		//	boostStrength?: Real/*=0.0*/,
		//	seed?: Int/*=1*/,
		//	spVerbosity?: UInt/*=0*/,
		//	wrapAround?: bool/*=true*/): SpatialPooler;

		//updateDutyCyclesHelper_(
		//	dutyCycles: Real[],
		//	newValues: UInt[],
		//	period: UInt): void;

		//initialize(
		//	inputDimensions: UInt[],
		//	columnDimensions: UInt[],
		//	potentialRadius?: UInt/*=16*/,
		//	potentialPct?: Real/*=0.5*/,
		//	globalInhibition?: bool/*=true*/,
		//	localAreaDensity?: Real/*=-1.0*/,
		//	numActiveColumnsPerInhArea?: UInt/*=10*/,
		//	stimulusThreshold?: UInt/*=0*/,
		//	synPermInactiveDec?: Real/*=0.01*/,
		//	synPermActiveInc?: Real/*=0.1*/,
		//	synPermConnected?: Real/*=0.1*/,
		//	minPctOverlapDutyCycles?: Real/*=0.001*/,
		//	dutyCyclePeriod?: UInt/*=1000*/,
		//	boostStrength?: Real/*=0.0*/,
		//	seed?: Int/*=1*/,
		//	spVerbosity?: UInt/*=0*/,
		//	wrapAround?: bool/*=true*/): void;

	
		//compute(
		//	inputVector: UInt[], learn: bool,
		//	activeVector: UInt[]): void;

		//stripUnlearnedColumns(activeArray: UInt[]): void;
		//version(): UInt;
		//save(): Buffer;
		//load(state: Buffer): void;
		//persistentSize(): UInt;
		//getColumnDimensions(): UInt[];
		//getInputDimensions(): UInt[];
		//getNumColumns(): UInt;
		//getNumInputs(): UInt;
		//getPotentialRadius(): UInt;
		//setPotentialRadius(potentialRadius: UInt): void;
		//getPotentialPct(): Real;
		//setPotentialPct(potentialPct: Real): void;
		//getGlobalInhibition(): bool;
		//setGlobalInhibition(globalInhibition: bool): void;
		//getNumActiveColumnsPerInhArea(): Int;
		//setNumActiveColumnsPerInhArea(numActiveColumnsPerInhArea: UInt): void;
		//getLocalAreaDensity(): Real;
		//setLocalAreaDensity(localAreaDensity: Real): void;
		//getStimulusThreshold(): UInt;
		//setStimulusThreshold(stimulusThreshold: UInt): void;
		//getInhibitionRadius(): UInt;
		//setInhibitionRadius(inhibitionRadius: UInt): void;
		//getDutyCyclePeriod(): UInt;
		//setDutyCyclePeriod(dutyCyclePeriod: UInt): void;
		//getBoostStrength(): Real;
		//setBoostStrength(boostStrength: Real): void;
		//getIterationNum(): UInt;
		//setIterationNum(iterationNum: UInt): void;
		//getIterationLearnNum(): UInt;
		//setIterationLearnNum(iterationLearnNum: UInt): void;
		//getSpVerbosity(): UInt;
		//setSpVerbosity(spVerbosity: UInt): void;
		//getWrapAround(): bool;
		//setWrapAround(wrapAround: bool): void;
		//getUpdatePeriod(): UInt;
		//setUpdatePeriod(updatePeriod: UInt): void;
		//getSynPermTrimThreshold(): Real;
		//setSynPermTrimThreshold(synPermTrimThreshold: Real): void;
		//getSynPermActiveInc(): Real;
		//setSynPermActiveInc(synPermActiveInc: Real): void;
		//getSynPermInactiveDec(): Real;
		//setSynPermInactiveDec(synPermInactiveDec: Real): void;
		//getSynPermBelowStimulusInc(): Real;
		//setSynPermBelowStimulusInc(synPermBelowStimulusInc: Real): void;
		//getSynPermConnected(): Real;
		//setSynPermConnected(synPermConnected: Real): void;
		//getSynPermMax(): Real;
		//setSynPermMax(synPermMax: Real): void;
		//getMinPctOverlapDutyCycles(): Real;
		//setMinPctOverlapDutyCycles(minPctOverlapDutyCycles: Real): void;
		//getBoostFactors(boostFactors: Real[]): void;
		//setBoostFactors(boostFactors: Real[]): void;
		//getOverlapDutyCycles(overlapDutyCycles: Real[]): void;
		//setOverlapDutyCycles(overlapDutyCycles: Real[]): void;
		//getActiveDutyCycles(activeDutyCycles: Real[]): void;
		//setActiveDutyCycles(activeDutyCycles: Real[]): void;
		//getMinOverlapDutyCycles(minOverlapDutyCycles: Real[]): void;
		//setMinOverlapDutyCycles(minOverlapDutyCycles: Real[]): void;
		//getPotential(column: UInt, potential: UInt[]): void;
		//setPotential( column: UInt,  potential: UInt[]): void;
		//getPermanence(column: UInt, permanence: Real[]): void;
		//setPermanence(column: UInt, permanence: Real[]): void;
		//getConnectedSynapses(column: UInt, connectedSynapses: UInt[]): void;
		//getConnectedCounts(connectedCounts: UInt[]): void;
		//printParameters(): void;
		//getOverlaps(): UInt[];
		//getBoostedOverlaps(): Real[];
		//toDense_(
		//	sparse: UInt[],
		//	dense: UInt[],
		//	n: UInt): void;
		//boostOverlaps_(
		//	overlaps: UInt[],
		//	boostedOverlaps: Real[]): void;
		//mapColumn_(column: UInt): UInt;
		//mapPotential_(column: UInt, wrapAround: bool): UInt[];
		//initPermConnected_(): Real;
		//initPermNonConnected_(): Real;
		//initPermanence_(
		//	potential: UInt[],
		//	connectedPct: Real): Real[];
		//clip_(perm: Real[], trim: bool): void;
		//updatePermanencesForColumn_(
		//	perm: Real[], column: UInt,
		//	raisePerm?: bool/*=true*/): void;
		//countConnected_(perm: Real[]): UInt;
		//raisePermanencesToThreshold_(
		//	perm: Real[],
		//	potential: UInt[]): UInt;
		//calculateOverlap_(
		//	inputVector: UInt[],
		//	overlap: UInt[]): void;
		//calculateOverlapPct_(
		//	overlaps: UInt[],
		//	overlapPct: Real[]): void;
		//isWinner_(
		//	score: Real, winners: Array<pair<UInt, Real>>,
		//	numWinners: UInt): bool;
		//addToWinners_(
		//	index: UInt, score: Real,
		//	winners: Array<pair<UInt, Real>>): void;
		//inhibitColumns_(
		//	overlaps: Real[],
		//	activeColumns: UInt[]): void;
		//inhibitColumnsGlobal_(
		//	overlaps: Real[],
		//	density: Real,
		//	activeColumns: UInt[]): void;
		//inhibitColumnsLocal_(
		//	overlaps: Real[],
		//	density: Real,
		//	activeColumns: UInt[]): void;
		//adaptSynapses_(
		//	inputVector: UInt[],
		//	activeColumns: UInt[]): void;
		//bumpUpWeakColumns_(): void;
		//updateInhibitionRadius_(): void;
		//avgColumnsPerInput_(): Real;
		//avgConnectedSpanForColumn1D_(column: UInt): Real;
		//avgConnectedSpanForColumn2D_(column: UInt): Real;
		//avgConnectedSpanForColumnND_(column: UInt): Real;
		//updateMinDutyCycles_(): void;
		//updateMinDutyCyclesGlobal_(): void;
		//updateMinDutyCyclesLocal_(): void;
		//updateDutyCycles_(
		//	overlaps: UInt[],
		//	activeArray: UInt[]): void;
		//updateBoostFactors_(): void;
		//updateBoostFactorsLocal_(): void;
		//updateBoostFactorsGlobal_(): void;
		//updateBookeepingVars_(learn: bool): void;
		//isUpdateRound_(): bool;
		//seed_(seed: UInt64): void;
		//printState(state: UInt[]): void;
#endif