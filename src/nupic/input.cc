#include "input.h"

namespace input_general_callback {
	std::shared_ptr<overload_resolution> overload;
	NAN_METHOD(callback) {
		if (overload == nullptr) {
			throw std::runtime_error("input_callback is empty");
		}
		return overload->execute("input", info);
	}
}

void
input::Init(Handle<Object> target, std::shared_ptr<overload_resolution> overload) {
	input_general_callback::overload = overload;

	
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
	
	// 	/**
	// 	 * Get the name of the input.
	// 	 *
	// 	 * @return
	// 	 *        The name of the input
	// 	 */
	// 	const std::string& getName() const;
	
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
	
	// 	/**
	// 	 * Make input data available.
	// 	 *
	// 	 * Called by Region.prepareInputs()
	// 	 */
	// 	void
	// 	prepare();
	
	// 	/**
	// 	 *
	// 	 * Get the data of the input.
	// 	 *
	// 	 * @returns
	// 	 *         A mutable reference to the data of the input as an @c Array
	// 	 */
	// 	const Array &
	// 	getData() const;
	
	// 	/**
	// 	 *
	// 	 * Get the Region that the input belongs to.
	// 	 *
	// 	 * @returns
	// 	 *         The mutable reference to the Region that the input belongs to
	// 	 */
	// 	Region&
	// 	getRegion();
	
	// 	/**
	// 	 *
	// 	 * Get all the Link objects added to the input.
	// 	 *
	// 	 * @returns
	// 	 *         All the Link objects added to the input
	// 	 */
	// 	const std::vector<Link*>&
	// 	getLinks();
	
	// 	/**
	// 	 *
	// 	 * Tells whether the input is region level.
	// 	 *
	// 	 * @returns
	// 	 *     Whether the input is region level, i.e. TODO
	// 	 */
	// 	bool
	// 	isRegionLevel();
	
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
	
	// 	/**
	// 	 * Initialize the Input .
	// 	 *
	// 	 * After the input has all the information it needs, it is initialized by
	// 	 * this method. Volatile data structures (e.g. the input buffer) are set up。
	// 	 */
	// 	void
	// 	initialize();
	
	// 	/**
	// 	 * Tells whether the Input is initialized.
	// 	 *
	// 	 * @returns
	// 	 *         Whether the Input is initialized
	// 	 */
	// 	bool
	// 	isInitialized();
	
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
	
	// 	/** explicitly instantiated for various types */
	// 	template <typename T> void getInputForNode(size_t nodeIndex, std::vector<T>& input) const;
	

	// /** @overload */
	// overload->addOverload("features2d", "", "FAST", {
	// 	make_param<IOArray*>("image","IOArray"),
	// 	make_param<std::shared_ptr<overres::Callback>>("cb","Function"),// : (keypoints : Array<_types.KeyPoint>) = > void,
	// 	make_param<int>("threshold","int"),
	// 	make_param<bool>("nonmaxSuppression","bool",true)
	// }, FAST_a);


}



POLY_METHOD(features2d::drawKeypoints){
	auto image		= info.at<IOArray*>(0)->GetInputArray();
	auto keypoints	= *info.at<std::shared_ptr<std::vector<KeyPoint*>>>(1);
	auto outImage = info.at<IOArray*>(2)->GetInputOutputArray();
	auto color = info.at<Scalar*>(3)->_scalar;
	auto flags = info.at<int>(4);

	std::unique_ptr<std::vector<cv::KeyPoint>> vec_kp = std::make_unique<std::vector<cv::KeyPoint>>();
	std::transform(std::begin(keypoints), std::end(keypoints), std::back_inserter(*vec_kp), [](const KeyPoint* kpi) {return *kpi->_keyPoint; });

	cv::drawKeypoints(image, *vec_kp, outImage, *color, flags);
}

