// Copyright 2015 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview Direct speech generator that simply picks up the speech
 *     attribute.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.DirectSpeechGenerator');

goog.require('sre.AbstractSpeechGenerator');



/**
 * @constructor
 * @extends{sre.AbstractSpeechGenerator}
 */
sre.DirectSpeechGenerator = function() {
  goog.base(this);
};
goog.inherits(sre.DirectSpeechGenerator, sre.AbstractSpeechGenerator);


/**
 * @override
 */
sre.DirectSpeechGenerator.prototype.getSpeech = function(node) {
    //TODO: Use the correct prefix!
  return node.getAttribute('data-semantic-speech');
};
