'use strict';

const natural = require('natural'); 
const tokenizer = new natural.WordTokenizer();
const stopWords = ['a', 'the', 'to', 'when', 'about', 'by', 'and', 'with'];

/**************************************************************************

Normalize the words into every sentence

1. Extract the words out of it
2. Apply stemming 
3. Remove the stop words

**************************************************************************/

exports.isStopWord =  function (word) {
	for(var i in stopWords) {
		if(stopWords[i] === word) {
			return true;
		}
	}
}

exports.removeEqualWords = function (words) {
	for(var i = 0; i < words.length; i++) {
		for(var j = i + 1; j < words.length; j++) {
			if(words[i] === words[j]) {
				var head = words.slice(0,j);
				var tail = words.slice(j+1);
				words = head.concat(tail);
				j = j - 1;
			}
		}
	}
	return words;
}

exports.normalizing = function (sentence) {
	var words = tokenizer.tokenize(sentence);
	for(var i in words) {
		if(isStopWord(words[i])) {
			words.splice(i, 1);
		}
		words[i] = natural.PorterStemmer.stem(words[i]);
	}
	return words;
}

exports.exists = function(word, array) {
	for(var i = 0; i < array.length; i++) {
		if(array[i] === word) {
			return true;
		}
	}
}

exports.identicalWordsInSentence =  function(list1, list2) {
	var identical = [];
	for(var i = 0; i < list1.length; i ++) {
		for(var j = 0; j < list2.length; j++) { 
			if(list1[i] === list2[j] && !(exist(list1[i], identical))) {
				identical.push(list1[i]);
			}
		}
	}
	return identical;
}

exports.jaccardSimilarity =  function (sentence1, sentence2) {
	var a = normalizing(sentence1);
	var b = normalizing(sentence2);
	var identical = identicalWordsInSentence(a, b);
	var result = (identical.length / (a.length + b.length - identical.length));
	console.log('my result is:', result);
}



// var sentence1 = 'A directive is a class with directive metadata.';
// var sentence2 = 'In TypeScript, apply the @Directive decorator to attach metadata to the class.';

// jaccardSimilarity(sentence1, sentence2);