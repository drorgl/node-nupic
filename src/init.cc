


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

#include "nupic.h"

#include <tracer.h>

extern "C" {
	void init(v8::Handle<v8::Object> target) {
		//assert(false);
		node_addon_tracer::tracer::tracer::Init(target);

		auto overload = std::make_shared<overload_resolution>();
		auto base_overload = overload->register_module(target);

		overload->add_type_alias("int", "Number");
		overload->add_type_alias("double", "Number");
		overload->add_type_alias("float", "Number");
		//Register

		auto algorithms_ns = base_overload->add_namespace("algorithms");

		node_nupic::algorithms::Anomaly::Init(target, algorithms_ns);
		node_nupic::algorithms::ArrayBuffer::Init(target, algorithms_ns);
		node_nupic::algorithms::BitHistory::Init(target, algorithms_ns);
		node_nupic::algorithms::Cell::Init(target, algorithms_ns);
		node_nupic::algorithms::Cells4::Init(target, algorithms_ns);
		node_nupic::algorithms::ClassifierResult::Init(target, algorithms_ns);
		node_nupic::algorithms::CondProbTable::Init(target, algorithms_ns);
		node_nupic::algorithms::Connections::Init(target, algorithms_ns);
		node_nupic::algorithms::GaborNode::Init(target, algorithms_ns);
		node_nupic::algorithms::ImageSensorLite::Init(target, algorithms_ns);
		node_nupic::algorithms::InSynapse::Init(target, algorithms_ns);
		node_nupic::algorithms::OutSynapse::Init(target, algorithms_ns);
		node_nupic::algorithms::Scanning::Init(target, algorithms_ns);
		node_nupic::algorithms::SDRClassifier::Init(target, algorithms_ns);
		node_nupic::algorithms::Segment::Init(target, algorithms_ns);
		node_nupic::algorithms::SegmentUpdate::Init(target, algorithms_ns);
		node_nupic::algorithms::SpatialPooler::Init(target, algorithms_ns);
		node_nupic::algorithms::Svm::Init(target, algorithms_ns);
		node_nupic::algorithms::SvmT::Init(target, algorithms_ns);
		node_nupic::algorithms::TemporalMemory::Init(target, algorithms_ns);

		auto encoders_ns = base_overload->add_namespace("encoders");

		node_nupic::encoders::ScalarEncoder::Init(target,encoders_ns);
		node_nupic::encoders::ScalarSensor::Init(target, encoders_ns);

		auto engine_ns = base_overload->add_namespace("engine");

		node_nupic::engine::Input::Init(target,engine_ns);
		node_nupic::engine::Link::Init(target, engine_ns);
		node_nupic::engine::LinkPolicy::Init(target, engine_ns);
		node_nupic::engine::LinkPolicyFactory::Init(target, engine_ns);
		node_nupic::engine::Network::Init(target, engine_ns);
		node_nupic::engine::NuPIC::Init(target, engine_ns);
		node_nupic::engine::Output::Init(target, engine_ns);
		node_nupic::engine::Region::Init(target, engine_ns);
		node_nupic::engine::RegionImpl::Init(target, engine_ns);
		node_nupic::engine::RegionImplFactory::Init(target, engine_ns);
		node_nupic::engine::RegisteredRegionImpl::Init(target, engine_ns);
		node_nupic::engine::Spec::Init(target, engine_ns);
		node_nupic::engine::TestFanIn2LinkPolicy::Init(target, engine_ns);
		node_nupic::engine::TestNode::Init(target, engine_ns);
		node_nupic::engine::UniformLinkPolicy::Init(target, engine_ns);
		node_nupic::engine::YAMLUtils::Init(target, engine_ns);

		auto math_ns = base_overload->add_namespace("math");

		node_nupic::math::Array2D::Init(target,math_ns);
		node_nupic::math::ArrayAlgo::Init(target, math_ns);
		node_nupic::math::Convolution::Init(target, math_ns);
		node_nupic::math::DenseMatrix::Init(target, math_ns);
		node_nupic::math::Domain::Init(target, math_ns);
		//node_nupic::math::Erosion::Init(target, math_ns);
		node_nupic::math::Functions::Init(target, math_ns);
		node_nupic::math::GraphAlgorithms::Init(target, math_ns);
		node_nupic::math::Index::Init(target, math_ns);
		node_nupic::math::Math::Init(target, math_ns);
		node_nupic::math::NearestNeighbor::Init(target, math_ns);
		node_nupic::math::Rotation::Init(target, math_ns);
		node_nupic::math::SegmentMatrixAdapter::Init(target, math_ns);
		node_nupic::math::Set::Init(target, math_ns);
		node_nupic::math::SparseBinaryMatrix::Init(target, math_ns);
		node_nupic::math::SparseMatrix::Init(target, math_ns);
		node_nupic::math::SparseMatrix01::Init(target, math_ns);
		node_nupic::math::SparseMatrixAlgorithms::Init(target, math_ns);
		node_nupic::math::SparseMatrixConnections::Init(target, math_ns);
		node_nupic::math::SparseRLEMatrix::Init(target, math_ns);
		node_nupic::math::SparseTensor::Init(target, math_ns);
		node_nupic::math::StlIo::Init(target, math_ns);
		node_nupic::math::Topology::Init(target, math_ns);
		//node_nupic::math::Types::Init(target, math_ns);
		node_nupic::math::Utils::Init(target, math_ns);

		auto ntypes_ns = base_overload->add_namespace("ntypes");

		node_nupic::ntypes::Array::Init(target, ntypes_ns);
		node_nupic::ntypes::ArrayBase::Init(target, ntypes_ns);
		node_nupic::ntypes::ArrayRef::Init(target, ntypes_ns);
		node_nupic::ntypes::Buffer::Init(target, ntypes_ns);
		node_nupic::ntypes::BundleIO::Init(target, ntypes_ns);
		node_nupic::ntypes::Collection::Init(target, ntypes_ns);
		node_nupic::ntypes::Dimensions::Init(target, ntypes_ns);
		node_nupic::ntypes::MemParser::Init(target, ntypes_ns);
		node_nupic::ntypes::MemStream::Init(target, ntypes_ns);
		node_nupic::ntypes::NodeSet::Init(target, ntypes_ns);
		node_nupic::ntypes::ObjectModel::Init(target, ntypes_ns);
		node_nupic::ntypes::Scalar::Init(target, ntypes_ns);
		node_nupic::ntypes::Value::Init(target, ntypes_ns);

		auto os_ns = base_overload->add_namespace("os");

		node_nupic::os::Directory::Init(target,os_ns);
		node_nupic::os::DynamicLibrary::Init(target, os_ns);
		node_nupic::os::Env::Init(target, os_ns);
		node_nupic::os::FStream::Init(target, os_ns);
		node_nupic::os::OS::Init(target, os_ns);
		node_nupic::os::Path::Init(target, os_ns);
		node_nupic::os::Regex::Init(target, os_ns);
		node_nupic::os::Timer::Init(target, os_ns);

		auto py_support_ns = base_overload->add_namespace("py_support");

		node_nupic::py_support::NumpyArrayObject::Init(target,py_support_ns);
		node_nupic::py_support::NumpyVector::Init(target, py_support_ns);
		node_nupic::py_support::PyArray::Init(target, py_support_ns);
		node_nupic::py_support::PyCapnp::Init(target, py_support_ns);
		node_nupic::py_support::PyHelpers::Init(target, py_support_ns);
		node_nupic::py_support::PythonStream::Init(target, py_support_ns);
		node_nupic::py_support::WrappedVector::Init(target, py_support_ns);

		auto regions_ns = base_overload->add_namespace("regions");

		node_nupic::regions::PyRegion::Init(target,regions_ns);
		node_nupic::regions::VectorFile::Init(target, regions_ns);
		node_nupic::regions::VectorFileEffector::Init(target, regions_ns);
		node_nupic::regions::VectorFileSensor::Init(target, regions_ns);

		auto types_ns = base_overload->add_namespace("types");

		node_nupic::types::BasicType::Init(target, types_ns);
		node_nupic::types::Exception::Init(target, types_ns);
		node_nupic::types::Fraction::Init(target, types_ns);
		node_nupic::types::Serializable::Init(target, types_ns);
		node_nupic::types::Types::Init(target, types_ns);

		auto utils_ns = base_overload->add_namespace("utils");

		node_nupic::utils::ArrayProtoUtils::Init(target,utils_ns); 
		node_nupic::utils::GroupBy::Init(target, utils_ns);
		node_nupic::utils::Log::Init(target, utils_ns);
		node_nupic::utils::LoggingException::Init(target, utils_ns);
		node_nupic::utils::LogItem::Init(target, utils_ns);
		node_nupic::utils::MovingAverage::Init(target, utils_ns);
		node_nupic::utils::Random::Init(target, utils_ns);
		node_nupic::utils::StringUtils::Init(target, utils_ns);
		node_nupic::utils::TRandom::Init(target, utils_ns);
		node_nupic::utils::Watcher::Init(target, utils_ns);

		//input::Init(target, base_overload);

		//photo::Init(target, overload);

		//Init

		//IOArray::Init(target, overload);

		target->Set(Nan::New("version").ToLocalChecked(), Nan::New("1.0.0").ToLocalChecked());

		//validate type/overload registrations
		assert(overload->validate_type_registrations());
	};
}

NODE_MODULE(nupic, init)
