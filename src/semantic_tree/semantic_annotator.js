// Copyright 2017 Volker Sorge
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
 * @fileoverview Annotates semantic trees.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticAnnotator');
goog.provide('sre.SemanticVisitor');

goog.require('sre.SemanticNode');



/**
 * @constructor
 * @param {string} domain The domain name of the annotation.
 * @param {function(sre.SemanticNode)} func The annotation function.
 */
sre.SemanticAnnotator = function(domain, func) {

  /**
   * @type {string}
   */
  this.domain = domain;

  /**
   * @type {function(sre.SemanticNode)}
   */
  this.func = func;

  /**
   * This can be changed to a unique name.
   * @type {string}
   */
  this.name = domain;

};


/**
 * Annotates the tree bottom up.
 * @param {sre.SemanticNode} node The semantic node.
 */
sre.SemanticAnnotator.prototype.annotate = function(node) {
  node.childNodes.forEach(goog.bind(this.annotate, this));
  node.addAnnotation(this.domain, this.func(node));
};



/**
 * @constructor
 * @param {string} domain The domain name of the annotation.
 * @param {function(sre.SemanticNode, *): *} func The annotation function.
 */
sre.SemanticVisitor = function(domain, func) {

  /**
   * @type {string}
   */
  this.domain = domain;

  /**
   * @type {function(sre.SemanticNode, *): *}
   */
  this.func = func;

  /**
   * This can be changed to a unique name.
   * @type {string}
   */
  this.name = domain;

};


/**
 * Visits the tree top down and propagates the information.
 * @param {sre.SemanticNode} node The semantic node.
 * @param {*} info The information to propagate.
 * @return {*} The updated information.
 */
sre.SemanticVisitor.prototype.visit = function(node, info) {
  var result = this.func(node, info);
  node.addAnnotation(this.domain, result[0]);
  for (var i = 0, child; child = node.childNodes[i]; i++) {
    result = this.visit(child, result[1]);
  }
  return result;
};
