// /* ---------------------------------------------------------------------
//  * Numenta Platform for Intelligent Computing (NuPIC)
//  * Copyright (C) 2014, Numenta, Inc.  Unless you have an agreement
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
// import { Random } from "../../typings/index";
// // #include <iostream>
// // #include <fstream>
// // #include <stdio.h>
// // #include <time.h>
// // #include <Array>

// // #include <capnp/message.h>
// // #include <capnp/serialize.h>

// // #include <nupic/algorithms/SpatialPooler.hpp>
// // #include <nupic/math/SparseMatrix.hpp>
// // #include <nupic/os/Timer.hpp>
// // #include <nupic/utils/Random.hpp>

// // using namespace std;
// // using namespace nupic;
// // using namespace nupic::algorithms::spatial_pooler;

// function testSP():void
// {
//    let random = new Random(10)

//   const  inputSize = 500;
//   const  numColumns = 500;
//   const  w = 50;

//   Array<UInt> inputDims{inputSize};
//   Array<UInt> colDims{numColumns};

//   SpatialPooler sp1;
//   sp1.initialize(inputDims, colDims);

//   UInt input[inputSize];
//   for (let i = 0; i < inputSize; ++i)
//   {
//     if (i < w)
//     {
//       input[i] = 1;
//     } else {
//       input[i] = 0;
//     }
//   }
//   UInt output[numColumns];

//   for (let i = 0; i < 10000; ++i)
//   {
//     random.shuffle(input, input + inputSize);
//     sp1.compute(input, true, output);
//   }

//   // Now we reuse the last input to test after serialization

//   Array<UInt> activeColumnsBefore;
//   for (let i = 0; i < numColumns; ++i)
//   {
//     if (output[i] == 1)
//     {
//       activeColumnsBefore.push_back(i);
//     }
//   }

//   // Save initial trained model
//   ofstream osA("outA.proto", ofstream::binary);
//   sp1.write(osA);
//   osA.close();

//   ofstream osC("outC.proto", ofstream::binary);
//   sp1.save(osC);
//   osC.close();

//   let sp2 = new SpatialPooler();

//   let timeA = 0.0;
//   let timeC = 0.0;

//   for (let i = 0; i < 100; ++i)
//   {
//     // Create new input
//     random.shuffle(input, input + inputSize);

//     // Get expected output
//     UInt outputBaseline[numColumns];
//     sp1.compute(input, true, outputBaseline);

//     // A - First do iostream version
//     UInt outputA[numColumns];
//     {
//       SpatialPooler spTemp;

//       nupic::Timer testTimer;
//       testTimer.start();

//       // Deserialize
//       ifstream is("outA.proto", ifstream::binary);
//       spTemp.read(is);
//       is.close();

//       // Feed new record through
//       spTemp.compute(input, true, outputA);

//       // Serialize
//       ofstream os("outA.proto", ofstream::binary);
//       spTemp.write(os);
//       os.close();

//       testTimer.stop();
//       timeA = timeA + testTimer.getElapsed();
//     }

//     for (UInt i = 0; i < numColumns; ++i)
//     {
//       NTA_CHECK(outputBaseline[i] == outputA[i]);
//     }

//     // C - Next do old version
//     UInt outputC[numColumns];
//     {
//       SpatialPooler spTemp;

//       nupic::Timer testTimer;
//       testTimer.start();

//       // Deserialize
//       ifstream is("outC.proto", ifstream::binary);
//       spTemp.load(is);
//       is.close();

//       // Feed new record through
//       spTemp.compute(input, true, outputC);

//       // Serialize
//       ofstream os("outC.proto", ofstream::binary);
//       spTemp.save(os);
//       os.close();

//       testTimer.stop();
//       timeC = timeC + testTimer.getElapsed();
//     }

//     for (UInt i = 0; i < numColumns; ++i)
//     {
//       NTA_CHECK(outputBaseline[i] == outputC[i]);
//     }

//   }

//   remove("outA.proto");
//   remove("outC.proto");

//   console.log( "Timing for SpatialPooler serialization (smaller is better):" );
//   console.log( "Cap'n Proto: " , timeA );
//   console.log( "Manual: " , timeC );
// }

// function testRandomIOStream( n:UInt):void
// {
//   let r1 = new Random(7);
//   let r2 = new Random();

//   nupic::Timer testTimer;
//   testTimer.start();
//   for (UInt i = 0; i < n; ++i)
//   {
//     r1.getUInt32();

//     // Serialize
//     ofstream os("random2.proto", ofstream::binary);
//     r1.write(os);
//     os.flush();
//     os.close();

//     // Deserialize
//     ifstream is("random2.proto", ifstream::binary);
//     r2.read(is);
//     is.close();

//     // Test
//     NTA_CHECK(r1.getUInt32() == r2.getUInt32());
//     NTA_CHECK(r1.getUInt32() == r2.getUInt32());
//     NTA_CHECK(r1.getUInt32() == r2.getUInt32());
//     NTA_CHECK(r1.getUInt32() == r2.getUInt32());
//     NTA_CHECK(r1.getUInt32() == r2.getUInt32());
//   }
//   testTimer.stop();

//   remove("random2.proto");

//   cout << "Cap'n Proto: " << testTimer.getElapsed() << endl;
// }

// function testRandomManual( n:UInt): void
// {
//   let r1 = new Random(7);
//   let r2 = new Random();

//   nupic::Timer testTimer;
//   testTimer.start();
//   for (UInt i = 0; i < n; ++i)
//   {
//     r1.getUInt32();

//     // Serialize
//     ofstream os("random3.proto", ofstream::binary);
//     os << r1;
//     os.flush();
//     os.close();

//     // Deserialize
//     ifstream is("random3.proto", ifstream::binary);
//     is >> r2;
//     is.close();

//     // Test
//     NTA_CHECK(r1.getUInt32() == r2.getUInt32());
//     NTA_CHECK(r1.getUInt32() == r2.getUInt32());
//     NTA_CHECK(r1.getUInt32() == r2.getUInt32());
//     NTA_CHECK(r1.getUInt32() == r2.getUInt32());
//     NTA_CHECK(r1.getUInt32() == r2.getUInt32());
//   }
//   testTimer.stop();

//   remove("random3.proto");

//   console.log( "Manual: " , testTimer.getElapsed() );
// }

// // int main(int argc, const char * argv[])
// {
//   let n = 1000;
//   console.log("Timing for Random serialization (smaller is better):" );
//   testRandomIOStream(n);
//   testRandomManual(n);

//   testSP();

//   //return 0;
// }
