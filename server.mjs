import express from "express";
import dfff  from "dialogflow-fulfillment";
const PORT = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res)=>{
    res.send("We are Live")
} )

app.post('/webhook', express.json() , (req, res)=>{
    const agent = new dfff.WebhookClient({
        request : req,
        response : res
    });
    function demo (agent){
        agent.add("Sending response from webhook By hammad")
    }
  
    function customPayloadDemo(agent) {
        var payloadData = {
            "richContent": [
              [
                {
                  "type": "accordion",
                  "title": "Server title",
                  "subtitle": "Server subtitle",
                  "image": {
                    "src": {
                      "rawUrl": "https://example.com/images/logo.png"
                    }
                  },
                  "text": "Server Bhai say Response arha hay"
                }
              ]
            ]
          }
          agent.add(new dfff.Payload(agent.UNSPECIFIED, payloadData, {sendAsMessage: true, rawPayload: true}))
    }


    var intentMap = new Map();
    intentMap.set('webhookDemo', demo)
    intentMap.set('customPayloadDemo', customPayloadDemo)

    agent.handleRequest(intentMap)


} )


app.listen(PORT, () => console.log(PORT))