function ArithmeticMixer(audioContext) {
	// input A -> channel 0
	// input B -> channel 1
	// output -> script processor
	// mix function
	var processor = audioContext.createScriptProcessor(2048, 2, 1);
	var mixFunction = divide;

	processor.onaudioprocess = onProcessing;

	//
	
	function onProcessing(ev) {
		var inputBuffer = ev.inputBuffer,
			bufferA = inputBuffer.getChannelData(0),
			bufferB = inputBuffer.getChannelData(1),
			outputBuffer = ev.outputBuffer.getChannelData(0),
			numSamples = bufferA.length;

		for(var i = 0; i < numSamples; i++) {
			outputBuffer[i] = mixFunction(bufferA[i], bufferB[i]);
		}

	}

	function sum(a, b) {
		return a + b;
	}

	function multiply(a, b) {
		return (a+0.0) * (b+0.0);
	}

	// Doesn't work quite right yet
	function divide(a, b) {
		a = a + 0.0;
		b = b + 0.0;
		if(Math.abs(b) < 0.00001) {
			b = 0.0001;
		}	
		return a / b;
	}


	// ~~~
	
	this.input = processor;
	this.output = processor;
}

module.exports = ArithmeticMixer;