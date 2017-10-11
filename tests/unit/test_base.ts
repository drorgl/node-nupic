
export function TEST(test_fixture: string, test_name: string, test_callback: () => void) {
	console.log("executing", test_fixture, test_name);
	try {
		test_callback();
	} catch (e) {
		if (e) {
			console.log("error testing", e);
		}
	}
}

export function EXPECT_STREQ(expected: string, actual: string, msg?: string) {
	if (expected !== actual) {
		throw new Error((msg || "") + "value " + actual + " != " + expected);
	}
}

export function EXPECT_THROW(statement: () => void, expected_exception?: string): void {
	try {
		statement();
		throw new Error("expecting " + expected_exception + " but didn't get any");
	} catch (e) {
		if ((e as Error).message !== expected_exception) {
			throw new Error("expecting " + expected_exception + " but got " + (e as Error).message);
		}
	}

}

export function ASSERT_NO_FATAL_FAILURE(statement: () => void, msg?: string) {
	try {
		statement();
	} catch (e) {
		throw e;
	}
}

export function ASSERT_FLOAT_EQ(expected: any, actual: any, msg?: string) {
	if (expected !== actual) {
		throw new Error((msg || "") + "value " + actual + " != " + expected);
	}
}

export function EXPECT_NEAR(val1, val2, abs_error, msg?: string) {
	const small = Math.min(val1, val2);
	const large = Math.max(val1, val2);
	if ((large - small) > abs_error) {
		throw new Error((msg || "") + "value " + val1 + " not near " + val2 + " for error range " + abs_error);
	}
}

export function ASSERT_GT(val1: any, val2: any, msg?: string) {
	if (!(val1 > val2)) {
		throw new Error((msg || "") + "value not " + val1 + " > " + val2);
	}
}

export function ASSERT_LT(val1: any, val2: any, msg?: string) {
	if (!(val1 < val2)) {
		throw new Error((msg || "") + "value not " + val1 + " < " + val2);
	}
}

export function ASSERT_LE(val1: any, val2: any, msg?: string) {
	if (!(val1 <= val2)) {
		throw new Error((msg || "") + "value not " + val1 + " < " + val2);
	}
}

export function ASSERT_GE(val1: any, val2: any, msg?: string) {
	if (!(val1 >= val2)) {
		throw new Error((msg || "") + "value not " + val1 + " < " + val2);
	}
}

export function ASSERT_TRUE(truthy: any, msg?: string) {
	if (!truthy) {
		throw new Error((msg || "") + "value != true");
	}
}

export function ASSERT_FALSE(falsy: any, msg?: string) {
	if (falsy) {
		throw new Error((msg || "") + "value != false");
	}
}

export let ASSERT_EQ = ASSERT_FLOAT_EQ;
export let EXPECT_EQ = ASSERT_FLOAT_EQ;
export let EXPECT_GT = ASSERT_GT;
export let EXPECT_LT = ASSERT_LT;
export let EXPECT_TRUE = ASSERT_TRUE;
export let ASSERT_NEAR = EXPECT_NEAR;
export let ASSERT_ANY_THROW = EXPECT_THROW;
