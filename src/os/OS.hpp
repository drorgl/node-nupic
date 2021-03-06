#ifndef _NUPIC_OS_OS_H_
#define _NUPIC_OS_OS_H_

//#include "nupic/os/OS.hpp"

#include "../nupic.h"

namespace node_nupic {
	namespace os {
		class OS : public overres::ObjectWrap {
		public:
			static void Init(v8::Handle<v8::Object> target, std::shared_ptr<namespace_wrap> overload);

			/*static Nan::Persistent<v8::FunctionTemplate> constructor;
			virtual v8::Local<v8::Function> get_constructor();

			static std::unordered_map<nupic::algorithms::ArrayBuffer*, std::weak_ptr<Input>> _inputs;

			std::shared_ptr<nupic::Input> _input;

			static POLY_METHOD(New);
			static POLY_METHOD(compute);*/
		};
	}
}

// /* ---------------------------------------------------------------------
//  * Numenta Platform for Intelligent Computing (NuPIC)
//  * Copyright (C) 2013, Numenta, Inc.  Unless you have an agreement
//  * with Numenta, Inc., for a separate license for this software code, the
//  * following terms and conditions apply:
//  *
//  * This program is free software: you can redistribute it and/or modify
//  * it under the terms of the GNU Affero Public License version 3 as
//  * published by the Free Software Foundation.
//  *
//  * This program is distributed in the hope that it will be useful,
//  * but WITHOUT ANY WARRANTY; without even the implied warranty of
//  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//  * See the GNU Affero Public License for more details.
//  *
//  * You should have received a copy of the GNU Affero Public License
//  * along with this program.  If not, see http://www.gnu.org/licenses.
//  *
//  * http://numenta.org/licenses/
//  * ---------------------------------------------------------------------
//  */

// /** @file
//  * Interface for the OS class
//  */

// #ifndef NTA_OS_HPP
// #define NTA_OS_HPP

// #include <string>
// #include <vector>
// #include <nupic/types/Types.hpp>

// #ifdef _MSC_VER
//   #pragma warning (disable: 4996)
//   // The POSIX name for this item is deprecated. Instead, use the ISO C++
//   // conformant name: _getpid.
// #endif

// namespace nupic
// {
//   /*
//    * removed for NuPIC 2:
//    * getHostname
//    * getUserNTADir
//    * setUserNTADir
//    * getProcessID
//    * getTempDir
//    * makeTempFilename
//    * sleep
//    * executeCommand
//    * genCryptoString
//    * verifyHostname
//    * isProcessAliveWin32
//    * killWin32
//    * getStackTrace
//    */

//   /**
//    * @b Responsibility
//    * Operating system functionality.
//    *
//    * @b Description
//    * OS is a set of static methods that provide access to operating system functionality
//    * for Numenta apps.
//    */

//   class OS
//   {
//   public:
//     /**
//      * Get the last error string
//      *
//      * @retval Returns character string containing the last error message.
//      */
//     static std::string getErrorMessage();

//     /**
//      *
//      *
//      * @return An OS/system library error code.
//      */
//     static int getLastErrorCode();

//     /**
//      * Get an OS-level error message associated with an error code.
//      *
//      * If no error code is specified, gets the error message associated
//      * with the last error code.
//      *
//      * @param An error code, usually reported by getLastErrorCode().
//      *
//      * @return An error message string.
//      */
//     static std::string getErrorMessageFromErrorCode(
//       int errorCode=getLastErrorCode());

//     /**
//      * Get the user's home directory
//      *
//      * The home directory is determined by common environment variables
//      * on different platforms.
//      *
//      * @retval Returns character string containing the user's home directory.
//      */
//     static std::string getHomeDir();

//     /**
//      * Get the user name
//      *
//      * A user name is disovered on unix by checking a few environment variables
//      * (USER, LOGNAME) and if not found defaulting to the user id. On Windows the
//      * USERNAME environment variable is set by the OS.
//      *
//      * @retval Returns character string containing the user name.
//      */
//     static std::string getUserName();

//     /**
//      * Get process memory usage
//      *
//      * Real and Virtual memory usage are returned in bytes
//      */
//     static void getProcessMemoryUsage(size_t& realMem, size_t& virtualMem);

//     /**
//      * Execute a command and and return its output.
//      *
//      * @param command
//      *        The command to execute
//      * @returns
//      *        The output of the command.
//      */
//      static std::string executeCommand(std::string command);
//   };
// }

// #endif // NTA_OS_HPP
#endif