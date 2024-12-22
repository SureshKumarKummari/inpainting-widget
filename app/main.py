from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import base64

MONGODB_URL = "mongodb+srv://newuser:P2kSFyK8NBcwPQla@cluster0.e0b6htt.mongodb.net/academically?retryWrites=true&w=majority"

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient(MONGODB_URL)
db = client['academically']

if "images" not in db.list_collection_names():
    image_metadata_collection = db.create_collection("images")
else:
    image_metadata_collection = db['images']

@app.post("/upload-original-image/")
async def upload_original_image(original: UploadFile = File(...)):
    try:
        image_data = await original.read()
        image_base64 = base64.b64encode(image_data).decode('utf-8')
        metadata = {
            "original_image": image_base64,
            "masked_image": None,
            "created_at": datetime.utcnow()
        }
        metadata_id = image_metadata_collection.insert_one(metadata).inserted_id
        return {"message": "Original image uploaded successfully", "file_id": str(metadata_id)}
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": f"Failed to upload original image: {str(e)}"})

@app.post("/upload-masked-image/")
async def upload_masked_image(original_image_id: str = Form(...), masked_image: UploadFile = File(...)):
    try:
        original_image_id = ObjectId(original_image_id)
        masked_image_data = await masked_image.read()
        masked_image_base64 = base64.b64encode(masked_image_data).decode('utf-8')

        image_metadata_collection.update_one(
            {"_id": original_image_id},
            {"$set": {"masked_image": masked_image_base64}}
        )
        return {"message": "Masked image uploaded successfully", "original_image_id": str(original_image_id)}
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": f"Failed to upload masked image: {str(e)}"})

@app.get("/get-all-images/")
async def get_all_images():
    images = list(image_metadata_collection.find())
    result = []
    for image in images:
        result.append({
            "original_image": image.get("original_image"),
            "masked_image": image.get("masked_image")
        })
    return JSONResponse(content={"images": result})
