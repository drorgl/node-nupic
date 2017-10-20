#include "region.h"

#include "dimensions.h"
//#include "network.h"

namespace node_nupic {
	namespace nupic_ns {

		//namespace input_general_callback {
		//	std::shared_ptr<overload_resolution> overload;
		//	NAN_METHOD(callback) {
		//		if (overload == nullptr) {
		//			throw std::runtime_error("input_callback is empty");
		//		}
		//		return overload->execute("input", info);
		//	}
		//}

		void
			Region::Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload) {
			//input_general_callback::overload = overload;

			auto class_overload = overload->add_class("Input");
			/**
			* @name Region information
			*
			* @{
			*/

			/**
			* Get the network containing this region.
			*
			* @returns The network containing this region
			*/
			//Network * getNetwork();
			class_overload->add_overload("getNetwork", {}, getNetwork);

			/**
			* Get the name of the region.
			*
			* @returns The region's name
			*/
			//const std::string& getName() const;
			class_overload->add_overload("getName", {}, getName);


			/**
			* Get the dimensions of the region.
			*
			* @returns The region's dimensions
			*/
			//const Dimensions& getDimensions() const;
			class_overload->add_overload("getDimensions", {}, getDimensions);

			/**
			* Assign width and height to the region.
			*
			* @param dimensions
			*        A Dimensions object that describes the width and height
			*/
			//void setDimensions(Dimensions & dimensions);
			class_overload->add_overload("setDimensions", {
				make_param<Dimensions*>("dimensions","Dimensions")
			}, setDimensions);

			/**
			* @}
			*
			* @name Element interface methods
			*
			* @todo What does "Element interface methods" mean here?
			*
			* @{
			*
			*/

			/**
			* Get the type of the region.
			*
			* @returns The node type as a string
			*/
			//const std::string& getType() const;
			class_overload->add_overload("getType", {}, getType);

			/**
			* Get the spec of the region.
			*
			* @returns The spec that describes this region
			*/
			//const Spec* getSpec() const;
			class_overload->add_overload("getSpec", {}, getSpec);

			/**
			* Get the Spec of a region type without an instance.
			*
			* @param nodeType
			*        A region type as a string
			*
			* @returns The Spec that describes this region type
			*/
			//static const Spec* getSpecFromType(const std::string& nodeType);
			class_overload->add_static_overload("getSpecFromType", {
				make_param<std::string>("nodeType","string")
			}, getSpecFromType);

			/*
			* Adds a Python module and class to the RegionImplFactory's regions
			*/
			//static void registerPyRegion(const std::string module, const std::string className);
			class_overload->add_static_overload("registerPyRegion", {
				make_param<std::string>("module","string"),
				make_param<std::string>("className","string")
			}, registerPyRegion);

			/*
			* Adds a cpp region to the RegionImplFactory's packages
			*/
			//static void registerCPPRegion(const std::string name, GenericRegisteredRegionImpl* wrapper);

			/*
			* Removes a Python module and class from the RegionImplFactory's regions
			*/
			//static void unregisterPyRegion(const std::string className);
			class_overload->add_static_overload("unregisterPyRegion", {
				make_param<std::string>("className","string")
			}, unregisterPyRegion);

			/*
			* Removes a cpp region from the RegionImplFactory's packages
			*/
			//static void unregisterCPPRegion(const std::string name);
			class_overload->add_static_overload("unregisterCPPRegion", {
				make_param<std::string>("name","string")
			}, unregisterCPPRegion);


			/**
			* @}
			*
			* @name Parameter getters and setters
			*
			* @{
			*
			*/

			/**
			* Get the parameter as an @c Int32 value.
			*
			* @param name
			*        The name of the parameter
			*
			* @returns The value of the parameter
			*/
			//Int32 getParameterInt32(const std::string& name) const;
			class_overload->add_overload("getParameterInt32", {
				make_param<std::string>("name","string")
			}, getParameterInt32);

			/**
			* Get the parameter as an @c UInt32 value.
			*
			* @param name
			*        The name of the parameter
			*
			* @returns The value of the parameter
			*/
			//UInt32 getParameterUInt32(const std::string& name) const;
			class_overload->add_overload("getParameterUInt32", {
				make_param<std::string>("name","string")
			}, getParameterUInt32);

			/**
			* Get the parameter as an @c Int64 value.
			*
			* @param name
			*        The name of the parameter
			*
			* @returns The value of the parameter
			*/
			//Int64 getParameterInt64(const std::string& name) const;
			class_overload->add_overload("getParameterInt64", {
				make_param<std::string>("name","string")
			}, getParameterInt64);

			/**
			* Get the parameter as an @c UInt64 value.
			*
			* @param name
			*        The name of the parameter
			*
			* @returns The value of the parameter
			*/
			//UInt64 getParameterUInt64(const std::string& name) const;
			class_overload->add_overload("getParameterUInt64", {
				make_param<std::string>("name","string")
			}, getParameterUInt64);

			/**
			* Get the parameter as an @c Real32 value.
			*
			* @param name
			*        The name of the parameter
			*
			* @returns The value of the parameter
			*/
			//Real32 getParameterReal32(const std::string& name) const;
			class_overload->add_overload("getParameterReal32", {
				make_param<std::string>("name","string")
			}, getParameterReal32);

			/**
			* Get the parameter as an @c Real64 value.
			*
			* @param name
			*        The name of the parameter
			*
			* @returns The value of the parameter
			*/
			//Real64 getParameterReal64(const std::string& name) const;
			class_overload->add_overload("getParameterReal64", {
				make_param<std::string>("name","string")
			}, getParameterReal64);

			/**
			* Get the parameter as an @c Handle value.
			*
			* @param name
			*        The name of the parameter
			*
			* @returns The value of the parameter
			*/
			//Handle getParameterHandle(const std::string& name) const;
			class_overload->add_overload("getParameterHandle", {
				make_param<std::string>("name","string")
			}, getParameterHandle);

			/**
			* Get a bool parameter.
			*
			* @param name
			*        The name of the parameter
			*
			* @returns The value of the parameter
			*/
			//bool getParameterBool(const std::string& name) const;
			class_overload->add_overload("getParameterBool", {
				make_param<std::string>("name","string")
			}, getParameterBool);

			/**
			* Set the parameter to an Int32 value.
			*
			* @param name
			*        The name of the parameter
			*
			* @param value
			*        The value of the parameter
			*/
			//void setParameterInt32(const std::string& name, Int32 value);
			class_overload->add_overload("setParameterInt32", {
				make_param<std::string>("name","string"),
				make_param<nupic::Int32>("value","Int32")
			}, setParameterInt32);

			/**
			* Set the parameter to an UInt32 value.
			*
			* @param name
			*        The name of the parameter
			*
			* @param value
			*        The value of the parameter
			*/
			//void setParameterUInt32(const std::string& name, UInt32 value);
			class_overload->add_overload("setParameterUInt32", {
				make_param<std::string>("name","string"),
				make_param<nupic::UInt32>("value","UInt32")
			}, setParameterUInt32);

			/**
			* Set the parameter to an Int64 value.
			*
			* @param name
			*        The name of the parameter
			*
			* @param value
			*        The value of the parameter
			*/
			//void setParameterInt64(const std::string& name, Int64 value);
			class_overload->add_overload("setParameterInt64", {
				make_param<std::string>("name","string"),
				make_param<nupic::Int64>("value","Int64")
			}, setParameterInt64);

			/**
			* Set the parameter to an UInt64 value.
			*
			* @param name
			*        The name of the parameter
			*
			* @param value
			*        The value of the parameter
			*/
			//void setParameterUInt64(const std::string& name, UInt64 value);
			class_overload->add_overload("setParameterUInt64", {
				make_param<std::string>("name","string"),
				make_param<nupic::UInt64>("value","UInt64")
			}, setParameterUInt64);

			/**
			* Set the parameter to a Real32 value.
			*
			* @param name
			*        The name of the parameter
			*
			* @param value
			*        The value of the parameter
			*/
			//void setParameterReal32(const std::string& name, Real32 value);
			class_overload->add_overload("setParameterReal32", {
				make_param<std::string>("name","string"),
				make_param<nupic::Real32>("value","Real32")
			}, setParameterReal32);

			/**
			* Set the parameter to a Real64 value.
			*
			* @param name
			*        The name of the parameter
			*
			* @param value
			*        The value of the parameter
			*/
			//void setParameterReal64(const std::string& name, Real64 value);
			class_overload->add_overload("setParameterReal64", {
				make_param<std::string>("name","string"),
				make_param<nupic::Real64>("value","Real64")
			}, setParameterReal64);

			/**
			* Set the parameter to a Handle value.
			*
			* @param name
			*        The name of the parameter
			*
			* @param value
			*        The value of the parameter
			*/
			//void setParameterHandle(const std::string& name, Handle value);
			class_overload->add_overload("setParameterHandle", {
				make_param<std::string>("name","string"),
				make_param<nupic::Handle>("value","Handle")
			}, setParameterHandle);

			/**
			* Set the parameter to a bool value.
			*
			* @param name
			*        The name of the parameter
			*
			* @param value
			*        The value of the parameter
			*/
			//void setParameterBool(const std::string& name, bool value);
			class_overload->add_overload("setParameterBool", {
				make_param<std::string>("name","string"),
				make_param<bool>("value","bool")
			}, setParameterBool);

			/**
			* Get the parameter as an @c Array value.
			*
			* @param name
			*        The name of the parameter
			*
			* @param[out] array
			*        The value of the parameter
			*
			* @a array is a memory buffer. If the buffer is allocated,
			* the value is copied into the supplied buffer; otherwise
			* @a array would be asked to allocate the buffer and copy into it.
			*
			* A typical use might be that the caller would supply an
			* unallocated buffer on the first call and then reuse the memory
			* buffer on subsequent calls, i.e.
			*
			* @code{.cpp}
			*
			*     {
			*       // no buffer allocated
			*       Array buffer(NTA_BasicTypeInt64);
			*
			*       // buffer is allocated, and owned by Array object
			*       getParameterArray("foo", buffer);
			*
			*       // uses already-allocated buffer
			*       getParameterArray("foo", buffer);
			*
			*     } // Array destructor called -- frees the buffer
			* @endcode
			*
			* Throws an exception if the supplied @a array is not big enough.
			*
			*/
			//void getParameterArray(const std::string& name, Array & array) const;
			/*class_overload->add_overload("getParameterArray", {
				make_param<std::string>("name","string"),
				make_param<Array*>("value","Array")
			}, getParameterArray);
		*/
		/**
		* Set the parameter to an @c Array value.
		*
		* @param name
		*        The name of the parameter
		*
		* @param array
		*        The value of the parameter
		*
		*
		* @note @a array must be initialized before calling setParameterArray().
		*
		*/
		//void setParameterArray(const std::string& name, const Array & array);
		/*class_overload->add_overload("setParameterArray", {
			make_param<std::string>("name","string"),
			make_param<Array*>("value","Array")
		}, setParameterArray);
	*/
	/**
	* Set the parameter to a @c std::string value.
	*
	* @param name
	*        The name of the parameter
	*
	* @param s
	*        The value of the parameter
	*
	* Strings are handled internally as Byte Arrays, but this interface
	* is clumsy. setParameterString() and getParameterString() internally use
	* byte arrays but converts to/from strings.
	*
	* setParameterString() is implemented with one copy (from the string into
	* the node) but getParameterString() requires a second copy so that there
	* are temporarily three copies of the data in memory (in the node,
	* in an internal Array object, and in the string returned to the user)
	*
	*/
	//void setParameterString(const std::string& name, const std::string& s);
			class_overload->add_overload("setParameterString", {
				make_param<std::string>("name","string"),
				make_param<std::string>("value","string")
			}, setParameterString);

			/**
			* Get the parameter as a @c std::string value.
			*
			* @param name
			*        The name of the parameter
			*
			* @returns
			*         The value of the parameter
			*
			* @see setParameterString()
			*/
			//std::string getParameterString(const std::string& name);
			class_overload->add_overload("getParameterString", {
				make_param<std::string>("name","string")
			}, getParameterString);

			/**
			* Tells whether the parameter is shared.
			*
			* @param name
			*        The name of the parameter
			*
			* @returns
			*        Whether the parameter is shared
			*
			* @todo figure out what "shared" means here
			*
			* @note This method must be overridden by subclasses.
			*
			* Throws an exception if it's not overridden
			*/
			//bool isParameterShared(const std::string& name) const;
			class_overload->add_overload("isParameterShared", {
				make_param<std::string>("name","string")
			}, isParameterShared);

			/**
			* @}
			*
			* @name Inputs and outputs
			*
			* @{
			*
			*/

			/**
			* Copies data into the inputs of this region, using
			* the links that are attached to each input.
			*/
			//void prepareInputs();
			class_overload->add_overload("prepareInputs", {
			}, prepareInputs);

			/**
			* Get the input data.
			*
			*
			* @param inputName
			*        The name of the target input
			*
			* @returns An @c ArrayRef that contains the input data.
			*
			* @internal
			*
			* @note The data is either stored in the
			* the @c ArrayRef or point to the internal stored data,
			* the actual behavior is controlled by the 'copy' argument (see below).
			*
			* @todo what's the copy' argument mentioned here?
			*
			* @endinternal
			*
			*/
			//virtual ArrayRef getInputData(const std::string& inputName) const;
			class_overload->add_overload("getInputData", {
				make_param<std::string>("inputName","string")
			}, getInputData);

			/**
			* Get the output data.
			*
			* @param outputName
			*        The name of the target output
			*
			* @returns
			*        An @c ArrayRef that contains the output data.
			*
			* @internal
			*
			* @note The data is either stored in the
			* the @c ArrayRef or point to the internal stored data,
			* the actual behavior is controlled by the 'copy' argument (see below).
			*
			* @todo what's the copy' argument mentioned here?
			*
			* @endinternal
			*
			*/
			//virtual ArrayRef getOutputData(const std::string& outputName) const;
			class_overload->add_overload("getOutputData", {
				make_param<std::string>("outputName","string")
			}, getOutputData);
			/**
			* Get the count of input data.
			*
			* @param inputName
			*        The name of the target input
			*
			* @returns
			*        The count of input data
			*
			* @todo are getOutput/InputCount needed? count can be obtained from the array objects.
			*
			*/
			//virtual size_t getInputCount(const std::string& inputName) const;
			class_overload->add_overload("getInputCount", {
				make_param<std::string>("inputName","string")
			}, getInputCount);

			/**
			* Get the count of output data.
			*
			* @param outputName
			*        The name of the target output
			*
			* @returns
			*        The count of output data
			*
			* @todo are getOutput/InputCount needed? count can be obtained from the array objects.
			*
			*/
			//virtual size_t getOutputCount(const std::string& outputName) const;
			class_overload->add_overload("getOutputCount", {
				make_param<std::string>("outputName","string")
			}, getOutputCount);

			/**
			* @}
			*
			* @name Operations
			*
			* @{
			*
			*/

			/**
			* @todo Region::enable() not implemented, should it be part of API at all?
			*/
			//virtual void enable();
			class_overload->add_overload("enable", {
			}, enable);

			/**
			* @todo Region::disable() not implemented, should it be part of API at all?
			*/
			//virtual void disable();
			class_overload->add_overload("disable", {
			}, disable);

			/**
			* Request the underlying region to execute a command.
			*
			* @param args
			*        A list of strings that the actual region will interpret.
			*        The first string is the command name. The other arguments are optional.
			*
			* @returns
			*        The result value of command execution is a string determined
			*          by the underlying region.
			*/
			//virtual std::string executeCommand(const std::vector<std::string>& args);
			class_overload->add_overload("executeCommand", {
				make_param<std::shared_ptr<std::vector<std::string>>>("args","Array<string>")
			}, executeCommand);

			/**
			* Perform one step of the region computation.
			*/
			//void compute();
			class_overload->add_overload("compute", {
			}, compute);

			/**
			* @}
			*
			* @name Profiling
			*
			* @{
			*
			*/

			/**
			* Enable profiling of the compute and execute operations
			*/
			//void enableProfiling();
			class_overload->add_overload("enableProfiling", {
			}, enableProfiling);

			/**
			* Disable profiling of the compute and execute operations
			*/
			//void disableProfiling();
			class_overload->add_overload("disableProfiling", {
			}, disableProfiling);

			/**
			* Reset the compute and execute timers
			*/
			//void resetProfiling();
			class_overload->add_overload("resetProfiling", {
			}, resetProfiling);

			/**
			* Get the timer used to profile the compute operation.
			*
			* @returns
			*        The Timer object used to profile the compute operation
			*/
			//const Timer& getComputeTimer() const;
			class_overload->add_overload("getComputeTimer", {
			}, getComputeTimer);

			/**
			* Get the timer used to profile the execute operation.
			*
			* @returns
			*        The Timer object used to profile the execute operation
			*/
			//const Timer& getExecuteTimer() const;
			class_overload->add_overload("getExecuteTimer", {
			}, getExecuteTimer);

			/**
			* @}
			*/

			//#ifdef NTA_INTERNAL
				// Internal methods.

				// New region from parameter spec
				/*Region(std::string name,
					const std::string& type,
					const std::string& nodeParams,
					Network * network = nullptr);
			*/
			//class_overload->add_overload_constructor({
			//	make_param<std::string>("name","string"),
			//	make_param<std::string>("type","string"),
			//	make_param<std::string>("nodeParams","string"),
			//	make_param<Network*>("network","Network", nullptr)
			//}, New_params);

			// New region from serialized state
			/*Region(std::string name,
				const std::string& type,
				const Dimensions& dimensions,
				BundleIO& bundle,
				Network * network = nullptr);*/
				/*class_overload->add_overload_constructor({
					make_param<std::string>("name","string"),
					make_param<std::string>("type","string"),
					make_param<Dimensions*>("dimensions","Dimensions"),
					make_param<BundleIO*>("bundle","BundleIO"),
					make_param<Network*>("network","Network", nullptr)
				}, New_dimensions);*/

				// New region from capnp struct
				/*Region(std::string name, RegionProto::Reader& proto,
					Network* network = nullptr);*/
					/*class_overload->add_overload_constructor({
						make_param<std::string>("name","string"),
						make_param<RegionProto::Reader>("proto","RegionProto::Reader"),
						make_param<Network*>("network","Network",nullptr)
					}, New_proto);*/

					//virtual ~Region();

					//void initialize();
			class_overload->add_overload("initialize", {
			}, initialize);

			//bool isInitialized() const;
			class_overload->add_overload("isInitialized", {
			}, isInitialized);



			// Used by RegionImpl to get inputs/outputs
			//Output* getOutput(const std::string& name) const;
			class_overload->add_overload("getOutput", {
				make_param<std::string>("name","string")
			}, getOutput);

			//Input* getInput(const std::string& name) const;
			class_overload->add_overload("getInput", {
				make_param<std::string>("name","string")
			}, getInput);

			// These are used only for serialization
			/*const std::map<const std::string, Input*>&
				getInputs() const;*/
			class_overload->add_overload("getInputs", {
			}, getInputs);


			/*const std::map<const std::string, Output*>&
				getOutputs() const;*/
			class_overload->add_overload("getOutputs", {
			}, getOutputs);

			// The following methods are called by Network in initialization

			// Returns number of links that could not be fully evaluated
			//size_t evaluateLinks();
			class_overload->add_overload("evaluateLinks", {
			}, evaluateLinks);

			//std::string getLinkErrors() const;
			class_overload->add_overload("getLinkErrors", {
			}, getLinkErrors);

			//size_t getNodeOutputElementCount(const std::string& name);
			class_overload->add_overload("getNodeOutputElementCount", {
				make_param<std::string>("name","string")
			}, getNodeOutputElementCount);

			//void initOutputs();
			class_overload->add_overload("initOutputs", {
			}, initOutputs);

			//void initInputs() const;
			class_overload->add_overload("initInputs", {
			}, initInputs);

			//void intialize();
			class_overload->add_overload("intialize", {
			}, intialize);

			// Internal -- for link debugging
			//void setDimensionInfo(const std::string& info);
			class_overload->add_overload("setDimensionInfo", {
				make_param<std::string>("info","string")
			}, setDimensionInfo);


			//const std::string& getDimensionInfo() const;
			class_overload->add_overload("getDimensionInfo", {
			}, getDimensionInfo);

			//bool hasOutgoingLinks() const;
			class_overload->add_overload("hasOutgoingLinks", {
			}, hasOutgoingLinks);

			// These methods are needed for teardown choreography
			// in Network::~Network()
			// It is an error to call any region methods after uninitialize()
			// except removeAllIncomingLinks and ~Region
			//void uninitialize();
			class_overload->add_overload("uninitialize", {
			}, uninitialize);

			//void removeAllIncomingLinks();
			class_overload->add_overload("removeAllIncomingLinks", {
			}, removeAllIncomingLinks);

			//const NodeSet& getEnabledNodes() const;
			class_overload->add_overload("getEnabledNodes", {
			}, getEnabledNodes);

			// TODO: sort our phases api. Users should never call Region::setPhases
			// and it is here for serialization only.
			//void setPhases(std::set<UInt32>& phases);
			class_overload->add_overload("setPhases", {
				make_param<std::shared_ptr<std::set<nupic::UInt32>>>("phases","Set<UInt32>")
			}, setPhases);

			//std::set<UInt32>& getPhases();
			class_overload->add_overload("getPhases", {
			}, getPhases);

			// Called by Network for serialization
			//void serializeImpl(BundleIO& bundle);

			//using Serializable::write;
			//void write(RegionProto::Builder& proto) const;

			//using Serializable::read;
			//void read(RegionProto::Reader& proto);


		//#endif // NTA_INTERNAL

		}

