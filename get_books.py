import pandas as pd
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

# Download NLTK data (if not already downloaded)
nltk.download('punkt')
nltk.download('stopwords')

# Load your book dataset
data = pd.read_csv("book_details.csv")

# User query
query = "show me books on computer graphics"

# Initialize a list to store relevant book indices
relevant_books = []

# Tokenize and process the user query with NLTK
query_tokens = word_tokenize(query.lower())

# Remove stopwords from the query tokens
query_tokens = [word for word in query_tokens if word not in stopwords.words('english')]

# Loop through the book dataset and compare each book's title and description with the query
for index, row in data.iterrows():
    title = row["Title"]
    description = row["Description"]
    
    # Tokenize and process the book title and description with NLTK
    book_tokens = word_tokenize((title + " " + description).lower())

    # Remove stopwords from the book tokens
    book_tokens = [word for word in book_tokens if word not in stopwords.words('english')]
    
    # Check for keyword matches between the query and the book's content
    keyword_matches = any(token in book_tokens for token in query_tokens)
    
    # If there's a keyword match, consider it a relevant book
    if keyword_matches:
        relevant_books.append(index)

# Get the relevant book details
if relevant_books:
    relevant_books_data = data.loc[relevant_books]
    print(relevant_books_data)
else:
    print("No relevant books found.")

