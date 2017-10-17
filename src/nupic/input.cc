#include "input.h"

//namespace input_general_callback {
//	std::shared_ptr<overload_resolution> overload;
//	NAN_METHOD(callback) {
//		if (overload == nullptr) {
//			throw std::runtime_error("input_callback is empty");
//		}
//		return overload->execute("input", info);
//	}
//}

#include "region.h"
#include "link.h"
#include "output.h"

void
Input::Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload) {
	//input_general_callback::overload = overload;

	auto class_overload = overload->add_class("Input");
	
    // /**
    //  * Constructor.
    //  *
    //  * @param region
    //  *        The region that the input belongs to.
    //  * @param type
    //  *        The type of the input, i.e. TODO
    //  * @param isRegionLevel
    //  *        Whether the input is region level, i.e. TODO
    //  */
    // Input(Region& region, NTA_BasicType type, bool isRegionLevel);
	class_overload->add_overload_constructor({
			make_param<Region*>("region","Region"),
			make_param<int>("type", "NTA_BasicType"),
			make_param<bool>("isRegionLevel", "bool")
	}, New_region_type_level);
	// 	/**
	// 	 *
	// 	 * Destructor.
	// 	 *
	// 	 */
	// 	~Input();
	
	// 	/**
	// 	 *
	// 	 * Set the name for the input.
	// 	 *
	// 	 * Inputs need to know their own name for error messages.
	// 	 *
	// 	 * @param name
	// 	 *        The name of the input
	// 	 *
	// 	 */
	// 	void setName(const std::string& name);
	class_overload->add_overload("setName", {
		make_param<std::string>("name", "string")
	}, setName);
	// 	/**
	// 	 * Get the name of the input.
	// 	 *
	// 	 * @return
	// 	 *        The name of the input
	// 	 */
	// 	const std::string& getName() const;
	class_overload->add_overload("getName", {
	}, getName);
	
	// 	/**
	// 	 * Add the given link to this input and to the list of links on the output
	// 	 *
	// 	 * @param link
	// 	 *        The link to add.
	// 	 * @param srcOutput
	// 	 *        The output of previous Region, which is also the source of the input
	// 	 */
	// 	void
	// 	addLink(Link* link, Output* srcOutput);
	class_overload->add_overload("addLink", {
		make_param<Link*>("link", "Link"),
		make_param<Output*>("srcOutput","Output")
	}, addLink);
	// 	/**
	// 	 * Locate an existing Link to the input.
	// 	 *
	// 	 * It's called by Network.removeLink() and internally when adding a link
	// 	 *
	// 	 * @param srcRegionName
	// 	 *            The name of the source Region
	// 	 * @param srcOutputName
	// 	 *            The name of the source Output
	// 	 *
	// 	 * @returns
	// 	 *     The link if found or @c NULL if no such link exists
	// 	 */
	// 	Link*
	// 	findLink(const std::string& srcRegionName,
	// 			 const std::string& srcOutputName);
	class_overload->add_overload("findLink", {
		make_param<std::string>("srcRegionName", "string"),
		make_param<std::string>("srcOutputName", "string")
	}, findLink);
	
	// 	/**
	// 	 * Removing an existing link from the input.
	// 	 *
	// 	 * It's called in four cases:
	// 	 *
	// 	 * 1. Network.removeLink()
	// 	 * 2. Network.removeRegion() when given @a srcRegion
	// 	 * 3. Network.removeRegion() when given @a destRegion
	// 	 * 4. Network.~Network()
	// 	 *
	// 	 * It is an error to call this if our containing region
	// 	 * is uninitialized.
	// 	 *
	// 	 * @note This method will set the Link pointer to NULL on return (to avoid
	// 	 * a dangling reference)
	// 	 *
	// 	 * @param link
	// 	 *        The Link to remove, possibly retrieved by findLink(), note that
	// 	 *        it is a reference to the pointer, not the pointer itself.
	// 	 */
	// 	void
	// 	removeLink(Link*& link);
	class_overload->add_overload("removeLink", {
		make_param<Link*>("link", "Link")
	}, removeLink);
	
	// 	/**
	// 	 * Make input data available.
	// 	 *
	// 	 * Called by Region.prepareInputs()
	// 	 */
	// 	void
	// 	prepare();
	class_overload->add_overload("prepare", {
	}, prepare);
	
	// 	/**
	// 	 *
	// 	 * Get the data of the input.
	// 	 *
	// 	 * @returns
	// 	 *         A mutable reference to the data of the input as an @c Array
	// 	 */
	// 	const Array &
	// 	getData() const;
	class_overload->add_overload("getData", {
	}, getData);

	// 	/**
	// 	 *
	// 	 * Get the Region that the input belongs to.
	// 	 *
	// 	 * @returns
	// 	 *         The mutable reference to the Region that the input belongs to
	// 	 */
	// 	Region&
	// 	getRegion();
	class_overload->add_overload("getRegion", {
	}, getRegion);

	// 	/**
	// 	 *
	// 	 * Get all the Link objects added to the input.
	// 	 *
	// 	 * @returns
	// 	 *         All the Link objects added to the input
	// 	 */
	// 	const std::vector<Link*>&
	// 	getLinks();
	class_overload->add_overload("getLinks", {
	}, getLinks);

	// 	/**
	// 	 *
	// 	 * Tells whether the input is region level.
	// 	 *
	// 	 * @returns
	// 	 *     Whether the input is region level, i.e. TODO
	// 	 */
	// 	bool
	// 	isRegionLevel();
	class_overload->add_overload("isRegionLevel", {
	}, isRegionLevel);
	
	// 	/**
	// 	 * Called by Region.evaluateLinks() as part
	// 	 * of network initialization.
	// 	 *
	// 	 * 1. Tries to make sure that dimensions at both ends
	// 	 *    of a link are specified by calling setSourceDimensions()
	// 	 *    if possible, and then calling getDestDimensions()
	// 	 * 2. Ensures that region dimensions are consistent with
	// 	 *    either by setting destination region dimensions (this is
	// 	 *    where links "induce" dimensions) or by raising an exception
	// 	 *    if they are inconsistent.
	// 	 *
	// 	 * @returns
	// 	 *         Number of links that could not be fully evaluated, i.e. incomplete
	// 	 */
	// 	size_t
	// 	evaluateLinks();
	class_overload->add_overload("evaluateLinks", {
	}, evaluateLinks);
	
	// 	/**
	// 	 * Initialize the Input .
	// 	 *
	// 	 * After the input has all the information it needs, it is initialized by
	// 	 * this method. Volatile data structures (e.g. the input buffer) are set up。
	// 	 */
	// 	void
	// 	initialize();
	class_overload->add_overload("initialize", {
	}, initialize);

	// 	/**
	// 	 * Tells whether the Input is initialized.
	// 	 *
	// 	 * @returns
	// 	 *         Whether the Input is initialized
	// 	 */
	// 	bool
	// 	isInitialized();
	class_overload->add_overload("isInitialized", {
	}, isInitialized);
	
	// 	/* ------------ Methods normally called by the RegionImpl ------------- */
	
	// 	/**
	// 	 *
	// 	 * @see Link.buildSplitterMap()
	// 	 *
	// 	 */
	// 	typedef std::vector< std::vector<size_t> > SplitterMap;
	
	// 	/**
	// 	 *
	// 	 * Get splitter map from an initialized input
	// 	 *
	// 	 * @returns
	// 	 *         The splitter map
	// 	 */
	// 	const SplitterMap& getSplitterMap() const;
	class_overload->add_overload("getSplitterMap", {
	}, getSplitterMap);
	
	// 	/** explicitly instantiated for various types */
	// 	template <typename T> void getInputForNode(size_t nodeIndex, std::vector<T>& input) const;
	class_overload->add_overload("getInputForNode", {
		make_param<int>("nodeIndex", "size_t"),
		make_param<std::shared_ptr<std::vector<int>>>("input","Array")
	}, getInputForNode);
	
	constructor.Reset(class_overload->done<Input>());


}

