var expect = require("../chai").expect;

var Graph = require("../..").Graph,
    nearestLeaf = require("../..").alg.nearestLeaf;

describe("alg.nearest-leaf", function() {
  it("should return self for leaf node", function() {
    var g = new Graph();
    g.setNode("a");
    g.setNode("b");
    g.setEdge("a", "b");
    expect(nearestLeaf(g, "b")).to.equal("b");
  });
  it("should return self for undirected leaf node", function() {
    var g = new Graph({directed: false});
    g.setNode("a");
    expect(nearestLeaf(g, "a")).to.equal("a");
  });
  it("should cope with cyclic graph with no leaf nodes", function() {
    var g = new Graph();
    g.setNode("a");
    g.setNode("b");
    g.setNode("c");
    g.setEdge("a", "b");
    g.setEdge("b", "c");
    g.setEdge("c", "a");
    expect(nearestLeaf(g, "a")).to.equal(null);
  });
  it("should find leaf node in cyclic graph", function() {
    var g = new Graph();
    g.setNode("a");
    g.setNode("b");
    g.setNode("c");
    g.setNode("d");
    g.setEdge("a", "b");
    g.setEdge("b", "c");
    g.setEdge("c", "a");
    g.setEdge("c", "d");
    expect(nearestLeaf(g, "a")).to.equal("d");
  });
  it("should find nearest leaf node", function() {
    var g = new Graph();
    g.setNode("a");
    g.setNode("b");
    g.setNode("c");
    g.setNode("d");
    g.setNode("e");
    g.setNode("f");
    g.setEdge("a", "b");
    g.setEdge("b", "c");
    g.setEdge("c", "d");
    g.setEdge("d", "e");
    g.setEdge("e", "f");
    expect(nearestLeaf(g, "a")).to.equal("f");
    g.setNode("g");
    g.setEdge("d", "g");
    expect(nearestLeaf(g, "a")).to.equal("g");
  });
  it("should find nearest leaf in non-simple DAG", function() {
    var g = new Graph();
    g.setNode("a");
    g.setNode("b");
    g.setNode("c");
    g.setNode("d");
    g.setNode("e");
    g.setEdge("a", "b");
    g.setEdge("b", "c");
    g.setEdge("c", "d");
    g.setEdge("d", "e");

    g.setNode("f");
    g.setEdge("b", "f");
    g.setEdge("f", "d");
    expect(nearestLeaf(g, "a")).to.equal("e");
  });
  it("should not find leaf node in undirected graph", function() {
    var g = new Graph({directed: false});
    g.setNode("a");
    g.setNode("b");
    g.setNode("c");
    g.setNode("d");
    g.setEdge("a", "b");
    g.setEdge("b", "c");
    g.setEdge("c", "d");
    expect(nearestLeaf(g, "a")).to.equal(null);
  });
});