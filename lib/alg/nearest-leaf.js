"use strict";

module.exports = nearestLeaf;

var PriorityQueue = require("../data/priority-queue");

function nearestLeaf(g, v) {
  var queue = new PriorityQueue();
  var distances = {};
  function findSuccessors(g, v) {
    if(g.isDirected()) {
      return g.successors(v);
    } else {
      return g.neighbors(v);
    }
  }
  queue.add(v, 0);
  distances[v] = 0;
  while (queue.size() > 0) {
    var _v = queue.removeMin();
    if (g.isLeaf(_v)) {
      return _v;
    }
    var distance = distances[_v];
    var successors = findSuccessors(g, _v);
    for (var i = 0; i<successors.length; i++) {
      var s = successors[i];
      if (!distances.hasOwnProperty(s)) {
        queue.add(s, distances[s] = distance+1);
      }
    }
  }
  return null;
}