#include "link.h"

#include "input.h"
#include "output.h"
#include "dimensions.h"

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
Link::Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload) {
	//input_general_callback::overload = overload;

	auto class_overload = overload->add_class("Link");
	


	/**
	* @name Initialization
	*
	* @{
	*
	* Links have four-phase initialization.
	*
	* 1. construct with link type, params, names of regions and inputs/outputs
	* 2. wire in to network (setting src and dest Output/Input pointers)
	* 3. set source and destination dimensions
	* 4. initialize -- sets the offset in the destination Input (not known earlier)
	*
	* De-serializing is the same as phase 1.
	*
	* In phase 3, NuPIC will set and/or get source and/or destination
	* dimensions until both are set. Normally we will only set the src dimensions,
	* and the dest dimensions will be induced. It is possible to go the other
	* way, though.
	*
	* The @a linkType and @a linkParams parameters are given to
	* the LinkPolicyFactory to create a link policy
	*
	* @todo Should LinkPolicyFactory be documented?
	*
	*/

	/**
	* Initialization Phase 1: setting parameters of the link.
	*
	* @param linkType
	*            The type of the link
	* @param linkParams
	*            The parameters of the link
	* @param srcRegionName
	*            The name of the source Region
	* @param destRegionName
	*            The name of the destination Region
	* @param srcOutputName
	*            The name of the source Output
	* @param destInputName
	*            The name of the destination Input
	* @param propagationDelay
	*            Propagation delay of the link as number of network run
	*            iterations involving the link as input; the delay vectors, if
	*            any, are initially populated with 0's. Defaults to 0=no delay.
	*            Per design, data on no-delay links is to become available to
	*            destination inputs within the same time step, while data on
	*            delayed links (propagationDelay > 0) is to be updated
	*            "atomically" between time steps.
	*
	* @internal
	*
	* @todo It seems this constructor should be deprecated in favor of the other,
	* which is less redundant. This constructor is being used for unit testing
	* and unit testing links and for deserializing networks.
	*
	* See comments below commonConstructorInit_()
	*
	* @endinternal
	*
	*/
	/*Link(const std::string& linkType, const std::string& linkParams,
		const std::string& srcRegionName, const std::string& destRegionName,
		const std::string& srcOutputName = "",
		const std::string& destInputName = "",
		const size_t propagationDelay = 0);*/

	class_overload->add_overload_constructor({
		make_param<std::string>("linkType","string"),
		make_param<std::string>("linkParams","string"),
		make_param<std::string>("srcRegionName","string"),
		make_param<std::string>("destRegionName","string"),
		make_param<std::string>("srcOutputName","string", ""),
		make_param<std::string>("destInputName","string", ""),
		make_param<size_t>("propagationDelay","size_t", 0)
	}, New_name);

	/**
	* De-serialization use case. Creates a "blank" link. The caller must follow
	* up with Link::read and Link::connectToNetwork
	*
	* @param proto
	*            LinkProto::Reader
	*/
	//Link();
	class_overload->add_overload_constructor({
	}, New);

	/**
	* Initialization Phase 2: connecting inputs/outputs to
	* the Network.
	*
	* @param src
	*            The source Output of the link
	* @param dest
	*            The destination Input of the link
	*/
	//void connectToNetwork(Output* src, Input* dest);
	class_overload->add_overload("connectToNetwork", {
		make_param<Output*>("src","Output"),
		make_param<Input*>("dest","Input")
	}, connectToNetwork);

	/*
	* Initialization Phase 1 and 2.
	*
	* @param linkType
	*            The type of the link
	* @param linkParams
	*            The parameters of the link
	* @param srcOutput
	*            The source Output of the link
	* @param destInput
	*            The destination Input of the link
	* @param propagationDelay
	*            Propagation delay of the link as number of network run
	*            iterations involving the link as input; the delay vectors, if
	*            any, are initially populated with 0's. Defaults to 0=no delay
	*/
	/*Link(const std::string& linkType, const std::string& linkParams,
		Output* srcOutput, Input* destInput, size_t propagationDelay = 0);
*/
	class_overload->add_overload_constructor({
		make_param<std::string>("linkType","string"),
		make_param<std::string>("linkParams","string"),
		make_param<Output*>("srcOutput","Output"),
		make_param<Input*>("destInput","Input"),
		make_param<size_t>("propagationDelay","size_t", 0)
	}, New_type);
	/**
	* Initialization Phase 3: set the Dimensions for the source Output, and
	* induce the Dimensions for the destination Input .
	*
	*
	* @param dims
	*         The Dimensions for the source Output
	*/
	//void setSrcDimensions(Dimensions& dims);
	class_overload->add_overload("setSrcDimensions", {
		make_param<Dimensions*>("dims","Dimensions")
	}, setSrcDimensions);
	/**
	* Initialization Phase 3: Set the Dimensions for the destination Input, and
	* induce the Dimensions for the source Output .
	*
	* @param dims
	*         The Dimensions for the destination Input
	*/
	//void setDestDimensions(Dimensions& dims);
	class_overload->add_overload("setDestDimensions", {
		make_param<Dimensions*>("dims","Dimensions")
	}, setDestDimensions);

	/**
	* Initialization Phase 4: sets the offset in the destination Input .
	*
	* @param destinationOffset
	*            The offset in the destination Input, i.e. TODO
	*
	*/
	//void initialize(size_t destinationOffset);
	class_overload->add_overload("initialize", {
		make_param<int>("destinationOffset","size_t")
	}, initialize);
	/**
	* Destructor
	*/
	//~Link();

	/**
	* @}
	*
	* @name Parameter getters of the link
	*
	* @{
	*
	*/

	/**
	* Get the Dimensions for the source Output .
	*
	* @returns
	*         The Dimensions for the source Output
	*/
	//const Dimensions& getSrcDimensions() const;
	class_overload->add_overload("getSrcDimensions", {}, getSrcDimensions);

	/**
	* Get the Dimensions for the destination Input .
	*
	* @returns
	*         The Dimensions for the destination Input
	*/
	//const Dimensions& getDestDimensions() const;
	class_overload->add_overload("getDestDimensions", {}, getDestDimensions);

	/**
	* Get the type of the link.
	*
	* @returns
	*         The type of the link
	*/
	//const std::string& getLinkType() const;
	class_overload->add_overload("getLinkType", {}, getLinkType);

	/**
	* Get the parameters of the link.
	*
	* @returns
	*         The parameters of the link
	*/
	//const std::string& getLinkParams() const;
	class_overload->add_overload("getLinkParams", {}, getLinkParams);

	/**
	* Get the name of the source Region
	*
	* @returns
	*         The name of the source Region
	*/
	//const std::string& getSrcRegionName() const;
	class_overload->add_overload("getSrcRegionName", {}, getSrcRegionName);

	/**
	* Get the name of the source Output.
	*
	* @returns
	*         The name of the source Output
	*/
	//const std::string& getSrcOutputName() const;
	class_overload->add_overload("getSrcOutputName", {}, getSrcOutputName);

	/**
	* Get the name of the destination Region.
	*
	* @returns
	*         The name of the destination Region
	*
	*/
	//const std::string& getDestRegionName() const;
	class_overload->add_overload("getDestRegionName", {}, getDestRegionName);

	/**
	* Get the name of the destination Input.
	*
	* @returns
	*         The name of the destination Input
	*/
	//const std::string& getDestInputName() const;
	class_overload->add_overload("getDestInputName", {}, getDestInputName);

	/**
	* @}
	*
	* @name Misc
	*
	* @{
	*/

	// The methods below only work on connected links (after phase 2)

	/**
	*
	* Get a generated name of the link in the form
	* RegName.outName --> RegName.inName for debug logging purposes only.
	*/
	//std::string getMoniker() const;
	class_overload->add_overload("getMoniker", {}, getMoniker);

	/**
	*
	* Get the source Output of the link.
	*
	* @returns
	*         The source Output of the link
	*/
	//Output& getSrc() const;
	class_overload->add_overload("getSrc", {}, getSrc);

	/**
	*
	* Get the destination Input of the link.
	*
	* @returns
	*         The destination Input of the link
	*/
	//Input& getDest() const;
	class_overload->add_overload("getDest", {}, getDest);

	/**
	* Copy data from source to destination.
	*
	* Nodes request input data from their input objects. The input objects,
	* in turn, request links to copy data into the inputs.
	*
	* @note This method must be called on a fully initialized link(all 4 phases).
	*
	*/
	//void compute();
	class_overload->add_overload("compute", {}, compute);

	/**
	* Build a splitter map from the link.
	*
	* @param[out] splitter
	*            The built SplitterMap
	*
	* A splitter map is a matrix that maps the full input
	* of a region to the inputs of individual nodes within
	* the region.
	* A splitter map "sm" is declared as:
	*
	*     vector< vector<size_t> > sm;
	*
	*     sm.length() == number of nodes
	*
	* `sm[i]` is a "sparse vector" used to gather the input
	* for node i. `sm[i].size()` is the size (in elements) of
	* the input for node i.
	*
	* `sm[i]` gathers the inputs as follows:
	*
	*     T *regionInput; // input buffer for the whole region
	*     T *nodeInput; // pre-allocated
	*     for (size_t elem = 0; elem < sm[i].size; elem++)
	*        nodeInput[elem] = regionInput[sm[i][elem]];
	*
	* The offset specified by `sm[i][j]` is in units of elements.
	* To get byte offsets, you'd multiply by the size of an input/output
	* element.
	*
	* An input to a region may come from several links.
	* Each link contributes a contiguous block of the region input
	* starting from a certain offset. The splitter map indices are
	* with respect to the full region input, not the partial region
	* input contributed by this link, so the destinationOffset for this
	* link is included in each of the splitter map entries.
	*
	* Finally, the API is designed so that each link associated with
	* an input can contribute its portion to a full splitter map.
	* Thus the splitter map is an input-output parameter. This method
	* appends data to each row of the splitter map, assuming that
	* existing data in the splitter map comes from other links.
	*
	* For region-level inputs, a splitter map has just a single row.
	*
	* ### Splitter map ownership
	*
	* The splitter map is owned by the containing Input. Each Link
	* in the input contributes a portion to the splitter map, through
	* the buildSplitterMap method.
	*
	*/
	//void buildSplitterMap(Input::SplitterMap& splitter);
	/*class_overload->add_overload("buildSplitterMap", {
		make_param<SplitterMap*>("splitter", "SplitterMap")
	}, buildSplitterMap);*/

	/*
	* No-op for links without delay; for delayed links, remove head element of
	* the propagation delay buffer and push back the current value from source.
	*
	* NOTE It's intended that this method be called exactly once on all links
	* within a network at the end of every time step. Network::run calls it
	* automatically on all links at the end of each time step.
	*/
	//void shiftBufferedData();
	class_overload->add_overload("shiftBufferedData", {}, shiftBufferedData);

	/**
	* Convert the Link to a human-readable string.
	*
	* @returns
	*     The human-readable string describing the Link
	*/
	//const std::string toString() const;
	class_overload->add_overload("toString", {}, toString);

	/**
	* Serialize the link.
	*
	* @param f
	*            The output stream being serialized to
	* @param link
	*            The Link being serialized
	*/
	/*friend std::ostream& operator<<(std::ostream& f, const Link& link);

	using Serializable::write;
	void write(LinkProto::Builder& proto) const;

	using Serializable::read;
	void read(LinkProto::Reader& proto);*/


	constructor.Reset(class_overload->done<Link>());
}

