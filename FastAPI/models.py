from database import Base
from sqlalchemy import Column, Integer, String


class Model(Base):
    __tablename__ = 'model'

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String)
