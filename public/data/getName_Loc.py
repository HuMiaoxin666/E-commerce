import csv
import json

with open("result3.csv",'r',encoding='utf-8') as f:
    data = csv.reader(f)
    adr_dict = {}
    count = 0
    for row in data:
        if count > 0:
            cur_pl = row[5]+row[6]+row[7]
            adr_dict[cur_pl] = {"lng": row[15], "lat": row[16], 'value':0}
        count +=1
    outdata = json.dumps(adr_dict)
    outfile = open("address_lat&lng.json", 'w', newline='',encoding = 'utf-8')
    outfile.write(outdata)
    outfile.close()