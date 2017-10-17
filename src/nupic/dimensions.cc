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
Dimensions::Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload) {
	//input_general_callback::overload = overload;

	auto class_overload = overload->add_class("Dimensions");
	/**
	* Create a new Dimensions object.
	*
	* @note Default dimensions are unspecified, see isUnspecified()
	*
	*/
	//Dimensions();
	class_overload->add_overload_constructor({
	}, New);

	/**
	* Create a new Dimensions object from a @c std::vector<size_t>.
	*
	* @param v
	*        A @c std::vector of @c size_t, the value with the index of @a n
	*        is the size of the @a n th dimension
	*
	*/
	//Dimensions(std::vector<size_t> v);
	class_overload->add_overload_constructor({
		make_param<std::shared_ptr<std::vector<int>>>("v", "Array<int>")
	}, New_v);

	/** Create a new 1-dimension Dimensions object.

	* @param x
	*        The size of the 1st dimension
	*
	*/
	//Dimensions(size_t x);
	class_overload->add_overload_constructor({
		make_param<int>("x","size_t")
	}, New_x);

	/**
	* Create a new 2-dimension Dimensions.
	*
	* @param x
	*        The size of the 1st dimension
	* @param y
	*        The size of the 2nd dimension
	*/
	//Dimensions(size_t x, size_t y);
	class_overload->add_overload_constructor({
		make_param<int>("x","size_t"),
		make_param<int>("y","size_t")
	}, New_x_y);

	/**
	* Create a new 3-dimension Dimensions.
	*
	* @param x
	*        The size of the 1st dimension
	* @param y
	*        The size of the 2nd dimension
	* @param z
	*        The size of the 3rd dimension
	*/
	//Dimensions(size_t x, size_t y, size_t z);
	class_overload->add_overload_constructor({
		make_param<int>("x","size_t"),
		make_param<int>("y","size_t"),
		make_param<int>("z","size_t")
	}, New_x_y_z);

	/**
	*
	* @}
	*
	* @name Properties
	*
	* @{
	*
	*/

	/**
	* Get the count of cells in the grid, which is the product of the sizes of
	* the dimensions.
	*
	* @returns
	*        The count of cells in the grid.
	*/
	/*size_t
		getCount() const;*/
	class_overload->add_overload("getCount", {}, getCount);

	/**
	*
	* Get the number of dimensions.
	*
	* @returns number of dimensions
	*
	*/
	/*size_t
		getDimensionCount() const;*/
	class_overload->add_overload("getDimensionCount", {}, getDimensionCount);

	/**
	* Get the size of a dimension.
	*
	* @param index
	*        The index of the dimension
	*
	* @returns
	*        The size of the dimension with the index of @a index
	*
	* @note Do not confuse @a index with "linear index" as in getIndex()
	*/
	/*size_t
		getDimension(size_t index) const;*/
	class_overload->add_overload("getDimension", {
		make_param<int>("index","size_t")
	}, getDimension);

	/**
	*
	* @}
	*
	* @name Boolean properties
	*
	* There are two "special" values for dimensions:
	*
	* * Dimensions of `[]` (`dims.size()==0`) means "not yet known" aka
	* "unspecified", see isUnspecified()
	* * Dimensions of `[0]`  (`dims.size()==1 && dims[0] == 0`) means
	* "don't care", see isDontcare()
	*
	* @{
	*
	*/

	/**
	* Tells whether the Dimensions object is "unspecified".
	*
	* @returns
	*     Whether the Dimensions object is "unspecified"
	*
	* @see isSpecified()
	*/
	/*bool
		isUnspecified() const;*/
	class_overload->add_overload("isUnspecified", {}, isUnspecified);

	/**
	*
	* Tells whether the Dimensions object is "don't care".
	*
	* @returns
	*     Whether the Dimensions object is "don't care"
	*/
	/*bool
		isDontcare() const;*/
	class_overload->add_overload("isDontcare", {}, isDontcare);

	/**
	* Tells whether the Dimensions object is "specified".
	*
	* A "specified" Dimensions object satisfies all following conditions:
	*
	*   * "valid"
	*   * NOT "unspecified"
	*   * NOT "don't care"
	*
	* @returns
	*       Whether the Dimensions object is "specified"
	*
	* @note It's not the opposite of isUnspecified()!
	*/
	/*bool
		isSpecified() const;*/
	class_overload->add_overload("isSpecified", {}, isSpecified);

	/**
	* Tells whether the sizes of all dimensions are 1.
	*
	* @returns
	*       Whether the sizes of all dimensions are 1, e.g. [1], [1 1], [1 1 1], etc.
	*/
	/*bool
		isOnes() const;*/
	class_overload->add_overload("isOnes", {}, isOnes);

	/**
	* Tells whether Dimensions is "valid".
	*
	* A Dimensions object is valid if it specifies actual dimensions, i.e. all
	* dimensions have a size greater than 0, or is a special value
	* ("unspecified"/"don't care").
	*
	* A Dimensions object is invalid if any dimensions are 0 (except for "don't care")
	*
	* @returns
	*       Whether Dimensions is "valid"
	*/
	/*bool
		isValid() const;*/
	class_overload->add_overload("isValid", {}, isValid);

	/**
	*
	* @}
	*
	* @name Coordinate<->index mapping
	*
	* Coordinate<->index mapping is in lower-major order, i.e.
	* for Region with dimensions `[2,3]`:
	*
	*     [0,0] -> index 0
	*     [1,0] -> index 1
	*     [0,1] -> index 2
	*     [1,1] -> index 3
	*     [0,2] -> index 4
	*     [1,2] -> index 5
	*
	* @{
	*
	*/

	/**
	* Convert a Coordinate to a linear index (in lower-major order).
	*
	* @param coordinate
	*        The coordinate to be converted
	*
	* @returns
	*        The linear index corresponding to @a coordinate
	*/
	/*size_t
		getIndex(const Coordinate& coordinate) const;*/
	/*class_overload->add_overload("getIndex", {
		make_param<Coordinate*>("coordinate","Coordinate")
	}, getIndex);*/

	/**
	* Convert a linear index (in lower-major order) to a Coordinate.
	*
	* @param index
	*        The linear index to be converted
	*
	* @returns
	*        The Coordinate corresponding to @a index
	*/
	/*Coordinate
		getCoordinate(const size_t index) const;*/
	class_overload->add_overload("getCoordinate", {
		make_param<int>("index","size_t")
	}, getCoordinate);

	/**
	*
	* @}
	*
	* @name Misc
	*
	* @{
	*
	*/

	/**
	*
	* Convert the Dimensions object to string representation.
	*
	* In most cases, we want a human-readable string, but for
	* serialization we want only the actual dimension values
	*
	* @param humanReadable
	*        The default is @c true, make the string human-readable,
	*        set to @c false for serialization
	*
	* @returns
	*        The string representation of the Dimensions object
	*/
	/*std::string
		toString(bool humanReadable = true) const;*/
	class_overload->add_overload("toString", {
		make_param<bool>("humanReadable","bool")
	}, toString);

	/**
	* Promote the Dimensions object to a new dimensionality.
	*
	* @param newDimensionality
	*        The new dimensionality to promote to, it can be greater than,
	*        smaller than or equal to current dimensionality
	*
	* @note The sizes of all dimensions must be 1( i.e. isOnes() returns true),
	* or an exception will be thrown.
	*/
	/*void
		promote(size_t newDimensionality);*/
	class_overload->add_overload("promote", {
		make_param<int>("newDimensionality","size_t")
	}, promote);

	/**
	* The equivalence operator.
	*
	* Two Dimensions objects will be considered equivalent, if any of the
	* following satisfies:
	*
	* * They have the same number of dimensions and the same size for every
	* dimension.
	* * Both of them have the size of 1 for everything dimensions, despite of
	* how many dimensions they have, i.e. isOnes() returns @c true for both
	* of them. Some linking scenarios require us to treat [1] equivalent to [1 1] etc.
	*
	* @param dims2
	*        The Dimensions object being compared
	*
	* @returns
	*        Whether this Dimensions object is equivalent to @a dims2.
	*
	*/
	/*bool
		operator == (const Dimensions& dims2) const;
*/
	/**
	* The in-equivalence operator, the opposite of operator==().
	*
	* @param dims2
	*        The Dimensions object being compared
	*
	* @returns
	*        Whether this Dimensions object is not equivalent to @a dims2.
	*/
	/*bool
		operator != (const Dimensions& dims2) const;*/
}



