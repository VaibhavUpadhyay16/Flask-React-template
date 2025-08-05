from modules.extensions import db

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)

    # ✅ Add this line exactly
    comments = db.relationship("Comment", back_populates="task", cascade="all, delete-orphan")
