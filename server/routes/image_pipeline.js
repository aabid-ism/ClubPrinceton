// imports
import {
    BlobServiceClient,
    StorageSharedKeyCredential,
    newPipeline
} from '@azure/storage-blob';


import multer from 'multer';
import express from 'express';

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('file');

import getStream from "into-stream";

// containers
const containerName2 = 'images';
const containerName1 = 'thumbnails';

// constants
const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

// azure variables
const AZURE_STORAGE_ACCOUNT_NAME = "clubptonblobstorage"
const AZURE_STORAGE_ACCOUNT_ACCESS_KEY = "NKA4aKYTizqmcB5hrWNwce0Mvqbkgq01BRQRIe/bZZ91mlsODJACrdBv7aXlGlTqb+xK4jeJFfYD+AStoy6UzQ=="
const sharedKeyCredential = new StorageSharedKeyCredential(
    AZURE_STORAGE_ACCOUNT_NAME,
    AZURE_STORAGE_ACCOUNT_ACCESS_KEY);

const pipeline = newPipeline(sharedKeyCredential);

const blobServiceClient = new BlobServiceClient(
    `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
    pipeline
);

// Use a random number to generate a unique file name, 
// removing "0." from the start of the string.
const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, '');
    return `${identifier}-${originalName}`;
};

const router = express.Router();

router.post('/', uploadStrategy, async (req, res) => {

    console.log(req.file);
    const blobName = getBlobName(req.file.originalname);

    // get the stream of bytes from req.file
    const stream = getStream(req.file.buffer);
    // get the "images" container
    const containerClient = blobServiceClient.getContainerClient(containerName2);;
    // create a new blob with the unique name we generated
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
        await blockBlobClient.uploadStream(stream,
            uploadOptions.bufferSize, uploadOptions.maxBuffers,
            { blobHTTPHeaders: { blobContentType: "image/jpeg" } });
        res.send(blobName).status(200);
    } catch (err) {
        return res.status(404).send(err);
    }
});

export default router;

