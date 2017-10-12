// /* ---------------------------------------------------------------------
//  * Numenta Platform for Intelligent Computing (NuPIC)
//  * Copyright (C) 2017, Numenta, Inc.  Unless you have an agreement
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
// import { TEST, ASSERT_EQ } from "../test_base";

// import { bool, svm_parameter } from "../../../typings/index";

// // #include <fstream>
// // #include <stdio.h>
// // #include <vector>

// // #include <nupic/algorithms/Svm.hpp>

// // #include "gtest/gtest.h"

// // using namespace nupic;
// // using namespace nupic::algorithms::svm;

// namespace svmtests {

// 	function check_eq<T>(v1: T[], v2: T[]): void {
// 		ASSERT_EQ(v1.length, v2.length);
// 		for (let i = 0; i < v1.length; ++i) {
// 			ASSERT_EQ(v1[i], v2[i]);
// 		}
// 	}

// 	function check_eq<T>(v1: T[], v2: T[], ndims: int): void {
// 		ASSERT_EQ(v1.length, v2.length);
// 		for (let i = 0; i < v1.length; ++i) {
// 			for (let j = 0; j < ndims; j++) {
// 				ASSERT_EQ(v1[i][j], v2[i][j]);
// 			}
// 		}
// 	}

// 	//template < typename T>
// 	function check_eq<T>(v1: T[][], v2: T[][]): void {
// 		ASSERT_EQ(v1.length, v2.length);
// 		for (let i = 0; i < v1.length; ++i) {
// 			check_eq(v1[i], v2[i]);
// 		}
// 	}

// 	// svm_parameter ---------------------------------------------------------------
// 	function setup(obj: svm_parameter): void {
// 		obj.kernel = 1;
// 		obj.probability = true;
// 		obj.gamma = 1.1;
// 		obj.C = 1.2;
// 		obj.eps = 1.3;
// 		obj.cache_size = 2;
// 		obj.shrinking = 3;
// 		obj.weight_label.push(1);
// 		obj.weight_label.push(2);
// 		obj.weight.push(1.1);
// 		obj.weight.push(1.2);
// 	}

// 	function check_eq(obj1: svm_parameter, obj2: svm_parameter): void {
// 		ASSERT_EQ(obj1.kernel, obj2.kernel);
// 		ASSERT_EQ(obj1.probability, obj2.probability);
// 		ASSERT_EQ(obj1.gamma, obj2.gamma);
// 		ASSERT_EQ(obj1.C, obj2.C);
// 		ASSERT_EQ(obj1.eps, obj2.eps);
// 		ASSERT_EQ(obj1.cache_size, obj2.cache_size);
// 		check_eq(obj1.weight, obj2.weight);
// 		check_eq(obj2.weight_label, obj2.weight_label);
// 	}

// 	// TODO: find out why its disabled, narrowing conversion
// 	// TEST(SvmTest, svm_parameter_testWriteRead) {
// 	//  const char *filename = "svm_parameter.bin";
// 	//  svm_parameter svm1(0, false, 0, 0, 0, 0, 0);
// 	//  svm_parameter svm2(0, false, 0, 0, 0, 0, 0);
// 	//
// 	//  setup(svm1);
// 	//
// 	//  std::ofstream os(filename, std::ios::binary);
// 	//  svm1.write(os);
// 	//  os.close();
// 	//
// 	//  std::ifstream is(filename, std::ios::binary);
// 	//  svm2.read(is);
// 	//  is.close();
// 	//
// 	//  ASSERT_NO_FATAL_FAILURE(check_eq(svm1, svm2));
// 	//  int ret = ::remove(filename);
// 	//  ASSERT_TRUE(ret == 0) << "Failed to delete " << filename;
// 	// }

// 	// svm_problem -----------------------------------------------------------------
// 	// TODO: find out why its disabled, narrowing conversion
// 	function setup(svm_problem & obj): void {
// 		/* obj.recover_ = true;
// 		 obj.n_dims_ = 2;
// 		 obj.x_.push(new float[2]{2.2, 3.3});
// 		 obj.x_.push(new float[2]{0.2, 13.3});
// 		 obj.y_.push(4);
// 		 obj.y_.push(14);*/
// 	}

