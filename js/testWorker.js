self.onmessage = function (e) {
	self.postMessage("Foo " + e.data);
};
