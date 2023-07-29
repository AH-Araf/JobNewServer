const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


// middle wares
app.use(cors());
app.use(express.json()); 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.onq28an.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run(){
    try{
        const usersCollection = client.db('jobPortalWeb').collection('users');
        const jobOn = client.db('jobPortalWeb').collection('jobCollection');
        const applyCollection = client.db('jobPortalWeb').collection('apply');
        const userJobProfile = client.db('jobPortalWeb').collection('userJobProfile');

    //users
    app.post('/users', async (req, res) => {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send(result);
    });
    app.get('/users', async (req, res) => {
        let query = {};
        const cursor = usersCollection.find(query);
        const a = await cursor.toArray();
        res.send(a);
    });
    app.get('/email', async (req, res) => {
        let query = {};

        if (req.query.email) {
            query = {
                email: req.query.email
            }
        }
        const cursor = usersCollection.find(query);
        const review = await cursor.toArray();
        res.send(review);
    });
    

    //add job and get job
    app.get('/jobs', async (req, res) => {
        let query = {};
        const cursor = jobOn.find(query).limit(0).sort({$natural:-1});
        const a = await cursor.toArray();
        res.send(a); 
    });
    //new
    app.get('/jobs/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const b = await jobOn.findOne(query);
        res.send(b);
    });
    app.get('/jobss', async (req, res) => {
        let query = {};

        if (req.query.category) {
            query = {
                category: req.query.category
            }
        }
        const cursor = jobOn.find(query).sort({$natural:-1});
        const review = await cursor.toArray();
        res.send(review);
    });

    app.post('/jobs', async (req, res) => {
        const review = req.body;
        const c = await jobOn.insertOne(review);
        res.send(c);
    });
    app.get('/joblimit', async (req, res) => {
        let query = {};
        const cursor = jobOn.find(query).limit(3).sort({$natural:-1}) ;
        const serve = await cursor.toArray();
        res.send(serve);
    });


    //Job query by email
    app.get('/jobEmail', async (req, res) => {
        let query = {};

        if (req.query.email) {
            query = {
                email: req.query.email
            }
        }
        const cursor = jobOn.find(query).sort({$natural:-1});
        const review = await cursor.toArray();
        res.send(review);
    });

    app.delete('/jobDelete/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await jobOn.deleteOne(query);
        res.send(result);
    })


    //Apply from jobCollection
    app.get('/apply/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const b = await jobOn.findOne(query);
        res.send(b);
    });

    //Applied in appplyCollection
    app.post('/apply', async (req, res) => {
        const user = req.body;
        const result = await applyCollection.insertOne(user);
        res.send(result);
    });
    app.get('/apply', async (req, res) => {
        let query = {};
        const cursor = applyCollection.find(query);
        const a = await cursor.toArray();
        res.send(a);
    });

    app.get('/applyEmail', async (req, res) => {
        let query = {};

        if (req.query.applicantUserEmail) {
            query = {
                applicantUserEmail: req.query.applicantUserEmail
            }
        }
        const cursor = applyCollection.find(query).sort({$natural:-1});
        const review = await cursor.toArray();
        res.send(review);
    });

    app.get('/comEmail', async (req, res) => {
        let query = {};

        if (req.query.companyEmail) {
            query = {
                companyEmail: req.query.companyEmail
            }
        }
        const cursor = applyCollection.find(query);
        const review = await cursor.toArray();
        res.send(review);
    });

    app.get('/jobId', async (req, res) => {
        let query = {};

        if (req.query.jId) {
            query = {
                jId: req.query.jId
            }
        }
        const cursor = applyCollection.find(query);
        const review = await cursor.toArray();
        res.send(review);
    });


  //
  app.get('/applicant/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const b = await applyCollection.findOne(query);
    res.send(b);
});

//userJobProfile
app.post('/userJobProfile', async (req, res) => {
    const user = req.body;
    const result = await userJobProfile.insertOne(user);
    res.send(result);
});
app.get('/userJobProfile', async (req, res) => {
    let query = {};
    const cursor = userJobProfile.find(query);
    const a = await cursor.toArray();
    res.send(a);
});
app.get('/userProfileEmail', async (req, res) => {
    let query = {};

    if (req.query.applicantUserEmail) {
        query = {
            applicantUserEmail: req.query.applicantUserEmail
        }
    }
    const cursor = userJobProfile.find(query);
    const review = await cursor.toArray();
    res.send(review);
});

app.delete('/userProfileDelete/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await userJobProfile.deleteOne(query);
    res.send(result);
})
    
    






    }
    finally{

    }
}

run().catch(err => console.error(err))


app.get('/',(req,res)=>{
    res.send('Job Portal Server Running')
})

app.listen(port, ()=>{
    console.log(`Job Portal Server Running${port}`)
})