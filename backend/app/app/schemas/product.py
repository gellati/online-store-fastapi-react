from turtle import title
from typing import Optional

from pydantic import BaseModel


# Shared properties
class ProductBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


# Properties to receive on item creation
class ProductCreate(ProductBase):
    barcode: Optional[str] = None


# Properties to receive on item update
class ProductUpdate(ProductBase):
    pass


# Properties shared by models stored in DB
class ProductInDBBase(ProductBase):
    id: int
#    title: str
#    owner_id: int

    class Config:
        orm_mode = True


# Properties to return to client
class Product(ProductInDBBase):
    title: str
    description: str
    barcode: str


# Properties properties stored in DB
class ProductInDB(ProductInDBBase):
    pass
