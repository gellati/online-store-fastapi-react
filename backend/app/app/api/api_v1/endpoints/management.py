
from app.db.session import SessionLocal
from app.schemas.user import UserInDB
from fastapi.security import OAuth2PasswordBearer
from app.api.deps import reusable_oauth2


from fastapi import APIRouter, Depends


router = APIRouter()

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')
# url in app.api.api_v1.endpoints.login
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login/access-token')

def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

def fake_decode_token(token):
    db = SessionLocal()
    user = get_user(db, token)
    db.close()
    return user

@router.get("/")
async def read_products(token: str = Depends(oauth2_scheme)):
#    user = fake_decode_token(token)
#    print("user from token decode")
    return {"token": token}
#    return {"token": token, "user": user}