// 	function check_eq(obj1: svm_problem, obj2: svm_problem): void {
// 		ASSERT_EQ(obj1.recover_, obj2.recover_);
// 		ASSERT_EQ(obj1.n_dims_, obj2.n_dims_);
// 		check_eq(obj1.x_, obj2.x_, obj1.n_dims_);
// 		check_eq(obj1.y_, obj2.y_);
// 	}

// 	TEST("SvmTest", "svm_problem_testWriteRead", () => {
// 		const filename = "svm_problem.bin";
// 		let svm1 = new svm_problem(0, false);
// 		let svm2 = new svm_problem(0, false);

// 		setup(svm1);

// 		std::ofstream fout(filename, std: : ios: : binary);
// 		svm1.write(fout);
// 		fout.close();

// 		std: : ifstream; fin(filename, std: : ios: : binary);
// 		svm2.read(fin);
// 		fin.close();

// 		ASSERT_NO_FATAL_FAILURE(check_eq(svm1, svm2));
// 		int; ret =   ; : : remove(filename);
// 		ASSERT_TRUE(ret === 0) << "Failed to delete " << filename;
// 	});

// 	// svm_problem01 ---------------------------------------------------------------
// 	function setup(obj: svm_problem01): void {
// 		obj.recover_ = true;
// 		obj.n_dims_ = 2;
// 		obj.threshold_ = 2.2;
// 		obj.nnz_.push(6);
// 		obj.nnz_.push(62);
// 		obj.x_.push(new int[2]{3, 4});
// 		obj.x_.push(new int[2]{13, 41});
// 		obj.y_.push(5.5);
// 		obj.y_.push(52.5);
// 	}

// 	function check_eq(obj1: svm_problem01, obj2: svm_problem01): void {
// 		ASSERT_EQ(obj1.recover_, obj2.recover_);
// 		ASSERT_EQ(obj1.n_dims_, obj2.n_dims_);
// 		ASSERT_EQ(obj1.threshold_, obj2.threshold_);
// 		check_eq(obj1.nnz_, obj2.nnz_);
// 		check_eq(obj1.x_, obj2.x_, obj2.n_dims_);
// 		check_eq(obj1.y_, obj2.y_);
// 	}

// 	TEST("SvmTest", "svm_problem01_testWriteRead", () => {
// 		const filename = "svm_problem01.bin";
// 		const svm1 = new svm_problem01(0, false);
// 		const svm2 = new svm_problem01(0, false);

// 		setup(svm1);

// 		std:     : ofstream; fout(filename, std: : ios: : binary);
// 		svm1.write(fout);
// 		fout.close();

// 		std:     : ifstream; fin(filename, std: : ios: : binary);
// 		svm2.read(fin);
// 		fin.close();

// 		ASSERT_NO_FATAL_FAILURE(check_eq(svm1, svm2));
// 		int; ret =      ; : : remove(filename);
// 		ASSERT_TRUE(ret === 0, "Failed to delete " + filename);
// 	});

// 	// svm_model -------------------------------------------------------------------

// 	// TODO: find out why its disabled, narrowing conversion
// 	function setup(obj: svm_model): void {
// 		/* obj.n_dims_ = 2;

// 		 obj.sv.push(new float[2]{1.1, 1.2});
// 		 obj.sv.push(new float[2]{3.1, 5.2});

// 		 obj.sv_coef.push(new float[2]{5.1, 3.2});
// 		 obj.sv_coef.push(new float[2]{6.1, 7.2});

// 		 obj.w.resize(2);
// 		 obj.w[0].push(33.1);
// 		 obj.w[0].push(12.1);
// 		 obj.w[1].push(3.1);
// 		 obj.w[1].push(1.1);

// 		 obj.rho.push(2.1);
// 		 obj.rho.push(21.1);

// 		 obj.label.push(3);
// 		 obj.label.push(23);

// 		 obj.n_sv.push(4);
// 		 obj.n_sv.push(24);

// 		 obj.probA.push(0.1);
// 		 obj.probA.push(0.2);

// 		 obj.probB.push(22.1);
// 		 obj.probB.push(0.3);
// 		 obj.probB.push(0.43);*/
// 	}

