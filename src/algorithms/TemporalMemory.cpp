/* ---------------------------------------------------------------------
 * Numenta Platform for Intelligent Computing (NuPIC)
 * Copyright (C) 2013-2016, Numenta, Inc.  Unless you have an agreement
 * with Numenta, Inc., for a separate license for this software code, the
 * following terms and conditions apply:
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero Public License for more details.
 *
 * You should have received a copy of the GNU Affero Public License
 * along with this program.  If not, see http://www.gnu.org/licenses.
 *
 * http://numenta.org/licenses/
 * ----------------------------------------------------------------------
 */

/** @file
 * Definitions for the Temporal Memory in C++
 */

// #ifndef NTA_TEMPORAL_MEMORY_HPP
// #define NTA_TEMPORAL_MEMORY_HPP

import nupic_module from "../bindings";

import { bool, Int, Real, Real32, size_t , UInt, UInt32, UInt64} from "../types/Types";
import {Segment} from "./Segment";

import {connections} from "./Connections";
import Connections = connections.Connections;

export type Permanence = Real32;

// #include <vector>
// #include <nupic/types/Serializable.hpp>
// #include <nupic/types/Types.hpp>
// #include <nupic/utils/Random.hpp>
// #include <nupic/algorithms/Connections.hpp>

// #include <nupic/proto/TemporalMemoryProto.capnp.h>

// using namespace std;
// using namespace nupic;
// using namespace nupic::algorithms::connections;

// namespace nupic {
//   namespace algorithms {
export namespace temporal_memory {
	export type  CellIdx = UInt32;
	/**
	 * Temporal Memory implementation in C++.
	 *
	 * Example usage:
	 *
	 *     SpatialPooler sp(inputDimensions, columnDimensions, <parameters>);
	 *     TemporalMemory tm(columnDimensions, <parameters>);
	 *
	 *     while (true) {
	 *        <get input vector, streaming spatiotemporal information>
	 *        sp.compute(inputVector, learn, activeColumns)
	 *        tm.compute(number of activeColumns, activeColumns, learn)
	 *        <do something with the tm, e.g. classify tm.getActiveCells()>
	 *     }
	 *
	 * The public API uses C arrays, not std::vectors, as inputs. C arrays are
	 * a good lowest common denominator. You can get a C array from a vector,
	 * but you can't get a vector from a C array without copying it. This is
	 * important, for example, when using numpy arrays. The only way to
	 * convert a numpy array into a std::vector is to copy it, but you can
	 * access a numpy array's internal C array directly.
	 */
	export interface TemporalMemory_Static {
		new(): TemporalMemory;