v8::Local<v8::Function> Input::get_constructor() {
	return Nan::New(constructor)->GetFunction();
}

POLY_METHOD(Input::New_region_type_level) {
	if (!info.IsConstructCall())
		return Nan::ThrowTypeError("Cannot call constructor as function");

	auto region = info.at<Region*>(0);
	auto type = info.at<int>(1);
	auto isRegionLevel = info.at<bool>(2);

	Input *pt;
	throw std::runtime_error("not implemented");
/*
	pt = new Input();
	pt->_input = std::make_shared<nupic::Input>(*region, type, isRegionLevel);

	pt->Wrap(info.This());
	info.GetReturnValue().Set(info.This());*/
}

POLY_METHOD(Input::setName) {
	auto this_ = info.This<Input*>();
	auto name = info.at<std::string>(0);

	this_->_input->setName(name);
}

POLY_METHOD(Input::getName) {
	auto this_ = info.This<Input*>();

	info.SetReturnValue(this_->_input->getName());
}

POLY_METHOD(Input::addLink) {
	auto this_ = info.This<Input*>();
	auto link = info.at<Link*>(0);
	auto srcOutput = info.at<Output*>(1);

	this_->_input->addLink(link->_link.get(), srcOutput->_output.get());
}

POLY_METHOD(Input::findLink) {
	auto this_ = info.This<Input*>();
	auto srcRegionName = info.at<std::string>(0);
	auto srcOutputName = info.at<std::string>(1);

	auto link = this_->_input->findLink(srcRegionName, srcOutputName);

	throw std::runtime_error("incomplete implementation, need to find best way to return cached v8 objects");
	/*auto cached_link = Link::_links.find(link);
	if (cached_link != Link::_links.end()) {
		if (auto instance = cached_link->second.lock()) {
			info.SetReturnValue(instance);
		}
	}*/
}

POLY_METHOD(Input::removeLink) {
	auto this_ = info.This<Input*>();
	auto link = info.at<Link*>(0)->_link;

	//this_->_input->removeLink(link.get());
	throw std::runtime_error("not implemented");
}

POLY_METHOD(Input::prepare) {
	auto this_ = info.This<Input*>();

	this_->_input->prepare();
}

POLY_METHOD(Input::getData) {
	auto this_ = info.This<Input*>();
	throw std::runtime_error("not implemented");
}

POLY_METHOD(Input::getRegion) {
	auto this_ = info.This<Input*>();
	throw std::runtime_error("not implemented");
}

POLY_METHOD(Input::getLinks) {
	auto this_ = info.This<Input*>();
	throw std::runtime_error("not implemented");
}

POLY_METHOD(Input::isRegionLevel) {
	auto this_ = info.This<Input*>();
	throw std::runtime_error("not implemented");
}

POLY_METHOD(Input::evaluateLinks) {
	auto this_ = info.This<Input*>();
	throw std::runtime_error("not implemented");
}

POLY_METHOD(Input::initialize) {
	auto this_ = info.This<Input*>();
	throw std::runtime_error("not implemented");
}

POLY_METHOD(Input::isInitialized) {
	auto this_ = info.This<Input*>();
	throw std::runtime_error("not implemented");
}

POLY_METHOD(Input::getSplitterMap) {
	auto this_ = info.This<Input*>();
	throw std::runtime_error("not implemented");
}

POLY_METHOD(Input::getInputForNode) {
	auto this_ = info.This<Input*>();
	throw std::runtime_error("not implemented");
}

