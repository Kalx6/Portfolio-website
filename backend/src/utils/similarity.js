// src/utils/similarity.js

// Measures how "close" two vectors are in meaning-space — returns a value
// from -1 to 1, where 1 means identical direction (highly similar meaning).
// This is the actual "search" in our lightweight retrieval system — no
// vector database needed at this scale, just direct math.
export function cosineSimilarity(vectorA, vectorB) {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    magnitudeA += vectorA[i] ** 2;
    magnitudeB += vectorB[i] ** 2;
  }

  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}