		/**
		 * Initialize the temporal memory (TM) using the given parameters.
		 *
		 * @param columnDimensions
		 * Dimensions of the column space
		 *
		 * @param cellsPerColumn
		 * Number of cells per column
		 *
		 * @param activationThreshold
		 * If the number of active connected synapses on a segment is at least
		 * this threshold, the segment is said to be active.
		 *
		 * @param initialPermanence
		 * Initial permanence of a new synapse.
		 *
		 * @param connectedPermanence
		 * If the permanence value for a synapse is greater than this value, it
		 * is said to be connected.
		 *
		 * @param minThreshold
		 * If the number of potential synapses active on a segment is at least
		 * this threshold, it is said to be "matching" and is eligible for
		 * learning.
		 *
		 * @param maxNewSynapseCount
		 * The maximum number of synapses added to a segment during learning.
		 *
		 * @param permanenceIncrement
		 * Amount by which permanences of synapses are incremented during
		 * learning.
		 *
		 * @param permanenceDecrement
		 * Amount by which permanences of synapses are decremented during
		 * learning.
		 *
		 * @param predictedSegmentDecrement
		 * Amount by which segments are punished for incorrect predictions.
		 *
		 * @param seed
		 * Seed for the random number generator.
		 *
		 * @param maxSegmentsPerCell
		 * The maximum number of segments per cell.
		 *
		 * @param maxSynapsesPerSegment
		 * The maximum number of synapses per segment.
		 *
		 * @param checkInputs
		 * Whether to check that the activeColumns are sorted without
		 * duplicates. Disable this for a small speed boost.
		 *
		 * Notes:
		 *
		 * predictedSegmentDecrement: A good value is just a bit larger than
		 * (the column-level sparsity * permanenceIncrement). So, if column-level
		 * sparsity is 2% and permanenceIncrement is 0.01, this parameter should be
		 * something like 4% * 0.01 = 0.0004).
		 */
		new(
			columnDimensions: UInt[],
			cellsPerColumn?: UInt/* = 32*/,
			activationThreshold?: UInt/* = 13*/,
			initialPermanence?: Permanence/* = 0.21*/,
			connectedPermanence?: Permanence/* = 0.50*/,
			minThreshold?: UInt/* = 10*/,
			maxNewSynapseCount?: UInt/* = 20*/,
			permanenceIncrement?: Permanence/* = 0.10*/,
			permanenceDecrement?: Permanence/* = 0.10*/,
			predictedSegmentDecrement?: Permanence/* = 0.0*/,
			seed?: Int/* = 42*/,
			maxSegmentsPerCell?: UInt/*=255*/,
			maxSynapsesPerSegment?: UInt/*=255*/,
			checkInputs?: boolean/* = true*/): TemporalMemory;

		// virtual ~TemporalMemory();
	}

	export interface TemporalMemory {// : public Serializable<TemporalMemoryProto> {
		// public:
		connections: Connections;

		initialize(
			columnDimensions?: UInt[] /* = { 2048 }*/,
			cellsPerColumn?: UInt/* = 32*/,
			activationThreshold?: UInt/* = 13*/,
			initialPermanence?: Permanence/* = 0.21*/,
			connectedPermanence?: Permanence/* = 0.50*/,
			minThreshold?: UInt/* = 10*/,
			maxNewSynapseCount?: UInt/* = 20*/,
			permanenceIncrement?: Permanence/* = 0.10*/,
			permanenceDecrement?: Permanence/* = 0.10*/,
			predictedSegmentDecrement?: Permanence/* = 0.0*/,
			seed?: Int/* = 42*/,
			maxSegmentsPerCell?: UInt/*=255*/,
			maxSynapsesPerSegment?: UInt/*=255*/,
			checkInputs?: boolean/*=true*/): void;

		// ----------------------------------------------------------------------
		//  Main functions
		// ----------------------------------------------------------------------

		/**
		 * Get the version number of for the TM implementation.
		 *
		 * @returns Integer version number.
		 */
		version(): UInt;

		/**
		 * This *only* updates _rng to a new Random using seed.
		 *
		 * @returns Integer version number.
		 */
		seed_(seed: UInt64): void;

		/**
		 * Indicates the start of a new sequence.
		 * Resets sequence state of the TM.
		 */
		reset(): void;

		/**
		 * Calculate the active cells, using the current active columns and
		 * dendrite segments. Grow and reinforce synapses.
		 *
		 * @param activeColumnsSize
		 * Size of activeColumns.
		 *
		 * @param activeColumns
		 * A sorted list of active column indices.
		 *
		 * @param learn
		 * If true, reinforce / punish / grow synapses.
		 */
		activateCells(
			activeColumnsSize: size_t,
			activeColumns: UInt[],
			learn?: boolean/* = true*/): void;

		/**
		 * Calculate dendrite segment activity, using the current active cells.
		 *
		 * @param learn
		 * If true, segment activations will be recorded. This information is
		 * used during segment cleanup.
		 */
		activateDendrites(learn?: boolean/* = true*/): void;

