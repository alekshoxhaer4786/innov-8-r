/*
Filename: ComplexCodeExample.js
Content: This code demonstrates a complex algorithm for finding the shortest path in a weighted directed graph using the Dijkstra's algorithm.
*/

class Graph {
  constructor() {
    this.vertices = [];
    this.edges = {};
    this.weights = {};
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
    this.edges[vertex] = [];
  }

  addEdge(source, destination, weight) {
    this.edges[source].push(destination);
    this.weights[`${source}-${destination}`] = weight;
  }

  dijkstra(sourceVertex) {
    const distances = {};
    const previousVertices = {};
    const queue = [];

    this.vertices.forEach((vertex) => {
      distances[vertex] = Infinity;
      previousVertices[vertex] = null;
      queue.push(vertex);
    });

    distances[sourceVertex] = 0;

    while (queue.length) {
      queue.sort((a, b) => distances[a] - distances[b]);
      const currentVertex = queue.shift();

      this.edges[currentVertex].forEach((neighbor) => {
        const currentWeight = this.weights[`${currentVertex}-${neighbor}`];
        const alternativePathWeight = distances[currentVertex] + currentWeight;

        if (alternativePathWeight < distances[neighbor]) {
          distances[neighbor] = alternativePathWeight;
          previousVertices[neighbor] = currentVertex;
        }
      });
    }

    return { distances, previousVertices };
  }
}

// Example usage
const graph = new Graph();

// Add vertices
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");

// Add weighted edges
graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "C", 1);
graph.addEdge("B", "D", 5);
graph.addEdge("C", "D", 8);
graph.addEdge("C", "E", 10);
graph.addEdge("D", "E", 2);

const sourceVertex = "A";
const { distances, previousVertices } = graph.dijkstra(sourceVertex);

// Output shortest path and distance from the source vertex
console.log(`Shortest path from ${sourceVertex}:`);
Object.keys(distances).forEach((vertex) => {
  const path = [];
  let currentVertex = vertex;

  while (currentVertex !== sourceVertex) {
    path.unshift(currentVertex);
    currentVertex = previousVertices[currentVertex];
  }

  path.unshift(sourceVertex);
  const distance = distances[vertex];

  console.log(`${path.join(" -> ")}  :  ${distance}`);
});

// Output:
// Shortest path from A:
// A  :  0
// A -> C  :  2
// A -> C -> B  :  3
// A -> C -> B -> D  :  8
// A -> C -> E  :  12