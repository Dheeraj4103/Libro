import warnings
from langchain.document_loaders import CSVLoader
import textwrap
import os
import pandas as pd  # Import pandas for data loading

# Set Hugging Face API token
os.environ['HUGGINGFACEHUB_API_TOKEN'] = "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"

# Load data from a CSV file
loader = CSVLoader("books.csv")
document = loader.load()

warnings.simplefilter('ignore')

def wrap_text_preserve_newlines(text, width=110):
    lines = text.split('\n')
    wrapped_lines = [textwrap.fill(line, width=width) for line in lines]
    wrapped_text = '\n'.join(wrapped_lines)
    return wrapped_text

# Text Splitting
from langchain.text_splitter import CharacterTextSplitter
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
docs = text_splitter.split_documents(document)

# Embedding
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
embeddings = HuggingFaceEmbeddings()
db = FAISS.from_documents(docs, embeddings)  # Initialize the 'db' object

# Load a pre-trained model for question answering
from langchain.chains.question_answering import load_qa_chain
from langchain import HuggingFaceHub
llm = HuggingFaceHub(repo_id="google/flan-t5-xxl", model_kwargs={"temperature": 0.8, "max_length": 1024})
chain = load_qa_chain(llm, chain_type="stuff")

# User query for book recommendations
queryText = "give me books on C programming"

# Perform a similarity search to retrieve relevant books
docresult = db.similarity_search(queryText)

# Print question-answering results based on the relevant books
qa_result = chain.run(input_documents=docresult, question=queryText)

print(qa_result)
