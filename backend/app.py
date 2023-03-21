from faker import Faker
from flask import Flask, request
from flask_cors import CORS
from sqlalchemy import exc

from models import db, User, UsersResponse, Skill, SkillsResponse, UserSkill, HttpErrorResponse

fake = Faker()


def create_app():
    _app = Flask(__name__)
    _app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    _app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(_app)
    with _app.app_context():
        db.drop_all()
        db.create_all()
    return _app


app = create_app()

CORS(app)


@app.errorhandler(exc.SQLAlchemyError)
def handle_sql_request(e):
    print(e)
    status = 400
    return HttpErrorResponse(status=status, message="Error performing database operation").json(), status


@app.route("/users", methods=["POST"])
def create_users_batch():
    with app.app_context():
        for x in range(10):
            db.session.add(User(name=fake.name()))
        db.session.commit()
    return "Users created", 201


@app.route("/users", methods=["DELETE"])
def delete_all_users():
    with app.app_context():
        User.query.delete()
        db.session.commit()
    return "Users deleted"


@app.route("/users", methods=["GET"])
def users():
    with app.app_context():
        results = User.query.all()
    return UsersResponse(items=results).json()


@app.route("/skills", methods=["GET"])
def skills():
    with app.app_context():
        results = Skill.query.all()
    return SkillsResponse(items=results).json()


@app.route("/skills", methods=["POST"])
def create_skill():
    with app.app_context():
        data = request.get_json()
        db.session.add(Skill(name=data['name']))
        db.session.commit()
    return "Skill created", 201


@app.route("/skills/<int:skill_id>/users", methods=["GET"])
def filter_by_skill(skill_id):
    with app.app_context():
        results = UserSkill.with_users(skill_id)
    return UsersResponse(items=results).json()


@app.route("/users/<int:user_id>/skills/<int:skill_id>", methods=["POST"])
def attach_skill(user_id, skill_id):
    with app.app_context():
        db.session.add(UserSkill(user_id=user_id, skill_id=skill_id))
        db.session.commit()
    return "User Skill attached", 201


if __name__ == "__main__":
    app.run()
