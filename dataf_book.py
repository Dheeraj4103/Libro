import pandas as pd
import requests
import csv

# Replace 'YOUR_API_KEY' with your actual Google Books API key.
api_key = 'AIzaSyCV15Z87DTxeM8eB9rzfBBVTt5THEjWiIQ'

# Base URL for the Google Books API
base_url = 'https://www.googleapis.com/books/v1/volumes'

# Define the query parameters
def get_book_info(query):
    params = {
        'q': query,
        'key': api_key,
    }

    try:
        response = requests.get(base_url, params=params)

        if response.status_code == 200:
            data = response.json()
            if 'items' in data:
                # Assuming you want to fetch the first book result
                book = data['items'][0]['volumeInfo']
                title = book.get('title', 'Title not available')
                authors = book.get('authors', ['Author not available'])
                description = book.get('description', 'Description not available')
                average_rating = book.get('averageRating', 'Rating not available')
                identifiers = book.get('industryIdentifiers', [{'type': 'ISBN_13', 'identifier': 'ISBN not available'}])
                isbn = next((id['identifier'] for id in identifiers if id['type'] == 'ISBN_13'), 'ISBN not available')

                return {
                    'Title': title,
                    'Authors': ", ".join(authors),
                    'Description': description,
                    'Rating': average_rating,
                    'ISBN': isbn
                }
            else:
                return {
                    'Title': query,
                    'Authors': 'No author information available',
                    'Description': 'No description available',
                    'Rating': 'No rating available',
                    'ISBN': 'No ISBN available'
                }
        else:
            return {
                'Title': query,
                'Authors': 'Error: Unable to fetch data from the Google Books API',
                'Description': '',
                'Rating': '',
                'ISBN': ''
            }
    except Exception as e:
        return {
            'Title': query,
            'Authors': 'An error occurred: ' + str(e),
            'Description': '',
            'Rating': '',
            'ISBN': ''
        }

# Load the Excel file (books.xlsx)
df = pd.read_excel('books.xlsx')

# Create a list to store book details
book_details = []

# Iterate through each book title in the Excel file
for title, copies in zip(df['Title'], df['Copies']):
    book_info = get_book_info(title)
    book_info['copies'] = copies
    book_details.append(book_info)

# Create a DataFrame from the book details
book_df = pd.DataFrame(book_details)

# Save the DataFrame to a CSV file
book_df.to_csv('book_details.csv', index=False, quoting=csv.QUOTE_NONNUMERIC)
