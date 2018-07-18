import json
import csv
import random
out_data = []
with open("LocName.csv", 'r', encoding='utf-8') as f:
    data = csv.reader(f)
    count = 0
    for row in data:
        if count > 0:
            out_data.append([row[2], row[3], random.random()])
        count += 1
fw = open("test.json", 'w', newline='')
outdata = json.dumps(out_data)
print(out_data)
fw.write(outdata)
fw.close()