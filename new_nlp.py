from gensim.models import Word2Vec

# Assuming 'sentences' is a list of tokenized book titles and author names
model = Word2Vec(sentences, vector_size=100, window=5, min_count=1, sg=0)


query_vector = model.wv[preprocessed_query]

from sklearn.metrics.pairwise import cosine_similarity

# Calculate the similarity between the query vector and book vectors
similarities = cosine_similarity([query_vector], book_vectors)


top_indices = similarities.argsort()[0][::-1][:N]
top_books = [books[i] for i in top_indices]
print(top_books)