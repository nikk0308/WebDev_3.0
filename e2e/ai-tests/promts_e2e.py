BASE_PROMPT = """
### Prompt for QA regression agent

**Objective:**
As a QA engineer, ensure that all steps in the scenario are executed as described.
Mark flow as "passed" only if everything works correctly.

Log all selectors used in format: step: action: selector
---
*** Flow: {scenario_name} ***
---
**Steps:**
{steps}
"""

class PromptE2E:
    def __init__(self, scenario_name, steps):
        self.scenario_name = scenario_name
        self.content = BASE_PROMPT.format(scenario_name=scenario_name, steps=steps)

def create_book_slot_prompt(unique_name: str) -> PromptE2E:
    steps = f"""
1. Open the tested application at http://localhost:5173/.
2. Fill in the email field with "ai.agent@google.com" and password with "Password".
3. Click the "Увійти" button.
4. Wait for home page loading and click the "Створити новий майданчик" button.
5. Fill in the name, location, type, description, start_time, end_time fields using a unique venue name like "{unique_name}".
6. Click the "Створити" button.
7. Wait for home page loading and click the "Продивитися всі майданчики" button.
8. Scroll repeatedly to the bottom of the page. For each venue block, read the venue title first. Click its "Забронювати" button **only if** the title exactly matches "{unique_name}".
9. On the booking page, locate the available slot block. Again, ensure that the venue name inside it exactly matches "{unique_name}" before clicking the first "Забронювати" button.
10. Wait for home page loading and click the "Мої бронювання" button.
11. Scroll to the bottom of the page if necessary. Ensure that the booking item with the exact name "{unique_name}" appears on the "Мої бронювання" page. Do not confuse with similar names.
"""
    return PromptE2E("Book Slot Flow", steps)
