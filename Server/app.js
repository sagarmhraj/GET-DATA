const express = require("express")
const { MongoClient, ObjectId } = require("mongodb")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())


const port = 3000
const dbUrl = "mongodb://localhost:27017";
const mongoCl = new MongoClient(dbUrl)
const dbName = "nodeDB"
const dbCollection = "User"

let mongodb = async () => {
    await mongoCl.connect()
    let db = mongoCl.db(dbName)
    let database = db.collection(dbCollection)
    let data = await database.find().toArray()
    return data;
}

// let mongodbcl = async () => {
//     await mongoCl.connect()
//     let db = mongoCl.db(dbName)
//     let database = db.collection(dbCollection)
//     let data = await database.find().toArray()
//     return data;
// }

app.get("/", (req, res) => {
    mongodb()
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json({ status: "error showing ", err }))
})

app.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input data
        if (!name || !email || !password) {
            return res.status(400).json({ status: "error", message: "All fields are required!" });
        }

        // Connect to MongoDB and save the data
        await mongoCl.connect();
        const db = mongoCl.db(dbName);
        const database = db.collection(dbCollection);

        await database.insertOne({ name, email, password });
        res.json({ status: "success" });
    } catch (error) { // Use 'error' instead of 'err'
        console.error("Error:", error); // Log the actual error to the console
    }
});

app.route("/:id")
    .delete(async (req, res) => {
        try {
            const { id } = req.params;

            // if (!ObjectId.isValid(id)) {
            //     return res.status(400).json({ status: "Invalid ID" });
            // }

            await mongoCl.connect();
            const db = mongoCl.db(dbName);
            const database = db.collection(dbCollection);

            const result = await database.deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount === 0) {
                return res.status(404).json({ status: "No document found" });
            }

            res.json({ status: "Delete successful" });
        } catch (error) {
            console.error("Error deleting document:", error);
            res.status(500).json({ status: "Error deleting document" });
        }
    })
    .get(async (req, res) => {
        try {
            const { id } = req.params;
            await mongoCl.connect();
            const db = mongoCl.db(dbName);
            const database = db.collection(dbCollection);

            const document = await database.findOne({ _id: new ObjectId(id) });

            if (!document) {
                return res.status(404).json({ status: "No document found" });
            }

            res.json(document);

        } catch (error) {
            console.error("Error fetching document:", error);
            res.status(500).json({ status: "Error fetching document" });
        }
    });



app.listen(port, () => {
    console.log("server started ");

})