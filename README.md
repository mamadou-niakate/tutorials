# How to manage file storage using GridFS with Node.js/Express js, Mongodb, Mongoose and Multer ?

Date Posted: October 23, 2022

[GridFS](https://www.mongodb.com/docs/drivers/node/current/fundamentals/gridfs/)

### Social NetWorks post : twitter & linkedin

<aside>
💡 Are you working on a project that requires storing and retrieving large files such as videos, audios or images ? here is a straightforward tutorial in which i explain how to do this with Node.js and Mongodb (using GridFs specification)

</aside>

# What is GridFs ?

<aside>
💡 GridFs is the mongodb specification for storing large files such as audios, videos or images... It is mostly useful for storing files that excide mongodb document size limit of 16MB. Futhermore, regardless of files size, it is also useful when you want to store files for which you want access without having to load the entire file into memory.

</aside>

# How does GridFs works ?

When you upload a file into GridFs bucket, instead of storing the file in a single document, GridFs divides it into small pieces called chunks and stores each chunk as a separate document, each with a maximum size of 255kB except for the last chunk which can be as large as needed.

For the purpose of storing the chunks and the file's metadata (**filename, size, time when the file was uploaded, and so on)** , GridFS by default uses two collections, fs.files and fs.chunks. Each chunk is identified by its **_unique \_id ObjectId_** field. The fs.files serves as a parent document. The **_files_id_** field in the fs.chunks documents establishes a one to many relationship between the fs.files and fs.chuncks collections documents.

![How does GridFs stores data](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/gridfs_collections.svg)

How does GridFs stores data

# How to use GridFs with Node.js & mongodb?

## Prerequisites

1. NodeJS LTS installed
2. Having a MongodB Atlas account
3. A Code Editor

## What are we going to do in this tutorial ?

- Create a GridFS Bucket
- Upload Files
- Download Files
- Rename Files
- Delete Files

## Lest’s code

### Installation

First things first, you need a node project. Let’s get things started by initializing a new folder.

```bash
mkdir gridfs-tutorial; cd gridfs-tutorial; npm init -y
```

This will create a package.json file with the standard defaults.

Our project folder is ready to start working in but let’s install a few dependencies first

```bash
npm i express morgan body-parser mongoose multer-gridfs-storage multer dotenv
```

- **Express** : Express js is a node.js routing and middleware web framework that provides a robust set of features for web and mobile applications.
- **Morgan** : Morgan is an HTTP request logger middleware for node.js
- **Body-parser** : body-parser is a Node. js middleware that parses incoming request bodies in a middleware before you handle it
- **Mongoose** : Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides schema validation, manages relationships between data, and is used to convert between objects in code and representations of those objects in MongoDB.
- **Multer** : Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files
- **Multer-gridfs-storage** : Multer-gridfs-storage is a Multer engine for GridFS that allows to store uploaded files directly to MongoDb
- **Dotenv** : Dotenv is an npm package that automatically loads environment variables from a .env file into the process.env object.

****\*\*****\*\*****\*\*****\*\*****\*\*****\*\*****\*\*****Developement dependency****\*\*****\*\*****\*\*****\*\*****\*\*****\*\*****\*\*****

Let's install Nodemon as a development dependency to automatically restart the server after file change

```bash
npm install --save-dev nodemon
```

### Express Server

Create a file called **index.js**, this will be our express server and paste in the following code :

```jsx
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Connect to database

// Connect to MongoDB GridFS bucket using mongoose

// Middleware for parsing request body and logging requests
app.use(bodyParser.json());
app.use(logger("dev"));

// Routes for API endpoints

// Server listening on port 3000 for incoming requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

**Configure server launch**

From the package.json file, change the scripts section to

```jsx
"scripts": {
	"dev": "nodemon index.js"
}
```

That will allows the serveur to be automatically restarted after file change.

#### Run the server

Launch the server with :

```bash
npm run dev
```

You should see the following message in your terminal :

Server listening on port 3000

### Configure Mongodb Database

We will configure our mongodb database in two steps, first we’ll create our mongodb database from mongodb cloud platform then we’ll connect our express project to that database

#### Creating a MongoDB Database with the Atlas UI

— Connect to your mongodb account (create one if not. [here](https://account.mongodb.com/account/register?_ga=2.15719990.1470342177.1666479528-2060740186.1650885816))

1. From the left sidebar open the project dropdown then click on +New Project, type the name of your project then click on Next

![Untitled](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/Untitled.png)

1. Click on “Create Project”

![Untitled](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/Untitled%201.png)

1. From your new project, click on Build a Database button

![Untitled](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/Untitled%202.png)

1. Choose a mongodb plan (you can take the one that is free)

![Untitled](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/Untitled%203.png)

1. Choose your cluster location and click on Create Cluster

![Untitled](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/Untitled%204.png)

1. Create a user for accessing you database remotely

![Untitled](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/Untitled%205.png)

You will use this user’s credentials to get connected to you mongodb database from your Node.js project.

1. Add the list of IPs that you want to be able to connect to your mongodb project’s clusters

![Untitled](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/Untitled%206.png)

I took the 0.0.0.0/0 IP but be aware this will allow any IP to be able to connect to your project’s clusters, so this approach maybe have some security issues.

****\*\*\*\*****\*\*****\*\*\*\*****\*\*\*\*****\*\*\*\*****\*\*****\*\*\*\*****Connect our Node.js/Expressjs project to our mongodb database****\*\*\*\*****\*\*****\*\*\*\*****\*\*\*\*****\*\*\*\*****\*\*****\*\*\*\*****

— Create a .env file at the root of your project, then add the following variables

```jsx
MONGO_DB = gridfs_db; //A database will be generated in your mongodb project ' s cluster with the same name
MONGO_USER = username; //Put the username you created on mongodb atlas
MONGO_USER_PWD = userpassword; //Put the password you created on mongodb atlas
```

— Create a database folder from the root of your project then create a config.js file inside that folder and past in the following code :

```jsx
//config.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

— Go back to your mongodb project’s cluster then click on connect

![Untitled](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/Untitled%207.png)

— From thr opened modal, click on Connect your application

![Untitled](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/Untitled%208.png)

— Copy the link from the new panel

![Untitled](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/Untitled%209.png)

— From config.js file, replace mongoose.connect() argument DB_URL by the link you copied like this :

```jsx
`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PWD}@cluster0.vlhig1a.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
```

— Update your index.js file

```jsx
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./database/config");

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Connect to MongoDB GridFS bucket using mongoose

