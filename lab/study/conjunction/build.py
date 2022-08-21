import json
import re

datas = json.load(open('data.json', 'r', encoding='utf8'))
# datas = json.load(open('ndata.json', 'r', encoding='utf8'))
ndatas = []

def partly_clone(val,data):
    rs = re.search(r'\w+(/\w+)+', val)
    if(rs):
        ss = rs.group()
        i = val.find(ss)
        for s in ss.split('/'):
            ndata = {
                "type": data["type"],
                "word": val[:i]+s+val[i+len(ss):],
                "detail": data["detail"],
                "example": data["example"]
            }
            ndatas.append(ndata)
    else:
        ndata = {
            "type": data["type"],
            "word": val,
            "detail": data["detail"],
            "example": data["example"]
        }
        ndatas.append(ndata)

for data in datas:
    vals = data["word"]
    if(vals.find('、')!=-1):
        for val in vals.split('、'):
            partly_clone(val,data)
    else:
        partly_clone(vals,data)
json.dump(ndatas,open('ndata.json', 'w+', encoding='utf8'),ensure_ascii=False)