		/**
		 * Perform one time step of the Temporal Memory algorithm.
		 *
		 * This method calls activateCells, then calls activateDendrites. Using
		 * the TemporalMemory via its compute method ensures that you'll always
		 * be able to call getPredictiveCells to get predictions for the next
		 * time step.
		 *
		 * @param activeColumnsSize
		 * Number of active columns.
		 *
		 * @param activeColumns
		 * Sorted list of indices of active columns.
		 *
		 * @param learn
		 * Whether or not learning is enabled.
		 */
		compute(
			activeColumnsSize: size_t,
			activeColumns: UInt[],
			learn?: boolean/* = true*/): void;

		// ==============================
		//  Helper functions
		// ==============================

		/**
		 * Create a segment on the specified cell. This method calls
		 * createSegment on the underlying connections, and it does some extra
		 * bookkeeping. Unit tests should call this method, and not
		 * connections.createSegment().
		 *
		 * @param cell
		 * Cell to add a segment to.
		 *
		 * @return Segment
		 * The created segment.
		 */
		createSegment(cell: CellIdx): Segment;

		/**
		 * Returns the indices of cells that belong to a column.
		 *
		 * @param column Column index
		 *
		 * @return (Array<CellIdx>) Cell indices
		 */
		cellsForColumn(column: Int): CellIdx[];

		/**
		 * Returns the number of cells in this layer.
		 *
		 * @return (int) Number of cells
		 */
		numberOfCells(): UInt;

		/**
		* Returns the indices of the active cells.
		*
		* @returns (std::Array<CellIdx>) Vector of indices of active cells.
		*/
		getActiveCells(): CellIdx[];

		/**
		* Returns the indices of the predictive cells.
		*
		* @returns (std::Array<CellIdx>) Vector of indices of predictive cells.
		*/
		getPredictiveCells(): CellIdx[];

		/**
		* Returns the indices of the winner cells.
		*
		* @returns (std::Array<CellIdx>) Vector of indices of winner cells.
		*/
		getWinnerCells(): CellIdx[];

		getActiveSegments(): Segment[];
		getMatchingSegments(): Segment[];

		/**
		 * Returns the dimensions of the columns in the region.
		 *
		 * @returns Integer number of column dimension
		 */
		getColumnDimensions(): UInt[];

		/**
		 * Returns the total number of columns.
		 *
		 * @returns Integer number of column numbers
		 */
		numberOfColumns(): UInt;

		/**
		 * Returns the number of cells per column.
		 *
		 * @returns Integer number of cells per column
		 */
		getCellsPerColumn(): UInt;

		/**
		 * Returns the activation threshold.
		 *
		 * @returns Integer number of the activation threshold
		 */
		getActivationThreshold(): UInt;
		setActivationThreshold(threshold: UInt): void;

		/**
		 * Returns the initial permanence.
		 *
		 * @returns Initial permanence
		 */
		getInitialPermanence(): Permanence;
		setInitialPermanence(initial: Permanence): void;

		/**
		 * Returns the connected permanance.
		 *
		 * @returns Returns the connected permanance
		 */
		getConnectedPermanence(): Permanence;
		setConnectedPermanence(connected: Permanence): void;

		/**
		 * Returns the minimum threshold.
		 *
		 * @returns Integer number of minimum threshold
		 */
		getMinThreshold(): UInt;
		setMinThreshold(min_threshold: UInt): void;

		/**
		 * Returns the maximum number of synapses that can be added to a segment
		 * in a single time step.
		 *
		 * @returns Integer number of maximum new synapse count
		 */
		getMaxNewSynapseCount(): UInt;
		setMaxNewSynapseCount(new_synapse_count: UInt): void;

		/**
		 * Get and set the checkInputs parameter.
		 */
		getCheckInputs(): bool;
		setCheckInputs(check_input: bool): void;

		/**
		 * Returns the permanence increment.
		 *
		 * @returns Returns the Permanence increment
		 */
		getPermanenceIncrement(): Permanence;
		setPermanenceIncrement(increment: Permanence): void;

