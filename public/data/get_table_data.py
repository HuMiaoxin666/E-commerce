import json
import datetime
outfile = open("test_data.json", 'w', encoding='utf-8')

out_data = []
key_arr = ['id', 'type', 'size', 'date']
for i in range(10):
    cur_obj = {}
    cur_arr = ['1601044'+str(i), 'csv', '100m', str(datetime.datetime.now())]
    for j in range(len(key_arr)):
        cur_obj[key_arr[j]] = cur_arr[j]
    out_data.append(cur_obj)
outdata = json.dumps(out_data)
outfile.write(outdata)
outfile.close()
