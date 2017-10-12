#include "nupic.h"


//#include "nupic/input.h"
#include "algorithms/Anomaly.hpp"
#include "algorithms/ArrayBuffer.hpp"
#include "algorithms/BitHistory.hpp"
#include "algorithms/Cell.hpp",
#include "algorithms/Cells4.hpp",
#include "algorithms/ClassifierResult.hpp",
#include "algorithms/CondProbTable.hpp",
#include "algorithms/Connections.hpp",
#include "algorithms/GaborNode.hpp",
#include "algorithms/ImageSensorLite.hpp",
#include "algorithms/InSynapse.hpp",
#include "algorithms/OutSynapse.hpp",
#include "algorithms/Scanning.hpp",
#include "algorithms/SDRClassifier.hpp",
#include "algorithms/Segment.hpp",
#include "algorithms/SegmentUpdate.hpp",
#include "algorithms/SpatialPooler.hpp",
#include "algorithms/Svm.hpp",
#include "algorithms/SvmT.hpp",
#include "algorithms/TemporalMemory.hpp",
#include "encoders/ScalarEncoder.hpp",
#include "encoders/ScalarSensor.hpp",
#include "engine/Input.hpp",
#include "engine/Link.hpp",
#include "engine/LinkPolicy.hpp",
#include "engine/LinkPolicyFactory.hpp",
#include "engine/Network.hpp",
#include "engine/NuPIC.hpp",
#include "engine/Output.hpp",
#include "engine/Region.hpp",
#include "engine/RegionImpl.hpp",
#include "engine/RegionImplFactory.hpp",
#include "engine/RegisteredRegionImpl.hpp",
#include "engine/Spec.hpp",
#include "engine/TestFanIn2LinkPolicy.hpp",
#include "engine/TestNode.hpp",
#include "engine/UniformLinkPolicy.hpp",
#include "engine/YAMLUtils.hpp",
#include "math/Array2D.hpp",
#include "math/ArrayAlgo.hpp",
#include "math/Convolution.hpp",
#include "math/DenseMatrix.hpp",
#include "math/Domain.hpp",
#include "math/Erosion.hpp",
#include "math/Functions.hpp",
#include "math/GraphAlgorithms.hpp",
#include "math/Index.hpp",
#include "math/Math.hpp",
#include "math/NearestNeighbor.hpp",
#include "math/Rotation.hpp",
#include "math/SegmentMatrixAdapter.hpp",
#include "math/Set.hpp",
#include "math/SparseBinaryMatrix.hpp",
#include "math/SparseMatrix.hpp",
#include "math/SparseMatrix01.hpp",
#include "math/SparseMatrixAlgorithms.hpp",
#include "math/SparseMatrixConnections.hpp",
#include "math/SparseRLEMatrix.hpp",
#include "math/SparseTensor.hpp",
#include "math/StlIo.hpp",
#include "math/Topology.hpp",
#include "math/Types.hpp",
#include "math/Utils.hpp",
#include "ntypes/Array.hpp",
#include "ntypes/ArrayBase.hpp",
#include "ntypes/ArrayRef.hpp",
#include "ntypes/Buffer.hpp",
#include "ntypes/BundleIO.hpp",
#include "ntypes/Collection.hpp",
#include "ntypes/Dimensions.hpp",
#include "ntypes/MemParser.hpp",
#include "ntypes/MemStream.hpp",
#include "ntypes/NodeSet.hpp",
#include "ntypes/ObjectModel.hpp",
#include "ntypes/Scalar.hpp",
#include "ntypes/Value.hpp",
#include "os/Directory.hpp",
#include "os/DynamicLibrary.hpp",
#include "os/Env.hpp",
#include "os/FStream.hpp",
#include "os/OS.hpp",
#include "os/Path.hpp",
#include "os/Regex.hpp",
#include "os/Timer.hpp",
#include "py_support/NumpyArrayObject.hpp",
#include "py_support/NumpyVector.hpp",
#include "py_support/PyArray.hpp",
#include "py_support/PyCapnp.hpp",
#include "py_support/PyHelpers.hpp",
#include "py_support/PythonStream.hpp",
#include "py_support/WrappedVector.hpp",
#include "regions/PyRegion.hpp",
#include "regions/VectorFile.hpp",
#include "regions/VectorFileEffector.hpp",
#include "regions/VectorFileSensor.hpp",
#include "types/BasicType.hpp",
#include "types/Exception.hpp",
#include "types/Fraction.hpp",
#include "types/Serializable.hpp",
#include "types/Types.hpp",
#include "utils/ArrayProtoUtils.hpp",
#include "utils/GroupBy.hpp",
#include "utils/Log.hpp",
#include "utils/LoggingException.hpp",
#include "utils/LogItem.hpp",
#include "utils/MovingAverage.hpp",
#include "utils/Random.hpp",
#include "utils/StringUtils.hpp",
#include "utils/TRandom.hpp",
#include "utils/Watcher.hpp",




#include <tracer.h>

extern "C"{ 
void
init(Handle<Object> target) {
	//assert(false);
	tracer::Init(target);

	auto overload = std::make_shared<overload_resolution>();
	auto base_overload = overload->register_module(target);

	overload->add_type_alias("int", "Number");
	overload->add_type_alias("double", "Number");
	overload->add_type_alias("float", "Number");
	//Register

	input::Init(target, base_overload);

	//photo::Init(target, overload);

	//Init

	//IOArray::Init(target, overload);

	target->Set(Nan::New("version").ToLocalChecked(), Nan::New("1.0.0").ToLocalChecked());

	//validate type/overload registrations
	assert(overload->validate_type_registrations());
};
}

NODE_MODULE(nupic, init)