v8::Local<v8::Function> Input::get_constructor() {
	return Nan::New(constructor)->GetFunction();
}



POLY_METHOD(Link::New) {
	throw std::runtime_error("not implemented");
	/*if (!info.IsConstructCall())
		return Nan::ThrowTypeError("Cannot call constructor as function");

	auto region = info.at<Region*>(0);
	auto type = info.at<int>(1);
	auto isRegionLevel = info.at<bool>(2);

	Input *pt;

	pt = new Input();
	pt->_input = std::make_shared<nupic::Input>(*region, type, isRegionLevel);

	pt->Wrap(info.This());
	info.GetReturnValue().Set(info.This());*/
}
POLY_METHOD(Link::New_type) {

}
POLY_METHOD(Link::New_name) {}
POLY_METHOD(Link::connectToNetwork) {
	auto this_ = info.This<Link*>();
}
POLY_METHOD(Link::setSrcDimensions) {
	auto this_ = info.This<Link*>();


}

POLY_METHOD(Link::setDestDimensions) {
	auto this_ = info.This<Link*>();
}


POLY_METHOD(Link::initialize) {
	auto this_ = info.This<Link*>();
}


POLY_METHOD(Link::getSrcDimensions) {
	auto this_ = info.This<Link*>();
}
POLY_METHOD(Link::getDestDimensions) {
	auto this_ = info.This<Link*>();
}
POLY_METHOD(Link::getLinkType) {
	auto this_ = info.This<Link*>();
}
POLY_METHOD(Link::getLinkParams) {
	auto this_ = info.This<Link*>();
}
POLY_METHOD(Link::getSrcRegionName) {
	auto this_ = info.This<Link*>();
}
POLY_METHOD(Link::getSrcOutputName) {
	auto this_ = info.This<Link*>();
}
POLY_METHOD(Link::getDestRegionName) {
	auto this_ = info.This<Link*>();
}
POLY_METHOD(Link::getDestInputName) {
	auto this_ = info.This<Link*>();
}
POLY_METHOD(Link::getMoniker) {
	auto this_ = info.This<Link*>();
}
POLY_METHOD(Link::getSrc){
	auto this_ = info.This<Link*>();
}
POLY_METHOD(Link::getDest) {
	auto this_ = info.This<Link*>();
}
POLY_METHOD(Link::compute) {
	auto this_ = info.This<Link*>();
}
POLY_METHOD(Link::buildSplitterMap) {
	auto this_ = info.This<Link*>();

}
POLY_METHOD(Link::shiftBufferedData) {
	auto this_ = info.This<Link*>();
}
POLY_METHOD(Link::toString) {
	auto this_ = info.This<Link*>();
}
