import requests
from bs4 import BeautifulSoup

from pymongo import MongoClient

client = MongoClient('mongodb+srv://test:sparta@cluster0.2rhgr.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://weather.naver.com/today', headers=headers)

soup = BeautifulSoup(data.text, 'html.parser')

weathers = soup.select('#weekly > div.scroll_control.end_left > div > ul > li')
for weather in weathers:
    a = weather.select_one('span > strong')
    if a is not None:
        day = a.text
        date = weather.select_one('span > span').text
        lowdg = weather.select_one('strong > span.lowest').text
        highdg = weather.select_one('strong > span.highest').text
        rainam = weather.select_one('div > div.cell_weather > span:nth-child(1) > strong > span.rainfall').text
        rainpm = weather.select_one('div > div.cell_weather > span:nth-child(2) > strong > span.rainfall').text
        wetrdc_am = weather.select_one('div > div.cell_weather > span:nth-child(1)')['data-wetr-cd']
        wetrdc_pm = weather.select_one('div > div.cell_weather > span:nth-child(2)')['data-wetr-cd']
        doc = {
            'day': day,
            'date': date,
            'lowdg': lowdg,
            'highdg': highdg,
            'rainam': rainam,
            'rainpm': rainpm,
            'wetrdc_am': wetrdc_am,
            'wetrdc_pm': wetrdc_pm
        }
        db.weathers.insert_one(doc)

location = soup.select_one('#now > div > div.location_area > strong').text
weathernow = soup.select('#now > div > div.weather_area > div.weather_now')
for now in weathernow:
    b = now.select_one('div > strong')
if b is not None:
    now_weather = b.text[6:11]
    now_sky = now.select_one('p > span.weather').text
    now_yesterday = now.select_one('p > em').text
    now_temp = now.select_one('p > span.temperature.up').text

    doc2 = {
        'location': location,
        'now_weather': now_weather,
        'now_sky': now_sky,
        'now_yesterday': now_yesterday,
        'now_temp': now_temp
    }
    db.now.insert_one(doc2)
