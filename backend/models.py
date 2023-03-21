from typing import List

from flask_sqlalchemy import SQLAlchemy
from pydantic import BaseModel

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    user_skills = db.relationship("UserSkill", lazy="joined", cascade="all, delete-orphan", backref="users")

    def __repr__(self):
        return "<User %r>" % self.name


class Skill(db.Model):
    __tablename__ = "skills"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), db.CheckConstraint("name <> ''"), unique=True, nullable=False)

    def __repr__(self):
        return "<Skill %r>" % self.name


class UserSkill(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey("skills.id"), primary_key=True)

    def with_users(skill_id):
        results = UserSkill.query.filter(UserSkill.skill_id==skill_id).all()
        return [ user_skill.users for user_skill in results ]

    def __repr__(self):
        return "<User %r Skill %r>" % (self.user_id, self.skill_id)


class UserSchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class SkillSchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class SkillsResponse(BaseModel):
    items: List[SkillSchema]


class UsersResponse(BaseModel):
    items: List[UserSchema]


class HttpErrorResponse(BaseModel):
    status: int
    message: str