// Middleware for parsing request body and logging requests
app.use(bodyParser.json());
app.use(logger("dev"));

// Routes for API endpoints

// Server listening on port 3000 for incoming requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

— When you server restarts, you should see the following messages :

Server listening on port 3000
MongoDB connected

Greatttttt !!!!!

### Setting up GridFs bucket

— **Le’s create an instance of our GridFs Bucket**

Update your index.js file by importing mongoose and add the following code just after connectDB() invokation :

```bash
let bucket;
(() => {
  mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "filesBucket",
    });
  });
})();
```

Here we’re creating an instance our bucket in order to make some actions on files (Get, update, delete, rename…), if the no bucket exists with the same name, a bucket will be created with that name.

Restart your server, you should see the following messages :

Server listening on port 3000
Bucket is ready to use
MongoDB connected

— **Let’s manage file storage**

Create a utils folder at the root of your project then create a upload.js file inside it

```jsx
//upload.js
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// Create storage engine
export function upload() {
  const mongodbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PWD}@cluster0.vlhig1a.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
  const storage = new GridFsStorage({
    url: mongodbUrl,
    file: (req, file) => {
      return new Promise((resolve, _reject) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: "filesBucket",
        };
        resolve(fileInfo);
      });
    },
  });

  return multer({ storage });
}

module.exports = { upload };
```

Replace mongodbUrl by your own mongodb URL as you did previously above.

Here is the workflow of uploading a file :

— **express** is the framework for uploading the files into MongoDB

— **bodyparser** retrieves essential content from HTML forms

— **multer** handles the file upload

— And **multer-gridfs storage** integrates GridFS with multer to store large files in MongoDB.

Here, as arguments of new GridFsStorage(…), we have an object that has two properties :

— **url** : it refers to the url of our mongodb Atlas cluster’s url

— **file** : the file propety’s value is a function that controls the file storage in the database and it is invoked per file (for instance in case of multiple files upload) with the parameters `req`and `file`, in that order. It returns an object or a promise that resolves to an object with the following properties.

| Titre       | Colonne 1                                                                                             |
| ----------- | ----------------------------------------------------------------------------------------------------- |
| filename    | The desired filename for the file (default: 16 byte hex name without extension)                       |
| id          | An ObjectID to use as identifier (default: auto-generated)                                            |
| metadata    | The metadata for the file (default: null)                                                             |
| chunkSize   | The size of file chunks in bytes (default: 261120)                                                    |
| bucketName  | The GridFs collection to store the file (default: fs)                                                 |
| contentType | The content type for the file (default: inferred from the request)                                    |
| aliases     | Optional array of strings to store in the file document's aliases field (default: null)               |
| disableMD5  | If true, disables adding an md5 field to file data (default: false, available only on MongoDb >= 3.1) |

### Upload a single file

Update the index.js file, by first importing the upload function from /utils/upload as :

const **{ _upload_ } **= _require_("./utils/upload");

Then add the following code after // Routes for API endpoints comment :

