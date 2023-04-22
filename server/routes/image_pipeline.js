// imports
import express from 'express';
import conn from "../db/conn.js";
import {
    BlobServiceClient,
    StorageSharedKeyCredential,
    newPipeline
} from '@azure/storage-blob';
import multer from 'multer';
import getStream from "into-stream";

// setting up upload strategy
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('file');

// containers
const containerName2 = 'images';
const containerName1 = 'thumbnails';

// constants
const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

// azure variables
const sharedKeyCredential = new StorageSharedKeyCredential(
    process.env.AZURE_STORAGE_ACCOUNT_NAME,
    process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY);

const pipeline = newPipeline(sharedKeyCredential);

const blobServiceClient = new BlobServiceClient(
    `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
    pipeline
);

// Use a random number to generate a unique file name, 
// removing "0." from the start of the string.
const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, '');
    return `${identifier}-${originalName}`;
};

const router = express.Router();

// Posting an Image
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


router.get('/get/:club', async (req, res) => {
    // try {
    // const containerClient = blobServiceClient.getContainerClient("images");
    // const listBlobsResponse = await containerClient.listBlobFlatSegment();
    // console.log("............")
    // console.log(listBlobsResponse);
    // console.log("............")

    // get a list of urls from posts collection
    const db = conn.getDb();
    const posts_collection = await db.collection("posts");
    const club = req.params.club;
    // const agg = [
    //     { $search: { text: { query: club, path: "club" } } },
    // ];

    // run pipeline
    const posts = await posts_collection.find({ "club": club }).toArray();
    console.log(posts);
    const imageUrls = posts.map(post => {
        return `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/images/${post.image_url}`;
    });

    res.json({ images: imageUrls });
    // } catch (err) {
    //     res.status(500).json({ error: err });
    // }
});





// Getting images of clubs
// router.get('/get/:club', async (req, res) => {

//     let viewData;

//     try {
//         const containerClient = blobServiceClient.getContainerClient(containerName1);
//         const listBlobsResponse = await containerClient.listBlobFlatSegment();

//         for await (const blob of listBlobsResponse.segment.blobItems) {
//             console.log(`Blob: ${blob.name}`);
//         }

//         viewData = {
//             title: 'Home',
//             viewName: 'index',
//             accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME,
//             containerName: containerName1
//         };

//         if (listBlobsResponse.segment.blobItems.length) {
//             viewData.thumbnails = listBlobsResponse.segment.blobItems;
//         }
//     } catch (err) {
//         viewData = {
//             title: 'Error',
//             viewName: 'error',
//             message: 'There was an error contacting the blob storage container.',
//             error: err
//         };
//         res.status(500);
//     } finally {
//         res.render(viewData.viewName, viewData);
//     }
// })

export default router;

