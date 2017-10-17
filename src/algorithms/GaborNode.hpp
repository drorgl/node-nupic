#ifndef _NUPIC_ALGORITHMS_GABORNODE_H_
#define _NUPIC_ALGORITHMS_GABORNODE_H_

#include "nupic/algorithms/GaborNode.hpp"

#include "../nupic.h"

class GaborNode : public overres::ObjectWrap {
public:
	static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

	/*static Nan::Persistent<v8::FunctionTemplate> constructor;
	virtual v8::Local<v8::Function> get_constructor();

	static std::unordered_map<nupic::algorithms::ArrayBuffer*, std::weak_ptr<Input>> _inputs;

	std::shared_ptr<nupic::Input> _input;

	static POLY_METHOD(New);
	static POLY_METHOD(compute);*/
	static POLY_METHOD(gaborCompute);
};
//
//const GABOR_SCALING_SHIFT = 12;
//const MAXNUM_FILTERS = 64;
//enum EDGE_MODE {
//	EDGE_MODE_CONSTRAINED = 0,
//	EDGE_MODE_SWEEPOFF,
//	EDGE_MODE__LAST
//}
//
//enum PHASE_MODE {
//	PHASE_MODE_SINGLE = 0,
//	PHASE_MODE_DUAL,
//	PHASE_MODE__LAST
//}
//
//enum NORMALIZE_METHOD {
//	NORMALIZE_METHOD_FIXED = 0,
//	NORMALIZE_METHOD_MAX,
//	NORMALIZE_METHOD_MEAN,
//	NORMALIZE_METHOD_MAXPOWER,
//	NORMALIZE_METHOD_MEANPOWER,
//	NORMALIZE_METHOD__LAST
//}
//
//enum NORMALIZE_MODE {
//	NORMALIZE_MODE_GLOBAL = 0,
//	NORMALIZE_MODE_PERORIENT,
//	NORMALIZE_MODE__LAST
//}
//
//enum PHASENORM_MODE {
//	PHASENORM_MODE_COMBO = 0, // phases are normalized together
//	PHASENORM_MODE_INDIV,     // phases are normalized individually
//	PHASENORM_MODE__LAST
//}
//
//// Enumeration that specifies the method by which we will
//// perform final post-processing upon the normalized responses.
//enum POSTPROC_METHOD {
//	POSTPROC_METHOD_RAW = 0,
//	POSTPROC_METHOD_SIGMOID,
//	POSTPROC_METHOD_THRESHOLD,
//	POSTPROC_METHOD__LAST
//}
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
#endif