```jsx
// Upload a single file
app.post("/upload/file", upload().single("file"), async (req, res) => {
  try {
    res.status(201).json({ text: "File uploaded successfully !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: { text: "Unable to upload the file", error },
    });
  }
});
```

Here you might say wth is that but don’t worry, let me explain :

First Express is a middleware framework that means it will first execute our upload() function then will execute the array function.

— Let’s see in details the upload().single(”file”).

upload() returns a Multer instance that provides several methods for generating middleware that process files uploaded in `multipart/form-data`format. The single(...) method is one of those it returns middleware that processes a single file associated with the given form field. Its argument “file” must be the same as the name of your client side form input that handle file upload.

Once the file is uploaded, our second function (array function) will be called and give a response to client request.

— Let’s test our file upload with Postman (you can use **Insomnia** too or any API platform)

1. Open Postman and create a new POST request and type in your endpoint URL
2. Click on “Body” tab and check “form-data” checkbox. The “file” as key and change its type to file instead of text then upload a file.

**Why using “file” as the key ?** Because we named our file field as “file” with upload().single("file")

Now click on Send button. You should receive an object with text: "File uploaded successfully !”

![Untitled](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/Untitled%2010.png)

Voilà ! our file is uploaded

### Upload multiple files

Update the index.js file with following code :

```jsx
// Upload multiple files
app.post("/upload/files", upload().array("files"), async (req, res) => {
  try {
    res.status(201).json({ text: "Files uploaded successfully !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: { text: `Unable to upload files`, error },
    });
  }
});
```

The array(…) method of Multer returns middleware that processes multiple files sharing the same field name.

To test uploading multiple files with Postman, in your endpoint replace /upload/file by /upload/files. Then change the key to files and select multiple files then click on the Send button.

![Untitled](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/Untitled%2011.png)

### Download a single file

To retrieve a file from GridFs bucket, one can use the **openDownloadStream.**

**_— It takes two arguments :_**

- **id** : The ObjectId of the file you want to download
- **options** : an object that describe how to retrieve the data, it has two properties
  | start | Number | optionalOptional 0-based offset in bytes to start streaming from |
  | ----- | ------ | ----------------------------------------------------------------- |
  | end | Number | optionalOptional 0-based offset in bytes to stop streaming before |

**_— It returns the file as a readable stream that you can pipe to the client request response._**

Here is how you can download a file by its id :

```jsx
// Download a file by id
app.get("/download/files/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;

    // Check if file exists
    const file = await bucket
      .find({ _id: new mongoose.Types.ObjectId(fileId) })
      .toArray();
    if (file.length === 0) {
      return res.status(404).json({ error: { text: "File not found" } });
    }

    // set the headers
    res.set("Content-Type", file[0].contentType);
    res.set("Content-Disposition", `attachment; filename=${file[0].filename}`);

    // create a stream to read from the bucket
    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(fileId)
    );

    // pipe the stream to the response
    downloadStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: { text: `Unable to download file`, error } });
  }
});
```

What we did here is straightforward :

- First we get a file ID “fileId” from the request paramters then we search the file that has it \_id property equal to fileId
- As find method of the bucket returns an array, we check that it has at least one item otherwise we tell the client we didnt find any file that has this id
- In case we find a file, we set some paramters to the response header such as the file type
- Then we download the file as a readable stream
- And pipe that stream to the response

### Download multiple files

You will barely see tutorial explaining you how to retrieve and send multiple files to client. Here i will show two approaches to achieve that. Let’s start with the first approach :

