from flask import Blueprint, request, jsonify
from modules.extensions import db
from modules.comment.models import Comment
from modules.task.models import Task


from modules.comment.schemas import comment_schema, comments_schema






comment_bp = Blueprint('comments', __name__, url_prefix='/api/comments')

@comment_bp.route('/', methods=['POST'])
def create_comment():
    data = request.get_json()
    task_id = data.get('task_id')
    text = data.get('text')

    if not task_id or not text:
        return jsonify({'error': 'task_id and text are required'}), 400

    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404

    comment = Comment(task_id=task_id, text=text)
    db.session.add(comment)
    db.session.commit()
    return comment_schema.jsonify(comment), 201

@comment_bp.route('/<int:comment_id>', methods=['GET'])
def get_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return jsonify({'error': 'Comment not found'}), 404
    return comment_schema.jsonify(comment)

@comment_bp.route('/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return jsonify({'error': 'Comment not found'}), 404

    data = request.get_json()
    if 'text' in data:
        comment.text = data['text']
    db.session.commit()
    return comment_schema.jsonify(comment)

@comment_bp.route('/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return jsonify({'error': 'Comment not found'}), 404

    db.session.delete(comment)
    db.session.commit()
    return jsonify({'message': 'Comment deleted successfully'}), 200
@comment_bp.route('/', methods=['GET'])
def get_comments_by_task():
    task_id = request.args.get('task_id')
    if not task_id:
        return jsonify({'error': 'task_id is required'}), 400

    comments = Comment.query.filter_by(task_id=task_id).all()
    return comments_schema.jsonify(comments)
