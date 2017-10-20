#include "CondProbTable.hpp"

namespace node_nupic {
	namespace algorithms {
		void CondProbTable::Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload) {
		}
	}

}

///* ---------------------------------------------------------------------
// * Numenta Platform for Intelligent Computing (NuPIC)
// * Copyright (C) 2013, Numenta, Inc.  Unless you have an agreement
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
// * ---------------------------------------------------------------------
// */
//import nupic_module from "../bindings";
//
//import {  Real, UInt } from "../types/Types";
//
///** @file */
//
//// #ifndef NTA_COND_PROB_TABLE_HPP
//// #define NTA_COND_PROB_TABLE_HPP
//
//// #include <nupic/math/SparseMatrix.hpp>
//// #include <nupic/math/SparseMatrix01.hpp>
//
//// namespace nupic {
//
//////////////////////////////////////////////////////////////////////////////
///// Conditional Probablity Table
/////
///// @b Responsibility
/////  - Holds frequencies in a 2D grid of bins.
/////
///// @b Resources/Ownerships:
/////  - none
/////
///// @b Notes:
///// Binning is not performed automatically by this class. Bin updates msut be done
///// one row at a time. This class uses nupic::SparseMatrix which is a compressed sparse row
///// matrix. Also maintains the row and column sumProp distributions.
/////
////////////////////////////////////////////////////////////////////////////////
//
//export enum inferType { inferViterbi, inferMarginal, inferMaxProd, inferRowEvidence }
//
//export interface CondProbTable_Static {
//
//	/////////////////////////////////////////////////////////////////////////////////////
//	/// Constructor
//	///
//	/// Both the number of columns and the number of rows can be increased after
//	/// construction by calling updateRow().
//	///
//	/// @param hintNumCols  Number of columns in the table. This can be increased later
//	///                         via updateRow() but never decreased.
//	/// @param hintNumRows  Number of rows in the table. This can be increased later
//	///                         via updateRow() but never decreased.
//	///
//	///////////////////////////////////////////////////////////////////////////////////
//	new(hintNumCols?: UInt/*=0*/, hintNumRows?: UInt/*=0*/): CondProbTable;
//
//	/////////////////////////////////////////////////////////////////////////////////////
//	/// Destructor
//	///
//	///////////////////////////////////////////////////////////////////////////////////
//	// virtual ~CondProbTable();
//	convertInferType(name: string): inferType;
//}
//
//export interface CondProbTable {
//
//	/////////////////////////////////////////////////////////////////////////////////////
//	/// Return the number of rows in the table
//	///
//	/// @retval number of rows
//	///////////////////////////////////////////////////////////////////////////////////
//	numRows(): UInt;
//
//	/////////////////////////////////////////////////////////////////////////////////////
//	/// Return the number of columns in the table.
//	///
//	/// @retval number of rows
//	///////////////////////////////////////////////////////////////////////////////////
//	numColumns(): UInt;
//
//	/////////////////////////////////////////////////////////////////////////////////////
//	/// Update a row with the given distribution.
//	///
//	/// @param row          which row to update
//	/// @param distribution the distribution to update the row with
//	///////////////////////////////////////////////////////////////////////////////////
//	updateRow(row: UInt, distribution: Real[]): void;
//
//	/////////////////////////////////////////////////////////////////////////////////////
//	/// Return the probablity of the given distribution belonging to each row.
//	///
//	/// Computes the sumProp probablity of each row given the input probability of
//	/// each column.
//	///
//	/// The semantics are as follows: If the distribution is P(col|e) where e is
//	/// the evidence is col is the column, and the CPD represents P(row|col), then
//	/// this calculates sum(P(col|e) P(row|col)) = P(row|e).
//	///
//	/// The available inference methods are:
//	/// inferMarginal -  Normalizes the distribution over the columns
//	/// inferRowEvidence - Normalize the distribution over the rows.
//	/// inferMaxProd - Computes the max product between each element of distribution
//	///                  and corresponding element of row.
//	/// inferViterbi - works on a "clean" probability table, produced by finding the
//	///                 max element of each column, setting it to 1, and putting 0 in
//	///                 all other elements of the column.
//	///
//	/// @param distribution   the distribution to test - length equal to # of columns
//	/// @param outScores      the return probablity of distribution belonging to each row -
//	///                         length equal to # of rows
//	/// @param method         the method to use, one of either inferMarginal, inferMaxProd,
//	///                         inferRowEvidence, or inferViterbi
//	///////////////////////////////////////////////////////////////////////////////////
//	inferRow(
//		distribution: Real[], outScores: Real[],
//		infer?: inferType/*=inferMarginal*/): void;
//
//	/////////////////////////////////////////////////////////////////////////////////////
//	/// Form of inferRow that takes iterators as input
//	///
//	/// @param distribution   the distribution to test - length equal to # of columns
//	/// @param outScores      the return probablity of distribution belonging to each row
//	///                         length equal to # of rows
//	/// @param method         the method to use, one of either inferMarginal, inferMaxProd,
//	///                         inferRowEvidence, or inferViterbi
//	///////////////////////////////////////////////////////////////////////////////////
//	// void inferRow (Array<Real>::const_iterator distribution,
//	//                Array<Real>::iterator outScores, inferType infer=inferMarginal);
//
//	/////////////////////////////////////////////////////////////////////////////////////
//	/// Get a row of the table out.
//	///
//	/// @param row          which row to get
//	/// @param contents     the row contents are written here
//	///////////////////////////////////////////////////////////////////////////////////
//	getRow(row: UInt, contents: Real[]): void;
//
//	/////////////////////////////////////////////////////////////////////////////////////
//	/// Get the entire table out as a sparse matrix
//	///
//	/// @retval pointer to the table
//	///////////////////////////////////////////////////////////////////////////////////
//	// getTable(): SparseMatrix<UInt, Real>;
//
//	/////////////////////////////////////////////////////////////////////////////////////
//	/// Save state to a stream
//	///
//	/// @param state the stream to write to
//	///////////////////////////////////////////////////////////////////////////////////
//	// saveState(std::ostream& state) :void;
//	saveState(): Buffer;
//
//	/////////////////////////////////////////////////////////////////////////////////////
//	/// Read state from a stream
//	///
//	/// @param state the stream to read from
//	///////////////////////////////////////////////////////////////////////////////////
//	// void readState(std::istream& state);
//	readState(state: Buffer): void;
//
//	// private:
//	//   /////////////////////////////////////////////////////////////////////////////////////
//	//   /// Grow the matrix to have the given # of rows
//	//   ///
//	//   /// @rows          number of rows to grow to
//	//   /// @cols          number of columns to grow to
//	//   ///////////////////////////////////////////////////////////////////////////////////
//	//   void grow (const UInt& rows, const UInt& cols);
//
//	//   /////////////////////////////////////////////////////////////////////////////////////
//	//   /// Make a "clean CPT". This is a copy of the CPT table with only the max element
//	//   /// in each column kept and all others set to 0.
//	//   ///
//	//   ///////////////////////////////////////////////////////////////////////////////////
//	//   void makeCleanCPT (void);
//
//	//   UInt hintNumCols_;
//	//   UInt hintNumRows_;
//	//   SparseMatrix<UInt, Real>* tableP_;
//	//   SparseMatrix01<UInt, Real>* cleanTableP_;  // for inferViterbi
//	//   bool cleanTableValid_;
//	//   Array<Real>   rowSums_;
//	//   Array<Real>   colSums_;
//}
//export let CondProbTable: CondProbTable_Static = nupic_module.x;
//
//// } // namespace nupic
//
//// #endif; // NTA_COND_PROB_TABLE_HPP
