import requests

def get_book_info(isbn):
    # Base URL for the Open Library API
    base_url = 'http://openlibrary.org/api/books'

    # Construct the URL with the ISBN
    url = f'{base_url}?bibkeys=ISBN:{isbn}&format=json'

    try:
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            
            if f'ISBN:{isbn}' in data:
                book = data[f'ISBN:{isbn}']
                title = book.get('title', 'Title not available')
                authors = book.get('authors', [{'name': 'Author not available'}])
                description = book.get('description', 'Description not available')
                average_rating = book.get('average_rating', 'Rating not available')

                print(f'Title: {title}')
                print(f'Authors: {", ".join(author["name"] for author in authors)}')
                print(f'Description: {description}')
                print(f'Average Rating: {average_rating}')
            else:
                print('No results found for the ISBN.')
        else:
            print('Error: Unable to fetch data from the Open Library API.')
    except Exception as e:
        print(f'An error occurred: {str(e)}')

if __name__ == "__main__":
    isbn = input("Enter an ISBN: ")
    get_book_info(isbn)
