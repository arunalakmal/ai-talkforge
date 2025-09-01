import os
from dotenv import load_dotenv
from openai import AzureOpenAI

load_dotenv()

endpoint = os.getenv("ENDPOINT")
model_name = os.getenv("MODEL_NAME")
deployment = os.getenv("DEPLOYMENT")

subscription_key = os.getenv("OPENAI_API_KEY")
api_version = os.getenv("API_VERSION")

client = AzureOpenAI(
    api_version=api_version,
    azure_endpoint=endpoint,
    api_key=subscription_key,
)

def chat(prompt: str) -> str:
    response = client.chat.completions.create(
        # stream=True,
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant.",
            },
            {
                "role": "user",
                "content": prompt,
            }
        ],
        max_tokens=4096,
        temperature=1.0,
        top_p=1.0,
        model=deployment,
    )
    return response.choices[0].message.content

    # for update in response:
    #     if update.choices:
    #         print(update.choices[0].delta.content or "", end="")

    client.close()