// 	function check_eq(obj1: svm_model, obj2: svm_model): void {
// 		ASSERT_EQ(obj1.n_dims_, obj2.n_dims_);
// 		check_eq(obj1.sv, obj2.sv, obj2.n_dims_);
// 		check_eq(obj1.sv_coef, obj2.sv_coef, obj2.n_dims_);
// 		check_eq(obj1.rho, obj2.rho);
// 		check_eq(obj1.label, obj2.label);
// 		check_eq(obj1.n_sv, obj2.n_sv);
// 		check_eq(obj1.probA, obj2.probA);
// 		check_eq(obj1.probB, obj2.probB);
// 		check_eq(obj1.w, obj2.w);
// 	}

// 	TEST("SvmTest", "svm_model_testWriteRead", () => {
// 		const filename = "svm_model.bin";
// 		const svm1 = new svm_model();
// 		const svm2 = new svm_model();

// 		setup(svm1);

// 		const state = svm1.save();
// 		svm2.load(state);

// 		ASSERT_NO_FATAL_FAILURE(check_eq(svm1, svm2));
// 	}

// // svm_dense -------------------------------------------------------------------
// function check_eq(obj1: svm_dense, obj2: svm_dense): void {
// 			check_eq(obj1.get_parameter(), obj2.get_parameter());
// 			check_eq(obj1.get_problem(), obj2.get_problem());
// 			check_eq(obj1.get_model(), obj2.get_model());
// 		}

// TEST("SvmTest", "svm_dense_testWriteRead", () => {
// 			const filename = "svm_dense.bin";
// 			const svm1 = new svm_dense();
// 			const svm2 = new svm_dense();

// 			svm1.add_sample(0.5, new float[1]{11.0});
// 			svm1.train(1.1, 2.2, 3.3);

// 			std:      : ofstream; fout(filename, std: : ios: : binary);
// 			svm1.write(fout);
// 			fout.close();

// 			std:      : ifstream; fin(filename, std: : ios: : binary);
// 			svm2.read(fin);
// 			fin.close();

// 			ASSERT_NO_FATAL_FAILURE(check_eq(svm1, svm2));

// 			int; ret =       ; : : remove(filename);
// 			ASSERT_TRUE(ret === 0) << "Failed to delete " << filename;

// 			svm1.add_sample(0.75, new float[1]{7.0});
// 			svm1.train(7.1, 7.2, 7.3);
// 			svm2.add_sample(0.75, new float[1]{7.0});
// 			svm2.train(7.1, 7.2, 7.3);
// 			ASSERT_NO_FATAL_FAILURE(check_eq(svm1, svm2));
// 		}

// // svm_01 ----------------------------------------------------------------------
// function check_eq(obj1: svm_01, obj2: svm_01): void {
// 				check_eq(obj1.get_parameter(), obj2.get_parameter());
// 				check_eq(obj1.get_problem(), obj2.get_problem());
// 				check_eq(obj1.get_model(), obj2.get_model());
// 			}

// TEST("SvmTest", "svm_01_testWriteRead", () => {
// 				const filename = "svm_01.bin";
// 				const svm1 = new svm_01();
// 				const svm2 = new svm_01();

// 				svm1.add_sample(0.5, new float[1]{11.0});
// 				svm1.train(1.1, 2.2, 3.3);

// 				std:        : ofstream; fout(filename, std: : ios: : binary);
// 				svm1.write(fout);
// 				fout.close();

// 				std:        : ifstream; fin(filename, std: : ios: : binary);
// 				svm2.read(fin);
// 				fin.close();

// 				ASSERT_NO_FATAL_FAILURE(check_eq(svm1, svm2));

// 				int; ret =         ; : : remove(filename);
// 				ASSERT_TRUE(ret === 0, "Failed to delete " + filename);

// 				svm1.add_sample(0.75, new float[1]{7.0});
// 				svm1.train(7.1, 7.2, 7.3);
// 				svm2.add_sample(0.75, new float[1]{7.0});
// 				svm2.train(7.1, 7.2, 7.3);
// 				ASSERT_NO_FATAL_FAILURE(check_eq(svm1, svm2));
// 			});
// } // end anonymous namespace
