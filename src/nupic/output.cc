#include "output.h"

#include "region.h"
#include "link.h"

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
			Output::Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload) {
			//input_general_callback::overload = overload;

			auto class_overload = overload->add_class("Output");
			/**
			* Constructor.
			*
			* @param region
			*        The region that the output belongs to.
			* @param type
			*        The type of the output, TODO
			* @param isRegionLevel
			*        Whether the output is region level, i.e. TODO
			*/
			//Output(Region& region, NTA_BasicType type, bool isRegionLevel);
			class_overload->add_overload_constructor({
				make_param<Region*>("region","Region"),
				make_param<NTA_BasicType>("type","NTA_BasicType"),
				make_param<bool>("isRegionLevel","bool")
			}, New_region);

			/**
			* Destructor
			*/
			//~Output();

			/**
			* Set the name for the output.
			*
			* Output need to know their own name for error messages.
			*
			* @param name
			*        The name of the output
			*/
			//void setName(const std::string& name);
			class_overload->add_overload("setName", {
				make_param<std::string>("name","string")
			}, setName);

			/**
			* Get the name of the output.
			*
			* @return
			*        The name of the output
			*/
			//const std::string& getName() const;
			class_overload->add_overload("getName", {}, getName);

			/**
			* Initialize the Output .
			*
			* @param size
			*        The count of node output element, i.e. TODO
			*
			* @note It's safe to reinitialize an initialized Output with the same
			* parameters.
			*
			*/
			//void initialize(size_t size);
			class_overload->add_overload("initialize", {
				make_param<size_t>("size","size_t")
			}, initialize);

			/**
			*
			* Add a Link to the Output .
			*
			* @note The Output does NOT take ownership of @a link, it's created and
			* owned by an Input Object.
			*
			* Called by Input.addLink()
			*
			* @param link
			*        The Link to add
			*/
			//void addLink(Link* link);
			class_overload->add_overload("addLink", {
				make_param<Link*>("link","Link")
			}, addLink);

			/**
			* Removing an existing link from the output.
			*
			* @note Called only by Input.removeLink() even if triggered by
			* Network.removeRegion() while removing the region that contains us.
			*
			* @param link
			*        The Link to remove
			*/
			//void removeLink(Link* link);
			class_overload->add_overload("removeLink", {
				make_param<Link*>("link","Link")
			}, removeLink);

			/**
			* Tells whether the output has outgoing links.
			*
			* @note We cannot delete a region if there are any outgoing links
			* This allows us to check in Network.removeRegion() and Network.~Network().
			* @returns
			*         Whether the output has outgoing links
			*/
			//bool hasOutgoingLinks();
			class_overload->add_overload("hasOutgoingLinks", {}, hasOutgoingLinks);

			/**
			*
			* Get the data of the output.
			*
			* @returns
			*         A constant reference to the data of the output as an @c Array
			*
			* @note It's mportant to return a const array so caller can't
			* reallocate the buffer.
			*/
			//const Array & getData() const;
			class_overload->add_overload("getData", {}, getData);

			/**
			*
			* Tells whether the output is region level.
			*
			* @returns
			*     Whether the output is region level, i.e. TODO
			*/
			//bool isRegionLevel() const;
			class_overload->add_overload("isRegionLevel", {}, isRegionLevel);

			/**
			*
			* Get the Region that the output belongs to.
			*
			* @returns
			*         The mutable reference to the Region that the output belongs to
			*/
			//Region& getRegion() const;
			class_overload->add_overload("getRegion", {}, getRegion);

			/**
			* Get the count of node output element.
			*
			* @returns
			*         The count of node output element, previously set by initialize().
			*/
			//size_t getNodeOutputElementCount() const;
			class_overload->add_overload("getNodeOutputElementCount", {}, getNodeOutputElementCount);

			constructor.Reset(class_overload->done<Output>());
		}


		POLY_METHOD(Output::New_region) { throw std::runtime_error("not implemented"); }
		POLY_METHOD(Output::setName) { throw std::runtime_error("not implemented"); }
		POLY_METHOD(Output::getName) { throw std::runtime_error("not implemented"); }
		POLY_METHOD(Output::initialize) { throw std::runtime_error("not implemented"); }
		POLY_METHOD(Output::addLink) { throw std::runtime_error("not implemented"); }
		POLY_METHOD(Output::removeLink) { throw std::runtime_error("not implemented"); }
		POLY_METHOD(Output::hasOutgoingLinks) { throw std::runtime_error("not implemented"); }
		POLY_METHOD(Output::getData) { throw std::runtime_error("not implemented"); }
		POLY_METHOD(Output::isRegionLevel) { throw std::runtime_error("not implemented"); }
		POLY_METHOD(Output::getRegion) { throw std::runtime_error("not implemented"); }
		POLY_METHOD(Output::getNodeOutputElementCount) { throw std::runtime_error("not implemented"); }

	}
}