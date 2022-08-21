import json
import re

datas = json.load(open('ndata.json', 'r', encoding='utf8'))
results = []

key = input('>')
i = key.find(':')
if(i != -1):
    s = key[:i]
    v = key[i+1:]
    for data in datas:
        if(s in data):
            if(v in data[s]):
                results.append(data)
else:
    v = key
    for data in datas:
        for s in data:
            if(v in data[s]):
                results.append(data)
                break

json.dump(results,open('result.json', 'w+', encoding='utf8'),ensure_ascii=False)