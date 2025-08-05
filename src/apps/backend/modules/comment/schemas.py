from modules.extensions import db
from modules.extensions import ma
from .models import Comment

class CommentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Comment
        load_instance = True

comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)
