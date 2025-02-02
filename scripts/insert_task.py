import argparse
import re

def parse_tasks(tasks_file):
    """Parses tasks from a Markdown file."""
    with open(tasks_file, 'r') as f:
        lines = f.readlines()

    tasks = {}
    current_section = None

    for line in lines:
        line = line.strip()
        if line.startswith('# '):
            continue  # Skip the main title

        if line.startswith('## '):
            current_section = line[3:].strip()
            tasks[current_section] = []
        elif line.startswith('- [ ]'):
            task = line[6:].strip()
            if current_section:
                tasks[current_section].append(task)

    return tasks

def select_task(tasks):
    """Allows the user to select a task from a list."""
    print("Available sections:")
    sections = list(tasks.keys())
    for i, section in enumerate(sections):
        print(f"{i + 1}. {section}")

    while True:
        try:
            section_choice = int(input("Select a section number: "))
            if 1 <= section_choice <= len(sections):
                section = sections[section_choice - 1]
                break
            else:
                print("Invalid choice. Please enter a number from the list.")
        except ValueError:
            print("Invalid input. Please enter a number.")

    print(f"\nAvailable tasks for '{section}':")
    tasks_in_section = tasks[section]
    for i, task in enumerate(tasks_in_section):
        print(f"{i + 1}. {task}")

    while True:
        try:
            task_choice = int(input("Select a task number: "))
            if 1 <= task_choice <= len(tasks_in_section):
                selected_task = tasks_in_section[task_choice - 1]
                return section, selected_task
            else:
                print("Invalid choice. Please enter a number from the list.")
        except ValueError:
            print("Invalid input. Please enter a number.")

def get_relevant_rules(cursor_rules_file, task_description):
    """
    Extracts relevant rules from the .cursorrules file based on keywords in the task description.
    """
    with open(cursor_rules_file, 'r') as f:
        cursor_rules_content = f.read()

    # Define a mapping of keywords to sections in the .cursorrules file
    keyword_to_sections = {
        "component": ["// --- Components & Naming ---", "// --- UI Components ---"],
        "tailwind": ["// --- Tailwind Usage ---"],
        "icon": ["// --- Icons ---"],
        "form": ["// --- UI Components ---"],
        "modal": ["// --- UI Components ---"],
        "notification": ["// --- Toast Notifications ---"],
        "next.js": ["// --- Next.js Structure ---"],
        "typescript": ["// --- TypeScript & Syntax ---"],
        "style": ["// --- Tailwind Usage ---"],
        "button": ["// --- UI Components ---"],
        "input": ["// --- UI Components ---"],
        "task": ["// --- Components & Naming ---", "// --- UI Components ---"],
        "note": ["// --- Components & Naming ---", "// --- UI Components ---"],
        "goal": ["// --- Components & Naming ---", "// --- UI Components ---"],
        "pomodoro": ["// --- Components & Naming ---", "// --- UI Components ---"],
        "shared": ["// --- Code Style ---"],
        "semantic commit": ["// --- Additional ---"],
        "build": ["// --- IMPORTANT: ---"]
        # Add more mappings as needed
    }

    relevant_rules = set()
    task_description_lower = task_description.lower()

    for keyword, sections in keyword_to_sections.items():
        if keyword in task_description_lower:
            for section in sections:
                relevant_rules.add(section)

    # Extract the rules from the identified sections
    rules_content = ""
    for section in relevant_rules:
        start = cursor_rules_content.find(section)
        if start != -1:
            end = cursor_rules_content.find("// ---", start + len(section))
            if end == -1:
                end = len(cursor_rules_content)
            rules_content += cursor_rules_content[start:end] + "\n"

    return rules_content

def insert_task_into_template(template_file, section, task, cursor_rules_file):
    """Inserts the selected task and relevant rules into the template."""
    with open(template_file, 'r') as f:
        template = f.read()

    relevant_rules = get_relevant_rules(cursor_rules_file, task)

    task_section = f"<TASK>\n\n{section} - {task}\n\n</TASK>\n<TASK_FROM_TASKS_MD>\n\n{task}\n\n</TASK_FROM_TASKS_MD>\n<CURSOR_RULES>\n\n{relevant_rules}\n</CURSOR_RULES>"
    
    updated_template = re.sub(r"<TASK>[\s\S]*?</TASK>\n<TASK_FROM_TASKS_MD>[\s\S]*?</TASK_FROM_TASKS_MD>\n<CURSOR_RULES>[\s\S]*?</CURSOR_RULES>", task_section, template)

    return updated_template

def main():
    parser = argparse.ArgumentParser(description="Insert a task from tasks.md into the script template.")
    parser.add_argument("tasks_file", help="Path to the tasks.md file")
    parser.add_argument("template_file", help="Path to the script-template.txt file")
    parser.add_argument("cursor_rules_file", help="Path to the .cursorrules file")
    args = parser.parse_args()

    tasks = parse_tasks(args.tasks_file)
    section, selected_task = select_task(tasks)

    updated_template = insert_task_into_template(args.template_file, section, selected_task, args.cursor_rules_file)

    print("\nUpdated template:\n")
    print(updated_template)

if __name__ == "__main__":
    main()
