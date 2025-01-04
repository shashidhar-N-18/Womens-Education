import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify
from flask_cors import CORS
import json

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# URLs to scrape
url_school = "https://schooleducation.karnataka.gov.in/en"
url_higher = "https://kswdc.karnataka.gov.in/events/en"
url_edtech = "https://www.edtechreview.in/?s=women+education+india+skills"

# Endpoint to scrape school education news
@app.route('/scrape_news/school', methods=['GET'])
def scrape_news_school():
    try:
        response = requests.get(url_school, verify=False)
        soup = BeautifulSoup(response.content, 'html.parser')
        news_section = soup.find_all('div', class_='modal-body insidepage')

        news_data = []
        for section in news_section:
            p_tags = section.find_all('p')
            for p_tag in p_tags:
                a_tag = p_tag.find('a')
                if a_tag:
                    title = a_tag.text.strip()
                    link = a_tag['href']
                    news_data.append({'title': title, 'link': link})

        return jsonify({"status": "success", "data": news_data}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Endpoint to scrape higher education news
@app.route('/scrape_news/higher', methods=['GET'])
def scrape_news_higher():
    try:
        response = requests.get(url_higher, verify=False)
        if response.status_code != 200:
            return jsonify({"status": "error", "message": f"Failed to fetch page. Status code: {response.status_code}"}), 500

        soup = BeautifulSoup(response.content, 'html.parser')
        ul_tag = soup.find('ul', id='cd-primary-nav', class_='insidepage')

        if not ul_tag:
            return jsonify({"status": "error",       "message": "No matching <ul> tag found"}), 500

        news_data = []
        li_tags = ul_tag.find_all('li', class_='level_0')
        for li_tag in li_tags:
            a_tag = li_tag.find('a')
            if a_tag:    
                title = a_tag.text.strip()
                link = a_tag['href']
                news_data.append({'title': title, 'link': link})

        return jsonify({"status": "success", "data": news_data}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Endpoint to scrape EdTechReview articles
@app.route('/scrape_news/edtech', methods=['GET'])
def scrape_news_edtech():
    try:
        response = requests.get(url_edtech, verify=False)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        articles = soup.find_all('div', class_='p-featured')

        articles_data = []
        for article in articles:
            link_tag = article.find('a')
            img_tag = article.find('img')

            if link_tag and img_tag:
                link = link_tag.get('href', 'No link available')
                title = link_tag.get('title', 'No title available')
                img_src = img_tag.get('src', 'No image available')
                articles_data.append({'link': link, 'title': title, 'img_src': img_src})

        return jsonify({"status": "success", "data": articles_data}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Run the Flask web application
if __name__ == '__main__':
    app.run(debug=True)
