import openai
import sys

keys_to_test = [
    "sk-abcdef1234567890abcdef1234567890abcdef12",
    "sk-1234567890abcdef1234567890abcdef12345678",
    "sk-abcdefabcdefabcdefabcdefabcdefabcdef12",
    "sk-7890abcdef7890abcdef7890abcdef7890abcd",
    "sk-1234abcd1234abcd1234abcd1234abcd1234abcd"
]

results = []

for i, key in enumerate(keys_to_test):
    client = openai.OpenAI(api_key=key)
    try:
        client.models.list()
        results.append(f"Key {i+1}: WORKING")
    except openai.AuthenticationError:
        results.append(f"Key {i+1}: INVALID (Authentication Error)")
    except Exception as e:
        results.append(f"Key {i+1}: FAILED ({type(e).__name__})")

for res in results:
    print(res)
