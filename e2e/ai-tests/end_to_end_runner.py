import os
import asyncio
import datetime
from dotenv import load_dotenv

from browser_use import Agent, Browser
from langchain_google_genai import ChatGoogleGenerativeAI

from promts_e2e import create_book_slot_prompt

env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=env_path)

print("🔑 GOOGLE KEY:", os.getenv("GOOGLE_API_KEY"))
TIMESTAMP = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")

browser = Browser()

llm_gemini = ChatGoogleGenerativeAI(
    model="models/gemini-2.0-flash",
    google_api_key=os.getenv("GOOGLE_API_KEY"),
    temperature=0.7,
)

unique_name = f"QA Test Venue {datetime.datetime.now().strftime('%H%M%S')}"
BOOK_SLOT_PROMPT = create_book_slot_prompt(unique_name)

async def main():
    agent = Agent(
        task=BOOK_SLOT_PROMPT.content,
        llm=llm_gemini,
        browser=browser,
        generate_gif=True,
        use_vision=True,
        save_conversation_path=f"e2elogs/gpt-gemini/{BOOK_SLOT_PROMPT.scenario_name}/{TIMESTAMP}"
    )
    await agent.run()
    input("Press Enter to close the browser...")
    await browser.close()

if __name__ == '__main__':
    asyncio.run(main())