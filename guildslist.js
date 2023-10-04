const axios = require('axios');
const fs = require('fs');

const BASE_URL = 'https://wax.greymass.com/v1/chain/';
const ENDPOINT = 'get_table_rows';

const SENENGINE_API_URL = 'https://wax.sengine.co/api/monthlyaverageresults/';

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getGuildData(guildName) {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 28);
    const formattedStartDate = startDate.toISOString().split('T')[0];

    const url = `${SENENGINE_API_URL}${guildName}?startDate=${formattedStartDate}&endDate=${endDate}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        const filePath = `./snapshots/guilds/${guildName}_${formattedStartDate}_${endDate}.json`;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        console.log(`Data saved for guild: ${guildName}`);
    } catch (error) {
        console.error(`Error retrieving data for guild ${guildName}:`, error.message);
    }
}

async function getEvaluationsTable() {
    try {
        const response = await axios.post(`${BASE_URL}${ENDPOINT}`, {
            code: 'guilds.oig',
            table: 'evaluations',
            scope: 'guilds.oig',
            json: true
        });

        if (response.data && response.data.rows) {
            const evaluations = response.data.rows;
            //console.log("Evaluations retrieved:", evaluations); // Logging the evaluations for debugging

            const latestScores = evaluations[evaluations.length - 1].scores;
            console.log("Latest scores:", latestScores); // Logging the latest scores for debugging

            // Iterate over each guild and retrieve data
            for (const score of latestScores) {
                await getGuildData(score.guild);
                await sleep(3000); // Sleep for 3 seconds
            }
        } else {
            console.log("Failed to retrieve evaluations table.");
        }
    } catch (error) {
        console.error("Error in getEvaluationsTable:", error.message);
    }
}

getEvaluationsTable();
