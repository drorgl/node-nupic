/* ---------------------------------------------------------------------
 * Numenta Platform for Intelligent Computing (NuPIC)
 * Copyright (C) 2013, Numenta, Inc.  Unless you have an agreement
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
 * ---------------------------------------------------------------------
 */

/** @file
 *  This header file defines the API for performing efficient
 *  Gabor processing.
 */

// #ifndef NTA_GABOR_NODE_HPP
// #define NTA_GABOR_NODE_HPP

// #include <nupic/utils/Log.hpp>

// #ifdef __cplusplus
// extern "C" {
// #endif  // __cplusplus

// #include <nupic/types/Types.h>
// #include "ArrayBuffer.hpp"

// Number of bits that our gabor filter coefficients are
// shifted (to the left) for scaling purposes, when
// using GABOR_METHOD_INTEGER8
const GABOR_SCALING_SHIFT = 12;

// For reasons of efficiency and simplicity, we'll store our
// responses statistics (used for automated normalization) in
// a static buffer of fixed size.  Because of this, we need to
// impose a constraint on the maximum number of filters;
// 64 should be enough for anyone...  :-)
const MAXNUM_FILTERS = 64;

// Enumeration that specifies how we handle boundary
// effects
enum EDGE_MODE {
	EDGE_MODE_CONSTRAINED = 0,
	EDGE_MODE_SWEEPOFF,
	EDGE_MODE__LAST
}

// Enumeration that specifies whether we compute responses
// for "dual" phases (180 degrees shifted)
enum PHASE_MODE {
	PHASE_MODE_SINGLE = 0,
	PHASE_MODE_DUAL,
	PHASE_MODE__LAST
}

// Enumeration that specifies the method we will use for
// automatically normalizing our filter responses.
enum NORMALIZE_METHOD {
	NORMALIZE_METHOD_FIXED = 0,
	NORMALIZE_METHOD_MAX,
	NORMALIZE_METHOD_MEAN,
	NORMALIZE_METHOD_MAXPOWER,
	NORMALIZE_METHOD_MEANPOWER,
	NORMALIZE_METHOD__LAST
}

// Enumeration that specifies whether our chosen normalization
// statistic will be computed over all scales and/or orientations.
enum NORMALIZE_MODE {
	NORMALIZE_MODE_GLOBAL = 0,
	NORMALIZE_MODE_PERORIENT,
	NORMALIZE_MODE__LAST
}

enum PHASENORM_MODE {
	PHASENORM_MODE_COMBO = 0, // phases are normalized together
	PHASENORM_MODE_INDIV,     // phases are normalized individually
	PHASENORM_MODE__LAST
}

// Enumeration that specifies the method by which we will
// perform final post-processing upon the normalized responses.
enum POSTPROC_METHOD {
	POSTPROC_METHOD_RAW = 0,
	POSTPROC_METHOD_SIGMOID,
	POSTPROC_METHOD_THRESHOLD,
	POSTPROC_METHOD__LAST
}

// FUNCTION: gaborCompute()
// PURPOSE: Implements efficient Gabor filtering.

// int  gaborCompute(const NUMPY_ARRAY * psGaborBank,
//                   const NUMPY_ARRAY * psInput,
//                   const NUMPY_ARRAY * psAlpha,
//                   const NUMPY_ARRAY * psBBox,
//                   const NUMPY_ARRAY * psImageBox,
//                   const NUMPY_ARRAY * psOutput,
//                   float fGainConstant,
//                   EDGE_MODE eEdgeMode,
//                   float fOffImageFillValue,
//                   PHASE_MODE ePhaseMode,
//                   NORMALIZE_METHOD eNormalizeMethod,
//                   NORMALIZE_MODE eNormalizeMode,
//                   PHASENORM_MODE ePhaseNormMode,
//                   POSTPROC_METHOD ePostProcMethod,
//                   float fPostProcSlope,
//                   float fPostProcMidpoint,
//                   float fPostProcMin,
//                   float fPostProcMax,
//                   const NUMPY_ARRAY * psBufferIn,
//                   const NUMPY_ARRAY * psBufferOut,
//                   const NUMPY_ARRAY * psPostProcLUT,
//                   float fPostProcScalar);

// #ifdef __cplusplus
// }
// #endif  // __cplusplus

// #endif // NTA_GABOR_NODE_HPP
