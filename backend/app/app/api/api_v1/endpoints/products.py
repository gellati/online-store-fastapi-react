import json
from re import sub
from typing import Any, List
from urllib import request

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

from starlette.requests import Request
from app.core import security
from app.core.config import settings
from jose import jwt


router = APIRouter()


@router.get("/", response_model=List[schemas.Product])
async def read_products(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
#    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve products.
    """
#    if crud.user.is_superuser(current_user):
    products = crud.product.get_multi(db, skip=skip, limit=limit)
#    else:
#        products = crud.Product.get_multi_by_owner(
#            db=db, owner_id=current_user.id, skip=skip, limit=limit
#        )
    return products


@router.post("/", response_model=schemas.Product)
async def create_product(
    *,
    db: Session = Depends(deps.get_db),
    product_in: schemas.ProductCreate,
#    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new product.
    """
    product = crud.product.create_with_owner(
        db=db,
        obj_in=product_in,
    #    owner_id=current_user.id
    )
    return product


@router.put("/{id}", response_model=schemas.Product)
async def update_product(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    product_in: schemas.ProductUpdate,
    request: Request,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update a product.
    """
#    print(json.dumps(request))
    print(request.headers)
    print(request.headers['authorization'])
    print(f"id: ${id}")
    print(f"current_user: ${current_user}")
    print(current_user.id)
#    print(request.headers.authorization)
    # payload = jwt.decode(
    #     request.headers['authorization'],
    #     settings.SECRET_KEY,
    #     algorithms=[security.ALGORITHM],
    # )
#    print(payload)
#    print(f"payload: ${payload}")

    # user = deps.get_current_user(db, token = request.headers['authorization'])
    # print(user)

    product = crud.product.get(db=db, id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
#    if not crud.user.is_superuser(current_user) and (product.owner_id != current_user.id):
#        raise HTTPException(status_code=400, detail="Not enough permissions")
    product = crud.product.update(db=db, db_obj=product, obj_in=product_in)
    return product


@router.get("/{id}", response_model=schemas.Product)
async def read_product(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
#    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get product by ID.
    """
    product = crud.product.get(db=db, id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
#    if not crud.user.is_superuser(current_user) and (product.owner_id != current_user.id):
#        raise HTTPException(status_code=400, detail="Not enough permissions")
    return product


@router.delete("/{id}", response_model=schemas.Product)
async def delete_product(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
#    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete a product.
    """
    product = crud.product.get(db=db, id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
#    if not crud.user.is_superuser(current_user) and (product.owner_id != current_user.id):
#        raise HTTPException(status_code=400, detail="Not enough permissions")
    product = crud.product.remove(db=db, id=id)
    return product
