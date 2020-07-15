const dialogflow = require('@google-cloud/dialogflow')
const uuid = require('uuid')

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/agent/:projectId', (request, response) => {
    const { projectId } = request.params

    const sessionId = uuid.v4()
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient()
    const session = sessionClient.projectAgentSessionPath(projectId, sessionId)

    return response.json({
        session,
        parent: 'projects/dialogflow-web-v2',
        displayName: 'TemVagas',
        defaultLanguageCode: 'pt',
        supportedLanguageCodes: [ 'en' ],
        timeZone: 'Europe/Madrid',
        description: 'Welcome to our demo agent, send \'Hi\' to experience the demos',
        avatarUri: 'https://storage.googleapis.com/cloudprod-apiai/a0b2e356-b43e-4ca5-a094-b219475fa4ca_x.png',
        enableLogging: true,
        matchMode: 'MATCH_MODE_HYBRID',
        classificationThreshold: 0.3,
        apiVersion: 'API_VERSION_V2_BETA_1',
        tier: 'TIER_STANDARD'
    })
})


app.post('/agent/:projectId', async (request, response) => {
    const { queryInput, session } = request.body

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient()

    // Send request and log result
    const responses = await sessionClient.detectIntent({
        session,
        queryInput
    })

    const [result] = responses

    console.log(responses)

    return response.json({ result })
})

app.listen(3333, () => {
    console.log('Server started at port 3333')
})
