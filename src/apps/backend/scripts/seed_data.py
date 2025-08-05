from modules.extensions import db
from modules.task.models import Task

task = Task(title="Initial Task for Comment Testing")
db.session.add(task)
db.session.commit()

print(f"Task created with id: {task.id}")

