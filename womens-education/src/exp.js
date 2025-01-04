import express from 'express';
import axios from 'axios';
import { load } from 'cheerio'; // Correct way to import Cheerio
import cors from 'cors';
import https from 'https';

// Initialize Express app
const app = express();
app.use(cors());

// URLs to scrape
const urlSchool = "https://schooleducation.karnataka.gov.in/en";
const urlHigher = "https://kswdc.karnataka.gov.in/events/en";
const urlEdtech = "https://www.edtechreview.in/?s=women+education+india+skills";

// Endpoint to scrape school education news
app.get('/scrape_news/school', async (req, res) => {
    try {
        const response = await axios.get(urlSchool, { httpsAgent: new https.Agent({ rejectUnauthorized: false }) });
        const $ = load(response.data); // Use load from cheerio

        const newsData = [];
        $('.modal-body.insidepage').each((_, section) => {
            $(section).find('p').each((_, pTag) => {
                const aTag = $(pTag).find('a');
                if (aTag.length) {
                    newsData.push({
                        title: aTag.text().trim(),
                        link: aTag.attr('href'),
                    });
                }
            });
        });

        res.status(200).json({ status: "success", data: newsData });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

const PORT = 8001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
