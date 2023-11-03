import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from transformers import BertTokenizer, BertModel
import torch
import numpy as np

# Step 1: Data Preparation
data = pd.read_csv("book_details.csv")
data = pd.DataFrame(data)
books = data

# Step 2: TF-IDF Vectorization
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(data['Title'] + " " + data['Authors'] + " " + data['Description'])

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

def get_bert_embedding(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
    with torch.no_grad():
        output = model(**inputs)
    return output['pooler_output'].numpy()

bert_embeddings = np.array([get_bert_embedding(text)[0] for text in (data['Title'] + " " + data['Authors'] + " " + data['Description'])])

# Step 4: Combining TF-IDF and BERT
def get_combined_similarities(query):
    query_tfidf = tfidf_vectorizer.transform([query])
    query_bert = get_bert_embedding(query)
    
    tfidf_similarities = cosine_similarity(query_tfidf, tfidf_matrix)
    bert_similarities = cosine_similarity(query_bert, bert_embeddings)
    
    combined_similarities = 0.6 * tfidf_similarities + 0.4 * bert_similarities  # Adjust the weights as needed
    
    return combined_similarities[0]  # Return the flattened array

# Step 5: Recommendation Logic
import numpy as np

def recommend(query):
    combined_similarities = get_combined_similarities(query)
    
    recommended_books_indices = np.argsort(combined_similarities)[::-1][:5]  # Top 5 recommendations
    
    recommended_books = data.iloc[recommended_books_indices][["Title", "Authors"]]
    
    # Check if the user query contains the keyword "copies" and include the count of copies if available
    if "copies" or "count" in query:
        for index, row in recommended_books.iterrows():
            title = row["Title"]
            copies = data[data["Title"] == title]["copies"].values[0]
            recommended_books.at[index, "copies"] = copies
    
    return recommended_books

# Now, when you call the recommend function with a query, it will include the count of copies if the keyword "copies" is in the query.
# result = recommend("count of graphics books")
# print(result)