		POLY_METHOD(Region::getNetwork) {}
		POLY_METHOD(Region::getName) {}
		POLY_METHOD(Region::getDimensions) {}
		POLY_METHOD(Region::setDimensions) {}
		POLY_METHOD(Region::getType) {}
		POLY_METHOD(Region::getSpec) {}
		POLY_METHOD(Region::getSpecFromType) {}
		POLY_METHOD(Region::registerPyRegion) {}
		POLY_METHOD(Region::registerCPPRegion) {}
		POLY_METHOD(Region::unregisterPyRegion) {}
		POLY_METHOD(Region::unregisterCPPRegion) {}
		POLY_METHOD(Region::getParameterInt32) {}
		POLY_METHOD(Region::getParameterUInt32) {}
		POLY_METHOD(Region::getParameterInt64) {}
		POLY_METHOD(Region::getParameterUInt64) {}
		POLY_METHOD(Region::getParameterReal32) {}
		POLY_METHOD(Region::getParameterReal64) {}
		POLY_METHOD(Region::getParameterHandle) {}
		POLY_METHOD(Region::getParameterBool) {}
		POLY_METHOD(Region::setParameterInt32) {}
		POLY_METHOD(Region::setParameterUInt32) {}
		POLY_METHOD(Region::setParameterInt64) {}
		POLY_METHOD(Region::setParameterUInt64) {}
		POLY_METHOD(Region::setParameterReal32) {}
		POLY_METHOD(Region::setParameterReal64) {}
		POLY_METHOD(Region::setParameterHandle) {}
		POLY_METHOD(Region::setParameterBool) {}
		POLY_METHOD(Region::getParameterArray) {}
		POLY_METHOD(Region::setParameterArray) {}
		POLY_METHOD(Region::setParameterString) {}
		POLY_METHOD(Region::getParameterString) {}
		POLY_METHOD(Region::isParameterShared) {}
		POLY_METHOD(Region::prepareInputs) {}
		POLY_METHOD(Region::getInputData) {}
		POLY_METHOD(Region::getOutputData) {}
		POLY_METHOD(Region::getInputCount) {}
		POLY_METHOD(Region::getOutputCount) {}
		POLY_METHOD(Region::enable) {}
		POLY_METHOD(Region::disable) {}
		POLY_METHOD(Region::executeCommand) {}
		POLY_METHOD(Region::compute) {}
		POLY_METHOD(Region::enableProfiling) {}
		POLY_METHOD(Region::disableProfiling) {}
		POLY_METHOD(Region::resetProfiling) {}
		POLY_METHOD(Region::getComputeTimer) {}
		POLY_METHOD(Region::getExecuteTimer) {}
		POLY_METHOD(Region::New_params) {}
		POLY_METHOD(Region::New_dimensions) {}
		POLY_METHOD(Region::New_proto) {}
		POLY_METHOD(Region::initialize) {}
		POLY_METHOD(Region::isInitialized) {}
		POLY_METHOD(Region::getOutput) {}
		POLY_METHOD(Region::getInput) {}
		POLY_METHOD(Region::getInputs) {}
		POLY_METHOD(Region::getOutputs) {}
		POLY_METHOD(Region::evaluateLinks) {}
		POLY_METHOD(Region::getLinkErrors) {}
		POLY_METHOD(Region::getNodeOutputElementCount) {}
		POLY_METHOD(Region::initOutputs) {}
		POLY_METHOD(Region::intialize) {}
		POLY_METHOD(Region::setDimensionInfo) {}
		POLY_METHOD(Region::getDimensionInfo) {}
		POLY_METHOD(Region::hasOutgoingLinks) {}
		POLY_METHOD(Region::uninitialize) {}
		POLY_METHOD(Region::removeAllIncomingLinks) {}
		POLY_METHOD(Region::getEnabledNodes) {}
		POLY_METHOD(Region::setPhases) {}
		POLY_METHOD(Region::getPhases) {}
		//POLY_METHOD(Region::write){}
		//POLY_METHOD(Region::read){}


	}
}