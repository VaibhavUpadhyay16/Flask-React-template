# def test_create_comment(client, sample_task):
#     response = client.post('/api/comments/', json={
#         'task_id': sample_task.id,
#         'text': 'Nice task!'
#     })
#     assert response.status_code == 201
#     assert response.json['text'] == 'Nice task!'

import json
from modules.extensions import db
from modules.comment.models import Comment
from modules.task.models import Task

def test_create_comment(client):
    task = Task(title="Test Task")
    db.session.add(task)
    db.session.commit()

    response = client.post("/api/comments/", json={
        "task_id": task.id,
        "text": "This is a test comment"
    })

    assert response.status_code == 201
    assert response.get_json()["text"] == "This is a test comment"

def test_get_comment(client):
    task = Task(title="Another Task")
    comment = Comment(task=task, text="Read this comment")
    db.session.add_all([task, comment])
    db.session.commit()

    response = client.get(f"/api/comments/{comment.id}")
    assert response.status_code == 200
    assert response.get_json()["text"] == "Read this comment"

def test_update_comment(client):
    task = Task(title="Update Task")
    comment = Comment(task=task, text="Old Text")
    db.session.add_all([task, comment])
    db.session.commit()

    response = client.put(f"/api/comments/{comment.id}", json={
        "text": "Updated Text"
    })

    assert response.status_code == 200
    assert response.get_json()["text"] == "Updated Text"

def test_delete_comment(client):
    task = Task(title="Delete Task")
    comment = Comment(task=task, text="To delete")
    db.session.add_all([task, comment])
    db.session.commit()

    response = client.delete(f"/api/comments/{comment.id}")
    assert response.status_code == 200
    assert b"Comment deleted" in response.data
