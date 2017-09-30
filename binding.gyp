{
	'target_defaults': {

		'configurations': {
			'Debug': {

				'conditions': [
					['1==1', {
							'msvs_settings': {
								 # This magical incantation is necessary because VC++will compile
								 # object files to same directory...even if they have the same name!
								'VCCLCompilerTool': {
									'AdditionalOptions': ['/bigobj'],
									'WholeProgramOptimization': 'false',
									 # 'AdditionalOptions': ['/w'],
									 # ['/wd4244', '/wd4018', '/wd4133', '/wd4090'] # GL - was added because the forced optimization coming from node - gyp is disturbing the weird coding style from ffmpeg
									'RuntimeLibrary': 3,
									 # dll debug BUILD_WITH_STATIC_CRT
									'ExceptionHandling': 1 #  / EHsc
								},
								'VCLinkerTool': {
									'LinkTimeCodeGeneration': '0',
								},

								'VCLibrarianTool': {
									'AdditionalOptions!': ['/LTCG'],
									'AdditionalOptions': ['/LTCG'],
								},
							}
						}
					]
				]
			},
			'Release': {
				'conditions': [
					['1==1', {
							'msvs_settings': {
								 # This magical incantation is necessary because VC++will compile
								 # object files to same directory...even if they have the same name!
								'VCCLCompilerTool': {
									'AdditionalOptions': ['/bigobj'],
									'WholeProgramOptimization': 'false',
									 # 'AdditionalOptions': ['/w'],
									 # ['/wd4244', '/wd4018', '/wd4133', '/wd4090'] # GL - was added because the forced optimization coming from node - gyp is disturbing the weird coding style from ffmpeg
									'RuntimeLibrary': 2,
									 # dll release BUILD_WITH_STATIC_CRT
									'ExceptionHandling': 1 #  / EHsc
								},
								'VCLinkerTool': {
									'LinkTimeCodeGeneration': '0',
								},

								'VCLibrarianTool': {
									'AdditionalOptions!': ['/LTCG'],
									'AdditionalOptions': ['/LTCG'],
								},
							}
						}
					]
				]
			},
		}
	},

	"targets": [{
			"target_name": "nupic",
			"sources": [
				"package.json",
				"readme.md",
				
				"src/init.cc",
				"src/nupic/input.cc",
				"src/nupic/input.h",
				"src/nupic/dimensions.cc",
				"src/nupic/dimensions.h",
				"src/nupic/link.cc",
				"src/nupic/link.h",
				"src/nupic/nupic.cc",
				"src/nupic/nupic.h",
				"src/nupic/output.cc",
				"src/nupic/output.h",
				"src/nupic/region.cc",
				"src/nupic/region.h",
				"src/nupic/spec.cc",
				"src/nupic/spec.h",

				"src/nupic.h",
				"src/safecast.h",


				"tests",
				"tests/ConnectionsPerformanceTest.h.ts",
				"tests/ConnectionsPerformanceTest.ts",
				"tests/CppRegionTest.ts",
				"tests/examples/algorithms",
				"tests/examples/algorithms/HelloSP_TP.ts",
				"tests/examples/algorithms/README.md",
				"tests/examples/prototest.ts",
				"tests/examples/regions/Data.csv",
				"tests/examples/regions/HelloRegions.ts",
				"tests/PyRegionTest.ts",
				"tsconfig.json",
				"tslint.json",

				"typings/algorithms/Anomaly.ts",
				"typings/algorithms/ArrayBuffer.ts",
				"typings/algorithms/BitHistory.ts",
				"typings/algorithms/Cell.ts",
				"typings/algorithms/Cells4.ts",
				"typings/algorithms/ClassifierResult.ts",
				"typings/algorithms/CondProbTable.ts",
				"typings/algorithms/Connections.ts",
				"typings/algorithms/GaborNode.ts",
				"typings/algorithms/ImageSensorLite.ts",
				"typings/algorithms/InSynapse.ts",
				"typings/algorithms/OutSynapse.ts",
				"typings/algorithms/Scanning.ts",
				"typings/algorithms/SDRClassifier.ts",
				"typings/algorithms/Segment.ts",
				"typings/algorithms/SegmentUpdate.ts",
				"typings/algorithms/SpatialPooler.ts",
				"typings/algorithms/Svm.ts",
				"typings/algorithms/SvmT.ts",
				"typings/algorithms/TemporalMemory.ts",
				"typings/bindings.ts",
				"typings/encoders/ScalarEncoder.ts",
				"typings/encoders/ScalarSensor.ts",
				"typings/engine/Input.ts",
				"typings/engine/Link.ts",
				"typings/engine/LinkPolicy.ts",
				"typings/engine/LinkPolicyFactory.ts",
				"typings/engine/Network.ts",
				"typings/engine/NuPIC.ts",
				"typings/engine/Output.ts",
				"typings/engine/Region.ts",
				"typings/engine/RegionImpl.ts",
				"typings/engine/RegionImplFactory.ts",
				"typings/engine/RegisteredRegionImpl.ts",
				"typings/engine/Spec.ts",
				"typings/engine/TestFanIn2LinkPolicy.ts",
				"typings/engine/TestNode.ts",
				"typings/engine/UniformLinkPolicy.ts",
				"typings/engine/YAMLUtils.ts",
				"typings/index.ts",
				"typings/math/Array2D.ts",
				"typings/math/ArrayAlgo.ts",
				"typings/math/Convolution.ts",
				"typings/math/DenseMatrix.ts",
				"typings/math/Domain.ts",
				"typings/math/Erosion.ts",
				"typings/math/Functions.ts",
				"typings/math/GraphAlgorithms.ts",
				"typings/math/Index.ts",
				"typings/math/Math.ts",
				"typings/math/NearestNeighbor.ts",
				"typings/math/Rotation.ts",
				"typings/math/SegmentMatrixAdapter.ts",
				"typings/math/Set.ts",
				"typings/math/SparseBinaryMatrix.ts",
				"typings/math/SparseMatrix.ts",
				"typings/math/SparseMatrix01.ts",
				"typings/math/SparseMatrixAlgorithms.ts",
				"typings/math/SparseMatrixConnections.ts",
				"typings/math/SparseRLEMatrix.ts",
				"typings/math/SparseTensor.ts",
				"typings/math/StlIo.ts",
				"typings/math/Topology.ts",
				"typings/math/Types.ts",
				"typings/math/Utils.ts",
				"typings/ntypes/Array.ts",
				"typings/ntypes/ArrayBase.ts",
				"typings/ntypes/ArrayRef.ts",
				"typings/ntypes/Buffer.ts",
				"typings/ntypes/BundleIO.ts",
				"typings/ntypes/Collection.ts",
				"typings/ntypes/Dimensions.ts",
				"typings/ntypes/MemParser.ts",
				"typings/ntypes/MemStream.ts",
				"typings/ntypes/NodeSet.ts",
				"typings/ntypes/ObjectModel.h",
				"typings/ntypes/ObjectModel.ts",
				"typings/ntypes/Scalar.ts",
				"typings/ntypes/Value.ts",
				"typings/os/Directory.ts",
				"typings/os/DynamicLibrary.ts",
				"typings/os/Env.ts",
				"typings/os/FStream.ts",
				"typings/os/OS.ts",
				"typings/os/Path.ts",
				"typings/os/Regex.ts",
				"typings/os/Timer.ts",
				"typings/proto/ArrayProto.capnp",
				"typings/proto/BitHistory.capnp",
				"typings/proto/Cell.capnp",
				"typings/proto/Cells4.capnp",
				"typings/proto/ClaClassifier.capnp",
				"typings/proto/ConnectionsProto.capnp",
				"typings/proto/LinkProto.capnp",
				"typings/proto/Map.capnp",
				"typings/proto/NetworkProto.capnp",
				"typings/proto/PyRegionProto.capnp",
				"typings/proto/RandomProto.capnp",
				"typings/proto/RegionProto.capnp",
				"typings/proto/SdrClassifier.capnp",
				"typings/proto/Segment.capnp",
				"typings/proto/SegmentUpdate.capnp",
				"typings/proto/SparseBinaryMatrixProto.capnp",
				"typings/proto/SparseMatrixProto.capnp",
				"typings/proto/SpatialPoolerProto.capnp",
				"typings/proto/SvmProto.capnp",
				"typings/proto/TemporalMemoryProto.capnp",
				"typings/proto/TemporalMemoryV1.capnp",
				"typings/proto/TestNodeProto.capnp",
				"typings/proto/VectorFileSensorProto.capnp",
				"typings/py_support/NumpyArrayObject.ts",
				"typings/py_support/NumpyVector.ts",
				"typings/py_support/PyArray.ts",
				"typings/py_support/PyCapnp.ts",
				"typings/py_support/PyHelpers.ts",
				"typings/py_support/PythonStream.ts",
				"typings/py_support/WrappedVector.ts",
				"typings/regions/PyRegion.ts",
				"typings/regions/VectorFile.ts",
				"typings/regions/VectorFileEffector.ts",
				"typings/regions/VectorFileSensor.ts",
				"typings/types/BasicType.ts",
				"typings/types/Exception.ts",
				"typings/types/Fraction.ts",
				"typings/types/Serializable.ts",
				"typings/types/Types.h",
				"typings/types/Types.ts",
				"typings/utils/ArrayProtoUtils.ts",
				"typings/utils/GroupBy.ts",
				"typings/utils/Log.ts",
				"typings/utils/LoggingException.ts",
				"typings/utils/LogItem.ts",
				"typings/utils/MovingAverage.ts",
				"typings/utils/Random.ts",
				"typings/utils/StringUtils.ts",
				"typings/utils/TRandom.ts",
				"typings/utils/Watcher.ts",


			],
			'dependencies': [
				'<!@(nnbu-dependency --dependency nupiccore)',
				"<!(node -e \"require('node-overload-resolution')\"):node-overload-resolution",
				"<!(node -e \"require('node-addon-tracer')\"):node-addon-tracer",
			],
			'include_dirs': [
				#'<!@(nnbu-dependency --headers opencv)',
				"<!(node -e \"require('nan')\")"
			],
			'link_settings': {
				'libraries': [
					#'<!@(nnbu-dependency --lib-fix --libs opencv)',
				],
			},
			"conditions": [
				['OS == "win"', {
						'libraries': [
							'dbghelp.lib'
						],
					}
				],
				['OS in "linux android"', {
						'cflags': ['-fexceptions', '-std=c++11'],
						'cflags!': ['-fno-exceptions'],
						'cflags_cc!': ['-fno-rtti', '-fno-exceptions'],
					}
				],
			]
		}
	]
}