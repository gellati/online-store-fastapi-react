from typing import Generator
from app.api.deps import get_db
from app.db.init_db import init_db
from app.db.session import Base, SessionLocal, engine
from fastapi import FastAPI
# from sqlalchemy import engine
from starlette.middleware.cors import CORSMiddleware

from app.api.api_v1.api import api_router
from app.core.config import settings

Base.metadata.create_all(
    bind=engine
    # bind=engine.create_engine(
    #     settings.SQLALCHEMY_DATABASE_URI
    # )
)

def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()



db = SessionLocal()


# init_db(db)
from app import crud, schemas

user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER)
if not user:
    user_in = schemas.UserCreate(
        email=settings.FIRST_SUPERUSER,
        password=settings.FIRST_SUPERUSER_PASSWORD,
        is_superuser=True,
    )
    crud.user.create(db, obj_in=user_in)  # noqa: F841

users = [
    ('rkelly', 'rkelly@e.e', 'aa'),
    ('jjohn', 'jjohn@e.e', 'aaa'),
]

for (username,email,password) in users:
    user = crud.user.get_by_email(db, email=email)
    if not user:
        user_in = schemas.UserCreate(
            email=email,
            password=password,
            is_superuser=True,
        )
        crud.user.create(db, obj_in=user_in)  # noqa: F841





# products = [
#     ('device', 'some device'),
#     ('device', 'some device'),
#     ('device2', 'some device3'),
#     ('device1', 'some device2'),
#     ('devicex', 'some devicey'),
# ]

products = [
    ('MacBook', '0001', 'Computer'),
    ('Old Car', '0002', 'Car'),
    ('W Shoes', '0003', 'Shoe'),
]

for (title, barcode, description) in products:
    product_in = schemas.ProductCreate(
        title = title,
        barcode = barcode,
        description= description,
    )
    crud.product.create(db, obj_in=product_in)


app = FastAPI(
    title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)
