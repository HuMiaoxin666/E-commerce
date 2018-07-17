import csv

with open("result2.csv", 'r', encoding='utf-8') as f:
    data = csv.reader(f)
    outfile = open("orderInfor.csv", 'w', newline='', encoding='utf-8')
    count = 0
    for row in data:
        if count != 0:
            curp = row[-1].split(' ')
            out_row = row[0:-1]
            [out_row.append(p) for p in curp]
            csv.writer(outfile).writerow(out_row)
        else:
            out_row = row[0:-1]
            out_row.append("lng")
            out_row.append("lat")
            csv.writer(outfile).writerow(out_row)
        count += 1
    outfile.close()

