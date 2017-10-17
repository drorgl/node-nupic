#include "Connections.hpp"

///* ---------------------------------------------------------------------
// * Numenta Platform for Intelligent Computing (NuPIC)
// * Copyright (C) 2014-2016, Numenta, Inc.  Unless you have an agreement
// * with Numenta, Inc., for a separate license for this software code, the
// * following terms and conditions apply:
// *
// * This program is free software: you can redistribute it and/or modify
// * it under the terms of the GNU Affero Public License version 3 as
// * published by the Free Software Foundation.
// *
// * This program is distributed in the hope that it will be useful,
// * but WITHOUT ANY WARRANTY; without even the implied warranty of
// * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
// * See the GNU Affero Public License for more details.
// *
// * You should have received a copy of the GNU Affero Public License
// * along with this program.  If not, see http://www.gnu.org/licenses.
// *
// * http://numenta.org/licenses/
// * ----------------------------------------------------------------------
// */
//
//import nupic_module from "../bindings";
//
//import { bool, Real32, UInt, UInt16, UInt32 } from "../types/Types";
//// import {Segment} from "./Segment";
//
///** @file
// * Definitions for the Connections class in C++
// */
//
//// #ifndef NTA_CONNECTIONS_HPP
//// #define NTA_CONNECTIONS_HPP
//
//// #include <climits>
//// #include <utility>
//// #include <vector>
//
//// #include <nupic/types/Serializable.hpp>
//// #include <nupic/types/Types.hpp>
//// #include <nupic/math/Math.hpp>
//// #include <nupic/proto/ConnectionsProto.capnp.h>
//
//// namespace nupic
//// {
//
////   namespace algorithms
////   {
//
//export namespace connections {
//	export type CellIdx = UInt32;
//	export type SegmentIdx = UInt16;
//	export type SynapseIdx = UInt16;
//	export type Permanence = Real32;
//	export type Segment = UInt32;
//
//	/**
//	 * Synapse struct used by Connections consumers.
//	 *
//	 * The Synapse struct is used to refer to a synapse. It contains a path to
//	 * a SynapseData.
//	 *
//	 * @param flatIdx This synapse's index in flattened lists of all synapses.
//	 */
//	export interface Synapse {
//		flatIdx: UInt32;
//
//		// Use Synapses as vector indices.
//		// operator unsigned long() const { return flatIdx; };
//
//		// private:
//		//   // The flatIdx ordering is not meaningful.
//		//   bool operator<=(const Synapse &other) const;
//		//   bool operator<(const Synapse &other) const;
//		//   bool operator>=(const Synapse &other) const;
//		//   bool operator>(const Synapse &other) const;
//	}
//
//	/**
//	 * SynapseData class used in Connections.
//	 *
//	 * @b Description
//	 * The SynapseData contains the underlying data for a synapse.
//	 *
//	 * @param presynapticCellIdx
//	 * Cell that this synapse gets input from.
//	 *
//	 * @param permanence
//	 * Permanence of synapse.
//	 */
//	export interface SynapseData {
//		presynapticCell: CellIdx;
//		permanence: Permanence;
//		segment: Segment;
//	}
//
//	/**
//	 * SegmentData class used in Connections.
//	 *
//	 * @b Description
//	 * The SegmentData contains the underlying data for a Segment.
//	 *
//	 * @param synapses
//	 * Synapses on this segment.
//	 *
//	 * @param cell
//	 * The cell that this segment is on.
//	 */
//	export interface SegmentData {
//		synapses: Synapse[];
//		cell: CellIdx;
//	}
//
//	/**
//	 * CellData class used in Connections.
//	 *
//	 * @b Description
//	 * The CellData contains the underlying data for a Cell.
//	 *
//	 * @param segments
//	 * Segments on this cell.
//	 *
//	 */
//	interface CellData {
//		segments: Segment[];
//	}
//
//	/**
//	 * A base class for Connections event handlers.
//	 *
//	 * @b Description
//	 * This acts as a plug-in point for logging / visualizations.
//	 */
//	export interface ConnectionsEventHandler {
//		/**
//         * Called after a segment is created.
//         */
//		onCreateSegment(segment: Segment): void;
//
//		/**
//         * Called before a segment is destroyed.
//         */
//		onDestroySegment(segment: Segment): void;
//
//		/**
//         * Called after a synapse is created.
//         */
//		onCreateSynapse(synapse: Synapse): void;
//
//		/**
//         * Called before a synapse is destroyed.
//         */
//		onDestroySynapse(synapse: Synapse): void;
//
//		/**
//         * Called before a synapse's permanence is changed.
//         */
//		onUpdateSynapsePermanence(
//			synapse: Synapse,
//			permanence: Permanence): void;
//	}
//
//	/**
//	 * Connections implementation in C++.
//	 *
//	 * @b Description
//	 * The Connections class is a data structure that represents the
//	 * connections of a collection of cells. It is used in the HTM
//	 * learning algorithms to store and access data related to the
//	 * connectivity of cells.
//	 *
//	 * Its main utility is to provide a common, optimized data structure
//	 * that all HTM learning algorithms can use. It is flexible enough to
//	 * support any learning algorithm that operates on a collection of cells.
//	 *
//	 * Each type of connection (proximal, distal basal, apical) should be
//	 * represented by a different instantiation of this class. This class
//	 * will help compute the activity along those connections due to active
//	 * input cells. The responsibility for what effect that activity has on
//	 * the cells and connections lies in the user of this class.
//	 *
//	 * This class is optimized to store connections between cells, and
//	 * compute the activity of cells due to input over the connections.
//	 *
//	 * This class assigns each segment a unique "flatIdx" so that it's
//	 * possible to use a simple vector to associate segments with values.
//	 * Create a vector of length `connections.segmentFlatListLength()`,
//	 * iterate over segments and update the vector at index `segment`.
//	 *
//	 */
//	export interface Connections_Static {
//		/**
//         * Connections empty constructor.
//         * (Does not call `initialize`.)
//         */
//		new(): Connections;
//
//		/**
//		 * Connections constructor.
//		 *
//		 * @param numCells              Number of cells.
//		 */
//		new(numCells: CellIdx): Connections;
//
//		// virtual ~Connections() {}
//
//	}
//
//	export interface Connections {// : public Serializable<ConnectionsProto>
//		// static const VERSION = 2;
//
//		/**
//		 * Initialize connections.
//		 *
//		 * @param numCells              Number of cells.
//		 */
//		initialize(numCells: CellIdx): void;
//
//		/**
//		 * Creates a segment on the specified cell.
//		 *
//		 * @param cell Cell to create segment on.
//		 *
//		 * @retval Created segment.
//		 */
//		createSegment(cell: CellIdx): Segment;
//
//		/**
//		 * Creates a synapse on the specified segment.
//		 *
//		 * @param segment         Segment to create synapse on.
//		 * @param presynapticCell Cell to synapse on.
//		 * @param permanence      Initial permanence of new synapse.
//		 *
//		 * @reval Created synapse.
//		 */
//		createSynapse(
//			segment: Segment,
//			presynapticCell: CellIdx,
//			permanence: Permanence): Synapse;
//
//		/**
//		 * Destroys segment.
//		 *
//		 * @param segment Segment to destroy.
//		 */
//		destroySegment(segment: Segment): void;
//
//		/**
//		 * Destroys synapse.
//		 *
//		 * @param synapse Synapse to destroy.
//		 */
//		destroySynapse(synapse: Synapse): void;
//
//		/**
//		 * Updates a synapse's permanence.
//		 *
//		 * @param synapse    Synapse to update.
//		 * @param permanence New permanence.
//		 */
//		updateSynapsePermanence(
//			synapse: Synapse,
//			permanence: Permanence): void;
//
//		/**
//		 * Gets the segments for a cell.
//		 *
//		 * @param cell Cell to get segments for.
//		 *
//		 * @retval Segments on cell.
//		 */
//		segmentsForCell(cell: CellIdx): Segment[];
//
//		/**
//		 * Gets the synapses for a segment.
//		 *
//		 * @param segment Segment to get synapses for.
//		 *
//		 * @retval Synapses on segment.
//		 */
//		synapsesForSegment(segment: Segment): Synapse[];
//
//		/**
//		 * Gets the cell that this segment is on.
//		 *
//		 * @param segment Segment to get the cell for.
//		 *
//		 * @retval Cell that this segment is on.
//		 */
//		cellForSegment(segment: Segment): CellIdx;
//
//		/**
//		 * Gets the index of this segment on its respective cell.
//		 *
//		 * @param segment Segment to get the idx for.
//		 *
//		 * @retval Index of the segment.
//		 */
//		idxOnCellForSegment(segment: Segment): SegmentIdx;
//
//		/**
//		 * Get the cell for each provided segment.
//		 *
//		 * @param segments
//		 * The segments to query
//		 *
//		 * @param cells
//		 * Output array with the same length as 'segments'
//		 */
//		// mapSegmentsToCells(
//		//  segments_begin, const Segment* segments_end,
//		// CellIdx* cells_begin) :void;
//		mapSegmentsToCells(segments: Segment[]): CellIdx[];
//
//		/**
//		 * Gets the segment that this synapse is on.
//		 *
//		 * @param synapse Synapse to get Segment for.
//		 *
//		 * @retval Segment that this synapse is on.
//		 */
//		segmentForSynapse(synapse: Synapse): Segment;
//
//		/**
//		 * Gets the data for a segment.
//		 *
//		 * @param segment Segment to get data for.
//		 *
//		 * @retval Segment data.
//		 */
//		dataForSegment(segment: Segment): SegmentData;
//
//		/**
//		 * Gets the data for a synapse.
//		 *
//		 * @param synapse Synapse to get data for.
//		 *
//		 * @retval Synapse data.
//		 */
//		dataForSynapse(synapse: Synapse): SynapseData;
//
//		/**
//		 * Get the segment at the specified cell and offset.
//		 *
//		 * @param cell The cell that the segment is on.
//		 * @param idx The index of the segment on the cell.
//		 *
//		 * @retval Segment
//		 */
//		getSegment(cell: CellIdx, idx: SegmentIdx): Segment;
//
//		/**
//		 * Get the vector length needed to use segments as indices.
//		 *
//		 * @retval A vector length
//		 */
//		segmentFlatListLength(): UInt32;
//
//		/**
//		 * Compare two segments. Returns true if a < b.
//		 *
//		 * Segments are ordered first by cell, then by their order on the cell.
//		 *
//		 * @param a Left segment to compare
//		 * @param b Right segment to compare
//		 *
//		 * @retval true if a < b, false otherwise.
//		 */
//		compareSegments(a: Segment, b: Segment): bool;
//
//		/**
//		 * Returns the synapses for the source cell that they synapse on.
//		 *
//		 * @param presynapticCell(int) Source cell index
//		 *
//		 * @return Synapse indices
//		 */
//		synapsesForPresynapticCell(presynapticCell: CellIdx): Synapse[];
//
//		/**
//		 * Compute the segment excitations for a vector of active presynaptic
//		 * cells.
//		 *
//		 * The output vectors aren't grown or cleared. They must be
//		 * preinitialized with the length returned by
//		 * getSegmentFlatVectorLength().
//		 *
//		 * @param numActiveConnectedSynapsesForSegment
//		 * An output vector for active connected synapse counts per segment.
//		 *
//		 * @param numActivePotentialSynapsesForSegment
//		 * An output vector for active potential synapse counts per segment.
//		 *
//		 * @param activePresynapticCells
//		 * Active cells in the input.
//		 *
//		 * @param connectedPermanence
//		 * Minimum permanence for a synapse to be "connected".
//		 */
//		computeActivity(
//			numActiveConnectedSynapsesForSegment: UInt32[],
//			numActivePotentialSynapsesForSegment: UInt32[],
//			activePresynapticCells: CellIdx[],
//			connectedPermanence: Permanence): void;
//
//		/**
//		 * Compute the segment excitations for a single active presynaptic cell.
//		 *
//		 * The output vectors aren't grown or cleared. They must be
//		 * preinitialized with the length returned by
//		 * getSegmentFlatVectorLength().
//		 *
//		 * @param numActiveConnectedSynapsesForSegment
//		 * An output vector for active connected synapse counts per segment.
//		 *
//		 * @param numActivePotentialSynapsesForSegment
//		 * An output vector for active potential synapse counts per segment.
//		 *
//		 * @param activePresynapticCells
//		 * Active cells in the input.
//		 *
//		 * @param connectedPermanence
//		 * Minimum permanence for a synapse to be "connected".
//		 */
//		computeActivity(
//			numActiveConnectedSynapsesForSegment: UInt32[],
//			numActivePotentialSynapsesForSegment: UInt32[] ,
//			activePresynapticCell: CellIdx,
//			connectedPermanence: Permanence): void;
//
//		// Serialization
//
//		/**
//		 * Saves serialized data to output stream.
//		 */
//		// virtual void save(std::ostream& outStream) const;
//		save(): Buffer;
//
//		/**
//		 * Writes serialized data to output stream.
//		 */
//		// using Serializable::write;
//
//		/**
//		 * Writes serialized data to proto object.
//		 */
//		// virtual void write(ConnectionsProto::Builder& proto) const override;
//
//		/**
//		 * Loads serialized data from input stream.
//		 */
//		// virtual void load(std::istream& inStream);
//		load(state: Buffer): void;
//
//		/**
//		 * Reads serialized data from input stream.
//		 */
//		// using Serializable::read;
//
//		/**
//		 * Reads serialized data from proto object.
//		 */
//		// virtual void read(ConnectionsProto::Reader& proto) override;
//
//		// Debugging
//
//		/**
//		 * Gets the number of cells.
//		 *
//		 * @retval Number of cells.
//		 */
//		numCells(): CellIdx;
//
//		/**
//		 * Gets the number of segments.
//		 *
//		 * @retval Number of segments.
//		 */
//		numSegments(): UInt;
//
//		/**
//		 * Gets the number of segments on a cell.
//		 *
//		 * @retval Number of segments.
//		 */
//		numSegments(cell: CellIdx): UInt;
//
//		/**
//		 * Gets the number of synapses.
//		 *
//		 * @retval Number of synapses.
//		 */
//		numSynapses(): UInt;
//
//		/**
//		 * Gets the number of synapses on a segment.
//		 *
//		 * @retval Number of synapses.
//		 */
//		numSynapses(segment: Segment): UInt;
//
//		/**
//		 * Comparison operator.
//		 */
//		// bool operator==(const Connections &other) const;
//		// bool operator!=(const Connections &other) const;
//
//		/**
//		 * Add a connections events handler.
//		 *
//		 * The Connections instance takes ownership of the eventHandlers
//		 * object. Don't delete it. When calling from Python, call
//		 * eventHandlers.__disown__() to avoid garbage-collecting the object
//		 * while this instance is still using it. It will be deleted on
//		 * `unsubscribe`.
//		 *
//		 * @param handler
//		 * An object implementing the ConnectionsEventHandler interface
//		 *
//		 * @retval Unsubscribe token
//		 */
//		subscribe(handler: ConnectionsEventHandler): UInt32;
//
//		/**
//		 * Remove an event handler.
//		 *
//		 * @param token
//		 * The return value of `subscribe`.
//		 */
//		unsubscribe(token: UInt32): void;
//
//		// protected:
//
//		//   /**
//		//    * Gets the synapse with the lowest permanence on the segment.
//		//    *
//		//    * @param segment Segment whose synapses to consider.
//		//    *
//		//    * @retval Synapse with the lowest permanence.
//		//    */
//		//   Synapse minPermanenceSynapse_(Segment segment) const;
//
//		//   /**
//		//    * Check whether this segment still exists on its cell.
//		//    *
//		//    * @param Segment
//		//    *
//		//    * @retval True if it's still in its cell's segment list.
//		//    */
//		//   bool segmentExists_(Segment segment) const;
//
//		//   /**
//		//    * Check whether this synapse still exists on its segment.
//		//    *
//		//    * @param Synapse
//		//    *
//		//    * @retval True if it's still in its segment's synapse list.
//		//    */
//		//   bool synapseExists_(Synapse synapse) const;
//
//		//   /**
//		//    * Remove a synapse from synapsesForPresynapticCell_.
//		//    *
//		//    * @param Synapse
//		//    */
//		//   void removeSynapseFromPresynapticMap_(Synapse synapse);
//
//		// private:
//		//   Array<CellData> cells_;
//		//   Array<SegmentData> segments_;
//		//   Array<Segment> destroyedSegments_;
//		//   Array<SynapseData> synapses_;
//		//   Array<Synapse> destroyedSynapses_;
//
//		//   // Extra bookkeeping for faster computing of segment activity.
//		//   std::map<CellIdx, Array<Synapse> > synapsesForPresynapticCell_;
//
//		//   Array<UInt64> segmentOrdinals_;
//		//   Array<UInt64> synapseOrdinals_;
//		//   UInt64 nextSegmentOrdinal_;
//		//   UInt64 nextSynapseOrdinal_;
//
//		//   UInt32 nextEventToken_;
//		//   std::map<UInt32, ConnectionsEventHandler*> eventHandlers_;
//	} // end class Connections
//
//	export let Connections: Connections_Static = nupic_module.x;
//} // end namespace connections
//
////   } // end namespace algorithms
//
//// } // end namespace nupic
//
//// #endif // NTA_CONNECTIONS_HPP