POLY_METHOD(Dimensions::New) {
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
POLY_METHOD(Dimensions::New_v) {
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
POLY_METHOD(Dimensions::New_x) {
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
POLY_METHOD(Dimensions::New_x_y) {
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
POLY_METHOD(Dimensions::New_x_y_z) {
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
POLY_METHOD(Dimensions::getCount) {
	auto this_ = info.This<Dimensions*>();
	throw std::runtime_error("not implemented");
}
POLY_METHOD(Dimensions::getDimensionCount) {
	auto this_ = info.This<Dimensions*>();
	throw std::runtime_error("not implemented");
}
POLY_METHOD(Dimensions::getDimension) {
	auto this_ = info.This<Dimensions*>();
	throw std::runtime_error("not implemented");
}
POLY_METHOD(Dimensions::isUnspecified) {
	auto this_ = info.This<Dimensions*>();
	throw std::runtime_error("not implemented");
}
POLY_METHOD(Dimensions::isDontcare) {
	auto this_ = info.This<Dimensions*>();
	throw std::runtime_error("not implemented");
}
POLY_METHOD(Dimensions::isSpecified) {
	auto this_ = info.This<Dimensions*>();
	throw std::runtime_error("not implemented");
}
POLY_METHOD(Dimensions::isOnes) {
	auto this_ = info.This<Dimensions*>();
	throw std::runtime_error("not implemented");
}
POLY_METHOD(Dimensions::isValid) {
	auto this_ = info.This<Dimensions*>();
	throw std::runtime_error("not implemented");
}
POLY_METHOD(Dimensions::getIndex) {
	auto this_ = info.This<Dimensions*>();
	throw std::runtime_error("not implemented");
}
POLY_METHOD(Dimensions::getCoordinate) {
	auto this_ = info.This<Dimensions*>();
	throw std::runtime_error("not implemented");
}
POLY_METHOD(Dimensions::toString) {
	auto this_ = info.This<Dimensions*>();
	throw std::runtime_error("not implemented");
}
POLY_METHOD(Dimensions::promote) {
	auto this_ = info.This<Dimensions*>();
	throw std::runtime_error("not implemented");
}