		/**
		 * Returns the permanence decrement.
		 *
		 * @returns Returns the Permanence decrement
		 */
		getPermanenceDecrement(): Permanence;
		setPermanenceDecrement(permanence: Permanence): void;

		/**
		 * Returns the predicted Segment decrement.
		 *
		 * @returns Returns the segment decrement
		 */
		getPredictedSegmentDecrement(): Permanence;
		setPredictedSegmentDecrement(decrement: Permanence): void;

		/**
		 * Returns the maxSegmentsPerCell.
		 *
		 * @returns Max segments per cell
		 */
		getMaxSegmentsPerCell(): UInt;

		/**
		 * Returns the maxSynapsesPerSegment.
		 *
		 * @returns Max synapses per segment
		 */
		getMaxSynapsesPerSegment(): UInt;

		/**
		 * Raises an error if cell index is invalid.
		 *
		 * @param cell Cell index
		 */
		_validateCell(cell: CellIdx): bool;

		/**
		 * Save (serialize) the current state of the spatial pooler to the
		 * specified file.
		 *
		 * @param fd A valid file descriptor.
		 */
		// save(outStream : ostream) : void;

		// using Serializable::write;
		// virtual void write(TemporalMemoryProto::Builder& proto) const override;

		/**
		 * Load (deserialize) and initialize the spatial pooler from the
		 * specified input stream.
		 *
		 * @param inStream A valid istream.
		 */
		// virtual void load(istream& inStream);

		// using Serializable::read;
		// virtual void read(TemporalMemoryProto::Reader& proto); override;

		/**
		 * Returns the number of bytes that a save operation would result in.
		 * Note: this method is currently somewhat inefficient as it just does
		 * a full save into an ostream and counts the resulting size.
		 *
		 * @returns Integer number of bytes
		 */
		persistentSize(): UInt;

		// bool operator==(const TemporalMemory& other);
		// bool operator!=(;const TemporalMemory& other);

		// ----------------------------------------------------------------------
		// Debugging helpers
		// ----------------------------------------------------------------------

		/**
		 * Print the main TM creation parameters
		 */
		printParameters(): void;

		/**
		 * Returns the index of the column that a cell belongs to.
		 *
		 * @param cell Cell index
		 *
		 * @return (int) Column index
		 */
		columnForCell(cell: CellIdx): Int;

		/**
		 * Print the given UInt array in a nice format
		 */
		printState(state: UInt[]): void;

		/**
		 * Print the given Real array in a nice format
		 */
		printState(state: Real[]): void;

		// protected:
		//   UInt; numColumns_;
		// Array<UInt> columnDimensions_;
		// UInt; cellsPerColumn_;
		// UInt; activationThreshold_;
		// UInt; minThreshold_;
		// UInt; maxNewSynapseCount_;
		// bool; checkInputs_;
		// Permanence; initialPermanence_;
		// Permanence; connectedPermanence_;
		// Permanence; permanenceIncrement_;
		// Permanence; permanenceDecrement_;
		// Permanence; predictedSegmentDecrement_;

		// Array<CellIdx > activeCells_;
		// Array<CellIdx > winnerCells_;
		// Array<Segment > activeSegments_;
		// Array<Segment > matchingSegments_;
		// Array<UInt32 > numActiveConnectedSynapsesForSegment_;
		// Array<UInt32 > numActivePotentialSynapsesForSegment_;

		// UInt; maxSegmentsPerCell_;
		// UInt; maxSynapsesPerSegment_;
		// UInt64; iteration_;
		// Array < UInt64 > lastUsedIterationForSegment_;

		// Random; rng_;

		//      public:

	}

	export let TemporalMemory: TemporalMemory_Static = nupic_module.x;

} // end namespace temporal_memory
//   } // end namespace algorithms
// } // end namespace nta

// #endif // NTA_TEMPORAL_MEMORY_HPP
