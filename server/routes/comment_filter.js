import { google } from 'googleapis';

const API_KEY = 'AIzaSyBtQIHuN44v1pq5hAkuA6PcpOQYNMeRPCk';
const DISCOVERY_URL =
    'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';


async function cleanComment(req, res, next) {
    try {
        const input_comment = req.body.data;
        let final_comment = input_comment;
        const client = await google.discoverAPI(DISCOVERY_URL);
        const analyzeRequest = {
            comment: {
                text: `${input_comment}`,
            },
            requestedAttributes: {
                TOXICITY: {},
                SEVERE_TOXICITY: {},
                IDENTITY_ATTACK: {},
                PROFANITY: {},
                SEXUALLY_EXPLICIT: {}
            },
        };
        const response = await client.comments.analyze({
            key: API_KEY,
            resource: analyzeRequest,
        });
        for (let score in response.data.attributeScores) {
            let score_value = response.data.attributeScores[score].summaryScore.value;
            console.log(`score for ${score} is: ${score_value}`);
            if (score_value > 0.7) {
                final_comment = "Your comment is awaiting moderation...";
                break;
            }
        };
        req.body.data = final_comment;
        next();
    }
    // return final_comment;
    catch (err) {
        res.status(401).send({ error: "Unauthorized" });
    }
}

export default cleanComment;

// // -----------UNIT TESTS ----------------------------
// cleanComment("I miss you!")
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.error(err);
//     });
// // -------------------------------------------------
// cleanComment("I hate you!")
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.error(err);
//     });
// // -------------------------------------------------
// cleanComment("Fuckin Hell!")
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.error(err);
//     });
// // -------------------------------------------------
// cleanComment("Smoking hot!")
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.error(err);
//     });