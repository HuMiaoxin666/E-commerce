import csv

with open("result3.csv",'r',encoding='utf-8') as f:
    data = csv.reader(f)
    adr_dict = {}
    count = 0
    for row in data:
        if count > 0:
            cur_pl = row[5]+row[6]+row[7]
            adr_dict[cur_pl] = {"lng": row[15], "lat": row[16], 'value':0}
        count +=1
    out_data = []
    for key in adr_dict.keys():
        out_data.append([key, adr_dict[key]['lng'], adr_dict[key]['lat']])
    outfile = open("province_loc.csv", 'w', newline='')
    csv.writer(outfile).writerow(['province', 'lng', 'lat'])
    csv.writer(outfile).writerows(out_data)
    outfile.close()