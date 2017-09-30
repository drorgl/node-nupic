let nupic: any = null;

(() => {
	let debugError: any = null;
	let releaseError: any = null;

	try {
		const lib = "../build/Release/nupic.node";
		if (require.resolve(lib)) {
			nupic = require(lib);
		}

		return;
	} catch (e) {
		releaseError = e;
		// release was not found, loading debug
	}

	try {
		const lib = "../build/Debug/nupic.node";
		if (require.resolve(lib)) {
			nupic = require(lib);
		}
		return;
	} catch (e) {
		// debug was not found as well
		debugError = e;
	}

	if (!debugError && !releaseError) {
		console.error("nupic.node module was not found, you may need to compile it");
		console.error("debug:", debugError);
		console.error("release:", releaseError);
	}
})();

export default nupic;