**— Using [archiverjs](https://www.archiverjs.com/)**

Archiverjs is a nodejs streaming interface for archive generation. You can install it like this :

```bash
npm install archiver --save
```

We will use archiverjs here to gather our data then compress them as a zip file before sending them to the client. Here is how that works :

Import archiver at the top of your index.js file :

```jsx
const archiver = require("archiver")
...
app.get("/download/files", async (req, res) => {
  try {
    const files = await bucket.find().toArray();
    if (files.length === 0) {
      return res.status(404).json({ error: { text: "No files found" } });
    }
    res.set("Content-Type", "application/zip");
    res.set("Content-Disposition", `attachment; filename=files.zip`);
    res.set("Access-Control-Allow-Origin", "*");
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    archive.pipe(res);

    files.forEach((file) => {
      const downloadStream = bucket.openDownloadStream(
        new mongoose.Types.ObjectId(file._id)
      );
      archive.append(downloadStream, { name: file.filename });
    });

    archive.finalize();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: { text: `Unable to download files`, error },
    });
  }
});
```

What we do here is straightforward : first we retrieve all the files metadata from our filesBucket.file.collection then with that array of files metadata, throught a foreach loop we download each file as a readable stream and append that stream to the archive data that was piped to the response object. When all the files are gathered to the archive we finalizes the archiver instance and prevents further appending to the archive structure.

To test this endpoint with Postman click on the dropdown icon next to Send button then click on Send and download your zip file will be downloaded.

![GET multiple files in zip file format](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/Untitled%2012.png)

GET multiple files in zip file format

Now you might wonder how you can read this zip data from the client side. For that you can use the **[jszip](https://www.npmjs.com/package/jszip)** package. If interessed, tell me in the comment i will make a tutorial on that.

**— Convert each file data to a base64 string**

Here we dont need to install any their part library. We will be using nodejs builtin modules.

Import Transform class from nodejs bultin stream module at the top of your index.js file :

```jsx
const { Transform } = require("stream");
...
app.get("/download/files2", async (_req, res) => {
  try {
    const cursor = bucket.find();
    const files = await cursor.toArray();

    const filesData = await Promise.all(
      files.map((file) => {
        return new Promise((resolve, _reject) => {
          bucket.openDownloadStream(file._id).pipe(
            (() => {
              const data = [];
              return new Transform({
                transform(chunk, encoding, done) {
                  data.push(chunk);
                  done();
                },
                flush(done) {
                  const fbuf = Buffer.concat(data);
									const fileBase64String = fbuf.toString("base64");
									resolve(fileBase64String);
									done();

									// use the following instead if you want to return also the file metadata (like its name and other information)
                  /*const fileData = {
                    ...file, // file metadata
                    fileBase64String: fbuf.toString("base64"),
                  };
                  resolve(fileData);
                  done();*/
                },
              });
            })()
          );
        });
      })
    );
    res.status(200).json(filesData);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: { text: `Unable to retrieve files`, error },
    });
  }
});
```

We have almost the same workflow as the previous approach. We first retrieve all the files metadata from our filesBucket.file.collection then from that array of files metadata, we create a new array using the map function by downloading each file as a stream then pipe the stream to a transform class that transform the stream into a base64 string and return the transformed data back to the new array through Promise.resolve() and send the data to the client.

Let’s look at what closer how that was done :

The piped stream is passed through the Transform stream so that it can be tranformed. In doing that, Transform stream iterates its transform(chunck, encoding, done) method over the given stream chuncks one after other until the last chunck is read. Here, the transform(…) method pushes each chunck to the data array. When the all the chuncks has been iterated, Transform stream flush(…) method is executed and what is does is simply converting the data array to buffer and convert the buffer to a base64 string then it resolves the base64String to a promise.

By piping the stream to Transform inside the IIFE function. The Transform instance has access to theThe transform(…) method iterates on the stream until the stream get read completely. The

After sending a GET a request on this endpoint with Postman, you should get an array of base64 strings where each item of the array corresponds to a data.

![GET multiple files in base64 format](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/Untitled%2013.png)

GET multiple files in base64 format

Now you know how to retrieve a single file and multiple files from the GridFs bucket in different ways. Let’s see how to rename and delete a file.

### Rename a file

To rename a file, we can use the rename method of the GridFs bucket. The method takes three arguments :

| Name     | Type                       | Description                                                                                                  |
| -------- | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| id       | ObjectId                   | the id of the file to rename                                                                                 |
| filename | String                     | new name for the file                                                                                        |
| callback | GridFSBucket~errorCallback | An optional callback function that will be executed after the file renaming is attemped (successfuly or not) |

```jsx
// Rename a file
app.put("/rename/file/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    const { filename } = req.body;
    await bucket.rename(new mongoose.Types.ObjectId(fileId), filename);
    res.status(200).json({ text: "File renamed successfully !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: { text: `Unable to rename file`, error },
    });
  }
});
```

To test the file renbaming feature, copy the ID of a file from your mongodb database and paste it as following:

![PUT request to rename a file](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/Untitled%2014.png)

PUT request to rename a file

You should get the message {”text”: “File renamed successfully !”} if everything went fine.

### Delete a file

To remove a file from the bucket, we can use the delete method of the GridFs bucket. The method takes three arguments :

| Name     | Type                       | Description                                                                                                 |
| -------- | -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| id       | ObjectId                   | The id of the file doc                                                                                      |
| callback | GridFSBucket~errorCallback | An optional callback fuction that will be executed after the file deleting is attemped (successfuly or not) |

```jsx
// Delete a file
app.delete("/delete/file/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    await bucket.delete(new mongoose.Types.ObjectId(fileId));
    res.status(200).json({ text: "File deleted successfully !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: { text: `Unable to delete file`, error },
    });
  }
});
```

You can test how to delete a file with a given Id as following with postman:

![DELETE Request to remove a file](How%20to%20manage%20file%20storage%20using%20GridFS%20with%20Node%20%206b67738bbf54426dbe2cac47e3a13893/Untitled%2015.png)

DELETE Request to remove a file

If everything went fine, you should see the following message {”text”: “File deleted successfully !”}

Now you have all the necessary knowledge to work w

## What’s next ?
